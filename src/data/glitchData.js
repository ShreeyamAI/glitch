// OLED Expressions supported by GLITCH firmware
export const GLITCH_EXPRESSIONS = [
  {
    id: 'sparkle',
    name: 'SPARKLE',
    category: 'DEFAULT VIBE',
    tag: 'IDLE // PRIMARY',
    description: 'Four-point diamond pixel stars matching prototype photo #2. High dopamine aesthetic.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 12;

      // Draw 4-point star for left eye
      drawStar(ctx, width * 0.32, height * 0.44, 22, 6);
      // Draw 4-point star for right eye
      drawStar(ctx, width * 0.68, height * 0.44, 22, 6);

      // Micro nose & smile pixels
      ctx.fillRect(width * 0.5 - 2, height * 0.52, 4, 4);
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.68, 6, 0, Math.PI);
      ctx.fill();
    }
  },
  {
    id: 'curious',
    name: 'CURIOUS',
    category: 'SENSOR TILT',
    tag: 'MPU6050 // TILT L/R',
    description: 'Wide, crescent pupils shifting towards device movement direction (matching prototype photo #1).',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 12;

      // Left eye arch
      ctx.beginPath();
      ctx.arc(width * 0.32, height * 0.48, 20, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#00f3ff';
      ctx.stroke();

      // Right eye arch
      ctx.beginPath();
      ctx.arc(width * 0.68, height * 0.48, 20, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.stroke();

      // Glance pupil dots
      ctx.fillRect(width * 0.35, height * 0.45, 6, 6);
      ctx.fillRect(width * 0.71, height * 0.45, 6, 6);
    }
  },
  {
    id: 'sleepy',
    name: 'SLEEPY',
    category: 'POWER-SAVE',
    tag: 'AUTO-DIM // 45s',
    description: 'Slow-blinking curved eyelids matching prototype photo #3. Enters ultra-low-power deep sleep.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 12;

      // Closed crescent arcs
      ctx.beginPath();
      ctx.arc(width * 0.32, height * 0.45, 18, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width * 0.68, height * 0.45, 18, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // Single center pixel
      ctx.fillRect(width * 0.5 - 2, height * 0.65, 4, 4);
    }
  },
  {
    id: 'shocked',
    name: 'SHOCKED',
    category: 'IMU SHAKE',
    tag: 'TRIGGER // SHAKE',
    description: 'Disproportionately large rounded eyes with tiny constricted center pupils. Triggered on tap or shake.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 14;

      // Huge outer ring eyes
      ctx.beginPath();
      ctx.arc(width * 0.3, height * 0.48, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.48, 24, 0, Math.PI * 2);
      ctx.fill();

      // Pinpoint black pupils
      ctx.fillStyle = '#050c14';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(width * 0.3, height * 0.48, 6, 0, Math.PI * 2);
      ctx.arc(width * 0.7, height * 0.48, 6, 0, Math.PI * 2);
      ctx.fill();

      // O mouth
      ctx.fillStyle = '#00f3ff';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.76, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: 'mischief',
    name: 'MISCHIEF',
    category: 'SECRET COMBO',
    tag: 'DOUBLE-CLICK',
    description: 'Slanted asymmetric brows and smirk. Triggered by rapid double-press on the side button.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 12;

      // Angular left eye
      ctx.beginPath();
      ctx.moveTo(width * 0.22, height * 0.38);
      ctx.lineTo(width * 0.42, height * 0.48);
      ctx.lineTo(width * 0.24, height * 0.58);
      ctx.closePath();
      ctx.fill();

      // Winking right eye
      ctx.beginPath();
      ctx.moveTo(width * 0.58, height * 0.48);
      ctx.lineTo(width * 0.78, height * 0.44);
      ctx.stroke();

      // Smirk
      ctx.beginPath();
      ctx.arc(width * 0.52, height * 0.66, 12, 0.1 * Math.PI, 0.7 * Math.PI);
      ctx.stroke();
    }
  },
  {
    id: 'grumpy',
    name: 'GRUMPY',
    category: 'LOW-BATTERY',
    tag: 'VOLTAGE < 3.4V',
    description: 'Heavy slanted unibrow with squashed eyes. Automatically warns when cell voltage drops.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 10;

      // Slanted left eye
      ctx.beginPath();
      ctx.moveTo(width * 0.2, height * 0.4);
      ctx.lineTo(width * 0.42, height * 0.5);
      ctx.lineTo(width * 0.42, height * 0.6);
      ctx.lineTo(width * 0.2, height * 0.5);
      ctx.closePath();
      ctx.fill();

      // Slanted right eye
      ctx.beginPath();
      ctx.moveTo(width * 0.8, height * 0.4);
      ctx.lineTo(width * 0.58, height * 0.5);
      ctx.lineTo(width * 0.58, height * 0.6);
      ctx.lineTo(width * 0.8, height * 0.5);
      ctx.closePath();
      ctx.fill();

      // Flat grumpy mouth
      ctx.fillRect(width * 0.42, height * 0.74, width * 0.16, 4);
    }
  }
];

function drawStar(ctx, cx, cy, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let step = Math.PI / 4;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < 4; i++) {
    let x = cx + Math.cos(rot) * outerRadius;
    let y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

// Hardware hotspots accurate to the physical prototype & production case design
export const HARDWARE_HOTSPOTS = [
  {
    id: 'oled',
    title: '64×32 I2C OLED Display',
    subtitle: 'SSD1306 / Monochrome Cyan Blue',
    desc: 'High-contrast emissive OLED panel mounted flush under optical acrylic. Daylight readable with zero backlight bleed and ultra-crisp pixel boundary rendering.',
    position: [0, 0.15, 1.05], // 3D coordinate offset
    camAngle: { rotX: 0, rotY: 0 },
    badge: 'DISPLAY'
  },
  {
    id: 'mcu',
    title: 'ESP32-C3 Microcontroller',
    subtitle: 'RISC-V Core @ 160MHz',
    desc: 'Single-core 32-bit RISC-V SoC with native 2.4GHz Wi-Fi and Bluetooth 5 LE. Drives 60FPS expression rendering, sensor loops, and UF2 drag-drop updates.',
    position: [0, -0.2, 0.4],
    camAngle: { rotX: 0.2, rotY: 0.1 },
    badge: 'COMPUTE'
  },
  {
    id: 'imu',
    title: 'MPU6050 Motion Sensor',
    subtitle: '6-Axis Gyroscope + Accelerometer',
    desc: 'Interprets real-world physical dynamics: tilting shifts GLITCH’s glance direction, a rapid tap changes mood, and freefall triggers a shocked gasp.',
    position: [-0.3, -0.4, 0.3],
    camAngle: { rotX: 0.3, rotY: -0.4 },
    badge: 'SENSORY'
  },
  {
    id: 'battery',
    title: 'Protected LiPo Battery Compartment',
    subtitle: '3.7V 500mAh / Removable Chamber',
    desc: 'Slide-out insulated polycarbonate bottom tray with gold-plated pogo contacts. Safely isolates the lithium-polymer pouch from the optical resin structure.',
    position: [0, -0.9, -0.2],
    camAngle: { rotX: -0.2, rotY: 3.14 },
    badge: 'POWER'
  },
  {
    id: 'usbc',
    title: 'Water-Resistant USB-C Port',
    subtitle: '5V Charging + Serial Flashing',
    desc: 'Reinforced stainless-steel mid-mount USB-C receptacle on the bottom flank. Fast recharges in ~45 mins and provides open serial console debugging.',
    position: [0, -1.2, 0],
    camAngle: { rotX: 0.8, rotY: 0 },
    badge: 'I/O'
  },
  {
    id: 'switch',
    title: 'Physical ON/OFF Slide Switch',
    subtitle: 'Hard Cutoff Rocker',
    desc: 'A positive-detent micro slide switch on the side rail physically disconnects battery power to ensure 0μA quiescent drain when stowed.',
    position: [1.05, 0.2, 0],
    camAngle: { rotX: 0, rotY: 1.57 },
    badge: 'POWER CUT'
  },
  {
    id: 'button',
    title: 'Tactile Expression Button',
    subtitle: '65g Actuation Clicker',
    desc: 'Milled brass tactile plunger on the left flank. Cycles through programmed moods, triggers secret combinations, or wakes GLITCH from deep sleep.',
    position: [-1.05, 0.2, 0],
    camAngle: { rotX: 0, rotY: -1.57 },
    badge: 'INTERACTION'
  },
  {
    id: 'keyring',
    title: 'Grade 5 Titanium Keyring Loop',
    subtitle: '35kg Pull-Force Rated',
    desc: 'Solid Ti-6Al-4V anchor ring seated into the upper reinforced boss of the resin enclosure. Built to withstand daily keys, belt clips, and bag carabiners.',
    position: [0, 1.35, 0],
    camAngle: { rotX: -0.3, rotY: 0 },
    badge: 'HARDWARE'
  }
];

// Truthful, verified FAQ items
export const HONEST_FAQS = [
  {
    q: 'Is GLITCH a production product or a prototype drop?',
    a: 'GLITCH began as an open-source hardware prototype crafted from perfboard, a 64×32 OLED, and an ESP32-C3 board (visible in our raw prototype photos). We are currently tooling a precision 50 × 40 × 20 mm transparent optical resin-style casing with a dedicated internal battery chamber. Joining the drop reserves your unit from Batch 01.'
  },
  {
    q: 'Is the lithium battery cast directly in solid resin?',
    a: 'No, absolutely not. Casting lithium pouches into solid resin is a fire safety and thermal hazard. GLITCH features a precision internal cavity with an insulated bottom drawer for the battery cell and charging safety IC, while the outer shell achieves the crystal-clear frozen resin aesthetic.'
  },
  {
    q: 'How long does the battery actually last?',
    a: 'Active runtime on our bench prototype with continuous 60FPS OLED animation is currently measured between 4 to 6 hours on a 500mAh cell. However, with our firmware’s aggressive sleep mode (display off after 45 seconds, motion wake via MPU6050 interrupt), everyday pocket standby stretches to 2–3 weeks. Official lab-certified numbers will be published upon final enclosure assembly.'
  },
  {
    q: 'Can I flash custom code or Arduino / MicroPython?',
    a: 'Yes! The ESP32-C3 USB-C port provides direct native CDC serial and JTAG. You can flash our open-source C++/ESP-IDF firmware, upload CircuitPython scripts, or create custom pixel eye animations in standard 64×32 bitmap arrays.'
  },
  {
    q: 'Does it require a smartphone app or cloud subscription to work?',
    a: 'Zero cloud, zero accounts, zero subscriptions. GLITCH is 100% autonomous out of the box with onboard motion sensing and physical button interaction. While the ESP32-C3 hardware supports Wi-Fi/BLE, our first firmware release is strictly focused on bulletproof standalone digital pet mechanics.'
  }
];
