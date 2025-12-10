// script.js

// Show a welcome alert when the page loads
window.addEventListener('DOMContentLoaded', () => {
    alert('Welcome to Zelalem Chamber!');
});

// Example: Toggle a class on a button click
const toggleButton = document.querySelector('#toggle-button'); // make sure you have a button with id="toggle-button"
const box = document.querySelector('#box'); // an element to show/hide

if (toggleButton && box) {
    toggleButton.addEventListener('click', () => {
        box.classList.toggle('active');
    });
}

// Example: Log to console
console.log('script.js is loaded successfully!');
