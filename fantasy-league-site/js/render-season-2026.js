document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

/**
 * Upcoming Events — recurring weekly reminders for the 2026 season.
 * These fire every week rather than on one fixed date, so instead of a
 * hardcoded countdownTo timestamp each event carries a weekday/hour/minute
 * in America/New_York time; getNextOccurrenceUTC() below finds the next
 * matching instant (rolling to next week once one passes) and stays
 * correct across the DST change in November, since it derives the ET
 * offset fresh from Intl rather than assuming a fixed UTC-4.
 */
const EVENTS_2026 = [
  {
    id: "bulletin-drop",
    title: "Beefland Bulletin Drop",
    desc: "This week's issue of the Beefland Bulletin posts to the group chat and the 2026 Season page.",
    recurring: { weekday: 2, hour: 21, minute: 0 }, // Tuesday, 9:00 PM ET
    timeLabel: "Every Tuesday · 9:00 PM ET",
  },
  {
    id: "waivers",
    title: "Waivers Clear",
    desc: "Weekly waiver claims process. Get your bids in before they run.",
    recurring: { weekday: 3, hour: 3, minute: 0 }, // Wednesday, 3:00 AM ET
    timeLabel: "Every Wednesday · 3:00 AM ET",
  },
];

const grid = document.getElementById("events-grid");

// Returns the ET (America/New_York) offset from UTC, in minutes, that is
// in effect at the given instant (e.g. -240 during EDT, -300 during EST).
function getETOffsetMinutes(date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date).reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});
  const hour = parts.hour === "24" ? "00" : parts.hour;
  const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, hour, parts.minute, parts.second);
  return Math.round((asUTC - date.getTime()) / 60000);
}

// Next UTC instant at which it is `weekday`/`hour`/`minute` in ET
// (weekday: 0=Sun...6=Sat), rolling forward a week if that time already
// passed today.
function getNextOccurrenceUTC(weekday, hour, minute) {
  const now = new Date();
  const offsetMin = getETOffsetMinutes(now);
  const etNow = new Date(now.getTime() + offsetMin * 60000);

  let daysAhead = (weekday - etNow.getUTCDay() + 7) % 7;
  let candidate = new Date(Date.UTC(
    etNow.getUTCFullYear(), etNow.getUTCMonth(), etNow.getUTCDate() + daysAhead,
    hour, minute, 0
  ));
  // candidate is ET wall time expressed as if it were UTC; convert to real UTC.
  let targetUTC = new Date(candidate.getTime() - offsetMin * 60000);

  if (targetUTC.getTime() <= now.getTime()) {
    daysAhead += 7;
    candidate = new Date(Date.UTC(
      etNow.getUTCFullYear(), etNow.getUTCMonth(), etNow.getUTCDate() + daysAhead,
      hour, minute, 0
    ));
    targetUTC = new Date(candidate.getTime() - offsetMin * 60000);
  }
  return targetUTC;
}

function renderCountdown(targetISO) {
  return `
    <div class="event-countdown event-countdown--live" data-countdown="${targetISO}">
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="d">--</div><div class="event-countdown-label">Days</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="h">--</div><div class="event-countdown-label">Hrs</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="m">--</div><div class="event-countdown-label">Min</div></div>
      <div class="event-countdown-unit"><div class="event-countdown-value" data-unit="s">--</div><div class="event-countdown-label">Sec</div></div>
    </div>
  `;
}

grid.innerHTML = EVENTS_2026.map((e) => {
  const target = getNextOccurrenceUTC(e.recurring.weekday, e.recurring.hour, e.recurring.minute);
  return `
    <div class="event-card" id="event-${e.id}" data-recurring-weekday="${e.recurring.weekday}" data-recurring-hour="${e.recurring.hour}" data-recurring-minute="${e.recurring.minute}">
      <div class="event-date">${e.timeLabel}</div>
      <div class="event-title">${e.title}</div>
      <div class="event-desc">${e.desc}</div>
      ${renderCountdown(target.toISOString())}
    </div>
  `;
}).join("");

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  document.querySelectorAll("[data-countdown]").forEach((el) => {
    let target = new Date(el.dataset.countdown).getTime();
    const now = Date.now();
    let diff = target - now;

    // A recurring reminder whose moment just passed (e.g. someone left the
    // page open through 9 PM Tuesday) rolls straight to next week's
    // occurrence instead of freezing at 0 00 00 00.
    if (diff <= 0) {
      const card = el.closest(".event-card");
      if (card && card.dataset.recurringWeekday !== undefined) {
        const next = getNextOccurrenceUTC(
          Number(card.dataset.recurringWeekday),
          Number(card.dataset.recurringHour),
          Number(card.dataset.recurringMinute)
        );
        el.dataset.countdown = next.toISOString();
        target = next.getTime();
        diff = target - now;
      }
    }

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
