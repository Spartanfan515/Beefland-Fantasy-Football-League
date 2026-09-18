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

  // Loading an issue with ?embed=1 tells that page to hide its own site
  // header/nav/footer (see the inline script in each newspapers/*.html),
  // so we're not showing the whole site chrome a second time inside the
  // frame. After the issue loads, resize the frame to the article's
  // actual height so the reader never gets a cramped nested scrollbar.
  function loadIssue(file) {
    bulletinFrame.src = `${file}?embed=1`;
  }

  bulletinFrame.addEventListener("load", () => {
    try {
      const doc = bulletinFrame.contentDocument;
      if (doc && doc.documentElement) {
        bulletinFrame.style.height = `${doc.documentElement.scrollHeight}px`;
      }
    } catch (e) {
      // Cross-origin or otherwise inaccessible — keep the CSS fallback height.
    }
  });

  bulletinSelect.addEventListener("change", () => {
    loadIssue(bulletinSelect.value);
  });

  loadIssue(issues[0].file);
}
