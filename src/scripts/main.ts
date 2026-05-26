import { initFooterYear, initNav, initSmoothScroll, initCopyEmail } from "./nav";
import { initReveal, initHeroParallax } from "./reveal";
import { initLightbox } from "./lightbox";

function start() {
  initFooterYear();
  initNav();
  initSmoothScroll();
  initCopyEmail();
  initReveal();
  initHeroParallax();
  initLightbox();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
