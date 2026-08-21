document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

/**
 * Upcoming Events — 2026 season key dates.
 * Countdown targets are given as ISO strings with an explicit UTC offset
 * for Eastern Time, so the countdown reads correctly for every visitor
 * regardless of their own timezone. Both dates fall during Eastern
 * Daylight Time (UTC-4).
 */
const EVENTS_2026 = [
  {
    id: "draft-day",
    date: "9/4",
    title: "Draft Day",
    desc: "The 2026 startup draft. Show up on time or your queue does the picking.",
    countdownTo: "2026-09-04T19:00:00-04:00",
    countdownLabel: "7:00 PM ET",
  },
  {
    id: "draft-recap",
    date: "9/6",
    title: "2026 Draft Recap",
    desc: "A full breakdown of the 2026 draft: biggest reach, draft-day steal, team compositions (RB-heavy, Zero RB, Early QB, etc.), and initial standings.",
    placeholder: true,
  },
  {
    id: "kickoff",
    date: "9/9",
    title: "Season Kickoff",
    desc: "Countdown to the first NFL game of 2026.",
    countdownTo: "2026-09-09T20:20:00-04:00",
    countdownLabel: "8:20 PM ET",
  },
  {
    id: "week1-recap",
    date: "9/15",
    title: "Week 1 Recap",
    desc: "An overview of every Week 1 matchup around the league.",
    placeholder: true,
  },
];

const grid = document.getElementById("events-grid");

function renderCountdown(target) {
  return `
    <div class="event-countdown event-countdown--live" data-countdown="${target}">
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="d">--</div><div class="event-countdown-label">Days</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="h">--</div><div class="event-countdown-label">Hrs</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="m">--</div><div class="event-countdown-label">Min</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="s">--</div><div class="event-countdown-label">Sec</div></div>
    </div>
  `;
}

grid.innerHTML = EVENTS_2026.map((e) => {
  const cardClass = e.placeholder ? "event-card event-card--placeholder" : "event-card";
  return `
    <div class="${cardClass}" ${e.id ? `id="event-${e.id}"` : ""}>
      <div class="event-date">${e.date}${e.countdownLabel ? ` &middot; ${e.countdownLabel}` : ""}</div>
      <div class="event-title">${e.title}</div>
      <div class="event-desc">${e.desc}</div>
      ${e.placeholder ? '<div class="event-placeholder-tag">Content posts after the date</div>' : ""}
      ${e.countdownTo ? renderCountdown(e.countdownTo) : ""}
    </div>
  `;
}).join("");

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  document.querySelectorAll("[data-countdown]").forEach((el) => {
    const target = new Date(el.dataset.countdown).getTime();
    const now = Date.now();
    let diff = target - now;

    const dEl = el.querySelector('[data-unit="d"]');
    const hEl = el.querySelector('[data-unit="h"]');
    const mEl = el.querySelector('[data-unit="m"]');
    const sEl = el.querySelector('[data-unit="s"]');

    if (diff <= 0) {
      dEl.textContent = "0";
      hEl.textContent = "00";
      mEl.textContent = "00";
      sEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    dEl.textContent = String(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(minutes);
    sEl.textContent = pad(seconds);
  });
}

tick();
setInterval(tick, 1000);
