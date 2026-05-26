export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(
    ".tile, .photo-masonry__item, .card, .fade-in, .section__head, .section__lede, .event-gallery__item"
  );
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay =
          el.classList.contains("tile") || el.classList.contains("photo-masonry__item")
            ? Array.from(el.parentElement?.children || []).indexOf(el) * 80
            : 0;
        setTimeout(() => el.classList.add("is-visible"), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

export function initHeroParallax() {
  const hero = document.querySelector<HTMLElement>(".hero");
  const heroBg = document.querySelector<HTMLImageElement>(".hero__bg");
  const heroContent = document.querySelector<HTMLElement>(".hero__content");
  if (!hero || !heroBg) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(1, scrollY / heroHeight);
    heroBg.style.transform = `scale(${1.05 - progress * 0.05}) translateY(${scrollY * 0.3}px)`;
    if (heroContent) {
      heroContent.style.opacity = String(1 - progress * 1.5);
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}
