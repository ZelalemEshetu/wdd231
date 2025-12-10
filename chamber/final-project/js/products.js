// products.js

const products = [
    { name: "Cafe Aroma", desc: "A cozy coffee shop with pastries", category: "Food & Drink", price: "$", stock: "Open", image: "images/business1.jpg" },
    { name: "Tech Solutions", desc: "IT and software services", category: "Services", price: "$$", stock: "Available", image: "images/business2.jpg" },
    { name: "Book World", desc: "Books and stationery store", category: "Retail", price: "$", stock: "Available", image: "images/business3.jpg" },
    { name: "Fresh Mart", desc: "Grocery and daily essentials", category: "Retail", price: "$$", stock: "Open", image: "images/business4.jpg" },
    { name: "Edu Center", desc: "Tutoring and training services", category: "Education", price: "$$$", stock: "Open", image: "images/business5.jpg" },
    { name: "Healthy Bites", desc: "Organic food and drinks", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business6.jpg" },
    { name: "Office Supplies Co.", desc: "Office equipment and supplies", category: "Retail", price: "$", stock: "Available", image: "images/business7.jpg" },
    { name: "Green Garden", desc: "Landscaping and gardening services", category: "Services", price: "$$", stock: "Available", image: "images/business8.jpg" },
    { name: "Fitness Hub", desc: "Gym and personal training", category: "Services", price: "$$$", stock: "Open", image: "images/business9.jpg" },
    { name: "Bakery Bliss", desc: "Fresh baked goods daily", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business10.jpg" },
    { name: "Tech Repair", desc: "Laptop and mobile repairs", category: "Services", price: "$$", stock: "Available", image: "images/business11.jpg" },
    { name: "Fashion Lane", desc: "Clothing and accessories store", category: "Retail", price: "$$", stock: "Available", image: "images/business12.jpg" },
    { name: "Language School", desc: "Learn English and other languages", category: "Education", price: "$$$", stock: "Open", image: "images/business13.jpg" },
    { name: "Coffee Corner", desc: "Specialty coffee and snacks", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business14.jpg" },
    { name: "Digital Media Co.", desc: "Marketing and media services", category: "Services", price: "$$$", stock: "Available", image: "images/business15.jpg" }
];

// DOM references
const grid = document.getElementById('productGrid');
const template = document.getElementById('productTemplate');

// Render function
function renderProducts(list) {
    grid.innerHTML = '';
    list.forEach(p => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.p-name').textContent = p.name;
        clone.querySelector('.p-desc').textContent = p.desc;
        clone.querySelector('.p-category').textContent = p.category;
        clone.querySelector('.p-price').textContent = p.price;
        clone.querySelector('.p-stock').textContent = p.stock;
        clone.querySelector('.p-image').src = p.image;
        clone.querySelector('.p-image').alt = p.name + " image";
        grid.appendChild(clone);
    });
}

// Initial render
renderProducts(products);

// Filter by search input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(query)));
});
