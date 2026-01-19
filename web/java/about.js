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