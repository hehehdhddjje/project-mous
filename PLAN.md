# project-mous — Prototype d’itinéraire 3D

## Objectif
Construire une première scène urbaine interactive dans laquelle une route lumineuse guide la caméra entre plusieurs bâtiments procéduraux distincts.

## Tranches de risque

1. Initialiser Babylon.js une seule fois et libérer correctement le moteur au démontage.
2. Générer une ville crédible avec bâtiments différenciés, fenêtres, balcons, rues, trottoirs et végétation.
3. Tracer un itinéraire lisible au sol et afficher les indications dans une interface terminal.
4. Maintenir une caméra contrôlable et un rendu utilisable sur écran mobile.

## Critères de vérification

La capture doit montrer une avenue complète, au moins trois bâtiments visuellement distincts, un itinéraire cyan continu, un repère de destination, le panneau terminal et la mini-carte. Les contrôles doivent permettre de tourner autour de la scène et de modifier l’étape active.

## Hors périmètre de ce prototype

Les données cartographiques réelles, les adresses exactes, la géolocalisation, le recalcul GPS et les modèles photogrammétriques réels seront ajoutés dans une version ultérieure. La scène présente ici une reconstruction procédurale stylisée-réaliste, pas une copie certifiée d’un quartier réel.
