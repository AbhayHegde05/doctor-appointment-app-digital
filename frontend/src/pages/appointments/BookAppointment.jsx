import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const BookAppointment = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]); // CLEAN START
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.getDoctors();
        setDoctors(data || []);
      } catch (err) {
        console.error("Failed to load doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBooking = async () => {
    if (!date || !time) return alert("Please select date and time");
    try {
      await api.bookAppointment({
        patientId: user._id || user.id,
        doctorId: selectedDoctor._id,
        date,
        time,
        status: 'pending'
      });
      alert("Appointment Request Sent!");
      setSelectedDoctor(null);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  const filteredDoctors = doctors.filter(doc => 
    `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (doc.specialty || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-4">Find Your Specialist</h1>
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            className="input-field pl-14 rounded-[2rem] shadow-xl"
            placeholder="Search doctor, specialty, or clinic..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? <p className="text-center text-slate-400">Loading specialists...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? <p className="text-slate-400 col-span-full text-center">No doctors found. Please contact admin.</p> : null}
          {filteredDoctors.map(doc => (
            <div key={doc._id} className="card group hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-400">
                  {doc.firstName?.charAt(0)}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-amber-700">{doc.rating || 'N/A'}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">Dr. {doc.firstName} {doc.lastName}</h3>
              <p className="text-emerald-600 font-medium text-sm mb-4">{doc.specialty || 'General Practitioner'}</p>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <MapPin size={16} />
                <span className="truncate">{doc.clinic || 'Main Hospital'}</span>
              </div>
              <button onClick={() => setSelectedDoctor(doc)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg">
                Book Visit
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 animate-fade-in shadow-2xl">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Book Appointment</h2>
            <p className="text-slate-500 mb-6">with <span className="font-bold text-emerald-600">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</span></p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Select Date</label>
                <input type="date" className="input-field" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Select Time</label>
                <select className="input-field" value={time} onChange={e => setTime(e.target.value)}>
                  <option value="">-- Choose Slot --</option>
                  <option>09:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>04:30 PM</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setSelectedDoctor(null)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
              <button onClick={handleBooking} className="flex-[2] py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;