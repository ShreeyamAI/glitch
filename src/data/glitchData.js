// GLITCH Hardware & Firmware Data Specification
// Grounded strictly in actual prototype hardware and planned 50 × 40 × 20 mm enclosure tooling

// OLED Facial Expressions supported by GLITCH firmware
export const GLITCH_EXPRESSIONS = [
  {
    id: 'sparkle',
    name: 'SPARKLE',
    category: 'DEFAULT MOOD',
    tag: 'IDLE // PRIMARY',
    trigger: 'Default idle loop',
    description: 'Four-point diamond pixel stars matching prototype photos. Emotive cyan-blue eye rendering with subtle nose and mouth pixels.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.shadowColor = '#00f5ff';
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
    category: 'MOTION TILT',
    tag: 'MPU6050 // TILT L/R',
    trigger: 'Hardware tilt angle',
    description: 'Wide, open crescent eyes shifting glance towards device tilt direction. Prototype MPU6050 sensor test routine.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 12;

      // Left eye arch
      ctx.beginPath();
      ctx.arc(width * 0.32, height * 0.48, 20, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#00f5ff';
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
    tag: 'AUTO-SLEEP // 45s',
    trigger: 'Inactivity timer',
    description: 'Slow-blinking curved eyelids. Triggered after 45 seconds of inactivity before display enters low-power standby.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#00f5ff';
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
    category: 'MOTION SHAKE',
    tag: 'IMU SHAKE / TAP',
    trigger: 'Physical tap or shake',
    description: 'Disproportionately large rounded eyes with tiny constricted pupils. Triggered on rapid movement or button double-tap.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.shadowColor = '#00f5ff';
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
      ctx.fillStyle = '#00f5ff';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.76, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: 'mischief',
    name: 'MISCHIEF',
    category: 'BUTTON INTERACTION',
    tag: 'TACTILE BUTTON CLICK',
    trigger: 'Side button press',
    description: 'Asymmetric winking eye with sharp smirk. Cycled via the tactile clicker switch on the left flank.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#00f5ff';
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
    category: 'VOLTAGE MONITOR',
    tag: 'BATTERY < 3.4V',
    trigger: 'Low battery threshold',
    description: 'Squashed eyes under a slanted brow with flat mouth. Indicates battery charge level has reached recharge point.',
    draw: (ctx, width, height) => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f5ff';
      ctx.shadowColor = '#00f5ff';
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

// Hardware component hotspots accurate to the physical prototype & 50 × 40 × 20 mm enclosure plan
export const HARDWARE_HOTSPOTS = [
  {
    id: 'oled',
    title: '1.3-inch Blue Monochrome OLED',
    subtitle: 'I2C 4-Pin / Emissive High-Contrast',
    desc: 'Monochrome cyan-blue emissive OLED display mounted beneath optical resin. High daylight contrast with zero backlight bleed, rendering pixel-sharp 1-bit facial expressions.',
    status: 'Verified on Prototype',
    position: [0, 0.35, 0.24],
    camAngle: { rotX: 0.05, rotY: 0 },
    badge: 'DISPLAY'
  },
  {
    id: 'mcu',
    title: 'Seeed Studio XIAO ESP32-C3',
    subtitle: '32-Bit RISC-V SoC @ 160MHz',
    desc: 'Ultra-compact single-board microcontroller module with native USB-C. Powers the display drivers, button polling loops, and sensor state machine.',
    status: 'Verified on Prototype',
    position: [0, -0.28, 0.2],
    camAngle: { rotX: 0.15, rotY: 0.1 },
    badge: 'COMPUTE'
  },
  {
    id: 'imu',
    title: 'MPU6050 Motion Sensor',
    subtitle: '6-Axis Gyroscope & Accelerometer',
    desc: 'Onboard 6-axis IMU module connected via I2C. Designed to translate physical tilts and shakes into live eye tracking responses.',
    status: 'Prototype Bench Stage',
    position: [-0.46, -0.28, 0.2],
    camAngle: { rotX: 0.25, rotY: -0.3 },
    badge: 'MOTION SENSOR'
  },
  {
    id: 'battery',
    title: 'Removable Protected Battery Bay',
    subtitle: '3.7V 500mAh LiPo Cell with Kapton Tape',
    desc: 'Dedicated rear cavity holding a rechargeable lithium pouch wrapped in heat-resistant yellow Kapton tape. Never cast into solid resin for safety and battery maintenance.',
    status: 'Verified on Prototype',
    position: [0, -0.15, -0.18],
    camAngle: { rotX: -0.1, rotY: Math.PI },
    badge: 'POWER CELL'
  },
  {
    id: 'usbc',
    title: 'USB-C Charging & Programming Port',
    subtitle: 'Standard Type-C Connector',
    desc: 'Integrated USB-C receptacle on the bottom edge of the XIAO board for universal 5V charging and standard USB CDC serial console flashing.',
    status: 'Verified on Prototype',
    position: [0, -1.22, 0],
    camAngle: { rotX: 0.75, rotY: 0 },
    badge: 'I/O PORT'
  },
  {
    id: 'switch',
    title: 'Physical ON/OFF Slide Switch',
    subtitle: 'Mechanical Hard Battery Cutoff',
    desc: 'Side-mounted sub-miniature slide switch that mechanically breaks the battery circuit, guaranteeing zero standby power loss when switched off.',
    status: 'Verified on Prototype',
    position: [1.05, 0.1, 0],
    camAngle: { rotX: 0, rotY: Math.PI / 2 },
    badge: 'HARD CUTOFF'
  },
  {
    id: 'button',
    title: 'Tactile Expression Button',
    subtitle: 'Momentary Push Button',
    desc: 'Side-rail tactile button used to cycle through eye expressions, trigger demo reactions, or wake GLITCH from deep sleep mode.',
    status: 'Verified on Prototype',
    position: [-1.06, 0.1, 0],
    camAngle: { rotX: 0, rotY: -Math.PI / 2 },
    badge: 'TACTILE CONTROL'
  },
  {
    id: 'keyring',
    title: 'Stainless Keyring Loop',
    subtitle: 'Reinforced Enclosure Anchor Boss',
    desc: 'Corner-mounted split ring loop anchored through a reinforced solid resin boss. Designed to attach to keychains, lanyards, or bag clips.',
    status: 'Enclosure Plan Target',
    position: [0, 1.72, 0],
    camAngle: { rotX: -0.25, rotY: 0 },
    badge: 'HARDWARE'
  }
];

// Technical specifications table grounded in verified prototype
export const TECHNICAL_SPECIFICATIONS = [
  { label: 'Target Dimensions', value: '50 × 40 × 20 mm', note: 'Planned enclosure outer target' },
  { label: 'Estimated Weight', value: '~38 grams', note: 'Including battery and hardware loop' },
  { label: 'Microcontroller', value: 'Seeed Studio XIAO ESP32-C3', note: '32-bit RISC-V @ 160MHz' },
  { label: 'Display Panel', value: '1.3-inch Blue Monochrome OLED', note: 'I2C 4-Pin / Emissive panel' },
  { label: 'Motion Tracking', value: 'MPU6050 6-Axis IMU', note: 'Accelerometer + Gyroscope' },
  { label: 'Battery Capacity', value: '3.7V, 500mAh LiPo Cell', note: 'Removable protected rear chamber' },
  { label: 'Charging Standard', value: '5V USB Type-C', note: '~60 min charge via XIAO port' },
  { label: 'Active Screen Battery Life', value: '4 – 6 hours active OLED', note: 'Measured on bench prototype' },
  { label: 'Standby Battery Life', value: 'Multi-day with auto-sleep', note: 'Screen off after 45s inactivity' },
  { label: 'Power Switch', value: 'Physical slide switch', note: 'Hard mechanical battery disconnect' },
  { label: 'Physical Controls', value: '1× Side tactile button', note: 'Expression cycling & wake' },
  { label: 'Case Material', value: 'Optical clear cast resin', note: 'Rounded polished edges, 2.5D lens' },
  { label: 'Firmware Architecture', value: 'Open-source C++ / Arduino', note: 'Standalone offline digital companion' }
];

// Concept shell variations (clearly distinguishing baseline drop from design studies)
export const SHELL_VARIANTS = [
  {
    id: 'clear',
    name: 'OPTICAL CLEAR RESIN',
    subtitle: 'Production Drop Target',
    badge: 'TARGET LAUNCH',
    badgeClass: 'bg-[#111215] text-[#fbf8f2]',
    description: 'Completely transparent optical-grade resin shell displaying the royal blue carrier board, copper traces, and yellow Kapton-taped LiPo cell.',
    available: true
  },
  {
    id: 'smoke',
    name: 'SMOKE GRAPHITE',
    subtitle: 'Design Exploration',
    badge: 'CONCEPT STUDY',
    badgeClass: 'bg-[#e2e8f0] text-[#111215]',
    description: 'Semi-translucent dark grey tinted resin that softens interior PCB traces while keeping the high-contrast blue OLED crisp and visible.',
    available: false
  },
  {
    id: 'cyber',
    name: 'CYBER AMBER',
    subtitle: 'Design Exploration',
    badge: 'CONCEPT STUDY',
    badgeClass: 'bg-[#e2e8f0] text-[#111215]',
    description: 'Warm translucent amber tint inspired by retro test equipment and industrial instrumentation housings.',
    available: false
  }
];

// Transparent, honest FAQs reflecting prototype stage
export const HONEST_FAQS = [
  {
    q: 'What is GLITCH, and what stage is the project currently in?',
    a: 'GLITCH is a miniature cybernetic digital pet keychain born as an open-source hardware project. The working electronics shown in our prototype photos use a Seeed Studio XIAO ESP32-C3, a 1.3-inch blue monochrome OLED, a 500mAh LiPo cell, and perfboard wiring. We are currently designing the precision 50 × 40 × 20 mm transparent optical resin casing with an internal removable battery chamber. Joining the early-access waitlist gives you direct access to engineering logs and priority for Batch 01.'
  },
  {
    q: 'Is the lithium-polymer battery cast directly into solid resin?',
    a: 'No, absolutely not. Casting lithium-polymer batteries into solid resin presents severe thermal expansion, venting, and safety hazards, while preventing battery replacement. GLITCH uses an isolated internal battery compartment with yellow Kapton insulation tape, keeping the battery safe and serviceable while maintaining the crystal-clear frozen resin aesthetic on the exterior.'
  },
  {
    q: 'How long does the battery last in real-world testing?',
    a: 'On our benchtop prototype, running continuous active animations on the blue OLED yields approximately 4 to 6 hours of continuous runtime on a 500mAh cell. With our firmware’s display auto-sleep (display sleeps after 45 seconds of idle and wakes via the tactile button or motion interrupt), standby stretches to several days. Official lab-certified numbers will be published once the custom enclosure is tooled.'
  },
  {
    q: 'Which firmware features are working on the prototype today?',
    a: 'The core digital pet eye expression engine, button cycling, and OLED animation loops are fully operational on the prototype hardware. The MPU6050 motion sensor integration (tilt-responsive glance and shake reaction) is currently in active firmware testing. While the ESP32-C3 SoC includes 2.4GHz Wi-Fi and Bluetooth hardware, our priority for Batch 01 is delivering a rock-solid, 100% autonomous companion that requires no smartphone app or cloud server.'
  },
  {
    q: 'Can I flash custom firmware or write my own eye animations?',
    a: 'Yes. The USB-C port on the Seeed XIAO board provides direct native USB CDC serial and programming. You will be able to flash custom firmware using the Arduino IDE or ESP-IDF, modify expression routines, or draw your own 1-bit pixel art bitmaps for the 1.3-inch OLED.'
  },
  {
    q: 'When will Batch 01 ship, and what does reserving do?',
    a: 'Batch 01 is currently in engineering validation and enclosure tooling. Reserving on our early-access waitlist secures your queue spot for the first numbered batch, grants access to our prototype development logs, and notifies you when production tooling is verified.'
  }
];
