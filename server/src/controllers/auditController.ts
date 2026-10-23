import { Request, Response } from 'express';
import { prisma } from '../config/db';

export async function listAuditLogs(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const action = req.query.action as string;
    const targetType = req.query.targetType as string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (action && action !== 'ALL') where.action = action;
    if (targetType && targetType !== 'ALL') where.targetType = targetType;

    const [logs, totalCount] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error) {
    console.error('listAuditLogs error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve audit trail.' });
  }
}
