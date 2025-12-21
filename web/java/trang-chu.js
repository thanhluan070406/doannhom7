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

// ================= SLIDE PHẦN TINH HOA =================
document.querySelectorAll(".KHUNG").forEach(khung => {

    const phai = khung.querySelector(".PHAI");
    const leftBtn = khung.querySelector(".phai-arrow.left");
    const rightBtn = khung.querySelector(".phai-arrow.right");

    // Click qua phải
    rightBtn.addEventListener("click", () => {
        const first = phai.querySelector(".MUC");
        phai.appendChild(first); // đẩy cái đầu xuống cuối
    });

    // Click qua trái
    leftBtn.addEventListener("click", () => {
        const items = phai.querySelectorAll(".MUC");
        const last = items[items.length - 1];
        phai.prepend(last); // kéo cái cuối lên đầu
    });

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