import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Activity, Pill, Megaphone, Clock, MapPin } from 'lucide-react';

const PatientDashboard = () => {
  // Mock Data (Replace with API data later)
  const upcomingAppointment = {
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    date: "Feb 15, 2024",
    time: "10:00 AM",
    location: "City Heart Center"
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Hello, <span className="text-emerald-600">John</span>
          </h1>
          <p className="text-slate-400 font-medium mt-2">How are you feeling today?</p>
        </div>
        <Link to="/ai-assistant" className="btn-primary flex items-center gap-2">
          <Activity size={20} /> AI Symptom Check
        </Link>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard 
          to="/book-appointment" 
          icon={<Calendar size={28} />} 
          title="Find a Doctor" 
          desc="Book in-person or video consulations." 
          color="bg-indigo-50 text-indigo-600 hover:bg-indigo-100" 
        />
        <ActionCard 
          to="/medicines" 
          icon={<Pill size={28} />} 
          title="My Medicines" 
          desc="Track daily doses & refills." 
          color="bg-rose-50 text-rose-600 hover:bg-rose-100" 
        />
        <ActionCard 
          to="/campaigns" 
          icon={<Megaphone size={28} />} 
          title="Community Aid" 
          desc="Raise funds or donate." 
          color="bg-amber-50 text-amber-600 hover:bg-amber-100" 
        />
        <ActionCard 
          to="/records" 
          icon={<Activity size={28} />} 
          title="Medical Records" 
          desc="View prescriptions & history." 
          color="bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Upcoming Appointment */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Next Visit</h2>
          {upcomingAppointment ? (
            <div className="card flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              
              <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-400">
                {upcomingAppointment.doctor.charAt(0)}
              </div>
              
              <div className="flex-1 text-center sm:text-left z-10">
                <h3 className="text-xl font-bold text-slate-800">{upcomingAppointment.doctor}</h3>
                <p className="text-emerald-600 font-medium text-sm uppercase tracking-wider mb-2">{upcomingAppointment.specialty}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-500 text-sm font-medium">
                  <span className="flex items-center gap-1"><Clock size={16} /> {upcomingAppointment.date} @ {upcomingAppointment.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {upcomingAppointment.location}</span>
                </div>
              </div>
              
              <button className="btn-secondary z-10">Reschedule</button>
            </div>
          ) : (
            <div className="card text-center py-12 text-slate-400 font-medium">No upcoming appointments.</div>
          )}
        </div>

        {/* Right: Daily Routine Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Daily Meds</h2>
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 space-y-4">
            {['Amoxicillin (500mg)', 'Vitamin C'].map((med, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-emerald-500 shadow-sm">
                  <Pill size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-700">{med}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase">After Breakfast</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-emerald-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for the grid
const ActionCard = ({ to, icon, title, desc, color }) => (
  <Link to={to} className={`p-6 rounded-[2rem] ${color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between h-48`}>
    <div className="p-3 bg-white/60 w-fit rounded-2xl backdrop-blur-sm">{icon}</div>
    <div>
      <h3 className="text-lg font-black mb-1">{title}</h3>
      <p className="text-xs font-bold opacity-70 leading-relaxed">{desc}</p>
    </div>
  </Link>
);

export default PatientDashboard;