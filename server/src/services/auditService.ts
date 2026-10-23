import { Request } from 'express';
import { prisma } from '../config/db';

export interface AuditLogParams {
  adminId?: string;
  adminName?: string;
  action: string;
  targetType: 'SHIPMENT' | 'CHECKPOINT' | 'AUTH' | 'SETTING' | 'MESSAGE';
  targetId?: string;
  details: Record<string, unknown> | string;
  req?: Request;
}

export async function logAdminAction(params: AuditLogParams): Promise<void> {
  try {
    const ipAddress =
      params.req?.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      params.req?.socket?.remoteAddress ||
      'unknown';

    const serializedDetails =
      typeof params.details === 'string'
        ? params.details
        : JSON.stringify(params.details);

    await prisma.auditLog.create({
      data: {
        adminId: params.adminId || null,
        adminName: params.adminName || 'System',
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId || null,
        details: serializedDetails,
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
