import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from '../../animations/gsapConfig.js';
import { regions } from '../../data/content.js';
import { Check, ChevronDown, Globe } from '../ui/Icons.jsx';

/* Site-version dropdown before "Request a Demo". Click to open (not hover), same panel look as the nav dropdowns. */
export default function RegionSwitcher({ className = '' }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const panel = useRef(null);
  const id = useId();
  const current = regions.items.find((r) => r.id === regions.current);

  useEffect(() => {
    const el = panel.current;
    gsap.killTweensOf(el);
    if (open) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(el, { autoAlpha: 0, y: -10, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' });
    } else {
      gsap.to(el, { autoAlpha: 0, y: -6, duration: 0.2, ease: 'power2.in', onComplete: () => gsap.set(el, { display: 'none' }) });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); wrap.current.querySelector('button').focus(); } };
    const onDoc = (e) => { if (!wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDoc);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDoc); };
  }, [open]);

  return (
    <div
      className={`region ${open ? 'is-open' : ''} ${className}`}
      ref={wrap}
      onBlur={(e) => { if (!wrap.current.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button className="region__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <Globe className="region__globe" />
        <span className="region__current">{current.short || current.label}</span>
        <span className="sr-only"> – change region</span>
        <ChevronDown className="nav__chev" />
      </button>
      <div className="nav__panel region__panel" id={id} ref={panel} style={{ display: 'none' }}>
        <ul>
          {regions.items.map((r) => {
            const isCurrent = r.id === regions.current;
            return (
              <li key={r.id}>
                {r.soon ? (
                  <span className="region__option is-disabled" aria-disabled="true">
                    {r.label}<span className="region__soon">Coming soon</span>
                  </span>
                ) : (
                  <a className={`region__option ${isCurrent ? 'is-current' : ''}`} href={r.href} aria-current={isCurrent ? 'true' : undefined}>
                    {r.label}{isCurrent && <Check />}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
