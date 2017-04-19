/**
 * Created by jrcamilon on 4/17/17.
 */

//JQuery Scripts to handle hiding and showing DIVS
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }

});

//this is the JQuery code when the user click 'Login' or 'Signup'
$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    var target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});

// var menuBtn = document.getElementById('brg-menu');
// var wrapper = document.body;
// var header = document.getElementById('header');
// var main = document.getElementById('main');
// var toggledClassOptions = ['menu--toggled-scale', 'menu--toggled-slide', 'menu--toggled-hide']; // menu--toggled-scale, menu--toggled-slide, menu--toggled-hide
// var toggledClass = 'menu--toggled-scale';
//
// menuBtn.addEventListener('click', function() {
//     if ( window.scrollY > (header.offsetTop + header.offsetHeight)  ) {
//         wrapper.classList.toggle('menu--toggled-slide');
//     } else {
//         wrapper.classList.toggle(toggledClass);
//     }
// }, false);
//
// main.addEventListener('click', function() {
//     for (string of toggledClassOptions) {
//         wrapper.classList.remove(string);
//     }
// }, false);