import { caseStudies } from '../../data/content.js';
import RoundArrowButton from '../ui/RoundArrowButton.jsx';
import SplitText from '../ui/SplitText.jsx';
import { ArrowLong } from '../ui/Icons.jsx';
import useCarousel from '../ui/useCarousel.js';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/cases.css';

export default function CaseStudies() {
  const ref = useSectionReveal();
  const c = useCarousel(caseStudies.items.length);

  return (
    <section className="cases" ref={ref} aria-labelledby="cases-title" aria-roledescription="carousel">
      <div className="container cases__head">
        <SplitText as="h2" id="cases-title" className="h2 cases__title" text={caseStudies.title} accentFrom={1} />
        <div className="cases__nav" data-reveal="">
          <RoundArrowButton direction="prev" label="Previous case study" onClick={c.prev} disabled={c.edges.start} />
          <RoundArrowButton direction="next" label="Next case study" onClick={c.next} disabled={c.edges.end} />
        </div>
      </div>

      <ul className="cases__track bleed-track" ref={c.track} tabIndex={0} onKeyDown={c.onKeyDown} aria-label="Case studies" data-reveal-group="">
        {caseStudies.items.map((item, i) => (
          <li className="case" key={item.id} aria-roledescription="slide" aria-label={`${i + 1} of ${caseStudies.items.length}`}>
            <div className="case__logo">
              <img src={item.logo} alt={item.logoAlt} loading="lazy" />
            </div>
            <div className="case__body">
              <h3 className="case__title">{item.title}</h3>
              <p className="case__text">{item.text}</p>
              <a className="text-link case__link" href={item.href}>
                Read More <ArrowLong width={22} />
                <span className="sr-only"> about {item.title}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
