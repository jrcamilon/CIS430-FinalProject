

"use strict";

//Global Variables
var dbHost          = "dmazzola.com";
var dbLogin         = "ecamilon";
var dbLoginPass     = "ecam5470";
var dbName          = "test_db_ecamilon";

var firstName       = undefined;
var lastName        = undefined;
var email           = undefined;
var password        = undefined;


var loginEmail      = undefined;
var loginPassword   = undefined;

var returnedPassword= undefined;
var enteredPassword = undefined;

var mapGeoButton 	= undefined;
var currentLat      = undefined;
var currentLong     = undefined;
var latitudeInput 	= undefined;
var longitudeInput 	= undefined;
var mapElement  	= undefined;
var map 			= undefined;
var curLatLng 		= undefined;
var marker 			= undefined;
var zoom 			= 18;
var markerOptions   = undefined;


var curSessionUser  = undefined; //this is the current session user e.g. Tony Stark;
var crSessionEmail  = undefined; // this is the current session user's email e.g. logged in as: ts@asu.ed
var crSessionPassword = undefined; // this is the current session user's password.

//test code
var testOBJ = {
    class: "CIS430",
    host: "Tony Stark",
    description: "none",
    long: 33.277342,
    lat: -111.789769
};

var testOBJ2 = {
    class: "ACC444",
    host: "Bruce Banner",
    description: "none",
    long: 33.263169,
    lat: -111.789871
};

var arr = [testOBJ, testOBJ2];

function insertHostToDB() {

    var className;
    var hostName;
    var locationName;
    var description;
    var long;
    var lat;


    //db table headers are (SID, Class, Host, Location, Description, Long, Lat)
    var statementBegin = "INSERT INTO users (className,hostName,,location,description,long,lat) VALUES(";
    var            com = ",";
    var           char = "'";
    var   statementEnd = ");";
    var   sqlStatement = statementBegin.concat(char,
        className,char,com,char,
        hostName,char,com,char,
        locationName,char,com,char,
        description,char,com,char,
        long, char,com,char,
        lat, char,statementEnd);

    executeSQLStatement(sqlStatement, 'insert');

    //prompt user that you have now created a session to host

}

function getHostClassesFromDB() {

    // button pressed load the classes
    // query to load ALL the classes
    // process query results, post all the classes to the map.

}

function generateClassLocations() {

}
//end test code


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    // alert("onDeviceReady() executed");
}
function initialize() {

    //hide everything but the login form div and initialize the map
    $('#mainApp').hide();

    // loadScript('initMap');

    mapElement 	   = document.getElementById('mapDiv');
    // statusBarHide();
}
//cordova made finction to hide the status bar for both ios and android mobile phones.
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

function createAccountClick(form) {

    console.log('user clickedlogin button pressed');
    //Verify that the values of the form are actually correct, no empty fields
    try  {

        if(!form.checkValidity()) {
            throw "one or more values are empty or invalid ";
        }
            //store whatever the user types in variables
            firstName   =  document.getElementById('first-name').value;
            lastName    =  document.getElementById('last-name').value;
            email       =  document.getElementById('email').value;
            password    =  document.getElementById('password').value;

        if(!checkEnteredEmail()) {
            throw "must use @asu email";
        }
        else {
            //create the sql insert statement if the values the user typed are all valid
            var statementBegin = "INSERT INTO users (fname,lname,email,password) VALUES(";
            var            com = ",";
            var           char = "'";
            var   statementEnd = ");";
            var   sqlStatement = statementBegin.concat(char,
                firstName,char,com,char,
                lastName,char,com,char,
                email,char,com,char,
                password,char,statementEnd);

            //execute the sql statement
            executeSQLStatement(sqlStatement, 'insert');

            //go back to the login screen
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
            var target = $(this).attr('href');
            $('.tab-content > div').not(target).hide();
            $('.tab a').click();
            //end go back to login screen
        }

    }
    catch(error) {
        //throw the errors caught, from the top
        document.getElementById('signup-message').innerHTML =
            error;
    }

}
//function to check if the email entered is an ASU Email
function checkEnteredEmail() {
    var         emailSplit = email.split('@');
    return  emailSplit[1] == 'asu.edu';
}

function loginButtonClick(form){

    console.log('login button pressed');
    loginEmail          = document.getElementById('login-email').value;
    loginPassword       = document.getElementById('login-password').value;

    var statementBegin  = "SELECT * FROM users where email = '";
    var statementEnd    = "';";

    var sqlStatement    = statementBegin.concat(loginEmail,statementEnd);

    executeSQLStatement(sqlStatement, 'select');
}

function executeSQLStatement(sqlStatement, sqlStatementType){

    console.log('executing SQL statement.. connecting to DB');
    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        sqlStatement,
        function (data) {

            if(sqlStatementType == 'insert'){
                console.log(data);
                console.log('insert complete');

            } else if (sqlStatementType == 'select'){
                processQueryResult(data);
                console.log('select statement complete, success! returned JSON objects')
            }

        });
}

function processQueryResult(queryReturned) {

    console.log('processing query results');

    var myObject = JSON.stringify(queryReturned.Result, null, 2);
    var count    = Object.keys(myObject).length;


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

        grabCurrentUserInformation(json);

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

            grabCurrentUserInformation(json);

            //CONTINUE TO MAIN MENU

            // $('#login-signup').hide();

            loadMainMenu();
        }

    }
}

function loadMainMenu(){

    $('.form').hide();           //hide the login and signup form
    $('#mainApp').show();       //show the main app with all divs
    $('body').toggleClass('bg-image');
    console.log('toggled');

    generateSessionUserInfo();   //get the user info and save them to a variable
    loadScript('initMap');       // Initialize the map

}

function grabCurrentUserInformation(json) {
    curSessionUser      = json[0].fname + ' ' + json[0].lname;
    crSessionEmail      = json[0].email;
    crSessionPassword   = json[0].password;

    console.log('currently logged in as: ' + curSessionUser);

}

function checkpassword() {
    //this method just checks the entered password
    return returnedPassword === enteredPassword;
}

// MAP: These are the functions for all the maps stuff
function loadScript(callback) {

    console.log('firing script');
    var script 		 = undefined;
    var googleAPIKey = "AIzaSyAeae-IEvCB_ruQ31dwfzm6Rg-irZYoF2M";
    var googleAPIUrl = "https://maps.googleapis.com/maps/api/js";

    var srcURL 		 = googleAPIUrl + '?key=' + googleAPIKey
        + '&callback=' + callback;

    script 			 = document.createElement('script');
    script.type 	 = "text/javascript";
    script.async 	 = true;
    script.defer 	 = true;
    script.src 		 = srcURL;

    document.body.appendChild(script);
}

function initMap() {

    navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError,{ maximumAge:60000, timeout:5000, enableHighAccuracy: true });

    console.log(geolocationError);
    console.log(navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError,{ enableHighAccuracy: true }));

    var mapOptions 		= {zoom: zoom, center: curLatLng };
    map                 = new google.maps.Map(mapElement, mapOptions);
    markerOptions 	= {position: curLatLng, map: map, draggable: false};

    marker = new google.maps.Marker(markerOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        currentLat  = event.latLng.lat();
        currentLong = event.latLng.lng();
        marker.setPosition(event.latLng);
        map.setCenter(event.latLng);

    });


}

function geolocationSuccess(position) {
    currentLat  = position.coords.latitude;
    currentLong = position.coords.longitude;
    curLatLng = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});

    mapGeolocation();
}

function geolocationError() {
    // alert("Error in geolocation subsystem!");
}

function mapGeolocation() {

    curLatLng = new google.maps.LatLng({ lat: Number(currentLat), lng: Number(currentLong) });

    map.panTo(curLatLng);
    marker.setPosition(curLatLng);




    console.log('mapGeolocation() current latitude is: ' + currentLat);
    console.log('mapGeolocation() current longtitude is: ' + currentLong);
    console.log('mapGeolocation() current lat long is: +' + curLatLng);

    newMarker(curLatLng);
}




function newMarker(curLatLng) {

        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {mapTypeId: 'roadmap'};

        // Display a map on the page
        map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
        // map.setTilt(45);

        // Multiple Markers
        var markers = [ ['ASU, Tempe', 33.424564, -111.928001],
                        ['Corner, Location', arr[0].long, arr[0].lat],
                        ['Your Location', currentLat,currentLong]
        ];
        //load markers



        // Info Window Content
        var infoWindowContent = [
            ['<div class="info_content">' + '<h3>Arizona State University</h3>' + '<p>content.</p>' + '</div>'],
            ['<div class="info_content">' + '<h3>Corner Store</h3>' + '<p>content.</p>' + '</div>'],
            ['<div class="info_content">' + '<h3>Your Location</h3>' + '<p>Your Location</p>' + '</div>'] ];

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

        // Loop through our array of markers & place each one on the map
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

            bounds.extend(position);

            marker = new google.maps.Marker({

                position: position,
                map: map,
                title: markers[i][0]

            });

            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {

                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);

                    //display to the liststuff div

                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            // map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(14);
            google.maps.event.removeListener(boundsListener);
        });

        map.setCenter(curLatLng);
}

//END MAP: End of map section code

//Code for user sessions
function generateSessionUserInfo() {

    console.log('generating session user');

    $('#sessionUser').html(curSessionUser);
    console.log(curSessionUser);

    loadProfilePic();


}

function loadProfilePic() {

    if(curSessionUser == 'Tony Stark'){

        $('#profilePicture').attr("src","http://vignette2.wikia.nocookie.net/marvelmovies/images/8/87/AoU_Tony_Stark_portal.png/revision/latest?cb=20150427084736");
    }
    else {

        $('#profilePicture').attr("src","img/profile-image.svg");
    }

    //if theres a JSON object for pictures then we can also load that in, but for now we'll
    //only give tony a picture

}

function userLogout(){
    // reset the current session and log the user out
    curSessionUser  = undefined; //this is the current session user e.g. Tony Stark;
    crSessionEmail  = undefined; // this is the current session user's email e.g. logged in as: ts@asu.ed
    crSessionPassword = undefined;

    //clear the welcome signup text. set it back to "Welcome" message
    document.getElementById('login-welcome').innerHTML = 'Welcome';


}

//adds and removes the background image
function bgImage() {
    $(document.body).addClass('bg-image');
}
