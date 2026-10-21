const WRITE_LOCK = "pageleaf-notes-write";
const WRITE_INTERVAL = 750;

function clamp(value) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : 0;
}

function validId(id) {
  return typeof id === "string" && id.length > 0 && id.length <= 200;
}

/** Local reading position; records contain only a ratio and an update timestamp. */
export function createReadingProgress({
  storage,
  locks,
  window,
  document,
  onChange = () => {},
  onError = () => {},
}) {
  let current = null;
  let generation = 0;
  let timer = null;
  let disposed = false;

  function maxScroll() {
    const element = document.scrollingElement || document.documentElement;
    return Math.max(
      0,
      (element?.scrollHeight || 0) -
        (window.innerHeight || element?.clientHeight || 0),
    );
  }

  function readRatio() {
    const maximum = maxScroll();
    return maximum ? clamp((Number(window.scrollY) || 0) / maximum) : 0;
  }

  function emit(ratio) {
    if (!disposed) onChange(clamp(ratio));
  }

  function cancelTimer() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
  }

  function snapshot(value = current) {
    return value && value.saved && !value.restoring
      ? { id: value.id, ratio: clamp(value.ratio) }
      : null;
  }

  async function persist(value) {
    if (!value) return;
    try {
      await locks.request(WRITE_LOCK, async () => {
        const noteKey = `note:${value.id}`;
        const data = await storage.get(noteKey);
        // A queued progress write must never recreate metadata for a deleted note.
        if (!data[noteKey] || data[noteKey].id !== value.id) return;
        await storage.set({
          [`progress:${value.id}`]: {
            ratio: value.ratio,
            updatedAt: new Date().toISOString(),
          },
        });
      });
    } catch (error) {
      if (!disposed) onError(error);
    }
  }

  function scheduleWrite() {
    if (timer !== null || !snapshot()) return;
    timer = window.setTimeout(() => {
      timer = null;
      void persist(snapshot());
    }, WRITE_INTERVAL);
  }

  function onScroll() {
    if (disposed || !current || current.restoring) return;
    current.ratio = readRatio();
    emit(current.ratio);
    scheduleWrite();
  }

  function onResize() {
    if (disposed || !current || current.restoring) return;
    window.scrollTo(0, maxScroll() * current.ratio);
    onScroll();
  }

  function frame() {
    return new Promise((resolve) => {
      if (typeof window.requestAnimationFrame === "function")
        window.requestAnimationFrame(() => resolve());
      else window.setTimeout(resolve, 0);
    });
  }

  async function flush() {
    cancelTimer();
    if (disposed || !current || current.restoring) return;
    current.ratio = readRatio();
    emit(current.ratio);
    await persist(snapshot());
  }

  async function open(id, isSaved, { restore = true } = {}) {
    if (disposed) return;
    // The caller may already have reset scroll for the new article. Flush the old
    // tracked ratio, never sample the new document layout for the previous note.
    const previous = snapshot();
    cancelTimer();
    const token = ++generation;
    current = validId(id)
      ? {
          id,
          saved: isSaved === true,
          ratio: readRatio(),
          restoring: isSaved === true && restore,
        }
      : null;
    emit(current?.ratio || 0);
    await persist(previous);
    if (disposed || generation !== token || !current) return;
    if (!current.saved || !restore) {
      current.restoring = false;
      return;
    }
    try {
      const noteKey = `note:${id}`;
      const progressKey = `progress:${id}`;
      const data = await storage.get([noteKey, progressKey]);
      if (disposed || generation !== token) return;
      const ratio =
        data[noteKey]?.id === id ? clamp(data[progressKey]?.ratio) : 0;
      await frame();
      if (disposed || generation !== token) return;
      window.scrollTo(0, maxScroll() * ratio);
      // Suppress scroll events from the caller's initial reset and our restoration.
      await frame();
      if (disposed || generation !== token) return;
      current.restoring = false;
      current.ratio = readRatio();
      emit(current.ratio);
    } catch (error) {
      if (disposed || generation !== token) return;
      current.restoring = false;
      current.ratio = readRatio();
      emit(current.ratio);
      onError(error);
    }
  }

  function markSaved(id) {
    if (disposed || !validId(id)) return;
    generation += 1;
    current = { id, saved: true, ratio: readRatio(), restoring: false };
    emit(current.ratio);
    scheduleWrite();
  }

  function onVisibility() {
    if (document.visibilityState === "hidden") void flush();
  }

  function onPageHide() {
    void flush();
  }

  function dispose() {
    if (disposed) return;
    const pending = flush();
    disposed = true;
    generation += 1;
    cancelTimer();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pagehide", onPageHide);
    document.removeEventListener("visibilitychange", onVisibility);
    return pending;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pagehide", onPageHide);
  document.addEventListener("visibilitychange", onVisibility);
  return { open, markSaved, flush, dispose };
}
