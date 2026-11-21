// "Find your Korean city" — questions and matching. Pure logic, no DOM (testable in Node).

export const FDIMS = ["history", "nature", "food", "cafe", "photo", "calm", "active", "art", "sea"];

// Rare categories get more weight so café/art lovers don't always land in the same 2–3 places,
// common ones (photo spots exist almost everywhere) get less.
export const MIX = 0.6; // share of "distinctiveness" (cosine) vs. absolute fit

export const DIM_WEIGHT = { history: 1, nature: 0.9, food: 1, cafe: 1.15, photo: 0.6, calm: 1, active: 1, art: 1.2, sea: 1 };

// Each option adds preference points (p) and/or sets a key (k: value).
export const FQ = [
  { q: { en: "Your perfect travel day is mostly…", ko: "완벽한 여행 하루는 대부분…" },
    opts: [
      { e: "🏯", t: { en: "Walking through old palaces and temples", ko: "오래된 궁궐과 사찰 걷기" }, p: { history: 3, calm: 1 } },
      { e: "🌲", t: { en: "Out in mountains, forests or by the sea", ko: "산, 숲, 바다 같은 자연 속" }, p: { nature: 3, active: 1 } },
      { e: "🍜", t: { en: "Eating my way through markets", ko: "시장 돌며 먹기" }, p: { food: 3 } },
      { e: "☕", t: { en: "Cafés, shops and cool neighbourhoods", ko: "카페, 소품샵, 힙한 동네" }, p: { cafe: 3, art: 1 } }
    ] },
  { q: { en: "Sea or mountains?", ko: "바다 vs 산?" },
    opts: [
      { e: "🌊", t: { en: "Sea, definitely", ko: "무조건 바다" }, p: { sea: 3 } },
      { e: "⛰️", t: { en: "Mountains", ko: "산" }, p: { nature: 2, active: 2 } },
      { e: "🏝️", t: { en: "Both, ideally on the same trip", ko: "둘 다, 한 번에" }, p: { sea: 2, nature: 2 } },
      { e: "🏙️", t: { en: "Neither — give me a city", ko: "둘 다 별로, 도시가 좋아요" }, p: { cafe: 1, food: 1, art: 1 } }
    ] },
  { q: { en: "Ancient kingdoms, royal tombs, UNESCO sites…", ko: "고대 왕국, 왕릉, 유네스코 유산…" },
    opts: [
      { e: "👑", t: { en: "That's why I travel", ko: "그게 여행하는 이유죠" }, p: { history: 3 } },
      { e: "🙂", t: { en: "One or two is nice", ko: "한두 곳이면 좋아요" }, p: { history: 1 } },
      { e: "😴", t: { en: "Not really for me", ko: "별로 관심 없어요" }, p: {} }
    ] },
  { q: { en: "How important is food on this trip?", ko: "이번 여행에서 음식은 얼마나 중요해요?" },
    opts: [
      { e: "🤤", t: { en: "It's the main reason I'm going", ko: "음식 때문에 가는 거예요" }, p: { food: 3 } },
      { e: "🥢", t: { en: "I want to try the local specialty", ko: "그 지역 대표 음식은 먹어보고 싶어요" }, p: { food: 1 } },
      { e: "🍙", t: { en: "Anything that fills me up", ko: "배만 부르면 돼요" }, p: {} }
    ] },
  { q: { en: "Galleries, design shops, aesthetic cafés?", ko: "갤러리, 디자인숍, 감성 카페는?" },
    opts: [
      { e: "🎨", t: { en: "Yes — that's my kind of trip", ko: "좋아요, 제 스타일이에요" }, p: { art: 3, cafe: 2 } },
      { e: "☕", t: { en: "A nice café break is enough", ko: "카페 한 번 들르면 충분" }, p: { cafe: 1 } },
      { e: "🚫", t: { en: "Skip it", ko: "패스할게요" }, p: {} }
    ] },
  { q: { en: "Crowds and energy, or peace and quiet?", ko: "북적이는 활기 vs 조용한 여유?" },
    k: "vibe",
    opts: [
      { e: "🎉", t: { en: "Busy and lively is fun", ko: "북적이는 게 재밌어요" }, v: "lively", p: { food: 1 } },
      { e: "⚖️", t: { en: "A bit of both", ko: "적당히 섞어서" }, v: "mid", p: { calm: 1 } },
      { e: "🍃", t: { en: "Quiet, slow, few tourists", ko: "조용하고 느리게, 관광객 적은 곳" }, v: "quiet", p: { calm: 3 } }
    ] },
  { q: { en: "And how active?", ko: "얼마나 움직이고 싶어요?" },
    opts: [
      { e: "🥾", t: { en: "Hikes, surfing, long trails", ko: "등산, 서핑, 긴 트레킹" }, p: { active: 3, nature: 1 } },
      { e: "🚶", t: { en: "Lots of walking is fine", ko: "많이 걷는 건 괜찮아요" }, p: { active: 1 } },
      { e: "🛋️", t: { en: "Easy and relaxed", ko: "편하게 쉬엄쉬엄" }, p: { calm: 1 } }
    ] },
  { q: { en: "When are you going?", ko: "언제 갈 예정이에요?" },
    k: "season",
    opts: [
      { e: "🌸", t: { en: "Spring (Mar–May)", ko: "봄 (3~5월)" }, v: "sp", p: {} },
      { e: "☀️", t: { en: "Summer (Jun–Aug)", ko: "여름 (6~8월)" }, v: "su", p: {} },
      { e: "🍁", t: { en: "Autumn (Sep–Nov)", ko: "가을 (9~11월)" }, v: "au", p: {} },
      { e: "❄️", t: { en: "Winter (Dec–Feb)", ko: "겨울 (12~2월)" }, v: "wi", p: {} },
      { e: "🤷", t: { en: "Not sure yet", ko: "아직 몰라요" }, v: "", p: {} }
    ] },
  { q: { en: "How far are you willing to go from Seoul?", ko: "서울에서 얼마나 멀리 갈 수 있어요?" },
    k: "range",
    opts: [
      { e: "🚇", t: { en: "Under 2 hours", ko: "2시간 이내" }, v: 2, p: {} },
      { e: "🚄", t: { en: "Up to 3–4 hours by train or bus", ko: "기차·버스로 3~4시간까지" }, v: 4, p: {} },
      { e: "✈️", t: { en: "Anywhere — flights and ferries OK", ko: "어디든, 비행기·배도 OK" }, v: 99, p: {} }
    ] },
  { q: { en: "How many days do you have for this place?", ko: "이곳에 며칠 쓸 수 있어요?" },
    k: "days",
    opts: [
      { e: "1️⃣", t: { en: "A day trip", ko: "당일치기" }, v: 1, p: {} },
      { e: "2️⃣", t: { en: "2–3 days", ko: "2~3일" }, v: 3, p: {} },
      { e: "🗓️", t: { en: "4 days or more", ko: "4일 이상" }, v: 5, p: {} }
    ] },
  { q: { en: "Is this your first trip to Korea?", ko: "한국 여행이 처음인가요?" },
    k: "first",
    opts: [
      { e: "🆕", t: { en: "Yes, first time", ko: "네, 처음이에요" }, v: true, p: {} },
      { e: "🔁", t: { en: "No, I've been before", ko: "아니요, 와본 적 있어요" }, v: false, p: {} },
      { e: "🇰🇷", t: { en: "I live in Korea", ko: "한국에 살아요" }, v: "local", p: {} }
    ] }
];

export function userProfile(answers) {
  const pref = Object.fromEntries(FDIMS.map((d) => [d, 0]));
  const keys = { vibe: "mid", season: "", range: 4, days: 3, first: true };
  FQ.forEach((Q, i) => {
    const o = Q.opts[answers[i]];
    if (!o) return;
    Object.entries(o.p || {}).forEach(([d, v]) => (pref[d] += v));
    if (Q.k) keys[Q.k] = o.v;
  });
  return { pref, ...keys };
}

// Returns ranked [{ place, score (0-100), reasons: [dim], notes: [string keys] }]
export function matchPlaces(places, prof, mix = MIX) {
  const totalW = FDIMS.reduce((s, d) => s + prof.pref[d] * DIM_WEIGHT[d], 0) || 1;
  // Per-dimension average, so "average at everything" doesn't win: we reward what makes a place distinctive.
  const mean = Object.fromEntries(FDIMS.map((d) => [d, places.reduce((t, p) => t + p.scores[d], 0) / places.length]));
  const u = FDIMS.map((d) => prof.pref[d] * DIM_WEIGHT[d]);
  const un = Math.hypot(...u) || 1;
  const ranked = places.map((pl) => {
    let fit = 0;
    FDIMS.forEach((d) => { fit += prof.pref[d] * DIM_WEIGHT[d] * (pl.scores[d] / 5); });
    fit /= totalW; // 0..1: how much of what you want this place has
    const v = FDIMS.map((d) => (pl.scores[d] - mean[d]) * DIM_WEIGHT[d]);
    const cos = u.reduce((t, x, i) => t + x * v[i], 0) / (un * (Math.hypot(...v) || 1)); // -1..1: is it *known* for what you want
    let score = mix * (cos + 1) / 2 + (1 - mix) * fit;
    const notes = [];

    // crowd / vibe
    if (prof.vibe === "quiet") score += (2 - pl.crowd) * 0.05;
    if (prof.vibe === "lively") score += (pl.crowd - 2) * 0.05;

    // season
    if (prof.season) {
      if (pl.seasons.includes(prof.season)) { score += 0.05; notes.push("season"); }
      else score -= 0.04;
    }

    // distance from Seoul (Seoul itself = 0)
    const over = pl.hours_from_seoul - prof.range;
    if (over > 0) { score -= over >= 1 ? 0.3 : 0.12; notes.push("far"); }

    // days available vs. suggested stay
    if (pl.days > prof.days) { score -= 0.08 * (pl.days - prof.days); notes.push("short"); }
    if (prof.days >= 5 && pl.days >= 3) score += 0.04;

    // first-timers: easier places; repeat visitors and locals: hidden gems
    if (prof.first === true) score += (pl.easy - 2) * 0.04;
    else score += (2 - pl.crowd) * 0.03;

    // reasons: the user's strongest preferences where this place scores 4+
    const reasons = FDIMS.filter((d) => prof.pref[d] >= 2 && pl.scores[d] >= 4)
      .sort((a, b) => prof.pref[b] * DIM_WEIGHT[b] * pl.scores[b] - prof.pref[a] * DIM_WEIGHT[a] * pl.scores[a])
      .slice(0, 3);

    return { place: pl, raw: score, reasons, notes };
  }).sort((a, b) => b.raw - a.raw);

  // Map raw scores to a friendly 60–99% "match"
  const top = ranked[0].raw, bottom = ranked[ranked.length - 1].raw;
  ranked.forEach((r) => { r.score = Math.round(60 + 39 * ((r.raw - bottom) / ((top - bottom) || 1))); });
  return ranked;
}

export function seoulDistricts(districts, prof, n = 3) {
  return districts.map((d) => ({ id: d.id, s: FDIMS.reduce((t, k) => t + prof.pref[k] * DIM_WEIGHT[k] * d.scores[k], 0) }))
    .sort((a, b) => b.s - a.s).slice(0, n).map((x) => x.id);
}

// Three result slots: best match, runner-up, and a "hidden gem" (a quiet place) so lesser-known cities get their turn.
export function pickResults(ranked) {
  const best = ranked[0], second = ranked[1];
  const gem = ranked.slice(2).find((r) => r.place.crowd === 1 && !r.notes.includes("far")) || ranked[2];
  const more = ranked.filter((r) => r !== best && r !== second && r !== gem).slice(0, 5);
  return { best, second, gem, more };
}
