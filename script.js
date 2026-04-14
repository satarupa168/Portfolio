const header = document.querySelector("[data-header]");
const progress = document.querySelector(".scroll-progress");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const navLinks = document.querySelectorAll(".nav-links a");
const heroName = document.querySelector("[data-hero-name]");
const year = document.querySelector("[data-year]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (heroName) {
  const text = heroName.textContent.trim();
  heroName.innerHTML = "";
  [...text].forEach((character, index) => {
    const span = document.createElement("span");
    span.textContent = character === " " ? "\u00A0" : character;
    span.style.animationDelay = `${index * 58 + 140}ms`;
    heroName.appendChild(span);
  });
}

const closeMenu = () => {
  if (!header || !menuButton) return;
  header.dataset.open = "false";
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

if (menuButton && header) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.dataset.open === "true";
    header.dataset.open = String(!isOpen);
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    document.body.classList.toggle("menu-open", !isOpen);
  });
}

if (menu) {
  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });
}

const updateScrollState = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 18);
  }

  if (progress) {
    progress.style.width = `${percentage}%`;
  }
};

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

document.querySelectorAll("[data-stagger]").forEach((group) => {
  group.querySelectorAll("[data-reveal]").forEach((item, index) => {
    item.style.setProperty("--delay", `${index * 85}ms`);
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  if (reducedMotion.matches) return;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const canvas = document.getElementById("particle-scene");

if (canvas) {
  const context = canvas.getContext("2d");
  const hero = document.querySelector(".hero");
  const palette = [
    "rgba(69, 240, 177, 0.8)",
    "rgba(255, 209, 102, 0.68)",
    "rgba(255, 107, 107, 0.58)",
    "rgba(76, 201, 240, 0.52)",
  ];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let particles = [];
  let frameId = 0;

  const createParticles = () => {
    const count = reducedMotion.matches
      ? 38
      : Math.min(84, Math.max(42, Math.floor(width / 18)));

    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: Math.random() * 1.8 + 0.8,
      color: palette[index % palette.length],
    }));
  };

  const resizeCanvas = () => {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = hero ? hero.offsetHeight : window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createParticles();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#050606";
    context.fillRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      if (!reducedMotion.matches) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      }

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const other = particles[nextIndex];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const limit = width < 680 ? 92 : 132;

        if (distance < limit) {
          context.beginPath();
          context.strokeStyle = `rgba(244, 247, 244, ${0.12 * (1 - distance / limit)})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    if (!reducedMotion.matches) {
      frameId = window.requestAnimationFrame(draw);
    }
  };

  resizeCanvas();
  draw();

  window.addEventListener(
    "resize",
    () => {
      window.cancelAnimationFrame(frameId);
      resizeCanvas();
      draw();
    },
    { passive: true }
  );

  reducedMotion.addEventListener("change", () => {
    window.cancelAnimationFrame(frameId);
    resizeCanvas();
    draw();
  });
}
