import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingGlassBadgeProps {
  label: string;
  icon: LucideIcon;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  floatDelay?: number;
  floatDuration?: number;
}

export const FloatingGlassBadge: React.FC<FloatingGlassBadgeProps> = ({
  label,
  icon: Icon,
  accentColor = '#D5AD63',
  className = '',
  style = {},
  floatDelay = 0,
  floatDuration = 5
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
        // Very subtle 1-2px magnetic nudge towards cursor
        const factor = (120 - dist) / 60;
        setMagnetShift({
          x: (dx / dist) * factor * 2,
          y: (dy / dist) * factor * 2
        });
      } else {
        setProximityLevel(2);
        // Slightly stronger 2-4px magnetic nudge towards cursor
        const factor = (60 - dist) / 60;
        setMagnetShift({
          x: (dx / dist) * (2 + factor * 2.5),
          y: (dy / dist) * (2 + factor * 2.5)
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Compute visual appearance based on individual hover and proximity
  const getScale = () => {
    if (isHovered) return 1.06; // Max 1.06 scale as requested (1.04 - 1.08)
    if (proximityLevel === 2) return 1.02;
    return 1;
  };

  const getBorderColor = () => {
    if (isHovered) return accentColor;
    if (proximityLevel === 2) return `${accentColor}80`;
    if (proximityLevel === 1) return 'rgba(255, 255, 255, 0.4)';
    return 'rgba(255, 255, 255, 0.2)';
  };

  const getBoxShadow = () => {
    if (isHovered) {
      return `0 14px 30px -4px rgba(0, 0, 0, 0.5), 0 0 22px ${accentColor}50, inset 0 1px 0 rgba(255, 255, 255, 0.5)`;
    }
    if (proximityLevel === 2) {
      return `0 10px 24px -4px rgba(0, 0, 0, 0.4), 0 0 14px ${accentColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.35)`;
    }
    if (proximityLevel === 1) {
      return `0 8px 20px -4px rgba(0, 0, 0, 0.35), 0 0 8px ${accentColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.25)`;
    }
    return '0 8px 20px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
  };

  const getBackgroundColor = () => {
    if (isHovered) return 'rgba(255, 255, 255, 0.18)';
    if (proximityLevel === 2) return 'rgba(255, 255, 255, 0.14)';
    return 'rgba(255, 255, 255, 0.09)';
  };

  const uniqueAnimName = `badgeFloat_${label.replace(/\s+/g, '')}`;

  return (
    // Outer container handles ambient vertical bobbing animation
    <div
      className={`absolute select-none pointer-events-auto ${className}`}
      style={{
        ...style,
        animation: `${uniqueAnimName} ${floatDuration}s ease-in-out infinite`,
        animationDelay: `${floatDelay}s`
      }}
    >
      {/* Inner container handles isolated hover scale, magnetic shift, and glow */}
      <div
        ref={badgeRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMagnetShift({ x: 0, y: 0 });
        }}
        className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl backdrop-blur-xl cursor-pointer w-max whitespace-nowrap"
        style={{
          transform: `translate3d(${magnetShift.x}px, ${magnetShift.y}px, 0) scale(${getScale()})`,
          borderColor: getBorderColor(),
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: getBackgroundColor(),
          boxShadow: getBoxShadow(),
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease',
          willChange: 'transform, box-shadow'
        }}
      >
        {/* Soft reflective inner highlight */}
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border border-white/20 transition-all duration-200"
          style={{
            backgroundColor: isHovered ? `${accentColor}35` : `${accentColor}20`,
            color: isHovered ? '#FFFFFF' : accentColor,
            boxShadow: isHovered ? `0 0 12px ${accentColor}` : 'none'
          }}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

        <span className="text-xs font-semibold tracking-wide text-white whitespace-nowrap drop-shadow-sm">
          {label}
        </span>
      </div>

      <style>{`
        @keyframes ${uniqueAnimName} {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
};
