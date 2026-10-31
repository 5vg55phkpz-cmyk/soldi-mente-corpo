* {
  box-sizing: border-box;
}

:root {
  --bg: #09121f;
  --bg-soft: #111b2b;
  --bg-strong: #0d1728;
  --panel: rgba(13, 23, 40, 0.86);
  --panel-alt: rgba(17, 26, 42, 0.96);
  --line: rgba(148, 163, 184, 0.14);
  --text: #edf7ff;
  --muted: #9db0c8;
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
  --shadow: 0 18px 35px rgba(3, 7, 18, 0.35);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at 15% 10%, rgba(96, 165, 250, 0.18), transparent 28%),
    radial-gradient(circle at 80% 0%, rgba(52, 211, 153, 0.18), transparent 20%),
    linear-gradient(180deg, #0b1422 0%, #0a1220 100%);
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
.mini-card,
.summary-card {
  background: rgba(12, 21, 35, 0.8);
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
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--green), var(--blue));
  color: #07131d;
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
.panel h3 {
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
  cursor: pointer;
  font-weight: 600;
  padding: 12px 14px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.nav-item.active,
.nav-item:hover {
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
  font-size: clamp(1.8rem, 3vw, 2.4rem);
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
  gap: 20px;
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
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--line);
  padding: 10px 14px;
}

.primary-btn {
  border: 1px solid rgba(96, 165, 250, 0.2);
  background: linear-gradient(135deg, #60a5fa, #34d399);
  color: #061620;
  padding: 10px 18px;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
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
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.delta {
  display: inline-flex;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
}

.delta.green {
  background: var(--green-soft);
  color: var(--green);
}

.delta.blue {
  background: var(--blue-soft);
  color: var(--blue);
}

.delta.yellow {
  background: var(--yellow-soft);
  color: var(--yellow);
}

.delta.red {
  background: var(--red-soft);
  color: var(--red);
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
  border: 1px solid rgba(148, 163, 184, 0.12);
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
  background: rgba(148, 163, 184, 0.05);
  color: var(--text);
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.metric-row label,
.bar-group span {
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

.fill-green {
  background: linear-gradient(90deg, var(--green), #4ade80);
}

.fill-red {
  background: linear-gradient(90deg, var(--red), #fda4af);
}

.fill-blue {
  background: linear-gradient(90deg, var(--blue), #93c5fd);
}

.checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  gap: 16px;
  padding: 14px 14px;
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
  position: relative;
  flex: 1;
  min-height: 25px;
  border-radius: 12px 12px 0 0;
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
  .app-shell {
    padding: 18px 14px;
  }

  .summary-grid,
  .content-grid,
  .bottom-grid {
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

  .priority-item {
    align-items: flex-start;
  }
}

