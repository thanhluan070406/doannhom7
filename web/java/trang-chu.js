let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".cham");

function capNhatSlide() {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(c => c.classList.remove("active"));

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

function chuyenSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;
    capNhatSlide();
}

function denSlide(n) {
    slideIndex = n;
    capNhatSlide();
}
