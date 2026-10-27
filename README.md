# XYZ // GLITCH ⚡

> An expressive, pocket-sized hardware companion suspended in an optical clear resin case.

Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Three.js (WebGL)**, **Canvas Confetti**, and **Lucide Icons**. Inspired by high-fashion product design, award-winning neo-brutalist bento layouts (Kristina Volchek), and lifestyle tech toys (Rekko Neo).

---

## 👾 Features

- **Interactive 3D WebGL Model (Three.js)**:
  - 50 × 40 × 20 mm scale crystal-clear optical resin case with polished bevels, internal blue FR-4 PCB, ESP32-C3 microcontroller, 6-axis MPU6050 motion sensor, and protected LiPo battery drawer.
  - Real-time 360° drag rotation with spring physics.
  - Camera view switchers (`FRONT`, `REAR`, `RIGHT`, `LEFT`, `TOP`) and reset camera controls.
  - Interactive hardware hotspots highlighting key sub-systems.
- **70+ Built-in Eye Animations**:
  - Live 64×32 blue monochrome OLED screen previews (*Sparkle*, *Curious*, *Sleepy*, *Shocked*, *Mischief*, *Grumpy*).
  - Tapping or clicking the model triggers a spring bounce recoil and cycles expressions.
- **Scroll-Linked 360° Teardown Engine**:
  - Seamlessly rotates the device through 360 degrees in sync with the visitor's scroll progress through hardware phases.
  - Includes manual scrubber slider alternative for reduced motion accessibility.
- **Storefront & Community Perks**:
  - Multi-currency global switcher (`USD`, `EUR`, `GBP`, `PKR`, `CAD`, `AUD`, `AED`).
  - Slide-over interactive shopping bag drawer.
  - Secret retro hacker keypad easter egg: type `GLITCH` to unlock free worldwide priority delivery.
  - Subtle tactile Web Audio API feedback (with explicit user audio toggle).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Neo-brutalist custom theme tokens
- **3D Graphics**: Three.js WebGL (ACESFilmicToneMapping, MeshPhysicalMaterial with transmission)
- **Audio**: Web Audio API oscillator synthesis
- **Typography**: Archivo (massive condensed bold), Inter, JetBrains Mono
- **Icons**: Lucide React

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📜 License

Hardware schematics and KiCAD designs licensed under **CERN OHL-S v2**. Software licensed under **MIT**.
