import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';

import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Education     from './components/Education';
import Experience    from './components/Experience';
import Certificates  from './components/Certificates';
import Projects      from './components/Projects';
import MediaPortfolio from './components/MediaPortfolio';
import Footer        from './components/Footer';

import AdminLogin    from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';

function MainPortfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Certificates />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <MediaPortfolio />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<div style={{color: 'white', padding: '2rem'}}>Admin Dashboard coming soon</div>} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
