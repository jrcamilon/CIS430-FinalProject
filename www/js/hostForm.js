"use strict";


var classId;

function submit() {
    //onclick event

    console.log('submit pressed');

    var className       =  document.getElementById('cname').value;
    var location        =  document.getElementById('loc').value;
    var time            =  document.getElementById('time').value;
    var description     =  document.getElementById('desc').value;

    getHighestClassId(className, location, time, description);





}

function getHighestClassId (className, location, time, description) {

    var statement = 'select MAX(classId) from class VALUES';

    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        statement,
        function (data) {

            var test = JSON.stringify(data.Result, null, 2);
            var json = JSON.parse(test);

            classId = json["0"]["MAX(classId)"] ;
            classId = classId + 1;

            executeStaement(className, location, time, description)

        }
    )



}

function executeStaement(className, location, time, description) {

    var statement   = "INSERT INTO class (";
    var char        = "'";
    var com         = ",";
    var end         = ");";

    var sqlStatement = statement.concat(char,classId,char,com,
        char,className,char,com,
        char,description,char,com,
        char,location,char,com,
        char,time,char,com,
        char, crSessionEmail, char, com,
        char, currentLong, char, com,
        char, currentLat, char, end);

    console.log(sqlStatement);


}

function clearForm() {

    document.getElementById('cname').value = "";
    document.getElementById('loc').value = "";
    document.getElementById('time').value = "";
    document.getElementById('desc').value = "";

    goBackToMain();

}
