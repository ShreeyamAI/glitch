import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLITCH_EXPRESSIONS, HARDWARE_HOTSPOTS } from '../data/glitchData';
import { sound } from '../utils/sound';

export default function Glitch3DViewer({
  currentExpressionId = 'sparkle',
  onExpressionChange,
  activeHotspotId = 'oled',
  onHotspotSelect,
  forcedAngle = null,
  shellVariant = 'clear', // 'clear', 'smoke', 'cyber'
  reducedMotion = false,
  className = ''
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const oledCanvasRef = useRef(document.createElement('canvas'));
  const oledTextureRef = useRef(null);

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    glitchGroup: null,
    caseMesh: null,
    caseMaterial: null,
    oledMesh: null,
    animationFrameId: null,
    targetRotation: { x: 0.08, y: 0.15 },
    currentRotation: { x: 0.08, y: 0.15 },
    isDragging: false,
    lastMousePos: { x: 0, y: 0 },
    bounceSpring: 0,
    hasWebGL: true
  });

  const [fallbackMode, setFallbackMode] = useState(false);
  const [currentView, setCurrentView] = useState('front');

  // Draw current expression onto internal 2D canvas texture
  const updateOledTexture = (exprId) => {
    const oledCanvas = oledCanvasRef.current;
    if (!oledCanvas) return;
    const ctx = oledCanvas.getContext('2d');
    if (!ctx) return;

    oledCanvas.width = 256;
    oledCanvas.height = 128;

    const expr = GLITCH_EXPRESSIONS.find((e) => e.id === exprId) || GLITCH_EXPRESSIONS[0];
    expr.draw(ctx, 256, 128);

    if (oledTextureRef.current) {
      oledTextureRef.current.needsUpdate = true;
    }
  };

  useEffect(() => {
    updateOledTexture(currentExpressionId);
  }, [currentExpressionId]);

  // Update shell resin material when variant changes
  useEffect(() => {
    const mat = threeRefs.current.caseMaterial;
    if (!mat) return;

    if (shellVariant === 'smoke') {
      mat.color.set(0x22262b);
      mat.transmission = 0.85;
      mat.roughness = 0.12;
      mat.opacity = 0.92;
    } else if (shellVariant === 'cyber') {
      mat.color.set(0xddaa44);
      mat.transmission = 0.88;
      mat.roughness = 0.08;
      mat.opacity = 0.90;
    } else {
      // Clear optical resin (production target)
      mat.color.set(0xffffff);
      mat.transmission = 0.96;
      mat.roughness = 0.04;
      mat.opacity = 0.95;
    }
    mat.needsUpdate = true;
  }, [shellVariant]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    try {
      const scene = new THREE.Scene();
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 460;

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.9);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      threeRefs.current.scene = scene;
      threeRefs.current.camera = camera;
      threeRefs.current.renderer = renderer;

      // Studio Lighting for High-End Editorial Product Shoot
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      scene.add(ambientLight);

      // Key light (soft warm white from top-right)
      const keyLight = new THREE.DirectionalLight(0xfffdfa, 2.2);
      keyLight.position.set(4, 5, 5);
      scene.add(keyLight);

      // Cyan fill light mimicking OLED emission
      const oledGlow = new THREE.PointLight(0x00f5ff, 3.2, 4.0);
      oledGlow.position.set(0, 0.35, 0.8);
      scene.add(oledGlow);

      // Cool rim light for silhouette edge highlights
      const rimLight = new THREE.DirectionalLight(0xdde8f8, 1.6);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      const glitchGroup = new THREE.Group();
      scene.add(glitchGroup);
      threeRefs.current.glitchGroup = glitchGroup;

      // 1. Crystal Optical Clear Resin Shell (50 × 40 × 20 mm scale)
      const caseGeo = createRoundedBoxGeometry(2.0, 2.5, 1.0, 0.22, 12);
      const caseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.02,
        roughness: 0.04,
        transmission: 0.96,
        thickness: 1.2,
        ior: 1.52,
        specularIntensity: 1.2,
        specularColor: 0xffffff,
        transparent: true,
        opacity: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02
      });
      threeRefs.current.caseMaterial = caseMat;
      const caseMesh = new THREE.Mesh(caseGeo, caseMat);
      glitchGroup.add(caseMesh);
      threeRefs.current.caseMesh = caseMesh;

      // 2. Main Blue Carrier Perfboard (matching prototype photo blue soldermask)
      const pcbGeo = new THREE.BoxGeometry(1.6, 2.05, 0.08);
      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x15427d, // Prototype royal blue perfboard
        metalness: 0.25,
        roughness: 0.45
      });
      const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
      pcbMesh.position.set(0, -0.05, 0.08);
      glitchGroup.add(pcbMesh);

      // Solder Eyelets & Wiring Traces Texture
      const tracesGeo = new THREE.PlaneGeometry(1.48, 1.9);
      const tracesCanvas = document.createElement('canvas');
      tracesCanvas.width = 256;
      tracesCanvas.height = 256;
      const tctx = tracesCanvas.getContext('2d');
      tctx.fillStyle = '#103565';
      tctx.fillRect(0, 0, 256, 256);
      // Gold and silver eyelet dots
      tctx.fillStyle = '#d4af37';
      for (let y = 14; y < 245; y += 18) {
        for (let x = 14; x < 245; x += 18) {
          tctx.beginPath();
          tctx.arc(x, y, 2.2, 0, Math.PI * 2);
          tctx.fill();
        }
      }
      const tracesTexture = new THREE.CanvasTexture(tracesCanvas);
      const tracesMat = new THREE.MeshBasicMaterial({
        map: tracesTexture,
        transparent: true,
        opacity: 0.8
      });
      const tracesMesh = new THREE.Mesh(tracesGeo, tracesMat);
      tracesMesh.position.set(0, -0.05, 0.13);
      glitchGroup.add(tracesMesh);

      // 3. 1.3-inch Blue Monochrome OLED Display Module
      const oledWidth = 1.35;
      const oledHeight = 0.82;
      const oledFrameGeo = new THREE.BoxGeometry(oledWidth + 0.1, oledHeight + 0.1, 0.05);
      const oledFrameMat = new THREE.MeshStandardMaterial({
        color: 0x070a0f,
        roughness: 0.15,
        metalness: 0.85
      });
      const oledFrameMesh = new THREE.Mesh(oledFrameGeo, oledFrameMat);
      oledFrameMesh.position.set(0, 0.38, 0.2);
      glitchGroup.add(oledFrameMesh);

      // Emissive OLED Pixel Screen
      const oledTexture = new THREE.CanvasTexture(oledCanvasRef.current);
      oledTexture.minFilter = THREE.LinearFilter;
      oledTextureRef.current = oledTexture;
      updateOledTexture(currentExpressionId);

      const oledScreenGeo = new THREE.PlaneGeometry(oledWidth, oledHeight);
      const oledScreenMat = new THREE.MeshBasicMaterial({
        map: oledTexture,
        color: 0xffffff
      });
      const oledMesh = new THREE.Mesh(oledScreenGeo, oledScreenMat);
      oledMesh.position.set(0, 0.38, 0.23);
      glitchGroup.add(oledMesh);
      threeRefs.current.oledMesh = oledMesh;

      // 4-Pin OLED Header at top of screen (GND, VDD, SCK, SDA)
      const headerGeo = new THREE.BoxGeometry(0.5, 0.08, 0.06);
      const headerMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const headerMesh = new THREE.Mesh(headerGeo, headerMat);
      headerMesh.position.set(0, 0.85, 0.2);
      glitchGroup.add(headerMesh);

      // 4. Seeed Studio XIAO ESP32-C3 Board (Lower section)
      const xiaoGeo = new THREE.BoxGeometry(0.85, 0.65, 0.08);
      const xiaoMat = new THREE.MeshStandardMaterial({
        color: 0x1a2e1d, // Seeed green PCB
        roughness: 0.35,
        metalness: 0.3
      });
      const xiaoMesh = new THREE.Mesh(xiaoGeo, xiaoMat);
      xiaoMesh.position.set(0, -0.42, 0.18);
      glitchGroup.add(xiaoMesh);

      // XIAO RF Shield Can (silver metal)
      const rfShieldGeo = new THREE.BoxGeometry(0.55, 0.38, 0.06);
      const rfShieldMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.2
      });
      const rfShield = new THREE.Mesh(rfShieldGeo, rfShieldMat);
      rfShield.position.set(0, -0.38, 0.24);
      glitchGroup.add(rfShield);

      // 5. MPU6050 Motion Sensor IC (adjacent on carrier board)
      const imuGeo = new THREE.BoxGeometry(0.3, 0.3, 0.06);
      const imuMat = new THREE.MeshStandardMaterial({
        color: 0x1e2024,
        roughness: 0.3,
        metalness: 0.6
      });
      const imuMesh = new THREE.Mesh(imuGeo, imuMat);
      imuMesh.position.set(-0.52, -0.32, 0.18);
      glitchGroup.add(imuMesh);

      // 6. Rear Lithium-Polymer Battery Cell (3.7V 500mAh in dedicated compartment)
      const batteryGeo = new THREE.BoxGeometry(1.4, 1.25, 0.32);
      const batteryMat = new THREE.MeshStandardMaterial({
        color: 0xd8dde2, // Silver lithium pouch
        roughness: 0.25,
        metalness: 0.75
      });
      const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
      batteryMesh.position.set(0, -0.15, -0.18);
      glitchGroup.add(batteryMesh);

      // Yellow Kapton (polyimide) insulation tape band
      const kaptonGeo = new THREE.BoxGeometry(1.42, 0.35, 0.34);
      const kaptonMat = new THREE.MeshStandardMaterial({
        color: 0xfeb31d, // Kapton amber
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92
      });
      const kaptonMesh = new THREE.Mesh(kaptonGeo, kaptonMat);
      kaptonMesh.position.set(0, 0.32, -0.18);
      glitchGroup.add(kaptonMesh);

      // 7. Mechanical Controls & Hardware Ports

      // Centered USB-C port at the bottom edge (via XIAO board)
      const usbcGeo = new THREE.BoxGeometry(0.52, 0.14, 0.24);
      const usbcMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.15
      });
      const usbcMesh = new THREE.Mesh(usbcGeo, usbcMat);
      usbcMesh.position.set(0, -1.22, 0);
      glitchGroup.add(usbcMesh);

      // Physical ON/OFF slide switch on the right flank
      const switchHousingGeo = new THREE.BoxGeometry(0.12, 0.32, 0.2);
      const switchHousingMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
      const switchHousing = new THREE.Mesh(switchHousingGeo, switchHousingMat);
      switchHousing.position.set(1.02, 0.15, 0);
      glitchGroup.add(switchHousing);

      const switchKnobGeo = new THREE.BoxGeometry(0.14, 0.12, 0.14);
      const switchKnobMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 });
      const switchKnob = new THREE.Mesh(switchKnobGeo, switchKnobMat);
      switchKnob.position.set(1.08, 0.19, 0);
      glitchGroup.add(switchKnob);

      // Tactile button on the left flank (mood cycle)
      const btnGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.18, 16);
      btnGeo.rotateZ(Math.PI / 2);
      const btnMat = new THREE.MeshStandardMaterial({
        color: 0x111215,
        metalness: 0.7,
        roughness: 0.25
      });
      const btnMesh = new THREE.Mesh(btnGeo, btnMat);
      btnMesh.position.set(-1.06, 0.15, 0);
      glitchGroup.add(btnMesh);

      // Top corner reinforced anchor boss and stainless steel keyring loop
      const mountLugGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 16);
      const mountLugMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      const mountLug = new THREE.Mesh(mountLugGeo, mountLugMat);
      mountLug.position.set(0, 1.32, 0);
      glitchGroup.add(mountLug);

      const ringTorusGeo = new THREE.TorusGeometry(0.42, 0.07, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xcfd6df,
        metalness: 0.95,
        roughness: 0.15
      });
      const ringMesh = new THREE.Mesh(ringTorusGeo, ringMat);
      ringMesh.position.set(0, 1.7, 0);
      glitchGroup.add(ringMesh);

      // Animation Loop
      let lastTime = performance.now();
      const render = (time) => {
        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        const refs = threeRefs.current;
        if (!refs.glitchGroup || !refs.renderer) return;

        const smoothSpeed = refs.isDragging ? 18 : 6;
        refs.currentRotation.x += (refs.targetRotation.x - refs.currentRotation.x) * (smoothSpeed * delta);
        refs.currentRotation.y += (refs.targetRotation.y - refs.currentRotation.y) * (smoothSpeed * delta);

        if (refs.bounceSpring > 0.001) {
          refs.bounceSpring *= Math.exp(-9 * delta);
        } else {
          refs.bounceSpring = 0;
        }

        refs.glitchGroup.rotation.x = refs.currentRotation.x;
        refs.glitchGroup.rotation.y = refs.currentRotation.y;

        const scaleVal = 1 + Math.sin(time * 0.02) * refs.bounceSpring * 0.08;
        refs.glitchGroup.scale.set(scaleVal, scaleVal, scaleVal);

        if (!refs.isDragging && !reducedMotion && forcedAngle === null) {
          refs.glitchGroup.position.y = Math.sin(time * 0.0015) * 0.05;
        } else {
          refs.glitchGroup.position.y = 0;
        }

        refs.renderer.render(refs.scene, refs.camera);
        refs.animationFrameId = requestAnimationFrame(render);
      };

      threeRefs.current.animationFrameId = requestAnimationFrame(render);

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (threeRefs.current.animationFrameId) {
          cancelAnimationFrame(threeRefs.current.animationFrameId);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization error', err);
      setFallbackMode(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (forcedAngle !== null && threeRefs.current.glitchGroup) {
      const rad = (forcedAngle * Math.PI) / 180;
      threeRefs.current.targetRotation.y = rad;
      threeRefs.current.targetRotation.x = 0.08;
    }
  }, [forcedAngle]);

  const handlePointerDown = (e) => {
    threeRefs.current.isDragging = true;
    threeRefs.current.lastMousePos = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!threeRefs.current.isDragging) return;
    const dx = e.clientX - threeRefs.current.lastMousePos.x;
    const dy = e.clientY - threeRefs.current.lastMousePos.y;

    threeRefs.current.targetRotation.y += dx * 0.008;
    threeRefs.current.targetRotation.x += dy * 0.008;
    threeRefs.current.targetRotation.x = Math.max(-0.8, Math.min(0.8, threeRefs.current.targetRotation.x));

    threeRefs.current.lastMousePos = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    threeRefs.current.isDragging = false;
  };

  const setCameraView = (view) => {
    sound.playClick();
    setCurrentView(view);
    const refs = threeRefs.current;
    if (!refs.glitchGroup) return;

    switch (view) {
      case 'front':
        refs.targetRotation = { x: 0.05, y: 0 };
        break;
      case 'back':
        refs.targetRotation = { x: 0.05, y: Math.PI };
        break;
      case 'right':
        refs.targetRotation = { x: 0.0, y: Math.PI / 2 };
        break;
      case 'left':
        refs.targetRotation = { x: 0.0, y: -Math.PI / 2 };
        break;
      case 'top':
        refs.targetRotation = { x: 0.85, y: 0 };
        break;
      default:
        refs.targetRotation = { x: 0.08, y: 0.15 };
    }
  };

  const handleModelClick = () => {
    sound.playOledBlink();
    threeRefs.current.bounceSpring = 1.0;
    if (onExpressionChange) {
      const currentIndex = GLITCH_EXPRESSIONS.findIndex((exp) => exp.id === currentExpressionId);
      const nextIndex = (currentIndex + 1) % GLITCH_EXPRESSIONS.length;
      onExpressionChange(GLITCH_EXPRESSIONS[nextIndex].id);
    }
  };

  const handleHotspotClick = (hotspot) => {
    sound.playClick();
    if (onHotspotSelect) onHotspotSelect(hotspot.id);
    if (hotspot.camAngle) {
      threeRefs.current.targetRotation = {
        x: hotspot.camAngle.rotX,
        y: hotspot.camAngle.rotY
      };
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Stage Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleModelClick}
        className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] cursor-grab active:cursor-grabbing flex items-center justify-center outline-none bg-[#f4efe4] rounded-2xl overflow-hidden border-2 border-[#111215]"
        role="region"
        aria-label="Interactive 3D model of GLITCH. Drag to rotate 360 degrees, click or tap to cycle OLED eye expressions."
        tabIndex={0}
      >
        {fallbackMode ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <img
              src="/images/glitch-resin-hero.jpg"
              alt="GLITCH cast in optical clear resin case"
              className="max-h-[85%] object-contain rounded-xl shadow-md"
            />
            <p className="font-mono text-xs text-[#525866] mt-2">
              WebGL fallback view: 50 × 40 × 20 mm enclosure render
            </p>
          </div>
        ) : (
          <canvas ref={canvasRef} className="w-full h-full block" />
        )}

        {/* Technical HUD Floating Overlays */}
        <div className="absolute top-4 left-4 bg-[#111215] text-[#fbf8f2] px-3.5 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider pointer-events-none flex items-center gap-2 border border-[#111215] shadow-editorial-sm">
          <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
          <span>DRAG TO ROTATE // TAP SCREEN TO TEST EXPRESSIONS</span>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[#111215] px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase border border-[#111215] shadow-editorial-sm">
          SCALE: 1:1 TARGET // 50 × 40 × 20 MM
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#525866] px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase border border-[#111215]">
          INTERACTIVE 3D DEMO
        </div>
      </div>

      {/* Camera View Controls Bar */}
      <div className="w-full bg-[#ffffff] p-2 rounded-2xl flex flex-wrap items-center justify-between gap-2 border-2 border-[#111215] shadow-editorial-sm mt-3">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
          <span className="text-[#8b92a0] text-[11px] px-2 hidden sm:inline uppercase">VIEW:</span>
          {[
            { id: 'front', label: 'FRONT' },
            { id: 'back', label: 'REAR' },
            { id: 'right', label: 'RIGHT' },
            { id: 'left', label: 'LEFT' },
            { id: 'top', label: 'TOP' }
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCameraView(v.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
                currentView === v.id
                  ? 'bg-[#111215] text-[#fbf8f2]'
                  : 'bg-[#f4efe4] hover:bg-[#e8e2d4] text-[#111215]'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCameraView('front')}
          className="font-mono text-[11px] font-bold px-3 py-1 bg-[#f4efe4] hover:bg-[#111215] hover:text-white text-[#111215] rounded-full transition-colors border border-[#111215]"
        >
          RESET VIEW ↺
        </button>
      </div>

      {/* Component Hotspots Bar */}
      <div className="w-full mt-3 overflow-x-auto pb-1 flex gap-2 no-scrollbar">
        {HARDWARE_HOTSPOTS.map((spot) => {
          const isSelected = activeHotspotId === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => handleHotspotClick(spot)}
              className={`flex-shrink-0 font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-full border-2 transition-all flex items-center gap-2 uppercase ${
                isSelected
                  ? 'bg-[#111215] text-[#fbf8f2] border-[#111215] shadow-editorial-sm'
                  : 'bg-white text-[#111215] border-[#111215] hover:bg-[#f4efe4]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#00f5ff]' : 'bg-[#111215]'}`} />
              <span>{spot.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function createRoundedBoxGeometry(width, height, depth, radius, smoothness) {
  const shape = new THREE.Shape();
  const eps = 0.00001;
  const radiusMinus = radius - eps;

  shape.absarc(-width / 2 + radius, -height / 2 + radius, radiusMinus, Math.PI, 1.5 * Math.PI, true);
  shape.absarc(width / 2 - radius, -height / 2 + radius, radiusMinus, 1.5 * Math.PI, 2.0 * Math.PI, true);
  shape.absarc(width / 2 - radius, height / 2 - radius, radiusMinus, 0, 0.5 * Math.PI, true);
  shape.absarc(-width / 2 + radius, height / 2 - radius, radiusMinus, 0.5 * Math.PI, Math.PI, true);

  const extrudeSettings = {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radiusMinus,
    bevelThickness: radius,
    curveSegments: smoothness
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}
