import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import MeetingTab from './components/layout/MeetingTab.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import AgricultureSolutions from './pages/AgricultureSolutions.jsx';
import AgricultureOption2 from './pages/AgricultureOption2.jsx';
import { currentPath } from './router.js';
import { useEffect } from 'react';
import { initSmoothScroll } from './animations/smoothScroll.js';

/* Path → page. Unknown paths fall back to the homepage. */
const PAGES = {
  // Option 2 (light editorial) is the chosen design; the original stays reachable as option-1.
  '/agriculture-solutions': AgricultureOption2,
  '/agriculture-solutions/option-1': AgricultureSolutions,
  '/agriculture-solutions/option-2': AgricultureOption2,
};

export default function App() {
  const Page = PAGES[currentPath()] || Home;
  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Page />
      </main>
      <Footer />
      <MeetingTab />
      <WhatsAppButton />
    </>
  );
}
