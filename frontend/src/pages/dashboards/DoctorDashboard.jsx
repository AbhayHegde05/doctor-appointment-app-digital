import React, { useState, useEffect } from 'react';
import { Users, Calendar, Star, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAppointments(user._id || user.id);
        setAppointments(data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  // Dynamic Stats Calculation
  const pendingReqs = appointments.filter(a => a.status === 'pending');
  const todayAppts = appointments.filter(a => a.status === 'confirmed' && a.date === new Date().toISOString().split('T')[0]);
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  const handleAction = async (id, status) => {
    try {
      await api.updateAppointmentStatus(id, status); // Ensure backend has this route
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Dr. {user?.lastName}</h1>
          <p className="text-slate-400 font-medium mt-2">{user?.specialty || 'General'} Specialist</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <Star className="text-amber-400 fill-amber-400" size={20} />
          <span className="font-bold text-slate-700">{user?.rating || '0.0'}/5.0 Rating</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Appointments Today" value={todayAppts.length} icon={<Users />} color="text-indigo-600 bg-indigo-50" />
        <StatCard label="Pending Requests" value={pendingReqs.length} icon={<Clock />} color="text-amber-600 bg-amber-50" />
        <StatCard label="Total Completed" value={completedCount} icon={<CheckCircle />} color="text-emerald-600 bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Requests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Incoming Requests</h2>
          <div className="space-y-4">
            {loading ? <p className="text-slate-400">Loading...</p> : pendingReqs.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">No pending requests</div>
            ) : pendingReqs.map(req => (
              <div key={req._id} className="card p-6 flex items-center justify-between hover:border-emerald-200 transition-colors">
                <div>
                  <h4 className="font-bold text-lg text-slate-800">{req.patientId?.firstName} {req.patientId?.lastName}</h4>
                  <p className="text-slate-500 text-sm mb-1">{req.reason || 'General Checkup'}</p>
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-500">{req.date} @ {req.time}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(req._id, 'confirmed')} className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle size={20} /></button>
                  <button onClick={() => handleAction(req._id, 'cancelled')} className="p-3 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><XCircle size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Schedule */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Confirmed Schedule</h2>
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden min-h-[300px]">
             {todayAppts.length === 0 ? (
               <div className="h-full flex items-center justify-center text-slate-500">No appointments scheduled for today.</div>
             ) : (
               <div className="relative z-10 space-y-6">
                 {todayAppts.map((appt, i) => (
                   <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                     <div className="text-center w-16">
                       <p className="font-bold text-lg">{appt.time.split(' ')[0]}</p>
                       <p className="text-xs text-slate-400 uppercase">{appt.time.split(' ')[1]}</p>
                     </div>
                     <div className="w-1 h-10 bg-emerald-500 rounded-full"></div>
                     <div>
                       <p className="font-bold text-lg">{appt.patientId?.firstName} {appt.patientId?.lastName}</p>
                       <p className="text-sm text-slate-400">{appt.reason || 'Checkup'}</p>
                     </div>
                   </div>
                 ))}
               </div>
             )}
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