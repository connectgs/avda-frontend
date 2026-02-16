import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const GrievanceContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'login_recovery',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/grievance/submit`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', category: 'login_recovery', subject: '', message: '' });
    } catch (error) {
      alert('Error submitting grievance. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Grievance & Contact</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Grievance Officer</h2>
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <p><strong>Name:</strong> [To be updated]</p>
                <p><strong>Email:</strong> <a href="mailto:grievance@avda.in" className="text-blue-400 hover:text-blue-300">grievance@avda.in</a></p>
                <p><strong>Postal Address:</strong> [To be updated]</p>
                <p><strong>Response Time:</strong> 7-15 working days</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Submit Grievance</h2>
              
              {submitted ? (
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 my-4">
                  <p className="text-green-300 font-semibold">Grievance Submitted Successfully!</p>
                  <p className="text-green-200 text-sm mt-2">You will receive a response within 7-15 working days.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-green-400 hover:text-green-300 underline"
                  >
                    Submit Another Grievance
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="login_recovery">Login Recovery</option>
                      <option value="profile_correction">Profile Correction</option>
                      <option value="data_removal">Data Removal Request</option>
                      <option value="technical_issue">Technical Issue</option>
                      <option value="payment_issue">Payment Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="Brief description of your grievance"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="Please provide detailed information about your grievance"
                    />
                  </div>

                  <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                    <p className="text-yellow-200 text-sm">
                      <strong>Note:</strong> Please ensure you provide accurate contact information. Response time is 7-15 working days. Claims must be raised within 90 days of the event giving rise to the claim.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Grievance'}
                  </button>
                </form>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Complaint Handling Guidelines</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide supporting information with your complaint</li>
                <li>Complaints must be raised within 90 days of the event</li>
                <li>Frivolous or malicious complaints may be rejected</li>
                <li>Responses will be provided within 7-15 working days</li>
                <li>Decisions through grievance process are treated as final administrative resolution</li>
              </ul>
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

export default GrievanceContact;