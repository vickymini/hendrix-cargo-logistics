import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Plane,
  Ship,
  Truck,
  Package,
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Info,
  RotateCw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { trackShipment, DEMO_SHIPMENTS_MAP } from '../services/api';
import { PublicTrackingData } from '../types';
import { StatusBadge } from './StatusBadge';
import { CheckpointTimeline } from './CheckpointTimeline';

const PROGRESS_STAGES = [
  { key: 'Shipment Created', label: 'Booked & Manifested' },
  { key: 'Picked Up', label: 'Collected & Dispatched' },
  { key: 'In Transit', label: 'In Global Transit' },
  { key: 'Customs Clearance', label: 'Hub / Customs Clearance' },
  { key: 'Delivered', label: 'Final Handover' },
];

function getStageProgressIndex(status: string): number {
  switch (status) {
    case 'Shipment Created':
    case 'Processing':
      return 0;
    case 'Picked Up':
      return 1;
    case 'In Transit':
    case 'On Hold':
    case 'Delayed':
      return 2;
    case 'Arrived at Facility':
    case 'Customs Clearance':
    case 'Out for Delivery':
    case 'Delivery Attempted':
      return 3;
    case 'Delivered':
      return 4;
    default:
      return 1;
  }
}

export const InteractiveTrackingSection: React.FC = () => {
  const [trackingInput, setTrackingInput] = useState('HCL-2026-LON88942');
  const [shipment, setShipment] = useState<PublicTrackingData | null>(
    DEMO_SHIPMENTS_MAP['HCL-2026-LON88942']
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const handleTrackQuery = async (codeToTrack: string) => {
    const cleaned = codeToTrack.trim().toUpperCase();
    if (!cleaned) {
      setError('Please enter a valid Hendrix tracking number (e.g., HCL-2026-LON88942).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await trackShipment(cleaned);
      setShipment(data);
    } catch (err: unknown) {
      setShipment(null);
      setError(
        err instanceof Error
          ? err.message
          : `No consignment found matching "${cleaned}". Please verify your tracking number or select a demonstration shipment below.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt live database lookup on mount for the initial demonstration tracking code
    handleTrackQuery('HCL-2026-LON88942');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackQuery(trackingInput);
  };

  const handleSelectDemo = (code: string) => {
    setTrackingInput(code);
    handleTrackQuery(code);
  };

  const getMethodIcon = (method?: string) => {
    if (!method) return Package;
    if (method.toLowerCase().includes('sea')) return Ship;
    if (method.toLowerCase().includes('road')) return Truck;
    return Plane;
  };

  const MethodIcon = getMethodIcon(shipment?.shippingMethod);
  const currentStageIdx = shipment ? getStageProgressIndex(shipment.status) : 0;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Scheduled';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      id="tracking-console"
      className="relative z-30 -mt-6 sm:-mt-10 pb-16 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Interactive Shipment Tracking Console"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Top Navy Header Bar */}
        <div className="bg-brand-navy px-6 py-6 sm:px-10 sm:py-8 border-b border-brand-navy-surface relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span>Interactive Consignment Telemetry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Track Your Global Shipment
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">
                Enter an official Hendrix Cargo tracking number to inspect origin, destination, status
                milestones, and verified checkpoint logs.
              </p>
            </div>

            {/* Transparent API & Demo Data Notice Badge */}
            <div className="flex items-start sm:items-center gap-2.5 bg-brand-navy-surface/90 border border-brand-gold/30 rounded-2xl px-4 py-3 text-xs text-slate-200 max-w-md">
              <Info className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-brand-gold font-semibold">API-Ready Architecture:</strong>{' '}
                Connected to the Hendrix database &amp; ready for live carrier API credentials. Sample
                codes below display clearly labeled <em>demonstration tracking data</em>.
              </span>
            </div>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSubmit} className="relative z-10 mt-6">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white p-2 sm:p-2.5 rounded-2xl shadow-lg border border-slate-200 focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/30 transition-all">
              <div className="relative flex-grow flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => {
                    setTrackingInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter Tracking Number (e.g., HCL-2026-LON88942)"
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-slate-900 placeholder-slate-400 font-mono font-bold text-sm sm:text-base focus:outline-none uppercase tracking-wider"
                  aria-label="Tracking Number Input"
                />
                {trackingInput && (
                  <button
                    type="button"
                    onClick={() => setTrackingInput('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2.5 py-1 mr-1 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gold-gradient-btn px-8 py-3.5 rounded-xl text-brand-navy font-heading font-extrabold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <span>Track Shipment</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demonstration Shipment Selector Pills */}
          <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Demonstration Consignments:</span>
              </span>

              {[
                { code: 'HCL-2026-LON88942', label: 'Air Freight (London → New York)' },
                { code: 'HCL-2026-SIN44120', label: 'Sea Freight (Singapore → Rotterdam)' },
                { code: 'HCL-2026-BER77315', label: 'Road Freight (Berlin → Milan)' },
              ].map((demo) => {
                const isSelected = shipment?.trackingNumber === demo.code;
                return (
                  <button
                    key={demo.code}
                    type="button"
                    onClick={() => handleSelectDemo(demo.code)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-brand-gold text-brand-navy font-bold border-brand-gold shadow-sm'
                        : 'bg-brand-navy-surface/80 hover:bg-brand-navy-surface text-brand-gold-light hover:text-white border-brand-gold/30'
                    }`}
                  >
                    {demo.code} <span className="hidden md:inline font-sans opacity-80">• {demo.label}</span>
                  </button>
                );
              })}
            </div>

            <Link
              to="/track"
              className="text-xs font-semibold text-brand-gold hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Open Dedicated Tracking Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Tracking Output Body */}
        <div className="p-6 sm:p-10 bg-slate-50/60">
          {/* Error State */}
          {error && !loading && (
            <div className="bg-white rounded-2xl p-8 text-center border border-rose-200 shadow-sm max-w-2xl mx-auto space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900">
                Consignment Not Located
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{error}</p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectDemo('HCL-2026-LON88942')}
                  className="text-xs font-bold px-3.5 py-2 rounded-lg bg-brand-navy text-brand-gold hover:bg-brand-navy-light transition-colors"
                >
                  Load Demo Air Consignment (HCL-2026-LON88942)
                </button>
              </div>
            </div>
          )}

          {/* Active Shipment Interface */}
          {shipment && !error && (
            <div className="space-y-6 animate-fadeIn">
              {/* Demonstration Data Identification Banner */}
              {shipment.isDemoData && (
                <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-950 font-bold uppercase tracking-wider text-[10px]">
                      Demonstration Data
                    </span>
                    <span>
                      Displaying sample tracking record <strong>{shipment.trackingNumber}</strong> to
                      demonstrate Hendrix milestone telemetry and route visualization.
                    </span>
                  </div>
                  <Link
                    to={`/track/${shipment.trackingNumber}`}
                    className="font-bold text-brand-navy hover:text-brand-gold-dark underline flex-shrink-0"
                  >
                    View Printable Manifest →
                  </Link>
                </div>
              )}

              {/* Shipment Header Bar + Status Indicator */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center shadow-md">
                      <MethodIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                          Waybill / Tracking ID
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-semibold text-brand-gold-dark">
                          {shipment.shippingMethod}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-brand-navy font-mono tracking-wide">
                        {shipment.trackingNumber}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={shipment.status} size="lg" />
                    <Link
                      to={`/track/${shipment.trackingNumber}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-navy text-slate-700 hover:text-white text-xs font-bold transition-colors"
                    >
                      <span>Full Details &amp; Print</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Multi-Stage Visual Progress Bar */}
                <div className="py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {PROGRESS_STAGES.map((stage, idx) => {
                      const isCompleted = idx <= currentStageIdx;
                      const isCurrent = idx === currentStageIdx;
                      return (
                        <div
                          key={stage.key}
                          className={`p-3 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-brand-navy text-white border-brand-gold shadow-md'
                              : isCompleted
                              ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                              : 'bg-slate-50 border-slate-200/80 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-[10px] font-mono font-bold uppercase ${
                                isCurrent
                                  ? 'text-brand-gold'
                                  : isCompleted
                                  ? 'text-emerald-700'
                                  : 'text-slate-400'
                              }`}
                            >
                              Step 0{idx + 1}
                            </span>
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                isCurrent
                                  ? 'text-brand-gold'
                                  : isCompleted
                                  ? 'text-emerald-600'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>
                          <p
                            className={`text-xs font-heading font-bold ${
                              isCurrent ? 'text-white' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                            }`}
                          >
                            {stage.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Origin, Current Telemetry & Destination Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90">
                  {/* Origin Field */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Origin Terminal
                    </span>
                    <div className="flex items-center gap-2 text-brand-navy font-heading font-extrabold text-base sm:text-lg">
                      <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>
                        {shipment.origin.city}, {shipment.origin.country}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Dispatched: {formatDate(shipment.createdAt)}
                    </p>
                  </div>

                  {/* Current Checkpoint Location */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Last Recorded Facility
                    </span>
                    <div className="flex items-center gap-2 text-slate-800 font-heading font-bold text-sm sm:text-base">
                      <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span className="truncate" title={shipment.currentLocation}>
                        {shipment.currentLocation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Cargo: {shipment.package.pieces} pcs • {shipment.package.weightKg.toFixed(1)} kg
                    </p>
                  </div>

                  {/* Destination Field */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Destination Terminal
                    </span>
                    <div className="flex items-center gap-2 text-brand-navy font-heading font-extrabold text-base sm:text-lg">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        {shipment.destination.city}, {shipment.destination.country}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Est. Delivery: {formatDate(shipment.estimatedDeliveryDate)}</span>
                    </p>
                  </div>
                </div>

                {/* Expandable / Interactive Journey Timeline */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-gold" />
                      <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                        Shipment Journey Timeline ({shipment.checkpoints.length} Verified Checkpoints)
                      </h4>
                    </div>
                    {shipment.checkpoints.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setShowFullTimeline((prev) => !prev)}
                        className="text-xs font-bold text-brand-navy hover:text-brand-gold-dark cursor-pointer"
                      >
                        {showFullTimeline
                          ? 'Show Compact Timeline'
                          : `Show All ${shipment.checkpoints.length} Checkpoints`}
                      </button>
                    )}
                  </div>

                  <CheckpointTimeline
                    checkpoints={
                      showFullTimeline ? shipment.checkpoints : shipment.checkpoints.slice(0, 2)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

