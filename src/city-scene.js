import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import "@babylonjs/core/Materials/standardMaterial";

const palette = {
  asphalt: new Color3(0.045, 0.06, 0.08),
  stone: new Color3(0.52, 0.48, 0.42),
  stoneLight: new Color3(0.78, 0.7, 0.58),
  concrete: new Color3(0.34, 0.39, 0.43),
  glass: new Color3(0.08, 0.25, 0.34),
  brick: new Color3(0.43, 0.15, 0.1),
  cyan: new Color3(0.05, 0.9, 0.95),
  window: new Color3(0.28, 0.62, 0.72),
  foliage: new Color3(0.12, 0.3, 0.18),
};

function material(scene, name, color, emissive = 0, textureUrl = null) {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = new Color3(0.16, 0.18, 0.2);
  if (emissive) mat.emissiveColor = color.scale(emissive);
  if (textureUrl) {
    const texture = new Texture(textureUrl, scene);
    texture.uScale = 1.8;
    texture.vScale = 2.6;
    mat.diffuseTexture = texture;
  }
  return mat;
}

function box(scene, name, options, mat, position) {
  const mesh = MeshBuilder.CreateBox(name, options, scene);
  mesh.position = position;
  mesh.material = mat;
  return mesh;
}

function addWindows(scene, parent, width, height, floors, cols, facadeX, side = "front", glassMat) {
  const windowW = Math.min(0.9, width / (cols * 1.8));
  const windowH = 0.9;
  for (let floor = 0; floor < floors; floor += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = -width / 2 + (col + 0.5) * (width / cols);
      const y = 1.4 + floor * 2.15;
      const pos = side === "front" ? new Vector3(x, y, facadeX) : new Vector3(facadeX, y, x);
      const dims = side === "front" ? { width: windowW, height: windowH, depth: 0.05 } : { width: 0.05, height: windowH, depth: windowW };
      const window = box(scene, "window", dims, glassMat, pos);
      window.parent = parent;
    }
  }
}

function addBalconies(scene, parent, width, floors, z, metalMat) {
  for (let floor = 1; floor < floors; floor += 2) {
    const balcony = box(scene, "balcony", { width: width * 0.28, height: 0.08, depth: 0.85 }, metalMat, new Vector3(0, 1.25 + floor * 2.15, z));
    balcony.parent = parent;
    const railing = box(scene, "railing", { width: width * 0.28, height: 0.42, depth: 0.05 }, metalMat, new Vector3(0, 1.48 + floor * 2.15, z + 0.39));
    railing.parent = parent;
  }
}

function makeBuilding(scene, config, mats) {
  const root = new MeshBuilder.CreateBox(config.name + "-root", { size: 0.01 }, scene);
  root.position = new Vector3(config.x, 0, config.z);
  const body = box(scene, config.name, { width: config.width, height: config.height, depth: config.depth }, config.body, new Vector3(config.x, config.height / 2, config.z));
  body.parent = root;
  const roof = box(scene, config.name + "-roof", { width: config.width + 0.28, height: 0.16, depth: config.depth + 0.28 }, config.roof || config.body, new Vector3(config.x, config.height + 0.08, config.z));
  roof.parent = root;
  addWindows(scene, root, config.width, config.height, config.floors, config.cols, config.z - config.depth / 2 - 0.03, "front", config.glass || mats.window);
  addWindows(scene, root, config.depth, config.height, config.floors, Math.max(2, Math.floor(config.depth / 2.1)), config.x - config.width / 2 - 0.03, "side", config.glass || mats.window);
  if (config.balconies) addBalconies(scene, root, config.width, config.floors, config.z - config.depth / 2 - 0.45, mats.metal);
  if (config.clock) {
    const tower = box(scene, config.name + "-tower", { width: 3.2, height: 6.5, depth: 3.2 }, config.body, new Vector3(config.x, config.height + 3.25, config.z));
    tower.parent = root;
    const clock = MeshBuilder.CreateCylinder(config.name + "-clock", { diameter: 1.8, height: 0.12, tessellation: 32 }, scene);
    clock.rotation.x = Math.PI / 2; clock.position = new Vector3(config.x, config.height + 3.65, config.z - 1.62); clock.material = mats.clock; clock.parent = root;
    const spire = MeshBuilder.CreateCylinder(config.name + "-spire", { diameterTop: 0, diameterBottom: 1.5, height: 2.2, tessellation: 4 }, scene);
    spire.position = new Vector3(config.x, config.height + 7.6, config.z); spire.material = config.roof || config.body; spire.parent = root;
  }
  return root;
}

function addStreetLamp(scene, x, z, mats, rotation = 0) {
  const pole = MeshBuilder.CreateCylinder("lamp-pole", { diameter: 0.07, height: 3.5, tessellation: 10 }, scene);
  pole.position = new Vector3(x, 1.75, z); pole.rotation.y = rotation; pole.material = mats.metal;
  const arm = box(scene, "lamp-arm", { width: 0.8, height: 0.07, depth: 0.07 }, mats.metal, new Vector3(x + 0.35, 3.42, z));
  const light = MeshBuilder.CreateSphere("lamp-light", { diameter: 0.18, segments: 10 }, scene);
  light.position = new Vector3(x + 0.7, 3.34, z); light.material = mats.warm;
}

function addTree(scene, x, z, mats, scale = 1) {
  const trunk = MeshBuilder.CreateCylinder("tree-trunk", { diameter: 0.23 * scale, height: 1.9 * scale, tessellation: 9 }, scene);
  trunk.position = new Vector3(x, 0.95 * scale, z); trunk.material = mats.trunk;
  const crown = MeshBuilder.CreateSphere("tree-crown", { diameter: 2.1 * scale, segments: 10 }, scene);
  crown.position = new Vector3(x, 2.35 * scale, z); crown.scaling.y = 1.2; crown.material = mats.foliage;
}

function makeRoute(scene, mats) {
  const points = [new Vector3(-1.8, 0.045, 24), new Vector3(-1.8, 0.045, 14), new Vector3(-1.8, 0.045, 4), new Vector3(2.7, 0.045, -3), new Vector3(2.7, 0.045, -16)];
  const route = MeshBuilder.CreateTube("navigation-route", { path: points, radius: 0.1, tessellation: 10, cap: 2 }, scene);
  route.material = mats.route;
  const arrows = [];
  points.slice(0, -1).forEach((point, index) => {
    const arrow = MeshBuilder.CreateCylinder("route-marker", { diameter: 0.6, height: 0.05, tessellation: 4 }, scene);
    arrow.position = point.add(new Vector3(0, 0.06, 0)); arrow.rotation.x = Math.PI / 2; arrow.rotation.y = index === 2 ? Math.PI / 4 : 0; arrow.material = mats.route;
    arrows.push(arrow);
  });
  const target = MeshBuilder.CreateTorus("destination-ring", { diameter: 2.3, thickness: 0.11, tessellation: 32 }, scene);
  target.position = new Vector3(2.7, 0.2, -16); target.rotation.x = Math.PI / 2; target.material = mats.route;
  return { points, target, arrows };
}

export function createCityScene(canvas, onReady = () => {}) {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  const scene = new Scene(engine);
  scene.clearColor = new Color3(0.045, 0.065, 0.1).toColor4(1);
  const camera = new ArcRotateCamera("city-camera", -Math.PI / 2.3, 1.03, 34, new Vector3(0, 4, 0), scene);
  camera.lowerRadiusLimit = 18; camera.upperRadiusLimit = 58; camera.wheelPrecision = 45; camera.panningSensibility = 0;
  if (window.innerWidth < 700) { camera.radius = 45; camera.beta = 1.18; camera.target = new Vector3(0, 3, 1); }
  camera.attachControl(canvas, true);
  const hemi = new HemisphericLight("sky-light", new Vector3(0, 1, 0), scene); hemi.intensity = 0.7; hemi.diffuse = new Color3(0.65, 0.76, 0.92); hemi.groundColor = new Color3(0.12, 0.14, 0.18);
  const sun = new DirectionalLight("late-sun", new Vector3(-0.5, -1, 0.4), scene); sun.position = new Vector3(20, 35, 20); sun.intensity = 1.35; sun.diffuse = new Color3(1, 0.75, 0.56);
  const mats = {
    asphalt: material(scene, "asphalt", palette.asphalt), stone: material(scene, "stone", palette.stone), stoneLight: material(scene, "stone-light", palette.stoneLight), concrete: material(scene, "concrete", palette.concrete), glass: material(scene, "glass", palette.glass), brick: material(scene, "brick", palette.brick), window: material(scene, "window", palette.window, 0.4), metal: material(scene, "metal", new Color3(0.2, 0.24, 0.28)), clock: material(scene, "clock", new Color3(0.02, 0.025, 0.03)), warm: material(scene, "warm", new Color3(1, 0.55, 0.15), 1.4), route: material(scene, "route", palette.cyan, 1.8), foliage: material(scene, "foliage", palette.foliage), trunk: material(scene, "trunk", new Color3(0.25, 0.13, 0.06)), curb: material(scene, "curb", new Color3(0.48, 0.5, 0.48)), white: material(scene, "road-mark", new Color3(0.85, 0.86, 0.78)), red: material(scene, "car-red", new Color3(0.55, 0.08, 0.06)), blue: material(scene, "car-blue", new Color3(0.04, 0.18, 0.32))
  };
  const ground = box(scene, "city-ground", { width: 90, height: 0.3, depth: 90 }, mats.concrete, new Vector3(0, -0.18, 0));
  const road = box(scene, "avenue", { width: 11, height: 0.12, depth: 76 }, mats.asphalt, new Vector3(0, 0, 4));
  const crossing = box(scene, "crossing", { width: 11, height: 0.025, depth: 3.8 }, mats.white, new Vector3(0, 0.08, 8));
  crossing.scaling.x = 0.96;
  for (let i = -4; i <= 4; i += 2) box(scene, "crosswalk-stripe", { width: 0.55, height: 0.03, depth: 3.2 }, mats.asphalt, new Vector3(i, 0.105, 8));
  box(scene, "sidewalk-left", { width: 4, height: 0.28, depth: 76 }, mats.curb, new Vector3(-7.4, 0.02, 4));
  box(scene, "sidewalk-right", { width: 4, height: 0.28, depth: 76 }, mats.curb, new Vector3(7.4, 0.02, 4));
  mats.stoneFacade = material(scene, "stone-facade", palette.stoneLight, 0, "/manus-storage/project-mous-stone-texture_92d79cd6.png");
  mats.glassFacade = material(scene, "glass-facade", palette.glass, 0, "/manus-storage/project-mous-glass-texture_6d97c2bc.png");
  mats.brickFacade = material(scene, "brick-facade", palette.brick, 0, "/manus-storage/project-mous-brick-texture_820d7f81.png");
  makeBuilding(scene, { name: "stone-apartments", x: -10.1, z: 7, width: 5.5, depth: 9, height: 17, floors: 7, cols: 3, body: mats.stoneFacade, roof: mats.stone, balconies: true }, mats);
  makeBuilding(scene, { name: "glass-office", x: 10.1, z: 9, width: 5.2, depth: 11, height: 23, floors: 10, cols: 3, body: mats.glassFacade, glass: mats.glass, roof: mats.metal }, mats);
  makeBuilding(scene, { name: "brick-civic-hall", x: 2.8, z: -20, width: 10, depth: 6, height: 10, floors: 4, cols: 5, body: mats.brickFacade, roof: mats.stone, clock: true }, mats);
  const route = makeRoute(scene, mats);
  [[-8, 17], [8, 19], [-8, -9], [8, -11], [-8, 31], [8, 33]].forEach(([x, z]) => addStreetLamp(scene, x, z, mats));
  [[-8.4, 23, 1], [8.4, 27, 1.15], [-8.5, -1, 0.8], [8.5, -4, 0.9], [-8.4, -17, 1]].forEach(([x, z, s]) => addTree(scene, x, z, mats, s));
  [[-4.5, 2, mats.red], [4.4, 15, mats.blue], [-4.4, -8, mats.blue]].forEach(([x, z, carMat]) => { const car = box(scene, "parked-car", { width: 1.55, height: 0.65, depth: 3 }, carMat, new Vector3(x, 0.48, z)); const roof = box(scene, "car-roof", { width: 1.18, height: 0.42, depth: 1.5 }, carMat, new Vector3(x, 0.94, z)); roof.parent = car; });
  const glow = new GlowLayer("route-glow", scene); glow.intensity = 0.6;
  engine.runRenderLoop(() => scene.render());
  const resize = () => engine.resize(); window.addEventListener("resize", resize);
  onReady({ camera, route, scene });
  return { engine, scene, camera, route, dispose: () => { window.removeEventListener("resize", resize); camera.detachControl(); engine.stopRenderLoop(); scene.dispose(); engine.dispose(); } };
}
