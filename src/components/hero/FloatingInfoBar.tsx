import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingInfoBarProps {
  label: string;
  icon: LucideIcon;
  position: 'left' | 'right';
  top: string;
  accentColor?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FloatingInfoBar: React.FC<FloatingInfoBarProps> = ({
  label,
  icon: Icon,
  position,
  top,
  accentColor = '#0077FE',
  delay = 0,
  duration = 6,
  className = ''
}) => {
  const isLeft = position === 'left';
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [proximityLevel, setProximityLevel] = useState<0 | 1 | 2>(0);
  const [magnetShift, setMagnetShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = barRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 120) {
        setProximityLevel(0);
        setMagnetShift({ x: 0, y: 0 });
      } else if (dist > 60) {
        setProximityLevel(1);
        const factor = (120 - dist) / 60;
        setMagnetShift({
          x: (dx / dist) * factor * 1.5,
          y: (dy / dist) * factor * 1.5
        });
      } else {
        setProximityLevel(2);
        const factor = (60 - dist) / 60;
        setMagnetShift({
          x: (dx / dist) * (1.5 + factor * 2),
          y: (dy / dist) * (1.5 + factor * 2)
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getScale = () => {
    if (isHovered) return 1.05; // max 1.05 scale for side bars
    if (proximityLevel === 2) return 1.02;
    return 1;
  };

  const getBorderColor = () => {
    if (isHovered) return '#00A3FF';
    if (proximityLevel === 2) return `${accentColor}80`;
    if (proximityLevel === 1) return 'rgba(0, 163, 255, 0.4)';
    return 'rgba(0, 119, 254, 0.25)';
  };

  const getBoxShadow = () => {
    if (isHovered) {
      return `0 10px 28px -2px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 163, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)`;
    }
    if (proximityLevel === 2) {
      return `0 6px 20px -2px rgba(0, 0, 0, 0.5), 0 0 12px ${accentColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
    }
    if (proximityLevel === 1) {
      return `0 4px 16px rgba(0, 0, 0, 0.4), 0 0 8px ${accentColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.22)`;
    }
    return '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.18)';
  };

  const uniqueAnim = `infoBarFloat_${label.replace(/\s+/g, '')}`;

  return (
    // Outer container handles positioning and ambient slow float
    <div
      className={`hidden xl:block absolute z-20 pointer-events-auto select-none ${
        isLeft ? 'left-6 lg:left-10' : 'right-6 lg:right-10'
      } ${className}`}
      style={{
        top,
        animation: `${uniqueAnim} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {/* Inner compact capsule with isolated hover, scale, and magnetic shift */}
      <div
        ref={barRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMagnetShift({ x: 0, y: 0 });
        }}
        className="w-max whitespace-nowrap inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full backdrop-blur-xl cursor-pointer"
        style={{
          transform: `translate3d(${magnetShift.x}px, ${magnetShift.y}px, 0) scale(${getScale()})`,
          borderColor: getBorderColor(),
          borderWidth: '1.2px',
          borderStyle: 'solid',
          backgroundColor: isHovered ? 'rgba(4, 18, 48, 0.85)' : 'rgba(3, 14, 36, 0.72)',
          boxShadow: getBoxShadow(),
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease',
          willChange: 'transform, box-shadow'
        }}
      >
        <span
          className="w-2 h-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: accentColor,
            boxShadow: isHovered || proximityLevel > 0 ? `0 0 10px ${accentColor}` : `0 0 5px ${accentColor}`
          }}
        />
        <Icon
          className="w-3.5 h-3.5 transition-colors duration-200"
          style={{ color: isHovered ? '#FFFFFF' : '#CBD5E1' }}
        />
        <span className="text-[11px] font-medium tracking-wide text-slate-200 whitespace-nowrap">
          {label}
        </span>
      </div>

      <style>{`
        @keyframes ${uniqueAnim} {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(${isLeft ? '-8px' : '8px'}) translateX(${isLeft ? '3px' : '-3px'});
          }
        }
      `}</style>
    </div>
  );
};
