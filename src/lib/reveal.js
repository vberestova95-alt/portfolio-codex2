/*
 * Reveal-on-scroll for elements marked with data-reveal.
 *
 * The `has-reveal` flag is set on <html> before React renders, so the hidden
 * start state only ever applies when this script is actually running — with no
 * JS the content stays visible.
 */
const REVEAL_SELECTOR = '[data-reveal]';

export function enableReveal() {
  if (typeof document === 'undefined') {
    return;
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  document.documentElement.classList.add('has-reveal');
}

export function observeReveal() {
  if (!document.documentElement.classList.contains('has-reveal')) {
    return undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0 },
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    // Restored scroll position can leave elements above the viewport, where they
    // would never intersect again. Show those straight away.
    if (element.getBoundingClientRect().bottom < 0) {
      element.classList.add('is-revealed');
      return;
    }

    observer.observe(element);
  });

  return () => observer.disconnect();
}
