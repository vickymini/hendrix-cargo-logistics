export type ShipmentStatus =
  | 'Shipment Created'
  | 'Processing'
  | 'Picked Up'
  | 'In Transit'
  | 'Arrived at Facility'
  | 'Customs Clearance'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delivery Attempted'
  | 'On Hold'
  | 'Delayed'
  | 'Returned to Sender'
  | 'Cancelled';

export type ShippingMethod =
  | 'Air Freight'
  | 'Sea Freight'
  | 'Road Transportation'
  | 'International Shipping'
  | 'Import and Export Logistics'
  | 'Warehousing'
  | 'Door-to-Door Delivery'
  | 'Business Logistics Solutions';

export interface CheckpointItem {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
  createdByName?: string | null;
}

export interface PublicTrackingData {
  trackingNumber: string;
  status: ShipmentStatus;
  shippingMethod: ShippingMethod;
  origin: {
    city: string;
    country: string;
  };
  destination: {
    city: string;
    country: string;
    recipientMasked: string;
    recipientCompany: string | null;
  };
  package: {
    pieces: number;
    weightKg: number;
    description: string | null;
  };
  currentLocation: string;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  createdAt: string;
  lastUpdated: string;
  checkpoints: CheckpointItem[];
}

export interface AdminShipment {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderCompany?: string | null;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  senderCity: string;
  senderCountry: string;
  recipientName: string;
  recipientCompany?: string | null;
  recipientPhone: string;
  recipientEmail: string;
  recipientAddress: string;
  recipientCity: string;
  recipientCountry: string;
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  shippingMethod: ShippingMethod;
  packagePieces: number;
  packageWeightKg: number;
  packageDimensions?: string | null;
  packageDescription?: string | null;
  status: ShipmentStatus;
  currentLocation: string;
  estimatedDeliveryDate?: string | null;
  actualDeliveryDate?: string | null;
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  checkpoints?: CheckpointItem[];
  _count?: {
    checkpoints: number;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  fullName?: string | null;
  role: string;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  exceptionShipments: number;
  newMessagesCount: number;
}

export interface AuditLogItem {
  id: string;
  adminName?: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  details: string;
  ipAddress?: string | null;
  createdAt: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface CompanySettingsMap {
  companyName: string;
  companyHeadline: string;
  companyTagline: string;
  supportEmail: string;
  salesEmail: string;
  supportPhone: string;
  operatingHours: string;
  headquartersAddress: string;
}
