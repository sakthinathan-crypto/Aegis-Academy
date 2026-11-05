import React, { useEffect, useRef } from 'react';

interface AntigravityFieldProps {
  className?: string;
  count?: number;
}

interface AntigravityTick {
  // Base resting coordinates (polar from center)
  baseR: number;
  baseTheta: number;
  originX: number;
  originY: number;
  baseAngle: number;

  // Current simulation state
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  angularVelocity: number;

  // Properties
  length: number;
  width: number;
  color: string;
  alpha: number;
  springK: number;
  damping: number;
}

export const AntigravityField: React.FC<AntigravityFieldProps> = ({
  className = '',
  count
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -2000,
    y: -2000,
    prevX: -2000,
    prevY: -2000,
    vx: 0,
    vy: 0,
    speed: 0,
    isActive: false,
    clickRippleRadius: 0,
    clickRippleMax: 450,
    clickRippleActive: false,
    rippleX: 0,
    rippleY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    // Palette inspired by Google Antigravity & Aegis corporate identity:
    // Cobalt Blue, Deep Slate, Aegis Champagne Gold, Vibrant Coral/Red, Emerald Teal, Sky Azure
    const PALETTE = [
      '#2563EB', // Vibrant Royal Blue
      '#1D4ED8', // Deep Cobalt
      '#0F172A', // Midnight Slate
      '#D5AD63', // Aegis Champagne Gold
      '#D97706', // Warm Amber Gold
      '#EF4444', // Coral Red
      '#DC2626', // Crimson Accent
      '#059669', // Emerald Teal
      '#0284C7', // Sky Cyan
      '#6366F1'  // Indigo
    ];

    let ticks: AntigravityTick[] = [];

    const initTicks = () => {
      const parent = canvas.parentElement;
      const displayWidth = parent?.clientWidth || window.innerWidth;
      const displayHeight = parent?.clientHeight || window.innerHeight;

      width = displayWidth;
      height = displayHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      centerX = width / 2;
      centerY = height * 0.46; // Center slightly above middle for headline clearance

      // Determine total particle count based on screen area
      const targetCount = count || Math.min(Math.floor((width * height) / 2200), 450);
      ticks = [];

      // Gravitational clearance radius where headline sits
      const minRadius = Math.min(width * 0.28, 280);
      const maxRadius = Math.max(width, height) * 0.85;

      for (let i = 0; i < targetCount; i++) {
        // Distribute particles using square root of uniform for even areal density
        const u = Math.random();
        // Power distribution pushes slightly more towards the mid-outer orbits like in antigravity.google
        const r = minRadius + Math.pow(u, 0.75) * (maxRadius - minRadius);
        const theta = Math.random() * Math.PI * 2;

        const ox = centerX + Math.cos(theta) * r;
        const oy = centerY + Math.sin(theta) * r;

        // Base angle points radially outward with subtle natural variance
        const radialAngle = theta + (Math.random() - 0.5) * 0.35;
        const tickLength = 6 + Math.random() * 8; // 6px to 14px long
        const tickWidth = 2 + Math.random() * 1.5; // 2px to 3.5px thick
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const alpha = 0.65 + Math.random() * 0.35;

        ticks.push({
          baseR: r,
          baseTheta: theta,
          originX: ox,
          originY: oy,
          baseAngle: radialAngle,
          x: ox + (Math.random() - 0.5) * 30,
          y: oy + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          angle: radialAngle,
          targetAngle: radialAngle,
          angularVelocity: 0,
          length: tickLength,
          width: tickWidth,
          color,
          alpha,
          springK: 0.03 + Math.random() * 0.02,
          damping: 0.88 + Math.random() * 0.04
        });
      }
    };

    const handleResize = () => {
      initTicks();
    };

    window.addEventListener('resize', handleResize);

    // Mouse & Touch Tracking with Physics Velocity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - mouseRef.current.x;
      const dy = currentY - mouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.vx = dx * 0.5;
      mouseRef.current.vy = dy * 0.5;
      mouseRef.current.speed = Math.min(speed, 80);
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        mouseRef.current.rippleX = clickX;
        mouseRef.current.rippleY = clickY;
        mouseRef.current.clickRippleRadius = 15;
        mouseRef.current.clickRippleActive = true;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const tx = e.touches[0].clientX - rect.left;
        const ty = e.touches[0].clientY - rect.top;
        mouseRef.current.x = tx;
        mouseRef.current.y = ty;
        mouseRef.current.isActive = true;
        if (tx >= 0 && tx <= width && ty >= 0 && ty <= height) {
          mouseRef.current.rippleX = tx;
          mouseRef.current.rippleY = ty;
          mouseRef.current.clickRippleRadius = 15;
          mouseRef.current.clickRippleActive = true;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const currentX = e.touches[0].clientX - rect.left;
        const currentY = e.touches[0].clientY - rect.top;
        const dx = currentX - mouseRef.current.x;
        const dy = currentY - mouseRef.current.y;
        mouseRef.current.x = currentX;
        mouseRef.current.y = currentY;
        mouseRef.current.vx = dx * 0.4;
        mouseRef.current.vy = dy * 0.4;
        mouseRef.current.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isActive = false;
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    initTicks();

    // Subtle continuous ambient drift speed
    let ambientTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ambientTime += 0.0015;
      const mouse = mouseRef.current;
      const mouseActive = mouse.isActive && mouse.x > -1000;
      const repelDist = 200; // Antigravity repulsion sphere

      // Process Shockwave Ripple
      if (mouse.clickRippleActive) {
        mouse.clickRippleRadius += 9;
        const rippleAlpha = 1 - mouse.clickRippleRadius / mouse.clickRippleMax;

        if (rippleAlpha > 0) {
          ctx.beginPath();
          ctx.arc(mouse.rippleX, mouse.rippleY, mouse.clickRippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${rippleAlpha * 0.35})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Shockwave impulse on ticks
          ticks.forEach(tick => {
            const dx = tick.x - mouse.rippleX;
            const dy = tick.y - mouse.rippleY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(dist - mouse.clickRippleRadius) < 45) {
              const pushAngle = Math.atan2(dy, dx);
              tick.vx += Math.cos(pushAngle) * 7.5;
              tick.vy += Math.sin(pushAngle) * 7.5;
              tick.targetAngle = pushAngle;
              tick.angularVelocity += 0.25;
            }
          });
        } else {
          mouse.clickRippleActive = false;
        }
      }

      // Update & Render each Antigravity Tick
      ticks.forEach(tick => {
        // 1. Ambient gentle orbit drift around center
        const currentTheta = tick.baseTheta + ambientTime * 0.25;
        const targetOx = centerX + Math.cos(currentTheta) * tick.baseR;
        const targetOy = centerY + Math.sin(currentTheta) * tick.baseR;
        const currentBaseAngle = currentTheta + (tick.baseAngle - tick.baseTheta);

        // 2. Interactive Cursor Antigravity Force
        if (mouseActive) {
          const dx = tick.x - mouse.x;
          const dy = tick.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelDist && dist > 1) {
            const power = 1 - dist / repelDist;
            const force = power * power * 12.5; // Strong crisp push
            const normX = dx / dist;
            const normY = dy / dist;

            // Direct repulsion
            tick.vx += normX * force;
            tick.vy += normY * force;

            // Fluid velocity swirl from cursor motion
            tick.vx += -normY * mouse.vy * 0.12 * power;
            tick.vy += normX * mouse.vx * 0.12 * power;

            // Orient the tick along the repulsion vector or velocity vector
            tick.targetAngle = Math.atan2(tick.vy, tick.vx);
          } else {
            tick.targetAngle = currentBaseAngle;
          }
        } else {
          tick.targetAngle = currentBaseAngle;
        }

        // 3. Hooke's Elastic Return Spring to origin
        const springX = targetOx - tick.x;
        const springY = targetOy - tick.y;
        tick.vx += springX * tick.springK;
        tick.vy += springY * tick.springK;

        // 4. Damping & Integration
        tick.vx *= tick.damping;
        tick.vy *= tick.damping;
        tick.x += tick.vx;
        tick.y += tick.vy;

        // 5. Angular Spring & Smooth Rotation
        let dAngle = tick.targetAngle - tick.angle;
        // Normalize angle difference to [-PI, PI]
        while (dAngle > Math.PI) dAngle -= Math.PI * 2;
        while (dAngle < -Math.PI) dAngle += Math.PI * 2;
        tick.angularVelocity += dAngle * 0.08;
        tick.angularVelocity *= 0.82;
        tick.angle += tick.angularVelocity;

        // 6. Dynamic Stretch based on current speed
        const speed = Math.sqrt(tick.vx * tick.vx + tick.vy * tick.vy);
        const dynamicLength = tick.length + Math.min(speed * 1.8, 12);

        // 7. Render Rounded Capsule Tick (identical to Antigravity)
        ctx.save();
        ctx.translate(tick.x, tick.y);
        ctx.rotate(tick.angle);

        ctx.beginPath();
        // Draw centered capsule
        const halfL = dynamicLength / 2;
        const r = tick.width / 2;
        ctx.moveTo(-halfL + r, -r);
        ctx.lineTo(halfL - r, -r);
        ctx.arc(halfL - r, 0, r, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(-halfL + r, r);
        ctx.arc(-halfL + r, 0, r, Math.PI / 2, -Math.PI / 2);
        ctx.closePath();

        ctx.fillStyle = tick.color;
        ctx.globalAlpha = tick.alpha;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
