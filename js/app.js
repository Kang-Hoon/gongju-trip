import { CITIES, DIMS, DIM_LABELS, ORIGINS } from "./data.js";
import { QUESTIONS } from "./quiz.js";
import { buildPlan, cityById, cityMatches, computeProfile, persona, toHHMM, toMin } from "./planner.js";
import { getLang, L, setLang, t } from "./i18n.js";
import { myVote, online, submitSurvey, voteCounts, voteTheme } from "./store.js";

// ---------------- State ----------------
const DEFAULTS = { name: "", cityId: "auto", days: 1, date: "", start: "10:00", end: "19:00", origin: "daejeon", mode: "car" };
const state = {
  settings: { ...DEFAULTS },
  answers: new Array(QUESTIONS.length).fill(null),
  qIndex: 0,
  exclude: new Set(),
  counts: {},
  activeDay: 0
};

const app = document.getElementById("app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Preset from ?name=...&city=...
(function presets() {
  const qs = new URLSearchParams(location.search);
  if (qs.get("name")) state.settings.name = qs.get("name").slice(0, 30);
  if (qs.get("city") && cityById(qs.get("city"))) state.settings.cityId = qs.get("city");
})();

// ---------------- Router ----------------
function route() {
  const hash = location.hash || "#/";
  const [path, query] = hash.slice(1).split("?");
  document.documentElement.lang = getLang();
  renderHeader();
  if (path === "/setup") return renderSetup();
  if (path === "/quiz") return renderQuiz();
  if (path === "/plan") return renderPlan(new URLSearchParams(query || ""));
  return renderHome();
}
window.addEventListener("hashchange", route);
const go = (h) => { if (location.hash === h) route(); else location.hash = h; window.scrollTo({ top: 0 }); };

function renderHeader() {
  const el = document.getElementById("header");
  el.innerHTML = `
    <a class="logo" href="#/">🧭 <span>${t("brand")}</span></a>
    <div class="lang" role="group" aria-label="Language">
      <button data-l="en" class="${getLang() === "en" ? "on" : ""}">EN</button>
      <button data-l="ko" class="${getLang() === "ko" ? "on" : ""}">한국어</button>
    </div>`;
  el.querySelectorAll("[data-l]").forEach((b) => b.addEventListener("click", () => { setLang(b.dataset.l); route(); }));
  document.getElementById("footer").textContent = t("footer");
}

// ---------------- Home ----------------
async function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">${t("heroEyebrow")}</div>
      <h1>${t("heroTitle")}</h1>
      <p class="lead">${t("heroSub")}</p>
      <div class="row">
        <button class="btn" id="start">${t("startPlanning")}</button>
        <button class="btn ghost" id="quizFirst">${t("notSure")}</button>
      </div>
    </section>
    <h2 class="section-title">${t("cities")}</h2>
    <div class="city-grid" id="cityGrid">${CITIES.map(cityCard).join("")}</div>`;

  document.getElementById("start").onclick = () => go("#/setup");
  document.getElementById("quizFirst").onclick = () => { state.settings.cityId = "auto"; go("#/setup"); };
  bindCityCards();

  state.counts = await voteCounts();
  CITIES.forEach((c) => {
    const el = document.querySelector(`[data-top="${c.id}"]`);
    if (el) el.innerHTML = topThemeLine(c);
  });
}

function cityCard(c) {
  return `
    <article class="city-card">
      <div class="city-emoji">${c.emoji}</div>
      <h3>${esc(L(c.name))}</h3>
      <p>${esc(L(c.tagline))}</p>
      <div class="top-theme" data-top="${c.id}">${topThemeLine(c)}</div>
      <div class="row small">
        <button class="btn sm" data-plan="${c.id}">${t("startPlanning")}</button>
        <button class="btn sm ghost" data-vote="${c.id}">🗳️ ${t("voteTheme")}</button>
      </div>
      <div class="vote-slot" id="vote-${c.id}"></div>
    </article>`;
}

function topThemeLine(c) {
  const counts = state.counts[c.id];
  if (!counts || !Object.keys(counts).length) return `<span class="muted">${t("noVotes")}</span>`;
  const [id, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const th = c.themes.find((x) => x.id === id);
  return `${t("communityTheme")} <b>${esc(th ? L(th) : id)}</b> <span class="muted">(${n} ${t("votes")})</span>`;
}

function bindCityCards() {
  document.querySelectorAll("[data-plan]").forEach((b) => (b.onclick = () => { state.settings.cityId = b.dataset.plan; go("#/setup"); }));
  document.querySelectorAll("[data-vote]").forEach((b) => (b.onclick = () => {
    const slot = document.getElementById("vote-" + b.dataset.vote);
    if (slot.innerHTML) { slot.innerHTML = ""; return; }
    renderVote(slot, cityById(b.dataset.vote));
  }));
}

// ---------------- Theme vote widget ----------------
function renderVote(slot, city) {
  const mine = myVote(city.id);
  const counts = state.counts[city.id] || {};
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  slot.innerHTML = `
    <div class="vote">
      <h4>${esc(t("voteTitle", { city: L(city.name) }))}</h4>
      <p class="muted">${t("voteSub")} ${online ? "" : t("localOnly")}</p>
      <div class="vote-opts">
        ${city.themes.map((th) => {
          const n = counts[th.id] || 0;
          const pct = total ? Math.round((n / total) * 100) : 0;
          return `<button class="vote-opt ${mine === th.id ? "on" : ""}" data-th="${th.id}" ${mine ? "disabled" : ""}>
            <span class="vbar" style="width:${mine ? pct : 0}%"></span>
            <span class="vtxt">${esc(L(th))}</span>
            ${mine ? `<span class="vnum">${pct}%</span>` : ""}
          </button>`;
        }).join("")}
      </div>
      ${mine ? `<p class="ok">✓ ${t("voted")}</p>` : ""}
    </div>`;
  slot.querySelectorAll("[data-th]").forEach((b) => (b.onclick = async () => {
    slot.querySelectorAll("button").forEach((x) => (x.disabled = true));
    await voteTheme(city.id, b.dataset.th, getLang());
    state.counts = await voteCounts();
    if (online) {
      // make sure our own vote shows even if the view is cached
      const c = (state.counts[city.id] ||= {});
      if (!c[b.dataset.th]) c[b.dataset.th] = 1;
    }
    renderVote(slot, city);
    const top = document.querySelector(`[data-top="${city.id}"]`);
    if (top) top.innerHTML = topThemeLine(city);
  }));
}

// ---------------- Setup ----------------
function renderSetup() {
  const s = state.settings;
  const opt = (v, label, cur) => `<option value="${v}" ${String(cur) === String(v) ? "selected" : ""}>${esc(label)}</option>`;
  const seg = (name, items, cur) => `<div class="seg" data-seg="${name}">${items.map(([v, label]) =>
    `<button type="button" data-v="${v}" class="${String(cur) === String(v) ? "on" : ""}">${esc(label)}</button>`).join("")}</div>`;
  const times = [];
  for (let m = 6 * 60; m <= 23 * 60; m += 30) times.push(toHHMM(m));

  app.innerHTML = `
    <section class="panel">
      <button class="link" id="back">${t("back")}</button>
      <h2>${t("setupTitle")}</h2>
      <form id="setup" class="form">
        <label>${t("forWho")}<input name="name" maxlength="30" value="${esc(s.name)}" placeholder="${esc(t("forWhoPh"))}"></label>
        <label>${t("city")}
          <select name="cityId">
            ${opt("auto", "✨ " + t("anyCity"), s.cityId)}
            ${CITIES.map((c) => opt(c.id, c.emoji + " " + L(c.name), s.cityId)).join("")}
          </select>
        </label>
        <div class="field"><span>${t("length")}</span>${seg("days", [[1, t("dayTrip")], [2, t("n1")], [3, t("n2")]], s.days)}</div>
        <div class="two">
          <label>${t("startTime")}<select name="start">${times.map((x) => opt(x, x, s.start)).join("")}</select></label>
          <label>${t("endTime")}<select name="end">${times.map((x) => opt(x, x, s.end)).join("")}</select></label>
        </div>
        <label>${t("date")}<input type="date" name="date" value="${esc(s.date)}"></label>
        <div class="field"><span>${t("origin")}</span>${seg("origin", Object.entries(ORIGINS).map(([k, v]) => [k, L(v)]), s.origin)}</div>
        <div class="field"><span>${t("transport")}</span>${seg("mode", [["car", "🚗 " + t("car")], ["transit", "🚌 " + t("transit")]], s.mode)}</div>
        <p class="error" id="err" hidden></p>
        <button class="btn" type="submit">${t("next")}</button>
      </form>
    </section>`;

  document.getElementById("back").onclick = () => go("#/");
  app.querySelectorAll("[data-seg]").forEach((g) => g.querySelectorAll("button").forEach((b) => (b.onclick = () => {
    g.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
  })));
  document.getElementById("setup").onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const segVal = (n) => app.querySelector(`[data-seg="${n}"] .on`).dataset.v;
    const next = {
      name: String(f.get("name") || "").trim().slice(0, 30),
      cityId: f.get("cityId"),
      days: Number(segVal("days")),
      start: f.get("start"),
      end: f.get("end"),
      date: f.get("date") || "",
      origin: segVal("origin"),
      mode: segVal("mode")
    };
    if (toMin(next.end) - toMin(next.start) < 180) {
      const err = document.getElementById("err"); err.textContent = t("timeError"); err.hidden = false; return;
    }
    state.settings = next;
    state.qIndex = 0;
    go("#/quiz");
  };
}

// ---------------- Quiz ----------------
function renderQuiz() {
  const i = state.qIndex;
  const Q = QUESTIONS[i];
  app.innerHTML = `
    <section class="panel">
      <div class="topbar">
        <button class="link" id="qback">${t("back")}</button>
        <div class="progress"><span style="width:${(i / QUESTIONS.length) * 100}%"></span></div>
        <div class="count">${i + 1} / ${QUESTIONS.length}</div>
      </div>
      <div class="qcard">
        <div class="qnum">${t("question")} ${i + 1}</div>
        <h2>${esc(L(Q.q))}</h2>
        <div class="options">
          ${Q.opts.map((o, k) => `<button class="opt ${state.answers[i] === k ? "selected" : ""}" data-k="${k}">
            <span class="emo">${o.e}</span><span>${esc(L(o.t))}</span></button>`).join("")}
        </div>
      </div>
    </section>`;
  document.getElementById("qback").onclick = () => {
    if (i === 0) go("#/setup"); else { state.qIndex--; renderQuiz(); }
  };
  app.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
    state.answers[i] = Number(b.dataset.k);
    b.classList.add("selected");
    setTimeout(() => {
      if (i < QUESTIONS.length - 1) { state.qIndex++; renderQuiz(); }
      else finishQuiz();
    }, 200);
  }));
}

function finishQuiz() {
  const profile = computeProfile(state.answers);
  let cityId = state.settings.cityId;
  if (cityId === "auto") cityId = cityMatches(profile.pct)[0].city.id;
  state.exclude = new Set();
  go("#/plan?" + encodePlan({ ...state.settings, cityId }, state.answers, state.exclude).toString());
}

// ---------------- Plan encoding ----------------
function encodePlan(s, answers, exclude) {
  const p = new URLSearchParams();
  p.set("c", s.cityId); p.set("n", s.days); p.set("s", s.start); p.set("e", s.end);
  p.set("o", s.origin); p.set("m", s.mode);
  if (s.date) p.set("dt", s.date);
  if (s.name) p.set("for", s.name);
  p.set("a", answers.map((x) => (x == null ? "x" : x)).join(""));
  if (exclude.size) p.set("x", [...exclude].join(","));
  return p;
}

function decodePlan(q) {
  const cityId = cityById(q.get("c")) ? q.get("c") : "gongju";
  const days = Math.min(3, Math.max(1, Number(q.get("n")) || 1));
  const valid = (x, d) => (/^\d{2}:\d{2}$/.test(x || "") ? x : d);
  const s = {
    cityId, days,
    start: valid(q.get("s"), "10:00"), end: valid(q.get("e"), "19:00"),
    origin: ORIGINS[q.get("o")] ? q.get("o") : "daejeon",
    mode: q.get("m") === "transit" ? "transit" : "car",
    date: /^\d{4}-\d{2}-\d{2}$/.test(q.get("dt") || "") ? q.get("dt") : "",
    name: (q.get("for") || "").slice(0, 30)
  };
  const a = (q.get("a") || "").split("").map((c) => (c === "x" ? null : Number(c)));
  const answers = QUESTIONS.map((Q, i) => (Number.isInteger(a[i]) && a[i] < Q.opts.length ? a[i] : null));
  const exclude = new Set((q.get("x") || "").split(",").filter(Boolean));
  return { s, answers, exclude };
}

// ---------------- Plan view ----------------
function renderPlan(q) {
  const { s, answers, exclude } = decodePlan(q);
  state.settings = { ...s };
  state.answers = answers;
  state.exclude = exclude;
  const profile = computeProfile(answers);
  const plan = buildPlan({ ...s, exclude }, profile);
  const city = cityById(s.cityId);
  const P = persona(profile.pct);
  const matches = cityMatches(profile.pct).slice(0, 3);
  if (state.activeDay >= plan.days.length) state.activeDay = 0;
  const who = s.name ? esc(s.name) + (getLang() === "ko" ? "님의 " : "'s ") : "";

  const bars = Object.entries(profile.pct).sort((a, b) => b[1] - a[1]).map(([d, v]) =>
    `<div class="bar"><span>${esc(L(DIM_LABELS[d]))}</span><div class="track"><div class="fill" style="--w:${v}%"></div></div><span class="pct">${v}</span></div>`).join("");

  const dayTabs = plan.days.length > 1 ? `<div class="tabs">${plan.days.map((d, i) =>
    `<button data-day="${i}" class="${i === state.activeDay ? "on" : ""}">${t("day")} ${i + 1}${d.city.id !== city.id ? " · " + esc(L(d.city.name)) : ""}</button>`).join("")}</div>` : "";

  const dateNote = s.date
    ? `${t("closedNote")} ${esc(s.date)} (${t("weekday")[new Date(s.date + "T12:00:00").getDay()]})`
    : t("noDateNote");

  app.innerHTML = `
    <section class="result-hero">
      <div class="eyebrow">${who}${t("travelType")}</div>
      <h1>${esc(L(P.main))}</h1>
      <p>${t("withSide")} <b>${esc(L(DIM_LABELS[P.second]))}</b></p>
      <div class="chips">
        <span>${city.emoji} ${esc(L(city.name))}</span>
        <span>${s.days === 1 ? t("dayTrip") : s.days === 2 ? t("n1") : t("n2")}</span>
        <span>🕘 ${s.start}–${s.end}</span>
        <span>${s.mode === "car" ? "🚗 " + t("car") : "🚌 " + t("transit")}</span>
      </div>
    </section>

    <section class="block">
      <h3>${t("yourPlan")}</h3>
      <p class="muted small-text">${dateNote}</p>
      ${dayTabs}
      <div class="card"><ol class="timeline" id="timeline">${renderDay(plan.days[state.activeDay], s, plan)}</ol></div>
      ${exclude.size ? `<button class="link" id="restore">${t("restoreAll")} (${exclude.size})</button>` : ""}
    </section>

    <section class="block two-col">
      <div>
        <h3>${t("tasteProfile")}</h3>
        <div class="card"><div class="bars">${bars}</div></div>
      </div>
      <div>
        <h3>${t("bestMatch")}</h3>
        <div class="card matches">${matches.map((m, i) => `
          <div class="match">
            <span class="rank">${i + 1}</span>
            <span class="memo">${m.city.emoji}</span>
            <span class="mname">${esc(L(m.city.name))}</span>
            ${m.city.id === city.id ? `<span class="tag">✓</span>` : `<button class="btn sm ghost" data-switch="${m.city.id}">${t("switchCity")}</button>`}
          </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="block">
      <h3>${t("thingsToEat")}</h3>
      <div class="food-grid">${foods(plan, profile).map((m) =>
        `<div class="food"><b>${esc(L(m))}</b><span>${"🌶️".repeat(m.spice) || "🥢"}</span></div>`).join("")}</div>
    </section>

    <section class="block">
      <h3>${t("goodToKnow")}</h3>
      <div class="card"><ul class="tips">
        ${[...new Set(plan.days.map((d) => d.city))].flatMap((c) => L(c.tips)).map((x) => `<li>${esc(x)}</li>`).join("")}
        <li class="muted">${t("hoursDisclaimer")}</li>
      </ul></div>
    </section>

    <section class="share">
      <h3>${t("share")}</h3>
      <p class="muted">${t("shareSub")}</p>
      <div class="row center">
        <button class="btn dark" id="shareBtn">${t("shareBtn")}</button>
        <button class="btn ghost" id="copyLink">${t("copyLink")}</button>
        <button class="btn ghost" id="copyText">${t("copyText")}</button>
      </div>
    </section>

    <section class="block" id="voteBlock"></section>
    <section class="block" id="surveyBlock"></section>

    <div class="center"><button class="btn ghost" id="restart">${t("retake")}</button></div>`;

  // interactions
  app.querySelectorAll("[data-day]").forEach((b) => (b.onclick = () => { state.activeDay = Number(b.dataset.day); renderPlan(q); }));
  app.querySelectorAll("[data-remove]").forEach((b) => (b.onclick = () => {
    exclude.add(b.dataset.remove);
    history.replaceState(null, "", "#/plan?" + encodePlan(s, answers, exclude).toString());
    renderPlan(new URLSearchParams(location.hash.split("?")[1]));
  }));
  const restore = document.getElementById("restore");
  if (restore) restore.onclick = () => {
    history.replaceState(null, "", "#/plan?" + encodePlan(s, answers, new Set()).toString());
    renderPlan(new URLSearchParams(location.hash.split("?")[1]));
  };
  app.querySelectorAll("[data-switch]").forEach((b) => (b.onclick = () => {
    state.activeDay = 0;
    go("#/plan?" + encodePlan({ ...s, cityId: b.dataset.switch }, answers, new Set()).toString());
  }));
  document.getElementById("restart").onclick = () => {
    state.answers = new Array(QUESTIONS.length).fill(null); state.qIndex = 0; state.activeDay = 0;
    go("#/");
  };

  const url = location.href;
  const text = planText(plan, s, P);
  document.getElementById("copyLink").onclick = () => copy(url);
  document.getElementById("copyText").onclick = () => copy(text + "\n\n" + url);
  document.getElementById("shareBtn").onclick = async () => {
    if (navigator.share) { try { await navigator.share({ title: t("brand"), text, url }); } catch (e) { /* cancelled */ } }
    else copy(text + "\n\n" + url);
  };

  voteCounts().then((c) => { state.counts = c; renderVote(document.getElementById("voteBlock"), city); });
  renderSurvey(document.getElementById("surveyBlock"), s, profile);
}

function renderDay(day, s, plan) {
  return day.items.map((it) => {
    let title = "", sub = "", cls = it.type, remove = "";
    const mins = `${t("approx")} ${it.dur} ${t("min")}`;
    switch (it.type) {
      case "travel":
        title = it.key === "dayTrip" ? `${t("dayTripTo")} ${L(cityById(it.city).name)}` : `${t("travelTo")} ${L(cityById(it.city).name)}`;
        sub = (it.origin ? L(ORIGINS[it.origin]) + " → " : "") + mins + (s.mode === "car" ? " 🚗" : " 🚌");
        break;
      case "move": title = t("moveNext"); sub = mins; break;
      case "spot":
        title = L(it.spot.name);
        sub = L(it.spot.desc) + ` · ${it.dur} ${t("min")}`;
        if (it.spot.best === "sunset" && Math.abs(it.time + it.dur - plan.sunset) < 60) sub += " · 🌇";
        remove = `<button class="x" data-remove="${it.spot.id}" title="${esc(t("removeStop"))}" aria-label="${esc(t("removeStop"))}">✕</button>`;
        break;
      case "meal": title = `${it.kind === "lunch" ? "🍚 " + t("lunch") : "🍽️ " + t("dinner")}: ${L(it.meal)}`; sub = "spice " + ("🌶️".repeat(it.meal.spice) || "0"); break;
      case "free": title = "☕ " + t("freeTime"); sub = t("freeTimeSub"); break;
      case "home": title = `${t("goHome")} ${L(ORIGINS[it.origin])}`; sub = `${mins} · ${t("arrive")} ${toHHMM(it.time + it.dur)}`; break;
      case "stay": title = "🛏️ " + t("stayNight"); sub = ""; break;
    }
    if (it.type === "meal") sub = "";
    return `<li class="stop ${cls}"><span class="time">${toHHMM(it.time)}</span><span class="dot"></span>
      <span class="what"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}</span>${remove}</li>`;
  }).join("");
}

function foods(plan, profile) {
  const seen = new Set();
  const out = [];
  plan.days.forEach((d) => d.city.meals.forEach((m) => {
    if (m.spice > profile.spice + 1 || seen.has(m.en)) return;
    seen.add(m.en); out.push(m);
  }));
  return out.slice(0, 6);
}

function planText(plan, s, P) {
  const lines = [`🧭 ${t("brand")} — ${L(cityById(s.cityId).name)}${s.name ? " · " + s.name : ""}`, `${L(P.main)}`];
  plan.days.forEach((d, i) => {
    lines.push("", `${t("day")} ${i + 1} · ${L(d.city.name)}`);
    d.items.forEach((it) => {
      const name = it.type === "spot" ? L(it.spot.name) : it.type === "meal" ? (it.kind === "lunch" ? t("lunch") : t("dinner")) + ": " + L(it.meal)
        : it.type === "free" ? t("freeTime") : it.type === "home" ? t("goHome") + " " + L(ORIGINS[it.origin])
        : it.type === "travel" ? t("travelTo") + " " + L(cityById(it.city).name) : it.type === "stay" ? t("stayNight") : null;
      if (name) lines.push(`${toHHMM(it.time)}  ${name}`);
    });
  });
  return lines.join("\n");
}

// ---------------- Survey ----------------
function renderSurvey(slot, s, profile) {
  const pills = (name, items) => `<div class="seg" data-seg="${name}">${items.map(([v, l]) => `<button type="button" data-v="${v}">${esc(l)}</button>`).join("")}</div>`;
  slot.innerHTML = `
    <div class="survey">
      <h3>${t("surveyTitle")}</h3>
      <form id="survey" class="form">
        <div class="field"><span>${t("rating")}</span>
          <div class="stars" data-seg="rating">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-v="${n}" aria-label="${n}">★</button>`).join("")}</div></div>
        <div class="field"><span>${t("realistic")}</span>${pills("realistic", [["yes", t("yes")], ["somewhat", t("somewhat")], ["no", t("no")]])}</div>
        <div class="field"><span>${t("wouldUse")}</span>${pills("would_use", [["yes", t("yes")], ["maybe", t("maybe")], ["no", t("no")]])}</div>
        <label>${t("nextCity")}<input name="next_city" maxlength="80" placeholder="${esc(t("nextCityPh"))}"></label>
        <label>${t("comment")}<textarea name="comment" maxlength="1000" rows="3"></textarea></label>
        <button class="btn" type="submit">${t("submit")}</button>
        <p class="ok" id="sMsg" hidden></p>
      </form>
    </div>`;

  slot.querySelectorAll("[data-seg]").forEach((g) => g.querySelectorAll("button").forEach((b) => (b.onclick = () => {
    g.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
    if (g.dataset.seg === "rating") g.querySelectorAll("button").forEach((x) => x.classList.toggle("on", Number(x.dataset.v) <= Number(b.dataset.v)));
    else b.classList.add("on");
    g.dataset.val = b.dataset.v;
  })));

  slot.querySelector("#survey").onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const val = (n) => slot.querySelector(`[data-seg="${n}"]`).dataset.val || null;
    const btn = e.target.querySelector("button[type=submit]");
    btn.disabled = true;
    const res = await submitSurvey({
      city_id: s.cityId,
      rating: val("rating") ? Number(val("rating")) : null,
      realistic: val("realistic"),
      would_use: val("would_use"),
      next_city: String(f.get("next_city") || "").slice(0, 80) || null,
      comment: String(f.get("comment") || "").slice(0, 1000) || null,
      lang: getLang(),
      settings: { days: s.days, start: s.start, end: s.end, mode: s.mode, origin: s.origin, date: s.date || null },
      profile: profile.pct
    });
    const msg = slot.querySelector("#sMsg");
    msg.hidden = false;
    if (res.ok) { msg.textContent = "✓ " + t("thanks"); e.target.querySelectorAll("input,textarea,button").forEach((x) => (x.disabled = true)); }
    else { msg.textContent = t("sendFail"); msg.classList.add("error"); btn.disabled = false; }
  };
}

// ---------------- Utils ----------------
function copy(text) {
  const done = () => { const el = document.getElementById("toast"); el.textContent = t("copied"); el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1500); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
  else fallback(text, done);
}
function fallback(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
  ta.remove();
}

route();
