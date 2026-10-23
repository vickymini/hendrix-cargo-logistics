import { Request, Response } from 'express';
import { prisma } from '../config/db';

export async function getCompanySettings(req: Request, res: Response): Promise<void> {
  try {
    const settings = await prisma.companySetting.findMany();
    
    // Map to object
    const settingsMap: Record<string, string> = {
      companyName: 'Hendrix Cargo & Logistics',
      companyHeadline: 'Moving Your World, One Shipment at a Time.',
      companyTagline: 'Reliable cargo, freight, and logistics solutions connecting businesses and individuals across the globe.',
      supportEmail: 'support@hendrixcargo.com',
      salesEmail: 'contact@hendrixcargo.com',
      supportPhone: '+1 (800) 555-HCL2',
      operatingHours: 'Mon - Fri: 08:00 - 18:00 (GMT), 24/7 Dispatch Operations',
      headquartersAddress: 'Hendrix Logistics Terminal, Global Cargo District',
    };

    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    res.json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    console.error('getCompanySettings error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve company settings.' });
  }
}

export async function updateCompanySetting(req: Request, res: Response): Promise<void> {
  try {
    const { key, value, description } = req.body;

    const setting = await prisma.companySetting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('updateCompanySetting error:', error);
    res.status(500).json({ success: false, error: 'Failed to update company setting.' });
  }
}
