import { agriResources as r } from '../../../data/agriculture.js';
import useSectionReveal from '../../../hooks/useSectionReveal.js';

export default function AgriResources() {
  const ref = useSectionReveal();
  return (
    <section className="ag-resources" ref={ref} aria-label="Resources">
      <div className="container">
        <ul className="ag-resources__grid" data-reveal-group="">
          {r.items.map((it) => (
            <li className="ag-res" key={it.type}>
              <div className="ag-res__media">
                <img src={it.image} alt="" loading="lazy" width="640" height="400" />
                <span className="ag-res__type">{it.type}</span>
              </div>
              <div className="ag-res__body">
                <h3 className="ag-res__title"><a className="ag-res__link" href={it.href}>{it.title}</a></h3>
                <span className="text-link" aria-hidden="true">{it.cta}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
