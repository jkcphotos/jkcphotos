export function initNav() {
  const topbar = document.querySelector<HTMLElement>(".topbar");
  if (!topbar) return;

  const threshold = 80;
  const update = () => {
    if (window.scrollY > threshold) {
      topbar.classList.add("is-scrolled");
    } else if (!topbar.dataset.alwaysScrolled) {
      topbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

export function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

export function initSmoothScroll() {
  const topbar = document.querySelector<HTMLElement>(".topbar");
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = topbar ? topbar.offsetHeight + 20 : 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

export function initCopyEmail() {
  const btn = document.getElementById("copyEmail") as HTMLButtonElement | null;
  if (!btn || !navigator.clipboard) return;
  btn.addEventListener("click", async () => {
    const original = btn.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.email || "hello@jkcphotos.com");
      btn.textContent = "Copied!";
      btn.style.background = "rgba(228, 200, 123, 0.2)";
      btn.style.borderColor = "var(--accent)";
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        btn.style.borderColor = "";
      }, 2000);
    } catch {
      btn.textContent = "Copy failed";
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    }
  });
}
