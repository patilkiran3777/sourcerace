import { agriStats as s } from '../../../data/agriculture.js';
import Counter from '../../ui/Counter.jsx';
import SplitText from '../../ui/SplitText.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';

export default function AgriStats() {
  const ref = useSectionReveal();
  return (
    <section className="ag-stats" ref={ref} aria-labelledby="ag-stats-title">
      <div className="container ag-stats__layout">
        <SplitText as="h2" id="ag-stats-title" className="ag-stats__title" text={s.title} accentFrom={4} />
        <ul className="ag-stats__grid" data-reveal-group="">
          {s.items.map((it) => (
            <li className="ag-stat" key={it.id}>
              <Counter value={it.value} suffix={it.suffix} className="ag-stat__value" />
              <p className="ag-stat__label">{it.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
