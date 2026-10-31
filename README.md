const STORAGE_KEY = 'life-dashboard-advanced-v1';

const initialState = {
  monthProgress: 76,
  money: {
    income: 2450,
    expense: 1780,
    saving: 670,
    gain: 320,
    goal: 83,
    budget: 3300,
    transactions: [
      { type: 'income', category: 'Stipendio', amount: 2200 },
      { type: 'expense', category: 'Affitto', amount: 980 },
      { type: 'expense', category: 'Cibo', amount: 240 },
      { type: 'income', category: 'Freelance', amount: 480 },
    ],
  },
  focus: 82,
  steps: 7842,
  sleep: '7h 20m',
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
  dailyNote: '',
  goals: [
    { name: 'Fondo emergenza', progress: 72, target: 100, amount: '€5.400 / €7.500', color: '#34d399' },
    { name: 'Focus mentale', progress: 80, target: 100, amount: '16 / 20 sessioni', color: '#60a5fa' },
    { name: 'Fitness', progress: 68, target: 100, amount: '4 / 6 allenamenti', color: '#fbbf24' },
  ],
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(initialState);

  try {
    const parsed = JSON.parse(raw);
    return { ...structuredClone(initialState), ...parsed, money: { ...structuredClone(initialState.money), ...(parsed.money || {}) } };
  } catch {
    return structuredClone(initialState);
  }
}

const state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const summaryCards = [
  { label: 'Saldo', value: `€${state.money.saving.toLocaleString('it-IT')}`, delta: `+€${state.money.gain}`, tone: 'green' },
  { label: 'Focus', value: `${state.focus}%`, delta: '+8%', tone: 'blue' },
  { label: 'Allenamenti', value: '4/5', delta: '+1', tone: 'yellow' },
  { label: 'Sonno', value: state.sleep, delta: '+35m', tone: 'green' },
];

function renderOverview() {
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

  document.getElementById('focusTag').textContent = `${state.focus}/100`;
  document.getElementById('stepsTag').textContent = `${state.steps.toLocaleString('it-IT')} passi`;

  const mindList = document.getElementById('mindList');
  mindList.innerHTML = state.mind
    .map(
      (item) => `
        <li>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="dot ${item.color}"></span>
            ${item.label}
          </div>
        </li>
      `
    )
    .join('');

  const bodyList = document.getElementById('bodyList');
  bodyList.innerHTML = state.body
    .map(
      (item) => `
        <li>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="dot ${item.color}"></span>
            ${item.label}
          </div>
        </li>
      `
    )
    .join('');

  document.getElementById('priorityList').innerHTML = state.priorities
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

  document.getElementById('trendChart').innerHTML = state.trend
    .map(
      (value, index) => `
        <div class="chart-bar" style="height: ${value}%" data-label="${state.labels[index]}"></div>
      `
    )
    .join('');

  document.getElementById('monthProgressValue').textContent = `${state.monthProgress}%`;
  document.getElementById('monthProgressBar').style.width = `${state.monthProgress}%`;
  document.getElementById('monthProgressText').textContent = '+12% rispetto al mese scorso';
}

function renderMoneySection() {
  const budgetUsed = Math.min((state.money.expense / state.money.budget) * 100, 100);
  const donut = document.getElementById('budgetDonut');
  donut.style.setProperty('--progress', Math.round(budgetUsed));
  donut.style.setProperty('--accent', '#34d399');
  document.getElementById('budgetDonutValue').textContent = `${Math.round(budgetUsed)}%`;
  document.getElementById('budgetContext').textContent = `€${state.money.expense.toLocaleString('it-IT')} / €${state.money.budget.toLocaleString('it-IT')}`;

  const list = document.getElementById('transactionList');
  list.innerHTML = state.money.transactions
    .slice(0, 6)
    .map(
      (entry) => `
        <li class="transaction-item ${entry.type === 'income' ? 'income' : 'expense'}">
          <div class="meta">
            <strong>${entry.category}</strong>
            <small>${entry.type === 'income' ? 'Entrata' : 'Spesa'}</small>
          </div>
          <span class="amount">${entry.type === 'income' ? '+' : '-'}€${entry.amount.toLocaleString('it-IT')}</span>
        </li>
      `
    )
    .join('');
}

function renderMindSection() {
  const score = state.focus;
  const scoreBar = document.getElementById('mindScoreBar');
  scoreBar.style.width = `${score}%`;
  document.getElementById('mindScoreValue').textContent = `${score}%`;

  const routine = document.getElementById('mindRoutineList');
  routine.innerHTML = [
    { label: 'Meditazione guidata', value: '15 min' },
    { label: 'Lettura approfondita', value: '20 min' },
    { label: 'Hobby creativo', value: '30 min' },
  ]
    .map(
      (item) => `
        <li class="habit-item">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </li>
      `
    )
    .join('');

  const dailyNote = document.getElementById('dailyNote');
  dailyNote.value = state.dailyNote;
}

function renderBodySection() {
  document.getElementById('stepsDisplay').textContent = state.steps.toLocaleString('it-IT');
  document.getElementById('sleepDisplay').textContent = state.sleep;

  const activityList = document.getElementById('bodyActivities');
  activityList.innerHTML = [
    { label: 'Allenamento cardio', value: '45 min' },
    { label: 'Passeggiata mattutina', value: '30 min' },
    { label: 'Stretching serale', value: '10 min' },
  ]
    .map(
      (item) => `
        <li class="habit-item">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </li>
      `
    )
    .join('');
}

function renderGoals() {
  const goalGrid = document.getElementById('goalGrid');
  goalGrid.innerHTML = state.goals
    .map(
      (goal) => `
        <article class="goal-card">
          <div class="goal-card-header">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="goal-badge" style="background:${goal.color};"></span>
              <h4>${goal.name}</h4>
            </div>
            <span class="tag neutral">${goal.progress}%</span>
          </div>
          <div class="goal-progress">
            <span style="width:${goal.progress}%; background:${goal.color};"></span>
          </div>
          <div class="goal-meta">
            <span>${goal.amount}</span>
            <span>${goal.target}%</span>
          </div>
        </article>
      `
    )
    .join('');
}

function updateDailyNote() {
  state.dailyNote = document.getElementById('dailyNote').value;
  saveState();
}

function addTransaction(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const type = formData.get('type');
  const category = formData.get('category').toString().trim();
  const amount = Number(formData.get('amount'));

  if (!category || !amount || amount <= 0) return;

  state.money.transactions.unshift({
    type,
    category,
    amount,
  });

  if (type === 'income') {
    state.money.income += amount;
    state.money.saving += amount;
  } else {
    state.money.expense += amount;
    state.money.saving = state.money.income - state.money.expense;
  }

  state.money.gain = Math.max(220, state.money.gain + (type === 'income' ? 30 : -12));
  state.money.goal = Math.min(98, Math.max(62, state.money.goal + (type === 'income' ? 2 : -1)));
  saveState();
  form.reset();
  renderOverview();
  renderMoneySection();
}

function randomizeDashboard() {
  state.money.income = 2300 + Math.floor(Math.random() * 900);
  state.money.expense = 1650 + Math.floor(Math.random() * 700);
  state.money.saving = state.money.income - state.money.expense + 140;
  state.money.gain = 280 + Math.floor(Math.random() * 220);
  state.money.goal = 70 + Math.floor(Math.random() * 28);
  state.focus = 78 + Math.floor(Math.random() * 18);
  state.steps = 7200 + Math.floor(Math.random() * 2800);
  state.monthProgress = 68 + Math.floor(Math.random() * 22);
  state.trend = state.trend.map((value) => Math.min(95, Math.max(35, value + (Math.random() > 0.5 ? 8 : -7))));

  state.goals = state.goals.map((goal) => ({
    ...goal,
    progress: Math.min(100, Math.max(35, goal.progress + (Math.random() > 0.5 ? 8 : -6))),
  }));

  saveState();
  renderOverview();
  renderMoneySection();
  renderMindSection();
  renderBodySection();
  renderGoals();
}

function switchView(view) {
  document.querySelectorAll('.view').forEach((section) => {
    section.classList.toggle('active', section.id === view);
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === view);
  });
}

document.querySelectorAll('.nav-item').forEach((button) => {
  button.addEventListener('click', () => switchView(button.dataset.view));
});

document.getElementById('refreshDataBtn').addEventListener('click', randomizeDashboard);
document.getElementById('transactionForm').addEventListener('submit', addTransaction);
document.getElementById('dailyNote').addEventListener('input', updateDailyNote);

renderOverview();
renderMoneySection();
renderMindSection();
renderBodySection();
renderGoals();



















































































