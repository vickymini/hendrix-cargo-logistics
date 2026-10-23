import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Search, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tracking', href: '/track' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-navy border-b border-brand-navy-surface shadow-lg">
      {/* Top micro bar for global assistance */}
      <div className="hidden lg:block bg-brand-navy-dark text-slate-300 py-1.5 px-6 border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Global Cargo & Air Freight Dispatch Operational 24/7
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              Customer Support Desk: +1 (800) 555-HCL2
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-slate-400 hover:text-brand-gold transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-brand-gold" />
              Staff & Dispatch Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark flex items-center justify-center shadow-gold-glow">
              <div className="w-9 h-9 rounded-md bg-brand-navy flex items-center justify-center">
                <span className="font-heading font-extrabold text-brand-gold text-xl tracking-tight">H</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-white text-xl tracking-wide group-hover:text-brand-gold transition-colors">
                HENDRIX
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold">
                Cargo & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive(link.href)
                    ? 'text-brand-gold bg-brand-navy-surface shadow-inner'
                    : 'text-slate-200 hover:text-brand-gold hover:bg-brand-navy-surface/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/track"
              className="gold-gradient-btn px-5 py-2.5 rounded-lg text-brand-navy font-bold text-sm shadow-md flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-navy stroke-[2.5]" />
              Track Cargo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/track"
              className="p-2 text-brand-gold bg-brand-navy-surface rounded-lg"
              title="Track Cargo"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-brand-navy-surface rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy-dark border-b border-brand-navy-surface px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.href)
                  ? 'text-brand-gold bg-brand-navy-surface'
                  : 'text-slate-200 hover:text-brand-gold hover:bg-brand-navy-surface/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              to="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full gold-gradient-btn py-3 rounded-lg text-brand-navy font-bold text-center block shadow-md"
            >
              Track Your Shipment
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-slate-300 hover:text-brand-gold py-2 text-center text-sm flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-brand-gold" />
              Staff Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
