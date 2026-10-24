import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';

/**
 * Seamless logo marquee. The list is rendered twice and the track moves by
 * exactly one copy width, so the loop has no visible seam. Hover/focus eases
 * the speed to zero. With reduced motion it becomes a static, scrollable row.
 */
export default function Marquee({ items, renderItem, speed = 40, className = '', label }) {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const track = root.current.querySelector('.marquee__track');
      const first = track.children[0];
      let tween;
      const build = () => {
        tween?.kill();
        gsap.set(track, { x: 0 });
        const dist = first.offsetWidth;
        tween = gsap.to(track, { x: -dist, duration: dist / speed, ease: 'none', repeat: -1 });
      };
      build();
      const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
      const go = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: 'power2.in' });
      const el = root.current;
      el.addEventListener('mouseenter', slow);
      el.addEventListener('mouseleave', go);
      el.addEventListener('focusin', slow);
      el.addEventListener('focusout', go);
      const ro = new ResizeObserver(build);
      ro.observe(first);
      return () => {
        ro.disconnect();
        tween?.kill();
        el.removeEventListener('mouseenter', slow);
        el.removeEventListener('mouseleave', go);
        el.removeEventListener('focusin', slow);
        el.removeEventListener('focusout', go);
      };
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div className={`marquee ${className}`} ref={root} role="region" aria-label={label}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul className="marquee__list" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((item, i) => (
              <li className="marquee__item" key={i}>{renderItem(item, copy === 1)}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
