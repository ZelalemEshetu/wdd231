document.addEventListener("DOMContentLoaded", () => {
    // Timestamp
    const ts = document.getElementById("timestamp");
    if (ts) ts.value = new Date().toISOString();

    // Modal functionality
    let lastFocused = null;

    function openModal(id, trigger) {
        const modal = document.getElementById(id);
        if (!modal) return;
        lastFocused = trigger || document.activeElement;
        modal.setAttribute("aria-hidden", "false");
        const box = modal.querySelector(".modal-box");
        if (box) box.focus();
        history.pushState(null, "", "#" + id);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.setAttribute("aria-hidden", "true");
        if (location.hash === "#" + modal.id) {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll("a[href^='#']").forEach(a => {
        const id = a.getAttribute("href").slice(1);
        const modal = document.getElementById(id);
        if (modal) {
            a.addEventListener("click", e => {
                e.preventDefault();
                openModal(id, a);
            });
        }
    });

    document.addEventListener("click", e => {
        const close = e.target.closest("[data-close]");
        if (close) {
            const modal = close.closest(".modal");
            closeModal(modal);
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            const modal = document.querySelector(".modal[aria-hidden='false']");
            closeModal(modal);
        }
    });

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeModal(modal);
        });
    });

});
