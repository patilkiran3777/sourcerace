import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';
import { whatsapp } from '../../data/content.js';
import { WhatsAppIcon } from '../ui/Icons.jsx';

/* Floating WhatsApp chat button, bottom-right on every page. Opens wa.me with a pre-filled message. */
export default function WhatsAppButton() {
  const ref = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(ref.current, { scale: 0, autoAlpha: 0, duration: 0.9, delay: 1.8, ease: 'back.out(1.8)' });
    });
    return () => mm.revert();
  });
  const href = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <a ref={ref} href={href} className="wa-btn" target="_blank" rel="noopener noreferrer" data-placeholder={whatsapp.placeholder || undefined}>
      <WhatsAppIcon />
      <span className="wa-btn__label">{whatsapp.label}</span>
      <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
