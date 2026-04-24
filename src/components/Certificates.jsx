import { FaExternalLinkAlt, FaMedal, FaCertificate } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Certificates.css';

const catColors = {
  'Development': { color: '#00d4b4', bg: 'rgba(0,212,180,0.1)', border: 'rgba(0,212,180,0.25)' },
  'Design':      { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)' },
  'Aviation':    { color: '#0099ff', bg: 'rgba(0,153,255,0.1)', border: 'rgba(0,153,255,0.25)' },
  'Achievement': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
};
const defaultCat = { color: '#00d4b4', bg: 'rgba(0,212,180,0.1)', border: 'rgba(0,212,180,0.25)' };

export default function Certificates() {
  const { state } = usePortfolio();
  const { certificates } = state;

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Certificates & Achievements</h2>
          <p className="section-subtitle">Recognitions, qualifications, and milestones I've earned.</p>
        </div>
        <div className="cert__grid">
          {certificates.map(cert => {
            const cat = catColors[cert.category] || defaultCat;
            return (
              <div key={cert.id} className="cert__card glass-card">
                <div className="cert__icon-wrap" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                  {cert.image
                    ? <img src={cert.image} alt={cert.title} className="cert__image" />
                    : (cert.category === 'Achievement' ? <FaMedal style={{ color: cat.color }} /> : <FaCertificate style={{ color: cat.color }} />)}
                </div>
                <div className="cert__info">
                  <span className="cert__category" style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}>{cert.category}</span>
                  <h3 className="cert__title">{cert.title}</h3>
                  <p className="cert__issuer">{cert.issuer}</p>
                  <p className="cert__date">{cert.date}</p>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert__link">
                      View Certificate <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
