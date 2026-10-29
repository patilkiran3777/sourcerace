import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { o2Modules as M, o2Nav } from '../../../data/agriOption2.js';
import Button from '../../ui/Button.jsx';
import SplitText from '../../ui/SplitText.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import useReducedMotion from '../../../hooks/useReducedMotion.js';
import { gsap, useGSAP, ScrollTrigger, MQ } from '../../../animations/gsapConfig.js';
import { getLenis } from '../../../animations/smoothScroll.js';
import { DashboardScreen, PhoneScreen } from './O2Screens.jsx';

/* Design canvas from Figma (Device Stage), scaled to fit. */
const CANVAS = { w: 1208, h: 780 };
const PHONE = { w: 290, h: 590 };
/* Scroll-driven (pinned) mode: large screens, motion allowed, enough height. */
const MQ_PIN = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';
/* Vertical space used by the header offset + rail + tabs + gaps inside the pinned frame. */
const PIN_CHROME = 300;

const N = M.items.length;
const pad = (n) => String(n).padStart(2, '0');
const phaseOf = (i) => M.phases.indexOf(M.items[i].phase);
const firstOfPhase = (p) => M.items.findIndex((it) => it.phase === M.phases[p]);
const countOfPhase = (p) => M.items.filter((it) => it.phase === M.phases[p]).length;

/* Track fill (0..1) between the first stage pill (12.5%) and the last (87.5%).
   The dot sits on a phase's pill when that phase starts, then travels toward the
   next pill as you scroll through the phase's modules; the last phase ends on Market. */
function railFill(x) {
  const i = Math.min(N - 1, Math.max(0, Math.floor(x)));
  const p = phaseOf(i);
  const last = M.phases.length - 1;
  if (p >= last) return 1;
  const frac = Math.min(1, Math.max(0, (x - firstOfPhase(p)) / countOfPhase(p)));
  return (p + frac) / last;
}

function useMedia(q) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => { const mq = window.matchMedia(q); const on = () => setM(mq.matches); mq.addEventListener('change', on); return () => mq.removeEventListener('change', on); }, [q]);
  return m;
}

function useStageScale(ref, baseW, baseH, fitHeight) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const calc = () => {
      const byW = el.clientWidth / baseW;
      const byH = fitHeight ? (window.innerHeight - PIN_CHROME) / baseH : Infinity;
      setScale(Math.max(0.3, Math.min(1, byW, byH)));
    };
    calc();
    const ro = new ResizeObserver(calc); ro.observe(el);
    window.addEventListener('resize', calc);
    return () => { ro.disconnect(); window.removeEventListener('resize', calc); };
  }, [ref, baseW, baseH, fitHeight]);
  return scale;
}

export default function O2Modules() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const compact = useMedia('(max-width: 1023.98px)');
  const stageRef = useRef(null);
  const scale = useStageScale(stageRef, compact ? PHONE.w : CANVAS.w, compact ? PHONE.h : CANVAS.h, pinned);
  const tabsRef = useRef([]);
  const activeRef = useRef(0);
  const stRef = useRef(null);     // the pin ScrollTrigger
  const railRef = useRef(null);
  const lastAnimated = useRef(0);
  const prevPhase = useRef(0);

  const ref = useSectionReveal((root) => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(root.querySelector('.o2m-show'));
    // No scroll-in reveal here: the rail, tabs and device stage are shown as-is (client request).
    const mm = gsap.matchMedia();

    // Scroll-driven: pin the rail + showcase and let scroll step through all modules.
    mm.add(MQ_PIN, () => {
      setPinned(true);
      const fill = root.querySelector('.o2m-rail__fill');
      const dot = root.querySelector('.o2m-rail__dot');
      const st = ScrollTrigger.create({
        trigger: root.querySelector('.o2m-pin'),
        start: 'top top',
        end: () => `+=${(window.innerHeight * M.scrollPerModule * N) / 100}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = self.progress * N; // continuous module position
          const f = railFill(Math.min(x, N - 0.0001));
          gsap.set(fill, { scaleX: f });
          gsap.set(dot, { left: `${12.5 + f * 75}%` });
          const idx = Math.min(N - 1, Math.floor(x));
          if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
        },
      });
      stRef.current = st;
      return () => { stRef.current = null; setPinned(false); st.kill(); };
    });

    return () => { io.disconnect(); mm.revert(); };
  });

  /* Rail when NOT pinned (mobile / reduced motion): follow the active module. */
  useEffect(() => {
    if (pinned || !railRef.current) return;
    const f = railFill(active + 0.5);
    railRef.current.querySelector('.o2m-rail__fill').style.transform = `scaleX(${f})`;
    railRef.current.querySelector('.o2m-rail__dot').style.left = `${12.5 + f * 75}%`;
  }, [active, pinned]);

  const select = useCallback((i, byUser) => {
    const next = (i + N) % N;
    const st = stRef.current;
    if (st && byUser) {
      // In scroll mode a click scrolls to that module's slot; onUpdate does the rest.
      const y = st.start + ((next + 0.5) / N) * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y, behavior: 'smooth' });
      return;
    }
    activeRef.current = next;
    setActive(next);
    setCycle((c) => c + 1);
    if (byUser) setUserPicked(true);
  }, []);

  // Autoplay only when not scroll-driven.
  const playing = !pinned && inView && !hovering && !userPicked && !reduced;
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => select(active + 1, false), M.autoplayMs);
    return () => clearTimeout(t);
  }, [playing, active, cycle, select]);

  const m = M.items[active];
  const phase = phaseOf(active);
  const phaseItems = M.items.map((it, i) => ({ it, i })).filter(({ it }) => it.phase === M.phases[phase]);

  // Swap animation whenever the active module changes.
  useGSAP(() => {
    if (lastAnimated.current === active) return; // skip mount (StrictMode-safe)
    lastAnimated.current = active;
    const newPhase = prevPhase.current !== phase;
    prevPhase.current = phase;
    const root = ref.current; if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(root.querySelectorAll('.o2m-detail [data-anim]'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.04, ease: 'expo.out', overwrite: true });
      gsap.fromTo(root.querySelectorAll('[data-swap] > *'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', overwrite: true });
      gsap.fromTo(root.querySelectorAll('[data-swap-phone]'), { x: 24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', overwrite: true });
      gsap.fromTo(root.querySelectorAll('.o2m-chip'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.1, delay: 0.2, overwrite: true });
      gsap.fromTo(root.querySelectorAll('.o2-poly'), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.12 });
      gsap.fromTo(root.querySelectorAll('.o2v-bar__track i, .o2p-minibars i'), { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05, transformOrigin: '50% 100%' });
      gsap.fromTo(root.querySelectorAll('.o2v-steps li, .o2v-checks li'), { x: -10, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.07 });
      if (newPhase) gsap.fromTo(root.querySelectorAll('.o2m-tabs > *'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: 'expo.out' });
      root.querySelectorAll('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count); const dec = (el.dataset.count.split('.')[1] || '').length;
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1, ease: 'power2.out', onUpdate: () => { el.textContent = o.v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [active], scope: ref });

  const onKeyDown = (e) => {
    const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (e.key in map) next = active + map[e.key];
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = N - 1;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
    setTimeout(() => tabsRef.current[(next + N) % N]?.focus(), 60);
  };

  return (
    <section className="o2m" id="modules" ref={ref} aria-labelledby="o2m-title">
      <div className="container o2m-head">
        <p className="o2-eyebrow o2-eyebrow--dark" data-reveal="">{M.eyebrow}</p>
        <SplitText as="h2" id="o2m-title" className="h2 o2m-title" text={M.title} accentFrom={M.title.split(' ').indexOf('One')} />
        <p className="o2m-intro" data-reveal="">{M.text}</p>
      </div>

      <div className={`o2m-pin ${pinned ? 'is-pinned' : ''}`}>
        <div className="container o2m-pin__inner">
          {/* ---- Value-chain rail ---- */}
          <div className="o2m-rail" ref={railRef}>
            <span className="o2m-rail__track" aria-hidden="true"><i className="o2m-rail__fill" /></span>
            <span className="o2m-rail__dot" aria-hidden="true" />
            <ol className="o2m-rail__stages">
              {M.stages.map((s, p) => (
                <li key={s}>
                  <button
                    type="button"
                    className={`o2m-stage-btn ${p < phase ? 'is-done' : ''} ${p === phase ? 'is-current' : ''}`}
                    aria-label={`${s}: ${M.phases[p]}, ${countOfPhase(p)} modules`}
                    aria-current={p === phase ? 'step' : undefined}
                    onClick={() => select(firstOfPhase(p), true)}
                  >
                    <span className="o2m-stage-btn__num">{pad(p + 1)}</span>
                    <span className="o2m-stage-btn__label">{s}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* ---- Modules of the current phase ---- */}
          <div className="o2m-tabs" role="tablist" aria-label={`${M.phases[phase]} modules`} onKeyDown={onKeyDown}>
            <span className="o2m-tabs__phase" aria-hidden="true"><b>{pad(phase + 1)}</b>{M.phases[phase]}</span>
            {phaseItems.map(({ it, i }) => (
              <button
                key={it.id} ref={(el) => { tabsRef.current[i] = el; }}
                type="button" role="tab" id={`o2m-tab-${it.id}`} aria-selected={i === active} aria-controls="o2m-panel"
                tabIndex={i === active ? 0 : -1}
                className={`o2m-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => select(i, true)}
              >
                <it.icon size={16} strokeWidth={1.8} aria-hidden="true" />
                {it.title}
                {i === active && !pinned && !userPicked && !reduced && (
                  <span key={cycle} className="o2m-tab__progress" style={{ animationDuration: `${M.autoplayMs}ms`, animationPlayState: playing ? 'running' : 'paused' }} aria-hidden="true" />
                )}
              </button>
            ))}
            <span className="o2m-tabs__count" aria-hidden="true">{pad(active + 1)} / {pad(N)}</span>
          </div>

          {/* ---- Showcase ---- */}
          <div
            className="o2m-show" id="o2m-panel" role="tabpanel" aria-labelledby={`o2m-tab-${m.id}`}
            onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
          >
            <div className="o2m-detail" aria-live="polite">
              <p className="o2m-phase" data-anim=""><b>{pad(active + 1)}</b><i />Phase {pad(phase + 1)} · {m.phase}</p>
              <h3 className="o2m-mtitle" data-anim="">{m.title}</h3>
              <p className="o2m-mtext" data-anim="">{m.text}</p>
              <p className="o2m-kicker" data-anim=""><ChevronRight size={22} strokeWidth={3} aria-hidden="true" />{m.kicker}</p>
              <ul className="o2m-feats">
                {m.features.map(([t, d]) => (
                  <li key={t} data-anim="">
                    <svg viewBox="0 0 18.2 18.2" width="18" height="18" aria-hidden="true"><path transform="translate(1.14 1.14)" fill="currentColor" d="M0 0C16.989 0 13.04 11.287 13.058 13.03L15.936 15.936H15.011L12.507 13.403C11.12 13.553 8.082 14.63 4.88 12.087 1.672 9.544 1.85 6.499 0 0ZM2.835 1.636C1.067.8 2.65 1.964 2.65 1.964 4.258 3.073 4.998 4.585 5.859 6.228 6.979 8.37 8.669 11.198 10.988 12.194 13.3 13.19 12.204 12.638 11.201 11.891 10.198 11.137 8.775 8.797 7.964 7.26 6.837 5.126 5.795 3.041 2.835 1.636Z" /></svg>
                    <span><b>{t}</b><small>{d}</small></span>
                  </li>
                ))}
              </ul>
              <div className="o2m-actions" data-anim="">
                <Button href={M.primary.href}>{M.primary.label}</Button>
                <Button href={M.secondary.href} variant="outline-light">{M.secondary.label}</Button>
              </div>
              <p className="sr-only">Showing {m.title}, module {active + 1} of {N}.</p>
            </div>

            <div className="o2m-stage" ref={stageRef} style={{ height: (compact ? PHONE.h : CANVAS.h) * scale }}>
              <div className={`o2m-canvas ${compact ? 'is-compact' : ''}`} style={{ width: compact ? PHONE.w : CANVAS.w, height: compact ? PHONE.h : CANVAS.h, transform: `scale(${scale})` }}>
                {!compact && <div className="o2m-dash"><DashboardScreen m={m} nav={o2Nav} mapImage={M.mapImage} /></div>}
                <div className="o2m-phone"><PhoneScreen m={m} plotImage={M.plotImage} photoImages={M.photoImages} /></div>
                {!compact && m.chips.map(([t, s], i) => (
                  <div className={`o2m-chip o2m-chip--${i ? 'b' : 'a'}`} key={t}>
                    <span className="o2m-chip__icon"><Check size={16} strokeWidth={2.6} /></span>
                    <span><b>{t}</b><small>{s}</small></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
