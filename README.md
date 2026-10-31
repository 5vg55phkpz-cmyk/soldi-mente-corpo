const STORAGE_KEY = 'life-dashboard-state-v1';

const initialState = {
  monthProgress: 76,
  money: {
    income: 2450,
    expense: 1780,
    saving: 670,
    gain: 320,
    goal: 83,
  },
  focus: 82,
  steps: 7842,
  mind: [
    { label: 'Meditazione 15 min', color: 'dot-emerald' },
    { label: 'Lettura 20 min', color: 'dot-gold' },
    { label: 'Nessuna distrazione', color: 'dot-blue' },
  ],
  body: [
    { label: 'Allenamento 45 min', color: 'dot-red' },
    { label: 'Sonno 7h 20m', color: 'dot-violet' },
    { label: 'Idratazione ok', color: 'dot-cyan' },
  ],
  priorities: [
    { title: 'Risparmio mensile', detail: '€200 da versare', value: '80%' },
    { title: 'Sessione di lettura', detail: '20 minuti prima di dormire', value: '90%' },
    { title: 'Allenamento cardio', detail: '30 minuti e stretching', value: '65%' },
  ],
  trend: [48, 58, 64, 72, 81, 76, 90],
  labels: ['L', 'M', 'M', 'G', 'V', 'S', 'D'],
};

const state = loadState();

const summaryCards = [
  { label: 'Saldo', value: `€${state.money.saving.toLocaleString('it-IT')}`, delta: `+€${state.money.gain}`, tone: 'green' },
  { label: 'Focus', value: `${state.focus}%`, delta: '+8%', tone: 'blue' },
  { label: 'Allenamenti', value: '4/5', delta: '+1', tone: 'yellow' },
  { label: 'Sonno', value: '7h20m', delta: '+35m', tone: 'green' },
];

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(initialState);

  try {
    return { ...structuredClone(initialState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderSummaryCards() {
  document.getElementById('summaryCards').innerHTML = summaryCards
    .map(
      (item) => `
        <article class="summary-card">
          <p class="label">${item.label}</p>
          <div class="value">
            <h3>${item.value}</h3>
            <span class="delta ${item.tone}">${item.delta}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderMindList() {
  const container = document.getElementById('mindList');
  container.innerHTML = state.mind
    .map(
      (item) => `
        <li>
          <span class="dot ${item.color}"></span>
          ${item.label}
        </li>
      `
    )
    .join('');
}

function renderBodyList() {
  const container = document.getElementById('bodyList');
  container.innerHTML = state.body
    .map(
      (item) => `
        <li>
          <span class="dot ${item.color}"></span>
          ${item.label}
        </li>
      `
    )
    .join('');
}

function renderPriorityList() {
  const container = document.getElementById('priorityList');
  container.innerHTML = state.priorities
    .map(
      (item) => `
        <div class="priority-item">
          <div class="priority-main">
            <span class="priority-badge"></span>
            <div>
              <p>${item.title}</p>
              <small>${item.detail}</small>
            </div>
          </div>
          <span class="priority-value">${item.value}</span>
        </div>
      `
    )
    .join('');
}

function renderTrendChart() {
  const container = document.getElementById('trendChart');
  container.innerHTML = state.trend
    .map(
      (value, index) => `
        <div class="chart-bar" style="height: ${value}%" data-label="${state.labels[index]}"></div>
      `
    )
    .join('');
}

function renderMoney() {
  document.getElementById('moneyGainTag').textContent = `+€${state.money.gain}`;
  document.getElementById('incomeValue').textContent = `€${state.money.income.toLocaleString('it-IT')}`;
  document.getElementById('expenseValue').textContent = `€${state.money.expense.toLocaleString('it-IT')}`;
  document.getElementById('savingValue').textContent = `€${state.money.saving.toLocaleString('it-IT')}`;

  const incomePct = Math.min((state.money.income / 3500) * 100, 100);
  const expensePct = Math.min((state.money.expense / 3000) * 100, 100);
  const goalPct = Math.min(state.money.goal, 100);

  document.getElementById('incomeBar').style.width = `${incomePct}%`;
  document.getElementById('expenseBar').style.width = `${expensePct}%`;
  document.getElementById('goalBar').style.width = `${goalPct}%`;
}

function renderMental() {
  document.getElementById('focusTag').textContent = `${state.focus}/100`;
}

function renderBody() {
  document.getElementById('stepsTag').textContent = `${state.steps.toLocaleString('it-IT')} passi`;
}

function renderMonthStatus() {
  document.getElementById('monthProgressValue').textContent = `${state.monthProgress}%`;
  document.getElementById('monthProgressBar').style.width = `${state.monthProgress}%`;
  document.getElementById('monthProgressText').textContent = `+12% rispetto al mese scorso`;
}

function renderAll() {
  renderSummaryCards();
  renderMoney();
  renderMindList();
  renderBodyList();
  renderPriorityList();
  renderTrendChart();
  renderMonthStatus();
  renderMental();
  renderBody();
}

function randomizeDashboard() {
  state.money.income = 2300 + Math.floor(Math.random() * 800);
  state.money.expense = 1650 + Math.floor(Math.random() * 600);
  state.money.saving = state.money.income - state.money.expense + 150;
  state.money.gain = 280 + Math.floor(Math.random() * 200);
  state.money.goal = 70 + Math.floor(Math.random() * 30);
  state.focus = 78 + Math.floor(Math.random() * 18);
  state.steps = 7200 + Math.floor(Math.random() * 2800);
  state.monthProgress = 70 + Math.floor(Math.random() * 20);
  state.trend = state.trend.map((value) => Math.min(96, Math.max(35, value + (Math.random() > 0.5 ? 8 : -7))));
  saveState();
  renderAll();
}

document.getElementById('refreshDataBtn').addEventListener('click', randomizeDashboard);

document.querySelectorAll('.nav-item').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

renderAll();







































































