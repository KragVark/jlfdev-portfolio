// =========================
// TYPING / ERASING TEXT
// =========================

const roles = [
    "Frontend Developer",
    "Web Designer",
    "Backend Developer",
    "Full Stack Developer"
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;

const typingEl = document.getElementById("typingText");

function typeEffect() {
    if (!typingEl) return;

    const current = roles[roleIndex];

    if (typing) {
        typingEl.textContent = current.slice(0, charIndex++);
        if (charIndex > current.length + 10) typing = false;
    } else {
        typingEl.textContent = current.slice(0, charIndex--);
        if (charIndex < 0) {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, typing ? 180 : 50);
}

typeEffect();
