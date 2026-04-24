import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Education.css';

export default function Education() {
  const { state } = usePortfolio();
  const { education } = state;

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic journey and institutions I've been a part of.</p>
        </div>
        <div className="edu__timeline">
          {education.map((edu, i) => (
            <div key={edu.id} className="edu__item">
              <div className="edu__connector">
                <div className="edu__dot">
                  {edu.logo ? <img src={edu.logo} alt={edu.institution} className="edu__dot-logo" /> : <FaGraduationCap />}
                </div>
                {i < education.length - 1 && <div className="edu__line" />}
              </div>
              <div className="edu__card glass-card">
                <div className="edu__card-header">
                  <div>
                    <h3 className="edu__institution">{edu.institution}</h3>
                    <p className="edu__degree">{edu.degree}</p>
                  </div>
                  <span className="edu__badge">{edu.duration}</span>
                </div>
                <div className="edu__card-meta">
                  <span className="edu__meta-item"><FaMapMarkerAlt /> {edu.location}</span>
                  <span className="edu__meta-item"><FaCalendarAlt /> {edu.duration}</span>
                </div>
                {edu.description && <p className="edu__desc">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
