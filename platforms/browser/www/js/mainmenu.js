var menuBtn = document.getElementById('brg-menu');
var wrapper = document.body;
var header = document.getElementById('header');
var main = document.getElementById('main');
var toggledClassOptions = ['menu--toggled-scale', 'menu--toggled-slide', 'menu--toggled-hide']; // menu--toggled-scale, menu--toggled-slide, menu--toggled-hide
var toggledClass = 'menu--toggled-scale';

menuBtn.addEventListener('click', function() {
    if ( window.scrollY > (header.offsetTop + header.offsetHeight)  ) {
        wrapper.classList.toggle('menu--toggled-slide');
    } else {
        wrapper.classList.toggle(toggledClass);
    }
}, false);

main.addEventListener('click', function() {
    for (string of toggledClassOptions) {
        wrapper.classList.remove(string);
    }
}, false);