import { stats, social } from '../../data/content.js';
import Counter from '../ui/Counter.jsx';
import ExplorePill from '../ui/ExplorePill.jsx';
import { ArrowUpRight, SocialIcon } from '../ui/Icons.jsx';

function StatBody({ s }) {
  return (
    <div className="stat-card__body">
      <p className="stat-card__value">
        <Counter value={s.count} suffix={s.suffix} triggerFrom=".stats" start="top 62%" />
      </p>
      <p className="stat-card__label">{s.label}</p>
      <p className="stat-card__text" data-placeholder={s.placeholder || undefined}>{s.text}</p>
    </div>
  );
}

export default function ImpactStats() {
  return (
    <div className="stats container" role="list" aria-label="SourceTrace impact in numbers">
      {stats.map((s) => (
        <article key={s.id} role="listitem" className={`stat-card stat-card--${s.variant} stat-card--${s.height}`}>
          {s.image && (
            <div className="stat-card__media" aria-hidden="true">
              <img src={s.image} alt="" loading="eager" />
            </div>
          )}

          {s.variant === 'social' ? (
            <div className="stat-card__social">
              <h2 className="stat-card__social-title">{s.title}</h2>
              <div className="stat-card__social-row">
                <ul className="stat-card__icons">
                  {social.filter((x) => x.id !== 'x').map((x) => (
                    <li key={x.id}>
                      <a href={x.href} target="_blank" rel="noreferrer" aria-label={`SourceTrace on ${x.label}`}>
                        <SocialIcon id={x.id} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="stat-card__go" href={social[0].href} target="_blank" rel="noreferrer" aria-label="Follow SourceTrace">
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          ) : (
            <StatBody s={s} />
          )}

          {s.cta && (
            <div className="stat-card__cta">
              <ExplorePill href={s.cta.href} label={s.cta.label} tone={s.variant === 'lime' ? 'lime' : 'mint'} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
