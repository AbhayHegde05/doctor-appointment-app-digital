const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    'Content-Type': 'application/json',
    'Authorization': user?.token ? `Bearer ${user.token}` : ''
  };
};

export const api = {
  // --- AUTHENTICATION ---
  register: (data) => fetch(`${API_URL}/register`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r => r.json()),
  login: (data) => fetch(`${API_URL}/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r => r.json()),
  
  // NEW: OTP Functions
  sendOtp: (data) => fetch(`${API_URL}/send-otp`, { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data) 
  }).then(async r => {
    if (!r.ok) throw new Error((await r.json()).message);
    return r.json();
  }),

  verifyOtp: (data) => fetch(`${API_URL}/verify-otp`, { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data) 
  }).then(async r => {
    if (!r.ok) throw new Error((await r.json()).message);
    return r.json();
  }),
  checkEmail: (email) => fetch(`${API_URL}/validate-email`, { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({ email }) 
  }).then(async r => {
    if (!r.ok) throw new Error((await r.json()).message);
    return r.json();
  }),

  // --- DOCTORS ---
  getDoctors: () => fetch(`${API_URL}/doctors`, { headers: getHeaders() }).then(r => r.json()),
  
  // --- APPOINTMENTS ---
  bookAppointment: (data) => fetch(`${API_URL}/appointments`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
  getAppointments: (userId) => fetch(`${API_URL}/appointments/user/${userId}`, { headers: getHeaders() }).then(r => r.json()),
  updateAppointmentStatus: (id, status) => fetch(`${API_URL}/appointments/${id}/status`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ status }) }).then(r => r.json()),

  // --- CAMPAIGNS ---
  createCampaign: (data) => fetch(`${API_URL}/campaigns`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
  getCampaigns: (status) => fetch(`${API_URL}/campaigns${status ? `?status=${status}` : ''}`, { headers: getHeaders() }).then(r => r.json()),

  // --- ADMIN ---
  verifyDoctor: (id) => fetch(`${API_URL}/admin/verify-doctor/${id}`, { method: 'PUT', headers: getHeaders() }).then(r => r.json()),
  approveCampaign: (id) => fetch(`${API_URL}/admin/approve-campaign/${id}`, { method: 'PUT', headers: getHeaders() }).then(r => r.json()),
  getPendingDoctors: () => fetch(`${API_URL}/admin/pending-doctors`, { headers: getHeaders() }).then(r => r.json()),

  // --- AI ---
  diagnose: (symptoms) => fetch(`${API_URL}/ai/diagnose`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ symptoms }) }).then(r => r.json()),
};