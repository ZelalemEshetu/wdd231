// products.js

const products = [
    { name: "Cafe Aroma", desc: "A cozy coffee shop with pastries", category: "Food & Drink", price: "$", stock: "Open", image: "images/business1.jpeg" },
    { name: "Tech Solutions", desc: "IT and software services", category: "Services", price: "$$", stock: "Available", image: "images/business2.jpeg" },
    { name: "Book World", desc: "Books and stationery store", category: "Retail", price: "$", stock: "Available", image: "images/business3.jpeg" },
    { name: "Fresh Mart", desc: "Grocery and daily essentials", category: "Retail", price: "$$", stock: "Open", image: "images/business4.jpeg" },
    { name: "Edu Center", desc: "Tutoring and training services", category: "Education", price: "$$$", stock: "Open", image: "images/business5.jpeg" },
    { name: "Healthy Bites", desc: "Organic food and drinks", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business6.jpeg" },
    { name: "Office Supplies Co.", desc: "Office equipment and supplies", category: "Retail", price: "$", stock: "Available", image: "images/business7.jpeg" },
    { name: "Green Garden", desc: "Landscaping and gardening services", category: "Services", price: "$$", stock: "Available", image: "images/business8.jpeg" },
    { name: "Fitness Hub", desc: "Gym and personal training", category: "Services", price: "$$$", stock: "Open", image: "images/business9.jpeg" },
    { name: "Bakery Bliss", desc: "Fresh baked goods daily", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business10.jpeg" },
    { name: "Tech Repair", desc: "Laptop and mobile repairs", category: "Services", price: "$$", stock: "Available", image: "images/business11.jpeg" },
    { name: "Fashion Lane", desc: "", category: "Retail", price: "$$", stock: "Available", image: "images/business12.jpeg" },
    { name: "Language School", desc: "Learn English and other languages", category: "Education", price: "$$$", stock: "Open", image: "images/business13.jpeg" },
    { name: "Coffee Corner", desc: "Specialty coffeeClothing and accessories store and snacks", category: "Food & Drink", price: "$$", stock: "Open", image: "images/business14.jpeg" },
    { name: "Digital Media Co.", desc: "Marketing and media services", category: "Services", price: "$$$", stock: "Available", image: "images/business15.jpeg" }
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
