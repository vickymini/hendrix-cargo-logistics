import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  ArrowLeft,
  AlertCircle,
  Save,
  Lock,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { adminCreateShipment } from '../services/api';
import { ShippingMethod, ShipmentStatus } from '../types';

export const AdminCreateShipmentPage: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingMethods: ShippingMethod[] = [
    'Air Freight',
    'Sea Freight',
    'Road Transportation',
    'International Shipping',
    'Import and Export Logistics',
    'Warehousing',
    'Door-to-Door Delivery',
    'Business Logistics Solutions',
  ];

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

  const [formData, setFormData] = useState({
    // Sender
    senderName: '',
    senderCompany: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    senderCity: '',
    senderCountry: '',

    // Recipient
    recipientName: '',
    recipientCompany: '',
    recipientPhone: '',
    recipientEmail: '',
    recipientAddress: '',
    recipientCity: '',
    recipientCountry: '',

    // Route
    originCity: '',
    originCountry: '',
    destinationCity: '',
    destinationCountry: '',
    shippingMethod: 'Air Freight' as ShippingMethod,

    // Package
    packagePieces: 1,
    packageWeightKg: 10.0,
    packageDimensions: '',
    packageDescription: '',

    // Status
    status: 'Shipment Created' as ShipmentStatus,
    currentLocation: '',
    estimatedDeliveryDate: '',
    internalNotes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'packagePieces' || name === 'packageWeightKg'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (
      !formData.senderName ||
      !formData.senderPhone ||
      !formData.senderEmail ||
      !formData.senderAddress ||
      !formData.senderCity ||
      !formData.senderCountry ||
      !formData.recipientName ||
      !formData.recipientPhone ||
      !formData.recipientEmail ||
      !formData.recipientAddress ||
      !formData.recipientCity ||
      !formData.recipientCountry ||
      !formData.originCity ||
      !formData.originCountry ||
      !formData.destinationCity ||
      !formData.destinationCountry
    ) {
      setError('Please fill in all mandatory sender, recipient, and routing fields.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        currentLocation:
          formData.currentLocation.trim() ||
          `${formData.originCity.trim()}, ${formData.originCountry.trim()}`,
        estimatedDeliveryDate: formData.estimatedDeliveryDate
          ? new Date(formData.estimatedDeliveryDate).toISOString()
          : null,
      };

      const created = await adminCreateShipment(payload);
      navigate(`/admin/shipments/${created.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create shipment. Please review your input.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Create New Consignment"
      subtitle="Generates unique HCL-2026-XXXXXXXX tracking number and logs initial milestone"
    >
      <div className="max-w-4xl space-y-6">
        <Link
          to="/admin/shipments"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-navy font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Shipments</span>
        </Link>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tracking Number Auto-generation Banner */}
          <div className="bg-brand-navy p-5 rounded-2xl text-white flex items-center justify-between border border-brand-navy-surface shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-brand-navy font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold">
                  Tracking Code Generation
                </span>
                <p className="text-sm font-semibold text-white">
                  Unique <span className="font-mono text-brand-gold-light">HCL-2026-XXXXXXXX</span> code will be generated upon submission
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Collision-checked with PostgreSQL
            </span>
          </div>

          {/* Section 1: Route & Logistics Method */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-gold" />
              <span>Logistics Route & Service Selection</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Origin City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="originCity"
                  value={formData.originCity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. London"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Origin Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="originCountry"
                  value={formData.originCountry}
                  onChange={handleChange}
                  required
                  placeholder="e.g. United Kingdom"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Destination City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="destinationCity"
                  value={formData.destinationCity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. New York"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Destination Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={handleChange}
                  required
                  placeholder="e.g. United States"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Shipping Method <span className="text-rose-500">*</span>
                </label>
                <select
                  name="shippingMethod"
                  value={formData.shippingMethod}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold font-medium"
                >
                  {shippingMethods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Initial Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold font-medium"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Sender Details */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Sender (Shipper) Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Sender Contact Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="senderCompany"
                  value={formData.senderCompany}
                  onChange={handleChange}
                  placeholder="Apex Manufacturing Ltd"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Sender Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  required
                  placeholder="+44 20 7946 0912"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Sender Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                  placeholder="dispatch@apex.co.uk"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Physical Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  required
                  placeholder="42 Industrial Boulevard, Suite 100"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Sender City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleChange}
                  required
                  placeholder="London"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Sender Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="senderCountry"
                  value={formData.senderCountry}
                  onChange={handleChange}
                  required
                  placeholder="United Kingdom"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Recipient Details */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Recipient (Consignee) Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Recipient Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Smith"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="recipientCompany"
                  value={formData.recipientCompany}
                  onChange={handleChange}
                  placeholder="Vanguard Corp"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Recipient Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  required
                  placeholder="+1 212 555 0199"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Recipient Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  required
                  placeholder="receiving@vanguard.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Delivery Destination Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={handleChange}
                  required
                  placeholder="780 Aviation Way, Dock 4"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Destination City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientCity"
                  value={formData.recipientCity}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Destination Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientCountry"
                  value={formData.recipientCountry}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Cargo Specifications & Internal Staff Notes */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Package Parameters & Internal Handling Notes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pieces / Packages
                </label>
                <input
                  type="number"
                  name="packagePieces"
                  min="1"
                  value={formData.packagePieces}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Weight (Kilograms)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  name="packageWeightKg"
                  value={formData.packageWeightKg}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Estimated Delivery Date
                </label>
                <input
                  type="date"
                  name="estimatedDeliveryDate"
                  value={formData.estimatedDeliveryDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Goods / Cargo Description
                </label>
                <input
                  type="text"
                  name="packageDescription"
                  value={formData.packageDescription}
                  onChange={handleChange}
                  placeholder="e.g. Commercial Telecommunication Electronics - Fragile"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold"
                />
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Confidential Internal Staff Notes (Never exposed to public tracking)
                  </label>
                </div>
                <textarea
                  name="internalNotes"
                  rows={3}
                  value={formData.internalNotes}
                  onChange={handleChange}
                  placeholder="Internal routing instructions, tariff notes, client special requests, customs inspection flags..."
                  className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-xs sm:text-sm focus:border-brand-gold focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <Link
              to="/admin/shipments"
              className="px-6 py-3 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="gold-gradient-btn px-8 py-3 rounded-xl text-brand-navy font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Creating Shipment...' : 'Generate Consignment'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
