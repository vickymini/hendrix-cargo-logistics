import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Award,
  ArrowRight,
  Clock,
  Headphones,
  Globe2,
  Lock,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Reliable Logistics Solutions',
      desc: 'Structured multimodal scheduling across sea, air, and overland freight corridors.',
      icon: ShieldCheck,
    },
    {
      title: 'Professional Cargo Handling',
      desc: 'Disciplined container loading, palletization, and specialized freight care.',
      icon: Award,
    },
    {
      title: 'Efficient Transportation',
      desc: 'Direct carrier coordination designed to minimize port and terminal dwell time.',
      icon: Clock,
    },
    {
      title: 'Customer-Focused Service',
      desc: 'Dedicated dispatch communication and tailored quotation engineering.',
      icon: Headphones,
    },
    {
      title: 'International Shipping Support',
      desc: 'Comprehensive Bill of Lading, export/import filing, and customs clearance.',
      icon: Globe2,
    },
    {
      title: 'Secure Cargo Management',
      desc: 'Database-backed tracking paired with strict public consignee privacy masking.',
      icon: Lock,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Executive Hero Banner */}
      <div className="bg-brand-navy text-white py-16 lg:py-24 border-b border-brand-navy-surface relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Identity &amp; Operational Charter</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Connecting Global Trade with Dependability &amp; Precision
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hendrix Cargo &amp; Logistics was built on a clear principle: international freight
            forwarding must be transparent, dependable, and managed with uncompromising discipline.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20">
        {/* Narrative & Photography Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
              Corporate Overview
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
              Moving Your World, One Shipment at a Time
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In modern global commerce, logistics is far more than moving containers—it is the
              vital infrastructure enabling businesses to fulfill international contracts and
              communities to receive essential goods.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We operate an integrated freight coordination platform linking ocean carriers, air
              cargo fleets, regional road transport operators, and customs clearance specialists
              into one synchronized workflow.
            </p>
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
              <div>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                  100%
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Database Tracking</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                  24/7
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Dispatch Portal</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                  8
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Core Freight Divisions</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-72 sm:h-80 relative">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=85"
                alt="Hendrix Maritime & Port Logistics"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-brand-gold block">
                  Global Freight Coordination
                </span>
                <p className="text-sm font-heading font-bold">
                  Synchronized Maritime, Aviation &amp; Overland Supply Chains
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Our Core Mission</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To provide secure, punctual, and transparent cargo transportation that empowers
                  commerce across international borders without friction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  Data Integrity First
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  We never fabricate telemetry or unverified statistics. Every tracking checkpoint
                  reflects an authenticated staff record or clearly labeled demonstration sample.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Value Propositions */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
              Why Choose Hendrix
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-brand-navy">
              Six Pillars of Hendrix Cargo Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-gold/60 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-brand-navy text-lg">{p.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-brand-navy-surface shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Ready to Partner with Hendrix Cargo &amp; Logistics?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light">
            Whether you require single-consignment forwarding or ongoing commercial freight
            coordination, our specialists are ready to assist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="gold-gradient-btn px-8 py-3.5 rounded-xl text-brand-navy font-bold text-sm sm:text-base shadow-md inline-flex items-center gap-2"
            >
              <span>Request a Quote / Contact Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-6 py-3.5 rounded-xl bg-brand-navy-surface hover:bg-brand-navy-light text-white font-medium text-sm transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
