(function () {
  "use strict";

  const BADGES = window.BADGES, REGIONS = window.REGIONS, RANKS = window.RANKS;
  const byId = Object.fromEntries(BADGES.map((b) => [b.id, b]));
  const TOTAL = BADGES.length;

  // ---------------- i18n ----------------
  const S = {
    rank: { en: "RANK", ko: "등급" },
    count: { en: "{n} / {t} badges", ko: "뱃지 {n} / {t}개" },
    next: { en: "{k} more to “{r}”", ko: "“{r}”까지 {k}개 남았어요" },
    maxed: { en: "You've collected every badge. Legend.", ko: "모든 뱃지를 모았어요. 전설이에요." },
    saveImg: { en: "Save my badge card", ko: "내 뱃지 카드 저장" },
    copyLink: { en: "Copy collection link", ko: "컬렉션 링크 복사" },
    complete: { en: "COMPLETE", ko: "완료" },
    been: { en: "I've been here", ko: "가봤어요" },
    undo: { en: "Remove badge", ko: "뱃지 취소" },
    todo: { en: "To earn it", ko: "이렇게 하면 획득" },
    planIt: { en: "Plan a trip here →", ko: "여기 여행 일정 짜기 →" },
    map: { en: "Open map", ko: "지도 보기" },
    earnedOn: { en: "Earned {d}", ko: "{d} 획득" },
    unlocked: { en: "BADGE UNLOCKED", ko: "뱃지 획득" },
    rankUp: { en: "RANK UP", ko: "등급 상승" },
    regionDone: { en: "REGION COMPLETE", ko: "권역 정복" },
    copied: { en: "Link copied", ko: "링크를 복사했어요" },
    viewing: { en: "You're viewing {name}'s collection ({n}/{t}).", ko: "{name}님의 컬렉션을 보고 있어요 ({n}/{t})." },
    someone: { en: "someone", ko: "누군가" },
    startOwn: { en: "Start my own", ko: "내 컬렉션 시작" },
    importIt: { en: "Copy into mine", ko: "내 것으로 가져오기" },
    yourName: { en: "Your name for the card (optional)", ko: "카드에 넣을 이름 (선택)" },
    cardTitle: { en: "MY KOREA BADGES", ko: "MY KOREA BADGES" },
    footer: { en: "Your badges are saved in this browser. Use the collection link to move them to another device.", ko: "뱃지는 이 브라우저에 저장돼요. 다른 기기로 옮기려면 컬렉션 링크를 쓰세요." },
    planner: { en: "🧭 Planner", ko: "🧭 플래너" },
    confirmImport: { en: "Replace your badges with this collection?", ko: "내 뱃지를 이 컬렉션으로 바꿀까요?" }
  };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  let lang = store.get("kb_lang", null) || ((navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en");
  const t = (k, v) => { let s = S[k][lang]; if (v) Object.entries(v).forEach(([a, b]) => (s = s.split("{" + a + "}").join(b))); return s; };
  const L = (o) => (typeof o === "string" ? o : o[lang]);
  const name = (b) => (lang === "ko" ? b.ko : b.en);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------------- State ----------------
  let mine = store.get("kb_collected", {}); // { id: "YYYY-MM-DD" }
  let viewing = null; // { name, set } when opened from someone's link

  // Collection link: #c=<base64url bitset>&n=<name>
  function encodeSet(obj) {
    const bytes = new Uint8Array(Math.ceil(TOTAL / 8));
    BADGES.forEach((b, i) => { if (obj[b.id]) bytes[i >> 3] |= 1 << (i & 7); });
    return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function decodeSet(str) {
    try {
      const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
      const out = {};
      BADGES.forEach((b, i) => { if ((bin.charCodeAt(i >> 3) || 0) & (1 << (i & 7))) out[b.id] = true; });
      return out;
    } catch (e) { return null; }
  }
  (function readHash() {
    const q = new URLSearchParams(location.hash.slice(1));
    if (q.get("c")) {
      const set = decodeSet(q.get("c"));
      if (set) viewing = { name: (q.get("n") || "").slice(0, 24), set };
    }
  })();
  const current = () => (viewing ? viewing.set : mine);
  const countOf = (set) => Object.keys(set).filter((k) => byId[k]).length;
  const rankFor = (n) => RANKS.filter((r) => n >= r.min).pop();
  const nextRank = (n) => RANKS.find((r) => r.min > n);

  // ---------------- Render ----------------
  function paint(canvas, b, locked) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.drawBadge(ctx, b, 0, 0, canvas.width / 16, locked);
  }

  function renderAll() {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));
    document.getElementById("plannerLink").textContent = t("planner");
    document.getElementById("saveImg").textContent = "🖼️ " + t("saveImg");
    document.getElementById("copyLink").textContent = "🔗 " + t("copyLink");
    document.getElementById("footer").textContent = t("footer");
    renderHero();
    renderViewing();
    renderRegions();
  }

  function renderHero() {
    const n = countOf(current());
    const r = rankFor(n), nx = nextRank(n);
    document.getElementById("rankLabel").textContent = t("rank");
    document.getElementById("rankName").textContent = L(r);
    document.getElementById("count").textContent = t("count", { n, t: TOTAL });
    document.getElementById("bar").style.width = (n / TOTAL) * 100 + "%";
    document.getElementById("next").textContent = nx ? t("next", { k: nx.min - n, r: L(nx) }) : t("maxed");
  }

  function renderViewing() {
    const el = document.getElementById("viewing");
    if (!viewing) { el.classList.add("hidden"); return; }
    el.classList.remove("hidden");
    el.innerHTML = `<span>👀 ${esc(t("viewing", { name: viewing.name || t("someone"), n: countOf(viewing.set), t: TOTAL }))}</span>
      <span class="row"><button class="btn" id="vOwn">${t("startOwn")}</button><button class="btn ghost" id="vImport">${t("importIt")}</button></span>`;
    document.getElementById("vOwn").onclick = () => { viewing = null; history.replaceState(null, "", location.pathname); renderAll(); };
    document.getElementById("vImport").onclick = () => {
      if (countOf(mine) && !confirm(t("confirmImport"))) return;
      const today = new Date().toISOString().slice(0, 10);
      mine = Object.fromEntries(Object.keys(viewing.set).map((k) => [k, mine[k] || today]));
      store.set("kb_collected", mine);
      viewing = null; history.replaceState(null, "", location.pathname); renderAll();
    };
  }

  function renderRegions() {
    const set = current();
    const root = document.getElementById("regions");
    root.innerHTML = REGIONS.map((r) => {
      const list = BADGES.filter((b) => b.r === r.id);
      const got = list.filter((b) => set[b.id]).length;
      return `<section class="region">
        <div class="rhead"><h2 class="pixel">${esc(L(r))}</h2><span class="rc">${got}/${list.length}</span>${got === list.length ? `<span class="done pixel">${t("complete")}</span>` : ""}</div>
        <div class="grid">${list.map((b) => `
          <button class="badge ${set[b.id] ? "" : "locked"}" data-id="${b.id}" aria-label="${esc(name(b))}">
            <canvas width="16" height="16"></canvas>
            <span class="bn">${esc(name(b))}</span>
            <span class="bt">${set[b.id] ? esc(L(b.t)) : "???"}</span>
          </button>`).join("")}
        </div></section>`;
    }).join("");
    root.querySelectorAll(".badge").forEach((el) => {
      const b = byId[el.dataset.id];
      paint(el.querySelector("canvas"), b, !set[b.id]);
      el.onclick = () => openSheet(b);
    });
  }

  // ---------------- Detail sheet ----------------
  const sheet = document.getElementById("sheet");
  function openSheet(b) {
    const set = current();
    const has = !!set[b.id];
    const date = typeof set[b.id] === "string" ? set[b.id] : "";
    const mapQ = encodeURIComponent((lang === "ko" ? b.ko : b.en) + (lang === "ko" ? " 여행" : " Korea"));
    const body = document.getElementById("sheetBody");
    body.innerHTML = `
      <button class="close" aria-label="close">×</button>
      <canvas width="16" height="16"></canvas>
      <div class="stitle pixel">${has ? esc(L(b.t)) : "???"}</div>
      <p class="splace">${esc(name(b))}</p>
      ${has && date ? `<p class="when">✓ ${esc(t("earnedOn", { d: date }))}</p>` : ""}
      <div class="sdo"><b>${t("todo")}</b>${esc(L(b.d))}</div>
      ${viewing ? "" : `<button class="btn ${has ? "ghost" : "ok"}" id="toggle">${has ? t("undo") : "✓ " + t("been")}</button>`}
      <div class="links">
        ${b.plan ? `<a href="../?city=${b.plan}#/setup">${t("planIt")}</a>` : ""}
        <a href="https://www.google.com/maps/search/${mapQ}" target="_blank" rel="noopener">${t("map")} ↗</a>
      </div>`;
    paint(body.querySelector("canvas"), b, !has);
    body.querySelector(".close").onclick = () => sheet.close();
    const tg = body.querySelector("#toggle");
    if (tg) tg.onclick = () => { toggle(b); sheet.close(); };
    if (typeof sheet.showModal === "function") sheet.showModal(); else sheet.setAttribute("open", "");
  }
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });

  function toggle(b) {
    const before = countOf(mine);
    const regionBefore = regionDone(b.r, mine);
    if (mine[b.id]) delete mine[b.id];
    else mine[b.id] = new Date().toISOString().slice(0, 10);
    store.set("kb_collected", mine);
    const after = countOf(mine);
    renderHero();
    renderRegions();
    if (after > before) {
      const el = document.querySelector(`.badge[data-id="${b.id}"]`);
      if (el) { el.classList.add("pop"); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
      const rb = rankFor(before), ra = rankFor(after);
      if (!regionBefore && regionDone(b.r, mine)) toast(t("regionDone"), L(REGIONS.find((r) => r.id === b.r)) + " 🏆");
      else if (ra !== rb) toast(t("rankUp"), L(ra) + " ⭐");
      else toast(t("unlocked"), L(b.t));
    }
  }
  const regionDone = (rid, set) => BADGES.filter((b) => b.r === rid).every((b) => set[b.id]);

  let toastTimer;
  function toast(head, text) {
    const el = document.getElementById("toast");
    el.innerHTML = `<span class="pixel">${esc(head)}</span>${esc(text)}`;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // ---------------- Share: link ----------------
  document.getElementById("copyLink").onclick = () => {
    const nm = store.get("kb_name", "");
    const url = location.origin + location.pathname + "#c=" + encodeSet(mine) + (nm ? "&n=" + encodeURIComponent(nm) : "");
    copy(url).then(() => toast("🔗", t("copied")));
  };
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(() => fallback(text));
    return Promise.resolve(fallback(text));
  }
  function fallback(text) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) { /* ignore */ } ta.remove();
  }

  // ---------------- Share: image card (1080x1350) ----------------
  document.getElementById("saveImg").onclick = async () => {
    let nm = store.get("kb_name", "");
    const entered = prompt(t("yourName"), nm);
    if (entered === null) return;
    nm = entered.trim().slice(0, 24);
    store.set("kb_name", nm);
    try { await document.fonts.load('20px "Press Start 2P"'); } catch (e) { /* font optional */ }
    const cv = buildCard(current(), nm);
    cv.toBlob(async (blob) => {
      const file = new File([blob], "korea-badges.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: "Korea Badges" }); return; } catch (e) { /* fall through to download */ }
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "korea-badges.png";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, "image/png");
  };

  function buildCard(set, nm) {
    const W = 1080, H = 1350;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    c.imageSmoothingEnabled = false;
    c.fillStyle = "#23211d"; c.fillRect(0, 0, W, H);
    c.strokeStyle = "#d9a521"; c.lineWidth = 12; c.strokeRect(24, 24, W - 48, H - 48);

    const n = countOf(set);
    const pix = '"Press Start 2P", monospace';
    c.fillStyle = "#d9a521"; c.font = "28px " + pix; c.textAlign = "left";
    c.fillText(t("cardTitle"), 72, 120);
    c.fillStyle = "#f5f2ea"; c.font = "44px " + pix;
    c.fillText(L(rankFor(n)), 72, 200);
    c.fillStyle = "#cfc8ba"; c.font = '600 30px "Inter", "Noto Sans KR", sans-serif';
    c.fillText((nm ? nm + " · " : "") + n + " / " + TOTAL, 72, 252);

    // progress bar
    c.fillStyle = "#3a3732"; c.fillRect(72, 280, W - 144, 28);
    c.fillStyle = "#d9a521"; c.fillRect(72, 280, Math.round((W - 144) * n / TOTAL), 28);

    // grid of badges: 9 columns x 7 rows
    const cols = 9, size = 96, gapX = (W - 144 - cols * size) / (cols - 1), top = 350, gapY = 18;
    BADGES.forEach((b, i) => {
      const x = 72 + (i % cols) * (size + gapX);
      const y = top + Math.floor(i / cols) * (size + gapY);
      window.drawBadge(c, b, Math.round(x), Math.round(y), size / 16, !set[b.id]);
    });

    // region tallies
    const ry = top + Math.ceil(TOTAL / cols) * (size + gapY) + 30;
    c.font = '600 24px "Inter", "Noto Sans KR", sans-serif';
    REGIONS.forEach((r, i) => {
      const list = BADGES.filter((b) => b.r === r.id);
      const got = list.filter((b) => set[b.id]).length;
      const x = 72 + (i % 4) * 236, y = ry + Math.floor(i / 4) * 40;
      c.fillStyle = got === list.length ? "#d9a521" : "#cfc8ba";
      c.fillText(L(r) + " " + got + "/" + list.length, x, y);
    });

    c.fillStyle = "#77716a"; c.font = "18px " + pix; c.textAlign = "center";
    c.fillText("kang-hoon.github.io/gongju-trip/badges", W / 2, H - 60);
    return cv;
  }

  // ---------------- Language ----------------
  document.querySelectorAll(".lang button").forEach((b) => (b.onclick = () => { lang = b.dataset.l; store.set("kb_lang", lang); renderAll(); }));

  renderAll();
})();
