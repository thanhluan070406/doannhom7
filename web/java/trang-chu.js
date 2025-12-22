let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function capNhatSlide() {
    slides.forEach(s => s.classList.remove("active"));
    slides[slideIndex].classList.add("active");
}

function chuyenSlideTiep() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    capNhatSlide();
}

document.addEventListener("DOMContentLoaded", function() {
    capNhatSlide(); 
    setInterval(chuyenSlideTiep, 6000); 
});


function denSlide(n) {
    slideIndex = n;
    capNhatSlide();
}

/* ======================== RESPONSIVE MENU & TOP-BAR ======================== */
document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('.menu-overlay').classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

document.querySelector('.menu-overlay').addEventListener('click', function() {
  document.querySelector('nav').classList.remove('active');
  this.classList.remove('active');
  document.body.classList.remove('menu-open');
});


// ======================== REVIEW SLIDER MỚI ========================
let currentReview = 0;
const reviewCards = document.querySelectorAll('.review-card');
const reviewDots = document.querySelectorAll('.r-dot');
const totalReviews = reviewCards.length;

if (totalReviews > 0) {  
    function showReview(index) {
        reviewCards.forEach(card => card.classList.remove('active'));
        reviewDots.forEach(dot => dot.classList.remove('active'));
        
        reviewCards[index].classList.add('active');
        reviewDots[index].classList.add('active');
    }

    function nextReview() {
        currentReview = (currentReview + 1) % totalReviews;
        showReview(currentReview);
    }

    setInterval(nextReview, 10000);

    const leftArrow = document.querySelector('.review-arrow.left');
    const rightArrow = document.querySelector('.review-arrow.right');

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            currentReview = (currentReview - 1 + totalReviews) % totalReviews;
            showReview(currentReview);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', nextReview);
    }

    showReview(0);
}


// ==================== CAROUSEL RESPONSIVE HOÀN HẢO - KHÔNG MẤT MÓN KHI CUỘN/RESIZE ====================
document.querySelectorAll('.PHAI').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const items = Array.from(track.querySelectorAll('.MUC')); 
    const leftBtn = container.querySelector('.phai-arrow.left');
    const rightBtn = container.querySelector('.phai-arrow.right');

    let currentIndex = 0;

    function getVisibleItems() {
        if (!items.length) return 1;
        const containerWidth = container.offsetWidth;
        const itemWidth = items[0].offsetWidth + 10; 
        return Math.round(containerWidth / itemWidth);
    }

    function updateCarousel() {
        if (!items.length) return;

        const visibleItems = getVisibleItems();
        const itemWidth = items[0].offsetWidth + 10;
        const maxIndex = Math.max(0, items.length - visibleItems);

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;


        if (items.length <= visibleItems) {
            if (leftBtn) leftBtn.style.display = 'none';
            if (rightBtn) rightBtn.style.display = 'none';
        } else {
            if (leftBtn) leftBtn.style.display = '';
            if (rightBtn) rightBtn.style.display = '';

            leftBtn.style.opacity = currentIndex === 0 ? '0' : '';
            leftBtn.style.pointerEvents = currentIndex === 0 ? 'none' : '';

            rightBtn.style.opacity = currentIndex >= maxIndex ? '0' : '';
            rightBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : '';
        }
    }

    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            const maxIndex = Math.max(0, items.length - visibleItems);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    window.addEventListener('resize', () => {
        currentIndex = 0; 
        updateCarousel();
    });

    updateCarousel();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 300);
    });
});