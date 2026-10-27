import React from 'react';
import { sound } from '../utils/sound';

export default function HeroKeychain({ currentColor, currentMood, isHit, onPoke }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* Playful Hand-Drawn Arrow Sticker */}
      <div className="absolute -top-4 -left-6 md:left-2 flex flex-col items-center -rotate-12 z-20 pointer-events-none">
        <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
          <path d="M12 75 Q 28 15, 78 28" stroke="#0c0d0e" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M58 12 L 85 28 L 68 52" stroke="#0c0d0e" strokeWidth="5" strokeLinejoin="round" fill="none" />
        </svg>
        <span className="font-mono font-bold text-xs bg-[#f4fd44] text-[#0c0d0e] px-2 py-0.5 border-2 border-[#0c0d0e] shadow-brutal-sm uppercase">
          TAP OR CLICK ME!
        </span>
      </div>

      {/* Comic-Style "HIT!" Burst */}
      <div
        className={`absolute -top-8 -right-4 md:-right-12 z-30 pointer-events-none transition-all duration-200 transform ${
          isHit
            ? 'opacity-100 scale-110 rotate-12'
            : 'opacity-0 scale-50 -rotate-12'
        }`}
      >
        <div className="clip-comic-burst bg-[#ff4d8d] text-white border-4 border-[#0c0d0e] shadow-brutal px-6 py-6 flex flex-col items-center justify-center min-w-[150px] min-h-[130px]">
          <span className="font-black text-3xl tracking-wider text-white drop-shadow-[3px_3px_0px_#0c0d0e]">
            HIT!
          </span>
          <span className="font-mono text-xs font-black text-[#f4fd44] drop-shadow-[2px_2px_0px_#0c0d0e]">
            OUCH!! ⚡
          </span>
        </div>
      </div>

      {/* Physical Interactive Keychain Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Interactive XYZ Keychain. Press space or click to poke."
        onClick={onPoke}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPoke();
          }
        }}
        className={`relative flex flex-col items-center cursor-pointer outline-none transition-transform duration-150 ${
          isHit ? 'animate-bounce' : 'hover:-translate-y-1'
        }`}
      >
        {/* Titanium Carabiner Rigging Assembly */}
        <div className="flex flex-col items-center -mb-4 z-10">
          <div className="w-22 h-22 rounded-t-full rounded-b-3xl bg-[#2a2c30] border-4 border-[#0c0d0e] shadow-brutal-sm flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full bg-[#fbf9f4] border-3 border-[#0c0d0e]" />
            <div className="absolute top-2.5 right-[-2px] w-3 h-9 bg-[#8b929a] border-2 border-[#0c0d0e] rounded-sm" />
          </div>
          <div className="w-4.5 h-6 rounded-md bg-[#2a2c30] border-2 border-[#0c0d0e] -mt-1.5" />
          <div className="w-7 h-3.5 bg-[#2a2c30] border-3 border-[#0c0d0e] rounded-t-sm -mt-1" />
        </div>

        {/* Solid CNC Keychain Body */}
        <div
          style={{ backgroundColor: currentColor.hex }}
          className="w-64 h-80 border-4 border-[#0c0d0e] rounded-[32px] shadow-brutal-xl p-5 flex flex-col items-center relative transition-colors duration-300"
        >
          {/* Hardware Corner Fastener Screws */}
          <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-[#b5b9be] border-2 border-[#0c0d0e] font-mono text-[10px] font-black flex items-center justify-center leading-none">
            +
          </div>
          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#b5b9be] border-2 border-[#0c0d0e] font-mono text-[10px] font-black flex items-center justify-center leading-none">
            +
          </div>
          <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-[#b5b9be] border-2 border-[#0c0d0e] font-mono text-[10px] font-black flex items-center justify-center leading-none">
            +
          </div>
          <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-[#b5b9be] border-2 border-[#0c0d0e] font-mono text-[10px] font-black flex items-center justify-center leading-none">
            +
          </div>

          <div className="font-mono text-[11px] font-bold tracking-widest text-[#0c0d0e] mb-2 uppercase">
            XYZ // MODEL 01
          </div>

          {/* Recessed High-Contrast OLED Display Bezel */}
          <div className="w-54 h-34 bg-black border-4 border-[#0c0d0e] rounded-xl p-2 relative shadow-inner">
            <div className="w-full h-full bg-[#090e11] rounded-lg relative overflow-hidden flex items-center justify-center border border-[#1c2b33]">
              {/* Scanline CRT overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, #00f3ff, #00f3ff 2px, transparent 2px, transparent 4px)',
                }}
              />
              {/* Reactive Eyes Matrix */}
              <div className="w-full h-full flex items-center justify-center">
                {currentMood.renderSvg()}
              </div>
            </div>
            {/* Status Green LED */}
            <div className="absolute -top-1.5 right-3 w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
          </div>

          {/* Tactile Clicker Buttons & Speaker Grill */}
          <div className="w-full flex justify-between items-center mt-5 px-2">
            <div className="flex flex-col gap-1">
              <span className="w-6 h-1 bg-[#0c0d0e] rounded-full" />
              <span className="w-6 h-1 bg-[#0c0d0e] rounded-full" />
              <span className="w-6 h-1 bg-[#0c0d0e] rounded-full" />
              <span className="w-6 h-1 bg-[#0c0d0e] rounded-full" />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                }}
                className="w-10 h-10 rounded-lg border-3 border-[#0c0d0e] bg-white font-mono font-black text-sm text-[#0c0d0e] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:bg-gray-100"
              >
                A
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                }}
                className="w-10 h-10 rounded-lg border-3 border-[#0c0d0e] bg-[#f4fd44] font-mono font-black text-sm text-[#0c0d0e] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:bg-yellow-300"
              >
                B
              </button>
            </div>
          </div>

          {/* Bottom USB-C Port Indicator */}
          <div className="absolute bottom-0 w-11 h-2 bg-[#111] border-t-2 border-x-2 border-[#0c0d0e] rounded-t-sm" />
        </div>
      </div>

      {/* Cast Shadow */}
      <div className="w-56 h-5 bg-[#0c0d0e]/25 rounded-full mt-4 blur-[1px]" />
    </div>
  );
}
