import { Check } from 'lucide-react';
import { agriChallenge as c } from '../../../data/agriculture.js';
import SplitText from '../../ui/SplitText.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../../animations/gsapConfig.js';

export default function AgriChallenge() {
  const ref = useSectionReveal((root) => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      // Floating UI chips pop in after the photo wipe, then drift at their own depth.
      gsap.from(q('.ag-float'), {
        scale: 0.85, y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.15, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: q('.ag-challenge__visual')[0], start: 'top 70%', once: true },
      });
      gsap.from(q('.ag-float__list li'), {
        x: -12, autoAlpha: 0, duration: 0.6, stagger: 0.12, delay: 0.5,
        scrollTrigger: { trigger: q('.ag-challenge__visual')[0], start: 'top 70%', once: true },
      });
      q('[data-float]').forEach((el) => {
        gsap.to(el, {
          y: parseFloat(el.dataset.float), ease: 'none',
          scrollTrigger: { trigger: q('.ag-challenge__visual')[0], start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });
    return () => mm.revert();
  });

  return (
    <section className="ag-challenge" ref={ref} aria-labelledby="ag-challenge-title">
      <div className="container ag-challenge__grid">
        <div className="ag-challenge__copy">
          <p className="eyebrow ag-eyebrow" data-reveal="">{c.eyebrow}</p>
          <SplitText as="h2" id="ag-challenge-title" className="h2" text={c.title} accentFrom={c.accentFrom} />
          <p className="body-lg ag-challenge__text" data-reveal="">{c.text}</p>
          <ul className="ag-stack" data-reveal-group="">
            {c.stack.map(({ icon: Icon, title, text }) => (
              <li className="ag-stack__item" key={title}>
                <span className="ag-stack__icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                <div>
                  <h3 className="ag-stack__title">{title}</h3>
                  <p className="ag-stack__text">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="ag-challenge__visual">
          <figure className="ag-challenge__media" data-reveal-image="">
            <img src={c.image} alt={c.imageAlt} loading="lazy" width="680" height="780" />
          </figure>
          <div className="ag-float ag-float--sync" data-float="-40" aria-hidden="true">
            <span className="ag-pulse" />{c.sync}
          </div>
          <div className="ag-float ag-float--record" data-float="-90" aria-hidden="true">
            <p className="ag-float__kicker">{c.record.kicker}</p>
            <p className="ag-float__id">{c.record.id}</p>
            <ul className="ag-float__list">
              {c.record.items.map((t) => (
                <li key={t}><Check size={16} strokeWidth={2.4} />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
