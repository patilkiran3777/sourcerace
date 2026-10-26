import { useRef } from 'react';
import { CalendarDays } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';
import { meeting } from '../../data/content.js';
import { openCalendly } from '../../services/calendly.js';
import { ArrowRight } from '../ui/Icons.jsx';

/* Vertical "Requesting for meeting" tab pinned to the right edge (Figma, rotated Link).
   Opens the Calendly popup; the href is the no-JS / modifier-click fallback. */
export default function MeetingTab() {
  const ref = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(ref.current, { xPercent: 100, duration: 1, delay: 1.4, ease: 'expo.out' });
    });
    return () => mm.revert();
  });

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
    e.preventDefault();
    openCalendly(meeting.calendlyUrl);
  };

  return (
    <>
      <a ref={ref} href={meeting.calendlyUrl} target="_blank" rel="noopener noreferrer" className="meeting-tab" onClick={onClick} aria-haspopup="dialog" data-placeholder={meeting.placeholder || undefined}>
        <span>{meeting.label}</span>
        <ArrowRight />
      </a>
      {/* Below 1024px the edge tab covers content; a round button above the WhatsApp one replaces it. */}
      <a href={meeting.calendlyUrl} target="_blank" rel="noopener noreferrer" className="meeting-fab" onClick={onClick} aria-haspopup="dialog" aria-label={meeting.label}>
        <CalendarDays size={24} />
      </a>
    </>
  );
}
