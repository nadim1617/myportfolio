import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaArrowDown } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Hero.css';

const iconMap = { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaYoutube };

export default function Hero() {
  const { state } = usePortfolio();
  const { profile } = state;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#00d4b4' : '#0099ff',
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="container hero__content">
        <div className="hero__avatar-wrap">
          <div className="hero__avatar-ring" />
          <img src={profile.avatar} alt={profile.name} className="hero__avatar" />
        </div>
        <div className="hero__text">
          <p className="hero__greeting">Hello, I'm</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__tagline">{profile.tagline}</p>
          <p className="hero__bio">{profile.bio}</p>
          <div className="hero__socials">
            {profile.socials.map(s => {
              const Icon = iconMap[s.icon];
              return Icon ? (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                   className="hero__social-link" aria-label={s.label}><Icon /></a>
              ) : null;
            })}
          </div>
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#media" className="btn btn-outline">Media Portfolio</a>
          </div>
        </div>
      </div>
      <a href="#about" className="hero__scroll-hint" aria-label="Scroll down"><FaArrowDown /></a>
    </section>
  );
}
