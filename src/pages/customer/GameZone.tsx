import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';

export default function GameZone() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      setSpinning(false);
      const rewards = ['5% Off', 'Free Drink', 'Better Luck Next Time', '10% Off'];
      setResult(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 2000);
  };

  return (
    <div className="px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Game Zone</h1>
      <p className="text-gray-500 mb-8">Spin the wheel to win instant rewards!</p>

      <div className="relative w-64 h-64 mx-auto mb-8">
        <motion.div
          animate={{ rotate: spinning ? 1080 + Math.random() * 360 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full rounded-full border-8 border-purple-500 bg-white shadow-xl flex items-center justify-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[conic-gradient(var(--tw-gradient-stops))] from-yellow-400 via-red-500 to-purple-500 opacity-20" />
          <Trophy className="w-20 h-20 text-purple-600" />
        </motion.div>
        
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-800 rotate-45 transform origin-bottom z-10" />
      </div>

      {result && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 p-4 bg-yellow-100 text-yellow-800 rounded-xl font-bold text-xl"
        >
          {result}
        </motion.div>
      )}

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform active:scale-95"
      >
        {spinning ? 'Spinning...' : 'Spin to Win!'}
      </button>
    </div>
  );
}
