import { testimonials } from '../../data/content.js';
import SplitText from '../ui/SplitText.jsx';
import { QuoteMark } from '../ui/Icons.jsx';
import useCarousel from '../ui/useCarousel.js';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/testimonials.css';

export default function Testimonials() {
  const ref = useSectionReveal();
  const { items } = testimonials;
  const c = useCarousel(items.length);

  return (
    <section className="quotes" ref={ref} aria-labelledby="quotes-title" aria-roledescription="carousel">
      <div className="container">
        <SplitText as="h2" id="quotes-title" className="h2 h2--medium quotes__title" lines={[['What', 'Our', 'Customers', 'Are'], ['Talking', 'About']]} accentFrom={4} />
      </div>

      <ul className="quotes__track bleed-track" ref={c.track} tabIndex={0} onKeyDown={c.onKeyDown} aria-label="Customer testimonials" data-reveal-group="">
        {items.map((t, i) => (
          <li className={`quote ${c.index === i ? 'is-current' : ''}`} key={t.name + i} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} data-placeholder={t.placeholder || undefined}>
            <figure>
              <QuoteMark className="quote__mark" />
              <blockquote className="quote__text"><p>{t.quote}</p></blockquote>
              <figcaption className="quote__author">
                <span className="quote__logo"><img src={t.logo} alt={t.logoAlt} loading="lazy" /></span>
                <span>
                  <span className="quote__name">{t.name}</span>
                  <span className="quote__role">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="quotes__dots" role="tablist" aria-label="Choose testimonial">
        {items.slice(0, c.pages).map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={c.index === i}
            aria-label={`Go to testimonial ${i + 1}`}
            className={c.index === i ? 'is-active' : ''}
            onClick={() => c.goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
