const LEAD_COST = 200;
const INITIAL_WALLET = 600;

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
    category: "Auto Mechanic",
    title: "Basic Brake Pad Replacement & Oil Change (Toyota Vitz)",
    location: "South B, Nairobi",
    budget: 6500,
    urgency: "Urgent (Within 24 hrs)",
    clientName: "Kevin Otieno",
    clientPhone: "+254 718 905 114",
    desc: "Routine 10,000 km oil service and front brake pads replacement. Parts budget included in KES 6,500 ceiling.",
    postedAt: "4 hrs ago",
    unlocked: false
  }
];

let wallet = INITIAL_WALLET;
let leads = JSON.parse(JSON.stringify(INITIAL_LEADS));
let activeCat = "All";
let minBudget = 10000;

const walletBalanceEl = document.getElementById("walletBalance");
const leadsRemainingEl = document.getElementById("leadsRemainingText");
const providerCatFilter = document.getElementById("providerCatFilter");
const minBudgetRange = document.getElementById("minBudgetRange");
const minBudgetLabel = document.getElementById("minBudgetLabel");
const matchedCountLabel = document.getElementById("matchedCountLabel");
const leadsListEl = document.getElementById("leadsList");
const toastEl = document.getElementById("toast");

const jobCategoryInput = document.getElementById("jobCategory");
const jobBudgetInput = document.getElementById("jobBudget");
const consumerMatchPreview = document.getElementById("consumerMatchPreview");

function formatKES(n) {
  return "KES " + Number(n).toLocaleString("en-KE");
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__brToast);
  window.__brToast = setTimeout(() => toastEl.classList.remove("show"), 3500);
}

function switchMode(mode) {
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const isMatch = tab.dataset.mode === mode;
    tab.classList.toggle("active", isMatch);
    tab.setAttribute("aria-selected", String(isMatch));
  });
  document.getElementById("panel-provider").classList.toggle("active", mode === "provider");
  document.getElementById("panel-consumer").classList.toggle("active", mode === "consumer");
}

function renderWallet() {
  walletBalanceEl.textContent = formatKES(wallet);
  const count = Math.floor(wallet / LEAD_COST);
  leadsRemainingEl.textContent = `${count} qualified lead${count === 1 ? "" : "s"} available (KES ${LEAD_COST} / lead)`;
}

function renderLeads() {
  minBudgetLabel.textContent = formatKES(minBudget);

  const visible = leads.filter((l) => activeCat === "All" || l.category === activeCat);
  const matched = visible.filter((l) => l.budget >= minBudget);
  matchedCountLabel.textContent = `${matched.length} of ${visible.length} lead${visible.length === 1 ? "" : "s"}`;

  if (!visible.length) {
    leadsListEl.innerHTML = `<div class="panel-card"><p style="margin:0;color:var(--br-slate);">No leads in <strong>${activeCat}</strong> yet. Switch to the Consumer tab to post one live!</p></div>`;
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

      let actionArea = "";
      if (l.unlocked) {
        actionArea = `
          <div class="unlocked-contact">
            <strong>Lead Unlocked (KES 200 deducted)</strong><br>
            Client: <strong>${l.clientName}</strong> · Phone: <strong>${l.clientPhone}</strong> · Ready to call or WhatsApp now.
          </div>`;
      } else if (!fitsPrice) {
        actionArea = `
          <span style="font-size:0.8rem;color:var(--br-slate);">Below your ${formatKES(minBudget)} minimum budget filter</span>
          <button type="button" class="btn btn-outline lower-filter-btn" data-budget="${l.budget}" style="padding:0.45rem 0.85rem;font-size:0.78rem;">Lower Floor to View</button>`;
      } else {
        actionArea = `
          <span style="font-size:0.8rem;color:var(--br-green);font-weight:600;">&#10003; Matches your price band</span>
          <button type="button" class="btn btn-primary unlock-lead-btn" data-id="${l.id}" style="padding:0.55rem 1rem;font-size:0.82rem;">Unlock Contact (KES ${LEAD_COST})</button>`;
      }

      return `
      <article class="${cardClass}">
        <div class="lead-head">
          <span class="lead-cat">${l.category}</span>
          <span class="lead-budget">Client Budget: ${formatKES(l.budget)}</span>
        </div>
        <h4>${l.title}</h4>
        <div class="lead-meta">${l.location} · ${l.urgency} · Posted ${l.postedAt}</div>
        <p style="font-size:0.86rem;margin:0 0 0.9rem;color:var(--br-ink);">${l.desc}</p>
        <div class="lead-foot">${actionArea}</div>
      </article>`;
    })
    .join("");

  leadsListEl.querySelectorAll(".unlock-lead-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lead = leads.find((x) => x.id === btn.dataset.id);
      if (!lead || lead.unlocked) return;
      if (wallet < LEAD_COST) {
        showToast("Insufficient M-Pesa wallet balance! Top up at least KES 600 to continue unlocking leads.");
        return;
      }
      wallet -= LEAD_COST;
      lead.unlocked = true;
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
      renderLeads();
      showToast(`Minimum job price floor adjusted to ${formatKES(b)}.`);
    });
  });
}

function updateConsumerPreview() {
  const cat = jobCategoryInput.value;
  const bud = Number(jobBudgetInput.value) || 0;
  consumerMatchPreview.innerHTML = `<strong>Live Match Estimate:</strong> Posting a <strong>${formatKES(bud)}</strong> job in <strong>${cat}</strong> will instantly notify vetted providers whose minimum price floor is at or below ${formatKES(bud)}.`;
}

document.querySelectorAll(".mode-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchMode(tab.dataset.mode));
});

function jumpTo(mode) {
  switchMode(mode);
  document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("jumpConsumerBtn").addEventListener("click", () => jumpTo("consumer"));
document.getElementById("jumpProviderBtn").addEventListener("click", () => jumpTo("provider"));
document.getElementById("heroConsumerBtn").addEventListener("click", () => jumpTo("consumer"));
document.getElementById("heroProviderBtn").addEventListener("click", () => jumpTo("provider"));

providerCatFilter.addEventListener("change", () => {
  activeCat = providerCatFilter.value;
  renderLeads();
});

minBudgetRange.addEventListener("input", () => {
  minBudget = Number(minBudgetRange.value);
  renderLeads();
});

document.querySelectorAll(".topup-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const amt = Number(btn.dataset.amount);
    wallet += amt;
    renderWallet();
    showToast(`M-Pesa STK Push confirmed: +${formatKES(amt)} credited to your wallet!`);
  });
});

document.getElementById("resetDemoBtn").addEventListener("click", () => {
  wallet = INITIAL_WALLET;
  leads = JSON.parse(JSON.stringify(INITIAL_LEADS));
  activeCat = "All";
  minBudget = 10000;
  providerCatFilter.value = "All";
  minBudgetRange.value = 10000;
  renderWallet();
  renderLeads();
  showToast("Wallet refreshed to KES 600 starter balance.");
});

jobCategoryInput.addEventListener("change", updateConsumerPreview);
jobBudgetInput.addEventListener("input", updateConsumerPreview);

document.getElementById("postJobForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newLead = {
    id: "lead-" + Date.now(),
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

  leads.unshift(newLead);
  activeCat = "All";
  providerCatFilter.value = "All";
  if (newLead.budget < minBudget) {
    minBudget = Math.max(2000, Math.floor(newLead.budget / 2000) * 2000);
    minBudgetRange.value = minBudget;
  }

  e.target.reset();
  jobBudgetInput.value = 25000;
  updateConsumerPreview();
  renderLeads();
  switchMode("provider");
  showToast(`Job posted! "${newLead.title}" is now live in the Provider Lead Queue.`);
});

renderWallet();
renderLeads();
updateConsumerPreview();
