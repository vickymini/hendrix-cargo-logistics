import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Package,
  Plane,
  ShieldCheck,
  AlertCircle,
  RotateCw,
  Printer,
  CheckCircle,
} from 'lucide-react';
import { trackShipment } from '../services/api';
import { PublicTrackingData } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { CheckpointTimeline } from '../components/CheckpointTimeline';
import { TrackingSearchBar } from '../components/TrackingSearchBar';

export const TrackingPage: React.FC = () => {
  const { trackingNumber: routeParam } = useParams<{ trackingNumber?: string }>();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('number');

  const activeTrackingNumber = routeParam || queryParam || '';

  const [shipment, setShipment] = useState<PublicTrackingData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTrackingNumber) {
      setShipment(null);
      setError(null);
      return;
    }

    async function fetchTracking() {
      setLoading(true);
      setError(null);

      try {
        const data = await trackShipment(activeTrackingNumber);
        setShipment(data);
      } catch (err: unknown) {
        setShipment(null);
        setError(
          err instanceof Error
            ? err.message
            : `No shipment found matching tracking number "${activeTrackingNumber}". Please check the number and try again.`
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTracking();
  }, [activeTrackingNumber]);

  // Format date helper
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Pending Schedule';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Search Banner */}
        <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-brand-navy-surface">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
              Live Consignment Tracking
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Track Your Cargo & Freight
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-light">
              Enter your official Hendrix tracking number below for real database-verified transit status.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <TrackingSearchBar initialValue={activeTrackingNumber} showSamples={true} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200 space-y-4">
            <RotateCw className="w-10 h-10 text-brand-gold animate-spin mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-800">
              Querying Tracking Records...
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Retrieving verified consignment checkpoints for {activeTrackingNumber}
            </p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-rose-200 space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Shipment Record Not Found
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">{error}</p>
            <div className="pt-2 text-xs text-slate-400">
              <span>Standard Format: </span>
              <code className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                HCL-2026-XXXXXXXX
              </code>
            </div>
          </div>
        )}

        {/* Real Tracking Result */}
        {!loading && shipment && (
          <div className="space-y-8 animate-fadeIn">
            {/* Shipment Overview Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Official Tracking Number
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy font-mono tracking-wide">
                      {shipment.trackingNumber}
                    </h2>
                    <StatusBadge status={shipment.status} size="lg" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Print Receipt</span>
                  </button>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Cargo</span>
                  </span>
                </div>
              </div>

              {/* Origin -> Destination Route Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                {/* Origin */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Origin Point
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 font-heading font-bold text-lg">
                    <MapPin className="w-4 h-4 text-brand-navy" />
                    <span>
                      {shipment.origin.city}, {shipment.origin.country}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Booked:{' '}
                    {new Date(shipment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Shipping Method / Current Location */}
                <div className="space-y-1 md:border-x md:border-slate-200 md:px-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Shipping Method & Location
                  </span>
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
                    <Plane className="w-4 h-4 text-brand-gold" />
                    <span>{shipment.shippingMethod}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium truncate" title={shipment.currentLocation}>
                    At: {shipment.currentLocation}
                  </p>
                </div>

                {/* Destination */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Destination Point
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 font-heading font-bold text-lg">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>
                      {shipment.destination.city}, {shipment.destination.country}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Recipient: {shipment.destination.recipientMasked}
                  </p>
                </div>
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block mb-1">Estimated Delivery</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{formatDate(shipment.estimatedDeliveryDate)}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block mb-1">Package Pieces</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                    <Package className="w-3.5 h-3.5 text-brand-navy" />
                    <span>{shipment.package.pieces} Unit(s)</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block mb-1">Total Weight</span>
                  <div className="font-bold text-slate-800 text-sm">
                    {shipment.package.weightKg.toFixed(1)} kg
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block mb-1">Last Updated</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {new Date(shipment.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoint Timeline Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    Chronological Transit Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verified milestone checkpoints logged by authorized dispatch hubs
                  </p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  {shipment.checkpoints.length} Milestone(s)
                </span>
              </div>

              <CheckpointTimeline checkpoints={shipment.checkpoints} />
            </div>

            {/* Privacy Protection Notice */}
            <div className="bg-slate-100 rounded-xl p-4 text-xs text-slate-500 flex items-start gap-2 border border-slate-200">
              <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Data Privacy Safeguard:</strong> In compliance with international freight privacy
                standards, private street addresses, personal telephone numbers, and internal staff cargo
                notes are withheld from public search results.
              </span>
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {!loading && !shipment && !error && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-700">
              Ready to Track Your Consignment
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Please enter your tracking number above or click one of the quick test shipments to view
              the real-time progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
