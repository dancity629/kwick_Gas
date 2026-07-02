// ============================================================
// GasGo — Shared UI Utilities
// ============================================================

// ── Toast ─────────────────────────────────────────────────────
const Toast = {
  _container: null,
  init() {
    if (!this._container) {
      this._container = document.createElement("div");
      this._container.className = "toast-container";
      document.body.appendChild(this._container);
    }
  },
  show(msg, type = "success", duration = 3500) {
    this.init();
    const icons = {
      success: "✓",
      error: "✕",
      info: "ℹ",
      warn: "⚠"
    };
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    this._container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(120%)";
      el.style.transition = "0.3s";
      setTimeout(() => el.remove(), 300);
    }, duration);
  },
  success: (m) => Toast.show(m, "success"),
  error: (m) => Toast.show(m, "error"),
  info: (m) => Toast.show(m, "info"),
  warn: (m) => Toast.show(m, "warn"),
};

// ── Modal ─────────────────────────────────────────────────────
const Modal = {
  create({
    id,
    title,
    body,
    footer = "",
    size = ""
  }) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      el.className = "modal-overlay";
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <div class="modal ${size}" style="max-width:${size === 'lg' ? '700px' : '520px'}">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="Modal.close('${id}')">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>`;
    el.addEventListener("click", (e) => {
      if (e.target === el) Modal.close(id);
    });
    return el;
  },
  open(id) {
    document.getElementById(id) && id.classList.add("open");
    document.body.style.overflow = "hidden";
  },
  close(id) {
    document.getElementById(id) && id.classList.remove("open");
    document.body.style.overflow = "";
  },
  openWith({
    id,
    title,
    body,
    footer,
    size
  }) {
    Modal.create({
      id,
      title,
      body,
      footer,
      size
    });
    Modal.open(id);
  },
};

// ── Sidebar builder ───────────────────────────────────────────
function buildSidebar(role, activeKey) {
  const user = Auth.current();
  if (!user) return;

  const navs = {
    customer: [{
        key: "dashboard",
        icon: "⊞",
        label: t("dashboard"),
        href: "dashboard.html"
      },
      {
        key: "book",
        icon: "🛒",
        label: t("bookGas"),
        href: "book.html"
      },
      {
        key: "track",
        icon: "📍",
        label: t("trackOrder"),
        href: "track.html"
      },
      {
        key: "history",
        icon: "📋",
        label: t("orderHistory"),
        href: "history.html"
      },
      {
        key: "refill",
        icon: "🔮",
        label: t("smartRefill"),
        href: "refill.html"
      },
      {
        key: "chat",
        icon: "🤖",
        label: t("aiAssistant"),
        href: "chat.html"
      },
      {
        key: "emergency",
        icon: "🚨",
        label: t("emergency"),
        href: "emergency.html"
      },
    ],
    rider: [{
        key: "dashboard",
        icon: "⊞",
        label: t("dashboard"),
        href: "dashboard.html"
      },
      {
        key: "deliveries",
        icon: "📦",
        label: "My Deliveries",
        href: "deliveries.html"
      },
      {
        key: "route",
        icon: "🗺",
        label: t("route"),
        href: "route.html"
      },
      {
        key: "qrscan",
        icon: "📷",
        label: t("scanQR"),
        href: "qrscan.html"
      },
    ],
    admin: [{
        key: "dashboard",
        icon: "⊞",
        label: t("dashboard"),
        href: "dashboard.html"
      },
      {
        key: "orders",
        icon: "📦",
        label: t("orderMgmt"),
        href: "orders.html"
      },
      {
        key: "users",
        icon: "👥",
        label: t("userMgmt"),
        href: "users.html"
      },
      {
        key: "vendors",
        icon: "🏪",
        label: t("vendorMgmt"),
        href: "vendors.html"
      },
      {
        key: "analytics",
        icon: "📊",
        label: t("analytics"),
        href: "analytics.html"
      },
      {
        key: "reports",
        icon: "📄",
        label: t("reports"),
        href: "reports.html"
      },
    ],
  };

  const links = (navs[role] || []).map(n => `
    <a href="${n.href}" class="${n.key === activeKey ? 'active' : ''}">
      <span class="nav-icon">${n.icon}</span>${n.label}
    </a>`).join("");

  const unread = Notifications.unread(user.id).length;

  return `
    <div class="sidebar-logo">
      <div class="logo-mark">⛽ Gas<span>Go</span></div>
      <small>${t("tagline")}</small>
    </div>
    <nav class="sidebar-nav">${links}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="avatar">${user.name.charAt(0)}</div>
        <div class="sidebar-user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-role">${t(user.role)}</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm btn-full" onclick="Auth.logout()">🚪 ${t("logout")}</button>
    </div>`;
}

// ── Top bar builder ───────────────────────────────────────────
function buildTopbar(title, showNotif = true) {
  const user = Auth.current();
  const unread = user ? Notifications.unread(user.id).length : 0;
  return `
    <div class="topbar">
      <h1 class="topbar-title">${title}</h1>
      <div class="topbar-actions">
        <div class="lang-toggle">
          <button onclick="switchLang('en')" id="btn-en" class="${currentLang==='en'?'active':''}">EN</button>
          <button onclick="switchLang('ha')" id="btn-ha" class="${currentLang==='ha'?'active':''}">HA</button>
        </div>
        ${showNotif ? `
          <button class="notif-btn" onclick="openNotifPanel()">
            🔔${unread > 0 ? `<span class="notif-badge">${unread}</span>` : ''}
          </button>` : ''}
      </div>
    </div>`;
}

// ── Lang switcher ─────────────────────────────────────────────
function switchLang(lang) {
  setLang(lang);
  location.reload();
}

// ── Notification panel ─────────────────────────────────────────
function openNotifPanel() {
  const user = Auth.current();
  if (!user) return;
  const notifs = Notifications.forUser(user.id);
  Notifications.markRead(user.id);
  const body = notifs.length === 0 ?
    `<div class="empty-state"><div class="empty-icon">🔔</div><p>No notifications</p></div>` :
    notifs.map(n => `
      <div style="padding:12px 0;border-bottom:1px solid var(--border)">
        <p style="color:var(--text);font-size:.875rem;margin:0 0 4px">${n.message}</p>
        <small>${fmt.date(n.createdAt)} ${fmt.time(n.createdAt)}</small>
      </div>`).join("");

  Modal.openWith({
    id: "notif-modal",
    title: "🔔 " + t("notifications"),
    body
  });
}

// ── Init page (called by each page) ──────────────────────────
function initPage(role, activeKey, pageTitle) {
  const user = Auth.requireAuth(role);
  if (!user) return null;

  // Build the application layout if it doesn't exist
  const app = document.getElementById("appLayout");

  if (app && !document.getElementById("mainContent")) {
    app.innerHTML = `
      <aside class="sidebar" id="sidebar"></aside>

      <div class="main-wrapper">
        <header id="topbar"></header>

        <main id="mainContent" class="page-content"></main>
      </div>
    `;
  }

  // Populate sidebar
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.innerHTML = buildSidebar(role, activeKey);
  }

  // Populate topbar
  const topbar = document.getElementById("topbar");
  if (topbar) {
    topbar.innerHTML = buildTopbar(pageTitle || t(activeKey));
  }

  return user;
}
// ── Gauge SVG renderer ─────────────────────────────────────────
function renderGauge(pct, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const r = 50,
    circ = 2 * Math.PI * r;
  const fill = circ * (1 - pct / 100);
  const color = pct >= 75 ? "var(--red)" : pct >= 40 ? "var(--yellow)" : "var(--green)";
  el.innerHTML = `
    <div class="gauge">
      <svg viewBox="0 0 120 120" width="120" height="120">
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--border)" stroke-width="12"/>
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="12"
          stroke-dasharray="${circ}" stroke-dashoffset="${fill}" stroke-linecap="round"
          style="transition:stroke-dashoffset .6s ease"/>
      </svg>
      <div class="gauge-center">
        <span class="gauge-pct" style="color:${color}">${pct}%</span>
        <span class="gauge-sub">Used</span>
      </div>
    </div>`;
}

// ── Confirm helper ─────────────────────────────────────────────
function confirmAction(message, onConfirm) {
  Modal.openWith({
    id: "confirm-modal",
    title: "Confirm Action",
    body: `<p style="color:var(--text);margin:8px 0">${message}</p>`,
    footer: `
      <button class="btn btn-secondary" onclick="Modal.close('confirm-modal')">Cancel</button>
      <button class="btn btn-danger" onclick="(${onConfirm.toString()})();Modal.close('confirm-modal')">Confirm</button>`
  });
}

// ── Paginate helper ─────────────────────────────────────────────
function paginate(arr, page, perPage = 10) {
  const start = (page - 1) * perPage;
  return {
    items: arr.slice(start, start + perPage),
    total: arr.length,
    pages: Math.ceil(arr.length / perPage)
  };
}