import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { logAdminAction } from '../services/auditService';

export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, phone, subject, message } = req.body;

    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Hendrix Cargo & Logistics. Our customer support team will contact you shortly.',
      id: savedMessage.id,
    });
  } catch (error) {
    console.error('submitContact error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while submitting your message. Please try again.',
    });
  }
}

export async function listMessages(req: Request, res: Response): Promise<void> {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('listMessages error:', error);
    res.status(500).json({ success: false, error: 'Failed to load messages.' });
  }
}

export async function updateMessageStatus(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    if (req.admin) {
      await logAdminAction({
        adminId: req.admin.adminId,
        adminName: req.admin.username,
        action: 'UPDATE_MESSAGE_STATUS',
        targetType: 'MESSAGE',
        targetId: id,
        details: { status },
        req,
      });
    }

    res.json({
      success: true,
      message: 'Status updated.',
      data: updated,
    });
  } catch (error) {
    console.error('updateMessageStatus error:', error);
    res.status(500).json({ success: false, error: 'Failed to update message.' });
  }
}
