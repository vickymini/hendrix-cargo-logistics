import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Send,
  Globe,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newsletterEmail.trim();
    if (!cleaned || !cleaned.includes('@') || !cleaned.includes('.')) {
      setNewsletterError('Please enter a valid business or personal email address.');
      return;
    }
    setNewsletterError(null);
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-brand-navy-dark text-slate-300 border-t border-brand-navy-surface pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Trade Advisory Subscription Bar */}
        <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navy-surface to-brand-navy border border-brand-gold/25 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                <Globe className="w-3.5 h-3.5" />
                <span>Maritime, Aviation &amp; Customs Intelligence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Subscribe to Hendrix Trade &amp; Logistics Advisories
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                Receive freight routing updates, international customs compliance notices, and port
                schedule advisories directly in your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-white">Subscription Confirmed</p>
                    <p className="text-emerald-300 text-xs">
                      You are now registered for Hendrix Cargo &amp; Logistics trade updates.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5 bg-brand-navy-dark/90 p-2 rounded-2xl border border-slate-700/80 focus-within:border-brand-gold transition-colors">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError(null);
                      }}
                      placeholder="Enter your corporate email..."
                      className="flex-grow px-4 py-2.5 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                      aria-label="Email address for newsletter subscription"
                    />
                    <button
                      type="submit"
                      className="gold-gradient-btn px-6 py-2.5 rounded-xl text-brand-navy font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-xs text-rose-400 pl-2">{newsletterError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark flex items-center justify-center shadow-gold-glow">
                <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
                  <span className="font-heading font-extrabold text-brand-gold text-lg">H</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-white text-lg tracking-wide leading-none">
                  HENDRIX
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.22em] text-brand-gold mt-1">
                  Cargo &amp; Logistics
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Moving Your World, One Shipment at a Time. Reliable cargo, freight, and global supply
              chain solutions connecting businesses and individuals worldwide.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-surface border border-slate-800 text-xs text-brand-gold">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Authorized Freight Operations</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-brand-gold">
              Freight &amp; Logistics Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Sea Freight', href: '/services#sea-freight' },
                { name: 'Air Freight', href: '/services#air-freight' },
                { name: 'Road Freight', href: '/services#road-transportation' },
                { name: 'International Cargo', href: '/services#international-shipping' },
                { name: 'Import and Export', href: '/services#import-export' },
                { name: 'Customs Clearance', href: '/services#customs-clearance' },
                { name: 'Warehousing & Distribution', href: '/services#warehousing' },
                { name: 'Door-to-Door Delivery', href: '/services#door-to-door' },
              ].map((svc) => (
                <li key={svc.name}>
                  <Link
                    to={svc.href}
                    className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-brand-gold">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-gold transition-colors text-slate-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors text-slate-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-brand-gold transition-colors text-slate-300"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/#shipping-solutions"
                  className="hover:text-brand-gold transition-colors text-slate-300"
                >
                  Shipping Solutions &amp; Corridors
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className="hover:text-brand-gold transition-colors font-semibold text-white flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span>Track Shipment</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-gold transition-colors text-slate-300"
                >
                  Contact Us &amp; Request a Quote
                </Link>
              </li>
              <li>
                <Link
                  to="/#faqs"
                  className="hover:text-brand-gold transition-colors text-slate-300"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-brand-gold transition-colors text-slate-400"
                >
                  Staff &amp; Dispatch Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-brand-gold">
              Global Dispatch Desk
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>Hendrix Logistics Terminal, Global Cargo District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="tel:+18005554252" className="hover:text-brand-gold font-mono">
                  +1 (800) 555-HCL2
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a
                  href="mailto:support@hendrixcargo.com"
                  className="hover:text-brand-gold transition-colors"
                >
                  support@hendrixcargo.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-relaxed">
                  Mon – Fri: 08:00 – 18:00 (GMT)
                  <br />
                  24/7 International Cargo Tracking
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Bar */}
        <div className="pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Hendrix Cargo &amp; Logistics. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Data Privacy &amp; Sanitization Policy
            </Link>
            <Link to="/services" className="hover:text-slate-200 transition-colors">
              Terms of Carriage
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Cargo Security Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
