/** This page is for the host form
 * inside the main page, allows the form from
 * the host form page to be inserted into the database**/


"use strict";



function submit() {

    console.log('submit pressed');

    var className       =  document.getElementById('cname').value;
    var location        =  document.getElementById('loc').value;
    var time            =  document.getElementById('time').value;
    var description     =  document.getElementById('desc').value;

    console.log('sending values in:' + className );
    getHighestClassId(className, location, time, description);


}

function getHighestClassId (className, location, time, description) {

    console.log('values inside getHighestClassId function');

    var statement = 'select MAX(classId) from class';

    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        statement,
        function (data) {

            var test = JSON.stringify(data.Result, null, 2);
            var json = JSON.parse(test);

            var classId = json["0"]["MAX(classId)"];

            classId = classId + 1;

            executeStaement(className, location, time, description, classId);
        }
    )
}

function executeStaement(className, location, time, description, idUsed) {

    var statement   = "INSERT INTO class VALUES(";
    var char        = "'";
    var com         = ",";
    var end         = ");";

    var sqlStatement = statement.concat(char,idUsed,char,com,
        char,className,char,com,
        char,description,char,com,
        char,location,char,com,
        char,time,char,com,
        char, crSessionEmail, char, com,
        char, currentLat, char, com,
        char, currentLong, char, end);

    console.log(sqlStatement);

    executeHostSQLStatement(sqlStatement);


}

function executeHostSQLStatement(sqlStatement){

    console.log('executing SQL statement.. connecting to DB');
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {
                console.log('complete!');
                document.getElementById('host-message').innerHTML = 'SUCCESSFULLY ADDED!';

        });
}

function clearForm() {

    document.getElementById('cname').value = "";
    document.getElementById('loc').value = "";
    document.getElementById('time').value = "";
    document.getElementById('desc').value = "";

    document.getElementById('host-message').innerHTML = '';


    goBackToMain();

}

