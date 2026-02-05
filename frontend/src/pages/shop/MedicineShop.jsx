import React from 'react';
import { ShoppingBag } from 'lucide-react';

const MedicineShop = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in flex flex-col items-center justify-center h-[60vh]">
      <div className="p-6 bg-slate-100 rounded-full text-slate-400 mb-4">
        <ShoppingBag size={48} />
      </div>
      <h1 className="text-3xl font-black text-slate-800">Pharmacy Store</h1>
      <p className="text-slate-400">No medicines available in the inventory currently.</p>
    </div>
  );
};
export default MedicineShop;