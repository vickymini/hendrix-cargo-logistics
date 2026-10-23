import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold-dark">
            Our Identity & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-navy">
            Connecting Global Trade with Dependability & Precision
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hendrix Cargo & Logistics was founded on a straightforward principle: cargo forwarding
            must be transparent, dependable, and handled with meticulous discipline.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy">
              Moving Your World, One Shipment at a Time
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In modern global commerce, logistics is not just about moving boxes—it is the lifeline
              enabling businesses to fulfill critical contracts and families to receive essential goods.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We operate an integrated freight coordination service linking verified air carriers, ocean
              lines, regional road freight operators, and licensed customs brokers into one synchronized
              workflow.
            </p>
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <span className="text-2xl font-heading font-extrabold text-brand-navy">100%</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Real Database Tracking</p>
              </div>
              <div>
                <span className="text-2xl font-heading font-extrabold text-brand-navy">24/7</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Operational Dispatch</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-slate-900 text-base">Our Core Mission</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  To provide secure, punctual, and transparent freight and cargo transportation that
                  empowers commerce across international borders without friction.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold-dark flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-slate-900 text-base">Honesty & Data Integrity</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  We never fabricate shipment events or claim automated GPS telemetry that does not exist.
                  Every milestone checkpoint represents a genuine physical handling scan or authorized
                  staff record.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-slate-900 text-base">Client Confidentiality</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Protecting shipper and consignee privacy is central to our values. Public tracking records
                  are strictly sanitized to prevent sensitive contact details from being exposed online.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-brand-navy-surface">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Ready to Partner with Hendrix Logistics?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light">
            Whether you require one-time cargo forwarding or scheduled enterprise freight contracts, our
            specialists are standing by to coordinate your shipment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="gold-gradient-btn px-8 py-3.5 rounded-lg text-brand-navy font-bold text-sm sm:text-base shadow-md inline-flex items-center gap-2"
            >
              <span>Connect with Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-6 py-3.5 rounded-lg bg-brand-navy-surface hover:bg-brand-navy-surface/80 text-white font-medium text-sm transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
