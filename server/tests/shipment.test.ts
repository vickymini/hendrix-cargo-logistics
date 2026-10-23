import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { isValidTrackingNumberFormat } from '../src/services/trackingGenerator';
import { createShipmentSchema, addCheckpointSchema } from '../src/validations/shipment.schema';

describe('Shipment Tracking & Validation Unit Tests', () => {
  it('validates tracking number format HCL-YYYY-XXXXXXXX', () => {
    expect(isValidTrackingNumberFormat('HCL-2026-LON88942')).toBe(true);
    expect(isValidTrackingNumberFormat('HCL-2026-ABCDEF12')).toBe(true);
    expect(isValidTrackingNumberFormat('INVALID-1234')).toBe(false);
    expect(isValidTrackingNumberFormat('HCL-2026-SHORT')).toBe(false);
  });

  it('validates createShipmentSchema with valid payload', () => {
    const validPayload = {
      senderName: 'John Doe',
      senderPhone: '+1 555-0199',
      senderEmail: 'john@example.com',
      senderAddress: '123 Harbor St',
      senderCity: 'Los Angeles',
      senderCountry: 'United States',
      recipientName: 'Jane Smith',
      recipientPhone: '+44 20 7946 0999',
      recipientEmail: 'jane@example.co.uk',
      recipientAddress: '45 Oxford Road',
      recipientCity: 'London',
      recipientCountry: 'United Kingdom',
      originCity: 'Los Angeles',
      originCountry: 'United States',
      destinationCity: 'London',
      destinationCountry: 'United Kingdom',
      shippingMethod: 'Air Freight',
      packagePieces: 2,
      packageWeightKg: 25.4,
      status: 'Shipment Created',
      currentLocation: 'Los Angeles Cargo Depot',
    };

    const parsed = createShipmentSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
  });

  it('rejects createShipmentSchema with invalid shipping method or negative pieces', () => {
    const invalidPayload = {
      senderName: 'John Doe',
      senderPhone: '+1 555-0199',
      senderEmail: 'john@example.com',
      senderAddress: '123 Harbor St',
      senderCity: 'Los Angeles',
      senderCountry: 'United States',
      recipientName: 'Jane Smith',
      recipientPhone: '+44 20 7946 0999',
      recipientEmail: 'jane@example.co.uk',
      recipientAddress: '45 Oxford Road',
      recipientCity: 'London',
      recipientCountry: 'United Kingdom',
      originCity: 'Los Angeles',
      originCountry: 'United States',
      destinationCity: 'London',
      destinationCountry: 'United Kingdom',
      shippingMethod: 'Space Rocket Delivery', // Invalid method
      packagePieces: 0, // Invalid piece count
      packageWeightKg: -5,
      status: 'Unknown Status',
      currentLocation: 'Los Angeles',
    };

    const parsed = createShipmentSchema.safeParse(invalidPayload);
    expect(parsed.success).toBe(false);
  });

  it('validates addCheckpointSchema', () => {
    const validCheckpoint = {
      status: 'In Transit',
      location: 'Frankfurt Airport Terminal 2',
      description: 'Cargo transferred to connecting flight.',
      updateShipmentStatus: true,
    };

    const parsed = addCheckpointSchema.safeParse(validCheckpoint);
    expect(parsed.success).toBe(true);
  });
});

describe('API Route Integrations', () => {
  it('GET /health returns 200 with service status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toContain('Hendrix Cargo & Logistics');
  });

  it('GET /api/settings returns company information', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.companyName).toBe('Hendrix Cargo & Logistics');
  });

  it('GET /api/admin/shipments is protected and returns 401 without auth token', async () => {
    const res = await request(app).get('/api/admin/shipments');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Authentication required');
  });

  it('POST /api/contact rejects missing required fields', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'A', email: 'not-an-email', message: 'short' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
