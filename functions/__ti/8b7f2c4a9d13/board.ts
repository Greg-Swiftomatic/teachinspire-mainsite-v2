const TITLE = 'TeachInspire Growth Board';

function htmlPage(body: string, apiBase: string): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${TITLE}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      :root{
        /* Black-metal inspired, but lighter: teal/blue background like your terminal. */
        --color-primary:#9AD6E3;
        --color-secondary:#79C7DF;
        --color-cta:#7FE3C2;
        --color-background:#123E47;
        --color-text:#EAF6F7;

        --ink: rgba(234,246,247,0.94);
        --muted: rgba(234,246,247,0.66);
        --line: rgba(234,246,247,0.14);
        --panel: rgba(20,62,71,0.72);
        --panel-solid: #143E47;

        --danger: #FF8AA0;
        --warning: #FFD166;

        --shadow-sm: 0 1px 2px rgba(0,0,0,0.32);
        --shadow-md: 0 10px 24px rgba(0,0,0,0.24);
        --shadow-lg: 0 20px 44px rgba(0,0,0,0.26);
        --shadow-xl: 0 38px 92px rgba(0,0,0,0.30);

        --r-sm: 10px;
        --r-md: 14px;
        --r-lg: 18px;
      }

      *{box-sizing:border-box}
      html,body{height:100%}
      body{
        margin:0;
        background:
          radial-gradient(1100px 650px at 12% 8%, rgba(121,199,223,0.18), transparent 56%),
          radial-gradient(980px 640px at 86% 22%, rgba(154,214,227,0.16), transparent 60%),
          radial-gradient(1000px 650px at 50% 120%, rgba(127,227,194,0.10), transparent 55%),
          linear-gradient(180deg, #123E47 0%, #123E47 62%, #0E333B 100%);
        color: var(--color-text);
        font-family: "Fira Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }
      body:before{
        content:"";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image:
          radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
        background-size: 4px 4px;
        opacity: 0.16;
        mix-blend-mode: overlay;
      }
      body.dragging{
        user-select: none;
        -webkit-user-select: none;
      }
      a{color: var(--color-primary); text-decoration:none}
      a:hover{text-decoration:underline}
      code,pre{font-family:"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace}

      .skip{
        position: absolute;
        left: 12px;
        top: 10px;
        padding: 10px 12px;
        border-radius: var(--r-sm);
        background: rgba(11,16,32,0.90);
        border: 1px solid var(--line);
        box-shadow: var(--shadow-md);
        transform: translateY(-120%);
        transition: transform 180ms ease;
        z-index: 60;
      }
      .skip:focus{ transform: translateY(0); }

      .topbar{
        position: sticky; top:0; z-index:50;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        /* Clearer separation from the canvas, while staying on-palette. */
        background: linear-gradient(
          180deg,
          rgba(24, 86, 98, 0.92) 0%,
          rgba(18, 62, 71, 0.78) 55%,
          rgba(14, 51, 59, 0.68) 100%
        );
        border-bottom: 1px solid rgba(234,246,247,0.16);
        box-shadow: 0 10px 30px rgba(0,0,0,0.18);
      }
      .topbarInner{
        max-width: 1400px;
        margin: 0 auto;
        padding: 14px 16px;
        display:flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
      }

      .brand{display:flex; align-items:baseline; gap:10px}
      .kicker{
        font-size: 11px;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .title{
        font-family: "Fira Code", monospace;
        font-weight: 600;
        letter-spacing: -0.01em;
        font-size: 16px;
        margin: 0;
      }
      .subTitle{
        font-size: 12px;
        color: var(--muted);
      }

      .controls{
        display:flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        justify-content: flex-end;
      }
      .ctrl{
        display:flex; align-items:center; gap:8px;
        padding: 8px 10px;
        border: 1px solid var(--line);
        background: var(--panel);
        border-radius: var(--r-sm);
        box-shadow: var(--shadow-sm);
      }
      .ctrl:focus-within{
        border-color: rgba(154,214,227,0.55);
        box-shadow: 0 0 0 4px rgba(121,199,223,0.18);
      }
      .ctrl label{
        font-size: 11px;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .ctrl select,.ctrl input{
        border: 0;
        background: transparent;
        color: var(--ink);
        outline: none;
        font-size: 13px;
        min-height: 28px;
      }
      .ctrl input{width: 180px}
      .btn{
        min-height: 44px;
        padding: 10px 12px;
        border-radius: var(--r-sm);
        border: 1px solid var(--line);
        background: var(--panel);
        color: var(--color-text);
        cursor: pointer;
        transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, border-color 180ms ease;
        box-shadow: var(--shadow-sm);
        font-weight: 600;
        font-size: 13px;
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      .btn:hover{ box-shadow: var(--shadow-md); border-color: rgba(3,105,161,0.35); transform: translateY(-1px); }
      .btn:hover{ border-color: rgba(154,214,227,0.34); }
      .btn:focus-visible{ outline: 3px solid rgba(121,199,223,0.28); outline-offset: 2px; }
      .btnPrimary{
        background: linear-gradient(135deg, rgba(154,214,227,0.92), rgba(121,199,223,0.88));
        border-color: rgba(154,214,227,0.36);
        color: white;
      }
      .btnDanger{
        background: rgba(255, 138, 160, 0.14);
        border-color: rgba(255, 138, 160, 0.34);
        color: rgba(255, 238, 242, 0.94);
      }
      .btnGhost{
        background: transparent;
      }

      .wrap{ max-width: 1400px; margin: 0 auto; padding: 16px; }
      .stats{
        display:flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        margin-bottom: 12px;
      }
      .chip{
        display:inline-flex;
        align-items:center;
        gap: 8px;
        padding: 8px 10px;
        border: 1px solid var(--line);
        background: rgba(11,16,32,0.58);
        border-radius: 999px;
        font-size: 12px;
        color: var(--ink);
      }
      .dot{ width:8px; height:8px; border-radius: 99px; background: var(--color-secondary); }

      .board{
        display:grid;
        gap: 12px;
        grid-template-columns: repeat(6, minmax(260px, 1fr));
        align-items: start;
        overflow-x: auto;
        padding-bottom: 8px;
      }
      .col{
        background: rgba(11,16,32,0.58);
        border: 1px solid var(--line);
        border-radius: var(--r-md);
        box-shadow: var(--shadow-sm);
        min-height: 320px;
      }
      .colHead{
        padding: 12px 12px 10px;
        border-bottom: 1px solid var(--line);
        display:flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .colTitle{
        font-family: "Fira Code", monospace;
        font-size: 12px;
        letter-spacing: .10em;
        text-transform: uppercase;
        color: rgba(230,237,247,0.78);
        margin: 0;
      }
      .colMeta{
        font-size: 12px;
        color: var(--muted);
        font-variant-numeric: tabular-nums;
      }
      .colBody{
        padding: 10px;
        display:grid;
        gap: 10px;
        min-height: 260px;
      }
      .dropZone{
        border-radius: var(--r-sm);
        outline: 2px dashed transparent;
        outline-offset: 4px;
        transition: outline-color 150ms ease, background 150ms ease;
      }
      .dropZone.isOver{
        outline-color: rgba(121,199,223,0.62);
        background: rgba(121,199,223,0.10);
      }

      .card{
        background: rgba(20,62,71,0.74);
        border: 1px solid rgba(230,237,247,0.14);
        border-radius: var(--r-sm);
        box-shadow: var(--shadow-sm);
        padding: 10px;
        display:grid;
        gap: 8px;
        cursor: grab;
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      }
      .card:hover{ box-shadow: var(--shadow-md); border-color: rgba(154,214,227,0.30); transform: translateY(-1px); }
      .card:focus-visible{ outline: 3px solid rgba(121,199,223,0.28); outline-offset: 2px; }
      .card[aria-grabbed="true"]{ cursor: grabbing; opacity: 0.85; }
      .cardTop{ display:flex; align-items:flex-start; justify-content: space-between; gap: 10px; }
      .cardTitle{
        font-weight: 700;
        font-size: 13px;
        line-height: 1.25;
        margin: 0;
        color: var(--ink);
      }
      .metaRow{
        display:flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items:center;
      }
      .badge{
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 999px;
        border: 1px solid rgba(230,237,247,0.14);
        background: rgba(18,62,71,0.45);
        color: rgba(230,237,247,0.84);
      }
      .badgePriCritical{ border-color: rgba(251, 113, 133, 0.42); background: rgba(251, 113, 133, 0.14); color: rgba(255, 228, 230, 0.95); }
      .badgePriHigh{ border-color: rgba(251, 191, 36, 0.42); background: rgba(251, 191, 36, 0.14); color: rgba(254, 249, 195, 0.94); }
      .badgePriMed{ border-color: rgba(34, 211, 238, 0.40); background: rgba(34, 211, 238, 0.12); color: rgba(224, 251, 255, 0.90); }
      .badgePriLow{ border-color: rgba(52,211,153,0.34); background: rgba(52,211,153,0.12); color: rgba(220, 252, 231, 0.92); }
      .badgeOwner{
        display:inline-flex; align-items:center; gap:8px;
      }
      .avatar{
        width: 18px; height: 18px;
        border-radius: 999px;
        border: 1px solid rgba(230,237,247,0.18);
        display:flex; align-items:center; justify-content:center;
        font-size: 11px;
        font-weight: 700;
        background: rgba(112,165,255,0.14);
        color: rgba(230,237,247,0.92);
        font-family: "Fira Code", monospace;
      }
      .tags{ display:flex; flex-wrap: wrap; gap: 6px; }
      .tag{
        font-size: 11px;
        padding: 3px 7px;
        border-radius: 999px;
        border: 1px dashed rgba(230,237,247,0.18);
        color: rgba(230,237,247,0.76);
        background: rgba(18,62,71,0.30);
      }

      .empty{
        padding: 18px 12px;
        border: 1px dashed rgba(230,237,247,0.18);
        border-radius: var(--r-sm);
        background: rgba(18,62,71,0.26);
        color: rgba(230,237,247,0.66);
        font-size: 12px;
        line-height: 1.45;
      }

      .dialogOverlay{
        position: fixed;
        inset: 0;
        background: rgba(2,6,23,0.45);
        backdrop-filter: blur(4px);
        display:none;
        z-index: 100;
        align-items: center;
        justify-content: center;
        padding: 18px;
        overscroll-behavior: contain;
      }
      .dialogOverlay.open{ display:flex; }
      .dialog{
        width: min(980px, 100%);
        max-height: min(92vh, 860px);
        overflow: auto;
        background: rgba(18,62,71,0.92);
        border: 1px solid rgba(230,237,247,0.14);
        border-radius: var(--r-lg);
        box-shadow: var(--shadow-xl);
      }
      .dialogHead{
        padding: 14px 16px;
        border-bottom: 1px solid var(--line);
        display:flex; align-items:center; justify-content: space-between; gap: 10px;
        position: sticky; top: 0;
        background: rgba(18,62,71,0.92);
        backdrop-filter: blur(8px);
      }
      .dialogTitle{
        font-family: "Fira Code", monospace;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: rgba(230,237,247,0.78);
        margin: 0;
      }
      .dialogBody{ padding: 16px; }
      .formGrid{
        display:grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      @media(min-width: 960px){ .formGrid{ grid-template-columns: 1fr 1fr; } }
      .field{ display:grid; gap: 6px; }
      .field label{
        font-size: 11px;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .field input,.field select,.field textarea{
        min-height: 44px;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(234,246,247,0.16);
        background: rgba(14,51,59,0.62);
        color: rgba(234,246,247,0.94);
        font-size: 14px;
        outline: none;
        transition: box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
      }
      .field textarea{ min-height: 110px; resize: vertical; font-family: inherit; }
      .field input:focus,.field select:focus,.field textarea:focus{
        border-color: rgba(154,214,227,0.50);
        box-shadow: 0 0 0 4px rgba(121,199,223,0.18);
        background: rgba(14,51,59,0.78);
      }
      .full{ grid-column: 1 / -1; }
      .row{
        display:flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between;
      }
      .hint{ font-size: 12px; color: var(--muted); line-height: 1.45; }
      .toastWrap{
        position: fixed;
        right: 14px;
        bottom: 14px;
        display:grid;
        gap: 10px;
        z-index: 200;
      }
      .toast{
        background: rgba(11,16,32,0.92);
        border: 1px solid rgba(230,237,247,0.14);
        border-radius: 14px;
        box-shadow: var(--shadow-lg);
        padding: 10px 12px;
        min-width: 260px;
        max-width: 360px;
        display:flex;
        gap: 10px;
        align-items:flex-start;
      }
      .toastIcon{
        width: 10px; height: 10px; border-radius: 99px; background: var(--color-cta); margin-top: 5px;
      }
      .toastMsg{ font-size: 13px; color: rgba(230,237,247,0.90); line-height: 1.35; }
      .spinner{
        width: 14px; height: 14px;
        border: 2px solid rgba(230,237,247,0.24);
        border-top-color: rgba(230,237,247,0.78);
        border-radius: 99px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin{ to{ transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce){
        *{ transition: none !important; animation: none !important; scroll-behavior:auto !important; }
      }
    </style>
  </head>
  <body>
    ${body}
    <script>
      (function(){
        const API_BASE = ${JSON.stringify(apiBase)};

        const STATUS = [
          { id: "backlog", label: "Backlog" },
          { id: "todo", label: "Todo" },
          { id: "in_progress", label: "In Progress" },
          { id: "blocked", label: "Blocked" },
          { id: "in_review", label: "In Review" },
          { id: "done", label: "Done" },
        ];

        const OWNERS = [
          { id: "greg", label: "Greg", short: "G", color: "rgba(154,214,227,0.20)" },
          { id: "pinch", label: "Pinch", short: "P", color: "rgba(234,246,247,0.12)" },
          { id: "omar", label: "Omar", short: "O", color: "rgba(127,227,194,0.16)" },
          { id: "octo", label: "Octo", short: "Oc", color: "rgba(121,199,223,0.18)" },
          { id: "pearl", label: "Pearl", short: "Pe", color: "rgba(255,209,102,0.14)" },
        ];

        const PRIORITY = [
          { id: "critical", label: "Critical" },
          { id: "high", label: "High" },
          { id: "medium", label: "Medium" },
          { id: "low", label: "Low" },
        ];

        const TYPE = [
          { id: "task", label: "Task" },
          { id: "milestone", label: "Milestone" },
          { id: "recurring", label: "Recurring" },
          { id: "epic", label: "Epic" },
        ];

        const els = {
          sprint: document.getElementById("sprint"),
          owner: document.getElementById("owner"),
          epic: document.getElementById("epic"),
          q: document.getElementById("q"),
          archived: document.getElementById("archived"),
          btnNew: document.getElementById("btnNew"),
          btnMetrics: document.getElementById("btnMetrics"),
          board: document.getElementById("board"),
          chipTotal: document.getElementById("chipTotal"),
          chipActive: document.getElementById("chipActive"),
          chipDone: document.getElementById("chipDone"),
          chipSprint: document.getElementById("chipSprint"),
          chipWeek: document.getElementById("chipWeek"),
          overlay: document.getElementById("overlay"),
          dialogTitle: document.getElementById("dialogTitle"),
          form: document.getElementById("form"),
          btnClose: document.getElementById("btnClose"),
          btnSave: document.getElementById("btnSave"),
          btnDelete: document.getElementById("btnDelete"),
          btnRestore: document.getElementById("btnRestore"),
          btnSprints: document.getElementById("btnSprints"),
          overlaySprints: document.getElementById("overlaySprints"),
          sprintForm: document.getElementById("sprintForm"),
          sprintList: document.getElementById("sprintList"),
          btnSprintClose: document.getElementById("btnSprintClose"),
          btnSprintNew: document.getElementById("btnSprintNew"),
          btnSprintSave: document.getElementById("btnSprintSave"),
          btnSprintArchive: document.getElementById("btnSprintArchive"),
          btnSprintCloseSprint: document.getElementById("btnSprintCloseSprint"),
          btnEpics: document.getElementById("btnEpics"),
          overlayEpics: document.getElementById("overlayEpics"),
          epicForm: document.getElementById("epicForm"),
          epicList: document.getElementById("epicList"),
          btnEpicClose: document.getElementById("btnEpicClose"),
          btnEpicNew: document.getElementById("btnEpicNew"),
          btnEpicSave: document.getElementById("btnEpicSave"),
          btnEpicArchive: document.getElementById("btnEpicArchive"),
          overlayMetrics: document.getElementById("overlayMetrics"),
          metricsForm: document.getElementById("metricsForm"),
          metricsList: document.getElementById("metricsList"),
          btnMetricsClose: document.getElementById("btnMetricsClose"),
          btnMetricsNew: document.getElementById("btnMetricsNew"),
          btnMetricsSave: document.getElementById("btnMetricsSave"),
          btnMetricsArchive: document.getElementById("btnMetricsArchive"),
          toastWrap: document.getElementById("toastWrap"),
        };

        let state = {
          tasks: [],
          sprints: [],
          epics: [],
          metrics: [],
          dashboard: null,
          loading: true,
          editing: null,
          creatingStatus: null,
          editingSprint: null,
          editingEpic: null,
          editingMetrics: null,
        };

        const urlFilters = (function(){
          const p = new URLSearchParams(location.search);
          return {
            sprintId: p.get("sprintId") || "",
            owner: p.get("owner") || "",
            epicId: p.get("epicId") || "",
            q: p.get("q") || "",
            archived: p.get("archived") === "1" || p.get("archived") === "true",
            applied: false,
          };
        })();

        // Apply text/checkbox filters immediately (selects need options first, applied in refresh()).
        els.q.value = urlFilters.q;
        els.archived.checked = urlFilters.archived;

        function syncUrlFromFilters(){
          const f = getFilters();
          const p = new URLSearchParams();
          if (f.sprintId) p.set("sprintId", f.sprintId);
          if (f.owner) p.set("owner", f.owner);
          if (f.epicId) p.set("epicId", f.epicId);
          if (f.q) p.set("q", f.q);
          if (f.includeArchived) p.set("archived", "1");

          const next = p.toString();
          const url = next ? (location.pathname + "?" + next) : location.pathname;
          history.replaceState(null, "", url);
        }

        function toast(msg, kind){
          const t = document.createElement("div");
          t.className = "toast";
          const icon = document.createElement("div");
          icon.className = "toastIcon";
          icon.style.background = kind === "danger" ? "rgba(226, 67, 67, 0.85)" : (kind === "warn" ? "rgba(245, 158, 11, 0.85)" : "rgba(34,197,94,0.88)");
          const p = document.createElement("div");
          p.className = "toastMsg";
          p.textContent = msg;
          t.appendChild(icon);
          t.appendChild(p);
          els.toastWrap.appendChild(t);
          setTimeout(() => t.remove(), 2800);
        }

        async function api(path, options){
          const res = await fetch(API_BASE + path, {
            headers: { "Content-Type": "application/json" },
            ...options,
          });
          if (!res.ok) {
            let detail = "";
            try { detail = (await res.json()).error || ""; } catch {}
            throw new Error(detail || ("HTTP " + res.status));
          }
          return res.status === 204 ? null : res.json();
        }

        function ownerMeta(id){
          return OWNERS.find(o => o.id === id) || { id, label: id, short: "?", color: "rgba(12,74,110,0.12)" };
        }

        function priClass(pri){
          if (pri === "critical") return "badgePriCritical";
          if (pri === "high") return "badgePriHigh";
          if (pri === "low") return "badgePriLow";
          return "badgePriMed";
        }

        function getFilters(){
          return {
            sprintId: els.sprint.value || "",
            owner: els.owner.value || "",
            epicId: els.epic.value || "",
            q: els.q.value.trim(),
            includeArchived: els.archived.checked,
          };
        }

        function filterTasks(tasks){
          const f = getFilters();
          let out = tasks.slice();
          if (!f.includeArchived) out = out.filter(t => !t.archivedAt);
          if (f.sprintId) out = out.filter(t => (t.sprintId || "") === f.sprintId);
          if (f.owner) out = out.filter(t => t.owner === f.owner);
          if (f.epicId) out = out.filter(t => (t.epicId || "") === f.epicId);
          if (f.q) {
            const q = f.q.toLowerCase();
            out = out.filter(t =>
              (t.title || "").toLowerCase().includes(q) ||
              (t.description || "").toLowerCase().includes(q) ||
              (t.notes || "").toLowerCase().includes(q) ||
              (Array.isArray(t.tags) ? t.tags.join(" ") : "").toLowerCase().includes(q)
            );
          }
          return out;
        }

        function renderDashboardChips(){
          if (!els.chipSprint || !els.chipWeek) return;
          const d = state.dashboard;

          if (d && d.activeSprint && d.activeSprint.name) {
            els.chipSprint.textContent = "Sprint: " + d.activeSprint.name;
          } else {
            els.chipSprint.textContent = "Sprint: none active";
          }

          if (d && d.latestMetrics && d.latestMetrics.weekOf) {
            const m = d.latestMetrics.metrics || {};
            els.chipWeek.textContent = "Week of " + fmtDateLong(d.latestMetrics.weekOf) + ": " + (m.leadsGenerated || 0) + " leads, " + (m.meetingsBooked || 0) + " meetings";
          } else {
            els.chipWeek.textContent = "Metrics: none yet";
          }
        }

        function computeStats(tasks){
          const visible = filterTasks(tasks);
          const total = visible.length;
          const active = visible.filter(t => ["todo","in_progress","blocked","in_review"].includes(t.status)).length;
          const done = visible.filter(t => t.status === "done").length;
          els.chipTotal.textContent = String(total);
          els.chipActive.textContent = String(active);
          els.chipDone.textContent = String(done);
          return { visible };
        }

        function renderSprints(sprints){
          const cur = els.sprint.value;
          els.sprint.innerHTML = "";

          const optAll = document.createElement("option");
          optAll.value = "";
          optAll.textContent = "All sprints";
          els.sprint.appendChild(optAll);

          const active = sprints.find(s => s.status === "active");
          if (active) {
            const opt = document.createElement("option");
            opt.value = active.id;
            opt.textContent = "Active: " + active.name;
            els.sprint.appendChild(opt);
          }

          for (const s of sprints) {
            const opt = document.createElement("option");
            opt.value = s.id;
            opt.textContent = s.name + (s.status === "active" ? " (active)" : "");
            els.sprint.appendChild(opt);
          }

          els.sprint.value = cur;
        }

        function renderEpicsFilter(epics){
          const cur = els.epic.value;
          els.epic.innerHTML = "";

          const optAll = document.createElement("option");
          optAll.value = "";
          optAll.textContent = "All epics";
          els.epic.appendChild(optAll);

          const items = (epics || []).filter(e => !e.archivedAt);
          for (const e of items) {
            const opt = document.createElement("option");
            opt.value = e.id;
            opt.textContent = e.title;
            els.epic.appendChild(opt);
          }

          els.epic.value = cur;
        }

        function ensureOwnerOptions(){
          if (els.owner.dataset.ready) return;
          for (const o of OWNERS) {
            const opt = document.createElement("option");
            opt.value = o.id;
            opt.textContent = o.label;
            els.owner.appendChild(opt);
          }
          els.owner.dataset.ready = "1";
        }

        function renderBoard(){
          ensureOwnerOptions();
          const { visible } = computeStats(state.tasks);

          const byStatus = new Map();
          for (const s of STATUS) byStatus.set(s.id, []);
          for (const t of visible) (byStatus.get(t.status) || byStatus.get("backlog")).push(t);

          els.board.innerHTML = "";

          for (const s of STATUS) {
            const col = document.createElement("div");
            col.className = "col";

            const head = document.createElement("div");
            head.className = "colHead";

            const title = document.createElement("p");
            title.className = "colTitle";
            title.textContent = s.label;

            const meta = document.createElement("div");
            meta.className = "colMeta";
            meta.textContent = String((byStatus.get(s.id) || []).length);

            head.appendChild(title);
            head.appendChild(meta);

            const body = document.createElement("div");
            body.className = "colBody dropZone";
            body.dataset.status = s.id;
            body.addEventListener("dragover", (e) => { e.preventDefault(); body.classList.add("isOver"); });
            body.addEventListener("dragleave", () => body.classList.remove("isOver"));
            body.addEventListener("drop", async (e) => {
              e.preventDefault();
              body.classList.remove("isOver");
              const id = e.dataTransfer && e.dataTransfer.getData("text/task-id");
              if (!id) return;
              try {
                await api("/tasks/" + encodeURIComponent(id), { method: "PATCH", body: JSON.stringify({ status: s.id }) });
                await refresh();
                toast("Moved task to " + s.label, "ok");
              } catch (err) {
                toast(String(err && err.message ? err.message : err), "danger");
              }
            });

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btnGhost";
            btn.textContent = "+";
            btn.title = "New task in " + s.label;
            btn.setAttribute("aria-label", "New task in " + s.label);
            btn.style.minHeight = "44px";
            btn.style.padding = "8px 10px";
            btn.addEventListener("click", () => openNewTask(s.id));

            head.appendChild(btn);

            const tasks = (byStatus.get(s.id) || []).slice().sort((a,b) => (a.updatedAt||"").localeCompare(b.updatedAt||"")).reverse();
            if (!tasks.length) {
              const empty = document.createElement("div");
              empty.className = "empty";
              empty.textContent = "Drop tasks here or add a new one.";
              body.appendChild(empty);
            } else {
              for (const t of tasks) body.appendChild(renderCard(t));
            }

            col.appendChild(head);
            col.appendChild(body);
            els.board.appendChild(col);
          }
        }

        function renderCard(t){
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "card";
          btn.draggable = true;
          btn.setAttribute("aria-grabbed", "false");

          btn.addEventListener("dragstart", (e) => {
            btn.setAttribute("aria-grabbed", "true");
            document.body.classList.add("dragging");
            if (e.dataTransfer) {
              e.dataTransfer.setData("text/task-id", t.id);
              e.dataTransfer.effectAllowed = "move";
            }
          });
          btn.addEventListener("dragend", () => {
            btn.setAttribute("aria-grabbed", "false");
            document.body.classList.remove("dragging");
          });
          btn.addEventListener("click", () => openEditTask(t));

          const top = document.createElement("div");
          top.className = "cardTop";

          const title = document.createElement("p");
          title.className = "cardTitle";
          title.textContent = t.title || "(untitled)";

          const owner = ownerMeta(t.owner || "pinch");
          const ownerBadge = document.createElement("span");
          ownerBadge.className = "badge badgeOwner";
          const avatar = document.createElement("span");
          avatar.className = "avatar";
          avatar.textContent = owner.short;
          avatar.style.background = owner.color;
          const ownerLabel = document.createElement("span");
          ownerLabel.textContent = owner.label;
          ownerBadge.appendChild(avatar);
          ownerBadge.appendChild(ownerLabel);

          top.appendChild(title);
          top.appendChild(ownerBadge);

          const meta = document.createElement("div");
          meta.className = "metaRow";

          const pri = document.createElement("span");
          pri.className = "badge " + priClass(t.priority || "medium");
          pri.textContent = (t.priority || "medium").toUpperCase();
          meta.appendChild(pri);

          if (t.dueDate) {
            const due = document.createElement("span");
            due.className = "badge";
            due.textContent = "Due " + fmtDateLong(t.dueDate);
            meta.appendChild(due);
          }

          const type = document.createElement("span");
          type.className = "badge";
          type.textContent = (t.type || "task");
          meta.appendChild(type);

          const tags = Array.isArray(t.tags) ? t.tags : [];
          if (tags.length) {
            const tagsWrap = document.createElement("div");
            tagsWrap.className = "tags";
            for (const tag of tags.slice(0, 4)) {
              const el = document.createElement("span");
              el.className = "tag";
              el.textContent = tag;
              tagsWrap.appendChild(el);
            }
            if (tags.length > 4) {
              const more = document.createElement("span");
              more.className = "tag";
              more.textContent = "+" + (tags.length - 4);
              tagsWrap.appendChild(more);
            }
            btn.appendChild(top);
            btn.appendChild(meta);
            btn.appendChild(tagsWrap);
            return btn;
          }

          btn.appendChild(top);
          btn.appendChild(meta);
          return btn;
        }

        function openDialog(mode, task){
          state.editing = task || null;
          els.dialogTitle.textContent = mode === "new" ? "New Task" : "Edit Task";
          els.overlay.classList.add("open");
          els.overlay.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";

          const sprints = state.sprints || [];
          const epics = (state.epics || []).filter(e => !e.archivedAt);

          const sprintOptions = ['<option value="">(none)</option>']
            .concat(sprints.map(s => '<option value="'+escapeHtmlAttr(s.id)+'">'+escapeHtmlText(s.name)+'</option>')).join('');

          const epicOptions = ['<option value="">(none)</option>']
            .concat(epics.map(e => '<option value="'+escapeHtmlAttr(e.id)+'">'+escapeHtmlText(e.title)+'</option>')).join('');

          const ownerOptions = OWNERS.map(o => '<option value="'+o.id+'">'+escapeHtmlText(o.label)+'</option>').join('');
          const priOptions = PRIORITY.map(p => '<option value="'+p.id+'">'+escapeHtmlText(p.label)+'</option>').join('');
          const statusOptions = STATUS.map(s => '<option value="'+s.id+'">'+escapeHtmlText(s.label)+'</option>').join('');
          const typeOptions = TYPE.map(t => '<option value="'+t.id+'">'+escapeHtmlText(t.label)+'</option>').join('');

          const t = task || {
            title: "",
            description: "",
            owner: (els.owner.value || "pinch"),
            status: state.creatingStatus || "backlog",
            priority: "medium",
            type: "task",
            sprintId: (els.sprint.value || ""),
            epicId: "",
            tags: [],
            dueDate: "",
            waitingOn: "",
            deliverableUrl: "",
            estimatedHours: "",
            actualHours: "",
            notes: "",
          };

          els.form.innerHTML = \`
            <div class="formGrid">
              <div class="field full">
                <label for="f_title">Title</label>
                <input id="f_title" name="title" value="\${escapeHtmlAttr(t.title || "")}" placeholder="What is the task?" autocomplete="off" required />
              </div>

              <div class="field">
                <label for="f_owner">Owner</label>
                <select id="f_owner" name="owner">\${ownerOptions}</select>
              </div>
              <div class="field">
                <label for="f_status">Status</label>
                <select id="f_status" name="status">\${statusOptions}</select>
              </div>
              <div class="field">
                <label for="f_priority">Priority</label>
                <select id="f_priority" name="priority">\${priOptions}</select>
              </div>
              <div class="field">
                <label for="f_type">Type</label>
                <select id="f_type" name="type">\${typeOptions}</select>
              </div>
              <div class="field">
                <label for="f_sprintId">Sprint</label>
                <select id="f_sprintId" name="sprintId">\${sprintOptions}</select>
              </div>
              <div class="field">
                <label for="f_epicId">Epic</label>
                <select id="f_epicId" name="epicId">\${epicOptions}</select>
              </div>
              <div class="field">
                <label for="f_dueDate">Due Date</label>
                <input id="f_dueDate" name="dueDate" type="date" value="\${escapeHtmlAttr((t.dueDate || "").slice(0,10))}" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="f_tags">Tags (comma-separated)</label>
                <input id="f_tags" name="tags" value="\${escapeHtmlAttr(Array.isArray(t.tags) ? t.tags.join(", ") : "")}" placeholder="content, outreach, ops" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="f_description">Description (markdown)</label>
                <textarea id="f_description" name="description" placeholder="Context, constraints, links…">\${escapeHtmlText(t.description || "")}</textarea>
              </div>

              <div class="field">
                <label for="f_waitingOn">Waiting On</label>
                <input id="f_waitingOn" name="waitingOn" value="\${escapeHtmlAttr(t.waitingOn || "")}" placeholder="Who/what is blocking?" autocomplete="off" />
              </div>
              <div class="field">
                <label for="f_deliverableUrl">Deliverable URL</label>
                <input id="f_deliverableUrl" name="deliverableUrl" type="url" inputmode="url" value="\${escapeHtmlAttr(t.deliverableUrl || "")}" placeholder="https://example.com/…" autocomplete="off" />
              </div>

              <div class="field">
                <label for="f_estimatedHours">Estimated Hours</label>
                <input id="f_estimatedHours" name="estimatedHours" type="number" step="0.5" value="\${escapeHtmlAttr(t.estimatedHours == null ? "" : String(t.estimatedHours))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="f_actualHours">Actual Hours</label>
                <input id="f_actualHours" name="actualHours" type="number" step="0.5" value="\${escapeHtmlAttr(t.actualHours == null ? "" : String(t.actualHours))}" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="f_notes">Notes (markdown)</label>
                <textarea id="f_notes" name="notes" placeholder="Progress, decisions, next steps…">\${escapeHtmlText(t.notes || "")}</textarea>
              </div>
            </div>
          \`;

          els.form.querySelector("#f_owner").value = t.owner || "pinch";
          els.form.querySelector("#f_status").value = t.status || "backlog";
          els.form.querySelector("#f_priority").value = t.priority || "medium";
          els.form.querySelector("#f_type").value = t.type || "task";
          els.form.querySelector("#f_sprintId").value = t.sprintId || "";
          els.form.querySelector("#f_epicId").value = t.epicId || "";

          els.btnDelete.style.display = task && task.id ? "inline-flex" : "none";
          els.btnRestore.style.display = task && task.archivedAt ? "inline-flex" : "none";
          els.btnSave.disabled = false;

          const first = els.form.querySelector("#f_title");
          if (first) first.focus();
        }

        function closeDialog(){
          els.overlay.classList.remove("open");
          els.overlay.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          state.editing = null;
          state.creatingStatus = null;
        }

        function openNewTask(status){
          state.creatingStatus = status || "backlog";
          openDialog("new", null);
        }

        function openEditTask(task){
          openDialog("edit", task);
        }

        function escapeHtmlText(s){
          return String(s)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
        }
        function escapeHtmlAttr(s){
          return escapeHtmlText(s).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
        }

        function fmtDateLong(iso){
          try {
            const d = new Date(String(iso));
            if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
            return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
          } catch {
            return String(iso).slice(0, 10);
          }
        }

        async function refresh(){
          state.loading = true;
          const [tasks, sprints, epics, metrics, dashboard] = await Promise.all([
            api("/tasks", { method: "GET" }),
            api("/sprints", { method: "GET" }),
            api("/epics", { method: "GET" }),
            api("/metrics?limit=26", { method: "GET" }),
            api("/dashboard", { method: "GET" }),
          ]);
          state.tasks = tasks.items || [];
          state.sprints = sprints.items || [];
          state.epics = epics.items || [];
          state.metrics = metrics.items || [];
          state.dashboard = dashboard || null;
          renderSprints(state.sprints);
          renderEpicsFilter(state.epics);
          ensureOwnerOptions();

          if (!urlFilters.applied) {
            if (urlFilters.sprintId) els.sprint.value = urlFilters.sprintId;
            if (urlFilters.owner) els.owner.value = urlFilters.owner;
            if (urlFilters.epicId) els.epic.value = urlFilters.epicId;
            urlFilters.applied = true;
          }

          renderDashboardChips();
          renderBoard();
          syncUrlFromFilters();
          state.loading = false;
        }

        async function onSave(){
          const fd = new FormData(els.form);
          const payload = {
            title: String(fd.get("title") || "").trim(),
            owner: String(fd.get("owner") || ""),
            status: String(fd.get("status") || ""),
            priority: String(fd.get("priority") || ""),
            type: String(fd.get("type") || ""),
            sprintId: String(fd.get("sprintId") || "") || null,
            dueDate: String(fd.get("dueDate") || "") || null,
            epicId: String(fd.get("epicId") || "") || null,
            waitingOn: String(fd.get("waitingOn") || "") || null,
            deliverableUrl: String(fd.get("deliverableUrl") || "") || null,
            estimatedHours: fd.get("estimatedHours") === "" ? null : Number(fd.get("estimatedHours")),
            actualHours: fd.get("actualHours") === "" ? null : Number(fd.get("actualHours")),
            description: String(fd.get("description") || ""),
            notes: String(fd.get("notes") || ""),
            tags: String(fd.get("tags") || "")
              .split(",")
              .map(s => s.trim())
              .filter(Boolean),
          };

          if (!payload.title) {
            toast("Title is required.", "warn");
            return;
          }

          els.btnSave.disabled = true;
          els.btnSave.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Saving…</span>';
          try {
            if (state.editing && state.editing.id) {
              await api("/tasks/" + encodeURIComponent(state.editing.id), { method: "PATCH", body: JSON.stringify(payload) });
              toast("Task updated.", "ok");
            } else {
              await api("/tasks", { method: "POST", body: JSON.stringify(payload) });
              toast("Task created.", "ok");
            }
            closeDialog();
            await refresh();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnSave.disabled = false;
            els.btnSave.innerHTML = "Save";
          }
        }

        async function onDelete(){
          if (!state.editing || !state.editing.id) return;
          const ok = confirm("Delete this task? This is a soft delete (archived).");
          if (!ok) return;
          els.btnDelete.disabled = true;
          try {
            await api("/tasks/" + encodeURIComponent(state.editing.id), { method: "DELETE" });
            toast("Task archived.", "ok");
            closeDialog();
            await refresh();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnDelete.disabled = false;
          }
        }

        async function onRestore(){
          if (!state.editing || !state.editing.id) return;
          els.btnRestore.disabled = true;
          try {
            await api("/tasks/" + encodeURIComponent(state.editing.id), { method: "PATCH", body: JSON.stringify({ archivedAt: null }) });
            toast("Task restored.", "ok");
            closeDialog();
            await refresh();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnRestore.disabled = false;
          }
        }

        function openSprints(){
          state.editingSprint = null;
          renderSprintManager();
          els.overlaySprints.classList.add("open");
          els.overlaySprints.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }

        function closeSprints(){
          els.overlaySprints.classList.remove("open");
          els.overlaySprints.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          state.editingSprint = null;
        }

        function renderSprintManager(){
          const items = (state.sprints || []).filter(s => !s.archivedAt);
          els.sprintList.innerHTML = "";
          for (const s of items) {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "btn";
            row.style.width = "100%";
            row.style.textAlign = "left";
            row.style.display = "grid";
            row.style.gap = "4px";
            row.style.padding = "12px";
            row.style.background = (state.editingSprint && state.editingSprint.id === s.id) ? "rgba(14,165,233,0.10)" : "rgba(255,255,255,0.85)";
            row.innerHTML =
              '<div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;">' +
                '<div style="font-weight:700;color:rgba(12,74,110,0.92)">' + escapeHtmlText(s.name) + '</div>' +
                '<div class="badge" style="font-variant-numeric:tabular-nums;">' + escapeHtmlText(s.status) + '</div>' +
              '</div>' +
              '<div style="font-size:12px;color:rgba(12,74,110,0.65);line-height:1.3;">' +
                escapeHtmlText(s.goal || "") +
              '</div>';
            row.addEventListener("click", () => {
              state.editingSprint = s;
              fillSprintForm(s);
              renderSprintManager();
            });
            els.sprintList.appendChild(row);
          }

          if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "empty";
            empty.textContent = "No sprints yet. Create one to start tracking weekly rhythm.";
            els.sprintList.appendChild(empty);
          }

          fillSprintForm(state.editingSprint);
        }

        function fillSprintForm(s){
          const sprint = s || { id: "", name: "", goal: "", startDate: "", endDate: "", status: "planning" };
          els.sprintForm.innerHTML = \`
            <div class="formGrid">
              <div class="field full">
                <label for="sp_name">Name</label>
                <input id="sp_name" name="name" value="\${escapeHtmlAttr(sprint.name || "")}" placeholder="Sprint 1 — Foundation" autocomplete="off" />
              </div>
              <div class="field full">
                <label for="sp_goal">Goal</label>
                <input id="sp_goal" name="goal" value="\${escapeHtmlAttr(sprint.goal || "")}" placeholder="One-line objective" autocomplete="off" />
              </div>
              <div class="field">
                <label for="sp_status">Status</label>
                <select id="sp_status" name="status">
                  <option value="planning">planning</option>
                  <option value="active">active</option>
                  <option value="review">review</option>
                  <option value="closed">closed</option>
                </select>
              </div>
              <div class="field">
                <label for="sp_startDate">Start</label>
                <input id="sp_startDate" name="startDate" type="date" value="\${escapeHtmlAttr((sprint.startDate || "").slice(0,10))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="sp_endDate">End</label>
                <input id="sp_endDate" name="endDate" type="date" value="\${escapeHtmlAttr((sprint.endDate || "").slice(0,10))}" autocomplete="off" />
              </div>
              <div class="field full">
                <div class="hint">
                  Set a sprint to <strong>active</strong> to make it the default in the sprint dropdown. Only one sprint can be active at a time.
                </div>
              </div>
            </div>
          \`;
          els.sprintForm.querySelector("#sp_status").value = sprint.status || "planning";
          els.btnSprintSave.disabled = !sprint.id;
          els.btnSprintArchive.disabled = !sprint.id;
          els.btnSprintCloseSprint.disabled = !sprint.id || sprint.status === "closed";
        }

        async function onSprintNew(){
          const name = prompt("Sprint name (e.g., Sprint 1 — Foundation):");
          if (!name) return;
          const goal = prompt("One-line sprint goal:") || "";
          try {
            await api("/sprints", { method: "POST", body: JSON.stringify({ name, goal, status: "planning" }) });
            toast("Sprint created.", "ok");
            await refresh();
            openSprints();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          }
        }

        async function onSprintSave(){
          if (!state.editingSprint || !state.editingSprint.id) return;
          const fd = new FormData(els.sprintForm);
          const payload = {
            name: String(fd.get("name") || "").trim(),
            goal: String(fd.get("goal") || ""),
            status: String(fd.get("status") || "planning"),
            startDate: String(fd.get("startDate") || "") || null,
            endDate: String(fd.get("endDate") || "") || null,
          };
          if (!payload.name) {
            toast("Sprint name is required.", "warn");
            return;
          }
          els.btnSprintSave.disabled = true;
          try {
            await api("/sprints/" + encodeURIComponent(state.editingSprint.id), { method: "PATCH", body: JSON.stringify(payload) });
            toast("Sprint updated.", "ok");
            await refresh();
            openSprints();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnSprintSave.disabled = false;
          }
        }

        async function onSprintArchive(){
          if (!state.editingSprint || !state.editingSprint.id) return;
          const ok = confirm("Archive this sprint? Tasks will remain and can be filtered by sprintId.");
          if (!ok) return;
          els.btnSprintArchive.disabled = true;
          try {
            await api("/sprints/" + encodeURIComponent(state.editingSprint.id), { method: "DELETE" });
            toast("Sprint archived.", "ok");
            await refresh();
            openSprints();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnSprintArchive.disabled = false;
          }
        }

        async function onSprintCloseSprint(){
          if (!state.editingSprint || !state.editingSprint.id) return;
          const ok = confirm("Close this sprint? Incomplete tasks will be carried over (sprint cleared).");
          if (!ok) return;
          els.btnSprintCloseSprint.disabled = true;
          try {
            await api("/sprints/" + encodeURIComponent(state.editingSprint.id) + "/close", { method: "POST" });
            toast("Sprint closed.", "ok");
            await refresh();
            openSprints();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnSprintCloseSprint.disabled = false;
          }
        }

        function openEpics(){
          state.editingEpic = null;
          renderEpicManager();
          els.overlayEpics.classList.add("open");
          els.overlayEpics.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }

        function closeEpics(){
          els.overlayEpics.classList.remove("open");
          els.overlayEpics.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          state.editingEpic = null;
        }

        function renderEpicManager(){
          const items = (state.epics || []).filter(e => !e.archivedAt);
          els.epicList.innerHTML = "";
          for (const e of items) {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "btn";
            row.style.width = "100%";
            row.style.textAlign = "left";
            row.style.display = "grid";
            row.style.gap = "4px";
            row.style.padding = "12px";
            row.style.background = (state.editingEpic && state.editingEpic.id === e.id) ? "rgba(34,197,94,0.10)" : "rgba(255,255,255,0.85)";
            row.innerHTML =
              '<div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;">' +
                '<div style="font-weight:700;color:rgba(12,74,110,0.92)">' + escapeHtmlText(e.title) + '</div>' +
                '<div class="badge" style="font-variant-numeric:tabular-nums;">' + escapeHtmlText(e.status) + '</div>' +
              '</div>' +
              '<div style="font-size:12px;color:rgba(12,74,110,0.65);line-height:1.3;">' +
                escapeHtmlText(e.description || "") +
              '</div>';
            row.addEventListener("click", () => {
              state.editingEpic = e;
              fillEpicForm(e);
              renderEpicManager();
            });
            els.epicList.appendChild(row);
          }

          if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "empty";
            empty.textContent = "No epics yet. Create one to group related work.";
            els.epicList.appendChild(empty);
          }

          fillEpicForm(state.editingEpic);
        }

        function fillEpicForm(e){
          const epic = e || { id: "", title: "", description: "", owner: "pinch", status: "active", targetDate: "" };
          els.epicForm.innerHTML = \`
            <div class="formGrid">
              <div class="field full">
                <label for="ep_title">Title</label>
                <input id="ep_title" name="title" value="\${escapeHtmlAttr(epic.title || "")}" placeholder="LinkedIn Content Engine" autocomplete="off" />
              </div>
              <div class="field">
                <label for="ep_owner">Owner</label>
                <select id="ep_owner" name="owner">
                  \${OWNERS.map(o => '<option value="'+o.id+'">'+escapeHtmlText(o.label)+'</option>').join("")}
                </select>
              </div>
              <div class="field">
                <label for="ep_status">Status</label>
                <select id="ep_status" name="status">
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div class="field">
                <label for="ep_targetDate">Target Date</label>
                <input id="ep_targetDate" name="targetDate" type="date" value="\${escapeHtmlAttr((epic.targetDate || "").slice(0,10))}" autocomplete="off" />
              </div>
              <div class="field full">
                <label for="ep_description">Description</label>
                <textarea id="ep_description" name="description" placeholder="What does success look like…">\${escapeHtmlText(epic.description || "")}</textarea>
              </div>
            </div>
          \`;
          els.epicForm.querySelector("#ep_owner").value = epic.owner || "pinch";
          els.epicForm.querySelector("#ep_status").value = epic.status || "active";
          els.btnEpicSave.disabled = !epic.id;
          els.btnEpicArchive.disabled = !epic.id;
        }

        async function onEpicNew(){
          const title = prompt("Epic title (e.g., LinkedIn Content Engine):");
          if (!title) return;
          try {
            await api("/epics", { method: "POST", body: JSON.stringify({ title, owner: "pinch", status: "active" }) });
            toast("Epic created.", "ok");
            await refresh();
            openEpics();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          }
        }

        async function onEpicSave(){
          if (!state.editingEpic || !state.editingEpic.id) return;
          const fd = new FormData(els.epicForm);
          const payload = {
            title: String(fd.get("title") || "").trim(),
            owner: String(fd.get("owner") || "pinch"),
            status: String(fd.get("status") || "active"),
            targetDate: String(fd.get("targetDate") || "") || null,
            description: String(fd.get("description") || ""),
          };
          if (!payload.title) {
            toast("Epic title is required.", "warn");
            return;
          }
          els.btnEpicSave.disabled = true;
          try {
            await api("/epics/" + encodeURIComponent(state.editingEpic.id), { method: "PATCH", body: JSON.stringify(payload) });
            toast("Epic updated.", "ok");
            await refresh();
            openEpics();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnEpicSave.disabled = false;
          }
        }

        async function onEpicArchive(){
          if (!state.editingEpic || !state.editingEpic.id) return;
          const ok = confirm("Archive this epic? Tasks will remain and can be filtered by epicId.");
          if (!ok) return;
          els.btnEpicArchive.disabled = true;
          try {
            await api("/epics/" + encodeURIComponent(state.editingEpic.id), { method: "DELETE" });
            toast("Epic archived.", "ok");
            await refresh();
            openEpics();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnEpicArchive.disabled = false;
          }
        }

        function mondayIsoFor(date){
          const d = new Date(date);
          const day = d.getDay(); // local is fine for UI
          const diffToMonday = (day + 6) % 7;
          d.setDate(d.getDate() - diffToMonday);
          return d.toISOString().slice(0, 10);
        }

        function openMetrics(){
          state.editingMetrics = null;
          renderMetricsManager();
          els.overlayMetrics.classList.add("open");
          els.overlayMetrics.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }

        function closeMetrics(){
          els.overlayMetrics.classList.remove("open");
          els.overlayMetrics.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          state.editingMetrics = null;
        }

        function renderMetricsManager(){
          const items = (state.metrics || []).filter(m => !m.archivedAt).slice().sort((a,b) => String(b.weekOf).localeCompare(String(a.weekOf)));
          els.metricsList.innerHTML = "";

          for (const m of items) {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "btn";
            row.style.width = "100%";
            row.style.textAlign = "left";
            row.style.display = "grid";
            row.style.gap = "4px";
            row.style.padding = "12px";
            row.style.background = (state.editingMetrics && state.editingMetrics.id === m.id) ? "rgba(14,165,233,0.10)" : "rgba(255,255,255,0.85)";

            const mg = (m.metrics || {});
            row.innerHTML =
              '<div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;">' +
                '<div style="font-weight:700;color:rgba(12,74,110,0.92)">Week of ' + escapeHtmlText(fmtDateLong(m.weekOf)) + '</div>' +
                '<div class="badge" style="font-variant-numeric:tabular-nums;">' + (Number(mg.leadsGenerated || 0)) + ' leads</div>' +
              '</div>' +
              '<div style="font-size:12px;color:rgba(12,74,110,0.65);line-height:1.3;">' +
                (Number(mg.meetingsBooked || 0)) + ' meetings · ' + (Number(mg.outreachSent || 0)) + ' outreach' +
              '</div>';
            row.addEventListener("click", () => {
              state.editingMetrics = m;
              fillMetricsForm(m);
              renderMetricsManager();
            });
            els.metricsList.appendChild(row);
          }

          if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "empty";
            empty.textContent = "No snapshots yet. Add one on Friday to keep the team honest.";
            els.metricsList.appendChild(empty);
          }

          fillMetricsForm(state.editingMetrics);
        }

        function fillMetricsForm(m){
          const snapshot = m || {
            id: "",
            weekOf: mondayIsoFor(new Date()),
            sprintId: (els.sprint.value || ""),
            metrics: {},
            notes: "",
          };

          const sprintOptions = ['<option value="">(none)</option>']
            .concat((state.sprints || []).filter(s => !s.archivedAt).map(s => '<option value="'+escapeHtmlAttr(s.id)+'">'+escapeHtmlText(s.name)+'</option>'))
            .join('');

          const mg = snapshot.metrics || {};

          function num(v){ return v == null ? "" : String(v); }

          els.metricsForm.innerHTML = \`
            <div class="formGrid">
              <div class="field">
                <label for="m_weekOf">Week Of (Monday)</label>
                <input id="m_weekOf" name="weekOf" type="date" value="\${escapeHtmlAttr(String(snapshot.weekOf || "").slice(0,10))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_sprintId">Sprint</label>
                <select id="m_sprintId" name="sprintId">\${sprintOptions}</select>
              </div>

              <div class="field">
                <label for="m_leadsGenerated">Leads Generated</label>
                <input id="m_leadsGenerated" name="leadsGenerated" type="number" step="1" value="\${escapeHtmlAttr(num(mg.leadsGenerated || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_leadsQualified">Leads Qualified</label>
                <input id="m_leadsQualified" name="leadsQualified" type="number" step="1" value="\${escapeHtmlAttr(num(mg.leadsQualified || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_outreachSent">Outreach Sent</label>
                <input id="m_outreachSent" name="outreachSent" type="number" step="1" value="\${escapeHtmlAttr(num(mg.outreachSent || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_responsesReceived">Responses Received</label>
                <input id="m_responsesReceived" name="responsesReceived" type="number" step="1" value="\${escapeHtmlAttr(num(mg.responsesReceived || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_meetingsBooked">Meetings Booked</label>
                <input id="m_meetingsBooked" name="meetingsBooked" type="number" step="1" value="\${escapeHtmlAttr(num(mg.meetingsBooked || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_contentPublished">Content Published</label>
                <input id="m_contentPublished" name="contentPublished" type="number" step="1" value="\${escapeHtmlAttr(num(mg.contentPublished || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_linkedinImpressions">LinkedIn Impressions</label>
                <input id="m_linkedinImpressions" name="linkedinImpressions" type="number" step="1" value="\${escapeHtmlAttr(num(mg.linkedinImpressions || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_linkedinEngagement">LinkedIn Engagement</label>
                <input id="m_linkedinEngagement" name="linkedinEngagement" type="number" step="1" value="\${escapeHtmlAttr(num(mg.linkedinEngagement || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_websiteVisitors">Website Visitors</label>
                <input id="m_websiteVisitors" name="websiteVisitors" type="number" step="1" value="\${escapeHtmlAttr(num(mg.websiteVisitors || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_emailSubscribers">Email Subscribers</label>
                <input id="m_emailSubscribers" name="emailSubscribers" type="number" step="1" value="\${escapeHtmlAttr(num(mg.emailSubscribers || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_revenue">Revenue</label>
                <input id="m_revenue" name="revenue" type="number" step="1" value="\${escapeHtmlAttr(num(mg.revenue || 0))}" autocomplete="off" />
              </div>
              <div class="field">
                <label for="m_pipelineValue">Pipeline Value</label>
                <input id="m_pipelineValue" name="pipelineValue" type="number" step="1" value="\${escapeHtmlAttr(num(mg.pipelineValue || 0))}" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="m_notes">Notes</label>
                <textarea id="m_notes" name="notes" placeholder="What changed this week…">\${escapeHtmlText(snapshot.notes || "")}</textarea>
              </div>
            </div>
          \`;

          els.metricsForm.querySelector("#m_sprintId").value = snapshot.sprintId || "";
          els.btnMetricsSave.disabled = false;
          els.btnMetricsArchive.disabled = !snapshot.id;
        }

        async function onMetricsNew(){
          const weekOf = mondayIsoFor(new Date());
          const existing = (state.metrics || []).find(m => !m.archivedAt && m.weekOf === weekOf);
          if (existing) {
            state.editingMetrics = existing;
            fillMetricsForm(existing);
            renderMetricsManager();
            toast("Loaded existing snapshot for this week.", "ok");
            return;
          }
          state.editingMetrics = { id: "", weekOf, sprintId: (els.sprint.value || ""), metrics: {}, notes: "" };
          fillMetricsForm(state.editingMetrics);
          renderMetricsManager();
        }

        async function onMetricsSave(){
          const fd = new FormData(els.metricsForm);
          const weekOf = String(fd.get("weekOf") || "").slice(0,10);
          if (!weekOf) {
            toast("weekOf is required.", "warn");
            return;
          }

          const payload = {
            weekOf,
            sprintId: String(fd.get("sprintId") || "") || null,
            notes: String(fd.get("notes") || ""),
            metrics: {
              leadsGenerated: Number(fd.get("leadsGenerated") || 0),
              leadsQualified: Number(fd.get("leadsQualified") || 0),
              outreachSent: Number(fd.get("outreachSent") || 0),
              responsesReceived: Number(fd.get("responsesReceived") || 0),
              meetingsBooked: Number(fd.get("meetingsBooked") || 0),
              contentPublished: Number(fd.get("contentPublished") || 0),
              linkedinImpressions: Number(fd.get("linkedinImpressions") || 0),
              linkedinEngagement: Number(fd.get("linkedinEngagement") || 0),
              websiteVisitors: Number(fd.get("websiteVisitors") || 0),
              emailSubscribers: Number(fd.get("emailSubscribers") || 0),
              revenue: Number(fd.get("revenue") || 0),
              pipelineValue: Number(fd.get("pipelineValue") || 0),
            }
          };

          els.btnMetricsSave.disabled = true;
          try {
            if (state.editingMetrics && state.editingMetrics.id) {
              await api("/metrics/" + encodeURIComponent(state.editingMetrics.id), { method: "PATCH", body: JSON.stringify(payload) });
              toast("Metrics updated.", "ok");
            } else {
              await api("/metrics", { method: "POST", body: JSON.stringify(payload) });
              toast("Metrics saved.", "ok");
            }
            await refresh();
            openMetrics();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnMetricsSave.disabled = false;
          }
        }

        async function onMetricsArchive(){
          if (!state.editingMetrics || !state.editingMetrics.id) return;
          const ok = confirm("Archive this snapshot?");
          if (!ok) return;
          els.btnMetricsArchive.disabled = true;
          try {
            await api("/metrics/" + encodeURIComponent(state.editingMetrics.id), { method: "DELETE" });
            toast("Snapshot archived.", "ok");
            await refresh();
            openMetrics();
          } catch (err) {
            toast(String(err && err.message ? err.message : err), "danger");
          } finally {
            els.btnMetricsArchive.disabled = false;
          }
        }

        function bind(){
          els.btnNew.addEventListener("click", () => openNewTask("backlog"));
          els.btnMetrics.addEventListener("click", openMetrics);
          els.btnSprints.addEventListener("click", openSprints);
          els.btnEpics.addEventListener("click", openEpics);
          els.btnClose.addEventListener("click", closeDialog);
          els.overlay.addEventListener("click", (e) => { if (e.target === els.overlay) closeDialog(); });
          document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") return;
            if (els.overlay.classList.contains("open")) return closeDialog();
            if (els.overlaySprints.classList.contains("open")) return closeSprints();
            if (els.overlayEpics.classList.contains("open")) return closeEpics();
            if (els.overlayMetrics.classList.contains("open")) return closeMetrics();
          });
          els.btnSave.addEventListener("click", onSave);
          els.btnDelete.addEventListener("click", onDelete);
          els.btnRestore.addEventListener("click", onRestore);

          els.btnSprintClose.addEventListener("click", closeSprints);
          els.overlaySprints.addEventListener("click", (e) => { if (e.target === els.overlaySprints) closeSprints(); });
          els.btnSprintNew.addEventListener("click", onSprintNew);
          els.btnSprintSave.addEventListener("click", onSprintSave);
          els.btnSprintArchive.addEventListener("click", onSprintArchive);
          els.btnSprintCloseSprint.addEventListener("click", onSprintCloseSprint);

          els.btnEpicClose.addEventListener("click", closeEpics);
          els.overlayEpics.addEventListener("click", (e) => { if (e.target === els.overlayEpics) closeEpics(); });
          els.btnEpicNew.addEventListener("click", onEpicNew);
          els.btnEpicSave.addEventListener("click", onEpicSave);
          els.btnEpicArchive.addEventListener("click", onEpicArchive);

          els.btnMetricsClose.addEventListener("click", closeMetrics);
          els.overlayMetrics.addEventListener("click", (e) => { if (e.target === els.overlayMetrics) closeMetrics(); });
          els.btnMetricsNew.addEventListener("click", onMetricsNew);
          els.btnMetricsSave.addEventListener("click", onMetricsSave);
          els.btnMetricsArchive.addEventListener("click", onMetricsArchive);

          function onFiltersChanged(){
            renderBoard();
            syncUrlFromFilters();
          }

          els.sprint.addEventListener("change", onFiltersChanged);
          els.owner.addEventListener("change", onFiltersChanged);
          els.epic.addEventListener("change", onFiltersChanged);
          els.archived.addEventListener("change", onFiltersChanged);
          els.q.addEventListener("input", debounce(onFiltersChanged, 120));
        }

        function debounce(fn, ms){
          let t = null;
          return function(){
            clearTimeout(t);
            const args = arguments;
            t = setTimeout(() => fn.apply(null, args), ms);
          }
        }

        bind();
        refresh().catch((err) => toast(String(err && err.message ? err.message : err), "danger"));
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const prefix = url.pathname.replace(/\/board\/?$/, '');
  const apiBase = prefix + '/api';

  const body = `
    <a class="skip" href="#board">Skip to board</a>
    <div class="topbar">
      <div class="topbarInner">
        <div class="brand">
          <div>
            <div class="kicker">TeachInspire</div>
            <h1 class="title">Growth Board</h1>
            <div class="subTitle">Editable kanban + sprint rhythm</div>
          </div>
        </div>
        <div class="controls">
          <div class="ctrl" title="Sprint filter">
            <label for="sprint">Sprint</label>
            <select id="sprint" name="sprintId" aria-label="Sprint filter"></select>
          </div>
	          <div class="ctrl" title="Owner filter">
	            <label for="owner">Owner</label>
            <select id="owner" name="owner" aria-label="Owner filter">
              <option value="">All owners</option>
            </select>
          </div>
	          <div class="ctrl" title="Epic filter">
	            <label for="epic">Epic</label>
            <select id="epic" name="epicId" aria-label="Epic filter">
              <option value="">All epics</option>
            </select>
          </div>
	          <div class="ctrl" title="Search">
	            <label for="q">Search</label>
            <input id="q" name="q" type="search" placeholder="title, tag, notes…" autocomplete="off" />
          </div>
          <div class="ctrl" title="Show archived tasks">
            <label for="archived">Archived</label>
            <input id="archived" name="archived" type="checkbox" style="width:18px;height:18px;min-height:auto;" />
          </div>
          <button class="btn btnPrimary" id="btnNew" type="button">New Task</button>
	          <button class="btn" id="btnMetrics" type="button">Metrics</button>
	          <button class="btn" id="btnSprints" type="button">Sprints</button>
	          <button class="btn" id="btnEpics" type="button">Epics</button>
	          <a class="btn" href="${prefix}/" style="display:inline-flex;align-items:center;justify-content:center;">Docs</a>
	        </div>
      </div>
    </div>
    <div class="wrap">
	      <div class="stats" aria-label="Board stats">
	        <span class="chip"><span class="dot"></span> Total <strong id="chipTotal" style="margin-left:6px;font-variant-numeric:tabular-nums;">0</strong></span>
	        <span class="chip"><span class="dot" style="background: var(--color-secondary)"></span> Active <strong id="chipActive" style="margin-left:6px;font-variant-numeric:tabular-nums;">0</strong></span>
	        <span class="chip"><span class="dot" style="background: var(--color-cta)"></span> Done <strong id="chipDone" style="margin-left:6px;font-variant-numeric:tabular-nums;">0</strong></span>
	        <span class="chip"><span class="dot" style="background: rgba(3,105,161,0.75)"></span> <span id="chipSprint">Sprint: …</span></span>
	        <span class="chip"><span class="dot" style="background: rgba(34,197,94,0.75)"></span> <span id="chipWeek">Metrics: …</span></span>
	        <span class="chip" style="margin-left:auto">Tip: drag cards across columns</span>
	      </div>
      <div id="board" class="board" aria-label="Kanban board"></div>
    </div>

    <div class="dialogOverlay" id="overlay" aria-hidden="true">
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialogTitle">
        <div class="dialogHead">
          <p class="dialogTitle" id="dialogTitle">Edit Task</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <button class="btn btnDanger" id="btnDelete" type="button" style="display:none;">Delete</button>
            <button class="btn" id="btnRestore" type="button" style="display:none;">Restore</button>
            <button class="btn" id="btnClose" type="button">Close</button>
            <button class="btn btnPrimary" id="btnSave" type="button">Save</button>
          </div>
        </div>
        <div class="dialogBody">
          <form id="form" onsubmit="return false"></form>
          <p class="hint" style="margin-top:14px;">
            Everything here is manually editable. Delete is a soft delete (archived) so you can recover if needed.
          </p>
        </div>
      </div>
    </div>

    <div class="dialogOverlay" id="overlaySprints" aria-hidden="true">
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="sprintsTitle">
        <div class="dialogHead">
          <p class="dialogTitle" id="sprintsTitle">Sprints</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <button class="btn" id="btnSprintNew" type="button">New Sprint</button>
            <button class="btn" id="btnSprintClose" type="button">Close</button>
          </div>
        </div>
        <div class="dialogBody">
          <div class="formGrid" style="grid-template-columns: 1fr;">
            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
              <div class="kicker" style="margin-bottom:10px;">Sprint List</div>
              <div id="sprintList" style="display:grid; gap:10px;"></div>
            </div>
            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
	              <div class="row" style="margin-bottom:10px;">
	                <div class="kicker">Edit Sprint</div>
	                <div style="display:flex;gap:10px;align-items:center;">
	                  <button class="btn btnDanger" id="btnSprintArchive" type="button">Archive</button>
	                  <button class="btn" id="btnSprintCloseSprint" type="button">Close Sprint</button>
	                  <button class="btn btnPrimary" id="btnSprintSave" type="button">Save</button>
	                </div>
	              </div>
              <form id="sprintForm" onsubmit="return false"></form>
            </div>
          </div>
          <p class="hint" style="margin-top:14px;">
            Setting a sprint to <strong>active</strong> automatically deactivates any other active sprint.
          </p>
        </div>
      </div>
    </div>

	    <div class="dialogOverlay" id="overlayEpics" aria-hidden="true">
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="epicsTitle">
        <div class="dialogHead">
          <p class="dialogTitle" id="epicsTitle">Epics</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <button class="btn" id="btnEpicNew" type="button">New Epic</button>
            <button class="btn" id="btnEpicClose" type="button">Close</button>
          </div>
        </div>
        <div class="dialogBody">
          <div class="formGrid" style="grid-template-columns: 1fr;">
            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
              <div class="kicker" style="margin-bottom:10px;">Epic List</div>
              <div id="epicList" style="display:grid; gap:10px;"></div>
            </div>
            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
              <div class="row" style="margin-bottom:10px;">
                <div class="kicker">Edit Epic</div>
                <div style="display:flex;gap:10px;align-items:center;">
                  <button class="btn btnDanger" id="btnEpicArchive" type="button">Archive</button>
                  <button class="btn btnPrimary" id="btnEpicSave" type="button">Save</button>
                </div>
              </div>
              <form id="epicForm" onsubmit="return false"></form>
            </div>
          </div>
        </div>
      </div>
	    </div>

	    <div class="dialogOverlay" id="overlayMetrics" aria-hidden="true">
	      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="metricsTitle">
	        <div class="dialogHead">
	          <p class="dialogTitle" id="metricsTitle">Weekly Metrics</p>
	          <div style="display:flex;gap:10px;align-items:center;">
	            <button class="btn" id="btnMetricsNew" type="button">New Snapshot</button>
	            <button class="btn" id="btnMetricsClose" type="button">Close</button>
	          </div>
	        </div>
	        <div class="dialogBody">
	          <div class="formGrid" style="grid-template-columns: 1fr;">
	            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
	              <div class="kicker" style="margin-bottom:10px;">Snapshots</div>
	              <div id="metricsList" style="display:grid; gap:10px;"></div>
	            </div>
	            <div class="card" style="background: rgba(255,255,255,0.72); border: 1px solid rgba(12,74,110,0.14); border-radius: var(--r-md); padding: 12px;">
	              <div class="row" style="margin-bottom:10px;">
	                <div class="kicker">Edit Snapshot</div>
	                <div style="display:flex;gap:10px;align-items:center;">
	                  <button class="btn btnDanger" id="btnMetricsArchive" type="button">Archive</button>
	                  <button class="btn btnPrimary" id="btnMetricsSave" type="button">Save</button>
	                </div>
	              </div>
	              <form id="metricsForm" onsubmit="return false"></form>
	            </div>
	          </div>
	          <p class="hint" style="margin-top:14px;">
	            Snapshots are weekly (weekOf = Monday). Save uses upsert by weekOf to avoid duplicates.
	          </p>
	        </div>
	      </div>
	    </div>

	    <div class="toastWrap" id="toastWrap" aria-live="polite" aria-atomic="true"></div>
	  `;

  return htmlPage(body, apiBase);
};
