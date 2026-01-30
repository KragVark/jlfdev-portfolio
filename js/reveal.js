// =========================
// SCROLL REVEAL
// =========================
function scrollReveal() {
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-up")
        .forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("active");
            }
        });
}

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

// =========================
// TIMELINE SCROLL SYNC
// =========================
(function initTimelineScrollSync() {

    const timeline = document.querySelector(".journey-timeline");
    const items = document.querySelectorAll(".journey-item");

    if (!timeline || !items.length) return;

    function onScroll() {
        const timelineRect = timeline.getBoundingClientRect();

        // Activate center line when visible
        if (timelineRect.top < window.innerHeight * 0.6 &&
            timelineRect.bottom > window.innerHeight * 0.2) {
            timeline.classList.add("active");
        } else {
            timeline.classList.remove("active");
        }

        // Activate individual items
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.6 &&
                rect.bottom > window.innerHeight * 0.3) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);

})();
