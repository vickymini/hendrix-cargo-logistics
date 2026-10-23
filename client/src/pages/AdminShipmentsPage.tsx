import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  PlusCircle,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { adminListShipments } from '../services/api';
import { AdminShipment, ShipmentStatus } from '../types';
import { StatusBadge } from '../components/StatusBadge';

export const AdminShipmentsPage: React.FC = () => {
  const [shipments, setShipments] = useState<AdminShipment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const statuses: (ShipmentStatus | 'ALL')[] = [
    'ALL',
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

  const fetchShipments = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await adminListShipments({
        page: targetPage,
        limit: 15,
        search: search.trim() || undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        shippingMethod: methodFilter !== 'ALL' ? methodFilter : undefined,
      });

      setShipments(res.data);
      setPage(res.pagination.page);
      setTotalPages(res.pagination.totalPages);
      setTotalCount(res.pagination.totalCount);
    } catch (error) {
      console.error('Failed to list shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, methodFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShipments(1);
  };

  return (
    <AdminLayout
      title="Consignment Management"
      subtitle={`Total of ${totalCount} database shipment record(s) cataloged`}
    >
      <div className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Tracking Code, Sender, City..."
              className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-all font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-3 py-1 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-gold font-medium"
              >
                <option value="ALL">All Statuses ({totalCount})</option>
                {statuses
                  .filter((s) => s !== 'ALL')
                  .map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('ALL');
                setMethodFilter('ALL');
                fetchShipments(1);
              }}
              className="text-xs text-slate-500 hover:text-brand-navy px-3 py-2 font-medium cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <RotateCw className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-3" />
              <p className="text-slate-500 text-xs sm:text-sm">Loading shipments from database...</p>
            </div>
          ) : shipments.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-slate-500 text-sm">No shipments matched your criteria.</p>
              <Link
                to="/admin/shipments/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-lg shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-brand-gold" />
                <span>Create New Shipment</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Tracking Code</th>
                    <th className="py-3.5 px-4">Sender & Recipient</th>
                    <th className="py-3.5 px-4">Route</th>
                    <th className="py-3.5 px-4">Method & Weight</th>
                    <th className="py-3.5 px-4">Current Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {shipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        <Link
                          to={`/admin/shipments/${s.id}`}
                          className="hover:text-brand-gold transition-colors block"
                        >
                          {s.trackingNumber}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-sans font-normal">
                          {s._count?.checkpoints ?? 0} checkpoint(s) logged
                        </span>
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <div className="font-semibold text-slate-900">{s.recipientName}</div>
                        <div className="text-[11px] text-slate-400">From: {s.senderName}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 font-medium text-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>
                            {s.originCity} → {s.destinationCity}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {s.destinationCountry}
                        </span>
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <div className="font-medium text-slate-800">{s.shippingMethod}</div>
                        <div className="text-[11px] text-slate-400">
                          {s.packagePieces} pcs • {s.packageWeightKg} kg
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <StatusBadge status={s.status} size="sm" />
                      </td>

                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          to={`/track/${s.trackingNumber}`}
                          target="_blank"
                          title="View Public Tracking Page"
                          className="inline-block p-1.5 text-slate-400 hover:text-brand-navy rounded hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/shipments/${s.id}`}
                          className="inline-block px-3 py-1 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Page {page} of {totalPages} ({totalCount} total shipments)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => fetchShipments(page - 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => fetchShipments(page + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
