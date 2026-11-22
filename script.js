/* ============================================================================
   🚀 GŁÓWNA LOGIKA APLIKACJI (script.js)
   Korzysta z ustawień zdefiniowanych w pliku config.js (obiekt SITE_CONFIG).
============================================================================ */

const CFG = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {};
const SECRET_CODE = CFG.security?.secretCode || "4016";
const RELATIONSHIP_START = CFG.dates?.relationshipStart || "2025-09-25T18:00:00";
const ANNIVERSARY_MONTH = CFG.dates?.anniversary?.month || 9;
const ANNIVERSARY_DAY = CFG.dates?.anniversary?.day || 25;
const ACHIEVEMENTS_DATA = CFG.achievements || [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================================
   🎨 ZASTOSOWANIE KOLORÓW I TEKSTÓW Z CONFIG.JS
============================================================================ */
function applyConfig() {
  if (CFG.theme?.primaryColor) {
    document.documentElement.style.setProperty('--pink', CFG.theme.primaryColor);
  }
  if (CFG.theme?.secondaryColor) {
    document.documentElement.style.setProperty('--purple', CFG.theme.secondaryColor);
  }

  const lockTitle = document.getElementById('lockTitle');
  const lockSubtitle = document.getElementById('lockSubtitle');
  const lockHintText = document.getElementById('lockHintText');
  const rememberCheckbox = document.getElementById('rememberSession');

  if (lockTitle && CFG.security?.lockTitle) lockTitle.textContent = CFG.security.lockTitle;
  if (lockSubtitle && CFG.security?.lockSubtitle) lockSubtitle.textContent = CFG.security.lockSubtitle;
  if (lockHintText && CFG.security?.lockHint) lockHintText.textContent = CFG.security.lockHint;
  if (rememberCheckbox && typeof CFG.security?.rememberSessionByDefault === 'boolean') {
    rememberCheckbox.checked = CFG.security.rememberSessionByDefault;
  }

  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroTitle && CFG.texts?.heroTitle) heroTitle.textContent = CFG.texts.heroTitle;
  if (heroSubtitle && CFG.texts?.heroSubtitle) heroSubtitle.textContent = CFG.texts.heroSubtitle;
}

/* ============================================================================
   🧠 STAN APLIKACJI
============================================================================ */
let appInitialized = false;
let wrongAttempts = 0;

let state = {
  loveCount: 0,
  heartCount: 0,
  wheelSpins: 0,
  quizFinished: { easy: false, medium: false, hard: false },
  giftsOpened: 0,
  memoryCount: 0,
  capsuleCount: 0,
  visits: 0
};

let achFilter = {
  status: 'all',     // 'all' | 'unlocked' | 'locked'
  category: 'all',   // 'all' | nazwa kategorii
  search: ''
};

/* ============================================================================
   🔐 EKRAN BLOKADY (Z PAMIĘCIĄ SESJI I PONOWNYM BLOKOWANIEM)
============================================================================ */
const lockScreen = document.getElementById('lockScreen');
const appContainer = document.getElementById('app');
const codeInput = document.getElementById('codeInput');
const unlockBtn = document.getElementById('unlockBtn');
const lockMessage = document.getElementById('lockMessage');
const toggleCodeVisibility = document.getElementById('toggleCodeVisibility');
const rememberSessionCheckbox = document.getElementById('rememberSession');

function getSessionStorage() {
  return CFG.security?.sessionStorageType === 'local' ? localStorage : sessionStorage;
}

function isSessionUnlocked() {
  return sessionStorage.getItem('siteUnlocked') === '1' || localStorage.getItem('siteUnlocked') === '1';
}

function openApp(instant = false) {
  if (instant) {
    lockScreen.classList.add('unlocked');
    appContainer.classList.remove('hidden');
    document.body.classList.remove('locked');
    if (!appInitialized) {
      appInitialized = true;
      initApp();
    }
    return;
  }

  lockMessage.textContent = "Udało się! Witaj w naszym świecie 💖";
  lockMessage.className = "lock-message success";
  playDing();

  if (rememberSessionCheckbox && rememberSessionCheckbox.checked) {
    getSessionStorage().setItem('siteUnlocked', '1');
  }

  setTimeout(() => {
    lockScreen.classList.add('unlocked');
    appContainer.classList.remove('hidden');
    document.body.classList.remove('locked');
    if (!appInitialized) {
      appInitialized = true;
      initApp();
    }
    if (wrongAttempts === 0) unlockAchievement('sec-code-first-try');
  }, 550);
}

function lockAppAgain() {
  sessionStorage.removeItem('siteUnlocked');
  localStorage.removeItem('siteUnlocked');
  codeInput.value = '';
  lockMessage.textContent = 'Strona została zablokowana 🔒';
  lockMessage.className = 'lock-message';
  appContainer.classList.add('hidden');
  lockScreen.classList.remove('unlocked');
  document.body.classList.add('locked');
  unlockAchievement('sec-lock-relock');
  setTimeout(() => codeInput.focus(), 200);
}

function tryUnlock() {
  if (codeInput.value.trim() === SECRET_CODE) {
    openApp(false);
  } else {
    wrongAttempts++;
    lockMessage.textContent = "Nieprawidłowy kod — spróbuj jeszcze raz, Kochanie 💗";
    lockMessage.className = "lock-message error";
    codeInput.classList.add('shake');
    setTimeout(() => codeInput.classList.remove('shake'), 500);
    codeInput.value = '';
    codeInput.focus();
    if (navigator.vibrate) navigator.vibrate(200);
    unlockAchievement('sec-wrong-code');
  }
}

if (toggleCodeVisibility) {
  toggleCodeVisibility.addEventListener('click', () => {
    const isPass = codeInput.type === 'password';
    codeInput.type = isPass ? 'text' : 'password';
    toggleCodeVisibility.textContent = isPass ? '🙈' : '👁️';
  });
}

unlockBtn.addEventListener('click', tryUnlock);
codeInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });

window.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  if (isSessionUnlocked()) {
    openApp(true);
  } else {
    codeInput.focus();
  }
});

/* ============================================================================
   🔊 DŹWIĘK
============================================================================ */
function playDing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(); osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

/* ============================================================================
   🚀 GŁÓWNA INICJALIZACJA
============================================================================ */
function initApp() {
  loadState();
  initViews();
  initNav();
  setDate();
  startCounter();
  startAnniversaryCountdown();
  startTyping();
  showCompliment();
  initParticles();
  initCustomCursor();
  initCarousel();
  initWheel();
  initQuiz();
  initGifts();
  initTiltCards();
  initLightbox();
  initSurprise();
  initMusic();
  initThemeToggle();
  initButtons();
  initMinigame();
  initScrollObserver();
  initImportantDates();
  initPulseHeart();
  initLoveTester();
  initMemoryWall();
  initTimeCapsule();
  initAchievements();
  initLoveWeather();
  initVideoTracking();
  checkTimeBasedAchievements();
  updateGlobalStats();
}

/* ============================================================================
   💾 STAN APLIKACJI
============================================================================ */
function loadState() {
  state.loveCount = parseInt(localStorage.getItem('statsLove') || '0', 10);
  state.heartCount = parseInt(localStorage.getItem('heartCount') || '0', 10);
  state.wheelSpins = parseInt(localStorage.getItem('wheelSpins') || '0', 10);
  state.giftsOpened = parseInt(localStorage.getItem('giftsOpened') || '0', 10);
  state.memoryCount = parseInt(localStorage.getItem('memoryCount') || '0', 10);
  state.capsuleCount = parseInt(localStorage.getItem('capsuleCount') || '0', 10);
  state.visits = (parseInt(localStorage.getItem('visitCount') || '0', 10)) + 1;
  localStorage.setItem('visitCount', state.visits);

  unlockAchievement('rel-first-step');
  if (state.visits >= 5) unlockAchievement('rel-regular');
  if (state.visits >= 25) unlockAchievement('rel-owner');
}

function updateGlobalStats() {
  const visitEl = document.getElementById('visitCount');
  const statsEl = document.getElementById('statsLove');
  const loveCounter = document.getElementById('loveCounter');
  if (visitEl) visitEl.textContent = state.visits;
  if (statsEl) statsEl.textContent = state.loveCount;
  if (loveCounter) loveCounter.textContent = `Kliknięcia: ${state.loveCount} 💖`;
}

/* ============================================================================
   🏆 SYSTEM OSIĄGNIĘĆ (KLIKALNY + FILTRY + LOCALSTORAGE)
============================================================================ */
function getAchievements() {
  try {
    const a = JSON.parse(localStorage.getItem('achievements') || '[]');
    return Array.isArray(a) ? a : [];
  } catch (e) { return []; }
}

function saveAchievements(list) {
  localStorage.setItem('achievements', JSON.stringify(list));
}

function unlockAchievement(id, silent = false) {
  const unlocked = getAchievements();
  if (unlocked.includes(id)) return;
  const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
  if (!ach) return;

  unlocked.push(id);
  saveAchievements(unlocked);
  renderAchievements();

  if (!silent) {
    showToast(`Zdobyto osiągnięcie: ${ach.name}`, ach.icon);
  }

  checkMilestoneAchievements(unlocked);
}

function toggleAchievementManual(id) {
  const unlocked = getAchievements();
  const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
  if (!ach) return;

  const idx = unlocked.indexOf(id);
  if (idx > -1) {
    unlocked.splice(idx, 1);
    saveAchievements(unlocked);
    renderAchievements();
    showToast(`Cofnięto: ${ach.name}`, '↩️');
  } else {
    unlocked.push(id);
    saveAchievements(unlocked);
    renderAchievements();
    showToast(`Odznaczono: ${ach.name}`, ach.icon);
    if (id !== 'sec-ach-clicker') {
      unlockAchievement('sec-ach-clicker', true);
    }
    checkMilestoneAchievements(unlocked);
  }
}

function checkMilestoneAchievements(unlocked) {
  const total = ACHIEVEMENTS_DATA.length;
  if (total === 0) return;
  if (unlocked.length >= Math.ceil(total / 2)) {
    unlockAchievement('sec-half-way', true);
  }
  if (unlocked.length >= total - 1 && !unlocked.includes('sec-legend')) {
    unlockAchievement('sec-legend', false);
  }
}

function initAchievements() {
  const catContainer = document.getElementById('achCategoryFilters');
  const statusContainer = document.getElementById('achStatusFilters');
  const searchInput = document.getElementById('achSearch');
  const resetBtn = document.getElementById('resetAchievementsBtn');

  // Generowanie przycisków kategorii na podstawie config.js
  if (catContainer) {
    const categories = ['all', ...new Set(ACHIEVEMENTS_DATA.map(a => a.category))];
    catContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'ach-filter-btn' + (cat === 'all' ? ' active' : '');
      btn.dataset.category = cat;
      btn.textContent = cat === 'all' ? '📂 Wszystkie kategorie' : cat;
      btn.addEventListener('click', () => {
        achFilter.category = cat;
        catContainer.querySelectorAll('.ach-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAchievements();
      });
      catContainer.appendChild(btn);
    });
  }

  if (statusContainer) {
    statusContainer.querySelectorAll('.ach-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        achFilter.status = btn.dataset.status;
        statusContainer.querySelectorAll('.ach-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAchievements();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      achFilter.search = e.target.value.trim().toLowerCase();
      renderAchievements();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Czy na pewno chcesz wyzerować wszystkie zdobyte osiągnięcia?')) {
        saveAchievements([]);
        renderAchievements();
        showToast('Postęp osiągnięć został wyzerowany.', '🔄');
      }
    });
  }

  renderAchievements();
}

function renderAchievements() {
  const grid = document.getElementById('achievementsGrid');
  const unlocked = getAchievements();
  const total = ACHIEVEMENTS_DATA.length;
  const count = unlocked.length;
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  const countEl = document.getElementById('achievementsCount');
  const totalEl = document.getElementById('achievementsTotal');
  const fillEl = document.getElementById('achProgressFill');
  const percentEl = document.getElementById('achPercent');
  const heroAchCount = document.getElementById('heroAchCount');

  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = total;
  if (fillEl) fillEl.style.width = `${percent}%`;
  if (percentEl) percentEl.textContent = `(${percent}%)`;
  if (heroAchCount) heroAchCount.textContent = `${count}/${total}`;

  if (!grid) return;

  const filtered = ACHIEVEMENTS_DATA.filter(a => {
    const isUnlocked = unlocked.includes(a.id);
    if (achFilter.status === 'unlocked' && !isUnlocked) return false;
    if (achFilter.status === 'locked' && isUnlocked) return false;
    if (achFilter.category !== 'all' && a.category !== achFilter.category) return false;
    if (achFilter.search) {
      const hay = `${a.name} ${a.desc} ${a.category}`.toLowerCase();
      if (!hay.includes(achFilter.search)) return false;
    }
    return true;
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="memory-empty" style="grid-column: 1 / -1;">Brak osiągnięć pasujących do wybranych filtrów 🔍</p>';
    return;
  }

  filtered.forEach(a => {
    const isUnlocked = unlocked.includes(a.id);
    const card = document.createElement('div');
    card.className = 'ach-card ' + (isUnlocked ? 'unlocked' : 'locked');
    card.title = isUnlocked ? 'Kliknij, aby odznaczyć jako niezdobyte' : 'Kliknij, aby oznaczyć jako zdobyte';

    const displayIcon = isUnlocked ? a.icon : (a.secret ? '❓' : '🔒');
    const displayDesc = (!isUnlocked && a.secret) ? 'Ukryte osiągnięcie — kliknij lub odkryj na stronie...' : a.desc;

    card.innerHTML = `
      <div class="ach-icon">${displayIcon}</div>
      <div class="ach-info">
        <span class="ach-cat-tag">${escapeHtml(a.category)}</span>
        <h4>${escapeHtml(a.name)}</h4>
        <p>${escapeHtml(displayDesc)}</p>
      </div>
      <div class="ach-status-badge">${isUnlocked ? '✅' : '⬜'}</div>
    `;

    card.addEventListener('click', () => toggleAchievementManual(a.id));
    grid.appendChild(card);
  });
}

/* ============================================================================
   🧭 NAWIGACJA (SPA)
============================================================================ */
function initViews() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');

  navTabs.forEach(tab => {
    const btn = tab.querySelector('.nav-tab-btn');
    let closeTimer;
    function openTab() {
      clearTimeout(closeTimer);
      document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.remove('open');
        const b = t.querySelector('.nav-tab-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      tab.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function scheduleClose() {
      closeTimer = setTimeout(() => {
        tab.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }, 150);
    }
    if (window.matchMedia('(hover: hover)').matches) {
      tab.addEventListener('mouseenter', openTab);
      tab.addEventListener('mouseleave', scheduleClose);
    }
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (tab.classList.contains('open')) {
        tab.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        openTab();
      }
    });
    tab.querySelectorAll('.nav-dropdown a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('open'));
        if (navbar) navbar.classList.remove('menu-open');
        if (hamburger) hamburger.classList.remove('active');
        const view = a.dataset.view;
        const scroll = a.dataset.scroll;
        if (view) switchView(view, scroll);
      });
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-tab')) {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('open'));
    }
  });

  document.querySelectorAll('[data-view]:not(.nav-tab):not(.nav-tab-btn)').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (btn.id === 'navLogo') unlockAchievement('sec-logo-click');
      switchView(btn.dataset.view, btn.dataset.scroll);
    });
  });
}

function switchView(viewName, scrollId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
  const activeTab = document.querySelector(`.nav-tab[data-view="${viewName}"] .nav-tab-btn`);
  if (activeTab) activeTab.classList.add('active');

  if (scrollId) {
    setTimeout(() => {
      const el = document.getElementById(scrollId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ============================================================================
   🍔 HAMBURGER MENU I PRZYCISK BLOKADY
============================================================================ */
function initNav() {
  const hamburger = document.getElementById('navHamburger');
  const navbar = document.getElementById('navbar');
  const lockAgainBtn = document.getElementById('lockAgainBtn');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navbar.classList.toggle('menu-open');
    });
  }

  if (lockAgainBtn) {
    lockAgainBtn.addEventListener('click', lockAppAgain);
  }
}

/* ============================================================================
   🧩 FUNKCJE POMOCNICZE / EFEKTY
============================================================================ */
function showToast(msg, emoji = '💖') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-emoji">${emoji}</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3400);
}

function createFloating(x, y, emoji, size = 24, duration = 2000) {
  if (reduceMotion) return;
  const el = document.createElement('div');
  el.textContent = emoji;
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${size}px;pointer-events:none;z-index:9998;will-change:transform,opacity;transition:transform ${duration}ms ease-out, opacity ${duration}ms ease-out;`;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${-200 - Math.random() * 200}px) rotate(${Math.random() * 720 - 360}deg)`;
    el.style.opacity = '0';
  });
  setTimeout(() => el.remove(), duration);
}

function burstHearts(x, y) {
  const emojis = ['💖', '💕', '💗', '💘', '❤️', '💝'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => createFloating(x, y, emojis[Math.floor(Math.random() * emojis.length)], 20 + Math.random() * 20, 1500 + Math.random() * 1000), i * 40);
  }
}

function burstConfetti() {
  const emojis = ['🎉', '✨', '🎊', '💖', '🌟', '💫', '🌈', '⭐'];
  const cx = innerWidth / 2, cy = innerHeight / 2;
  for (let i = 0; i < 36; i++) {
    setTimeout(() => createFloating(cx + (Math.random() - 0.5) * 400, cy + (Math.random() - 0.5) * 200, emojis[Math.floor(Math.random() * emojis.length)], 20 + Math.random() * 20, 2000 + Math.random() * 1500), i * 25);
  }
}

function setDate() {
  const d = new Date();
  const el = document.getElementById('date');
  if (el) {
    el.textContent = 'Dzisiaj jest: ' + d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}

function checkTimeBasedAchievements() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const day = now.getDay();

  if (hour >= 0 && hour < 4) unlockAchievement('mood-night-owl');
  if (hour >= 4 && hour < 8) unlockAchievement('mood-early-bird');
  if (day === 0 || day === 6) unlockAchievement('mood-weekend');
  if ((hour === 0 && min === 0) || (hour === 21 && min === 37)) unlockAchievement('mood-midnight-wish');
}

/* ============================================================================
   ⏱️ LICZNIKI I WAŻNE DATY
============================================================================ */
function startCounter() {
  const start = new Date(RELATIONSHIP_START).getTime();
  const els = {
    years: document.getElementById('years'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  function update() {
    const diff = Date.now() - start;
    if (diff < 0) {
      Object.values(els).forEach(el => { if (el) el.textContent = '0'; });
      return;
    }
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const days = Math.floor(hr / 24);
    const years = Math.floor(days / 365.25);

    if (els.years) els.years.textContent = years;
    if (els.days) els.days.textContent = days % 365;
    if (els.hours) els.hours.textContent = hr % 24;
    if (els.minutes) els.minutes.textContent = min % 60;
    if (els.seconds) els.seconds.textContent = sec % 60;

    if (days >= 100) unlockAchievement('rel-100-days');
    if (days >= 365) unlockAchievement('rel-365-days');
  }
  update();
  setInterval(update, 1000);
}

function startAnniversaryCountdown() {
  const el = document.getElementById('annivCountdown');
  if (!el) return;
  function update() {
    const now = new Date();
    let next = new Date(now.getFullYear(), ANNIVERSARY_MONTH - 1, ANNIVERSARY_DAY);
    if (next <= now) next = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH - 1, ANNIVERSARY_DAY);
    const diff = next - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${d} dni, ${h} godz., ${m} min`;
  }
  update();
  setInterval(update, 60000);
}

function initImportantDates() {
  const grid = document.getElementById('datesGrid');
  if (!grid) return;

  const birthdays = CFG.dates?.birthdays || [];
  const anniv = CFG.dates?.anniversary || { month: 9, day: 25, label: 'Rocznica' };
  const allDates = [
    ...birthdays,
    { id: 'countdown-anniv', name: anniv.label, icon: '💍', day: anniv.day, month: anniv.month, fullText: `${anniv.day}.${String(anniv.month).padStart(2, '0')} każdego roku` }
  ];

  grid.innerHTML = allDates.map(item => `
    <div class="date-card glass-card">
      <div class="date-icon">${item.icon}</div>
      <h3>${escapeHtml(item.name)}</h3>
      <p class="date-full">${escapeHtml(item.fullText)}</p>
      <p class="date-countdown" id="${item.id}">...</p>
    </div>
  `).join('');

  function update() {
    const now = new Date();
    allDates.forEach(c => {
      const el = document.getElementById(c.id);
      if (!el) return;
      let next = new Date(now.getFullYear(), c.month - 1, c.day);
      if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        next = new Date(now.getFullYear() + 1, c.month - 1, c.day);
      }
      const diff = next - now;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      if (d === 0) el.textContent = `🎉 Dziś! ${h} godz. ${m} min`;
      else el.textContent = `Za ${d} dni, ${h} godz.`;
    });
  }
  update();
  setInterval(update, 60000);
}

/* ============================================================================
   ✨ EFEKTY WIZUALNE
============================================================================ */
function startTyping() {
  const el = document.querySelector('.typing-title');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(interval);
      el.classList.remove('typing-title');
      el.style.borderRight = 'none';
    }
  }, 75);
}

function showCompliment() {
  const compliments = CFG.texts?.compliments || ["Jesteś najpiękniejsza 💖"];
  const el = document.getElementById('compliment');
  if (el) el.textContent = compliments[Math.floor(Math.random() * compliments.length)];
}

function initPulseHeart() {
  const heart = document.getElementById('pulseHeartEl');
  if (!heart) return;
  const trigger = () => {
    const rect = heart.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    state.heartCount++;
    localStorage.setItem('heartCount', state.heartCount);
    unlockAchievement('int-heart-1');
    if (state.heartCount >= 20) unlockAchievement('int-heart-20');
    if (state.heartCount >= 100) unlockAchievement('int-heart-100');
  };
  heart.addEventListener('click', trigger);
  heart.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
  });
}

function initParticles() {
  if (reduceMotion || CFG.theme?.enableParticles === false) return;
  const canvas = document.getElementById('particlesBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const emojis = ['✨', '💖', '⭐', '💫', '🌸'];
  const PARTICLE_COUNT = Math.min(28, Math.floor(window.innerWidth / 50));

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * (w || window.innerWidth),
      y: Math.random() * (h || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 10 + Math.random() * 14,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      alpha: 0.3 + Math.random() * 0.45
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = p.alpha;
      ctx.font = p.size + 'px serif';
      ctx.fillText(p.emoji, p.x, p.y);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

function initCustomCursor() {
  if (reduceMotion || CFG.theme?.enableCursorTrail === false || window.matchMedia('(hover: none)').matches) return;
  const emojis = ['💖', '✨', '💕', '🌸', '⭐'];
  let lastTime = 0, lastX = 0, lastY = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (now - lastTime < 45 || distance < 6) return;
    lastTime = now; lastX = e.clientX; lastY = e.clientY;
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `position:fixed;left:${e.clientX - 10}px;top:${e.clientY - 10}px;font-size:${12 + Math.random() * 9}px;pointer-events:none;z-index:9998;`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = -20 - Math.random() * 40;
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg) scale(0.3)`;
      el.style.opacity = '0';
      el.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';
    });
    setTimeout(() => el.remove(), 950);
  });
}

/* ============================================================================
   🎡 KARUZELA I GALERIA
============================================================================ */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !dotsContainer) return;
  const slides = track.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;
  let currentIndex = 0, autoplayInterval;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('span');

  function goTo(i) {
    currentIndex = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));
    unlockAchievement('int-carousel');
  }
  function startAutoplay() {
    stopAutoplay();
    if (reduceMotion) return;
    autoplayInterval = setInterval(() => goTo(currentIndex + 1), 5000);
  }
  function stopAutoplay() { if (autoplayInterval) clearInterval(autoplayInterval); }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); startAutoplay(); });
  startAutoplay();

  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAutoplay(); else startAutoplay(); });

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
    startAutoplay();
  }, { passive: true });
}

/* ============================================================================
   🎡 KOŁO FORTUNY
============================================================================ */
function initWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const items = CFG.wheelItems || ["Kocham Cię 💖", "Moje szczęście 🌟", "Mój świat 💫", "Na zawsze 💍"];
  const colors = ['#ff5fa2', '#8a2be2', '#ffb347', '#43c59e', '#4b7be5', '#ff7b54', '#b565d8', '#e75480'];
  const slices = items.length;
  const angle = (Math.PI * 2) / slices;
  let rotation = 0, spinning = false;

  function draw() {
    const size = Math.min(canvas.width, canvas.height);
    const radius = size / 2 - 5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    for (let i = 0; i < slices; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, i * angle, (i + 1) * angle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * angle + angle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.max(12, radius / 14)}px Poppins, sans-serif`;
      ctx.fillText(items[i], radius - 12, 5);
      ctx.restore();
    }
    ctx.restore();
  }
  draw();

  const spinBtn = document.getElementById('spinBtn');
  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      const resultEl = document.getElementById('wheelResult');
      if (resultEl) resultEl.textContent = '';
      const start = rotation;
      const end = rotation + Math.PI * 2 * (5 + Math.random() * 3) + Math.random() * Math.PI * 2;
      const duration = 3800;
      const t0 = performance.now();

      function animate(now) {
        const t = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 4);
        rotation = start + (end - start) * ease;
        draw();
        if (t < 1) requestAnimationFrame(animate);
        else {
          const normalized = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const pointerAngle = (Math.PI * 1.5 - normalized + Math.PI * 2) % (Math.PI * 2);
          const idx = Math.floor(pointerAngle / angle);
          const result = items[idx];
          if (resultEl) resultEl.textContent = result;
          spinning = false;
          burstHearts(window.innerWidth / 2, window.innerHeight / 2);

          state.wheelSpins++;
          localStorage.setItem('wheelSpins', state.wheelSpins);
          unlockAchievement('game-wheel-1');
          if (state.wheelSpins >= 10) unlockAchievement('game-wheel-10');
          if (result && result.includes('Kocham')) unlockAchievement('game-wheel-love');
        }
      }
      requestAnimationFrame(animate);
    });
  }
}

/* ============================================================================
   💘 LOVE TESTER
============================================================================ */
function initLoveTester() {
  const btn = document.getElementById('loveTestBtn');
  const name1 = document.getElementById('loveName1');
  const name2 = document.getElementById('loveName2');
  const result = document.getElementById('loveTestResult');
  if (!btn || !name1 || !name2 || !result) return;

  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }

  btn.addEventListener('click', () => {
    const a = name1.value.trim().toLowerCase();
    const b = name2.value.trim().toLowerCase();
    if (!a || !b) {
      result.innerHTML = '<p class="love-hint">Wpisz oba imiona 💕</p>';
      return;
    }
    const combined = [a, b].sort().join('+');
    const score = 70 + (hash(combined) % 31);
    const messages = score >= 95 ? 'Prawdziwa miłość! 💍' :
                     score >= 85 ? 'Idealna para! 💖' :
                     score >= 75 ? 'Świetnie się dopasowujecie! 💕' :
                                   'Jest chemia! 💗';
    result.innerHTML = `
      <div class="love-meter"><div class="love-meter-fill" id="loveMeterFill" style="width:0%"></div></div>
      <p class="love-score">${score}%</p>
      <p class="love-msg">${messages}</p>
    `;
    setTimeout(() => {
      const fill = document.getElementById('loveMeterFill');
      if (fill) fill.style.width = score + '%';
    }, 50);

    unlockAchievement('game-tester');
    if (score === 100) unlockAchievement('game-tester-100');
  });
}

/* ============================================================================
   ❓ QUIZ
============================================================================ */
const QUIZ_DATA = {
  easy: [
    { q: "Jak nazywa się nasza strona?", a: ["Dla Ciebie", "Dla mnie", "Nasza", "Miłość"], correct: 0 },
    { q: "Kiedy się poznaliśmy?", a: ["25.09.2025", "01.01.2025", "14.02.2026", "25.12.2025"], correct: 0 },
    { q: "Jakie święto wymyśliliśmy 28.04.2026?", a: ["Złote Ksałosie", "Dzień Miłości", "Walentynki", "Dzień Psa"], correct: 0 },
    { q: "Kiedy są moje urodziny?", a: ["13.03.2010", "11.08.2006", "25.09.2025", "14.02.2026"], correct: 0 },
    { q: "Co przygotowałem Ci na pierwsze walentynki?", a: ["Mini kolaż zdjęć", "Kwiaty", "Kolację", "Bransoletkę"], correct: 0 }
  ],
  medium: [
    { q: "Kiedy powstała organizacja Biały Protokół?", a: ["05.01.2026", "24.11.2025", "13.06.2026", "30.01.2026"], correct: 0 },
    { q: "Gdzie było nasze pierwsze spotkanie?", a: ["Na dachu budynku (jako stróżka)", "Na celach", "Na mechaniku", "Na szpitalu"], correct: 0 },
    { q: "Jakiego koloru są moje oczy?", a: ["Błękitne", "Szare", "Zielone", "Brązowe"], correct: 0 },
    { q: "Kiedy są Twoje urodziny?", a: ["11.08.2006", "13.03.2010", "25.09.2025", "05.03.2026"], correct: 0 },
    { q: "Kiedy była akcja „drut kolczasty”?", a: ["21.01.2026", "14.02.2026", "05.03.2026", "28.04.2026"], correct: 0 }
  ],
  hard: [
    { q: "Co najbardziej we mnie kochasz?", a: ["Wszystko", "Oczy", "Charakter", "Głos"], correct: 0 },
    { q: "Kiedy są Twoje imieniny (pierwsze wspólne)?", a: ["05.03.2026", "11.08.2026", "25.09.2026", "14.02.2026"], correct: 0 },
    { q: "Ile lat razem będziemy świętować w 2026?", a: ["1 rok", "2 lata", "3 lata", "Pół roku"], correct: 0 },
    { q: "Jaki kod otwiera tę stronę?", a: [SECRET_CODE, "1234", "2025", "2510"], correct: 0 },
    { q: "Co jest w sekcji „Alfabet”?", a: ["Memowy filmik z alfabetem", "Zdjęcia", "Piosenki", "Quiz"], correct: 0 }
  ]
};

function initQuiz() {
  let currentLevel = 'easy';
  let current = 0, score = 0, answered = false;
  const qEl = document.getElementById('quizQuestion');
  const aEl = document.getElementById('quizAnswers');
  const fbEl = document.getElementById('quizFeedback');
  const progEl = document.getElementById('quizProgress');
  const restartBtn = document.getElementById('quizRestart');
  const bestEl = document.getElementById('quizBest');
  const levelBtns = document.querySelectorAll('.quiz-level-btn');
  if (!qEl || !aEl || !fbEl || !progEl) return;

  function getBest() { return parseInt(localStorage.getItem('quizBest_' + currentLevel) || '0', 10); }
  function setBest(v) { if (v > getBest()) localStorage.setItem('quizBest_' + currentLevel, v); if (bestEl) bestEl.textContent = getBest(); }
  if (bestEl) bestEl.textContent = getBest();

  function render() {
    answered = false;
    const questions = QUIZ_DATA[currentLevel];
    if (restartBtn) restartBtn.classList.add('hidden');
    if (current >= questions.length) {
      qEl.textContent = `Twój wynik: ${score} / ${questions.length} 💖`;
      aEl.innerHTML = '';
      fbEl.textContent = score === questions.length ? "Perfekcja! Znasz mnie na wylot 💕" : "Dobrze Ci idzie, Kochanie 💗";
      progEl.textContent = "Koniec quizu";
      if (restartBtn) restartBtn.classList.remove('hidden');
      setBest(score);

      state.quizFinished[currentLevel] = true;
      if (score === questions.length) unlockAchievement('game-quiz-perfect');
      if (currentLevel === 'easy') unlockAchievement('game-quiz-easy');
      if (currentLevel === 'medium') unlockAchievement('game-quiz-medium');
      if (currentLevel === 'hard') unlockAchievement('game-quiz-hard');
      return;
    }
    const q = questions[current];
    progEl.textContent = `Pytanie ${current + 1} / ${questions.length} (${currentLevel === 'easy' ? 'łatwy' : currentLevel === 'medium' ? 'średni' : 'trudny'})`;
    qEl.textContent = q.q;
    fbEl.textContent = '';
    aEl.innerHTML = '';

    const order = q.a.map((_, i) => i).sort(() => Math.random() - 0.5);
    order.forEach(i => {
      const btn = document.createElement('button');
      btn.className = 'quiz-answer';
      btn.textContent = q.a[i];
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        if (i === q.correct) { btn.classList.add('correct'); score++; fbEl.textContent = "Dobrze! 💖"; }
        else {
          btn.classList.add('wrong');
          [...aEl.children].forEach((c, idx) => { if (order[idx] === q.correct) c.classList.add('correct'); });
          fbEl.textContent = "Prawie! 💗";
        }
        setTimeout(() => { current++; render(); }, 1300);
      });
      aEl.appendChild(btn);
    });
  }

  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLevel = btn.dataset.level;
      levelBtns.forEach(b => b.classList.toggle('active', b === btn));
      current = 0; score = 0;
      if (bestEl) bestEl.textContent = getBest();
      render();
    });
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => { current = 0; score = 0; render(); });
  }
  render();
}

/* ============================================================================
   🎁 PREZENTY
============================================================================ */
function initGifts() {
  const gifts = document.querySelectorAll('.gift');
  let openedInSession = 0;
  gifts.forEach(g => {
    g.addEventListener('click', () => {
      if (g.classList.contains('opened')) return;
      g.classList.add('opened');
      g.textContent = g.dataset.message;
      const rect = g.getBoundingClientRect();
      burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
      openedInSession++;
      state.giftsOpened++;
      localStorage.setItem('giftsOpened', state.giftsOpened);
      if (openedInSession >= gifts.length || state.giftsOpened >= 6) {
        unlockAchievement('game-gifts-all');
      }
    });
  });
}

/* ============================================================================
   🖼️ 3D TILT / LIGHTBOX
============================================================================ */
function initTiltCards() {
  if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.photo.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * -20;
      const ry = ((x - r.width / 2) / r.width) * 20;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lb || !img || !closeBtn) return;

  document.querySelectorAll('.photo img, .carousel-slide img').forEach(im => {
    im.addEventListener('click', () => {
      img.src = im.src;
      img.alt = im.alt || 'Powiększone zdjęcie';
      lb.classList.remove('hidden');
      unlockAchievement('int-gallery-zoom');
    });
  });
  closeBtn.addEventListener('click', () => lb.classList.add('hidden'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.add('hidden'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.classList.contains('hidden')) lb.classList.add('hidden'); });
}

/* ============================================================================
   🎉 NIESPODZIANKA
============================================================================ */
function initSurprise() {
  const btn = document.getElementById('surpriseBtn');
  const sc = document.getElementById('surpriseContent');
  if (!btn || !sc) return;
  btn.addEventListener('click', () => {
    sc.classList.toggle('hidden');
    if (!sc.classList.contains('hidden')) {
      burstConfetti();
      unlockAchievement('int-surprise');
    }
  });
}

/* ============================================================================
   🎵 MUZYKA / MOTYW
============================================================================ */
function initMusic() {
  const musicBtn = document.getElementById('musicToggle');
  const music = document.getElementById('bgMusic');
  if (!musicBtn || !music) return;
  music.volume = 0.4;

  musicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.textContent = '⏸️';
        unlockAchievement('mood-music-on');
      }).catch(() => {
        showToast('Dodaj plik img/muzyka.mp3, aby odtworzyć muzykę 🎵', 'ℹ️');
      });
    } else {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '🎵';
    }
  });
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const savedTheme = localStorage.getItem('theme') || CFG.theme?.defaultMode || 'day';
  if (savedTheme === 'night') {
    document.body.classList.add('night');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    btn.textContent = isNight ? '☀️' : '🌙';
    localStorage.setItem('theme', isNight ? 'night' : 'day');
    if (isNight) {
      unlockAchievement('mood-dark-mode');
      unlockAchievement('mood-night-owl');
    } else {
      unlockAchievement('mood-day-mode');
    }
  });
}

/* ============================================================================
   🎯 PRZYCISKI AKCJI (HERO) I KARTY POWODÓW
============================================================================ */
function initButtons() {
  const loveBtn = document.getElementById('loveBtn');
  const loveCounter = document.getElementById('loveCounter');
  if (loveBtn && loveCounter) {
    loveBtn.addEventListener('click', e => {
      state.loveCount++;
      loveCounter.textContent = `Kliknięcia: ${state.loveCount} 💖`;
      localStorage.setItem('statsLove', state.loveCount);
      burstHearts(e.clientX, e.clientY);
      if (navigator.vibrate) navigator.vibrate(50);

      const statsLoveEl = document.getElementById('statsLove');
      if (statsLoveEl) statsLoveEl.textContent = state.loveCount;

      unlockAchievement('int-love-btn');
      if (state.loveCount >= 50) unlockAchievement('int-love-50');
      if (state.loveCount >= 250) unlockAchievement('int-love-250');
    });
  }

  const fireworksBtn = document.getElementById('fireworksBtn');
  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) setTimeout(() => burstConfetti(), i * 280);
      unlockAchievement('int-fireworks');
    });
  }

  const scrollTopBtn = document.getElementById('backToTop');
  if (scrollTopBtn) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      unlockAchievement('int-scroll-top');
    });
  }

  const reasonCards = document.querySelectorAll('.reason-card');
  reasonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      const flippedCount = document.querySelectorAll('.reason-card.flipped').length;
      if (flippedCount === reasonCards.length) {
        unlockAchievement('rel-all-reasons');
      }
    });
  });
}

/* ============================================================================
   🎮 MINIGRA
============================================================================ */
function initMinigame() {
  const area = document.getElementById('gameArea');
  const scoreEl = document.getElementById('gameScore');
  const timeEl = document.getElementById('gameTime');
  const startBtn = document.getElementById('gameStartBtn');
  if (!area || !scoreEl || !timeEl || !startBtn) return;

  let playing = false, score = 0, timeLeft = 20;
  let heartInterval, timerInterval;

  function spawnHeart() {
    if (!playing) return;
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['💖', '💕', '💗', '💘'][Math.floor(Math.random() * 4)];
    const x = Math.random() * Math.max(20, area.clientWidth - 45);
    heart.style.left = x + 'px';
    heart.style.top = '-40px';
    area.appendChild(heart);

    let y = -40;
    const speed = 2.2 + Math.random() * 2.2;
    const fall = setInterval(() => {
      if (!playing) { clearInterval(fall); heart.remove(); return; }
      y += speed;
      heart.style.top = y + 'px';
      if (y > area.clientHeight) { clearInterval(fall); heart.remove(); }
    }, 30);

    heart.addEventListener('click', () => {
      if (!playing) return;
      score++;
      scoreEl.textContent = score;
      heart.remove();
      clearInterval(fall);
    });
  }

  startBtn.addEventListener('click', () => {
    if (playing) return;
    playing = true;
    score = 0; timeLeft = 20;
    scoreEl.textContent = '0';
    timeEl.textContent = '20';
    area.innerHTML = '';
    unlockAchievement('game-catch-start');

    heartInterval = setInterval(spawnHeart, 650);
    timerInterval = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        playing = false;
        clearInterval(heartInterval);
        clearInterval(timerInterval);
        area.innerHTML = '';
        const end = document.createElement('p');
        end.style.cssText = 'text-align:center;padding-top:140px;font-size:1.7rem;color:var(--pink);font-family:"Dancing Script",cursive;';
        end.textContent = `Koniec! Wynik: ${score} 💖`;
        area.appendChild(end);

        if (score >= 15) unlockAchievement('game-catch-15');
        if (score >= 30) unlockAchievement('game-catch-30');
      }
    }, 1000);
  });
}

/* ============================================================================
   📜 SCROLL OBSERVER I ŚLEDZENIE WIDEO
============================================================================ */
function initScrollObserver() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!reduceMotion) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
        if (e.target.id === 'letter') unlockAchievement('rel-letter');
        if (e.target.id === 'timeline') unlockAchievement('rel-timeline');
        if (e.target.id === 'spotify') unlockAchievement('mood-spotify');
        if (e.target.id === 'loveWeather') unlockAchievement('mood-weather');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section, footer').forEach(el => {
    if (el.closest('.lock-screen') || el.closest('.hero')) return;
    if (!reduceMotion) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }
    obs.observe(el);
  });
}

function initVideoTracking() {
  ['mainVideo', 'alphabetVideo'].forEach(id => {
    const vid = document.getElementById(id);
    if (vid) {
      vid.addEventListener('play', () => unlockAchievement('int-video-watch'));
    }
  });
}

/* ============================================================================
   💬 WSPOMNIENIA / KAPSUŁA / POGODA
============================================================================ */
function initMemoryWall() {
  const titleEl = document.getElementById('memoryTitle');
  const textEl = document.getElementById('memoryText');
  const addBtn = document.getElementById('memoryAdd');
  const listEl = document.getElementById('memoryList');
  if (!addBtn || !listEl) return;

  function load() {
    let memories = [];
    try { memories = JSON.parse(localStorage.getItem('memoryWall') || '[]'); } catch (e) {}
    if (!Array.isArray(memories)) memories = [];
    listEl.innerHTML = '';
    if (memories.length === 0) {
      listEl.innerHTML = '<p class="memory-empty">Brak wspomnień — dodaj pierwsze! 💖</p>';
      return;
    }
    memories.slice().reverse().forEach((m, idx) => {
      const realIdx = memories.length - 1 - idx;
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.innerHTML = `
        <h4>${escapeHtml(m.title)}</h4>
        <p>${escapeHtml(m.text)}</p>
        <div class="memory-meta">
          <small>${new Date(m.date).toLocaleDateString('pl-PL')}</small>
          <div class="memory-actions">
            <button class="memory-share" data-idx="${realIdx}" title="Udostępnij">📤</button>
            <button class="memory-del" data-idx="${realIdx}" title="Usuń">🗑️</button>
          </div>
        </div>
      `;
      listEl.appendChild(card);
    });

    listEl.querySelectorAll('.memory-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.idx, 10);
        let arr = [];
        try { arr = JSON.parse(localStorage.getItem('memoryWall') || '[]'); } catch (e) {}
        arr.splice(i, 1);
        localStorage.setItem('memoryWall', JSON.stringify(arr));
        load();
      });
    });

    listEl.querySelectorAll('.memory-share').forEach(btn => {
      btn.addEventListener('click', async () => {
        const i = parseInt(btn.dataset.idx, 10);
        let arr = [];
        try { arr = JSON.parse(localStorage.getItem('memoryWall') || '[]'); } catch (e) {}
        const m = arr[i];
        if (!m) return;
        const text = `${m.title} — ${m.text}`;
        try {
          if (navigator.share) await navigator.share({ title: m.title, text });
          else { await navigator.clipboard.writeText(text); showToast('Wspomnienie skopiowane! 📋', '🔗'); }
        } catch (e) {}
      });
    });
  }

  addBtn.addEventListener('click', () => {
    const title = (titleEl.value || '').trim();
    const text = (textEl.value || '').trim();
    if (!title || !text) { showToast('Wpisz tytuł i treść 💕', '⚠️'); return; }
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem('memoryWall') || '[]'); } catch (e) {}
    if (!Array.isArray(arr)) arr = [];
    arr.push({ title, text, date: Date.now() });
    localStorage.setItem('memoryWall', JSON.stringify(arr));
    titleEl.value = ''; textEl.value = '';
    load();
    showToast('Wspomnienie dodane! 💖', '💬');

    state.memoryCount = arr.length;
    localStorage.setItem('memoryCount', state.memoryCount);
    unlockAchievement('int-memory-add');
    if (state.memoryCount >= 5) unlockAchievement('int-memory-5');
  });
  load();
}

function initTimeCapsule() {
  const titleEl = document.getElementById('capsuleTitle');
  const textEl = document.getElementById('capsuleText');
  const dateEl = document.getElementById('capsuleDate');
  const addBtn = document.getElementById('capsuleAdd');
  const listEl = document.getElementById('capsuleList');
  if (!addBtn || !listEl) return;

  if (dateEl) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateEl.min = tomorrow.toISOString().split('T')[0];
  }

  function load() {
    let capsules = [];
    try { capsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]'); } catch (e) {}
    if (!Array.isArray(capsules)) capsules = [];
    listEl.innerHTML = '';
    if (capsules.length === 0) {
      listEl.innerHTML = '<p class="memory-empty">Brak kapsuł — zakop pierwszą! 🕰️</p>';
      return;
    }
    const now = Date.now();
    capsules.slice().reverse().forEach(c => {
      const openTime = new Date(c.openDate).getTime();
      const isOpen = now >= openTime;
      const card = document.createElement('div');
      card.className = 'capsule-card' + (isOpen ? ' open' : ' locked');
      if (isOpen) {
        card.innerHTML = `<h4>🔓 ${escapeHtml(c.title)}</h4><p>${escapeHtml(c.text)}</p><small>Otwarto: ${new Date(c.openDate).toLocaleDateString('pl-PL')}</small>`;
      } else {
        const days = Math.ceil((openTime - now) / 86400000);
        card.innerHTML = `<h4>🔒 ${escapeHtml(c.title)}</h4><p class="capsule-locked-msg">Otworzy się za ${days} dni (${new Date(c.openDate).toLocaleDateString('pl-PL')})</p><small>Zakopano: ${new Date(c.createdDate).toLocaleDateString('pl-PL')}</small>`;
      }
      listEl.appendChild(card);
    });
  }

  addBtn.addEventListener('click', () => {
    const title = (titleEl.value || '').trim();
    const text = (textEl.value || '').trim();
    const openDate = dateEl.value;
    if (!title || !text || !openDate) { showToast('Wypełnij wszystkie pola 💕', '⚠️'); return; }
    if (new Date(openDate).getTime() <= Date.now()) { showToast('Data musi być w przyszłości 🕰️', '⚠️'); return; }
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem('timeCapsules') || '[]'); } catch (e) {}
    if (!Array.isArray(arr)) arr = [];
    arr.push({ title, text, openDate, createdDate: Date.now() });
    localStorage.setItem('timeCapsules', JSON.stringify(arr));
    titleEl.value = ''; textEl.value = ''; dateEl.value = '';
    load();
    showToast('Kapsuła zakopana! 🕰️', '💌');

    state.capsuleCount = arr.length;
    localStorage.setItem('capsuleCount', state.capsuleCount);
    unlockAchievement('int-capsule-bury');
  });
  load();
  setInterval(load, 60000);
}

function initLoveWeather() {
  const iconEl = document.getElementById('weatherIcon');
  const textEl = document.getElementById('weatherText');
  const tempEl = document.getElementById('weatherTemp');
  if (!iconEl || !textEl || !tempEl) return;

  function update() {
    const now = new Date();
    const h = now.getHours();
    const day = now.getDay();
    let icon, text, temp;
    if (h >= 6 && h < 12) { icon = '🌅'; text = 'Poranek pełen miłości!'; temp = '95° miłości'; }
    else if (h >= 12 && h < 18) { icon = '☀️'; text = 'Słońce miłości świeci pełną mocą!'; temp = '100° miłości'; }
    else if (h >= 18 && h < 22) { icon = '🌇'; text = 'Zachód słońca z Tobą to magia.'; temp = '98° miłości'; }
    else { icon = '🌙'; text = 'Noc pełna marzeń o Tobie.'; temp = '99° miłości'; }
    if (day === 0 || day === 6) { icon = '🌈'; text = 'Weekend z Tobą — tęcza miłości!'; temp = '105° miłości'; }
    iconEl.textContent = icon;
    textEl.textContent = text;
    tempEl.textContent = temp;
    iconEl.classList.remove('weather-bounce');
    void iconEl.offsetWidth;
    iconEl.classList.add('weather-bounce');
  }
  update();
  setInterval(update, 60000);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ============================================================================
   🎮 EASTER EGG (KONAMI CODE)
============================================================================ */
(function konami() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === seq[pos] || e.key.toLowerCase() === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        for (let i = 0; i < 8; i++) setTimeout(burstConfetti, i * 200);
        showToast('🎉 Sekretna niespodzianka! Kocham Cię! 💖', '🎮');
        unlockAchievement('sec-konami');
      }
    } else { pos = 0; }
  });
})();