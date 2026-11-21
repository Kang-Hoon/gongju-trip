// "Find your Korean city" — quiz + result UI.
import { FQ, FDIMS, userProfile, matchPlaces, pickResults, seoulDistricts } from "./finder-core.js";
import { getLang, L, t } from "./i18n.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FDIM_LABEL = {
  history: { en: "history", ko: "역사" }, nature: { en: "nature", ko: "자연" }, food: { en: "food", ko: "음식" },
  cafe: { en: "cafés", ko: "카페" }, photo: { en: "photo spots", ko: "사진 명소" }, calm: { en: "peace and quiet", ko: "여유" },
  active: { en: "hiking & activities", ko: "걷기·액티비티" }, art: { en: "art & design", ko: "예술·디자인" }, sea: { en: "the sea", ko: "바다" }
};
const SEASON = { sp: { en: "spring", ko: "봄" }, su: { en: "summer", ko: "여름" }, au: { en: "autumn", ko: "가을" }, wi: { en: "winter", ko: "겨울" } };
const SEOUL_BADGE = { id: "seoul", icon: "tower", c: "#1F4E79" };

let DATA = null;
async function load() {
  if (!DATA) DATA = await (await fetch("data/places.json")).json();
  return DATA;
}

const fstate = { i: 0, answers: new Array(FQ.length).fill(null) };

// ---------------- Quiz ----------------
export function renderFinder(app, go) {
  load(); // warm the cache
  const i = fstate.i, Q = FQ[i];
  app.innerHTML = `
    <section class="panel">
      <div class="topbar">
        <button class="link" id="fback">${t("back")}</button>
        <div class="progress"><span style="width:${(i / FQ.length) * 100}%"></span></div>
        <div class="count">${i + 1} / ${FQ.length}</div>
      </div>
      <div class="qcard">
        <div class="qnum">${t("question")} ${i + 1}</div>
        <h2>${esc(L(Q.q))}</h2>
        <div class="options">
          ${Q.opts.map((o, k) => `<button class="opt ${fstate.answers[i] === k ? "selected" : ""}" data-k="${k}"><span class="emo">${o.e}</span><span>${esc(L(o.t))}</span></button>`).join("")}
        </div>
      </div>
    </section>`;
  document.getElementById("fback").onclick = () => { if (i === 0) go("#/"); else { fstate.i--; renderFinder(app, go); } };
  app.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
    fstate.answers[i] = Number(b.dataset.k);
    b.classList.add("selected");
    setTimeout(() => {
      if (i < FQ.length - 1) { fstate.i++; renderFinder(app, go); }
      else go("#/match?a=" + fstate.answers.join(""));
    }, 200);
  }));
}

export function resetFinder() { fstate.i = 0; fstate.answers = new Array(FQ.length).fill(null); }

// ---------------- Result ----------------
export async function renderMatch(app, query, go, startPlan) {
  const data = await load();
  const a = (query.get("a") || "").split("").map(Number);
  const answers = FQ.map((Q, i) => (Number.isInteger(a[i]) && a[i] < Q.opts.length ? a[i] : 0));
  fstate.answers = answers.slice();
  const prof = userProfile(answers);
  const ranked = matchPlaces(data.places, prof);
  const r = pickResults(ranked);
  const districtNames = Object.fromEntries((window.BADGES || []).filter((b) => b.r === "seoul").map((b) => [b.id, b]));

  const card = (res, slot) => {
    const p = res.place;
    const reasons = res.reasons.length
      ? res.reasons.map((d) => `<span class="tag">${esc(L(FDIM_LABEL[d]))}</span>`).join("")
      : "";
    const notes = [];
    if (res.notes.includes("far")) notes.push(t("noteFar", { h: p.hours_from_seoul }));
    if (res.notes.includes("short")) notes.push(t("noteShort", { d: p.days }));
    const seoulExtra = p.id === "seoul"
      ? `<p class="small-text">${t("seoulDistricts")} <b>${seoulDistricts(data.seoul_districts, prof).map((id) => esc(districtNames[id] ? (getLang() === "ko" ? districtNames[id].ko : districtNames[id].en) : id)).join(", ")}</b></p>`
      : "";
    return `
      <article class="match-card ${slot}">
        <div class="mc-head">
          <canvas width="16" height="16" data-badge="${p.id}"></canvas>
          <div>
            <div class="slot-label">${t("slot_" + slot)}</div>
            <h3>${esc(L(p.name))} <span class="pct">${res.score}%</span></h3>
          </div>
        </div>
        <p class="why">${esc(L(p.why))}</p>
        ${reasons ? `<div class="tags">${t("becauseYou")} ${reasons}</div>` : ""}
        <div class="facts-row">
          <span>🚆 ${p.hours_from_seoul ? t("fromSeoul", { h: p.hours_from_seoul }) : t("inSeoul")}</span>
          <span>🗓️ ${t("stayDays", { d: p.days })}</span>
          <span>${p.seasons.length === 4 ? "🌏 " + t("allYear") : "🌤️ " + p.seasons.map((s) => L(SEASON[s])).join(" · ")}</span>
        </div>
        <p class="hl"><b>${t("dontMiss")}</b> ${esc(L(p.highlights))}</p>
        ${seoulExtra}
        ${notes.map((n) => `<p class="note">⚠️ ${esc(n)}</p>`).join("")}
        <div class="row small">
          ${p.plan ? `<button class="btn sm" data-plan="${p.plan}">${t("planThis")}</button>` : `<span class="muted small-text">${t("planSoonShort")}</span>`}
          <a class="btn sm ghost" href="badges/" style="text-decoration:none">🏅 ${t("seeBadge")}</a>
        </div>
      </article>`;
  };

  app.innerHTML = `
    <section class="result-hero">
      <div class="eyebrow">${t("matchEyebrow")}</div>
      <h1>${esc(L(r.best.place.name))}</h1>
      <p>${t("matchSub", { pct: r.best.score })}</p>
    </section>
    <section class="block match-grid">
      ${card(r.best, "best")}
      ${card(r.second, "second")}
      ${card(r.gem, "gem")}
    </section>
    <section class="block">
      <h3>${t("moreMatches")}</h3>
      <div class="card more-list">${r.more.map((m) => `
        <div class="more-row"><canvas width="16" height="16" data-badge="${m.place.id}"></canvas>
          <span class="mname">${esc(L(m.place.name))}</span><span class="muted small-text">${esc(L(m.place.why))}</span><span class="pct">${m.score}%</span></div>`).join("")}
      </div>
    </section>
    <section class="share">
      <h3>${t("shareMatch")}</h3>
      <p class="muted">${t("shareMatchSub")}</p>
      <div class="row center">
        <button class="btn dark" id="mImg">🖼️ ${t("saveCard")}</button>
        <button class="btn ghost" id="mLink">${t("copyLink")}</button>
      </div>
    </section>
    <div class="center"><button class="btn ghost" id="mRetake">${t("retakeFinder")}</button></div>`;

  // pixel badges
  app.querySelectorAll("canvas[data-badge]").forEach((cv) => {
    const b = badgeFor(cv.dataset.badge);
    if (b && window.drawBadge) window.drawBadge(cv.getContext("2d"), b, 0, 0, 1, false);
  });

  app.querySelectorAll("[data-plan]").forEach((b) => (b.onclick = () => startPlan(b.dataset.plan, Math.min(3, prof.days === 1 ? 1 : prof.days === 3 ? 2 : 3))));
  document.getElementById("mRetake").onclick = () => { resetFinder(); go("#/find"); };
  document.getElementById("mLink").onclick = () => copyText(location.href);
  document.getElementById("mImg").onclick = () => saveCard(r);
}

function badgeFor(id) {
  if (id === "seoul") return SEOUL_BADGE;
  return (window.BADGES || []).find((b) => b.id === id);
}

function copyText(text) {
  const done = () => { const el = document.getElementById("toast"); el.textContent = t("copied"); el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1500); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fb());
  else fb();
  function fb() { const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ } ta.remove(); }
}

// 1080x1350 share card with the three cities as pixel badges
function saveCard(r) {
  const W = 1080, H = 1350;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const c = cv.getContext("2d");
  c.imageSmoothingEnabled = false;
  c.fillStyle = "#f7f1e6"; c.fillRect(0, 0, W, H);
  c.fillStyle = "#4a2f1d"; c.fillRect(0, 0, W, 330);
  const sans = '"Inter", "Noto Sans KR", sans-serif';
  c.fillStyle = "#c99a3b"; c.font = "600 30px " + sans; c.fillText(t("cardEyebrow"), 72, 110);
  c.fillStyle = "#fbefe0"; c.font = "700 76px " + sans; c.fillText(L(r.best.place.name), 72, 205);
  c.fillStyle = "#e8d6c1"; c.font = "400 32px " + sans; c.fillText(t("matchSub", { pct: r.best.score }).replace(/<[^>]+>/g, ""), 72, 262);

  [[r.best, "best"], [r.second, "second"], [r.gem, "gem"]].forEach(([res, slot], i) => {
    const y = 380 + i * 290;
    c.fillStyle = "#fffaf2"; c.strokeStyle = "#e6dccb"; c.lineWidth = 3;
    c.fillRect(60, y, W - 120, 250); c.strokeRect(60, y, W - 120, 250);
    const b = badgeFor(res.place.id);
    if (b) window.drawBadge(c, b, 90, y + 33, 184 / 16, false);
    c.fillStyle = "#b8402a"; c.font = "600 26px " + sans; c.fillText(t("slot_" + slot), 310, y + 70);
    c.fillStyle = "#2b2118"; c.font = "700 54px " + sans; c.fillText(L(res.place.name), 310, y + 135);
    c.fillStyle = "#7a6a58"; c.font = "400 28px " + sans;
    wrap(c, L(res.place.why), 310, y + 185, W - 120 - 280, 36, 2);
    c.fillStyle = "#4a2f1d"; c.font = "700 44px " + sans; c.textAlign = "right"; c.fillText(res.score + "%", W - 95, y + 135); c.textAlign = "left";
  });
  c.fillStyle = "#7a6a58"; c.font = "500 26px " + sans; c.textAlign = "center";
  c.fillText("kang-hoon.github.io/gongju-trip", W / 2, H - 50);

  cv.toBlob(async (blob) => {
    const file = new File([blob], "my-korea-city.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: t("cardEyebrow") }); return; } catch (e) { /* fall back to download */ }
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "my-korea-city.png";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }, "image/png");
}

function wrap(c, text, x, y, maxW, lh, maxLines) {
  const words = getLang() === "ko" ? text.split(/(?<=\s)/) : text.split(" ");
  let line = "", n = 0;
  for (const w of words) {
    const test = line + (getLang() === "ko" ? w : (line ? " " : "") + w);
    if (c.measureText(test).width > maxW && line) {
      c.fillText(line.trim(), x, y + n * lh); n++; line = getLang() === "ko" ? w : w;
      if (n >= maxLines) return;
    } else line = test;
  }
  if (n < maxLines) c.fillText(line.trim(), x, y + n * lh);
}
