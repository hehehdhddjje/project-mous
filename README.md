# project-mous

**project-mous** est un prototype de reconstruction urbaine et d’itinéraire 3D dans le navigateur. Il affiche une avenue procédurale avec trois bâtiments différenciés, une route de navigation cyan, un repère de destination, des véhicules, des arbres, des lampadaires et un HUD de télémétrie au style terminal.

## Lancer le prototype

```bash
pnpm install
pnpm run dev
```

La scène se manipule à la souris ou au doigt : glisser pour orbiter, faire défiler pour zoomer et utiliser le bouton `[ recentrer ]` pour retrouver le point de vue initial. Le bouton `[ aide ]` détaille les contrôles et le périmètre du prototype.

## Périmètre actuel

Les bâtiments sont des volumes procéduraux détaillés dans `src/city-scene.js`. Cette version ne reproduit pas encore un quartier réel à partir de données cartographiques ou photogrammétriques ; elle établit le langage visuel, la caméra, le tracé d’itinéraire et les modules nécessaires à une future reconstruction plus fidèle.

## Vérifications

```bash
npm test
npm run check
npm run build
```

## Suite logique

Pour obtenir une reconstruction réaliste d’un lieu précis, il faudra ajouter une source de données géographiques autorisée, un pipeline de géométrie/photogrammétrie et des textures ou modèles 3D compatibles. Les clés et données privées ne doivent pas être embarquées dans l’application côté navigateur.
