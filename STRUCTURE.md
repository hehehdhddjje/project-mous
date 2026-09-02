# Structure technique

`src/main.js` reste le cadre de l’application et de l’interface terminal. `src/city-scene.js` porte la scène Babylon.js, la caméra, les matériaux et les bâtiments procéduraux sans dépendance à l’interface. `src/style.css` porte la mise en page terminal et les panneaux HUD.

## Modules de la scène

- `createCityScene(canvas, mount)` : crée le moteur et le rendu.
- `makeBuilding(...)` : génère un bâtiment avec façade, fenêtres, corniches et accessoires.
- `makeRoute(...)` : génère la ligne d’itinéraire et les marqueurs.
- `setCameraTarget(...)` : recentre la caméra sur l’étape courante.

## Interactions

Souris ou doigt pour orbiter la caméra, molette pour zoomer, boutons de l’interface pour changer d’étape et bouton de recentrage pour revenir à la vue de départ.
