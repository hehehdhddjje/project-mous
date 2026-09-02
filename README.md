# Code Sans Stress

**Code Sans Stress** est un atelier web en français destiné aux personnes qui débutent. Une idée formulée en langage simple est orientée vers un petit plan, un exemple de code et une demande détaillée à copier dans un assistant IA.

## Ce que cette version fait

L’atelier fonctionne entièrement dans le navigateur, sans collecte ni envoi de la phrase saisie. Il reconnaît quelques intentions courantes : créer un site, diagnostiquer une erreur, automatiser une tâche avec Python ou construire un prototype. Les recommandations sont volontairement locales et déterministes afin de rendre le site déployable sur GitHub Pages sans exposer de clé secrète.

> Cette version ne prétend pas entraîner un modèle de machine learning et ne fournit pas de réponse générative libre. Un modèle réellement entraîné ou un assistant conversationnel nécessite des données légitimes, une évaluation, puis un serveur sécurisé pour appeler le modèle sans publier de clé d’accès dans le navigateur.

## Lancer le projet

```bash
npm install
npm run dev
```

Les validations disponibles sont `npm test`, `npm run check` et `npm run build`.

## GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` produit automatiquement le site à chaque envoi sur la branche `main`. Après avoir créé le dépôt, activez **Settings → Pages → Build and deployment → GitHub Actions** si GitHub ne sélectionne pas automatiquement cette source.

## Transformer l’atelier en IA conversationnelle

GitHub Pages ne peut pas garder un secret. Pour passer à un véritable assistant, conservez cette interface statique et créez un petit service côté serveur qui reçoit la demande, applique des règles de sécurité, puis appelle le modèle choisi. Ajoutez ensuite une variable d’environnement côté serveur : ne placez jamais une clé d’API dans `src/` ni dans les secrets GitHub destinés au navigateur.
