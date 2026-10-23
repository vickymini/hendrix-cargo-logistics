import { z } from 'zod';

export const SHIPMENT_STATUSES = [
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
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const SHIPPING_METHODS = [
  'Air Freight',
  'Sea Freight',
  'Road Transportation',
  'International Shipping',
  'Import and Export Logistics',
  'Warehousing',
  'Door-to-Door Delivery',
  'Business Logistics Solutions',
] as const;

export const createShipmentSchema = z.object({
  // Sender Details
  senderName: z.string().min(2, 'Sender name is required').max(100),
  senderCompany: z.string().max(100).optional().nullable(),
  senderPhone: z.string().min(5, 'Valid sender phone required').max(30),
  senderEmail: z.string().email('Valid sender email required'),
  senderAddress: z.string().min(5, 'Sender address is required').max(200),
  senderCity: z.string().min(2, 'Sender city is required').max(100),
  senderCountry: z.string().min(2, 'Sender country is required').max(100),

  // Recipient Details
  recipientName: z.string().min(2, 'Recipient name is required').max(100),
  recipientCompany: z.string().max(100).optional().nullable(),
  recipientPhone: z.string().min(5, 'Valid recipient phone required').max(30),
  recipientEmail: z.string().email('Valid recipient email required'),
  recipientAddress: z.string().min(5, 'Recipient address is required').max(200),
  recipientCity: z.string().min(2, 'Recipient city is required').max(100),
  recipientCountry: z.string().min(2, 'Recipient country is required').max(100),

  // Logistics Route
  originCity: z.string().min(2, 'Origin city required').max(100),
  originCountry: z.string().min(2, 'Origin country required').max(100),
  destinationCity: z.string().min(2, 'Destination city required').max(100),
  destinationCountry: z.string().min(2, 'Destination country required').max(100),
  shippingMethod: z.enum(SHIPPING_METHODS, {
    errorMap: () => ({ message: 'Invalid shipping method selected' }),
  }),

  // Package info
  packagePieces: z.coerce.number().int().min(1, 'At least 1 piece required').default(1),
  packageWeightKg: z.coerce.number().min(0.1, 'Weight must be greater than 0').default(1.0),
  packageDimensions: z.string().max(100).optional().nullable(),
  packageDescription: z.string().max(500).optional().nullable(),

  // Status & Location
  status: z.enum(SHIPMENT_STATUSES).default('Shipment Created'),
  currentLocation: z.string().min(2, 'Current location is required').max(150),
  estimatedDeliveryDate: z.string().or(z.date()).optional().nullable(),
  internalNotes: z.string().max(2000).optional().nullable(),
});

export const updateShipmentSchema = createShipmentSchema.partial().extend({
  status: z.enum(SHIPMENT_STATUSES).optional(),
});

export const addCheckpointSchema = z.object({
  status: z.enum(SHIPMENT_STATUSES),
  location: z.string().min(2, 'Checkpoint location is required').max(150),
  timestamp: z.string().or(z.date()).optional(),
  description: z.string().min(3, 'Checkpoint description is required').max(500),
  updateShipmentStatus: z.boolean().default(true),
});

export const trackQuerySchema = z.object({
  trackingNumber: z
    .string()
    .trim()
    .min(5, 'Invalid tracking number format')
    .max(50),
});
