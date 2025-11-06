// Year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified || "Not available";

// Mobile nav toggle
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("primary-nav");
menuBtn.addEventListener("click", () => {
    const opened = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", opened);
});
