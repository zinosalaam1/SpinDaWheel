import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ParticipantEntryProps {
  onAddParticipant: (name: string) => void;
}

export function ParticipantEntry({ onAddParticipant }: ParticipantEntryProps) {
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (trimmedName.toLowerCase() === 'in' || trimmedName) {
      onAddParticipant(trimmedName === 'in' || trimmedName === 'IN' ? `Player ${Date.now()}` : trimmedName);
      setName('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-xl opacity-40" />
        
        <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <h3 className="text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Enter the Game
            </h3>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Type your name or "IN" to enter'
                className="relative w-full bg-white/5 border-2 border-white/20 focus:border-purple-500 rounded-xl px-6 py-4 text-white text-lg placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all backdrop-blur-sm"
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <button
                type="submit"
                disabled={!name.trim()}
                className="relative w-full bg-gradient-to-r from-purple-500 via-pink-600 to-blue-600 hover:from-purple-600 hover:via-pink-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-2xl border border-purple-400/50 disabled:border-gray-600/50"
              >
                <span className="text-xl flex items-center justify-center gap-2">
                  <span>🎯</span>
                  <span>Join the Wheel</span>
                  <span>🎯</span>
                </span>
              </button>
            </div>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 animate-pulse" />
                <div className="relative bg-green-500/20 border-2 border-green-400 rounded-xl px-6 py-4 text-center">
                  <p className="text-green-300 text-xl flex items-center justify-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span>You're in the game!</span>
                    <span className="text-2xl">🎉</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}