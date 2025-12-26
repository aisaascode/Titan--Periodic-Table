import React from 'react';

interface AiLogoProps {
  className?: string;
}

const AiLogo: React.FC<AiLogoProps> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-pink-500/40 rounded-full blur-md animate-pulse"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" /> {/* Pink-500 */}
            <stop offset="50%" stopColor="#d946ef" /> {/* Fuchsia-500 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* Purple-500 */}
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Tech Ring - Slow Spin */}
        <g className="origin-center animate-spin-slow">
           <circle cx="50" cy="50" r="45" fill="none" stroke="url(#aiGradient)" strokeWidth="1.5" strokeDasharray="10 20 5 20" opacity="0.7" />
           <circle cx="50" cy="5" r="2" fill="#fff" />
           <circle cx="50" cy="95" r="2" fill="#fff" />
        </g>

        {/* Inner Scanning Arc - Faster Reverse Spin */}
        <g className="origin-center animate-spin-reverse">
           <path d="M50 15 A35 35 0 0 1 85 50" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
           <path d="M50 85 A35 35 0 0 1 15 50" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Central Core - Pulsing */}
        <circle cx="50" cy="50" r="12" fill="url(#aiGradient)" className="animate-pulse-core" filter="url(#glow)" stroke="#fff" strokeWidth="1" />
        
        {/* Eye/Iris Detail */}
        <circle cx="50" cy="50" r="4" fill="#fff" className="animate-pulse" />
      </svg>
    </div>
  );
};

export default AiLogo;