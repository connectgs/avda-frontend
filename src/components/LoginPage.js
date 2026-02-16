import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const handleGoogleSignUp = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    // Sign up redirects to registration to complete doctor profile
    const redirectUrl = window.location.origin + '/register';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg p-3 inline-block mb-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_visha-doctors-global/artifacts/1t0vty7w_avda%20logo.png" 
              alt="AVDA Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to AVDA</h1>
          <p className="text-gray-400">AVDA Doctors Global</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Sign in to continue
          </h2>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition mb-4"
            data-testid="google-login-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
              <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
              <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
              <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800 text-gray-400">New to AVDA?</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition mb-4"
            data-testid="google-signup-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#fff"/>
              <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#fff"/>
              <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#fff"/>
              <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#fff"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
          <p className="text-gray-400 text-xs text-center mb-4">
            Auto-fill your registration form with Google profile data
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800 text-gray-400">Coming Soon</span>
            </div>
          </div>

          {/* LinkedIn - Coming Soon */}
          <button
            disabled
            className="w-full bg-white/10 text-gray-500 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 mb-3 opacity-50 cursor-not-allowed"
            data-testid="linkedin-btn-disabled"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
            <span>Continue with LinkedIn</span>
          </button>

          {/* WhatsApp - Coming Soon */}
          <button
            disabled
            className="w-full bg-white/10 text-gray-500 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 mb-3 opacity-50 cursor-not-allowed"
          >
            <span>📱</span>
            <span>Continue with WhatsApp</span>
          </button>

          {/* Facebook - Coming Soon */}
          <button
            disabled
            className="w-full bg-white/10 text-gray-500 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 opacity-50 cursor-not-allowed"
          >
            <span>📘</span>
            <span>Continue with Facebook</span>
          </button>

          <p className="text-gray-400 text-sm text-center mt-6">
            By signing in, you agree to our Terms and Privacy Policy
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
