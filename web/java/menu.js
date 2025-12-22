// menu.js - ĐÃ THÊM LỌC THEO VÙNG MIỀN (Bắc/Trung/Nam) + giữ nguyên tìm kiếm, phân trang, gợi ý

const searchInput = document.querySelector('.menu-search input');
const searchBtn = document.querySelector('.search-btn');
const menuRow = document.querySelector('.menu-row');
const paginationContainer = document.querySelector('.menu-pagination');
const searchContainer = document.querySelector('.menu-search');
const sidebarItems = document.querySelectorAll('.menu-sidebar li'); // Các mục sidebar

let menuItems = document.querySelectorAll('.menu-item');
let originalMenuHTML = menuRow.innerHTML;
let allItemTitles = [];
let currentPage = 1;
let currentQuery = '';
let currentRegion = 'all'; // 'all', 'mien-bac', 'mien-trung', 'mien-nam'
let currentFilteredItems = []; // Danh sách món hiện tại sau khi lọc
const itemsPerPage = 12;

// Đảm bảo container tìm kiếm có position relative
searchContainer.style.position = 'relative';

// Lấy tên món cho gợi ý
menuItems.forEach(item => {
    const title = item.querySelector('h3').textContent.trim();
    allItemTitles.push(title);
});

function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

// Hiển thị món của trang hiện tại
function displayCurrentPage() {
    menuItems.forEach(item => item.style.display = 'none');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    currentFilteredItems.slice(start, end).forEach(item => item.style.display = '');
}

// Render phân trang
function renderPagination(totalItems) {
    paginationContainer.querySelectorAll('.page-number').forEach(el => el.remove());

    const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);
    const nextBtn = paginationContainer.querySelector('.page-btn:last-of-type');
    const prevBtn = paginationContainer.querySelector('.page-btn:first-of-type');

    for (let i = 1; i <= totalPages; i++) {
        const pageNum = document.createElement('span');
        pageNum.classList.add('page-number');
        pageNum.textContent = i.toString().padStart(2, '0');
        if (i === currentPage) pageNum.classList.add('active');
        pageNum.addEventListener('click', () => {
            currentPage = i;
            displayCurrentPage();
            renderPagination(currentFilteredItems.length);
        });
        paginationContainer.insertBefore(pageNum, nextBtn);
    }

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
            renderPagination(currentFilteredItems.length);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
            renderPagination(currentFilteredItems.length);
        }
    };

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalItems === 0;
}

// Hàm lọc và hiển thị (gọi khi thay đổi vùng hoặc tìm kiếm)
function filterAndDisplay() {
    // Khôi phục HTML gốc
    menuRow.innerHTML = originalMenuHTML;
    menuItems = document.querySelectorAll('.menu-item');

    let filtered = Array.from(menuItems);

    // Lọc theo vùng miền
    if (currentRegion !== 'all') {
        filtered = filtered.filter(item => item.dataset.region === currentRegion);
    }

    // Lọc thêm theo từ khóa tìm kiếm
    if (currentQuery !== '') {
        const normQuery = normalize(currentQuery);
        filtered = filtered.filter(item => {
            const title = normalize(item.querySelector('h3').textContent);
            return title.includes(normQuery);
        });
    }

    currentFilteredItems = filtered;

    // Ẩn tất cả trước
    menuItems.forEach(item => item.style.display = 'none');

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

// ==================== SIDEBAR LỌC VÙNG ====================
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        // Xóa class active cũ
        sidebarItems.forEach(li => li.classList.remove('active'));
        // Thêm active cho cái được click
        item.classList.add('active');

        // Lấy vùng từ nội dung (hoặc dùng data attribute nếu muốn)
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

// ==================== TÌM KIẾM ====================
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

// ==================== GỢI Ý TÌM KIẾM (giữ nguyên) ====================
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
targetLi.scrollIntoView({behavior: 'smooth'});
// XỬ LÝ LINK TỪ TRANG KHÁC VỚI #HASH (ví dụ menu.html#mien-nam)
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1); // Lấy phần sau # (ví dụ "mien-nam")
    if (hash) {
        const targetLi = document.getElementById(hash);
        if (targetLi) {
            // Xóa class active cũ
            sidebarItems.forEach(li => li.classList.remove('active'));
            
            // Thêm active cho mục mới → sáng đỏ + nền xám như ảnh
            targetLi.classList.add('active');
            
            // Set vùng lọc đúng
            if (hash === 'tat-ca') {
                currentRegion = 'all';
            } else if (hash === 'mien-bac') {
                currentRegion = 'mien-bac';
            } else if (hash === 'mien-trung') {
                currentRegion = 'mien-trung';
            } else if (hash === 'mien-nam') {
                currentRegion = 'mien-nam';
            }
            
            // Lọc và hiển thị món ăn tương ứng
            filterAndDisplay();
        }
    }
});
// Khởi động: hiển thị tất cả + active "Tất cả"
filterAndDisplay();
document.querySelector('.menu-sidebar li.active')?.classList.remove('active');
document.querySelector('.menu-sidebar li:first-child').classList.add('active');
