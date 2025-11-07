// ===== Year and Last Modified =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified || "Not available";

// ===== Mobile Navigation Toggle =====
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("primary-nav");
menuBtn.addEventListener("click", () => {
    const opened = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", opened);
});

// ===== Courses Data =====
const courses = [
    { code: "CSS111", name: "Intro to CSS", credits: 3, subject: "CSS", completed: true },
    { code: "CSS220", name: "Advanced CSS", credits: 3, subject: "CSS", completed: true },
    { code: "WDD130", name: "Web Development Basics", credits: 3, subject: "WDD", completed: true },
    { code: "WDD131", name: "Frontend Development I", credits: 3, subject: "WDD", completed: true },
    { code: "WDD132", name: "Frontend Development II", credits: 3, subject: "WDD", completed: false },
    { code: "CSE210", name: "Programming with Classes", credits: 3, subject: "CSE", completed: false }
];

// ===== Display Courses =====
const courseList = document.getElementById("course-list");
const creditsSpan = document.getElementById("credits");

function displayCourses(list) {
    courseList.innerHTML = list.map(c => `
        <li class="${c.completed ? "done" : ""}">
            ${c.code} - ${c.name} (${c.credits} credits)
        </li>
    `).join("");
}

function updateCredits(list) {
    const total = list.reduce((sum, c) => sum + c.credits, 0);
    creditsSpan.textContent = total;
}

// ===== Filter Buttons =====
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const subject = btn.dataset.subject;
        const filtered = subject === "All" ? courses : courses.filter(c => c.subject === subject);
        displayCourses(filtered);
        updateCredits(filtered);
    });
});

// ===== Initial Load =====
displayCourses(courses);
updateCredits(courses);
