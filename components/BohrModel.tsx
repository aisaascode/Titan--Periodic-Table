import React from 'react';

interface BohrModelProps {
  symbol: string;
  shells: number[];
  atomicNumber: number;
}

const BohrModel: React.FC<BohrModelProps> = ({ symbol, shells, atomicNumber }) => {
  // Base radius for the first shell
  const baseRadius = 40;
  // Gap between shells
  const shellGap = 25;
  
  // Calculate center of SVG
  const size = 600; // Increased canvas size
  const center = size / 2;

  // Colors
  const shellColor = "rgba(255, 255, 255, 0.15)";
  const electronColor = "#4fd1c5"; // Teal-400
  const nucleusColor = "#fbbf24"; // Amber-400

  return (
    <div className="flex items-center justify-center w-full h-full p-4 relative overflow-hidden">
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-full max-w-[500px] max-h-[500px]"
        style={{ filter: 'drop-shadow(0 0 10px rgba(79, 209, 197, 0.3))' }}
      >
        {/* Nucleus */}
        <circle cx={center} cy={center} r={18} fill={nucleusColor} className="shadow-lg">
           <animate attributeName="r" values="18;20;18" dur="4s" repeatCount="indefinite" />
        </circle>
        <text 
          x={center} 
          y={center} 
          dy=".3em" 
          textAnchor="middle" 
          fill="#000" 
          fontSize="14" 
          fontWeight="bold"
          className="pointer-events-none"
        >
          {symbol}
        </text>

        {/* Shells */}
        {shells.map((electronCount, shellIndex) => {
          const radius = baseRadius + (shellIndex * shellGap);
          // Duration gets longer for outer shells to simulate slower angular velocity
          const duration = 3 + shellIndex * 1.5; 
          
          return (
            <g key={shellIndex}>
              {/* Orbit Path */}
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke={shellColor} 
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-50"
              />

              {/* Electrons Group - Rotating */}
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from={`0 ${center} ${center}`}
                  to={`360 ${center} ${center}`}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
                
                {/* Individual Electrons distributed on the ring */}
                {Array.from({ length: electronCount }).map((_, i) => {
                  const angle = (i * 360) / electronCount;
                  const radian = (angle * Math.PI) / 180;
                  const cx = center + radius * Math.cos(radian);
                  const cy = center + radius * Math.sin(radian);

                  return (
                    <circle 
                      key={i} 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill={electronColor}
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            </g>
          );
        })}
      </svg>
      
      {/* Decorative background glow for the atom */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none rounded-full blur-3xl"></div>
    </div>
  );
};

export default BohrModel;