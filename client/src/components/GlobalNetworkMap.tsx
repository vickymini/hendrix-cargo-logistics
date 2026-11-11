import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ship,
  Plane,
  Truck,
  Globe2,
  MapPin,
  ArrowRight,
  Radio,
  ShieldCheck,
  Navigation,
  Info,
} from 'lucide-react';

interface CorridorRoute {
  id: string;
  mode: 'sea' | 'air' | 'road';
  modeLabel: string;
  title: string;
  origin: {
    name: string;
    code: string;
    x: number;
    y: number;
  };
  destination: {
    name: string;
    code: string;
    x: number;
    y: number;
  };
  pathD: string;
  demoTrackingCode: string;
  description: string;
  protocol: string;
}

const CORRIDOR_ROUTES: CorridorRoute[] = [
  {
    id: 'sea-sin-rtm',
    mode: 'sea',
    modeLabel: 'Sea Freight Corridor',
    title: 'Asia–Europe Maritime Lane',
    origin: { name: 'Port of Singapore', code: 'SGSIN', x: 755, y: 295 },
    destination: { name: 'Port of Rotterdam', code: 'NLRTM', x: 485, y: 145 },
    // Curved maritime path via Indian Ocean / Suez / Mediterranean to Rotterdam
    pathD: 'M 755 295 Q 640 325 575 235 T 485 145',
    demoTrackingCode: 'HCL-2026-SIN44120',
    description:
      'High-capacity FCL and LCL containerized maritime shipping linking Southeast Asian export terminals with European deep-water ports.',
    protocol: 'Bonded Port Clearance • Vessel Telemetry • FCL/LCL',
  },
  {
    id: 'air-lhr-jfk',
    mode: 'air',
    modeLabel: 'Air Freight Corridor',
    title: 'Transatlantic Priority Air Bridge',
    origin: { name: 'London Gateway', code: 'GBLHR', x: 472, y: 148 },
    destination: { name: 'New York Terminal', code: 'USJFK', x: 278, y: 178 },
    // High-altitude great-circle arc across the North Atlantic
    pathD: 'M 472 148 Q 375 85 278 178',
    demoTrackingCode: 'HCL-2026-LON88942',
    description:
      'Time-critical aviation cargo routing with priority tarmac handling and pre-arrival customs filing between UK and North American gateways.',
    protocol: 'Next-Flight-Out • Priority Tarmac • IATA Compliant',
  },
  {
    id: 'road-ber-mil',
    mode: 'road',
    modeLabel: 'Road Freight Corridor',
    title: 'Continental Overland Drayage',
    origin: { name: 'Berlin Freight Hub', code: 'DEBER', x: 512, y: 144 },
    destination: { name: 'Milan Logistics Hub', code: 'ITMIL', x: 505, y: 168 },
    pathD: 'M 512 144 Q 518 156 505 168',
    demoTrackingCode: 'HCL-2026-BER77315',
    description:
      'Scheduled Full Truckload (FTL) and palletized road freight connecting Central and Southern European industrial manufacturing zones.',
    protocol: 'FTL / LTL Linehaul • Cross-Border Permits • Direct Dock',
  },
];

export const GlobalNetworkMap: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'all' | 'sea' | 'air' | 'road'>('all');
  const [activeRouteId, setActiveRouteId] = useState<string>('sea-sin-rtm');

  const visibleRoutes =
    selectedMode === 'all'
      ? CORRIDOR_ROUTES
      : CORRIDOR_ROUTES.filter((r) => r.mode === selectedMode);

  const activeRoute =
    CORRIDOR_ROUTES.find((r) => r.id === activeRouteId) || visibleRoutes[0] || CORRIDOR_ROUTES[0];

  const getModeIcon = (mode: 'sea' | 'air' | 'road') => {
    if (mode === 'sea') return Ship;
    if (mode === 'air') return Plane;
    return Truck;
  };

  return (
    <section
      id="shipping-solutions"
      className="py-20 lg:py-28 navy-gradient-bg text-white relative overflow-hidden border-y border-brand-navy-surface"
    >
      {/* Subtle Background Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header & Mode Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-surface border border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-brand-gold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Supply Chain Control Interface</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Global Shipping Experience &amp; <span className="gold-gradient-text">Multimodal Corridors</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Explore our synchronized air, ocean, and overland freight routing architecture. Select any
              corridor below to inspect handling protocols and active demonstration shipments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-brand-navy-dark/80 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'all', label: 'All Corridors', icon: Globe2 },
              { id: 'sea', label: 'Sea Freight', icon: Ship },
              { id: 'air', label: 'Air Freight', icon: Plane },
              { id: 'road', label: 'Road Transport', icon: Truck },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = selectedMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    const mode = tab.id as 'all' | 'sea' | 'air' | 'road';
                    setSelectedMode(mode);
                    if (mode !== 'all') {
                      const match = CORRIDOR_ROUTES.find((r) => r.mode === mode);
                      if (match) setActiveRouteId(match.id);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-gold text-brand-navy shadow-gold-glow'
                      : 'text-slate-300 hover:text-white hover:bg-brand-navy-surface/60'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive World Map & Route Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 8 Cols: Interactive SVG Supply Chain World Map */}
          <div className="lg:col-span-8 bg-brand-navy-dark/90 rounded-3xl border border-brand-gold/25 shadow-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Top Map Telemetry Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  MULTIMODAL ROUTING MATRIX
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="hidden sm:inline text-slate-400 font-mono">
                  PROJECTION: EQUIDISTANT GLOBAL
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-brand-gold">
                  <span className="w-3 h-0.5 bg-brand-gold inline-block" />
                  Air Freight Arc
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                  Sea Freight Lane
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                  Overland Corridor
                </span>
              </div>
            </div>

            {/* Stylized World Map SVG Canvas */}
            <div className="relative w-full aspect-[16/9] min-h-[260px] flex items-center justify-center">
              <svg
                viewBox="0 0 1000 460"
                className="w-full h-full select-none"
                role="img"
                aria-label="Global Freight Routing Map"
              >
                <defs>
                  <radialGradient id="nodeGlowGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                  <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F7E096" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>

                {/* Graticule Latitude / Longitude Lines */}
                {[90, 160, 230, 300, 370].map((y) => (
                  <line
                    key={`lat-${y}`}
                    x1="20"
                    y1={y}
                    x2="980"
                    y2={y}
                    stroke="#1E3E62"
                    strokeWidth="0.6"
                    strokeDasharray="3 6"
                    opacity="0.45"
                  />
                ))}
                {[150, 300, 450, 600, 750, 900].map((x) => (
                  <line
                    key={`lon-${x}`}
                    x1={x}
                    y1="20"
                    x2={x}
                    y2="440"
                    stroke="#1E3E62"
                    strokeWidth="0.6"
                    strokeDasharray="3 6"
                    opacity="0.45"
                  />
                ))}

                {/* Stylized Continental Silhouettes */}
                <g fill="#152844" stroke="#254670" strokeWidth="1.2">
                  {/* North America */}
                  <path d="M 95 75 L 235 65 L 310 115 L 295 190 L 235 235 L 185 250 L 145 205 L 90 140 Z" />
                  {/* Central & South America */}
                  <path d="M 225 255 L 295 270 L 345 330 L 310 425 L 265 430 L 240 345 Z" />
                  {/* Europe */}
                  <path d="M 445 80 L 565 70 L 595 135 L 550 185 L 460 180 L 440 135 Z" />
                  {/* Africa */}
                  <path d="M 450 200 L 565 195 L 615 265 L 575 385 L 515 395 L 475 310 L 440 250 Z" />
                  {/* Asia */}
                  <path d="M 595 75 L 845 75 L 895 165 L 835 275 L 745 305 L 665 260 L 605 195 Z" />
                  {/* Oceania / Australia */}
                  <path d="M 765 335 L 885 330 L 905 405 L 805 415 L 760 375 Z" />
                </g>

                {/* Subtle Continental Dot Matrix Overlay */}
                <g fill="#2C5282" opacity="0.45">
                  {[
                    [160, 130], [190, 150], [220, 140], [250, 165], [280, 320], [295, 360],
                    [480, 120], [500, 140], [530, 130], [550, 150], [500, 240], [540, 280],
                    [545, 340], [660, 150], [710, 170], [760, 200], [800, 180], [750, 260],
                    [825, 365], [855, 380],
                  ].map(([cx, cy], idx) => (
                    <circle key={idx} cx={cx} cy={cy} r="2.5" />
                  ))}
                </g>

                {/* Animated Freight Corridors */}
                {visibleRoutes.map((route) => {
                  const isFocused = route.id === activeRoute.id;
                  const strokeColor =
                    route.mode === 'air'
                      ? '#D4AF37'
                      : route.mode === 'sea'
                      ? '#38BDF8'
                      : '#34D399';

                  return (
                    <g
                      key={route.id}
                      onClick={() => setActiveRouteId(route.id)}
                      className="cursor-pointer"
                    >
                      {/* Base Glow Path */}
                      <path
                        d={route.pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={isFocused ? 5 : 2}
                        opacity={isFocused ? 0.25 : 0.12}
                      />

                      {/* Animated Dashed Route Line */}
                      <path
                        d={route.pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={isFocused ? 2.8 : 1.8}
                        className={
                          route.mode === 'air' ? 'animate-route-air' : 'animate-route-dash'
                        }
                        opacity={isFocused ? 1 : 0.65}
                      />

                      {/* Origin Terminal Node */}
                      <g transform={`translate(${route.origin.x}, ${route.origin.y})`}>
                        <circle
                          r={isFocused ? 14 : 8}
                          fill="url(#nodeGlowGold)"
                          className={isFocused ? 'animate-ping' : ''}
                        />
                        <circle
                          r={isFocused ? 5.5 : 4}
                          fill="#0B192C"
                          stroke={strokeColor}
                          strokeWidth="2.5"
                        />
                        <text
                          y="-10"
                          textAnchor="middle"
                          fill="#F8FAFC"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="Outfit, sans-serif"
                        >
                          {route.origin.name}
                        </text>
                      </g>

                      {/* Destination Terminal Node */}
                      <g transform={`translate(${route.destination.x}, ${route.destination.y})`}>
                        <circle
                          r={isFocused ? 14 : 8}
                          fill="url(#nodeGlowGold)"
                          className={isFocused ? 'animate-ping' : ''}
                        />
                        <circle
                          r={isFocused ? 5.5 : 4}
                          fill={strokeColor}
                          stroke="#0B192C"
                          strokeWidth="2"
                        />
                        <text
                          y="18"
                          textAnchor="middle"
                          fill="#D4AF37"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="Outfit, sans-serif"
                        >
                          {route.destination.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Map Transparency Note */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>
                  Displaying confirmed demonstration trade corridors linked to the Hendrix tracking
                  database. Custom routing available upon quote request.
                </span>
              </span>
              <span className="font-mono text-brand-gold font-semibold">
                ACTIVE CORRIDOR: {activeRoute.origin.code} → {activeRoute.destination.code}
              </span>
            </div>
          </div>

          {/* Right 4 Cols: Interactive Corridor Inspector & Route Selector */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5">
            {/* Corridor Selector List */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block px-1">
                Select Freight Corridor ({visibleRoutes.length})
              </span>

              {visibleRoutes.map((route) => {
                const Icon = getModeIcon(route.mode);
                const isSelected = route.id === activeRoute.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setActiveRouteId(route.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-navy-surface border-brand-gold shadow-gold-glow'
                        : 'bg-brand-navy-dark/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{route.modeLabel}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {route.origin.code} → {route.destination.code}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-white text-base mb-1">
                      {route.title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                      <span>
                        {route.origin.name} ↔ {route.destination.name}
                      </span>
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Corridor Telemetry Card */}
            <div className="bg-brand-navy-surface/90 rounded-3xl p-6 border border-brand-gold/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold block">
                    Corridor Specifications
                  </span>
                  <h4 className="font-heading font-bold text-white text-lg">
                    {activeRoute.title}
                  </h4>
                </div>
                <Navigation className="w-5 h-5 text-brand-gold" />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeRoute.description}
              </p>

              <div className="p-3 rounded-xl bg-brand-navy-dark/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{activeRoute.protocol}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Link
                  to={`/track/${activeRoute.demoTrackingCode}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-gold text-brand-navy font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-brand-gold-light transition-colors"
                >
                  <span>Inspect Demo Manifest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="#quote"
                  className="py-2.5 px-4 rounded-xl bg-brand-navy-dark hover:bg-slate-800 border border-slate-700 text-white font-heading font-semibold text-xs flex items-center justify-center transition-colors"
                >
                  Book This Lane
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

