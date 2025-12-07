import { useState } from 'react';
import { SpinWheel } from './components/SpinWheel';
import { ParticipantsList } from './components/ParticipantsList';
import { WinnersList } from './components/WinnersList';
import { ParticipantEntry } from './components/ParticipantEntry';
import { Gift, Users, Trophy, Sparkles } from 'lucide-react';

export default function App() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWinner, setCurrentWinner] = useState<string | null>(null);

  const handleAddParticipant = (name: string) => {
    if (!participants.includes(name) && !winners.includes(name)) {
      setParticipants([...participants, name]);
    }
  };

  const handleSpin = () => {
    if (participants.length === 0 || isSpinning || winners.length >= 5) return;
    setIsSpinning(true);
    setCurrentWinner(null);
  };

  const handleWinnerSelected = (winner: string) => {
    setCurrentWinner(winner);
    setTimeout(() => {
      setWinners([...winners, winner]);
      setParticipants(participants.filter(p => p !== winner));
      setIsSpinning(false);
      setCurrentWinner(null);
    }, 2000);
  };

  const handleReset = () => {
    setParticipants([]);
    setWinners([]);
    setGameStarted(false);
    setCurrentWinner(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-pink-900/50" />
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Particle Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
            <div className="relative flex items-center justify-center gap-4 px-8 py-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/20">
              <Gift className="w-12 h-12 text-yellow-400 animate-bounce" style={{ animationDuration: '2s' }} />
              <h1 className="text-6xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                MYSTERY BOX GAME
              </h1>
              <Gift className="w-12 h-12 text-pink-400 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <p className="text-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              THE RANDOM WHEEL SELECTION
            </p>
            <Sparkles className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <p className="text-xl text-purple-300">250+ members · 5 Mystery Boxes · 100% Fair</p>
        </div>

        {/* Game Status */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl px-8 py-4 border border-blue-500/50">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-xs text-cyan-300 uppercase tracking-wider">Participants</p>
                  <p className="text-3xl text-white">{participants.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl px-8 py-4 border border-yellow-500/50">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-xs text-yellow-300 uppercase tracking-wider">Winners</p>
                  <p className="text-3xl text-white">{winners.length}/5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-xl rounded-xl px-8 py-4 border border-purple-500/50">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-xs text-purple-300 uppercase tracking-wider">Boxes Left</p>
                  <p className="text-3xl text-white">{5 - winners.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Winner Announcement */}
        {currentWinner && (
          <div className="mb-8 text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-2xl opacity-75 animate-pulse" />
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl px-12 py-6 border-4 border-yellow-400">
                <p className="text-sm text-yellow-400 uppercase tracking-wider mb-2">🎉 Winner Selected! 🎉</p>
                <p className="text-5xl text-white">{currentWinner}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Participants */}
          <div className="lg:col-span-1">
            <ParticipantsList participants={participants} />
          </div>

          {/* Center: Wheel */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <SpinWheel
              participants={participants}
              isSpinning={isSpinning}
              onWinnerSelected={handleWinnerSelected}
            />
            
            <div className="mt-8 flex flex-col gap-4 w-full max-w-sm">
              {!gameStarted ? (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => setGameStarted(true)}
                    className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 px-8 rounded-xl transition-all transform hover:scale-105 shadow-2xl border border-green-400/50"
                  >
                    <span className="text-2xl">🎮 START GAME</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || participants.length === 0 || winners.length >= 5}
                      className="relative w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-2xl border border-yellow-400/50 disabled:border-gray-600/50"
                    >
                      <span className="text-2xl">
                        {isSpinning ? '🎡 SPINNING...' : winners.length >= 5 ? '✅ ALL WINNERS SELECTED' : '🎯 SPIN THE WHEEL'}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-6 rounded-xl transition-all border border-white/20 backdrop-blur-sm"
                  >
                    🔄 Reset Game
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right: Winners */}
          <div className="lg:col-span-1">
            <WinnersList winners={winners} />
          </div>
        </div>

        {/* Participant Entry */}
        {gameStarted && winners.length < 5 && (
          <ParticipantEntry onAddParticipant={handleAddParticipant} />
        )}

        {/* Rules */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-30" />
            <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl mb-6 text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                📋 How It Works
              </h2>
              <div className="space-y-4 text-purple-200 text-lg">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl">1️⃣</span>
                  <p>When the game starts, everyone types their name to enter</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl">2️⃣</span>
                  <p>All names are added to the Mystery Wheel</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl">3️⃣</span>
                  <p>We spin the wheel 5 times</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl">4️⃣</span>
                  <p>Each spin = 1 Mystery Box winner</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl">5️⃣</span>
                  <p>No duplicates — once someone wins, they're removed from the wheel</p>
                </div>
              </div>
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-xl border border-yellow-400/30">
                <p className="text-xl text-yellow-400">
                  🎯 100% fair · 100% transparent · Everyone has equal chances
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}