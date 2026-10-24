import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Native scroll-snap carousel controller: touch/trackpad swipe for free,
 * buttons + dots + arrow keys on top. Returns state and handlers.
 */
export default function useCarousel(count) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [pages, setPages] = useState(count);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const items = [...el.children];
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const offs = items.map((it) => it.offsetLeft - items[0].offsetLeft);
    // Snap positions the track can actually reach (the last cards may already be in view).
    const reachable = Math.min(count, offs.filter((o) => o < max - 4).length + 1);
    let best = 0;
    for (let i = 0; i < reachable; i++) { const o = Math.min(offs[i], max); if (Math.abs(o - left) < Math.abs(Math.min(offs[best], max) - left)) best = i; }
    setPages(reachable);
    setIndex(best);
    setEdges({ start: left <= 4, end: left + el.clientWidth >= el.scrollWidth - 4 });
  }, [count]);

  useEffect(() => {
    const el = track.current;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [update]);

  const goTo = useCallback((i) => {
    const el = track.current;
    const items = [...el.children];
    const target = items[Math.max(0, Math.min(count - 1, i))];
    el.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [count]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  };

  return { track, index, edges, pages, goTo, next: () => goTo(index + 1), prev: () => goTo(index - 1), onKeyDown };
}
