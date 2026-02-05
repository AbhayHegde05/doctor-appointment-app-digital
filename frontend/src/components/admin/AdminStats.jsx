import React from 'react';

const AdminStats = ({ title, count, icon, trend, color }) => {
  // Color map for dynamic styling
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600'
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${colorClasses[color] || 'bg-slate-50 text-slate-600'}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-black text-slate-800 mb-1">{count}</h3>
      <p className="text-slate-400 font-medium text-sm">{title}</p>
    </div>
  );
};

export default AdminStats;