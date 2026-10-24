import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { AE, BD, CA, ET, IN, KE, NL, NP, TH, UG, US, ZW } from 'country-flag-icons/react/3x2';
import { ArrowUpRight, Minus, Plus, RotateCcw } from 'lucide-react';
import world from 'world-atlas/countries-110m.json';
import { locations } from '../../data/content.js';
import SplitText from '../ui/SplitText.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import { gsap, MQ } from '../../animations/gsapConfig.js';
import '../../styles/sections/locations.css';

const FLAGS = { AE, BD, CA, ET, IN, KE, NL, NP, TH, UG, US, ZW };
const ANTARCTICA = '010';
const HOME = { coordinates: [12, 10], zoom: 1 };

const TABS = [
  { id: 'offices', label: 'Regional Offices', items: locations.offices },
  { id: 'partners', label: 'Regional Partners', items: locations.partners },
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
  const zoomRef = useRef(1);
  const first = useRef(true);
  const tabsRef = useRef(null);

  const tab = TABS.find((t) => t.id === mode);
  const isOffice = mode === 'offices';
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

  const zoomBy = (f) => setView((v) => ({ ...v, zoom: Math.min(6, Math.max(1, v.zoom * f)) }));
  // Wheel never hijacks page scroll; touch-drag only pans once zoomed in.
  const filterZoom = (e) => e.type !== 'wheel' && !(e.type.startsWith('touch') && zoomRef.current <= 1);
  const k = 1 / view.zoom;

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
            <ul className={`loc__list loc__list--${mode}`}>
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
            <ComposableMap
              className="loc__svg" projection="geoEqualEarth" width={800} height={420}
              projectionConfig={{ scale: 158 }} role="img"
              aria-label={`World map highlighting ${tab.items.map((l) => l.name).join(', ')}`}
            >
              <ZoomableGroup
                center={view.coordinates} zoom={view.zoom} minZoom={1} maxZoom={6}
                filterZoomEvent={filterZoom}
                onMove={({ zoom }) => { zoomRef.current = zoom; }}
                onMoveEnd={({ coordinates, zoom }) => { zoomRef.current = zoom; setView({ coordinates, zoom }); }}
              >
                <Geographies geography={world}>
                  {({ geographies }) => geographies.filter((g) => g.id !== ANTARCTICA).map((geo) => {
                    const loc = byIso[geo.id];
                    const dim = loc && hovered && hovered !== loc.id;
                    const fill = loc ? loc.color : undefined;
                    const style = { outline: 'none', ...(fill && { fill }) };
                    return (
                      <Geography
                        key={geo.rsmKey} geography={geo}
                        className={`loc__geo ${loc ? 'is-on' : ''} ${dim ? 'is-dim' : ''} ${loc && isOffice ? 'is-link' : ''}`}
                        style={{ default: style, hover: style, pressed: style }}
                        tabIndex={-1}
                        onMouseEnter={loc ? () => setHovered(loc.id) : undefined}
                        onMouseLeave={loc ? () => setHovered(null) : undefined}
                        onClick={loc && isOffice ? () => go(loc.href) : undefined}
                      />
                    );
                  })}
                </Geographies>

                {tab.items.map((l) => (
                  <Marker key={l.id} coordinates={l.coords}>
                    {/* Outer g keeps pins a constant size at any zoom; GSAP animates the inner one. */}
                    <g transform={`scale(${k})`}>
                      <g
                        className={`loc__pin loc__pin--${mode} ${hovered === l.id ? 'is-hot' : ''}`}
                        style={{ '--loc': l.color }}
                        onMouseEnter={() => setHovered(l.id)} onMouseLeave={() => setHovered(null)}
                        onClick={isOffice ? () => go(l.href) : undefined}
                      >
                        {isOffice && <circle className="loc__pulse" r={6} />}
                        <circle className="loc__dot" r={isOffice ? 6 : 4} />
                      </g>
                    </g>
                  </Marker>
                ))}

                {hotLoc && (
                  <Marker coordinates={hotLoc.coords}>
                    <g className="loc__tip" transform={`scale(${k})`} pointerEvents="none" aria-hidden="true">
                      <rect x={-(hotLoc.name.length * 4 + 16)} y={-40} width={hotLoc.name.length * 8 + 32} height={26} rx={13} />
                      <text y={-22.5} textAnchor="middle">{hotLoc.name}</text>
                    </g>
                  </Marker>
                )}
              </ZoomableGroup>
            </ComposableMap>

            <div className="loc__zoom" role="group" aria-label="Map zoom">
              <button type="button" onClick={() => zoomBy(1.6)} aria-label="Zoom in"><Plus size={18} /></button>
              <button type="button" onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out"><Minus size={18} /></button>
              <button type="button" onClick={() => setView(HOME)} aria-label="Reset map"><RotateCcw size={16} /></button>
            </div>
            <p className="loc__hint" aria-hidden="true">
              {isOffice ? 'Click an office to view its location' : `${tab.items.length} regional partners worldwide`}
            </p>
          </div>
        </div>      </div>
    </section>
  );
}
