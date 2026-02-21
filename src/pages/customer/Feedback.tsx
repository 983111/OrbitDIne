import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Feedback() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating >= 4) {
      // Redirect to Google Reviews (Mock)
      window.open('https://search.google.com/local/writereview?placeid=MOCK_PLACE_ID', '_blank');
    } else {
      // Send to internal server
      console.log('Internal Feedback:', { rating, comment });
      // In a real app: await fetch('/api/feedback', ...)
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Send className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-500 mb-8">Your feedback helps us orbit higher.</p>
        <button
          onClick={() => navigate(`/table/${tableId}`)}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Rate Your Experience</h1>
      <p className="text-gray-500 mb-8">How was your journey at The Spice Room?</p>

      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="p-2 transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                "w-10 h-10",
                rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          </button>
        ))}
      </div>

      {rating > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {rating <= 3 ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What went wrong?
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us how we can improve..."
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-400 mt-2">
                Your feedback will be sent directly to the owner.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-xl text-green-800 text-sm">
              We're glad you enjoyed it! We'd love for you to share your experience on Google.
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            {rating >= 4 ? 'Post Review on Google' : 'Submit Feedback'}
          </button>
        </div>
      )}
    </div>
  );
}
