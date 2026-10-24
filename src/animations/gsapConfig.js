import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* One motion language for the whole site: confident ease-out, short stagger. */
export const EASE = 'power3.out';
export const EASE_SOFT = 'power2.out';
export const DUR = 0.9;
export const STAGGER = 0.08;

gsap.defaults({ ease: EASE, duration: DUR });
ScrollTrigger.config({ ignoreMobileResize: true });

export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
};

/* Re-measure once fonts and lazy images have settled so trigger positions stay accurate. */
if (typeof window !== 'undefined') {
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
}

/**
 * Standard scroll reveals for a section. Elements opt in with data attributes:
 *   data-reveal                 → fade + rise
 *   data-reveal="left|right"    → fade + slide from that side
 *   data-reveal-group           → its direct children stagger in
 *   data-reveal-line            → horizontal rule draws in from the left
 *   data-reveal-vline           → vertical rule draws in from the top
 *   data-reveal-image           → masked image wipe + settle
 * Everything is visible by default; GSAP only animates *from* hidden, so the
 * content never stays invisible if JS or animations fail.
 */
export function revealSection(scope) {
  const mm = gsap.matchMedia();
  mm.add(MQ.motion, () => {
    const q = gsap.utils.selector(scope);
    const st = (el, start = 'top 86%') => ({ trigger: el, start, once: true });

    q('[data-reveal]').forEach((el) => {
      const dir = el.dataset.reveal;
      const from = dir === 'left' ? { x: -60 } : dir === 'right' ? { x: 60 } : { y: 48 };
      gsap.from(el, { ...from, autoAlpha: 0, duration: 1, scrollTrigger: st(el) });
    });

    q('[data-reveal-group]').forEach((group) => {
      gsap.from(group.children, {
        y: 56, autoAlpha: 0, duration: 1, stagger: 0.12,
        scrollTrigger: st(group, 'top 88%'),
      });
    });

    q('[data-reveal-line]').forEach((el) => {
      gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.3, ease: 'power2.inOut', scrollTrigger: st(el, 'top 92%') });
    });
    q('[data-reveal-vline]').forEach((el) => {
      gsap.from(el, { scaleY: 0, transformOrigin: 'center top', duration: 1.3, ease: 'power2.inOut', scrollTrigger: st(el, 'top 90%') });
    });

    q('[data-reveal-image]').forEach((el) => {
      const media = el.querySelector('img');
      const tl = gsap.timeline({ scrollTrigger: st(el, 'top 85%') });
      tl.from(el, { clipPath: 'inset(18% 10% 18% 10% round 60px)', duration: 1.4, ease: 'expo.out' });
      if (media) tl.from(media, { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0);
    });

    q('[data-split]').forEach((el) => {
      gsap.from(el.querySelectorAll('.split-word > span'), {
        yPercent: 110, duration: 1.05, stagger: 0.035, ease: 'expo.out',
        scrollTrigger: st(el, 'top 88%'),
      });
    });

    q('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 10;
      gsap.fromTo(el, { yPercent: -amt / 2 }, {
        yPercent: amt / 2, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
