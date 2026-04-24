import { FaBriefcase, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Experience.css';

const typeColors = {
  'Full-time':  { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e' },
  'Part-time':  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b' },
  'Freelance':  { bg: 'rgba(0,153,255,0.12)',  border: 'rgba(0,153,255,0.3)',  color: '#0099ff' },
  'Internship': { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7' },
};

export default function Experience() {
  const { state } = usePortfolio();
  const { experience } = state;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional roles and freelance work I've taken on.</p>
        </div>
        <div className="exp__timeline">
          {experience.map((exp, i) => {
            const style = typeColors[exp.type] || typeColors['Freelance'];
            return (
              <div key={exp.id} className="exp__item">
                <div className="exp__connector">
                  <div className="exp__dot">
                    {exp.logo ? <img src={exp.logo} alt={exp.company} /> : <FaBriefcase />}
                  </div>
                  {i < experience.length - 1 && <div className="exp__line" />}
                </div>
                <div className="exp__card glass-card">
                  <div className="exp__card-top">
                    <div>
                      <h3 className="exp__role">{exp.role}</h3>
                      <p className="exp__company">{exp.company}</p>
                    </div>
                    <div className="exp__meta-right">
                      <span className="exp__type" style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}>{exp.type}</span>
                      <span className="exp__duration">{exp.duration}</span>
                    </div>
                  </div>
                  <p className="exp__location"><FaMapMarkerAlt /> {exp.location}</p>
                  <ul className="exp__points">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="exp__point"><FaCircle className="exp__bullet" />{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
