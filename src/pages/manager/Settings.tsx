import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-lg font-bold border-b pb-2">Restaurant Profile</h2>
        
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input type="text" defaultValue="The Spice Room" className="w-full p-2 border rounded-lg" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Table Count</label>
            <input type="number" defaultValue="15" className="w-full p-2 border rounded-lg" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-lg font-bold border-b pb-2">Notifications</h2>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <span>Play sound on new order</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <span>Show desktop notifications</span>
          </label>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
        <Save className="w-5 h-5" /> Save Changes
      </button>
    </div>
  );
}
