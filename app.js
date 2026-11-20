const LANG_KEY = "calculette_lang_v1";
let lang = "fr";

try {
  if (localStorage.getItem(LANG_KEY) === "en") lang = "en";
} catch (e) {}

function getLang() {
  return lang;
}

const CHROME_DICT = {
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

function renderChrome(activePage) {
  const headerEl = document.getElementById("siteHeader");
  const footerEl = document.getElementById("siteFooter");
  const isAct = (key) => (activePage === key ? ' class="active"' : "");

  if (headerEl) {
    headerEl.innerHTML = `
      <div class="container nav-bar">
        <a href="index.html" class="brand"><span class="brand-dot"></span>Calculette-tools</a>
        <div class="nav-right">
          <nav class="nav-menu">
            <a href="index.html"${isAct("home")} data-t="navHome">Accueil</a>
            <a href="working-time-calculator.html"${isAct("wt")} data-t="navWt">Temps de Travail</a>
            <a href="working-hour-calculator.html"${isAct("wh")} data-t="navWh">Heures &amp; Salaire</a>
            <a href="time-calculator.html"${isAct("tc")} data-t="navTc">Durées</a>
            <a href="feuille-hebdo.html"${isAct("fh")} data-t="navFh">Feuille Hebdo</a>
            <a href="convertisseur.html"${isAct("cv")} data-t="navCv">Convertisseur</a>
            <a href="toiture-croupe.html"${isAct("to")} data-t="navTo">Toiture</a>
          </nav>
          <button type="button" id="langBtn" class="lang-btn" onclick="toggleLang()">EN</button>
        </div>
      </div>
    `;
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <div class="container">
        <div>Calculette-tools</div>
        <div class="footer-links">
          <a href="index.html"${isAct("home")} data-t="navHome">Accueil</a>
          <a href="working-time-calculator.html"${isAct("wt")} data-t="navWt">Temps de Travail</a>
          <a href="working-hour-calculator.html"${isAct("wh")} data-t="navWh">Heures &amp; Salaire</a>
          <a href="time-calculator.html"${isAct("tc")} data-t="navTc">Durées</a>
          <a href="feuille-hebdo.html"${isAct("fh")} data-t="navFh">Feuille Hebdo</a>
          <a href="convertisseur.html"${isAct("cv")} data-t="navCv">Convertisseur</a>
          <a href="toiture-croupe.html"${isAct("to")} data-t="navTo">Toiture</a>
        </div>
        <div class="footer-links">
          <a href="about.html"${isAct("about")} data-t="navAbout">À propos</a>
          <a href="contact.html"${isAct("contact")} data-t="navContact">Contact</a>
          <a href="privacy.html"${isAct("privacy")} data-t="navPrivacy">Confidentialité</a>
          <a href="terms.html"${isAct("terms")} data-t="navDisclaimer">Disclaimer</a>
        </div>
      </div>
    `;
  }
}

function applyLang() {
  document.documentElement.lang = lang;
  const cd = CHROME_DICT[lang] || CHROME_DICT.fr;
  const pd = (typeof PAGE_DICT !== "undefined" && PAGE_DICT[lang]) ? PAGE_DICT[lang] : {};
  const merged = Object.assign({}, cd, pd);

  const btn = document.getElementById("langBtn");
  if (btn && cd.btn) btn.textContent = cd.btn;

  document.querySelectorAll("[data-t]").forEach((el) => {
    const k = el.getAttribute("data-t");
    if (merged[k] !== undefined) el.textContent = merged[k];
  });
}

function toggleLang() {
  lang = lang === "fr" ? "en" : "fr";
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  applyLang();
}
