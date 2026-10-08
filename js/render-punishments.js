document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const rulesContainer = document.getElementById("punishment-rules-content");
const container = document.getElementById("punishments-content");

if (CONFIG.punishmentRules && CONFIG.punishmentRules.length > 0) {
  rulesContainer.innerHTML = `
    <div class="content-section punishment-rules">
      <h2>General Rules</h2>
      <ul>
        ${CONFIG.punishmentRules.map((rule) => `<li>${rule}</li>`).join("")}
      </ul>
    </div>
  `;
}

/** Recursively renders a regulations array (strings or {text, subitems}) as nested <ol> lists */
function renderRegulations(items) {
  const lis = items
    .map((item) => {
      if (typeof item === "string") {
        return `<li>${item}</li>`;
      }
      const nested = item.subitems ? renderRegulations(item.subitems) : "";
      return `<li>${item.text}${nested}</li>`;
    })
    .join("");
  return `<ol>${lis}</ol>`;
}

if (!CONFIG.punishments || CONFIG.punishments.length === 0) {
  container.innerHTML = `<p class="loading">No punishments added yet — edit CONFIG.punishments in js/config.js.</p>`;
} else {
  const sorted = [...CONFIG.punishments].sort((a, b) => b.year - a.year);

  container.innerHTML = sorted
    .map((p) => {
      const loserLine = p.loser
        ? `<div class="punishment-loser">Served by: ${p.loser}</div>`
        : `<div class="punishment-loser punishment-loser--tbd">Loser TBD — decided at the end of ${p.year}</div>`;

      const regsBlock =
        p.regulations && p.regulations.length > 0
          ? `
            <details class="regs-details">
              <summary>Full Regulations</summary>
              ${renderRegulations(p.regulations)}
            </details>
          `
          : "";

      return `
        <div class="punishment-card">
          <div class="punishment-year">${p.year}</div>
          <h3>${p.title}</h3>
          ${loserLine}
          <p>${p.summary}</p>
          ${regsBlock}
        </div>
      `;
    })
    .join("");
}
