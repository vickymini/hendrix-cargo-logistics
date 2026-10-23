import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Package,
  PlusCircle,
  Save,
  RotateCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import {
  adminGetShipment,
  adminUpdateShipment,
  adminAddCheckpoint,
} from '../services/api';
import { AdminShipment, ShipmentStatus, CheckpointItem } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { CheckpointTimeline } from '../components/CheckpointTimeline';

export const AdminShipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [shipment, setShipment] = useState<AdminShipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Status & Date Quick Form
  const [status, setStatus] = useState<ShipmentStatus>('Shipment Created');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [updatingShipment, setUpdatingShipment] = useState(false);

  // New Checkpoint Modal / Form State
  const [showAddCheckpoint, setShowAddCheckpoint] = useState(false);
  const [cpStatus, setCpStatus] = useState<ShipmentStatus>('In Transit');
  const [cpLocation, setCpLocation] = useState('');
  const [cpDescription, setCpDescription] = useState('');
  const [cpUpdateStatus, setCpUpdateStatus] = useState(true);
  const [submittingCheckpoint, setSubmittingCheckpoint] = useState(false);

  const statuses: ShipmentStatus[] = [
    'Shipment Created',
    'Processing',
    'Picked Up',
    'In Transit',
    'Arrived at Facility',
    'Customs Clearance',
    'Out for Delivery',
    'Delivered',
    'Delivery Attempted',
    'On Hold',
    'Delayed',
    'Returned to Sender',
    'Cancelled',
  ];

  const fetchShipment = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await adminGetShipment(id);
      setShipment(data);
      setStatus(data.status);
      setCurrentLocation(data.currentLocation || '');
      setInternalNotes(data.internalNotes || '');
      if (data.estimatedDeliveryDate) {
        setEstimatedDelivery(new Date(data.estimatedDeliveryDate).toISOString().split('T')[0]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load shipment details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setUpdatingShipment(true);
    setFeedback(null);
    setError(null);

    try {
      const updated = await adminUpdateShipment(id, {
        status,
        currentLocation,
        internalNotes,
        estimatedDeliveryDate: estimatedDelivery ? new Date(estimatedDelivery).toISOString() : null,
      });

      setShipment(updated);
      setFeedback('Shipment parameters updated successfully.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update shipment');
    } finally {
      setUpdatingShipment(false);
    }
  };

  const handleAddCheckpoint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!cpLocation.trim() || !cpDescription.trim()) {
      alert('Location and description are required for checkpoints.');
      return;
    }

    setSubmittingCheckpoint(true);
    setError(null);

    try {
      await adminAddCheckpoint(id, {
        status: cpStatus,
        location: cpLocation.trim(),
        description: cpDescription.trim(),
        updateShipmentStatus: cpUpdateStatus,
      });

      setShowAddCheckpoint(false);
      setCpLocation('');
      setCpDescription('');
      setFeedback('Milestone checkpoint registered.');
      await fetchShipment();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to register checkpoint');
    } finally {
      setSubmittingCheckpoint(false);
    }
  };

  return (
    <AdminLayout
      title={shipment ? `Consignment: ${shipment.trackingNumber}` : 'Shipment Detail'}
      subtitle="View, edit, and append verified milestone checkpoints"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/shipments"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-navy font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shipments List</span>
          </Link>

          {shipment && (
            <Link
              to={`/track/${shipment.trackingNumber}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-gold-dark transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
            >
              <span>View Public Tracking</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </Link>
          )}
        </div>

        {/* Feedback Messages */}
        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs sm:text-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center">
            <RotateCw className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Retrieving shipment record...</p>
          </div>
        ) : !shipment ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            Shipment not found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Detail overview & Milestones */}
            <div className="lg:col-span-8 space-y-6">
              {/* Route & Cargo Overview Header */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Tracking Identification
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy font-mono">
                        {shipment.trackingNumber}
                      </h2>
                      <StatusBadge status={shipment.status} size="lg" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Shipping Method</span>
                    <span className="font-bold text-slate-800 text-sm">{shipment.shippingMethod}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs sm:text-sm">
                  {/* Sender Box */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Shipper (Sender)
                    </span>
                    <div className="font-bold text-slate-900 text-base">{shipment.senderName}</div>
                    {shipment.senderCompany && (
                      <div className="text-slate-600">{shipment.senderCompany}</div>
                    )}
                    <div className="text-slate-500">{shipment.senderAddress}</div>
                    <div className="font-medium text-slate-700">
                      {shipment.originCity}, {shipment.originCountry}
                    </div>
                    <div className="text-slate-500 font-mono pt-1">
                      Tel: {shipment.senderPhone} | {shipment.senderEmail}
                    </div>
                  </div>

                  {/* Recipient Box */}
                  <div className="space-y-2 sm:border-l sm:border-slate-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Consignee (Recipient)
                    </span>
                    <div className="font-bold text-slate-900 text-base">{shipment.recipientName}</div>
                    {shipment.recipientCompany && (
                      <div className="text-slate-600">{shipment.recipientCompany}</div>
                    )}
                    <div className="text-slate-500">{shipment.recipientAddress}</div>
                    <div className="font-medium text-slate-700">
                      {shipment.destinationCity}, {shipment.destinationCountry}
                    </div>
                    <div className="text-slate-500 font-mono pt-1">
                      Tel: {shipment.recipientPhone} | {shipment.recipientEmail}
                    </div>
                  </div>
                </div>

                {/* Package Parameters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Pieces</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {shipment.packagePieces} Units
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Total Weight</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {shipment.packageWeightKg} kg
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Dimensions</span>
                    <span className="font-bold text-slate-800 text-sm truncate block">
                      {shipment.packageDimensions || 'Standard'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Current Location</span>
                    <span className="font-bold text-slate-800 text-sm truncate block" title={shipment.currentLocation}>
                      {shipment.currentLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkpoint Milestones Section */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      Milestone Transit Timeline
                    </h3>
                    <p className="text-xs text-slate-500">
                      Logged checkpoints visible on public tracking search
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddCheckpoint(!showAddCheckpoint)}
                    className="gold-gradient-btn px-4 py-2 rounded-lg text-brand-navy font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Log Milestone</span>
                  </button>
                </div>

                {/* Add Checkpoint Form Drawer */}
                {showAddCheckpoint && (
                  <form
                    onSubmit={handleAddCheckpoint}
                    className="p-5 rounded-xl bg-slate-50 border border-brand-gold/40 shadow-inner space-y-4 animate-fadeIn"
                  >
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Log New Transit Checkpoint
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Checkpoint Status
                        </label>
                        <select
                          value={cpStatus}
                          onChange={(e) => setCpStatus(e.target.value as ShipmentStatus)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Location (Facility, Port, City)
                        </label>
                        <input
                          type="text"
                          required
                          value={cpLocation}
                          onChange={(e) => setCpLocation(e.target.value)}
                          placeholder="e.g. Frankfurt Airport Hub, Germany"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Public Milestone Description
                        </label>
                        <input
                          type="text"
                          required
                          value={cpDescription}
                          onChange={(e) => setCpDescription(e.target.value)}
                          placeholder="e.g. Cargo received at facility and screened for transatlantic departure"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="syncStatus"
                          checked={cpUpdateStatus}
                          onChange={(e) => setCpUpdateStatus(e.target.checked)}
                          className="rounded text-brand-gold focus:ring-brand-gold"
                        />
                        <label htmlFor="syncStatus" className="text-xs text-slate-700 font-medium">
                          Also update current shipment status to{' '}
                          <span className="font-bold text-slate-900">&ldquo;{cpStatus}&rdquo;</span> and
                          update current reported location
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCheckpoint(false)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submittingCheckpoint}
                        className="gold-gradient-btn px-5 py-2 rounded-lg text-brand-navy font-bold text-xs shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {submittingCheckpoint ? 'Recording...' : 'Save Checkpoint'}
                      </button>
                    </div>
                  </form>
                )}

                <CheckpointTimeline checkpoints={shipment.checkpoints || []} />
              </div>
            </div>

            {/* Right 4 cols: Edit Parameters & Confidential Notes */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-gold" />
                  <span>Update Shipment Status</span>
                </h3>

                <form onSubmit={handleUpdateDetails} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Reported Location
                    </label>
                    <input
                      type="text"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      placeholder="e.g. London Heathrow Gateway, UK"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Estimated Delivery Date
                    </label>
                    <input
                      type="date"
                      value={estimatedDelivery}
                      onChange={(e) => setEstimatedDelivery(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Confidential Staff Notes
                      </label>
                    </div>
                    <textarea
                      rows={4}
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      placeholder="Special handling instructions, customs inspection status, client billing notes..."
                      className="w-full px-3 py-2 bg-amber-50/50 border border-amber-200 rounded-lg text-xs text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Protected: Never exposed on public tracking pages.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={updatingShipment}
                      className="w-full gold-gradient-btn py-2.5 rounded-lg text-brand-navy font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{updatingShipment ? 'Saving Changes...' : 'Save Parameters'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Administrative Info Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold uppercase tracking-wider text-slate-500 block">
                  System Metadata
                </span>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-400">Created:</span>
                  <span className="font-mono text-slate-700">
                    {new Date(shipment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-400">Last Modified:</span>
                  <span className="font-mono text-slate-700">
                    {new Date(shipment.updatedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Database ID:</span>
                  <span className="font-mono text-slate-700 text-[10px] truncate max-w-[150px]">
                    {shipment.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
