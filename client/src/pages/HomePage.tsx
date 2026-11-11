import React, { useState } from 'react';
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
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Headphones,
  Lock,
  Award,
  ChevronDown,
  FileText,
  ClipboardCheck,
  PackageCheck,
  BellRing,
  Sparkles,
} from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { InteractiveTrackingSection } from '../components/InteractiveTrackingSection';
import { GlobalNetworkMap } from '../components/GlobalNetworkMap';
import { QuoteRequestSection } from '../components/QuoteRequestSection';

interface ServiceCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: React.ElementType;
  highlights: string[];
}

const PREMIUM_SERVICES: ServiceCardItem[] = [
  {
    id: 'sea-freight',
    title: 'Sea Freight',
    category: 'Maritime Division',
    description:
      'High-capacity Full Container Load (FCL), Less-than-Container Load (LCL), and breakbulk ocean shipping across major international maritime lanes.',
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
    icon: Ship,
    highlights: ['FCL & LCL Containers', 'Port-to-Port', 'Vessel Telemetry'],
  },
  {
    id: 'air-freight',
    title: 'Air Freight',
    category: 'Aviation Cargo',
    description:
      'Priority airport-to-airport and express air charter freight solutions engineered for time-critical, high-value global consignments.',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
    icon: Plane,
    highlights: ['Next-Flight-Out', 'Tarmac Priority', 'Climate Controlled'],
  },
  {
    id: 'road-transportation',
    title: 'Road Freight',
    category: 'Overland Fleet',
    description:
      'Dependable Full Truckload (FTL), LTL linehaul, and heavy drayage transportation connecting regional distribution hubs and cross-border corridors.',
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
    icon: Truck,
    highlights: ['FTL & LTL Fleet', 'Cross-Border', 'Heavy Haulage'],
  },
  {
    id: 'international-shipping',
    title: 'International Cargo',
    category: 'Global Multimodal',
    description:
      'Synchronized intermodal sea-air-road freight forwarding designed to move commercial cargo seamlessly across international borders.',
    image:
      'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80',
    icon: Globe2,
    highlights: ['Multimodal Routing', 'Global Gateways', 'End-to-End Control'],
  },
  {
    id: 'import-export',
    title: 'Import and Export',
    category: 'Trade Facilitation',
    description:
      'End-to-end commercial trade logistics, Bill of Lading administration, Incoterms advisory, and international supplier coordination.',
    image:
      'https://images.unsplash.com/photo-1506499927216-42c6282a9992?auto=format&fit=crop&w=900&q=80',
    icon: FileCheck2,
    highlights: ['Bill of Lading', 'Incoterms Advisory', 'Trade Compliance'],
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance',
    category: 'Regulatory Brokerage',
    description:
      'Pre-arrival customs documentation, Harmonized System (HS) tariff classification, duty processing, and bonded port inspection support.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    icon: ShieldAlert,
    highlights: ['HS Classification', 'Bonded Clearance', 'Duty Filing'],
  },
  {
    id: 'warehousing',
    title: 'Warehousing and Distribution',
    category: 'Storage & Fulfillment',
    description:
      'Secure high-bay pallet storage, bonded inventory management, cargo consolidation, cross-docking, and regional order distribution.',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
    icon: Warehouse,
    highlights: ['Bonded Storage', 'Cross-Docking', 'Inventory Auditing'],
  },
  {
    id: 'door-to-door',
    title: 'Door-to-Door Delivery',
    category: 'Direct Handover',
    description:
      'Direct pickup from factory or warehouse loading docks through to final recipient address delivery with verified proof of delivery.',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    icon: Home,
    highlights: ['Direct Pickup', 'Last-Mile Fleet', 'Verified Handover'],
  },
];

const VALUE_PROPOSITIONS = [
  {
    title: 'Reliable Logistics Solutions',
    description:
      'Predictable scheduling and structured multimodal contingency planning across ocean, aviation, and overland corridors.',
    icon: ShieldCheck,
  },
  {
    title: 'Professional Cargo Handling',
    description:
      'Strict palletization, container sealing, and specialized handling protocols for fragile, industrial, and commercial goods.',
    icon: Award,
  },
  {
    title: 'Efficient Transportation',
    description:
      'Optimized route engineering that minimizes terminal dwell times and synchronizes port-to-door drayage.',
    icon: Clock,
  },
  {
    title: 'Customer-Focused Service',
    description:
      'Dedicated dispatch specialists providing clear communication, tailored freight quotes, and responsive support.',
    icon: Headphones,
  },
  {
    title: 'International Shipping Support',
    description:
      'Comprehensive export/import documentation, Bill of Lading issuance, and customs clearance coordination.',
    icon: Globe2,
  },
  {
    title: 'Secure Cargo Management',
    description:
      'Database-verified milestone logging paired with strict public data sanitization to protect shipper and consignee privacy.',
    icon: Lock,
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Request a Quote',
    subtitle: 'Route & Tariff Engineering',
    description:
      'Submit your origin, destination, cargo weight, and preferred transport mode. Our specialists prepare a transparent routing and rate proposal.',
    icon: FileText,
    detail: 'Instant online inquiry submission with multimodal sea, air, and road options.',
  },
  {
    step: '02',
    title: 'Confirm Your Shipment',
    subtitle: 'Booking & Waybill Allocation',
    description:
      'Approve your freight schedule and documentation. Our system generates a unique HCL-2026-XXXXXXXX tracking code linked to our database.',
    icon: ClipboardCheck,
    detail: 'Cryptographically unique waybill generation and customs paperwork verification.',
  },
  {
    step: '03',
    title: 'Cargo Collection and Transportation',
    subtitle: 'Verified Multimodal Transit',
    description:
      'Your cargo is collected, inspected, and dispatched via scheduled ocean vessels, cargo aircraft, or overland freight fleets.',
    icon: PackageCheck,
    detail: 'Physical handling scans at origin terminals, transit hubs, and customs gates.',
  },
  {
    step: '04',
    title: 'Delivery and Shipment Updates',
    subtitle: 'Milestone Telemetry & Handover',
    description:
      'Follow every chronological checkpoint online until final recipient handover and verified delivery confirmation.',
    icon: BellRing,
    detail: '13 distinct status classifications with printable cargo manifest receipts.',
  },
];

const FAQS = [
  {
    q: 'How can I track my shipment with Hendrix Cargo & Logistics?',
    a: 'Enter your official tracking number (in the format HCL-2026-XXXXXXXX) into the interactive tracking console below the hero banner or on our Track Shipment page. You will view real database-backed status badges, origin and destination terminals, estimated delivery dates, and chronological checkpoints.',
  },
  {
    q: 'Are the sample tracking numbers on the website live carrier feeds or demonstration records?',
    a: 'In commitment to data honesty, the sample tracking numbers (HCL-2026-LON88942, HCL-2026-SIN44120, and HCL-2026-BER77315) are clearly labeled demonstration consignments stored in our database to showcase our tracking interface. Our platform architecture is built to connect to live carrier APIs when credentials are provisioned, and authorized staff can log real shipment checkpoints via the Administrator Portal.',
  },
  {
    q: 'What freight and logistics services does Hendrix provide?',
    a: 'We provide eight core services: Sea Freight (FCL/LCL), Air Freight, Road Freight, International Cargo, Import and Export Logistics, Customs Clearance, Warehousing and Distribution, and Door-to-Door Delivery.',
  },
  {
    q: 'How does Hendrix protect shipper and recipient privacy on public tracking searches?',
    a: 'Public tracking queries are automatically sanitized by our server before leaving the database. Private street addresses, personal telephone numbers, email addresses, and internal staff notes are strictly withheld from public view.',
  },
  {
    q: 'How do I request a custom freight quotation for my business?',
    a: 'You can use the interactive Quotation Request form directly on this page or visit our Contact Us page. Specify your origin port/city, destination, estimated weight, and transport mode, and our dispatch team will respond promptly.',
  },
];

export const HomePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-w-0 bg-brand-slate-bg">
      {/* 1. CINEMATIC FULL-SCREEN HOMEPAGE HERO */}
      <HeroCarousel />

      {/* 2. INTERACTIVE SHIPMENT TRACKING CONSOLE */}
      <InteractiveTrackingSection />

      {/* 3. PREMIUM SERVICES SECTION (8 Image-Based Service Cards) */}
      <section id="services" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span>End-to-End Freight Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-navy leading-tight">
                Global Cargo &amp; Freight Services
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From containerized maritime shipments and express aviation charters to customs
                brokerage and last-mile delivery, every consignment is engineered for precision.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-heading font-bold text-xs sm:text-sm transition-all shadow-md self-start md:self-auto"
            >
              <span>View Full Service Specifications</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>

          {/* 8 Distinct Image-Based Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {PREMIUM_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <article
                  key={svc.id}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-brand-gold/70 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Card Photography Header with Zoom on Hover */}
                    <div className="relative h-52 overflow-hidden bg-brand-navy">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy-dark/25 to-transparent" />

                      {/* Category Badge */}
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-navy-dark/80 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                        {svc.category}
                      </span>

                      {/* Floating Modality Icon */}
                      <div className="absolute bottom-3.5 right-3.5 w-11 h-11 rounded-xl bg-brand-gold text-brand-navy flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2.25]" />
                      </div>

                      <h3 className="absolute bottom-3.5 left-4 right-16 font-heading font-extrabold text-xl text-white leading-snug drop-shadow">
                        {svc.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pb-4">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer & Highlights */}
                  <div className="px-6 pb-6 pt-2 space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {svc.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        to={`/services#${svc.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold-dark transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href="#quote"
                        className="text-[11px] font-semibold text-slate-400 hover:text-brand-navy transition-colors"
                      >
                        Get Quote
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL SHIPPING EXPERIENCE (Interactive World Map & Route Corridors) */}
      <GlobalNetworkMap />

      {/* 5. WHY CHOOSE HENDRIX (Split Layout with Cargo Photography & 6 Value Propositions) */}
      <section id="why-hendrix" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 5 Cols: Visual Cargo Photography Showcase */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
                  alt="Hendrix International Container Terminal Operations"
                  loading="lazy"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-navy border border-brand-gold/30 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">
                      Operational Standard
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Handling
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    &ldquo;Every consignment is tracked through authenticated checkpoint scans—never
                    unverified assumptions.&rdquo;
                  </p>
                </div>
              </div>

              {/* Verified Platform Capabilities Counter Bar (Strictly Genuine System Metrics) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
                {[
                  { value: '8', label: 'Core Freight Modalities', sub: 'Sea, Air, Road & Customs' },
                  { value: '13', label: 'Milestone Status Codes', sub: 'Granular Transit Telemetry' },
                  { value: '24/7', label: 'Dispatch & Tracking', sub: 'Continuous Portal Access' },
                  { value: '100%', label: 'Sanitized Data Privacy', sub: 'Protected Consignee Info' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-gold/50 transition-colors"
                  >
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 7 Cols: Company Introduction & 6 Value Propositions */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                  Why Choose Hendrix Cargo &amp; Logistics
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-navy leading-tight">
                  Engineered for Global Trade Integrity &amp; Precision
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Hendrix Cargo &amp; Logistics combines disciplined physical freight handling with
                  modern shipment visibility. Whether moving a single air pallet or full ocean
                  containers, our operations prioritize security, transparency, and punctual handover.
                </p>
              </div>

              {/* 6 Required Value Propositions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {VALUE_PROPOSITIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-brand-gold/60 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-heading font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Discover Our Operational Standards</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </Link>
                <a
                  href="#quote"
                  className="px-6 py-3.5 rounded-xl border border-slate-300 hover:border-brand-gold text-slate-800 hover:text-brand-navy font-heading font-bold text-xs sm:text-sm transition-colors"
                >
                  Speak with a Freight Planner
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (Interactive 4-Step Process) */}
      <section
        id="how-it-works"
        className="py-20 lg:py-28 bg-brand-slate-bg border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
              Structured Freight Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-navy">
              How Your Shipment Moves
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Four transparent stages from initial rate quotation to final verified delivery and
              milestone updates.
            </p>
          </div>

          {/* Interactive 4-Step Cards with Connecting Line */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Line */}
            <div className="hidden lg:block absolute top-14 left-12 right-12 h-0.5 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy opacity-30 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {HOW_IT_WORKS_STEPS.map((st, idx) => {
                const Icon = st.icon;
                const isSelected = activeStep === idx;
                return (
                  <div
                    key={st.step}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-navy text-white border-brand-gold shadow-2xl -translate-y-1'
                        : 'bg-white hover:bg-slate-50/90 text-slate-900 border-slate-200 shadow-sm hover:border-brand-gold/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-colors ${
                            isSelected
                              ? 'bg-brand-gold text-brand-navy'
                              : 'bg-brand-navy text-brand-gold'
                          }`}
                        >
                          <Icon className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span
                          className={`font-mono text-2xl font-extrabold ${
                            isSelected ? 'text-brand-gold' : 'text-slate-300'
                          }`}
                        >
                          {st.step}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                          isSelected ? 'text-brand-gold' : 'text-brand-gold-dark'
                        }`}
                      >
                        {st.subtitle}
                      </span>

                      <h3
                        className={`font-heading font-extrabold text-lg sm:text-xl mb-2.5 ${
                          isSelected ? 'text-white' : 'text-brand-navy'
                        }`}
                      >
                        {st.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                          isSelected ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {st.description}
                      </p>
                    </div>

                    <div
                      className={`pt-3 border-t text-[11px] font-medium ${
                        isSelected
                          ? 'border-slate-700/80 text-brand-gold-light'
                          : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      {st.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT COMMITMENTS & VERIFIED TESTIMONIAL INTEGRITY SECTION */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy text-brand-gold text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client Service Charter &amp; Review Policy</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                  Built on Verifiable Performance, Not Fabricated Claims
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  In accordance with our strict integrity standards, Hendrix Cargo &amp; Logistics
                  never publishes fabricated customer testimonials or unverified partnership logos.
                  Every consignment is backed by our written service commitments: transparent
                  tariff quotes, database-authenticated milestone scans, and strict consignee privacy.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    Consignee Privacy
                  </span>
                  <h4 className="font-heading font-bold text-brand-navy text-base">
                    Masked Public Records
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Recipient phone numbers, street addresses, and commercial invoices are never
                    exposed on public tracking lookups.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    Verified Feedback
                  </span>
                  <h4 className="font-heading font-bold text-brand-navy text-base">
                    Shipper Desk Support
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Completed a shipment with Hendrix? Submit your waybill feedback directly to our
                    operations board via the{' '}
                    <Link to="/contact" className="text-brand-navy font-bold underline">
                      Customer Desk
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-navy">
              Clear Answers on Freight &amp; Tracking
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
              Learn how Hendrix manages international cargo routing, customs documentation, and
              real-time database tracking.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-heading font-bold text-slate-900 hover:text-brand-navy text-sm sm:text-base cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-gold' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. QUOTATION REQUEST & GLOBAL DISPATCH CONTACT SECTION */}
      <QuoteRequestSection />
    </div>
  );
};
