import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Plane,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  FileText,
  Clock,
  ArrowRight,
  RotateCw,
  Mail,
  MapPin,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { adminGetStats } from '../services/api';
import { DashboardStats, AdminShipment, AuditLogItem } from '../types';
import { StatusBadge } from '../components/StatusBadge';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentShipments, setRecentShipments] = useState<Partial<AdminShipment>[]>([]);
  const [recentAuditLogs, setRecentAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await adminGetStats();
        setStats(data.stats);
        setRecentShipments(data.recentShipments);
        setRecentAuditLogs(data.recentAuditLogs);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <AdminLayout
      title="Operations Dashboard"
      subtitle="Real-time freight statistics, recent cargo bookings, and audit activity"
    >
      {loading ? (
        <div className="py-24 text-center">
          <RotateCw className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Aggregating freight statistics...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Shipments */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Consignments
                </span>
                <div className="text-3xl font-heading font-extrabold text-slate-900 mt-1">
                  {stats?.totalShipments ?? 0}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Registered in database</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            {/* Active / In Transit */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active in Transit
                </span>
                <div className="text-3xl font-heading font-extrabold text-amber-600 mt-1">
                  {stats?.activeShipments ?? 0}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Live flight & road transit</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
            </div>

            {/* Delivered */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delivered Cargo
                </span>
                <div className="text-3xl font-heading font-extrabold text-emerald-600 mt-1">
                  {stats?.deliveredShipments ?? 0}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Signed electronic POD</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Exceptions / On Hold */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Holds & Exceptions
                </span>
                <div className="text-3xl font-heading font-extrabold text-rose-600 mt-1">
                  {stats?.exceptionShipments ?? 0}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Requires staff attention</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Action Ribbon */}
          <div className="bg-brand-navy rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-brand-navy-surface">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Consignment Operations</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Generate new shipments with unique tracking numbers or review pending customer inquiries.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/admin/shipments/new"
                className="gold-gradient-btn px-5 py-2.5 rounded-lg text-brand-navy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 flex-1 sm:flex-initial shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Shipment</span>
              </Link>
              <Link
                to="/admin/messages"
                className="px-4 py-2.5 rounded-lg bg-brand-navy-surface hover:bg-brand-navy-surface/80 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 flex-1 sm:flex-initial"
              >
                <Mail className="w-4 h-4 text-brand-gold" />
                <span>Inquiries ({stats?.newMessagesCount ?? 0})</span>
              </Link>
            </div>
          </div>

          {/* Dual Columns: Recent Shipments & Recent Audit Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recent Shipments Table */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Recent Consignments
                  </h3>
                  <p className="text-xs text-slate-500">Latest active database bookings</p>
                </div>
                <Link
                  to="/admin/shipments"
                  className="text-xs font-bold text-brand-navy hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
                >
                  <span>View All Shipments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentShipments.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">No shipments found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Tracking Code</th>
                        <th className="py-3 px-4">Route</th>
                        <th className="py-3 px-4">Method</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {recentShipments.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {s.trackingNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1 font-medium text-slate-800">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>
                                {s.originCity} → {s.destinationCity}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">{s.shippingMethod}</td>
                          <td className="py-3.5 px-4">
                            <StatusBadge status={s.status || 'Shipment Created'} size="sm" />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              to={`/admin/shipments/${s.id}`}
                              className="text-brand-navy hover:text-brand-gold font-bold transition-colors"
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
            </div>

            {/* Audit Activity Stream */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Administrative Audit Trail
                  </h3>
                  <p className="text-xs text-slate-500">Security & dispatch activity log</p>
                </div>
                <Link
                  to="/admin/audit-logs"
                  className="text-xs font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
                >
                  Full Log
                </Link>
              </div>

              {recentAuditLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">No audit logs recorded yet.</div>
              ) : (
                <div className="space-y-3">
                  {recentAuditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800">
                        <span className="font-mono text-brand-navy uppercase">{log.action}</span>
                        <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(log.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] truncate">
                        By <span className="font-medium text-slate-900">{log.adminName}</span> on{' '}
                        <span className="font-mono font-medium">{log.targetId || log.targetType}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
