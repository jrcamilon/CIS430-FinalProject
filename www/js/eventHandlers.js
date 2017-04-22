

var mainMenu = $('#main-menu');
var profilePage = $('#profile');
var hostGroupPage = $('#page1');
var findGroupPage = $('#page2');
var myClassesPage = $('#myclasses');
var logoutPage = $('#logout-page');


$('#host-group-button').on('click', function() {
   console.log('host btn pressed');

   $('#main-menu').hide();
   $('#page2').hide();
   $('#page1').show();
});

$('#hostGroupPage-backBtn').on('click', function() {
    console.log('back btn pressed');

    $('#main-menu').show();
    goBackToMain();
});

$('#find-group-button').on('click', function() {
    console.log('find btn pressed');

    $('#main-menu').hide();
    $('#page1').hide();
    $('#page2').show();
});

$('#findGroupPage-backBtn').on('click', function() {
    console.log('back btn pressed');
    $('#main-menu').show();
    goBackToMain();
});


$('#hostGroupPage-OKBtn').on('click', function() {

    $('#main-menu').show();
    // getInputFromHostForm();

    goBackToMain();

});

$('#findGroupPage-OKBtn').on('click', function() {

    $('#main-menu').show();
    $('#page2').hide();

    goBackToMain();
});

function goBackToMain() {
    $('#page2').hide();
    $('#page1').hide();
    $('#profile').hide();
    $('#myclasses').hide();

    $('#main-menu').show();
}

$('#menuicon').on('click', function() {

    console.log('toggling menu');

    var body = $('#main-menu');
    var sideMenu = $('.menu-side');

    sideMenu.toggleClass('menu-side-open');
    body.toggleClass('menu-open');

});

$('#slidemenu-profile').on('click', function () {

    console.log('profile button pressed');

    $('.menu-side').toggleClass('menu-side-open');
    $('#main-menu').toggleClass('menu-open');

    $('#profile').show();
    $('#main-menu').hide();


});

$('#slidemenu-myclasses').on('click', function() {

    console.log('my classes button pressed');

    $('.menu-side').toggleClass('menu-side-open');
    $('#main-menu').toggleClass('menu-open');

    $('#myclasses').show();
    $('#main-menu').hide();



});

$('#myclasses-backbtn').on('click', function() {

    console.log('back button pressed');

    goBackToMain();


});

$('#profile-backbtn').on('click', function() {

    console.log('back button pressed');

    goBackToMain();


});

$('#logoutbtn').on('click', function() {

    console.log('logout pressed');

    $('.menu-side').toggleClass('menu-side-open');
    $('#main-menu').toggleClass('menu-open');
    mainMenu.hide();
    profilePage.hide();
    hostGroupPage.hide();
    findGroupPage.hide();
    myClassesPage.hide();

    $('#login-signup').show();


});

