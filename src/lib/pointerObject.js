/*
 * Pointer-driven rotation for the hero object.
 *
 * The artwork is a flat render, so a real 360 degree spin is not possible —
 * instead the cursor drives a combination of in-plane roll (rotateZ, which
 * reads as "turning" the knot) and a perspective tilt, eased toward the target
 * every frame so the object keeps moving after the pointer stops.
 */
const MAX_ROLL = 26; // deg, in-plane rotation — the "spin" part
const MAX_TILT = 15; // deg, perspective tilt on X/Y
const MAX_SHIFT = 18; // px of parallax
const EASING = 0.075;

export function attachPointerObject(container, target) {
  if (!container || !target) {
    return undefined;
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches;

  if (prefersReducedMotion || isCoarsePointer) {
    return undefined;
  }

  const current = { roll: 0, tiltX: 0, tiltY: 0, shiftX: 0, shiftY: 0 };
  const wanted = { roll: 0, tiltX: 0, tiltY: 0, shiftX: 0, shiftY: 0 };
  let frame = null;
  let settled = false;

  const render = () => {
    let moved = false;

    Object.keys(current).forEach((key) => {
      const delta = wanted[key] - current[key];

      if (Math.abs(delta) > 0.01) {
        moved = true;
      }

      current[key] += delta * EASING;
    });

    target.style.transform = [
      `translate3d(${current.shiftX.toFixed(2)}px, ${current.shiftY.toFixed(2)}px, 0)`,
      `rotateX(${current.tiltX.toFixed(2)}deg)`,
      `rotateY(${current.tiltY.toFixed(2)}deg)`,
      `rotateZ(${current.roll.toFixed(2)}deg)`,
    ].join(' ');

    if (moved || !settled) {
      settled = !moved;
      frame = requestAnimationFrame(render);
    } else {
      frame = null;
    }
  };

  const requestRender = () => {
    settled = false;

    if (frame === null) {
      frame = requestAnimationFrame(render);
    }
  };

  const handlePointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    // -1 .. 1 relative to the container centre
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    wanted.roll = -x * MAX_ROLL;
    wanted.tiltY = x * MAX_TILT;
    wanted.tiltX = -y * MAX_TILT;
    wanted.shiftX = x * MAX_SHIFT;
    wanted.shiftY = y * MAX_SHIFT;

    requestRender();
  };

  const handlePointerLeave = () => {
    wanted.roll = 0;
    wanted.tiltX = 0;
    wanted.tiltY = 0;
    wanted.shiftX = 0;
    wanted.shiftY = 0;

    requestRender();
  };

  container.addEventListener('pointermove', handlePointerMove);
  container.addEventListener('pointerleave', handlePointerLeave);
  container.classList.add('is-pointer-driven');

  return () => {
    container.removeEventListener('pointermove', handlePointerMove);
    container.removeEventListener('pointerleave', handlePointerLeave);
    container.classList.remove('is-pointer-driven');

    if (frame !== null) {
      cancelAnimationFrame(frame);
    }
  };
}
