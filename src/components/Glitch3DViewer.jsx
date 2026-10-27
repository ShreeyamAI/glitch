import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLITCH_EXPRESSIONS, HARDWARE_HOTSPOTS } from '../data/glitchData';
import { sound } from '../utils/sound';

export default function Glitch3DViewer({
  currentExpressionId,
  onExpressionChange,
  activeHotspotId,
  onHotspotSelect,
  forcedAngle = null,
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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    try {
      const scene = new THREE.Scene();
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 480;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.8);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;

      threeRefs.current.scene = scene;
      threeRefs.current.camera = camera;
      threeRefs.current.renderer = renderer;

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(4, 5, 5);
      scene.add(keyLight);

      const cyanGlow = new THREE.PointLight(0x00f5ff, 3.5, 4.5);
      cyanGlow.position.set(0, 0.3, 0.9);
      scene.add(cyanGlow);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      const glitchGroup = new THREE.Group();
      scene.add(glitchGroup);
      threeRefs.current.glitchGroup = glitchGroup;

      // 1. Crystal Optical Clear Resin Case
      const caseGeo = createRoundedBoxGeometry(2.0, 2.5, 1.05, 0.25, 12);
      const caseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.04,
        roughness: 0.05,
        transmission: 0.96,
        thickness: 1.3,
        ior: 1.54,
        specularIntensity: 1.3,
        specularColor: 0xffffff,
        transparent: true,
        opacity: 0.94,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03
      });
      const caseMesh = new THREE.Mesh(caseGeo, caseMat);
      glitchGroup.add(caseMesh);
      threeRefs.current.caseMesh = caseMesh;

      // 2. Hardware PCB Substrate
      const pcbGeo = new THREE.BoxGeometry(1.58, 2.0, 0.08);
      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x154586, // Rekko deep royal blue PCB
        metalness: 0.3,
        roughness: 0.4
      });
      const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
      pcbMesh.position.set(0, -0.05, 0.08);
      glitchGroup.add(pcbMesh);

      // Gold Traces
      const tracesGeo = new THREE.PlaneGeometry(1.45, 1.85);
      const tracesCanvas = document.createElement('canvas');
      tracesCanvas.width = 256;
      tracesCanvas.height = 256;
      const tctx = tracesCanvas.getContext('2d');
      tctx.fillStyle = '#0f3261';
      tctx.fillRect(0, 0, 256, 256);
      tctx.strokeStyle = '#e2a843';
      tctx.lineWidth = 3;
      for (let i = 16; i < 240; i += 16) {
        tctx.beginPath();
        tctx.moveTo(20, i);
        tctx.lineTo(236, i);
        tctx.stroke();
      }
      const tracesTexture = new THREE.CanvasTexture(tracesCanvas);
      const tracesMat = new THREE.MeshBasicMaterial({
        map: tracesTexture,
        transparent: true,
        opacity: 0.75
      });
      const tracesMesh = new THREE.Mesh(tracesGeo, tracesMat);
      tracesMesh.position.set(0, -0.05, 0.13);
      glitchGroup.add(tracesMesh);

      // OLED Bezel & Screen
      const oledWidth = 1.35;
      const oledHeight = 0.85;
      const oledFrameGeo = new THREE.BoxGeometry(oledWidth + 0.12, oledHeight + 0.12, 0.06);
      const oledFrameMat = new THREE.MeshStandardMaterial({
        color: 0x05080c,
        roughness: 0.2,
        metalness: 0.85
      });
      const oledFrameMesh = new THREE.Mesh(oledFrameGeo, oledFrameMat);
      oledFrameMesh.position.set(0, 0.35, 0.2);
      glitchGroup.add(oledFrameMesh);

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
      oledMesh.position.set(0, 0.35, 0.24);
      glitchGroup.add(oledMesh);
      threeRefs.current.oledMesh = oledMesh;

      // Microcontroller Chip
      const mcuGeo = new THREE.BoxGeometry(0.52, 0.52, 0.09);
      const mcuMat = new THREE.MeshStandardMaterial({
        color: 0x181a1c,
        roughness: 0.25,
        metalness: 0.6
      });
      const mcuMesh = new THREE.Mesh(mcuGeo, mcuMat);
      mcuMesh.position.set(0, -0.28, 0.2);
      glitchGroup.add(mcuMesh);

      // MPU6050 Motion Sensor
      const imuGeo = new THREE.BoxGeometry(0.34, 0.34, 0.07);
      const imuMat = new THREE.MeshStandardMaterial({
        color: 0x22262a,
        roughness: 0.3,
        metalness: 0.7
      });
      const imuMesh = new THREE.Mesh(imuGeo, imuMat);
      imuMesh.position.set(-0.46, -0.28, 0.2);
      glitchGroup.add(imuMesh);

      // Rear Battery Cell
      const batteryGeo = new THREE.BoxGeometry(1.42, 1.32, 0.36);
      const batteryMat = new THREE.MeshStandardMaterial({
        color: 0xdde2e6,
        roughness: 0.25,
        metalness: 0.75
      });
      const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
      batteryMesh.position.set(0, -0.15, -0.18);
      glitchGroup.add(batteryMesh);

      const kaptonGeo = new THREE.BoxGeometry(1.44, 0.38, 0.38);
      const kaptonMat = new THREE.MeshStandardMaterial({
        color: 0xfeb31d, // Rekko amber
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95
      });
      const kaptonMesh = new THREE.Mesh(kaptonGeo, kaptonMat);
      kaptonMesh.position.set(0, 0.35, -0.18);
      glitchGroup.add(kaptonMesh);

      // Mechanical ports & controls
      const usbcGeo = new THREE.BoxGeometry(0.56, 0.13, 0.25);
      const usbcMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95 });
      const usbcMesh = new THREE.Mesh(usbcGeo, usbcMat);
      usbcMesh.position.set(0, -1.22, 0);
      glitchGroup.add(usbcMesh);

      const btnGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.2, 16);
      btnGeo.rotateZ(Math.PI / 2);
      const btnMat = new THREE.MeshStandardMaterial({ color: 0xed4027, metalness: 0.6 }); // Rekko red button
      const btnMesh = new THREE.Mesh(btnGeo, btnMat);
      btnMesh.position.set(-1.06, 0.1, 0);
      glitchGroup.add(btnMesh);

      const mountLugGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.24, 16);
      const mountLugMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 });
      const mountLug = new THREE.Mesh(mountLugGeo, mountLugMat);
      mountLug.position.set(0, 1.34, 0);
      glitchGroup.add(mountLug);

      const ringTorusGeo = new THREE.TorusGeometry(0.44, 0.08, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xa4abb2, metalness: 0.95 });
      const ringMesh = new THREE.Mesh(ringTorusGeo, ringMat);
      ringMesh.position.set(0, 1.72, 0);
      glitchGroup.add(ringMesh);

      // Render Loop
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

        const scaleVal = 1 + Math.sin(time * 0.02) * refs.bounceSpring * 0.12;
        refs.glitchGroup.scale.set(scaleVal, scaleVal, scaleVal);

        if (!refs.isDragging && !reducedMotion && forcedAngle === null) {
          refs.glitchGroup.position.y = Math.sin(time * 0.0018) * 0.06;
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
      console.warn('WebGL init error', err);
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
      {/* 3D Stage with Rekko card styling */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleModelClick}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center outline-none bg-[#f4e9d0]/60 rounded-2xl overflow-hidden border border-[#141414]/15"
        role="region"
        aria-label="Interactive 3D model of GLITCH. Drag to rotate, tap to cycle expressions."
        tabIndex={0}
      >
        {fallbackMode ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <img
              src="/images/glitch-resin-hero.jpg"
              alt="GLITCH cast in optical clear resin case"
              className="max-h-[80%] object-contain rounded-xl shadow-lg"
            />
          </div>
        ) : (
          <canvas ref={canvasRef} className="w-full h-full block" />
        )}

        {/* Floating pill badge */}
        <div className="absolute top-4 left-4 bg-[#141414] text-[#fef5e1] px-3 py-1 rounded-full font-mono text-[11px] font-semibold tracking-wider pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />
          <span>DRAG 360° // TAP SCREEN FOR MOODS</span>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-xs text-[#141414] px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase border border-[#141414]/10">
          SCALE 1:1 // 50 × 40 × 20 MM (TARGET)
        </div>
      </div>

      {/* View Presets Bar (Pill style) */}
      <div className="w-full bg-[#f4e9d0] p-2 rounded-xl flex flex-wrap items-center justify-between gap-2 border border-[#141414]/10 mt-3">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
          <span className="text-[#141414]/60 text-[11px] px-2 hidden sm:inline">VIEW:</span>
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
                  ? 'bg-[#141414] text-[#fef5e1]'
                  : 'bg-white/70 hover:bg-white text-[#141414]'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCameraView('front')}
          className="font-mono text-[10px] font-bold px-3 py-1 bg-[#ed4027] text-white rounded-full hover:bg-[#c9321c] transition-colors"
        >
          RESET ↺
        </button>
      </div>

      {/* Hotspots Carousel */}
      <div className="w-full mt-3 overflow-x-auto pb-1 flex gap-2 no-scrollbar">
        {HARDWARE_HOTSPOTS.map((spot) => {
          const isSelected = activeHotspotId === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => handleHotspotClick(spot)}
              className={`flex-shrink-0 font-mono text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 uppercase ${
                isSelected
                  ? 'bg-[#154586] text-[#fef5e1] border-[#154586]'
                  : 'bg-white text-[#141414] border-[#141414]/15 hover:border-[#141414]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#feb31d]' : 'bg-[#00f5ff]'}`} />
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
