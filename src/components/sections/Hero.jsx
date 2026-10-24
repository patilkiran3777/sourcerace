import { Fragment, useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';
import { hero } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import ImpactStats from './ImpactStats.jsx';
import '../../styles/sections/hero.css';

export default function Hero() {
  const ref = useRef(null);
  const label = hero.titleLines.map((l) => l.join(' ')).join(' ');
  const markIndex = hero.titleLines[1].indexOf(hero.underlineFromWord);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
      tl.from(q('.hero__bg-media'), { scale: 1.18, duration: 2.6, ease: 'power3.out' }, 0)
        .from(q('.hero__title .split-word > span'), { yPercent: 115, duration: 1.3, stagger: 0.06 }, 0.15)
        .from(q('.hero__underline path'), { strokeDashoffset: 700, duration: 1.4, stagger: 0.18, ease: 'power3.inOut' }, 0.85)
        .from(q('.hero__text'), { y: 30, autoAlpha: 0, duration: 1.1 }, 0.7)
        .from(q('.hero__actions > *'), { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.85);

      // Scroll: image drifts slower than the page, copy lifts away gently.
      gsap.to(q('.hero__bg-media'), {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('.hero__content'), {
        y: -90, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '60% top', scrub: true },
      });
    });

    // Bento unfold (desktop): cards rise out of the centre card and fan into place,
    // scrubbed to the scroll so the motion rides Lenis' easing. Outer cards travel
    // furthest, which keeps the old depth feel without a second competing tween.
    mm.add(MQ.desktop, () => {
      const cards = q('.stat-card');
      const stats = q('.stats')[0];
      const mid = (cards.length - 1) / 2;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: stats, start: 'top 98%', end: 'top 38%', scrub: 1.1 },
      });
      cards.forEach((card, i) => {
        const d = i - mid;
        const at = Math.abs(d) * 0.12;
        gsap.set(card, { zIndex: 10 - Math.abs(d) }); // centre card stays on top while the fan opens
        tl.fromTo(card,
          { xPercent: -d * 55, yPercent: 38 + Math.abs(d) * 16, rotation: d * 4.5, scale: 0.82, transformOrigin: '50% 100%' },
          { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: 1, ease: 'power2.out' }, at)
          .fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, at);
        const media = card.querySelector('.stat-card__media img');
        if (media) tl.fromTo(media, { scale: 1.4, yPercent: -6 }, { scale: 1, yPercent: 0, duration: 1.1, ease: 'power2.out' }, at);
      });

      // Copy settles once each card has mostly landed.
      cards.forEach((card) => {
        const bits = card.querySelectorAll('.stat-card__value, .stat-card__label, .stat-card__text, .stat-card__social-title, .stat-card__icons li, .stat-card__go, .stat-card__cta');
        gsap.from(bits, {
          y: 34, autoAlpha: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out',
          scrollTrigger: { trigger: stats, start: 'top 62%', once: true },
          delay: Math.abs(cards.indexOf(card) - mid) * 0.08,
        });
      });
    });

    // Tablet & mobile rail: cards slide in from the right in sequence.
    mm.add(MQ.mobile, () => {
      gsap.from(q('.stat-card'), {
        x: 120, autoAlpha: 0, rotation: 2, duration: 1.2, stagger: 0.09, ease: 'expo.out',
        scrollTrigger: { trigger: q('.stats')[0], start: 'top 92%', once: true },
      });
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-media">
          <video src={hero.video} autoPlay muted loop playsInline preload="auto" />
        </div>
        <div className="hero__bg-shade" />
      </div>

      <div className="hero__content container ">
        <h1 className="hero__title" id="hero-title" aria-label={label}>
          {hero.titleLines.map((line, li) => (
            <span className="split-line" key={li} aria-hidden="true">
              {li === 1 ? (
                <>
                  {line.slice(0, markIndex).map((w) => (
                    <Fragment key={w}><span className="split-word"><span>{w}</span></span>{' '}</Fragment>
                  ))}
                  <span className="hero__mark">
                    {line.slice(markIndex).map((w, i, arr) => (
                      <Fragment key={w}><span className="split-word"><span>{w}</span></span>{i < arr.length - 1 ? ' ' : ''}</Fragment>
                    ))}
                    <svg className="hero__underline" viewBox="0 0 636 16" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 13.5 C 200 12.5, 420 9, 634 2" />
                      <path d="M2 13 L 634 13" />
                    </svg>
                  </span>
                </>
              ) : (
                line.map((w, i) => (
                  <Fragment key={w}><span className="split-word"><span>{w}</span></span>{i < line.length - 1 ? ' ' : ''}</Fragment>
                ))
              )}
            </span>
          ))}
        </h1>
         
        <div className="hero__actions">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="outline-light">{hero.secondary.label}</Button>
        </div>
      </div>

      <ImpactStats />
    </section>
  );
}
