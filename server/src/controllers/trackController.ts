import { Request, Response } from 'express';
import { prisma } from '../config/db';

export async function getShipmentByTrackingNumber(req: Request, res: Response): Promise<void> {
  try {
    const rawCode = req.params.trackingNumber || req.query.number;
    if (!rawCode || typeof rawCode !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid shipment tracking number.',
      });
      return;
    }

    const trackingNumber = rawCode.trim().toUpperCase();

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        checkpoints: {
          orderBy: { timestamp: 'desc' },
          select: {
            id: true,
            status: true,
            location: true,
            timestamp: true,
            description: true,
          },
        },
      },
    });

    if (!shipment) {
      res.status(404).json({
        success: false,
        error: `No shipment found matching tracking number "${trackingNumber}". Please verify the number and try again.`,
        trackingNumber,
      });
      return;
    }

    // Mask recipient name for privacy (e.g. "John Doe" -> "J*** D***")
    const maskedRecipient = shipment.recipientName
      .split(' ')
      .map((part) => (part.length > 1 ? `${part[0]}${'*'.repeat(Math.min(part.length - 1, 4))}` : part))
      .join(' ');

    // Public sanitized shipment details
    const publicData = {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      shippingMethod: shipment.shippingMethod,
      origin: {
        city: shipment.originCity,
        country: shipment.originCountry,
      },
      destination: {
        city: shipment.destinationCity,
        country: shipment.destinationCountry,
        recipientMasked: maskedRecipient,
        recipientCompany: shipment.recipientCompany ? 'Confidential' : null,
      },
      package: {
        pieces: shipment.packagePieces,
        weightKg: shipment.packageWeightKg,
        description: shipment.packageDescription,
      },
      currentLocation: shipment.currentLocation,
      estimatedDeliveryDate: shipment.estimatedDeliveryDate,
      actualDeliveryDate: shipment.actualDeliveryDate,
      createdAt: shipment.createdAt,
      lastUpdated: shipment.updatedAt,
      checkpoints: shipment.checkpoints,
    };

    res.json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    console.error('Error fetching public tracking data:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while retrieving shipment details. Please try again later.',
    });
  }
}
