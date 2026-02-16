import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [isAuthenticated, setIsAuthenticated] = useState(location.state?.user ? true : null);
  const [loading, setLoading] = useState(!location.state?.user);

  useEffect(() => {
    // If user data passed from AuthCallback, skip auth check
    if (location.state?.user) {
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // Otherwise, verify authentication
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API}/auth/me`, {
          withCredentials: true
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.state]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-2">
                <img 
                  src="https://customer-assets.emergentagent.com/job_visha-doctors-global/artifacts/1t0vty7w_avda%20logo.png" 
                  alt="AVDA Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AVDA Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user?.picture && (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full border-2 border-white/20"
                />
              )}
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Your Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">User ID</p>
                <p className="text-white font-mono text-sm">{user?.user_id}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/register"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg text-center transition"
              >
                Complete Doctor Registration
              </Link>
              <Link
                to="/search"
                className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-center transition"
              >
                Search Doctors
              </Link>
              <Link
                to="/"
                className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-center transition"
              >
                Back to Homepage
              </Link>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
            <div className="space-y-3 text-gray-300">
              <p>✅ Signed in with Google</p>
              <p>🏥 Complete your doctor registration</p>
              <p>🔍 Explore other doctors in the directory</p>
              <p>🤝 Connect with Arya Vysya doctors globally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
