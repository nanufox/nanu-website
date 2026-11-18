/* Nanu's Letters — landing page: language switch (EN / HY) and Instagram link. */
(function () {
  'use strict';

  // Footer Instagram link; leave empty to hide it.
  var INSTAGRAM_URL = 'https://www.instagram.com/nanu.learn/';

  var STORAGE_KEY = 'nanu-lang';

  var COPY = {
    en: {
      title: 'Nanu’s Letters',
      description: 'Nanu’s Letters — an Eastern Armenian reading app for ages 6–8.',
      langGroup: 'Language',
      heroTitle: 'First steps in Armenian reading.',
      heroButton: 'See the app ↓',
      previewTitle: 'A peek inside',
      cardMeet: 'Meet',
      cardFind: 'Find',
      cardListen: 'Listen',
      footerLink: 'Follow Nanu on Instagram ↗',
      footerStatus: 'In development for iOS and Android',
      altWrite: 'App screen: tracing the Armenian letter Ա',
      altMeet: 'App screen: meeting the letter Ա through illustrated words',
      altFind: 'App screen: finding every Ա and ա among scattered letters',
      altHear: 'App screen: listening for the sound and choosing a picture'
    },
    hy: {
      title: 'Nanu’s Letters',
      description: 'Nanu’s Letters — արևելահայերեն կարդալու հավելված 6–8 տարեկանների համար։',
      langGroup: 'Լեզու',
      heroTitle: 'Հայերեն կարդալու առաջին քայլերը։',
      heroButton: 'Տե՛ս հավելվածը ↓',
      previewTitle: 'Մի հայացք հավելվածին',
      cardMeet: 'Ծանոթացի՛ր',
      cardFind: 'Գտի՛ր',
      cardListen: 'Լսի՛ր',
      footerLink: 'Հետևի՛ր Նանուին Instagram-ում ↗',
      footerStatus: 'Հավելվածը մշակվում է iOS-ի և Android-ի համար։',
      altWrite: 'Հավելվածի էկրան՝ Ա տառի գրում',
      altMeet: 'Հավելվածի էկրան՝ ծանոթություն Ա տառին նկարազարդ բառերով',
      altFind: 'Հավելվածի էկրան՝ գտնել բոլոր Ա և ա տառերը',
      altHear: 'Հավելվածի էկրան՝ լսել ձայնը և ընտրել նկարը'
    }
  };

  function storedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLang() {
    var saved = storedLang();
    if (saved && COPY[saved]) return saved;
    var nav = (navigator.language || '').toLowerCase();
    return nav.indexOf('hy') === 0 ? 'hy' : 'en';
  }

  function setLang(lang) {
    var copy = COPY[lang];
    if (!copy) return;

    document.documentElement.lang = lang;
    document.title = copy.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', copy.description);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var text = copy[el.getAttribute('data-i18n')];
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var text = copy[parts[1]];
        if (text != null) el.setAttribute(parts[0], text);
      });
    });

    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  // Leave an empty phone frame (not a broken-image icon) if a screenshot is not in assets/ yet.
  function markMissingScreens() {
    document.querySelectorAll('.phone img').forEach(function (img) {
      function missing() { img.closest('.phone').classList.add('is-missing'); }
      if (img.complete && img.naturalWidth === 0) missing();
      else img.addEventListener('error', missing);
    });
  }

  function initInstagram() {
    var link = document.getElementById('instagram-link');
    if (!link || !INSTAGRAM_URL) return;
    link.href = INSTAGRAM_URL;
    link.hidden = false;
  }

  document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      setLang(lang);
      storeLang(lang);
    });
  });

  setLang(initialLang());
  initInstagram();
  markMissingScreens();
})();
