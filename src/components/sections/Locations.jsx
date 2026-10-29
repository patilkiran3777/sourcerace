import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AE, BD, CA, ET, IN, KE, NL, NP, SL, TH, TZ, UG, US, ZW } from 'country-flag-icons/react/3x2';
import { ArrowUpRight, Minus, Plus, RotateCcw } from 'lucide-react';
import { locations } from '../../data/content.js';
import { COUNTRIES, MAP_HEIGHT, MAP_WIDTH, project } from '../../data/worldMap.js';
import SplitText from '../ui/SplitText.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../animations/gsapConfig.js';
import '../../styles/sections/locations.css';

const FLAGS = { AE, BD, CA, ET, IN, KE, NL, NP, SL, TH, TZ, UG, US, ZW };
const HOME = { cx: MAP_WIDTH / 2, cy: MAP_HEIGHT / 2, zoom: 1 };
const MAX_ZOOM = 6;

/* Keep the visible window inside the map. */
const clampView = ({ cx, cy, zoom }) => {
  const w = MAP_WIDTH / zoom, h = MAP_HEIGHT / zoom;
  return {
    zoom,
    cx: Math.min(MAP_WIDTH - w / 2, Math.max(w / 2, cx)),
    cy: Math.min(MAP_HEIGHT - h / 2, Math.max(h / 2, cy)),
  };
};

const TABS = [
  { id: 'offices', label: 'Regional Offices', items: locations.offices },
  { id: 'partners', label: 'Global Partner', items: locations.partners, hint: 'global partners worldwide' },
  { id: 'countries', label: 'Countries Served', items: locations.countries, hint: 'countries served' },
];

const Flag = ({ code }) => {
  const F = FLAGS[code];
  return <span className="loc__flag" aria-hidden="true">{F && <F />}</span>;
};

const go = (href) => { if (href) window.location.assign(href); };

export default function Locations() {
  const [mode, setMode] = useState('offices');
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState(HOME);
  const svgRef = useRef(null);
  const drag = useRef(null);
  const first = useRef(true);
  const tabsRef = useRef(null);

  const tab = TABS.find((t) => t.id === mode);
  const isOffice = mode === 'offices';
  const look = isOffice ? 'offices' : 'partners'; // Countries Served reuses the compact partner list/pins
  const byIso = useMemo(() => Object.fromEntries(tab.items.map((l) => [l.iso, l])), [tab]);
  const hotLoc = tab.items.find((l) => l.id === hovered);

  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: q('.loc__map-card')[0], start: 'top 80%', once: true } });
      tl.from(q('.loc__map-card'), { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out' })
        .from(q('.loc__geo.is-on'), { autoAlpha: 0, duration: 0.8, stagger: 0.08, clearProps: 'opacity,visibility' }, 0.3)
        .from(q('.loc__pin'), { scale: 0, transformOrigin: '50% 50%', duration: 0.7, stagger: 0.1, ease: 'back.out(3)', clearProps: 'transform' }, 0.6);
    });
    return () => mm.revert();
  });

  // Switching tabs: list rows and pins re-enter.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia(MQ.reduce).matches) return;
    const q = gsap.utils.selector(ref.current);
    gsap.fromTo(q('.loc__item'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    gsap.fromTo(q('.loc__pin'), { scale: 0 }, { scale: 1, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.05, ease: 'back.out(3)', clearProps: 'transform' });
  }, [mode, ref]);

  // Active tab pill: one shared background that slides to the selected button.
  useLayoutEffect(() => {
    const wrap = tabsRef.current;
    const place = () => {
      const btn = wrap.querySelector('.loc__tab.is-active');
      if (!btn) return;
      wrap.style.setProperty('--pill-x', `${btn.offsetLeft}px`);
      wrap.style.setProperty('--pill-w', `${btn.offsetWidth}px`);
    };
    place();
    // Enable the slide only after the first placement so it doesn't animate in from 0.
    const raf = requestAnimationFrame(() => wrap.classList.add('is-ready'));
    const ro = new ResizeObserver(place);
    ro.observe(wrap);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [mode]);

  const zoomBy = (f) => setView((v) => clampView({ ...v, zoom: Math.min(MAX_ZOOM, Math.max(1, v.zoom * f)) }));
  const k = 1 / view.zoom;
  const vw = MAP_WIDTH * k, vh = MAP_HEIGHT * k;

  // Drag to pan once zoomed in (at 100% the whole map is visible, so touch keeps scrolling the page).
  const onPointerDown = (e) => {
    if (view.zoom <= 1) return;
    drag.current = { x: e.clientX, y: e.clientY, view, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const scale = vw / svgRef.current.getBoundingClientRect().width;
    const dx = (e.clientX - d.x) * scale, dy = (e.clientY - d.y) * scale;
    if (Math.abs(dx) + Math.abs(dy) > 2 * scale) d.moved = true;
    setView(clampView({ ...d.view, cx: d.view.cx - dx, cy: d.view.cy - dy }));
  };
  const endDrag = () => { setTimeout(() => { drag.current = null; }, 0); };
  // A drag that ends over an office must not navigate to it.
  const open = (href) => { if (!drag.current?.moved) go(href); };
  const at = (l) => project(l.coords);

  return (
    <section className="loc" ref={ref} aria-labelledby="loc-title">
      <div className="container">
        <div className="loc__head">
          <div>
            <SplitText as="h2" id="loc-title" className="h2 h2--medium loc__title" lines={[['Our', 'Business'], ['Location']]} accentFrom={2} />
          </div>
          <div className="loc__tabs" role="tablist" aria-label="Location type" data-reveal="" ref={tabsRef}>
            <span className="loc__tabs-pill" aria-hidden="true" />
            {TABS.map((t) => (
              <button
                key={t.id} role="tab" type="button" id={`loc-tab-${t.id}`} aria-controls="loc-panel"
                aria-selected={mode === t.id} className={`loc__tab ${mode === t.id ? 'is-active' : ''}`}
                onClick={() => { setMode(t.id); setHovered(null); }}
              >
                {t.label} <span className="loc__count">{t.items.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="loc__grid">
          <div className="loc__panel" id="loc-panel" role="tabpanel" aria-labelledby={`loc-tab-${mode}`}>
            <ul className={`loc__list loc__list--${look}`}>
              {tab.items.map((l) => {
                const props = {
                  className: `loc__item ${hovered === l.id ? 'is-hot' : ''}`,
                  style: { '--loc': l.color },
                  onMouseEnter: () => setHovered(l.id), onMouseLeave: () => setHovered(null),
                  onFocus: () => setHovered(l.id), onBlur: () => setHovered(null),
                };
                const body = (
                  <>
                    <Flag code={l.flag} />
                    <span className="loc__label">
                      <span className="loc__name">{l.name}</span>
                      {l.note && <span className="loc__note">{l.note}</span>}
                    </span>
                    <span className="loc__swatch" aria-hidden="true" />
                    {isOffice && <ArrowUpRight className="loc__go" size={20} aria-hidden="true" />}
                  </>
                );
                return (
                  <li key={l.id}>
                    {isOffice
                      ? <a href={l.href} aria-label={`${l.name} – ${l.note}: view location`} {...props}>{body}</a>
                      : <div tabIndex={0} {...props}>{body}</div>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="loc__map-card">
            <svg
              ref={svgRef}
              className={`loc__svg ${view.zoom > 1 ? 'is-zoomed' : ''}`}
              viewBox={`${view.cx - vw / 2} ${view.cy - vh / 2} ${vw} ${vh}`}
              role="img"
              aria-label={`World map highlighting ${tab.items.map((l) => l.name).join(', ')}`}
              onPointerDown={onPointerDown} onPointerMove={onPointerMove}
              onPointerUp={endDrag} onPointerCancel={endDrag}
            >
              {COUNTRIES.map((c, i) => {
                const loc = c.iso && byIso[c.iso];
                const dim = loc && hovered && hovered !== loc.id;
                return (
                  <path
                    key={i} d={c.d}
                    className={`loc__geo ${loc ? 'is-on' : ''} ${dim ? 'is-dim' : ''} ${loc && isOffice ? 'is-link' : ''}`}
                    style={loc ? { fill: loc.color } : undefined}
                    onMouseEnter={loc ? () => setHovered(loc.id) : undefined}
                    onMouseLeave={loc ? () => setHovered(null) : undefined}
                    onClick={loc && isOffice ? () => open(loc.href) : undefined}
                  />
                );
              })}

              {tab.items.map((l) => {
                const [x, y] = at(l);
                return (
                  /* Outer g keeps pins a constant size at any zoom; GSAP animates the inner one. */
                  <g key={l.id} transform={`translate(${x} ${y}) scale(${k})`}>
                    <g
                      className={`loc__pin loc__pin--${look} ${hovered === l.id ? 'is-hot' : ''}`}
                      style={{ '--loc': l.color }}
                      onMouseEnter={() => setHovered(l.id)} onMouseLeave={() => setHovered(null)}
                      onClick={isOffice ? () => open(l.href) : undefined}
                    >
                      {isOffice && <circle className="loc__pulse" r={6} />}
                      <circle className="loc__dot" r={isOffice ? 6 : 4} />
                    </g>
                  </g>
                );
              })}

              {hotLoc && (() => {
                const [x, y] = at(hotLoc);
                return (
                  <g className="loc__tip" transform={`translate(${x} ${y}) scale(${k})`} pointerEvents="none" aria-hidden="true">
                    <rect x={-(hotLoc.name.length * 4 + 16)} y={-40} width={hotLoc.name.length * 8 + 32} height={26} rx={13} />
                    <text y={-22.5} textAnchor="middle">{hotLoc.name}</text>
                  </g>
                );
              })()}
            </svg>

            <div className="loc__zoom" role="group" aria-label="Map zoom">
              <button type="button" onClick={() => zoomBy(1.6)} aria-label="Zoom in"><Plus size={18} /></button>
              <button type="button" onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out"><Minus size={18} /></button>
              <button type="button" onClick={() => setView(HOME)} aria-label="Reset map"><RotateCcw size={16} /></button>
            </div>
            <p className="loc__hint" aria-hidden="true">
              {isOffice ? 'Click an office to view its location' : `${tab.items.length} ${tab.hint}`}
            </p>
          </div>
        </div>      </div>
    </section>
  );
}
