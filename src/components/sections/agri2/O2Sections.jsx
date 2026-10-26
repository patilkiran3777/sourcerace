import { Fragment, useRef } from 'react';
import { Check } from 'lucide-react';
import { o2Hero as H, o2Challenge as C, o2Bento as B, o2Stats, o2Resources as R, o2Cta as K } from '../../../data/agriOption2.js';
import Button from '../../ui/Button.jsx';
import SplitText from '../../ui/SplitText.jsx';
import Counter from '../../ui/Counter.jsx';
import { ArrowRight } from '../../ui/Icons.jsx';
import useSectionReveal from '../../../hooks/useSectionReveal.js';
import { gsap, useGSAP, MQ } from '../../../animations/gsapConfig.js';
import { onSpotlight } from '../../ui/spotlight.js';

const accentIndex = (text, word) => text.split(' ').findIndex((w) => w.startsWith(word));

function Eyebrow({ children, dark }) {
  return <p className={`o2-eyebrow ${dark ? 'o2-eyebrow--dark' : ''}`} data-reveal="">{children}</p>;
}

function Head({ eyebrow, title, accentFrom, text, id }) {
  return (
    <div className="o2-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitText as="h2" id={id} className="h2 o2-h2" text={title} accentFrom={accentIndex(title, accentFrom.split(' ')[0])} />
      </div>
      {text && <p className="o2-head__text" data-reveal="">{text}</p>}
    </div>
  );
}

/* ---------------- Hero (split) ---------------- */
export function O2Hero() {
  const ref = useRef(null);
  const words = H.title.split(' ');
  const acc = words.indexOf(H.accentFrom);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      tl.from(q('.o2h-crumbs li, .o2h-pill'), { y: 14, autoAlpha: 0, duration: 0.8, stagger: 0.05 }, 0)
        .from(q('.o2h-title .split-word > span'), { yPercent: 115, duration: 1.2, stagger: 0.05 }, 0.15)
        .from(q('.o2h-mark svg path'), { strokeDashoffset: 800, duration: 1.2, ease: 'power3.inOut' }, 0.9)
        .from(q('.o2h-lead, .o2h-actions > *, .o2h-proof > *'), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 0.6)
        .from(q('.o2h-photo'), { clipPath: 'inset(12% 8% 12% 8% round 80px)', duration: 1.5 }, 0.2)
        .from(q('.o2h-photo img'), { scale: 1.25, duration: 2 }, 0.2)
        .from(q('.o2h-journey'), { x: -40, autoAlpha: 0, duration: 1.1 }, 0.9)
        .from(q('.o2h-stage'), { x: -14, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 1.1)
        .from(q('.o2h-chip'), { y: -16, autoAlpha: 0, duration: 0.8 }, 1.2);
      // Stages light up in sequence on a loop (Farm → Market).
      const stages = q('.o2h-stage');
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 2.4 });
      stages.forEach((s, i) => loop.call(() => stages.forEach((el, j) => el.classList.toggle('is-lit', j <= i)), null, i * 0.9));
      loop.call(() => stages.forEach((el, j) => el.classList.toggle('is-lit', j < 2)), null, stages.length * 0.9 + 0.8);
      gsap.to(q('.o2h-photo img'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="o2h" ref={ref} aria-labelledby="o2h-title">
      <div className="container o2h-grid">
        <div className="o2h-copy">
          <nav aria-label="Breadcrumb">
            <ol className="o2h-crumbs">
              {H.breadcrumb.map((c) => <li key={c.label}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>)}
            </ol>
          </nav>
          <p className="o2h-pill"><i />{H.eyebrow}</p>
          <h1 className="o2h-title" id="o2h-title" aria-label={`${H.title} ${H.mark}`}>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <Fragment key={i}><span className={`split-word ${i >= acc ? 'split-accent' : ''}`}><span>{w}</span></span>{' '}</Fragment>
              ))}
              <span className="o2h-mark split-accent">
                <span className="split-word"><span>{H.mark}</span></span>
                <svg viewBox="0 0 300 16" preserveAspectRatio="none"><path d="M2 12 C 90 11, 200 8, 298 3" /></svg>
              </span>
            </span>
          </h1>
          <p className="o2h-lead">{H.text}</p>
          <div className="o2h-actions">
            <Button href={H.primary.href}>{H.primary.label}</Button>
            <Button href={H.secondary.href} variant="outline-dark">{H.secondary.label}</Button>
          </div>
          <ul className="o2h-proof">
            {H.proof.map((p) => <li key={p.label}><b>{p.value}</b>{p.label}</li>)}
          </ul>
        </div>

        <div className="o2h-visual">
          <figure className="o2h-photo"><img src={H.image} alt="Aerial view of farm fields at golden hour" fetchpriority="high" /></figure>
          <p className="o2h-chip"><i />{H.chip}</p>
          <div className="o2h-journey" aria-label="From farm to market">
            <p className="o2h-journey__kicker">{H.journeyKicker}</p>
            <ol>
              {H.journey.map(({ icon: Icon, label, note }, i) => (
                <li className={`o2h-stage ${i < 2 ? 'is-lit' : ''}`} key={label}>
                  <span className="o2h-stage__dot"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span><b>{label}</b><small>{note}</small></span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Challenge (image left) ---------------- */
export function O2Challenge() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(root.querySelector('.o2c-record'), { x: 40, autoAlpha: 0, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: root, start: 'top 60%', once: true } });
      gsap.to(root.querySelector('.o2c-record'), { y: -60, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  });
  return (
    <section className="o2c" ref={ref} aria-labelledby="o2c-title">
      <div className="container o2c-grid">
        <div className="o2c-visual">
          <figure className="o2c-photo" data-reveal-image=""><img src={C.image} alt={C.imageAlt} loading="lazy" /></figure>
          <div className="o2c-record" aria-hidden="true">
            <p className="o2c-record__k">{C.record.kicker}</p>
            <p className="o2c-record__id">{C.record.id}</p>
            <ul>{C.record.items.map((t) => <li key={t}><i><Check size={12} strokeWidth={3} /></i>{t}</li>)}</ul>
          </div>
        </div>
        <div className="o2c-copy">
          <Eyebrow>{C.eyebrow}</Eyebrow>
          <SplitText as="h2" id="o2c-title" className="h2 o2-h2" text={C.title} accentFrom={accentIndex(C.title, C.accentFrom)} />
          <p className="o2c-text" data-reveal="">{C.text}</p>
          <ul className="o2c-stack" data-reveal-group="">
            {C.stack.map(({ icon: Icon, title, text }) => (
              <li key={title}><span className="o2c-stack__icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span><span><b>{title}</b><small>{text}</small></span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Outcomes (bento) ---------------- */
export function O2Bento() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(root.querySelectorAll('.o2b-tile'), { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: { each: 0.07, grid: 'auto' }, scrollTrigger: { trigger: root.querySelector('.o2b-grid'), start: 'top 82%', once: true } });
    });
    return () => mm.revert();
  });
  return (
    <section className="o2b" ref={ref} aria-labelledby="o2b-title">
      <div className="container">
        <Head eyebrow={B.eyebrow} title={B.title} accentFrom={B.accentFrom} text={B.text} id="o2b-title" />
        <ul className="o2b-grid">
          {B.items.map(({ icon: Icon, title, text, tone }, i) => (
            <li className={`o2b-tile ${tone ? `o2b-tile--${tone}` : ''}`} key={title} onPointerMove={onSpotlight}>
              <div className="o2b-tile__top"><span className="o2b-tile__icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className="o2b-tile__num">{String(i + 1).padStart(2, '0')}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function O2Stats() {
  const ref = useSectionReveal();
  return (
    <section className="o2s" ref={ref} aria-label="SourceTrace in numbers">
      <ul className="container o2s-grid" data-reveal-group="">
        {o2Stats.map((s) => (
          <li key={s.label}><Counter value={s.value} suffix={s.suffix} className="o2s-value" /><p>{s.label}</p></li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Resources ---------------- */
export function O2Resources() {
  const ref = useSectionReveal();
  return (
    <section className="o2r" ref={ref} aria-labelledby="o2r-title">
      <div className="container">
        <Head eyebrow={R.eyebrow} title={R.title} accentFrom={R.accentFrom} id="o2r-title" />
        <ul className="o2r-grid" data-reveal-group="">
          {R.items.map((it) => (
            <li className="o2r-card" key={it.title}>
              <div className="o2r-media"><img src={it.image} alt="" loading="lazy" /><span>{it.type}</span></div>
              <div className="o2r-body">
                <h3><a href={it.href}>{it.title}</a></h3>
                <p>{it.text}</p>
                <span className="text-link" aria-hidden="true">{it.cta} <ArrowRight /></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- CTA (lime) ---------------- */
export function O2Cta() {
  const ref = useSectionReveal((root) => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(root.querySelector('.o2k-panel'), { scale: 0.94, borderRadius: 96 }, { scale: 1, borderRadius: 56, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 45%', scrub: true } });
    });
    return () => mm.revert();
  });
  return (
    <section className="o2k" ref={ref} aria-labelledby="o2k-title">
      <div className="container">
        <div className="o2k-panel">
          <div>
            <SplitText as="h2" id="o2k-title" className="o2k-title" text={K.title} />
            <p data-reveal="">{K.text}</p>
          </div>
          <div className="o2k-actions" data-reveal="">
            <Button href={K.primary.href} variant="forest">{K.primary.label}</Button>
            <Button href={K.secondary.href} variant="outline-dark">{K.secondary.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
