import React from 'react';
import { Link } from 'react-router-dom';

const RefundPaymentPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="border-b border-white/20 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Refund / Payment Policy</h1>
            <div className="text-gray-400 space-y-1">
              <p><strong>Operated by:</strong> Dr. GV Krishna Rao Trust</p>
              <p><strong>Effective Date:</strong> 1 March 2026</p>
              <p><strong>Jurisdiction:</strong> Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Payments and Contributions</h2>
              <p>Certain services may require financial contribution. Such contributions support platform operation and charitable objectives of the Trust.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Membership Fees</h2>
              <p>Membership fees are contributions toward the operation of the AVDA platform and charitable activities of Dr. GV Krishna Rao Trust.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Essential Membership: ₹100/year</li>
                <li>Premium Membership: ₹500/year</li>
                <li>VIP Membership: ₹1,500/year</li>
                <li>First 100 registrations: Premium membership free</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Payment Methods</h2>
              <p>Payments are processed securely through Razorpay payment gateway. Accepted payment methods include:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Credit and Debit Cards</li>
                <li>UPI</li>
                <li>Net Banking</li>
                <li>Wallets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Refund Policy</h2>
              <p>Contributions are generally non-refundable as they support ongoing platform operation and charitable objectives. However, refunds may be considered in the following cases:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Duplicate payments made in error</li>
                <li>Technical errors resulting in incorrect charges</li>
                <li>Account rejected during verification process</li>
              </ul>
              
              <p className="mt-4">Refund requests must be submitted within 7 days of payment. Approved refunds will be processed within 14 working days.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">No Guarantee of Approval</h2>
              <p>Payment of membership fees does not guarantee profile approval or continued listing. The platform reserves the right to reject or suspend accounts based on verification requirements and policy compliance.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Tax Receipts</h2>
              <p>Contributions to Dr. GV Krishna Rao Trust may be eligible for tax benefits under Section 80G. Tax receipts will be provided upon request for eligible contributions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact for Payment Issues</h2>
              <p>For payment-related queries or refund requests, contact: <a href="mailto:grievance@avda.in" className="text-blue-400 hover:text-blue-300">grievance@avda.in</a></p>
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

export default RefundPaymentPolicy;