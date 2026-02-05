import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import default styles
import { api } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  
  // Steps: 1 = Details, 2 = OTP Verification
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '' // This will now store the full number with country code
  });

  const [otp, setOtp] = useState('');

  // --- Handle Input Changes ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Step 1: Validate & Send OTP ---
  const handleInitiateRegister = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      return setError("Please enter a valid mobile number.");
    }

    setLoading(true);

    try {
      // SIMULATION: In a real app, this calls `api.sendOtp({ email, mobile })`
      // We simulate a network delay here.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      setStep(2); // Move to OTP Screen
      alert(`OTP sent to ${formData.email} and +${formData.mobile}`); 
    } catch (err) {
      setLoading(false);
      setError("Failed to send OTP. Try again.");
    }
  };

  // --- Step 2: Verify OTP & Register ---
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // SIMULATION: In real app, verify OTP with backend first.
      if (otp.length !== 6) {
        throw new Error("Invalid OTP. Please enter 6 digits.");
      }

      // If OTP is valid, proceed to Register
      // We remove 'confirmPassword' before sending to backend
      const { confirmPassword, ...registerData } = formData;
      
      await api.register({ ...registerData, role });
      
      alert('Registration Successful! Please Login.');
      navigate('/login');

    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 z-0"></div>
      
      <div className="card w-full max-w-lg relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800">
            {step === 1 ? 'Create Account' : 'Verify Identity'}
          </h2>
          <p className="text-slate-400 mt-2 font-medium">
            {step === 1 
              ? <span>Join HealthSync as a <span className="text-emerald-600 font-bold capitalize">{role}</span></span>
              : `Enter the code sent to your device.`
            }
          </p>
        </div>

        {/* Role Toggles (Only visible in Step 1) */}
        {step === 1 && (
          <div className="flex gap-4 mb-6">
             <button type="button" onClick={() => setRole('patient')} className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'patient' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>Patient</button>
             <button type="button" onClick={() => setRole('doctor')} className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'doctor' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>Doctor</button>
          </div>
        )}

        {/* --- STEP 1 FORM: DETAILS --- */}
        {step === 1 && (
          <form onSubmit={handleInitiateRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  name="firstName" type="text" placeholder="First Name" className="input-field pl-10" required 
                  onChange={handleChange} value={formData.firstName}
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  name="lastName" type="text" placeholder="Last Name" className="input-field pl-10" required 
                  onChange={handleChange} value={formData.lastName}
                />
              </div>
            </div>

            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 name="email" type="email" placeholder="Email Address" className="input-field pl-10" required 
                 onChange={handleChange} value={formData.email}
               />
            </div>

            {/* Phone Input with Country Code */}
            <div className="relative">
               <PhoneInput
                 country={'us'} // Default country
                 value={formData.mobile}
                 onChange={phone => setFormData({ ...formData, mobile: phone })}
                 inputClass="!w-full !h-[50px] !pl-12 !border-slate-200 !rounded-xl !font-medium !text-slate-700"
                 containerClass="!w-full"
                 buttonClass="!border-slate-200 !rounded-l-xl !bg-slate-50"
               />
            </div>

            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 name="password" type="password" placeholder="Create Password" className="input-field pl-10" required 
                 onChange={handleChange} value={formData.password}
               />
            </div>

            <div className="relative">
               <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 name="confirmPassword" type="password" placeholder="Confirm Password" className="input-field pl-10" required 
                 onChange={handleChange} value={formData.confirmPassword}
               />
            </div>

            {error && <p className="text-rose-500 text-sm font-bold text-center bg-rose-50 p-2 rounded-lg">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
              {loading ? 'Sending OTP...' : 'Next: Verify & Register'} {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}

        {/* --- STEP 2 FORM: OTP --- */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister} className="space-y-6 animate-fade-in">
            <div className="bg-emerald-50 p-4 rounded-xl text-center">
              <p className="text-sm text-emerald-800">
                We've sent a 6-digit code to <br/>
                <span className="font-bold">{formData.email}</span>
              </p>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">One-Time Password (OTP)</label>
               <input 
                 type="text" 
                 placeholder="Enter 6-digit code" 
                 className="input-field text-center text-2xl tracking-widest font-mono" 
                 maxLength={6}
                 value={otp}
                 onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Only numbers
                 required 
               />
               <p className="text-xs text-center text-slate-400">For testing, enter any 6 digits (e.g., 123456)</p>
            </div>

            {error && <p className="text-rose-500 text-sm font-bold text-center bg-rose-50 p-2 rounded-lg">{error}</p>}

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button type="submit" disabled={loading} className="flex-[2] btn-primary flex justify-center items-center gap-2">
                {loading ? 'Verifying...' : 'Complete Registration'} {!loading && <CheckCircle size={18} />}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-400 font-medium">
          Already have an ID? <Link to="/login" className="text-emerald-600 font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;