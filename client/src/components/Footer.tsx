import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy-dark text-slate-300 border-t border-brand-navy-surface pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark flex items-center justify-center shadow-gold-glow">
                <div className="w-8 h-8 rounded-md bg-brand-navy flex items-center justify-center">
                  <span className="font-heading font-extrabold text-brand-gold text-lg">H</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-white text-lg tracking-wide">
                  HENDRIX
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                  Cargo & Logistics
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Moving Your World, One Shipment at a Time. Reliable cargo, freight, and global supply chain
              solutions connecting businesses and individuals worldwide.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-surface border border-slate-800 text-xs text-brand-gold">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Authorized Freight Operations</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-heading font-bold text-base tracking-wide uppercase mb-4 text-brand-gold">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services#air-freight" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Air Freight
                </Link>
              </li>
              <li>
                <Link to="/services#sea-freight" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Sea Freight
                </Link>
              </li>
              <li>
                <Link to="/services#road-transportation" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Road Transportation
                </Link>
              </li>
              <li>
                <Link to="/services#international-shipping" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> International Shipping
                </Link>
              </li>
              <li>
                <Link to="/services#import-export" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Import and Export Logistics
                </Link>
              </li>
              <li>
                <Link to="/services#warehousing" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Warehousing
                </Link>
              </li>
              <li>
                <Link to="/services#door-to-door" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Door-to-Door Delivery
                </Link>
              </li>
              <li>
                <Link to="/services#business-logistics" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" /> Business Logistics Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-heading font-bold text-base tracking-wide uppercase mb-4 text-brand-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-gold transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-brand-gold transition-colors font-medium text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-gold"></span> Track Shipment
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors">
                  About Hendrix Logistics
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold transition-colors">
                  Customer Support & Quotes
                </Link>
              </li>
              <li>
                <Link to="/#faqs" className="hover:text-brand-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-gold transition-colors text-slate-400">
                  Staff Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch */}
          <div>
            <h4 className="text-white font-heading font-bold text-base tracking-wide uppercase mb-4 text-brand-gold">
              Contact & Inquiries
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>Hendrix Logistics Terminal, Global Cargo District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>+1 (800) 555-HCL2</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="mailto:support@hendrixcargo.com" className="hover:text-white transition-colors">
                  support@hendrixcargo.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs">Mon - Fri: 08:00 - 18:00 (GMT)<br />24/7 International Cargo Tracking</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Hendrix Cargo & Logistics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-slate-300 cursor-pointer">Cargo Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
