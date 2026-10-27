import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
  ArrowRight,
  RotateCw,
  Cpu,
  Battery,
  ShieldCheck,
  Zap,
  CornerDownRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Radio,
  Flame,
  Star,
  Compass,
  Smile,
  Eye,
  ShoppingBag,
  Globe,
  Clock,
  RotateCcw,
  Truck,
  Heart,
  Gift,
  Plus,
  Minus,
  Sparkle,
  ArrowUpRight,
  Activity,
  Terminal,
  Grid
} from 'lucide-react';
import Glitch3DViewer from './components/Glitch3DViewer';
import EasterEggKeypad from './components/EasterEggKeypad';
import { GLITCH_EXPRESSIONS, HARDWARE_HOTSPOTS, HONEST_FAQS } from './data/glitchData';
import { sound } from './utils/sound';

export default function App() {
  const [currentExpression, setCurrentExpression] = useState('sparkle');
  const [activeHotspotId, setActiveHotspotId] = useState('oled');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollAngle, setScrollAngle] = useState(0);
  const [manualScrubAngle, setManualScrubAngle] = useState(0);
  const [useManualAngle, setUseManualAngle] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Currency & Cart State
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [cartCount, setCartCount] = useState(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('crystal'); // 'crystal', 'smoke', 'cyber'

  const storySectionRef = useRef(null);

  const CURRENCIES = {
    USD: { symbol: '$', rate: 1, basePrice: 89 },
    EUR: { symbol: '€', rate: 0.92, basePrice: 82 },
    GBP: { symbol: '£', rate: 0.78, basePrice: 69 },
    PKR: { symbol: 'Rs.', rate: 278, basePrice: 24700 },
    CAD: { symbol: 'CA$', rate: 1.36, basePrice: 121 },
    AUD: { symbol: 'AU$', rate: 1.52, basePrice: 135 },
    AED: { symbol: 'AED ', rate: 3.67, basePrice: 326 }
  };

  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const currentPriceFormatted = `${curr.symbol}${curr.basePrice.toLocaleString()}`;

  const handleToggleSound = () => {
    const isNowOn = sound.toggle();
    setSoundEnabled(isNowOn);
  };

  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      if (!storySectionRef.current || useManualAngle) return;
      const rect = storySectionRef.current.getBoundingClientRect();
      const sectionH = storySectionRef.current.offsetHeight;
      const winH = window.innerHeight;

      const totalScrollable = sectionH - winH;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollAngle(progress * 360);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion, useManualAngle]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setReducedMotion(true);
    const listener = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const activeHotspot = HARDWARE_HOTSPOTS.find((h) => h.id === activeHotspotId) || HARDWARE_HOTSPOTS[0];
  const activeExpressionObj = GLITCH_EXPRESSIONS.find((e) => e.id === currentExpression) || GLITCH_EXPRESSIONS[0];

  const handleAddToCart = () => {
    sound.playOledBlink();
    setCartCount(cartCount + 1);
    setCartDrawerOpen(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#cbf34a', '#3fe0ff', '#ff68b5', '#ff6b35', '#000000']
    });
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    sound.playClick();
    setWaitlistSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#cbf34a', '#3fe0ff', '#ff68b5', '#ff6b35', '#000000']
    });
  };

  return (
    <div className={`min-h-screen bg-[#f4f0ea] text-[#000000] selection:bg-[#cbf34a] selection:text-black ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* 1. TOP MARQUEE BANNER */}
      <div className="w-full bg-[#000000] text-[#cbf34a] border-b-2 border-black py-2 font-mono text-xs font-black tracking-wider uppercase overflow-hidden select-none">
        <div className="animate-marquee-scroll flex gap-8 items-center">
          <span className="flex items-center gap-1.5"><Sparkle className="w-3.5 h-3.5 fill-[#cbf34a]" /> XYZ // GLITCH DROP 01</span>
          <span className="bg-[#3fe0ff] text-black px-2.5 py-0.5 rounded-full border border-black font-bold">50 × 40 × 20 MM OPTICAL RESIN</span>
          <span>⚡ OVER 70+ ANIMATED OLED REACTIONS</span>
          <span className="bg-[#ff68b5] text-black px-2.5 py-0.5 rounded-full border border-black font-bold">5+ DAYS MOTION-WAKE BATTERY</span>
          <span>★ TYPE "GLITCH" ON KEYPAD FOR SECRET PERK</span>
          <span className="bg-[#cbf34a] text-black px-2.5 py-0.5 rounded-full border border-black font-bold">DISPATCH GLOBALLY IN 7 DAYS</span>
          <span className="flex items-center gap-1.5"><Sparkle className="w-3.5 h-3.5 fill-[#cbf34a]" /> XYZ // GLITCH DROP 01</span>
        </div>
      </div>

      {/* 2. VALUE PROPOSITION SUB-BAR */}
      <div className="bg-[#cbf34a] border-b-3 border-black px-4 md:px-12 py-2 flex flex-wrap justify-between items-center font-mono text-xs font-black uppercase text-black">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-black" /> FREE WORLDWIDE AIR DELIVERY
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-black" /> DISPATCH IN 7 DAYS
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-black" /> 7-DAY NO-FUSS MONEY BACK GUARANTEE
          </span>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 ml-auto">
          <Globe className="w-3.5 h-3.5" />
          <select
            value={selectedCurrency}
            onChange={(e) => {
              sound.playClick();
              setSelectedCurrency(e.target.value);
            }}
            className="bg-white border-2 border-black px-2 py-0.5 rounded-full font-mono text-xs font-black focus:outline-none cursor-pointer shadow-brutal-sm"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>
                {c} ({CURRENCIES[c].symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. DENSE NEO-BRUTALIST HEADER (Kristina Volchek Style) */}
      <header className="sticky top-0 z-40 bg-[#f4f0ea]/95 backdrop-blur-md border-b-3 border-black px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <span className="bg-[#000000] text-[#cbf34a] font-black text-2xl tracking-tighter px-3 py-1 rounded-xl border-2 border-black shadow-brutal-sm group-hover:-rotate-2 transition-transform font-['Archivo']">
              XYZ
            </span>
            <span className="font-mono text-xs font-black bg-[#3fe0ff] text-black px-2.5 py-1 rounded-full border-2 border-black shadow-brutal-sm">
              GLITCH // 01
            </span>
          </a>
        </div>

        {/* Pill Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 font-mono text-xs font-black uppercase">
          <a href="#hero" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#cbf34a] hover:-translate-y-0.5 transition-all">
            OVERVIEW
          </a>
          <a href="#bento" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#3fe0ff] hover:-translate-y-0.5 transition-all">
            SPECS BENTO
          </a>
          <a href="#expressions" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#ff68b5] hover:-translate-y-0.5 transition-all">
            MOODS
          </a>
          <a href="#teardown" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#cbf34a] hover:-translate-y-0.5 transition-all">
            360° SPIN
          </a>
          <a href="#keypad" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#ff6b35] hover:text-white hover:-translate-y-0.5 transition-all">
            SECRET PERK
          </a>
          <a href="#faq" className="px-3.5 py-1.5 bg-white rounded-full border-2 border-black shadow-brutal-sm hover:bg-[#3fe0ff] hover:-translate-y-0.5 transition-all">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Subtle Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-pressed={soundEnabled}
            className={`font-mono text-xs font-black px-3 py-1.5 rounded-full border-2 border-black flex items-center gap-1.5 shadow-brutal-sm transition-all ${
              soundEnabled ? 'bg-[#cbf34a] text-black' : 'bg-white text-black hover:bg-[#3fe0ff]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">AUDIO:</span> {soundEnabled ? 'ON' : 'OFF'}
          </button>

          {/* Cart Bag Icon with Counter */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCartDrawerOpen(true);
            }}
            className="bg-[#cbf34a] text-black font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>BAG ({cartCount})</span>
          </button>
        </div>
      </header>

      <main>
        {/* SECTION 1: HERO (Kristina Volchek Style Asymmetric Bento Hero) */}
        <section id="hero" className="border-b-3 border-black px-4 md:px-12 py-12 md:py-16 bg-grid-neo">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Narrative Block */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Pill Sticker Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-pill bg-[#ff68b5] text-black -rotate-2">
                  ★ PRODUCT LAUNCH 2026
                </span>
                <span className="badge-pill bg-[#3fe0ff] text-black rotate-1">
                  OPTICAL CLEAR RESIN ENCAPSULATED
                </span>
                <span className="badge-pill bg-[#cbf34a] text-black -rotate-1">
                  50 × 40 × 20 MM
                </span>
              </div>

              {/* Massive Condensed Headline */}
              <div>
                <span className="font-mono text-xs font-black text-[#ff6b35] tracking-widest uppercase block mb-1">
                  CYBERNETIC KEYCHAIN CRITTER
                </span>
                <h1 className="font-['Archivo'] font-black text-6xl sm:text-7xl md:text-8xl leading-[0.88] uppercase tracking-tighter text-black">
                  MEET <span className="bg-[#cbf34a] px-3 py-1 rounded-2xl border-3 border-black shadow-brutal inline-block rotate-1">GLITCH</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-[#333] font-medium leading-relaxed max-w-xl">
                Tired of minimalist tech designed to disappear? <strong>GLITCH</strong> is loud, collectible, and tactile. Suspended inside an optical clear resin case with over <strong>70+ animated reactions</strong> on a 64×32 blue OLED display, motion-wake accelerometer, and 5+ days battery life.
              </p>

              {/* Purchase Bento Box */}
              <div className="bg-white border-3 border-black rounded-3xl p-6 shadow-brutal-lg max-w-lg flex flex-col gap-4">
                <div className="flex items-baseline justify-between border-b-2 border-black pb-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#555] font-black uppercase block">BATCH 01 PRICE</span>
                    <span className="font-['Archivo'] font-black text-4xl text-black">
                      {currentPriceFormatted}
                    </span>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="bg-[#cbf34a] px-2.5 py-1 rounded-full border border-black font-black text-[10px] uppercase block">
                      READY TO SHIP
                    </span>
                    <span className="text-gray-600 text-[10px] mt-0.5 block">DISPATCH IN 7 DAYS</span>
                  </div>
                </div>

                {/* Edition Pill Picker */}
                <div className="flex items-center gap-2 font-mono text-xs font-black">
                  <span className="text-[#555]">EDITION:</span>
                  {[
                    { id: 'crystal', label: 'OPTICAL CLEAR' },
                    { id: 'smoke', label: 'SMOKE BLACK' },
                    { id: 'cyber', label: 'CYBER TINT' }
                  ].map((ed) => (
                    <button
                      key={ed.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedEdition(ed.id);
                      }}
                      className={`px-3 py-1 rounded-full border-2 border-black text-[11px] font-black uppercase transition-all ${
                        selectedEdition === ed.id
                          ? 'bg-[#cbf34a] shadow-brutal-sm -translate-y-0.5'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {ed.label}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-[#cbf34a] text-black font-mono font-black text-xs md:text-sm uppercase py-4 rounded-2xl border-3 border-black shadow-brutal btn-brutal-hover flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                  </button>
                  <a
                    href="#teardown"
                    className="bg-black text-white font-mono font-black text-xs md:text-sm uppercase py-4 rounded-2xl border-3 border-black shadow-brutal btn-brutal-hover text-center flex items-center justify-center gap-1.5"
                  >
                    360° SPIN ↘
                  </a>
                </div>
              </div>

              {/* Colorful Metric Tags */}
              <div className="flex flex-wrap gap-3 max-w-lg">
                <div className="bg-[#3fe0ff] border-2 border-black px-4 py-2 rounded-2xl shadow-brutal-sm -rotate-1">
                  <span className="font-['Archivo'] font-black text-2xl text-black block leading-none">70+</span>
                  <span className="font-mono text-[9px] font-black uppercase text-black block mt-0.5">ANIMATIONS</span>
                </div>
                <div className="bg-[#ff68b5] border-2 border-black px-4 py-2 rounded-2xl shadow-brutal-sm rotate-1">
                  <span className="font-['Archivo'] font-black text-2xl text-black block leading-none">5+ DAYS</span>
                  <span className="font-mono text-[9px] font-black uppercase text-black block mt-0.5">MOTION-WAKE BATTERY</span>
                </div>
                <div className="bg-[#cbf34a] border-2 border-black px-4 py-2 rounded-2xl shadow-brutal-sm -rotate-1">
                  <span className="font-['Archivo'] font-black text-2xl text-black block leading-none">0.96”</span>
                  <span className="font-mono text-[9px] font-black uppercase text-black block mt-0.5">BLUE OLED</span>
                </div>
              </div>
            </div>

            {/* Right 3D Model Centerpiece */}
            <div className="lg:col-span-6 bg-white border-3 border-black rounded-3xl p-5 md:p-7 shadow-brutal-xl relative flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-3 pb-2 border-b-2 border-black font-mono text-xs">
                <span className="font-black flex items-center gap-2 uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbf34a] border border-black animate-pulse" />
                  REAL-TIME 3D ARTIFACT
                </span>
                <span className="bg-[#3fe0ff] text-black px-3 py-0.5 rounded-full border border-black font-black text-[10px] uppercase shadow-brutal-sm">
                  MOOD: {activeExpressionObj.name}
                </span>
              </div>

              <Glitch3DViewer
                currentExpressionId={currentExpression}
                onExpressionChange={setCurrentExpression}
                activeHotspotId={activeHotspotId}
                onHotspotSelect={setActiveHotspotId}
                reducedMotion={reducedMotion}
                className="w-full"
              />

              {/* Hotspot Readout Card */}
              <div className="w-full mt-4 bg-[#cbf34a] border-2 border-black p-4 rounded-2xl shadow-brutal-sm flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm uppercase tracking-tight text-black">
                    {activeHotspot.title}
                  </span>
                  <span className="font-mono text-[10px] font-black bg-black text-[#cbf34a] px-2.5 py-0.5 rounded-full uppercase">
                    {activeHotspot.badge}
                  </span>
                </div>
                <p className="text-xs text-[#222] font-medium leading-relaxed">
                  {activeHotspot.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: KRISTINA VOLCHEK SIGNATURE BENTO GRID (Bento Features) */}
        <section id="bento" className="border-b-3 border-black px-4 md:px-12 py-16 md:py-20 bg-[#f4f0ea]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
            <div>
              <span className="badge-pill bg-[#ff6b35] text-white -rotate-1 mb-2">
                MODULAR SPECIFICATIONS
              </span>
              <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black">
                ENGINEERED WITH ZERO POLITE COMPROMISE.
              </h2>
            </div>

            {/* Asymmetric Neo-Brutalist Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Card 1: Large Lime Feature */}
              <div className="md:col-span-2 bg-[#cbf34a] border-3 border-black rounded-3xl p-8 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-black text-[#cbf34a] mb-4">COMPUTE ENGINE</span>
                  <Cpu className="w-10 h-10 text-black mb-3" />
                  <h3 className="font-['Archivo'] font-black text-3xl uppercase mb-2">
                    ESP32-C3 RISC-V @ 160MHZ
                  </h3>
                  <p className="text-base text-[#222] font-medium leading-relaxed max-w-md">
                    Single-core 32-bit RISC-V processor with 400KB SRAM and 8MB SPI flash. Runs 60FPS physics animations and sensor polling loops without breaking a sweat.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-6 mt-4 border-t-2 border-black font-mono text-xs font-black">
                  <span className="bg-white px-3 py-1 rounded-full border border-black">UF2 DRAG & DROP</span>
                  <span className="bg-white px-3 py-1 rounded-full border border-black">OPEN SOURCE FIRMWARE</span>
                </div>
              </div>

              {/* Card 2: Cyan Motion Card */}
              <div className="bg-[#3fe0ff] border-3 border-black rounded-3xl p-6 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-black text-[#3fe0ff] mb-4">6-AXIS IMU</span>
                  <Zap className="w-9 h-9 text-black mb-2" />
                  <h3 className="font-['Archivo'] font-black text-2xl uppercase mb-1">
                    MPU6050 MOTION
                  </h3>
                  <p className="text-xs text-[#222] font-medium leading-normal">
                    Real gyro and accelerometer sensors detect physical movement, freefall drops, and shaking gestures.
                  </p>
                </div>
                <span className="font-mono text-xs font-black bg-white px-3 py-1 rounded-full border border-black w-fit mt-4">
                  MOTION-WAKE ACTIVE
                </span>
              </div>

              {/* Card 3: Pink Battery Card */}
              <div className="bg-[#ff68b5] border-3 border-black rounded-3xl p-6 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-black text-[#ff68b5] mb-4">POWER SYSTEM</span>
                  <Battery className="w-9 h-9 text-black mb-2" />
                  <h3 className="font-['Archivo'] font-black text-2xl uppercase mb-1">
                    550MAH RECHARGEABLE
                  </h3>
                  <p className="text-xs text-[#222] font-medium leading-normal">
                    Protected lithium pouch with insulated bottom drawer. 5+ days standby with motion-wake logic.
                  </p>
                </div>
                <span className="font-mono text-xs font-black bg-white px-3 py-1 rounded-full border border-black w-fit mt-4">
                  FAST USB-C RECHARGE
                </span>
              </div>

              {/* Card 4: Purple Display Card */}
              <div className="bg-[#9b51e0] text-white border-3 border-black rounded-3xl p-6 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-white text-black mb-4">HIGH CONTRAST</span>
                  <Eye className="w-9 h-9 text-white mb-2" />
                  <h3 className="font-['Archivo'] font-black text-2xl uppercase mb-1">
                    0.96” BLUE OLED
                  </h3>
                  <p className="text-xs text-white/90 font-medium leading-normal">
                    Crisp 64×32 monochrome display with zero pixel bleed. Perfect daylight visibility under optical acrylic.
                  </p>
                </div>
                <span className="font-mono text-xs font-black bg-white text-black px-3 py-1 rounded-full border border-black w-fit mt-4">
                  70+ EYE ANIMATIONS
                </span>
              </div>

              {/* Card 5: Orange Enclosure Card */}
              <div className="md:col-span-2 bg-[#ff6b35] text-white border-3 border-black rounded-3xl p-8 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-white text-black mb-4">TACTILE HARDWARE</span>
                  <ShieldCheck className="w-10 h-10 text-white mb-3" />
                  <h3 className="font-['Archivo'] font-black text-3xl uppercase mb-2">
                    50 × 40 × 20 MM OPTICAL RESIN
                  </h3>
                  <p className="text-base text-white/95 font-medium leading-relaxed max-w-md">
                    Monolithic clear resin enclosure with radiused edges and a Grade 5 titanium keyring loop pull-tested to 35kg. Designed to be dropped and carried daily.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-6 mt-4 border-t-2 border-white/30 font-mono text-xs font-black">
                  <span className="bg-black text-white px-3 py-1 rounded-full border border-white">GRADE 5 TITANIUM LOOP</span>
                  <span className="bg-black text-white px-3 py-1 rounded-full border border-white">REMOVABLE CELL TRAY</span>
                </div>
              </div>

              {/* Card 6: White Tech Card */}
              <div className="bg-white border-3 border-black rounded-3xl p-6 shadow-brutal card-brutal-hover flex flex-col justify-between">
                <div>
                  <span className="badge-pill bg-[#cbf34a] text-black mb-4">CUTOFF</span>
                  <Activity className="w-9 h-9 text-black mb-2" />
                  <h3 className="font-['Archivo'] font-black text-2xl uppercase mb-1">
                    0μA HARD SWITCH
                  </h3>
                  <p className="text-xs text-[#333] font-medium leading-normal">
                    A physical slide switch physically cuts battery contacts so GLITCH stays fresh for months in storage.
                  </p>
                </div>
                <span className="font-mono text-xs font-black bg-[#cbf34a] text-black px-3 py-1 rounded-full border border-black w-fit mt-4">
                  ZERO VAMPIRE DRAIN
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 70+ EXPRESSIONS & MOODS (Kristina Color Cards) */}
        <section id="expressions" className="border-b-3 border-black px-4 md:px-12 py-16 md:py-20 bg-[#f4f0ea]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="badge-pill bg-[#ff68b5] text-black -rotate-1 mb-2">
                  FIRMWARE MOOD ENGINE
                </span>
                <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black">
                  70+ BUILT-IN ANIMATIONS.
                </h2>
              </div>
              <p className="text-sm font-mono font-bold text-black bg-[#cbf34a] px-4 py-2 rounded-2xl border-2 border-black shadow-brutal-sm rotate-1 max-w-md">
                👉 Click any expression below to test live on the 3D model's OLED screen above.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GLITCH_EXPRESSIONS.map((expr, idx) => {
                const isSelected = currentExpression === expr.id;
                const cardColors = [
                  'bg-[#cbf34a]', // lime
                  'bg-[#3fe0ff]', // cyan
                  'bg-[#ff68b5]', // pink
                  'bg-[#ff6b35]', // orange
                  'bg-[#9b51e0]', // purple
                  'bg-white'       // white
                ];
                const cardBg = cardColors[idx % cardColors.length];
                const isDark = cardBg === 'bg-[#9b51e0]' || cardBg === 'bg-[#ff6b35]';

                return (
                  <div
                    key={expr.id}
                    onClick={() => {
                      sound.playOledBlink();
                      setCurrentExpression(expr.id);
                    }}
                    className={`${cardBg} ${isDark ? 'text-white' : 'text-black'} border-3 border-black rounded-3xl p-6 cursor-pointer shadow-brutal card-brutal-hover flex flex-col justify-between ${
                      isSelected ? 'ring-4 ring-black -translate-y-2 shadow-brutal-lg' : ''
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[10px] font-black bg-black text-[#3fe0ff] px-3 py-1 rounded-full uppercase border border-white">
                          {expr.tag}
                        </span>
                        <span className={`font-mono text-[10px] font-black ${isDark ? 'text-white/80' : 'text-black'}`}>
                          {expr.category}
                        </span>
                      </div>

                      {/* OLED Canvas Screen */}
                      <div className="w-full h-24 bg-[#050c14] border-2 border-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                        <canvas
                          ref={(c) => {
                            if (c) {
                              c.width = 160;
                              c.height = 80;
                              const ctx = c.getContext('2d');
                              if (ctx) expr.draw(ctx, 160, 80);
                            }
                          }}
                          className="w-full h-full block"
                        />
                      </div>

                      <h4 className="font-['Archivo'] font-black text-3xl uppercase tracking-tight mb-1">
                        {expr.name}
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-white/80' : 'text-[#222]'} font-medium leading-normal min-h-[36px]`}>
                        {expr.description}
                      </p>
                    </div>

                    <div className={`mt-4 pt-3 border-t-2 ${isDark ? 'border-white/30' : 'border-black'} flex justify-between items-center font-mono text-xs font-black`}>
                      <span className="uppercase">
                        {isSelected ? '● ACTIVE MOOD' : 'CLICK TO TEST'}
                      </span>
                      <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">OLED 0.96”</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: SECRET HACKER KEYPAD PERK (Rekko Inspired Easter Egg) */}
        <section id="keypad" className="border-b-3 border-black px-4 md:px-12 py-16 md:py-20 bg-[#3fe0ff]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <span className="badge-pill bg-black text-[#cbf34a] -rotate-1 w-fit">
                SECRET STOREFRONT EASTER EGG
              </span>
              <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black leading-[0.88]">
                SPELL THE CODE TO UNLOCK FREE AIR DELIVERY.
              </h2>
              <p className="text-base md:text-lg text-[#111] font-medium leading-relaxed">
                Just like typing secret cheat codes on retro arcade machines or the Rekko storefront spell prompt, enter <strong>GLITCH</strong> on the tactile hacker keypad to activate free priority air shipping and an exclusive sticker bomb pack.
              </p>
            </div>

            <div className="w-full flex justify-center">
              <EasterEggKeypad onUnlock={() => setFreeShippingUnlocked(true)} />
            </div>
          </div>
        </section>

        {/* SECTION 5: SCROLL-DRIVEN 360° TEARDOWN */}
        <section id="teardown" ref={storySectionRef} className="border-b-3 border-black bg-hazard-tape">
          <div className="bg-black text-[#cbf34a] px-4 md:px-12 py-3.5 border-b-3 border-black flex items-center justify-between font-mono text-xs font-black">
            <span className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-[#3fe0ff] animate-spin" /> SCROLL-LINKED 360° TEARDOWN ENGINE
            </span>
            <span className="bg-[#ff6b35] text-white px-3 py-0.5 rounded-full border border-black">
              ANGLE: {Math.round(useManualAngle ? manualScrubAngle : scrollAngle)}°
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 relative max-w-[1400px] mx-auto bg-[#f4f0ea]">
            {/* Sticky 3D Model Left */}
            <div className="lg:col-span-6 lg:sticky lg:top-[70px] lg:h-[calc(100vh-70px)] flex flex-col justify-center p-4 md:p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
              <div className="bg-white border-3 border-black rounded-3xl p-6 shadow-brutal-xl">
                <Glitch3DViewer
                  currentExpressionId={currentExpression}
                  onExpressionChange={setCurrentExpression}
                  activeHotspotId={activeHotspotId}
                  onHotspotSelect={setActiveHotspotId}
                  forcedAngle={useManualAngle ? manualScrubAngle : scrollAngle}
                  reducedMotion={reducedMotion}
                  className="w-full"
                />

                <div className="mt-4 pt-3 border-t-2 border-black flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between items-center font-black">
                    <label htmlFor="scrub-slider">MANUAL SCRUBBER CONTROL:</label>
                    <span className="bg-[#cbf34a] text-black px-2 py-0.5 rounded-full border border-black">
                      {Math.round(useManualAngle ? manualScrubAngle : scrollAngle)}°
                    </span>
                  </div>
                  <input
                    id="scrub-slider"
                    type="range"
                    min="0"
                    max="360"
                    value={useManualAngle ? manualScrubAngle : scrollAngle}
                    onChange={(e) => {
                      setUseManualAngle(true);
                      setManualScrubAngle(parseFloat(e.target.value));
                    }}
                    className="w-full accent-black cursor-pointer"
                  />
                  {useManualAngle && (
                    <button
                      type="button"
                      onClick={() => setUseManualAngle(false)}
                      className="font-mono text-xs font-black text-[#ff6b35] hover:underline self-end"
                    >
                      ↺ RE-SYNC TO SCROLL
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Narrative Teardown Steps */}
            <div className="lg:col-span-6 p-6 md:p-12 flex flex-col gap-16">
              {[
                {
                  deg: 0,
                  tag: '0° // FRONT FACE',
                  badgeBg: 'bg-[#cbf34a]',
                  title: 'Flush Optical Resin & 64×32 Monochrome OLED',
                  copy: 'Underneath a polished 2.5D acrylic lens sits a high-contrast cyan-blue OLED screen. The display renders at crisp 60FPS with zero visible pixel bleeding, framed by the raw blue soldermask and copper traces of the prototype board.',
                  specs: ['Monochrome I2C SSD1306', 'High daylight contrast', 'Flush mounted']
                },
                {
                  deg: 90,
                  tag: '90° // RIGHT FLANK',
                  badgeBg: 'bg-[#ff6b35]',
                  title: 'Hard ON/OFF Slide Switch',
                  copy: 'A positive-detent micro rocker switch on the right edge physically breaks battery power. Unlike modern devices with battery vampire drain, stowing GLITCH in OFF mode guarantees zero microamp standby leakage for months.',
                  specs: ['Positive mechanical detent', '0μA quiescent cutoff', 'Recessed anti-snag slot']
                },
                {
                  deg: 180,
                  tag: '180° // REAR SHIELD',
                  badgeBg: 'bg-[#3fe0ff]',
                  title: 'Protected LiPo Compartment & Kapton Wrap',
                  copy: 'We deliberately do not cast the lithium-polymer pouch into solid resin. The rear features a modular polycarbonate battery chamber holding a 3.7V 500mAh cell with yellow Kapton insulation tape and hardware over-discharge protection.',
                  specs: ['Removable cell tray', 'Thermal isolation', 'Gold-plated pogo contacts']
                },
                {
                  deg: 270,
                  tag: '270° // LEFT FLANK',
                  badgeBg: 'bg-[#ff68b5]',
                  title: 'Tactile Plunger & Open USB-C Node',
                  copy: 'The left flank houses a 65g actuation tactile button for switching moods and waking the unit, alongside a flush-mounted USB-C port for 5V charging and open serial firmware flashing via ESP-IDF or CircuitPython.',
                  specs: ['Milled brass tactile plunger', 'UF2 drag-and-drop', 'USB-C 5V @ 0.5A fast recharge']
                },
                {
                  deg: 360,
                  tag: '360° // COMPLETE LOOP',
                  badgeBg: 'bg-[#9b51e0]',
                  title: 'Titanium Grade 5 Anchor Ring',
                  copy: 'Anchored through a reinforced resin boss at the top corner, the titanium alloy keyring is pull-tested to 35kg. Ready to hook onto belt loops, heavy denim, key rings, and carabiners.',
                  specs: ['Ti-6Al-4V Alloy', '35kg pull rating', 'Chamfered anti-wear edges']
                }
              ].map((step) => (
                <div
                  key={step.deg}
                  className="bg-white border-3 border-black rounded-3xl p-8 shadow-brutal card-brutal-hover"
                >
                  <span className={`badge-pill ${step.badgeBg} text-black mb-3`}>
                    {step.tag}
                  </span>
                  <h3 className="font-['Archivo'] font-black text-3xl uppercase tracking-tight text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#333] font-medium leading-relaxed mb-4">
                    {step.copy}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.specs.map((s) => (
                      <span key={s} className="font-mono text-xs font-black bg-[#f4f0ea] border-2 border-black px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION (Neo-Brutalist Accordion) */}
        <section id="faq" className="border-b-3 border-black px-4 md:px-12 py-16 md:py-20 bg-[#f4f0ea]">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div>
              <span className="badge-pill bg-[#cbf34a] text-black -rotate-1 mb-2">
                COMMUNITY CLARITY
              </span>
              <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black">
                HONEST FAQ.
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {HONEST_FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border-3 border-black bg-white rounded-3xl shadow-brutal overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveFaq(isOpen ? -1 : idx);
                      }}
                      className="w-full p-6 text-left font-['Archivo'] font-black text-xl uppercase flex justify-between items-center gap-4 text-black hover:bg-[#cbf34a] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-black' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 text-base text-[#333] leading-relaxed border-t-2 border-black bg-[#f4f0ea] font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL DROP CTA (High Energy Lime Banner) */}
        <section id="drop" className="px-4 md:px-12 py-20 bg-[#cbf34a] border-b-3 border-black">
          <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-8 md:p-14 shadow-brutal-xl relative">
            <span className="badge-pill bg-[#ff68b5] text-black -rotate-2 mb-4">
              BATCH 01 DISPATCH // 7 DAYS WORLDWIDE
            </span>

            <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-tight mb-4 text-black">
              CLAIM YOUR GLITCH KEYCHAIN.
            </h2>

            <p className="text-[#333] text-base md:text-lg max-w-xl mb-8 leading-relaxed font-medium">
              Join Batch 01 allocation for <strong>{currentPriceFormatted}</strong>. Includes titanium keyring, braided USB-C cable, and free sticker bomb pack.
            </p>

            {waitlistSubmitted ? (
              <div className="bg-[#3fe0ff] text-black border-3 border-black p-6 rounded-2xl font-mono text-sm shadow-brutal">
                <span className="font-black text-lg block mb-1">
                  ✓ BATCH 01 ALLOCATION SECURED
                </span>
                We’ve registered <strong>{waitlistEmail}</strong>. Expected delivery in ~7 days. Progress logs and tracking credentials dispatched to your inbox.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 bg-white border-3 border-black rounded-2xl px-5 py-3.5 text-sm font-mono font-bold text-black placeholder-gray-500 focus:outline-none focus:bg-[#3fe0ff]/10"
                />
                <button
                  type="submit"
                  className="bg-black text-[#cbf34a] font-mono font-black text-sm uppercase px-8 py-3.5 rounded-2xl border-3 border-black shadow-brutal btn-brutal-hover"
                >
                  ORDER NOW ⚡
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-4 font-mono text-xs font-black text-black mt-8 pt-6 border-t-3 border-black">
              <span className="bg-[#3fe0ff] px-3 py-1 rounded-full border border-black">■ 7-DAY EASY RETURNS</span>
              <span className="bg-[#ff68b5] px-3 py-1 rounded-full border border-black">■ 5+ DAYS BATTERY BACKUP</span>
              <span className="bg-[#cbf34a] px-3 py-1 rounded-full border border-black">■ FREE AIR SHIPPING OVER $50</span>
            </div>
          </div>
        </section>
      </main>

      {/* REKKO SLIDE-OVER BAG DRAWER */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-[#f4f0ea] text-black border-l-4 border-black w-full max-w-md h-full flex flex-col p-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b-3 border-black pb-4 mb-4">
              <h3 className="font-['Archivo'] font-black text-2xl uppercase tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#ff6b35]" /> YOUR BAG ({cartCount})
              </h3>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center font-black shadow-brutal-sm hover:bg-[#cbf34a]"
              >
                ✕
              </button>
            </div>

            {cartCount > 0 ? (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="bg-white border-3 border-black rounded-2xl p-4 shadow-brutal-sm flex gap-4 items-center">
                  <div className="w-16 h-16 bg-black rounded-xl border-2 border-black flex items-center justify-center font-mono text-xs text-[#3fe0ff] font-bold">
                    GLITCH
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Archivo'] font-black text-xl uppercase leading-tight">XYZ GLITCH</h4>
                    <span className="font-mono text-xs text-gray-600 font-black uppercase block">
                      EDITION: {selectedEdition.toUpperCase()}
                    </span>
                    <span className="font-mono text-sm font-black text-black block mt-1">
                      {currentPriceFormatted} × {cartCount}
                    </span>
                  </div>
                </div>

                <div className="border-t-3 border-black pt-4 mt-6 flex flex-col gap-4 font-mono text-xs font-black">
                  <div className="flex justify-between text-base">
                    <span>SUBTOTAL:</span>
                    <span className="font-['Archivo'] font-black text-3xl text-[#ff6b35]">
                      {curr.symbol}{(curr.basePrice * cartCount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-black bg-[#cbf34a] p-3 rounded-xl border-2 border-black font-black">
                    <span>SHIPPING:</span>
                    <span>FREE WORLDWIDE AIR DELIVERY</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playHit();
                      alert('Checkout initialized! Proceeding to encrypted payment portal.');
                    }}
                    className="w-full bg-[#cbf34a] text-black font-['Archivo'] font-black text-lg uppercase py-4 rounded-2xl border-3 border-black shadow-brutal btn-brutal-hover"
                  >
                    CHECKOUT NOW ➔
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <ShoppingBag className="w-12 h-12 text-gray-400 mb-3" />
                <p className="font-mono text-sm font-black uppercase text-gray-500">
                  YOUR BAG IS CURRENTLY EMPTY.
                </p>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-4 bg-[#cbf34a] font-mono text-xs font-black px-5 py-2.5 rounded-full border-2 border-black shadow-brutal-sm"
                >
                  ADD GLITCH 01
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t-3 border-black bg-black text-white px-4 md:px-12 py-10 font-mono text-xs">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-['Archivo'] font-black text-xl text-[#cbf34a]">XYZ.</span>
            <span>© 2026</span>
            <span>•</span>
            <span>TECH WITH PERSONALITY</span>
          </div>
          <div className="flex gap-6 font-black">
            <a href="#hero" className="text-white hover:text-[#cbf34a] transition-colors">TOP</a>
            <a href="#bento" className="text-white hover:text-[#3fe0ff] transition-colors">BENTO</a>
            <a href="#teardown" className="text-white hover:text-[#ff68b5] transition-colors">360° SPIN</a>
            <a href="#faq" className="text-white hover:text-[#cbf34a] transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
