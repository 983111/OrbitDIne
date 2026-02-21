import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';

export default function LandingPage() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-8 shadow-lg"
      >
        <Utensils className="w-16 h-16 text-white" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 mb-2"
      >
        The Spice Room
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 mb-8"
      >
        Your dining orbit begins here
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={() => navigate(`/table/${tableId}/menu`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md transition-transform active:scale-95"
        >
          View Menu
        </button>
        
        <p className="mt-6 text-sm text-gray-400 font-medium">
          Table #{tableId}
        </p>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <button
            onClick={() => navigate('/manager')}
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
          >
            Staff Access
          </button>
        </div>
      </motion.div>
    </div>
  );
}
