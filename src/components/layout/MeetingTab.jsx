import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../animations/gsapConfig.js';
import { ROUTES } from '../../data/content.js';
import { ArrowRight } from '../ui/Icons.jsx';

/* Vertical "Requesting for meeting" tab pinned to the right edge (Figma, rotated Link). */
export default function MeetingTab() {
  const ref = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(ref.current, { xPercent: 100, duration: 1, delay: 1.4, ease: 'expo.out' });
    });
    return () => mm.revert();
  });
  return (
    <a ref={ref} href={ROUTES.demo} className="meeting-tab">
      <span>Requesting for meeting</span>
      <ArrowRight />
    </a>
  );
}
