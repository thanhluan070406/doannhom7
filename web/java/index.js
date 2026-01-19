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
/* ======================== RESPONSIVE MENU ======================== */

// Mở menu khi click hamburger
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
  
  // Đóng tất cả submenu
  document.querySelectorAll('.has-submenu').forEach(function(item) {
    item.classList.remove('active');
  });
});

// Đóng menu khi click nút X
const closeBtn = document.querySelector('.close-menu');
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    document.querySelector('nav').classList.remove('active');
    document.querySelector('.menu-overlay').classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Đóng tất cả submenu
    document.querySelectorAll('.has-submenu').forEach(function(item) {
      item.classList.remove('active');
    });
  });
}

// HOVER để hiện/ẩn submenu (chỉ mobile)
document.querySelectorAll('.has-submenu').forEach(function(menuItem) {
  const link = menuItem.querySelector('a');
  const submenu = menuItem.querySelector('.submenu');
  
  // Hover vào menu item
  menuItem.addEventListener('mouseenter', function() {
    if (window.innerWidth <= 768) {
      this.classList.add('active');
    }
  });
  
  // Rời chuột khỏi menu item (bao gồm cả submenu)
  menuItem.addEventListener('mouseleave', function() {
    if (window.innerWidth <= 768) {
      this.classList.remove('active');
    }
  });
  
  // Click vào link (cho mobile touch và desktop)
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      
      const parent = this.parentElement;
      
      // Đóng tất cả submenu khác
      document.querySelectorAll('.has-submenu').forEach(function(item) {
        if (item !== parent) {
          item.classList.remove('active');
        }
      });
      
      // Toggle submenu hiện tại
      parent.classList.toggle('active');
    }
  });
});

// Xử lý khi resize window
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (window.innerWidth > 768) {
      // Desktop: đóng menu mobile nếu đang mở
      document.querySelector('nav').classList.remove('active');
      document.querySelector('.menu-overlay').classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Xóa active class khỏi submenu
      document.querySelectorAll('.has-submenu').forEach(function(item) {
        item.classList.remove('active');
      });
    }
  }, 250);
});

/* ================= JS KÍCH HOẠT HIỆU ỨNG WELCOME ================= */

document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-img');

    // Thiết lập Intersection Observer (Người theo dõi khung hình)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Khi thấy 15% của phần tử thì bắt đầu hiệu ứng
    });

    // 3. Bắt đầu theo dõi
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    
    
    const targetElements = document.querySelectorAll(
        '.reveal-text, .reveal-img, .hero-title, .hero-description, .MUC, .reveal-up'
    );

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
        
                entry.target.classList.add('active');
            
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    });

    // BẮT ĐẦU GẮN CAMERA VÀO TỪNG PHẦN TỬ
    targetElements.forEach(el => {
        observer.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", function() {
        const cacPhanTu = document.querySelectorAll('.hieu-ung-luot');


        const boQuanSat = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('len-hinh');
                    boQuanSat.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });

        cacPhanTu.forEach(el => {
            boQuanSat.observe(el);
        });
    });


    