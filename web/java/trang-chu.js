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
