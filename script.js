/**
 * XYZ NEO-BRUTALIST HARDWARE EXPERIENCE SCRIPT
 * Manages:
 * 1. Hero Keychain poke/click: bounce recoil, surprised OLED eye expression, comic HIT! burst, sound synth
 * 2. 360-degree scroll sync rotation with manual fallback slider
 * 3. Reactive OLED mood switcher cards
 * 4. Apple-inspired hardware palette swatches (Midnight, Silver, Starlight, Lavender, Sky Blue, Coral, Mint)
 * 5. Reduced-motion detection & manual override toggle
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS FOR HARDWARE TACTILE FEEDBACK ---
  // Uses Web Audio API oscillator for low-latency retro click & hit chirp
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playRetroChirp(type) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'hit') {
        // High punchy comic chirp
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.22);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'click') {
        // Crisp mechanical click
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(200, now + 0.03);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      console.warn('Audio feedback error', e);
    }
  }

  // --- OLED EYE MATRIX DEFINITIONS ---
  const OLED_EYES_SVG = document.getElementById('oled-eyes-svg');

  const EXPRESSIONS = {
    surprised: `
      <!-- Left Eye: Wide Round -->
      <circle cx="34" cy="28" r="16" fill="#00f3ff" />
      <circle cx="34" cy="28" r="6" fill="#090e11" />
      <!-- Right Eye: Wide Round -->
      <circle cx="86" cy="28" r="16" fill="#00f3ff" />
      <circle cx="86" cy="28" r="6" fill="#090e11" />
      <!-- O-Mouth -->
      <ellipse cx="60" cy="46" rx="8" ry="6" fill="#00f3ff" />
    `,
    happy: `
      <!-- Happy Default Eyes -->
      <polygon points="34,14 48,34 20,34" fill="#00f3ff" />
      <polygon points="86,14 100,34 72,34" fill="#00f3ff" />
      <!-- Smile -->
      <path d="M 44 44 Q 60 54, 76 44" stroke="#00f3ff" stroke-width="4" stroke-linecap="round" fill="none" />
    `,
    sleepy: `
      <!-- Sleepy Drooping Eyes -->
      <path d="M 20 28 Q 34 38, 48 28" stroke="#00f3ff" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M 72 28 Q 86 38, 100 28" stroke="#00f3ff" stroke-width="5" stroke-linecap="round" fill="none" />
      <text x="76" y="16" fill="#00f3ff" font-family="'Space Mono'" font-size="12" font-weight="bold">Zzz</text>
    `,
    glitch: `
      <!-- Glitchy Blocks -->
      <rect x="20" y="18" width="28" height="6" fill="#00f3ff" />
      <rect x="26" y="28" width="20" height="7" fill="#00f3ff" />
      <rect x="74" y="20" width="24" height="6" fill="#00f3ff" />
      <rect x="70" y="30" width="30" height="6" fill="#00f3ff" />
      <line x1="10" y1="46" x2="110" y2="46" stroke="#00f3ff" stroke-width="3" stroke-dasharray="6,4"/>
    `,
    wink: `
      <!-- Wink Eye -->
      <line x1="20" y1="28" x2="48" y2="28" stroke="#00f3ff" stroke-width="6" stroke-linecap="round"/>
      <circle cx="86" cy="28" r="14" fill="#00f3ff"/>
      <circle cx="86" cy="28" r="5" fill="#090e11"/>
      <path d="M 50 46 Q 62 50, 74 42" stroke="#00f3ff" stroke-width="4" stroke-linecap="round" fill="none" />
    `,
    angry: `
      <!-- Slanted Angry Eyes -->
      <polygon points="18,18 48,27 48,34 18,25" fill="#00f3ff"/>
      <polygon points="102,18 72,27 72,34 102,25" fill="#00f3ff"/>
      <rect x="52" y="44" width="16" height="5" fill="#00f3ff"/>
    `
  };

  let currentMood = 'happy';
  let resetMoodTimer = null;

  function setHeroMood(moodName, autoReset = false) {
    if (!OLED_EYES_SVG || !EXPRESSIONS[moodName]) return;
    currentMood = moodName;
    OLED_EYES_SVG.innerHTML = EXPRESSIONS[moodName];

    // Synchronize 3D cube screen text if present
    const cubePixel = document.querySelector('.cube-pixel-eyes');
    if (cubePixel) {
      if (moodName === 'surprised') cubePixel.textContent = '(⊙_⊙)';
      else if (moodName === 'happy') cubePixel.textContent = '◉‿◉';
      else if (moodName === 'sleepy') cubePixel.textContent = '(-.-)z';
      else if (moodName === 'glitch') cubePixel.textContent = '[#_?]';
      else if (moodName === 'wink') cubePixel.textContent = '(^_~)';
      else if (moodName === 'angry') cubePixel.textContent = '(>_<)';
    }

    if (resetMoodTimer) {
      clearTimeout(resetMoodTimer);
      resetMoodTimer = null;
    }

    if (autoReset) {
      resetMoodTimer = setTimeout(() => {
        setHeroMood('happy', false);
      }, 2000);
    }
  }

  // --- HERO KEYCHAIN INTERACTION: BOUNCE + SURPRISE + COMIC HIT BURST ---
  const heroKeychain = document.getElementById('hero-keychain-card');
  const comicHit = document.getElementById('comic-hit');
  const pokeCtaBtn = document.getElementById('poke-cta-btn');

  let hitTimeout = null;

  function triggerHitInteraction() {
    playRetroChirp('hit');

    // 1. Recoil Bounce Animation
    if (heroKeychain) {
      heroKeychain.classList.remove('bounce-action');
      // trigger reflow
      void heroKeychain.offsetWidth;
      heroKeychain.classList.add('bounce-action');
    }

    // 2. Set OLED Eyes to Surprised
    setHeroMood('surprised', true);

    // 3. Comic HIT! burst beside hero
    if (comicHit) {
      comicHit.classList.remove('active-hit');
      void comicHit.offsetWidth;
      comicHit.classList.add('active-hit');

      if (hitTimeout) clearTimeout(hitTimeout);
      hitTimeout = setTimeout(() => {
        comicHit.classList.remove('active-hit');
      }, 900);
    }
  }

  if (heroKeychain) {
    heroKeychain.addEventListener('click', function (e) {
      triggerHitInteraction();
    });

    heroKeychain.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerHitInteraction();
      }
    });
  }

  if (pokeCtaBtn) {
    pokeCtaBtn.addEventListener('click', function () {
      triggerHitInteraction();
      heroKeychain.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Tactile buttons inside keychain
  const tactileButtons = document.querySelectorAll('.tactile-btn');
  tactileButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playRetroChirp('click');
      setHeroMood(btn.classList.contains('tactile-a') ? 'wink' : 'glitch', true);
    });
  });

  // --- 360-DEGREE SCROLL ROTATION VIEWER & SLIDER ---
  const storySection = document.getElementById('story');
  const rotatorObject = document.getElementById('rotator-object');
  const angleDisplay = document.getElementById('angle-display');
  const rotationSlider = document.getElementById('rotation-slider');
  const storyCards = document.querySelectorAll('.story-step-card');
  const presetAngleBtns = document.querySelectorAll('.angle-btn');

  let currentAngle = 0;
  let isManualSliderActive = false;

  function set360Angle(deg) {
    currentAngle = (Math.round(deg) % 360 + 360) % 360;
    if (rotatorObject) {
      rotatorObject.style.transform = `rotateY(${currentAngle}deg)`;
    }
    if (angleDisplay) {
      angleDisplay.textContent = `${String(currentAngle).padStart(3, '0')}°`;
    }
    if (rotationSlider && !isManualSliderActive) {
      rotationSlider.value = currentAngle;
    }

    // Highlight corresponding story card if close to phase anchor
    storyCards.forEach(card => {
      const target = parseInt(card.getAttribute('data-target-angle'), 10);
      const diff = Math.min(Math.abs(currentAngle - target), 360 - Math.abs(currentAngle - target));
      if (diff <= 45) {
        card.classList.add('active-step');
      } else {
        card.classList.remove('active-step');
      }
    });
  }

  // Sync angle to scroll progress within the story section
  function onScrollRotate() {
    if (!storySection || isReducedMotionActive()) return;

    const rect = storySection.getBoundingClientRect();
    const sectionHeight = storySection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate progress as user scrolls through the story section
    const startScroll = rect.top;
    const totalScrollable = sectionHeight - windowHeight;

    if (totalScrollable <= 0) return;

    // When top enters viewport to when bottom leaves viewport
    const progress = Math.max(0, Math.min(1, -startScroll / totalScrollable));
    const calculatedAngle = progress * 360;

    if (!isManualSliderActive) {
      set360Angle(calculatedAngle);
    }
  }

  window.addEventListener('scroll', onScrollRotate, { passive: true });

  // Manual Slider Controls (Accessible & Reduced Motion friendly)
  if (rotationSlider) {
    rotationSlider.addEventListener('input', function (e) {
      isManualSliderActive = true;
      set360Angle(parseFloat(e.target.value));
    });

    rotationSlider.addEventListener('change', function () {
      setTimeout(() => {
        isManualSliderActive = false;
      }, 800);
    });
  }

  presetAngleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      playRetroChirp('click');
      const angle = parseInt(this.getAttribute('data-angle'), 10);
      set360Angle(angle);
    });
  });

  // Clicking any story card rotates model directly to its target angle
  storyCards.forEach(card => {
    card.addEventListener('click', function () {
      playRetroChirp('click');
      const targetAngle = parseInt(this.getAttribute('data-target-angle'), 10);
      set360Angle(targetAngle);
    });
  });

  // --- OLED EXPRESSION CARDS ---
  const exprCards = document.querySelectorAll('.expr-card');
  exprCards.forEach(card => {
    card.addEventListener('click', function () {
      playRetroChirp('click');
      exprCards.forEach(c => c.classList.remove('active-card'));
      this.classList.add('active-card');
      const mood = this.getAttribute('data-mood');
      setHeroMood(mood, false);

      // Flash feedback
      const btn = this.querySelector('button');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ SENT!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1200);
      }
    });
  });

  // --- HARDWARE PALETTE SWATCHES (APPLE-INSPIRED CHOICES) ---
  const swatchCards = document.querySelectorAll('.swatch-card');
  const currentFinishTitle = document.getElementById('current-finish-name');
  const root = document.documentElement;

  const HARDWARE_PALETTE = {
    midnight: {
      name: 'MIDNIGHT // DEEP NAVY BLACK',
      color: '#1e2229',
      border: '#0c0d0e'
    },
    silver: {
      name: 'SILVER // RAW BEAD-BLASTED ALU',
      color: '#e3e4e6',
      border: '#0c0d0e'
    },
    starlight: {
      name: 'STARLIGHT // WARM CHAMPAGNE',
      color: '#f0ece1',
      border: '#0c0d0e'
    },
    lavender: {
      name: 'LAVENDER // PASTEL VIOLET MIST',
      color: '#dcd2e8',
      border: '#0c0d0e'
    },
    skyblue: {
      name: 'SKY BLUE // PACIFIC FROST CERAMIC',
      color: '#97c8eb',
      border: '#0c0d0e'
    },
    coral: {
      name: 'CORAL // PUNCH CITRUS NEON',
      color: '#f7786b',
      border: '#0c0d0e'
    },
    mint: {
      name: 'MINT // MATTE SPEARMINT ANODIZE',
      color: '#a8e6cf',
      border: '#0c0d0e'
    }
  };

  swatchCards.forEach(swatch => {
    swatch.addEventListener('click', function () {
      playRetroChirp('click');
      swatchCards.forEach(s => s.classList.remove('active-swatch'));
      this.classList.add('active-swatch');

      const colorKey = this.getAttribute('data-color');
      const finish = HARDWARE_PALETTE[colorKey];

      if (finish) {
        // Apply hardware color directly to CSS variable for both 2D hero and 3D faces
        root.style.setProperty('--current-hw-color', finish.color);
        if (currentFinishTitle) {
          currentFinishTitle.textContent = finish.name;
        }

        // Small visual confirmation on the hero keychain
        if (heroKeychain) {
          heroKeychain.style.transform = 'scale(1.02)';
          setTimeout(() => {
            heroKeychain.style.transform = '';
          }, 150);
        }
      }
    });
  });

  // --- REDUCED MOTION DETECTION & MANUAL TOGGLE ---
  const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
  let manualReducedMotion = false;

  function isReducedMotionActive() {
    return (
      manualReducedMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function updateMotionState() {
    if (!reducedMotionToggle) return;
    const isReduced = isReducedMotionActive();
    if (isReduced) {
      document.body.classList.add('reduced-motion-active');
      reducedMotionToggle.setAttribute('aria-pressed', 'true');
      reducedMotionToggle.querySelector('.label').textContent = 'MOTION: REDUCED';
      reducedMotionToggle.classList.add('btn-acid');
      reducedMotionToggle.classList.remove('btn-white');
    } else {
      document.body.classList.remove('reduced-motion-active');
      reducedMotionToggle.setAttribute('aria-pressed', 'false');
      reducedMotionToggle.querySelector('.label').textContent = 'MOTION: ON';
      reducedMotionToggle.classList.remove('btn-acid');
      reducedMotionToggle.classList.add('btn-white');
    }
  }

  if (reducedMotionToggle) {
    reducedMotionToggle.addEventListener('click', function () {
      playRetroChirp('click');
      manualReducedMotion = !manualReducedMotion;
      updateMotionState();
    });
  }

  // Listen to OS-level preference change
  try {
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', updateMotionState);
  } catch (e) {
    console.warn(e);
  }

  updateMotionState();

  // --- MODAL DIALOG CONTROLS ---
  const modal = document.getElementById('neo-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const buyNowBtn = document.getElementById('buy-now-btn');
  const specsSheetBtn = document.getElementById('specs-sheet-btn');

  function openModal(title, textHtml) {
    if (!modal) return;
    playRetroChirp('click');
    modalTitle.textContent = title;
    modalContent.innerHTML = textHtml;
    modal.showModal();
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      openModal(
        'BATCH 01 // QUEUED',
        `<p style="margin-bottom:1rem;">Your XYZ Pocket Critter reservation has been registered for <strong>$89</strong>.</p>
         <div style="background:#f4fd44; border:2px solid #000; padding:0.8rem; font-family:'Space Mono'; font-size:0.85rem; font-weight:bold;">
           ORDER: #XYZ-9082-ALPHA<br>
           FINISH: ${currentFinishTitle ? currentFinishTitle.textContent : 'SILVER'}<br>
           DISPATCH: NOV 2026<br>
           SHIPPING: WORLDWIDE AIR COURIER
         </div>`
      );
    });
  }

  if (specsSheetBtn) {
    specsSheetBtn.addEventListener('click', () => {
      openModal(
        'HARDWARE SCHEMATICS',
        `<p>All schematics, KiCAD PCB files, 3D STEP models, and RP2040 firmware images are licensed under CERN OHL-S v2.</p>
         <ul style="margin:1rem 0 1rem 1.2rem; font-family:'Space Mono'; font-size:0.85rem;">
           <li>Chassis_CNC_Model01.step (4.2 MB)</li>
           <li>PCB_RP2040_Schematic_v1.4.pdf (890 KB)</li>
           <li>Firmware_UF2_Source.zip (1.1 MB)</li>
         </ul>
         <a href="#" class="btn-neo btn-small btn-acid" style="display:inline-block;" onclick="alert('Downloading open CAD bundle...'); return false;">DOWNLOAD ZIP BUNDLE</a>`
      );
    });
  }

  // Set default initial state
  setHeroMood('happy');
  set360Angle(0);

})();
