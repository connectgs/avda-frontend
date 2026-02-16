import React from 'react';
import { Link } from 'react-router-dom';

const ConsentProfileVisibility = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Consent & Profile Visibility Policy</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">User Consent</h2>
              <p>By registering and using this platform, you provide explicit consent for your professional information to be:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Displayed in the platform directory</li>
                <li>Included in member search results</li>
                <li>Accessed by authorized platform members</li>
                <li>Included in directory outputs and exports</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Profile Visibility Control</h2>
              <p>Member information may be displayed in the platform directory according to privacy settings selected by users. You can control:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Whether your phone number is publicly visible</li>
                <li>Whether your profile photo is displayed</li>
                <li>Whether you are included in downloadable directories</li>
                <li>Which portions of your address are shown</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Visibility Changes</h2>
              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4">
                <p className="font-semibold text-blue-300">Important:</p>
                <p className="text-blue-200">Changes to your visibility settings may affect your public profile display and inclusion in downloadable directory exports.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data in Circulation</h2>
              <p>Once directory data containing your information is downloaded by authorized users, the platform cannot control or retrieve copies of that data. Users are expected to use downloaded data lawfully and for professional purposes only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Withdrawing Consent</h2>
              <p>You may request profile removal or account deletion by contacting the grievance officer. Please note that data already included in downloaded directories before your request cannot be retrieved.</p>
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

export default ConsentProfileVisibility;