import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Legal Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Link 
            to="/terms-of-use" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Terms of Use
          </Link>
          <Link 
            to="/privacy-policy" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/directory-data-policy" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Directory Data Policy
          </Link>
          <Link 
            to="/consent-profile-visibility" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Consent & Profile Visibility
          </Link>
          <Link 
            to="/refund-payment-policy" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Refund / Payment Policy
          </Link>
          <Link 
            to="/grievance-contact" 
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Grievance / Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AVDA - Arya Vysya Doctors Alliance. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Operated by Dr. GV Krishna Rao Trust | Guntur, Andhra Pradesh, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
