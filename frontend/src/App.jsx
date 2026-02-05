import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/common/Navbar';
import Home from './pages/Home'; // <--- NEW IMPORT
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import BookAppointment from './pages/appointments/BookAppointment';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Main Content Area */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} /> {/* <--- CHANGED FROM NAVIGATE */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private Routes (Dashboards) */}
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />

          {/* Placeholders */}
          <Route path="/ai-assistant" element={<div className="pt-24 text-center">AI Coming Soon</div>} />
          <Route path="/medicines" element={<div className="pt-24 text-center">Meds Coming Soon</div>} />
          <Route path="/campaigns" element={<div className="pt-24 text-center">Campaigns Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;