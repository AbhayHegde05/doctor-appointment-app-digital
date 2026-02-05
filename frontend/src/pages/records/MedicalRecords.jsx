import React from 'react';
import { FileText } from 'lucide-react';

const MedicalRecords = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in flex flex-col items-center justify-center h-[60vh]">
      <div className="p-6 bg-slate-100 rounded-full text-slate-400 mb-4">
        <FileText size={48} />
      </div>
      <h1 className="text-3xl font-black text-slate-800">Medical History</h1>
      <p className="text-slate-400">No medical records found for this patient.</p>
    </div>
  );
};
export default MedicalRecords;