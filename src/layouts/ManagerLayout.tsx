import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, ChefHat, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ManagerLayout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Floor', path: '/manager/dashboard' },
    { icon: ClipboardList, label: 'Orders', path: '/manager/orders' },
    { icon: ChefHat, label: 'Kitchen', path: '/manager/kitchen' },
    { icon: Settings, label: 'Settings', path: '/manager/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">OrbitDine</h1>
          <p className="text-sm text-gray-500">Manager Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Nav (Visible only on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg text-xs font-medium",
              location.pathname === item.path
                ? "text-blue-600"
                : "text-gray-500"
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
