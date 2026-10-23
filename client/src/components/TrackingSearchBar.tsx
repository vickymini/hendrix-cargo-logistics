import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

interface TrackingSearchBarProps {
  initialValue?: string;
  size?: 'default' | 'large';
  showSamples?: boolean;
}

export const TrackingSearchBar: React.FC<TrackingSearchBarProps> = ({
  initialValue = '',
  size = 'default',
  showSamples = true,
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = trackingNumber.trim().toUpperCase();

    if (!cleaned) {
      setError('Please enter a tracking number.');
      return;
    }

    setError(null);
    navigate(`/track/${encodeURIComponent(cleaned)}`);
  };

  const handleSampleClick = (code: string) => {
    setTrackingNumber(code);
    setError(null);
    navigate(`/track/${encodeURIComponent(code)}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div
          className={`flex flex-col sm:flex-row items-stretch gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xl transition-all focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/30 ${
            size === 'large' ? 'sm:p-3' : 'sm:p-2'
          }`}
        >
          <div className="relative flex-grow flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter Tracking Number (e.g., HCL-2026-LON88942)"
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-slate-900 placeholder-slate-400 font-medium text-base sm:text-lg focus:outline-none uppercase tracking-wider"
              aria-label="Shipment Tracking Number"
            />
          </div>
          <button
            type="submit"
            className="gold-gradient-btn px-8 py-3.5 rounded-lg text-brand-navy font-bold text-base shadow-md flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Track Cargo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {error && (
          <p className="mt-2 text-rose-500 text-xs sm:text-sm font-medium px-2">{error}</p>
        )}
      </form>

      {showSamples && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            Quick Test Shipments:
          </span>
          <button
            type="button"
            onClick={() => handleSampleClick('HCL-2026-LON88942')}
            className="bg-brand-navy/60 hover:bg-brand-navy text-brand-gold-light hover:text-white px-2.5 py-1 rounded-md border border-brand-gold/30 transition-all font-mono"
          >
            HCL-2026-LON88942 (Air Freight)
          </button>
          <button
            type="button"
            onClick={() => handleSampleClick('HCL-2026-SIN44120')}
            className="bg-brand-navy/60 hover:bg-brand-navy text-brand-gold-light hover:text-white px-2.5 py-1 rounded-md border border-brand-gold/30 transition-all font-mono"
          >
            HCL-2026-SIN44120 (Sea Freight)
          </button>
          <button
            type="button"
            onClick={() => handleSampleClick('HCL-2026-BER77315')}
            className="bg-brand-navy/60 hover:bg-brand-navy text-brand-gold-light hover:text-white px-2.5 py-1 rounded-md border border-brand-gold/30 transition-all font-mono"
          >
            HCL-2026-BER77315 (Road Transport)
          </button>
        </div>
      )}
    </div>
  );
};
