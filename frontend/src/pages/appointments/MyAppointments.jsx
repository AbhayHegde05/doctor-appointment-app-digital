import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppts = async () => {
      try {
        const data = await api.getAppointments(user._id || user.id);
        setAppointments(data || []);
      } catch (err) {
        console.error(err);
        setAppointments([]); // Ensure it stays empty on error
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAppts();
  }, [user]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-indigo-100 text-indigo-700';
      case 'cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-amber-100 text-amber-700'; // Pending
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-3xl font-black text-slate-800">My Appointments</h1>

      {loading ? <p className="text-slate-400">Loading history...</p> : (
        <div className="space-y-4">
          {appointments.length === 0 ? (
             <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
               No appointments found. Book your first visit!
             </div>
          ) : (
            appointments.map(apt => (
              <div key={apt._id} className="card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400">
                    {apt.doctorId?.firstName?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Dr. {apt.doctorId?.firstName} {apt.doctorId?.lastName}</h3>
                    <p className="text-slate-500 font-medium">{apt.doctorId?.specialty || 'Specialist'}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right hidden md:block">
                     <p className="text-sm font-bold text-slate-700 flex items-center gap-1 justify-end"><MapPin size={14} /> {apt.doctorId?.clinic || 'Clinic'}</p>
                     <p className="text-xs text-slate-400">Clinic Visit</p>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${getStatusStyle(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;