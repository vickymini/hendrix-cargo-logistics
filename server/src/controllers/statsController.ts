import { Request, Response } from 'express';
import { prisma } from '../config/db';

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  try {
    const [
      totalShipments,
      deliveredCount,
      activeCount,
      exceptionCount,
      recentShipments,
      recentAuditLogs,
      newMessagesCount,
    ] = await Promise.all([
      prisma.shipment.count(),
      prisma.shipment.count({
        where: { status: 'Delivered' },
      }),
      prisma.shipment.count({
        where: {
          status: {
            in: [
              'Shipment Created',
              'Processing',
              'Picked Up',
              'In Transit',
              'Arrived at Facility',
              'Customs Clearance',
              'Out for Delivery',
            ],
          },
        },
      }),
      prisma.shipment.count({
        where: {
          status: {
            in: ['On Hold', 'Delayed', 'Delivery Attempted', 'Returned to Sender', 'Cancelled'],
          },
        },
      }),
      prisma.shipment.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          trackingNumber: true,
          status: true,
          originCity: true,
          originCountry: true,
          destinationCity: true,
          destinationCountry: true,
          shippingMethod: true,
          estimatedDeliveryDate: true,
          createdAt: true,
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactMessage.count({
        where: { status: 'new' },
      }),
    ]);

    res.json({
      success: true,
      stats: {
        totalShipments,
        activeShipments: activeCount,
        deliveredShipments: deliveredCount,
        exceptionShipments: exceptionCount,
        newMessagesCount,
      },
      recentShipments,
      recentAuditLogs,
    });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    res.status(500).json({ success: false, error: 'Failed to compute dashboard metrics.' });
  }
}
