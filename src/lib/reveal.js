/*
 * Reveal-on-scroll for elements marked with data-reveal.
 *
 * The `has-reveal` flag is set on <html> before React renders, so the hidden
 * start state only ever applies when this script is actually running — with no
 * JS the content stays visible.
 */
const REVEAL_SELECTOR = '[data-reveal]';

/*
 * Stagger is decided at reveal time, not assigned up front: a fixed per-element
 * index would make a lone late element sit and wait for nothing.
 *
 * What counts as "together" is a time window rather than a single observer
 * callback. Batching by callback looked right for the concept grid but left the
 * experience rows flat — they cross the line on separate frames and each
 * arrived as a batch of one. Anything revealing within WAVE_MS of the previous
 * reveal continues the same wave and takes the next step.
 */
const STAGGER_MS = 70;
const STAGGER_CAP = 4; // beyond this the tail just feels slow
const WAVE_MS = 120; // gap that ends a wave and resets the ladder


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

  let waveStep = 0;
  let lastRevealAt = -Infinity;

  const reveal = (element) => {
    const now = performance.now();
    waveStep = now - lastRevealAt < WAVE_MS ? Math.min(waveStep + 1, STAGGER_CAP) : 0;
    lastRevealAt = now;

    if (waveStep > 0) {
      /*
       * A custom property rather than `transition-delay` directly: the delay
       * then only applies to the reveal rule that reads it, and cannot leak
       * into a hover transition on the same element later.
       */
      element.style.setProperty('--reveal-delay', `${waveStep * STAGGER_MS}ms`);
    }

    element.classList.add('is-revealed');
    observer.unobserve(element);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        // Reading order, so a wave runs down the page and not in whatever order
        // the observer happened to collect it.
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entry) => reveal(entry.target));
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
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
