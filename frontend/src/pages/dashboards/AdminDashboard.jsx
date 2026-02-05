import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Megaphone } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await api.getPendingDoctors();
        const camps = await api.getCampaigns('pending'); // Requires backend to support ?status=pending
        setPendingDoctors(docs || []);
        setPendingCampaigns(camps || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleVerifyDoctor = async (id) => {
    await api.verifyDoctor(id);
    setPendingDoctors(pendingDoctors.filter(d => d._id !== id));
  };

  const handleApproveCampaign = async (id) => {
    await api.approveCampaign(id);
    setPendingCampaigns(pendingCampaigns.filter(c => c._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-10 animate-fade-in">
        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-10">
          <div className="relative z-10">
            <h1 className="text-4xl font-black">Admin Console</h1>
            <p className="text-slate-400 mt-2">Platform Overview & Moderation</p>
          </div>
          <ShieldCheck className="absolute right-0 bottom-0 text-slate-800 -mb-10 -mr-10" size={200} />
        </div>

        <div className="flex gap-4 border-b border-slate-200 pb-1 mb-6">
          <button onClick={() => setActiveTab('doctors')} className={`pb-3 px-2 font-bold transition-all ${activeTab === 'doctors' ? 'text-emerald-600 border-b-4 border-emerald-600' : 'text-slate-400'}`}>Verify Doctors ({pendingDoctors.length})</button>
          <button onClick={() => setActiveTab('campaigns')} className={`pb-3 px-2 font-bold transition-all ${activeTab === 'campaigns' ? 'text-emerald-600 border-b-4 border-emerald-600' : 'text-slate-400'}`}>Approve Campaigns ({pendingCampaigns.length})</button>
        </div>

        <div className="grid gap-4">
          {loading ? <p className="text-slate-400">Loading...</p> : activeTab === 'doctors' ? (
            pendingDoctors.length === 0 ? <p className="text-slate-400">No pending verifications.</p> : pendingDoctors.map(doc => (
              <div key={doc._id} className="card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><UserCheck size={24} /></div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-800">{doc.firstName} {doc.lastName}</h3>
                     <p className="text-slate-500 text-sm">License: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">PENDING</span></p>
                   </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleVerifyDoctor(doc._id)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm">Verify</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm">Reject</button>
                </div>
              </div>
            ))
          ) : (
            pendingCampaigns.length === 0 ? <p className="text-slate-400">No pending campaigns.</p> : pendingCampaigns.map(camp => (
              <div key={camp._id} className="card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-4 bg-amber-50 text-amber-600 rounded-xl"><Megaphone size={24} /></div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-800">{camp.title}</h3>
                     <p className="text-slate-500 text-sm">Amount: ${camp.amountNeeded}</p>
                   </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApproveCampaign(camp._id)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm">Approve</button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm">Decline</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;