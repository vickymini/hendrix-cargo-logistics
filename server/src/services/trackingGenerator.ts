import crypto from 'crypto';
import { prisma } from '../config/db';

/**
 * Generates a unique tracking number in format HCL-2026-XXXXXXXX
 * where XXXXXXXX is an 8-character uppercase alphanumeric string.
 */
export async function generateUniqueTrackingNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude ambiguous chars like 0/O, 1/I
  
  let isUnique = false;
  let trackingNumber = '';
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    attempts++;
    const randomBytes = crypto.randomBytes(8);
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[randomBytes[i] % chars.length];
    }
    trackingNumber = `HCL-${year}-${code}`;

    // Verify uniqueness in database
    const existing = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: { id: true },
    });

    if (!existing) {
      isUnique = true;
    }
  }

  if (!isUnique) {
    // Fallback timestamp hex suffix
    const fallback = crypto.randomBytes(4).toString('hex').toUpperCase();
    trackingNumber = `HCL-${year}-${fallback}`;
  }

  return trackingNumber;
}

export function isValidTrackingNumberFormat(code: string): boolean {
  return /^HCL-\d{4}-[A-Z0-9]{8}$/i.test(code.trim());
}
