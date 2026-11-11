import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

export const online = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const headers = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: "Bearer " + SUPABASE_ANON_KEY,
  "Content-Type": "application/json"
});

// ---- tiny localStorage wrapper (storage can throw in some browsers) ----
export const local = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }
};

// Anonymous visitor id so one browser counts as one voter per city
export function visitorId() {
  let id = local.get("kt_vid", null);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
    local.set("kt_vid", id);
  }
  return id;
}

async function insert(table, row) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + table, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify(row)
  });
  // 409 = this visitor already voted for this city (unique index) — treat as success
  if (!res.ok && res.status !== 409) throw new Error(table + " insert failed: " + res.status);
}

// ---- Theme votes ----
export async function voteTheme(cityId, themeId, lang) {
  const mine = local.get("kt_votes", {});
  mine[cityId] = themeId;
  local.set("kt_votes", mine);
  if (!online) return { ok: true, local: true };
  try {
    await insert("theme_votes", { city_id: cityId, theme_id: themeId, lang, visitor_id: visitorId() });
    return { ok: true };
  } catch (e) {
    console.warn(e);
    return { ok: false };
  }
}

export function myVote(cityId) {
  return local.get("kt_votes", {})[cityId] || null;
}

// Returns { [cityId]: { [themeId]: count } }
export async function voteCounts() {
  if (!online) {
    const mine = local.get("kt_votes", {});
    const out = {};
    Object.entries(mine).forEach(([c, t]) => { out[c] = { [t]: 1 }; });
    return out;
  }
  try {
    const res = await fetch(SUPABASE_URL + "/rest/v1/theme_vote_counts?select=city_id,theme_id,votes", { headers: headers() });
    if (!res.ok) throw new Error("counts " + res.status);
    const rows = await res.json();
    const out = {};
    rows.forEach((r) => { (out[r.city_id] ||= {})[r.theme_id] = Number(r.votes); });
    return out;
  } catch (e) {
    console.warn(e);
    return {};
  }
}

// ---- Survey ----
export async function submitSurvey(row) {
  local.set("kt_survey_" + row.city_id, true);
  if (!online) return { ok: true, local: true };
  try {
    await insert("survey_responses", { ...row, visitor_id: visitorId() });
    return { ok: true };
  } catch (e) {
    console.warn(e);
    return { ok: false };
  }
}
