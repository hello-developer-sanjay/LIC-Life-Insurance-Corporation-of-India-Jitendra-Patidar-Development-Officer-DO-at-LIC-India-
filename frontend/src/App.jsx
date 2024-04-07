import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Contact from './components/Contact';

import Footer from './components/Footer';
import { Link } from 'react-scroll'; // Import Link from react-scroll

import { useLocation } from 'react-router-dom';
import LicAgent from './components/LicAgent';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeWithBlogSuggestion />} />
          </Routes>

          <Routes>
            <Route path="/contact-lic-officer-jitendra-patidar" element={<Contact />} />
          </Routes>
          
          <Routes>
            <Route path="/be-an-lic-agent" element={<LicAgent />} />
          </Routes>
        </div>
        <div className='relative z-0'>
        </div>
      </div>
    </Router>
  );
}

const HomeWithBlogSuggestion = () => {
  return (
    <>
      <Home />
      <Footer />

    </>
  );
};

export default App;
