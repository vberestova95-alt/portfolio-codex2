/*
 * Hero object motion.
 *
 * The object drifts on its own: two sine waves per axis on unrelated periods, so
 * their sum wanders instead of tracing the same ellipse and the object appears
 * to be floating rather than looping an animation.
 *
 * It is never rotated in the plane of the screen — spinning a render flat reads
 * as a sticker turning rather than a solid moving. Instead it tilts in
 * perspective: small rotateX/rotateY, so the chrome catches the light from a
 * changing angle and the form reads as something with a back to it. The tilt
 * rides the same drift phases as the travel, one quarter-cycle offset, so the
 * turn leads the movement the way a floating object would.
 *
 * The pointer does two things, both driven off the same distance reading:
 *
 *   - it pushes the object away along the line between them, and the object
 *     drifts back once the cursor leaves;
 *   - it leans the object toward the cursor, on top of the ambient tilt;
 *   - if the object is a video clip, it spins it. The clip only runs while the
 *     cursor is near, and its playback rate is eased rather than switched, so
 *     the spin winds up and coasts down instead of cutting in and out. Stopping
 *     is a `pause()` on the current frame and never a seek, so coming back
 *     resumes from exactly where it stopped.
 *
 * With a still image the clip half is simply inert.
 */

/*
 * Horizontal travel is the tighter budget: the copy sits to the object's left,
 * and drift plus a full push is the closest the two ever get. These add up to
 * about 73px of leftward reach, which keeps it clear of the longest line.
 */
const DRIFT_X = 20; // px of horizontal wander
const DRIFT_Y = 32; // px of vertical wander
const SCROLL_DRIFT = 40; // px the object trails the page by across the hero

const PUSH_RADIUS = 340; // px — how close the pointer gets before it pushes
const PUSH_STRENGTH = 44; // px of displacement at the closest approach

/*
 * Tilt kept deliberately shallow. Past about 9deg the flat edges of the render
 * start to give the plane away, which is the thing this is here to avoid.
 */
const TILT_X = 6.5; // deg of ambient tilt about the horizontal axis
const TILT_Y = 7.5; // deg about the vertical axis
const TILT_POINTER = 4; // deg of extra lean toward the cursor
const PERSPECTIVE = 1400; // px — long, so the tilt stays a turn and not a fisheye

const EASING = 0.05; // low, so the object feels heavy and settles slowly

/*
 * Spin-up and spin-down. Browsers clamp very low playback rates, so anything
 * under STOP_RATE counts as stopped and the clip is paused outright rather than
 * left crawling. At this easing the wind-up and the coast each take ~0.6s.
 */
const SPIN_EASING = 0.06;
const STOP_RATE = 0.1;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function attachHeroObject(container, target) {
  if (!container || !target) {
    return undefined;
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return undefined;
  }

  const clip = target.tagName === 'VIDEO' ? target : null;
  const usePointer = !window.matchMedia?.('(pointer: coarse)').matches;

  const current = { x: 0, y: 0, tiltX: 0, tiltY: 0 };
  const push = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  let scrollOffset = 0;
  let frame = null;
  let visible = true;
  let elapsed = 0;
  let last = null;

  // Without a hover to read, a touch device just lets the clip run while it is
  // on screen; otherwise the object would sit frozen for the whole visit.
  let spinTarget = clip && !usePointer ? 1 : 0;
  let spinRate = 0;

  if (clip) {
    /*
     * Safari checks the muted state on the element itself before it will start
     * playback, and React only sets it as a property after mount — too late.
     */
    clip.muted = true;
    clip.defaultMuted = true;
  }

  const playClip = () => {
    const attempt = clip.play();

    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {});
    }
  };

  const driveClip = () => {
    spinRate += (spinTarget - spinRate) * SPIN_EASING;

    if (spinTarget > 0 || spinRate > STOP_RATE) {
      if (clip.paused && visible) {
        playClip();
      }

      clip.playbackRate = Math.max(spinRate, STOP_RATE);
      return;
    }

    spinRate = 0;

    if (!clip.paused) {
      clip.pause();
    }
  };

  const render = (now) => {
    // Track elapsed time rather than reading the clock directly, so parking the
    // loop off-screen does not jump the drift forward on resume.
    elapsed += last === null ? 0 : Math.min(now - last, 100) / 1000;
    last = now;

    const t = elapsed;
    const driftX = Math.sin(t * 0.21) * DRIFT_X + Math.sin(t * 0.37 + 1.7) * DRIFT_X * 0.45;
    const driftY = Math.cos(t * 0.17) * DRIFT_Y + Math.cos(t * 0.29 + 0.6) * DRIFT_Y * 0.4;

    /*
     * Same phases as the drift, shifted a quarter cycle, so the turn leads the
     * travel instead of mirroring it. rotateY reads off the horizontal phase
     * and rotateX off the vertical, which is the direction a solid would tip if
     * it were actually moving that way.
     */
    const ambientTiltY = Math.sin(t * 0.21 + Math.PI / 2) * TILT_Y;
    const ambientTiltX = Math.cos(t * 0.17 + Math.PI / 2) * TILT_X;

    const wantedX = driftX + push.x;
    const wantedY = driftY + push.y + scrollOffset;
    const wantedTiltY = ambientTiltY + lean.x * TILT_POINTER;
    const wantedTiltX = ambientTiltX + lean.y * TILT_POINTER;

    current.x += (wantedX - current.x) * EASING;
    current.y += (wantedY - current.y) * EASING;
    current.tiltX += (wantedTiltX - current.tiltX) * EASING;
    current.tiltY += (wantedTiltY - current.tiltY) * EASING;

    target.style.transform =
      `perspective(${PERSPECTIVE}px) ` +
      `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) ` +
      `rotateX(${current.tiltX.toFixed(2)}deg) rotateY(${current.tiltY.toFixed(2)}deg)`;

    if (clip) {
      driveClip();
    }

    frame = requestAnimationFrame(render);
  };

  const startLoop = () => {
    if (frame === null && visible && !document.hidden) {
      last = null;
      frame = requestAnimationFrame(render);
    }
  };

  const stopLoop = () => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };

  const handlePointerMove = (event) => {
    const box = target.getBoundingClientRect();
    const dx = box.left + box.width / 2 - event.clientX;
    const dy = box.top + box.height / 2 - event.clientY;
    const distance = Math.hypot(dx, dy);

    if (distance > PUSH_RADIUS) {
      push.x = 0;
      push.y = 0;
      lean.x = 0;
      lean.y = 0;
      spinTarget = 0;
      return;
    }

    spinTarget = 1;

    /*
     * The lean is signed and normalised rather than a magnitude: it says which
     * side the cursor is on, so the object turns its face toward the cursor
     * while the push sends its body the other way.
     */
    lean.x = clamp(-dx / PUSH_RADIUS, -1, 1);
    lean.y = clamp(dy / PUSH_RADIUS, -1, 1);

    if (distance < 1) {
      // Dead centre: the push direction is undefined, so hold the last one
      // rather than snapping the object back through the cursor.
      return;
    }

    // Strongest right under the cursor, fading to nothing at the radius.
    const force = (1 - distance / PUSH_RADIUS) * PUSH_STRENGTH;
    push.x = (dx / distance) * force;
    push.y = (dy / distance) * force;
  };

  const handlePointerLeave = () => {
    push.x = 0;
    push.y = 0;
    lean.x = 0;
    lean.y = 0;
    spinTarget = 0;
  };

  const handleScroll = () => {
    const rect = container.getBoundingClientRect();
    const progress = clamp(-rect.top / (rect.height || 1), 0, 1);
    scrollOffset = progress * SCROLL_DRIFT;
  };

  const handleVisibility = () => {
    if (document.hidden) {
      stopLoop();
    } else {
      startLoop();
    }
  };

  // Idling off-screen is wasted work, so the loop parks when the hero scrolls
  // away and picks up again when it comes back.
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        startLoop();
      } else {
        stopLoop();

        if (clip && !clip.paused) {
          clip.pause();
        }
      }
    },
    { rootMargin: '120px' },
  );

  observer.observe(container);

  if (usePointer) {
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  document.addEventListener('visibilitychange', handleVisibility);

  handleScroll();
  startLoop();

  return () => {
    observer.disconnect();

    if (usePointer) {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    }

    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    document.removeEventListener('visibilitychange', handleVisibility);
    stopLoop();

    if (clip && !clip.paused) {
      clip.pause();
    }
  };
}
