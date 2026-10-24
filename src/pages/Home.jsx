import Hero from '../components/sections/Hero.jsx';
import TrustedBrands from '../components/sections/TrustedBrands.jsx';
import FirstMile from '../components/sections/FirstMile.jsx';
import PlatformFeatures from '../components/sections/PlatformFeatures.jsx';
import SoftwareSolutions from '../components/sections/SoftwareSolutions.jsx';
import Locations from '../components/sections/Locations.jsx';
import Experience from '../components/sections/Experience.jsx';
import Certifications from '../components/sections/Certifications.jsx';
import CaseStudies from '../components/sections/CaseStudies.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="light-band">
        <TrustedBrands />
        <FirstMile />
      </div>
      <PlatformFeatures />
      <SoftwareSolutions />
      <Locations />
      <Experience />
      <Certifications />
      <CaseStudies />
      <Testimonials />
    </>
  );
}
