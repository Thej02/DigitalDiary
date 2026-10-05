import React, { useEffect, useState } from 'react';
import { useAtmosphere } from '../../context/AtmosphereContext';

export const LampCursor: React.FC = () => {
  const { mode } = useAtmosphere();
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
  const [isHovering, setIsHovering] = useState(true);

  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsHovering(true);
    };

    const onMouseLeave = () => {
      setIsHovering(false);
    };

    const loop = () => {
      // Smooth lerp easing
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  const glowColor =
    mode === 'lamp'
      ? 'radial-gradient(circle, rgba(255, 195, 110, 0.14) 0%, rgba(220, 140, 50, 0.05) 45%, transparent 72%)'
      : 'radial-gradient(circle, rgba(255, 120, 35, 0.12) 0%, rgba(180, 60, 15, 0.04) 50%, transparent 80%)';

  return (
    <div
      className="lamp-beam"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        background: glowColor,
        opacity: isHovering ? 1 : 0.4,
      }}
      aria-hidden="true"
    />
  );
};
