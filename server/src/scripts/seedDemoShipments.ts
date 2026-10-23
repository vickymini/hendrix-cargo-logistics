import { prisma } from '../config/db';

async function seedDemoShipments() {
  console.log('--- Seeding Realistic Demo Shipments ---');

  // Shipment 1: Air Freight - In Transit
  const s1 = await prisma.shipment.upsert({
    where: { trackingNumber: 'HCL-2026-LON88942' },
    update: {},
    create: {
      trackingNumber: 'HCL-2026-LON88942',
      senderName: 'Apex Precision Engineering Ltd',
      senderCompany: 'Apex Precision Engineering',
      senderPhone: '+44 20 7946 0912',
      senderEmail: 'dispatch@apexprecision.co.uk',
      senderAddress: '42 Industrial Boulevard',
      senderCity: 'London',
      senderCountry: 'United Kingdom',

      recipientName: 'Vanguard Aerospace Corporation',
      recipientCompany: 'Vanguard Aerospace Corp',
      recipientPhone: '+1 (212) 555-0199',
      recipientEmail: 'receiving@vanguardaero.com',
      recipientAddress: '780 Aviation Way, Suite 400',
      recipientCity: 'New York',
      recipientCountry: 'United States',

      originCity: 'London',
      originCountry: 'United Kingdom',
      destinationCity: 'New York',
      destinationCountry: 'United States',
      shippingMethod: 'Air Freight',

      packagePieces: 3,
      packageWeightKg: 145.5,
      packageDimensions: '120x80x65 cm',
      packageDescription: 'Precision Avionics Instrumentation Units - Fragile',

      status: 'Customs Clearance',
      currentLocation: 'JFK International Airport Cargo Terminal, New York',
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // in 2 days
      internalNotes: 'Customer requested priority tarmac transfer. Special handling clearance active.',

      checkpoints: {
        create: [
          {
            status: 'Shipment Created',
            location: 'London Heathrow Gateway, United Kingdom',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            description: 'Shipment manifest registered and flight allocation booked with carrier.',
            createdByName: 'London Dispatch Hub',
          },
          {
            status: 'Processing',
            location: 'London Logistics Center, United Kingdom',
            timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
            description: 'Security screening, X-ray scanning, and palletization completed.',
            createdByName: 'Air Cargo Operations',
          },
          {
            status: 'In Transit',
            location: 'Transatlantic Flight Route HCL-842',
            timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000),
            description: 'Air cargo departed London Heathrow (LHR) en route to New York (JFK).',
            createdByName: 'Flight Tracking System',
          },
          {
            status: 'Arrived at Facility',
            location: 'JFK Air Cargo Facility, New York, USA',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            description: 'Aircraft arrived at JFK. Cargo unloaded into secure bonded facility.',
            createdByName: 'JFK Hub Agent',
          },
          {
            status: 'Customs Clearance',
            location: 'US Customs & Border Protection Inspection Hub, NY',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            description: 'Import documentation submitted and awaiting final regulatory clearance.',
            createdByName: 'Customs Liaison Officer',
          },
        ],
      },
    },
  });

  // Shipment 2: Sea Freight - Delivered
  const s2 = await prisma.shipment.upsert({
    where: { trackingNumber: 'HCL-2026-SIN44120' },
    update: {},
    create: {
      trackingNumber: 'HCL-2026-SIN44120',
      senderName: 'Horizon Electronics Global',
      senderCompany: 'Horizon Electronics Pte',
      senderPhone: '+65 6789 0123',
      senderEmail: 'export@horizonelec.sg',
      senderAddress: '15 Jurong Port Road',
      senderCity: 'Singapore',
      senderCountry: 'Singapore',

      recipientName: 'Nordic Retail Distribution BV',
      recipientCompany: 'Nordic Retail BV',
      recipientPhone: '+31 10 234 5678',
      recipientEmail: 'intake@nordicdist.nl',
      recipientAddress: 'Havenlaan 102',
      recipientCity: 'Rotterdam',
      recipientCountry: 'Netherlands',

      originCity: 'Singapore',
      originCountry: 'Singapore',
      destinationCity: 'Rotterdam',
      destinationCountry: 'Netherlands',
      shippingMethod: 'Sea Freight',

      packagePieces: 24,
      packageWeightKg: 4200.0,
      packageDimensions: '20ft FCL Container #HCLU-984210',
      packageDescription: 'Commercial Consumer Electronics & Semi-conductor Panels',

      status: 'Delivered',
      currentLocation: 'Rotterdam Distribution Center, Netherlands',
      estimatedDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      actualDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      internalNotes: 'Consignee signed with digital seal. Full container inspect completed without damage.',

      checkpoints: {
        create: [
          {
            status: 'Shipment Created',
            location: 'Port of Singapore Logistics Terminal',
            timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
            description: 'Container booked and bill of lading issued.',
            createdByName: 'Singapore Maritime Ops',
          },
          {
            status: 'Picked Up',
            location: 'Jurong Port Warehouse, Singapore',
            timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
            description: 'Loaded into ocean vessel M/V Hendrix Oceanic.',
            createdByName: 'Port Handling Team',
          },
          {
            status: 'In Transit',
            location: 'Maritime Trade Route - Suez Transit',
            timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
            description: 'Vessel transiting Suez Canal on schedule.',
            createdByName: 'Ocean Ops Fleet Monitor',
          },
          {
            status: 'Arrived at Facility',
            location: 'Port of Rotterdam Maasvlakte Terminal, Netherlands',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: 'Container discharged from vessel and customs cleared.',
            createdByName: 'Rotterdam Port Gateway',
          },
          {
            status: 'Out for Delivery',
            location: 'Rotterdam Regional Drayage Fleet',
            timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
            description: 'Dispatched on heavy freight drayage truck for final delivery.',
            createdByName: 'Fleet Controller',
          },
          {
            status: 'Delivered',
            location: 'Havenlaan 102, Rotterdam, Netherlands',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            description: 'Delivered in full. Signed for by: M. Jansen (Warehouse Lead).',
            createdByName: 'Delivery Driver Unit 42',
          },
        ],
      },
    },
  });

  // Shipment 3: Road Transportation - On Hold
  const s3 = await prisma.shipment.upsert({
    where: { trackingNumber: 'HCL-2026-BER77315' },
    update: {},
    create: {
      trackingNumber: 'HCL-2026-BER77315',
      senderName: 'Bavarian Motor Components GmbH',
      senderCompany: 'BMC Logistics',
      senderPhone: '+49 89 1234 5678',
      senderEmail: 'freight@bavarianmotor.de',
      senderAddress: 'Industriestrasse 14',
      senderCity: 'Berlin',
      senderCountry: 'Germany',

      recipientName: 'Milano Auto Assemblies SpA',
      recipientCompany: 'Milano Auto Assemblies',
      recipientPhone: '+39 02 8765 4321',
      recipientEmail: 'logistica@milanoauto.it',
      recipientAddress: 'Via Lambro 28',
      recipientCity: 'Milan',
      recipientCountry: 'Italy',

      originCity: 'Berlin',
      originCountry: 'Germany',
      destinationCity: 'Milan',
      destinationCountry: 'Italy',
      shippingMethod: 'Road Transportation',

      packagePieces: 6,
      packageWeightKg: 850.0,
      packageDimensions: 'Standard Euro Pallets x 6',
      packageDescription: 'Precision Mechanical Parts & Transmission Couplings',

      status: 'On Hold',
      currentLocation: 'Innsbruck Transit Checkpoint, Austria',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      internalNotes: 'Transit permit review required for Brenner pass transport. Expected resolution within 24h.',

      checkpoints: {
        create: [
          {
            status: 'Shipment Created',
            location: 'Berlin Freight Depot, Germany',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: 'Consignment booked for trans-Alpine road transportation.',
            createdByName: 'Berlin Road Dispatch',
          },
          {
            status: 'In Transit',
            location: 'Autobahn A9 Southbound, Germany',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            description: 'Cargo truck en route to Austrian border.',
            createdByName: 'Telematics Control',
          },
          {
            status: 'On Hold',
            location: 'Innsbruck Freight Inspection Facility, Austria',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            description: 'Shipment temporarily on hold pending Alpine transit permit clearance.',
            createdByName: 'Alpine Transit Supervisor',
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded demo shipments:`);
  console.log(`   1) ${s1.trackingNumber} - Status: ${s1.status} (London -> New York)`);
  console.log(`   2) ${s2.trackingNumber} - Status: ${s2.status} (Singapore -> Rotterdam)`);
  console.log(`   3) ${s3.trackingNumber} - Status: ${s3.status} (Berlin -> Milan)`);

  await prisma.$disconnect();
}

seedDemoShipments().catch((err) => {
  console.error('Failed to seed demo shipments:', err);
  process.exit(1);
});
