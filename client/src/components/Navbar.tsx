import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Menu,
  X,
  Search,
  PhoneCall,
  ArrowUpRight,
  Globe,
  FileText,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Shipping Solutions', href: '/#shipping-solutions' },
    { name: 'Track Shipment', href: '/track' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.slice(1);
    }
    return location.pathname === path;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (href === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const quoteEl = document.getElementById('quote');
      if (quoteEl) {
        e.preventDefault();
        quoteEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'glass-navy border-b border-brand-gold/20 shadow-2xl'
          : 'bg-brand-navy border-b border-brand-navy-surface shadow-lg'
        }`}
    >
      {/* Top Executive Micro Bar */}
      <div className="hidden lg:block bg-brand-navy-dark/95 text-slate-300 py-2 px-6 border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Global Cargo & Multimodal Freight Dispatch Operational 24/7
            </span>
            <span className="text-slate-700">|</span>
            <a
              href="tel:+18005554252"
              className="flex items-center gap-1.5 text-slate-300 hover:text-brand-gold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span>Support Desk: +1 (800) 555-HCL2</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>International Freight Forwarding</span>
            </span>
            <span className="text-slate-700">|</span>
            <Link
              to="/admin"
              className="text-slate-300 hover:text-brand-gold transition-colors flex items-center gap-1.5 font-medium"
            >
              <Shield className="w-3.5 h-3.5 text-brand-gold" />
              <span>Staff & Dispatch Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3.5 group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark p-[2px] shadow-gold-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-brand-navy flex items-center justify-center relative overflow-hidden">
                <span className="font-heading font-extrabold text-brand-gold text-xl tracking-tight">
                  H
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-white text-xl tracking-wider group-hover:text-brand-gold transition-colors leading-none">
                HENDRIX
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-brand-gold mt-1">
                Cargo & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active
                      ? 'text-brand-gold bg-brand-navy-surface/90 shadow-inner font-semibold'
                      : 'text-slate-200 hover:text-brand-gold hover:bg-brand-navy-surface/50'
                    }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/track"
              className="px-4 py-2.5 rounded-xl bg-brand-navy-surface/90 hover:bg-brand-navy-light/60 border border-slate-700/80 hover:border-brand-gold/50 text-slate-100 hover:text-brand-gold font-semibold text-xs lg:text-sm transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-gold" />
              <span>Track Cargo</span>
            </Link>
            <Link
              to="/contact?quote=true"
              onClick={handleQuoteClick}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl text-brand-navy font-bold text-xs lg:text-sm shadow-md flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-brand-navy stroke-[2.25]" />
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 text-brand-navy stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile Action & Hamburger Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/track"
              className="md:hidden p-2.5 text-brand-gold bg-brand-navy-surface border border-slate-700/80 rounded-xl"
              title="Track Shipment"
              aria-label="Track Shipment"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-200 hover:text-brand-gold bg-brand-navy-surface border border-slate-700/80 rounded-xl focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-navy-dark/98 backdrop-blur-xl border-b border-brand-gold/20 px-4 pt-3 pb-7 space-y-3 animate-fadeIn shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${active
                      ? 'text-brand-gold bg-brand-navy-surface border border-brand-gold/30 font-semibold'
                      : 'text-slate-200 hover:text-brand-gold hover:bg-brand-navy-surface/60'
                    }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-brand-gold' : 'text-slate-500'}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/contact?quote=true"
              onClick={handleQuoteClick}
              className="w-full gold-gradient-btn py-3.5 px-4 rounded-xl text-brand-navy font-bold text-center flex items-center justify-center gap-2 shadow-md text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Request a Quote</span>
            </Link>
            <Link
              to="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-navy-surface border border-slate-700 text-white hover:text-brand-gold font-semibold text-center flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <Search className="w-4 h-4 text-brand-gold" />
              <span>Track Shipment</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs text-slate-400">
            <a href="tel:+18005554252" className="flex items-center gap-1.5 hover:text-brand-gold">
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span>+1 (800) 555-HCL2</span>
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-brand-gold flex items-center gap-1.5 font-medium"
            >
              <Shield className="w-3.5 h-3.5 text-brand-gold" />
              <span>Staff & Dispatch Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
