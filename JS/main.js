// =========================
// BACK TO TOP BUTTON
// =========================
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Hide scroll indicator after user scrolls
const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
    window.addEventListener("scroll", () => {
        scrollIndicator.style.opacity = window.scrollY > 50 ? "0" : "1";
    });
}

// =========================
// CONTACT FORM (AJAX SUBMIT)
// =========================
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

if (contactForm && sendBtn) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        sendBtn.classList.add("sending");

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                sendBtn.classList.remove("sending");
                sendBtn.classList.add("sent");
                contactForm.reset();
            } else {
                throw new Error();
            }

        } catch {
            sendBtn.classList.remove("sending");
            sendBtn.innerText = "Error — Try Again";
        }
    });
}
