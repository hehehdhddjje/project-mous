# Mémoire du prototype

La première tranche de project-mous est opérationnelle avec Babylon.js, une caméra orbitale, un itinéraire cyan et trois volumes urbains distincts : appartements en pierre avec balcons, tour de bureaux vitrée et bâtiment civique en brique avec tour-horloge. Les façades utilisent maintenant trois textures générées et persistantes via les URLs `/manus-storage/` du projet.

La scène reste procédurale afin de garder le prototype léger et modifiable. Elle ne prétend pas reproduire une adresse réelle avec exactitude : la photogrammétrie, les données OpenStreetMap, le recalcul de parcours et la géolocalisation sont des étapes futures. La taille du bundle Babylon est élevée et devra être réduite par découpage dynamique si le prototype devient une application publique plus ambitieuse.

La vérification desktop confirme que la route, les bâtiments, le mini-plan et le HUD terminal sont visibles. La prochaine tranche recommandée est d’ajouter des données de destination réelles derrière une API serveur, puis de remplacer progressivement les façades procédurales par des modèles 3D sous licence.
