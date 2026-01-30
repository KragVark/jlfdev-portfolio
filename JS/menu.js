// =========================
// MOBILE SIDE MENU
// =========================
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (!menu) return;

    menu.style.width = menu.style.width === "250px" ? "0" : "250px";
}
