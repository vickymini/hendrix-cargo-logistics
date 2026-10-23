import React, { useEffect, useState } from 'react';
import { Mail, Clock, CheckCircle2, RotateCw, Phone, User } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { adminListMessages, adminUpdateMessageStatus } from '../services/api';
import { ContactMessageItem } from '../types';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await adminListMessages();
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await adminUpdateMessageStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <AdminLayout
      title="Customer Inquiries & Support Messages"
      subtitle="Messages submitted through the public contact form"
    >
      <div className="space-y-6">
        {loading ? (
          <div className="py-24 text-center">
            <RotateCw className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading customer inquiries...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 text-slate-400 space-y-2">
            <Mail className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm">No customer inquiries recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-navy-surface text-brand-gold flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">
                        {msg.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${msg.email}`} className="text-brand-navy hover:underline">
                            {msg.email}
                          </a>
                        </span>
                        {msg.phone && (
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {msg.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>

                    <select
                      value={msg.status}
                      onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        msg.status === 'new'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : msg.status === 'in_review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{msg.subject}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
