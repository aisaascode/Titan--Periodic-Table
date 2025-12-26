import React from 'react';
import { ELEMENTS } from '../data';
import ElementCell from './ElementCell';
import { ElementData, ElementCategory } from '../types';

interface PeriodicTableProps {
  onSelectElement: (element: ElementData) => void;
  selectedElementId: number | null;
  highlightedCategory: string | null;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onSelectElement, selectedElementId, highlightedCategory }) => {
  const selectedElement = selectedElementId ? ELEMENTS.find(e => e.number === selectedElementId) : null;
  
  // Helper to get category color for the central box border
  const getCategoryColor = (category: string) => {
    switch (category) {
      case ElementCategory.ALKALI_METAL: return '#ef4444';
      case ElementCategory.ALKALINE_EARTH_METAL: return '#f97316';
      case ElementCategory.TRANSITION_METAL: return '#eab308';
      case ElementCategory.POST_TRANSITION_METAL: return '#10b981';
      case ElementCategory.METALLOID: return '#2dd4bf';
      case ElementCategory.NONMETAL: return '#3b82f6';
      case ElementCategory.HALOGEN: return '#8b5cf6';
      case ElementCategory.NOBLE_GAS: return '#d946ef';
      case ElementCategory.LANTHANIDE: return '#ec4899';
      case ElementCategory.ACTINIDE: return '#f43f5e';
      default: return '#6b7280';
    }
  };

  const activeColor = selectedElement ? getCategoryColor(selectedElement.category) : '#333';

  const getGridStyle = (el: ElementData) => {
    if (el.number === 1) return { gridColumn: 1, gridRow: 1 };
    if (el.number === 2) return { gridColumn: 18, gridRow: 1 };
    
    if (el.number >= 3 && el.number <= 4) return { gridRow: 2, gridColumn: el.number - 2 };
    if (el.number >= 5 && el.number <= 10) return { gridRow: 2, gridColumn: el.number + 8 };

    if (el.number >= 11 && el.number <= 12) return { gridRow: 3, gridColumn: el.number - 10 };
    if (el.number >= 13 && el.number <= 18) return { gridRow: 3, gridColumn: el.number };

    if (el.number >= 19 && el.number <= 36) return { gridRow: 4, gridColumn: el.number - 18 };
    if (el.number >= 37 && el.number <= 54) return { gridRow: 5, gridColumn: el.number - 36 };
    
    if (el.number >= 55 && el.number <= 56) return { gridRow: 6, gridColumn: el.number - 54 };
    if (el.number >= 72 && el.number <= 86) return { gridRow: 6, gridColumn: el.number - 68 };

    if (el.number >= 87 && el.number <= 88) return { gridRow: 7, gridColumn: el.number - 86 };
    if (el.number >= 104 && el.number <= 118) return { gridRow: 7, gridColumn: el.number - 100 };

    return null;
  };

  const mainTableElements = ELEMENTS.filter(e => 
    !((e.number >= 57 && e.number <= 71) || (e.number >= 89 && e.number <= 103))
  );

  const lanthanides = ELEMENTS.filter(e => e.number >= 57 && e.number <= 71);
  const actinides = ELEMENTS.filter(e => e.number >= 89 && e.number <= 103);

  const isDimmed = (el: ElementData) => {
    if (!highlightedCategory) return false;
    return el.category !== highlightedCategory;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-1 sm:p-2 overflow-x-auto perspective-container custom-scrollbar">
        
      {/* Main Block */}
      {/* Responsive Grid: Smaller columns on mobile (minmax 2.2rem) to fit content better */}
      <div className="grid grid-cols-[repeat(18,minmax(2.2rem,1fr))] md:grid-cols-[repeat(18,minmax(3rem,1fr))] gap-1 md:gap-3 mb-8 min-w-max md:min-w-[900px]">
        
        {/* Central Legend / Detail Box */}
        <div 
          className="flex flex-col items-center justify-center p-2 md:p-6 z-0 pointer-events-none" 
          style={{ gridColumn: '3 / 13', gridRow: '1 / 4' }}
        >
          {selectedElement ? (
             <div 
                className="relative p-6 md:p-10 aspect-square flex flex-col items-center justify-center bg-[#121212] transition-all duration-500 rounded-2xl animate-in zoom-in-50"
                style={{ 
                    border: `1px solid ${activeColor}`,
                    boxShadow: `0 0 50px ${activeColor}20, inset 0 0 20px ${activeColor}10`
                }}
            >
                {/* Tech Corners for Main Box */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors duration-500" style={{ borderColor: activeColor }}></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors duration-500" style={{ borderColor: activeColor }}></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors duration-500" style={{ borderColor: activeColor }}></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors duration-500" style={{ borderColor: activeColor }}></div>

                {/* Background Grid Pattern */}
                <div 
                    className="absolute inset-2 border opacity-20"
                    style={{ 
                        borderColor: activeColor,
                        backgroundImage: `radial-gradient(${activeColor} 1px, transparent 1px)`,
                        backgroundSize: '10px 10px'
                    }}
                ></div>

                {/* Atomic Number */}
                <div className="absolute top-4 left-4 md:top-6 md:left-8 z-10">
                    <span className="text-2xl md:text-5xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{selectedElement.number}</span>
                    <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-4 items-center opacity-60">
                         <div className="h-[1px] w-8 bg-current mr-2" style={{ color: activeColor }}></div>
                         <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap uppercase tracking-widest">Atomic Number</span>
                    </div>
                </div>

                {/* Symbol */}
                <div className="relative z-10 animate-float">
                    <span 
                        className="text-7xl md:text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 drop-shadow-2xl"
                        style={{ filter: `drop-shadow(0 0 30px ${activeColor}50)` }}
                    >
                        {selectedElement.symbol}
                    </span>
                    <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-10 items-center opacity-60">
                         <div className="h-[1px] w-12 bg-current mr-2" style={{ color: activeColor }}></div>
                         <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap uppercase tracking-widest">Symbol</span>
                    </div>
                </div>

                {/* Name */}
                <div className="relative mt-2 md:mt-4 mb-1 text-center z-10">
                     <span 
                        className="text-xl md:text-4xl font-bold tracking-widest uppercase block" 
                        style={{ color: activeColor, textShadow: `0 0 10px ${activeColor}40` }}
                     >
                        {selectedElement.name}
                     </span>
                </div>

                {/* Atomic Weight */}
                <div className="relative text-center z-10">
                    <span className="text-sm md:text-xl font-mono text-gray-400">{selectedElement.atomic_mass}</span>
                </div>
                
                {/* Valency display for center box */}
                <div 
                    className="mt-4 px-4 py-1 rounded-full border bg-black/50 backdrop-blur text-[10px] md:text-xs font-mono tracking-widest uppercase z-10"
                    style={{ borderColor: `${activeColor}40`, color: activeColor }}
                >
                    Valency: {selectedElement.valency}
                </div>

             </div>
          ) : (
             // Placeholder
             <div className="opacity-20 flex flex-col items-center justify-center border-2 md:border-4 border-dashed border-gray-800 p-4 md:p-12 rounded-xl md:rounded-3xl animate-pulse">
                <span className="text-4xl md:text-6xl font-black text-gray-700 mb-2 md:mb-4">TITAN</span>
                <span className="text-[10px] md:text-sm text-gray-600 uppercase tracking-widest text-center">Select an Element to Analyze</span>
             </div>
          )}
        </div>

        {mainTableElements.map(el => {
            const style = getGridStyle(el);
            if (!style) return null;
            return (
                <div key={el.number} style={style} className="aspect-[4/5] relative">
                    <ElementCell 
                        element={el} 
                        onClick={onSelectElement} 
                        isSelected={selectedElementId === el.number}
                        isDimmed={isDimmed(el)}
                    />
                </div>
            )
        })}
        
        {/* F-Block placeholders */}
        <div style={{ gridColumn: 3, gridRow: 6 }} className="flex flex-col items-center justify-center text-gray-600 text-[8px] md:text-[10px] font-mono border border-dashed border-gray-800 rounded bg-white/5 opacity-50">
            <span>57-71</span>
        </div>
        <div style={{ gridColumn: 3, gridRow: 7 }} className="flex flex-col items-center justify-center text-gray-600 text-[8px] md:text-[10px] font-mono border border-dashed border-gray-800 rounded bg-white/5 opacity-50">
            <span>89-103</span>
        </div>
      </div>

      {/* F-Block */}
      <div className="flex flex-col gap-2 md:gap-3 mt-4 md:mt-8 min-w-max md:min-w-[900px]">
        <div className="grid grid-cols-[repeat(18,minmax(2.2rem,1fr))] md:grid-cols-[repeat(18,minmax(3rem,1fr))] gap-1 md:gap-3">
            <div className="col-span-2 text-right pr-2 md:pr-4 pt-2 md:pt-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest self-center">Lanthanides</div>
            <div className="col-span-1"></div> {/* Spacer */}
            {lanthanides.map(el => (
                <div key={el.number} className="col-span-1 aspect-[4/5]">
                   <ElementCell 
                        element={el} 
                        onClick={onSelectElement} 
                        isSelected={selectedElementId === el.number}
                        isDimmed={isDimmed(el)}
                    />
                </div>
            ))}
        </div>
         <div className="grid grid-cols-[repeat(18,minmax(2.2rem,1fr))] md:grid-cols-[repeat(18,minmax(3rem,1fr))] gap-1 md:gap-3">
            <div className="col-span-2 text-right pr-2 md:pr-4 pt-2 md:pt-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest self-center">Actinides</div>
            <div className="col-span-1"></div> {/* Spacer */}
            {actinides.map(el => (
                <div key={el.number} className="col-span-1 aspect-[4/5]">
                   <ElementCell 
                        element={el} 
                        onClick={onSelectElement} 
                        isSelected={selectedElementId === el.number}
                        isDimmed={isDimmed(el)}
                    />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;