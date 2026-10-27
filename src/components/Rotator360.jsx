import React from 'react';
import { sound } from '../utils/sound';

export default function Rotator360({
  angle,
  setAngle,
  currentColor,
  currentMoodName
}) {
  const getScreenFaceText = () => {
    switch (currentMoodName) {
      case 'surprised': return '(⊙_⊙)';
      case 'happy': return '◉‿◉';
      case 'sleepy': return '(-.-)z';
      case 'glitch': return '[#_?]';
      case 'wink': return '(^_~)';
      case 'angry': return '(>_<)';
      default: return '◉‿◉';
    }
  };

  return (
    <div className="w-full max-w-[460px] bg-white border-4 border-[#0c0d0e] shadow-brutal-xl flex flex-col">
      {/* Terminal Header */}
      <div className="bg-[#0c0d0e] text-white p-2.5 flex items-center gap-2 font-mono text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black" />
        <span className="font-bold tracking-wider ml-1 text-gray-200">
          LIVE_3D_GIMBAL_VIEWER.EXE
        </span>
        <span className="ml-auto bg-[#1a44f2] text-white px-2 py-0.5 font-black text-xs">
          {String(Math.round(angle)).padStart(3, '0')}°
        </span>
      </div>

      {/* 3D Perspective Rotator Canvas */}
      <div className="h-[360px] flex items-center justify-center perspective-1000 relative overflow-hidden bg-[radial-gradient(circle,rgba(26,68,242,0.06)_0%,transparent_70%)]">
        {/* Rotating Circular Coordinate Ring */}
        <div className="absolute w-72 h-72 border-2 border-dashed border-[#0c0d0e]/20 rounded-full pointer-events-none" />

        {/* 3D Cube Object */}
        <div
          style={{ transform: `rotateY(${angle}deg)` }}
          className="w-[170px] h-[250px] relative transform-style-preserve-3d transition-transform duration-100 ease-out"
        >
          {/* FRONT FACE (Z = +30px) */}
          <div
            style={{
              backgroundColor: currentColor.hex,
              transform: 'translateZ(30px)',
            }}
            className="absolute inset-0 border-4 border-[#0c0d0e] rounded-2xl p-3 flex flex-col items-center justify-between shadow-brutal-sm"
          >
            <div className="w-11 h-5 border-2 border-b-0 border-[#0c0d0e] rounded-t-xl bg-[#2a2c30]" />
            <div className="w-28 h-18 bg-black border-2 border-[#0c0d0e] rounded-md flex items-center justify-center">
              <div className="w-24 h-14 bg-[#090e11] flex items-center justify-center font-mono font-bold text-lg text-[#00f3ff] drop-shadow-[0_0_6px_#00f3ff]">
                {getScreenFaceText()}
              </div>
            </div>
            <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 border border-[#0c0d0e]">
              FRONT: OLED
            </span>
            <div className="flex gap-2">
              <span className="w-5 h-5 bg-white border border-[#0c0d0e] font-mono text-[9px] font-bold flex items-center justify-center">
                A
              </span>
              <span className="w-5 h-5 bg-[#f4fd44] border border-[#0c0d0e] font-mono text-[9px] font-bold flex items-center justify-center">
                B
              </span>
            </div>
          </div>

          {/* RIGHT FACE (RotateY 90deg, Z = +85px) */}
          <div
            style={{
              backgroundColor: currentColor.hex,
              transform: 'rotateY(90deg) translateZ(85px)',
            }}
            className="absolute top-0 left-[55px] w-[60px] h-full border-4 border-[#0c0d0e] rounded-md p-2 flex flex-col items-center justify-between"
          >
            <div className="w-2 h-2 rounded-full bg-black mt-2" />
            <div className="flex flex-col gap-3">
              <div className="bg-white border border-[#0c0d0e] font-mono text-[8px] font-bold px-1 py-2 [writing-mode:vertical-rl]">
                VOL +
              </div>
              <div className="bg-white border border-[#0c0d0e] font-mono text-[8px] font-bold px-1 py-2 [writing-mode:vertical-rl]">
                VOL -
              </div>
            </div>
            <span className="font-mono text-[8px] font-bold bg-white px-1 border border-[#0c0d0e] [writing-mode:vertical-rl]">
              RIGHT FLANK
            </span>
          </div>

          {/* BACK FACE (RotateY 180deg, Z = +30px) */}
          <div
            style={{
              backgroundColor: currentColor.hex,
              transform: 'rotateY(180deg) translateZ(30px)',
            }}
            className="absolute inset-0 border-4 border-[#0c0d0e] rounded-2xl p-3 flex flex-col items-center justify-between"
          >
            <div className="w-11 h-5 border-2 border-b-0 border-[#0c0d0e] rounded-t-xl bg-[#2a2c30]" />
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-12 h-12 bg-white border border-[#0c0d0e] p-1 grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${(i * 7) % 2 === 0 ? 'bg-black' : 'bg-white'}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[8px] font-bold leading-tight">
                XYZ // MODEL 01<br />
                SERIAL: #XYZ-9082<br />
                FCC ID: 2AXYZ
              </span>
            </div>
            <div className="flex gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] border border-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] border border-black" />
            </div>
            <span className="font-mono text-[9px] font-bold bg-white px-1.5 border border-[#0c0d0e]">
              REAR: CNC UNIBODY
            </span>
          </div>

          {/* LEFT FACE (RotateY -90deg, Z = +85px) */}
          <div
            style={{
              backgroundColor: currentColor.hex,
              transform: 'rotateY(-90deg) translateZ(85px)',
            }}
            className="absolute top-0 left-[55px] w-[60px] h-full border-4 border-[#0c0d0e] rounded-md p-2 flex flex-col items-center justify-between"
          >
            <div className="w-2 h-2 rounded-full bg-black mt-2" />
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#111] text-white border border-[#0c0d0e] font-mono text-[8px] font-bold px-1 py-3 [writing-mode:vertical-rl]">
                USB-C
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-black" title="Reset Pin" />
            </div>
            <span className="font-mono text-[8px] font-bold bg-white px-1 border border-[#0c0d0e] [writing-mode:vertical-rl]">
              LEFT: I/O
            </span>
          </div>
        </div>
      </div>

      {/* Manual Slider & Quick Angle Presets */}
      <div className="border-t-4 border-[#0c0d0e] p-3.5 bg-white flex flex-col gap-2">
        <div className="flex justify-between items-center font-mono text-xs font-bold">
          <label htmlFor="angle-range">MANUAL 360° SCRUBBER:</label>
          <span className="text-[#1a44f2]">{Math.round(angle)}°</span>
        </div>
        <input
          id="angle-range"
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(parseFloat(e.target.value))}
          className="w-full accent-[#1a44f2] cursor-pointer"
        />
        <div className="grid grid-cols-4 gap-1.5 mt-1">
          {[
            { val: 0, label: '0° FRONT' },
            { val: 90, label: '90° RIGHT' },
            { val: 180, label: '180° REAR' },
            { val: 270, label: '270° LEFT' },
          ].map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => {
                sound.playClick();
                setAngle(preset.val);
              }}
              className="font-mono text-[10px] font-bold bg-[#fbf9f4] border-2 border-[#0c0d0e] py-1 hover:bg-[#f4fd44] transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
