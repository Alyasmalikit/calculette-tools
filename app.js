const LANG_KEY = "calculette_lang_v1";

const GLOBAL_DICT = {
  fr: {
    btn: "EN",
    navHome: "Accueil",
    navWt: "Temps de Travail",
    navWh: "Heures & Salaire",
    navTc: "Durées",
    navFh: "Feuille Hebdo",
    navCv: "Convertisseur",
    navTo: "Toiture",
    navAbout: "À propos",
    navContact: "Contact",
    navPrivacy: "Confidentialité",
    navDisclaimer: "Disclaimer"
  },
  en: {
    btn: "FR",
    navHome: "Home",
    navWt: "Working Time",
    navWh: "Working Hours",
    navTc: "Time Calculator",
    navFh: "Weekly Timesheet",
    navCv: "Decimal Converter",
    navTo: "Hip Roof",
    navAbout: "About",
    navContact: "Contact",
    navPrivacy: "Privacy Policy",
    navDisclaimer: "Disclaimer"
  }
};

function getLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
  } catch (e) {
    return "fr";
  }
}

function setLang(newLang) {
  try {
    localStorage.setItem(LANG_KEY, newLang);
  } catch (e) {}
  applyLang();
}

function toggleLang() {
  setLang(getLang() === "fr" ? "en" : "fr");
}

function renderChrome(activePage) {
  const headerEl = document.getElementById("siteHeader");
  const footerEl = document.getElementById("siteFooter");

  if (headerEl) {
    headerEl.innerHTML = `
      <div class="container nav-bar">
        <a href="index.html" class="brand"><span class="brand-dot"></span>Calculette-tools</a>
        <div class="nav-right">
          <nav class="nav-menu">
            <a href="index.html" class="${activePage === 'home' ? 'active' : ''}" data-g="navHome">Accueil</a>
            <a href="working-time-calculator.html" class="${activePage === 'wt' ? 'active' : ''}" data-g="navWt">Temps de Travail</a>
            <a href="working-hour-calculator.html" class="${activePage === 'wh' ? 'active' : ''}" data-g="navWh">Heures &amp; Salaire</a>
            <a href="time-calculator.html" class="${activePage === 'tc' ? 'active' : ''}" data-g="navTc">Durées</a>
            <a href="feuille-hebdo.html" class="${activePage === 'fh' ? 'active' : ''}" data-g="navFh">Feuille Hebdo</a>
            <a href="convertisseur.html" class="${activePage === 'cv' ? 'active' : ''}" data-g="navCv">Convertisseur</a>
            <a href="toiture-croupe.html" class="${activePage === 'to' ? 'active' : ''}" data-g="navTo">Toiture</a>
          </nav>
          <button type="button" id="langBtn" class="lang-btn" onclick="toggleLang()">EN</button>
        </div>
      </div>
    `;
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <div class="container">
        <div><strong>Calculette-tools</strong> — © 2026</div>
        <div class="footer-links">
          <a href="index.html" data-g="navHome">Accueil</a>
          <a href="working-time-calculator.html" data-g="navWt">Temps de Travail</a>
          <a href="working-hour-calculator.html" data-g="navWh">Heures &amp; Salaire</a>
          <a href="time-calculator.html" data-g="navTc">Durées</a>
          <a href="feuille-hebdo.html" data-g="navFh">Feuille Hebdo</a>
          <a href="convertisseur.html" data-g="navCv">Convertisseur</a>
          <a href="toiture-croupe.html" data-g="navTo">Toiture</a>
        </div>
        <div class="footer-links">
          <a href="about.html" data-g="navAbout">À propos</a>
          <a href="contact.html" data-g="navContact">Contact</a>
          <a href="privacy.html" data-g="navPrivacy">Confidentialité</a>
          <a href="terms.html" data-g="navDisclaimer">Disclaimer</a>
        </div>
      </div>
    `;
  }
}

function applyLang() {
  const lang = getLang();
  document.documentElement.lang = lang;
  const g = GLOBAL_DICT[lang];
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = g.btn;

  document.querySelectorAll("[data-g]").forEach(el => {
    const key = el.getAttribute("data-g");
    if (g[key]) el.textContent = g[key];
  });

  if (typeof PAGE_DICT !== "undefined" && PAGE_DICT[lang]) {
    const p = PAGE_DICT[lang];
    document.querySelectorAll("[data-t]").forEach(el => {
      const key = el.getAttribute("data-t");
      if (p[key]) el.textContent = p[key];
    });
  }

  if (typeof onPageLangChange === "function") {
    onPageLangChange(lang);
  }
}
