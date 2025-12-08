// menu.js
export function initMenu() {
    const hamb = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    if (!hamb || !nav) return;
    hamb.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // wayfinding: add .active based on pathname
    const links = nav.querySelectorAll('a');
    links.forEach(a => {
        if (a.getAttribute('href') === location.pathname.split('/').pop() || (location.pathname.endsWith('/') && a.getAttribute('href') === 'index.html')) {
            a.classList.add('active');
        }
    });
}
