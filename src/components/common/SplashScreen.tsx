import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface SplashScreenProps {
  mascotSrc?: string | null;
  onRevealStart: () => void;
  onComplete: () => void;
}

const AMBIENT_PARTICLES = [
  { id: 'p1', pos: 'left-[12%] top-[22%] w-1.5 h-1.5 [animation-delay:0.08s] [animation-duration:3.4s] [--drift-x:14px] [--drift-y:-44px]', mobile: true },
  { id: 'p2', pos: 'left-[22%] top-[68%] w-2 h-2 [animation-delay:0.25s] [animation-duration:3.8s] [--drift-x:-12px] [--drift-y:-50px]', mobile: true },
  { id: 'p3', pos: 'left-[78%] top-[20%] w-1.5 h-1.5 [animation-delay:0.15s] [animation-duration:3.2s] [--drift-x:-16px] [--drift-y:-38px]', mobile: true },
  { id: 'p4', pos: 'left-[84%] top-[64%] w-2 h-2 [animation-delay:0.35s] [animation-duration:3.9s] [--drift-x:12px] [--drift-y:-48px]', mobile: true },
  { id: 'p5', pos: 'left-[34%] top-[18%] w-1 h-1 [animation-delay:0.42s] [animation-duration:3.1s] [--drift-x:10px] [--drift-y:-36px]', mobile: true },
  { id: 'p6', pos: 'left-[66%] top-[76%] w-1.5 h-1.5 [animation-delay:0.2s] [animation-duration:3.6s] [--drift-x:-14px] [--drift-y:-46px]', mobile: true },
  { id: 'p7', pos: 'left-[18%] top-[44%] w-1 h-1 [animation-delay:0.55s] [animation-duration:3.3s] [--drift-x:18px] [--drift-y:-40px]', mobile: true },
  { id: 'p8', pos: 'left-[88%] top-[42%] w-1 h-1 [animation-delay:0.48s] [animation-duration:3.5s] [--drift-x:-18px] [--drift-y:-42px]', mobile: true },
  { id: 'p9', pos: 'left-[8%] top-[76%] w-1.5 h-1.5 [animation-delay:0.12s] [animation-duration:3.7s] [--drift-x:16px] [--drift-y:-52px]', mobile: false },
  { id: 'p10', pos: 'left-[28%] top-[82%] w-1 h-1 [animation-delay:0.6s] [animation-duration:3.2s] [--drift-x:-10px] [--drift-y:-44px]', mobile: false },
  { id: 'p11', pos: 'left-[44%] top-[12%] w-1.5 h-1.5 [animation-delay:0.3s] [animation-duration:3.5s] [--drift-x:12px] [--drift-y:-34px]', mobile: false },
  { id: 'p12', pos: 'left-[58%] top-[14%] w-1 h-1 [animation-delay:0.5s] [animation-duration:3.3s] [--drift-x:-12px] [--drift-y:-38px]', mobile: false },
  { id: 'p13', pos: 'left-[72%] top-[34%] w-1.5 h-1.5 [animation-delay:0.18s] [animation-duration:3.6s] [--drift-x:15px] [--drift-y:-46px]', mobile: false },
  { id: 'p14', pos: 'left-[92%] top-[78%] w-1.5 h-1.5 [animation-delay:0.4s] [animation-duration:3.4s] [--drift-x:-16px] [--drift-y:-50px]', mobile: false },
  { id: 'p15', pos: 'left-[30%] top-[34%] w-1 h-1 [animation-delay:0.28s] [animation-duration:3.1s] [--drift-x:-8px] [--drift-y:-40px]', mobile: false },
  { id: 'p16', pos: 'left-[62%] top-[84%] w-1 h-1 [animation-delay:0.65s] [animation-duration:3.8s] [--drift-x:14px] [--drift-y:-48px]', mobile: false },
] as const;

const WELCOME_SPARKS = [
  { id: 's1', pos: 'left-[14%] top-[32%] w-1.5 h-1.5 [animation-delay:1.62s] [--spark-x:-12px]' },
  { id: 's2', pos: 'right-[14%] top-[28%] w-2 h-2 [animation-delay:1.70s] [--spark-x:12px]' },
  { id: 's3', pos: 'left-[20%] bottom-[26%] w-1 h-1 [animation-delay:1.78s] [--spark-x:-10px]' },
  { id: 's4', pos: 'right-[18%] bottom-[24%] w-1.5 h-1.5 [animation-delay:1.85s] [--spark-x:10px]' },
  { id: 's5', pos: 'left-[8%] top-[52%] w-1 h-1 [animation-delay:1.92s] [--spark-x:-14px]' },
  { id: 's6', pos: 'right-[10%] top-[50%] w-1.5 h-1.5 [animation-delay:1.98s] [--spark-x:14px]' },
] as const;

/**
 * Resilient fallback vector emblem representing AEGIS BOT if the supplied PNG/WebP
 * asset has not yet been uploaded or fails to load over a slow/offline connection.
 */
const AegisBotFallbackVisual: React.FC = () => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-[0_14px_34px_rgba(0,119,254,0.42)]"
    role="img"
    aria-label="AEGIS BOT Official Mascot"
  >
    <defs>
      <linearGradient id="botArmorLight" x1="40" y1="24" x2="200" y2="220" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="55%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
      <linearGradient id="botArmorDark" x1="60" y1="50" x2="180" y2="210" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="botVisor" x1="64" y1="58" x2="176" y2="122" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="100%" stopColor="#0B1936" />
      </linearGradient>
      <linearGradient id="botAccentBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#00A3FF" />
        <stop offset="100%" stopColor="#0077FE" />
      </linearGradient>
      <radialGradient id="botEyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="50%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0077FE" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft hover shadow beneath bot */}
    <ellipse cx="120" cy="224" rx="54" ry="8" fill="#0077FE" fillOpacity="0.24" />

    {/* Side ear nodes */}
    <rect x="40" y="76" width="14" height="30" rx="7" fill="url(#botArmorDark)" stroke="#38BDF8" strokeWidth="1.5" />
    <rect x="186" y="76" width="14" height="30" rx="7" fill="url(#botArmorDark)" stroke="#38BDF8" strokeWidth="1.5" />

    {/* Antenna accent */}
    <path d="M120 22V36" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="120" cy="19" r="5" fill="#38BDF8" />

    {/* Head shell (white futuristic armor) */}
    <rect x="52" y="36" width="136" height="96" rx="40" fill="url(#botArmorLight)" stroke="#CBD5E1" strokeWidth="2" />
    {/* Subtle blue crown seam */}
    <path d="M88 42H152" stroke="url(#botAccentBlue)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.75" />

    {/* Black digital face visor */}
    <rect x="66" y="54" width="108" height="62" rx="26" fill="url(#botVisor)" stroke="#00A3FF" strokeWidth="1.8" strokeOpacity="0.7" />

    {/* Glowing animated blue eyes */}
    <g className="splash-eye-pulse origin-center">
      <ellipse cx="98" cy="84" rx="18" ry="18" fill="url(#botEyeGlow)" />
      <ellipse cx="142" cy="84" rx="18" ry="18" fill="url(#botEyeGlow)" />
      <rect x="89" y="75" width="18" height="16" rx="8" fill="#38BDF8" />
      <rect x="133" y="75" width="18" height="16" rx="8" fill="#38BDF8" />
      <circle cx="95" cy="80" r="3" fill="#FFFFFF" />
      <circle cx="139" cy="80" r="3" fill="#FFFFFF" />
    </g>

    {/* Friendly digital smile curve */}
    <path d="M107 101C112 106 128 106 133 101" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />

    {/* Neck joint */}
    <rect x="102" y="130" width="36" height="12" rx="6" fill="url(#botArmorDark)" />

    {/* Shoulders & friendly arms */}
    <path d="M62 152C44 158 38 176 44 192C48 202 58 202 64 192L70 176" fill="url(#botArmorLight)" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M178 152C196 158 202 176 196 192C192 202 182 202 176 192L170 176" fill="url(#botArmorLight)" stroke="#94A3B8" strokeWidth="1.5" />

    {/* Torso armor */}
    <path
      d="M72 146C72 140 78 136 86 136H154C162 136 168 140 168 146L160 198C158 208 150 214 140 214H100C90 214 82 208 80 198L72 146Z"
      fill="url(#botArmorLight)"
      stroke="#CBD5E1"
      strokeWidth="2"
    />

    {/* Dark-grey chest plate with glowing blue trim */}
    <rect x="88" y="148" width="64" height="44" rx="12" fill="url(#botArmorDark)" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.7" />

    {/* AEGIS chest shield & label */}
    <polygon points="120,154 131,159 131,170 120,176 109,170 109,159" fill="#040E26" stroke="#38BDF8" strokeWidth="1.5" />
    <path d="M120 158.5L125 170H122.4L121.3 167.2H118.7L117.6 170H115L120 158.5Z" fill="#38BDF8" />
    <text
      x="120"
      y="186"
      textAnchor="middle"
      fill="#E2E8F0"
      fontSize="8.5"
      fontWeight="700"
      letterSpacing="2"
      fontFamily="Manrope, sans-serif"
    >
      AEGIS
    </text>
  </svg>
);

export const SplashScreen: React.FC<SplashScreenProps> = ({
  mascotSrc = typeof __AEGIS_BOT_ASSET__ !== 'undefined' && __AEGIS_BOT_ASSET__
    ? __AEGIS_BOT_ASSET__
    : '/images/aegis-bot.png',
  onRevealStart,
  onComplete,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFastFade, setIsFastFade] = useState(false);
  const [mascotFailed, setMascotFailed] = useState(false);

  const hasDismissedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const onRevealStartRef = useRef(onRevealStart);
  const onCompleteRef = useRef(onComplete);

  onRevealStartRef.current = onRevealStart;
  onCompleteRef.current = onComplete;

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(id => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const triggerDismiss = useCallback(
    (fadeDurationMs: number, fast = false) => {
      if (hasDismissedRef.current) return;
      hasDismissedRef.current = true;
      clearAllTimers();

      // Restore scroll immediately as splash begins dissolving
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      setIsFastFade(fast);
      setIsFadingOut(true);
      onRevealStartRef.current();

      const completeTimer = window.setTimeout(() => {
        onCompleteRef.current();
      }, fadeDurationMs);
      timersRef.current.push(completeTimer);
    },
    [clearAllTimers]
  );

  const handleSkip = useCallback(() => {
    triggerDismiss(520, true);
  }, [triggerDismiss]);

  // Preload supplied mascot asset cleanly when present
  useEffect(() => {
    if (mascotSrc) {
      const preloadMascot = new Image();
      preloadMascot.src = mascotSrc;
    }
  }, [mascotSrc]);

  // Lock background scroll while active & restore cleanly on unmount
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Orchestrate 3.55s cinematic timeline (or quick reduced-motion reveal) + hard failsafe
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const introDuration = prefersReducedMotion ? 900 : 3550;
    const fadeDuration = prefersReducedMotion ? 440 : 820;

    const finishTimer = window.setTimeout(() => {
      triggerDismiss(fadeDuration, prefersReducedMotion);
    }, introDuration);

    // Failsafe ceiling guarantees homepage can never remain hidden
    const failsafeTimer = window.setTimeout(() => {
      triggerDismiss(460, true);
    }, 5200);

    timersRef.current.push(finishTimer, failsafeTimer);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerDismiss(520, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearAllTimers();
    };
  }, [triggerDismiss, clearAllTimers]);

  const showSuppliedMascot = Boolean(mascotSrc && !mascotFailed);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="AEGIS Academy Introduction"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white select-none transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFastFade ? 'duration-500' : 'duration-700'
      } ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scene 1: Deep Futuristic Canvas + Subtle Tech Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,30,72,0.55)_0%,_rgba(4,14,38,0.88)_48%,_#020617_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid-pattern opacity-40"
      />

      {/* Scene 1: Radial Blue Awakening Light Behind Center */}
      <div
        aria-hidden="true"
        className="splash-radial-awaken pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] rounded-full bg-[radial-gradient(circle,_rgba(0,163,255,0.28)_0%,_rgba(0,119,254,0.14)_40%,_transparent_72%)] blur-2xl"
      />

      {/* Scene 1: Subtle Drifting Blue Digital Particles (fewer on mobile for performance) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {AMBIENT_PARTICLES.map(p => (
          <span
            key={p.id}
            className={`splash-particle absolute rounded-full bg-[#38BDF8] shadow-[0_0_12px_rgba(0,163,255,0.85)] ${p.pos} ${
              p.mobile ? 'block' : 'hidden sm:block'
            }`}
          />
        ))}
      </div>

      {/* Scene 5: Soft Blue Light Transition Swell */}
      <div
        aria-hidden="true"
        className="splash-transition-bloom pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[680px] sm:h-[680px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.22)_0%,_rgba(0,119,254,0.1)_48%,_transparent_72%)] blur-3xl"
      />

      {/* Main Centered Composition */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Scene 2 & 3: AEGIS BOT Arrival + Floating Levitation + Welcoming Gesture */}
        <div className="splash-bot-entrance relative flex items-center justify-center w-full">
          {/* Concentric subtle orbital tech rings framing the showcase */}
          <div
            aria-hidden="true"
            className="aegis-orbit-cw pointer-events-none absolute w-72 h-72 sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-[#00A3FF]/15 border-dashed"
          />
          <div
            aria-hidden="true"
            className="aegis-orbit-ccw pointer-events-none absolute w-84 h-84 sm:w-[500px] sm:h-[500px] md:w-[580px] md:h-[580px] rounded-full border border-[#0077FE]/10"
          />

          {/* Wide luminous blue backlighting aura behind the showcase */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[88vw] max-w-[390px] sm:max-w-[580px] md:max-w-[700px] lg:max-w-[780px] h-56 sm:h-72 md:h-88 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,163,255,0.34)_0%,_rgba(0,119,254,0.14)_54%,_transparent_76%)] blur-3xl"
          />

          {/* Scene 3: Blue energy sparks around AEGIS BOT */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-3 sm:-inset-5">
            {WELCOME_SPARKS.map(spark => (
              <span
                key={spark.id}
                className={`splash-energy-spark absolute rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.95)] ${spark.pos}`}
              />
            ))}
          </div>

          {/* Floating + subtle welcoming tilt wrapper */}
          <div className="splash-bot-float w-full flex justify-center">
            <div className="splash-bot-welcome relative flex items-center justify-center w-full">
              {showSuppliedMascot ? (
                <div className="relative w-[92vw] max-w-[380px] sm:max-w-[540px] md:max-w-[660px] lg:max-w-[740px] aspect-[4/3] sm:aspect-[16/9] max-h-[50dvh] rounded-3xl overflow-hidden border border-[#00A3FF]/35 bg-[#020617] shadow-[0_22px_70px_rgba(0,119,254,0.42),0_0_32px_rgba(0,163,255,0.22),inset_0_1px_0_rgba(255,255,255,0.16)]">
                  <img
                    src={mascotSrc!}
                    alt="AEGIS BOT — Official Mascot of AEGIS Academy"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setMascotFailed(true)}
                    className="relative z-10 w-full h-full object-cover object-right select-none"
                  />

                  {/* Scene 3: Subtle blue eye-zone luminescence aligned with AEGIS BOT's smiling eyes */}
                  <span
                    aria-hidden="true"
                    className="splash-eye-pulse pointer-events-none absolute top-[39%] left-[61%] sm:left-[71%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] z-20 w-24 h-10 sm:w-32 sm:h-12 md:w-36 md:h-14 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.48)_0%,_rgba(0,163,255,0.15)_58%,_transparent_82%)] blur-md mix-blend-screen"
                  />

                  {/* Subtle perimeter feathering so the widescreen stage melts cleanly into the dark splash */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-[#020617]/75 via-[#020617]/20 to-transparent"
                  />

                  {/* Right-edge electric blue highlight matching the portal edge AEGIS BOT grips */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 w-0.5 bg-gradient-to-b from-transparent via-[#38BDF8]/85 to-transparent shadow-[0_0_18px_rgba(0,163,255,0.95)]"
                  />
                </div>
              ) : (
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
                  <AegisBotFallbackVisual />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scene 4: Brand Reveal (AEGIS ACADEMY Text Animation + Tagline + Pillars) */}
        <div className="splash-brand-reveal mt-6 sm:mt-7 flex flex-col items-center">
          {/* Primary Wordmark with Subtle Blue Light Sweep */}
          <div className="relative overflow-hidden px-4 py-1">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.22em] text-white drop-shadow-[0_0_26px_rgba(0,119,254,0.5)]">
              AEGIS <span className="blue-gradient-text">ACADEMY</span>
            </h1>
            <span
              aria-hidden="true"
              className="splash-light-sweep pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-[#38BDF8]/55 to-transparent blur-[2px]"
            />
          </div>

          {/* Tagline */}
          <p className="mt-2 text-sm sm:text-base font-medium tracking-[0.14em] text-slate-300">
            Where Guidance Meets Growth
          </p>

          {/* Subtle Divider */}
          <div
            aria-hidden="true"
            className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#00A3FF]/70 to-transparent"
          />

          {/* LEARN. INNOVATE. TRANSFORM. */}
          <p className="splash-pillars-reveal mt-3.5 text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#7DD3FC] drop-shadow-[0_0_14px_rgba(0,163,255,0.45)]">
            LEARN. INNOVATE. TRANSFORM.
          </p>
        </div>
      </div>

      {/* Bottom-Right Glassmorphic Skip Intro Control */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip intro animation and go to homepage"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-sky-400/25 text-xs sm:text-sm font-medium tracking-wide text-slate-200 whitespace-nowrap transition-all duration-200 hover:bg-sky-500/15 hover:border-sky-400/65 hover:text-white hover:shadow-[0_0_24px_rgba(0,163,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] cursor-pointer"
      >
        <span>Skip Intro</span>
        <ChevronRight className="w-4 h-4 text-sky-300" aria-hidden="true" />
      </button>
    </div>
  );
};
