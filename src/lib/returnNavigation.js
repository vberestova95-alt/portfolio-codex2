const STORAGE_KEY = 'portfolio:return-positions';
const PENDING_KEY = 'portfolio:pending-return';
const MAX_ENTRY_AGE = 2 * 60 * 60 * 1000;
const MAX_ENTRIES = 12;
const RETURN_CONTAINER_SELECTOR = '.work-card, .editorial-card, .case-next__card';

function readEntries() {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]');

    if (!Array.isArray(stored)) {
      return [];
    }

    const cutoff = Date.now() - MAX_ENTRY_AGE;
    return stored.filter(
      (entry) =>
        entry &&
        typeof entry.id === 'string' &&
        typeof entry.sourcePath === 'string' &&
        typeof entry.destinationPath === 'string' &&
        typeof entry.scrollY === 'number' &&
        entry.createdAt >= cutoff,
    );
  } catch {
    return [];
  }
}

function writeEntries(entries) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    // Navigation should still work when session storage is unavailable.
  }
}

function saveReturnEntry(entry) {
  const entries = readEntries();
  entries.push(entry);
  writeEntries(entries);
}

function findEntryById(id) {
  return id ? readEntries().find((entry) => entry.id === id) || null : null;
}

function getHistoryState() {
  const state = window.history.state;
  return state && typeof state === 'object' ? state : {};
}

function connectPendingEntry(pathname) {
  try {
    const pendingId = window.sessionStorage.getItem(PENDING_KEY);
    const entry = findEntryById(pendingId);
    window.sessionStorage.removeItem(PENDING_KEY);

    if (!entry || entry.destinationPath !== pathname) {
      return;
    }

    window.history.replaceState(
      { ...getHistoryState(), portfolioReturnId: entry.id },
      '',
      window.location.href,
    );
  } catch {
    // The regular link remains a safe fallback without session storage.
  }
}

function createEntryId() {
  return window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAnchorContainer(anchor) {
  return anchor.closest(RETURN_CONTAINER_SELECTOR) || anchor;
}

function findDestinationAnchor(destinationPath, normalizePathname) {
  return Array.from(document.querySelectorAll('a[href]')).find((anchor) => {
    try {
      const url = new URL(anchor.href, window.location.href);
      return (
        url.origin === window.location.origin &&
        normalizePathname(url.pathname) === destinationPath
      );
    } catch {
      return false;
    }
  });
}

function restorePosition(entry, normalizePathname) {
  const anchor = findDestinationAnchor(entry.destinationPath, normalizePathname);
  let top = entry.scrollY;

  if (anchor && typeof entry.anchorOffsetY === 'number') {
    const container = getAnchorContainer(anchor);
    top = window.scrollY + container.getBoundingClientRect().top - entry.anchorOffsetY;
  }

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(entry.scrollX || 0, Math.max(0, top));
  root.style.scrollBehavior = previousScrollBehavior;
}

function isUnmodifiedPrimaryClick(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function attachReturnNavigation({ pathname, detailPaths, normalizePathname }) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  connectPendingEntry(pathname);

  const timeoutIds = [];
  let animationFrameId = 0;
  let resizeObserver;

  const scheduleRestore = () => {
    const entry = findEntryById(getHistoryState().portfolioReturnSourceId);

    if (!entry || entry.sourcePath !== pathname) {
      return;
    }

    const restore = () => restorePosition(entry, normalizePathname);
    restore();
    animationFrameId = window.requestAnimationFrame(() => {
      animationFrameId = window.requestAnimationFrame(restore);
    });
    timeoutIds.push(
      window.setTimeout(restore, 160),
      window.setTimeout(restore, 600),
      window.setTimeout(restore, 1400),
      window.setTimeout(restore, 2800),
    );

    if ('ResizeObserver' in window) {
      resizeObserver?.disconnect();
      resizeObserver = new window.ResizeObserver(restore);
      resizeObserver.observe(document.documentElement);
      timeoutIds.push(window.setTimeout(() => resizeObserver?.disconnect(), 3000));
    }
  };

  scheduleRestore();

  const handlePageShow = (event) => {
    if (event.persisted) {
      scheduleRestore();
    }
  };

  const handleClick = (event) => {
    if (!isUnmodifiedPrimaryClick(event) || !(event.target instanceof Element)) {
      return;
    }

    const anchor = event.target.closest('a[href]');

    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) {
      return;
    }

    let destinationUrl;

    try {
      destinationUrl = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }

    if (destinationUrl.origin !== window.location.origin) {
      return;
    }

    const destinationPath = normalizePathname(destinationUrl.pathname);
    const returnEntry = findEntryById(getHistoryState().portfolioReturnId);

    if (
      detailPaths.has(pathname) &&
      anchor.classList.contains('case-back-link') &&
      returnEntry?.destinationPath === pathname
    ) {
      event.preventDefault();
      window.history.back();
      return;
    }

    if (!detailPaths.has(destinationPath) || destinationPath === pathname) {
      return;
    }

    const container = getAnchorContainer(anchor);
    const entry = {
      id: createEntryId(),
      sourcePath: pathname,
      destinationPath,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      anchorOffsetY: container.getBoundingClientRect().top,
      createdAt: Date.now(),
    };

    saveReturnEntry(entry);

    try {
      window.sessionStorage.setItem(PENDING_KEY, entry.id);
      window.history.replaceState(
        { ...getHistoryState(), portfolioReturnSourceId: entry.id },
        '',
        window.location.href,
      );
    } catch {
      // Browser Back continues to work even if exact restoration is unavailable.
    }
  };

  document.addEventListener('click', handleClick, true);
  window.addEventListener('pageshow', handlePageShow);

  return () => {
    document.removeEventListener('click', handleClick, true);
    window.removeEventListener('pageshow', handlePageShow);
    window.cancelAnimationFrame(animationFrameId);
    resizeObserver?.disconnect();
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  };
}
