import { useEffect, useState } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="scroll-bar" aria-hidden="true">
        <div className="scroll-bar__fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Floating percentage badge */}
      <div
        className={`scroll-pct ${progress > 0 ? 'scroll-pct--visible' : ''}`}
        aria-label={`Page scroll: ${progress}%`}
      >
        <svg className="scroll-pct__ring" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" className="scroll-pct__track" />
          <circle
            cx="18" cy="18" r="15.9"
            className="scroll-pct__circle"
            strokeDasharray={`${progress} 100`}
          />
        </svg>
        <span className="scroll-pct__num">{progress}</span>
      </div>
    </>
  );
}
