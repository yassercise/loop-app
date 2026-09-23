// ============================================================
// LOOP — app.js
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0QDm49wVArv6oJA4YNGdRCXDe9OEtkI0",
  authDomain: "ekk-hub.firebaseapp.com",
  projectId: "ekk-hub",
  storageBucket: "ekk-hub.firebasestorage.app",
  messagingSenderId: "68211752660",
  appId: "1:68211752660:web:1098c3baed22cae8b7c541"
};

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const USER_ID = "yasser-loop";
const docRef = doc(db, "loop", USER_ID);

// ============================================================
// ICONS (SVG library)
// ============================================================
const ICONS = {
  scissors: `<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 7.5L20 18M8.5 16.5L20 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 5.5 10.5 5.5 15A6.5 6.5 0 0018.5 15C18.5 10.5 12 3 12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none"><path d="M11 3L12.3 8.7L18 10L12.3 11.3L11 17L9.7 11.3L4 10L9.7 8.7L11 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M18 14L18.6 16.4L21 17L18.6 17.6L18 20L17.4 17.6L15 17L17.4 16.4L18 14Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  wind: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 8H14A3 3 0 1011 5M3 16H17A3 3 0 1114 19M3 12H20A2.5 2.5 0 1017.5 9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 16V11.5L6 7H18L20 11.5V16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><rect x="3" y="16" width="18" height="3.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><circle cx="7.5" cy="19.5" r="1.4" fill="currentColor"/><circle cx="16.5" cy="19.5" r="1.4" fill="currentColor"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a4 4 0 00-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 005-5.4l-2.6 2.6-2-2 2.6-2.6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  tooth: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4C9 4 6 5.5 6 9.5C6 13 7.5 14 7.5 17C7.5 19 8 20 9 20C10 20 10 17 12 17C14 17 14 20 15 20C16 20 16.5 19 16.5 17C16.5 14 18 13 18 9.5C18 5.5 15 4 12 4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 12C2 12 5.5 6 12 6C18.5 6 22 12 22 12C22 12 18.5 18 12 18C5.5 18 2 12 2 12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 20.5C12 20.5 3.5 15 3.5 9C3.5 6 5.8 4 8.3 4C10 4 11.3 5 12 6.2C12.7 5 14 4 15.7 4C18.2 4 20.5 6 20.5 9C20.5 15 12 20.5 12 20.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M10.5 18.5H13.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="16" rx="3" stroke="currentColor" stroke-width="1.7"/><path d="M8 3V7M16 3V7M3.5 10H20.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  shirt: `<svg viewBox="0 0 24 24" fill="none"><path d="M8 4L3 7.5L5.5 11L8 9.5V21H16V9.5L18.5 11L21 7.5L16 4C16 5.5 14.2 6.5 12 6.5C9.8 6.5 8 5.5 8 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  suitcase: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M9 7V5A2 2 0 0111 3H13A2 2 0 0115 5V7" stroke="currentColor" stroke-width="1.7"/></svg>`,
  card: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M2.5 9.5H21.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
  passport: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 16H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  dumbbell: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 10V14M2.5 9V15M20 10V14M21.5 9V15M7 12H17" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><rect x="5.5" y="8.5" width="3" height="7" rx="1" stroke="currentColor" stroke-width="1.7"/><rect x="15.5" y="8.5" width="3" height="7" rx="1" stroke="currentColor" stroke-width="1.7"/></svg>`,
  racquet: `<svg viewBox="0 0 24 24" fill="none"><circle cx="10" cy="8" r="6" stroke="currentColor" stroke-width="1.7"/><path d="M10 14L4 21M6 5L14 11M14 5L6 11" stroke="currentColor" stroke-width="1.4"/></svg>`,
  paw: `<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="10" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="10.5" cy="6.5" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="15.5" cy="6.5" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="10" r="2" stroke="currentColor" stroke-width="1.6"/><path d="M12.5 12C16 12 18 15 18 17.5C18 19.5 16.5 21 14.5 20.5C13 20.1 12.9 19 12.5 19C12.1 19 12 20.1 10.5 20.5C8.5 21 7 19.5 7 17.5C7 15 9 12 12.5 12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  bed: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 18V8.5A2.5 2.5 0 015.5 6H11A2.5 2.5 0 0113.5 8.5V13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M3 13H19A2 2 0 0121 15V18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M3 21V18M21 21V18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="7" cy="9.5" r="1.4" stroke="currentColor" stroke-width="1.4"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5.5C10.5 4.3 8 4 4.5 4.5V17.5C8 17 10.5 17.3 12 18.5C13.5 17.3 16 17 19.5 17.5V4.5C16 4 13.5 4.3 12 5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 5.5V18.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 21C16 21 18 18 18 14.5C18 11 15.5 9.5 15.5 7C15.5 5.5 16 4.5 16 4.5C16 4.5 12.5 5.5 12.5 10C12.5 8 11.5 6.5 11.5 6.5C11.5 6.5 9 8.5 9 12C9 12 7 11 7 9C7 9 6 11.5 6 14.5C6 18 8 21 12 21Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 11L12 4L20 11V19A1.5 1.5 0 0118.5 20.5H5.5A1.5 1.5 0 014 19V11Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9.5 20.5V14.5H14.5V20.5" stroke="currentColor" stroke-width="1.7"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5L14.6 9.2L20.8 9.9L16.2 14.1L17.5 20.3L12 17.1L6.5 20.3L7.8 14.1L3.2 9.9L9.4 9.2L12 3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
};
const ICON_KEYS = Object.keys(ICONS);

function iconSVG(key){ return ICONS[key] || ICONS.star; }

// ============================================================
// DEFAULT DATA (seed on first load)
// ============================================================
const DEFAULT_COLORS = ["rose","amber","lime","teal","sky","violet","fuchsia","orange"];

function seedData(){
  const today = new Date();
  const daysAgo = n => { const d = new Date(today); d.setDate(d.getDate()-n); return dstr(d); };

  const categories = [
    { id: "personal-care", name: "Personal Care", color: "rose",   icon: "scissors" },
    { id: "home",          name: "Home",          color: "sky",    icon: "home" },
    { id: "health",        name: "Health",        color: "teal",   icon: "heart" },
    { id: "relationships", name: "Relationships",  color: "fuchsia",icon: "phone" },
    { id: "clothes",       name: "Clothes",       color: "violet", icon: "shirt" },
    { id: "finance",       name: "Finance",       color: "amber",  icon: "card" },
    { id: "fitness",       name: "Fitness",       color: "lime",   icon: "dumbbell" },
  ];

  const items = [
    mkItem({ name:"Haircut", category:"personal-care", icon:"scissors", type:"interval", intervalDays:21, lastDone: daysAgo(12), cost:5, costVaries:true }),
    mkItem({ name:"Skincare restock", category:"personal-care", icon:"droplet", type:"interval", intervalDays:45, lastDone: daysAgo(30), cost:18 }),
    mkItem({ name:"AC filter change", category:"home", icon:"wind", type:"interval", intervalDays:60, lastDone: daysAgo(58) }),
    mkItem({ name:"Car wash", category:"home", icon:"car", type:"interval", intervalDays:14, lastDone: daysAgo(20) }),
    mkItem({ name:"Car oil change", category:"home", icon:"wrench", type:"interval", intervalDays:90, lastDone: daysAgo(40), cost:25, costVaries:true }),
    mkItem({ name:"Dentist checkup", category:"health", icon:"tooth", type:"interval", intervalDays:180, lastDone: daysAgo(150), cost:35, costVaries:true }),
    mkItem({ name:"Eye checkup", category:"health", icon:"eye", type:"interval", intervalDays:365, lastDone: daysAgo(200) }),
    mkItem({ name:"Call parents", category:"relationships", icon:"phone", type:"interval", intervalDays:7, lastDone: daysAgo(9) }),
    mkItem({ name:"Laundry", category:"clothes", icon:"shirt", type:"interval", intervalDays:5, lastDone: daysAgo(4) }),
    mkItem({ name:"Dry cleaning drop-off", category:"clothes", icon:"suitcase", type:"interval", intervalDays:21, lastDone: daysAgo(10) }),
    mkItem({ name:"Netflix renewal", category:"finance", icon:"card", type:"fixed", fixedDate: dstr(new Date(today.getFullYear(), today.getMonth()+1, 2)), renewDays:30, cost:4.5 }),
    mkItem({ name:"Phone bill", category:"finance", icon:"phone", type:"fixed", fixedDate: dstr(new Date(today.getFullYear(), today.getMonth()+1, 1)), renewDays:30, cost:15, costVaries:true }),
    mkItem({ name:"Passport expiry", category:"finance", icon:"passport", type:"fixed", fixedDate: dstr(new Date(today.getFullYear()+2, today.getMonth(), today.getDate())), renewDays:365 }),
    mkItem({ name:"Gym session", category:"fitness", icon:"dumbbell", type:"interval", intervalDays:2, lastDone: daysAgo(1) }),
    mkItem({ name:"Padel", category:"fitness", icon:"racquet", type:"interval", intervalDays:7, lastDone: daysAgo(6), cost:8, costVaries:true }),
  ];

  return { categories, items, currency: "BHD" };
}

function mkItem({ name, category, icon, type, intervalDays, lastDone, fixedDate, renewDays, cost, costVaries, notes, neverDoneYet }){
  const initialHistory = lastDone ? [{ date: lastDone, cost: cost || null }] : [];
  return {
    id: uid(),
    name, category, icon, type,
    intervalDays: intervalDays || null,
    lastDone: lastDone || null,
    fixedDate: fixedDate || null,
    renewDays: renewDays != null ? renewDays : 365,
    cost: cost || null,
    costVaries: !!costVaries,
    neverDoneYet: !!neverDoneYet,
    notes: notes || "",
    history: initialHistory,
    createdAt: dstr(new Date())
  };
}

function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
function dstr(d){ return d.toISOString().slice(0,10); }
function todayStr(){ return dstr(new Date()); }
function daysBetween(a,b){ return Math.round((new Date(b) - new Date(a)) / 86400000); }
function formatShortDate(dateStr){
  const d = new Date(dateStr);
  const isCurrentYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString(undefined, isCurrentYear
    ? { month:"short", day:"numeric" }
    : { month:"short", day:"numeric", year:"numeric" });
}

// ============================================================
// STATE
// ============================================================
let state = null;
let isRemoteUpdate = false;
let activeFilter = null;
let sidebarActiveCategory = null;
let currentDesktopView = "dashboard";
let editingItemId = null;
let editingCategoryId = null;
let detailItemId = null;
let confirmCallback = null;

// ============================================================
// FIRESTORE SYNC
// ============================================================
async function initData(){
  const splashStart = Date.now();
  try{
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data() && snap.data().items){
      state = snap.data();
    } else {
      state = seedData();
      await saveToFirestore();
    }
  }catch(e){
    console.error("Firestore init failed, using local seed", e);
    state = seedData();
  }
  render();

  // Guarantee the splash is visible for at least one clean animation
  // cycle so a fast connection doesn't just flash it — but never hold
  // it longer than necessary on a slow one.
  const MIN_SPLASH_MS = 550;
  const elapsed = Date.now() - splashStart;
  setTimeout(dismissSplash, Math.max(0, MIN_SPLASH_MS - elapsed));

  listenForChanges();
}

// Slides the loading splash up and out once real data has actually
// rendered — never on a fixed timer, so it never lies about being ready.
function dismissSplash(){
  const splash = document.getElementById("splashScreen");
  if (!splash) return;
  requestAnimationFrame(() => {
    splash.classList.add("splash-exit");
    setTimeout(() => splash.classList.add("splash-hidden"), 700);
  });
}

function listenForChanges(){
  onSnapshot(docRef, (snap) => {
    if (!snap.exists()) return;
    isRemoteUpdate = true;
    state = snap.data();
    render();
    isRemoteUpdate = false;
  });
}

let saveTimeout = null;
function saveToFirestore(){
  if (isRemoteUpdate) return Promise.resolve();
  clearTimeout(saveTimeout);
  return new Promise((resolve) => {
    saveTimeout = setTimeout(async () => {
      try{
        await setDoc(docRef, state);
      }catch(e){ console.error("Save failed", e); }
      resolve();
    }, 250);
  });
}

// ============================================================
// COMPUTED STATUS
// ============================================================
function getItemStatus(item){
  let dueDate, lastRef, totalSpan;

  if (item.type === "fixed"){
    dueDate = item.fixedDate;
    lastRef = item.history && item.history.length ? item.history[item.history.length-1].date : item.createdAt;
    totalSpan = Math.max(daysBetween(lastRef, dueDate), 1);
  } else {
    lastRef = item.lastDone || item.createdAt;
    const d = new Date(lastRef);
    d.setDate(d.getDate() + item.intervalDays);
    dueDate = dstr(d);
    totalSpan = item.intervalDays;
  }

  const daysAgo = daysBetween(lastRef, todayStr());
  const daysLeft = daysBetween(todayStr(), dueDate);
  const elapsed = daysBetween(lastRef, todayStr());
  let pct = totalSpan > 0 ? (elapsed / totalSpan) * 100 : 100;

  const SOON_THRESHOLD_DAYS = 2;
  let status = "ontrack";
  if (daysLeft < 0) status = "overdue";
  else if (daysLeft <= SOON_THRESHOLD_DAYS) status = "soon";

  return { dueDate, lastRef, daysAgo, daysLeft, pct: Math.max(pct,0), status };
}

function getCategory(id){
  return state.categories.find(c => c.id === id) || { id:"other", name:"Other", color:"violet", icon:"star" };
}

// ============================================================
// RENDER: DASHBOARD
// ============================================================
function render(){
  if (!state) return;
  renderSummary();
  renderCategoryList();
  renderSidebar();
}

function renderSummary(){
  let overdue=0, soon=0, ontrack=0;
  state.items.forEach(item => {
    const s = getItemStatus(item).status;
    if (s === "overdue") overdue++;
    else if (s === "soon") soon++;
    else ontrack++;
  });
  document.getElementById("countOverdue").textContent = overdue;
  document.getElementById("countSoon").textContent = soon;
  document.getElementById("countOnTrack").textContent = ontrack;

  document.querySelectorAll(".summary-pill").forEach(pill => {
    pill.classList.toggle("dimmed", activeFilter && activeFilter !== pill.dataset.filter);
  });
}

function renderCategoryList(){
  const container = document.getElementById("categoryList");
  const emptyState = document.getElementById("emptyState");

  if (!state.items.length){
    container.innerHTML = "";
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  // group items by category
  const byCat = {};
  state.items.forEach(item => {
    if (!byCat[item.category]) byCat[item.category] = [];
    byCat[item.category].push(item);
  });

  let html = "";
  state.categories.forEach(cat => {
    if (sidebarActiveCategory && cat.id !== sidebarActiveCategory) return;

    let items = byCat[cat.id] || [];
    if (!items.length) return;

    if (activeFilter){
      items = items.filter(it => getItemStatus(it).status === activeFilter);
      if (!items.length) return;
    }

    // sort by urgency: overdue first (most overdue first), then soon, then ontrack
    items = items.slice().sort((a,b) => {
      const sa = getItemStatus(a), sb = getItemStatus(b);
      return sa.daysLeft - sb.daysLeft;
    });

    html += `<div class="category-group cat-${cat.color}">
      <div class="category-group-head">
        <span class="category-group-dot"></span>
        <span class="category-group-name">${esc(cat.name)}</span>
        <span class="category-group-count">${items.length}</span>
      </div>
      <div class="item-cards">
        ${items.map(item => renderItemCard(item, cat)).join("")}
      </div>
    </div>`;
  });

  container.innerHTML = html || `<p class="filter-empty-msg">No items match this filter.</p>`;

  container.querySelectorAll(".item-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".item-check")) {
        handleQuickLog(card.dataset.id, card);
      } else {
        openDetail(card.dataset.id);
      }
    });
  });
  container.querySelectorAll(".item-check").forEach(chk => {
    chk.addEventListener("click", (e) => {
      e.stopPropagation();
      handleQuickLog(chk.closest(".item-card").dataset.id, chk.closest(".item-card"));
    });
  });

  container.querySelectorAll(".item-swipe-wrap").forEach(setupItemSwipe);
}

// Swipe-to-delete for dashboard item cards. Dragging left reveals a red
// delete action behind the card; releasing past the threshold snaps it
// fully open, tapping the revealed button asks for confirmation.
const SWIPE_DELETE_WIDTH = 88;
function setupItemSwipe(wrap){
  const card = wrap.querySelector(".item-card");
  const deleteBtn = wrap.querySelector(".item-swipe-delete");
  let startX = 0, startY = 0, currentX = 0, dragging = false, decided = false, isHorizontal = false;
  let openOffset = 0; // 0 = closed, -SWIPE_DELETE_WIDTH = open

  wrap.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = openOffset;
    dragging = true; decided = false; isHorizontal = false;
    wrap.classList.add("dragging");
  }, { passive:true });

  wrap.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;

    if (!decided){
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8){
        isHorizontal = Math.abs(dx) > Math.abs(dy);
        decided = true;
      } else {
        return;
      }
    }
    if (!isHorizontal){ dragging = false; return; } // let the page scroll vertically

    let next = openOffset + dx;
    next = Math.min(0, Math.max(-SWIPE_DELETE_WIDTH * 1.15, next)); // slight overdrag resistance handled by clamp
    currentX = next;
    card.style.transform = `translateX(${next}px)`;
  }, { passive:true });

  wrap.addEventListener("touchend", () => {
    if (!dragging){ return; }
    dragging = false;
    wrap.classList.remove("dragging");
    if (!isHorizontal) return;

    // Snap open if dragged past half the delete width, else snap closed.
    openOffset = currentX < -SWIPE_DELETE_WIDTH / 2 ? -SWIPE_DELETE_WIDTH : 0;
    card.style.transform = `translateX(${openOffset}px)`;
  });

  deleteBtn.addEventListener("click", () => {
    const itemId = wrap.dataset.id;
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    showConfirm(`Delete "${esc(item.name)}"? This can't be undone.`, () => {
      state.items = state.items.filter(i => i.id !== itemId);
      render();
      saveToFirestore();
      showToast("Item deleted");
    });
  });

  // Tapping the card itself while the delete action is revealed should
  // close it instead of opening the detail sheet.
  card.addEventListener("click", (e) => {
    if (openOffset !== 0){
      e.stopPropagation();
      e.preventDefault();
      openOffset = 0;
      card.style.transform = `translateX(0px)`;
    }
  }, true);
}
// RENDER: DESKTOP SIDEBAR
// ============================================================
function renderSidebar(){
  const list = document.getElementById("sidebarCategoryList");
  if (!list) return;

  list.innerHTML = state.categories.map(cat => {
    const count = state.items.filter(i => i.category === cat.id).length;
    const isActive = sidebarActiveCategory === cat.id;
    return `<div class="sidebar-cat-item cat-${cat.color} ${isActive ? 'active' : ''}" data-id="${cat.id}">
      <span class="sidebar-cat-dot"></span>
      <span class="sidebar-cat-name">${esc(cat.name)}</span>
      <span class="sidebar-cat-count">${count}</span>
      <span class="sidebar-cat-actions">
        <button class="sidebar-cat-action-btn" data-action="edit" aria-label="Edit category">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 20L4.6 16.7C4.7 16.3 4.9 15.9 5.2 15.6L15.5 5.3C16.3 4.5 17.5 4.5 18.3 5.3L18.7 5.7C19.5 6.5 19.5 7.7 18.7 8.5L8.4 18.8C8.1 19.1 7.7 19.3 7.3 19.4L4 20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </button>
        <button class="sidebar-cat-action-btn danger" data-action="delete" aria-label="Delete category">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20M9 7V5A2 2 0 0111 3H13A2 2 0 0115 5V7M18 7L17.3 19A2 2 0 0115.3 21H8.7A2 2 0 016.7 19L6 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </span>
    </div>`;
  }).join("");

  list.querySelectorAll(".sidebar-cat-item").forEach(row => {
    row.addEventListener("click", (e) => {
      const id = row.dataset.id;
      const action = e.target.closest("[data-action]");
      if (action && action.dataset.action === "edit"){
        openNewCategorySheet(id);
      } else if (action && action.dataset.action === "delete"){
        const count = state.items.filter(i => i.category === id).length;
        const msg = count > 0
          ? `Delete this category and its ${count} item${count===1?'':'s'}? This can't be undone.`
          : `Delete this category?`;
        showConfirm(msg, () => {
          state.categories = state.categories.filter(c => c.id !== id);
          state.items = state.items.filter(i => i.category !== id);
          if (sidebarActiveCategory === id) sidebarActiveCategory = null;
          render();
          saveToFirestore();
          showToast("Category deleted");
        });
      } else {
        sidebarActiveCategory = sidebarActiveCategory === id ? null : id;
        render();
      }
    });
  });
}

function renderItemCard(item, cat){
  const s = getItemStatus(item);
  const pct = Math.min(s.pct, 100);
  const overflowing = s.pct > 100;

  const dueDateLabel = formatShortDate(s.dueDate);
  const lastDoneLabel = formatShortDate(s.lastRef);

  let dueText, metaClass = "";
  if (s.status === "overdue"){
    dueText = `${Math.abs(s.daysLeft)}d overdue`;
    metaClass = "status-overdue";
  } else if (s.status === "soon"){
    dueText = `Due in ${s.daysLeft}d`;
    metaClass = "status-soon";
  } else {
    dueText = `Due in ${s.daysLeft}d`;
  }

  const lastDoneText = item.neverDoneYet
    ? `Not started yet`
    : `Last done ${s.daysAgo}d ago · ${lastDoneLabel}`;
  const costHtml = item.cost ? `<span class="item-cost">${state.currency} ${Number(item.cost).toFixed(2)}</span>` : "";

  return `<div class="item-swipe-wrap" data-id="${item.id}">
    <div class="item-swipe-delete" data-action="delete-item">
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20M9 7V5A2 2 0 0111 3H13A2 2 0 0115 5V7M18 7L17.3 19A2 2 0 0115.3 21H8.7A2 2 0 016.7 19L6 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>Delete</span>
    </div>
    <div class="item-card cat-${cat.color} ${s.status === 'overdue' ? 'overdue' : ''}" data-id="${item.id}">
      <div class="item-icon-wrap">${iconSVG(item.icon)}</div>
      <div class="item-main">
        <div class="item-top-row">
          <span class="item-name">${esc(item.name)}</span>
          <span class="item-meta ${metaClass}">${dueText}</span>
        </div>
        <div class="item-sub-row">
          <div class="item-bar-track">
            <div class="item-bar-fill ${overflowing ? 'overflowing' : ''}" style="width:${pct}%"></div>
          </div>
          ${costHtml}
        </div>
        <div class="item-date-row">
          <span class="item-last-done">${lastDoneText}</span>
          <span class="item-due-date">Due ${dueDateLabel}</span>
        </div>
      </div>
      <div class="item-check">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9.5 17.5L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>`;
}

function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ============================================================
// LOG ITEM DONE
// ============================================================
function handleQuickLog(itemId, cardEl){
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  completeLog(item, () => {
    cardEl.classList.add("just-logged");
    playChime(); vibrate(12);
    showToast(`${item.name} logged`);
    render(); saveToFirestore();
  });
}

// Central "mark done" flow shared by the quick-tap checkmark and the detail
// sheet's log button. Branches on whether the item needs a next-date prompt
// (fixed date, "ask each time") or a cost confirm (costVaries + has a cost).
function completeLog(item, onDone){
  if (item.type === "fixed" && item.renewDays === 0){
    promptNextDate(item, (nextDate) => {
      if (item.costVaries && item.cost){
        promptCost(item, (cost) => {
          logItemDone(item, { nextDate, cost });
          onDone();
        });
      } else {
        logItemDone(item, { nextDate });
        onDone();
      }
    });
    return;
  }

  if (item.costVaries && item.cost){
    promptCost(item, (cost) => {
      logItemDone(item, { cost });
      onDone();
    });
    return;
  }

  logItemDone(item);
  onDone();
}

// For "ask each time" fixed-date items: collect the next due date via a
// lightweight date-input prompt built on the confirm dialog shell.
function promptNextDate(item, onConfirm){
  const backdrop = document.getElementById("confirmBackdrop");
  const box = backdrop.querySelector(".confirm-box");
  box.innerHTML = `
    <p>When is the next "${esc(item.name)}" due?</p>
    <input type="date" id="nextDateInput" class="field-input" value="${item.fixedDate}" style="margin-bottom:14px;">
    <div class="confirm-actions">
      <button class="confirm-btn cancel" id="nextDateCancel">Cancel</button>
      <button class="confirm-btn" id="nextDateOk" style="background:var(--accent); color:#fff;">Confirm</button>
    </div>
  `;
  backdrop.classList.add("open");

  document.getElementById("nextDateCancel").addEventListener("click", () => {
    backdrop.classList.remove("open");
    restoreConfirmBox();
  });
  document.getElementById("nextDateOk").addEventListener("click", () => {
    const nextDate = document.getElementById("nextDateInput").value || item.fixedDate;
    backdrop.classList.remove("open");
    restoreConfirmBox();
    onConfirm(nextDate);
  });
}

// For items marked "cost varies": confirm or edit the amount before logging.
function promptCost(item, onConfirm){
  const backdrop = document.getElementById("confirmBackdrop");
  const box = backdrop.querySelector(".confirm-box");
  box.innerHTML = `
    <p>Cost for this "${esc(item.name)}"?</p>
    <div class="cost-input-wrap" style="margin-bottom:14px;">
      <span class="cost-prefix">${state.currency}</span>
      <input type="number" id="promptCostInput" class="field-input cost-input" value="${item.cost}" min="0" step="0.01">
    </div>
    <div class="confirm-actions">
      <button class="confirm-btn cancel" id="costCancel">Cancel</button>
      <button class="confirm-btn" id="costOk" style="background:var(--accent); color:#fff;">Confirm</button>
    </div>
  `;
  backdrop.classList.add("open");
  document.getElementById("promptCostInput").focus();

  document.getElementById("costCancel").addEventListener("click", () => {
    backdrop.classList.remove("open");
    restoreConfirmBox();
  });
  document.getElementById("costOk").addEventListener("click", () => {
    const cost = parseFloat(document.getElementById("promptCostInput").value);
    backdrop.classList.remove("open");
    restoreConfirmBox();
    onConfirm(isNaN(cost) ? item.cost : cost);
  });
}

function restoreConfirmBox(){
  const box = document.querySelector("#confirmBackdrop .confirm-box");
  box.innerHTML = `
    <p id="confirmMessage">Are you sure?</p>
    <div class="confirm-actions">
      <button class="confirm-btn cancel" id="confirmCancel">Cancel</button>
      <button class="confirm-btn danger" id="confirmOk">Delete</button>
    </div>
  `;
  document.getElementById("confirmCancel").addEventListener("click", () => {
    document.getElementById("confirmBackdrop").classList.remove("open");
    confirmCallback = null;
  });
  document.getElementById("confirmOk").addEventListener("click", () => {
    document.getElementById("confirmBackdrop").classList.remove("open");
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  });
}

// Returns true if the log completed immediately, false if it needs a follow-up
// (e.g. "ask each time" fixed-date items prompt for the next due date).
function logItemDone(item, options){
  options = options || {};
  const today = todayStr();
  const explicitNextDate = options.nextDate;
  const loggedCost = options.cost !== undefined ? options.cost : item.cost;

  if (item.type === "fixed" && item.renewDays === 0 && !explicitNextDate){
    return false; // caller must collect the next date and re-call with it
  }

  item.history = item.history || [];
  item.history.push({ date: today, cost: loggedCost || null });
  if (item.history.length > 30) item.history = item.history.slice(-30);
  if (loggedCost != null) item.cost = loggedCost;

  if (item.type === "interval"){
    item.lastDone = today;
    item.neverDoneYet = false;
  } else if (explicitNextDate){
    item.fixedDate = explicitNextDate;
  } else if (item.renewDays > 0){
    const d = new Date(item.fixedDate);
    d.setDate(d.getDate() + item.renewDays);
    item.fixedDate = dstr(d);
  }
  return true;
}

// ============================================================
// SOUND + HAPTICS
// ============================================================
let audioCtx = null;
function playChime(){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i*0.06);
      gain.gain.linearRampToValueAtTime(0.11, now + i*0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i*0.06 + 0.35);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now + i*0.06);
      osc.stop(now + i*0.06 + 0.4);
    });
  }catch(e){}
}
function vibrate(ms){ if (navigator.vibrate) navigator.vibrate(ms); }

// ============================================================
// TOAST
// ============================================================
let toastTimeout = null;
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.innerHTML = `<span class="toast-check"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9.5 17.5L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${esc(msg)}`;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ============================================================
// SHEET HELPERS
// ============================================================
function openSheet(id){ document.getElementById(id).classList.add("open"); }
function closeSheet(id){ document.getElementById(id).classList.remove("open"); }

function setupSwipeDown(backdropId, sheetId){
  const backdrop = document.getElementById(backdropId);
  const sheet = document.getElementById(sheetId);
  let startY = 0, currentY = 0, dragging = false, startedAtTop = false;

  const scrollable = sheet.querySelector(".sheet-body, .detail-body");

  sheet.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    currentY = 0;
    // Only allow the drag-to-close gesture to begin if the inner content
    // is already scrolled to its top — otherwise let normal scrolling happen.
    startedAtTop = !scrollable || scrollable.scrollTop <= 0;
    dragging = startedAtTop;
    sheet.style.transition = "none";
  }, { passive:true });

  sheet.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0){
      currentY = delta;
      sheet.style.transform = `translateY(${currentY}px)`;
    } else {
      // user is trying to scroll content up while at the top — bail out of drag mode
      dragging = false;
      sheet.style.transform = "";
    }
  }, { passive:true });

  sheet.addEventListener("touchend", () => {
    dragging = false;
    sheet.style.transition = "";
    if (currentY > 100){ closeSheet(backdropId); }
    sheet.style.transform = "";
    currentY = 0;
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeSheet(backdropId);
  });
}

// ============================================================
// ADD / EDIT ITEM SHEET
// ============================================================
function openItemSheet(itemId){
  editingItemId = itemId || null;
  const item = itemId ? state.items.find(i => i.id === itemId) : null;

  document.getElementById("itemSheetTitle").textContent = item ? "Edit item" : "New item";
  document.getElementById("deleteItemBtn").hidden = !item;
  document.getElementById("costPrefix").textContent = state.currency;

  renderCategoryChips(item ? item.category : (state.categories[0] && state.categories[0].id));
  renderIconGrid("iconGrid", item ? item.icon : ICON_KEYS[0], getActiveCategoryColor());

  document.getElementById("itemName").value = item ? item.name : "";
  document.getElementById("itemCost").value = item && item.cost ? item.cost : "";
  document.getElementById("costVariesToggle").checked = item ? !!item.costVaries : false;
  document.getElementById("itemNotes").value = item ? item.notes || "" : "";

  const type = item ? item.type : "interval";
  setItemType(type);

  if (type === "interval"){
    document.getElementById("intervalDays").value = item ? item.intervalDays : 30;
    document.getElementById("lastDoneDate").value = item ? item.lastDone : todayStr();
    // "Haven't done this yet" only makes sense for a brand-new item with no history.
    document.getElementById("neverDoneToggle").checked = false;
    document.getElementById("neverDoneToggle").parentElement.hidden = !!item;
    setNeverDoneState(false);
  } else {
    document.getElementById("fixedDate").value = item ? item.fixedDate : todayStr();
    setActiveSegment("renewSegment", item ? String(item.renewDays) : "365");

    const hint = document.getElementById("fixedLastDoneHint");
    const hist = item && item.history && item.history.length ? item.history : null;
    if (hist){
      const lastEntry = hist[hist.length - 1];
      const label = formatShortDate(lastEntry.date);
      const costLabel = lastEntry.cost ? ` for ${state.currency} ${Number(lastEntry.cost).toFixed(2)}` : "";
      hint.textContent = `Last confirmed ${label}${costLabel}`;
      hint.hidden = false;
    } else {
      hint.hidden = true;
    }
  }

  openSheet("itemSheetBackdrop");
}

function getActiveCategoryColor(){
  const activeChip = document.querySelector("#categoryChipRow .chip.active");
  if (!activeChip) return "violet";
  const cat = state.categories.find(c => c.id === activeChip.dataset.id);
  return cat ? cat.color : "violet";
}

function renderCategoryChips(activeId){
  const row = document.getElementById("categoryChipRow");
  row.innerHTML = state.categories.map(cat => `
    <button class="chip cat-${cat.color} ${cat.id === activeId ? 'active' : ''}" data-id="${cat.id}">
      <span class="chip-dot"></span>${esc(cat.name)}
    </button>
  `).join("");
  row.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      row.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderIconGrid("iconGrid", getSelectedIcon(), getActiveCategoryColor());
    });
  });
}

function getSelectedIcon(){
  const active = document.querySelector("#iconGrid .icon-opt.active");
  return active ? active.dataset.icon : ICON_KEYS[0];
}

function renderIconGrid(gridId, activeIcon, colorName){
  const grid = document.getElementById(gridId);
  grid.className = `icon-grid cat-${colorName || 'violet'}`;
  grid.innerHTML = ICON_KEYS.map(key => `
    <button class="icon-opt ${key === activeIcon ? 'active' : ''}" data-icon="${key}">${iconSVG(key)}</button>
  `).join("");
  grid.querySelectorAll(".icon-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      grid.querySelectorAll(".icon-opt").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
    });
  });
}

function setItemType(type){
  document.querySelectorAll("#typeSegment .segment").forEach(s => s.classList.toggle("active", s.dataset.type === type));
  document.getElementById("intervalFields").hidden = type !== "interval";
  document.getElementById("fixedFields").hidden = type !== "fixed";
}

function setNeverDoneState(neverDone){
  document.getElementById("lastDoneWrap").hidden = neverDone;
}

function setActiveSegment(containerId, value){
  const container = document.getElementById(containerId);
  container.querySelectorAll(".segment").forEach(s => {
    const key = s.dataset.mult || s.dataset.renew || s.dataset.type;
    s.classList.toggle("active", key === String(value));
  });
}

function saveItem(){
  const name = document.getElementById("itemName").value.trim();
  if (!name){ shakeField("itemName"); return; }

  const activeChip = document.querySelector("#categoryChipRow .chip.active");
  if (!activeChip){ return; }
  const category = activeChip.dataset.id;
  const icon = getSelectedIcon();
  const type = document.querySelector("#typeSegment .segment.active").dataset.type;
  const cost = parseFloat(document.getElementById("itemCost").value) || null;
  const costVaries = document.getElementById("costVariesToggle").checked;
  const notes = document.getElementById("itemNotes").value.trim();
  const neverDoneYet = type === "interval" && !editingItemId && document.getElementById("neverDoneToggle").checked;

  let itemData = { name, category, icon, type, cost, costVaries, notes };

  if (type === "interval"){
    const mult = parseInt(document.querySelector("#unitSegment .segment.active").dataset.mult, 10);
    const rawDays = parseInt(document.getElementById("intervalDays").value, 10) || 1;
    itemData.intervalDays = rawDays * mult;
    // "Haven't done this yet": the interval starts counting from today, and
    // nothing is logged to history since nothing has actually happened.
    itemData.lastDone = neverDoneYet ? todayStr() : (document.getElementById("lastDoneDate").value || todayStr());
    itemData.neverDoneYet = neverDoneYet;
  } else {
    itemData.fixedDate = document.getElementById("fixedDate").value || todayStr();
    itemData.renewDays = parseInt(document.querySelector("#renewSegment .segment.active").dataset.renew, 10);
  }

  if (editingItemId){
    const item = state.items.find(i => i.id === editingItemId);
    Object.assign(item, itemData);
  } else {
    const newItem = mkItem(itemData);
    if (type === "interval") {
      newItem.lastDone = itemData.lastDone;
      newItem.neverDoneYet = neverDoneYet;
      // A real logged date gets a history entry; "haven't done yet" doesn't,
      // since nothing has actually happened — it's just the starting point.
      newItem.history = neverDoneYet ? [] : [{ date: itemData.lastDone, cost: cost || null }];
    }
    else { newItem.fixedDate = itemData.fixedDate; newItem.renewDays = itemData.renewDays; newItem.history = []; }
    state.items.push(newItem);
  }

  vibrate(10);
  closeSheet("itemSheetBackdrop");
  render();
  saveToFirestore();
  showToast(editingItemId ? "Item updated" : "Item added");
}

function shakeField(id){
  const el = document.getElementById(id);
  el.style.borderColor = "var(--danger)";
  el.animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}], {duration:300});
  setTimeout(() => el.style.borderColor = "", 1000);
}

function deleteItem(){
  showConfirm(`Delete "${state.items.find(i=>i.id===editingItemId)?.name}"? This can't be undone.`, () => {
    state.items = state.items.filter(i => i.id !== editingItemId);
    closeSheet("itemSheetBackdrop");
    render();
    saveToFirestore();
    showToast("Item deleted");
  });
}

// ============================================================
// DETAIL SHEET
// ============================================================
function openDetail(itemId){
  detailItemId = itemId;
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  const cat = getCategory(item.category);
  const s = getItemStatus(item);

  document.getElementById("detailIconWrap").className = `detail-icon-wrap cat-${cat.color}`;
  document.getElementById("detailIconWrap").innerHTML = iconSVG(item.icon);
  document.getElementById("detailName").textContent = item.name;
  document.getElementById("detailCategory").textContent = cat.name;

  document.getElementById("detailDaysAgo").textContent = item.neverDoneYet ? "Not yet" : `${s.daysAgo}d ago`;
  document.getElementById("detailDaysLeft").textContent = s.status === "overdue" ? `${Math.abs(s.daysLeft)}d over` : `${s.daysLeft}d left`;
  document.getElementById("detailDaysLeftLabel").textContent = s.status === "overdue" ? "Overdue" : "Due";

  const costStat = document.getElementById("detailCostStat");
  if (item.cost){
    costStat.hidden = false;
    document.getElementById("detailCost").textContent = `${state.currency} ${Number(item.cost).toFixed(0)}`;
  } else {
    costStat.hidden = true;
  }

  const barFill = document.getElementById("detailBarFill");
  const pct = Math.min(s.pct, 100);
  barFill.className = `detail-bar-fill ${s.pct > 100 ? 'overflowing' : ''}`;
  barFill.style.width = "0%";
  requestAnimationFrame(() => { barFill.style.width = pct + "%"; });

  const notesEl = document.getElementById("detailNotes");
  if (item.notes){ notesEl.hidden = false; notesEl.textContent = item.notes; }
  else notesEl.hidden = true;

  renderHistory(item);

  openSheet("detailSheetBackdrop");
}

function renderHistory(item){
  const list = document.getElementById("historyList");
  const hist = (item.history || []).slice().reverse();
  if (!hist.length){
    list.innerHTML = `<p style="color:var(--text-3); font-size:13.5px; padding:8px 4px;">No history yet.</p>`;
    return;
  }
  const preview = hist.slice(0, 5);
  list.innerHTML = preview.map((entry, i) => {
    const gap = i < hist.length - 1 ? daysBetween(hist[i+1].date, entry.date) + "d gap" : "";
    const d = new Date(entry.date);
    const label = d.toLocaleDateString(undefined, { month:"short", day:"numeric", year:"numeric" });
    const costLabel = entry.cost ? `${state.currency} ${Number(entry.cost).toFixed(2)}` : "";
    return `<div class="history-row">
      <span class="history-date">${label}</span>
      <span class="history-right">
        ${costLabel ? `<span class="history-cost">${costLabel}</span>` : ""}
        <span class="history-gap">${gap}</span>
      </span>
    </div>`;
  }).join("");

  if (hist.length > 5){
    list.innerHTML += `<button class="history-see-all" id="seeAllHistoryBtn">See all ${hist.length} entries</button>`;
    document.getElementById("seeAllHistoryBtn").addEventListener("click", () => openFullHistory(item));
  }
}

function openFullHistory(item){
  const cat = getCategory(item.category);
  const hist = (item.history || []).slice().reverse();

  document.getElementById("fullHistoryName").textContent = item.name;
  document.getElementById("fullHistoryCategory").textContent = cat.name;
  document.getElementById("fullHistoryIconWrap").className = `detail-icon-wrap cat-${cat.color}`;
  document.getElementById("fullHistoryIconWrap").innerHTML = iconSVG(item.icon);

  const totalCost = hist.reduce((sum, e) => sum + (e.cost || 0), 0);
  const costedEntries = hist.filter(e => e.cost);
  document.getElementById("fullHistoryTotal").textContent = totalCost ? `${state.currency} ${totalCost.toFixed(2)}` : "—";
  document.getElementById("fullHistoryCount").textContent = hist.length;

  const list = document.getElementById("fullHistoryList");
  if (!hist.length){
    list.innerHTML = `<p style="color:var(--text-3); font-size:13.5px; padding:8px 4px;">No history yet.</p>`;
  } else {
    list.innerHTML = hist.map((entry, i) => {
      const gap = i < hist.length - 1 ? daysBetween(hist[i+1].date, entry.date) + "d gap" : "";
      const d = new Date(entry.date);
      const label = d.toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric", year:"numeric" });
      const costLabel = entry.cost ? `${state.currency} ${Number(entry.cost).toFixed(2)}` : "—";
      return `<div class="history-row full">
        <span class="history-date">${label}</span>
        <span class="history-cost">${costLabel}</span>
        <span class="history-gap">${gap}</span>
      </div>`;
    }).join("");
  }

  openSheet("fullHistoryBackdrop");
}

// ============================================================
// CATEGORY MANAGEMENT
// ============================================================
function renderCategoryManageList(){
  const list = document.getElementById("categoryManageList");
  list.innerHTML = state.categories.map(cat => {
    const count = state.items.filter(i => i.category === cat.id).length;
    return `<div class="category-manage-row cat-${cat.color}" data-id="${cat.id}">
      <div class="cm-dot">${iconSVG(cat.icon)}</div>
      <span class="cm-name">${esc(cat.name)}</span>
      <span class="cm-count">${count} item${count===1?'':'s'}</span>
      <button class="cm-delete" data-action="delete">
        <svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20M9 7V5A2 2 0 0111 3H13A2 2 0 0115 5V7M18 7L17.3 19A2 2 0 0115.3 21H8.7A2 2 0 016.7 19L6 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`;
  }).join("");

  list.querySelectorAll(".category-manage-row").forEach(row => {
    row.addEventListener("click", (e) => {
      const id = row.dataset.id;
      if (e.target.closest("[data-action='delete']")){
        const count = state.items.filter(i => i.category === id).length;
        const msg = count > 0
          ? `Delete this category and its ${count} item${count===1?'':'s'}? This can't be undone.`
          : `Delete this category?`;
        showConfirm(msg, () => {
          state.categories = state.categories.filter(c => c.id !== id);
          state.items = state.items.filter(i => i.category !== id);
          renderCategoryManageList();
          render();
          saveToFirestore();
          showToast("Category deleted");
        });
      } else {
        openNewCategorySheet(id);
      }
    });
  });
}

function openNewCategorySheet(catId){
  editingCategoryId = catId || null;
  const cat = catId ? state.categories.find(c => c.id === catId) : null;
  document.getElementById("newCategoryTitle").textContent = cat ? "Edit category" : "New category";
  document.getElementById("newCategoryName").value = cat ? cat.name : "";
  renderColorGrid(cat ? cat.color : DEFAULT_COLORS[state.categories.length % DEFAULT_COLORS.length]);
  renderIconGrid("categoryIconGrid", cat ? cat.icon : ICON_KEYS[0], getSelectedColor());
  openSheet("newCategoryBackdrop");
}

function getSelectedColor(){
  const active = document.querySelector("#colorGrid .color-opt.active");
  return active ? active.dataset.color : "violet";
}

function renderColorGrid(activeColor){
  const grid = document.getElementById("colorGrid");
  grid.innerHTML = DEFAULT_COLORS.map(color => `
    <button class="color-opt ${color === activeColor ? 'active' : ''}" data-color="${color}" style="background:var(--_c-${color})"></button>
  `).join("");
  // inline color mapping since CSS vars need resolving
  const colorMap = { rose:"#FB7A9C", amber:"#FBBF54", lime:"#A3E635", teal:"#2DD4BF", sky:"#38BDF8", violet:"#A78BFA", fuchsia:"#E879F9", orange:"#FB923C" };
  grid.querySelectorAll(".color-opt").forEach(opt => {
    opt.style.background = colorMap[opt.dataset.color];
    opt.addEventListener("click", () => {
      grid.querySelectorAll(".color-opt").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      renderIconGrid("categoryIconGrid", getCategoryIconSelected(), opt.dataset.color);
    });
  });
}

function getCategoryIconSelected(){
  const active = document.querySelector("#categoryIconGrid .icon-opt.active");
  return active ? active.dataset.icon : ICON_KEYS[0];
}

function saveCategory(){
  const name = document.getElementById("newCategoryName").value.trim();
  if (!name){ shakeField("newCategoryName"); return; }
  const color = getSelectedColor();
  const icon = getCategoryIconSelected();

  if (editingCategoryId){
    const cat = state.categories.find(c => c.id === editingCategoryId);
    Object.assign(cat, { name, color, icon });
  } else {
    state.categories.push({ id: uid(), name, color, icon });
  }

  closeSheet("newCategoryBackdrop");
  renderCategoryManageList();
  render();
  saveToFirestore();
  showToast(editingCategoryId ? "Category updated" : "Category added");
}

// ============================================================
// INSIGHTS
// ============================================================
function renderInsights(){
  let monthlyTotal = 0;
  let overdueCount = 0, totalItems = state.items.length;
  const catSpend = {};

  state.items.forEach(item => {
    if (item.cost){
      let monthlyEquiv = 0;
      if (item.type === "interval" && item.intervalDays){
        monthlyEquiv = (item.cost / item.intervalDays) * 30;
      } else if (item.type === "fixed"){
        monthlyEquiv = item.renewDays > 0 ? (item.cost / item.renewDays) * 30 : 0;
      }
      monthlyTotal += monthlyEquiv;
      catSpend[item.category] = (catSpend[item.category] || 0) + monthlyEquiv;
    }
    if (getItemStatus(item).status === "overdue") overdueCount++;
  });

  document.getElementById("monthlySpend").textContent = `${state.currency} ${monthlyTotal.toFixed(0)}`;

  document.getElementById("insightGrid").innerHTML = `
    <div class="insight-box">
      <span class="insight-box-num">${totalItems}</span>
      <span class="insight-box-label">Total items tracked</span>
    </div>
    <div class="insight-box">
      <span class="insight-box-num" style="color:${overdueCount>0?'var(--danger)':'var(--ok)'}">${overdueCount}</span>
      <span class="insight-box-label">Currently overdue</span>
    </div>
  `;

  const catList = document.getElementById("insightCategoryList");
  const sortedCats = state.categories
    .map(cat => ({ cat, spend: catSpend[cat.id] || 0 }))
    .filter(x => x.spend > 0)
    .sort((a,b) => b.spend - a.spend);

  if (!sortedCats.length){
    catList.innerHTML = `<p style="color:var(--text-3); font-size:13.5px; padding:8px 4px;">No recurring costs tracked yet.</p>`;
  } else {
    catList.innerHTML = sortedCats.map(({cat, spend}) => `
      <div class="insight-cat-row cat-${cat.color}">
        <div class="cm-dot">${iconSVG(cat.icon)}</div>
        <span class="insight-cat-name">${esc(cat.name)}</span>
        <span class="insight-cat-cost">${state.currency} ${spend.toFixed(0)}/mo</span>
      </div>
    `).join("");
  }
}

// ============================================================
// CONFIRM DIALOG
// ============================================================
function showConfirm(message, onConfirm){
  document.getElementById("confirmMessage").textContent = message;
  confirmCallback = onConfirm;
  document.getElementById("confirmBackdrop").classList.add("open");
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(tab){
  document.querySelectorAll(".tab-item").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  const index = ["dashboard","categories","insights"].indexOf(tab);
  document.getElementById("tabIndicator").style.transform = `translateX(${index * 100}%)`;

  if (tab === "categories"){
    renderCategoryManageList();
    openSheet("categorySheetBackdrop");
    document.querySelector('.tab-item[data-tab="dashboard"]').classList.add("active");
    document.getElementById("tabIndicator").style.transform = `translateX(0%)`;
  } else if (tab === "insights"){
    renderInsights();
    openSheet("insightsBackdrop");
    document.querySelector('.tab-item[data-tab="dashboard"]').classList.add("active");
    document.getElementById("tabIndicator").style.transform = `translateX(0%)`;
  }
}

// Desktop sidebar equivalent of switchTab: Home shows the normal dashboard,
// Insights renders in-page (not as an overlay sheet) inside the main column.
function switchDesktopView(view){
  currentDesktopView = view;
  document.querySelectorAll(".sidebar-nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  const mainScroll = document.getElementById("mainScroll");
  const summaryStrip = document.getElementById("summaryStrip");
  const insightsBackdrop = document.getElementById("insightsBackdrop");

  if (view === "insights"){
    renderInsights();
    mainScroll.hidden = true;
    summaryStrip.hidden = true;
    insightsBackdrop.classList.add("desktop-page", "open");
  } else {
    mainScroll.hidden = false;
    summaryStrip.hidden = false;
    insightsBackdrop.classList.remove("desktop-page", "open");
  }
}

// ============================================================
// EVENT WIRING
// ============================================================
function wireEvents(){
  document.getElementById("fabAdd").addEventListener("click", () => openItemSheet(null));

  document.querySelectorAll(".tab-item").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Desktop sidebar
  document.getElementById("sidebarAddBtn").addEventListener("click", () => openItemSheet(null));
  document.getElementById("sidebarNewCategoryBtn").addEventListener("click", () => openNewCategorySheet(null));
  document.querySelectorAll(".sidebar-nav-item").forEach(navItem => {
    navItem.addEventListener("click", () => switchDesktopView(navItem.dataset.view));
  });

  document.querySelectorAll(".summary-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      activeFilter = activeFilter === filter ? null : filter;
      render();
    });
  });

  // Item sheet
  document.getElementById("saveItemBtn").addEventListener("click", saveItem);
  document.getElementById("deleteItemBtn").addEventListener("click", deleteItem);
  document.querySelectorAll("#typeSegment .segment").forEach(seg => {
    seg.addEventListener("click", () => setItemType(seg.dataset.type));
  });
  document.querySelectorAll("#unitSegment .segment").forEach(seg => {
    seg.addEventListener("click", () => setActiveSegment("unitSegment", seg.dataset.mult));
  });
  document.querySelectorAll("#renewSegment .segment").forEach(seg => {
    seg.addEventListener("click", () => setActiveSegment("renewSegment", seg.dataset.renew));
  });
  document.getElementById("neverDoneToggle").addEventListener("change", (e) => {
    setNeverDoneState(e.target.checked);
  });

  // Detail sheet
  document.getElementById("logFromDetailBtn").addEventListener("click", () => {
    const item = state.items.find(i => i.id === detailItemId);
    if (!item) return;
    completeLog(item, () => {
      playChime();
      vibrate(12);
      closeSheet("detailSheetBackdrop");
      render();
      saveToFirestore();
      showToast(`${item.name} logged`);
    });
  });
  document.getElementById("editItemBtn").addEventListener("click", () => {
    closeSheet("detailSheetBackdrop");
    setTimeout(() => openItemSheet(detailItemId), 250);
  });
  document.getElementById("historyTitleRow").addEventListener("click", () => {
    const item = state.items.find(i => i.id === detailItemId);
    if (item) openFullHistory(item);
  });

  // Category sheets
  document.getElementById("addCategoryBtn").addEventListener("click", () => openNewCategorySheet(null));
  document.getElementById("saveCategoryBtn").addEventListener("click", saveCategory);

  // Confirm dialog
  document.getElementById("confirmCancel").addEventListener("click", () => {
    document.getElementById("confirmBackdrop").classList.remove("open");
    confirmCallback = null;
  });
  document.getElementById("confirmOk").addEventListener("click", () => {
    document.getElementById("confirmBackdrop").classList.remove("open");
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  });

  // Swipe-to-dismiss for all sheets
  setupSwipeDown("itemSheetBackdrop", "itemSheet");
  setupSwipeDown("detailSheetBackdrop", "detailSheet");
  setupSwipeDown("categorySheetBackdrop", "categorySheet");
  setupSwipeDown("newCategoryBackdrop", "newCategorySheet");
  setupSwipeDown("insightsBackdrop", "insightsSheet");
  setupSwipeDown("fullHistoryBackdrop", "fullHistorySheet");

  // Backdrop click to close (generic)
  ["categorySheetBackdrop","newCategoryBackdrop","insightsBackdrop","fullHistoryBackdrop"].forEach(id => {
    document.getElementById(id).addEventListener("click", (e) => {
      if (e.target.id === id) closeSheet(id);
    });
  });
}

// ============================================================
// LIVE PROGRESS BAR TICK (re-render periodically so bars keep animating toward due date)
// ============================================================
setInterval(() => { if (state) render(); }, 60000);

// ============================================================
// SERVICE WORKER
// ============================================================
let swRegistration = null;
if ("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => { swRegistration = reg; })
      .catch(() => {});
  });
}

// ============================================================
// PULL TO REFRESH
// ============================================================
// Pulling down from the very top of the dashboard forces a real app
// refresh: it asks the service worker to check for a newer deploy, then
// hard-reloads the page so any updated code actually takes effect —
// this is the fix for "I shipped an update but the phone still shows
// the old version until I force-quit the app."
let pullRefreshInProgress = false;

function setupPullToRefresh(){
  const scroller = document.getElementById("mainScroll");
  const indicator = document.getElementById("pullRefreshIndicator");
  const spinner = indicator.querySelector(".pull-refresh-spinner");
  if (!scroller || !indicator) return;

  const PULL_THRESHOLD = 70;
  let startY = 0, pulling = false, decided = false, isPull = false;

  scroller.addEventListener("touchstart", (e) => {
    if (pullRefreshInProgress) return;
    if (scroller.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    pulling = true; decided = false; isPull = false;
  }, { passive:true });

  scroller.addEventListener("touchmove", (e) => {
    if (!pulling || pullRefreshInProgress) return;
    const dy = e.touches[0].clientY - startY;

    if (!decided){
      if (Math.abs(dy) > 6){
        isPull = dy > 0 && scroller.scrollTop <= 0;
        decided = true;
      } else {
        return;
      }
    }
    if (!isPull) return;

    const dist = Math.min(dy * 0.5, PULL_THRESHOLD * 1.4);
    indicator.style.transform = `translateY(${dist + 52}px)`;
    indicator.classList.add("visible");
    spinner.style.transform = `rotate(${dist * 3}deg)`;
  }, { passive:true });

  scroller.addEventListener("touchend", (e) => {
    if (!pulling) return;
    pulling = false;
    if (!isPull){ return; }

    const finalDy = (e.changedTouches[0].clientY - startY) * 0.5;
    if (finalDy >= PULL_THRESHOLD){
      triggerRefresh(indicator, spinner);
    } else {
      indicator.classList.remove("visible");
      indicator.style.transform = "";
    }
  });
}

function triggerRefresh(indicator, spinner){
  pullRefreshInProgress = true;
  indicator.style.transform = `translateY(${52 + 70}px)`;
  spinner.classList.add("spinning");
  vibrate(10);

  const finish = () => window.location.reload();

  const clearAndReload = () => {
    if ("caches" in window){
      caches.keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .catch(() => {})
        .finally(finish);
    } else {
      finish();
    }
  };

  if (swRegistration){
    if (swRegistration.active) swRegistration.active.postMessage("CHECK_FOR_UPDATE");
    swRegistration.update().catch(() => {}).finally(() => {
      setTimeout(clearAndReload, 400);
    });
  } else {
    setTimeout(clearAndReload, 400);
  }
}

// ============================================================
// INIT
// ============================================================
wireEvents();
setupPullToRefresh();
initData();
