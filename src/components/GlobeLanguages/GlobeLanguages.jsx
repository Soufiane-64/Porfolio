import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './globeLanguages.css';

const letters = ['A', 'أ', '文', 'Я', 'Ñ', 'Ü', 'ß', 'é', 'Ж', 'Ω', 'δ', '한', 'ह', 'に', 'ç'];

const GlobeLanguages = () => {
  const containerRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return () => {};

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.2, 3.2);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.03;

    // lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // gradient for toon
    const gradientMap = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/gradientMaps/threeTone.jpg',
      (g) => {
        g.minFilter = THREE.NearestFilter;
        g.magFilter = THREE.NearestFilter;
        g.generateMipmaps = false;
      }
    );

    // earth (toon)
    const earthMat = new THREE.MeshToonMaterial({ color: 0x4aa3ff, gradientMap });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat);
    scene.add(earth);

    // continents mask overlay
    function buildLandMaskTexture(image) {
      const canvas = document.createElement('canvas');
      const w = 1024, h = 512;
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const landScore = (r + g) - b;
        const alpha = landScore > 40 ? 255 : 0;
        data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; data[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      return tex;
    }

    new THREE.ImageLoader().load(
      'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
      (img) => {
        const landMask = buildLandMaskTexture(img);
        const landMat = new THREE.MeshToonMaterial({
          color: 0x34c759,
          gradientMap,
          transparent: true,
          alphaMap: landMask
        });
        const landMesh = new THREE.Mesh(new THREE.SphereGeometry(1.002, 64, 64), landMat);
        scene.add(landMesh);
      }
    );

    // outline for stylized look
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, depthWrite: false });
    const outlineMesh = new THREE.Mesh(new THREE.SphereGeometry(1.05, 64, 64), outlineMaterial);
    scene.add(outlineMesh);

    // stars background (subtle)
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1200;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = THREE.MathUtils.randFloat(16, 70);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // orbiting multilingual letters
    const orbits = [];

    function makeLabelSprite(char, color = '#ffffff') {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.shadowColor = color; // glow
      ctx.shadowBlur = 18;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${Math.floor(size * 0.55)}px system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif`;
      ctx.fillText(char, size / 2, size / 2 + 8);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.22, 0.22, 1);
      sprite.userData._dispose = () => { tex.dispose(); mat.dispose(); };
      return sprite;
    }

    function addLetterOrbit({ text, radius = 1.35, speed = 0.01, inclinationDeg = 0, color = '#ffffff', phase = 0, ring = true }) {
      const group = new THREE.Group();
      group.rotation.x = THREE.MathUtils.degToRad(inclinationDeg);
      scene.add(group);

      if (ring) {
        const segments = 128;
        const ringGeo = new THREE.BufferGeometry();
        const pts = new Float32Array(segments * 3);
        for (let i = 0; i < segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          pts[i * 3 + 0] = Math.cos(a) * radius;
          pts[i * 3 + 1] = 0;
          pts[i * 3 + 2] = Math.sin(a) * radius;
        }
        ringGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const ringMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.6 });
        const ringLine = new THREE.LineLoop(ringGeo, ringMat);
        ringLine.renderOrder = 1;
        group.add(ringLine);
      }

      const pivot = new THREE.Object3D();
      group.add(pivot);
      const sprite = makeLabelSprite(text, color);
      sprite.position.set(radius, 0, 0);
      sprite.userData.wobblePhase = Math.random() * Math.PI * 2;
      pivot.add(sprite);

      group.rotation.y = phase;
      const record = { group, sprite, speed };
      orbits.push(record);
      return record;
    }

    const palette = ['#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#e0e722', '#bb86fc'];
    const orbitConfigs = [
      { r: 1.30, sp: 0.010, inc: 15 },
      { r: 1.45, sp: 0.012, inc: -10 },
      { r: 1.60, sp: 0.009, inc: 25 },
      { r: 1.80, sp: 0.013, inc: -22 },
      { r: 2.00, sp: 0.011, inc: 8 }
    ];

    let idx = 0;
    for (const conf of orbitConfigs) {
      for (let j = 0; j < 3 && idx < letters.length; j++, idx++) {
        addLetterOrbit({
          text: letters[idx],
          radius: conf.r,
          speed: conf.sp * (1 + j * 0.15),
          inclinationDeg: conf.inc,
          color: palette[(idx + j) % palette.length],
          phase: (j / 3) * Math.PI * 2,
          ring: true
        });
      }
    }

    // animation
    const animate = () => {
      earth.rotation.y += 0.01;
      for (const o of orbits) {
        o.group.rotation.y += o.speed;
        const s = o.sprite;
        s.userData.wobblePhase += 0.02;
        const wob = Math.sin(s.userData.wobblePhase) * 0.02;
        s.scale.set(0.22 + wob, 0.22 + wob, 1);
      }
      controls.update();
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // cleanup and resource disposal
    const disposeScene = () => {
      scene.traverse((obj) => {
        if (obj.userData && obj.userData._dispose) obj.userData._dispose();
      });
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      disposeScene();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="globe-languages-container">
      <div ref={containerRef} className="globe-canvas-holder" aria-label="World languages visualization" />
    </div>
  );
};

export default GlobeLanguages;
