import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaCamera, FaVideo, FaPlaneDeparture, FaPlay, FaExpand, FaTimes } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './MediaPortfolio.css';

const TABS = [
  { key: 'photography', label: 'Photography', icon: FaCamera },
  { key: 'videography', label: 'Videography', icon: FaVideo },
  { key: 'drone',       label: 'Drone',        icon: FaPlaneDeparture },
];

function PhotoGrid({ items }) {
  const [index, setIndex] = useState(-1);
  const slides = items.map(i => ({ src: i.src, title: i.title, description: i.description }));
  return (
    <>
      <div className="media__photo-grid">
        {items.map((item, i) => (
          <div key={item.id} className="media__photo-item" onClick={() => setIndex(i)}>
            <img src={item.src} alt={item.title} loading="lazy" />
            <div className="media__photo-overlay">
              <FaExpand className="media__photo-icon" />
              <p className="media__photo-title">{item.title}</p>
              <span className="media__photo-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      <Lightbox index={index} slides={slides} open={index >= 0} close={() => setIndex(-1)} />
    </>
  );
}

function VideoGrid({ items }) {
  const [activeVideo, setActiveVideo] = useState(null);
  return (
    <>
      <div className="media__video-grid">
        {items.map(item => (
          <div key={item.id} className="media__video-card glass-card" onClick={() => setActiveVideo(item)}>
            <div className="media__video-thumb">
              <img src={item.thumbnail} alt={item.title} />
              <div className="media__video-overlay"><div className="media__play-btn"><FaPlay /></div></div>
            </div>
            <div className="media__video-info">
              <h4 className="media__video-title">{item.title}</h4>
              <p className="media__video-desc">{item.description}</p>
              <span className="media__video-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      {activeVideo && (
        <div className="media__modal" onClick={() => setActiveVideo(null)}>
          <div className="media__modal-inner" onClick={e => e.stopPropagation()}>
            <button className="media__modal-close" onClick={() => setActiveVideo(null)}><FaTimes /></button>
            <div className="media__modal-title">{activeVideo.title}</div>
            <div className="media__iframe-wrap">
              <iframe src={`${activeVideo.embedUrl}?autoplay=1&rel=0`} title={activeVideo.title}
                frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function MediaPortfolio() {
  const { state } = usePortfolio();
  const { media } = state;
  const [tab, setTab] = useState('photography');

  return (
    <section id="media" className="section media-portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Media Portfolio</h2>
          <p className="section-subtitle">Creative visual work — through the lens and from the sky.</p>
        </div>
        <div className="media__tabs">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} className={`media__tab ${tab === t.key ? 'media__tab--active' : ''}`} onClick={() => setTab(t.key)}>
                <Icon /> {t.label}
              </button>
            );
          })}
        </div>
        <div className="media__content">
          {(tab === 'photography' || tab === 'drone') && <PhotoGrid items={tab === 'photography' ? media.photography : media.drone} />}
          {tab === 'videography' && <VideoGrid items={media.videography} />}
        </div>
      </div>
    </section>
  );
}
