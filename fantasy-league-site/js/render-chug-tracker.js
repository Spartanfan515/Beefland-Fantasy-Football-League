const chugWrap = document.getElementById("chug-tracker-wrap");

// Escape text for use inside an HTML attribute.
const chugEsc = (str) =>
  String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Show the "watch all chug videos" link if a folder URL is configured.
const chugFolderLink = document.getElementById("chug-folder-link");
if (chugFolderLink && CONFIG.chugFolderUrl) {
  chugFolderLink.href = CONFIG.chugFolderUrl;
  chugFolderLink.style.display = "";
}

if (!CONFIG.chugLog2026 || CONFIG.chugLog2026.length === 0) {
  chugWrap.innerHTML = `<p class="loading">No chugs logged yet this season — edit CONFIG.chugLog2026 in js/config.js.</p>`;
} else {
  // Group every logged chug by owner.
  const byOwner = {};
  CONFIG.chugLog2026.forEach((entry) => {
    if (!byOwner[entry.owner]) {
      byOwner[entry.owner] = { owner: entry.owner, owed: 0, completed: 0, entries: [] };
    }
    byOwner[entry.owner].owed += 1;
    if (entry.completed) byOwner[entry.owner].completed += 1;
    byOwner[entry.owner].entries.push(entry);
  });

  // Only managers with at least one chug owed make the board.
  const rows = Object.values(byOwner)
    .filter((o) => o.owed > 0)
    .sort((a, b) => b.owed - a.owed || a.owner.localeCompare(b.owner));

  if (rows.length === 0) {
    chugWrap.innerHTML = `<p class="loading">Nobody owes a chug right now. Clean week.</p>`;
  } else {
    const tableRows = rows
      .map((r) => {
        const outstanding = r.owed - r.completed;
        const detail = r.entries
          .map((e) => {
            const base = `Wk ${e.week}: ${e.player}`;
            // Optional footnote (e.g. a chug that didn't go cleanly): an asterisk that shows
            // the note in a tooltip on hover, keyboard focus, or tap.
            const star = e.note
              ? `<span class="chug-asterisk" tabindex="0" role="note" aria-label="${chugEsc(e.note)}" data-note="${chugEsc(e.note)}">*</span>`
              : "";
            const time = typeof e.chugTimeSeconds === "number" ? ` — <span class="chug-time">${e.chugTimeSeconds}s${star}</span>` : "";
            if (e.completed && e.video) {
              return `<div class="chug-detail-row">${base}${time} — <a class="chug-watch-link" href="${e.video}" target="_blank" rel="noopener">watch &#9654;</a></div>`;
            }
            return `<div class="chug-detail-row">${base}${time}${e.completed ? " — done" : " — owed"}</div>`;
          })
          .join("");
        return `
          <tr>
            <td class="owner-cell" data-label="Manager">${r.owner}</td>
            <td data-label="Chugs Owed">${r.owed}</td>
            <td data-label="Completed">${r.completed}</td>
            <td class="${outstanding > 0 ? "chug-outstanding" : "chug-clear"}" data-label="Outstanding">${outstanding}</td>
            <td class="chug-detail" data-label="Detail">${detail}</td>
          </tr>
        `;
      })
      .join("");

    chugWrap.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Manager</th>
              <th>Chugs Owed</th>
              <th>Chugs Completed</th>
              <th>Outstanding</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    `;
  }
}

// Tooltip for footnoted chugs. Built in JS (position: fixed) so it never gets
// clipped by the table's scroll wrapper.
(function () {
  if (!chugWrap) return;
  const style = document.createElement("style");
  style.textContent = `
    .chug-asterisk { cursor: help; font-weight: bold; margin-left: 1px; border-bottom: 1px dotted currentColor; outline-offset: 2px; }
    .chug-tooltip { position: fixed; left: 0; top: 0; z-index: 9999; max-width: 220px; padding: 6px 9px; font-size: 0.8rem; line-height: 1.3; background: #1a1a1a; color: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,.35); pointer-events: none; opacity: 0; transition: opacity .12s; }
    .chug-tooltip.show { opacity: 1; }
  `;
  document.head.appendChild(style);

  const tip = document.createElement("div");
  tip.className = "chug-tooltip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);

  const show = (el) => {
    tip.textContent = el.dataset.note;
    tip.classList.add("show");
    const r = el.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), window.innerWidth - tw - 8);
    let top = r.top - th - 8;
    if (top < 8) top = r.bottom + 8;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  };
  const hide = () => tip.classList.remove("show");
  const star = (e) => e.target.closest && e.target.closest(".chug-asterisk");

  chugWrap.addEventListener("mouseover", (e) => { const a = star(e); if (a) show(a); });
  chugWrap.addEventListener("mouseout", (e) => { if (star(e)) hide(); });
  chugWrap.addEventListener("focusin", (e) => { const a = star(e); if (a) show(a); });
  chugWrap.addEventListener("focusout", (e) => { if (star(e)) hide(); });
  chugWrap.addEventListener("click", (e) => { const a = star(e); if (a) { a.focus(); show(a); } });
  document.addEventListener("click", (e) => { if (!star(e)) hide(); });
  window.addEventListener("scroll", hide, true);
})();
