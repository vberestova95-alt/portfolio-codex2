/*
 * Cursor trail for the concept shots.
 *
 * Each shot chases the pointer with its own easing and resting offset, so the
 * cluster spreads out as it travels and settles back into a fanned stack when
 * the pointer leaves. Positions are written as CSS custom properties, which
 * keeps the layout itself declarative.
 */
const REST = [
  { x: -0.2, y: -0.08, rotate: -7, ease: 0.14, depth: 1 },
  { x: 0.16, y: -0.16, rotate: 5, ease: 0.1, depth: 2 },
  { x: -0.1, y: 0.16, rotate: 4, ease: 0.07, depth: 3 },
  { x: 0.22, y: 0.1, rotate: -4, ease: 0.05, depth: 4 },
];

export function attachShotTrail(container) {
  if (!container) {
    return undefined;
  }

  const shots = [...container.querySelectorAll('[data-shot]')];

  if (!shots.length) {
    return undefined;
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  // Below 900px the shots are parked in the corner by CSS, so no chase there.
  const isNarrow = window.matchMedia?.('(max-width: 900px)').matches;

  if (prefersReducedMotion || isCoarsePointer || isNarrow) {
    return undefined;
  }

  const state = shots.map((node, index) => {
    const rest = REST[index % REST.length];
    return { node, rest, x: 0, y: 0, targetX: 0, targetY: 0 };
  });

  let frame = null;
  let idle = true;

  const restingTarget = () => {
    const rect = container.getBoundingClientRect();
    return { x: rect.width * 0.6, y: rect.height * 0.66 };
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  /*
   * The cluster is kept inside the lower part of the card so it never rides up
   * over the headline, however far the pointer travels.
   */
  const setTarget = (x, y) => {
    const rect = container.getBoundingClientRect();
    const cx = clamp(x, rect.width * 0.24, rect.width * 0.84);
    const cy = clamp(y, rect.height * 0.46, rect.height * 0.78);

    state.forEach((item) => {
      item.targetX = cx + item.rest.x * rect.width * 0.34;
      item.targetY = cy + item.rest.y * rect.height * 0.3;
    });
  };

  const render = () => {
    let moving = false;

    state.forEach((item) => {
      const dx = item.targetX - item.x;
      const dy = item.targetY - item.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        moving = true;
      }

      item.x += dx * item.rest.ease;
      item.y += dy * item.rest.ease;
      item.node.style.setProperty('--shot-x', `${item.x.toFixed(1)}px`);
      item.node.style.setProperty('--shot-y', `${item.y.toFixed(1)}px`);
    });

    if (moving || !idle) {
      idle = !moving;
      frame = requestAnimationFrame(render);
    } else {
      frame = null;
    }
  };

  const requestRender = () => {
    idle = false;

    if (frame === null) {
      frame = requestAnimationFrame(render);
    }
  };

  const handlePointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    setTarget(event.clientX - rect.left, event.clientY - rect.top);
    requestRender();
  };

  const handlePointerLeave = () => {
    const rest = restingTarget();
    setTarget(rest.x, rest.y);
    requestRender();
  };

  // Start from the resting cluster rather than the top-left corner.
  const initial = restingTarget();
  setTarget(initial.x, initial.y);
  state.forEach((item) => {
    item.x = item.targetX;
    item.y = item.targetY;
    item.node.style.setProperty('--shot-x', `${item.x.toFixed(1)}px`);
    item.node.style.setProperty('--shot-y', `${item.y.toFixed(1)}px`);
    item.node.style.setProperty('--shot-rotate', `${item.rest.rotate}deg`);
    item.node.style.setProperty('--shot-depth', String(item.rest.depth));
  });

  container.addEventListener('pointermove', handlePointerMove);
  container.addEventListener('pointerleave', handlePointerLeave);
  container.classList.add('is-trailing');

  return () => {
    container.removeEventListener('pointermove', handlePointerMove);
    container.removeEventListener('pointerleave', handlePointerLeave);
    container.classList.remove('is-trailing');

    if (frame !== null) {
      cancelAnimationFrame(frame);
    }
  };
}
