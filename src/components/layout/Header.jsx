import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../animations/gsapConfig.js';
import { navigation, ROUTES } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import Logo from './Logo.jsx';
import { isActive } from '../../router.js';
import Navigation from './Navigation.jsx';
import MobileMenu from './MobileMenu.jsx';
import { lockScroll } from '../../animations/smoothScroll.js';
import '../../styles/layout/header.css';

export default function Header() {
  const items = navigation.map((item) => ({ ...item, active: isActive(item) }));
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    // Entrance
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(ref.current.querySelectorAll('.header__logo, .nav__item, .header__cta, .header__burger'), {
        y: -24, autoAlpha: 0, duration: 0.9, stagger: 0.05, delay: 0.1,
      });
    });

    // Compact after leaving the hero top; hide while scrolling down, reveal on scroll up.
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        const el = ref.current;
        el.classList.toggle('is-compact', y > 80);
        const hide = self.direction === 1 && y > 600 && !el.matches(':focus-within');
        el.classList.toggle('is-hidden', hide);
      },
    });
    return () => { st.kill(); mm.revert(); };
  }, { scope: ref });

  useEffect(() => {
    lockScroll(menuOpen);
  }, [menuOpen]);

  return (
    <>
    <header className={`header ${menuOpen ? 'is-menu-open' : ''}`} ref={ref}>
      <div className="header__inner">
        <Logo className="header__logo" />
        <Navigation items={items} />
        <Button href={ROUTES.demo} className="header__cta">Request a Demo</Button>
        <button
          className="header__burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
    {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
    <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={items} />
    </>
  );
}
