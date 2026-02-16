import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          {/* Header */}
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">AVDA Legal Framework — Terms of Use</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. About the Platform</h2>
              <p>AVDA is a professional networking and membership directory platform operated as a charitable initiative of Dr. GV Krishna Rao Trust. The platform enables professional connection, collaboration, and community engagement among members.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. Acceptance of Terms</h2>
              <p>By accessing, registering, submitting information, or using any feature of the platform, users agree to be legally bound by this Legal Framework.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. Eligibility and User Responsibilities</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Provide accurate professional information.</li>
                <li>Maintain updated records.</li>
                <li>Comply with applicable laws and professional regulations.</li>
                <li>Be responsible for submitted content.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Profile Visibility and Directory Listing</h2>
              <p>Member information may be displayed in the platform directory according to privacy settings selected by users.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Directory Data and Downloadable Content</h2>
              <p>Authorized users may access structured directory data. By registering, users consent to permitted information being included in such outputs. Once data is downloaded, external distribution cannot be controlled or reversed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Privacy and Data Protection</h2>
              <p>Personal and professional data are processed for directory operation, networking, verification, communication, and platform administration. Reasonable safeguards are implemented.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Moderation and Verification</h2>
              <p>The platform may review, verify, approve, or reject profiles. Moderators and administrators act in good faith to maintain integrity of the directory.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Payments and Contributions</h2>
              <p>Certain services may require financial contribution. Such contributions support platform operation and charitable objectives of the Trust.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
              <p>The platform is provided on an as-available basis. The Trust and associated persons shall not be liable for inaccuracies, third party conduct, data misuse after download, service interruptions, or indirect damages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">10. Indemnification</h2>
              <p>Users agree to indemnify and hold harmless Dr. GV Krishna Rao Trust and associated personnel from claims arising from their use of the platform or submitted information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">11. External Interactions</h2>
              <p>The platform does not control or guarantee outcomes of professional interactions, communications, or arrangements between members.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">12. Account Control</h2>
              <p>The platform may suspend or remove accounts for policy violations, misuse, or integrity concerns.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">13. Policy Updates</h2>
              <p>Policies may be updated periodically. Continued use constitutes acceptance of revisions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">14. Governing Law</h2>
              <p>All disputes shall be governed by the laws of India and subject to jurisdiction of courts in Guntur, Andhra Pradesh.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">15. Responsible Use and Complaint Handling</h2>
              
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Administrative Good Faith</h3>
              <p>All moderation, verification, approval, rejection, suspension, or removal decisions are made in good faith to maintain platform integrity. Such decisions are discretionary and shall not create entitlement to compensation or liability.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">No Guarantee of Inclusion or Visibility</h3>
              <p>Registration or application does not guarantee approval, listing, ranking, visibility, or continued presence in the directory.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Frivolous or Malicious Complaints</h3>
              <p>The platform reserves the right to reject, close, or disregard complaints that are malicious, repetitive, abusive, or lacking reasonable basis.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Misuse of Platform or Grievance System</h3>
              <p>Use of the platform, grievance system, or legal processes for harassment, intimidation, defamation, or bad faith disruption is prohibited.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Burden of Supporting Information</h3>
              <p>Persons raising complaints must provide reasonable supporting information. The platform is not obligated to investigate unsupported allegations.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Professional Representation Disclaimer</h3>
              <p>The platform does not certify or guarantee professional competence. Opinions or perceptions of third parties are not responsibility of the Trust.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Time Limit for Claims</h3>
              <p>Any claim relating to platform use must be raised within 90 days of the event giving rise to the claim.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">No Compensation for Dissatisfaction</h3>
              <p>Disagreement, dissatisfaction, inconvenience, or perceived unfairness does not create entitlement to compensation.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Grievance Process Finality</h3>
              <p>Decisions taken through the internal grievance process shall be treated as final administrative resolution.</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Communication Conduct</h3>
              <p>Abusive, threatening, or excessive communication with administrators or moderators may result in restriction or suspension of access.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">16. Grievance and Contact</h2>
              <p>Official grievance officer contact details will be published on the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">17. Final Acceptance</h2>
              <p>Registration, continued use, or participation constitutes full acceptance of this Legal Framework.</p>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <Link to="/" className="text-blue-400 hover:text-blue-300">← Back to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;