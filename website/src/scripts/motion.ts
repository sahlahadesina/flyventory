// Scroll reveals, header state and the mobile menu. No library.

declare global {
  interface Window {
    __fvMotion?: boolean;
  }
}

window.__fvMotion = true;

// Reveal sections once as they enter the viewport.
const revealTargets = document.querySelectorAll<HTMLElement>(
  "[data-reveal], [data-reveal-stagger], [data-observe], .img-reveal",
);

document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
  Array.from(group.children).forEach((child, i) => {
    (child as HTMLElement).style.setProperty("--i", String(i));
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

// Header: compact with a hairline after 40px of scroll.
const header = document.querySelector<HTMLElement>("[data-header]");
if (header) {
  let ticking = false;
  const update = () => {
    header.dataset.scrolled = String(window.scrollY > 40);
    ticking = false;
  };
  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

// Mobile menu.
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const panel = document.querySelector<HTMLElement>("[data-menu-panel]");
if (toggle && panel) {
  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.dataset.open = String(open);
    if (open) {
      panel.querySelector<HTMLElement>("a")?.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
  });
  window.matchMedia("(min-width: 64rem)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

export {};
