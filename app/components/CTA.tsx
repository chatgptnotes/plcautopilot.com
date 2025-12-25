'use client';

import { useState } from 'react';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', platform: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', platform: '' });

      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Ready to Transform Your PLC Development?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Join the early access program and get 3 months at 50% off
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Work Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <select
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="px-5 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Primary Platform</option>
              <option value="basic">Machine Expert Basic</option>
              <option value="machine">Machine Expert</option>
              <option value="control">Control Expert</option>
              <option value="multiple">Multiple Platforms</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              isSubmitted
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? 'Submitting...' : isSubmitted ? 'Request Sent!' : 'Request Early Access'}
          </button>
          <p className="text-sm text-gray-400 text-center">
            No credit card required. 14-day free trial included.
          </p>
        </form>
      </div>
    </section>
  );
}
