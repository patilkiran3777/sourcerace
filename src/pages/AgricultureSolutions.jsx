import { useEffect } from 'react';
import AgriHero from '../components/sections/agri/AgriHero.jsx';
import AgriIntro from '../components/sections/agri/AgriIntro.jsx';
import AgriBenefits from '../components/sections/agri/AgriBenefits.jsx';
import AgriModules from '../components/sections/agri/AgriModules.jsx';
import AgriResources from '../components/sections/agri/AgriResources.jsx';
import AgriCta from '../components/sections/agri/AgriCta.jsx';
import { agriMeta } from '../data/agriculture.js';
import '../styles/pages/agriculture.css';

export default function AgricultureSolutions() {
  useEffect(() => {
    document.title = agriMeta.title;
  }, []);

  return (
    <>
      <AgriHero />
      <div className="light-band">
        <AgriIntro />
      </div>
      <AgriBenefits />
      <AgriModules />
      <AgriResources />
      <AgriCta />
    </>
  );
}
