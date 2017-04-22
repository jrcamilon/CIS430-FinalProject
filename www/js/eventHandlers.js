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
}

