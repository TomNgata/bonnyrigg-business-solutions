const STORAGE_KEY = "br_marketplace_v2";
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

const INITIAL_TRANSACTIONS = [
  {
    id: "tx-init",
    type: "credit",
    amount: 600,
    label: "M-Pesa Starter Wallet Deposit",
    ref: "MPESA-SJK842Q1",
    time: "Account Activated"
  }
];

function getDefaultState() {
  return {
    wallet: INITIAL_WALLET,
    leads: JSON.parse(JSON.stringify(INITIAL_LEADS)),
    transactions: JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS)),
    providerProfile: {
      businessName: "Verified Nairobi Provider",
      vertical: "All",
      minBudget: 10000,
      mpesaPhone: "+254 7XX XXX XXX"
    }
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
    // Ignore storage quota errors in restricted browsing modes
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

/* Global Mobile Navigation */
function initNavigation() {
  const toggleBtn = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!toggleBtn || !mobileMenu) return;

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

/* Update Category Live Counts on Home & Services Pages */
function hydrateCategoryCounts(state) {
  document.querySelectorAll("[data-cat-count]").forEach((el) => {
    const cat = el.dataset.catCount;
    const count = state.leads.filter((l) => l.category === cat).length;
    el.textContent = `${count} open ${count === 1 ? "request" : "requests"}`;
  });
}

/* Home Page: Live Marketplace Pulse Preview */
function initHomePulse(state) {
  const pulseEl = document.getElementById("homeLeadsPulse");
  if (!pulseEl) return;

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
          <span style="font-size:0.78rem;color:var(--br-slate);">Contact masked until unlocked</span>
          <a href="provider-portal.html?category=${encodeURIComponent(l.category)}" class="btn btn-primary btn-sm">Unlock in Portal (KES 200)</a>
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

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGroup = btn.dataset.group;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      applyFilter();
    });
  });
}

/* Post a Job Page (Demand Side) */
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
    if (budgetHintEl && meta) {
      budgetHintEl.textContent = meta.budgetHint;
    }
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
          Your request <strong>"${escapeHtml(newLead.title)}"</strong> (${formatKES(newLead.budget)} · ${escapeHtml(newLead.location)}) is now live and matched to vetted <strong>${escapeHtml(newLead.category)}</strong> providers. Your phone number stays masked until a qualified provider unlocks your lead.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
          <a href="provider-portal.html?category=${encodeURIComponent(newLead.category)}" class="btn btn-primary btn-sm">View in Provider Lead Queue</a>
          <button type="button" class="btn btn-outline btn-sm" id="postAnotherBtn">Post Another Request</button>
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
    showToast(`Job posted! Reference ${refId} is now live in the Provider Lead Queue.`);
  });
}

/* Provider Portal Page (Supply Side & M-Pesa Wallet) */
function initProviderPortal(state) {
  const leadsListEl = document.getElementById("leadsList");
  if (!leadsListEl) return;

  const walletBalanceEl = document.getElementById("walletBalance");
  const leadsRemainingEl = document.getElementById("leadsRemainingText");
  const providerCatFilter = document.getElementById("providerCatFilter");
  const minBudgetRange = document.getElementById("minBudgetRange");
  const minBudgetLabel = document.getElementById("minBudgetLabel");
  const matchedCountLabel = document.getElementById("matchedCountLabel");
  const ledgerListEl = document.getElementById("walletLedger");
  const leadSearchInput = document.getElementById("leadSearchInput");
  const statusTabs = Array.from(document.querySelectorAll(".lead-status-tab"));
  const providerBadgeEl = document.getElementById("providerBusinessLabel");

  let activeCat = state.providerProfile.vertical || "All";
  let minBudget = Number(state.providerProfile.minBudget) || 10000;
  let activeStatus = "all";
  let searchQuery = "";

  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get("category");
  if (urlCat && providerCatFilter) {
    const matchOption = Array.from(providerCatFilter.options).find(
      (opt) => opt.value.toLowerCase() === urlCat.toLowerCase()
    );
    if (matchOption) {
      activeCat = matchOption.value;
    }
  }

  const urlTopup = Number(params.get("topup"));
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
    setTimeout(() => showToast(`M-Pesa top-up ready: +${formatKES(urlTopup)} credited to your wallet.`), 300);
  }

  if (providerCatFilter) providerCatFilter.value = activeCat;
  if (minBudgetRange) minBudgetRange.value = minBudget;
  if (providerBadgeEl) providerBadgeEl.textContent = state.providerProfile.businessName;

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
          <p style="margin:0 0 0.85rem;color:var(--br-slate);">No client leads match your current filters.</p>
          <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">
            <button type="button" class="btn btn-outline btn-sm" id="clearLeadFiltersBtn">Show All Leads</button>
            <a href="post-job.html" class="btn btn-primary btn-sm">Post a New Request</a>
          </div>
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

  providerCatFilter.addEventListener("change", () => {
    activeCat = providerCatFilter.value;
    state.providerProfile.vertical = activeCat;
    saveState(state);
    renderLeads();
  });

  minBudgetRange.addEventListener("input", () => {
    minBudget = Number(minBudgetRange.value);
    state.providerProfile.minBudget = minBudget;
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

  const resetBtn = document.getElementById("resetWalletBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const fresh = getDefaultState();
      state.wallet = fresh.wallet;
      state.leads = fresh.leads;
      state.transactions = fresh.transactions;
      state.providerProfile = fresh.providerProfile;
      activeCat = "All";
      minBudget = 10000;
      activeStatus = "all";
      searchQuery = "";
      providerCatFilter.value = "All";
      minBudgetRange.value = 10000;
      if (leadSearchInput) leadSearchInput.value = "";
      if (providerBadgeEl) providerBadgeEl.textContent = state.providerProfile.businessName;
      statusTabs.forEach((t) => t.classList.toggle("active", t.dataset.status === "all"));
      saveState(state);
      renderWallet();
      renderLeads();
      showToast("Provider workspace reset to KES 600 starter wallet.");
    });
  }

  /* Provider Onboarding / Profile Modal */
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
        const biz = document.getElementById("profBusinessName").value.trim() || "Verified Nairobi Provider";
        const vert = document.getElementById("profVertical").value;
        const floor = Math.max(2000, Math.min(50000, Number(document.getElementById("profMinBudget").value) || 10000));
        const phone = document.getElementById("profMpesaPhone").value.trim() || "+254 7XX XXX XXX";

        state.providerProfile = {
          businessName: biz,
          vertical: vert,
          minBudget: floor,
          mpesaPhone: phone
        };
        activeCat = vert;
        minBudget = floor;
        providerCatFilter.value = vert;
        minBudgetRange.value = floor;
        if (providerBadgeEl) providerBadgeEl.textContent = biz;

        saveState(state);
        renderLeads();
        closeModal();
        showToast(`Provider profile updated for ${biz}. Price floor set to ${formatKES(floor)}.`);
      });
    }
  }

  renderWallet();
  renderLeads();
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
  initNavigation();
  hydrateCategoryCounts(state);
  initHomePulse(state);
  initServicesPage();
  initPostJobPage(state);
  initProviderPortal(state);
  initRoiCalculator();
  initContactForm();
});
