import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LogIn } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('login') || location.pathname.includes('register');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
            Health<span className="text-emerald-600">Sync</span>
          </span>
        </Link>

        {/* Links (Hidden on Auth Pages) */}
        {!isAuthPage && (
          <div className="flex items-center gap-6">
            <Link to="/login" className="btn-primary flex items-center gap-2 py-2.5">
              <LogIn size={18} /> Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;