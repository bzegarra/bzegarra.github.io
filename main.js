document.addEventListener("DOMContentLoaded", function() {
    const brandContainerHeight = 130;
    const navbar = document.querySelector('.navbar');
    const nextElement = navbar.nextElementSibling;
    nextElement.classList.add('offset-below-navbar-default');

    window.addEventListener('scroll', function() {
        if (window.scrollY >= brandContainerHeight) {
            navbar.classList.add('fixed');
            nextElement.classList.remove('offset-below-navbar-default');
            nextElement.classList.add('offset-below-navbar-fixed');
        } else {
            navbar.classList.remove('fixed');
            nextElement.classList.remove('offset-below-navbar-fixed');
            nextElement.classList.add('offset-below-navbar-default');
        }
    });

    
});

document.getElementById('mobile-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.navbar__list').classList.toggle('active');
});