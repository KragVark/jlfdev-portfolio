// =====================================================
// PARTICLES (PORTFOLIO HERO): DOTS + LINES + MOUSE REPEL
// File: JS/particles-journey.js
// =====================================================
(() => {
  const canvas = document.getElementById("journeyCanvas");
  const wrapper = document.querySelector(".portfolio-hero"); // hero section wrapper
  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext("2d");
  const mouse = { x: null, y: null, radius: 140 };

  let points = [];
  let COUNT = 0;

  // --- Helpers ---
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    // Match canvas to wrapper size (NOT window size)
    canvas.width = Math.floor(wrapper.offsetWidth);
    canvas.height = Math.floor(wrapper.offsetHeight);

    // Recalculate density based on area
    COUNT = Math.max(50, Math.floor((canvas.width * canvas.height) / 12000));

    // Rebuild points so they fill the new canvas size properly
    points = Array.from({ length: COUNT }, () => ({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35),
    }));
  }

  // --- Mouse tracking ---
  // IMPORTANT: canvas has pointer-events:none in CSS, so we listen on the wrapper
  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  wrapper.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", resize);
  resize();

  // --- Animation loop ---
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update + draw dots
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce edges
      if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

      // Mouse repeller
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Small push so it looks smooth (not chaotic)
          p.vx += (dx / dist) * force * 0.12;
          p.vy += (dy / dist) * force * 0.12;
        }
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "#00bcd4";
      ctx.fill();
    }

    // Draw lines
    const MAX_DIST = 130;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          ctx.strokeStyle = `rgba(0,188,212,${1 - dist / MAX_DIST})`;
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

(function initPortfolioParticles() {
    const canvas = document.getElementById("portfolioCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const mouse = { x: null, y: null, radius: 140 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    canvas.addEventListener("mousemove", e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    const COUNT = Math.floor((canvas.width * canvas.height) / 14000);
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

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.vx += (dx / dist) * force * 0.2;
                    p.vy += (dy / dist) * force * 0.2;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "#00bcd4";
            ctx.fill();
        });

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

// =========================
// TIMELINE PROGRESS FILL
// =========================
(function initTimelineProgress() {

    const timeline = document.querySelector(".journey-timeline");
    if (!timeline) return;

    function updateProgress() {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.65;
        const end = windowHeight * 0.9;

        let progress = (start - rect.top) / (rect.height);
        progress = Math.max(0, Math.min(1, progress));

        timeline.style.setProperty(
            "--timeline-progress",
            `${progress * 100}%`
        );

        timeline.style.setProperty(
            "--timeline-height",
            `${progress * 100}%`
        );

        timeline.style.setProperty(
            "--fill-height",
            `${progress * 100}%`
        );

        timeline.style.setProperty("--progress", progress);
        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--fill", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-fill", `${progress * 100}%`);

        timeline.style.setProperty("--line-fill", `${progress * 100}%`);

        timeline.style.setProperty("--fill-line", `${progress * 100}%`);

        timeline.style.setProperty("--progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--height", `${progress * 100}%`);

        timeline.style.setProperty("--after", `${progress * 100}%`);

        timeline.style.setProperty("--y", `${progress * 100}%`);

        timeline.style.setProperty("--progressLine", `${progress * 100}%`);

        timeline.style.setProperty("--active-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-active", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after", `${progress * 100}%`);

        timeline.style.setProperty("--h", `${progress * 100}%`);

        timeline.style.setProperty("--percent", `${progress * 100}%`);

        timeline.style.setProperty("--value", `${progress * 100}%`);

        timeline.style.setProperty("--size", `${progress * 100}%`);

        timeline.style.setProperty("--progress-size", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-size", `${progress * 100}%`);

        timeline.style.setProperty("--fill-size", `${progress * 100}%`);

        timeline.style.setProperty("--progress-fill", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-height", `${progress * 100}%`);

        timeline.style.setProperty("--fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--height", `${progress * 100}%`);

        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressLine", `${progress * 100}%`);

        timeline.style.setProperty("--line-progress", `${progress * 100}%`);

        timeline.style.setProperty("--timelineLineProgress", `${progress * 100}%`);

        timeline.style.setProperty("--fill", `${progress * 100}%`);

        timeline.style.setProperty("--lineFill", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineFill", `${progress * 100}%`);

        timeline.style.setProperty("--fillLine", `${progress * 100}%`);

        timeline.style.setProperty("--progress", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);

        timeline.style.setProperty("--after", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after", `${progress * 100}%`);

        timeline.style.setProperty("--fillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--line-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-line-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfter", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgress", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--line-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--progress-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-height", `${progress * 100}%`);

        timeline.style.setProperty("--line-height", `${progress * 100}%`);

        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--progress", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfter", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfter", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressAfter", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterProgress", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineAfter", `${progress * 100}%`);

        timeline.style.setProperty("--timelineLineAfter", `${progress * 100}%`);

        timeline.style.setProperty("--lineAfter", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfter", `${progress * 100}%`);

        timeline.style.setProperty("--progressFillAfter", `${progress * 100}%`);

        timeline.style.setProperty("--timelineFillAfter", `${progress * 100}%`);

        timeline.style.setProperty("--lineFillAfter", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--afterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after-height", `${progress * 100}%`);

        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineFillAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfter", `${progress * 100}%`);

        timeline.style.setProperty("--after", `${progress * 100}%`);

        timeline.style.setProperty("--progress", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);

        timeline.style.setProperty("--fill", `${progress * 100}%`);

        timeline.style.setProperty("--fillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressHeight", `${progress * 100}%`);

        timeline.style.setProperty("--height", `${progress * 100}%`);

        timeline.style.setProperty("--afterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after-height", `${progress * 100}%`);

        timeline.style.setProperty("--after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--progress-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-progress-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--fill-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--line-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-line-after-height", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--afterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineFillAfterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineFillAfterLineHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineFillAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressLineFillAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressFillLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineFillLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillLineAfterHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--afterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timeline::after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--progress-after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--fill-after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--line-after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--timeline-line-after-fill-height", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineProgressLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressFillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineFillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillLineAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--lineFillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--timelineLineFillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--progressLineFillAfterFillHeight", `${progress * 100}%`);

        timeline.style.setProperty("--fillAfterHeight", `${progress * 100}%`);
    }

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("load", updateProgress);

})();

