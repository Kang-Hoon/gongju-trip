// Draws one 16x16 pixel badge at (x, y) with pixel size `s` onto a 2D context.
window.drawBadge = function (ctx, badge, x, y, s, locked) {
  const icon = window.ICONS[badge.icon];
  const pal = Object.assign({}, icon.p, badge.pal || {});
  const frame = badge.c;
  const bg = mix(frame, "#FFFFFF", 0.86);

  const px = (cx, cy, col) => { ctx.fillStyle = col; ctx.fillRect(x + cx * s, y + cy * s, s, s); };

  for (let cy = 0; cy < 16; cy++) {
    for (let cx = 0; cx < 16; cx++) {
      const d = (cx - 7.5) ** 2 + (cy - 7.5) ** 2;
      if (d > 7.9 ** 2) continue;
      const ring = d > 6.4 ** 2;
      let col = ring ? frame : bg;
      if (ring && (cx + cy) % 4 === 0) col = mix(frame, "#FFFFFF", 0.3);
      if (ring && cy <= 3 && cx >= 4 && cx <= 6) col = mix(frame, "#FFFFFF", 0.45); // highlight
      px(cx, cy, locked ? grey(col, ring ? 0.55 : 0.92) : col);
    }
  }

  const m = locked ? LOCK : icon.m;
  const h = m.length;
  const w = Math.max(...m.map((r) => r.length));
  const ox = 3 + Math.floor((10 - w) / 2);
  const oy = 3 + Math.floor((10 - h) / 2);
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < m[r].length; c++) {
      const ch = m[r][c];
      if (ch === ".") continue;
      px(ox + c, oy + r, locked ? "#8A8983" : (pal[ch] || "#000"));
    }
  }
};

const LOCK = ["..aaaa..", ".a....a.", ".a....a.", "aaaaaaaa", "aaaaaaaa", "aaa..aaa", "aaa..aaa", "aaaaaaaa"];

function hex(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }
function toHex(rgb) { return "#" + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join(""); }
function mix(a, b, t) { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); }
function grey(h, light) {
  const [r, g, b] = hex(h);
  const v = 0.3 * r + 0.59 * g + 0.11 * b;
  const out = v + (255 - v) * light * 0.5 + 40;
  return toHex([out, out, out * 0.98]);
}
