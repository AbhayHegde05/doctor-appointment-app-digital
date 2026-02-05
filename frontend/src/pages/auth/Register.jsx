import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Smartphone, ArrowRight } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('patient');
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 z-0"></div>
      
      <div className="card w-full max-w-lg relative z-10 animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800">Create Account</h2>
          <p className="text-slate-400 mt-2 font-medium">Join HealthSync as a <span className="text-emerald-600 font-bold capitalize">{role}</span></p>
        </div>

        <div className="flex gap-4 mb-6">
           <button onClick={() => setRole('patient')} className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'patient' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>Patient</button>
           <button onClick={() => setRole('doctor')} className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'doctor' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>Doctor</button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="First Name" className="input-field pl-10" />
            </div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Last Name" className="input-field pl-10" />
            </div>
          </div>

          <div className="relative">
             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
             <input type="email" placeholder="Email Address" className="input-field pl-10" />
          </div>

          <div className="relative">
             <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
             <input type="tel" placeholder="Mobile Number" className="input-field pl-10" />
          </div>

          <div className="relative">
             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
             <input type="password" placeholder="Create Password" className="input-field pl-10" />
          </div>

          <button className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
            Complete Registration <ArrowRight size={18} />
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-400 font-medium">
          Already have an ID? <Link to="/login" className="text-emerald-600 font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;