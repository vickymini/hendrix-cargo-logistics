import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact, getCompanySettings } from '../services/api';
import { CompanySettingsMap } from '../types';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [settings, setSettings] = useState<CompanySettingsMap>({
    companyName: 'Hendrix Cargo & Logistics',
    companyHeadline: 'Moving Your World, One Shipment at a Time.',
    companyTagline: 'Reliable cargo, freight, and logistics solutions connecting businesses and individuals across the globe.',
    supportEmail: 'support@hendrixcargo.com',
    salesEmail: 'contact@hendrixcargo.com',
    supportPhone: '+1 (800) 555-HCL2',
    operatingHours: 'Mon - Fri: 08:00 - 18:00 (GMT), 24/7 Dispatch Operations',
    headquartersAddress: 'Hendrix Logistics Terminal, Global Cargo District',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: serviceParam ? `Inquiry regarding ${serviceParam}` : '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getCompanySettings();
        if (data) setSettings(data);
      } catch {
        // Fall back to defaults
      }
    }
    loadSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await submitContact(formData);
      setSuccessMessage(res.message || 'Your inquiry was received. We will respond promptly.');
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to submit message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold-dark">
            Direct Assistance & Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-navy">
            Contact Our Logistics Team
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions regarding cargo transit, freight rates, or custom logistics partnerships?
            Our support desk is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-brand-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-navy-surface space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold text-white">Get in Touch</h2>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Reach our customer service desk directly or submit an inquiry using the form.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Terminal Location
                  </h4>
                  <p className="text-xs text-slate-300">{settings.headquartersAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Direct Phone Support
                  </h4>
                  <p className="text-xs text-slate-300 font-mono">{settings.supportPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Electronic Mail
                  </h4>
                  <p className="text-xs text-slate-300">
                    <a href={`mailto:${settings.supportEmail}`} className="hover:text-brand-gold transition-colors">
                      {settings.supportEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Operating Schedule
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{settings.operatingHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Security Guarantee
              </span>
              <p className="text-xs text-slate-400">
                All communications and commercial details are protected under standard non-disclosure
                and freight confidentiality agreements.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">Send an Inquiry</h2>

            {/* Success Feedback Alert */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold">Message Transmitted Successfully</p>
                  <p className="mt-0.5 text-xs text-emerald-700">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Feedback Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold">Unable to Send</p>
                  <p className="mt-0.5 text-xs text-rose-700">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Alexandra Miller"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Telephone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject / Service Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Rate Quote for Air Freight"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Message / Cargo Specifications <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Provide cargo dimensions, estimated weight, origin city, destination city, and any special handling requirements..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all resize-y"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="gold-gradient-btn px-8 py-3.5 rounded-xl text-brand-navy font-bold text-sm sm:text-base shadow-md inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
