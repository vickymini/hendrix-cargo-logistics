import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-navy-surface text-brand-gold flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
            Route Not Located
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            The page or cargo resource you are attempting to access does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/track"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 hover:border-brand-gold text-slate-700 hover:text-brand-navy text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4 text-brand-gold" />
            <span>Track Cargo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
