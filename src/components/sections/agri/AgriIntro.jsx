import { agriIntro as c } from '../../../data/agriculture.js';
import Button from '../../ui/Button.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../../animations/gsapConfig.js';

/* Second live paragraph, set as a large statement next to the field photo.
   Words light up one by one as the paragraph scrolls through the viewport. */
export default function AgriIntro() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(root.querySelectorAll('.ag-intro__text .w'), { opacity: 0.18 }, {
        opacity: 1, ease: 'none', stagger: 0.04,
        scrollTrigger: { trigger: root.querySelector('.ag-intro__text'), start: 'top 75%', end: 'bottom 45%', scrub: true },
      });
    });
    return () => mm.revert();
  });

  const words = c.text.split(' ');
  return (
    <section className="ag-intro" ref={ref} aria-label="DATAGREEN solution">
      <div className="container ag-intro__grid">
        <div className="ag-intro__copy">
          <p className="ag-intro__text">
            {words.map((w, i) => <span className="w" key={i}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
          </p>
          <div className="ag-intro__actions" data-reveal="">
            <Button href={c.cta.href}>{c.cta.label}</Button>
          </div>
        </div>
        <figure className="ag-intro__media" data-reveal-image="">
          <img src={c.image} alt={c.imageAlt} loading="lazy" width="760" height="860" />
        </figure>
      </div>
    </section>
  );
}
