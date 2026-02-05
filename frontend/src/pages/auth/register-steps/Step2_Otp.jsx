import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { api } from '../../../services/api';

const Step2_Otp = ({ email, onSuccess, onBack, setLoading, loading }) => {
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert("Please enter the 6-digit code");

    setLoading(true);
    try {
      // 1. Call Backend
      // This throws an error if status is not 200 OK
      await api.verifyOtp({ email, otp });
      
      // 2. Only runs if no error thrown above
      onSuccess(); 
    } catch (err) {
      // 3. If Invalid OTP, show alert and DO NOT move forward
      alert(err.message || "Invalid Code. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6 animate-fade-in">
      <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
        <p className="text-sm text-emerald-800">
          We sent a code to <span className="font-bold block text-lg">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Enter 6-Digit Code</label>
        <input 
          type="text" 
          placeholder="000000" 
          className="input-field text-center text-3xl tracking-[0.5em] font-mono font-bold" 
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
          required 
        />
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2">
          <ArrowLeft size={18} /> Back
        </button>
        <button type="submit" disabled={loading} className="flex-[2] btn-primary flex justify-center items-center gap-2">
          {loading ? 'Verifying...' : 'Confirm'} <CheckCircle size={18} />
        </button>
      </div>
    </form>
  );
};

export default Step2_Otp;