import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar } from 'lucide-react';
import { api } from '../../services/api';

const BookAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Load doctors on mount
  useEffect(() => {
    // Mock data fallback if API fails
    const mockDoctors = [
      { id: 1, name: "Dr. Elena Rodriguez", specialty: "Dermatologist", clinic: "Skin & Glow", rating: 4.8, image: "https://i.pravatar.cc/150?u=1" },
      { id: 2, name: "Dr. James Chen", specialty: "Pediatrician", clinic: "Happy Kids Hospital", rating: 4.9, image: "https://i.pravatar.cc/150?u=2" },
      { id: 3, name: "Dr. Sarah Mitchell", specialty: "Cardiologist", clinic: "City Heart Center", rating: 5.0, image: "https://i.pravatar.cc/150?u=3" },
    ];
    setDoctors(mockDoctors);
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-4">Find Your Specialist</h1>
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            className="w-full pl-14 pr-6 py-5 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 outline-none text-lg font-bold text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-50 transition-all"
            placeholder="Search doctor, specialty, or clinic..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="card group hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-700">{doc.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{doc.name}</h3>
            <p className="text-emerald-600 font-medium text-sm mb-4">{doc.specialty}</p>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
              <MapPin size={16} />
              <span className="truncate">{doc.clinic}</span>
            </div>
            
            <button 
              onClick={() => setSelectedDoctor(doc)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg"
            >
              Book Visit
            </button>
          </div>
        ))}
      </div>

      {/* Simple Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 animate-fade-in shadow-2xl">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Book Appointment</h2>
            <p className="text-slate-500 mb-6">with <span className="font-bold text-emerald-600">{selectedDoctor.name}</span></p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Select Date</label>
                <input type="date" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Select Time</label>
                <select className="input-field">
                  <option>09:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>04:30 PM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setSelectedDoctor(null)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
              <button onClick={() => { alert('Booking Confirmed!'); setSelectedDoctor(null); }} className="flex-[2] py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;