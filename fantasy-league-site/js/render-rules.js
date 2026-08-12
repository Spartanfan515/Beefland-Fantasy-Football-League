document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const container = document.getElementById("rules-content");

/** Recursively renders a rules items array (strings or {text, subitems, listStyle}) as nested <ol> lists */
function renderItems(items) {
  const lis = items
    .map((item) => {
      if (typeof item === "string") {
        return `<li>${item}</li>`;
      }
      const styleClass = item.listStyle === "letters" ? "list-letters" : "";
      const nested = item.subitems
        ? `<ol class="${styleClass}">${renderItems(item.subitems)}</ol>`
        : "";
      return `<li>${item.text}${nested}</li>`;
    })
    .join("");
  return lis;
}

if (!CONFIG.rules || CONFIG.rules.length === 0) {
  container.innerHTML = `<p class="loading">No rules added yet — edit CONFIG.rules in js/config.js.</p>`;
} else {
  container.innerHTML = CONFIG.rules
    .map(
      (section) => `
      <div class="content-section">
        <h2>${section.section}</h2>
        <ol class="rules-list">${renderItems(section.items)}</ol>
      </div>
    `
    )
    .join("");
}
