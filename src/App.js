import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DirectoryDataPolicy from './pages/DirectoryDataPolicy';
import ConsentProfileVisibility from './pages/ConsentProfileVisibility';
import RefundPaymentPolicy from './pages/RefundPaymentPolicy';
import GrievanceContact from './pages/GrievanceContact';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Homepage Component
const HomePage = () => {
  const [stats, setStats] = useState({ total_doctors: 0, streams: {} });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/statistics`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const streams = [
    { name: 'MBBS Stream', icon: '🩺', color: 'from-blue-500 to-blue-600', count: stats.streams?.MBBS || 0 },
    { name: 'Dental Stream', icon: '🦷', color: 'from-green-500 to-green-600', count: stats.streams?.Dental || 0 },
    { name: 'Ayurveda Stream', icon: '🌿', color: 'from-emerald-500 to-emerald-600', count: stats.streams?.Ayurveda || 0 },
    { name: 'Homeopathy Stream', icon: '🌸', color: 'from-purple-500 to-purple-600', count: stats.streams?.Homeo || 0 },
    { name: 'Veterinary Stream', icon: '🐾', color: 'from-orange-500 to-orange-600', count: stats.streams?.Veterinary || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-white">AVDA</h1>
                <p className="text-sm text-gray-400">Arya Vysya Doctors Alliance</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link to="/search" className="text-gray-300 hover:text-white transition">
                Search Directory
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition">
                Register Now
              </Link>
              <Link to="/admin" className="text-gray-300 hover:text-white transition">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Vasavi Matha Reverence Section */}
      <section className="bg-gradient-to-r from-orange-900/30 via-yellow-900/30 to-orange-900/30 border-b-2 border-yellow-600/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-30"></div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_visha-doctors-global/artifacts/29scy75a_matha.png" 
                  alt="Vasavi Matha" 
                  className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-yellow-500/70 shadow-2xl object-cover bg-white p-1"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left max-w-4xl">
              <p className="text-yellow-50 text-base md:text-lg leading-relaxed italic font-light">
                "With reverence to Vasavi Matha, embodiment of Dharma, sacrifice, and compassion, AVDA is dedicated to serving society through unity, integrity, and selfless medical service inspired by her eternal values"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Uniting Arya Vysya Doctors Worldwide
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AVDA is a global network of Arya Vysya doctors dedicated to professional excellence, 
            cultural heritage, and lasting friendships across 5 medical streams.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Inaugural Offer */}
      <section className="py-12 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 border border-amber-500/40 rounded-xl p-8 text-center">
            <p className="text-amber-300 font-bold text-2xl mb-3">Inaugural Offer</p>
            <p className="text-white text-lg">
              First 50 Basic members per region receive complete waiver.
            </p>
            <p className="text-gray-400 text-xs mt-4">
              Regions include: Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Rest of India, and Overseas.
            </p>
            <p className="text-amber-200/70 text-sm mt-3 italic">
              Limited inaugural opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Comparison Table */}
      <section className="py-12 bg-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Membership Tiers</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-gray-300 py-4 px-4 font-medium"></th>
                  <th className="text-center text-white py-4 px-4 font-semibold">Basic</th>
                  <th className="text-center text-white py-4 px-4 font-semibold">Premium</th>
                  <th className="text-center text-white py-4 px-4 font-semibold">VIP</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Annual Contribution</td>
                  <td className="text-center text-white py-4 px-4">₹100</td>
                  <td className="text-center text-white py-4 px-4">₹500</td>
                  <td className="text-center text-white py-4 px-4">₹1500</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Directory Listing</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Access to Community Network</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">CME & Learning</td>
                  <td className="text-center text-gray-500 py-4 px-4">—</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Matrimony Access</td>
                  <td className="text-center text-gray-500 py-4 px-4">—</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Event Participation</td>
                  <td className="text-center text-gray-500 py-4 px-4">—</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-gray-300 py-4 px-4">Priority Visibility</td>
                  <td className="text-center text-gray-500 py-4 px-4">—</td>
                  <td className="text-center text-gray-500 py-4 px-4">—</td>
                  <td className="text-center text-green-400 py-4 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What is AVDA */}
      <section className="py-12 bg-white/3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">What is AVDA?</h3>
          <p className="text-gray-400 text-base leading-relaxed">
            Arya Vysya Doctors Alliance (AVDA) is a professional community uniting Arya Vysya medical professionals globally. 
            We foster networking, knowledge sharing, and preserve our cultural heritage while supporting charitable activities 
            through Dr GV Krishna Rao Trust, Guntur.
          </p>
        </div>
      </section>

      {/* Medical Streams - Primary Visual Focus */}
      <section className="py-24 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Our 5 Medical Streams
          </h3>
          <p className="text-gray-300 text-center mb-16 text-lg">MBBS, Dental, Ayurveda, Homeopathy, Veterinary</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {streams.map((stream, index) => (
              <div 
                key={index}
                className="bg-white/8 backdrop-blur-md rounded-2xl p-8 border border-white/15 hover:bg-white/12 hover:border-white/25 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/search?stream=${stream.name.split(' ')[0]}`)}
              >
                <div className={`text-7xl mb-6 group-hover:scale-110 transition-transform duration-300`}>{stream.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{stream.name}</h4>
                <p className="text-gray-400 text-sm mb-4">
                  {stream.count} doctors registered
                </p>
                <div className={`h-1.5 w-full bg-gradient-to-r ${stream.color} rounded-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join - Secondary */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white text-center mb-10">
            Why Join AVDA?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold text-white mb-2">Professional Network</h4>
              <p className="text-gray-400">Connect with fellow Arya Vysya doctors worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💑</div>
              <h4 className="text-xl font-semibold text-white mb-2">Medical Matrimony</h4>
              <p className="text-gray-400">Exclusive matrimony platform for AVDA members</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h4 className="text-xl font-semibold text-white mb-2">CME & Learning</h4>
              <p className="text-gray-400">Continuing Medical Education and knowledge sharing</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏛️</div>
              <h4 className="text-xl font-semibold text-white mb-2">Cultural Heritage</h4>
              <p className="text-gray-400">Celebrate Vasavi Matha and Arya Vysya traditions</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h4 className="text-xl font-semibold text-white mb-2">Affordable Membership</h4>
              <p className="text-gray-400">Tiered membership options for all</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold text-white mb-2">Global Reach</h4>
              <p className="text-gray-400">Connect with diaspora doctors internationally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2025 AVDA - Arya Vysya Doctors Alliance. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Brought to you by{' '}
            <a 
              href="https://www.facebook.com/GVKTRUST" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Dr GV Krishna Rao Trust, Guntur
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Contributions currently not eligible for tax exemption.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Registration Page
const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <Link to="/" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
            ← Back to Homepage
          </Link>
          <h2 className="text-4xl font-bold text-white mt-4 mb-2">AVDA Doctor Registration</h2>
          <p className="text-gray-400">Join the global network of Arya Vysya doctors</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

// Search Page
const SearchPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Homepage
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-white mb-8">Search Directory</h2>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : doctors.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center">
            <p className="text-gray-300 text-lg">No doctors registered yet.</p>
            <p className="text-gray-400 mt-2">Be the first to join AVDA!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white">
                  {doctor.title} {doctor.first_name} {doctor.surname}
                </h3>
                <p className="text-gray-400 mt-2">{doctor.medical_stream}</p>
                <p className="text-gray-400">{doctor.specialty}</p>
                <p className="text-gray-400">{doctor.city}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Page
const AdminPage = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.get(`${API}/admin/doctors/pending`);
      setPendingDoctors(response.data);
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await axios.post(`${API}/admin/doctors/${doctorId}/approve?admin_id=admin123`);
      alert('Doctor approved!');
      fetchPendingDoctors();
    } catch (error) {
      alert('Error approving doctor');
    }
  };

  const handleReject = async (doctorId) => {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    try {
      await axios.post(`${API}/admin/doctors/${doctorId}/reject?reason=${reason}`);
      alert('Doctor rejected');
      fetchPendingDoctors();
    } catch (error) {
      alert('Error rejecting doctor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Homepage
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-white mb-8">Admin Dashboard - Pending Approvals</h2>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : pendingDoctors.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center">
            <p className="text-gray-300 text-lg">No pending approvals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {doctor.title} {doctor.first_name} {doctor.surname}
                    </h3>
                    <p className="text-gray-400 mt-1">{doctor.medical_stream} | {doctor.specialty}</p>
                    <p className="text-gray-400">{doctor.city}, {doctor.state}</p>
                    <p className="text-gray-400">Council: {doctor.council_registration_number}</p>
                    <p className="text-gray-400 text-sm mt-2">Email: {doctor.email} | Phone: {doctor.mobile_number}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(doctor.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      ✓ Approve
                    </button>
                    <button 
                      onClick={() => handleReject(doctor.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

// Router component that handles auth callback detection
function AppRouter() {
  const location = useLocation();
  
  // Check for session_id in URL fragment synchronously (before any useEffect)
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/directory-data-policy" element={<DirectoryDataPolicy />} />
      <Route path="/consent-profile-visibility" element={<ConsentProfileVisibility />} />
      <Route path="/refund-payment-policy" element={<RefundPaymentPolicy />} />
      <Route path="/grievance-contact" element={<GrievanceContact />} />
    </Routes>
  );
}

export default App;