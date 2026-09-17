const bulletinSelect = document.getElementById("bulletin-select");
const bulletinFrame = document.getElementById("bulletin-frame");

if (!CONFIG.newspaperIssues2026 || CONFIG.newspaperIssues2026.length === 0) {
  bulletinSelect.innerHTML = `<option>No issues published yet</option>`;
  bulletinSelect.disabled = true;
  document.getElementById("bulletin-frame-wrap").innerHTML =
    `<p class="loading">No issues of the Beefland Bulletin yet — edit CONFIG.newspaperIssues2026 in js/config.js.</p>`;
} else {
  // Most recent week first.
  const issues = [...CONFIG.newspaperIssues2026].sort((a, b) => b.week - a.week);

  bulletinSelect.innerHTML = issues
    .map((issue) => `<option value="${issue.file}">${issue.label}</option>`)
    .join("");

  bulletinSelect.addEventListener("change", () => {
    bulletinFrame.src = bulletinSelect.value;
  });

  bulletinFrame.src = issues[0].file;
}
