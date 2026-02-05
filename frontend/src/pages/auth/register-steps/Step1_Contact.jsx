import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { User, Mail, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../../../services/api';

const Step1_Contact = ({ formData, updateData, onSuccess, setLoading, loading }) => {
  
  const [emailStatus, setEmailStatus] = useState('idle'); // idle | checking | valid | invalid
  const [emailMsg, setEmailMsg] = useState('');

  // BLOCKING Validation Function
  const checkEmailValidity = async () => {
    // 1. Syntax Check
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setEmailStatus('invalid');
      setEmailMsg("Invalid email format");
      return false;
    }

    setEmailStatus('checking');
    try {
      // 2. Backend DNS Check (Does domain exist?)
      await api.checkEmail(formData.email);
      
      setEmailStatus('valid');
      setEmailMsg('');
      return true; // Success
    } catch (err) {
      setEmailStatus('invalid');
      setEmailMsg(err.message || "Domain does not exist");
      return false; // Fail
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // 1. STOP if Basic Fields are empty
    if (!formData.firstName || !formData.lastName) return alert("Enter your name");
    if (!formData.mobile || formData.mobile.length < 10) return alert("Enter valid mobile");

    // 2. STOP if Email Validation Fails
    // We await the check here. If it returns false, we RETURN immediately.
    const isValid = await checkEmailValidity();
    if (!isValid) {
      alert("Please enter a valid email address first.");
      return;
    }

    // 3. If Valid, Attempt to Send OTP
    setLoading(true);
    try {
      await api.sendOtp({ email: formData.email });
      onSuccess(); // Move to Step 2
    } catch (err) {
      // If sending fails (e.g. backend error), Alert user and DO NOT move next
      alert(err.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-5">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" placeholder="First Name" className="input-field pl-10" required 
            value={formData.firstName} onChange={(e) => updateData('firstName', e.target.value)}
          />
        </div>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" placeholder="Last Name" className="input-field pl-10" required 
            value={formData.lastName} onChange={(e) => updateData('lastName', e.target.value)}
          />
        </div>
      </div>

      {/* Email Field - Validation happens on Blur or Submit */}
      <div>
        <div className="relative">
          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            emailStatus === 'valid' ? 'text-emerald-500' : 
            emailStatus === 'invalid' ? 'text-rose-500' : 'text-slate-300'
          }`} size={18} />
          
          <input 
            type="email" placeholder="Email Address" required 
            className={`input-field pl-10 pr-10 ${
              emailStatus === 'invalid' ? 'border-rose-300 focus:border-rose-500 bg-rose-50' : ''
            }`}
            value={formData.email} 
            onChange={(e) => {
              updateData('email', e.target.value);
              setEmailStatus('idle'); // Reset when typing
            }}
            onBlur={checkEmailValidity} // Trigger check when leaving field
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {emailStatus === 'checking' && <Loader2 className="animate-spin text-indigo-500" size={18} />}
            {emailStatus === 'valid' && <CheckCircle className="text-emerald-500" size={18} />}
            {emailStatus === 'invalid' && <AlertCircle className="text-rose-500" size={18} />}
          </div>
        </div>
        {emailStatus === 'invalid' && (
          <p className="text-xs font-bold text-rose-500 mt-1 ml-1">{emailMsg}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="relative">
        <PhoneInput
          country={'us'}
          value={formData.mobile}
          onChange={phone => updateData('mobile', phone)}
          inputClass="!w-full !h-[50px] !pl-12 !border-slate-200 !rounded-xl !font-medium !text-slate-700"
          containerClass="!w-full"
          buttonClass="!border-slate-200 !rounded-l-xl !bg-slate-50"
        />
      </div>

      <button disabled={loading || emailStatus === 'checking'} className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
        {loading ? 'Verifying...' : 'Next'} 
        {!loading && <ArrowRight size={18} />}
      </button>
    </form>
  );
};

export default Step1_Contact;