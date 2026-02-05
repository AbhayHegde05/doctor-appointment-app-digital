import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-emerald-600 text-white pt-24 pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/30 rounded-full border border-emerald-400/50 backdrop-blur-sm">
              <Activity size={18} className="animate-pulse" />
              <span className="text-sm font-bold tracking-wide uppercase">#1 Trusted Health App</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Complete Healthcare <br />
              <span className="text-emerald-200">At Your Fingertips</span>
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Book appointments, track medicines, and get AI-powered health insights instantly. Secure, simple, and smart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="px-8 py-4 bg-emerald-700 text-white border border-emerald-500 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-colors flex items-center justify-center">
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Visual Placeholder */}
          <div className="hidden lg:flex justify-center relative">
            <div className="w-[500px] h-[500px] bg-emerald-500/20 rounded-full absolute blur-3xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6 bg-white/20 p-4 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm"><HeartPulse size={24} /></div>
                <div>
                  <p className="font-bold text-white">Cardiology Checkup</p>
                  <p className="text-xs text-emerald-100 font-medium">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/20 p-4 rounded-2xl">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm"><Stethoscope size={24} /></div>
                 <div>
                   <p className="font-bold text-white">Find Specialists</p>
                   <p className="text-xs text-emerald-100 font-medium">Top Rated Doctors</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-4">Why Choose HealthSync?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We combine advanced AI technology with trusted medical expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Stethoscope size={32} />} 
              title="Expert Doctors" 
              desc="Connect with top specialists in your area for in-clinic or video consultations." 
            />
            <FeatureCard 
              icon={<Activity size={32} />} 
              title="AI Diagnosis" 
              desc="Get instant preliminary analysis of your symptoms using our Gemini AI model." 
            />
            <FeatureCard 
              icon={<ShieldCheck size={32} />} 
              title="Secure Records" 
              desc="Your medical history, prescriptions, and reports are encrypted and safe." 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">{icon}</div>
    <h3 className="text-xl font-black text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;