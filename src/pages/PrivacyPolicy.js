import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Privacy and Data Protection</h2>
              <p>Personal and professional data are processed for directory operation, networking, verification, communication, and platform administration. Reasonable safeguards are implemented.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Collection</h2>
              <p>We collect information you provide during registration, including professional credentials, contact details, and profile information necessary for directory operation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Usage</h2>
              <p>Your data is used for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Directory operation and display</li>
                <li>Professional networking and connections</li>
                <li>Profile verification and moderation</li>
                <li>Platform communication and updates</li>
                <li>Administrative purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Protection</h2>
              <p>We implement reasonable safeguards to protect your personal and professional information from unauthorized access, misuse, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p>For privacy-related inquiries, contact: <a href="mailto:privacy@avda.in" className="text-blue-400 hover:text-blue-300">privacy@avda.in</a></p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <Link to="/" className="text-blue-400 hover:text-blue-300">← Back to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;