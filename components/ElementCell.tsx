import React from 'react';
import { ElementData, ElementCategory } from '../types';

interface ElementCellProps {
  element: ElementData;
  onClick: (element: ElementData) => void;
  isSelected: boolean;
  isDimmed?: boolean;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case ElementCategory.ALKALI_METAL: return '#ef4444'; // Red-500
    case ElementCategory.ALKALINE_EARTH_METAL: return '#f97316'; // Orange-500
    case ElementCategory.TRANSITION_METAL: return '#eab308'; // Yellow-500
    case ElementCategory.POST_TRANSITION_METAL: return '#10b981'; // Emerald-500
    case ElementCategory.METALLOID: return '#2dd4bf'; // Teal-400
    case ElementCategory.NONMETAL: return '#3b82f6'; // Blue-500
    case ElementCategory.HALOGEN: return '#8b5cf6'; // Violet-500
    case ElementCategory.NOBLE_GAS: return '#d946ef'; // Fuchsia-500
    case ElementCategory.LANTHANIDE: return '#ec4899'; // Pink-500
    case ElementCategory.ACTINIDE: return '#f43f5e'; // Rose-500
    default: return '#9ca3af'; // Gray-400
  }
};

const ElementCell: React.FC<ElementCellProps> = ({ element, onClick, isSelected, isDimmed }) => {
  const color = getCategoryColor(element.category);
  
  // Advanced dynamic styles using CSS variables for performance
  const style = {
    '--element-color': color,
  } as React.CSSProperties;

  return (
    <button
      onClick={() => onClick(element)}
      disabled={isDimmed}
      style={style}
      className={`
        group relative w-full h-full p-0.5 sm:p-1 rounded sm:rounded-lg
        flex flex-col justify-between items-center
        transition-all duration-300 ease-out
        border backdrop-blur-md
        overflow-hidden select-none
        ${isSelected 
          ? 'bg-[#1a1a1a] scale-110 z-50 shadow-[0_0_40px_var(--element-color)] ring-1 ring-[var(--element-color)] border-[var(--element-color)]' 
          : isDimmed 
            ? 'opacity-10 grayscale scale-95 border-transparent bg-transparent blur-[1px]' 
            : 'bg-[#121212]/40 hover:bg-[#1a1a1a] hover:scale-105 hover:z-40 hover:shadow-[0_0_20px_var(--element-color)] hover:border-[var(--element-color)]/60 border-white/5 opacity-80 hover:opacity-100'
        }
      `}
    >
      {/* 1. Animated Gradient Background (Subtle Pulse) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 80%)`
        }}
      />

      {/* 2. Holographic Scanline Effect on Hover */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-shimmer pointer-events-none z-10 blur-[1px]"></div>

      {/* 3. Selected State Pulse Overlay */}
      {isSelected && (
          <div className="absolute inset-0 bg-[var(--element-color)]/10 animate-pulse pointer-events-none z-0"></div>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
          
          {/* Top Row: Number */}
          <div className="flex justify-between items-start w-full px-0.5 pt-0.5">
             <span 
                className={`text-[8px] sm:text-[10px] font-mono font-bold leading-none transition-colors ${isSelected ? 'text-[var(--element-color)] shadow-[0_0_10px_var(--element-color)]' : 'text-gray-500 group-hover:text-[var(--element-color)]'}`}
             >
               {element.number}
             </span>
             
             {/* Tech Dot Indicator */}
             <div className={`w-1 h-1 rounded-full bg-[var(--element-color)] shadow-[0_0_5px_var(--element-color)] transition-all duration-300 ${isSelected ? 'opacity-100 scale-150' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </div>

          {/* Symbol */}
          <div className="flex-1 flex items-center justify-center">
            <span 
              className={`
                 text-sm sm:text-2xl md:text-3xl font-black leading-none tracking-tighter
                 transition-all duration-300 transform
                 ${isSelected 
                    ? 'text-white drop-shadow-[0_0_10px_var(--element-color)] scale-110 translate-y-[-2px]' 
                    : 'text-gray-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_var(--element-color)] group-hover:scale-110'
                 }
              `}
            >
              {element.symbol}
            </span>
          </div>
          
          {/* Bottom: Name Truncated */}
          <div className="text-center w-full pb-0.5">
             <span className="text-[6px] sm:text-[7px] font-mono text-gray-600 group-hover:text-white transition-colors uppercase tracking-tight block overflow-hidden text-ellipsis whitespace-nowrap px-1">
               {element.name}
             </span>
          </div>
      </div>
      
      {/* Corner Tech Accents (Cyberpunk Style) */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--element-color)] transition-all duration-300 ${isSelected ? 'opacity-100 w-3 h-3' : 'opacity-0 group-hover:opacity-60'}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--element-color)] transition-all duration-300 ${isSelected ? 'opacity-100 w-3 h-3' : 'opacity-0 group-hover:opacity-60'}`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--element-color)] transition-all duration-300 ${isSelected ? 'opacity-100 w-3 h-3' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--element-color)] transition-all duration-300 ${isSelected ? 'opacity-100 w-3 h-3' : 'opacity-0'}`}></div>

    </button>
  );
};

export default ElementCell;