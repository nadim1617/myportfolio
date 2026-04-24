import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Projects.css';

const FILTERS = ['All', 'Personal', 'Career', 'Educational'];

export default function Projects() {
  const { state } = usePortfolio();
  const { projects } = state;
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built across personal, career, and educational contexts.</p>
        </div>
        <div className="proj__filters">
          {FILTERS.map(f => (
            <button key={f} className={`proj__filter-btn ${active === f ? 'proj__filter-btn--active' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>
        <div className="proj__grid">
          {filtered.map(proj => (
            <div key={proj.id} className="proj__card glass-card">
              <div className="proj__img-wrap">
                {proj.image ? <img src={proj.image} alt={proj.title} className="proj__img" /> : <div className="proj__img-placeholder"><FaCode /></div>}
                <div className="proj__overlay">
                  <p className="proj__overlay-desc">{proj.description}</p>
                  <div className="proj__overlay-links">
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{fontSize:'0.8rem',padding:'0.5rem 1.1rem'}}>Live Demo <FaExternalLinkAlt /></a>}
                    {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{fontSize:'0.8rem',padding:'0.5rem 1.1rem'}}>GitHub <FaGithub /></a>}
                  </div>
                </div>
              </div>
              <div className="proj__body">
                <div className="proj__top">
                  <span className="proj__cat tag">{proj.category}</span>
                  {proj.featured && <span className="proj__featured">⭐ Featured</span>}
                </div>
                <h3 className="proj__title">{proj.title}</h3>
                <p className="proj__desc">{proj.description}</p>
                <div className="proj__tags">{proj.tags.map(t => <span key={t} className="proj__tag">{t}</span>)}</div>
                <div className="proj__links">
                  {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="proj__link"><FaExternalLinkAlt /> Live</a>}
                  {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="proj__link"><FaGithub /> Code</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
