// =========================
// DETAILS PARTICLES (DOTS + LINES + MOUSE REPEL)
// =========================
(function initDetailsParticles() {
    const canvas = document.getElementById("detailsCanvas");
    const section = document.querySelector(".details-section");
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    const mouse = { x: null, y: null, radius: 140 };

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // Track mouse ON SECTION (not canvas)
    section.addEventListener("mousemove", e => {
        const rect = section.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    section.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    const COUNT = Math.floor((canvas.width * canvas.height) / 12000);

    const points = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        points.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Mouse repulsion
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.vx += (dx / dist) * force * 0.1;
                    p.vy += (dy / dist) * force * 0.1;
                }
            }

            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#00bcd4";
            ctx.fill();
        });

        // Draw connecting lines
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.strokeStyle = `rgba(0,188,212,${1 - dist / 120})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
