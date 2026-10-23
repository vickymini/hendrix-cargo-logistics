import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Ship,
  Truck,
  Globe2,
  FileCheck2,
  Warehouse,
  Home,
  Briefcase,
  Check,
  ArrowRight,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const serviceList = [
    {
      id: 'air-freight',
      title: 'Air Freight',
      icon: Plane,
      lead: 'Time-critical air cargo services with direct global routing.',
      description:
        'When delivery speed and safety are non-negotiable, our air freight network ensures rapid tarmac priority, temperature-regulated cargo compartments, and scheduled commercial or dedicated charter connections to major global airports.',
      capabilities: [
        'Priority Next-Flight-Out (NFO) routing',
        'Consolidated express air freight',
        'Temperature-controlled pharmaceutical & perishable cargo',
        'Dangerous Goods (DG) certified handling',
        'Direct tarmac escort and bonded customs transfer',
      ],
    },
    {
      id: 'sea-freight',
      title: 'Sea Freight',
      icon: Ship,
      lead: 'Economical, high-capacity ocean transport across international maritime lanes.',
      description:
        'Ideal for large-scale shipments, heavy industrial cargo, and bulk commodities. We coordinate full container loads (FCL), less-than-container loads (LCL), roll-on/roll-off (RoRo), and breakbulk projects through verified ocean carriers.',
      capabilities: [
        'Full Container Load (FCL 20ft / 40ft / High Cube)',
        'LCL consolidation and deconsolidation hubs',
        'Port drayage and intermodal rail links',
        'Reefer container monitoring for temperature integrity',
        'Marine cargo insurance brokerage',
      ],
    },
    {
      id: 'road-transportation',
      title: 'Road Transportation',
      icon: Truck,
      lead: 'Reliable overland freight networks connecting regional distribution corridors.',
      description:
        'Our ground fleet services offer flexible full truckload (FTL) and less-than-truckload (LTL) transit with continuous route surveillance, heavy haul permits, and synchronized hub drop-offs across continental trade routes.',
      capabilities: [
        'Scheduled FTL and LTL linehauls',
        'Cross-border transit documentation',
        'Specialized flatbeds, lowboys, and heavy machinery transport',
        'Tail-lift equipped vehicles for direct premises delivery',
        'Automated geofenced route tracking',
      ],
    },
    {
      id: 'international-shipping',
      title: 'International Shipping',
      icon: Globe2,
      lead: 'End-to-end global cargo transport connecting over 140 countries.',
      description:
        'Navigating international trade laws, customs documentation, and intermodal transfers requires specialized coordination. Hendrix manages the entire export-import chain with real database-verified milestones.',
      capabilities: [
        'Multimodal ocean-air-road logistics synchronization',
        'Comprehensive Bill of Lading (BOL) issuance',
        'Global trade lane compliance analysis',
        'Consulate documentation and legalizations',
        'Incoterms advisory (FOB, CIF, DDP, DAP)',
      ],
    },
    {
      id: 'import-export',
      title: 'Import and Export Logistics',
      icon: FileCheck2,
      lead: 'Customs clearance, regulatory compliance, and international trade facilitation.',
      description:
        'Avoid costly port demurrage and regulatory delays. Our licensed customs specialists facilitate tariff classification, duty computation, VAT deferment accounts, and direct submissions to national customs agencies.',
      capabilities: [
        'Harmonized System (HS) code classification',
        'Import/Export licensing and documentation audits',
        'Customs bonded warehousing transit',
        'Rules of Origin and preferential trade agreement utilization',
        'Pre-clearance processing before port arrival',
      ],
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      icon: Warehouse,
      lead: 'Modern, high-security storage and distribution hubs located at strategic transit gates.',
      description:
        'Keep inventory close to global transport hubs. Our warehousing facilities provide flexible pallet storage, cross-docking, pick-and-pack fulfillment, and climate-controlled bays with 24/7 security surveillance.',
      capabilities: [
        'Palletized storage and bulk racking systems',
        'Cross-docking for immediate route transfers',
        'Real-time inventory database auditing',
        'Custom packing, labeling, and pallet wrapping',
        'Bonded secure zones for uncleared cargo',
      ],
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door Delivery',
      icon: Home,
      lead: 'Effortless freight collection directly through to recipient address handover.',
      description:
        'Eliminate the complexity of multiple freight handoffs. We arrange collection directly from your manufacturing line or supplier facility and deliver straight to the recipient with electronic proof of delivery.',
      capabilities: [
        'Direct factory or warehouse pickup',
        'White-glove inside delivery options',
        'Residential and commercial destination handling',
        'Real-time delivery appointment notifications',
        'Digital signature and timestamped POD capture',
      ],
    },
    {
      id: 'business-logistics',
      title: 'Business Logistics Solutions',
      icon: Briefcase,
      lead: 'Contract logistics and dedicated supply chain engineering for corporate enterprises.',
      description:
        'For high-volume shippers and multinational corporations, we engineer custom logistics workflows with dedicated account managers, negotiated volume tariffs, and integrated supply chain reporting.',
      capabilities: [
        'Contract freight management and SLA commitments',
        'Vendor consolidation programs',
        'Dedicated corporate dispatch manager',
        'Quarterly freight spend and routing optimization',
        'Tailored logistics API integrations for ERP systems',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold-dark">
            Our Core Competencies
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-navy">
            Specialized Logistics Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hendrix Cargo & Logistics provides tailored freight operations designed to meet stringent
            safety, regulatory, and speed requirements across every continent.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {serviceList.map((svc, index) => {
            const Icon = svc.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={svc.id}
                id={svc.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm scroll-mt-24 transition-all hover:shadow-md"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-12 items-start`}
                >
                  {/* Left Column: Title & Description */}
                  <div className="flex-1 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                      {svc.title}
                    </h2>
                    <p className="text-brand-gold-dark font-medium text-sm sm:text-base">
                      {svc.lead}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">{svc.description}</p>
                    <div className="pt-2">
                      <Link
                        to={`/contact?service=${encodeURIComponent(svc.title)}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
                      >
                        <span>Request Custom Quotation for {svc.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Capabilities Box */}
                  <div className="w-full lg:w-96 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                    <h3 className="font-heading font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">
                      Key Operational Highlights
                    </h3>
                    <ul className="space-y-2.5">
                      {svc.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Need a Customized Logistics Configuration?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Our freight planners create custom routing, documentation, and charter solutions tailored
            to your exact operational timetable.
          </p>
          <div>
            <Link
              to="/contact"
              className="gold-gradient-btn px-8 py-3.5 rounded-lg text-brand-navy font-bold text-sm sm:text-base shadow-md inline-block"
            >
              Consult with a Logistics Specialist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
