// products.js (ES module) - dynamic data, fetch local JSON, async/try/catch
const grid = document.getElementById('productGrid');
const template = document.getElementById('productTemplate');
const search = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');

let products = [];

async function fetchProducts() {
    try {
        const res = await fetch('../data/products.json');
        if (!res.ok) throw new Error('Network response not OK');
        products = await res.json();
        renderProducts(products);
        populateCategories(products);
    } catch (err) {
        console.error('Failed to load products', err);
        grid.innerHTML = '<p class="card">Could not load directory.</p>';
    }
}

function renderProducts(list) {
    grid.innerHTML = '';
    list.forEach(p => {
        const node = template.content.cloneNode(true);
        node.querySelector('.p-name').textContent = p.name;
        node.querySelector('.p-desc').textContent = p.description;
        node.querySelector('.p-category').textContent = p.category;
        node.querySelector('.p-price').textContent = `$${p.price.toFixed(2)}`;
        node.querySelector('.p-stock').textContent = p.stock;
        node.querySelector('.view-more').addEventListener('click', () => {
            // open quick modal or alert
            alert(`${p.name}\nCategory: ${p.category}\nPrice: $${p.price}\nContact: ${p.contact}`);
        });
        grid.appendChild(node);
    });
}

function populateCategories(list) {
    const cats = Array.from(new Set(list.map(p => p.category)));
    cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        categoryFilter.appendChild(opt);
    });
}

function initSearch() {
    search?.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        const filtered = products.filter(p => {
            return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        });
        renderProducts(filtered);
    });

    categoryFilter?.addEventListener('change', () => {
        const cat = categoryFilter.value;
        const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
        renderProducts(filtered);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    initSearch();
});
