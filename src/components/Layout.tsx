import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Users, Settings } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/scraper', label: 'Scraper', icon: Search },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Search className="w-6 h-6" />
            LeadGen Pro
          </h1>
          <p className="text-xs text-gray-500 mt-1">Agencia Web CRM</p>
        </div>
        <nav className="flex-1 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              AG
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Agencia Admin</p>
              <p className="text-xs text-gray-500">admin@agencia.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
