import React, { useEffect, useState } from 'react';
import { ElementData, CompoundInfo } from '../types';
import { fetchElementCompounds } from '../services/geminiService';
import { X, Orbit, FlaskConical, Loader2 } from 'lucide-react';
import BohrModel from './BohrModel';

interface DetailPanelProps {
  element: ElementData | null;
  onClose: () => void;
}

const ShellDisplay: React.FC<{ shells: number[] }> = ({ shells }) => {
  const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  return (
    <div className="flex gap-2 flex-wrap justify-center mt-2">
      {shells.map((count, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white/5 px-3 py-1.5 rounded border border-white/10">
          <span className="text-[10px] text-gray-400 font-mono">{shellNames[idx]}</span>
          <span className="text-sm font-bold text-white">{count}</span>
        </div>
      ))}
    </div>
  );
};

const DetailPanel: React.FC<DetailPanelProps> = ({ element, onClose }) => {
  const [compounds, setCompounds] = useState<CompoundInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (element) {
      setLoading(true);
      setCompounds([]);
      fetchElementCompounds(element).then(data => {
        setCompounds(data);
        setLoading(false);
      });
    }
  }, [element]);

  if (!element) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#121212] rounded-2xl border border-white/20 shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white bg-black/50 hover:bg-red-500/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Column: Visuals */}
        <div className="w-full md:w-5/12 p-6 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center border-b md:border-b-0 md:border-r border-white/10 relative">
          
          <div className="text-center mb-6 z-10">
            <h2 className="text-5xl font-bold text-white mb-2">{element.symbol}</h2>
            <h3 className="text-2xl text-gray-300 font-medium">{element.name}</h3>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-cyan-300 border border-white/10">
              {element.category}
            </span>
          </div>

          <div className="w-full aspect-square max-w-[300px] relative z-10 mb-4">
             <BohrModel 
                symbol={element.symbol} 
                shells={element.shells} 
                atomicNumber={element.number} 
             />
          </div>

          <div className="w-full grid grid-cols-2 gap-2 z-10">
             <div className="bg-white/5 p-3 rounded text-center border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">Atomic Mass</div>
                <div className="text-lg font-mono text-green-400">{element.atomic_mass}</div>
             </div>
             <div className="bg-white/5 p-3 rounded text-center border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">Number</div>
                <div className="text-lg font-mono text-blue-400">{element.number}</div>
             </div>
          </div>
        </div>

        {/* Right Column: Data */}
        <div className="w-full md:w-7/12 p-6 bg-[#1a1a1a] flex flex-col gap-6">
          
          {/* Electron Config */}
          <div>
             <div className="flex items-center gap-2 mb-3 text-white/80">
                <Orbit size={18} className="text-purple-400" />
                <h4 className="font-bold text-sm uppercase tracking-wide">Electron Shells</h4>
             </div>
             <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                <div className="font-mono text-yellow-500 text-center text-lg mb-3 tracking-wide">{element.electron_configuration}</div>
                <ShellDisplay shells={element.shells} />
             </div>
          </div>

          {/* Properties */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Group</div>
                <div className="text-white font-medium">{element.group}</div>
             </div>
             <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Period</div>
                <div className="text-white font-medium">{element.period}</div>
             </div>
             <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Valency</div>
                <div className="text-white font-medium">{element.valency}</div>
             </div>
             <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Phase</div>
                <div className="text-white font-medium">
                    {element.number === 80 || element.number === 35 ? 'Liquid' : 
                     [1,2,7,8,9,10,17,18,36,54,86,118].includes(element.number) ? 'Gas' : 'Solid'}
                </div>
             </div>
          </div>

          {/* Compounds Analysis (Renamed) */}
          <div className="flex-1 flex flex-col">
             <div className="flex items-center gap-2 mb-3 text-white/80">
                <FlaskConical size={18} className="text-green-400" />
                <h4 className="font-bold text-sm uppercase tracking-wide">Common Compounds</h4>
             </div>
             
             <div className="flex-1 bg-black/20 rounded-xl border border-white/5 overflow-hidden flex flex-col">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
                        <Loader2 className="animate-spin mb-2" />
                        <span className="text-xs">Analyzing chemical structure...</span>
                    </div>
                ) : compounds.length > 0 ? (
                    <div className="overflow-y-auto max-h-[200px] p-2 space-y-2 custom-scrollbar">
                        {compounds.map((c, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded hover:bg-white/10 transition-colors border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-green-400 font-mono font-bold text-sm">{c.formula}</span>
                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{c.ratio}</span>
                                </div>
                                <div className="text-xs text-gray-300 font-medium">{c.name}</div>
                                <div className="text-[10px] text-gray-500 mt-1">{c.description}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-4 text-xs text-gray-600 italic">
                        No compound data available.
                    </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailPanel;