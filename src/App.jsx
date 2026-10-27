import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  RotateCw,
  Cpu,
  Battery,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  Layers,
  Eye,
  Sliders,
  Sparkle,
  ArrowUpRight,
  Activity,
  Terminal,
  Grid,
  Info,
  Check
} from 'lucide-react';
import Glitch3DViewer from './components/Glitch3DViewer';
import EasterEggKeypad from './components/EasterEggKeypad';
import {
  GLITCH_EXPRESSIONS,
  HARDWARE_HOTSPOTS,
  TECHNICAL_SPECIFICATIONS,
  SHELL_VARIANTS,
  HONEST_FAQS
} from './data/glitchData';
import { sound } from './utils/sound';

export default function App() {
  const [currentExpression, setCurrentExpression] = useState('sparkle');
  const [activeHotspotId, setActiveHotspotId] = useState('oled');
  const [selectedShellVariant, setSelectedShellVariant] = useState('clear');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollAngle, setScrollAngle] = useState(0);
  const [manualScrubAngle, setManualScrubAngle] = useState(0);
  const [useManualAngle, setUseManualAngle] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [vipAccessUnlocked, setVipAccessUnlocked] = useState(false);

  const storySectionRef = useRef(null);

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

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    sound.playClick();
    setWaitlistSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f5ff', '#111215', '#e2e8f0', '#feb31d']
    });
  };

  return (
    <div className={`min-h-screen bg-[#fbf8f2] text-[#111215] ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* 1. EDITORIAL TECHNICAL STATUS BAR */}
      <div className="w-full bg-[#111215] text-[#fbf8f2] py-2 px-4 md:px-12 font-mono text-xs border-b border-[#111215]">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
              XYZ // GLITCH HARDWARE INITIATIVE
            </span>
            <span className="text-[#8b92a0] hidden sm:inline">•</span>
            <span className="text-[#8b92a0] hidden sm:inline uppercase">
              PROTOTYPE VALIDATION & TOOLING STAGE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="text-[#e2e8f0] uppercase">BATCH 01 ALLOCATION</span>
            <a
              href="#waitlist"
              className="text-[#00f5ff] hover:underline flex items-center gap-1 uppercase"
            >
              JOIN WAITLIST <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. REFINED EDITORIAL HEADER */}
      <header className="sticky top-0 z-40 bg-[#fbf8f2]/95 backdrop-blur-md border-b-2 border-[#111215] px-4 md:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <span className="bg-[#111215] text-[#fbf8f2] font-black text-xl tracking-tight px-3 py-1 rounded-xl font-['Archivo'] shadow-editorial-sm group-hover:-translate-y-0.5 transition-transform">
                XYZ
              </span>
              <span className="font-mono text-xs font-bold text-[#111215] border border-[#111215] px-2 py-0.5 rounded-full bg-white">
                GLITCH
              </span>
            </a>
          </div>

          {/* Clean Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs font-bold uppercase text-[#525866]">
            <a href="#showcase" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              3D SHOWCASE
            </a>
            <a href="#expressions" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              EXPRESSIONS
            </a>
            <a href="#controls" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              CONTROLS & MOTION
            </a>
            <a href="#variants" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              SHELL CONCEPTS
            </a>
            <a href="#teardown" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              360° SPIN
            </a>
            <a href="#specs" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              SPECIFICATIONS
            </a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full hover:text-[#111215] hover:bg-[#f4efe4] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Audio Toggle (Strictly Optional, Never Autoplay) */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={soundEnabled}
              className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full border border-[#111215] flex items-center gap-1.5 transition-all ${
                soundEnabled
                  ? 'bg-[#111215] text-[#00f5ff] shadow-editorial-sm'
                  : 'bg-white text-[#525866] hover:text-[#111215] hover:bg-[#f4efe4]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00f5ff]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">AUDIO:</span> {soundEnabled ? 'ON' : 'OFF'}
            </button>

            {/* Primary Action Button */}
            <a
              href="#waitlist"
              className="bg-[#111215] text-[#fbf8f2] font-mono text-xs font-bold px-4 py-2 rounded-full border-2 border-[#111215] shadow-editorial-sm hover:shadow-editorial hover:-translate-y-0.5 transition-all flex items-center gap-1.5 uppercase"
            >
              <span>RESERVE ACCESS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* SECTION 1: HERO (High-Fashion Product Campaign Presentation) */}
        <section className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-24 bg-architectural-grid">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Editorial Narrative */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag-editorial bg-white text-[#111215] shadow-editorial-sm">
                  XYZ HARDWARE // SERIES 01
                </span>
                <span className="tag-editorial bg-[#f4efe4] text-[#111215]">
                  50 × 40 × 20 MM TARGET ENCLOSURE
                </span>
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-[#525866] tracking-widest uppercase block mb-2">
                  AN EXPRESSIVE CYBERNETIC KEYCHAIN COMPANION
                </span>
                <h1 className="font-['Archivo'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase tracking-tighter text-[#111215]">
                  MEET <span className="underline decoration-[#00f5ff] decoration-wavy decoration-2">GLITCH</span>.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#525866] font-medium leading-relaxed max-w-xl">
                A tiny, expressive digital companion encased in an optical clear resin shell. Built on a <strong>Seeed Studio XIAO ESP32-C3</strong> board, a <strong>1.3-inch blue monochrome OLED</strong>, and motion-reactive firmware with an internal removable battery bay. No apps, no subscriptions, and no polite minimalism.
              </p>

              {/* Action Buttons & Value Anchor */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#waitlist"
                  className="bg-[#111215] text-[#fbf8f2] font-mono font-bold text-xs sm:text-sm uppercase px-7 py-3.5 rounded-2xl border-2 border-[#111215] shadow-editorial-hover flex items-center justify-center gap-2 text-center"
                >
                  RESERVE BATCH 01 EARLY ACCESS <ArrowRight className="w-4 h-4 text-[#00f5ff]" />
                </a>
                <a
                  href="#showcase"
                  className="bg-white text-[#111215] font-mono font-bold text-xs sm:text-sm uppercase px-6 py-3.5 rounded-2xl border-2 border-[#111215] shadow-editorial-hover text-center"
                >
                  INSPECT 3D MODEL ↘
                </a>
              </div>

              {/* Verified Architecture Callout Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#111215]/15 max-w-lg">
                <div className="bg-white border-2 border-[#111215] p-3 rounded-xl shadow-editorial-sm">
                  <span className="font-['Archivo'] font-black text-2xl text-[#111215] block leading-none">
                    1.3”
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#525866] block mt-1">
                    BLUE OLED PANEL
                  </span>
                </div>
                <div className="bg-white border-2 border-[#111215] p-3 rounded-xl shadow-editorial-sm">
                  <span className="font-['Archivo'] font-black text-2xl text-[#111215] block leading-none">
                    XIAO
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#525866] block mt-1">
                    ESP32-C3 RISC-V
                  </span>
                </div>
                <div className="bg-white border-2 border-[#111215] p-3 rounded-xl shadow-editorial-sm">
                  <span className="font-['Archivo'] font-black text-2xl text-[#111215] block leading-none">
                    500
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#525866] block mt-1">
                    MAH LIPO BAY
                  </span>
                </div>
              </div>
            </div>

            {/* Right Editorial Hero Shot / 3D Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full bg-white border-2 border-[#111215] rounded-3xl p-5 md:p-6 shadow-editorial-lg relative">
                <div className="w-full flex justify-between items-center mb-3 pb-2 border-b border-[#111215]/20 font-mono text-xs">
                  <span className="font-bold flex items-center gap-2 uppercase text-[#111215]">
                    <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />
                    LIVE 3D SIMULATION // TARGET ENCLOSURE
                  </span>
                  <span className="bg-[#f4efe4] text-[#111215] px-2.5 py-0.5 rounded-full border border-[#111215] text-[10px] font-bold uppercase">
                    50 × 40 × 20 MM
                  </span>
                </div>

                <Glitch3DViewer
                  currentExpressionId={currentExpression}
                  onExpressionChange={setCurrentExpression}
                  activeHotspotId={activeHotspotId}
                  onHotspotSelect={setActiveHotspotId}
                  shellVariant={selectedShellVariant}
                  reducedMotion={reducedMotion}
                  className="w-full"
                />

                {/* Hotspot Readout Card */}
                <div className="w-full mt-4 bg-[#f4efe4] border-2 border-[#111215] p-4 rounded-xl shadow-editorial-sm flex flex-col gap-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm uppercase tracking-tight text-[#111215]">
                      {activeHotspot.title}
                    </span>
                    <span className="font-mono text-[10px] font-bold bg-[#111215] text-[#fbf8f2] px-2 py-0.5 rounded-full uppercase">
                      {activeHotspot.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#525866] font-medium leading-relaxed mt-1">
                    {activeHotspot.desc}
                  </p>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#111215]/10 font-mono text-[10px] font-bold text-[#111215]">
                    <CheckCircle2 className="w-3 h-3 text-[#1038cc]" />
                    <span>STATUS: {activeHotspot.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE 3D PRODUCT SHOWCASE */}
        <section id="showcase" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="tag-editorial bg-[#f4efe4] text-[#111215] mb-2">
                  HARDWARE ARCHITECTURE
                </span>
                <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215]">
                  INTERACTIVE HARDWARE BREAKDOWN.
                </h2>
              </div>
              <p className="text-sm font-mono text-[#525866] max-w-md">
                Every component is based on the working prototype electronics and our planned 50 × 40 × 20 mm enclosure tooling. Click any hotspot below to inspect.
              </p>
            </div>

            {/* Hotspots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HARDWARE_HOTSPOTS.map((spot) => {
                const isSelected = activeHotspotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveHotspotId(spot.id);
                    }}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#111215] text-[#fbf8f2] border-[#111215] shadow-editorial-lg -translate-y-1'
                        : 'bg-[#fbf8f2] text-[#111215] border-[#111215] hover:bg-[#f4efe4]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                          isSelected ? 'bg-white text-[#111215] border-white' : 'bg-white text-[#525866] border-[#111215]'
                        }`}>
                          {spot.badge}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#00f5ff]' : 'bg-[#111215]'}`} />
                      </div>
                      <h3 className="font-['Archivo'] font-black text-lg uppercase leading-tight mb-1">
                        {spot.title}
                      </h3>
                      <p className={`font-mono text-xs ${isSelected ? 'text-[#8b92a0]' : 'text-[#525866]'} mb-3`}>
                        {spot.subtitle}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-[#e2e8f0]' : 'text-[#525866]'} leading-relaxed font-medium`}>
                        {spot.desc}
                      </p>
                    </div>

                    <div className={`mt-4 pt-3 border-t text-[10px] font-mono font-bold uppercase flex justify-between items-center ${
                      isSelected ? 'border-white/20 text-[#00f5ff]' : 'border-[#111215]/15 text-[#111215]'
                    }`}>
                      <span>{spot.status}</span>
                      <span>{isSelected ? '● INSPECTING' : 'CLICK TO VIEW ↗'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: EXPRESSION GALLERY (Blue Monochrome OLED Previews) */}
        <section id="expressions" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#fbf8f2]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="tag-editorial bg-white text-[#111215] mb-2 shadow-editorial-sm">
                  1-BIT PIXEL ART
                </span>
                <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215]">
                  OLED FACIAL EXPRESSIONS.
                </h2>
              </div>
              <p className="text-sm font-mono text-[#525866] max-w-md">
                Rendered on the 1.3-inch blue monochrome OLED with zero backlight bleed. Click any expression to test on the 3D model.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GLITCH_EXPRESSIONS.map((expr) => {
                const isSelected = currentExpression === expr.id;

                return (
                  <div
                    key={expr.id}
                    onClick={() => {
                      sound.playOledBlink();
                      setCurrentExpression(expr.id);
                    }}
                    className={`bg-white border-2 border-[#111215] rounded-3xl p-6 cursor-pointer shadow-editorial transition-all flex flex-col justify-between ${
                      isSelected ? 'ring-2 ring-[#00f5ff] -translate-y-1 shadow-editorial-lg' : 'hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[10px] font-bold bg-[#111215] text-[#00f5ff] px-2.5 py-0.5 rounded-full uppercase">
                          {expr.tag}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#8b92a0]">
                          {expr.category}
                        </span>
                      </div>

                      {/* Pixel Screen Canvas */}
                      <div className="w-full h-24 bg-[#050c14] border-2 border-[#111215] rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
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

                      <h4 className="font-['Archivo'] font-black text-2xl uppercase tracking-tight text-[#111215] mb-1">
                        {expr.name}
                      </h4>
                      <p className="text-xs text-[#525866] font-medium leading-relaxed min-h-[38px]">
                        {expr.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#111215]/15 flex justify-between items-center font-mono text-xs font-bold">
                      <span className="text-[#111215] text-[11px] uppercase">
                        TRIGGER: {expr.trigger}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                        isSelected ? 'bg-[#111215] text-[#00f5ff]' : 'bg-[#f4efe4] text-[#525866]'
                      }`}>
                        {isSelected ? '● ACTIVE MOOD' : 'CLICK TO TEST'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: CONTROLS & MOTION STORY */}
        <section id="controls" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="tag-editorial bg-[#f4efe4] text-[#111215] w-fit">
                TACTILE HARDWARE MECHANICS
              </span>
              <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215] leading-tight">
                PHYSICAL CONTROLS & REAL-WORLD SENSORS.
              </h2>
              <p className="text-base text-[#525866] font-medium leading-relaxed">
                GLITCH combines intentional physical controls with onboard inertial tracking. We prioritize tangible, durable hardware inputs over touchscreen swipes or phone dependencies.
              </p>
              <div className="bg-[#f4efe4] border-2 border-[#111215] p-5 rounded-2xl shadow-editorial-sm flex items-start gap-3">
                <Info className="w-5 h-5 text-[#1038cc] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#525866] leading-relaxed font-medium">
                  <strong>Standalone Philosophy:</strong> While the Seeed XIAO ESP32-C3 includes Wi-Fi and Bluetooth hardware, our first firmware release is strictly focused on bulletproof offline pet mechanics. No cloud servers, no account registration.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#fbf8f2] border-2 border-[#111215] p-6 rounded-3xl shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="tag-editorial bg-white text-[#111215] mb-3">SIDE CONTROL</span>
                  <h3 className="font-['Archivo'] font-black text-xl uppercase mb-2">
                    TACTILE EXPRESSION BUTTON
                  </h3>
                  <p className="text-xs text-[#525866] leading-relaxed font-medium">
                    A momentary tactile clicker on the left flank lets you manually cycle expressions, trigger interactive reactions, or wake GLITCH from deep sleep mode.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#111215]/15 font-mono text-[10px] font-bold text-[#111215] flex justify-between">
                  <span>FUNCTION</span>
                  <span>MOOD CYCLE / WAKE</span>
                </div>
              </div>

              <div className="bg-[#fbf8f2] border-2 border-[#111215] p-6 rounded-3xl shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="tag-editorial bg-white text-[#111215] mb-3">HARD CUTOFF</span>
                  <h3 className="font-['Archivo'] font-black text-xl uppercase mb-2">
                    PHYSICAL SLIDE SWITCH
                  </h3>
                  <p className="text-xs text-[#525866] leading-relaxed font-medium">
                    A positive-detent micro slide switch on the right side rail physically disconnects the battery contacts, eliminating vampire battery leakage when stowed in your bag.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#111215]/15 font-mono text-[10px] font-bold text-[#111215] flex justify-between">
                  <span>DRAIN AT OFF</span>
                  <span>ZERO STANDBY LEAK</span>
                </div>
              </div>

              <div className="bg-[#fbf8f2] border-2 border-[#111215] p-6 rounded-3xl shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="tag-editorial bg-white text-[#111215] mb-3">MOTION TRACKING</span>
                  <h3 className="font-['Archivo'] font-black text-xl uppercase mb-2">
                    MPU6050 6-AXIS IMU
                  </h3>
                  <p className="text-xs text-[#525866] leading-relaxed font-medium">
                    Gyroscope and accelerometer sensors detect physical movement. Tilting GLITCH moves its glance direction; rapid movement or freefall triggers shocked expressions.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#111215]/15 font-mono text-[10px] font-bold text-[#111215] flex justify-between">
                  <span>CURRENT STATUS</span>
                  <span>BENCH FIRMWARE TESTING</span>
                </div>
              </div>

              <div className="bg-[#fbf8f2] border-2 border-[#111215] p-6 rounded-3xl shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="tag-editorial bg-white text-[#111215] mb-3">POWER SAFETY</span>
                  <h3 className="font-['Archivo'] font-black text-xl uppercase mb-2">
                    REMOVABLE LIPO CAVITY
                  </h3>
                  <p className="text-xs text-[#525866] leading-relaxed font-medium">
                    The 3.7V 500mAh cell sits in a protected, insulated rear compartment wrapped with yellow Kapton tape. Never cast into solid resin for safety and maintenance.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#111215]/15 font-mono text-[10px] font-bold text-[#111215] flex justify-between">
                  <span>RECHARGE</span>
                  <span>5V USB-C (~60 MINS)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: COLOUR & SHELL CONCEPTS */}
        <section id="variants" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#fbf8f2]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="tag-editorial bg-white text-[#111215] mb-2 shadow-editorial-sm">
                  ENCLOSURE FINISHES
                </span>
                <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215]">
                  SHELL & MATERIAL EXPLORATION.
                </h2>
              </div>
              <p className="text-sm font-mono text-[#525866] max-w-md">
                Select a variant below to preview the resin material directly on the 3D model. Clear Optical Resin is our baseline drop target.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SHELL_VARIANTS.map((variant) => {
                const isSelected = selectedShellVariant === variant.id;
                return (
                  <div
                    key={variant.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedShellVariant(variant.id);
                    }}
                    className={`bg-white border-2 border-[#111215] rounded-3xl p-6 cursor-pointer shadow-editorial transition-all flex flex-col justify-between ${
                      isSelected ? 'ring-2 ring-[#00f5ff] -translate-y-1 shadow-editorial-lg' : 'hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`tag-editorial ${variant.badgeClass} text-[10px]`}>
                          {variant.badge}
                        </span>
                        {isSelected && (
                          <span className="font-mono text-xs font-bold text-[#00f5ff] bg-[#111215] px-2 py-0.5 rounded-full">
                            PREVIEWING
                          </span>
                        )}
                      </div>

                      <h3 className="font-['Archivo'] font-black text-2xl uppercase tracking-tight text-[#111215] mb-1">
                        {variant.name}
                      </h3>
                      <p className="font-mono text-xs text-[#8b92a0] mb-3">
                        {variant.subtitle}
                      </p>
                      <p className="text-xs text-[#525866] font-medium leading-relaxed">
                        {variant.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#111215]/15 flex items-center justify-between font-mono text-xs font-bold">
                      <span className="text-[#525866]">
                        {variant.available ? 'BATCH 01 TARGET' : 'DESIGN STUDY'}
                      </span>
                      <button
                        type="button"
                        className="text-[#111215] underline decoration-[#111215] text-[11px] uppercase"
                      >
                        {isSelected ? 'ACTIVE IN 3D' : 'PREVIEW IN 3D ↗'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTROLLED SCROLL-LINKED 360° TEARDOWN */}
        <section id="teardown" ref={storySectionRef} className="border-b-2 border-[#111215] bg-[#ffffff]">
          <div className="bg-[#111215] text-[#fbf8f2] px-4 md:px-12 py-3.5 border-b-2 border-[#111215] flex items-center justify-between font-mono text-xs font-bold">
            <span className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-[#00f5ff]" /> 360° HARDWARE INSPECTION ENGINE
            </span>
            <span className="bg-[#f4efe4] text-[#111215] px-3 py-0.5 rounded-full border border-[#111215]">
              ROTATION: {Math.round(useManualAngle ? manualScrubAngle : scrollAngle)}°
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 relative max-w-[1400px] mx-auto bg-[#ffffff]">
            {/* Sticky 3D Model Left */}
            <div className="lg:col-span-6 lg:sticky lg:top-[70px] lg:h-[calc(100vh-70px)] flex flex-col justify-center p-4 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-[#111215]">
              <div className="bg-[#fbf8f2] border-2 border-[#111215] rounded-3xl p-6 shadow-editorial-lg">
                <Glitch3DViewer
                  currentExpressionId={currentExpression}
                  onExpressionChange={setCurrentExpression}
                  activeHotspotId={activeHotspotId}
                  onHotspotSelect={setActiveHotspotId}
                  forcedAngle={useManualAngle ? manualScrubAngle : scrollAngle}
                  shellVariant={selectedShellVariant}
                  reducedMotion={reducedMotion}
                  className="w-full"
                />

                {/* Manual Scrub Control for Reduced Motion / Precise Inspection */}
                <div className="mt-4 pt-3 border-t-2 border-[#111215] flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <label htmlFor="scrub-slider" className="text-[#111215] uppercase">
                      MANUAL ROTATION SCRUBBER:
                    </label>
                    <span className="bg-[#111215] text-[#00f5ff] px-2 py-0.5 rounded-full">
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
                    className="w-full accent-[#111215] cursor-pointer"
                  />
                  {useManualAngle && (
                    <button
                      type="button"
                      onClick={() => setUseManualAngle(false)}
                      className="font-mono text-xs font-bold text-[#1038cc] hover:underline self-end"
                    >
                      ↺ RE-SYNC TO PAGE SCROLL
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Narrative Teardown Steps Right */}
            <div className="lg:col-span-6 p-6 md:p-12 flex flex-col gap-12">
              {[
                {
                  deg: 0,
                  tag: '0° // FRONT FACE',
                  title: 'Optical Resin & 1.3” Blue OLED Panel',
                  copy: 'Flush-mounted under optical-grade cast resin, the blue monochrome display provides high daylight visibility with deep black pixel shutoff. The raw blue carrier board and gold-plated eyelet pads remain visible beneath the polished lens.',
                  specs: ['1.3-inch Emissive OLED', '4-Pin I2C Bus', 'Polished 2.5D Resin Lens']
                },
                {
                  deg: 90,
                  tag: '90° // RIGHT SIDE RAIL',
                  title: 'Physical ON/OFF Slide Switch',
                  copy: 'A positive-detent micro mechanical switch provides a complete hardware disconnect of the battery circuit. Unlike modern gadgets with parasitic sleep drain, turning GLITCH off ensures months of storage without draining the cell.',
                  specs: ['Physical Circuit Break', 'Zero Quiescent Draw', 'Recessed Guard Slot']
                },
                {
                  deg: 180,
                  tag: '180° // REAR SHIELD',
                  title: 'Isolated LiPo Bay & Kapton Wrap',
                  copy: 'We deliberately do not cast the lithium-polymer pouch into solid resin. The rear features a dedicated isolated chamber holding a 3.7V 500mAh cell wrapped in heat-resistant yellow Kapton tape for safety, thermal buffer, and serviceability.',
                  specs: ['3.7V 500mAh Cell', 'Removable Polycarbonate Tray', 'Yellow Kapton Wrap']
                },
                {
                  deg: 270,
                  tag: '270° // LEFT SIDE RAIL',
                  title: 'Tactile Plunger & Open USB-C Port',
                  copy: 'The left flank houses the tactile button used for cycling mood expressions and waking the unit, positioned alongside the bottom-mounted USB-C port for 5V charging and open serial CDC console flashing via the XIAO board.',
                  specs: ['Tactile Plunger Switch', 'USB-C Universal 5V', 'Serial CDC Flashing']
                },
                {
                  deg: 360,
                  tag: '360° // COMPLETE LOOP',
                  title: 'Reinforced Enclosure Keyring Boss',
                  copy: 'Anchored through a reinforced solid resin boss at the upper corner, the stainless split ring lets you securely clip GLITCH to keys, carabiners, belt loops, or backpack straps.',
                  specs: ['Corner Anchor Boss', 'Stainless Split Ring', 'Believable Keychain Scale']
                }
              ].map((step) => (
                <div
                  key={step.deg}
                  className="bg-[#fbf8f2] border-2 border-[#111215] rounded-3xl p-8 shadow-editorial hover:shadow-editorial-lg transition-all"
                >
                  <span className="tag-editorial bg-white text-[#111215] mb-3 shadow-editorial-sm">
                    {step.tag}
                  </span>
                  <h3 className="font-['Archivo'] font-black text-2xl uppercase tracking-tight text-[#111215] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#525866] font-medium leading-relaxed mb-4">
                    {step.copy}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.specs.map((s) => (
                      <span key={s} className="font-mono text-xs font-bold bg-white border border-[#111215] px-3 py-1 rounded-full text-[#111215]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: TECHNICAL SPECIFICATIONS & SECRET EASTER EGG */}
        <section id="specs" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#fbf8f2]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Specs Table Left */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="tag-editorial bg-white text-[#111215] mb-2 shadow-editorial-sm">
                  VERIFIED HARDWARE METRICS
                </span>
                <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215]">
                  ENGINEERING SPECIFICATIONS.
                </h2>
              </div>

              <div className="bg-white border-2 border-[#111215] rounded-3xl overflow-hidden shadow-editorial">
                <table className="w-full font-mono text-xs text-left">
                  <thead className="bg-[#f4efe4] border-b-2 border-[#111215] text-[#111215] uppercase font-bold">
                    <tr>
                      <th className="p-3.5 pl-6">PARAMETER</th>
                      <th className="p-3.5">SPECIFICATION</th>
                      <th className="p-3.5 pr-6 hidden sm:table-cell">ENGINEERING NOTE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111215]/10">
                    {TECHNICAL_SPECIFICATIONS.map((spec) => (
                      <tr key={spec.label} className="hover:bg-[#fbf8f2] transition-colors">
                        <td className="p-3.5 pl-6 font-bold text-[#111215]">{spec.label}</td>
                        <td className="p-3.5 font-bold text-[#1038cc]">{spec.value}</td>
                        <td className="p-3.5 pr-6 text-[#525866] hidden sm:table-cell">{spec.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Secret Easter Egg Keypad Right */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-[#f4efe4] border-2 border-[#111215] rounded-3xl p-6 md:p-8 shadow-editorial flex flex-col gap-4">
                <span className="tag-editorial bg-white text-[#111215] w-fit shadow-editorial-sm">
                  XYZ LABS // EASTER EGG
                </span>
                <h3 className="font-['Archivo'] font-black text-2xl uppercase tracking-tight text-[#111215]">
                  DEV CONSOLE & VIP ACCESS.
                </h3>
                <p className="text-xs text-[#525866] leading-relaxed font-medium">
                  Enter <strong>GLITCH</strong> on the keypad to verify early engineer access, view raw breadboard schematics, and secure priority batch status.
                </p>

                <EasterEggKeypad onUnlock={() => setVipAccessUnlocked(true)} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: HONEST FAQ */}
        <section id="faq" className="border-b-2 border-[#111215] px-4 md:px-12 py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div>
              <span className="tag-editorial bg-[#f4efe4] text-[#111215] mb-2">
                TRANSPARENCY FIRST
              </span>
              <h2 className="font-['Archivo'] font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111215]">
                HONEST FAQ.
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {HONEST_FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border-2 border-[#111215] bg-[#fbf8f2] rounded-2xl shadow-editorial overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveFaq(isOpen ? -1 : idx);
                      }}
                      className="w-full p-5 text-left font-['Archivo'] font-black text-lg uppercase flex justify-between items-center gap-4 text-[#111215] hover:bg-[#f4efe4] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#111215]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-sm text-[#525866] leading-relaxed border-t border-[#111215]/15 bg-white font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL WAITLIST RESERVATION CTA */}
        <section id="waitlist" className="px-4 md:px-12 py-20 bg-[#fbf8f2] border-b-2 border-[#111215]">
          <div className="max-w-3xl mx-auto bg-white border-2 border-[#111215] rounded-3xl p-8 md:p-12 shadow-editorial-lg relative">
            <span className="tag-editorial bg-[#f4efe4] text-[#111215] mb-4 shadow-editorial-sm">
              BATCH 01 // EARLY ACCESS RESERVATION
            </span>

            <h2 className="font-['Archivo'] font-black text-4xl sm:text-5xl uppercase tracking-tight leading-tight mb-3 text-[#111215]">
              RESERVE YOUR GLITCH KEYCHAIN.
            </h2>

            <p className="text-[#525866] text-sm md:text-base mb-8 leading-relaxed font-medium">
              Join the priority allocation for Batch 01. You will receive engineering validation updates, enclosure tooling photos, and first-access notification when production units are ready.
            </p>

            {waitlistSubmitted ? (
              <div className="bg-[#f4efe4] text-[#111215] border-2 border-[#111215] p-6 rounded-2xl font-mono text-sm shadow-editorial-sm">
                <span className="font-black text-base block mb-1 text-[#1038cc] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1038cc]" /> RESERVATION CONFIRMED
                </span>
                We have registered <strong>{waitlistEmail}</strong> for Batch 01 early access. We will dispatch tooling logs, assembly teardowns, and your priority reservation number to your inbox.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 bg-[#fbf8f2] border-2 border-[#111215] rounded-2xl px-5 py-3.5 text-sm font-mono font-bold text-[#111215] placeholder-[#8b92a0] focus:outline-none focus:bg-white focus:border-[#1038cc]"
                />
                <button
                  type="submit"
                  className="bg-[#111215] text-[#fbf8f2] font-mono font-bold text-sm uppercase px-8 py-3.5 rounded-2xl border-2 border-[#111215] shadow-editorial-hover flex items-center justify-center gap-2"
                >
                  JOIN WAITLIST <ArrowRight className="w-4 h-4 text-[#00f5ff]" />
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-4 font-mono text-xs font-bold text-[#525866] mt-8 pt-6 border-t border-[#111215]/15">
              <span>■ ZERO COMMITMENT RESERVATION</span>
              <span>■ DEV LOG ACCESS</span>
              <span>■ BATCH 01 QUEUE POSITION</span>
            </div>
          </div>
        </section>
      </main>

      {/* REFINED EDITORIAL FOOTER */}
      <footer className="bg-[#111215] text-[#fbf8f2] px-4 md:px-12 py-10 font-mono text-xs">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-['Archivo'] font-black text-xl text-[#00f5ff]">XYZ.</span>
            <span className="text-[#8b92a0]">© 2026 XYZ HARDWARE</span>
            <span className="text-[#8b92a0]">•</span>
            <span className="text-[#8b92a0]">GLITCH CYBERNETIC CRITTER</span>
          </div>

          <div className="flex gap-6 font-bold text-[#e2e8f0]">
            <a href="#showcase" className="hover:text-[#00f5ff] transition-colors">3D SHOWCASE</a>
            <a href="#expressions" className="hover:text-[#00f5ff] transition-colors">EXPRESSIONS</a>
            <a href="#specs" className="hover:text-[#00f5ff] transition-colors">SPECS</a>
            <a href="#faq" className="hover:text-[#00f5ff] transition-colors">FAQ</a>
            <a href="#waitlist" className="hover:text-[#00f5ff] transition-colors">WAITLIST</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
