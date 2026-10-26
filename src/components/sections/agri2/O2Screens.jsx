import {
  Sprout, LayoutDashboard, Users, MapPinned, Package, Wallet, ScanBarcode, BadgeCheck, BarChart3,
  Check, X, Mic, Search,
} from 'lucide-react';

/* App-screen mockups for the modules showcase. Pure presentational: every value
   comes from the module's `screen` / `phone` data (sample data, see agriOption2.js). */

const NAV_ICONS = {
  Dashboard: LayoutDashboard, Farmers: Users, Plots: MapPinned, Inputs: Package,
  Procurement: Wallet, Traceability: ScanBarcode, Certification: BadgeCheck, Reports: BarChart3,
};

const fmt = (v) => {
  const dec = String(v).includes('.') ? String(v).split('.')[1].length : 0;
  return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
};

/* Farm-plot polygons drawn over the satellite image (viewBox 400x338). */
const PLOTS = [
  'M80 120 L160 98 L202 142 L140 182 L88 170 Z',
  'M236 186 L300 170 L334 206 L280 240 Z',
  'M64 236 L140 230 L146 286 L72 292 Z',
];

function Visual({ s, mapImage }) {
  if (s.visual === 'map') {
    return (
      <div className="o2v-map" style={{ backgroundImage: `url(${mapImage})` }}>
        <svg viewBox="0 0 400 338" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {PLOTS.map((d, i) => <path key={i} d={d} className="o2-poly" style={{ opacity: i ? 0.65 : 1 }} />)}
        </svg>
        <span className="o2v-map__label"><i />{s.mapLabel}</span>
        <span className="o2v-map__legend">{s.mapLegend}</span>
      </div>
    );
  }
  if (s.visual === 'bars') {
    return (
      <div className="o2v-card">
        <p className="o2v-card__title">{s.chartTitle}</p>
        <div className="o2v-bars">
          {s.bars.map(([l, v], i) => (
            <div className="o2v-bar" key={l}>
              <span className="o2v-bar__track"><i style={{ height: `${v}%` }} className={i === s.bars.length - 1 ? 'is-hi' : ''} /></span>
              <span className="o2v-bar__label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (s.visual === 'timeline') {
    return (
      <div className="o2v-card">
        <p className="o2v-card__title">{s.timelineTitle}</p>
        <ol className="o2v-steps">
          {s.steps.map(([t, d], i) => (
            <li key={t} className={i < s.current ? 'is-done' : i === s.current ? 'is-now' : ''}>
              <span className="o2v-steps__dot">{i < s.current ? <Check size={11} strokeWidth={3} /> : null}</span>
              <span><b>{t}</b><small>{d}</small></span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div className="o2v-card">
      <p className="o2v-card__title">{s.checklistTitle}</p>
      <ul className="o2v-checks">
        {s.checks.map(([t, ok]) => (
          <li key={t} className={ok ? 'is-ok' : 'is-no'}>
            <span>{ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}</span>{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardScreen({ m, nav, mapImage }) {
  const s = m.screen;
  return (
    <div className="o2d" aria-hidden="true">
      <div className="o2d__bar"><i /><i /><i /><span className="o2d__url">DATAGREEN · {s.title}</span></div>
      <div className="o2d__body">
        <aside className="o2d__side">
          <div className="o2d__logo"><Sprout size={18} />DATAGREEN</div>
          {nav.map((n) => {
            const Icon = NAV_ICONS[n];
            return <div key={n} className={`o2d__nav ${n === s.nav ? 'is-active' : ''}`}><Icon size={15} />{n}</div>;
          })}
        </aside>
        <div className="o2d__main" data-swap="">
          <div className="o2d__top">
            <div><p className="o2d__title">{s.title}</p><p className="o2d__sub">{s.sub}</p></div>
            <div className="o2d__actions">
              <span className="o2d__search"><Search size={12} />Search…</span>
              <span className="o2d__btn">{s.action}</span>
            </div>
          </div>
          <div className="o2d__kpis">
            {s.kpis.map(([l, v, suf, d]) => (
              <div className="o2d__kpi" key={l}>
                <p>{l}</p>
                <div><b><span data-count={v}>{fmt(v)}</span>{suf}</b><em>{d}</em></div>
              </div>
            ))}
          </div>
          <div className="o2d__lower">
            <div className="o2d__visual"><Visual s={s} mapImage={mapImage} /></div>
            <div className="o2d__list">
              <p className="o2d__list-title">{s.listTitle}</p>
              {s.rows.map(([n, sub, st, tone]) => (
                <div className="o2d__row" key={n}>
                  <span className="o2d__avatar">{/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(n) ? n.split(' ').map((w) => w[0]).join('') : <Check size={13} strokeWidth={2.6} />}</span>
                  <span className="o2d__who"><b>{n}</b><small>{sub}</small></span>
                  <span className={`o2-status o2-status--${tone}`}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneCard({ p, plotImage }) {
  switch (p.card) {
    case 'map':
      return (
        <div className="o2p-card">
          <div className="o2p-card__map" style={{ backgroundImage: `url(${plotImage})` }}>
            <svg viewBox="0 0 222 84" aria-hidden="true"><path className="o2-poly" d="M60 18 L130 6 L166 36 L112 70 L66 62 Z" /></svg>
          </div>
          <div className="o2p-card__meta"><span><b>{p.cardTitle}</b><small>{p.cardMeta}</small></span><i className="o2p-ok"><Check size={12} strokeWidth={3} /></i></div>
        </div>
      );
    case 'checklist':
      return (
        <div className="o2p-card o2p-card--pad">
          <b className="o2p-card__h">{p.cardTitle}</b>
          {p.checks.map((c) => <span className="o2p-check" key={c}><i className="o2p-ok"><Check size={11} strokeWidth={3} /></i>{c}</span>)}
        </div>
      );
    case 'qr':
      return (
        <div className="o2p-card o2p-card--pad o2p-card--row">
          <svg className="o2p-qr" viewBox="0 0 21 21" aria-hidden="true">
            {[...Array(21 * 21)].map((_, i) => {
              const x = i % 21, y = Math.floor(i / 21);
              const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
              const ring = finder && (x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6 || ((x % 14) > 1 && (x % 14) < 5 && (y % 14) > 1 && (y % 14) < 5));
              const on = finder ? ring : ((x * 7 + y * 13 + x * y) % 5 < 2);
              return on ? <rect key={i} x={x} y={y} width="1" height="1" /> : null;
            })}
          </svg>
          <span><b>{p.cardTitle}</b><small>{p.cardMeta}</small><i className="o2-status o2-status--ok">Verified</i></span>
        </div>
      );
    case 'voice':
      return (
        <div className="o2p-card o2p-card--pad o2p-card--row">
          <span className="o2p-mic"><Mic size={18} /></span>
          <span className="o2p-wave">{[6, 12, 18, 10, 22, 14, 8, 16, 20, 9, 13, 6].map((h, i) => <i key={i} style={{ height: h }} />)}</span>
          <span className="o2p-voice-meta"><b>{p.cardTitle}</b><small>{p.cardMeta}</small></span>
        </div>
      );
    case 'bars':
      return (
        <div className="o2p-card o2p-card--pad">
          <b className="o2p-card__h">{p.cardTitle}</b>
          <span className="o2p-minibars">{[40, 62, 48, 78, 66, 90, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</span>
          <small className="o2p-card__s">{p.cardMeta}</small>
        </div>
      );
    default: // stock / amount
      return (
        <div className="o2p-card o2p-card--pad">
          <small className="o2p-card__s">{p.cardTitle}</small>
          <b className="o2p-big">{p.cardValue}</b>
          <small className="o2p-card__s">{p.cardMeta}</small>
        </div>
      );
  }
}

export function PhoneScreen({ m, plotImage, photoImages }) {
  const p = m.phone;
  return (
    <div className="o2p" aria-hidden="true">
      <div className="o2p__screen">
        <div className="o2p__hdr">
          <div className="o2p__status"><span>9:41</span><i className="o2p__bat"><i /></i></div>
          <div data-swap-phone="">
            <b className="o2p__title">{p.title}</b>
            <span className="o2p__step">{p.step}</span>
          </div>
          <div className="o2p__prog">{[0, 1, 2, 3].map((i) => <i key={i} className={i < p.progress ? 'is-on' : ''} />)}</div>
        </div>
        <div className="o2p__body" data-swap-phone="">
          {p.fields.map(([l, v]) => (
            <label className="o2p-field" key={l}><span>{l}</span><b>{v}</b></label>
          ))}
          <PhoneCard p={p} plotImage={plotImage} />
          {p.photos && (
            <div className="o2p-photos">
              <span>Farm photos</span>
              <div>{photoImages.map((src) => <i key={src} style={{ backgroundImage: `url(${src})` }} />)}<i className="o2p-add">+</i></div>
            </div>
          )}
        </div>
        <div className="o2p__foot">
          <span className="o2p__offline"><i />Offline · will sync automatically</span>
          <span className="o2p__cta">{p.cta}</span>
        </div>
      </div>
    </div>
  );
}
