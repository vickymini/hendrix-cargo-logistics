import {
  PublicTrackingData,
  AdminShipment,
  DashboardStats,
  AuditLogItem,
  ContactMessageItem,
  CompanySettingsMap,
} from '../types';

const API_BASE = '/api';

// Helper for standard JSON requests
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('hendrix_admin_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

// Public APIs
export async function trackShipment(trackingNumber: string): Promise<PublicTrackingData> {
  const res = await request<{ success: boolean; data: PublicTrackingData }>(
    `/track/${encodeURIComponent(trackingNumber.trim())}`
  );
  return res.data;
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getCompanySettings(): Promise<CompanySettingsMap> {
  const res = await request<{ success: boolean; data: CompanySettingsMap }>('/settings');
  return res.data;
}

// Admin APIs
export async function adminLogin(payload: {
  usernameOrEmail: string;
  password: string;
}) {
  return request<{
    success: boolean;
    token: string;
    admin: { id: string; username: string; email: string; fullName?: string; role: string };
  }>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminLogout() {
  return request<{ success: boolean }>('/admin/auth/logout', { method: 'POST' });
}

export async function adminGetMe() {
  return request<{ success: boolean; admin: { id: string; username: string; email: string; role: string } }>(
    '/admin/auth/me'
  );
}

export async function adminGetStats(): Promise<{
  stats: DashboardStats;
  recentShipments: Partial<AdminShipment>[];
  recentAuditLogs: AuditLogItem[];
}> {
  return request<{
    success: boolean;
    stats: DashboardStats;
    recentShipments: Partial<AdminShipment>[];
    recentAuditLogs: AuditLogItem[];
  }>('/admin/stats');
}

export async function adminListShipments(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  shippingMethod?: string;
}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  if (params.shippingMethod) query.set('shippingMethod', params.shippingMethod);

  return request<{
    success: boolean;
    data: AdminShipment[];
    pagination: { page: number; limit: number; totalCount: number; totalPages: number };
  }>(`/admin/shipments?${query.toString()}`);
}

export async function adminGetShipment(id: string): Promise<AdminShipment> {
  const res = await request<{ success: boolean; data: AdminShipment }>(`/admin/shipments/${id}`);
  return res.data;
}

export async function adminCreateShipment(payload: unknown): Promise<AdminShipment> {
  const res = await request<{ success: boolean; data: AdminShipment }>('/admin/shipments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function adminUpdateShipment(id: string, payload: unknown): Promise<AdminShipment> {
  const res = await request<{ success: boolean; data: AdminShipment }>(`/admin/shipments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function adminAddCheckpoint(
  shipmentId: string,
  payload: {
    status: string;
    location: string;
    timestamp?: string;
    description: string;
    updateShipmentStatus: boolean;
  }
) {
  return request<{ success: boolean; message: string; data: unknown }>(
    `/admin/shipments/${shipmentId}/checkpoints`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

export async function adminDeleteShipment(id: string) {
  return request<{ success: boolean; message: string }>(`/admin/shipments/${id}`, {
    method: 'DELETE',
  });
}

export async function adminListAuditLogs(params: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  return request<{
    success: boolean;
    data: AuditLogItem[];
    pagination: { page: number; limit: number; totalCount: number; totalPages: number };
  }>(`/admin/audit-logs?${query.toString()}`);
}

export async function adminListMessages() {
  return request<{ success: boolean; data: ContactMessageItem[] }>('/admin/messages');
}

export async function adminUpdateMessageStatus(id: string, status: string) {
  return request<{ success: boolean; data: ContactMessageItem }>(`/admin/messages/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
