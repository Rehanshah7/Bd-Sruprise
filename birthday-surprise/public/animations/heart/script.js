/* ========================================================
   BREATHING 3D PARTICLE HEART
   - Starts instantly (no delay, no blank screen)
   - Perfectly sized and fitted for mobile screens
   - Realistic "lub-dub" breathing heartbeat pulse
======================================================== */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x020108, 1);
document.body.appendChild(renderer.domElement);

/* CONTROLS */
let controls = null;
if (typeof THREE.OrbitControls === "function") {
  try {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Prevent accidental zoom on mobile
    controls.rotateSpeed = 0.6;
  } catch (e) {
    console.warn("OrbitControls init:", e);
  }
}

/* HEART GEOMETRY GENERATION */
const path = document.querySelector("path");
const pathLength = path ? path.getTotalLength() : 1800;

const basePositions = [];
const currentPositions = [];
const velocities = [];
const phases = [];

// Sample points along the SVG path
// ~2,400 points gives rich density without any mobile lag
const step = 0.75;
for (let i = 0; i < pathLength; i += step) {
  const pt = path.getPointAtLength(i);
  // Center around (0, 0)
  const x = pt.x - 300;
  const y = -(pt.y - 276);
  const z = (Math.random() - 0.5) * 55;

  // Add slight organic dispersion
  const jx = x + (Math.random() - 0.5) * 16;
  const jy = y + (Math.random() - 0.5) * 16;
  const jz = z + (Math.random() - 0.5) * 35;

  basePositions.push(jx, jy, jz);
  currentPositions.push(jx, jy, jz);
  phases.push(Math.random() * Math.PI * 2);
}

// Add soft floating stardust inside and around the heart (~600 motes)
for (let i = 0; i < 600; i++) {
  const t = Math.random() * pathLength;
  const pt = path.getPointAtLength(t);
  const innerFactor = Math.random() * 0.85; // Fill inside
  const x = (pt.x - 300) * innerFactor + (Math.random() - 0.5) * 12;
  const y = -(pt.y - 276) * innerFactor + (Math.random() - 0.5) * 12;
  const z = (Math.random() - 0.5) * 75;

  basePositions.push(x, y, z);
  currentPositions.push(x, y, z);
  phases.push(Math.random() * Math.PI * 2);
}

const particleCount = basePositions.length / 3;
const posAttr = new THREE.BufferAttribute(new Float32Array(currentPositions), 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", posAttr);

// Soft circular glowing particle texture
function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.25, "rgba(255, 120, 170, 0.85)");
  grad.addColorStop(0.6, "rgba(238, 82, 130, 0.35)");
  grad.addColorStop(1, "rgba(238, 82, 130, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

const material = new THREE.PointsMaterial({
  color: 0xff3b77,
  size: window.innerWidth < 600 ? 5.5 : 4.8,
  map: createParticleTexture(),
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
});

const heartMesh = new THREE.Points(geometry, material);
const heartGroup = new THREE.Group();
heartGroup.add(heartMesh);
scene.add(heartGroup);

/* RESPONSIVE SCALING & CAMERA POSITIONING */
function updateSizing() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const aspect = w / h;
  camera.aspect = aspect;

  const isMobile = w < 768;
  // Heart fits comfortably inside mobile screen:
  // Base scale is calibrated so heart takes ~50-60% of viewport width
  if (isMobile) {
    heartGroup.scale.set(0.55, 0.55, 0.55);
    camera.position.z = 820;
  } else {
    heartGroup.scale.set(0.8, 0.8, 0.8);
    camera.position.z = 640;
  }

  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

window.addEventListener("resize", updateSizing);
updateSizing();

/* ANIMATION LOOP — INSTANT START & BREATHING HEARTBEAT */
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Natural "lub-dub" heartbeat equation
  // Cycle repeats every ~1.2 seconds (~50-52 bpm relaxed resting love heartbeat)
  const beatTime = (elapsedTime * 2.8) % (Math.PI * 2);
  const pulse1 = Math.pow(Math.max(0, Math.sin(beatTime)), 10) * 0.12;
  const pulse2 = Math.pow(Math.max(0, Math.sin(beatTime - 0.42)), 14) * 0.08;
  const totalPulse = pulse1 + pulse2;

  // Apply heartbeat scale to the heart group
  const isMobile = window.innerWidth < 768;
  const baseScale = isMobile ? 0.55 : 0.8;
  const currentScale = baseScale * (1 + totalPulse);
  heartGroup.scale.set(currentScale, currentScale, currentScale * (1 + totalPulse * 1.4));

  // Organic floating drift for each particle
  const positions = posAttr.array;
  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    const phase = phases[i];
    const bx = basePositions[idx];
    const by = basePositions[idx + 1];
    const bz = basePositions[idx + 2];

    // Gentle particle shimmer
    const driftX = Math.sin(elapsedTime * 1.8 + phase) * 3;
    const driftY = Math.cos(elapsedTime * 1.5 + phase) * 3;
    const driftZ = Math.sin(elapsedTime * 2.1 + phase) * 5;

    positions[idx] = bx + driftX;
    positions[idx + 1] = by + driftY;
    positions[idx + 2] = bz + driftZ;
  }
  posAttr.needsUpdate = true;

  // Gentle 3D rotation & breathing tilt
  heartGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.22;
  heartGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08;

  if (controls) {
    controls.update();
  }

  renderer.render(scene, camera);
}

// Start immediately on load!
animate();
