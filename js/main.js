(function () {
  'use strict';

  // ---------- configuração pessoal ----------
  // Data de nascimento (AAAA-MM-DD). Vazio = a idade não aparece na página.
  // Nascimento: 28/05/1997 (confirmado pelo usuário em 2026-11-19).
  var BIRTH_DATE = '1997-05-28';
  // Início da carreira em tecnologia (CV: desde 2017).
  var CAREER_START_YEAR = 2017;
  // E-mail montado por JS para não ficar em texto puro no HTML (anti-scraping simples).
  var MAIL = ['gustavoaferreira97', 'gmail.com'].join('@');
  var CV = {
    pt: 'assets/cv/Curriculo_Gustavo_Ferreira.pdf',
    en: 'assets/cv/Resume_Gustavo_Ferreira.pdf'
  };

  var root = document.documentElement;
  root.classList.add('js');

  // ---------- idioma ----------
  var nodes = document.querySelectorAll('[data-en], [data-en-html]');
  nodes.forEach(function (el) {
    if (el.hasAttribute('data-en-html')) el._pt = el.innerHTML;
    else el._pt = el.textContent.trim();
  });

  function storedLang() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function saveLang(l) {
    try { localStorage.setItem('lang', l); } catch (e) { /* sem storage: ok */ }
  }

  function setLang(lang) {
    nodes.forEach(function (el) {
      if (el.hasAttribute('data-en-html')) {
        el.innerHTML = lang === 'en' ? el.getAttribute('data-en-html') : el._pt;
      } else {
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el._pt;
      }
    });
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = lang === 'en'
      ? 'Gustavo Ferreira — Software Developer'
      : 'Gustavo Ferreira — Desenvolvedor de Software';
    document.getElementById('langBtn').textContent = lang === 'en' ? 'PT' : 'EN';
    document.getElementById('cvBtn').setAttribute('href', CV[lang]);
    renderAge(lang);
    saveLang(lang);
  }

  var current = storedLang() || ((navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
  document.getElementById('langBtn').addEventListener('click', function () {
    current = current === 'pt' ? 'en' : 'pt';
    setLang(current);
  });

  // ---------- idade e anos de experiência ----------
  function renderAge(lang) {
    var span = document.getElementById('age');
    var sep = document.querySelector('.age-sep');
    if (!BIRTH_DATE) { span.hidden = true; sep.hidden = true; return; }
    var b = new Date(BIRTH_DATE + 'T00:00:00');
    var n = new Date();
    var age = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) age--;
    span.textContent = age + (lang === 'en' ? ' years old' : ' anos');
    span.hidden = false;
    sep.hidden = false;
  }

  document.getElementById('years').textContent = '+' + (new Date().getFullYear() - CAREER_START_YEAR);
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- e-mail ----------
  document.getElementById('mailBtn').setAttribute('href', 'mailto:' + MAIL);

  // ---------- reveal ao rolar ----------
  var items = document.querySelectorAll('.card, .timeline > li, .stats li, .skills > div');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  setLang(current);
})();
