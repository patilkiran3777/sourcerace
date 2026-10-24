import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from '../../animations/gsapConfig.js';
import { ChevronDown } from '../ui/Icons.jsx';

function Dropdown({ item }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const panel = useRef(null);
  const id = useId();
  const timer = useRef();

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (open) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(el, { autoAlpha: 0, y: -10, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' });
      gsap.fromTo(el.querySelectorAll('li'), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.035, delay: 0.05 });
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

  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 140); };

  return (
    <li
      className={`nav__item nav__item--dropdown ${open ? 'is-open' : ''}`}
      ref={wrap}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(e) => { if (!wrap.current.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button className={`nav__link ${item.active ? 'is-active' : ''}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {item.label}
        <ChevronDown className="nav__chev" />
      </button>
      <div className="nav__panel" id={id} ref={panel} style={{ display: 'none' }}>
        <ul>
          {item.children.map((c) => (
            <li key={c.label}><a href={c.href}>{c.label}</a></li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Navigation({ items }) {
  return (
    <nav className="nav" aria-label="Main">
      <ul className="nav__list">
        {items.map((item) =>
          item.children ? (
            <Dropdown key={item.label} item={item} />
          ) : (
            <li className="nav__item" key={item.label}>
              <a className={`nav__link ${item.active ? 'is-active' : ''}`} href={item.href} aria-current={item.active ? 'page' : undefined}>
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
