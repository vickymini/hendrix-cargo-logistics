import React, { useState } from 'react';
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
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Headphones,
  Award,
} from 'lucide-react';
import { TrackingSearchBar } from '../components/TrackingSearchBar';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const services = [
    {
      id: 'air-freight',
      title: 'Air Freight',
      icon: Plane,
      description:
        'Priority airport-to-airport and door-to-door express air cargo solutions for time-critical global freight.',
      tags: ['Express Cargo', 'Charter Services', 'Temperature-Controlled'],
    },
    {
      id: 'sea-freight',
      title: 'Sea Freight',
      icon: Ship,
      description:
        'Cost-effective ocean shipping connecting major global trade lanes with FCL, LCL, and oversized breakbulk handling.',
      tags: ['FCL & LCL', 'Port Clearance', 'Vessel Tracking'],
    },
    {
      id: 'road-transportation',
      title: 'Road Transportation',
      icon: Truck,
      description:
        'Scheduled long-haul drayage and regional road freight networks ensuring dependable overland supply chain transit.',
      tags: ['Full Truckload', 'Cross-Border', 'Heavy Freight'],
    },
    {
      id: 'international-shipping',
      title: 'International Shipping',
      icon: Globe2,
      description:
        'End-to-end multimodal transport solutions connecting businesses across more than 140 nations worldwide.',
      tags: ['Multimodal', 'Global Routes', 'Real-Time Manifest'],
    },
    {
      id: 'import-export',
      title: 'Import and Export Logistics',
      icon: FileCheck2,
      description:
        'Comprehensive tariff advisory, customs compliance documentation, and duty payment processing support.',
      tags: ['Customs Clearance', 'Tariff Guidance', 'Regulatory Filing'],
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      icon: Warehouse,
      description:
        'Secure bonded storage, modern inventory distribution facilities, consolidation, and cross-docking operations.',
      tags: ['Secure Storage', 'Cross-Docking', 'Inventory Control'],
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door Delivery',
      icon: Home,
      description:
        'Seamless collection from your supplier facility through to final address delivery with digital signature proof.',
      tags: ['Last Mile', 'Direct Dispatch', 'Proof of Delivery'],
    },
    {
      id: 'business-logistics',
      title: 'Business Logistics Solutions',
      icon: Briefcase,
      description:
        'Tailored enterprise freight management, contract logistics, and supply chain optimization for growing businesses.',
      tags: ['B2B Freight', 'Contract Logistics', 'Dedicated Account'],
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Book & Quote',
      desc: 'Submit your cargo dimensions and origin-destination routes for tailored freight scheduling.',
    },
    {
      step: '02',
      title: 'Secure Collection',
      desc: 'Our dispatch team secures and scans your cargo with instant digital barcode allocation.',
    },
    {
      step: '03',
      title: 'Global Transit',
      desc: 'Your consignment moves along validated air, sea, or road lanes with real database updates.',
    },
    {
      step: '04',
      title: 'Verified Handover',
      desc: 'Cargo is delivered to the designated recipient with immediate electronic proof of delivery.',
    },
  ];

  const faqs = [
    {
      q: 'How can I track my shipment with Hendrix Cargo & Logistics?',
      a: 'Enter your unique tracking code (in the format HCL-2026-XXXXXXXX) into the tracking search box at the top of our website. You will instantly see your cargo status, origin, destination, estimated delivery date, and chronological checkpoint history.',
    },
    {
      q: 'What shipping methods does Hendrix provide?',
      a: 'We offer Air Freight, Sea Freight, Road Transportation, International Shipping, Import/Export Customs Logistics, Secure Warehousing, Door-to-Door Delivery, and tailored Enterprise Business Logistics.',
    },
    {
      q: 'How are customs and international clearance handled?',
      a: 'Our international customs liaisons coordinate directly with port authorities and customs clearance agents to verify bill of lading documents, commercial invoices, and regulatory clearances, ensuring minimal port hold times.',
    },
    {
      q: 'Can authorized personnel update shipment tracking milestones?',
      a: 'Yes. Our staff and authorized field agents log into our secure Administrator Portal to report transit checkpoints, update current locations, and adjust estimated delivery schedules.',
    },
    {
      q: 'How do you protect customer data on public tracking searches?',
      a: 'Public tracking pages are strictly sanitized. Sensitive customer information such as private street addresses, personal phone numbers, emails, and internal staff notes are never disclosed to public search results.',
    },
  ];

  return (
    <div className="flex flex-col min-w-0">
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-brand-navy-surface">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-gold blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-navy-light blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs sm:text-sm text-brand-gold font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              International Cargo & Freight Network
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Moving Your World, <br />
              <span className="gold-gradient-text">One Shipment at a Time.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-light">
              Reliable cargo, freight, and logistics solutions connecting businesses and individuals
              across the globe.
            </p>

            {/* Tracking Search Widget Card */}
            <div className="pt-6 max-w-2xl mx-auto">
              <TrackingSearchBar size="large" showSamples={true} />
            </div>

            {/* Quick Hero Feature Indicators */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Verified Logistics</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Global Coverage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Timely Handover</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Headphones className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
              End-to-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-navy">
              Comprehensive Cargo & Freight Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From individual express parcels to containerized ocean freight, our multimodal network
              delivers precision and care for every consignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-gold/60 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-brand-gold mb-5 group-hover:scale-105 transition-transform shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-navy transition-colors mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {svc.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 mb-4">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200/60 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/services#${svc.id}`}
                      className="text-xs font-bold text-brand-navy group-hover:text-brand-gold-dark flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-brand-slate-bg border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
              Simple & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-navy">
              How Your Shipment Travels
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We ensure complete visibility at every stage of the logistics journey, from booking to
              the recipient’s doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, i) => (
              <div key={st.step} className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-heading font-extrabold text-brand-gold">
                    {st.step}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                    {i + 1}/4
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">{st.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
                About Hendrix Cargo & Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                Global Logistics Excellence Built on Integrity and Speed
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Hendrix Cargo & Logistics is an international freight handling and supply chain management
                firm. We combine modern logistics technology with rigorous handling standards to move
                cargo safely across continents.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Authentic Database Tracking</h4>
                    <p className="text-xs text-slate-600">
                      Every tracking number is linked to verified database entries and authenticated staff reports.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Strict Customer Privacy</h4>
                    <p className="text-xs text-slate-600">
                      Private addresses, phone numbers, and internal company notes remain shielded from public searches.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Multimodal Carrier Coordination</h4>
                    <p className="text-xs text-slate-600">
                      Synchronized transit across air cargo fleets, ocean vessels, and verified overland drayage.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-navy text-white hover:text-brand-gold text-sm font-bold transition-all shadow-md"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-brand-navy-surface">
                <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-brand-gold/10 blur-2xl" />
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold flex items-center justify-center text-brand-navy shadow-gold-glow">
                    <Award className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    Our Operational Promise
                  </h3>
                  <blockquote className="text-slate-300 text-sm sm:text-base italic leading-relaxed">
                    &ldquo;Whether shipping precision instruments across the Atlantic or containerized goods
                    through maritime corridors, we treat every consignment as our highest priority.&rdquo;
                  </blockquote>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Hendrix Operations Board</span>
                    <span className="text-brand-gold font-semibold">Global Freight Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-brand-navy">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-heading font-bold text-slate-800 hover:text-brand-navy text-sm sm:text-base cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-brand-gold' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Support CTA */}
      <section className="bg-brand-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold">
            Ready to Dispatch Your Next Consignment?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light">
            Contact our freight specialists for personalized cargo quotes, scheduled logistics, or
            enterprise supply chain partnerships.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="gold-gradient-btn px-8 py-3.5 rounded-lg text-brand-navy font-bold text-sm sm:text-base shadow-lg"
            >
              Contact Customer Support
            </Link>
            <Link
              to="/track"
              className="px-8 py-3.5 rounded-lg bg-brand-navy-surface hover:bg-brand-navy-surface/80 border border-slate-700 text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Track Active Shipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
