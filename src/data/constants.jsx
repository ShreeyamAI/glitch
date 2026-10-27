import React from 'react';

export const HARDWARE_PALETTE = [
  { id: 'midnight', name: 'Midnight', hex: '#1e2229', spec: 'Deep Navy Black CNC' },
  { id: 'silver', name: 'Silver', hex: '#e3e4e6', spec: 'Bead-Blasted Alu' },
  { id: 'starlight', name: 'Starlight', hex: '#f0ece1', spec: 'Warm Champagne Mist' },
  { id: 'lavender', name: 'Lavender', hex: '#dcd2e8', spec: 'Pastel Violet Anodize' },
  { id: 'skyblue', name: 'Sky Blue', hex: '#97c8eb', spec: 'Pacific Frost Ceramic' },
  { id: 'coral', name: 'Coral', hex: '#f7786b', spec: 'Punch Citrus Neon' },
  { id: 'mint', name: 'Mint', hex: '#a8e6cf', spec: 'Matte Spearmint Anodize' },
];

export const OLED_MOODS = [
  {
    id: 'surprised',
    name: '01. SURPRISED',
    badge: 'REACTIVE',
    desc: 'Triggered when poked, shaken, or dropped. Wide OLED pupils.',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <circle cx="30" cy="25" r="14" fill="#00f3ff" />
        <circle cx="30" cy="25" r="5" fill="#090e11" />
        <circle cx="70" cy="25" r="14" fill="#00f3ff" />
        <circle cx="70" cy="25" r="5" fill="#090e11" />
        <ellipse cx="50" cy="38" rx="7" ry="5" fill="#00f3ff" />
      </svg>
    )
  },
  {
    id: 'happy',
    name: '02. HYPER ACTIVE',
    badge: 'DEFAULT',
    desc: 'Standard nominal boot state. Energetic triangular eyes & smile.',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <polygon points="30,12 42,32 18,32" fill="#00f3ff" />
        <polygon points="70,12 82,32 58,32" fill="#00f3ff" />
        <path d="M 38 40 Q 50 48, 62 40" stroke="#00f3ff" stroke-width="4" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'sleepy',
    name: '03. SNOOZE / Zzz',
    badge: 'POWER SAVE',
    desc: 'Low power sleep state after 60s idle. Soft breathing cycle.',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <path d="M 18 25 Q 30 35, 42 25" stroke="#00f3ff" stroke-width="4" fill="none" strokeLinecap="round"/>
        <path d="M 58 25 Q 70 35, 82 25" stroke="#00f3ff" stroke-width="4" fill="none" strokeLinecap="round"/>
        <text x="68" y="16" fill="#00f3ff" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="bold">Zzz</text>
      </svg>
    )
  },
  {
    id: 'glitch',
    name: '04. MATRIX GLITCH',
    badge: 'DEBUG UF2',
    desc: 'Firmware bootloader & hardware debug state with live hex dumps.',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <rect x="20" y="15" width="24" height="6" fill="#00f3ff" />
        <rect x="28" y="24" width="16" height="6" fill="#00f3ff" />
        <rect x="65" y="18" width="20" height="6" fill="#00f3ff" />
        <rect x="60" y="27" width="26" height="5" fill="#00f3ff" />
        <line x1="10" y1="40" x2="90" y2="40" stroke="#00f3ff" stroke-width="2" strokeDasharray="4,4"/>
      </svg>
    )
  },
  {
    id: 'wink',
    name: '05. SASSY WINK',
    badge: 'CONNECTED',
    desc: 'Sync completed over USB-C or Bluetooth companion desktop app.',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <line x1="20" y1="26" x2="40" y2="26" stroke="#00f3ff" stroke-width="5" strokeLinecap="round"/>
        <circle cx="70" cy="26" r="12" fill="#00f3ff"/>
        <path d="M 45 40 Q 55 45, 65 38" stroke="#00f3ff" stroke-width="3" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'angry',
    name: '06. LOW POWER FROWN',
    badge: 'BATTERY LOW',
    desc: 'Battery drops below 10%. Feed 5V USB-C juice immediately!',
    renderSvg: () => (
      <svg viewBox="0 0 100 50" className="w-4/5 h-4/5 drop-shadow-[0_0_5px_#00f3ff]">
        <polygon points="18,18 42,26 42,32 18,24" fill="#00f3ff"/>
        <polygon points="82,18 58,26 58,32 82,24" fill="#00f3ff"/>
        <rect x="42" y="38" width="16" height="4" fill="#00f3ff"/>
      </svg>
    )
  }
];
