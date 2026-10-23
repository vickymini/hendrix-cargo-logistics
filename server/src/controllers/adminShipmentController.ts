import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { generateUniqueTrackingNumber } from '../services/trackingGenerator';
import { logAdminAction } from '../services/auditService';

export async function listShipments(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 15));
    const skip = (page - 1) * limit;

    const search = (req.query.search as string)?.trim();
    const status = (req.query.status as string)?.trim();
    const shippingMethod = (req.query.shippingMethod as string)?.trim();

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (shippingMethod && shippingMethod !== 'ALL') {
      where.shippingMethod = shippingMethod;
    }

    if (search) {
      where.OR = [
        { trackingNumber: { contains: search } },
        { senderName: { contains: search } },
        { recipientName: { contains: search } },
        { originCity: { contains: search } },
        { destinationCity: { contains: search } },
      ];
    }

    const [shipments, totalCount] = await Promise.all([
      prisma.shipment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { checkpoints: true },
          },
        },
      }),
      prisma.shipment.count({ where }),
    ]);

    res.json({
      success: true,
      data: shipments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error) {
    console.error('listShipments error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve shipments list.' });
  }
}

export async function getShipmentById(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);

    const shipment = await prisma.shipment.findFirst({
      where: {
        OR: [{ id }, { trackingNumber: id.toUpperCase() }],
      },
      include: {
        checkpoints: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!shipment) {
      res.status(404).json({ success: false, error: 'Shipment record not found.' });
      return;
    }

    res.json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    console.error('getShipmentById error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve shipment details.' });
  }
}

export async function createShipment(req: Request, res: Response): Promise<void> {
  try {
    const trackingNumber = await generateUniqueTrackingNumber();
    const data = req.body;

    const estimatedDelivery = data.estimatedDeliveryDate
      ? new Date(data.estimatedDeliveryDate)
      : null;

    const initialStatus = data.status || 'Shipment Created';

    // Create shipment and initial checkpoint in transaction
    const shipment = await prisma.$transaction(async (tx) => {
      const newShipment = await tx.shipment.create({
        data: {
          trackingNumber,
          senderName: data.senderName,
          senderCompany: data.senderCompany || null,
          senderPhone: data.senderPhone,
          senderEmail: data.senderEmail,
          senderAddress: data.senderAddress,
          senderCity: data.senderCity,
          senderCountry: data.senderCountry,

          recipientName: data.recipientName,
          recipientCompany: data.recipientCompany || null,
          recipientPhone: data.recipientPhone,
          recipientEmail: data.recipientEmail,
          recipientAddress: data.recipientAddress,
          recipientCity: data.recipientCity,
          recipientCountry: data.recipientCountry,

          originCity: data.originCity,
          originCountry: data.originCountry,
          destinationCity: data.destinationCity,
          destinationCountry: data.destinationCountry,
          shippingMethod: data.shippingMethod,

          packagePieces: data.packagePieces || 1,
          packageWeightKg: data.packageWeightKg || 1.0,
          packageDimensions: data.packageDimensions || null,
          packageDescription: data.packageDescription || null,

          status: initialStatus,
          currentLocation: data.currentLocation || `${data.originCity}, ${data.originCountry}`,
          estimatedDeliveryDate: estimatedDelivery,
          internalNotes: data.internalNotes || null,
        },
      });

      // Initial checkpoint
      await tx.checkpoint.create({
        data: {
          shipmentId: newShipment.id,
          status: initialStatus,
          location: data.currentLocation || `${data.originCity}, ${data.originCountry}`,
          timestamp: new Date(),
          description: `Shipment record generated with method: ${data.shippingMethod}`,
          createdByName: req.admin?.username || 'Administrator',
        },
      });

      return newShipment;
    });

    // Audit log
    await logAdminAction({
      adminId: req.admin?.adminId,
      adminName: req.admin?.username,
      action: 'CREATE_SHIPMENT',
      targetType: 'SHIPMENT',
      targetId: shipment.trackingNumber,
      details: {
        trackingNumber: shipment.trackingNumber,
        origin: `${shipment.originCity}, ${shipment.originCountry}`,
        destination: `${shipment.destinationCity}, ${shipment.destinationCountry}`,
        status: shipment.status,
      },
      req,
    });

    res.status(201).json({
      success: true,
      message: 'Shipment successfully created.',
      data: shipment,
    });
  } catch (error) {
    console.error('createShipment error:', error);
    res.status(500).json({ success: false, error: 'Failed to create shipment.' });
  }
}

export async function updateShipment(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const data = req.body;

    const existing = await prisma.shipment.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({ success: false, error: 'Shipment not found' });
      return;
    }

    const updatePayload: Record<string, unknown> = { ...data };

    if (data.estimatedDeliveryDate !== undefined) {
      updatePayload.estimatedDeliveryDate = data.estimatedDeliveryDate
        ? new Date(data.estimatedDeliveryDate)
        : null;
    }

    if (data.status === 'Delivered' && !existing.actualDeliveryDate) {
      updatePayload.actualDeliveryDate = new Date();
    }

    const updated = await prisma.shipment.update({
      where: { id },
      data: updatePayload,
      include: { checkpoints: { orderBy: { timestamp: 'desc' } } },
    });

    await logAdminAction({
      adminId: req.admin?.adminId,
      adminName: req.admin?.username,
      action: 'UPDATE_SHIPMENT',
      targetType: 'SHIPMENT',
      targetId: updated.trackingNumber,
      details: {
        previousStatus: existing.status,
        newStatus: updated.status,
        updatedFields: Object.keys(data),
      },
      req,
    });

    res.json({
      success: true,
      message: 'Shipment updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateShipment error:', error);
    res.status(500).json({ success: false, error: 'Failed to update shipment.' });
  }
}

export async function addCheckpoint(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const { status, location, timestamp, description, updateShipmentStatus } = req.body;

    const shipment = await prisma.shipment.findUnique({
      where: { id },
    });

    if (!shipment) {
      res.status(404).json({ success: false, error: 'Shipment not found' });
      return;
    }

    const checkpointDate = timestamp ? new Date(timestamp) : new Date();

    const checkpoint = await prisma.$transaction(async (tx) => {
      const createdCheckpoint = await tx.checkpoint.create({
        data: {
          shipmentId: shipment.id,
          status,
          location,
          timestamp: checkpointDate,
          description,
          createdByName: req.admin?.username || 'Staff',
        },
      });

      if (updateShipmentStatus) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {
          status,
          currentLocation: location,
        };

        if (status === 'Delivered' && !shipment.actualDeliveryDate) {
          updateData.actualDeliveryDate = checkpointDate;
        }

        await tx.shipment.update({
          where: { id: shipment.id },
          data: updateData,
        });
      }

      return createdCheckpoint;
    });

    await logAdminAction({
      adminId: req.admin?.adminId,
      adminName: req.admin?.username,
      action: 'ADD_CHECKPOINT',
      targetType: 'CHECKPOINT',
      targetId: checkpoint.id,
      details: {
        trackingNumber: shipment.trackingNumber,
        status,
        location,
        description,
      },
      req,
    });

    res.status(201).json({
      success: true,
      message: 'Checkpoint logged successfully.',
      data: checkpoint,
    });
  } catch (error) {
    console.error('addCheckpoint error:', error);
    res.status(500).json({ success: false, error: 'Failed to add checkpoint.' });
  }
}

export async function deleteShipment(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);

    const shipment = await prisma.shipment.findUnique({
      where: { id },
    });

    if (!shipment) {
      res.status(404).json({ success: false, error: 'Shipment not found' });
      return;
    }

    await prisma.shipment.delete({
      where: { id },
    });

    await logAdminAction({
      adminId: req.admin?.adminId,
      adminName: req.admin?.username,
      action: 'DELETE_SHIPMENT',
      targetType: 'SHIPMENT',
      targetId: shipment.trackingNumber,
      details: { trackingNumber: shipment.trackingNumber },
      req,
    });

    res.json({
      success: true,
      message: 'Shipment record deleted.',
    });
  } catch (error) {
    console.error('deleteShipment error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete shipment.' });
  }
}
