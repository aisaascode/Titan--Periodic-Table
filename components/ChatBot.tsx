import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import AiLogo from './AiLogo';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Greetings. I am Titan AI. Ask me anything about the elements or chemistry.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(input);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: "Systems offline. Please try again." };
       setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh] relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-pink-500/10 blur-[50px] pointer-events-none"></div>

            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-[#121212]/90 backdrop-blur flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                        <AiLogo className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white leading-none tracking-wide">Titan AI</h3>
                        <p className="text-[10px] text-pink-400/70 font-mono uppercase tracking-wider mt-0.5">Advanced Assistant</p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20 z-10 scroll-smooth">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg overflow-hidden">
                                <AiLogo className="w-5 h-5" />
                            </div>
                        )}
                        <div className={`
                            max-w-[80%] p-3.5 text-sm leading-relaxed shadow-lg backdrop-blur-sm
                            ${msg.role === 'user' 
                                ? 'bg-gradient-to-br from-pink-600 to-purple-700 text-white rounded-2xl rounded-tr-sm border border-white/10 shadow-[0_4px_15px_rgba(236,72,153,0.2)]' 
                                : 'bg-white/5 text-gray-200 rounded-2xl rounded-tl-sm border border-white/10'
                            }
                        `}>
                            {msg.text}
                        </div>
                        {msg.role === 'user' && (
                             <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <User size={14} className="text-gray-300" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 justify-start animate-pulse">
                         <div className="w-8 h-8 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Sparkles size={14} className="text-pink-400" />
                         </div>
                         <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                             <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                             <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                             <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#121212] border-t border-white/10 z-10">
                <div className="relative flex items-center shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-full group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about an element..."
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all relative z-10"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/25 z-20"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatBot;