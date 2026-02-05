import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Megaphone, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <Users size={20} />, label: 'Doctors', path: '/admin/doctors' }, // We will handle these sub-routes in AdminDashboard
    { icon: <Megaphone size={20} />, label: 'Campaigns', path: '/admin/campaigns' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col p-6 z-40">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black">H</div>
        <span className="text-xl font-bold tracking-tight">HealthAdmin</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium mt-auto">
        <LogOut size={20} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;