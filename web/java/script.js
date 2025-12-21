let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

function nextSlide() {
    index++;  
    if (index >= slides.length) index = 0;
    showSlide(index);
}

function prevSlide() {
    index--;  
    if (index < 0) index = slides.length - 1;
    showSlide(index);
}

function goToSlide(i) {
    index = i;
    showSlide(index);
}
function toggleHeart(el) {
    el.classList.toggle("active");
}

/* ======================= REVIEW SLIDER ======================= */
let rIndex = 0;
const reviews = document.querySelectorAll(".review");
const rDots = document.querySelectorAll(".r-dot");

function showReview(i) {
    reviews.forEach(r => r.classList.remove("active"));
    rDots.forEach(d => d.classList.remove("active"));

    reviews[i].classList.add("active");
    rDots[i].classList.add("active");
}

function nextReview() {
    rIndex++;
    if (rIndex >= reviews.length) rIndex = 0;
    showReview(rIndex);
}

function prevReview() {
    rIndex--;
    if (rIndex < 0) rIndex = reviews.length - 1;
    showReview(rIndex);
}

function goToReview(i) {
    rIndex = i;
    showReview(rIndex);
}

/* KHỞI TẠO ĐÚNG SLIDE ĐẦU */
document.addEventListener("DOMContentLoaded", () => {
    showReview(0);
});

/* AUTO CHUYỂN SLIDE */
setInterval(nextReview, 6000);

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