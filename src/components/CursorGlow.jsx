import { useEffect, useRef } from 'react';
import './CursorGlow.css';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only run on non-touch / desktop devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      // Smooth lerp toward actual cursor position
      current.current.x += (pos.current.x - current.current.x) * 0.1;
      current.current.y += (pos.current.y - current.current.y) * 0.1;

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render on touch devices at all
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
