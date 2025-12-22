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

// Khởi động tự động
document.addEventListener("DOMContentLoaded", function() {
    capNhatSlide(); // Hiển thị slide đầu tiên
    setInterval(chuyenSlideTiep, 6000); // Chuyển slide mỗi 6 giây
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

// Đóng menu khi click overlay
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

if (totalReviews > 0) {  // Chỉ chạy nếu có review
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

    // Auto play mỗi 6 giây (giữ nguyên tự động chuyển)
    setInterval(nextReview, 10000);

    // Click arrows (giữ nguyên nút trái/phải hoạt động)
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

    // Hiển thị review đầu tiên ngay khi load
    showReview(0);
}


// ==================== CAROUSEL CHO CÁC VÙNG MIỀN (ĐÃ CẬP NHẬT ẨN NÚT KHI ĐẾN ĐẦU/CUỐI) ====================
document.querySelectorAll('.PHAI').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const items = track.querySelectorAll('.MUC');
    const leftBtn = container.querySelector('.phai-arrow.left');
    const rightBtn = container.querySelector('.phai-arrow.right');

    // Nếu tổng món ≤ 4 thì ẩn luôn cả 2 nút
    if (items.length <= 4) {
        if (leftBtn) leftBtn.style.display = 'none';
        if (rightBtn) rightBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;
    const visibleItems = 4;
    const totalItems = items.length;

    function updateCarousel() {
        const itemWidth = items[0].offsetWidth + 10; // width + gap 10px
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Ẩn/hiện nút trái
        if (currentIndex === 0) {
            leftBtn.style.opacity = '0';
            leftBtn.style.pointerEvents = 'none'; // không click được
        } else {
            leftBtn.style.opacity = '';
            leftBtn.style.pointerEvents = '';
        }

        // Ẩn/hiện nút phải
        if (currentIndex >= totalItems - visibleItems) {
            rightBtn.style.opacity = '0';
            rightBtn.style.pointerEvents = 'none';
        } else {
            rightBtn.style.opacity = '';
            rightBtn.style.pointerEvents = '';
        }
    }

    // Click nút phải
    rightBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Click nút trái
    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Cập nhật lại khi resize màn hình (rất quan trọng)
    window.addEventListener('resize', updateCarousel);

    // Khởi tạo lần đầu
    updateCarousel();
});