/*
 * Hero object motion. Ambient only — nothing here reacts to the pointer.
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
 * A clip in the slot instead of a still simply plays while it is on screen.
 */

/*
 * Horizontal travel is the tighter budget: the copy sits to the object's left,
 * so the leftward reach has to stay clear of the longest line.
 */
const DRIFT_X = 20; // px of horizontal wander
const DRIFT_Y = 32; // px of vertical wander
const SCROLL_DRIFT = 40; // px the object trails the page by across the hero

/*
 * Tilt kept deliberately shallow. Past about 9deg the flat edges of the render
 * start to give the plane away, which is the thing this is here to avoid.
 */
const TILT_X = 6.5; // deg of tilt about the horizontal axis
const TILT_Y = 7.5; // deg about the vertical axis
const PERSPECTIVE = 1400; // px — long, so the tilt stays a turn and not a fisheye

const EASING = 0.05; // low, so the object feels heavy and settles slowly

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function attachHeroObject(container, target) {
  if (!container || !target) {
    return undefined;
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return undefined;
  }

  const clip = target.tagName === 'VIDEO' ? target : null;

  const current = { x: 0, y: 0, tiltX: 0, tiltY: 0 };
  let scrollOffset = 0;
  let frame = null;
  let visible = true;
  let elapsed = 0;
  let last = null;

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
    const wantedTiltY = Math.sin(t * 0.21 + Math.PI / 2) * TILT_Y;
    const wantedTiltX = Math.cos(t * 0.17 + Math.PI / 2) * TILT_X;

    current.x += (driftX - current.x) * EASING;
    current.y += (driftY + scrollOffset - current.y) * EASING;
    current.tiltX += (wantedTiltX - current.tiltX) * EASING;
    current.tiltY += (wantedTiltY - current.tiltY) * EASING;

    target.style.transform =
      `perspective(${PERSPECTIVE}px) ` +
      `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) ` +
      `rotateX(${current.tiltX.toFixed(2)}deg) rotateY(${current.tiltY.toFixed(2)}deg)`;

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

        if (clip && clip.paused) {
          playClip();
        }
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

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  document.addEventListener('visibilitychange', handleVisibility);

  handleScroll();
  startLoop();

  if (clip) {
    playClip();
  }

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    document.removeEventListener('visibilitychange', handleVisibility);
    stopLoop();

    if (clip && !clip.paused) {
      clip.pause();
    }
  };
}
