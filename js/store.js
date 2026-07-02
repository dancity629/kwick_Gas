// ============================================================
// GasGo — Shared LocalStorage Data Layer
// ============================================================

// ── Language strings ─────────────────────────────────────────
const LANG = {
  en: {
    appName: "GasGo",
    tagline: "Fast. Safe. Delivered.",
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    phone: "Phone",
    address: "Address",
    name: "Full Name",
    bookGas: "Book Gas",
    trackOrder: "Track Order",
    orderHistory: "Order History",
    smartRefill: "Smart Refill",
    aiAssistant: "AI Assistant",
    emergency: "Emergency Request",
    dashboard: "Dashboard",
    totalOrders: "Total Orders",
    pending: "Pending",
    delivered: "Delivered",
    cancelled: "Cancelled",
    cylinder: "Cylinder Size",
    quantity: "Quantity",
    paymentMethod: "Payment Method",
    cash: "Cash on Delivery",
    transfer: "Bank Transfer",
    wallet: "Wallet",
    placeOrder: "Place Order",
    orderPlaced: "Order placed successfully!",
    confirmDelivery: "Confirm Delivery",
    scanQR: "Scan QR Code",
    assignRider: "Assign Rider",
    refillDue: "Refill Due",
    daysLeft: "days left",
    notifications: "Notifications",
    settings: "Settings",
    vendorMgmt: "Vendor Management",
    userMgmt: "User Management",
    orderMgmt: "Order Management",
    analytics: "Analytics",
    reports: "Reports",
    addVendor: "Add Vendor",
    addUser: "Add User",
    status: "Status",
    action: "Action",
    search: "Search",
    filter: "Filter",
    export: "Export",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    close: "Close",
    submit: "Submit",
    back: "Back",
    next: "Next",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    welcome: "Welcome back",
    hello: "Hello",
    kg: "kg",
    price: "Price",
    total: "Total",
    rider: "Rider",
    customer: "Customer",
    admin: "Admin",
    vendor: "Vendor",
    route: "Route",
    eta: "ETA",
    minutes: "minutes",
    orderNo: "Order #",
    date: "Date",
    refillAlert: "Your gas is running low. Order now!",
    emergencyMsg: "Emergency gas request sent. A rider will contact you shortly.",
    noOrders: "No orders yet",
    revenue: "Revenue",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
  },
  ha: {
    appName: "GasGo",
    tagline: "Sauri. Aminci. Isarwa.",
    login: "Shiga",
    register: "Yi Rijista",
    logout: "Fita",
    email: "Imel",
    password: "Kalmar Sirri",
    phone: "Wayar Hannu",
    address: "Adireshi",
    name: "Cikakken Suna",
    bookGas: "Yi Odar Gas",
    trackOrder: "Bi Diddigin Oda",
    orderHistory: "Tarihin Oda",
    smartRefill: "Cika Mai Wayo",
    aiAssistant: "Mataimaki na AI",
    emergency: "Gaggawa",
    dashboard: "Allon Sarrafa",
    totalOrders: "Jimlar Oda",
    pending: "Ana Jira",
    delivered: "An Isar",
    cancelled: "An Soke",
    cylinder: "Girman Silinda",
    quantity: "Yawa",
    paymentMethod: "Hanyar Biya",
    cash: "Biya a Isarwa",
    transfer: "Canja Banki",
    wallet: "Walat",
    placeOrder: "Aika Oda",
    orderPlaced: "An yi oda cikin nasara!",
    confirmDelivery: "Tabbatar Isarwa",
    scanQR: "Duba Lambar QR",
    assignRider: "Naɗa Mai Keke",
    refillDue: "Lokacin Cika Ya Yi",
    daysLeft: "kwanaki suka rage",
    notifications: "Sanarwa",
    settings: "Saiti",
    vendorMgmt: "Sarrafa Masu Siyarwa",
    userMgmt: "Sarrafa Masu Amfani",
    orderMgmt: "Sarrafa Oda",
    analytics: "Bincike",
    reports: "Rahoto",
    addVendor: "Ƙara Mai Siyarwa",
    addUser: "Ƙara Mai Amfani",
    status: "Matsayi",
    action: "Aiki",
    search: "Nema",
    filter: "Tace",
    export: "Fitar",
    save: "Ajiye",
    cancel: "Soke",
    delete: "Goge",
    edit: "Gyara",
    view: "Duba",
    close: "Rufe",
    submit: "Aika",
    back: "Koma",
    next: "Na Gaba",
    loading: "Ana lodawa...",
    error: "An samu kuskure",
    success: "Nasara",
    welcome: "Barka da dawowan ka",
    hello: "Sannu",
    kg: "kg",
    price: "Farashi",
    total: "Jimla",
    rider: "Mai Keke",
    customer: "Abokin Ciniki",
    admin: "Gudanarwa",
    vendor: "Mai Siyarwa",
    route: "Hanya",
    eta: "Lokacin Isarwa",
    minutes: "mintuna",
    orderNo: "Oda #",
    date: "Kwanan Wata",
    refillAlert: "Gas ɗinka yana ƙarewa. Yi oda yanzu!",
    emergencyMsg: "An aika buƙatar gaggawa. Mai keke zai tuntube ka nan ba da jimawa ba.",
    noOrders: "Babu oda tukuna",
    revenue: "Kuɗin Shiga",
    today: "Yau",
    thisWeek: "Wannan Mako",
    thisMonth: "Wannan Wata",
  },
};

let currentLang = localStorage.getItem("gasgo_lang") || "en";
const t = (key) => LANG[currentLang][key] || key;
const setLang = (lang) => {
  currentLang = lang;
  localStorage.setItem("gasgo_lang", lang);
};

// ── Key helpers ───────────────────────────────────────────────
const KEYS = {
  users: "gasgo_users",
  orders: "gasgo_orders",
  riders: "gasgo_riders",
  vendors: "gasgo_vendors",
  notifications: "gasgo_notifications",
  currentUser: "gasgo_current_user",
  refillData: "gasgo_refill_data",
};

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const readObj = (key) => JSON.parse(localStorage.getItem(key) || "null");
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// ── ID generator ──────────────────────────────────────────────
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ── Seed demo data ────────────────────────────────────────────
const seed = () => {
  if (localStorage.getItem("gasgo_seeded")) return;

  const users = [{
      id: "u1",
      name: "Admin User",
      email: "admin@gasgo.com",
      password: "admin123",
      role: "admin",
      phone: "08000000001",
      address: "Admin HQ, Abuja",
      createdAt: new Date().toISOString()
    },
    {
      id: "u2",
      name: "Aminu Sule",
      email: "customer@gasgo.com",
      password: "cust123",
      role: "customer",
      phone: "08012345678",
      address: "12 Benue Crescent, Lafia",
      wallet: 5000,
      createdAt: new Date().toISOString()
    },
    {
      id: "u3",
      name: "Musa Rider",
      email: "rider@gasgo.com",
      password: "rider123",
      role: "rider",
      phone: "08098765432",
      address: "Rider Base, Lafia",
      available: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "u4",
      name: "Fatima Hassan",
      email: "fatima@gasgo.com",
      password: "cust123",
      role: "customer",
      phone: "08011112222",
      address: "45 Doma Road, Lafia",
      wallet: 2500,
      createdAt: new Date().toISOString()
    },
  ];

  const vendors = [{
      id: "v1",
      name: "Sahel Gas Depot",
      address: "Industrial Area, Lafia",
      phone: "08055556666",
      stock: 200,
      pricePerKg: 650,
      active: true
    },
    {
      id: "v2",
      name: "NasGas Supplies",
      address: "Central Market, Lafia",
      phone: "08033334444",
      stock: 150,
      pricePerKg: 620,
      active: true
    },
  ];

  const orders = [{
      id: "o1",
      customerId: "u2",
      customerName: "Aminu Sule",
      riderId: "u3",
      riderName: "Musa Rider",
      vendorId: "v1",
      cylinder: "12.5kg",
      quantity: 1,
      total: 8125,
      status: "delivered",
      paymentMethod: "cash",
      address: "12 Benue Crescent, Lafia",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      deliveredAt: new Date(Date.now() - 86400000 * 3 + 3600000).toISOString(),
      qrCode: genId()
    },
    {
      id: "o2",
      customerId: "u2",
      customerName: "Aminu Sule",
      riderId: null,
      vendorId: "v1",
      cylinder: "6kg",
      quantity: 2,
      total: 7800,
      status: "pending",
      paymentMethod: "wallet",
      address: "12 Benue Crescent, Lafia",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      qrCode: genId()
    },
    {
      id: "o3",
      customerId: "u4",
      customerName: "Fatima Hassan",
      riderId: "u3",
      riderName: "Musa Rider",
      vendorId: "v2",
      cylinder: "12.5kg",
      quantity: 1,
      total: 8050,
      status: "in_transit",
      paymentMethod: "transfer",
      address: "45 Doma Road, Lafia",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      qrCode: genId()
    },
    {
      id: "o4",
      customerId: "u4",
      customerName: "Fatima Hassan",
      riderId: "u3",
      riderName: "Musa Rider",
      vendorId: "v1",
      cylinder: "3kg",
      quantity: 3,
      total: 5850,
      status: "delivered",
      paymentMethod: "cash",
      address: "45 Doma Road, Lafia",
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      deliveredAt: new Date(Date.now() - 86400000 * 7 + 2400000).toISOString(),
      qrCode: genId()
    },
  ];

  const refillData = {
    u2: {
      lastRefill: new Date(Date.now() - 86400000 * 18).toISOString(),
      avgDaysPerCylinder: 25,
      cylinderSize: "12.5kg"
    },
    u4: {
      lastRefill: new Date(Date.now() - 86400000 * 12).toISOString(),
      avgDaysPerCylinder: 20,
      cylinderSize: "6kg"
    },
  };

  write(KEYS.users, users);
  write(KEYS.vendors, vendors);
  write(KEYS.orders, orders);
  write(KEYS.refillData, refillData);
  write(KEYS.notifications, [{
      id: "n1",
      userId: "u2",
      message: "Your order #o2 is being processed.",
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "n2",
      userId: "u3",
      message: "New delivery assigned: Order #o3 to Fatima Hassan.",
      read: false,
      createdAt: new Date().toISOString()
    },
  ]);
  localStorage.setItem("gasgo_seeded", "1");
};

// ── Auth ──────────────────────────────────────────────────────
const Auth = {
  login(email, password) {
    const users = read(KEYS.users);
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      write(KEYS.currentUser, user);
      return user;
    }
    return null;
  },
  logout() {
    localStorage.removeItem(KEYS.currentUser);
    window.location.href = "../../index.html";
  },
  current() {
    return readObj(KEYS.currentUser);
  },
  register(data) {
    const users = read(KEYS.users);
    if (users.find(u => u.email === data.email)) return {
      error: "Email already exists"
    };
    const user = {
      id: genId(),
      ...data,
      role: "customer",
      wallet: 0,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    write(KEYS.users, users);
    write(KEYS.currentUser, user);
    return user;
  },
  requireAuth(role) {
    const user = Auth.current();
    if (!user) {
      window.location.href = "../../index.html";
      return null;
    }
    if (role && user.role !== role) {
      window.location.href = "../../index.html";
      return null;
    }
    return user;
  },
};

// ── Orders ────────────────────────────────────────────────────
const Orders = {
  all() {
    return read(KEYS.orders);
  },
  byCustomer(id) {
    return Orders.all().filter(o => o.customerId === id);
  },
  byRider(id) {
    return Orders.all().filter(o => o.riderId === id);
  },
  byStatus(status) {
    return Orders.all().filter(o => o.status === status);
  },
  get(id) {
    return Orders.all().find(o => o.id === id);
  },
  create(data) {
    const orders = Orders.all();
    const order = {
      id: genId(),
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      qrCode: genId()
    };
    orders.push(order);
    write(KEYS.orders, orders);
    Notifications.add(data.customerId, `Order #${order.id.slice(-4).toUpperCase()} placed successfully.`);
    SmartRefill.updateLastRefill(data.customerId);
    return order;
  },
  update(id, updates) {
    const orders = Orders.all().map(o => o.id === id ? {
      ...o,
      ...updates
    } : o);
    write(KEYS.orders, orders);
    return orders.find(o => o.id === id);
  },
  assignRider(orderId, riderId) {
    const users = read(KEYS.users);
    const rider = users.find(u => u.id === riderId);
    Orders.update(orderId, {
      riderId,
      riderName: rider ? users.name : "",
      status: "in_transit"
    });
    Notifications.add(riderId, `New delivery assigned: Order #${orderId.slice(-4).toUpperCase()}.`);
  },
  deliver(orderId) {
    Orders.update(orderId, {
      status: "delivered",
      deliveredAt: new Date().toISOString()
    });
    const order = Orders.get(orderId);
    if (order) Notifications.add(order.customerId, `Order #${orderId.slice(-4).toUpperCase()} delivered!`);
  },
  stats() {
    const all = Orders.all();
    return {
      total: all.length,
      pending: all.filter(o => o.status === "pending").length,
      in_transit: all.filter(o => o.status === "in_transit").length,
      delivered: all.filter(o => o.status === "delivered").length,
      cancelled: all.filter(o => o.status === "cancelled").length,
      revenue: all.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0),
    };
  },
};

// ── Users ─────────────────────────────────────────────────────
const Users = {
  all() {
    return read(KEYS.users);
  },
  get(id) {
    return Users.all().find(u => u.id === id);
  },
  riders() {
    return Users.all().filter(u => u.role === "rider");
  },
  customers() {
    return Users.all().filter(u => u.role === "customer");
  },
  update(id, updates) {
    const users = Users.all().map(u => u.id === id ? {
      ...u,
      ...updates
    } : u);
    write(KEYS.users, users);
    const current = Auth.current();
    if (current && current.id === id) write(KEYS.currentUser, {
      ...current,
      ...updates
    });
  },
  delete(id) {
    write(KEYS.users, Users.all().filter(u => u.id !== id));
  },
  add(data) {
    const users = Users.all();
    const user = {
      id: genId(),
      ...data,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    write(KEYS.users, users);
    return user;
  },
};

// ── Vendors ───────────────────────────────────────────────────
const Vendors = {
  all() {
    return read(KEYS.vendors);
  },
  get(id) {
    return Vendors.all().find(v => v.id === id);
  },
  add(data) {
    const vendors = Vendors.all();
    const vendor = {
      id: genId(),
      ...data,
      active: true
    };
    vendors.push(vendor);
    write(KEYS.vendors, vendors);
    return vendor;
  },
  update(id, updates) {
    const vendors = Vendors.all().map(v => v.id === id ? {
      ...v,
      ...updates
    } : v);
    write(KEYS.vendors, vendors);
  },
  delete(id) {
    write(KEYS.vendors, Vendors.all().filter(v => v.id !== id));
  },
};

// ── Notifications ─────────────────────────────────────────────
const Notifications = {
  all() {
    return read(KEYS.notifications);
  },
  forUser(userId) {
    return Notifications.all().filter(n => n.userId === userId);
  },
  unread(userId) {
    return Notifications.forUser(userId).filter(n => !n.read);
  },
  add(userId, message) {
    const notifs = Notifications.all();
    notifs.unshift({
      id: genId(),
      userId,
      message,
      read: false,
      createdAt: new Date().toISOString()
    });
    write(KEYS.notifications, notifs);
  },
  markRead(userId) {
    const notifs = Notifications.all().map(n => n.userId === userId ? {
      ...n,
      read: true
    } : n);
    write(KEYS.notifications, notifs);
  },
};

// ── Smart Refill Prediction ───────────────────────────────────
const SmartRefill = {
  getData(userId) {
    const data = readObj(KEYS.refillData) || {};
    return data[userId] || null;
  },
  updateLastRefill(userId) {
    const all = readObj(KEYS.refillData) || {};
    const existing = all[userId];
    const now = new Date().toISOString();
    if (existing) {
      const daysSinceLast = (Date.now() - new Date(existing.lastRefill).getTime()) / 86400000;
      const avg = Math.round((existing.avgDaysPerCylinder + daysSinceLast) / 2);
      all[userId] = {
        ...existing,
        lastRefill: now,
        avgDaysPerCylinder: avg
      };
    } else {
      all[userId] = {
        lastRefill: now,
        avgDaysPerCylinder: 25,
        cylinderSize: "12.5kg"
      };
    }
    write(KEYS.refillData, all);
  },
  predict(userId) {
    const data = SmartRefill.getData(userId);
    if (!data) return null;
    const daysSince = (Date.now() - new Date(data.lastRefill).getTime()) / 86400000;
    const daysLeft = Math.max(0, Math.round(data.avgDaysPerCylinder - daysSince));
    const pctUsed = Math.min(100, Math.round((daysSince / data.avgDaysPerCylinder) * 100));
    return {
      daysLeft,
      pctUsed,
      cylinderSize: data.cylinderSize,
      avgDaysPerCylinder: data.avgDaysPerCylinder,
      refillSoon: daysLeft <= 5
    };
  },
};

// ── Cylinder pricing ──────────────────────────────────────────
const CYLINDERS = [{
    size: "3kg",
    pricePerKg: 650
  },
  {
    size: "6kg",
    pricePerKg: 650
  },
  {
    size: "12.5kg",
    pricePerKg: 650
  },
  {
    size: "25kg",
    pricePerKg: 630
  },
  {
    size: "50kg",
    pricePerKg: 610
  },
];
const cylinderPrice = (size, qty = 1) => {
  const cyl = CYLINDERS.find(c => c.size === size);
  if (!cyl) return 0;
  return parseFloat(size) * cyl.pricePerKg * qty;
};

// ── Formatting helpers ────────────────────────────────────────
const fmt = {
  currency: (n) => "₦" + Number(n).toLocaleString(),
  date: (iso) => new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }),
  time: (iso) => new Date(iso).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit"
  }),
  statusBadge: (s) => {
    const map = {
      pending: "badge-warning",
      in_transit: "badge-info",
      delivered: "badge-success",
      cancelled: "badge-danger"
    };
    const label = {
      pending: "Pending",
      in_transit: "In Transit",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    return `<span class="badge ${map[s] || ''}">${label[s] || s}</span>`;
  },
};

// ── QR generator (simple canvas-based) ───────────────────────
const generateQR = (text, canvas) => {
  // Lightweight visual QR pattern using canvas (placeholder representation)
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);
  // Create a deterministic grid pattern from text hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  const cells = 21;
  const cell = size / cells;
  ctx.fillStyle = "#1a1a2e";
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isFinderRow = (r < 8 || r >= cells - 7);
      const isFinderCol = (c < 8 || c >= cells - 7);
      const inFinder = isFinderRow && isFinderCol;
      let fill = false;
      if (inFinder) {
        // Draw finder patterns
        const pr = r < 8 ? r : r - (cells - 7);
        const pc = c < 8 ? c : c - (cells - 7);
        if (pr >= 0 && pr < 7 && pc >= 0 && pc < 7) {
          if (pr === 0 || pr === 6 || pc === 0 || pc === 6) fill = true;
          else if (pr >= 2 && pr <= 4 && pc >= 2 && pc <= 4) fill = true;
        }
      } else {
        fill = ((hash ^ (r * 17 + c * 31)) & 1) === 1;
      }
      if (fill) ctx.fillRect(c * cell, r * cell, cell, cell);
    }
  }
};

// Init
seed();