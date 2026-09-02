const profiles = [
  {
    id: "site",
    triggers: ["site", "portfolio", "blog", "page", "restaurant", "vitrine", "landing"],
    label: "Créer un petit site web",
    language: "HTML, CSS et JavaScript",
    why: "C’est le chemin le plus visuel : vous voyez immédiatement le résultat dans votre navigateur.",
    steps: [
      "Définir une page et son objectif en une phrase.",
      "Écrire la structure avec HTML.",
      "Ajouter les couleurs et les espacements avec CSS.",
      "Ajouter une interaction utile avec JavaScript."
    ],
    snippet: `<main class="carte">\n  <h1>Bonjour, je suis Sam</h1>\n  <p>Bienvenue sur mon premier site.</p>\n  <button id="bonjour">Dire bonjour</button>\n</main>`
  },
  {
    id: "bug",
    triggers: ["bug", "erreur", "marche pas", "fonctionne pas", "corriger", "debug"],
    label: "Comprendre puis corriger un bug",
    language: "Une méthode de débogage",
    why: "Avant de changer du code, il faut reproduire le problème et lire le message d’erreur calmement.",
    steps: [
      "Copier le message d’erreur exact.",
      "Isoler la plus petite partie de code qui pose problème.",
      "Vérifier les valeurs avec console.log().",
      "Modifier une seule hypothèse, puis tester de nouveau."
    ],
    snippet: `function additionner(a, b) {\n  console.log({ a, b });\n  return Number(a) + Number(b);\n}\n\nconsole.log(additionner("2", "3")); // 5`
  },
  {
    id: "python",
    triggers: ["python", "donnée", "data", "fichier", "automatis", "excel", "calcul"],
    label: "Automatiser une tâche avec Python",
    language: "Python",
    why: "Python est lisible et très pratique pour travailler avec des fichiers, des calculs et des petites automatisations.",
    steps: [
      "Décrire ce qui entre et ce qui doit sortir.",
      "Tester d’abord avec un seul exemple.",
      "Écrire une fonction courte et nommée clairement.",
      "Ajouter une vérification avant de traiter tous les fichiers."
    ],
    snippet: `def saluer(prenom):\n    return f"Bonjour {prenom} !"\n\nmessage = saluer("Lina")\nprint(message)`
  },
  {
    id: "app",
    triggers: ["application", "app", "mobile", "outil", "plateforme", "ia", "intelligence"],
    label: "Construire un premier prototype",
    language: "Une interface web simple",
    why: "Un prototype réduit permet de valider une idée avant de créer une application complète.",
    steps: [
      "Choisir une seule action importante pour l’utilisateur.",
      "Dessiner l’écran sur papier en 3 minutes.",
      "Construire l’interface avant d’ajouter les fonctions avancées.",
      "Faire tester le prototype à une personne, puis améliorer un point."
    ],
    snippet: `const tache = {\n  titre: "Réserver un cours",\n  terminee: false\n};\n\nif (!tache.terminee) {\n  console.log("À faire :", tache.titre);\n}`
  }
];

export const defaultProfile = {
  id: "starter",
  label: "Transformer une idée en premier pas",
  language: "HTML, CSS et JavaScript",
  why: "Pour démarrer sans se perdre, transformons votre idée en une petite version testable.",
  steps: [
    "Décrire le problème en une phrase simple.",
    "Choisir une seule fonctionnalité pour la première version.",
    "Créer une maquette très simple.",
    "Tester, comprendre et améliorer petit à petit."
  ],
  snippet: `const premiereEtape = "Décrire une idée simple";\nconsole.log(premiereEtape);`
};

export function findProfile(idea = "") {
  const input = idea.toLowerCase();
  return profiles.find((profile) => profile.triggers.some((word) => input.includes(word))) || defaultProfile;
}

export function buildGuide(idea = "") {
  const cleanIdea = idea.trim() || "mon idée";
  const profile = findProfile(cleanIdea);
  const prompt = `Tu es un professeur de programmation patient. Je débute totalement. Aide-moi à réaliser : "${cleanIdea}". Propose une première version très petite avec ${profile.language}, explique chaque étape sans jargon et donne du code commenté.`;

  return {
    ...profile,
    idea: cleanIdea,
    prompt,
    title: `Plan de départ : ${profile.label}`
  };
}
