import { platform } from '../../data/content.js';
import SplitText from '../ui/SplitText.jsx';
import RoundArrowButton from '../ui/RoundArrowButton.jsx';
import { AngleRight, Leaf } from '../ui/Icons.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../animations/gsapConfig.js';
import '../../styles/sections/platform.css';

/* Sticky stack only where the two-column card fits on screen (matches platform.css). */
const MQ_STACK = '(min-width: 1101px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

export default function PlatformFeatures() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    mm.add(MQ.motion, () => {
      q('.platform__slot').forEach((slot) => {
        const card = slot.querySelector('.platform__card');
        const top = () => parseFloat(getComputedStyle(slot).top) || 0;

        // Card tips up from a tilted plane as it scrolls into its resting place.
        gsap.fromTo(card, { rotationX: 20, transformPerspective: 1000, transformOrigin: '50% 100%' }, {
          rotationX: 0, ease: 'none',
          scrollTrigger: { trigger: slot, start: 'top bottom', end: () => `top ${top() + 40}px`, scrub: true, invalidateOnRefresh: true },
        });

        const tl = gsap.timeline({ scrollTrigger: { trigger: slot, start: 'top 75%', once: true } });
        tl.from(slot.querySelectorAll('.platform__body > *'), { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08 })
          .from(slot.querySelectorAll('.feature'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.25)
          .from(slot.querySelectorAll('.feature__icon'), { scale: 0, rotate: -90, duration: 0.7, stagger: 0.07, ease: 'back.out(2)' }, 0.35);
      });
    });

    // Covered cards recede (shrink + dim) while the ones after them slide over.
    mm.add(MQ_STACK, () => {
      const slots = q('.platform__slot');
      const last = slots[slots.length - 1];
      slots.slice(0, -1).forEach((slot, i) => {
        const depth = slots.length - 1 - i;
        gsap.to(slot, {
          scale: 1 - depth * 0.04, '--dim': 0.12 * depth, ease: 'none', transformOrigin: '50% 0%',
          scrollTrigger: {
            trigger: slots[i + 1], start: 'top bottom',
            endTrigger: last, end: () => `top ${parseFloat(getComputedStyle(last).top) || 0}px`,
            scrub: true, invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => mm.revert();
  });

  return (
    <section className="platform" ref={ref} aria-labelledby="platform-title">
      <div className="container">
        <SplitText as="h2" id="platform-title" className="h2 platform__title" lines={[['One', 'Platform', 'For', 'Traceability,'], ['Compliance', 'And', 'Farm', 'Operations.']]} accentFrom={4} />

        <div className="platform__stack">
          {platform.cards.map((card, i) => (
            <div className="platform__slot" style={{ '--i': i, '--n': platform.cards.length }} key={card.title}>
              <article className="platform__card">
                <figure className="platform__media">
                  <img src={card.image} alt={card.imageAlt} loading="lazy" width="1138" height="640" />
                </figure>
                <div className="platform__body">
                  <div className="platform__head">
                    <h3 className="platform__card-title">{card.title}</h3>
                    <RoundArrowButton href={card.href} label={`Learn more about ${card.title}`} />
                  </div>
                  <p className="platform__text">{card.text}</p>
                  <p className="platform__kicker"><AngleRight size={25} /> {card.kicker}</p>
                  <ul className="platform__features">
                    {card.features.map((f) => (
                      <li className="feature" key={f.title}>
                        <Leaf className="feature__icon" size={18} />
                        <div>
                          <h4 className="feature__title">{f.title}</h4>
                          <p className="feature__text">{f.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
