/* ============================================================
   🔧 USTAWIENIA — ZMIEŃ TUTAJ
============================================================ */
const SECRET_CODE = "4016";
const RELATIONSHIP_START = "2025-09-25T18:00:00";
const ANNIVERSARY_MONTH = 9;
const ANNIVERSARY_DAY = 25;

/* ============================================================
   🔐 BRAMKA
============================================================ */
const lockScreen  = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const codeInput   = document.getElementById('codeInput');
const unlockBtn   = document.getElementById('unlockBtn');
const lockMessage = document.getElementById('lockMessage');

codeInput.addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

function tryUnlock() {
  if (codeInput.value.trim() === SECRET_CODE) {
    lockMessage.textContent = "Udało się! Witaj w moim świecie 💖";
    lockMessage.className = "lock-message success";
    playDing();
    setTimeout(() => {
      lockScreen.classList.add('unlocked');
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
      document.body.style.overflow = 'auto';
      initMainPage();
    }, 700);
  } else {
    lockMessage.textContent = "Spróbuj jeszcze raz, Kochanie 💗";
    lockMessage.className = "lock-message error";
    codeInput.classList.add('shake');
    setTimeout(() => codeInput.classList.remove('shake'), 500);
    codeInput.value = '';
    codeInput.focus();
    if (navigator.vibrate) navigator.vibrate(200);
  }
}
unlockBtn.addEventListener('click', tryUnlock);
codeInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
document.body.style.overflow = 'hidden';

/* ============================================================
   🎵 DŹWIĘK "DING"
============================================================ */
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

/* ============================================================
   💖 INICJALIZACJA
============================================================ */
function initMainPage() {
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
  initEnvelope();
  initSurprise();
  initMusic();
  initThemeToggle();
  initButtons();
  initMinigame();
  initScrollObserver();
  initStats();
  initHamburger();
}

/* ---------- Hamburger Menu ---------- */
function initHamburger() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Zamknij menu po kliknięciu linku
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Zamknij menu po kliknięciu poza nim
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* ---------- Data w stopce ---------- */
function setDate() {
  const d = new Date();
  const el = document.getElementById('date');
  if (el) {
    el.textContent = 'Dzisiaj jest: ' + d.toLocaleDateString('pl-PL', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}

/* ---------- Licznik czasu ---------- */
function startCounter() {
  const start = new Date(RELATIONSHIP_START).getTime();
  const els = {
    years:   document.getElementById('years'),
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function update() {
    const diff = Date.now() - start;

    // Obsługa przyszłej daty
    if (diff < 0) {
      Object.values(els).forEach(el => { if (el) el.textContent = '0'; });
      return;
    }

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr  = Math.floor(min / 60);
    const days = Math.floor(hr / 24);
    const years = Math.floor(days / 365.25);

    if (els.years)   els.years.textContent   = years;
    if (els.days)    els.days.textContent    = days % 365;
    if (els.hours)   els.hours.textContent   = hr % 24;
    if (els.minutes) els.minutes.textContent = min % 60;
    if (els.seconds) els.seconds.textContent = sec % 60;
  }
  update();
  setInterval(update, 1000);
}

/* ---------- Licznik do rocznicy ---------- */
function startAnniversaryCountdown() {
  const el = document.getElementById('annivCountdown');
  if (!el) return;

  function update() {
    const now = new Date();
    let next = new Date(now.getFullYear(), ANNIVERSARY_MONTH - 1, ANNIVERSARY_DAY);
    if (next <= now) {
      next = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH - 1, ANNIVERSARY_DAY);
    }
    const diff = next - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${d} dni, ${h} godz., ${m} min`;
  }
  update();
  setInterval(update, 60000);
}

/* ---------- Efekt pisania w hero ---------- */
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
    }
  }, 80);
}

/* ---------- Komplement dnia ---------- */
function showCompliment() {
  const compliments = [
    "Jesteś najpiękniejsza 💖",
    "Uwielbiam Twój uśmiech 😊",
    "Dziękuję, że jesteś 💕",
    "Jesteś moim szczęściem 🌟",
    "Kocham Cię nad życie 💗",
    "Jesteś wyjątkowa ✨",
    "Mój świat to Ty 💫",
    "Z Tobą wszystko jest lepsze 🌈",
    "Jesteś moim marzeniem 💭",
    "Na zawsze razem 💍"
  ];
  const el = document.getElementById('compliment');
  if (el) {
    el.textContent = compliments[Math.floor(Math.random() * compliments.length)];
  }
}

/* ============================================================
   ✨ CZĄSTECZKI (CANVAS)
============================================================ */
function initParticles() {
  const canvas = document.getElementById('particlesBg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const emojis = ['✨', '💖', '⭐', '💫', '🌸'];
  const PARTICLE_COUNT = Math.min(30, Math.floor(window.innerWidth / 50));

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * (w || window.innerWidth),
      y: Math.random() * (h || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 10 + Math.random() * 15,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      alpha: 0.3 + Math.random() * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
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

/* ============================================================
   ✨ SMUGA ZA KURSOREM
============================================================ */
function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const emojis = ['💖', '✨', '💕', '🌸', '⭐'];
  let lastTime = 0;
  let lastX = 0, lastY = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (now - lastTime < 40 || distance < 5) return;
    lastTime = now;
    lastX = e.clientX;
    lastY = e.clientY;

    const el = document.createElement('div');
    el.className = 'custom-cursor';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (e.clientX - 10) + 'px';
    el.style.top  = (e.clientY - 10) + 'px';
    el.style.fontSize = (12 + Math.random() * 10) + 'px';

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = -20 - Math.random() * 40;
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg) scale(0.3)`;
      el.style.opacity = '0';
      el.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';
    });

    setTimeout(() => el.remove(), 1000);
  });
}

/* ============================================================
   🎡 KARUZELA
============================================================ */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval;

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
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => goTo(currentIndex + 1), 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); startAutoplay(); });

  startAutoplay();

  // Swipe na mobile
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
    startAutoplay();
  }, { passive: true });
}

/* ============================================================
   🎡 KOŁO FORTUNY
============================================================ */
function initWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const items = [
    "Kocham Cię 💖", "Jesteś piękna 💕", "Moje szczęście 🌟",
    "Moja miłość 💗", "Mój świat 💫", "Na zawsze 💍",
    "Uwielbiam Cię 💞", "Jesteś wyjątkowa ✨"
  ];
  const colors = ['#ff5fa2', '#8a2be2', '#ffb347', '#43c59e', '#4b7be5', '#ff7b54', '#b565d8', '#e75480'];
  const slices = items.length;
  const angle = (Math.PI * 2) / slices;
  let rotation = 0;
  let spinning = false;

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
      ctx.fillText(items[i], radius - 10, 5);
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
      const duration = 4000;
      const t0 = performance.now();

      function animate(now) {
        const t = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 4);
        rotation = start + (end - start) * ease;
        draw();
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          const normalized = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const pointerAngle = (Math.PI * 1.5 - normalized + Math.PI * 2) % (Math.PI * 2);
          const idx = Math.floor(pointerAngle / angle);
          if (resultEl) resultEl.textContent = items[idx];
          spinning = false;
          burstHearts(window.innerWidth / 2, window.innerHeight / 2);
        }
      }
      requestAnimationFrame(animate);
    });
  }
}

/* ============================================================
   ❓ QUIZ
============================================================ */
function initQuiz() {
  const questions = [
    { q: "Kiedy powstała organizacja biały protokół?", a: ["05.01.2026", "24.11.2025", "13.06.2026", "30.01.2026"], correct: 0 },
    { q: "Gdzie było nasze pierwsze spotkanie?", a: ["Na celach", "Na dachu budynku (jako stróżka)", "Na mechaniku", "Na szpitalu"], correct: 1 },
    { q: "Jakiego koloru są moje oczy?", a: ["Szare", "Zielone", "Brązowe", "Błękitne"], correct: 3 },
    { q: "Co najbardziej we mnie kochasz?", a: ["Wszystko", "Oczy", "Charakter", "Głos"], correct: 0 },
    { q: "Kiedy mam urodziny?", a: ["13.02.2011", "13.03.2009", "13.04.2010", "13.03.2010"], correct: 3 }
  ];
  let current = 0, score = 0, answered = false;

  const qEl   = document.getElementById('quizQuestion');
  const aEl   = document.getElementById('quizAnswers');
  const fbEl  = document.getElementById('quizFeedback');
  const progEl = document.getElementById('quizProgress');

  if (!qEl || !aEl || !fbEl || !progEl) return;

  function render() {
    answered = false;

    if (current >= questions.length) {
      qEl.textContent = `Twój wynik: ${score} / ${questions.length} 💖`;
      aEl.innerHTML = '';
      fbEl.textContent = score === questions.length
        ? "Perfekcja! Znasz mnie na wylot 💕"
        : "Dobrze Ci idzie, Kochanie 💗";
      progEl.textContent = "Koniec quizu";
      return;
    }

    const q = questions[current];
    progEl.textContent = `Pytanie ${current + 1} / ${questions.length}`;
    qEl.textContent = q.q;
    fbEl.textContent = '';
    aEl.innerHTML = '';

    q.a.forEach((ans, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-answer';
      btn.textContent = ans;
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        if (i === q.correct) {
          btn.classList.add('correct');
          score++;
          fbEl.textContent = "Dobrze! 💖";
        } else {
          btn.classList.add('wrong');
          // Pokaż poprawną odpowiedź
          aEl.children[q.correct].classList.add('correct');
          fbEl.textContent = "Prawie! 💗";
        }
        setTimeout(() => { current++; render(); }, 1500);
      });
      aEl.appendChild(btn);
    });
  }
  render();
}

/* ============================================================
   🎁 PREZENTY
============================================================ */
function initGifts() {
  document.querySelectorAll('.gift').forEach(g => {
    g.addEventListener('click', () => {
      if (g.classList.contains('opened')) return;
      g.classList.add('opened');
      g.textContent = g.dataset.message;
      const rect = g.getBoundingClientRect();
      burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
}

/* ============================================================
   🖼️ 3D TILT
============================================================ */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.photo.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * -20;
      const ry = ((x - r.width / 2) / r.width) * 20;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   🖼️ LIGHTBOX
============================================================ */
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
    });
  });

  closeBtn.addEventListener('click', () => lb.classList.add('hidden'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.add('hidden'); });

  // Zamknij ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lb.classList.contains('hidden')) {
      lb.classList.add('hidden');
    }
  });
}

/* ============================================================
   💌 KOPERTA
============================================================ */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.addEventListener('click', function () {
      this.classList.toggle('open');
    });
  }
}

/* ============================================================
   🎉 NIESPODZIANKA
============================================================ */
function initSurprise() {
  const btn = document.getElementById('surpriseBtn');
  const sc = document.getElementById('surpriseContent');
  if (!btn || !sc) return;

  btn.addEventListener('click', () => {
    sc.classList.toggle('hidden');
    if (!sc.classList.contains('hidden')) burstConfetti();
  });
}

/* ============================================================
   🎵 MUZYKA
============================================================ */
function initMusic() {
  const musicBtn = document.getElementById('musicToggle');
  const music = document.getElementById('bgMusic');
  if (!musicBtn || !music) return;

  music.volume = 0.4;

  musicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play().catch(() => {});
      musicBtn.classList.add('playing');
      musicBtn.textContent = '⏸️';
    } else {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '🎵';
    }
  });
}

/* ============================================================
   🌙 TRYB DZIEŃ / NOC
============================================================ */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Zapamiętaj preferencję
  if (localStorage.getItem('theme') === 'night') {
    document.body.classList.add('night');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    btn.textContent = isNight ? '☀️' : '🌙';
    localStorage.setItem('theme', isNight ? 'night' : 'day');
  });
}

/* ============================================================
   🎯 PRZYCISKI AKCJI
============================================================ */
function initButtons() {
  let loveCount = parseInt(localStorage.getItem('statsLove') || '0');
  const loveBtn = document.getElementById('loveBtn');
  const loveCounter = document.getElementById('loveCounter');

  if (loveBtn && loveCounter) {
    loveCounter.textContent = `Kliknięcia: ${loveCount} 💖`;
    loveBtn.addEventListener('click', e => {
      loveCount++;
      loveCounter.textContent = `Kliknięcia: ${loveCount} 💖`;
      localStorage.setItem('statsLove', loveCount);
      burstHearts(e.clientX, e.clientY);
      if (navigator.vibrate) navigator.vibrate(50);

      const statsLoveEl = document.getElementById('statsLove');
      if (statsLoveEl) statsLoveEl.textContent = loveCount;
    });
  }

  const fireworksBtn = document.getElementById('fireworksBtn');
  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => burstConfetti(), i * 300);
      }
    });
  }

  const confettiBtn = document.getElementById('confettiBtn');
  if (confettiBtn) confettiBtn.addEventListener('click', burstConfetti);

  const heartRainBtn = document.getElementById('heartRainBtn');
  if (heartRainBtn) heartRainBtn.addEventListener('click', heartRain);

  const messageBtn = document.getElementById('messageBtn');
  if (messageBtn) {
    messageBtn.addEventListener('click', () => {
      const messages = [
        "Jesteś moim całym światem 💖",
        "Kocham Cię każdego dnia bardziej 💕",
        "Dziękuję, że jesteś przy mnie 💗",
        "Z Tobą wszystko jest możliwe 🌟",
        "Jesteś moim marzeniem 💫",
        "Na zawsze i o jeden dzień dłużej 💍"
      ];
      alert(messages[Math.floor(Math.random() * messages.length)]);
    });
  }

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const btt = document.getElementById('backToTop');
  if (btt) {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          btt.classList.toggle('visible', window.scrollY > 400);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ============================================================
   🎮 MINIGRA
============================================================ */
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
    const x = Math.random() * (area.clientWidth - 40);
    heart.style.left = x + 'px';
    heart.style.top = '-40px';
    area.appendChild(heart);

    let y = -40;
    const speed = 2 + Math.random() * 2;
    const fall = setInterval(() => {
      if (!playing) { clearInterval(fall); heart.remove(); return; }
      y += speed;
      heart.style.top = y + 'px';
      if (y > area.clientHeight) {
        clearInterval(fall);
        heart.remove();
      }
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

    heartInterval = setInterval(spawnHeart, 700);
    timerInterval = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        playing = false;
        clearInterval(heartInterval);
        clearInterval(timerInterval);
        area.innerHTML = `<p style="text-align:center;padding-top:${area.clientHeight / 2 - 20}px;font-size:1.5rem;color:#d63384;font-family:'Dancing Script',cursive;">Koniec! Wynik: ${score} 💖</p>`;

        // Zapis najlepszego wyniku
        const best = parseInt(localStorage.getItem('gameBest') || '0');
        if (score > best) {
          localStorage.setItem('gameBest', score);
          area.innerHTML += `<p style="text-align:center;font-size:1.2rem;color:#8a2be2;font-family:'Dancing Script',cursive;">Nowy rekord! 🏆</p>`;
        }
      }
    }, 1000);
  });
}

/* ============================================================
   📜 OBSERVER (pojawianie sekcji)
============================================================ */
function initScrollObserver() {
  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target); // Animuj tylko raz
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, footer').forEach(el => {
    if (el.closest('.lock-screen')) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    obs.observe(el);
  });
}

/* ============================================================
   📊 STATYSTYKI
============================================================ */
function initStats() {
  const visits = (parseInt(localStorage.getItem('visitCount') || '0')) + 1;
  localStorage.setItem('visitCount', visits);

  const visitEl = document.getElementById('visitCount');
  const statsEl = document.getElementById('statsLove');

  if (visitEl) visitEl.textContent = visits;
  if (statsEl) statsEl.textContent = localStorage.getItem('statsLove') || '0';
}

/* ============================================================
   💗 EFEKTY
============================================================ */
function createFloating(x, y, emoji, size, duration) {
  size = size || 24;
  duration = duration || 2000;

  const el = document.createElement('div');
  el.textContent = emoji;
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${size}px;pointer-events:none;z-index:9998;will-change:transform,opacity;transition:transform ${duration}ms ease-out, opacity ${duration}ms ease-out;`;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    const dx = (Math.random() - 0.5) * 300;
    const dy = -200 - Math.random() * 200;
    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720 - 360}deg)`;
    el.style.opacity = '0';
  });

  setTimeout(() => el.remove(), duration);
}

function burstHearts(x, y) {
  const emojis = ['💖', '💕', '💗', '💘', '❤️', '💝'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      createFloating(x, y, emojis[Math.floor(Math.random() * emojis.length)],
        20 + Math.random() * 20, 1500 + Math.random() * 1000);
    }, i * 40);
  }
}

function burstConfetti() {
  const emojis = ['🎉', '✨', '🎊', '💖', '🌟', '💫', '🌈', '⭐'];
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const x = cx + (Math.random() - 0.5) * 400;
      const y = cy + (Math.random() - 0.5) * 200;
      createFloating(x, y, emojis[Math.floor(Math.random() * emojis.length)],
        20 + Math.random() * 20, 2000 + Math.random() * 1500);
    }, i * 25);
  }
}

function heartRain() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const el = document.createElement('div');
      el.textContent = '💖';
      const duration = 3000 + Math.random() * 2000;
      el.style.cssText = `position:fixed;left:${x}px;top:-40px;font-size:${18 + Math.random() * 20}px;pointer-events:none;z-index:9998;will-change:transform;transition:transform ${duration}ms linear, opacity 3s;`;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 720}deg)`;
      });
      setTimeout(() => el.remove(), 5000);
    }, i * 60);
  }
}

/* ============================================================
   🎮 EASTER EGG — KONAMI
============================================================ */
(function konami() {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === seq[pos] || e.key.toLowerCase() === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        for (let i = 0; i < 10; i++) setTimeout(burstConfetti, i * 200);
        alert('🎉 Sekretna niespodzianka! Kocham Cię! 💖');
      }
    } else {
      pos = 0;
    }
  });
})();