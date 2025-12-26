import React from 'react';

const AppLogo = () => {
  return (
    <div className="flex items-center gap-5 select-none group">
      {/* Icon Container */}
      <div className="relative w-16 h-16 flex-shrink-0">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-all duration-700 animate-pulse"></div>
        
        {/* SVG Structure */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] overflow-visible">
          <defs>
             <linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
               <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
               <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
             </linearGradient>
             <filter id="glowCore">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
             </filter>
          </defs>

          {/* Outer Tech Ring - Rotating slowly */}
          <g className="origin-center animate-spin-slow">
             <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradRing)" strokeWidth="1" strokeDasharray="20 40 10 40" opacity="0.6" />
             <circle cx="50" cy="4" r="1.5" fill="#22d3ee" />
             <circle cx="50" cy="96" r="1.5" fill="#a855f7" />
          </g>

          {/* Inner Hexagon - Rotating Reverse */}
          <g className="origin-center animate-spin-reverse">
             <path d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z" fill="none" stroke="#e879f9" strokeWidth="1.5" strokeOpacity="0.5" />
             <circle cx="50" cy="20" r="1" fill="#fff" opacity="0.8" />
             <circle cx="50" cy="80" r="1" fill="#fff" opacity="0.8" />
          </g>

          {/* 3D Orbitals Effect - Simulated via elliptical rotation */}
          <g className="origin-center animate-orbit-1">
             <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
             <circle cx="90" cy="50" r="2" fill="#fff" />
          </g>
          
          <g className="origin-center animate-orbit-2">
             <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />
             <circle cx="10" cy="50" r="2" fill="#fff" />
          </g>

          {/* Nucleus */}
          <circle cx="50" cy="50" r="6" fill="#fff" filter="url(#glowCore)" className="animate-pulse-core" stroke="#22d3ee" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center relative">
        <h1 className="text-5xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ fontFamily: 'system-ui, sans-serif' }}>
            TITAN
        </h1>
        <div className="flex items-center gap-2 mt-0.5 pl-1">
             <div className="h-[2px] w-5 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></div>
             <p className="text-[10px] font-mono text-cyan-300 tracking-[0.35em] uppercase leading-none opacity-90 text-shadow-sm">
                Advanced Matter OS
             </p>
        </div>
        
        {/* Subtle decorative line */}
        <div className="absolute -bottom-2 right-0 w-2/3 h-[1px] bg-gradient-to-l from-purple-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default AppLogo;