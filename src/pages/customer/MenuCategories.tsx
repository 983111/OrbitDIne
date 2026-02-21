import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Search } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export default function MenuCategories() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading menu...</div>;

  const filteredCategories = categories.filter((category) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;

    return (
      category.name.toLowerCase().includes(q) ||
      category.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search dishes..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/table/${tableId}/category/${category.id}`)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-500 bg-white border border-gray-100 rounded-xl p-8">
            No matching categories found.
          </div>
        )}
      </div>
    </div>
  );
}
