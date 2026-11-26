const STORAGE_KEY = "br_marketplace_v3";
const LEAD_COST = 200;
const INITIAL_WALLET = 600;

const CATEGORY_META = {
  "Legal Services": {
    budgetHint: "Typical Nairobi budgets: KES 15,000 – KES 120,000",
    defaultBudget: 35000
  },
  "Auto Mechanic": {
    budgetHint: "Typical Nairobi budgets: KES 6,000 – KES 65,000",
    defaultBudget: 18000
  },
  "Accounting & Tax": {
    budgetHint: "Typical Nairobi budgets: KES 12,000 – KES 85,000",
    defaultBudget: 28000
  },
  "Plumbing & Electrical": {
    budgetHint: "Typical Nairobi budgets: KES 5,000 – KES 50,000",
    defaultBudget: 15000
  },
  "Business Consulting": {
    budgetHint: "Typical Nairobi budgets: KES 25,000 – KES 150,000",
    defaultBudget: 50000
  },
  "Construction & Renovations": {
    budgetHint: "Typical Nairobi budgets: KES 30,000 – KES 450,000",
    defaultBudget: 85000
  },
  "IT & Digital Systems": {
    budgetHint: "Typical Nairobi budgets: KES 15,000 – KES 120,000",
    defaultBudget: 35000
  },
  "Events & Logistics": {
    budgetHint: "Typical Nairobi budgets: KES 10,000 – KES 180,000",
    defaultBudget: 40000
  }
};

const INITIAL_LEADS = [
  {
    id: "lead-1",
    category: "Legal Services",
    title: "Commercial Lease Review & Land Conveyancing",
    location: "Westlands, Nairobi",
    budget: 45000,
    urgency: "This Week",
    clientName: "Grace Wambui",
    clientPhone: "+254 722 418 902",
    desc: "SME opening a second retail branch in Westlands; need an advocate to review a 5-year commercial lease and register documents.",
    postedAt: "12 mins ago",
    unlocked: false
  },
  {
    id: "lead-2",
    category: "Auto Mechanic",
    title: "Automatic Transmission Diagnostic & Service (Subaru Forester)",
    location: "Kiambu Road, Nairobi",
    budget: 22000,
    urgency: "Urgent (Within 24 hrs)",
    clientName: "Peter Njoroge",
    clientPhone: "+254 711 830 245",
    desc: "CVT gearbox slipping on incline. Looking for an experienced Subaru specialist garage along Kiambu Rd / Ridgeways.",
    postedAt: "28 mins ago",
    unlocked: false
  },
  {
    id: "lead-3",
    category: "Accounting & Tax",
    title: "Annual KRA Tax Filing, eTIMS Setup & Bookkeeping Cleanup",
    location: "Kilimani, Nairobi",
    budget: 30000,
    urgency: "This Week",
    clientName: "Faith Mutua",
    clientPhone: "+254 798 204 511",
    desc: "Growing logistics company (12 staff) needing CPA-K support for eTIMS onboarding, PAYE reconciliation, and audited accounts.",
    postedAt: "1 hr ago",
    unlocked: false
  },
  {
    id: "lead-4",
    category: "Plumbing & Electrical",
    title: "Solar Water Heater Installation & Pipe Re-routing",
    location: "Runda / Muthaiga North",
    budget: 16000,
    urgency: "Within 2 Weeks",
    clientName: "Samuel Kiprop",
    clientPhone: "+254 704 619 338",
    desc: "Need a certified technician to install a 300L pressurized solar water heater and replace two bathroom mixer valves.",
    postedAt: "2 hrs ago",
    unlocked: false
  },
  {
    id: "lead-5",
    category: "Business Consulting",
    title: "Sales Team Training & B2B Pipeline Playbook",
    location: "Upper Hill, Nairobi",
    budget: 65000,
    urgency: "Within 2 Weeks",
    clientName: "Beatrice Ochieng",
    clientPhone: "+254 733 512 870",
    desc: "FMCG distributor seeking a 2-day commercial workshop for 10 field sales reps to lift account retention and monthly targets.",
    postedAt: "3 hrs ago",
    unlocked: false
  },
  {
    id: "lead-6",
    category: "Construction & Renovations",
    title: "Office Partitioning, Gypsum Ceiling & Painting (1,400 sq ft)",
    location: "Parklands, Nairobi",
    budget: 140000,
    urgency: "Within 2 Weeks",
    clientName: "Daniel Kamau",
    clientPhone: "+254 720 664 189",
    desc: "New medical clinic fit-out requiring acoustic glass partitions, reception desk joinery, and fresh satin paintwork.",
    postedAt: "3 hrs ago",
    unlocked: false
  },
  {
    id: "lead-7",
    category: "IT & Digital Systems",
    title: "POS Integration with M-Pesa Till & Cloud Inventory Setup",
    location: "Lavington, Nairobi",
    budget: 38000,
    urgency: "This Week",
    clientName: "Mercy Njeri",
    clientPhone: "+254 715 390 421",
    desc: "Three-branch retail pharmacy seeking reliable POS configuration linked to Safaricom M-Pesa Till and daily stock alerts.",
    postedAt: "4 hrs ago",
    unlocked: false
  },
  {
    id: "lead-8",
    category: "Auto Mechanic",
    title: "Basic Brake Pad Replacement & Oil Change (Toyota Vitz)",
    location: "South B, Nairobi",
    budget: 6500,
    urgency: "Urgent (Within 24 hrs)",
    clientName: "Kevin Otieno",
    clientPhone: "+254 718 905 114",
    desc: "Routine 10,000 km oil service and front brake pads replacement. Parts budget included in KES 6,500 ceiling.",
    postedAt: "5 hrs ago",
    unlocked: false
  },
  {
    id: "lead-9",
    category: "Events & Logistics",
    title: "Corporate AGM Catering & Audio-Visual Setup (85 Guests)",
    location: "Karen, Nairobi",
    budget: 95000,
    urgency: "Within 2 Weeks",
    clientName: "Esther Nyambura",
    clientPhone: "+254 726 841 053",
    desc: "Full-day executive catering (morning tea, buffet lunch, afternoon refreshments) plus wireless PA microphones and projector.",
    postedAt: "6 hrs ago",
    unlocked: false
  }
];

function getDefaultTransactions(deposit = INITIAL_WALLET) {
  return [
    {
      id: "tx-init",
      type: "credit",
      amount: deposit,
      label: `M-Pesa Opening Deposit (${Math.floor(deposit / LEAD_COST)} leads)`,
      ref: "MPESA-SJK842Q1",
      time: "Account Activated"
    }
  ];
}

function getDefaultState() {
  return {
    auth: {
      isLoggedIn: false,
      identifier: ""
    },
    wallet: INITIAL_WALLET,
    leads: JSON.parse(JSON.stringify(INITIAL_LEADS)),
    transactions: getDefaultTransactions(INITIAL_WALLET),
    providerProfile: {
      businessName: "Verified Nairobi Provider",
      email: "",
      vertical: "All",
      minBudget: 10000,
      mpesaPhone: "+254 7XX XXX XXX"
    },
    registeredAccount: null
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.leads)) return getDefaultState();
    return {
      ...getDefaultState(),
      ...parsed,
      auth: {
        ...getDefaultState().auth,
        ...(parsed.auth || {})
      },
      providerProfile: {
        ...getDefaultState().providerProfile,
        ...(parsed.providerProfile || {})
      }
    };
  } catch (e) {
    return getDefaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Ignore storage quota errors
  }
}

function formatKES(n) {
  return "KES " + Number(n || 0).toLocaleString("en-KE");
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function makeRef(prefix) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

function showToast(msg) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__brToast);
  window.__brToast = setTimeout(() => toastEl.classList.remove("show"), 3600);
}

/* Global Mobile Navigation & Auth-Aware Navbar CTA */
function initNavigation(state) {
  const toggleBtn = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href="provider-portal.html"].btn-gold').forEach((btn) => {
    if (state.auth && state.auth.isLoggedIn) {
      btn.innerHTML = `<span class="auth-status-dot" aria-hidden="true"></span><span>Provider Dashboard</span>`;
    } else if (btn.textContent.trim() === "Provider Portal" || btn.textContent.trim() === "Provider Dashboard") {
      btn.textContent = "Provider Login";
    }
  });
}

/* Update Category Live Counts on Home & Services Pages */
function hydrateCategoryCounts(state) {
  document.querySelectorAll("[data-cat-count]").forEach((el) => {
    const cat = el.dataset.catCount;
    const count = state.leads.filter((l) => l.category === cat).length;
    el.textContent = `${count} open ${count === 1 ? "request" : "requests"}`;
  });
}

/* Home Page: Live Marketplace Pulse Preview (Anonymized Public View) */
function initHomePulse(state) {
  const pulseEl = document.getElementById("homeLeadsPulse");
  if (!pulseEl) return;

  const isLoggedIn = Boolean(state.auth && state.auth.isLoggedIn);
  const ctaLabel = isLoggedIn ? "View in Dashboard" : "Provider Login to Unlock";
  const recent = state.leads.slice(0, 3);

  pulseEl.innerHTML = recent
    .map(
      (l) => `
      <article class="lead-card matched">
        <div class="lead-head">
          <span class="lead-cat">${escapeHtml(l.category)}</span>
          <span class="lead-budget">${formatKES(l.budget)}</span>
        </div>
        <h4>${escapeHtml(l.title)}</h4>
        <div class="lead-meta">${escapeHtml(l.location)} · ${escapeHtml(l.urgency)} · ${escapeHtml(l.postedAt)}</div>
        <p style="font-size:0.85rem;margin:0 0 0.9rem;color:var(--br-slate);">${escapeHtml(l.desc)}</p>
        <div class="lead-foot">
          <span style="font-size:0.78rem;color:var(--br-slate);">Verified provider account required</span>
          <a href="provider-portal.html?category=${encodeURIComponent(l.category)}" class="btn btn-primary btn-sm">${ctaLabel}</a>
        </div>
      </article>`
    )
    .join("");
}

/* Services Directory: Live Search & Filter */
function initServicesPage() {
  const searchInput = document.getElementById("serviceSearch");
  const cards = Array.from(document.querySelectorAll(".service-cat-item"));
  const filterBtns = Array.from(document.querySelectorAll(".service-group-btn"));
  const emptyNote = document.getElementById("serviceEmptyNote");
  if (!cards.length) return;

  let activeGroup = "all";

  function applyFilter() {
    const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const group = card.dataset.group || "";
      const text = card.textContent.toLowerCase();
      const matchesGroup = activeGroup === "all" || group === activeGroup;
      const matchesQuery = !q || text.includes(q);
      const show = matchesGroup && matchesQuery;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (emptyNote) {
      emptyNote.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) searchInput.addEventListener("input", applyFilter);
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGroup = btn.dataset.group;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      applyFilter();
    });
  });
}

/* Post a Job Page (Demand Side — 100% Client-Facing) */
function initPostJobPage(state) {
  const form = document.getElementById("postJobForm");
  if (!form) return;

  const jobCategoryInput = document.getElementById("jobCategory");
  const jobBudgetInput = document.getElementById("jobBudget");
  const consumerMatchPreview = document.getElementById("consumerMatchPreview");
  const budgetHintEl = document.getElementById("categoryBudgetHint");
  const confirmBox = document.getElementById("jobConfirmationBox");

  const params = new URLSearchParams(window.location.search);
  const preCat = params.get("category");
  if (preCat && jobCategoryInput) {
    const matchOption = Array.from(jobCategoryInput.options).find(
      (opt) => opt.value.toLowerCase() === preCat.toLowerCase()
    );
    if (matchOption) {
      jobCategoryInput.value = matchOption.value;
      if (CATEGORY_META[matchOption.value] && jobBudgetInput) {
        jobBudgetInput.value = CATEGORY_META[matchOption.value].defaultBudget;
      }
    }
  }

  function updatePreview() {
    const cat = jobCategoryInput.value;
    const bud = Number(jobBudgetInput.value) || 0;
    const meta = CATEGORY_META[cat];
    if (budgetHintEl && meta) budgetHintEl.textContent = meta.budgetHint;
    if (consumerMatchPreview) {
      consumerMatchPreview.innerHTML = `<strong>Live Match Estimate:</strong> Posting a <strong>${formatKES(bud)}</strong> request in <strong>${escapeHtml(cat)}</strong> notifies vetted Kenyan providers whose minimum job price floor is at or below ${formatKES(bud)}.`;
    }
  }

  jobCategoryInput.addEventListener("change", updatePreview);
  jobBudgetInput.addEventListener("input", updatePreview);
  updatePreview();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const refId = makeRef("BR-JOB");
    const newLead = {
      id: "lead-" + Date.now(),
      ref: refId,
      category: jobCategoryInput.value,
      title: document.getElementById("jobTitle").value.trim(),
      location: document.getElementById("jobLocation").value.trim(),
      budget: Number(jobBudgetInput.value),
      urgency: document.getElementById("jobUrgency").value,
      clientName: document.getElementById("clientName").value.trim(),
      clientPhone: document.getElementById("clientPhone").value.trim(),
      desc: document.getElementById("jobDesc").value.trim(),
      postedAt: "Just now",
      unlocked: false
    };

    state.leads.unshift(newLead);
    saveState(state);

    if (confirmBox) {
      confirmBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.65rem;">
          <strong style="font-family:var(--font-heading);color:#14532D;font-size:1.05rem;">✓ Service Request Published</strong>
          <span class="live-pill">Ref: ${refId}</span>
        </div>
        <p style="margin:0 0 0.9rem;font-size:0.88rem;color:#14532D;">
          Thank you, <strong>${escapeHtml(newLead.clientName)}</strong>. Your request <strong>"${escapeHtml(newLead.title)}"</strong> (${formatKES(newLead.budget)} · ${escapeHtml(newLead.location)}) has been dispatched to vetted <strong>${escapeHtml(newLead.category)}</strong> providers matching your budget. Your phone number stays masked until a verified provider unlocks your lead.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
          <button type="button" class="btn btn-primary btn-sm" id="postAnotherBtn">Post Another Request</button>
          <a href="services.html" class="btn btn-outline btn-sm">Browse Service Categories</a>
        </div>
      `;
      confirmBox.classList.add("show");
      confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });

      const anotherBtn = document.getElementById("postAnotherBtn");
      if (anotherBtn) {
        anotherBtn.addEventListener("click", () => {
          confirmBox.classList.remove("show");
          form.reset();
          jobBudgetInput.value = 25000;
          updatePreview();
        });
      }
    }

    form.reset();
    jobBudgetInput.value = 25000;
    updatePreview();
    showToast(`Service request published! Reference ${refId}.`);
  });
}

/* Provider Portal Page — Auth Gate + Protected Supply Workspace */
function initProviderPortal(state) {
  const authGateEl = document.getElementById("providerAuthGate");
  const workspaceEl = document.getElementById("providerWorkspace");
  if (!authGateEl || !workspaceEl) return;

  const heroGateCard = document.getElementById("providerHeroGateCard");
  const heroAccountCard = document.getElementById("providerHeroAccountCard");
  const heroHeadingEl = document.getElementById("providerHeroHeading");
  const heroLeadEl = document.getElementById("providerHeroLead");
  const gateOpenCountEl = document.getElementById("gateOpenLeadsCount");
  const gateBudgetRangeEl = document.getElementById("gateBudgetRange");

  const walletBalanceEl = document.getElementById("walletBalance");
  const leadsRemainingEl = document.getElementById("leadsRemainingText");
  const providerCatFilter = document.getElementById("providerCatFilter");
  const minBudgetRange = document.getElementById("minBudgetRange");
  const minBudgetLabel = document.getElementById("minBudgetLabel");
  const matchedCountLabel = document.getElementById("matchedCountLabel");
  const leadsListEl = document.getElementById("leadsList");
  const ledgerListEl = document.getElementById("walletLedger");
  const leadSearchInput = document.getElementById("leadSearchInput");
  const statusTabs = Array.from(document.querySelectorAll(".lead-status-tab"));
  const providerBadgeEl = document.getElementById("providerBusinessLabel");
  const providerMetaEl = document.getElementById("providerAccountMeta");

  const authTabs = Array.from(document.querySelectorAll(".auth-tab"));
  const loginPane = document.getElementById("pane-login");
  const signupPane = document.getElementById("pane-signup");
  const loginForm = document.getElementById("providerLoginForm");
  const signupForm = document.getElementById("providerSignupForm");
  const signupDepositSelect = document.getElementById("signupDeposit");
  const signupVerticalSelect = document.getElementById("signupVertical");

  let activeCat = state.providerProfile.vertical || "All";
  let minBudget = Number(state.providerProfile.minBudget) || 10000;
  let activeStatus = "all";
  let searchQuery = "";

  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get("category");
  const urlMode = params.get("mode");
  const urlTopup = Number(params.get("topup"));

  if (urlCat) {
    const matchOption = Array.from(providerCatFilter.options).find(
      (opt) => opt.value.toLowerCase() === urlCat.toLowerCase()
    );
    if (matchOption) {
      activeCat = matchOption.value;
      if (signupVerticalSelect) signupVerticalSelect.value = matchOption.value;
    }
  }

  if (urlTopup && signupDepositSelect) {
    const opt = Array.from(signupDepositSelect.options).find((o) => Number(o.value) === urlTopup);
    if (opt) signupDepositSelect.value = opt.value;
  }

  function switchAuthTab(tabName) {
    authTabs.forEach((t) => {
      const isMatch = t.dataset.authTab === tabName;
      t.classList.toggle("active", isMatch);
      t.setAttribute("aria-selected", String(isMatch));
    });
    if (loginPane) loginPane.classList.toggle("active", tabName === "login");
    if (signupPane) signupPane.classList.toggle("active", tabName === "signup");
  }

  authTabs.forEach((t) => t.addEventListener("click", () => switchAuthTab(t.dataset.authTab)));
  document.querySelectorAll("[data-switch-auth]").forEach((btn) => {
    btn.addEventListener("click", () => switchAuthTab(btn.dataset.switchAuth));
  });

  if (urlMode === "signup" || urlTopup >= 600) {
    switchAuthTab("signup");
  }

  function renderGateStats() {
    if (gateOpenCountEl) {
      gateOpenCountEl.textContent = `${state.leads.length} Active Requests`;
    }
    if (gateBudgetRangeEl && state.leads.length) {
      const budgets = state.leads.map((l) => l.budget);
      const minB = Math.min(...budgets);
      const maxB = Math.max(...budgets);
      gateBudgetRangeEl.textContent = `KES ${(minB / 1000).toFixed(0)}k – KES ${(maxB / 1000).toFixed(0)}k`;
    }
  }

  function renderWallet() {
    walletBalanceEl.textContent = formatKES(state.wallet);
    const count = Math.floor(state.wallet / LEAD_COST);
    leadsRemainingEl.textContent = `${count} qualified lead${count === 1 ? "" : "s"} available (KES ${LEAD_COST} / lead)`;

    if (ledgerListEl) {
      ledgerListEl.innerHTML = state.transactions
        .slice(0, 8)
        .map(
          (tx) => `
          <div class="ledger-item">
            <div>
              <strong style="display:block;color:var(--br-blue-deep);">${escapeHtml(tx.label)}</strong>
              <span style="font-size:0.74rem;color:var(--br-slate);">${escapeHtml(tx.ref)} · ${escapeHtml(tx.time)}</span>
            </div>
            <span class="ledger-amt ${tx.type}">${tx.type === "credit" ? "+" : "−"}${formatKES(tx.amount)}</span>
          </div>`
        )
        .join("");
    }
  }

  function renderLeads() {
    minBudgetLabel.textContent = formatKES(minBudget);

    const byCatAndSearch = state.leads.filter((l) => {
      const catOk = activeCat === "All" || l.category === activeCat;
      const q = searchQuery.trim().toLowerCase();
      const searchOk =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.desc.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    const matchedCount = byCatAndSearch.filter((l) => l.budget >= minBudget).length;
    matchedCountLabel.textContent = `${matchedCount} of ${byCatAndSearch.length} lead${byCatAndSearch.length === 1 ? "" : "s"}`;

    let visible = byCatAndSearch;
    if (activeStatus === "matched") {
      visible = byCatAndSearch.filter((l) => l.budget >= minBudget && !l.unlocked);
    } else if (activeStatus === "unlocked") {
      visible = byCatAndSearch.filter((l) => l.unlocked);
    }

    if (!visible.length) {
      leadsListEl.innerHTML = `
        <div class="panel-card" style="text-align:center;">
          <p style="margin:0 0 0.85rem;color:var(--br-slate);">No client leads match your current vertical or price-floor filters.</p>
          <button type="button" class="btn btn-outline btn-sm" id="clearLeadFiltersBtn">Show All Service Categories</button>
        </div>`;
      const clearBtn = document.getElementById("clearLeadFiltersBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          activeCat = "All";
          activeStatus = "all";
          searchQuery = "";
          providerCatFilter.value = "All";
          if (leadSearchInput) leadSearchInput.value = "";
          statusTabs.forEach((t) => t.classList.toggle("active", t.dataset.status === "all"));
          renderLeads();
        });
      }
      return;
    }

    leadsListEl.innerHTML = visible
      .map((l) => {
        const fitsPrice = l.budget >= minBudget;
        const cardClass = l.unlocked
          ? "lead-card unlocked"
          : fitsPrice
          ? "lead-card matched"
          : "lead-card filtered-out";

        const waDigits = String(l.clientPhone || "").replace(/[^0-9]/g, "");
        const waMsg = encodeURIComponent(
          `Hello ${l.clientName}, I unlocked your BonnyRigg request "${l.title}" (${formatKES(l.budget)}) and would like to share a quote.`
        );

        let actionArea = "";
        if (l.unlocked) {
          actionArea = `
            <div class="unlocked-contact">
              <div>
                <strong>Lead Unlocked (KES 200 deducted)</strong><br>
                Client: <strong>${escapeHtml(l.clientName)}</strong> · Phone: <strong>${escapeHtml(l.clientPhone)}</strong>
              </div>
              <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                <a href="tel:${escapeHtml(l.clientPhone)}" class="btn btn-primary btn-sm">Call Client</a>
                <a href="https://wa.me/${waDigits}?text=${waMsg}" target="_blank" rel="noopener" class="btn btn-mpesa btn-sm">WhatsApp</a>
              </div>
            </div>`;
        } else if (!fitsPrice) {
          actionArea = `
            <span style="font-size:0.8rem;color:var(--br-slate);">Below your ${formatKES(minBudget)} minimum budget floor</span>
            <button type="button" class="btn btn-outline btn-sm lower-filter-btn" data-budget="${l.budget}">Lower Floor to View</button>`;
        } else {
          actionArea = `
            <span style="font-size:0.8rem;color:var(--br-green);font-weight:600;">&#10003; Matches your price band</span>
            <button type="button" class="btn btn-primary btn-sm unlock-lead-btn" data-id="${l.id}">Unlock Contact (KES ${LEAD_COST})</button>`;
        }

        return `
        <article class="${cardClass}">
          <div class="lead-head">
            <span class="lead-cat">${escapeHtml(l.category)}</span>
            <span class="lead-budget">Client Budget: ${formatKES(l.budget)}</span>
          </div>
          <h4>${escapeHtml(l.title)}</h4>
          <div class="lead-meta">${escapeHtml(l.location)} · ${escapeHtml(l.urgency)} · Posted ${escapeHtml(l.postedAt)}</div>
          <p style="font-size:0.86rem;margin:0 0 0.9rem;color:var(--br-ink);">${escapeHtml(l.desc)}</p>
          <div class="lead-foot">${actionArea}</div>
        </article>`;
      })
      .join("");

    leadsListEl.querySelectorAll(".unlock-lead-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lead = state.leads.find((x) => x.id === btn.dataset.id);
        if (!lead || lead.unlocked) return;
        if (state.wallet < LEAD_COST) {
          showToast("Insufficient M-Pesa wallet balance. Top up at least KES 600 to unlock leads.");
          return;
        }
        state.wallet -= LEAD_COST;
        lead.unlocked = true;
        state.transactions.unshift({
          id: "tx-" + Date.now(),
          type: "debit",
          amount: LEAD_COST,
          label: `Lead Unlock: ${lead.title.slice(0, 32)}${lead.title.length > 32 ? "…" : ""}`,
          ref: makeRef("LEAD"),
          time: "Just now"
        });
        saveState(state);
        renderWallet();
        renderLeads();
        showToast(`Lead unlocked! KES 200 deducted. Contact revealed for ${lead.clientName}.`);
      });
    });

    leadsListEl.querySelectorAll(".lower-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const b = Math.max(2000, Math.floor(Number(btn.dataset.budget) / 2000) * 2000);
        minBudget = b;
        minBudgetRange.value = b;
        state.providerProfile.minBudget = b;
        saveState(state);
        renderLeads();
        showToast(`Minimum job price floor adjusted to ${formatKES(b)}.`);
      });
    });
  }

  function syncAuthView() {
    const loggedIn = Boolean(state.auth && state.auth.isLoggedIn);

    authGateEl.classList.toggle("hidden-view", loggedIn);
    workspaceEl.classList.toggle("hidden-view", !loggedIn);

    if (heroGateCard) heroGateCard.classList.toggle("hidden-view", loggedIn);
    if (heroAccountCard) heroAccountCard.classList.toggle("hidden-view", !loggedIn);

    if (loggedIn) {
      if (heroHeadingEl) heroHeadingEl.innerHTML = `Provider Workspace &amp; <span>M-Pesa Lead Wallet</span>`;
      if (heroLeadEl) {
        heroLeadEl.textContent =
          "Manage your M-Pesa wallet, tune your minimum accepted job budget floor, and unlock verified client contacts across Kenya at KES 200 per lead.";
      }
      if (providerBadgeEl) providerBadgeEl.textContent = state.providerProfile.businessName;
      if (providerMetaEl) {
        providerMetaEl.textContent = `${state.providerProfile.mpesaPhone} · Floor: ${formatKES(minBudget)}`;
      }

      if (urlTopup >= 600 && !sessionStorage.getItem("br_topup_applied_" + urlTopup)) {
        state.wallet += urlTopup;
        state.transactions.unshift({
          id: "tx-" + Date.now(),
          type: "credit",
          amount: urlTopup,
          label: `M-Pesa Bundle Top-Up (${Math.floor(urlTopup / LEAD_COST)} leads)`,
          ref: makeRef("MPESA"),
          time: "Just now"
        });
        saveState(state);
        sessionStorage.setItem("br_topup_applied_" + urlTopup, "1");
        showToast(`M-Pesa top-up applied: +${formatKES(urlTopup)} credited.`);
      }

      providerCatFilter.value = activeCat;
      minBudgetRange.value = minBudget;
      renderWallet();
      renderLeads();
    } else {
      if (heroHeadingEl) heroHeadingEl.innerHTML = `Service Provider <span>Sign In &amp; Registration</span>`;
      if (heroLeadEl) {
        heroLeadEl.textContent =
          "Sign in to your verified provider account—or create one with a KES 600 M-Pesa starter wallet—to view live client leads matched to your exact price floor.";
      }
      renderGateStats();
    }

    initNavigation(state);
  }

  /* Handle Sign In Form */
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const identifier = document.getElementById("loginIdentifier").value.trim();
      const password = document.getElementById("loginPassword").value;
      if (!identifier || !password) return;

      if (state.registeredAccount) {
        state.providerProfile = { ...state.registeredAccount };
      } else {
        const inferredName = identifier.includes("@")
          ? identifier.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " Services"
          : "Verified Nairobi Provider";
        state.providerProfile = {
          ...state.providerProfile,
          businessName: state.providerProfile.businessName === "Verified Nairobi Provider" ? inferredName : state.providerProfile.businessName,
          email: identifier.includes("@") ? identifier : state.providerProfile.email,
          mpesaPhone: identifier.includes("@") ? state.providerProfile.mpesaPhone : identifier
        };
      }

      state.auth = { isLoggedIn: true, identifier };
      activeCat = urlCat || state.providerProfile.vertical || "All";
      minBudget = Number(state.providerProfile.minBudget) || 10000;
      saveState(state);
      loginForm.reset();
      syncAuthView();
      showToast(`Welcome back, ${state.providerProfile.businessName}.`);
    });
  }

  /* Handle Create Provider Account (Sign Up) Form */
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const bizName = document.getElementById("signupBusinessName").value.trim();
      const vertical = document.getElementById("signupVertical").value;
      const phone = document.getElementById("signupMpesaPhone").value.trim();
      const floor = Math.max(2000, Math.min(50000, Number(document.getElementById("signupMinBudget").value) || 10000));
      const email = document.getElementById("signupEmail").value.trim();
      const openingDeposit = Number(signupDepositSelect ? signupDepositSelect.value : INITIAL_WALLET) || INITIAL_WALLET;

      const profile = {
        businessName: bizName,
        email,
        vertical,
        minBudget: floor,
        mpesaPhone: phone
      };

      state.providerProfile = profile;
      state.registeredAccount = { ...profile };
      state.wallet = openingDeposit;
      state.transactions = getDefaultTransactions(openingDeposit);
      state.auth = { isLoggedIn: true, identifier: email || phone };
      activeCat = vertical;
      minBudget = floor;

      if (urlTopup >= 600) {
        sessionStorage.setItem("br_topup_applied_" + urlTopup, "1");
      }

      saveState(state);
      signupForm.reset();
      syncAuthView();
      showToast(`Account created for ${bizName}! ${formatKES(openingDeposit)} M-Pesa wallet activated.`);
    });
  }

  /* Handle Sign Out */
  const signOutBtn = document.getElementById("providerSignOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      state.auth = { isLoggedIn: false, identifier: "" };
      saveState(state);
      switchAuthTab("login");
      syncAuthView();
      showToast("You have signed out of the Provider Portal.");
    });
  }

  /* Protected Workspace Controls */
  providerCatFilter.addEventListener("change", () => {
    activeCat = providerCatFilter.value;
    state.providerProfile.vertical = activeCat;
    saveState(state);
    renderLeads();
  });

  minBudgetRange.addEventListener("input", () => {
    minBudget = Number(minBudgetRange.value);
    state.providerProfile.minBudget = minBudget;
    if (providerMetaEl) {
      providerMetaEl.textContent = `${state.providerProfile.mpesaPhone} · Floor: ${formatKES(minBudget)}`;
    }
    saveState(state);
    renderLeads();
  });

  if (leadSearchInput) {
    leadSearchInput.addEventListener("input", () => {
      searchQuery = leadSearchInput.value;
      renderLeads();
    });
  }

  statusTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeStatus = tab.dataset.status;
      statusTabs.forEach((t) => t.classList.toggle("active", t === tab));
      renderLeads();
    });
  });

  document.querySelectorAll(".topup-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amt = Number(btn.dataset.amount);
      state.wallet += amt;
      state.transactions.unshift({
        id: "tx-" + Date.now(),
        type: "credit",
        amount: amt,
        label: `M-Pesa STK Push Top-Up`,
        ref: makeRef("MPESA"),
        time: "Just now"
      });
      saveState(state);
      renderWallet();
      showToast(`M-Pesa STK Push confirmed: +${formatKES(amt)} credited to your wallet!`);
    });
  });

  /* Provider Profile & Preferences Modal (Protected) */
  const openModalBtn = document.getElementById("openProviderModalBtn");
  const modalBackdrop = document.getElementById("providerModal");
  const closeModalBtn = document.getElementById("closeProviderModalBtn");
  const profileForm = document.getElementById("providerProfileForm");

  if (openModalBtn && modalBackdrop) {
    openModalBtn.addEventListener("click", () => {
      document.getElementById("profBusinessName").value =
        state.providerProfile.businessName === "Verified Nairobi Provider"
          ? ""
          : state.providerProfile.businessName;
      document.getElementById("profVertical").value = activeCat;
      document.getElementById("profMinBudget").value = minBudget;
      document.getElementById("profMpesaPhone").value =
        state.providerProfile.mpesaPhone === "+254 7XX XXX XXX"
          ? ""
          : state.providerProfile.mpesaPhone;
      modalBackdrop.classList.add("open");
    });

    const closeModal = () => modalBackdrop.classList.remove("open");
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const biz = document.getElementById("profBusinessName").value.trim() || state.providerProfile.businessName;
        const vert = document.getElementById("profVertical").value;
        const floor = Math.max(2000, Math.min(50000, Number(document.getElementById("profMinBudget").value) || 10000));
        const phone = document.getElementById("profMpesaPhone").value.trim() || state.providerProfile.mpesaPhone;

        state.providerProfile = {
          ...state.providerProfile,
          businessName: biz,
          vertical: vert,
          minBudget: floor,
          mpesaPhone: phone
        };
        if (state.registeredAccount) {
          state.registeredAccount = { ...state.providerProfile };
        }
        activeCat = vert;
        minBudget = floor;
        providerCatFilter.value = vert;
        minBudgetRange.value = floor;
        if (providerBadgeEl) providerBadgeEl.textContent = biz;
        if (providerMetaEl) providerMetaEl.textContent = `${phone} · Floor: ${formatKES(floor)}`;

        saveState(state);
        renderLeads();
        closeModal();
        showToast(`Provider profile updated for ${biz}.`);
      });
    }
  }

  syncAuthView();
}

/* Pricing Page: Interactive Provider ROI Calculator */
function initRoiCalculator() {
  const avgJobInput = document.getElementById("roiJobValue");
  const leadsCountInput = document.getElementById("roiLeadsCount");
  const closeRateInput = document.getElementById("roiCloseRate");
  if (!avgJobInput || !leadsCountInput || !closeRateInput) return;

  const jobValueLabel = document.getElementById("roiJobValueLabel");
  const leadsCountLabel = document.getElementById("roiLeadsCountLabel");
  const closeRateLabel = document.getElementById("roiCloseRateLabel");

  const spendOut = document.getElementById("roiSpendOut");
  const closedOut = document.getElementById("roiClosedOut");
  const revenueOut = document.getElementById("roiRevenueOut");
  const multipleOut = document.getElementById("roiMultipleOut");

  function compute() {
    const avgJob = Number(avgJobInput.value) || 25000;
    const leads = Number(leadsCountInput.value) || 10;
    const closePct = Number(closeRateInput.value) || 30;

    const spend = leads * LEAD_COST;
    const closedJobs = Math.max(1, Math.round((leads * closePct) / 100));
    const revenue = closedJobs * avgJob;
    const multiple = spend > 0 ? (revenue / spend).toFixed(1) : "0.0";

    jobValueLabel.textContent = formatKES(avgJob);
    leadsCountLabel.textContent = `${leads} leads / month`;
    closeRateLabel.textContent = `${closePct}%`;

    spendOut.textContent = formatKES(spend);
    closedOut.textContent = `${closedJobs} ${closedJobs === 1 ? "job" : "jobs"}`;
    revenueOut.textContent = formatKES(revenue);
    multipleOut.textContent = `${multiple}× Return`;
  }

  avgJobInput.addEventListener("input", compute);
  leadsCountInput.addEventListener("input", compute);
  closeRateInput.addEventListener("input", compute);
  compute();
}

/* Contact Page Inquiry Form */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const confirmBox = document.getElementById("contactConfirmBox");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ref = makeRef("BR-MSG");
    const name = document.getElementById("contactName").value.trim();
    const topic = document.getElementById("contactTopic").value;

    if (confirmBox) {
      confirmBox.innerHTML = `
        <strong style="display:block;font-family:var(--font-heading);color:#14532D;margin-bottom:0.35rem;">✓ Message Received — Ref ${ref}</strong>
        <p style="margin:0;font-size:0.88rem;color:#14532D;">
          Thank you, <strong>${escapeHtml(name)}</strong>. Our Nairobi support desk has received your <strong>${escapeHtml(topic)}</strong> inquiry and will respond within 1 business day.
        </p>
      `;
      confirmBox.classList.add("show");
    }

    form.reset();
    showToast(`Inquiry sent! Reference ${ref}.`);
  });
}

/* Bootstrap on DOM Ready */
document.addEventListener("DOMContentLoaded", () => {
  const state = loadState();
  initNavigation(state);
  hydrateCategoryCounts(state);
  initHomePulse(state);
  initServicesPage();
  initPostJobPage(state);
  initProviderPortal(state);
  initRoiCalculator();
  initContactForm();
});
