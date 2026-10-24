import { trustedBrands } from '../../data/content.js';
import Marquee from '../ui/Marquee.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/brands.css';

export default function TrustedBrands() {
  const ref = useSectionReveal();
  return (
    <section className="brands" ref={ref} aria-labelledby="brands-title">
      <h2 className="eyebrow brands__title" id="brands-title" data-reveal="">{trustedBrands.title}</h2>
      <div data-reveal="">
        <Marquee
          label="Partner and client logos"
          items={trustedBrands.logos}
          speed={45}
          renderItem={(logo, dup) => (
            <div className="logo-tile">
              <img src={logo.src} alt={dup ? '' : logo.name} loading="lazy" width="126" height="100" />
            </div>
          )}
        />
      </div>
    </section>
  );
}
