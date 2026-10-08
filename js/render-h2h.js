const h2hContainer = document.getElementById("h2h-content");

if (!HEAD_TO_HEAD || !HEAD_TO_HEAD.owners || HEAD_TO_HEAD.owners.length === 0) {
  h2hContainer.innerHTML = `<p class="loading">No head-to-head data yet — edit js/h2h.js.</p>`;
} else {
  const owners = HEAD_TO_HEAD.owners;
  const matrix = HEAD_TO_HEAD.matrix;

  // First names alone for the mobile-width label, except when two owners
  // share a first name (e.g. two Adams) — then fall back to "First L."
  // for just those owners, so the short label stays unambiguous.
  const firstNameCounts = {};
  owners.forEach((name) => {
    const first = name.split(" ")[0];
    firstNameCounts[first] = (firstNameCounts[first] || 0) + 1;
  });
  const shortName = (name) => {
    const [first, last] = name.split(" ");
    return firstNameCounts[first] > 1 ? `${first} ${last[0]}.` : first;
  };

  const headerCells = owners
    .map((name) => `<th class="h2h-col-head"><span class="h2h-name-full">${name}</span><span class="h2h-name-short">${shortName(name)}</span></th>`)
    .join("");

  const bodyRows = owners
    .map((rowOwner) => {
      const cells = owners
        .map((colOwner) => {
          if (rowOwner === colOwner) {
            return `<td class="h2h-cell h2h-cell--self">&mdash;</td>`;
          }
          const [w, l] = matrix[rowOwner][colOwner];
          const cls = w > l ? "h2h-cell--winning" : w < l ? "h2h-cell--losing" : "h2h-cell--even";
          return `<td class="h2h-cell ${cls}">${w}-${l}</td>`;
        })
        .join("");
      return `
        <tr>
          <th class="h2h-row-head"><span class="h2h-name-full">${rowOwner}</span><span class="h2h-name-short">${shortName(rowOwner)}</span></th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  h2hContainer.innerHTML = `
    <h2 class="bracket-heading">All-Time Head-to-Head</h2>
    <p class="section-intro">Every current manager's record against every other, across all seasons played. Read a row as that owner's record — row 1 vs. column 4 is row 1's wins-losses against column 4.</p>
    <div class="table-wrap h2h-wrap">
      <table class="h2h-table">
        <thead>
          <tr>
            <th class="h2h-corner">&nbsp;</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}
