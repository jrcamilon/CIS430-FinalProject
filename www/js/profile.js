"use strict";


function profileOnLoad() {

    document.getElementById('first-nameEP').value = curSessionFName;
    document.getElementById('last-nameEP').value = curSessionLName;
    document.getElementById('aliasEP').value = "enter nickname";
    document.getElementById('emailEP').value = crSessionEmail;
    document.getElementById('passwordEP').value = crSessionPassword;

}


function loadButtonClick(){

    var alias       = document.getElementById('aliasEP').value;
    var email       = document.getElementById('emailEP').value;
    var password    = document.getElementById('passwordEP').value;

    var editProfileStatement = "UPDATE users SET alias = '"+alias+"', password = '"+password+"' WHERE email = '"+email+"' ;" ;

    executeSQLStatement(editProfileStatement, 'update' );
}
