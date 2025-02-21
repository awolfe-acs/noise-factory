// /src/threeSetup.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

function setupGUI(camera, uniforms) {
  const guiControls = {
    cameraX: camera.position.x,
    cameraY: camera.position.y,
    cameraZ: camera.position.z,
    mixFactor: uniforms.mixFactor.value,
    noiseDensity: uniforms.noiseDensity.value,
    heightIntensity: uniforms.heightIntensity.value,
    sharpness: uniforms.sharpness.value,
    brightness: uniforms.brightness.value,
    exposureCeiling: uniforms.exposureCeiling.value,
    animationMix: uniforms.animationMix.value,
    animFrequency: uniforms.animFrequency.value,
    metallic: uniforms.metallic.value,
    specularExponent: uniforms.specularExponent.value,
    specularLower: uniforms.specularLower.value,
    specularUpper: uniforms.specularUpper.value,
    overlayOpacity: uniforms.overlayOpacity.value,
    overlayScale: uniforms.overlayScale.value,
    overlayTimeScale: uniforms.overlayTimeScale.value,
    // For debugging: we can view uvScale as well if desired.
    // uvScaleX: uniforms.uvScale.value.x,
    // uvScaleY: uniforms.uvScale.value.y,
    color1: "#" + uniforms.color1.value.getHexString(),
    color2: "#" + uniforms.color2.value.getHexString(),
    color3: "#" + uniforms.color3.value.getHexString(),
  };

  const gui = new GUI({ autoPlace: false });
  const controlPanel = document.querySelector("#control-panel");
  controlPanel.appendChild(gui.domElement);

  gui
    .add(guiControls, "mixFactor", 0, 1)
    .name("Mix Factor")
    .onChange((val) => {
      uniforms.mixFactor.value = val;
    });
  gui
    .add(guiControls, "noiseDensity", 0.1, 15)
    .name("Noise Density")
    .onChange((val) => {
      uniforms.noiseDensity.value = val;
    });
  gui
    .add(guiControls, "heightIntensity", 0.1, 25)
    .name("Height Intensity")
    .onChange((val) => {
      uniforms.heightIntensity.value = val;
    });
  gui
    .add(guiControls, "sharpness", 0.1, 25)
    .name("Sharpness")
    .onChange((val) => {
      uniforms.sharpness.value = val;
    });
  gui
    .add(guiControls, "brightness", 0.001, 5)
    .name("Brightness")
    .step(0.001)
    .onChange((val) => {
      uniforms.brightness.value = val;
    });
  gui
    .add(guiControls, "exposureCeiling", 0.001, 5)
    .name("Exposure Ceiling")
    .step(0.001)
    .onChange((val) => {
      uniforms.exposureCeiling.value = val;
    });
  gui
    .add(guiControls, "animFrequency", 0.1, 2)
    .name("Anim Frequency")
    .step(0.001)
    .onChange((val) => {
      uniforms.animFrequency.value = val;
    });
  gui
    .add(guiControls, "animationMix", 0, 1)
    .name("Animation Mix")
    .step(0.001)
    .onChange((val) => {
      uniforms.animationMix.value = val;
    });
  gui
    .add(guiControls, "metallic", 0, 20)
    .name("Metallic")
    .onChange((val) => {
      uniforms.metallic.value = val;
    });
  gui
    .add(guiControls, "specularExponent", 1, 64)
    .name("Specular Exponent")
    .onChange((val) => {
      uniforms.specularExponent.value = val;
    });
  gui
    .add(guiControls, "specularLower", 0, 1)
    .name("Specular Lower")
    .onChange((val) => {
      uniforms.specularLower.value = val;
    });
  gui
    .add(guiControls, "specularUpper", 0, 1)
    .name("Specular Upper")
    .onChange((val) => {
      uniforms.specularUpper.value = val;
    });
  gui
    .add(guiControls, "overlayOpacity", 0, 1)
    .name("Overlay Opacity")
    .onChange((val) => {
      uniforms.overlayOpacity.value = val;
    });
  gui
    .add(guiControls, "overlayScale", 0.0001, 1)
    .name("Overlay Scale")
    .step(0.0001)
    .onChange((val) => {
      uniforms.overlayScale.value = val;
    });
  gui
    .add(guiControls, "overlayTimeScale", 0.0, 1)
    .name("Overlay Time Scale")
    .step(0.0001)
    .onChange((val) => {
      uniforms.overlayTimeScale.value = val;
    });
  gui
    .addColor(guiControls, "color1")
    .name("Color 1")
    .onChange((val) => {
      uniforms.color1.value.set(val);
    });
  gui
    .addColor(guiControls, "color2")
    .name("Color 2")
    .onChange((val) => {
      uniforms.color2.value.set(val);
    });
  gui
    .addColor(guiControls, "color3")
    .name("Color 3")
    .onChange((val) => {
      uniforms.color3.value.set(val);
    });

  return guiControls;
}

function initThreeSetup() {
  // init camera
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;
  const scene = new THREE.Scene();

  ////////////////////////////////////////
  // Shader Code Here

  // Define our uniforms.
  const uniforms = {
    iResolution: {
      value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
    },
    iTime: { value: 0 },
    mixFactor: { value: 1.0 },
    noiseDensity: { value: 2.88 },
    heightIntensity: { value: 5.5 },
    sharpness: { value: 5.0 },
    brightness: { value: 1.2 },
    exposureCeiling: { value: 1.5 },
    animationMix: { value: 0.0 },
    animFrequency: { value: 0.25 },
    metallic: { value: 0.0 },
    specularExponent: { value: 16.0 },
    specularLower: { value: 0.2 },
    specularUpper: { value: 0.8 },
    overlayOpacity: { value: 0.12 },
    overlayScale: { value: 0.0088 },
    overlayTimeScale: { value: 0.0018 },
    uvScale: { value: new THREE.Vector2(1.0, 1.0) },
    targetAspect: { value: 21 / 9 },
    color1: { value: new THREE.Color(0xff0000) },
    color2: { value: new THREE.Color(0x00ff00) },
    color3: { value: new THREE.Color(0x0000ff) },
  };

  // Vertex shader: pass along UVs.
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  // Fragment shader: use our locked aspect ratio.
  const fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec3 iResolution;
    uniform float iTime;
    uniform float mixFactor;
    uniform float noiseDensity;
    uniform float heightIntensity;
    uniform float sharpness;
    uniform float brightness;
    uniform float exposureCeiling;
    uniform float animationMix;
    uniform float animFrequency;
    uniform float metallic;
    uniform float specularExponent;
    uniform float specularLower;
    uniform float specularUpper;
    uniform float overlayOpacity;
    uniform float overlayScale;
    uniform float overlayTimeScale;
    uniform float targetAspect;
    uniform vec2 uvScale;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;

    // Reusable random function.
    float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898,78.233))) * 43758.5453);
    }

    float worley(vec2 uv) {
      float m = 1.0;
      vec2 id = floor(uv);
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 neighbor = vec2(float(x), float(y));
          vec2 point = id + neighbor + vec2(rand(id + neighbor));
          float d = length(uv - point);
          m = min(m, d);
        }
      }
      return m;
    }

    float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u * u * (3.0 - 2.0 * u);
      return mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y);
    }

    vec2 primaryWarp(vec2 uv) {
      return uv + 0.1 * vec2(sin(iTime * animFrequency + uv.y * 10.0), cos(iTime * animFrequency + uv.x * 10.0));
    }

    vec2 secondaryWarp(vec2 uv) {
      return uv + 0.05 * vec2(sin(iTime * animFrequency * 1.5 + uv.y * 20.0), cos(iTime * animFrequency * 1.5 + uv.x * 20.0));
    }

    vec2 warpUV(vec2 uv) {
      vec2 p = primaryWarp(uv);
      vec2 s = secondaryWarp(uv);
      return mix(p, s, animationMix);
    }

    // Compute a UV coordinate that always spans a fixed target aspect ratio.
    vec2 getFixedUV() {
      float screenAspect = iResolution.x / iResolution.y;
      vec2 uv;
      if (screenAspect > targetAspect) {
        // Screen is wider than target: fill width, crop top/bottom.
        float newHeight = iResolution.x / targetAspect;
        uv = vec2(gl_FragCoord.x / iResolution.x, (gl_FragCoord.y - (iResolution.y - newHeight)*0.5) / newHeight);
      } else {
        // Screen is taller than target: fill height, crop sides.
        float newWidth = iResolution.y * targetAspect;
        uv = vec2((gl_FragCoord.x - (iResolution.x - newWidth)*0.5) / newWidth, gl_FragCoord.y / iResolution.y);
      }
      return uv;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      // Get our fixed UV coordinates.
      vec2 uv = getFixedUV();
      
      // Apply our warping.
      vec2 warpedUV = warpUV(uv);
      
      float hWorley = worley(warpedUV * noiseDensity);
      float hValue = noise(warpedUV * noiseDensity * 1.5);
      float h = mix(hWorley, hValue, mixFactor);
      
      float eps = 1.0 / iResolution.x;
      float h_dx = mix(
        worley((warpedUV + vec2(eps, 0.0)) * noiseDensity),
        noise((warpedUV + vec2(eps, 0.0)) * noiseDensity * 1.5),
        mixFactor
      );
      float h_dy = mix(
        worley((warpedUV + vec2(0.0, eps)) * noiseDensity),
        noise((warpedUV + vec2(0.0, eps)) * noiseDensity * 1.5),
        mixFactor
      );
      
      vec3 normal = normalize(vec3((h - h_dx) * heightIntensity, (h - h_dy) * heightIntensity, 1.0));
      vec3 lightDir = normalize(vec3(0.5, 0.5, 2.0));
      float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
      
      float t = sin(iTime * 0.5) * 0.5 + 0.5;
      float s = cos(iTime * 0.3) * 0.5 + 0.5;
      vec3 baseColor = mix(color1, color2, t);
      baseColor = mix(baseColor, color3, s);
      
      float ramped = pow(h, sharpness);
      float comp = ramped * heightIntensity;
      comp = comp / (1.0 + comp / exposureCeiling);
      
      vec3 diffuse = baseColor * comp * diff * brightness;
      float metalMask = smoothstep(specularLower, specularUpper, comp);
      
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfDir), 0.0), specularExponent);
      vec3 specular = metallic * spec * baseColor * metalMask;
      
      vec3 col = diffuse + specular;
      
      // Film grain overlay.
      float filmGrain = fract(sin(dot(gl_FragCoord.xy * overlayScale, vec2(12.9898, 78.233)) + iTime * overlayTimeScale) * 43758.5453);
      vec3 finalColor = mix(col, col + (filmGrain - 0.5), overlayOpacity);
      
      fragColor = vec4(finalColor, 1.0);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  // Create a full-screen quad.
  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.querySelector("#container");
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  const guiControls = setupGUI(camera, uniforms);

  // Update targetAspect and uvScale based on window dimensions.
  function updateAspectLock() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const actualAspect = width / height;
    if (width >= height) {
      // Desktop: lock to 21:9
      uniforms.targetAspect.value = 21 / 9;
    } else {
      // Mobile: lock to 9:21
      uniforms.targetAspect.value = 9 / 21;
    }
    // uvScale is not used directly since we compute UVs in shader via getFixedUV().
  }

  updateAspectLock();

  function animation() {
    uniforms.iTime.value = performance.now() / 1000;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animation);

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
    updateAspectLock();
  }

  window.addEventListener("resize", onWindowResize, false);
}

export { initThreeSetup };
