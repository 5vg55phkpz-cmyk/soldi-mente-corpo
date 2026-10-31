* {
  box-sizing: border-box;
}

:root {
  --bg: #07121d;
  --bg-soft: #0e1b2b;
  --panel: rgba(13, 23, 38, 0.84);
  --panel-alt: rgba(18, 31, 48, 0.96);
  --line: rgba(148, 163, 184, 0.12);
  --text: #edf7ff;
  --muted: #9db2c9;
  --green: #34d399;
  --green-soft: rgba(52, 211, 153, 0.12);
  --red: #fb7185;
  --red-soft: rgba(251, 113, 133, 0.12);
  --blue: #60a5fa;
  --blue-soft: rgba(96, 165, 250, 0.12);
  --yellow: #fbbf24;
  --yellow-soft: rgba(251, 191, 36, 0.12);
  --violet: #a78bfa;
  --violet-soft: rgba(167, 139, 250, 0.12);
  --cyan: #22d3ee;
  --shadow: 0 18px 35px rgba(2, 6, 14, 0.38);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at 10% 10%, rgba(96, 165, 250, 0.22), transparent 24%),
    radial-gradient(circle at 90% 0%, rgba(52, 211, 153, 0.18), transparent 24%),
    linear-gradient(180deg, #081521 0%, #050d18 100%);
  color: var(--text);
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  border: none;
  background: none;
  color: inherit;
}

.hidden {
  display: none !important;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-card {
  width: min(460px, 92vw);
  background: rgba(10, 20, 32, 0.88);
  border: 1px solid var(--line);
  border-radius: 26px;
  padding: 28px 24px;
  box-shadow: var(--shadow);
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.auth-header h1 {
  margin: 0;
  font-size: clamp(1.6rem, 2vw, 2.1rem);
}

.auth-toggle {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.mode-btn {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--line);
  cursor: pointer;
  color: var(--text);
}

.mode-btn.active {
  background: linear-gradient(135deg, var(--blue), var(--green));
  color: #07131d;
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.9rem;
}

.auth-form input,
.transaction-form input,
.transaction-form select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
  border-radius: 12px;
  padding: 12px;
}

.auth-message {
  min-height: 22px;
  margin-top: 14px;
  color: var(--muted);
}

.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  max-width: 1460px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 22px;
  gap: 22px;
}

.sidebar,
.panel,
.mini-card,
.summary-card {
  background: rgba(11, 21, 34, 0.8);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 22px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 6px 18px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--green), var(--blue));
  color: #04151f;
  font-weight: 800;
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.brand h1,
.topbar h2,
.section-header h3,
.panel h3,
.panel h4 {
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  text-align: left;
  font-weight: 600;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(96, 165, 250, 0.08);
  border-color: rgba(96, 165, 250, 0.2);
}

.label {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mini-card {
  margin-top: auto;
  padding: 18px 16px;
}

.mini-card h3 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  margin: 10px 0 14px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green), var(--blue));
}

small {
  display: block;
  color: var(--muted);
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.view {
  display: none;
}

.view.active {
  display: block;
  animation: fadeIn 0.24s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 6px 0;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logout-btn,
.pill,
.tag,
.primary-btn {
  border-radius: 12px;
  font-weight: 600;
}

.pill {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--line);
  padding: 10px 14px;
}

.primary-btn {
  background: linear-gradient(135deg, var(--blue), var(--green));
  color: #07131d;
  padding: 10px 18px;
  cursor: pointer;
  border: 1px solid rgba(96, 165, 250, 0.24);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

.wide {
  width: 100%;
}

.logout-btn {
  background: rgba(251, 113, 133, 0.08);
  color: var(--red);
  border: 1px solid rgba(251, 113, 133, 0.18);
  padding: 11px 14px;
  cursor: pointer;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
}

.summary-card {
  padding: 18px 18px 16px;
  background: linear-gradient(180deg, rgba(17, 26, 42, 0.96), rgba(13, 23, 40, 0.82));
}

.summary-card .value {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.summary-card h3 {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
}

.delta {
  display: inline-flex;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
}

.delta.green { background: var(--green-soft); color: var(--green); }
.delta.blue { background: var(--blue-soft); color: var(--blue); }
.delta.yellow { background: var(--yellow-soft); color: var(--yellow); }
.delta.red { background: var(--red-soft); color: var(--red); }

.content-grid,
.bottom-grid,
.money-grid,
.mind-grid,
.body-grid,
.goal-grid {
  display: grid;
  gap: 18px;
}

.content-grid {
  grid-template-columns: 1.4fr 1fr 1fr;
}

.bottom-grid {
  grid-template-columns: 1.05fr 1.15fr;
}

.money-grid {
  grid-template-columns: 1fr 1.4fr;
}

.mind-grid,
.body-grid {
  grid-template-columns: 1fr 1fr;
}

.goal-grid {
  grid-template-columns: repeat(3, minmax(220px, 1fr));
}

.panel {
  padding: 18px 18px 20px;
}

.large-panel {
  min-height: 260px;
}

.panel-header,
.section-header,
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.panel-header {
  margin-bottom: 18px;
}

.section-header {
  margin-bottom: 18px;
}

.tag {
  padding: 7px 10px;
  font-size: 0.74rem;
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.tag.success { background: var(--green-soft); color: var(--green); }
.tag.warning { background: var(--yellow-soft); color: var(--yellow); }
.tag.neutral { background: rgba(148, 163, 184, 0.05); color: var(--text); }

.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.metric-row label,
.bar-group span,
.stat-subtitle {
  color: var(--muted);
  font-size: 0.8rem;
}

.metric-row strong {
  font-size: 1.42rem;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.bar-group {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 14px;
  align-items: center;
}

.bar-track {
  width: 100%;
  height: 10px;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.fill-green { background: linear-gradient(90deg, var(--green), #4ade80); }
.fill-red { background: linear-gradient(90deg, var(--red), #fda4af); }
.fill-blue { background: linear-gradient(90deg, var(--blue), #93c5fd); }

.checklist,
.transaction-list,
.habit-list,
.goal-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checklist li,
.habit-item,
.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot-emerald { background: var(--green); }
.dot-gold { background: var(--yellow); }
.dot-blue { background: var(--blue); }
.dot-red { background: var(--red); }
.dot-violet { background: var(--violet); }
.dot-cyan { background: var(--cyan); }

.priority-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.priority-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.08);
  background: rgba(148, 163, 184, 0.03);
}

.priority-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.priority-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--green);
}

.priority-item p {
  margin: 0 0 3px;
  font-weight: 600;
}

.priority-item small {
  color: var(--muted);
}

.priority-value {
  font-weight: 700;
}

.chart-wrap {
  height: 180px;
  display: flex;
  align-items: flex-end;
}

.chart-bars {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.chart-bar {
  flex: 1;
  min-height: 25px;
  border-radius: 12px 12px 0 0;
  position: relative;
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.85), rgba(52, 211, 153, 0.8));
}

.chart-bar::after {
  content: attr(data-label);
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--muted);
  font-size: 0.72rem;
}

.money-grid .panel,
.mind-grid .panel,
.body-grid .panel,
.goal-card {
  background: linear-gradient(180deg, rgba(17, 26, 42, 0.96), rgba(11, 21, 34, 0.82));
}

.donut-wrap {
  display: flex;
  justify-content: center;
  padding: 12px 0 18px;
}

.donut-chart {
  --progress: 50;
  --accent: var(--green);
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(var(--accent) calc(var(--progress) * 1%), rgba(148, 163, 184, 0.08) 0);
}

.donut-chart::before {
  content: "";
  position: absolute;
  inset: 16px;
  border-radius: 50%;
  background: rgba(14, 23, 38, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.08);
}

.donut-inner {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 4px;
}

.donut-inner strong {
  font-size: 1.8rem;
}

.full-span {
  grid-column: 1 / -1;
}

.transaction-list,
.habit-list {
  margin-top: 14px;
}

.transaction-item {
  padding: 12px 10px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.08);
}

.transaction-item .meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.transaction-item strong {
  font-size: 0.98rem;
}

.transaction-item small,
.transaction-item .amount {
  color: var(--muted);
}

.transaction-item.income .amount {
  color: var(--green);
}

.transaction-item.expense .amount {
  color: var(--red);
}

.transaction-form {
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.transaction-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--muted);
}

textarea {
  resize: vertical;
  min-height: 120px;
  margin-top: 14px;
}

.score-block {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.score-label {
  color: var(--muted);
  font-size: 0.8rem;
}

.score-block strong {
  font-size: 2rem;
}

.score-rail {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.08);
  overflow: hidden;
}

.score-rail span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--blue), var(--green));
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 140px;
}

.stat-card strong {
  font-size: 2.2rem;
  margin: 10px 0 8px;
}

.goal-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.goal-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.goal-card .goal-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.goal-progress {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.08);
  overflow: hidden;
  margin: 12px 0 8px;
}

.goal-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.goal-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.8rem;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .summary-grid,
  .content-grid,
  .bottom-grid,
  .money-grid,
  .mind-grid,
  .body-grid,
  .goal-grid,
  .transaction-form {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .app-shell {
    padding: 18px 14px;
  }

  .summary-grid,
  .content-grid,
  .bottom-grid,
  .money-grid,
  .mind-grid,
  .body-grid,
  .goal-grid,
  .transaction-form {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
    justify-content: space-between;
  }
}

