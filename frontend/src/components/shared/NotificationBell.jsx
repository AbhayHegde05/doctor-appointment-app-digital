import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [show, setShow] = useState(false);
  // CLEANUP: Removed static notifications array.
  const notifications = []; 

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setShow(!show)} 
        className="relative p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in origin-top-right">
          <div className="p-4 border-b border-slate-50 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">Notifications</h4>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{unreadCount} New</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <div key={notif.id} className="p-4 border-b border-slate-50">
                  <p className="text-sm">{notif.text}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;