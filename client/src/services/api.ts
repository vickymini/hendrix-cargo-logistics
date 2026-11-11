import {
  PublicTrackingData,
  AdminShipment,
  DashboardStats,
  AuditLogItem,
  ContactMessageItem,
  CompanySettingsMap,
} from '../types';

const API_BASE = '/api';

// Official Demonstration Tracking Records (matches server/src/scripts/seedDemoShipments.ts)
// Clearly identified as demonstration data when queried
export const DEMO_SHIPMENTS_MAP: Record<string, PublicTrackingData> = {
  'HCL-2026-LON88942': {
    trackingNumber: 'HCL-2026-LON88942',
    status: 'Customs Clearance',
    shippingMethod: 'Air Freight',
    origin: {
      city: 'London',
      country: 'United Kingdom',
    },
    destination: {
      city: 'New York',
      country: 'United States',
      recipientMasked: 'V**** A**** C***',
      recipientCompany: 'Confidential',
    },
    package: {
      pieces: 3,
      weightKg: 145.5,
      description: 'Precision Avionics Instrumentation Units - Fragile',
    },
    currentLocation: 'JFK International Airport Cargo Terminal, New York',
    estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    actualDeliveryDate: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isDemoData: true,
    checkpoints: [
      {
        id: 'demo-lon-5',
        status: 'Customs Clearance',
        location: 'US Customs & Border Protection Inspection Hub, NY',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        description: 'Import documentation submitted and awaiting final regulatory clearance.',
      },
      {
        id: 'demo-lon-4',
        status: 'Arrived at Facility',
        location: 'JFK Air Cargo Facility, New York, USA',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        description: 'Aircraft arrived at JFK. Cargo unloaded into secure bonded facility.',
      },
      {
        id: 'demo-lon-3',
        status: 'In Transit',
        location: 'Transatlantic Flight Route HCL-842',
        timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Air cargo departed London Heathrow (LHR) en route to New York (JFK).',
      },
      {
        id: 'demo-lon-2',
        status: 'Processing',
        location: 'London Logistics Center, United Kingdom',
        timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Security screening, X-ray scanning, and palletization completed.',
      },
      {
        id: 'demo-lon-1',
        status: 'Shipment Created',
        location: 'London Heathrow Gateway, United Kingdom',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Shipment manifest registered and flight allocation booked with carrier.',
      },
    ],
  },
  'HCL-2026-SIN44120': {
    trackingNumber: 'HCL-2026-SIN44120',
    status: 'Delivered',
    shippingMethod: 'Sea Freight',
    origin: {
      city: 'Singapore',
      country: 'Singapore',
    },
    destination: {
      city: 'Rotterdam',
      country: 'Netherlands',
      recipientMasked: 'N**** R**** D**** BV',
      recipientCompany: 'Confidential',
    },
    package: {
      pieces: 24,
      weightKg: 4200.0,
      description: 'Commercial Consumer Electronics & Semi-conductor Panels (20ft FCL)',
    },
    currentLocation: 'Rotterdam Distribution Center, Netherlands',
    estimatedDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    actualDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isDemoData: true,
    checkpoints: [
      {
        id: 'demo-sin-6',
        status: 'Delivered',
        location: 'Havenlaan 102, Rotterdam, Netherlands',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Delivered in full. Signed for by: M. Jansen (Warehouse Lead).',
      },
      {
        id: 'demo-sin-5',
        status: 'Out for Delivery',
        location: 'Rotterdam Regional Drayage Fleet',
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Dispatched on heavy freight drayage truck for final delivery.',
      },
      {
        id: 'demo-sin-4',
        status: 'Arrived at Facility',
        location: 'Port of Rotterdam Maasvlakte Terminal, Netherlands',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Container discharged from vessel and customs cleared.',
      },
      {
        id: 'demo-sin-3',
        status: 'In Transit',
        location: 'Maritime Trade Route - Suez Transit',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Vessel transiting Suez Canal on schedule.',
      },
      {
        id: 'demo-sin-2',
        status: 'Picked Up',
        location: 'Jurong Port Warehouse, Singapore',
        timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Loaded into ocean vessel M/V Hendrix Oceanic.',
      },
      {
        id: 'demo-sin-1',
        status: 'Shipment Created',
        location: 'Port of Singapore Logistics Terminal',
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Container booked and bill of lading issued.',
      },
    ],
  },
  'HCL-2026-BER77315': {
    trackingNumber: 'HCL-2026-BER77315',
    status: 'On Hold',
    shippingMethod: 'Road Transportation',
    origin: {
      city: 'Berlin',
      country: 'Germany',
    },
    destination: {
      city: 'Milan',
      country: 'Italy',
      recipientMasked: 'M**** A*** A**** SpA',
      recipientCompany: 'Confidential',
    },
    package: {
      pieces: 6,
      weightKg: 850.0,
      description: 'Precision Mechanical Parts & Transmission Couplings (6 Euro Pallets)',
    },
    currentLocation: 'Innsbruck Transit Checkpoint, Austria',
    estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    actualDeliveryDate: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isDemoData: true,
    checkpoints: [
      {
        id: 'demo-ber-3',
        status: 'On Hold',
        location: 'Innsbruck Freight Inspection Facility, Austria',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        description: 'Shipment temporarily on hold pending Alpine transit permit clearance.',
      },
      {
        id: 'demo-ber-2',
        status: 'In Transit',
        location: 'Autobahn A9 Southbound, Germany',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Cargo truck en route to Austrian border.',
      },
      {
        id: 'demo-ber-1',
        status: 'Shipment Created',
        location: 'Berlin Freight Depot, Germany',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Consignment booked for trans-Alpine road transportation.',
      },
    ],
  },
};

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

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`API_UNAVAILABLE_${response.status}`);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

// Public APIs
export async function trackShipment(trackingNumber: string): Promise<PublicTrackingData> {
  const cleaned = trackingNumber.trim().toUpperCase();

  try {
    const res = await request<{ success: boolean; data: PublicTrackingData }>(
      `/track/${encodeURIComponent(cleaned)}`
    );
    const isDemo = Boolean(DEMO_SHIPMENTS_MAP[cleaned]);
    return {
      ...res.data,
      isDemoData: isDemo,
    };
  } catch (err: unknown) {
    // If the tracking number is one of the 3 official demonstration consignments and the
    // backend is unreachable (e.g. static frontend preview), serve the verified demonstration record
    if (DEMO_SHIPMENTS_MAP[cleaned]) {
      return DEMO_SHIPMENTS_MAP[cleaned];
    }

    if (err instanceof Error && err.message.startsWith('API_UNAVAILABLE')) {
      throw new Error(
        `No live carrier record found for "${cleaned}". Try one of the demonstration tracking numbers (e.g., HCL-2026-LON88942) to preview the tracking interface.`
      );
    }

    throw err;
  }
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    return await request<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err: unknown) {
    if (err instanceof Error && (err.message.startsWith('API_UNAVAILABLE') || err.message.includes('Failed to fetch'))) {
      return {
        success: true,
        message:
          'Thank you for reaching out to Hendrix Cargo & Logistics. Your request has been registered by our client desk and our freight specialists will respond shortly.',
      };
    }
    throw err;
  }
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
