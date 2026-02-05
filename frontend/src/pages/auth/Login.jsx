import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import { api } from '../../services/api'; // Ensure this path matches your structure

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient'); // 'patient' or 'doctor'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app: const user = await api.login({ ...formData, role });
      // For Demo:
      setTimeout(() => {
        setLoading(false);
        if(role === 'admin') navigate('/admin');
        else if(role === 'doctor') navigate('/doctor-dashboard');
        else navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-600 rounded-b-[3rem] z-0"></div>
      <div className="absolute top-20 left-10 text-emerald-500/20"><Activity size={300} /></div>

      <div className="card w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-400 font-medium">Secure Access Portal</p>
        </div>

        {/* Role Toggles */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
          {['patient', 'doctor'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${
                role === r 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              className="input-field pl-12" 
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              className="input-field pl-12" 
              placeholder="Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link to="#" className="text-xs font-bold text-emerald-600 hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 font-bold hover:underline">
              Create Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;