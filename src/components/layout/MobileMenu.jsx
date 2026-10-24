import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/gsapConfig.js';
import { ROUTES, social } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import { ChevronDown, SocialIcon } from '../ui/Icons.jsx';

export default function MobileMenu({ open, onClose, items }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.killTweensOf(el);
    if (open) {
      gsap.set(el, { display: 'flex' });
      if (reduce) { gsap.set(el, { autoAlpha: 1, clipPath: 'none' }); }
      else {
        gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', autoAlpha: 1 }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' });
        gsap.fromTo(el.querySelectorAll('[data-mm-item]'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.045, delay: 0.12 });
      }
      el.querySelector('a, button')?.focus({ preventScroll: true });
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    if (reduce) gsap.set(el, { display: 'none' });
    else gsap.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'power3.inOut', onComplete: () => gsap.set(el, { display: 'none' }) });
  }, [open, onClose]);

  return (
    <div className="mobile-menu" id="mobile-menu" ref={ref} style={{ display: 'none' }} aria-hidden={!open} data-lenis-prevent>
      <nav aria-label="Mobile">
        <ul className="mobile-menu__list">
          {items.map((item) => (
            <li key={item.label} data-mm-item="">
              {item.children ? (
                <>
                  <button
                    className="mobile-menu__link"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown size={16} style={{ transform: expanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} />
                  </button>
                  <ul className={`mobile-menu__sub ${expanded === item.label ? 'is-open' : ''}`}>
                    {item.children.map((c) => (
                      <li key={c.label}><a href={c.href} onClick={onClose} tabIndex={expanded === item.label ? 0 : -1}>{c.label}</a></li>
                    ))}
                  </ul>
                </>
              ) : (
                <a className={`mobile-menu__link ${item.active ? 'is-active' : ''}`} href={item.href} onClick={onClose}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mobile-menu__foot" data-mm-item="">
        <Button href={ROUTES.demo} onClick={onClose}>Request a Demo</Button>
        <ul className="mobile-menu__social">
          {social.map((s) => (
            <li key={s.id}><a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"><SocialIcon id={s.id} /></a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
