import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import MeetingTab from './components/layout/MeetingTab.jsx';
import Home from './pages/Home.jsx';
import AgricultureSolutions from './pages/AgricultureSolutions.jsx';
import { currentPath } from './router.js';
import { useEffect } from 'react';
import { initSmoothScroll } from './animations/smoothScroll.js';

/* Path → page. Unknown paths fall back to the homepage. */
const PAGES = { '/agriculture-solutions': AgricultureSolutions };

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
    </>
  );
}
