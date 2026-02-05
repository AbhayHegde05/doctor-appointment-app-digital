import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Megaphone } from 'lucide-react';
import { api } from '../../services/api';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await api.getCampaigns('approved');
        setCampaigns(data || []);
      } catch (err) {
        console.error("Failed to load campaigns", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-400">Loading fundraisers...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Community Campaigns</h1>
          <p className="text-slate-400 font-medium">Support those in critical need.</p>
        </div>
        <Link to="/campaigns/new" className="btn-primary flex items-center gap-2">
          <Megaphone size={18} /> Raise Request
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <Heart className="mx-auto text-slate-200 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800">No active fundraisers</h3>
          <p className="text-slate-400">Be the first to raise a request if you need help.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map(camp => (
            <div key={camp._id} className="card group hover:-translate-y-2 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-rose-50 text-rose-500 rounded-xl"><Heart size={24} /></div>
                <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">Verified</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-1">{camp.title}</h3>
              <p className="text-sm font-medium text-emerald-600 mb-4">For: {camp.creatorId?.firstName || 'Patient'}</p>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">{camp.description}</p>
              
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-emerald-600">${camp.amountRaised || 0} raised</span>
                <span className="text-slate-400">of ${camp.amountNeeded}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${(Math.min((camp.amountRaised || 0) / camp.amountNeeded, 1)) * 100}%` }}
                ></div>
              </div>

              <button className="w-full py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                Donate Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;