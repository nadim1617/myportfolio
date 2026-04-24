import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';
import CursorGlow    from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';

import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Education     from './components/Education';
import Experience    from './components/Experience';
import Certificates  from './components/Certificates';
import Projects      from './components/Projects';
import MediaPortfolio from './components/MediaPortfolio';
import Footer        from './components/Footer';

import AdminLogin     from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// ── Guards public users from accessing the dashboard directly ──
function ProtectedRoute({ children }) {
  const isAuth = sessionStorage.getItem('admin_authenticated') === '1';
  return isAuth ? children : <Navigate to="/admin" replace />;
}

function MainPortfolio() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
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
          {/* Public portfolio */}
          <Route path="/" element={<MainPortfolio />} />

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin dashboard — protected */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
