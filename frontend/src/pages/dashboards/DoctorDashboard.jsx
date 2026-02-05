import React, { useState } from 'react';
import { Users, Calendar, Star, CheckCircle, XCircle, Clock } from 'lucide-react';

const DoctorDashboard = () => {
  // Mock Data
  const [requests, setRequests] = useState([
    { id: 1, name: "Alice Brown", reason: "Severe Migraine", date: "Feb 14", time: "02:00 PM" },
    { id: 2, name: "Michael Lee", reason: "Follow-up", date: "Feb 14", time: "04:30 PM" }
  ]);

  const handleAction = (id, action) => {
    // In real app: api.updateAppointmentStatus(id, action)
    setRequests(requests.filter(r => r.id !== id));
    alert(`Appointment ${action}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Dr. Smith</h1>
          <p className="text-slate-400 font-medium mt-2">Cardiology Specialist</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <Star className="text-amber-400 fill-amber-400" size={20} />
          <span className="font-bold text-slate-700">4.9/5.0 Rating</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Patients Today" value="12" icon={<Users />} color="text-indigo-600 bg-indigo-50" />
        <StatCard label="Pending Requests" value={requests.length} icon={<Clock />} color="text-amber-600 bg-amber-50" />
        <StatCard label="Completed" value="8" icon={<CheckCircle />} color="text-emerald-600 bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Requests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Incoming Requests</h2>
          <div className="space-y-4">
            {requests.length === 0 ? <p className="text-slate-400">No pending requests.</p> : requests.map(req => (
              <div key={req.id} className="card p-6 flex items-center justify-between hover:border-emerald-200 transition-colors">
                <div>
                  <h4 className="font-bold text-lg text-slate-800">{req.name}</h4>
                  <p className="text-slate-500 text-sm mb-1">{req.reason}</p>
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-500">{req.date} @ {req.time}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(req.id, 'Approved')} className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle size={20} /></button>
                  <button onClick={() => handleAction(req.id, 'Rejected')} className="p-3 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><XCircle size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule (Simplified) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Today's Roster</h2>
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              {[1,2,3].map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <div className="text-center">
                    <p className="font-bold text-lg">09:30</p>
                    <p className="text-xs text-slate-400 uppercase">AM</p>
                  </div>
                  <div className="w-1 h-10 bg-emerald-500 rounded-full"></div>
                  <div>
                    <p className="font-bold text-lg">James Wilson</p>
                    <p className="text-sm text-slate-400">General Checkup</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 flex items-center gap-4">
    <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
    <div>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

export default DoctorDashboard;