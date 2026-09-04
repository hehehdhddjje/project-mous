import "./style.css";

const app = document.querySelector("#app");

const icons = {
  scan: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.3"/><path d="M5.5 19c.7-3.1 2.8-4.7 6.5-4.7s5.8 1.6 6.5 4.7"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13.2 2.8-7 10.1h5.3l-.8 8.3 7.1-10.8h-5.1l.5-7.6Z"/></svg>`,
  flash: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 2.8 6.8 12h4.7l-.6 8.8L17.2 11h-4.7l.7-8.2Z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`,
  back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7M8 12h11"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>`,
  info: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 10.8v5M12 7.5h.01"/></svg>`,
  share: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5.8" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="18.2" r="2.2"/><path d="m8 11 7.8-4.1M8 13l7.8 4.1"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`
};

const state = {
  view: "scanner",
  category: "Objet",
  scanning: false,
  scanned: false,
  progress: 0,
  flash: false
};

function render() {
  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="#scanner" aria-label="mous, accueil">
          <span class="brand-mark">m<span>·</span></span>
          <span class="brand-word">mous</span>
        </a>
        <div class="topbar-context"><span class="status-dot"></span><span>Paris, France</span><span class="context-separator">·</span><span>14:32</span></div>
        <button class="avatar-button" aria-label="Ouvrir le profil">AC</button>
      </header>

      <main class="main-content">
        ${state.view === "scanner" ? renderScanner() : renderHistory()}
      </main>

      <nav class="bottom-nav" aria-label="Navigation principale">
        <button class="nav-item ${state.view === "scanner" ? "is-active" : ""}" data-view="scanner">${icons.scan}<span>Scanner</span></button>
        <button class="nav-item ${state.view === "history" ? "is-active" : ""}" data-view="history">${icons.clock}<span>Historique</span></button>
        <button class="nav-item" data-view="profile">${icons.user}<span>Profil</span></button>
      </nav>
    </div>
  `;
  bindEvents();
}

function renderScanner() {
  return `
    <section class="intro-block">
      <div class="eyebrow"><span class="eyebrow-line"></span>SCAN INTELLIGENT <span class="eyebrow-line"></span></div>
      <h1>Comprendre.<br /><em>Agir.</em> Plus vite.</h1>
      <p class="intro-copy">Pointez votre caméra. Mous identifie ce qui vous entoure et vous donne la prochaine bonne action.</p>
    </section>

    <section class="scanner-card ${state.scanning ? "is-scanning" : ""} ${state.scanned ? "is-scanned" : ""}" aria-label="Zone de scan">
      <div class="scanner-topline"><span class="live-pill"><span class="live-dot"></span>${state.scanning ? "ANALYSE EN COURS" : state.scanned ? "SCAN TERMINÉ" : "CAMÉRA ACTIVE"}</span><button class="round-control ${state.flash ? "is-on" : ""}" id="flash-button" aria-label="${state.flash ? "Désactiver" : "Activer"} le flash">${icons.flash}</button></div>
      <div class="camera-preview">
        <div class="preview-glow"></div><div class="architecture architecture-left"></div><div class="architecture architecture-center"></div><div class="architecture architecture-right"></div><div class="preview-grid"></div>
        <div class="scan-frame"><span class="corner top-left"></span><span class="corner top-right"></span><span class="corner bottom-left"></span><span class="corner bottom-right"></span><span class="scan-target">${state.scanned ? icons.check : icons.scan}</span></div>
        <div class="scan-message">${state.scanning ? "Lecture des détails…" : state.scanned ? "Objet reconnu avec succès" : "Placez l’objet au centre"}</div>
        ${state.scanning ? `<div class="scan-beam"></div>` : ""}
      </div>
      ${state.scanning ? `<div class="progress-track"><span style="width:${state.progress}%"></span></div><div class="progress-meta"><span>Analyse de la silhouette</span><strong>${state.progress}%</strong></div>` : ""}
      ${state.scanned ? renderResult() : state.scanning ? renderScanningFooter() : renderScanControls()}
    </section>

    <section class="category-section" aria-label="Type de scan">
      <div class="section-label"><span>QUE SOUHAITEZ-VOUS SCANNER ?</span><span class="section-rule"></span></div>
      <div class="category-list">
        ${["Objet", "Document", "Lieu", "Plante"].map((category, index) => `<button class="category-chip ${state.category === category ? "is-selected" : ""}" data-category="${category}"><span class="chip-icon">${index === 0 ? icons.bolt : index === 1 ? "Aa" : index === 2 ? "⌖" : "✳"}</span>${category}</button>`).join("")}
      </div>
    </section>

    <section class="trust-note"><span class="trust-icon">${icons.info}</span><p>Vos images sont analysées sur votre appareil et ne sont jamais conservées sans votre accord.</p></section>
  `;
}

function renderScanningFooter() {
  return `<div class="scanning-footer"><span class="scanning-spinner"></span><span>Analyse locale en cours…</span><span class="scanning-lock">PRIVÉ</span></div>`;
}

function renderScanControls() {
  return `<div class="scanner-action"><button class="primary-button" id="start-scan">${icons.scan}<span>Démarrer le scan</span><span class="button-arrow">${icons.arrow}</span></button><span class="action-hint">ou importez une image depuis votre galerie</span></div>`;
}

function renderResult() {
  return `
    <div class="result-panel">
      <div class="result-heading"><span class="result-kicker">IDENTIFICATION</span><span class="confidence">96% <small>fiable</small></span></div>
      <div class="result-title-row"><div><h2>Bâtiment haussmannien</h2><p>Architecture · Paris, France</p></div><span class="result-check">${icons.check}</span></div>
      <div class="result-divider"></div>
      <p class="result-description">Façade en pierre de taille datant de la fin du XIX<sup>e</sup> siècle. Balcons filants en fer forgé et toiture mansardée.</p>
      <div class="result-actions"><button class="secondary-button">Voir l’analyse ${icons.arrow}</button><button class="icon-button" aria-label="Partager le résultat">${icons.share}</button></div>
      <button class="rescan-button" id="rescan">${icons.plus} Nouveau scan</button>
    </div>
  `;
}

function renderHistory() {
  return `
    <section class="history-view">
      <div class="eyebrow"><span class="eyebrow-line"></span>VOTRE ACTIVITÉ <span class="eyebrow-line"></span></div>
      <div class="history-heading"><div><h1>Historique</h1><p>Retrouvez vos dernières découvertes.</p></div><button class="round-control subtle-control" aria-label="Filtrer les scans">${icons.plus}</button></div>
      <div class="history-list">
        <article class="history-item"><div class="history-thumb thumb-building"><span>${icons.scan}</span></div><div class="history-copy"><span class="history-type">OBJET · 96%</span><h2>Bâtiment haussmannien</h2><p>Aujourd’hui, 14:32 · Paris</p></div><span class="history-chevron">${icons.arrow}</span></article>
        <article class="history-item"><div class="history-thumb thumb-leaf"><span>✳</span></div><div class="history-copy"><span class="history-type">PLANTE · 91%</span><h2>Monstera deliciosa</h2><p>Hier, 18:07 · Maison</p></div><span class="history-chevron">${icons.arrow}</span></article>
        <article class="history-item"><div class="history-thumb thumb-paper"><span>Aa</span></div><div class="history-copy"><span class="history-type">DOCUMENT · 99%</span><h2>Ticket de caisse</h2><p>12 septembre · Paris</p></div><span class="history-chevron">${icons.arrow}</span></article>
      </div>
      <div class="history-empty"><span>${icons.clock}</span><p>Vos scans restent privés et sont stockés uniquement sur cet appareil.</p></div>
    </section>
  `;
}

function startScan() {
  if (state.scanning) return;
  state.scanning = true;
  state.scanned = false;
  state.progress = 8;
  render();
  const timer = window.setInterval(() => {
    state.progress += Math.floor(Math.random() * 16) + 8;
    if (state.progress >= 100) {
      state.progress = 100;
      window.clearInterval(timer);
      window.setTimeout(() => {
        state.scanning = false;
        state.scanned = true;
        render();
      }, 420);
    } else {
      updateScanProgress();
    }
  }, 270);
}

function updateScanProgress() {
  const progress = document.querySelector(".progress-track span");
  const value = document.querySelector(".progress-meta strong");
  if (progress) progress.style.width = `${state.progress}%`;
  if (value) value.textContent = `${state.progress}%`;
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    const view = button.dataset.view;
    if (view === "profile") return;
    state.view = view;
    render();
  }));

  document.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
    state.category = button.dataset.category;
    state.scanned = false;
    state.scanning = false;
    render();
  }));

  document.querySelector("#start-scan")?.addEventListener("click", startScan);
  document.querySelector("#rescan")?.addEventListener("click", () => {
    state.scanned = false;
    state.progress = 0;
    render();
  });
  document.querySelector("#flash-button")?.addEventListener("click", () => {
    state.flash = !state.flash;
    render();
  });
}

render();
