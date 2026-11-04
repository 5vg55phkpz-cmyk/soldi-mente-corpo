const STORAGE_KEY = 'smc-auth-token';
const USER_KEY = 'smc-user-name';
let authMode = 'login';
let dashboardState = null;

const landing = document.getElementById('landing');
const authScreen = document.getElementById('authScreen');
const appShell = document.getElementById('appShell');
const authForm = document.getElementById('authForm');
const authMessage = document.getElementById('authMessage');
const userLabel = document.getElementById('userLabel');

/* ---------------- Helpers ---------------- */
const euro = (value) => `€${Number(value || 0).toLocaleString('it-IT')}`;

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function storage(action, key, value) {
  try {
    if (action === 'get') return localStorage.getItem(key);
    if (action === 'set') return localStorage.setItem(key, value);
    return localStorage.removeItem(key);
  } catch {
    return null;
  }
}

const getToken = () => storage('get', STORAGE_KEY);
const setToken = (token) => storage('set', STORAGE_KEY, token);
const clearToken = () => storage('remove', STORAGE_KEY);

function showMessage(message, isError = false) {
  authMessage.textContent = message;
  authMessage.className = `auth-message ${isError ? 'error' : 'ok'}`;
}

/* ---------------- Landing ---------------- */
const PROGRAMS = [
  {
    area: 'Soldi', title: 'Fondo emergenza', place: 'Risparmio guidato · 12 settimane',
    users: '4,2K', level: 'Base', price: 'Gratis',
    image: 'photo-1579621970563-ebec7560ff3e', tone: ['#2f7a5f', '#14263f']
  },
  {
    area: 'Mente', title: 'Mindfulness 21 giorni', place: 'Meditazione · 15 min al giorno',
    users: '3,8K', level: 'Base', price: 'Gratis',
    image: 'photo-1506126613408-eca07ce68773', tone: ['#3d6597', '#14263f']
  },
  {
    area: 'Corpo', title: 'Corpo in forma', place: 'Allenamento a casa · 8 settimane',
    users: '5,1K', level: 'Medio', price: '€ 9,90',
    image: 'photo-1571019613454-1cb2f99b2d8b', tone: ['#b8742a', '#14263f']
  },
  {
    area: 'Soldi', title: 'Budget zero stress', place: 'Spese e categorie · 4 settimane',
    users: '2,6K', level: 'Base', price: 'Gratis',
    image: 'photo-1554224155-6726b3ff858f', tone: ['#2f7a5f', '#1c3557']
  },
  {
    area: 'Mente', title: 'Lettura profonda', place: 'Focus · 20 min prima di dormire',
    users: '1,9K', level: 'Base', price: '€ 4,90',
    image: 'photo-1512820790803-83ca734da794', tone: ['#6d5bb8', '#14263f']
  },
  {
    area: 'Corpo', title: 'Primi 5 km', place: 'Corsa · 10 settimane',
    users: '3,3K', level: 'Medio', price: '€ 7,90',
    image: 'photo-1476480862126-209bfaa8edc8', tone: ['#c0573f', '#14263f']
  }
];

const GOALS = {
  soldi: ['Risparmiare di più', 'Ridurre le spese', 'Fondo emergenza'],
  mente: ['Più concentrazione', 'Meno stress', 'Leggere di più'],
  corpo: ['Rimettersi in forma', 'Dormire meglio', 'Camminare di più']
};

const icon = {
  users: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M17 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-5.6"/></svg>',
  level: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V14M10 20V9M16 20V4"/></svg>'
};

function renderPrograms() {
  const track = document.getElementById('programTrack');
  track.innerHTML = PROGRAMS.map((p) => `
    <button class="program-card" type="button" data-open-auth="register" aria-label="${esc(p.title)}: inizia il programma">
      <div class="program-photo" style="background-image:
        url('https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=700&q=75'),
        linear-gradient(140deg, ${p.tone[0]}, ${p.tone[1]});">
        <span class="area-chip">${esc(p.area)}</span>
      </div>
      <div class="program-meta">
        <span>${esc(p.place)}</span>
        <span>${icon.users}${p.users}</span>
        <span>${icon.level}${p.level}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="program-price">${esc(p.price)} <small>/ programma</small></p>
    </button>
  `).join('');
  setupDots(track);
}

function setupDots(track) {
  const dots = document.getElementById('programDots');

  const pageCount = () => Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth - 0.05));

  const build = () => {
    const pages = pageCount();
    dots.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button type="button" role="tab" aria-label="Pagina ${i + 1}" data-page="${i}"></button>`
    ).join('');
    dots.hidden = pages < 2;
    sync();
  };

  const sync = () => {
    const pages = pageCount();
    const max = track.scrollWidth - track.clientWidth;
    const index = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (pages - 1));
    dots.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
  };

  dots.addEventListener('click', (event) => {
    const page = event.target.closest('button')?.dataset.page;
    if (page === undefined) return;
    track.scrollTo({ left: Number(page) * track.clientWidth, behavior: 'smooth' });
  });

  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  window.addEventListener('resize', build);
  build();
}

function fillGoals(area) {
  document.getElementById('finderGoal').innerHTML = GOALS[area]
    .map((goal) => `<option>${esc(goal)}</option>`)
    .join('');
}

function initLanding() {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderPrograms();

  const finder = document.getElementById('finder');
  fillGoals(finder.area.value);
  finder.area.addEventListener('change', () => fillGoals(finder.area.value));
  finder.addEventListener('submit', (event) => {
    event.preventDefault();
    openAuth('register', `Ottima scelta: ${finder.goal.value.toLowerCase()}. Crea l'account per iniziare.`);
  });

  document.getElementById('heroSearch').addEventListener('submit', (event) => {
    event.preventDefault();
    const q = event.target.q.value.trim().toLowerCase();
    const area = Object.keys(GOALS).find((key) => q.includes(key)) || 'soldi';
    finder.area.value = area;
    fillGoals(area);
    document.getElementById('programmi').scrollIntoView({ behavior: 'smooth' });
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.site-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a === event.target));
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-auth]');
    if (!trigger) return;
    event.preventDefault();
    openAuth(trigger.dataset.openAuth);
  });

  document.getElementById('authClose').addEventListener('click', closeAuth);
  authScreen.addEventListener('click', (event) => {
    if (event.target === authScreen) closeAuth();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !authScreen.classList.contains('hidden')) closeAuth();
  });
}

function openAuth(mode = 'login', message = '') {
  setAuthMode(mode);
  authMessage.textContent = message;
  authMessage.className = 'auth-message ok';
  authScreen.classList.remove('hidden');
  authForm.username.focus();
}

function closeAuth() {
  authScreen.classList.add('hidden');
}

function showLanding() {
  appShell.classList.add('hidden');
  landing.classList.remove('hidden');
}

function showApp() {
  closeAuth();
  landing.classList.add('hidden');
  appShell.classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* ---------------- Auth & API ---------------- */
function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  const isRegister = mode === 'register';
  authForm.querySelector('button[type="submit"]').textContent = isRegister ? 'Crea account' : 'Entra';
  authForm.password.autocomplete = isRegister ? 'new-password' : 'current-password';
}

async function request(url, options = {}, requireAuth = true) {
  const headers = { ...(options.headers || {}), 'Content-Type': 'application/json' };

  if (requireAuth) {
    const token = getToken();
    if (!token) throw new Error('Sessione scaduta, accedi di nuovo.');
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Errore di richiesta');
  return payload;
}

async function loginOrRegister(event) {
  event.preventDefault();
  const username = authForm.username.value.trim();
  const password = authForm.password.value;

  if (!username || !password) {
    showMessage('Inserisci username e password.', true);
    return;
  }

  try {
    const path = authMode === 'register' ? '/api/register' : '/api/login';
    const payload = await request(path, { method: 'POST', body: JSON.stringify({ username, password }) }, false);
    setToken(payload.token);
    storage('set', USER_KEY, payload.user.username);
    authForm.reset();
    await loadDashboard();
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function loadDashboard() {
  try {
    const payload = await request('/api/dashboard');
    dashboardState = payload.dashboard;
    userLabel.textContent = storage('get', USER_KEY) || 'Account';
    renderDashboard();
    showApp();
  } catch (error) {
    clearToken();
    showLanding();
    openAuth('login');
    showMessage(error.message, true);
  }
}

/* ---------------- Dashboard ---------------- */
function listItems(items) {
  return (items || []).map((item) => `
    <li><span class="dot ${esc(item.color)}"></span>${esc(item.label)}</li>
  `).join('');
}

function habitItems(items) {
  return items.map((item) => `
    <li class="habit-item"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></li>
  `).join('');
}

function renderDashboard() {
  if (!dashboardState) return;
  const data = dashboardState;
  const money = data.money || {};

  const summaryCards = [
    { label: 'Saldo', value: euro(money.saving), delta: `+${euro(money.gain)}`, tone: 'green' },
    { label: 'Focus', value: `${Number(data.focus || 0)}%`, delta: '+8%', tone: 'blue' },
    { label: 'Allenamenti', value: '4/5', delta: '+1', tone: 'yellow' },
    { label: 'Sonno', value: data.sleep || '7h 20m', delta: '+35m', tone: 'green' }
  ];

  document.getElementById('summaryCards').innerHTML = summaryCards.map((item) => `
    <article class="summary-card">
      <p class="label">${item.label}</p>
      <div class="value"><h3>${esc(item.value)}</h3><span class="delta ${item.tone}">${esc(item.delta)}</span></div>
    </article>
  `).join('');

  document.getElementById('moneyGainTag').textContent = `+${euro(money.gain)}`;
  document.getElementById('incomeValue').textContent = euro(money.income);
  document.getElementById('expenseValue').textContent = euro(money.expense);
  document.getElementById('savingValue').textContent = euro(money.saving);

  document.getElementById('incomeBar').style.width = `${Math.min(((money.income || 0) / 3500) * 100, 100)}%`;
  document.getElementById('expenseBar').style.width = `${Math.min(((money.expense || 0) / 3000) * 100, 100)}%`;
  document.getElementById('goalBar').style.width = `${Math.min(Number(money.goal || 80), 100)}%`;

  document.getElementById('focusTag').textContent = `${Number(data.focus || 0)}/100`;
  document.getElementById('stepsTag').textContent = `${Number(data.steps || 0).toLocaleString('it-IT')} passi`;
  document.getElementById('mindList').innerHTML = listItems(data.mind);
  document.getElementById('bodyList').innerHTML = listItems(data.body);

  document.getElementById('priorityList').innerHTML = (data.priorities || []).map((item) => `
    <div class="priority-item">
      <div class="priority-main">
        <span class="priority-badge"></span>
        <div><p>${esc(item.title)}</p><small>${esc(item.detail)}</small></div>
      </div>
      <span class="priority-value">${esc(item.value)}</span>
    </div>
  `).join('');

  const labels = data.labels || ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
  document.getElementById('trendChart').innerHTML = (data.trend || [48, 58, 64, 72, 81, 76, 90])
    .map((value, i) => `<div class="chart-bar" style="height:${Number(value)}%" data-label="${esc(labels[i])}"></div>`)
    .join('');

  const month = Number(data.monthProgress || 0);
  document.getElementById('monthProgressValue').textContent = `${month}%`;
  document.getElementById('monthProgressBar').style.width = `${month}%`;

  const budget = money.budget || 3300;
  const budgetUsed = Math.round(Math.min(((money.expense || 0) / budget) * 100, 100));
  document.getElementById('budgetDonut').style.setProperty('--progress', budgetUsed);
  document.getElementById('budgetDonutValue').textContent = `${budgetUsed}%`;
  document.getElementById('budgetContext').textContent = `${euro(money.expense)} / ${euro(budget)}`;

  const transactions = money.transactions || [];
  document.getElementById('transactionList').innerHTML = transactions.length
    ? transactions.slice(0, 6).map((entry) => `
      <li class="transaction-item ${entry.type === 'income' ? 'income' : 'expense'}">
        <div class="meta"><strong>${esc(entry.category)}</strong><small>${entry.type === 'income' ? 'Entrata' : 'Spesa'}</small></div>
        <span class="amount">${entry.type === 'income' ? '+' : '-'}${euro(entry.amount)}</span>
      </li>`).join('')
    : '<li class="muted">Nessun movimento ancora. Aggiungine uno qui sotto.</li>';

  document.getElementById('mindScoreValue').textContent = `${Number(data.focus || 0)}%`;
  document.getElementById('mindScoreBar').style.width = `${Number(data.focus || 0)}%`;
  const note = document.getElementById('dailyNote');
  if (document.activeElement !== note) note.value = data.dailyNote || '';
  document.getElementById('stepsDisplay').textContent = Number(data.steps || 0).toLocaleString('it-IT');
  document.getElementById('sleepDisplay').textContent = data.sleep || '7h 20m';

  document.getElementById('bodyActivities').innerHTML = habitItems([
    { label: 'Allenamento cardio', value: '45 min' },
    { label: 'Passeggiata mattutina', value: '30 min' },
    { label: 'Stretching serale', value: '10 min' }
  ]);
  document.getElementById('mindRoutineList').innerHTML = habitItems([
    { label: 'Meditazione guidata', value: '15 min' },
    { label: 'Lettura approfondita', value: '20 min' },
    { label: 'Hobby creativo', value: '30 min' }
  ]);

  document.getElementById('goalGrid').innerHTML = (data.goals || []).map((goal) => `
    <article class="goal-card">
      <div class="goal-card-header">
        <div><span class="goal-badge" style="background:${esc(goal.color)}"></span><h4>${esc(goal.name)}</h4></div>
        <span class="tag neutral">${Number(goal.progress)}%</span>
      </div>
      <div class="goal-progress"><span style="width:${Number(goal.progress)}%; background:${esc(goal.color)}"></span></div>
      <div class="goal-meta"><span>${esc(goal.amount)}</span><span>${Number(goal.target)}%</span></div>
    </article>
  `).join('');
}

async function updateDashboard(payload) {
  const data = await request('/api/dashboard', { method: 'POST', body: JSON.stringify(payload) });
  dashboardState = data.dashboard;
  renderDashboard();
}

async function addTransaction(event) {
  event.preventDefault();
  const form = event.target;
  const type = form.type.value;
  const category = form.category.value.trim();
  const amount = Number(form.amount.value);
  if (!category || !amount || amount <= 0) return;

  const data = await request('/api/transactions', {
    method: 'POST',
    body: JSON.stringify({ type, category, amount })
  });
  dashboardState = data.dashboard;
  renderDashboard();
  form.reset();
}

async function refreshData() {
  const minutes = Math.floor(Math.random() * 60);
  await updateDashboard({
    monthProgress: 68 + Math.floor(Math.random() * 22),
    focus: 78 + Math.floor(Math.random() * 18),
    steps: 7200 + Math.floor(Math.random() * 2800),
    sleep: `${6 + Math.floor(Math.random() * 2)}h ${String(minutes).padStart(2, '0')}m`,
    trend: Array.from({ length: 7 }, () => 35 + Math.floor(Math.random() * 55)),
    goals: (dashboardState?.goals || []).map((goal) => ({
      ...goal,
      progress: Math.min(100, Math.max(35, goal.progress + (Math.random() > 0.5 ? 8 : -6)))
    }))
  });
}

function logout() {
  clearToken();
  storage('remove', USER_KEY);
  dashboardState = null;
  showLanding();
  window.scrollTo(0, 0);
}

function initDashboardEvents() {
  authForm.addEventListener('submit', loginOrRegister);
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setAuthMode(btn.dataset.mode);
      authMessage.textContent = '';
    });
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach((btn) => btn.classList.toggle('active', btn === button));
      document.querySelectorAll('.view').forEach((section) => {
        section.classList.toggle('active', section.id === button.dataset.view);
      });
    });
  });

  document.getElementById('transactionForm').addEventListener('submit', (e) => addTransaction(e).catch(console.error));
  document.getElementById('refreshDataBtn').addEventListener('click', () => refreshData().catch(console.error));
  document.getElementById('logoutBtn').addEventListener('click', logout);

  const noteStatus = document.getElementById('noteStatus');
  let noteTimer;
  document.getElementById('dailyNote').addEventListener('input', (event) => {
    clearTimeout(noteTimer);
    noteStatus.textContent = 'Modifiche non salvate…';
    noteTimer = setTimeout(async () => {
      try {
        await updateDashboard({ dailyNote: event.target.value });
        noteStatus.textContent = 'Salvato';
      } catch {
        noteStatus.textContent = 'Errore nel salvataggio';
      }
    }, 600);
  });
}

async function bootstrap() {
  initLanding();
  initDashboardEvents();
  setAuthMode('login');

  if (getToken()) {
    try {
      const payload = await request('/api/me');
      storage('set', USER_KEY, payload.user.username);
      await loadDashboard();
    } catch {
      clearToken();
      showLanding();
    }
  }
}

bootstrap();
