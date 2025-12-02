// Insert timestamp into hidden input
document.addEventListener("DOMContentLoaded", () => {
    const ts = document.getElementById("timestamp");
    ts.value = new Date().toISOString();
});
