import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './About.css';

const iconMap = { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube };

export default function About() {
  const { state } = usePortfolio();
  const { profile } = state;

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A little bit about who I am and what I do.</p>
        </div>
        <div className="about__grid">
          <div className="about__image-col">
            <div className="about__img-wrap glass-card">
              <img src={profile.avatar} alt={profile.name} className="about__img" />
              <div className="about__img-glow" />
            </div>
            <div className="about__info-chips">
              <span className="about__chip"><FaMapMarkerAlt /> {profile.location}</span>
              <a href={`mailto:${profile.email}`} className="about__chip about__chip--link">
                <FaEnvelope /> {profile.email}
              </a>
            </div>
          </div>
          <div className="about__text-col">
            <h3 className="about__name">{profile.name}</h3>
            <p className="about__tagline">{profile.tagline}</p>
            <p className="about__bio">{profile.bio}</p>
            <div className="about__socials">
              {profile.socials.map(s => {
                const Icon = iconMap[s.icon];
                return Icon ? (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                     className="about__social" title={s.label}>
                    <Icon /> <span>{s.label}</span>
                  </a>
                ) : null;
              })}
            </div>
            <div className="about__skills">
              <h4 className="about__skills-title">Skills & Tools</h4>
              <div className="about__skills-grid">
                {profile.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
