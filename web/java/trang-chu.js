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

