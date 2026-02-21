import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomerLayout() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const [locationStatus, setLocationStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    // Simulate Geofencing Check
    // In a real app, we would use navigator.geolocation.getCurrentPosition
    // and calculate distance to the restaurant.
    const checkLocation = () => {
      setTimeout(() => {
        // For demo purposes, we assume they are always close enough
        // unless we want to demonstrate the error state.
        setLocationStatus('allowed');
      }, 1500);
    };

    checkLocation();
  }, []);

  if (locationStatus === 'checking') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4 text-blue-500"
        >
          <MapPin className="w-12 h-12" />
        </motion.div>
        <h2 className="text-xl font-bold text-gray-900">Verifying Location...</h2>
        <p className="text-gray-500">Ensuring you are at The Spice Room</p>
      </div>
    );
  }

  if (locationStatus === 'denied') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-red-900">Location Error</h2>
        <p className="text-red-700 mb-6">You must be within 50 meters of the restaurant to place an order.</p>
        <button 
          onClick={() => setLocationStatus('checking')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold"
        >
          Retry Location
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        <div className="text-sm font-medium text-gray-500">
          Table #{tableId}
        </div>

        <button 
          onClick={() => navigate(`/table/${tableId}/cart`)}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
