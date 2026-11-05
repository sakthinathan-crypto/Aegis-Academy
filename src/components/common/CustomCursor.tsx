import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports fine hover
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(!hasFinePointer);
      if (!hasFinePointer) return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.closest('.glass-card') ||
          target.closest('.btn-glossy-gold') ||
          target.closest('.btn-glossy-glass') ||
          target.getAttribute('role') === 'button';
        setIsPointer(!!isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Smooth trail animation
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId: number;
    const animateTrail = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };
    animationFrameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer ambient glow ring */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 border ${
          isPointer
            ? 'w-11 h-11 -ml-[22px] -mt-[22px] border-[#D5AD63] bg-[#D5AD63]/15 shadow-[0_0_20px_rgba(213,173,99,0.4)] scale-110'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#D5AD63]/40 bg-transparent shadow-[0_0_10px_rgba(56,189,248,0.15)] scale-100'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          willChange: 'transform'
        }}
      />
      {/* Center pinpoint */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#D5AD63] shadow-[0_0_8px_#D5AD63] transition-opacity duration-150`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};
