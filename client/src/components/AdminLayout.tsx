import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  FileText,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const { admin, logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication Guard
  if (!isLoading && !isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'All Shipments', path: '/admin/shipments', icon: Package },
    { label: 'Create Shipment', path: '/admin/shipments/new', icon: PlusCircle },
    { label: 'Inquiries & Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Audit Trail', path: '/admin/audit-logs', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between border-b border-brand-navy-surface sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-gold flex items-center justify-center font-bold text-brand-navy">
            H
          </div>
          <span className="font-heading font-bold text-sm">HCL Dispatch Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-navy-surface text-slate-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-brand-navy text-slate-300 flex flex-col justify-between z-50 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } border-r border-brand-navy-surface`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-brand-navy-surface">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark flex items-center justify-center shadow-gold-glow">
                <span className="font-heading font-extrabold text-brand-navy text-lg">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-base tracking-wide">
                  HENDRIX
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-gold flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-brand-gold" /> Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-navy-surface text-brand-gold shadow-sm font-semibold border-l-4 border-brand-gold'
                      : 'text-slate-300 hover:text-white hover:bg-brand-navy-surface/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-gold' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-brand-navy-surface bg-brand-navy-dark/40 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-brand-navy-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col overflow-hidden text-xs">
              <span className="font-semibold text-white truncate">
                {admin?.fullName || admin?.username || 'Staff Admin'}
              </span>
              <span className="text-slate-400 uppercase text-[10px] tracking-wider">
                {admin?.role || 'Administrator'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-brand-navy-surface/40 rounded-md transition-colors"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors w-full text-left cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/shipments/new"
              className="gold-gradient-btn px-4 py-2 rounded-lg text-brand-navy font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Shipment</span>
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};
