import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface SpinWheelProps {
  participants: string[];
  isSpinning: boolean;
  onWinnerSelected: (winner: string) => void;
}

export function SpinWheel({ participants, isSpinning, onWinnerSelected }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  useEffect(() => {
    if (isSpinning && participants.length > 0) {
      // Random winner
      const winnerIndex = Math.floor(Math.random() * participants.length);
      
      // Calculate rotation to land on winner
      const segmentAngle = 360 / participants.length;
      const targetAngle = 360 - (winnerIndex * segmentAngle) - (segmentAngle / 2);
      const spins = 8; // Number of full rotations
      const finalRotation = rotation + (360 * spins) + targetAngle;
      
      setTargetRotation(finalRotation);
      
      // Call winner after animation
      setTimeout(() => {
        onWinnerSelected(participants[winnerIndex]);
      }, 5000);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      setRotation(targetRotation);
    }
  }, [targetRotation, isSpinning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    if (participants.length === 0) {
      // Draw empty wheel with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.5)';
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Waiting for participants...', centerX, centerY);
      return;
    }

    const segmentAngle = (2 * Math.PI) / participants.length;
    const colors = [
      ['#8B5CF6', '#A78BFA'], // Purple gradient
      ['#EC4899', '#F472B6'], // Pink gradient
      ['#F59E0B', '#FBBF24'], // Amber gradient
      ['#10B981', '#34D399'], // Emerald gradient
      ['#3B82F6', '#60A5FA'], // Blue gradient
      ['#EF4444', '#F87171'], // Red gradient
      ['#6366F1', '#818CF8'], // Indigo gradient
      ['#14B8A6', '#2DD4BF'], // Teal gradient
      ['#F97316', '#FB923C'], // Orange gradient
      ['#A855F7', '#C084FC'], // Violet gradient
    ];

    // Draw segments
    participants.forEach((participant, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;
      const colorPair = colors[index % colors.length];

      // Create gradient for segment
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, colorPair[0]);
      gradient.addColorStop(1, colorPair[1]);

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Segment border with glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.font = participants.length > 20 ? 'bold 13px sans-serif' : 'bold 16px sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      const text = participant.length > 12 ? participant.substring(0, 10) + '...' : participant;
      ctx.fillText(text, radius - 25, 0);
      ctx.restore();
    });

    // Draw outer ring with glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
    ctx.lineWidth = 6;
    ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
    centerGradient.addColorStop(0, '#4B5563');
    centerGradient.addColorStop(1, '#1F2937');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(252, 211, 77, 0.8)';
    ctx.shadowBlur = 15;
    ctx.stroke();

  }, [participants]);

  return (
    <div className="relative">
      {/* Pointer with glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20">
        <div className="relative">
          <div className="absolute inset-0 blur-lg bg-yellow-400 opacity-75" />
          <div className="relative w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-yellow-400 drop-shadow-2xl" />
        </div>
      </div>

      {/* Wheel Container with multiple glow layers */}
      <div className="relative">
        {/* Outer glow rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-2xl opacity-50 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className="relative bg-black/40 backdrop-blur-xl rounded-full p-8 border-4 border-yellow-400 shadow-2xl">
          {/* Spinning glow effect when active */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-xl opacity-75 animate-spin" style={{ animationDuration: '2s' }} />
          )}
          
          <motion.div
            animate={{ rotate: rotation }}
            transition={{
              duration: isSpinning ? 5 : 0,
              ease: [0.17, 0.67, 0.35, 0.96]
            }}
            className="relative"
          >
            <canvas
              ref={canvasRef}
              width={450}
              height={450}
              className="max-w-full h-auto relative z-10"
            />
          </motion.div>
        </div>

        {/* Corner sparkles */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}