import React, { useState } from 'react';
import {
  Ship,
  Plane,
  Truck,
  Globe2,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { submitContact } from '../services/api';

const FREIGHT_MODES = [
  { id: 'Sea Freight', label: 'Sea Freight (FCL / LCL)', icon: Ship },
  { id: 'Air Freight', label: 'Air Freight (Express / Charter)', icon: Plane },
  { id: 'Road Freight', label: 'Road Freight (FTL / LTL)', icon: Truck },
  { id: 'Multimodal / Door-to-Door', label: 'Multimodal / Door-to-Door', icon: Globe2 },
];

export const QuoteRequestSection: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('Sea Freight');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    weightKg: '',
    cargoDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.origin.trim() ||
      !formData.destination.trim() ||
      !formData.cargoDetails.trim()
    ) {
      setErrorMsg('Please complete all required route and contact fields.');
      setLoading(false);
      return;
    }

    const subject = `Freight Quote Request: ${selectedMode} (${formData.origin.trim()} to ${formData.destination.trim()})`;
    const structuredMessage = [
      `[FREIGHT QUOTATION REQUEST]`,
      `Service Mode: ${selectedMode}`,
      `Origin: ${formData.origin.trim()}`,
      `Destination: ${formData.destination.trim()}`,
      `Estimated Weight: ${formData.weightKg.trim() ? `${formData.weightKg.trim()} kg` : 'Not specified'}`,
      `Cargo Specifications & Instructions:`,
      formData.cargoDetails.trim(),
    ].join('\n');

    try {
      const res = await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject,
        message: structuredMessage,
      });

      setSuccessMsg(
        res.message ||
          'Your quotation request has been logged with our freight dispatch desk. A specialist will respond shortly.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        origin: '',
        destination: '',
        weightKg: '',
        cargoDetails: '',
      });
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to submit quotation request. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote"
      className="py-20 lg:py-28 bg-brand-navy text-white relative overflow-hidden border-t border-brand-navy-surface"
    >
      {/* Decorative Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-navy-light/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Dispatch & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold">
                <Package className="w-3.5 h-3.5" />
                <span>Custom Freight Quotation &amp; Support</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
                Request a Tailored <span className="gold-gradient-text">Cargo Quote</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Submit your origin, destination, and cargo specifications. Our logistics planners
                calculate optimal multimodal routing, customs clearance requirements, and transparent
                freight tariffs.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="bg-brand-navy-dark/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h3 className="font-heading font-bold text-white text-lg border-b border-slate-800 pb-3">
                Global Dispatch &amp; Customer Desk
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Operations Terminal
                    </span>
                    <span className="text-white font-medium">
                      Hendrix Logistics Terminal, Global Cargo District
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      24/7 Telephone Dispatch
                    </span>
                    <a
                      href="tel:+18005554252"
                      className="text-white hover:text-brand-gold font-mono font-semibold transition-colors"
                    >
                      +1 (800) 555-HCL2
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Freight Quotes &amp; Support Email
                    </span>
                    <a
                      href="mailto:support@hendrixcargo.com"
                      className="text-white hover:text-brand-gold transition-colors"
                    >
                      support@hendrixcargo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Operating Hours
                    </span>
                    <span className="text-slate-300 text-xs">
                      Mon – Fri: 08:00 – 18:00 (GMT) • 24/7 Cargo Tracking
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>
                  All commercial manifest inquiries are protected under strict shipper confidentiality.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-extrabold text-brand-navy">
                Freight Rate &amp; Routing Specification Form
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Select your preferred transport mode and provide shipment parameters below.
              </p>
            </div>

            {/* Mode Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {FREIGHT_MODES.map((m) => {
                const Icon = m.icon;
                const active = selectedMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMode(m.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mb-1.5 ${active ? 'text-brand-gold' : 'text-slate-500'}`}
                    />
                    <span className="block text-xs font-heading font-bold leading-snug">
                      {m.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Quotation Request Registered</p>
                  <p className="mt-0.5 text-emerald-800">{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Submission Error</p>
                  <p className="mt-0.5 text-rose-800">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="quote-name"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Full Name / Company <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Marcus Vance"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Corporate Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-phone"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Route & Weight Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="quote-origin"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Origin City / Port <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-origin"
                    name="origin"
                    type="text"
                    required
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g., London, UK"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-destination"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Destination City / Port <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quote-destination"
                    name="destination"
                    type="text"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., New York, USA"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-weight"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Est. Gross Weight (kg)
                  </label>
                  <input
                    id="quote-weight"
                    name="weightKg"
                    type="text"
                    value={formData.weightKg}
                    onChange={handleChange}
                    placeholder="e.g., 450 kg or 1x 20ft FCL"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Cargo Description */}
              <div>
                <label
                  htmlFor="quote-details"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Cargo Description, Dimensions &amp; Handling Requirements{' '}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="quote-details"
                  name="cargoDetails"
                  rows={4}
                  required
                  value={formData.cargoDetails}
                  onChange={handleChange}
                  placeholder="Describe commodity type, package count, dimensions (L x W x H), Incoterms, or temperature/customs requirements..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-all resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Direct submission to Hendrix Dispatch &amp; Rate Engineering Desk.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="gold-gradient-btn px-8 py-4 rounded-xl text-brand-navy font-heading font-extrabold text-sm sm:text-base shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Request...' : 'Submit Quotation Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

