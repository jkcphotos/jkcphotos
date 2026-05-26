export function initLightbox() {
  const tiles = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".tile[data-full], .photo-masonry__item[data-full], .event-gallery__item[data-full]"
    )
  );
  const lightbox = document.querySelector<HTMLElement>(".lightbox");
  const lightboxImg = document.querySelector<HTMLImageElement>(".lightbox__img");
  const btnClose = document.querySelector<HTMLButtonElement>(".lightbox__close");
  const btnPrev = document.querySelector<HTMLButtonElement>(".lightbox__prev");
  const btnNext = document.querySelector<HTMLButtonElement>(".lightbox__next");

  if (!tiles.length || !lightbox || !lightboxImg) return;

  const sources = tiles
    .map((t) => ({
      src: t.getAttribute("data-full") || "",
      alt: t.getAttribute("aria-label") || ""
    }))
    .filter((s) => s.src);

  let currentIndex = 0;
  let isAnimating = false;

  const preload = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });

  const open = async (index: number) => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = ((index % sources.length) + sources.length) % sources.length;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    await preload(sources[currentIndex].src);
    lightboxImg.src = sources[currentIndex].src;
    lightboxImg.alt = sources[currentIndex].alt;
    preload(sources[(currentIndex + 1) % sources.length].src);
    preload(sources[(currentIndex - 1 + sources.length) % sources.length].src);
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  };

  const close = () => {
    if (isAnimating) return;
    isAnimating = true;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.removeAttribute("src");
      isAnimating = false;
    }, 300);
  };

  const navigate = (direction: number) => {
    if (isAnimating) return;
    const newIndex = currentIndex + direction;
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = `scale(0.95) translateX(${direction * 30}px)`;
    setTimeout(() => {
      open(newIndex);
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1) translateX(0)";
    }, 150);
  };

  const prev = () => navigate(-1);
  const next = () => navigate(1);

  tiles.forEach((tile, i) => {
    tile.addEventListener("click", () => open(i));
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  btnClose?.addEventListener("click", close);
  btnPrev?.addEventListener("click", prev);
  btnNext?.addEventListener("click", next);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  let touchStartX = 0;
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    },
    { passive: true }
  );
}
