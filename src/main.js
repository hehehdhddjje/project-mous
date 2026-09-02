import "./style.css";
import { createCityScene } from "./city-scene.js";

const app = document.querySelector("#app");
const routeSteps = [
  ["01", "Départ", "Parvis central"],
  ["02", "Continuer", "Avenue des Arts"],
  ["03", "Arrivée", "Hôtel de ville"]
];

app.innerHTML = `
  <div class="terminal-app">
    <header class="terminal-header">
      <a class="terminal-brand" href="#scene"><span class="prompt-symbol">&gt;_</span><span><strong>project-mous</strong><small>urban route simulator / v0.1</small></span></a>
      <div class="header-status"><span class="pulse"></span> SCÈNE ACTIVE <span class="divider">/</span> 14:32:08</div>
      <div class="header-actions"><button id="focus-route" class="terminal-button">[ recentrer ]</button><button id="toggle-help" class="terminal-button">[ aide ]</button></div>
    </header>

    <main id="scene" class="scene-shell">
      <canvas id="city-canvas" aria-label="Prototype 3D d’itinéraire dans une ville reconstruite"></canvas>
      <div class="scanlines" aria-hidden="true"></div>
      <section class="hud hud-left">
        <div class="hud-title"><span class="hud-tag">MAP / 3D</span><span class="hud-live">● LIVE</span></div>
        <h1>Itinéraire<br /><span>Parvis → Hôtel de ville</span></h1>
        <div class="coordinates">48°51'24.2" N &nbsp; / &nbsp; 2°21'07.8" E</div>
        <div class="route-progress"><div class="progress-bar"><span></span></div><div class="progress-label"><span>0.0 km</span><span>0.8 km</span></div></div>
        <p class="hud-caption">Prototype de reconstruction urbaine procédurale. Les bâtiments sont générés en temps réel.</p>
      </section>
      <section class="hud hud-right">
        <div class="mini-map"><div class="mini-road road-a"></div><div class="mini-road road-b"></div><div class="mini-route"></div><i class="mini-dot mini-dot-a"></i><i class="mini-dot mini-dot-b"></i><span class="mini-label">DEST</span></div>
        <div class="telemetry"><div><span>ALT</span><b>04.2 m</b></div><div><span>FOV</span><b>52.0°</b></div><div><span>BUILDINGS</span><b>03 / 03</b></div></div>
      </section>
      <section class="hud hud-bottom-left">
        <span class="control-key">DRAG</span> ORBIT &nbsp;&nbsp; <span class="control-key">SCROLL</span> ZOOM &nbsp;&nbsp; <span class="control-key">TOUCH</span> NAVIGATE
      </section>
      <section class="destination-card"><span class="card-kicker">NEXT WAYPOINT</span><strong>Hôtel de ville</strong><span class="card-distance">800 m &nbsp; / &nbsp; 08 min</span></section>
    </main>

    <aside class="terminal-drawer" id="help-drawer" hidden>
      <div><span class="prompt-symbol">&gt;_</span> project-mous --help</div>
      <p>Orbite autour de la ville avec la souris ou le doigt. Utilisez « recentrer » pour retrouver la perspective de départ. Cette scène est un prototype procédural : les bâtiments sont des volumes détaillés générés par le moteur.</p>
    </aside>
    <footer class="terminal-footer"><span>project-mous / <b>urban reconstruction lab</b></span><span>babylon scene: <b>ready</b> &nbsp; | &nbsp; route: <b>locked</b></span><span>prototype 001</span></footer>
  </div>
`;

let city;
const canvas = document.querySelector("#city-canvas");
city = createCityScene(canvas);

document.querySelector("#focus-route").addEventListener("click", () => {
  city.camera.alpha = -Math.PI / 2.3;
  city.camera.beta = 1.03;
  city.camera.radius = 34;
  city.camera.target.set(0, 4, 0);
});

document.querySelector("#toggle-help").addEventListener("click", () => {
  const drawer = document.querySelector("#help-drawer");
  drawer.hidden = !drawer.hidden;
});

window.addEventListener("beforeunload", () => city?.dispose());
