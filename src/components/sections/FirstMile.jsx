import { firstMile } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import SplitText from '../ui/SplitText.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/first-mile.css';

export default function FirstMile() {
  const ref = useSectionReveal();
  return (
    <section className="first-mile" ref={ref} aria-labelledby="first-mile-title">
      <div className="container first-mile__intro">
        <div className="first-mile__copy">
          <SplitText as="h2" id="first-mile-title" className="h2" text={firstMile.title} accentFrom={6} />
          <p className="body-lg first-mile__text" data-reveal="">{firstMile.text}</p>
          <div className="first-mile__actions" data-reveal="">
            <Button href={firstMile.readMore.href} variant="outline-gradient" icon={false}>{firstMile.readMore.label}</Button>
            <Button href={firstMile.demo.href}>{firstMile.demo.label}</Button>
          </div>
        </div>
        <figure className="first-mile__media" data-reveal-image="">
          <img src={firstMile.image} alt={firstMile.imageAlt} loading="lazy" width="675" height="560" />
        </figure>
      </div>

      <div className="first-mile__benefits">
        <span className="first-mile__rule first-mile__rule--top container" aria-hidden="true"><i data-reveal-line="" /></span>
        <ul className="container first-mile__grid" data-reveal-group="">
          {firstMile.benefits.map((b, i) => (
            <li className="benefit" key={b.title}>
              {i > 0 && <span className="benefit__divider" aria-hidden="true" data-reveal-vline="" />}
              <span className="benefit__icon"><img src={b.icon} alt="" width="66" height="66" loading="lazy" /></span>
              <h3 className="benefit__title">{b.title}</h3>
              <p className="benefit__text">{b.text}</p>
            </li>
          ))}
        </ul>
        <span className="first-mile__rule first-mile__rule--bottom" aria-hidden="true" data-reveal-line="" />
      </div>
    </section>
  );
}
