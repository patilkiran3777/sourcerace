import { Check } from 'lucide-react';
import { agriModules as m } from '../../../data/agriculture.js';
import SplitText from '../../ui/SplitText.jsx';
import Button from '../../ui/Button.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, ScrollTrigger, MQ } from '../../../animations/gsapConfig.js';
import { onSpotlight } from '../../ui/spotlight.js';

const pad = (n) => String(n).padStart(2, '0');

export default function AgriModules() {
  const ref = useSectionReveal((root) => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      q('.ag-module').forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
        tl.from(card, { y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out' })
          .from(card.querySelector('.ag-module__icon'), { scale: 0, rotation: -90, duration: 0.8, ease: 'back.out(2)' }, 0.2)
          .from(card.querySelectorAll('.ag-module__points li'), { x: -16, autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 0.3);
      });
    });

    // Sticky index: highlight the module in view, fill the rail with scroll progress.
    const links = q('.ag-index__item');
    const triggers = q('.ag-module').map((card, i) =>
      ScrollTrigger.create({
        trigger: card, start: 'top 55%', end: 'bottom 55%',
        toggleClass: { targets: card, className: 'is-active' },
        onToggle: (self) => { if (self.isActive) links.forEach((l, j) => l.classList.toggle('is-active', j === i)); },
      }),
    );
    const progress = gsap.fromTo(q('.ag-index__progress i'), { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: q('.ag-modules__list')[0], start: 'top 55%', end: 'bottom 55%', scrub: true },
    });
    return () => { mm.revert(); progress.scrollTrigger?.kill(); progress.kill(); triggers.forEach((t) => t.kill()); };
  });

  return (
    <section className="ag-modules" id="modules" ref={ref} aria-labelledby="ag-modules-title">
      <div className="container">
        <div className="ag-head">
          <SplitText as="h2" id="ag-modules-title" className="h2" text={m.title} accentFrom={2} />
          <p className="body-lg ag-head__text" data-reveal="">{m.text}</p>
        </div>

        <div className="ag-modules__layout">
          <aside className="ag-index" aria-label={m.title}>
            <div className="ag-index__track">
              <span className="ag-index__progress" aria-hidden="true"><i /></span>
              <ol>
                {m.items.map((it, i) => (
                  <li className={`ag-index__item ${i === 0 ? 'is-active' : ''}`} key={it.id}>
                    <a href={`#${it.id}`}><span className="ag-index__num">{pad(i + 1)}</span><strong>{it.short}</strong></a>
                  </li>
                ))}
              </ol>
            </div>
            <Button href={m.cta.href}>{m.cta.label}</Button>
          </aside>

          <ol className="ag-modules__list">
            {m.items.map(({ id, icon: Icon, title, text, points }, i) => (
              <li className="ag-module" id={id} key={id} onPointerMove={onSpotlight}>
                <div className="ag-module__head">
                  <div className="ag-module__top">
                    <span className="ag-module__icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
                    <span className="ag-module__num" aria-hidden="true">{pad(i + 1)}</span>
                  </div>
                  <h3 className="ag-module__title">{title}</h3>
                  {text && <p className="ag-module__text">{text}</p>}
                </div>
                <ul className="ag-module__points">
                  {points.map((p) => (
                    <li key={p}><Check size={16} strokeWidth={2.4} aria-hidden="true" />{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
