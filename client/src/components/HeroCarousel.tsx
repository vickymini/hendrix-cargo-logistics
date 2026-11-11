import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Ship,
  Plane,
  Truck,
  Globe2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
  Clock,
  FileText,
  Anchor,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  badge: string;
  category: string;
  headline: string;
  highlightWord: string;
  description: string;
  videoUrl: string;
  fallbackImage: string;
  icon: React.ElementType;
  corridorTag: string;
  serviceAnchor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'sea-freight',
    badge: 'SLIDE 01 • MARITIME & OCEAN DIVISION',
    category: 'SEA FREIGHT',
    headline: 'Connecting Businesses Across Every Ocean.',
    highlightWord: 'Every Ocean.',
    description: 'Reliable international sea freight and cargo transportation solutions.',
    // Real container ship & port terminal footage + high-res maritime container vessel photography
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-arriving-at-port-41701-large.mp4',
    fallbackImage:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=85',
    icon: Ship,
    corridorTag: 'FCL / LCL Containerized Maritime Corridors • Port-to-Port & Intermodal',
    serviceAnchor: '/services#sea-freight',
  },
  {
    id: 'air-freight',
    badge: 'SLIDE 02 • AVIATION CARGO DIVISION',
    category: 'AIR FREIGHT',
    headline: 'Your Cargo. Our Priority. Delivered Worldwide.',
    highlightWord: 'Delivered Worldwide.',
    description: 'Fast and dependable air freight solutions for your business.',
    // Real cargo airplane & airport tarmac footage + high-res air freight photography
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-airplane-taking-off-in-the-evening-4053-large.mp4',
    fallbackImage:
      'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=2000&q=85',
    icon: Plane,
    corridorTag: 'Priority Tarmac Dispatch • Express Air Charter & Consolidated Cargo',
    serviceAnchor: '/services#air-freight',
  },
  {
    id: 'road-transport',
    badge: 'SLIDE 03 • OVERLAND FLEET DIVISION',
    category: 'ROAD TRANSPORT',
    headline: 'Moving Goods. Connecting Destinations.',
    highlightWord: 'Connecting Destinations.',
    description: 'Efficient road transportation and logistics support.',
    // Real highway heavy freight truck footage + high-res logistics fleet photography
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-trucks-driving-on-a-highway-42624-large.mp4',
    fallbackImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=85',
    icon: Truck,
    corridorTag: 'Full Truckload (FTL) & LTL • Cross-Border Drayage & Overland Distribution',
    serviceAnchor: '/services#road-transportation',
  },
  {
    id: 'global-logistics',
    badge: 'SLIDE 04 • INTEGRATED SUPPLY CHAIN',
    category: 'GLOBAL LOGISTICS',
    headline: 'Beyond Borders. Beyond Expectations.',
    highlightWord: 'Beyond Expectations.',
    description: 'Comprehensive logistics solutions designed around your needs.',
    // Real automated terminal & crane operations footage + high-res global terminal photography
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-container-terminal-at-port-41700-large.mp4',
    fallbackImage:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85',
    icon: Globe2,
    corridorTag: 'Multimodal Supply Chain • Bonded Warehousing & Customs Clearance',
    serviceAnchor: '/services#international-shipping',
  },
];

const SLIDE_INTERVAL_MS = 7500;

export const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, activeIndex]);

  // Subtle parallax effect on scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 900) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = HERO_SLIDES[activeIndex];
  const ActiveIcon = currentSlide.icon;

  return (
    <section
      className="relative w-full min-h-[86vh] lg:min-h-[90vh] bg-brand-navy-dark text-white overflow-hidden flex flex-col justify-between select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hendrix Global Logistics Hero Showcase"
    >
      {/* Background Video & High-Res Photography Layers */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.22}px, 0)`,
        }}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === activeIndex;
          const hasVideoError = videoErrors[slide.id];

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isCurrent}
            >
              {/* High-resolution photography layer (always rendered as base & instant fallback) */}
              <img
                src={slide.fallbackImage}
                alt={`${slide.category} — ${slide.headline}`}
                className={`w-full h-full object-cover object-center ${
                  isCurrent ? 'animate-ken-burns' : ''
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Real Muted HTML5 Logistics Video Layer */}
              {!hasVideoError && isCurrent && (
                <video
                  key={slide.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.fallbackImage}
                  onError={() =>
                    setVideoErrors((prev) => ({
                      ...prev,
                      [slide.id]: true,
                    }))
                  }
                  className="absolute inset-0 w-full h-full object-cover object-center animate-ken-burns"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          );
        })}

        {/* Multi-layered Cinematic Dark Overlays for Uncompromising Readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy/80 to-brand-navy-dark/60" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/35 to-brand-navy-dark/60" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 z-20 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-20 lg:pt-24 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Slide Headline, Description & CTAs */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8" key={currentSlide.id}>
            {/* Category Pill Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-brand-navy-surface/90 border border-brand-gold/40 backdrop-blur-md shadow-gold-glow animate-fadeIn">
              <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center">
                <ActiveIcon className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-brand-gold">
                {currentSlide.category}
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-xs text-slate-300 font-medium">
                Hendrix International Freight Network
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-heading font-extrabold tracking-tight text-white leading-[1.08] animate-fadeIn">
              {currentSlide.headline.replace(currentSlide.highlightWord, '')}
              <span className="gold-gradient-text block sm:inline">
                {currentSlide.highlightWord}
              </span>
            </h1>

            {/* Slide Description */}
            <p className="text-base sm:text-xl lg:text-2xl text-slate-200 max-w-2xl leading-relaxed font-light animate-fadeIn">
              {currentSlide.description}
            </p>

            {/* Operational Corridor Sub-caption */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300/90 font-medium animate-fadeIn">
              <Anchor className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>{currentSlide.corridorTag}</span>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fadeIn">
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className="gold-gradient-btn px-8 py-4 rounded-xl text-brand-navy font-heading font-extrabold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2.5 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#quote"
                onClick={(e) => scrollToSection(e, 'quote')}
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-brand-gold text-white font-heading font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5"
              >
                <FileText className="w-4 h-4 text-brand-gold" />
                <span>Request a Quote</span>
              </a>

              <Link
                to={currentSlide.serviceAnchor}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-white transition-colors"
              >
                <span>{currentSlide.category} Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Supply Chain Control Card */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="glass-card rounded-3xl p-6 xl:p-7 border border-brand-gold/25 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-brand-gold/15 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                      Active Division
                    </span>
                    <h3 className="font-heading font-bold text-white text-sm">
                      {currentSlide.category} Control
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  24/7 Dispatch
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-brand-navy-dark/70 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Verified Consignment Handling</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Database-backed milestone checkpoints with strict consignee privacy protection.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-navy-dark/70 border border-slate-800 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Direct Carrier Coordination</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Synchronized scheduling across ocean vessels, air cargo charters, and road fleets.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                <span className="text-slate-400">Have an active tracking code?</span>
                <a
                  href="#tracking-console"
                  onClick={(e) => scrollToSection(e, 'tracking-console')}
                  className="text-brand-gold hover:text-brand-gold-light font-bold flex items-center gap-1"
                >
                  <span>Track Below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Carousel Controls & 4-Slide Selector Bar */}
      <div className="relative z-30 border-t border-white/10 bg-brand-navy-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 4 Slide Indicators / Mode Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto flex-grow max-w-4xl">
              {HERO_SLIDES.map((slide, idx) => {
                const TabIcon = slide.icon;
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative text-left p-2.5 sm:p-3 rounded-xl border transition-all overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-brand-navy-surface/95 border-brand-gold/60 shadow-md'
                        : 'bg-brand-navy/40 border-white/10 hover:border-white/25 hover:bg-brand-navy-surface/40'
                    }`}
                    aria-label={`Select Slide ${idx + 1}: ${slide.category}`}
                    aria-current={isSelected ? 'true' : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-brand-gold text-brand-navy'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <TabIcon
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isSelected ? 'text-brand-gold' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span
                        className={`text-xs font-heading font-bold truncate ${
                          isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {slide.category}
                      </span>
                    </div>

                    {/* Active Progress Bar Indicator */}
                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold/30">
                        <div
                          className={`h-full bg-brand-gold ${
                            isPlaying ? 'w-full transition-all duration-[7500ms] ease-linear' : 'w-1/2'
                          }`}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Manual Navigation Arrows & Play/Pause Controls */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="p-2.5 rounded-xl bg-brand-navy-surface/80 hover:bg-brand-navy-surface border border-white/15 hover:border-brand-gold/50 text-slate-300 hover:text-brand-gold transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                title={isPlaying ? 'Pause automatic transition' : 'Resume automatic transition'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-xl bg-brand-navy-surface/80 hover:bg-brand-navy-surface border border-white/15 hover:border-brand-gold/50 text-slate-200 hover:text-brand-gold transition-colors cursor-pointer"
                aria-label="Previous slide"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-xl bg-brand-navy-surface/80 hover:bg-brand-navy-surface border border-white/15 hover:border-brand-gold/50 text-slate-200 hover:text-brand-gold transition-colors cursor-pointer"
                aria-label="Next slide"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

