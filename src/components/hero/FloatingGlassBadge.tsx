import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingGlassBadgeProps {
  label: string;
  icon?: LucideIcon;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  floatDelay?: number;
  floatDuration?: number;
  onClick?: () => void;
}

export const FloatingGlassBadge: React.FC<FloatingGlassBadgeProps> = ({
  label,
  icon: Icon,
  accentColor = '#0077FE',
  className = '',
  style = {},
  floatDelay = 0,
  floatDuration = 5,
  onClick
}) => {
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [proximityLevel, setProximityLevel] = useState<0 | 1 | 2>(0); // 0: >120px, 1: 60-120px, 2: <60px
  const [magnetShift, setMagnetShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = badgeRef.current;
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
    if (isHovered) return 1.06;
    if (proximityLevel === 2) return 1.02;
    return 1;
  };

  const getBorderColor = () => {
    if (isHovered) return '#00A3FF';
    if (proximityLevel === 2) return 'rgba(0, 163, 255, 0.65)';
    if (proximityLevel === 1) return 'rgba(0, 119, 254, 0.4)';
    return 'rgba(0, 119, 254, 0.28)';
  };

  const getBoxShadow = () => {
    if (isHovered) {
      return '0 16px 36px -6px rgba(0, 0, 0, 0.7), 0 0 26px rgba(0, 163, 255, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.45)';
    }
    if (proximityLevel === 2) {
      return '0 12px 28px -6px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 119, 254, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
    }
    if (proximityLevel === 1) {
      return '0 8px 22px -4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 119, 254, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    }
    return '0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 119, 254, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.18)';
  };

  const getBackgroundColor = () => {
    if (isHovered) return 'rgba(6, 20, 52, 0.9)';
    if (proximityLevel === 2) return 'rgba(5, 17, 44, 0.84)';
    return 'rgba(4, 14, 38, 0.78)';
  };

  const uniqueAnimName = `badgeFloat_${label.replace(/\s+/g, '')}`;

  return (
    <div
      className={`absolute select-none pointer-events-auto ${className}`}
      style={{
        ...style,
        animation: `${uniqueAnimName} ${floatDuration}s ease-in-out infinite`,
        animationDelay: `${floatDelay}s`
      }}
    >
      <div
        ref={badgeRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMagnetShift({ x: 0, y: 0 });
        }}
        className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl backdrop-blur-2xl cursor-pointer w-max whitespace-nowrap transition-all group"
        style={{
          transform: `translate3d(${magnetShift.x}px, ${magnetShift.y}px, 0) scale(${getScale()})`,
          borderColor: getBorderColor(),
          borderWidth: '1.2px',
          borderStyle: 'solid',
          backgroundColor: getBackgroundColor(),
          boxShadow: getBoxShadow(),
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
          willChange: 'transform, box-shadow'
        }}
      >
        {/* Lucide Icon in Light Blue */}
        {Icon && (
          <div
            className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
            style={{
              color: isHovered ? '#FFFFFF' : '#38BDF8',
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        {/* Badge Label */}
        <span
          className="text-xs sm:text-sm font-semibold tracking-wide text-white whitespace-nowrap drop-shadow-sm transition-colors duration-200"
          style={{
            textShadow: isHovered ? '0 0 10px rgba(0, 163, 255, 0.6)' : 'none'
          }}
        >
          {label}
        </span>
      </div>

      <style>{`
        @keyframes ${uniqueAnimName} {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};
