/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

"use strict";

//Global Variables

var dbHost = "dmazzola.com";
var dbLogin = "ecamilon";
var dbLoginPass = "ecam5470";
var dbName = "test_db_ecamilon";
//var insertUser = "INSERT INTO users (fname,lname,email,password) VALUES('JR','Camilon','test2@test.com','pass341');";

var firstName;
var lastName;
var email;
var password;

var loginEmail;
var loginPassword;

var returnedPassword;
var enteredPassword;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    // alert("onDeviceReady() executed");
    statusBarHide(); //makes the statusBar disappear on runtime for the ios and android devices


}

function statusBarHide(){
    //This removes the status bar for android
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#333");
    }

    //This removes the status bar for iOS
    if(cordova.platformId == 'ios') {
        // alert("iphone");

        StatusBar.isVisible == false;
        StatusBar.overlaysWebView(false);
        StatusBar.hide();
    }

}

$(document).ready(function() {

    $('#loading-wrapper').hide();
    $('#main-menu').hide();

});



function createAccountClick(form) {


    firstName   = document.getElementById('first-name').value;
    lastName    =  document.getElementById('last-name').value;
    email       =  document.getElementById('email').value;
    password    =  document.getElementById('password').value;

    var statementBegin = "INSERT INTO users (fname,lname,email,password) VALUES(";
    var com = ",";
    var char = "'";
    var statementEnd = ");";

    var sqlStatement = statementBegin.concat(char,
        firstName,char,com,char,
        lastName,char,com,char,
        email,char,com,char,
        password,char,statementEnd);

    executeSQLStatement(sqlStatement);


    // go back to login screen
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    var target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    // $(' .tab-content').find('#login').show(300);

    $('.tab a').click();



}

function loginButtonClick(form){

    // $('.form').hide();

    loginEmail = document.getElementById('login-email').value;
    loginPassword = document.getElementById('login-password').value;

    console.log(loginEmail);
    console.log(loginPassword);

    var statementBegin = "SELECT * FROM users where email = '";
    var statementEnd = "';";

    var sqlStatement = statementBegin.concat(loginEmail,statementEnd);

    // var testStatement = "SELECT * FROM users where email = 'cchoi@asu.edu';";

    executeSQLStatement2(sqlStatement);

}

function executeSQLStatement2(sqlStatement){
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {
            processQueryResult(data);
            // console.log(data);
        });
}

// function to execute any statement with a parameters
// that accepts a string statement params
function executeSQLStatement(sqlStatement){
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {
            console.log(data)

        });
}


function processQueryResult(queryReturned) {

    var myObject = JSON.stringify(queryReturned.Result, null, 2);
    var count = Object.keys(myObject).length;

    if (queryReturned.Success == false) {
        alert(queryReturned.Error);

    }
    else if(count == 2){
        console.log('user not found');
        document.getElementById('login-welcome').innerHTML = 'Email was not found!';
    }

    else if (count > 2) {

        var data = JSON.stringify(queryReturned.Result, null, 2);
        var json = JSON.parse(data);

        returnedPassword = json[0].password;

        enteredPassword = document.getElementById('login-password').value;

        if(checkpassword() === false){
            console.log(enteredPassword);
            console.log(returnedPassword);
            console.log('password does not match');

            document.getElementById('login-welcome').innerHTML =
                'Invalid password!';

        }
        else if (checkpassword() == true){
            document.getElementById('login-welcome').innerHTML =
                'Welcome, ' + json[0].fname + '!' ;

            //CONTINUE TO MAIN MENU

            $('.form').fadeToggle(1000);
            $('#loading-wrapper').show(3000);
            $('body').css("background-color", "#24332e" );

            $('#loading-wrapper').fadeOut(2000);

            loadMainMenu();


        }
        //verify the returned password matched the value they entered
        //
        // document.getElementById('login-welcome').innerHTML =
        //     'Welcome, ' + json[0].fname + '!' ;
        // document.getElementById("output").innerHTML = returnedPassword;
        //
        // console.log(count);
        // console.log(myObject);

    }
}

function loadMainMenu(){
    $('#main-menu').show(5000);
    // $('body').css("background-color", "white" );


}

function checkpassword() {
    return returnedPassword === enteredPassword
}