import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { TrackingPage } from './pages/TrackingPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminShipmentsPage } from './pages/AdminShipmentsPage';
import { AdminCreateShipmentPage } from './pages/AdminCreateShipmentPage';
import { AdminShipmentDetailPage } from './pages/AdminShipmentDetailPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { AdminMessagesPage } from './pages/AdminMessagesPage';

// Public Layout wrapper with Navbar & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-slate-bg selection:bg-brand-gold selection:text-brand-navy">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Portal Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/track/:trackingNumber" element={<TrackingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Management Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/shipments" element={<AdminShipmentsPage />} />
          <Route path="/admin/shipments/new" element={<AdminCreateShipmentPage />} />
          <Route path="/admin/shipments/:id" element={<AdminShipmentDetailPage />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
