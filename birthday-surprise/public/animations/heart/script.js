console.clear();

/* SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  6000
);
// Make the main heart small so it fits the mobile screen nicely
camera.position.z = window.innerWidth < 768 ? 1050 : 700;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* CONTROLS — UNLIMITED ZOOM INTO THE HEART */
const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);
controlsWebGL.enableZoom = true;
controlsWebGL.zoomSpeed = 1.2;
controlsWebGL.minDistance = 1; // Unlimited zoom deep into the center
controlsWebGL.maxDistance = 5000;
controlsWebGL.enableDamping = true;
controlsWebGL.dampingFactor = 0.05;

/* 1. ORIGINAL BREATHING HEART PARTICLES (GSAP TIMELINE) */
const tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

const path = document.querySelector("path");
const length = path.getTotalLength();
const vertices = [];

for (let i = 0; i < length; i += 0.12) {
  const point = path.getPointAtLength(i);
  const vector = new THREE.Vector3(point.x, -point.y, 0);
  vector.x += (Math.random() - 0.5) * 30;
  vector.y += (Math.random() - 0.5) * 30;
  vector.z += (Math.random() - 0.5) * 70;
  vertices.push(vector);

  // Original tween animating each vector from center
  tl.from(
    vector,
    {
      x: 600 / 2, // Center X of the heart
      y: -552 / 2, // Center Y of the heart
      z: 0, // Center of the scene
      ease: "power2.inOut",
      duration: "random(2, 5)"
    },
    i * 0.0012
  );
}

const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
const material = new THREE.PointsMaterial({
  color: 0xee5282,
  blending: THREE.AdditiveBlending,
  size: 3
});
const particles = new THREE.Points(geometry, material);
// Offset the particles in the scene based on the viewbox values
particles.position.x -= 600 / 2;
particles.position.y += 552 / 2;
scene.add(particles);

// Original 3D scene gentle sway
gsap.fromTo(
  scene.rotation,
  { y: -0.2 },
  {
    y: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    duration: 3
  }
);

/* 2. NESTED MINI HEARTS AT THE CORE (REVEALED ON ZOOMING DEEP) */
// When she zooms in deep towards the center, small small hearts are revealed!
const miniHeartsGroup = new THREE.Group();
scene.add(miniHeartsGroup);

function createMiniHeart(scale = 1, color = 0xff69b4) {
  const pts = [];
  const steps = 120;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    // Classic heart parametric curve
    const x = 16 * Math.pow(Math.sin(t), 3) * scale;
    const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
    const z = (Math.random() - 0.5) * 3 * scale;
    pts.push(new THREE.Vector3(x, y, z));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.PointsMaterial({
    color: color,
    blending: THREE.AdditiveBlending,
    size: Math.max(1.5, scale * 3),
    transparent: true,
    opacity: 0.95
  });
  return new THREE.Points(geo, mat);
}

// Generate clusters of small hearts of various scales inside the core
const miniHeartColors = [0xff3b77, 0xff70a6, 0xffa4c8, 0xff2e93, 0xffd166, 0xff5c8a];
const miniHeartConfigs = [
  // Centerpiece mini heart
  { scale: 0.8, x: 0, y: 0, z: 0, color: 0xff2e93 },
  // Surrounding small hearts
  { scale: 0.5, x: 28, y: 15, z: 12, color: 0xff70a6 },
  { scale: 0.5, x: -28, y: 15, z: -10, color: 0xff3b77 },
  { scale: 0.45, x: 18, y: -25, z: 8, color: 0xffa4c8 },
  { scale: 0.45, x: -18, y: -25, z: -14, color: 0xffd166 },
  { scale: 0.35, x: 0, y: 32, z: 15, color: 0xff5c8a },
  { scale: 0.35, x: -35, y: -8, z: 18, color: 0xff70a6 },
  { scale: 0.3, x: 35, y: -8, z: -16, color: 0xff2e93 },
  // Deeper smaller hearts (for extra close zoom)
  { scale: 0.22, x: 8, y: 8, z: -5, color: 0xffffff },
  { scale: 0.2, x: -10, y: 6, z: 6, color: 0xff3b77 },
  { scale: 0.18, x: 5, y: -10, z: 4, color: 0xffa4c8 },
  { scale: 0.15, x: -7, y: -8, z: -7, color: 0xffd166 },
  // Ultra-micro hearts at the very epicenter (unlimited zoom surprise)
  { scale: 0.08, x: 0, y: 0, z: 0, color: 0xffffff },
  { scale: 0.05, x: 1.5, y: 1.2, z: 0.5, color: 0xff2e93 },
  { scale: 0.03, x: -1.2, y: -1.0, z: -0.4, color: 0xff70a6 }
];

const miniHearts = [];
miniHeartConfigs.forEach((cfg, idx) => {
  const mh = createMiniHeart(cfg.scale, cfg.color);
  mh.position.set(cfg.x, cfg.y, cfg.z);
  mh.userData = {
    baseScale: cfg.scale,
    rotSpeedX: (Math.random() - 0.5) * 0.02,
    rotSpeedY: (Math.random() - 0.5) * 0.02,
    phase: Math.random() * Math.PI * 2
  };
  miniHeartsGroup.add(mh);
  miniHearts.push(mh);
});

/* RENDERING LOOP */
let clock = new THREE.Clock();

function render() {
  requestAnimationFrame(render);

  const elapsedTime = clock.getElapsedTime();

  // 1. Update main heart geometry from animated vertices
  geometry.setFromPoints(vertices);

  // 2. Animate the small mini hearts inside
  miniHearts.forEach((mh) => {
    mh.rotation.y += mh.userData.rotSpeedY;
    mh.rotation.x += mh.userData.rotSpeedX;

    // Subtle breathing pulse for each mini heart
    const pulse = 1 + Math.sin(elapsedTime * 3 + mh.userData.phase) * 0.08;
    mh.scale.set(pulse, pulse, pulse);
  });

  // 3. Dynamic zoom response:
  // As the user zooms in (camera distance gets smaller),
  // the mini hearts shine even brighter!
  const camDist = camera.position.length();
  const zoomGlow = THREE.MathUtils.clamp((800 - camDist) / 600, 0.4, 1.6);
  miniHearts.forEach((mh) => {
    if (mh.material) {
      mh.material.size = Math.max(1.8, mh.userData.baseScale * 3.8 * zoomGlow);
    }
  });

  controlsWebGL.update();
  renderer.render(scene, camera);
}

/* RESIZE & RESPONSIVE POSITIONING */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.z = window.innerWidth < 768 ? 1050 : 700;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

requestAnimationFrame(render);
