* {
  box-sizing: border-box;
}

:root {
  --bg: #0c1220;
  --bg-soft: #121b2d;
  --panel: rgba(15, 23, 42, 0.9);
  --panel-alt: rgba(17, 24, 39, 0.9);
  --line: rgba(148, 163, 184, 0.15);
  --text: #e5eefb;
  --muted: #8ea0bb;
  --green: #2dd4bf;
  --green-soft: rgba(45, 212, 191, 0.14);
  --red: #fb7185;
  --red-soft: rgba(251, 113, 133, 0.12);
  --blue: #60a5fa;
  --blue-soft: rgba(96, 165, 250, 0.14);
  --yellow: #facc15;
  --yellow-soft: rgba(250, 204, 21, 0.14);
  --violet: #a78bfa;
  --violet-soft: rgba(167, 139, 250, 0.14);
  --cyan: #22d3ee;
  --shadow: 0 20px 35px rgba(10, 16, 30, 0.34);
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background: radial-gradient(circle at top left, #16243a, var(--bg) 35%, #080d18 100%);
  color: var(--text);
}

button {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  padding: 22px;
  gap: 22px;
}

.sidebar,
.panel,
.mini-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 22px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 6px 18px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--green), var(--blue));
  color: #03111d;
  font-weight: 800;
  font-size: 1.2rem;
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
}

.brand h1,
.topbar h2,
.panel h3 {
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
  padding: 12px 14px;
  border-radius: 12px;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(96, 165, 250, 0.08);
  border-color: rgba(96, 165, 250, 0.22);
}

.mini-card {
  margin-top: auto;
  padding: 18px 16px;
}

.mini-card h3 {
  font-size: 2rem;
  margin: 8px 0 12px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(148, 163, 184, 0.14);
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
  margin-top: 10px;
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 6px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pill,
.tag,
.primary-btn {
  border-radius: 12px;
  font-weight: 600;
}

.pill {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  padding: 10px 14px;
  border: 1px solid var(--line);
}

.primary-btn {
  border: 1px solid rgba(96, 165, 250, 0.25);
  background: linear-gradient(135deg, var(--blue), var(--green));
  color: #061420;
  padding: 10px 18px;
  cursor: pointer;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
}

.summary-card {
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.9), rgba(15, 23, 42, 0.8));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 18px 16px;
}

.summary-card .label {
  margin: 0 0 14px;
  font-size: 0.8rem;
  color: var(--muted);
}

.summary-card .value {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.summary-card h3 {
  margin: 0;
  font-size: 2rem;
}

.summary-card .delta {
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 0.74rem;
}

.delta.green {
  background: var(--green-soft);
  color: var(--green);
}

.delta.red {
  background: var(--red-soft);
  color: var(--red);
}

.delta.blue {
  background: var(--blue-soft);
  color: var(--blue);
}

.delta.yellow {
  background: var(--yellow-soft);
  color: var(--yellow);
}

.content-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 18px;
}

.bottom-grid {
  grid-template-columns: 1.05fr 1.15fr;
}

.panel {
  padding: 18px 18px 20px;
}

.large-panel {
  grid-column: span 1;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
}

.tag {
  padding: 7px 10px;
  font-size: 0.74rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.tag.success {
  background: var(--green-soft);
  color: var(--green);
}

.tag.warning {
  background: var(--yellow-soft);
  color: var(--yellow);
}

.tag.neutral {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.metric-row label {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
  font-size: 0.8rem;
}

.metric-row strong {
  font-size: 1.35rem;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.bar-group {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 0.8rem;
}

.bar-track {
  width: 100%;
  height: 10px;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.fill-green { background: linear-gradient(90deg, var(--green), #3ae7d4); }
.fill-red { background: linear-gradient(90deg, var(--red), #fda4af); }
.fill-blue { background: linear-gradient(90deg, var(--blue), #93c5fd); }

.checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--text);
}

.checklist li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
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
  padding: 14px 14px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.08);
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
  margin: 0;
  font-weight: 600;
}

.priority-item small {
  margin-top: 4px;
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
  min-height: 20px;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.9), rgba(45, 212, 191, 0.8));
  position: relative;
}

.chart-bar::after {
  content: attr(data-label);
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--muted);
  font-size: 0.72rem;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding-bottom: 18px;
  }

  .summary-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .summary-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .brand {
    align-items: flex-start;
  }
}
