import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './Navbar.css';

const iconMap = { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube };

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Education',    href: '#education' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Media',        href: '#media', accent: true },
];

export default function Navbar() {
  const { state } = usePortfolio();
  const { profile, siteMeta } = state;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    document.title = siteMeta.title;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [siteMeta.title]);

  const handleNav = (href) => { setOpen(false); setActive(href); };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          {profile.name.split(' ')[0]}
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`navbar__link ${l.accent ? 'navbar__link--accent' : ''} ${active === l.href ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(l.href)}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <button className="navbar__burger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
