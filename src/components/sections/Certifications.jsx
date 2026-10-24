import { certifications } from '../../data/content.js';
import Marquee from '../ui/Marquee.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/certifications.css';

export default function Certifications() {
  const ref = useSectionReveal();
  return (
    <section className="certs" ref={ref} aria-labelledby="certs-title">
      <span className="certs__line certs__line--top" data-reveal-line="" aria-hidden="true" />
      <div className="certs__inner">
        <h2 className="eyebrow certs__title" id="certs-title" data-reveal="">
          Certifications &amp;<br /> Accreditations
        </h2>
        <div className="certs__rail" data-reveal="right">
          <Marquee
            label="Certifications and accreditations"
            items={certifications.logos}
            speed={35}
            renderItem={(c, dup) => (
              <div className="logo-tile">
                <img src={c.src} alt={dup ? '' : c.name} loading="lazy" width="110" height="110" />
              </div>
            )}
          />
        </div>
      </div>
      <span className="certs__line certs__line--bottom" data-reveal-line="" aria-hidden="true" />
    </section>
  );
}
