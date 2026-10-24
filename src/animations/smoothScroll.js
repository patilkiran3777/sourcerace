import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, MQ } from './gsapConfig.js';

/*
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger reveals,
 * scrubs and the header state all read the same eased scroll position.
 * Only runs when the visitor hasn't asked for reduced motion; otherwise the
 * page keeps plain native scrolling.
 */
let lenis = null;

export const getLenis = () => lenis;

/* Pause/resume the page scroll (menus, modals). Falls back to body overflow without Lenis. */
export function lockScroll(locked) {
  if (lenis) { if (locked) lenis.stop(); else lenis.start(); }
  document.body.style.overflow = locked ? 'hidden' : '';
}

const headerOffset = () => -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0) - 16;

/* Smooth in-page anchor links, keeping the same offset as scroll-padding-top. */
function onAnchorClick(e) {
  if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = e.target.closest('a[href^="#"]');
  if (!link || link.classList.contains('skip-link')) return;
  const hash = link.getAttribute('href');
  const target = hash === '#' || hash === '#top' ? 0 : document.getElementById(decodeURIComponent(hash.slice(1)));
  if (target === null) return;
  e.preventDefault();
  lenis.scrollTo(target, { offset: target === 0 ? 0 : headerOffset(), duration: 1.4 });
  history.pushState(null, '', hash);
}

export function initSmoothScroll() {
  const mm = gsap.matchMedia();
  mm.add(MQ.motion, () => {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out: fast start, long soft settle
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click', onAnchorClick);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenis = null;
    };
  });
  return () => mm.revert();
}
