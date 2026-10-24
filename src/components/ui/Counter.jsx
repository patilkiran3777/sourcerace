import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';

/**
 * Counts up once when scrolled into view. The final value is rendered in the
 * markup, so the exact figure shows even without JS or with reduced motion.
 * `triggerFrom` (an ancestor selector) times the count off a parent instead —
 * useful when the counter itself is still mid-transform as it enters.
 */
export default function Counter({ value, suffix = '', prefix = '', className = '', triggerFrom, start = 'top 90%' }) {
  const ref = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const el = ref.current.querySelector('[data-num]');
      const obj = { v: 0 };
      el.textContent = '0';
      gsap.to(obj, {
        v: value,
        duration: value > 99 ? 2.2 : 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: (triggerFrom && ref.current.closest(triggerFrom)) || ref.current, start, once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); },
        onComplete: () => { el.textContent = value.toLocaleString('en-US'); },
      });
      return () => { el.textContent = value.toLocaleString('en-US'); };
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span data-num="">{value.toLocaleString('en-US')}</span>
      {suffix}
    </span>
  );
}
