const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { run, get, all, initialize } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'soldi_mente_corpo_secret';

initialize();

const defaultDashboard = {
  monthProgress: 76,
  focus: 82,
  steps: 7842,
  sleep: '7h 20m',
  dailyNote: '',
  trend: [48, 58, 64, 72, 81, 76, 90],
  labels: ['L', 'M', 'M', 'G', 'V', 'S', 'D'],
  priorities: [
    { title: 'Risparmio mensile', detail: '€200 da versare', value: '80%' },
    { title: 'Sessione di lettura', detail: '20 minuti prima di dormire', value: '90%' },
    { title: 'Allenamento cardio', detail: '30 minuti e stretching', value: '65%' }
  ],
  goals: [
    { name: 'Fondo emergenza', progress: 72, target: 100, amount: '€5.400 / €7.500', color: '#34d399' },
    { name: 'Focus mentale', progress: 80, target: 100, amount: '16 / 20 sessioni', color: '#60a5fa' },
    { name: 'Fitness', progress: 68, target: 100, amount: '4 / 6 allenamenti', color: '#fbbf24' }
  ],
  money: {
    income: 2450,
    expense: 1780,
    saving: 670,
    gain: 320,
    budget: 3300,
    transactions: [
      { type: 'income', category: 'Stipendio', amount: 2200 },
      { type: 'expense', category: 'Affitto', amount: 980 },
      { type: 'expense', category: 'Cibo', amount: 240 },
      { type: 'income', category: 'Freelance', amount: 480 }
    ]
  },
  mind: [
    { label: 'Meditazione 15 min', color: 'dot-emerald' },
    { label: 'Lettura 20 min', color: 'dot-gold' },
    { label: 'Nessuna distrazione', color: 'dot-blue' }
  ],
  body: [
    { label: 'Allenamento 45 min', color: 'dot-red' },
    { label: 'Sonno 7h 20m', color: 'dot-violet' },
    { label: 'Idratazione ok', color: 'dot-cyan' }
  ]
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getUserFromToken(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Token non valido o mancante.' });
  }
  req.user = user;
  next();
}

async function createDefaultProfile(userId) {
  await run('INSERT INTO profiles (user_id, dashboard_data) VALUES (?, ?)', [userId, JSON.stringify(defaultDashboard)]);
}

async function getDashboardForUser(userId) {
  const profileRow = await get('SELECT dashboard_data FROM profiles WHERE user_id = ?', [userId]);
  const profile = profileRow ? JSON.parse(profileRow.dashboard_data) : JSON.parse(JSON.stringify(defaultDashboard));
  const txRows = await all('SELECT type, category, amount, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 10', [userId]);

  const income = txRows.filter((entry) => entry.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0);
  const expense = txRows.filter((entry) => entry.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0);
  const saving = income - expense;

  const normalized = {
    ...profile,
    money: {
      ...(profile.money || {}),
      income,
      expense,
      saving,
      gain: Math.max(220, Math.round((income - expense) * 0.38 + 200)),
      transactions: txRows.map((item) => ({
        type: item.type,
        category: item.category,
        amount: Number(item.amount)
      }))
    }
  };

  return normalized;
}

async function saveDashboardForUser(userId, dashboard) {
  const current = await getDashboardForUser(userId);
  const merged = {
    ...JSON.parse(JSON.stringify(defaultDashboard)),
    ...current,
    ...dashboard,
    money: {
      ...(JSON.parse(JSON.stringify(defaultDashboard)).money),
      ...(current.money || {}),
      ...(dashboard.money || {})
    }
  };

  await run('UPDATE profiles SET dashboard_data = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', [JSON.stringify(merged), userId]);
  return merged;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'soldi-mente-corpo' });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body || {};
  const cleanUsername = String(username || '').trim();
  if (!cleanUsername || cleanUsername.length < 3) {
    return res.status(400).json({ error: 'Username troppo corto. Minimo 3 caratteri.' });
  }
  if (!password || String(password).length < 6) {
    return res.status(400).json({ error: 'Password troppo corta. Minimo 6 caratteri.' });
  }

  try {
    const existing = await get('SELECT id FROM users WHERE username = ?', [cleanUsername]);
    if (existing) {
      return res.status(409).json({ error: 'Username già registrato.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [cleanUsername, passwordHash]);
    await createDefaultProfile(user.id);

    const token = jwt.sign({ id: user.id, username: cleanUsername }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      token,
      user: { id: user.id, username: cleanUsername }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Errore durante la registrazione.', details: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  const cleanUsername = String(username || '').trim();

  try {
    const user = await get('SELECT * FROM users WHERE username = ?', [cleanUsername]);
    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }

    const valid = await bcrypt.compare(String(password || ''), user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Errore durante il login.', details: error.message });
  }
});

app.get('/api/me', authMiddleware, async (req, res) => {
  const userRow = await get('SELECT id, username FROM users WHERE id = ?', [req.user.id]);
  if (!userRow) return res.status(404).json({ error: 'Utente non trovato.' });
  res.json({ user: { id: userRow.id, username: userRow.username } });
});

app.get('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    const dashboard = await getDashboardForUser(req.user.id);
    res.json({ dashboard });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel caricamento del dashboard.', details: error.message });
  }
});

app.post('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    const merged = await saveDashboardForUser(req.user.id, req.body || {});
    res.json({ dashboard: merged });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel salvataggio del dashboard.', details: error.message });
  }
});

app.post('/api/transactions', authMiddleware, async (req, res) => {
  try {
    const { type, category, amount } = req.body || {};
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Tipo transazione non valido.' });
    }
    if (!category || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Dati transazione non validi.' });
    }

    await run('INSERT INTO transactions (user_id, type, category, amount) VALUES (?, ?, ?, ?)', [req.user.id, type, String(category).trim(), Number(amount)]);

    const current = await getDashboardForUser(req.user.id);
    const allTx = await all('SELECT type, category, amount FROM transactions WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);

    const income = allTx.filter((entry) => entry.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0);
    const expense = allTx.filter((entry) => entry.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0);

    const updatedDashboard = {
      ...current,
      money: {
        ...(current.money || {}),
        income,
        expense,
        saving: income - expense,
        gain: Math.max(220, Math.round((income - expense) * 0.38 + 200)),
        transactions: allTx.map((entry) => ({
          type: entry.type,
          category: entry.category,
          amount: Number(entry.amount)
        }))
      }
    };

    await run('UPDATE profiles SET dashboard_data = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', [JSON.stringify(updatedDashboard), req.user.id]);
    res.status(201).json({ dashboard: updatedDashboard });
  } catch (error) {
    res.status(500).json({ error: 'Errore nell’aggiunta della transazione.', details: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
