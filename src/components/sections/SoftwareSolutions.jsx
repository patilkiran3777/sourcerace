import { solutions } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import SplitText from '../ui/SplitText.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import { gsap, ScrollTrigger, MQ } from '../../animations/gsapConfig.js';
import '../../styles/sections/solutions.css';

/* Cursor-follow spotlight (Linear-style) driven by CSS custom properties. */
function onPointerMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function SoftwareSolutions() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);
    mm.add(MQ.motion, () => {
      gsap.from(q('.solution'), {
        y: 110, autoAlpha: 0, duration: 1.3, ease: 'expo.out', stagger: { each: 0.1, from: 'start' },
        scrollTrigger: { trigger: q('.solutions__grid')[0], start: 'top 82%', once: true },
      });
      q('.solution__media img').forEach((img) => {
        gsap.fromTo(img, { yPercent: 6 }, {
          yPercent: -6, ease: 'none',
          scrollTrigger: { trigger: img.closest('.solution'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });
    // Scroll focus: the card crossing the viewport centre becomes the "active" feature.
    const triggers = q('.solution').map((card) =>
      ScrollTrigger.create({
        trigger: card, start: 'top 62%', end: 'bottom 38%',
        toggleClass: { targets: card, className: 'is-active' },
      }),
    );
    return () => { mm.revert(); triggers.forEach((t) => t.kill()); };
  });

  return (
    <section className="solutions" ref={ref} aria-labelledby="solutions-title">
      <div className="container">
        <div className="solutions__head">
          <SplitText as="h2" id="solutions-title" className="h2 h2--medium solutions__title" lines={[["SourceTrace's", 'Software'], ['Solutions']]} accentFrom={2} />
          <div data-reveal="">
            <Button href={solutions.cta.href}>{solutions.cta.label}</Button>
          </div>
        </div>

        <ul className="solutions__grid">
          {solutions.items.map((s) => (
            <li key={s.id} className={`solution solution--${s.size}`} onPointerMove={onPointerMove}>
              <div className="solution__media" aria-hidden="true">
                <img src={s.image} alt="" loading="lazy" />
              </div>
              <div className="solution__body">
                <h3 className="solution__title">{s.title}</h3>
                <p className="solution__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
