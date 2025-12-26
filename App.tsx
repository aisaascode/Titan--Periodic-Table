import React, { useState } from 'react';
import PeriodicTable from './components/PeriodicTable';
import DetailPanel from './components/DetailPanel';
import ChatBot from './components/ChatBot';
import AppLogo from './components/AppLogo';
import AiLogo from './components/AiLogo';
import { ElementData, ElementCategory } from './types';
import { Search, Info, Flame, Mountain, Hammer, Cpu, Component, Cloud, FlaskConical, Sparkles, Gem, TriangleAlert } from 'lucide-react';
import { ELEMENTS } from './data';

// Defined color map for accurate glowing effects matched to ElementCell
const categoryColors: Record<string, string> = {
  [ElementCategory.ALKALI_METAL]: '#ef4444',
  [ElementCategory.ALKALINE_EARTH_METAL]: '#f97316',
  [ElementCategory.TRANSITION_METAL]: '#eab308',
  [ElementCategory.POST_TRANSITION_METAL]: '#10b981',
  [ElementCategory.METALLOID]: '#14b8a6',
  [ElementCategory.NONMETAL]: '#3b82f6',
  [ElementCategory.HALOGEN]: '#6366f1',
  [ElementCategory.NOBLE_GAS]: '#a855f7',
  [ElementCategory.LANTHANIDE]: '#ec4899',
  [ElementCategory.ACTINIDE]: '#f43f5e',
};

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectElement = (element: ElementData) => {
    setSelectedElement(element);
  };

  const toggleCategory = (category: string) => {
    if (highlightedCategory === category) {
      setHighlightedCategory(null);
    } else {
      setHighlightedCategory(category);
    }
  };

  const filteredElements = searchTerm 
    ? ELEMENTS.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.number.toString().includes(searchTerm)
      )
    : [];

  const categories = [
    { name: ElementCategory.ALKALI_METAL, icon: Flame },
    { name: ElementCategory.ALKALINE_EARTH_METAL, icon: Mountain },
    { name: ElementCategory.TRANSITION_METAL, icon: Hammer },
    { name: ElementCategory.POST_TRANSITION_METAL, icon: Cpu },
    { name: ElementCategory.METALLOID, icon: Component },
    { name: ElementCategory.NONMETAL, icon: Cloud },
    { name: ElementCategory.HALOGEN, icon: FlaskConical },
    { name: ElementCategory.NOBLE_GAS, icon: Sparkles },
    { name: ElementCategory.LANTHANIDE, icon: Gem },
    { name: ElementCategory.ACTINIDE, icon: TriangleAlert },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans selection:bg-pink-500/30">
      
      {/* Ambient Background Lights */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[150px] animate-pulse delay-700"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl backdrop-blur-xl">
        <AppLogo />

        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-300 transition-colors z-10" size={18} />
          
          <input 
            type="text" 
            placeholder="Search element..." 
            className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-full py-3 pl-12 pr-14 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-sm shadow-inner placeholder:text-gray-600 z-10 text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Chatbot Toggle Button - Inside Search Bar */}
          <button 
            onClick={() => setIsChatOpen(true)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white bg-white/5 hover:bg-pink-500/20 rounded-full transition-all z-20 group-hover:scale-105 border border-transparent hover:border-pink-400/50 shadow-lg flex items-center justify-center overflow-hidden"
            title="Ask AI Assistant"
          >
            <AiLogo className="w-6 h-6" />
          </button>

          {/* Search Results Dropdown */}
          {searchTerm && (
            <div className="absolute top-full mt-2 left-0 w-full bg-[#121212] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-60 overflow-y-auto z-50 custom-scrollbar">
              {filteredElements.length > 0 ? (
                filteredElements.map(e => (
                  <button 
                    key={e.number}
                    onClick={() => {
                        handleSelectElement(e);
                        setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded bg-pink-900/20 font-mono text-pink-300 font-bold border border-pink-500/20">{e.symbol}</span>
                    <span className="flex-1 font-medium text-gray-200">{e.name}</span>
                    <span className="text-xs text-gray-500 bg-black px-2 py-0.5 rounded-full border border-white/5">#{e.number}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">No elements found</div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 relative z-10 flex flex-col items-center">
        
        <PeriodicTable 
            onSelectElement={handleSelectElement} 
            selectedElementId={selectedElement?.number || null}
            highlightedCategory={highlightedCategory}
        />
        
        {/* Interactive Legend / Endnote */}
        <div className="w-full max-w-7xl mt-8 mb-8 bg-white/5 rounded-3xl p-6 border border-white/5 backdrop-blur-sm relative overflow-hidden">
           
           <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                    <Info size={20} className="text-pink-400" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Element Categories</h3>
                    <p className="text-xs text-gray-400">Filter elements by clicking below</p>
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
             {categories.map(cat => {
               const color = categoryColors[cat.name] || '#ffffff';
               return (
                 <button 
                    key={cat.name} 
                    onClick={() => toggleCategory(cat.name)}
                    style={{ '--cat-color': color } as React.CSSProperties}
                    className={`
                      relative group p-3 rounded-xl border transition-all duration-300 overflow-hidden
                      flex items-center gap-3
                      ${highlightedCategory === cat.name 
                          ? 'bg-white/10 border-[var(--cat-color)] shadow-[0_0_20px_var(--cat-color),inset_0_0_10px_rgba(255,255,255,0.1)] scale-105' 
                          : 'bg-black/40 border-white/5 hover:border-[var(--cat-color)] hover:bg-[var(--cat-color)]/10 hover:shadow-[0_0_15px_var(--cat-color)]'
                      }
                      ${highlightedCategory && highlightedCategory !== cat.name ? 'opacity-30 grayscale-[80%]' : ''}
                    `}
                 >
                     {/* Icon container */}
                     <div className={`
                        p-2 rounded-lg transition-all duration-300 flex items-center justify-center
                        ${highlightedCategory === cat.name 
                            ? 'bg-[var(--cat-color)] text-black shadow-[0_0_10px_var(--cat-color)]' 
                            : 'bg-white/5 text-[var(--cat-color)] border border-white/10 group-hover:border-[var(--cat-color)] group-hover:text-white group-hover:bg-[var(--cat-color)]'
                        }
                     `}>
                        <cat.icon size={16} className={`${highlightedCategory === cat.name ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                     </div>
                     
                     <span className={`
                        text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors text-left leading-tight
                        ${highlightedCategory === cat.name ? 'text-white' : 'text-gray-400 group-hover:text-gray-100'}
                     `}>
                      {cat.name}
                     </span>

                     {/* Highlight Glow Effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cat-color)]/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none"></div>
                 </button>
               );
             })}
           </div>
        </div>
      </main>

      {/* Detail Panel */}
      <DetailPanel 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
      />

      {/* Chat Bot Modal */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
    </div>
  );
};

export default App;