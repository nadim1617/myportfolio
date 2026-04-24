import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaArrowUp, FaHeart } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Footer.css';

const iconMap = { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube };

export default function Footer() {
  const { state } = usePortfolio();
  const { profile } = state;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top-line" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__bracket">&lt;</span>{profile.name.split(' ')[0]}<span className="footer__bracket">/&gt;</span>
          </span>
          <p className="footer__tagline">{profile.tagline}</p>
        </div>
        <div className="footer__socials">
          {profile.socials.map(s => {
            const Icon = iconMap[s.icon];
            return Icon ? (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label={s.label}><Icon /></a>
            ) : null;
          })}
        </div>
        <p className="footer__copy">© {year} {profile.name}. Made with <FaHeart className="footer__heart" /> and lots of ☕</p>
      </div>
      <button className="footer__backtop" onClick={scrollTop} aria-label="Back to top"><FaArrowUp /></button>
    </footer>
  );
}
