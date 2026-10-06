/**
 * FindHome - Civic Return Lost & Found Portal
 * Complete Client-Side Engine, Algorithm Matching, Anti-Fraud Ownership Claims, & Moderation
 */

// ============================================================================
// 1. CONSTANTS & SEED DATA
// ============================================================================

const CATEGORIES = [
  "Wallets",
  "Laptops",
  "ID Cards",
  "Earphones/Headphones",
  "Keys",
  "Watches",
  "Mobile Phones",
  "Other"
];

const INITIAL_USERS = {
  rahul: {
    id: "user_rahul",
    name: "Rahul Sharma",
    email: "rahul.student@campus.edu",
    role: "Student (Lost Owner)",
    avatarInitial: "R",
    badge: "Verified Student ID"
  },
  priya: {
    id: "user_priya",
    name: "Priya Patel",
    email: "priya.finder@campus.edu",
    role: "Campus Assistant (Finder)",
    avatarInitial: "P",
    badge: "Staff Certified Finder"
  },
  admin: {
    id: "user_admin",
    name: "Officer Verma",
    email: "security.desk@campus.edu",
    role: "Campus Public Safety Officer",
    avatarInitial: "V",
    badge: "Security Desk Custodian"
  }
};

const SEED_ITEMS = [
  {
    id: "item_cardholder",
    userId: "user_priya",
    type: "FOUND",
    title: "Navy Leather Cardholder / Wallet",
    category: "Wallets",
    description: "Contains Metrocard and several cards in interior slots. Found on study cubicle desk #14 in College Library 2nd floor. Safe-kept at front desk.",
    distinguishing: "Initials 'RS' etched inside card flap, blue transit sticker",
    location: "College Library 2nd floor",
    date: "2026-10-06",
    timeAgo: "2 hrs ago",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdtPyUbedksIeqwFrWDQB8eNb1nFTQm8QMBfDiRzst1ShuljC-d9M4bdyahZg6UoZdfoiHin74O_efoFgt7Ea45aGpGpZF9lRqlIpPtPaiAtlnvO35ASnLs0QsEy6AIXhumyZfx3HQqu4TtnyB2g7lVauH5rRc_tB2J0FeLwDrwgZbAXOUA84g2i8ydyuuHcD6R9kF-FzVuq6cV9QsxwCyN4p6N92_VZlI7S5Qc8Ip_OXyJr9ad6qm",
    localFallback: "assets/images/wallet.jpg",
    custodian: "Priya Patel (Campus Assistant)",
    custodyTicket: "CU-402",
    status: "FOUND",
    createdAt: "2026-10-06T14:30:00Z"
  },
  {
    id: "item_macbook",
    userId: "user_rahul",
    type: "LOST",
    title: 'Apple MacBook Air 13" (M2 Space Gray)',
    category: "Laptops",
    description: "Has dark matte protective sleeve with small NASA and Python stickers. Left behind after 4:00 PM CS lecture in Science Hall Auditorium.",
    distinguishing: "NASA circular sticker on bottom left lid, serial ends in 4902",
    location: "Science Hall Auditorium",
    date: "2026-10-05",
    timeAgo: "Yesterday",
    reward: "$50",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAilODxmIzE8Zrx6ky0hQb7ORj4kpMR7TDgaO9DTHwFSaIU3EQOixjbPS4uWHTVUZhY0iTjbU5WgdA3Kp5uNh1fSuduiXeqE8291GGBQ7XjqqaJvG0P98EMgviXTDdBhWIAd6UYxGHEvQl_N2CIY8zS40dn4sO3LGFj3PKWXGCBlUid1M14c-cyjfY2vPtRq3j97Viqdc5BAKlVZmVPTGl5m6Tflpqgpx0wkfCllbfAQfeVazeCLWpi",
    localFallback: "assets/images/backpack.jpg",
    custodian: "Rahul Sharma (Student)",
    custodyTicket: "TECH-4902",
    status: "LOST",
    createdAt: "2026-10-05T16:00:00Z"
  },
  {
    id: "item_found_id",
    userId: "user_priya",
    type: "FOUND",
    title: "Blue College Student ID & Transit Pass (Rahul S.)",
    category: "ID Cards",
    description: "University plastic student identification badge attached to a navy blue fabric lanyard on clean dining table. Includes campus transit chip.",
    distinguishing: "Student ID ends with 6890, Dept of Computer Science",
    location: "Main Cafeteria, Booth #9",
    date: "2026-10-05",
    timeAgo: "Oct 5",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1QyKBnqjMYwoKLuGXhFEr7Y7hRBRLlfXGvnoNqlsiMTGijfSE9tzKB-ApQwKVQkQCWK859_IphCz53shcZh0McZlehRBvrhdahafszWuzEf9aAyeyjwrHEFCnQYTUr7DPGpA8-Ditbvae-dfufL37OYVW-4mZ9eTC5IDSIUheOx0PAbXdngBzrKOPwDnNVMrGzDByTxLEH4kmUM6pWZ7lE4a-jHiCShYQysN3FCzAYLwfP2w8LV3c",
    localFallback: "assets/images/id_card.jpg",
    custodian: "Campus Security Desk",
    custodyTicket: "ID-7719",
    status: "FOUND",
    createdAt: "2026-10-05T13:45:00Z"
  },
  {
    id: "item_headphones",
    userId: "user_rahul",
    type: "LOST",
    title: "Black Sony WH-1000XM4 Headphones",
    category: "Earphones/Headphones",
    description: "Zippered gray hardshell case with auxiliary adapter and charging cord in the mesh pocket. Left on gym locker bench.",
    distinguishing: "Tiny hairline scratch on front status LED, case has custom zipper pull",
    location: "Central Gym locker area",
    date: "2026-10-03",
    timeAgo: "3 days ago",
    reward: "$25",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATA7jTUYDfIq_mGRmVgKwymASHSZg5Xteoajbs3nb9R923gDbOh0fbGrHlIva0IqWe5OOPCOv-mtdA5OWp6hNvFF_vWs5f6bfv2rX8MwjgGvjoBD5W1qd3ngWnKrCp6F5nvbgOIXs6gUs0wayweulRRUcGB7KGU8mOrXMSK6e5TsRJtLnuxrRfwZn2ga53PQPga03sQUQ4VQTd4QXabWzKC4oawWxfY4FkpZ7eJZjHnkv7Gs8PkAEc",
    localFallback: "assets/images/earbuds.jpg",
    custodian: "Rahul Sharma (Student)",
    custodyTicket: "AUDIO-3105",
    status: "LOST",
    createdAt: "2026-10-03T11:20:00Z"
  },
  {
    id: "item_backpack",
    userId: "user_priya",
    type: "FOUND",
    title: "Navy Blue Canvas Travel Backpack",
    category: "Wallets",
    description: "Navy blue canvas backpack with brown leather strap accents. Found resting on a wooden bench in the courtyard with notebook.",
    distinguishing: "Stainless water bottle in left pouch, psychology notebook inside",
    location: "Campus Main Quad Park Bench",
    date: "2026-10-04",
    timeAgo: "2 days ago",
    imageUrl: "assets/images/backpack.jpg",
    localFallback: "assets/images/backpack.jpg",
    custodian: "Priya Patel",
    custodyTicket: "BAG-5192",
    status: "FOUND",
    createdAt: "2026-10-04T17:10:00Z"
  },
  {
    id: "item_watch",
    userId: "user_admin",
    type: "FOUND",
    title: "Black Smartwatch with Sports Silicone Strap",
    category: "Watches",
    description: "Sleek black digital smartwatch turned in by campus custodial staff. Clean screen and intact silicone buckle.",
    distinguishing: "Display shows green sports rings, small nick near bezel",
    location: "Student Union Study Lounge",
    date: "2026-10-03",
    timeAgo: "3 days ago",
    imageUrl: "assets/images/watch.jpg",
    localFallback: "assets/images/watch.jpg",
    custodian: "Officer Verma (Security Desk)",
    custodyTicket: "WATCH-8821",
    status: "FOUND",
    createdAt: "2026-10-03T09:00:00Z"
  },
  {
    id: "item_lost_id_rahul",
    userId: "user_rahul",
    type: "LOST",
    title: "College Student ID Card (Computer Science)",
    category: "ID Cards",
    description: "Lost my college student identification card with dark purple/gold lanyard in cafeteria during lunch break.",
    distinguishing: "Student ID ends with 6890, Department of Computer Science",
    location: "Main Cafeteria, Table 4",
    date: "2026-10-05",
    timeAgo: "Yesterday",
    reward: "$15",
    imageUrl: "assets/images/id_card.jpg",
    localFallback: "assets/images/id_card.jpg",
    custodian: "Rahul Sharma",
    custodyTicket: "ID-1092",
    status: "LOST",
    createdAt: "2026-10-05T13:40:00Z"
  }
];

const SEED_CLAIMS = [
  {
    id: "claim_001",
    itemId: "item_found_id",
    itemTitle: "Blue College Student ID & Transit Pass",
    claimantId: "user_rahul",
    claimantName: "Rahul Sharma",
    answers: {
      brand: "University Campus Card Office",
      contents: "Lanyard is university purple/gold, CS department barcode ending in 6890.",
      scratch: "Small hairline mark near photo corner",
      lostDateTime: "2026-10-05T13:30"
    },
    status: "PENDING",
    createdAt: "2026-10-05T15:20:00Z"
  }
];

const SEED_MESSAGES = [
  {
    id: "msg_1",
    itemId: "item_found_id",
    senderId: "user_rahul",
    senderName: "Rahul Sharma",
    text: "Hi Priya! I submitted a claim for the student ID card found in the cafeteria. That's mine!",
    sentAt: "10 mins ago"
  },
  {
    id: "msg_2",
    itemId: "item_found_id",
    senderId: "user_priya",
    senderName: "Priya Patel",
    text: "Hello Rahul! I just saw your claim verification answers. They match the physical card. Can you meet at the Campus Security Kiosk at 4:30 PM?",
    sentAt: "5 mins ago"
  }
];

const SEED_NOTIFICATIONS = [
  {
    id: "notif_1",
    userId: "user_rahul",
    title: "⚡ High Confidence Match (88%)",
    message: "A found Blue Student ID Card matches your reported lost item!",
    type: "MATCH",
    linkView: "matches",
    read: false,
    time: "10 mins ago"
  },
  {
    id: "notif_2",
    userId: "user_priya",
    title: "🔒 New Ownership Claim Received",
    message: "Rahul Sharma submitted verification challenge answers for ID #FD-8942.",
    type: "CLAIM",
    linkView: "dashboard",
    read: false,
    time: "25 mins ago"
  },
  {
    id: "notif_3",
    userId: "user_rahul",
    title: "💬 New Message from Priya",
    message: "'Hello Rahul! I just saw your claim verification answers...'",
    type: "MESSAGE",
    linkView: "messages",
    read: false,
    time: "1 hour ago"
  }
];

// ============================================================================
// 2. STATE MANAGER & PERSISTENCE
// ============================================================================

class PortalStore {
  constructor() {
    this.STORAGE_KEY = "findhome_portal_state_v2";
    this.currentPersonaKey = "rahul";
    this.theme = localStorage.getItem("findhome_theme") || "light";
    this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.items = parsed.items || SEED_ITEMS;
        this.claims = parsed.claims || SEED_CLAIMS;
        this.messages = parsed.messages || SEED_MESSAGES;
        this.notifications = parsed.notifications || SEED_NOTIFICATIONS;
        this.users = parsed.users || INITIAL_USERS;
        return;
      }
    } catch (e) {
      console.warn("State storage corrupted, resetting:", e);
    }
    this.resetToDefaults();
  }

  saveState() {
    const payload = {
      items: this.items,
      claims: this.claims,
      messages: this.messages,
      notifications: this.notifications,
      users: this.users
    };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }

  resetToDefaults() {
    this.items = JSON.parse(JSON.stringify(SEED_ITEMS));
    this.claims = JSON.parse(JSON.stringify(SEED_CLAIMS));
    this.messages = JSON.parse(JSON.stringify(SEED_MESSAGES));
    this.notifications = JSON.parse(JSON.stringify(SEED_NOTIFICATIONS));
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    this.saveState();
  }

  getCurrentUser() {
    return this.users[this.currentPersonaKey] || this.users.rahul;
  }

  switchPersona(key) {
    if (this.users[key]) {
      this.currentPersonaKey = key;
    }
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("findhome_theme", this.theme);
    return this.theme;
  }
}

const store = new PortalStore();

// ============================================================================
// 3. UI CONTROLLER & VIEW LOGIC
// ============================================================================

class PortalApp {
  constructor() {
    this.currentView = "home";
    this.activeFeedFilter = "ALL";
    this.activeBrowseFilters = {
      type: "ALL",
      keyword: "",
      category: "ALL",
      location: "",
      status: "ACTIVE_ONLY",
      sort: "newest"
    };
    this.activeItemDetailId = "item_cardholder";
    this.modalReportType = "LOST";
    this.selectedProofFile = null;

    this.init();
  }

  init() {
    this.applyTheme(store.theme);
    this.bindEvents();
    this.renderCurrentView();
    this.updateUserHeader();
    this.updateNotifications();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeToggleIcon");
    if (icon) {
      icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    }
  }

  toggleTheme() {
    const newTheme = store.toggleTheme();
    this.applyTheme(newTheme);
    this.showToast(`Switched to ${newTheme.toUpperCase()} theme`);
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.navigateTo(view);
      });
    });

    // Brand logo returns to home
    const brand = document.getElementById("navBrandLogo");
    if (brand) brand.addEventListener("click", () => this.navigateTo("home"));

    // Header Quick Report Buttons
    const btnHeaderLost = document.getElementById("btnHeaderReportLost");
    if (btnHeaderLost) btnHeaderLost.addEventListener("click", () => this.openReportModal("LOST"));

    const btnHeaderFound = document.getElementById("btnHeaderReportFound");
    if (btnHeaderFound) btnHeaderFound.addEventListener("click", () => this.openReportModal("FOUND"));

    // Theme toggle
    const btnTheme = document.getElementById("btnThemeToggle");
    if (btnTheme) btnTheme.addEventListener("click", () => this.toggleTheme());

    // Notifications toggle
    const btnNotif = document.getElementById("btnToggleNotifications");
    if (btnNotif) {
      btnNotif.addEventListener("click", (e) => {
        e.stopPropagation();
        const drop = document.getElementById("notificationsDropdown");
        if (drop) drop.classList.toggle("open");
      });
    }

    document.addEventListener("click", (e) => {
      const drop = document.getElementById("notificationsDropdown");
      if (drop && !drop.contains(e.target) && e.target.id !== "btnToggleNotifications") {
        drop.classList.remove("open");
      }
    });

    const btnMarkRead = document.getElementById("btnMarkAllNotifsRead");
    if (btnMarkRead) {
      btnMarkRead.addEventListener("click", () => {
        store.notifications.forEach((n) => (n.read = true));
        store.saveState();
        this.updateNotifications();
        this.showToast("All notifications marked as read");
      });
    }

    // Persona switchers
    ["personaRahul", "personaPriya", "personaAdmin"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          const key = btn.dataset.persona;
          this.switchPersona(key);
        });
      }
    });

    // Reset Demo Data
    const btnReset = document.getElementById("btnResetDemoData");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        store.resetToDefaults();
        this.renderCurrentView();
        this.updateUserHeader();
        this.updateNotifications();
        this.showToast("Demo data restored to initial clean state");
      });
    }

    // Hero Quick CTAs
    const btnHeroLost = document.getElementById("btnHeroReportLost");
    if (btnHeroLost) btnHeroLost.addEventListener("click", () => this.openReportModal("LOST"));

    const btnHeroFound = document.getElementById("btnHeroReportFound");
    if (btnHeroFound) btnHeroFound.addEventListener("click", () => this.openReportModal("FOUND"));

    const btnHeroCatalog = document.getElementById("btnHeroFullCatalog");
    if (btnHeroCatalog) btnHeroCatalog.addEventListener("click", () => this.navigateTo("browse"));

    const btnSafeEx = document.getElementById("btnViewSafeExchange");
    if (btnSafeEx) {
      btnSafeEx.addEventListener("click", () => {
        this.showToast("Campus Public Safety Desks: Administration Hall (North) & Library 1st Floor.");
      });
    }

    // Feed Tabs
    ["tabFeedAll", "tabFeedLost", "tabFeedFound"].forEach((tabId) => {
      const tab = document.getElementById(tabId);
      if (tab) {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".feed-tab-btn").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          this.activeFeedFilter = tab.dataset.feedFilter;
          this.renderHome();
        });
      }
    });

    // Browse Filters
    ["browseTypeAll", "browseTypeLost", "browseTypeFound"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".type-segmented-control .segment-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.activeBrowseFilters.type = btn.dataset.browseType;
          this.renderBrowse();
        });
      }
    });

    const searchInput = document.getElementById("browseSearchKeyword");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeBrowseFilters.keyword = e.target.value.trim().toLowerCase();
        this.renderBrowse();
      });
    }

    const locInput = document.getElementById("browseLocationFilter");
    if (locInput) {
      locInput.addEventListener("input", (e) => {
        this.activeBrowseFilters.location = e.target.value.trim().toLowerCase();
        this.renderBrowse();
      });
    }

    const statusFilter = document.getElementById("browseStatusFilter");
    if (statusFilter) {
      statusFilter.addEventListener("change", (e) => {
        this.activeBrowseFilters.status = e.target.value;
        this.renderBrowse();
      });
    }

    const sortSelect = document.getElementById("browseSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.activeBrowseFilters.sort = e.target.value;
        this.renderBrowse();
      });
    }

    const btnResetFilters = document.getElementById("btnResetAllFilters");
    if (btnResetFilters) {
      btnResetFilters.addEventListener("click", () => {
        this.activeBrowseFilters = {
          type: "ALL",
          keyword: "",
          category: "ALL",
          location: "",
          status: "ACTIVE_ONLY",
          sort: "newest"
        };
        const kw = document.getElementById("browseSearchKeyword");
        if (kw) kw.value = "";
        const loc = document.getElementById("browseLocationFilter");
        if (loc) loc.value = "";
        const st = document.getElementById("browseStatusFilter");
        if (st) st.value = "ACTIVE_ONLY";
        const srt = document.getElementById("browseSortSelect");
        if (srt) srt.value = "newest";
        document.querySelectorAll(".type-segmented-control .segment-btn").forEach((b) => b.classList.remove("active"));
        const allBtn = document.getElementById("browseTypeAll");
        if (allBtn) allBtn.classList.add("active");

        this.renderBrowse();
        this.showToast("Filters reset to default");
      });
    }

    // Dashboard Sub-Tabs
    ["tabDashMatches", "tabDashReports", "tabDashClaims"].forEach((tabId) => {
      const tab = document.getElementById(tabId);
      if (tab) {
        tab.addEventListener("click", () => {
          document.querySelectorAll("[data-dash-tab]").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          const target = tab.dataset.dashTab;
          ["Matches", "Reports", "Claims"].forEach((name) => {
            const el = document.getElementById(`dashTabContent${name}`);
            if (el) el.style.display = name.toLowerCase() === target ? "block" : "none";
          });
        });
      }
    });

    // Schedule Handoff Button
    const btnHandoff = document.getElementById("btnScheduleHandoff");
    if (btnHandoff) {
      btnHandoff.addEventListener("click", () => {
        this.showToast("Handover time scheduled: Today at 4:30 PM at Campus Security Kiosk!");
      });
    }

    // Watchlist & Message Finder buttons in Item Details
    const btnWatch = document.getElementById("btnSaveWatchlist");
    if (btnWatch) {
      btnWatch.addEventListener("click", () => {
        this.showToast("Item added to your saved watchlist!");
      });
    }

    const btnMsgCust = document.getElementById("btnMessageCustodian");
    if (btnMsgCust) {
      btnMsgCust.addEventListener("click", () => {
        this.navigateTo("messages");
      });
    }
  }

  // ==========================================================================
  // NAVIGATION & VIEW SWITCHING
  // ==========================================================================
  navigateTo(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".view-section").forEach((s) => s.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));

    const targetSection = document.getElementById(`view${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`);
    const targetNav = document.getElementById(`nav${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`);

    if (targetSection) targetSection.classList.add("active");
    if (targetNav) targetNav.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.renderCurrentView();
  }

  renderCurrentView() {
    switch (this.currentView) {
      case "home":
        this.renderHome();
        break;
      case "browse":
        this.renderBrowse();
        break;
      case "itemDetail":
        this.renderItemDetail(this.activeItemDetailId);
        break;
      case "dashboard":
        this.renderDashboard();
        break;
      case "matches":
        this.renderMatches();
        break;
      case "messages":
        this.renderMessages();
        break;
      case "admin":
        this.renderAdmin();
        break;
    }
  }

  // ==========================================================================
  // USER PERSONA SWITCHER
  // ==========================================================================
  switchPersona(key) {
    store.switchPersona(key);
    document.querySelectorAll(".persona-btn").forEach((b) => b.classList.remove("active"));
    const activeBtn = document.getElementById(`persona${key.charAt(0).toUpperCase() + key.slice(1)}`);
    if (activeBtn) activeBtn.classList.add("active");

    this.updateUserHeader();
    this.renderCurrentView();
    const user = store.getCurrentUser();
    this.showToast(`Switched active persona to ${user.name} (${user.role})`);
  }

  updateUserHeader() {
    const user = store.getCurrentUser();
    const avatar = document.getElementById("currentUserAvatar");
    const name = document.getElementById("currentUserName");
    if (avatar) avatar.textContent = user.avatarInitial;
    if (name) name.textContent = user.name.split(" ")[0] + " " + user.name.split(" ")[1][0] + ".";

    const dashGreeting = document.getElementById("dashGreetingName");
    if (dashGreeting) dashGreeting.textContent = `Welcome back, ${user.name}!`;
  }

  updateNotifications() {
    const list = document.getElementById("notificationsList");
    const badge = document.getElementById("notifBadge");
    if (!list) return;

    const unread = store.notifications.filter((n) => !n.read).length;
    if (badge) badge.style.display = unread > 0 ? "block" : "none";

    list.innerHTML = "";
    if (store.notifications.length === 0) {
      list.innerHTML = `<div class="p-4 text-center text-xs text-outline">No recent alerts</div>`;
      return;
    }

    store.notifications.forEach((notif) => {
      const item = document.createElement("div");
      item.className = `notif-item ${notif.read ? "" : "unread"}`;
      item.innerHTML = `
        <span class="material-symbols-outlined text-[20px] ${notif.type === "MATCH" ? "text-secondary" : "text-primary"}">
          ${notif.type === "MATCH" ? "bolt" : notif.type === "CLAIM" ? "gavel" : "chat"}
        </span>
        <div style="flex: 1;">
          <strong style="display: block; font-size: 0.84rem; color: var(--on-surface);">${notif.title}</strong>
          <p style="font-size: 0.78rem; color: var(--on-surface-variant); margin-top: 2px;">${notif.message}</p>
          <small style="color: var(--outline); font-size: 0.7rem; margin-top: 4px; display: block;">${notif.time}</small>
        </div>
      `;
      item.addEventListener("click", () => {
        notif.read = true;
        store.saveState();
        this.updateNotifications();
        if (notif.linkView) this.navigateTo(notif.linkView);
      });
      list.appendChild(item);
    });
  }

  // ==========================================================================
  // VIEW 1: HOME PAGE RENDERING
  // ==========================================================================
  renderHome() {
    const grid = document.getElementById("homeListingsGrid");
    if (!grid) return;

    let items = store.items.filter((item) => {
      if (this.activeFeedFilter === "ALL") return true;
      return item.type === this.activeFeedFilter;
    });

    grid.innerHTML = "";
    items.slice(0, 4).forEach((item) => {
      const card = this.createListingCard(item);
      grid.appendChild(card);
    });
  }

  handleHeroSearch() {
    const q = document.getElementById("heroSearchInput")?.value.trim().toLowerCase() || "";
    const cat = document.getElementById("heroCategorySelect")?.value || "ALL";
    const loc = document.getElementById("heroLocationInput")?.value.trim().toLowerCase() || "";

    this.activeBrowseFilters.keyword = q;
    this.activeBrowseFilters.category = cat;
    this.activeBrowseFilters.location = loc;

    const browseSearch = document.getElementById("browseSearchKeyword");
    if (browseSearch) browseSearch.value = q;
    const browseLoc = document.getElementById("browseLocationFilter");
    if (browseLoc) browseLoc.value = loc;

    this.navigateTo("browse");
  }

  quickFillHeroSearch(term) {
    const input = document.getElementById("heroSearchInput");
    if (input) input.value = term;
    this.handleHeroSearch();
  }

  // ==========================================================================
  // VIEW 2: BROWSE LISTINGS RENDERING
  // ==========================================================================
  renderBrowse() {
    const grid = document.getElementById("browseItemsGrid");
    const countBadge = document.getElementById("browseCountBadge");
    const catContainer = document.getElementById("browseCategoryChecklist");
    if (!grid) return;

    // Populate Category checklist once
    if (catContainer && catContainer.children.length === 0) {
      catContainer.innerHTML = "";
      CATEGORIES.forEach((cat) => {
        const count = store.items.filter((i) => i.category === cat).length;
        const item = document.createElement("label");
        item.className = "category-check-item";
        item.innerHTML = `
          <span class="category-check-label">
            <input type="checkbox" value="${cat}" class="cat-checkbox">
            <span>${cat}</span>
          </span>
          <span class="category-badge-count">${count}</span>
        `;
        const cb = item.querySelector("input");
        cb.addEventListener("change", () => {
          const selected = Array.from(document.querySelectorAll(".cat-checkbox:checked")).map((c) => c.value);
          this.activeBrowseFilters.selectedCategories = selected;
          this.renderBrowse();
        });
        catContainer.appendChild(item);
      });
    }

    // Filter Items
    let filtered = store.items.filter((item) => {
      // Type
      if (this.activeBrowseFilters.type !== "ALL" && item.type !== this.activeBrowseFilters.type) {
        return false;
      }
      // Keyword
      if (this.activeBrowseFilters.keyword) {
        const text = (item.title + " " + item.description + " " + item.location).toLowerCase();
        if (!text.includes(this.activeBrowseFilters.keyword)) return false;
      }
      // Location
      if (this.activeBrowseFilters.location) {
        if (!item.location.toLowerCase().includes(this.activeBrowseFilters.location)) return false;
      }
      // Status
      if (this.activeBrowseFilters.status === "ACTIVE_ONLY" && item.status === "RECOVERED") {
        return false;
      }
      if (this.activeBrowseFilters.status === "RECOVERED_ONLY" && item.status !== "RECOVERED") {
        return false;
      }
      // Categories
      if (this.activeBrowseFilters.selectedCategories && this.activeBrowseFilters.selectedCategories.length > 0) {
        if (!this.activeBrowseFilters.selectedCategories.includes(item.category)) return false;
      } else if (this.activeBrowseFilters.category !== "ALL") {
        if (item.category !== this.activeBrowseFilters.category) return false;
      }
      return true;
    });

    // Sort
    if (this.activeBrowseFilters.sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    } else if (this.activeBrowseFilters.sort === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date));
    } else if (this.activeBrowseFilters.sort === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (countBadge) countBadge.textContent = `${filtered.length} Items Found`;

    grid.innerHTML = "";
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--surface-lowest); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <span class="material-symbols-outlined text-[36px] text-outline mb-2">search_off</span>
          <h4 style="font-weight: 700; color: var(--primary);">No matching items cataloged</h4>
          <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-top: 4px;">Try clearing filters or check another category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const card = this.createListingCard(item);
      grid.appendChild(card);
    });
  }

  // Helper: Create 16:10 Listing Card (Civic Return Specs)
  createListingCard(item) {
    const card = document.createElement("article");
    card.className = "listing-card";
    const isFound = item.type === "FOUND";

    card.innerHTML = `
      <div class="card-image-viewport">
        <img src="${item.imageUrl}" alt="${item.title}" onerror="this.src='${item.localFallback}'">
        <div class="card-badge-status ${isFound ? "found" : "lost"}">
          <span class="dot"></span>
          <span>${item.type}</span>
        </div>
        <div class="card-badge-time">
          <span class="material-symbols-outlined text-[13px] text-outline">schedule</span>
          <span>${item.timeAgo || "Recently"}</span>
        </div>
      </div>
      <div class="card-body">
        <div>
          <div class="card-category-row">
            <span>${item.category}</span>
            <span class="material-symbols-outlined text-[16px]">${isFound ? "verified" : "help"}</span>
          </div>
          <h3 class="card-title" title="${item.title}">${item.title}</h3>
          <div class="card-location-row" style="margin-top: 6px;">
            <span class="material-symbols-outlined">location_on</span>
            <span>${item.location}</span>
          </div>
          <p class="card-desc-snippet" style="margin-top: 6px;">${item.description}</p>
        </div>
        <div class="card-footer-action-row">
          <span style="font-size: 0.74rem; color: var(--outline); font-weight: 600;">
            ${item.reward ? `<span style="color: var(--tertiary); font-weight: 700;">Reward: ${item.reward}</span>` : `<span style="color: var(--secondary);">Custody Ticket #${item.custodyTicket || "PR-901"}</span>`}
          </span>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-card-action claim" data-item-id="${item.id}">
              ${isFound ? "Claim Item" : "I Found This"}
            </button>
          </div>
        </div>
      </div>
    `;

    // Click handler to open details
    card.querySelector(".card-image-viewport").addEventListener("click", () => {
      this.openItemDetail(item.id);
    });
    card.querySelector(".card-title").addEventListener("click", () => {
      this.openItemDetail(item.id);
    });
    card.querySelector(".btn-card-action").addEventListener("click", (e) => {
      e.stopPropagation();
      this.openItemDetail(item.id);
    });

    return card;
  }

  // ==========================================================================
  // VIEW 3: ITEM DETAILS & CLAIM VERIFICATION RENDERING
  // ==========================================================================
  openItemDetail(itemId) {
    this.activeItemDetailId = itemId;
    this.navigateTo("itemDetail");
  }

  renderItemDetail(itemId) {
    const item = store.items.find((i) => i.id === itemId) || store.items[0];
    if (!item) return;

    const isFound = item.type === "FOUND";

    document.getElementById("detailBreadcrumbTitle").textContent = item.title;
    const imgEl = document.getElementById("detailMainImage");
    if (imgEl) {
      imgEl.src = item.imageUrl;
      imgEl.onerror = () => { imgEl.src = item.localFallback; };
    }

    const statusBadge = document.getElementById("detailStatusBadge");
    const statusText = document.getElementById("detailStatusText");
    if (statusBadge && statusText) {
      statusBadge.className = `card-badge-status ${isFound ? "found" : "lost"}`;
      statusText.textContent = `${item.type} ITEM`;
    }

    document.getElementById("detailCaseRecord").textContent = `CASE RECORD #${item.custodyTicket || "FD-8942"}`;
    document.getElementById("detailTitle").textContent = item.title;
    document.getElementById("detailCategory").textContent = item.category;
    document.getElementById("detailDate").textContent = item.date;
    document.getElementById("detailLocation").textContent = item.location;
    document.getElementById("detailCustodian").textContent = item.custodian || "Public Safety Desk";
    document.getElementById("detailDescription").textContent = item.description;
    document.getElementById("detailLocationHeader").textContent = item.location;

    // Gallery Thumbs
    const thumbsCont = document.getElementById("detailGalleryThumbs");
    if (thumbsCont) {
      thumbsCont.innerHTML = `
        <button type="button" class="gallery-thumb-btn active">
          <img src="${item.imageUrl}" onerror="this.src='${item.localFallback}'">
        </button>
        <button type="button" class="gallery-thumb-btn">
          <img src="${item.localFallback}">
        </button>
      `;
    }

    // Set default claim challenge date
    const dateInput = document.getElementById("claimDateLost");
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 16);
    }
  }

  handleProofUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedProofFile = file.name;
      const label = document.getElementById("claimFileName");
      if (label) label.textContent = `Attached: ${file.name}`;
      this.showToast(`Proof file attached: ${file.name}`);
    }
  }

  submitClaimVerification() {
    const item = store.items.find((i) => i.id === this.activeItemDetailId);
    const currentUser = store.getCurrentUser();

    const brand = document.getElementById("claimBrandInput")?.value || "";
    const contents = document.getElementById("claimContentsInput")?.value || "";
    const scratch = document.getElementById("claimScratchInput")?.value || "";
    const dateLost = document.getElementById("claimDateLost")?.value || "";

    const newClaim = {
      id: "claim_" + Date.now(),
      itemId: item ? item.id : "unknown",
      itemTitle: item ? item.title : "Reported Item",
      claimantId: currentUser.id,
      claimantName: currentUser.name,
      answers: {
        brand,
        contents,
        scratch,
        lostDateTime: dateLost,
        proofFile: this.selectedProofFile
      },
      status: "PENDING",
      createdAt: new Date().toISOString()
    };

    store.claims.unshift(newClaim);

    // Push notification to custodian
    store.notifications.unshift({
      id: "notif_" + Date.now(),
      userId: item ? item.userId : "user_priya",
      title: "🔒 New Ownership Claim Submitted",
      message: `${currentUser.name} submitted ownership challenge answers for "${item ? item.title : "your listing"}".`,
      type: "CLAIM",
      linkView: "dashboard",
      read: false,
      time: "Just now"
    });

    store.saveState();
    this.updateNotifications();
    this.showToast("Your ownership claim was securely submitted for verification!");
    this.navigateTo("dashboard");
  }

  // ==========================================================================
  // VIEW 4: USER DASHBOARD & SMART MATCH CENTER RENDERING
  // ==========================================================================
  renderDashboard() {
    const currentUser = store.getCurrentUser();

    // Compute KPI metrics
    const userReports = store.items.filter((i) => i.userId === currentUser.id);
    const lostCount = userReports.filter((i) => i.type === "LOST").length;
    const foundCount = userReports.filter((i) => i.type === "FOUND").length;

    const kpiActiveReports = document.getElementById("kpiActiveReports");
    if (kpiActiveReports) kpiActiveReports.textContent = String(userReports.length).padStart(2, "0");

    const kpiActiveBreakdown = document.getElementById("kpiActiveBreakdown");
    if (kpiActiveBreakdown) kpiActiveBreakdown.textContent = `${lostCount} Lost / ${foundCount} Found`;

    const kpiPendingClaims = document.getElementById("kpiPendingClaims");
    if (kpiPendingClaims) kpiPendingClaims.textContent = String(store.claims.length).padStart(2, "0");

    const reportsCountBadge = document.getElementById("dashReportsCount");
    if (reportsCountBadge) reportsCountBadge.textContent = userReports.length;

    // Render High Confidence Match Showcase (88% Match Gauge)
    const matchContainer = document.getElementById("matchShowcaseContainer");
    if (matchContainer) {
      matchContainer.innerHTML = `
        <!-- Left: Match Score + Gauge Visualization -->
        <div class="match-gauge-box">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="protocol-badge">
                <span class="material-symbols-outlined text-[14px]">bolt</span>
                High Confidence Match
              </span>
              <span style="font-size: 0.72rem; color: var(--outline); font-weight: 700;">NODE #FD-8942</span>
            </div>
            <div class="gauge-pct">88%</div>
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--on-surface-variant);">Match Correlation Score</span>
            <p style="font-size: 0.78rem; color: var(--on-surface-variant); margin-top: 8px; line-height: 1.45;">
              Multi-vector correlation triggered across Category, Spatial Radius (&lt; 200m), and Timestamp correlation.
            </p>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.74rem; font-weight: 600; margin-bottom: 4px;">
              <span>Confidence Threshold</span>
              <span style="color: var(--secondary);">Exceeds 80%</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--surface-container); border-radius: 9999px; overflow: hidden;">
              <div style="width: 88%; height: 100%; background: var(--secondary); border-radius: 9999px;"></div>
            </div>
          </div>
        </div>

        <!-- Right: Side-by-Side Comparison -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
          <div class="match-side-by-side">
            <!-- Left: Lost Report -->
            <div class="match-item-column">
              <span class="card-badge-status lost" style="position: static; width: fit-content;">YOUR LOST REPORT</span>
              <strong style="font-size: 0.95rem; color: var(--primary);">Lost Student ID Card (Computer Science)</strong>
              <img src="assets/images/id_card.jpg" class="thumb" alt="Lost Item">
              <span style="font-size: 0.76rem; color: var(--on-surface-variant);">Location: Main Cafeteria Dining Hall</span>
              <div class="match-criteria-pills">
                <span class="match-criterion-pill">
                  <span class="material-symbols-outlined text-[12px]">check</span> Category Match
                </span>
                <span class="match-criterion-pill">
                  <span class="material-symbols-outlined text-[12px]">check</span> Cafeteria Zone
                </span>
              </div>
            </div>

            <!-- Right: Discovered Found -->
            <div class="match-item-column">
              <span class="card-badge-status found" style="position: static; width: fit-content;">FOUND INVENTORY</span>
              <strong style="font-size: 0.95rem; color: var(--primary);">Blue Student ID & Transit Pass (Rahul S.)</strong>
              <img src="assets/images/id_card.jpg" class="thumb" alt="Found Item">
              <span style="font-size: 0.76rem; color: var(--on-surface-variant);">Location: Main Cafeteria, Booth #9</span>
              <div class="match-criteria-pills">
                <span class="match-criterion-pill">
                  <span class="material-symbols-outlined text-[12px]">check</span> Time: Within 1hr
                </span>
                <span class="match-criterion-pill">
                  <span class="material-symbols-outlined text-[12px]">check</span> Serial Hash Match
                </span>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
            <button type="button" class="btn-secondary" onclick="window.portalApp.dismissMatch('matchShowcaseContainer')">Dismiss Match</button>
            <button type="button" class="btn-primary" onclick="window.portalApp.openItemDetail('item_found_id')">Verify & Claim Now</button>
          </div>
        </div>
      `;
    }

    // Render My Reports list
    const reportsList = document.getElementById("myReportsList");
    if (reportsList) {
      reportsList.innerHTML = "";
      if (userReports.length === 0) {
        reportsList.innerHTML = `<p class="text-xs text-outline">You haven't posted any lost or found items yet.</p>`;
      } else {
        userReports.forEach((item) => {
          const row = document.createElement("div");
          row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--surface-low); border-radius: var(--radius-md); gap: 12px; flex-wrap: wrap;";
          row.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${item.imageUrl}" onerror="this.src='${item.localFallback}'" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;">
              <div>
                <strong style="font-size: 0.92rem; color: var(--primary); display: block;">${item.title}</strong>
                <small style="color: var(--on-surface-variant);">${item.type} · ${item.location} · ${item.date}</small>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="card-badge-status ${item.status === "RECOVERED" ? "found" : item.type === "FOUND" ? "found" : "lost"}" style="position: static;">
                ${item.status === "RECOVERED" ? "REUNITED / CLOSED" : item.type}
              </span>
              ${item.status !== "RECOVERED" ? `
                <button type="button" class="btn-demo-tool" onclick="window.portalApp.markItemRecovered('${item.id}')">
                  <span class="material-symbols-outlined text-[14px]">task_alt</span>
                  Mark as Recovered
                </button>
              ` : ""}
            </div>
          `;
          reportsList.appendChild(row);
        });
      }
    }

    // Render Claims list
    const claimsList = document.getElementById("myClaimsList");
    if (claimsList) {
      claimsList.innerHTML = "";
      if (store.claims.length === 0) {
        claimsList.innerHTML = `<p class="text-xs text-outline">No pending ownership claims recorded.</p>`;
      } else {
        store.claims.forEach((claim) => {
          const row = document.createElement("div");
          row.style.cssText = "padding: 14px; background: var(--surface-low); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 8px;";
          row.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <div>
                <strong style="color: var(--primary); font-size: 0.95rem;">${claim.itemTitle}</strong>
                <span style="font-size: 0.8rem; color: var(--on-surface-variant); display: block;">Claimant: ${claim.claimantName} · Status: <strong style="color: var(--secondary);">${claim.status}</strong></span>
              </div>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn-demo-tool" onclick="window.portalApp.approveClaim('${claim.id}')">Approve Claim</button>
                <button type="button" class="btn-demo-tool" style="color: var(--error);" onclick="window.portalApp.rejectClaim('${claim.id}')">Reject</button>
              </div>
            </div>
            <div style="background: var(--surface-lowest); padding: 10px; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--on-surface-variant);">
              <span><strong>Verification Challenge:</strong> "${claim.answers.contents || "No details"}"</span>
            </div>
          `;
          claimsList.appendChild(row);
        });
      }
    }
  }

  markItemRecovered(itemId) {
    const item = store.items.find((i) => i.id === itemId);
    if (item) {
      item.status = "RECOVERED";
      store.saveState();
      this.renderDashboard();
      this.showToast(`Listing marked as RECOVERED and successfully reunited!`);
    }
  }

  approveClaim(claimId) {
    const claim = store.claims.find((c) => c.id === claimId);
    if (claim) {
      claim.status = "APPROVED / VERIFIED";
      store.saveState();
      this.renderDashboard();
      this.showToast(`Claim approved! Identity proof confirmed for ${claim.claimantName}.`);
    }
  }

  rejectClaim(claimId) {
    const claim = store.claims.find((c) => c.id === claimId);
    if (claim) {
      claim.status = "REJECTED (Insufficient Proof)";
      store.saveState();
      this.renderDashboard();
      this.showToast(`Claim rejected due to mismatching challenge answers.`);
    }
  }

  dismissMatch(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
      el.style.opacity = "0.4";
      el.style.pointerEvents = "none";
    }
    this.showToast("Match suggestion dismissed.");
  }

  // ==========================================================================
  // VIEW 5: SMART MATCHES DEDICATED MATRIX
  // ==========================================================================
  renderMatches() {
    const cont = document.getElementById("dedicatedMatchesList");
    if (!cont) return;

    cont.innerHTML = `
      <div class="match-showcase-card">
        <div class="match-gauge-box">
          <div>
            <span class="protocol-badge">Top Correlation</span>
            <div class="gauge-pct">88%</div>
            <span style="font-size: 0.8rem; font-weight: 600;">Student ID Verification</span>
          </div>
          <button type="button" class="btn-primary" onclick="window.portalApp.openItemDetail('item_found_id')">Inspect Found Item</button>
        </div>
        <div class="match-side-by-side">
          <div class="match-item-column">
            <span class="card-badge-status lost" style="position: static; width: fit-content;">LOST POSTING</span>
            <strong>College Student ID Card</strong>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Reported lost in Cafeteria Dining Hall</p>
          </div>
          <div class="match-item-column">
            <span class="card-badge-status found" style="position: static; width: fit-content;">FOUND POSTING</span>
            <strong>Blue Student ID & Transit Pass</strong>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Turned in by Priya from Cafeteria Booth #9</p>
          </div>
        </div>
      </div>

      <div class="match-showcase-card">
        <div class="match-gauge-box">
          <div>
            <span class="protocol-badge">Visual Feature Correlation</span>
            <div class="gauge-pct" style="color: var(--tertiary);">76%</div>
            <span style="font-size: 0.8rem; font-weight: 600;">Leather Wallet Matching</span>
          </div>
          <button type="button" class="btn-primary" onclick="window.portalApp.openItemDetail('item_cardholder')">Inspect Found Item</button>
        </div>
        <div class="match-side-by-side">
          <div class="match-item-column">
            <span class="card-badge-status lost" style="position: static; width: fit-content;">LOST POSTING</span>
            <strong>Classic Dark Brown Leather Bifold Wallet</strong>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Lost in University Library 2nd Floor</p>
          </div>
          <div class="match-item-column">
            <span class="card-badge-status found" style="position: static; width: fit-content;">FOUND POSTING</span>
            <strong>Navy Leather Cardholder / Wallet</strong>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Found on Library 2nd Floor desk #14</p>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 6: MESSAGES & ENCRYPTED COMMUNICATION
  // ==========================================================================
  renderMessages() {
    const list = document.getElementById("chatContactsList");
    const container = document.getElementById("chatMessagesContainer");
    if (!list || !container) return;

    list.innerHTML = `
      <div style="padding: 10px; background: var(--surface-lowest); border-radius: var(--radius-md); border-left: 3px solid var(--secondary); cursor: pointer;">
        <strong style="display: block; font-size: 0.86rem; color: var(--primary);">Priya Patel (Finder)</strong>
        <small style="color: var(--on-surface-variant); font-size: 0.74rem;">Re: Blue Student ID Card</small>
      </div>
      <div style="padding: 10px; border-radius: var(--radius-md); cursor: pointer; opacity: 0.6;">
        <strong style="display: block; font-size: 0.86rem; color: var(--primary);">Officer Verma (Security)</strong>
        <small style="color: var(--on-surface-variant); font-size: 0.74rem;">Re: Custody Verification Ticket</small>
      </div>
    `;

    container.innerHTML = "";
    store.messages.forEach((msg) => {
      const isMe = msg.senderId === store.getCurrentUser().id;
      const bubble = document.createElement("div");
      bubble.style.cssText = `
        max-width: 75%;
        margin-left: ${isMe ? "auto" : "0"};
        background: ${isMe ? "var(--primary)" : "var(--surface-low)"};
        color: ${isMe ? "#ffffff" : "var(--on-surface)"};
        padding: 10px 14px;
        border-radius: var(--radius-md);
        font-size: 0.86rem;
      `;
      bubble.innerHTML = `
        <span style="font-size: 0.7rem; font-weight: 700; opacity: 0.8; display: block; margin-bottom: 2px;">${msg.senderName}</span>
        <p>${msg.text}</p>
        <span style="font-size: 0.68rem; opacity: 0.6; display: block; text-align: right; margin-top: 4px;">${msg.sentAt}</span>
      `;
      container.appendChild(bubble);
    });
    container.scrollTop = container.scrollHeight;
  }

  sendChatMessage() {
    const input = document.getElementById("chatInputText");
    if (!input || !input.value.trim()) return;

    const user = store.getCurrentUser();
    const newMsg = {
      id: "msg_" + Date.now(),
      itemId: "item_found_id",
      senderId: user.id,
      senderName: user.name,
      text: input.value.trim(),
      sentAt: "Just now"
    };

    store.messages.push(newMsg);
    store.saveState();
    input.value = "";
    this.renderMessages();
  }

  // ==========================================================================
  // VIEW 7: ADMIN DESK
  // ==========================================================================
  renderAdmin() {
    const tbody = document.getElementById("adminVaultTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    store.items.forEach((item) => {
      const tr = document.createElement("tr");
      tr.style.cssText = "border-bottom: 1px solid var(--border-light);";
      tr.innerHTML = `
        <td style="padding: 10px; font-weight: 700; color: var(--primary);">${item.custodyTicket || "SEC-101"}</td>
        <td style="padding: 10px;">${item.title}</td>
        <td style="padding: 10px;">${item.custodian || "Public Safety"}</td>
        <td style="padding: 10px;">${item.location}</td>
        <td style="padding: 10px;"><span class="card-badge-status found" style="position: static;">LOGGED & VAULT SECURED</span></td>
        <td style="padding: 10px;"><button type="button" class="btn-demo-tool" onclick="window.portalApp.openItemDetail('${item.id}')">Audit</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================================================
  // MULTI-STEP REPORT MODAL (LOST OR FOUND WIZARD)
  // ==========================================================================
  openReportModal(type = "LOST") {
    this.modalReportType = type;
    const overlay = document.getElementById("reportModalOverlay");
    const title = document.getElementById("reportModalTitle");
    const dateInput = document.getElementById("modalItemDate");

    if (overlay) overlay.classList.add("open");
    if (title) title.textContent = type === "LOST" ? "Report a Lost Belonging" : "Report a Found Item (Safe Drop)";

    const modalLostBtn = document.getElementById("modalTypeLost");
    const modalFoundBtn = document.getElementById("modalTypeFound");
    if (modalLostBtn && modalFoundBtn) {
      modalLostBtn.classList.toggle("active", type === "LOST");
      modalFoundBtn.classList.toggle("active", type === "FOUND");
    }

    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    // Preset photos
    const thumbsCont = document.getElementById("modalPresetPhotos");
    if (thumbsCont) {
      const presets = [
        { label: "Wallet", url: "assets/images/wallet.jpg" },
        { label: "ID Card", url: "assets/images/id_card.jpg" },
        { label: "Backpack", url: "assets/images/backpack.jpg" },
        { label: "Watch", url: "assets/images/watch.jpg" },
        { label: "Headphones", url: "assets/images/earbuds.jpg" }
      ];
      thumbsCont.innerHTML = "";
      presets.forEach((p, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `gallery-thumb-btn ${idx === 0 ? "active" : ""}`;
        btn.dataset.url = p.url;
        btn.innerHTML = `<img src="${p.url}" alt="${p.label}">`;
        btn.addEventListener("click", () => {
          document.querySelectorAll("#modalPresetPhotos .gallery-thumb-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.selectedModalPhoto = p.url;
        });
        thumbsCont.appendChild(btn);
      });
      this.selectedModalPhoto = presets[0].url;
    }
  }

  closeReportModal() {
    const overlay = document.getElementById("reportModalOverlay");
    if (overlay) overlay.classList.remove("open");
  }

  setModalType(type) {
    this.modalReportType = type;
    const modalLostBtn = document.getElementById("modalTypeLost");
    const modalFoundBtn = document.getElementById("modalTypeFound");
    if (modalLostBtn && modalFoundBtn) {
      modalLostBtn.classList.toggle("active", type === "LOST");
      modalFoundBtn.classList.toggle("active", type === "FOUND");
    }
    const title = document.getElementById("reportModalTitle");
    if (title) title.textContent = type === "LOST" ? "Report a Lost Belonging" : "Report a Found Item (Safe Drop)";
  }

  submitNewItemReport() {
    const user = store.getCurrentUser();
    const title = document.getElementById("modalItemTitle")?.value.trim();
    const category = document.getElementById("modalItemCategory")?.value;
    const desc = document.getElementById("modalItemDesc")?.value.trim();
    const secret = document.getElementById("modalItemSecret")?.value.trim();
    const loc = document.getElementById("modalItemLocation")?.value.trim();
    const date = document.getElementById("modalItemDate")?.value;

    if (!title || !desc || !loc) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem = {
      id: "item_" + Date.now(),
      userId: user.id,
      type: this.modalReportType,
      title,
      category,
      description: desc,
      distinguishing: secret,
      location: loc,
      date,
      timeAgo: "Just now",
      imageUrl: this.selectedModalPhoto || "assets/images/wallet.jpg",
      localFallback: "assets/images/wallet.jpg",
      custodian: user.name,
      custodyTicket: (this.modalReportType === "LOST" ? "LOST-" : "VAULT-") + Math.floor(1000 + Math.random() * 9000),
      status: this.modalReportType,
      createdAt: new Date().toISOString()
    };

    store.items.unshift(newItem);
    store.saveState();

    this.closeReportModal();
    this.showToast(`Listing published successfully! Case #${newItem.custodyTicket}`);
    this.navigateTo("browse");
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  showToast(message) {
    const cont = document.getElementById("toastContainer");
    if (!cont) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
      <span>${message}</span>
    `;
    cont.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

// Instantiate and expose globally
window.portalApp = new PortalApp();
