import React from 'react';
import { Link } from 'react-router-dom';
import {
  Ship,
  Plane,
  Truck,
  Globe2,
  FileCheck2,
  ShieldAlert,
  Warehouse,
  Home,
  Briefcase,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const serviceList = [
    {
      id: 'sea-freight',
      title: 'Sea Freight',
      icon: Ship,
      image:
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85',
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
      id: 'air-freight',
      title: 'Air Freight',
      icon: Plane,
      image:
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85',
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
      id: 'road-transportation',
      title: 'Road Freight & Transportation',
      icon: Truck,
      image:
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85',
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
      title: 'International Cargo',
      icon: Globe2,
      image:
        'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=85',
      lead: 'End-to-end global cargo transport connecting major international trade gateways.',
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
      image:
        'https://images.unsplash.com/photo-1506499927216-42c6282a9992?auto=format&fit=crop&w=1200&q=85',
      lead: 'Commercial trade facilitation, tariff advisory, and cross-border supply chain execution.',
      description:
        'Streamline international procurement and export distribution. We coordinate supplier collection, export packing lists, certificates of origin, and synchronized port loading schedules.',
      capabilities: [
        'Export commercial invoice and packing list verification',
        'Certificate of Origin and chamber legalizations',
        'Supplier multi-vendor consolidation',
        'Letter of Credit (L/C) compliant shipping documentation',
        'Port terminal receiving and vessel booking',
      ],
    },
    {
      id: 'customs-clearance',
      title: 'Customs Clearance',
      icon: ShieldAlert,
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85',
      lead: 'Regulatory brokerage, HS tariff classification, and port inspection clearance.',
      description:
        'Avoid costly port demurrage and regulatory delays. Our customs specialists facilitate Harmonized System (HS) classification, duty computation, bonded transit permits, and pre-arrival customs filings.',
      capabilities: [
        'Harmonized System (HS) code classification',
        'Import/Export licensing and documentation audits',
        'Customs bonded warehousing transit',
        'Preferential trade agreement & duty assessment',
        'Pre-clearance processing before port or airport arrival',
      ],
    },
    {
      id: 'warehousing',
      title: 'Warehousing and Distribution',
      icon: Warehouse,
      image:
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=85',
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
      image:
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=85',
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
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
      lead: 'Contract logistics and dedicated supply chain engineering for corporate enterprises.',
      description:
        'For high-volume shippers and commercial enterprises, we engineer custom logistics workflows with dedicated account coordinators, negotiated volume tariffs, and integrated supply chain reporting.',
      capabilities: [
        'Contract freight management and SLA commitments',
        'Vendor consolidation programs',
        'Dedicated corporate dispatch coordinator',
        'Quarterly freight spend and routing optimization',
        'Tailored logistics API integrations for ERP systems',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Executive Page Header Banner */}
      <div className="bg-brand-navy text-white py-16 lg:py-24 border-b border-brand-navy-surface relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multimodal Freight Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white">
            Specialized Logistics Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hendrix Cargo &amp; Logistics provides end-to-end freight forwarding engineered to meet
            stringent safety, customs compliance, and speed requirements worldwide.
          </p>
        </div>
      </div>

      {/* Services Detailed Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        {serviceList.map((svc, index) => {
          const Icon = svc.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              key={svc.id}
              id={svc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl scroll-mt-28 transition-all duration-300"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Photography Column */}
                <div
                  className={`lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-brand-navy ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="px-3 py-1 rounded-full bg-brand-navy-dark/85 border border-brand-gold/40 text-xs font-bold text-brand-gold">
                      0{index + 1} • {svc.title}
                    </span>
                  </div>
                </div>

                {/* Details & Capabilities Column */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold-dark block">
                          Hendrix Freight Division
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                          {svc.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-brand-navy font-semibold text-sm sm:text-base">{svc.lead}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                    <h3 className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
                      Key Operational Capabilities
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {svc.capabilities.map((cap, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                        >
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                    <Link
                      to={`/contact?service=${encodeURIComponent(svc.title)}`}
                      className="gold-gradient-btn px-6 py-3 rounded-xl text-brand-navy font-heading font-bold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2"
                    >
                      <span>Request Quote for {svc.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/track"
                      className="text-xs font-bold text-slate-500 hover:text-brand-navy transition-colors"
                    >
                      Track Existing Shipment →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-brand-navy-surface">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Need a Custom Multimodal Logistics Configuration?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            Our freight planners engineer custom sea-air-road routing, customs clearance, and
            charter solutions tailored to your exact operational timetable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="gold-gradient-btn px-8 py-3.5 rounded-xl text-brand-navy font-bold text-sm sm:text-base shadow-md inline-block"
            >
              Consult with a Logistics Specialist
            </Link>
            <Link
              to="/track"
              className="px-8 py-3.5 rounded-xl bg-brand-navy-surface hover:bg-brand-navy-light border border-slate-700 text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Track Active Consignment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
