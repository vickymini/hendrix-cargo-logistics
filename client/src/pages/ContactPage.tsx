import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { submitContact, getCompanySettings } from '../services/api';
import { CompanySettingsMap } from '../types';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const quoteParam = searchParams.get('quote');

  const [settings, setSettings] = useState<CompanySettingsMap>({
    companyName: 'Hendrix Cargo & Logistics',
    companyHeadline: 'Moving Your World, One Shipment at a Time.',
    companyTagline:
      'Reliable cargo, freight, and logistics solutions connecting businesses and individuals across the globe.',
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
    origin: '',
    destination: '',
    subject: serviceParam
      ? `Freight Quote Inquiry: ${serviceParam}`
      : quoteParam
      ? 'Custom Freight Quotation Request'
      : '',
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage('Please complete all required fields.');
      setLoading(false);
      return;
    }

    const routePrefix =
      formData.origin.trim() || formData.destination.trim()
        ? `[Route: ${formData.origin.trim() || 'TBD'} -> ${formData.destination.trim() || 'TBD'}]\n`
        : '';

    try {
      const res = await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject.trim(),
        message: `${routePrefix}${formData.message.trim()}`,
      });
      setSuccessMessage(
        res.message || 'Your inquiry was received. Our dispatch specialists will respond promptly.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        origin: '',
        destination: '',
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
    <div className="bg-slate-50 min-h-screen">
      {/* Executive Header Banner */}
      <div className="bg-brand-navy text-white py-16 lg:py-20 border-b border-brand-navy-surface relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Assistance &amp; Freight Quotations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Contact Our Logistics Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Request a tailored sea, air, or road freight quotation, or connect with our 24/7
            dispatch desk regarding an active consignment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-brand-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-navy-surface space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold text-white">Global Dispatch Desk</h2>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Reach our customer service desk directly or submit a structured quotation inquiry
                using the form.
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
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
                <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
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
                <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Electronic Mail
                  </h4>
                  <p className="text-xs text-slate-300">
                    <a
                      href={`mailto:${settings.supportEmail}`}
                      className="hover:text-brand-gold transition-colors"
                    >
                      {settings.supportEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-slate-700 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-0.5">
                    Operating Schedule
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {settings.operatingHours}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                All communications and commercial manifest details are protected under standard
                non-disclosure and freight confidentiality agreements.
              </p>
            </div>
          </div>

          {/* Contact & Quotation Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-heading font-extrabold text-brand-navy mb-2">
              Send an Inquiry or Quote Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Complete the fields below and our logistics team will respond promptly.
            </p>

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
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
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
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
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
                  <label
                    htmlFor="subject"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Subject / Service Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Rate Quote for Sea Freight"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Optional Origin & Destination Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="origin"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Origin City / Port (Optional)
                  </label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g., Singapore / London"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Destination City / Port (Optional)
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., Rotterdam / New York"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Detailed Message / Cargo Specifications <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Provide cargo dimensions, estimated weight, preferred shipping mode, and any special handling requirements..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-gold focus:bg-white transition-all resize-y"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="gold-gradient-btn px-8 py-4 rounded-xl text-brand-navy font-heading font-extrabold text-sm sm:text-base shadow-md inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
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
