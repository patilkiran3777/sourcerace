import { Fragment, useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../../animations/gsapConfig.js';
import { agriHero as hero } from '../../../data/agriculture.js';
import Button from '../../ui/Button.jsx';

const Words = ({ words }) =>
  words.map((w, i) => (
    <Fragment key={w}>
      <span className="split-word"><span>{w}</span></span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ));

export default function AgriHero() {
  const ref = useRef(null);
  const label = hero.titleLines.map((l) => l.join(' ')).join(' ');
  const last = hero.titleLines[hero.titleLines.length - 1];
  const markIndex = last.indexOf(hero.markFrom);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Entrance: photo settles, headline rises word by word, then the journey rail assembles.
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      tl.from(q('.ag-hero__media'), { scale: 1.2, duration: 2.4, ease: 'power3.out' }, 0)
        .from(q('.ag-crumbs li'), { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.05 }, 0.1)
        .from(q('.ag-hero__title .split-word > span'), { yPercent: 115, duration: 1.25, stagger: 0.055 }, 0.2)
        .from(q('.ag-hero__underline path'), { strokeDashoffset: 700, duration: 1.3, stagger: 0.15, ease: 'power3.inOut' }, 0.95)
        .from(q('.ag-hero__text'), { y: 28, autoAlpha: 0, duration: 1 }, 0.7)
        .from(q('.ag-hero__actions > *'), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.8)
        .from(q('.ag-journey'), { y: 70, autoAlpha: 0, duration: 1.3 }, 0.95)
        .from(q('.ag-journey__line i'), { scaleX: 0, duration: 1.4, ease: 'power2.inOut' }, 1.25)
        .from(q('.ag-journey__node'), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 1.25);

      // A "lot" travels farm → market on loop; each stage lights as it passes.
      const nodes = q('.ag-journey__node');
      const parcel = q('.ag-journey__parcel');
      const light = (n) => () => nodes.forEach((el, j) => el.classList.toggle('is-lit', j <= n));
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 2.6 });
      loop.call(light(0), null, 0)
        .fromTo(parcel, { left: '12.5%', autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 0);
      [1, 2, 3].forEach((n) => {
        loop.to(parcel, { left: `${12.5 + n * 25}%`, duration: 1.1, ease: 'power2.inOut' }, '+=0.45')
          .call(light(n));
      });
      loop.to(parcel, { autoAlpha: 0, scale: 0.4, duration: 0.4 }, '+=0.9')
        .call(() => nodes.forEach((el) => el.classList.remove('is-lit')));

      // Scroll: photo drifts slower than the page, copy lifts away.
      gsap.to(q('.ag-hero__media'), {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('.ag-hero__content'), {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '70% top', scrub: true },
      });
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="ag-hero" ref={ref} aria-labelledby="ag-hero-title">
      <div className="ag-hero__bg" aria-hidden="true">
        <div className="ag-hero__media"><img src={hero.image} alt="" fetchpriority="high" /></div>
        <div className="ag-hero__grid" />
        <div className="ag-hero__fade" />
      </div>

      <div className="container ag-hero__content">
        <nav aria-label="Breadcrumb">
          <ol className="ag-crumbs">
            {hero.breadcrumb.map((c) => (
              <li key={c.label}>
                {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="ag-hero__title" id="ag-hero-title" aria-label={label}>
          {hero.titleLines.map((line, li) => (
            <span className="split-line" key={li} aria-hidden="true">
              {li === hero.titleLines.length - 1 ? (
                <>
                  <Words words={line.slice(0, markIndex)} />{' '}
                  <span className="ag-hero__mark">
                    <Words words={line.slice(markIndex)} />
                    <svg className="ag-hero__underline" viewBox="0 0 636 16" preserveAspectRatio="none">
                      <path d="M2 13.5 C 200 12.5, 420 9, 634 2" />
                      <path d="M2 13 L 634 13" />
                    </svg>
                  </span>
                </>
              ) : (
                <Words words={line} />
              )}
            </span>
          ))}
        </h1>

        <p className="ag-hero__text">{hero.text}</p>

        <div className="ag-hero__actions">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
        </div>
      </div>

      <div className="container">
        <div className="ag-journey">
          <span className="ag-journey__line" aria-hidden="true"><i /></span>
          <span className="ag-journey__parcel" aria-hidden="true" />
          <ol className="ag-journey__list" aria-label="From faraway fields to procurement centers, from warehouses to retail stores">
            {hero.journey.map(({ label: l, icon: Icon }) => (
              <li className="ag-journey__node" key={l}>
                <span className="ag-journey__dot"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                <span className="ag-journey__label">{l}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
