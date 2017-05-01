/**
 *
 * JavaScript module to add to my classes
 * when the user selects a class in the search page,
 * clicks add class in my group page
 * it will grab the classes HostID ('email@asu.edu') from that table
 * it will insert to a table in DB called MyClass, also uses hostID
 * from the table
 *
 * **/

"use strict";


function MarkerObj(classname, description, long, lat, time) {
    this.className = classname;
    this.description = description;
    this.long = long;
    this.lat = lat;
    this.time = time;
}

var markerArr = [];
var markers = [];



function getAddedClasses() {
    //SQL statement to get classes
    console.log('executing SQL statement to get the students added classes');

    /** select * from class
     where classId in (select class from classbridge where studentid in ('ts@asu.edu')); **/

    var testStatement = "select * from class where classId in (select class from classbridge where studentid in ('ts@asu.edu'));";

    var statementBegin = "SELECT * FROM classbridge where studentid in (";
    var            com = ",";
    var           char = "'";
    var          char2 = ")";
    var   statementEnd = ";";
    var   sqlStatement = statementBegin.concat(char, crSessionEmail,char,char2, statementEnd);

    console.log(testStatement);

    MySql.Execute(
        dbHost,
        dbLogin,
        dbLoginPass,
        dbName,
        testStatement,
        function (data) {

                processAddedClasses(data);

        });

}

function processAddedClasses(queryReturned) {

    console.log('processing added classes');


    if (!queryReturned.Success) {
        // alert(queryReturned.Error);

        console.log(queryReturned.Error);

    } else {

        var queryOut, table, tableBody, tableHeader, tableRow;
        // var rows = queryReturned.length;


        $('#addedClassesOutput tbody > tr').remove();

        queryOut    = document.getElementById("addedClassesOutput");
        table       = document.createElement("table");
        tableBody   = document.createElement("tbody");
        tableHeader = document.createElement("tr");



        var myObject = JSON.stringify(queryReturned.Result, null, 2);
        var json     = JSON.parse(myObject);


        for (var k =0; k < json.length; k++) {

            var object = json[k];
            //get long and lat of each classes
            var marker = new MarkerObj(object.className, object.description, object.lat, object.long, object.time);

            markerArr.push(marker);
            // console.log(marker);

            // refreshMarkers();

        }


        for (var i =0; i<queryReturned.Result[0].length; i++) {
            var cell     = document.createElement("th");
            var cellText = document.createTextNode(queryReturned.Result[0].keys()[i]);

            cell.appendChild(cellText);
            tableHeader.appendChild(cell);



        }

        tableBody.appendChild(tableHeader);

        for (var i = 0; i<queryReturned.Result.length; i++) {

            var tableRow = document.createElement("tr");

            for (var j=0; j<Object.keys(queryReturned.Result[i]).length; j++) {

                var cell     = document.createElement("td");
                //var cell     = document.createElement("button");
                var cellText = document.createTextNode(Object.values(queryReturned.Result[i])[j]);
                cell.appendChild(cellText);
                tableRow.appendChild(cell);


            }

            var buttonVar=document.createElement("button");
            buttonVar.innerHTML='Remove';

            buttonVar.addEventListener('click', function(){
                console.log(this.parentNode.cells[0].innerHTML);
                console.log(this.parentNode.cells[4].innerHTML);
                classId = this.parentNode.cells[0].innerHTML;
                // hostId  = this.parentNode.cells[4].innerHTML;

                //DELETE FROM `test_db_ecamilon`.`classbridge` WHERE `studentid`='ts@asu.edu' and`class`='1';


                var statementBegin = "DELETE FROM classbridge WHERE studentid = '";
                var           node = this.parentNode.cells[0].innerHTML;
                var           char = "'";
                var            and = 'and class =';
                var   statementEnd = ";";
                var   sqlStatement = statementBegin.concat(crSessionEmail,char,and,node,statementEnd);
                //

                console.log(sqlStatement);

                executeSQLStatement(sqlStatement, 'insert');
                //

            });


            tableRow.appendChild(buttonVar);
            tableBody.appendChild(tableRow);

        } //end loop

        table.appendChild(tableBody);
        queryOut.appendChild(table);

    }

}


/** function to refresh markers on the screen and
 * add the location of each class on the map**/

function refreshMarkers() {


    //loop through the markerArr of Objects
    for (var k = 0; k < markerArr.length; k++) {

        var eachMarkerobj = {
            location:       markerArr[k].className,
            description:    markerArr[k].description,
            time:           markerArr[k].time,
            lat:            markerArr[k].lat,
            long:           markerArr[k].long
        };

        markers.push(eachMarkerobj);

    }

    var marker;

    var image = {
        url: 'http://logos.statbroadcast.com/asu.png',
        size: new google.maps.Size(120, 120),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 50)
    };

    //add each marker on the map,
    for (var i = 0; i < markers.length; i++) {

        var position = new google.maps.LatLng(markers[i].lat, markers[i].long);

        console.log(markers[0].location);
        console.log(markers[0].lat);
        console.log(markers[0].long);
        console.log(markers[0].time);

        marker = new google.maps.Marker({

            position: position,
            map: map,
            icon: image

        });


        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent('(Class): ' + markers[i].location + ' (Time): ' + markers[i].time + ' (Description:) ' + markers[i].description);
                infowindow.open(map, marker);

            }
        })(marker, i));

        google.maps.event

    }

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });





}
