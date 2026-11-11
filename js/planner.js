import { CITIES, DIMS, SUNSET } from "./data.js";
import { QUESTIONS } from "./quiz.js";

export const cityById = (id) => CITIES.find((c) => c.id === id);

export const toMin = (hhmm) => {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + (m || 0);
};
export const toHHMM = (min) => {
  const m = Math.max(0, Math.round(min));
  return String(Math.floor(m / 60) % 24).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
};

// ---- Profile from quiz answers ----
export function computeProfile(answers) {
  const score = Object.fromEntries(DIMS.map((d) => [d, 0]));
  const max = Object.fromEntries(DIMS.map((d) => [d, 0]));
  const keys = { walk: "mid", spice: 1, pace: "mid" };
  QUESTIONS.forEach((Q, i) => {
    DIMS.forEach((d) => (max[d] += Math.max(0, ...Q.opts.map((o) => (o.s && o.s[d]) || 0))));
    const o = Q.opts[answers[i]];
    if (!o) return;
    Object.entries(o.s || {}).forEach(([d, v]) => (score[d] += v));
    if (Q.key) keys[Q.key] = o.v;
  });
  const pct = Object.fromEntries(DIMS.map((d) => [d, max[d] ? Math.round((score[d] / max[d]) * 100) : 0]));
  return { pct, ...keys };
}

// ---- Scoring ----
function tasteScore(spot, pct) {
  let s = 0, w = 0;
  Object.entries(spot.tags).forEach(([d, v]) => { s += v * (pct[d] || 0); w += v; });
  // normalise a bit so many-tag spots don't always win, but keep some breadth bonus
  return w ? s / Math.sqrt(w) / 10 : 0;
}

function travelTime(city, a, b, mode) {
  if (!a || !b) return 0;
  if (a === b) return mode === "transit" ? 15 : 10;
  const t = city.areaTime[a + "-" + b] || city.areaTime[b + "-" + a] || 20;
  return mode === "transit" ? Math.round(t * 1.6 + 5) : t;
}

function durFor(spot, profile) {
  let d = spot.dur;
  if (profile.pace === "fast") d *= 0.85;
  if (profile.pace === "slow") d *= 1.2;
  if (profile.walk === "low" && spot.tags.active >= 2) d *= 0.75; // short section only
  return Math.round(d / 5) * 5;
}

// ---- Planner ----
// opts: { cityId, days, start, end, origin, mode, date (YYYY-MM-DD|null), exclude: Set }
export function buildPlan(opts, profile) {
  const main = cityById(opts.cityId);
  const used = new Set(opts.exclude || []);
  const usedMeals = new Set();
  const month = opts.date ? new Date(opts.date + "T12:00:00").getMonth() : new Date().getMonth();
  const sunset = toMin(SUNSET[month]);
  const startMin = toMin(opts.start);
  const endMin = toMin(opts.end);
  const modeIdx = opts.mode === "transit" ? 1 : 0;
  const days = [];
  // spread the main city's spots across a multi-day trip instead of front-loading day 1
  const perDayCap = opts.days > 1 ? Math.max(3, Math.ceil(main.spots.length / opts.days)) : Infinity;

  for (let d = 0; d < opts.days; d++) {
    const weekday = opts.date ? (new Date(opts.date + "T12:00:00").getDay() + d) % 7 : null;

    // choose city for the day: stay in main city unless it's running out of good spots
    let city = main;
    if (d > 0) {
      const left = main.spots.filter((s) => !used.has(s.id) && (weekday === null || !s.closed.includes(weekday)));
      if (left.length < 3) {
        const alt = main.nearby.map(cityById).find((c) => c && !days.some((x) => x.city.id === c.id));
        if (alt) city = alt;
      }
    }

    const items = [];
    let t = startMin;
    let area = null;

    // travel at the start of the day
    if (d === 0 && opts.origin !== "local" && opts.origin !== main.id) {
      const travel = main.from[opts.origin] ? main.from[opts.origin][modeIdx] : 0;
      if (travel > 0) {
        items.push({ type: "travel", time: t, dur: travel, key: "travelTo", city: main.id, origin: opts.origin });
        t += travel;
      }
    }
    if (city.id !== main.id) {
      const tt = cityTravel(main.id, city.id)[modeIdx];
      items.push({ type: "travel", time: t, dur: tt, key: "dayTrip", city: city.id });
      t += tt;
    }

    // last day: leave time for going home
    let dayEnd = endMin;
    const goingHome = d === opts.days - 1 && opts.origin !== "local" && opts.origin !== main.id;
    const homeTravel = goingHome ? (city.from[opts.origin] || [0, 0])[modeIdx] : 0;

    let lunch = t > toMin("13:45");
    let dinner = false;
    let guard = 0;

    while (t < dayEnd - 25 && guard++ < 40) {
      // meals
      if (!lunch && t >= toMin("11:40")) {
        items.push(mealItem(city, t, area, profile, usedMeals, "lunch"));
        t += 60; lunch = true; continue;
      }
      if (!dinner && t >= toMin("17:30") && dayEnd - t >= 45) {
        const dm = mealItem(city, t, area, profile, usedMeals, "dinner");
        dm.dur = Math.min(70, dayEnd - t);
        items.push(dm);
        t += dm.dur; dinner = true; continue;
      }

      // candidate spots
      const limit = (!lunch && t < toMin("11:40")) ? Math.min(dayEnd, toMin("12:40")) : dayEnd;
      const cands = city.spots.filter((s) => {
        if (used.has(s.id)) return false;
        if (weekday !== null && s.closed.includes(weekday)) return false;
        const tr = travelTime(city, area, s.area, opts.mode);
        const st = Math.max(t + tr, toMin(s.open));
        const du = durFor(s, profile);
        return st + du <= Math.min(toMin(s.close), limit + 20) && st - (t + tr) <= 60;
      });

      const spotsToday = items.filter((x) => x.type === "spot").length;
      if (!cands.length || spotsToday >= perDayCap) {
        // nothing fits: café / free time
        const gap = Math.min(45, dayEnd - t);
        if (gap < 20) break;
        items.push({ type: "free", time: t, dur: gap, area, slow: profile.pace === "slow" });
        t += gap;
        continue;
      }

      const scored = cands.map((s) => {
        const tr = travelTime(city, area, s.area, opts.mode);
        const st = Math.max(t + tr, toMin(s.open));
        let sc = tasteScore(s, profile.pct);
        sc -= tr * 0.25;
        if (s.best === "sunset") sc += st >= sunset - 110 && st <= sunset - 10 ? 14 : -10;
        if (s.best === "night") sc += st >= sunset ? 12 : -14;
        if (s.best === "morning") sc += st <= toMin("11:30") ? 6 : 0;
        // don't burn a far-away area late in the day
        if (area && s.area !== area && dayEnd - st < 120) sc -= 6;
        return { s, sc, st, tr };
      }).sort((a, b) => b.sc - a.sc);

      const pick = scored[0];
      if (pick.tr > 10) items.push({ type: "move", time: t, dur: pick.tr });
      const du = durFor(pick.s, profile);
      items.push({ type: "spot", time: pick.st, dur: du, spot: pick.s, city: city.id });
      used.add(pick.s.id);
      area = pick.s.area;
      t = pick.st + du + (profile.pace === "slow" ? 15 : profile.pace === "fast" ? 0 : 5);

      // slow pace: café break after every two spots in the afternoon
      if (profile.pace === "slow" && t > toMin("14:30") && t < toMin("16:30") && !items.some((x) => x.type === "free")) {
        items.push({ type: "free", time: t, dur: 40, area, slow: true });
        t += 40;
      }
    }

    if (goingHome && homeTravel > 0) {
      items.push({ type: "home", time: t, dur: homeTravel, origin: opts.origin });
    } else if (d < opts.days - 1) {
      items.push({ type: "stay", time: t, city: city.id });
    }

    // merge back-to-back free-time blocks
    const merged = [];
    items.forEach((it) => {
      const prev = merged[merged.length - 1];
      if (prev && prev.type === "free" && it.type === "free") prev.dur += it.dur;
      else merged.push(it);
    });
    days.push({ city, items: merged, weekday });
  }
  return { days, sunset };
}

// Approximate minutes between cities: [car, public transport]
const CITY_LINKS = {
  "gongju-buyeo": [40, 60],
  "gongju-sejong": [30, 45],
  "sejong-cheongju": [35, 50]
};
function cityTravel(a, b) {
  if (a === "daejeon") return cityById(b).from.daejeon;
  if (b === "daejeon") return cityById(a).from.daejeon;
  return CITY_LINKS[a + "-" + b] || CITY_LINKS[b + "-" + a] || [60, 90];
}

function mealItem(city, t, area, profile, usedMeals, kind) {
  const options = city.meals
    .filter((m) => !usedMeals.has(m.en))
    .map((m) => {
      let sc = 0;
      if (m.spice > profile.spice) sc -= 10 * (m.spice - profile.spice);
      if (area && m.area === area) sc += 4;
      if (kind === "lunch" && m.area === "C" && area !== "C") sc -= 6;
      return { m, sc };
    })
    .sort((a, b) => b.sc - a.sc);
  const meal = (options[0] || { m: city.meals[0] }).m;
  usedMeals.add(meal.en);
  return { type: "meal", kind, time: t, dur: kind === "lunch" ? 60 : 70, meal };
}

// ---- Persona ----
export function persona(pct) {
  const top = Object.entries(pct).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  const names = {
    history: { en: "Time Traveller", ko: "시간 여행자" },
    nature: { en: "Forest Wanderer", ko: "숲길 산책가" },
    food: { en: "Snack Hunter", ko: "먹방 탐험가" },
    cafe: { en: "Café Drifter", ko: "카페 유랑자" },
    photo: { en: "Golden-Hour Shooter", ko: "노을 사진가" },
    calm: { en: "Quiet Wanderer", ko: "느린 여행자" },
    active: { en: "Trail Walker", ko: "뚜벅이 탐험가" },
    art: { en: "Gallery Hopper", ko: "갤러리 순례자" }
  };
  return { main: names[top[0]], second: top[1] };
}

// ---- City match: which city fits the profile best ----
export function cityMatches(pct) {
  return CITIES.map((c) => {
    const scores = c.spots.map((s) => tasteScore(s, pct)).sort((a, b) => b - a);
    const top = scores.slice(0, 5);
    return { city: c, score: top.reduce((a, b) => a + b, 0) / top.length };
  }).sort((a, b) => b.score - a.score);
}
