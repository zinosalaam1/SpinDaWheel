import { Users } from 'lucide-react';
import { motion } from 'motion/react';

interface ParticipantsListProps {
  participants: string[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="relative h-[600px] flex flex-col">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
      
      <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/50 h-full flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-500/30">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50" />
            <Users className="relative w-7 h-7 text-cyan-400" />
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Participants
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
          {participants.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                <Users className="w-10 h-10 text-blue-400 opacity-50" />
              </div>
              <p className="text-blue-300 text-center">No participants yet...</p>
            </div>
          ) : (
            participants.map((participant, index) => (
              <motion.div
                key={participant}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 rounded-xl px-4 py-4 border border-white/10 hover:border-cyan-500/50 transition-all hover:bg-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur opacity-50" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg border border-cyan-400/30">
                        <span className="text-white">{index + 1}</span>
                      </div>
                    </div>
                    <span className="text-white text-lg">{participant}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-blue-500/30">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl px-4 py-3 border border-blue-500/30">
            <p className="text-center text-cyan-300">
              <span className="text-2xl text-white mr-2">{participants.length}</span>
              in the pool
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}