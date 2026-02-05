import React, { useState } from 'react';
import { Upload, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amountNeeded: '',
    description: '',
    deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we would send `formData` to the API
      // await api.createCampaign(formData); 
      
      // Simulating API delay for demo
      setTimeout(() => {
        setLoading(false);
        alert('Campaign submitted successfully! It will be visible after Admin approval.');
        navigate('/campaigns');
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Failed to submit campaign.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="card max-w-2xl w-full animate-fade-in bg-white">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Raise a Fund Request</h2>
        <p className="text-slate-400 mb-8">Requests are reviewed by admins before publishing.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Campaign Title</label>
            <input 
              className="input-field" 
              placeholder="e.g. Surgery Support for Family" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Amount Needed ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    className="input-field pl-10" 
                    placeholder="5000" 
                    value={formData.amountNeeded}
                    onChange={(e) => setFormData({...formData, amountNeeded: e.target.value})}
                    required 
                  />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Deadline</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required 
                />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Medical Description</label>
            <textarea 
              className="input-field h-32 resize-none pt-4" 
              placeholder="Explain the condition and why financial help is needed..." 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer">
             <Upload size={32} className="mb-2" />
             <p className="font-bold text-sm">Upload Medical Proof</p>
             <p className="text-xs opacity-70">(Prescriptions, Hospital Bills)</p>
          </div>

          <button disabled={loading} className="btn-primary w-full mt-4">
            {loading ? 'Submitting...' : 'Submit for Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;