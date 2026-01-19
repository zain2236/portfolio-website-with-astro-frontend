import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Sirf ye state control karegi popup ko

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For client-side code, ensure HTTPS for non-localhost URLs
  const getApiUrl = () => {
    const url = import.meta.env.PUBLIC_STRAPI_URL?.replace(/\/$/, '') || '';
    if (!url) return '';
    // If it's localhost, return as is
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return url;
    }
    // For production, ensure HTTPS
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  };
  const API_URL = getApiUrl();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact-infos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) throw new Error("Failed");

      // Success hone par:
      setIsSuccess(true); // 1. Message dikhao
      setFormData({ name: '', email: '', message: '' }); // 2. Form saaf kar do

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- SIMPLE SUCCESS POPUP / MESSAGE ---
  if (isSuccess) {
    return (
      <div className="p-8 md:p-14 rounded-2xl border border-gray-100 bg-[#fcfcfc] shadow-sm text-center flex flex-col items-center justify-center min-h-[400px] animate-in fade-in zoom-in duration-500">
        
        {/* Animated Check Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h3 className="text-3xl font-ovo text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 font-outfit mb-8 max-w-sm">
          Thank you! I have received your message and will get back to you shortly.
        </p>

        {/* Back Button */}
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg font-outfit font-medium hover:bg-black transition-all shadow-md"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-[#fcfcfc] shadow-sm hover:shadow-lg transition-all duration-300 space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-outfit font-medium block">Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 font-outfit"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-outfit font-medium block">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 font-outfit"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-outfit font-medium block">Message</label>
        <textarea
          required
          rows="5"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 font-outfit resize-none"
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white cursor-pointer py-4 rounded-lg font-outfit font-medium hover:bg-black transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}