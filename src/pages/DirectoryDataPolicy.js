import React from 'react';
import { Link } from 'react-router-dom';

const DirectoryDataPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Directory Data & Sharing Policy</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Profile Visibility and Directory Listing</h2>
              <p>Member information may be displayed in the platform directory according to privacy settings selected by users.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Directory Data and Downloadable Content</h2>
              <p>Authorized users may access structured directory data. By registering, users consent to permitted information being included in such outputs.</p>
              
              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4">
                <p className="font-semibold text-yellow-300">Important Notice:</p>
                <p className="text-yellow-200">Once data is downloaded, external distribution cannot be controlled or reversed.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">User Consent</h2>
              <p>By using this platform, you consent to your professional information being included in directory outputs available to authorized members.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Privacy Controls</h2>
              <p>You can control which information is publicly visible through your profile privacy settings. However, information visible at the time of download may be included in directory exports.</p>
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

export default DirectoryDataPolicy;