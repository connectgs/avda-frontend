import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processSession = async () => {
      try {
        // Extract session_id from URL fragment
        const hash = location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const sessionId = params.get('session_id');

        if (!sessionId) {
          console.error('No session_id found');
          navigate('/login');
          return;
        }

        // Exchange session_id for user data
        const response = await axios.post(
          `${API}/auth/session?session_id=${sessionId}`,
          {},
          { withCredentials: true }
        );

        const user = response.data;

        // Check if doctor profile exists
        try {
          const doctorResponse = await axios.get(
            `${API}/doctors?user_id=${user.user_id}`,
            { withCredentials: true }
          );

          if (doctorResponse.data && doctorResponse.data.length > 0) {
            // Doctor profile exists, go to dashboard
            navigate('/dashboard', { state: { user }, replace: true });
          } else {
            // No doctor profile, go to registration
            navigate('/register', { state: { user }, replace: true });
          }
        } catch (error) {
          // No doctor profile found, go to registration
          navigate('/register', { state: { user }, replace: true });
        }

      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { replace: true });
      }
    };

    processSession();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white text-lg">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
