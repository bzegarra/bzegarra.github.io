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

//-----------------------
const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = items.length;
const itemWidth = items[0].clientWidth;
let autoScrollInterval;
let autoScrollTimeout;

const clonesEnd = items.map(item => item.cloneNode(true));

clonesEnd.forEach(clone => {
    track.appendChild(clone);
});

const clonesStart = clonesEnd.map(clone => clone.cloneNode(true)).reverse();
clonesStart.forEach(clone => {
    track.insertBefore(clone, track.firstChild);
});

const allItems = document.querySelectorAll('.carousel-item');
const totalItems = allItems.length;

track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;

function updateCarousel() {
    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
}

function moveToIndex(index) {
    track.style.transition = 'transform 0.5s ease';
    currentIndex = index;
    console.log(currentIndex);
    console.log(new Date().toISOString());
    updateCarousel();
}

function visibleItems() {
    return window.innerWidth < 768 ? 3 : 5;
}

function handleLoop() {
    if (currentIndex >= totalItems - visibleItems()) {
        console.log('loop end');
        track.style.transition = 'none';
        currentIndex = (totalItems - visibleItems()) % items.length;
        
        requestAnimationFrame(() => {
            updateCarousel();
        });
    } else if (currentIndex <= 0) {
        console.log('loop start');
        track.style.transition = 'none';
        currentIndex = items.length;
        
        requestAnimationFrame(() => {
            updateCarousel();
        });
    }
}

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        handleLoop();
    }
});

track.addEventListener('transitionend', () => {
    handleLoop();
    enableButtons();
});

function disableButtons() {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
}

function enableButtons() {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function moveToNext() {
    disableButtons();
    currentIndex++;
    moveToIndex(currentIndex);
}

function moveToPrev() {
    disableButtons();
    currentIndex--;
    moveToIndex(currentIndex);
}

nextBtn.addEventListener('click', () => {
    moveToNext();
    resetAutoScroll();
});

prevBtn.addEventListener('click', () => {
    moveToPrev();
    resetAutoScroll();
});

function autoScroll() {
    moveToNext();
}

function autoScroll() {
    currentIndex++;
    moveToIndex(currentIndex);
}

function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 3000);
}

function resetAutoScroll(n) {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
    autoScrollTimeout = setTimeout(startAutoScroll, n * 1000);
}

startAutoScroll();

track.addEventListener('mouseover', () => {
    clearInterval(autoScrollInterval);
});

track.addEventListener('mouseout', () => {
    resetAutoScroll(4);
});

let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    if (difference > 50) {
        nextBtn.click();
        isDragging = false;
    } else if (difference < -50) {
        prevBtn.click();
        isDragging = false;
    }
    resetAutoScroll(4);
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

window.addEventListener('resize', () => {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);

    resetAutoScroll(1);
});

