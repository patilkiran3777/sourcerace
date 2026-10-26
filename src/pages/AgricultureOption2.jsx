import { useEffect } from 'react';
import { O2Hero, O2Challenge, O2Bento, O2Stats, O2Resources, O2Cta } from '../components/sections/agri2/O2Sections.jsx';
import O2Modules from '../components/sections/agri2/O2Modules.jsx';
import Certifications from '../components/sections/Certifications.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import { o2Meta } from '../data/agriOption2.js';
import '../styles/pages/agri-option2.css';

/* Option 2 — light editorial, built from the Figma frame
   "agriculture-solutions-v1 · option 2 (light editorial)". */
export default function AgricultureOption2() {
  useEffect(() => { document.title = o2Meta.title; }, []);
  return (
    <div className="o2">
      <O2Hero />
      <O2Challenge />
      <O2Bento />
      <O2Modules />
      <O2Stats />
      <Certifications />
      <Testimonials />
      <O2Resources />
      <O2Cta />
    </div>
  );
}
