import React, { useEffect, useRef } from 'react';

interface ParticleEnvironmentProps {
  interactive?: boolean;
  className?: string;
  particleCount?: number;
}

interface AntigravityParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  friction: number;
  springFactor: number;
}

interface FloatingPolyhedron {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  scale: number;
  color: string;
  type: 'icosahedron' | 'octahedron';
}

export const ParticleEnvironment: React.FC<ParticleEnvironmentProps> = ({
  interactive = true,
  className = '',
  particleCount = 85
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    isActive: false,
    clickRippleRadius: 0,
    clickRippleMax: 260,
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
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
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
      mouseRef.current.vx = dx * 0.4;
      mouseRef.current.vy = dy * 0.4;
      mouseRef.current.speed = Math.min(speed, 60);
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        mouseRef.current.rippleX = clickX;
        mouseRef.current.rippleY = clickY;
        mouseRef.current.clickRippleRadius = 8;
        mouseRef.current.clickRippleActive = true;
      }
    };

    // Touch support for mobile / tablets
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
          mouseRef.current.clickRippleRadius = 8;
          mouseRef.current.clickRippleActive = true;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isActive = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('click', handleClick);
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Palette: Champagne Gold, Electric Cyan, Royal Blue, Soft Ice
    const particleColors = [
      { fill: 'rgba(213, 173, 99, ', glow: '#D5AD63' }, // Champagne gold
      { fill: 'rgba(56, 189, 248, ', glow: '#38BDF8' }, // Cyan light
      { fill: 'rgba(118, 169, 255, ', glow: '#76A9FF' }, // Aegis blue
      { fill: 'rgba(232, 202, 140, ', glow: '#E8CA8C' }, // Pale gold
      { fill: 'rgba(255, 255, 255, ', glow: '#FFFFFF' }  // Specular white
    ];

    let particles: AntigravityParticle[] = [];
    let shapes: FloatingPolyhedron[] = [];

    const initParticles = () => {
      particles = [];
      const cols = Math.floor(Math.sqrt(particleCount * (width / height)));
      const rows = Math.ceil(particleCount / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Distribute nicely with natural randomness
        const ox = (col + 0.5 + (Math.random() - 0.5) * 0.7) * cellWidth;
        const oy = (row + 0.5 + (Math.random() - 0.5) * 0.7) * cellHeight;

        const colorObj = particleColors[Math.floor(Math.random() * particleColors.length)];
        const baseAlpha = 0.35 + Math.random() * 0.5;

        particles.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2.2 + 1.2,
          color: colorObj.fill,
          glowColor: colorObj.glow,
          alpha: baseAlpha,
          baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          friction: 0.91 + Math.random() * 0.04,
          springFactor: 0.025 + Math.random() * 0.02
        });
      }

      // 3D Polyhedral Nodes (Antigravity wireframes floating in background)
      shapes = [
        {
          x: width * 0.16,
          y: height * 0.32,
          originX: width * 0.16,
          originY: height * 0.32,
          vx: 0,
          vy: 0,
          rotX: 0.2,
          rotY: 0.4,
          rotZ: 0,
          vRotX: 0.005,
          vRotY: 0.008,
          vRotZ: 0.003,
          scale: 44,
          color: 'rgba(213, 173, 99, 0.42)',
          type: 'octahedron'
        },
        {
          x: width * 0.84,
          y: height * 0.42,
          originX: width * 0.84,
          originY: height * 0.42,
          vx: 0,
          vy: 0,
          rotX: 0.1,
          rotY: -0.3,
          rotZ: 0.2,
          vRotX: -0.006,
          vRotY: 0.007,
          vRotZ: 0.004,
          scale: 54,
          color: 'rgba(56, 189, 248, 0.42)',
          type: 'octahedron'
        },
        {
          x: width * 0.72,
          y: height * 0.82,
          originX: width * 0.72,
          originY: height * 0.82,
          vx: 0,
          vy: 0,
          rotX: 0.5,
          rotY: 0.1,
          rotZ: -0.2,
          vRotX: 0.004,
          vRotY: -0.006,
          vRotZ: 0.005,
          scale: 36,
          color: 'rgba(213, 173, 99, 0.32)',
          type: 'octahedron'
        }
      ];
    };

    initParticles();

    // 3D Rotation helper
    const rotate3D = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);
      const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return { x: x3, y: y3, z: z2 };
    };

    // Render loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseActive = mouse.isActive && mouse.x > 0 && mouse.y > 0;
      const repelDist = 180; // Distance of antigravity cursor influence
      const connectDist = 200; // Distance for cursor-to-particle laser connection

      // 1. Process Click / Tap Gravitational Shockwave
      if (mouse.clickRippleActive) {
        mouse.clickRippleRadius += 6.5;
        const rippleAlpha = 1 - mouse.clickRippleRadius / mouse.clickRippleMax;

        if (rippleAlpha > 0) {
          ctx.beginPath();
          ctx.arc(mouse.rippleX, mouse.rippleY, mouse.clickRippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(213, 173, 99, ${rippleAlpha * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Repel particles crossing ripple edge
          particles.forEach(p => {
            const dx = p.x - mouse.rippleX;
            const dy = p.y - mouse.rippleY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(dist - mouse.clickRippleRadius) < 35) {
              const pushAngle = Math.atan2(dy, dx);
              p.vx += Math.cos(pushAngle) * 4.5;
              p.vy += Math.sin(pushAngle) * 4.5;
            }
          });
        } else {
          mouse.clickRippleActive = false;
        }
      }

      // 2. Render Polyhedral Floating Geometry with Antigravity Deflection
      shapes.forEach(shape => {
        shape.rotX += shape.vRotX;
        shape.rotY += shape.vRotY;
        shape.rotZ += shape.vRotZ;

        // Antigravity cursor deflection on polyhedra
        if (mouseActive) {
          const dx = shape.x - mouse.x;
          const dy = shape.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 320 && dist > 1) {
            const force = (1 - dist / 320) * 1.8;
            shape.vx += (dx / dist) * force;
            shape.vy += (dy / dist) * force;
            shape.rotX += (dy / dist) * 0.02;
            shape.rotY += (dx / dist) * 0.02;
          }
        }

        // Return to origin spring
        shape.vx += (shape.originX - shape.x) * 0.015;
        shape.vy += (shape.originY - shape.y) * 0.015;
        shape.vx *= 0.92;
        shape.vy *= 0.92;
        shape.x += shape.vx;
        shape.y += shape.vy;

        // Octahedron vertices
        const vertices = [
          { x: 0, y: -1, z: 0 },
          { x: 1, y: 0, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: 0, z: -1 },
          { x: 0, y: 1, z: 0 }
        ];

        const edges = [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [5, 1], [5, 2], [5, 3], [5, 4],
          [1, 2], [2, 3], [3, 4], [4, 1]
        ];

        const projPts = vertices.map(v => {
          const r = rotate3D(v.x * shape.scale, v.y * shape.scale, v.z * shape.scale, shape.rotX, shape.rotY, shape.rotZ);
          return { x: shape.x + r.x, y: shape.y + r.y };
        });

        // Wireframe edges
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 1.25;
        edges.forEach(([i, j]) => {
          ctx.moveTo(projPts[i].x, projPts[i].y);
          ctx.lineTo(projPts[j].x, projPts[j].y);
        });
        ctx.stroke();

        // Glowing vertex dots
        projPts.forEach(pt => {
          ctx.beginPath();
          ctx.fillStyle = '#FFFFFF';
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // 3. Process Antigravity Cursor Physics on Particles
      const closeToCursor: { p: AntigravityParticle; dist: number }[] = [];

      particles.forEach(p => {
        // Natural ambient drift
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        // Interactive Cursor Antigravity Force (Repulsion + Fluid Swirl)
        if (mouseActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelDist && dist > 1) {
            // Antigravity inverse distance push
            const power = (1 - dist / repelDist);
            const force = power * power * 9.5;
            const normX = dx / dist;
            const normY = dy / dist;

            // Push outward from cursor
            p.vx += normX * force;
            p.vy += normY * force;

            // Fluid swirl effect based on mouse velocity
            p.vx += -normY * mouse.vy * 0.15 * power;
            p.vy += normX * mouse.vx * 0.15 * power;

            // Enhance particle luminescence near cursor
            p.alpha = Math.min(1, p.alpha + power * 0.45);
          }

          if (dist < connectDist) {
            closeToCursor.push({ p, dist });
          }
        }

        // Hooke's Elastic Return Spring to origin
        const springDx = p.originX - p.x;
        const springDy = p.originY - p.y;
        p.vx += springDx * p.springFactor;
        p.vy += springDy * p.springFactor;

        // Friction damping
        p.vx *= p.friction;
        p.vy *= p.friction;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Gentle boundary soft bounce
        if (p.x < 10) p.vx += 0.5;
        if (p.x > width - 10) p.vx -= 0.5;
        if (p.y < 10) p.vy += 0.5;
        if (p.y > height - 10) p.vy -= 0.5;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Cursor Magnetic Energy Lines (Direct Cursor-Tracking Web)
      if (mouseActive && closeToCursor.length > 0) {
        // Sort closest particles to cursor
        closeToCursor.sort((a, b) => a.dist - b.dist);
        const topConnections = closeToCursor.slice(0, 7);

        // Ambient glow halo around cursor
        const haloGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        haloGrad.addColorStop(0, 'rgba(213, 173, 99, 0.22)');
        haloGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
        haloGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Cursor focal core
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#D5AD63';
        ctx.shadowColor = '#D5AD63';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Render laser-thin connection filaments to closest nodes
        topConnections.forEach(({ p, dist }) => {
          const strength = 1 - dist / connectDist;
          const lineAlpha = strength * 0.45;

          const lineGrad = ctx.createLinearGradient(mouse.x, mouse.y, p.x, p.y);
          lineGrad.addColorStop(0, `rgba(213, 173, 99, ${lineAlpha})`);
          lineGrad.addColorStop(1, `rgba(56, 189, 248, ${lineAlpha * 0.8})`);

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1 + strength * 1.2;
          ctx.stroke();

          // Small pulse dot at connection end
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        });
      }

      // 5. Constellation Lines Between Neighboring Particles
      const maxNeighborDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxNeighborDist) {
            const alpha = (1 - dist / maxNeighborDist) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 190, 245, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('click', handleClick);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [interactive, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
