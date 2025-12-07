import { Trophy, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface WinnersListProps {
  winners: string[];
}

export function WinnersList({ winners }: WinnersListProps) {
  const boxEmojis = ['🎁', '📦', '🎀', '✨', '🏆'];

  return (
    <div className="relative h-[600px] flex flex-col">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl blur-xl animate-pulse" />
      
      <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-400 h-full flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-yellow-500/30">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-50 animate-pulse" />
            <Trophy className="relative w-7 h-7 text-yellow-400" />
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Champions
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-yellow-500/50 scrollbar-track-transparent">
          {winners.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4 border border-yellow-500/30 animate-pulse">
                <Crown className="w-10 h-10 text-yellow-400 opacity-50" />
              </div>
              <p className="text-yellow-300 text-center">Waiting for champions...</p>
            </div>
          ) : (
            winners.map((winner, index) => (
              <motion.div
                key={winner}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
                className="relative group"
              >
                {/* Animated glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-pink-500/20 rounded-xl px-5 py-5 border-2 border-yellow-400 shadow-lg hover:shadow-2xl transition-all">
                  {/* Rank badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-500 blur-md opacity-75 rounded-full" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center border-2 border-yellow-400 shadow-lg">
                        <span className="text-white text-sm">#{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-5xl animate-bounce" style={{ animationDuration: '2s', animationDelay: `${index * 0.2}s` }}>
                      {boxEmojis[index]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-yellow-400 uppercase tracking-wider">Mystery Box</span>
                      </div>
                      <p className="text-2xl text-white">{winner}</p>
                    </div>
                    <div className="text-3xl animate-pulse">🎉</div>
                  </div>

                  {/* Confetti particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, y: 0, x: 0 }}
                      animate={{
                        opacity: 0,
                        y: [0, -50, -100],
                        x: [0, (Math.random() - 0.5) * 100],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                      style={{ left: `${20 + i * 20}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {winners.length === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="mt-6 pt-4 border-t border-yellow-400"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-xl px-4 py-3 border border-yellow-400">
                <p className="text-center text-yellow-400 text-xl">
                  🎊 All Champions Selected! 🎊
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}