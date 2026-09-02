import "./style.css";
import { buildGuide } from "./coach.js";

const app = document.querySelector("#app");
const starterIdea = "Je veux créer un site pour présenter mes services";

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  })[character]);
}

function renderGuide(guide) {
  return `
    <div class="coach-heading">
      <span class="status-dot" aria-hidden="true"></span>
      <p>Votre coach a préparé un point de départ</p>
    </div>
    <h2>${guide.title}</h2>
    <p class="coach-intro">Pour <strong>« ${escapeHTML(guide.idea)} »</strong>, commencez par ${guide.language}. ${guide.why}</p>
    <ol class="steps">
      ${guide.steps.map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${step}</p></li>`).join("")}
    </ol>
    <section class="code-card" aria-label="Exemple de code de départ">
      <div class="code-card__bar"><span>exemple-départ</span><button class="copy-code" type="button">Copier le code</button></div>
      <pre><code>${escapeHTML(guide.snippet)}</code></pre>
    </section>
    <button class="export-button" id="export-prompt" type="button">Copier une demande détaillée pour une IA <span aria-hidden="true">↗</span></button>
  `;
}

function renderApp() {
  const guide = buildGuide(starterIdea);
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Code Sans Stress, accueil"><span class="brand-mark">&lt;/&gt;</span>code <i>sans stress</i></a>
      <nav aria-label="Navigation principale">
        <a href="#atelier">L’atelier</a>
        <a href="#demarrer">Démarrer</a>
        <a href="#verite">Ce que fait l’assistant</a>
      </nav>
      <a class="header-link" href="#atelier">Essayer maintenant <span aria-hidden="true">→</span></a>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero-intro reveal">
          <p class="eyebrow"><span></span> POUR LES CURIEUX, PAS POUR LES EXPERTS</p>
          <h1>Vous avez l’idée.<br /><em>On trouve le premier pas.</em></h1>
          <p class="hero-text">Un atelier simple pour passer d’une phrase à un plan clair, du code de départ et les mots justes pour continuer à apprendre.</p>
          <div class="hero-meta">
            <div><b>01</b><span>Une idée<br />à la fois</span></div>
            <div><b>02</b><span>Des explications<br />sans jargon</span></div>
            <div><b>03</b><span>Un premier test<br />tout de suite</span></div>
          </div>
        </div>
        <aside class="hero-note reveal">
          <p class="note-number">NOTE / 01</p>
          <p>« Je ne sais pas coder » n’est pas un blocage. C’est simplement le point de départ.</p>
          <span>— votre nouveau réflexe</span>
        </aside>
      </section>

      <section class="studio" id="atelier" aria-labelledby="atelier-title">
        <div class="studio-top">
          <div>
            <p class="eyebrow"><span></span> L’ATELIER</p>
            <h2 id="atelier-title">Décrivez votre idée<br />comme vous la diriez à un ami.</h2>
          </div>
          <p>Ce guide fonctionne dans votre navigateur. Il vous propose une direction concrète et une demande prête à approfondir avec une IA connectée.</p>
        </div>
        <div class="workbench">
          <form class="idea-form" id="idea-form">
            <label for="idea">Votre point de départ</label>
            <textarea id="idea" name="idea" rows="7" maxlength="360" placeholder="Ex. Je voudrais un site pour proposer mes gâteaux…">${starterIdea}</textarea>
            <div class="idea-shortcuts" aria-label="Exemples d’idées">
              <button type="button" data-idea="Je veux créer un site pour présenter mes services">Créer un site</button>
              <button type="button" data-idea="J’ai une erreur dans mon code JavaScript">Corriger une erreur</button>
              <button type="button" data-idea="Je veux automatiser un fichier Excel avec Python">Découvrir Python</button>
            </div>
            <button class="primary-button" type="submit">Me donner mon premier plan <span aria-hidden="true">→</span></button>
            <p class="privacy-note">Vos phrases restent dans cette page : aucune donnée n’est envoyée par cet atelier.</p>
          </form>
          <section class="coach-panel" id="coach-panel" aria-live="polite">${renderGuide(guide)}</section>
        </div>
      </section>

      <section class="paths" id="demarrer" aria-labelledby="paths-title">
        <div class="section-label"><span>CHOISISSEZ VOTRE PORTE D’ENTRÉE</span><span>03 PARCOURS</span></div>
        <h2 id="paths-title">Pas besoin de tout apprendre.<br />Choisissez juste <em>la bonne prochaine chose.</em></h2>
        <div class="path-grid">
          <article class="path-card path-card--coral"><p>01 / CONSTRUIRE</p><h3>Une idée<br />devient une page.</h3><span>HTML · CSS · JS</span></article>
          <article class="path-card path-card--ink"><p>02 / COMPRENDRE</p><h3>Une erreur<br />devient un indice.</h3><span>Débogage · logique</span></article>
          <article class="path-card path-card--lime"><p>03 / AUTOMATISER</p><h3>Une tâche répétée<br />devient un script.</h3><span>Python · données</span></article>
        </div>
      </section>

      <section class="truth" id="verite">
        <div class="truth-marker">VRAI<br />/ FAUX</div>
        <div>
          <p class="eyebrow"><span></span> EN TOUTE TRANSPARENCE</p>
          <h2>Un bon démarrage, pas une promesse magique.</h2>
          <p>Cette première version utilise des règles locales pour transformer votre texte en un plan pédagogique. Elle <strong>n’entraîne pas de modèle de machine learning</strong> et ne remplace pas un service d’IA connecté.</p>
          <p>Pour créer un véritable assistant qui répond librement, il faudra relier cette interface à un serveur sécurisé et à un modèle d’IA. La clé d’accès ne doit jamais être placée dans une page GitHub Pages.</p>
        </div>
      </section>
    </main>
    <footer><a class="brand" href="#top"><span class="brand-mark">&lt;/&gt;</span>code <i>sans stress</i></a><p>Apprendre commence par une idée formulée simplement.</p><a href="#atelier">Retourner à l’atelier ↑</a></footer>
  `;

  attachInteractions(guide);
}

function attachInteractions(initialGuide) {
  const form = document.querySelector("#idea-form");
  const input = document.querySelector("#idea");
  const panel = document.querySelector("#coach-panel");
  let currentGuide = initialGuide;

  const updateGuide = () => {
    currentGuide = buildGuide(input.value);
    panel.innerHTML = renderGuide(currentGuide);
    attachCopyHandlers();
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateGuide();
  });

  document.querySelectorAll("[data-idea]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.idea;
      input.focus();
    });
  });

  function copyText(text, button, successLabel) {
    navigator.clipboard.writeText(text).then(() => {
      const original = button.textContent;
      button.textContent = successLabel;
      setTimeout(() => { button.textContent = original; }, 1800);
    }).catch(() => {
      button.textContent = "Copiez manuellement";
    });
  }

  function attachCopyHandlers() {
    panel.querySelector(".copy-code")?.addEventListener("click", (event) => {
      copyText(currentGuide.snippet, event.currentTarget, "Code copié !");
    });
    panel.querySelector("#export-prompt")?.addEventListener("click", (event) => {
      copyText(currentGuide.prompt, event.currentTarget, "Demande copiée !");
    });
  }

  attachCopyHandlers();
}

renderApp();
