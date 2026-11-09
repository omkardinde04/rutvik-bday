import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Sparkles, Trophy, ArrowDown, Volume2, VolumeX, Shield } from 'lucide-react';
import '../styles/hero.css';

/**
 * Procedurally generates black-and-gold match ball textures for the Hero 3D showcase
 */
function createMatchBallTextures() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];

  const vertices = rawVertices.map((v) => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
  });

  const width = 512;
  const height = 256;

  const canvasDiff = document.createElement('canvas');
  canvasDiff.width = width;
  canvasDiff.height = height;
  const ctxDiff = canvasDiff.getContext('2d');
  const imgDiff = ctxDiff.createImageData(width, height);
  const dataDiff = imgDiff.data;

  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxBump = canvasBump.getContext('2d');
  const imgBump = ctxBump.createImageData(width, height);
  const dataBump = imgBump.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lon = (u - 0.5) * 2 * Math.PI;
      const px = cosLat * Math.sin(lon);
      const py = sinLat;
      const pz = cosLat * Math.cos(lon);

      let d1 = -1;
      let d2 = -1;

      for (let i = 0; i < 12; i++) {
        const dot = px * vertices[i][0] + py * vertices[i][1] + pz * vertices[i][2];
        if (dot > d1) {
          d2 = d1;
          d1 = dot;
        } else if (dot > d2) {
          d2 = dot;
        }
      }

      const idx = (y * width + x) * 4;
      const isPentagon = d1 > 0.925;
      const isSeam = (d1 > 0.912 && d1 < 0.938) || (Math.abs(d1 - d2) < 0.038);

      if (isSeam) {
        // Deep groove seam
        dataDiff[idx] = 20;
        dataDiff[idx + 1] = 20;
        dataDiff[idx + 2] = 24;
        dataDiff[idx + 3] = 255;

        dataBump[idx] = 20;
        dataBump[idx + 1] = 20;
        dataBump[idx + 2] = 20;
        dataBump[idx + 3] = 255;
      } else if (isPentagon) {
        // Golden accent pentagon
        dataDiff[idx] = 251;
        dataDiff[idx + 1] = 191;
        dataDiff[idx + 2] = 36;
        dataDiff[idx + 3] = 255;

        dataBump[idx] = 210;
        dataBump[idx + 1] = 210;
        dataBump[idx + 2] = 210;
        dataBump[idx + 3] = 255;
      } else {
        // Crisp white hexagon leather patch
        dataDiff[idx] = 245;
        dataDiff[idx + 1] = 247;
        dataDiff[idx + 2] = 250;
        dataDiff[idx + 3] = 255;

        dataBump[idx] = 245;
        dataBump[idx + 1] = 245;
        dataBump[idx + 2] = 245;
        dataBump[idx + 3] = 255;
      }
    }
  }

  ctxDiff.putImageData(imgDiff, 0, 0);
  ctxBump.putImageData(imgBump, 0, 0);

  const diffuseMap = new THREE.CanvasTexture(canvasDiff);
  const bumpMap = new THREE.CanvasTexture(canvasBump);

  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuseMap, bumpMap };
}

export default function HeroSection() {
  const mountRef = useRef(null);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 300;
    let height = mount.clientHeight || 200;

    // --- 1. Three.js Interactive Match Ball ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0x38bdf8, 120, 20, Math.PI / 4, 0.5);
    spotLight.position.set(3, 4, 4);
    scene.add(spotLight);

    const goldLight = new THREE.DirectionalLight(0xfbbf24, 2.5);
    goldLight.position.set(-3, -2, -2);
    scene.add(goldLight);

    // Match Ball
    const { diffuseMap, bumpMap } = createMatchBallTextures();
    const ballGeometry = new THREE.SphereGeometry(1.0, 48, 48);
    const ballMaterial = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      bumpMap: bumpMap,
      bumpScale: 0.04,
      roughness: 0.3,
      metalness: 0.15
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      ball.rotation.y += deltaX * 0.01;
      ball.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      if (!isDragging) {
        ball.rotation.y += delta * 0.45;
        ball.rotation.x += delta * 0.15;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || 300;
      height = mount.clientHeight || 200;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      ballGeometry.dispose();
      ballMaterial.dispose();
      diffuseMap.dispose();
      bumpMap.dispose();
      renderer.dispose();

      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-spotlight-cone" />

      <div className="hero-content">
        {/* Left Column: Heading & Match Story */}
        <div className="hero-text-block">
          <div className="hero-match-badge">
            <Sparkles size={14} />
            <span>MATCHDAY EDITION • BIRTHDAY SPECIAL</span>
          </div>

          <h1 className="hero-main-title">
            CAPTAIN RUTVIK
            <span className="highlight">THE PLAYMAKER'S MASTERCLASS</span>
          </h1>

          <p className="hero-description">
            A milestone celebration on the grandest stage. Driven by unmatched vision, relentless passion, and the spirit of a true champion.
          </p>

          <div className="hero-actions">
            <button className="hero-cta-btn" onClick={scrollToNext}>
              <span>EXPLORE THE LEGACY</span>
              <ArrowDown size={17} />
            </button>

            <button
              className="hero-ambience-btn"
              onClick={() => setIsAudioActive(!isAudioActive)}
              aria-label="Toggle Stadium Ambience"
            >
              {isAudioActive ? (
                <>
                  <Volume2 size={18} color="#10b981" />
                  <div className="sound-bars">
                    <span className="sound-bar" />
                    <span className="sound-bar" />
                    <span className="sound-bar" />
                    <span className="sound-bar" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX size={18} color="#94a3b8" />
                  <span>STADIUM SOUND</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Tactical Player Card HUD with Interactive 3D Ball */}
        <div className="hero-visual-card">
          <div className="tactical-card">
            <div className="card-top-row">
              <div>
                <div className="card-ovr">99</div>
                <div className="card-pos">CAM • CAPTAIN</div>
              </div>
              <div className="card-badge-pill">
                <Trophy size={14} />
                <span>MVP #10</span>
              </div>
            </div>

            {/* Interactive 3D Match Ball Box */}
            <div className="card-canvas-box" ref={mountRef}>
              <span className="card-canvas-hint">Drag to Rotate</span>
            </div>

            <div className="card-player-name">RUTVIK</div>
            <div className="card-team-subtitle">RUTVIK FC • SPECIAL EDITION</div>

            {/* Player Attribute Stats */}
            <div className="card-stats-grid">
              <div className="stat-item">
                <span className="stat-val">99</span>
                <span className="stat-lbl">PAC</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">99</span>
                <span className="stat-lbl">SHO</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">98</span>
                <span className="stat-lbl">PAS</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">100</span>
                <span className="stat-lbl">DRI</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">99</span>
                <span className="stat-lbl">PHY</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">100</span>
                <span className="stat-lbl">CHA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

