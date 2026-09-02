# Assets

**Art direction:** terminal urbain sombre, reconstruction procédurale réaliste, architecture européenne contemporaine, matériaux pierre/verre/brique, signal de navigation cyan électrique, interface de télémétrie monospace.

## Référence de direction

La référence générée pour la scène est disponible via `/manus-storage/project-mous-city-reference_a0d25b09.png`. Elle sert à cadrer la perspective, la densité urbaine, les couleurs et la hiérarchie route/HUD.

## Assets implémentés

Les bâtiments, fenêtres, balcons, lampadaires, arbres, voitures, chaussée, passage piéton et route lumineuse sont générés par maillage procédural dans `src/city-scene.js`. Aucun modèle GLB n’est requis dans ce prototype. Les matériaux sont créés en temps réel avec une palette contrôlée afin de conserver un chargement léger et une scène modifiable.
