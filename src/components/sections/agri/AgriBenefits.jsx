import { agriBenefits as b } from '../../../data/agriculture.js';
import SplitText from '../../ui/SplitText.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../../animations/gsapConfig.js';
import { onSpotlight } from '../../ui/spotlight.js';

export default function AgriBenefits() {
  const ref = useSectionReveal((root) => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: q('.ag-benefits__grid')[0], start: 'top 82%', once: true } });
      tl.from(q('.ag-benefit'), { y: 50, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: { each: 0.07, grid: 'auto', from: 'start' } })
        .from(q('.ag-benefit__icon'), { scale: 0, rotation: -120, duration: 0.8, ease: 'back.out(2)', stagger: 0.07 }, 0.2);
    });
    return () => mm.revert();
  });

  return (
    <section className="ag-benefits" ref={ref} aria-labelledby="ag-benefits-title">
      <div className="container">
        <SplitText as="h2" id="ag-benefits-title" className="h2" text={b.title} />
        <ul className="ag-benefits__grid">
          {b.items.map(({ icon: Icon, title }, i) => (
            <li className="ag-benefit" key={title} onPointerMove={onSpotlight}>
              <div className="ag-benefit__top">
                <span className="ag-benefit__icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
                <span className="ag-benefit__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="ag-benefit__title">{title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
