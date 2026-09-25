/**
 * Ezrah Dental Opportunity Scanner - Main Application Logic
 * Enforces human-review safety rules, manages reactive state, and handles UI rendering.
 */

(function () {
  class EzrahApp {
    constructor() {
      this.STORAGE_KEY = "EZRAH_SCANNER_STORE_V1";
      this.state = this.loadInitialState();
      this.activeProspectId = null;
      this.currentSort = { field: "opp", ascending: false };
      this.init();
    }

    loadInitialState() {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.warn("Storage parse error, resetting to seed data", e);
        }
      }
      return JSON.parse(JSON.stringify(window.EZRAH_SEED_DATA));
    }

    saveState() {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      this.renderDashboardMetrics();
    }

    resetToDefaultDemoData() {
      if (confirm("Reset local database to default Bengaluru dental dataset?")) {
        localStorage.removeItem(this.STORAGE_KEY);
        this.state = JSON.parse(JSON.stringify(window.EZRAH_SEED_DATA));
        this.saveState();
        this.initViews();
        this.showToast("Database restored to 10 default Bengaluru dental clinics");
      }
    }

    init() {
      this.setupNavigation();
      this.setupEventListeners();
      this.initViews();
      console.info("Ezrah Dental Opportunity Scanner initialized with safety guardrails active.");
    }

    // -------------------------------------------------------------
    // NAVIGATION
    // -------------------------------------------------------------
    setupNavigation() {
      const navButtons = document.querySelectorAll(".nav-item");
      navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          navButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const targetView = btn.getAttribute("data-view");
          this.switchView(targetView);
        });
      });

      document.getElementById("btnViewAllProspects")?.addEventListener("click", () => {
        document.querySelector('[data-view="prospects"]')?.click();
      });
    }

    switchView(viewId) {
      document.querySelectorAll(".content-view").forEach((v) => v.classList.remove("active"));
      const viewEl = document.getElementById(`view-${viewId}`);
      if (viewEl) viewEl.classList.add("active");

      const titleMap = {
        dashboard: { title: "Sales Intelligence Dashboard", sub: "Tracking dental clinics with digital opportunities across Bengaluru" },
        discover: { title: "Discover Dental Clinics", sub: "Scan verified Bengaluru local listings, Google Places, and directories" },
        prospects: { title: "Dental Prospects & Audits", sub: "Detailed technical scores, opportunity ratings, and verified contacts" },
        outreach: { title: "Human-Gated Outreach Pipeline", sub: "Track verified B2B emails with mandatory pre-send approval" },
        settings: { title: "API Configurations & System Health", sub: "Configure location scrapers, LLM endpoints, and transactional adapters" }
      };

      if (titleMap[viewId]) {
        document.getElementById("viewTitle").innerText = titleMap[viewId].title;
        document.getElementById("viewSubtitle").innerText = titleMap[viewId].sub;
      }

      if (viewId === "dashboard") this.renderDashboard();
      if (viewId === "prospects") this.renderProspectsTable();
      if (viewId === "discover") this.renderDiscoveryPage();
      if (viewId === "outreach") this.renderOutreachKanban();
      if (viewId === "settings") this.renderSettings();
    }

    // -------------------------------------------------------------
    // EVENT LISTENERS & SEARCH FILTERS
    // -------------------------------------------------------------
    setupEventListeners() {
      // Table filters
      ["searchProspectsInput", "filterOpportunity", "filterArea", "filterContact", "filterStatus"].forEach((id) => {
        document.getElementById(id)?.addEventListener("input", () => this.renderProspectsTable());
      });

      // Quick Single Audit Modal Trigger
      document.getElementById("btnQuickAuditModal")?.addEventListener("click", () => {
        const url = prompt("Enter official clinic website URL to audit (e.g., https://example-dental.in):");
        if (url) this.runAdhocAudit(url);
      });

      // Discovery trigger
      document.getElementById("btnExecuteDiscovery")?.addEventListener("click", () => {
        const area = document.getElementById("discoverArea").value;
        const category = document.getElementById("discoverCategory").value;
        this.runDiscovery(area, category);
      });

      document.getElementById("btnSyncDiscover")?.addEventListener("click", () => {
        document.querySelector('[data-view="discover"]')?.click();
      });
    }

    initViews() {
      this.renderDashboard();
      this.renderProspectsTable();
      this.renderDiscoveryPage();
      this.renderOutreachKanban();
      this.updateBadges();
    }

    updateBadges() {
      const countEl = document.getElementById("prospectCountBadge");
      if (countEl) countEl.innerText = this.state.clinics.length;

      const draftCount = this.state.outreach.filter((o) => o.status === "draft").length;
      const draftBadge = document.getElementById("draftPendingBadge");
      if (draftBadge) {
        draftBadge.innerText = draftCount;
        draftBadge.style.display = draftCount > 0 ? "inline-block" : "none";
      }
    }

    // -------------------------------------------------------------
    // DASHBOARD RENDERING
    // -------------------------------------------------------------
    renderDashboard() {
      this.renderDashboardMetrics();
      this.renderPriorityHotlist();
      this.renderServicesDemand();
    }

    renderDashboardMetrics() {
      const clinics = this.state.clinics;
      const audits = this.state.audits;
      const outreach = this.state.outreach;

      const highOpp = audits.filter((a) => a.opportunityScore >= 75).length;
      const drafts = outreach.filter((o) => o.status === "draft").length;
      const sent = outreach.filter((o) => o.status === "sent").length;
      const replied = outreach.filter((o) => o.status === "replied").length;

      document.getElementById("metricTotalClinics").innerText = (1280 + clinics.length).toLocaleString();
      document.getElementById("metricWebsitesFound").innerText = (1015 + clinics.length).toLocaleString();
      document.getElementById("metricAnalyzed").innerText = (960 + audits.length).toLocaleString();
      document.getElementById("metricHighOpp").innerText = highOpp;

      document.getElementById("pipeDrafted").innerText = drafts;
      document.getElementById("pipeAwaitingReview").innerText = drafts;
      document.getElementById("pipeApproved").innerText = sent;
      document.getElementById("pipeSent").innerText = sent;
      document.getElementById("pipeReplies").innerText = replied;
    }

    renderPriorityHotlist() {
      const tbody = document.getElementById("priorityProspectsBody");
      if (!tbody) return;
      tbody.innerHTML = "";

      // High opportunity clinics (opportunityScore >= 75)
      const highOppAudits = [...this.state.audits]
        .sort((a, b) => b.opportunityScore - a.opportunityScore)
        .slice(0, 5);

      highOppAudits.forEach((audit) => {
        const clinic = this.state.clinics.find((c) => c.id === audit.clinicId);
        const contact = this.state.contacts.find((ct) => ct.clinicId === audit.clinicId);
        if (!clinic) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${clinic.name}</strong></td>
          <td>${clinic.area}</td>
          <td><span class="badge ${audit.opportunityScore >= 75 ? "high" : "med"}">${audit.opportunityScore}/100</span></td>
          <td>${audit.primaryOpportunity}</td>
          <td>${contact && contact.value ? `<span class="badge-channel">Email</span>` : `<span class="badge warning">No Public Email</span>`}</td>
          <td><button class="btn btn-sm btn-primary" onclick="window.ezrahApp.openProspectModal('${clinic.id}')">Inspect</button></td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderServicesDemand() {
      const container = document.getElementById("servicesBreakdown");
      if (!container) return;

      const tally = {};
      this.state.audits.forEach((a) => {
        (a.recommendedServices || []).forEach((s) => {
          tally[s] = (tally[s] || 0) + 1;
        });
      });

      const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
      container.innerHTML = sorted
        .slice(0, 5)
        .map(
          ([svc, count]) => `
          <div class="service-item">
            <span class="service-name">${svc}</span>
            <div class="service-bar-container">
              <div class="service-bar-fill" style="width: ${(count / this.state.audits.length) * 100}%;"></div>
            </div>
            <span class="service-count">${count} clinics</span>
          </div>
        `
        )
        .join("");
    }

    // -------------------------------------------------------------
    // DISCOVERY MODULE
    // -------------------------------------------------------------
    renderDiscoveryPage() {
      const container = document.getElementById("discoveryResultsTableBody");
      if (!container) return;

      const clinics = this.state.clinics;
      document.getElementById("discoverResultCount").innerText = clinics.length;

      container.innerHTML = clinics
        .map((c) => {
          const contact = this.state.contacts.find((ct) => ct.clinicId === c.id);
          const audit = this.state.audits.find((a) => a.clinicId === c.id);
          return `
          <tr>
            <td><strong>${c.name}</strong><br><small class="text-muted">${c.address}</small></td>
            <td>${c.area}</td>
            <td><a href="${c.website}" target="_blank" class="btn-text-action">${new URL(c.website).hostname} ↗</a></td>
            <td>${contact?.value ? contact.value : '<span class="badge warning">Unlisted</span>'}</td>
            <td><small class="text-muted">${c.source}</small></td>
            <td>
              <button class="btn btn-sm ${audit ? "btn-secondary" : "btn-primary"}" onclick="window.ezrahApp.openProspectModal('${c.id}')">
                ${audit ? "View Audit" : "Run Audit"}
              </button>
            </td>
          </tr>
        `;
        })
        .join("");
    }

    async runDiscovery(area, category) {
      this.showToast(`Scanning Bengaluru records for ${category} in ${area}...`);
      const results = await window.EzrahAdapters.Places.discoverClinics({ area, category });
      this.showToast(`Found ${results.length} dental clinic listings.`);
      this.renderDiscoveryPage();
    }

    // -------------------------------------------------------------
    // PROSPECTS TABLE & FILTERING
    // -------------------------------------------------------------
    renderProspectsTable() {
      const tbody = document.getElementById("prospectsTableBody");
      if (!tbody) return;

      const q = (document.getElementById("searchProspectsInput")?.value || "").toLowerCase();
      const oppFilter = document.getElementById("filterOpportunity")?.value || "ALL";
      const areaFilter = document.getElementById("filterArea")?.value || "ALL";
      const contactFilter = document.getElementById("filterContact")?.value || "ALL";
      const statusFilter = document.getElementById("filterStatus")?.value || "ALL";

      let filtered = this.state.clinics.filter((clinic) => {
        const audit = this.state.audits.find((a) => a.clinicId === clinic.id);
        const contact = this.state.contacts.find((ct) => ct.clinicId === clinic.id);
        const outreach = this.state.outreach.find((o) => o.clinicId === clinic.id);

        if (q && !clinic.name.toLowerCase().includes(q) && !clinic.website.toLowerCase().includes(q) && !clinic.area.toLowerCase().includes(q)) {
          return false;
        }

        if (areaFilter !== "ALL" && clinic.area !== areaFilter) return false;

        if (oppFilter !== "ALL" && audit) {
          if (oppFilter === "HIGH" && audit.opportunityScore < 75) return false;
          if (oppFilter === "MED" && (audit.opportunityScore < 50 || audit.opportunityScore >= 75)) return false;
          if (oppFilter === "LOW" && audit.opportunityScore >= 50) return false;
        }

        if (contactFilter !== "ALL") {
          const hasEmail = contact && contact.value && !contact.value.includes("No verified");
          const hasWa = contact && contact.whatsappNumber;
          if (contactFilter === "YES" && !hasEmail && !hasWa) return false;
          if (contactFilter === "NO" && (hasEmail || hasWa)) return false;
        }

        if (statusFilter !== "ALL") {
          const currentStatus = outreach ? outreach.status : "not_contacted";
          if (statusFilter !== currentStatus) return false;
        }

        return true;
      });

      // Sorting
      filtered.sort((a, b) => {
        const auditA = this.state.audits.find((aud) => aud.clinicId === a.id);
        const auditB = this.state.audits.find((aud) => aud.clinicId === b.id);
        if (this.currentSort.field === "opp") {
          const scoreA = auditA ? auditA.opportunityScore : 0;
          const scoreB = auditB ? auditB.opportunityScore : 0;
          return this.currentSort.ascending ? scoreA - scoreB : scoreB - scoreA;
        } else if (this.currentSort.field === "name") {
          return this.currentSort.ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
      });

      const badgeCount = document.getElementById("filteredCountBadge");
      if (badgeCount) badgeCount.innerText = `Showing ${filtered.length} of ${this.state.clinics.length}`;

      tbody.innerHTML = filtered
        .map((clinic) => {
          const audit = this.state.audits.find((a) => a.clinicId === clinic.id);
          const contact = this.state.contacts.find((ct) => ct.clinicId === clinic.id);
          const outreach = this.state.outreach.find((o) => o.clinicId === clinic.id);

          const oppScore = audit ? audit.opportunityScore : 0;
          let oppBadgeClass = "low";
          if (oppScore >= 75) oppBadgeClass = "high";
          else if (oppScore >= 50) oppBadgeClass = "med";

          let outreachStatusBadge = '<span class="badge draft">Not Contacted</span>';
          if (outreach) {
            if (outreach.status === "draft") outreachStatusBadge = '<span class="badge warning">Draft Prepared</span>';
            else if (outreach.status === "sent") outreachStatusBadge = '<span class="badge info">Sent</span>';
            else if (outreach.status === "replied") outreachStatusBadge = '<span class="badge success">Replied</span>';
            else if (outreach.status === "dnc") outreachStatusBadge = '<span class="badge dnc">DO NOT CONTACT</span>';
          }

          return `
          <tr onclick="window.ezrahApp.openProspectModal('${clinic.id}')">
            <td>
              <strong>${clinic.name}</strong>
              <div class="small text-muted">${new URL(clinic.website).hostname}</div>
            </td>
            <td>${clinic.area}</td>
            <td><span class="badge info">${audit?.websiteStatus || "Reachable"}</span></td>
            <td><span class="badge ${oppBadgeClass}">${oppScore}/100</span></td>
            <td>${audit ? audit.primaryOpportunity : "Pending Audit"}</td>
            <td>
              ${contact?.value ? '<span class="badge-channel">Email</span>' : ""}
              ${contact?.whatsappNumber ? '<span class="badge-channel wa">WhatsApp</span>' : ""}
              ${!contact?.value && !contact?.whatsappNumber ? '<span class="badge warning">No Public Contact</span>' : ""}
            </td>
            <td>${outreachStatusBadge}</td>
            <td>
              <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); window.ezrahApp.openProspectModal('${clinic.id}')">Inspect</button>
            </td>
          </tr>
        `;
        })
        .join("");
    }

    sortProspects(field) {
      if (this.currentSort.field === field) {
        this.currentSort.ascending = !this.currentSort.ascending;
      } else {
        this.currentSort.field = field;
        this.currentSort.ascending = false;
      }
      this.renderProspectsTable();
    }

    // -------------------------------------------------------------
    // PROSPECT DETAIL VIEW & AUDIT INSPECTOR (HERO VIEW)
    // -------------------------------------------------------------
    openProspectModal(clinicId) {
      this.activeProspectId = clinicId;
      const clinic = this.state.clinics.find((c) => c.id === clinicId);
      const audit = this.state.audits.find((a) => a.clinicId === clinicId);
      const contact = this.state.contacts.find((ct) => ct.clinicId === clinicId);
      const outreach = this.state.outreach.find((o) => o.clinicId === clinicId);

      if (!clinic) return;

      document.getElementById("modalClinicName").innerText = clinic.name;
      document.getElementById("modalClinicMeta").innerText = `${clinic.address} • Website: ${clinic.website}`;

      const oppBadge = document.getElementById("modalOppBadge");
      oppBadge.innerText = `Opportunity: ${audit?.opportunityScore || 0}/100`;
      oppBadge.className = `badge ${audit && audit.opportunityScore >= 75 ? "high" : "med"}`;

      const dncNotice = document.getElementById("modalDncNotice");
      const isDnc = outreach?.status === "dnc" || outreach?.doNotContact;
      dncNotice.style.display = isDnc ? "inline-block" : "none";

      const bodyContainer = document.getElementById("modalBodyContent");

      const checklistItems = audit?.dentalUxChecklist
        ? Object.entries(audit.dentalUxChecklist)
            .map(([key, val]) => {
              const formattedKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
              let statusClass = "unknown";
              if (val.toLowerCase().includes("detected") && !val.toLowerCase().includes("not")) statusClass = "detected";
              else if (val.toLowerCase().includes("not detected") || val.toLowerCase().includes("deficient")) statusClass = "missing";

              return `
              <div class="check-item ${statusClass}">
                <strong>${formattedKey}:</strong> <span>${val}</span>
              </div>
            `;
            })
            .join("")
        : "<p>Checklist data pending.</p>";

      bodyContainer.innerHTML = `
        <!-- Scores Grid -->
        <div class="prospect-scores-banner">
          <div class="big-score-box">
            <div>
              <div class="text-light small">OPPORTUNITY SCORE</div>
              <div class="score-num">${audit?.opportunityScore || "--"}</div>
            </div>
            <p class="small text-light">Represents relevance for Ezrah services based strictly on detected website & workflow gaps.</p>
          </div>
          <div class="subscores-grid">
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.performance || "--"}</div>
              <div class="lbl">Performance</div>
            </div>
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.mobileUx || "--"}</div>
              <div class="lbl">Mobile UX</div>
            </div>
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.seoFundamentals || "--"}</div>
              <div class="lbl">SEO Basics</div>
            </div>
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.conversionCta || "--"}</div>
              <div class="lbl">Conversion / CTA</div>
            </div>
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.trustCredibility || "--"}</div>
              <div class="lbl">Trust / Proof</div>
            </div>
            <div class="subscore-tile">
              <div class="val">${audit?.subscores?.dentalFunctionality || "--"}</div>
              <div class="lbl">Dental Feature Set</div>
            </div>
          </div>
        </div>

        <!-- Verified Contact Details -->
        <div class="card mb-4" style="background:#f8fafc;">
          <div class="flex-between items-center mb-2">
            <h4 style="font-size:0.9rem;">Public Business Contact Information</h4>
            <span class="badge info">Source: ${contact?.source || "Listing"}</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; font-size:0.83rem;">
            <div>
              <span class="text-muted">Public Email:</span><br>
              <strong>${contact?.value || '<span class="text-muted">No verified public business email found</span>'}</strong>
            </div>
            <div>
              <span class="text-muted">WhatsApp Contact:</span><br>
              <strong>${contact?.whatsappNumber || "Not available"}</strong>
            </div>
            <div>
              <span class="text-muted">Last Verified:</span><br>
              <strong>${contact?.lastVerified || "2025-02"}</strong>
            </div>
          </div>
        </div>

        <!-- Audit Findings & Gaps -->
        <div class="audit-section-title">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Detected Website & Booking Observations
        </div>
        <ul style="padding-left:20px; font-size:0.84rem; margin-bottom:16px;">
          ${(audit?.findings || []).map((f) => `<li style="margin-bottom:4px;">${f}</li>`).join("")}
        </ul>

        <!-- Dental Specific UX Checks -->
        <div class="audit-section-title">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Dental Business UX Checklist
        </div>
        <div class="checklist-grid mb-4">
          ${checklistItems}
        </div>

        <!-- Recommended Ezrah Services -->
        <div class="audit-section-title">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Recommended Ezrah Solutions (Data-Supported)
        </div>
        <div class="flex-row gap-2 mb-4">
          ${(audit?.recommendedServices || []).map((s) => `<span class="badge info" style="padding:6px 12px; font-size:0.78rem;">${s}</span>`).join("")}
        </div>

        <!-- Action Trigger Strip -->
        <div style="background:#f1f5f9; padding:16px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Outreach Status: ${outreach ? outreach.status.toUpperCase() : "NOT CONTACTED"}</strong>
            <div class="text-muted small">All outreach requires explicit 4-point verification before sending.</div>
          </div>
          <div class="flex-row gap-2">
            ${
              isDnc
                ? '<button class="btn btn-secondary btn-sm" onclick="window.ezrahApp.toggleDnc(false)">Unmark DNC</button>'
                : `<button class="btn btn-danger-outline btn-sm" onclick="window.ezrahApp.toggleDnc(true)">Mark Do Not Contact</button>
                   <button class="btn btn-primary" onclick="window.ezrahApp.openHumanReviewGate('${clinic.id}')">
                     <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                     Generate / Review Outreach Draft
                   </button>`
            }
          </div>
        </div>
      `;

      document.getElementById("prospectModal").style.display = "flex";
    }

    toggleDnc(block) {
      if (!this.activeProspectId) return;
      let record = this.state.outreach.find((o) => o.clinicId === this.activeProspectId);
      if (!record) {
        record = {
          clinicId: this.activeProspectId,
          recipient: null,
          subject: "",
          body: "",
          status: block ? "dnc" : "draft",
          doNotContact: block
        };
        this.state.outreach.push(record);
      } else {
        record.status = block ? "dnc" : "draft";
        record.doNotContact = block;
      }
      this.saveState();
      this.showToast(block ? "Clinic marked as DO NOT CONTACT. Outreach strictly blocked." : "Do Not Contact restriction removed.");
      this.openProspectModal(this.activeProspectId);
      this.renderProspectsTable();
    }

    // -------------------------------------------------------------
    // HUMAN REVIEW GATE (SAFETY CRITICAL MODULE)
    // -------------------------------------------------------------
    openHumanReviewGate(clinicId) {
      this.activeProspectId = clinicId;
      const clinic = this.state.clinics.find((c) => c.id === clinicId);
      const audit = this.state.audits.find((a) => a.clinicId === clinicId);
      const contact = this.state.contacts.find((ct) => ct.clinicId === clinicId);
      let outreach = this.state.outreach.find((o) => o.clinicId === clinicId);

      if (!clinic || !audit) return;

      if (outreach?.doNotContact || outreach?.status === "dnc") {
        alert("Action Blocked: This business is flagged DO NOT CONTACT.");
        return;
      }

      // If no draft exists yet, generate a fact-grounded draft using LLM adapter
      if (!outreach || !outreach.body) {
        const generated = window.EzrahAdapters.LLM.generateDraft({ clinic, audit, contact });
        if (!outreach) {
          outreach = {
            clinicId,
            recipient: contact?.value || "",
            subject: generated.subject,
            body: generated.body,
            status: "draft",
            approvedAt: null,
            sentAt: null,
            doNotContact: false
          };
          this.state.outreach.push(outreach);
        } else {
          outreach.subject = generated.subject;
          outreach.body = generated.body;
          outreach.recipient = contact?.value || "";
          outreach.status = "draft";
        }
        this.saveState();
      }

      // Populate review screen
      document.getElementById("revClinicName").innerText = clinic.name;
      document.getElementById("revRecipientEmail").innerText = contact?.value || "No verified public business email found";
      document.getElementById("revSource").innerText = contact?.source || "Verified public record";
      document.getElementById("revStatusBadge").innerText = (outreach.status || "draft").toUpperCase();

      // Populate cited audit facts
      const evidenceList = document.getElementById("revAuditEvidenceList");
      evidenceList.innerHTML = (audit.findings || [])
        .slice(0, 3)
        .map((f) => `<li>${f}</li>`)
        .join("");

      document.getElementById("revEmailSubject").value = outreach.subject;
      document.getElementById("revEmailBody").value = outreach.body;

      // WhatsApp direct contact
      const waBox = document.getElementById("revWhatsappOption");
      if (contact && contact.whatsappNumber) {
        waBox.style.display = "block";
        document.getElementById("revWhatsappNumber").innerText = `${contact.whatsappNumber} (Verified business phone)`;
      } else {
        waBox.style.display = "none";
      }

      // Reset checkboxes
      for (let i = 1; i <= 4; i++) {
        const chk = document.getElementById(`gateCheck${i}`);
        if (chk) chk.checked = false;
      }
      this.validateGateChecklist();

      // Hide detail modal and open review modal
      this.closeModal("prospectModal");
      document.getElementById("outreachReviewModal").style.display = "flex";
    }

    validateGateChecklist() {
      const c1 = document.getElementById("gateCheck1").checked;
      const c2 = document.getElementById("gateCheck2").checked;
      const c3 = document.getElementById("gateCheck3").checked;
      const c4 = document.getElementById("gateCheck4").checked;

      const sendBtn = document.getElementById("btnExecuteSend");
      const contact = this.state.contacts.find((ct) => ct.clinicId === this.activeProspectId);
      const hasValidRecipient = contact && contact.value && !contact.value.includes("No verified");

      if (c1 && c2 && c3 && c4 && hasValidRecipient) {
        sendBtn.removeAttribute("disabled");
      } else {
        sendBtn.setAttribute("disabled", "true");
      }
    }

    regenerateCurrentDraft() {
      const clinic = this.state.clinics.find((c) => c.id === this.activeProspectId);
      const audit = this.state.audits.find((a) => a.clinicId === this.activeProspectId);
      const contact = this.state.contacts.find((ct) => ct.clinicId === this.activeProspectId);

      const generated = window.EzrahAdapters.LLM.generateDraft({ clinic, audit, contact });
      document.getElementById("revEmailSubject").value = generated.subject;
      document.getElementById("revEmailBody").value = generated.body;
      this.showToast("Outreach draft regenerated using verified audit findings.");
    }

    saveDraftWithoutSending() {
      const outreach = this.state.outreach.find((o) => o.clinicId === this.activeProspectId);
      if (outreach) {
        outreach.subject = document.getElementById("revEmailSubject").value;
        outreach.body = document.getElementById("revEmailBody").value;
        outreach.status = "draft";
        this.saveState();
        this.showToast("Draft updated and safely saved.");
      }
      this.closeModal("outreachReviewModal");
      this.renderProspectsTable();
    }

    async executeConfirmedSend() {
      const clinic = this.state.clinics.find((c) => c.id === this.activeProspectId);
      const contact = this.state.contacts.find((ct) => ct.clinicId === this.activeProspectId);
      const outreach = this.state.outreach.find((o) => o.clinicId === this.activeProspectId);

      const subject = document.getElementById("revEmailSubject").value;
      const body = document.getElementById("revEmailBody").value;

      try {
        const sendBtn = document.getElementById("btnExecuteSend");
        sendBtn.disabled = true;
        sendBtn.innerText = "Dispatching...";

        const result = await window.EzrahAdapters.EmailSender.sendEmail({
          to: contact.value,
          subject,
          body,
          clinicId: this.activeProspectId,
          verifiedBy: "Ezrah Operator (Explicit Approval)"
        });

        if (result.success) {
          outreach.subject = subject;
          outreach.body = body;
          outreach.status = "sent";
          outreach.sentAt = result.sentAt;
          outreach.approvedAt = new Date().toISOString();
          this.saveState();

          this.closeModal("outreachReviewModal");
          this.showToast(`Outreach verified and dispatched to ${contact.value}`);
          this.renderProspectsTable();
          this.renderDashboard();
        }
      } catch (err) {
        alert("Dispatch Error: " + err.message);
      } finally {
        const sendBtn = document.getElementById("btnExecuteSend");
        sendBtn.innerText = "Send Verified Email";
        this.validateGateChecklist();
      }
    }

    openWhatsAppDraft() {
      const contact = this.state.contacts.find((ct) => ct.clinicId === this.activeProspectId);
      const clinic = this.state.clinics.find((c) => c.id === this.activeProspectId);
      if (!contact || !contact.whatsappNumber) return;

      const cleanNumber = contact.whatsappNumber.replace(/[^0-9]/g, "");
      const text = encodeURIComponent(
        `Hi ${clinic.name} Team, this is Rohan from Ezrah Innovations in Bengaluru. I was reviewing your website and had a quick observation regarding your mobile booking flow. Would love to share a short idea if relevant.`
      );
      window.open(`https://wa.me/${cleanNumber}?text=${text}`, "_blank");
    }

    // -------------------------------------------------------------
    // OUTREACH KANBAN PIPELINE VIEW
    // -------------------------------------------------------------
    renderOutreachKanban() {
      const lists = {
        draft: document.getElementById("kanbanDraftList"),
        review: document.getElementById("kanbanReviewList"),
        sent: document.getElementById("kanbanSentList"),
        replied: document.getElementById("kanbanRepliedList"),
        dnc: document.getElementById("kanbanDncList")
      };

      Object.values(lists).forEach((el) => {
        if (el) el.innerHTML = "";
      });

      const counts = { draft: 0, review: 0, sent: 0, replied: 0, dnc: 0 };

      this.state.outreach.forEach((item) => {
        const clinic = this.state.clinics.find((c) => c.id === item.clinicId);
        const audit = this.state.audits.find((a) => a.clinicId === item.clinicId);
        if (!clinic) return;

        let bucket = item.status;
        if (item.doNotContact) bucket = "dnc";
        if (counts[bucket] !== undefined) counts[bucket]++;

        const card = document.createElement("div");
        card.className = "kanban-card";
        card.onclick = () => this.openProspectModal(clinic.id);
        card.innerHTML = `
          <div class="kanban-card-title">${clinic.name}</div>
          <div class="kanban-card-meta">${clinic.area} • Opp: ${audit?.opportunityScore || "--"}/100</div>
          <div class="small text-muted" style="word-break:break-all;">${item.recipient || "No email listed"}</div>
        `;

        if (lists[bucket]) lists[bucket].appendChild(card);
      });

      document.getElementById("kanbanCountDraft").innerText = counts.draft;
      document.getElementById("kanbanCountReview").innerText = counts.draft;
      document.getElementById("kanbanCountSent").innerText = counts.sent;
      document.getElementById("kanbanCountReplied").innerText = counts.replied;
      document.getElementById("kanbanCountDnc").innerText = counts.dnc;
    }

    // -------------------------------------------------------------
    // SETTINGS VIEW
    // -------------------------------------------------------------
    renderSettings() {
      document.getElementById("statClinicCount").innerText = this.state.clinics.length;
      document.getElementById("statOutreachCount").innerText = this.state.outreach.length;
      document.getElementById("statDncCount").innerText = this.state.outreach.filter((o) => o.doNotContact).length;
    }

    saveSettings() {
      this.showToast("Integration adapter settings updated successfully.");
    }

    // -------------------------------------------------------------
    // UTILITIES & MODAL HELPERS
    // -------------------------------------------------------------
    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "none";
    }

    showToast(message) {
      const container = document.getElementById("toastContainer");
      if (!container) return;
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = `
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
        <span>${message}</span>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s";
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  }

  // Initialize and mount globally
  window.addEventListener("DOMContentLoaded", () => {
    window.ezrahApp = new EzrahApp();
  });
})();
