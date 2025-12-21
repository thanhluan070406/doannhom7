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