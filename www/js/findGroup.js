var hostId;
var classId;




function searchClassFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("queryOutput");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function showClassClick(){

    var sqlStatement = "SELECT classId, className, description, time, hostId, location FROM class ORDER BY CLASSNAME ASC;";
    executeSQLStatement3(sqlStatement);
}

function executeSQLStatement3(sqlStatement){
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {
            processQueryResult3(data);
            // console.log(data);
        });
}


function processQueryResult3(queryReturned) {
    if (!queryReturned.Success) {
        alert(queryReturned.Error)
    } else {

        var queryOut, table, tableBody, tableHeader, tableRow;
        var rows = queryReturned.length;

        
        queryOut    = document.getElementById("queryOutput");
        table       = document.createElement("table");
        tableBody   = document.createElement("tbody");
        tableHeader = document.createElement("tr");

        for (var i=0; i<queryReturned.Result[0].length; i++) {
            var cell     = document.createElement("th");
            var cellText = document.createTextNode(queryReturned.Result[0].keys()[i]);
            
            cell.appendChild(cellText);
            tableHeader.appendChild(cell);
        }

        tableBody.appendChild(tableHeader);

        for (var i=0; i<queryReturned.Result.length; i++) {
            var tableRow = document.createElement("tr");

            for (var j=0; j<Object.keys(queryReturned.Result[i]).length; j++) {
                var cell     = document.createElement("td");
                //var cell     = document.createElement("button");
                var cellText = document.createTextNode(Object.values(queryReturned.Result[i])[j]);
                cell.appendChild(cellText);
                tableRow.appendChild(cell);
            }
            var buttonVar=document.createElement("button");
            buttonVar.innerHTML='Add Class';

            buttonVar.addEventListener('click', function(){
                console.log(this.parentNode.cells[0].innerHTML);
                console.log(this.parentNode.cells[4].innerHTML);
                classId = this.parentNode.cells[0].innerHTML;
                hostId = this.parentNode.cells[4].innerHTML;

                var statementBegin = "INSERT INTO myClass (userId, classId) VALUES(";
                var            com = ",";
                var           char = "'";
                var   statementEnd = ");";
                var   sqlStatement = statementBegin.concat(char,
                    hostId,char,com,char,
                    classId,char,statementEnd);
                

                executeSQLStatement101(sqlStatement, 'insert');
            })

            tableRow.appendChild(buttonVar);
            tableBody.appendChild(tableRow);
        }

        table.appendChild(tableBody);
        queryOut.appendChild(table);
        
    }
}



function executeSQLStatement101(sqlStatement, sqlStatementType){

    console.log('executing SQL statement.. connecting to DB');
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {

            if(sqlStatementType == 'insert'){
                //console.log(data);
                console.log('insert complete');

            } else if (sqlStatementType == 'select'){
                processQueryResult(data);
                console.log('select statement complete, success! returned JSON objects')
            }

        });
}





























