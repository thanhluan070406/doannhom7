/* ======================== RESPONSIVE MENU ======================== */

document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('.menu-overlay').classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

document.querySelector('.menu-overlay').addEventListener('click', function() {
  document.querySelector('nav').classList.remove('active');
  this.classList.remove('active');
  document.body.classList.remove('menu-open');

  document.querySelectorAll('.has-submenu').forEach(function(item) {
    item.classList.remove('active');
  });
});

const closeBtn = document.querySelector('.close-menu');
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    document.querySelector('nav').classList.remove('active');
    document.querySelector('.menu-overlay').classList.remove('active');
    document.body.classList.remove('menu-open');

    document.querySelectorAll('.has-submenu').forEach(function(item) {
      item.classList.remove('active');
    });
  });
}

document.querySelectorAll('.has-submenu').forEach(function(menuItem) {
  const link = menuItem.querySelector('a');
  const submenu = menuItem.querySelector('.submenu');

  menuItem.addEventListener('mouseenter', function() {
    if (window.innerWidth <= 768) {
      this.classList.add('active');
    }
  });
  
  menuItem.addEventListener('mouseleave', function() {
    if (window.innerWidth <= 768) {
      this.classList.remove('active');
    }
  });
  
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      
      const parent = this.parentElement;
      
      document.querySelectorAll('.has-submenu').forEach(function(item) {
        if (item !== parent) {
          item.classList.remove('active');
        }
      });
      
      parent.classList.toggle('active');
    }
  });
});

let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (window.innerWidth > 768) {
      document.querySelector('nav').classList.remove('active');
      document.querySelector('.menu-overlay').classList.remove('active');
      document.body.classList.remove('menu-open');
    
      document.querySelectorAll('.has-submenu').forEach(function(item) {
        item.classList.remove('active');
      });
    }
  }, 250);
});


// menu.js - ĐÃ FIX RESPONSIVE PHÂN TRANG + LỌC VÙNG + TÌM KIẾM
const searchInput = document.querySelector('.menu-search input');
const searchBtn = document.querySelector('.search-btn');
const menuRow = document.querySelector('.menu-row');
const paginationContainer = document.querySelector('.menu-pagination');
const searchContainer = document.querySelector('.menu-search');
const sidebarItems = document.querySelectorAll('.menu-sidebar li');

let menuItems = document.querySelectorAll('.menu-item');
let originalMenuHTML = menuRow.innerHTML;
let allItemTitles = [];
let currentPage = 1;
let currentQuery = '';
let currentRegion = 'all';
let currentFilteredItems = [];

function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 480) {
        return 8;   
    } else if (width <= 767) {
        return 12;  
    } else if (width <= 1024) {
        return 8;   
    } else {
        return 12;  
    }
}

let itemsPerPage = getItemsPerPage();

menuItems.forEach(item => {
    const title = item.querySelector('h3').textContent.trim();
    allItemTitles.push(title);
});

function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}
function displayCurrentPage() {
  
    menuItems.forEach(item => {
        item.style.display = 'none';
        item.style.animationName = 'none'; 
    });

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const itemsToShow = currentFilteredItems.slice(start, end);

    itemsToShow.forEach((item, index) => {
        item.style.display = 'block';

        let delayTime = 0.1 + (index * 0.05);
        item.style.animationDelay = delayTime + 's';

        void item.offsetWidth; 
        item.style.animationName = 'fadeInUp'; 
    });
}

function renderPagination(totalItems) {
    paginationContainer.querySelectorAll('.page-number').forEach(el => el.remove());

    const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);
    const nextBtn = paginationContainer.querySelector('.page-btn:last-of-type');
    const prevBtn = paginationContainer.querySelector('.page-btn:first-of-type');

    const goToPage = (page) => {
        currentPage = page;
        displayCurrentPage();
        renderPagination(currentFilteredItems.length);

        const topBar = document.querySelector('.top-content-bar');
        if (topBar) {
            topBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    for (let i = 1; i <= totalPages; i++) {
        const pageNum = document.createElement('span');
        pageNum.classList.add('page-number');
        pageNum.textContent = i.toString().padStart(2, '0');
        if (i === currentPage) pageNum.classList.add('active');

        pageNum.addEventListener('click', () => goToPage(i));
        
        paginationContainer.insertBefore(pageNum, nextBtn);
    }


    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    
    newPrevBtn.onclick = () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    };
    newPrevBtn.disabled = currentPage === 1;

    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newNextBtn.onclick = () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    };
    newNextBtn.disabled = currentPage === totalPages || totalItems === 0;
}

function filterAndDisplay() {
    menuRow.innerHTML = originalMenuHTML;
    menuItems = document.querySelectorAll('.menu-item');

    let filtered = Array.from(menuItems);

    // Lọc theo vùng
    if (currentRegion !== 'all') {
        filtered = filtered.filter(item => item.dataset.region === currentRegion);
    }

    // Lọc theo tìm kiếm
    if (currentQuery !== '') {
        const normQuery = normalize(currentQuery);
        filtered = filtered.filter(item => {
            const title = normalize(item.querySelector('h3').textContent);
            return title.includes(normQuery);
        });
    }

    currentFilteredItems = filtered;

    // Nếu không có kết quả
    if (currentFilteredItems.length === 0) {
        menuRow.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; font-size: 20px; color: #999;">
                Không tìm thấy món ăn nào phù hợp 😔<br>
                <small style="font-size: 16px; color: #aaa;">Hãy thử danh mục hoặc từ khóa khác nhé!</small>
            </p>`;
        renderPagination(0);
        return;
    }

    currentPage = 1;
    displayCurrentPage();
    renderPagination(currentFilteredItems.length);
}

// Sidebar lọc vùng
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        const text = item.textContent.trim().toLowerCase();
        if (text === 'tất cả') {
            currentRegion = 'all';
        } else if (text.includes('bắc')) {
            currentRegion = 'mien-bac';
        } else if (text.includes('trung')) {
            currentRegion = 'mien-trung';
        } else if (text.includes('nam')) {
            currentRegion = 'mien-nam';
        }

        filterAndDisplay();
    });
});

// Tìm kiếm
function performSearch(query) {
    currentQuery = query.trim();
    filterAndDisplay();
}

searchBtn.addEventListener('click', () => performSearch(searchInput.value));
searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') performSearch(searchInput.value);
});
searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim();
    showSuggestions(value);
    if (value === '' && currentQuery !== '') {
        performSearch('');
    }
});

// Gợi ý tìm kiếm
function showSuggestions(query) {
    removeSuggestions();
    if (!query) return;

    const normQuery = normalize(query);
    const suggestions = allItemTitles.filter(title => normalize(title).includes(normQuery)).slice(0, 5);
    if (suggestions.length === 0) return;

    const suggestionBox = document.createElement('div');
    suggestionBox.classList.add('search-suggestions');
    suggestionBox.style.position = 'absolute';
    suggestionBox.style.top = '100%';
    suggestionBox.style.left = '0';
    suggestionBox.style.right = '0';
    suggestionBox.style.background = '#fff';
    suggestionBox.style.border = '1px solid #ddd';
    suggestionBox.style.borderTop = 'none';
    suggestionBox.style.borderRadius = '0 0 15px 15px';
    suggestionBox.style.maxHeight = '200px';
    suggestionBox.style.overflowY = 'auto';
    suggestionBox.style.zIndex = '1000';
    suggestionBox.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';

    suggestions.forEach(suggest => {
        const div = document.createElement('div');
        div.textContent = suggest;
        div.style.padding = '12px 15px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid #eee';
        div.addEventListener('mouseover', () => div.style.background = '#f5f5f5');
        div.addEventListener('mouseout', () => div.style.background = '#fff');
        div.addEventListener('click', () => {
            searchInput.value = suggest;
            performSearch(suggest);
            removeSuggestions();
        });
        suggestionBox.appendChild(div);
    });

    searchContainer.appendChild(suggestionBox);
}

function removeSuggestions() {
    const existing = document.querySelector('.search-suggestions');
    if (existing) existing.remove();
}

document.addEventListener('click', e => {
    if (!searchContainer.contains(e.target)) removeSuggestions();
});


// Cập nhật lại khi thay đổi kích thước màn hình
window.addEventListener('resize', () => {
    const newItemsPerPage = getItemsPerPage();
    if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        currentPage = 1;
        displayCurrentPage();
        renderPagination(currentFilteredItems.length);
    }
});

filterAndDisplay();


// ==================== MOBILE DRAWER SIDEBAR ====================
const openDrawerBtn = document.getElementById('openDrawer');
const closeDrawerBtn = document.getElementById('closeDrawer');
const mobileSidebar = document.getElementById('mobileSidebar');
const drawerOverlay = document.createElement('div');
drawerOverlay.classList.add('drawer-overlay');
document.body.appendChild(drawerOverlay);

function openMobileSidebar() {
    mobileSidebar.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeMobileSidebar() {
    mobileSidebar.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

openDrawerBtn.addEventListener('click', openMobileSidebar);
closeDrawerBtn.addEventListener('click', closeMobileSidebar);
drawerOverlay.addEventListener('click', closeMobileSidebar);

document.querySelectorAll('.mobile-sidebar-drawer li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.mobile-sidebar-drawer li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        const text = item.textContent.trim().toLowerCase();
        if (text === 'tất cả') {
            currentRegion = 'all';
        } else if (text.includes('bắc')) {
            currentRegion = 'mien-bac';
        } else if (text.includes('trung')) {
            currentRegion = 'mien-trung';
        } else if (text.includes('nam')) {
            currentRegion = 'mien-nam';
        }

        filterAndDisplay();
        closeMobileSidebar();
    });
});

// XỬ LÝ LINK TỪ TRANG KHÁC VỚI #HASH (ví dụ menu.html#mien-nam)
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1); 
    if (hash) {
        const targetLi = document.getElementById(hash);
        if (targetLi) {
    
            sidebarItems.forEach(li => li.classList.remove('active'));
     
            targetLi.classList.add('active');
            
            if (hash === 'tat-ca') {
                currentRegion = 'all';
            } else if (hash === 'mien-bac') {
                currentRegion = 'mien-bac';
            } else if (hash === 'mien-trung') {
                currentRegion = 'mien-trung';
            } else if (hash === 'mien-nam') {
                currentRegion = 'mien-nam';
            }
            
            filterAndDisplay();
        }
    }
});


filterAndDisplay();
document.querySelector('.menu-sidebar li.active')?.classList.remove('active');
document.querySelector('.menu-sidebar li:first-child').classList.add('active');

// ================= SCROLL REVEAL CHO CHEF =================

document.addEventListener("DOMContentLoaded", function() {
    // 1. Chọn phần tử Chef (Ảnh & Chữ)
    const chefElements = document.querySelectorAll('.chef-visual, .chef-info');

    // 2. Tạo Camera quan sát
    const chefObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class active để kích hoạt hiệu ứng bay vào
                entry.target.classList.add('active');
                
                // Xong nhiệm vụ thì nghỉ
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2, // Hiện 20% là bắt đầu chạy
        rootMargin: "0px 0px -50px 0px"
    });

    // 3. Bắt đầu theo dõi
    chefElements.forEach(el => {
        chefObserver.observe(el);
    });
});