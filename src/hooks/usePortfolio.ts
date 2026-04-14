import { useEffect, useRef } from 'react';

export function useScrollBehavior() {
  useEffect(() => {
    // Set current year in footer
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Hero name letter split
    const heroName = document.querySelector('[data-hero-name]') as HTMLElement | null;
    if (heroName) {
      const text = heroName.textContent?.trim() ?? '';
      heroName.innerHTML = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 58 + 140}ms`;
        heroName.appendChild(span);
      });
    }

    // Header scroll state
    const header = document.querySelector('[data-header]') as HTMLElement | null;
    const progress = document.querySelector('.scroll-progress') as HTMLElement | null;
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      if (header) header.classList.toggle('is-scrolled', scrollTop > 18);
      if (progress) progress.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // Mobile menu
    const menuButton = document.querySelector('[data-menu-button]') as HTMLButtonElement | null;
    const menuEl = document.querySelector('[data-menu]') as HTMLElement | null;
    const closeMenu = () => {
      if (!header || !menuButton) return;
      header.dataset.open = 'false';
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    const handleMenuButton = () => {
      const isOpen = header?.dataset.open === 'true';
      if (header) header.dataset.open = String(!isOpen);
      menuButton?.setAttribute('aria-expanded', String(!isOpen));
      document.body.classList.toggle('menu-open', !isOpen);
    };
    menuButton?.addEventListener('click', handleMenuButton);
    menuEl?.addEventListener('click', (e) => {
      if (e.target instanceof HTMLAnchorElement) closeMenu();
    });

    // Stagger delays
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      group.querySelectorAll('[data-reveal]').forEach((item, index) => {
        (item as HTMLElement).style.setProperty('--delay', `${index * 85}ms`);
      });
    });

    // Reveal on scroll
    const revealItems = document.querySelectorAll('[data-reveal]');
    let revealObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: '0px 0px -70px 0px' }
      );
      revealItems.forEach((item) => revealObserver?.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    // Active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = [...document.querySelectorAll('main section[id]')];
    let sectionObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && sections.length > 0) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
              link.classList.toggle(
                'is-active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          });
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      sections.forEach((s) => sectionObserver?.observe(s));
    }

    // Tilt cards
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      if (reducedMotion.matches) return;
      card.addEventListener('pointermove', (e) => {
        const pe = e as PointerEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = pe.clientX - rect.left;
        const y = pe.clientY - rect.top;
        const rotX = ((rect.height / 2 - y) / (rect.height / 2)) * 4;
        const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
        (card as HTMLElement).style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        (card as HTMLElement).style.transform = '';
      });
    });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      menuButton?.removeEventListener('click', handleMenuButton);
      revealObserver?.disconnect();
      sectionObserver?.disconnect();
    };
  }, []);
}

export function useSilkCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#050606');
      grad.addColorStop(0.5, '#0b0e0c');
      grad.addColorStop(1, '#050606');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const tOffset = speed * time;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;
          const texX = u;
          const texY = v + 0.03 * Math.sin(8.0 * texX - tOffset);
          const pattern =
            0.6 +
            0.4 *
              Math.sin(
                5.0 *
                  (texX +
                    texY +
                    Math.cos(3.0 * texX + 5.0 * texY) +
                    0.02 * tOffset) +
                  Math.sin(20.0 * (texX + texY - 0.1 * tOffset))
              );
          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

          // Teal-dark silk matching the portfolio palette
          const r = Math.floor(30 + 39 * intensity);
          const g = Math.floor(50 + 190 * intensity);
          const b = Math.floor(40 + 137 * intensity);

          const idx = (y * width + x) * 4;
          if (idx < data.length) {
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = Math.floor(40 + 60 * intensity);
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const ov = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      ov.addColorStop(0, 'rgba(0,0,0,0)');
      ov.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = ov;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [canvasRef]);
}
