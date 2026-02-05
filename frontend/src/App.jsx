import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute'; // New Import

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import BookAppointment from './pages/appointments/BookAppointment';
import MyAppointments from './pages/appointments/MyAppointments';
import CampaignList from './pages/campaigns/CampaignList';
import CreateCampaign from './pages/campaigns/CreateCampaign';
import AiAssistant from './pages/ai/AiAssistant';     // New Import
import MedicineShop from './pages/shop/MedicineShop'; // New Import
import MedicalRecords from './pages/records/MedicalRecords'; // New Import

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 pb-10">
          <Navbar />
          <div className="pt-24"> 
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* --- Protected Patient Routes --- */}
              <Route path="/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
              <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
              <Route path="/my-appointments" element={<PrivateRoute><MyAppointments /></PrivateRoute>} />
              <Route path="/ai-assistant" element={<PrivateRoute><AiAssistant /></PrivateRoute>} />
              <Route path="/medicines" element={<PrivateRoute><MedicineShop /></PrivateRoute>} />
              <Route path="/records" element={<PrivateRoute><MedicalRecords /></PrivateRoute>} />
              
              {/* --- Protected Doctor Routes --- */}
              <Route path="/doctor-dashboard" element={<PrivateRoute role="doctor"><DoctorDashboard /></PrivateRoute>} />

              {/* --- Protected Admin Routes --- */}
              <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />

              {/* --- Campaigns (Public View / Private Create) --- */}
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/campaigns/new" element={<PrivateRoute><CreateCampaign /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;