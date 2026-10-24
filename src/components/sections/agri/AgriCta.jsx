import { agriCta as c } from '../../../data/agriculture.js';
import Button from '../../ui/Button.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../../animations/gsapConfig.js';

/* The live whitepaper pop-up, turned into an in-page closing banner. */
export default function AgriCta() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(root.querySelector('.ag-cta__panel'),
        { clipPath: 'inset(8% 6% 8% 6% round 80px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 60px)', ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 40%', scrub: true } });
    });
    return () => mm.revert();
  });

  return (
    <section className="ag-cta" ref={ref} aria-label="Whitepaper">
      <div className="container">
        <div className="ag-cta__panel">
          <div className="ag-cta__bg" aria-hidden="true"><img src={c.image} alt="" loading="lazy" data-parallax="14" /></div>
          <p className="ag-cta__text" data-reveal="">{c.text}</p>
          <div className="ag-cta__actions" data-reveal="">
            <Button href={c.primary.href}>{c.primary.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
