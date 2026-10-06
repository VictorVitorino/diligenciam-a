/* =====================================================================
   Motor de apresentações · A&M DTS · IT M&A
   - Moldura A&M por slide (cabeçalho, banda de seção, rodapé com fonte)
   - Navegação (teclado, botões, pontos, #n na URL), capítulos e transição
   - Gráficos SVG a partir de JSON: hbar, vbar, dumbbell, donut, stack,
     gantt, heat, scatter, waterfall, radar, timeline
   - Interações: abas, seletores, cartões clicáveis com detalhe, virar cartão,
     contadores e dicas (data-tv / data-tl)
   Use ?static na URL para desligar animações (revisão e captura de tela).
   ===================================================================== */
(function () {
"use strict";
const NS = "http://www.w3.org/2000/svg";
const $ = id => document.getElementById(id);
const META = JSON.parse(($("deck-meta") || { textContent: "{}" }).textContent || "{}");
const STATIC = /[?&]static\b/.test(location.search);
const REDMO = STATIC || matchMedia("(prefers-reduced-motion: reduce)").matches;
if (STATIC) document.documentElement.classList.add("static");

/* ---------- utilitários ---------- */
function S(t, a, p) { const e = document.createElementNS(NS, t); if (a) for (const k in a) { if (a[k] != null) e.setAttribute(k, a[k]); } if (p) p.appendChild(e); return e; }
function H(t, a, p, x) {
  const e = document.createElement(t);
  if (a) for (const k in a) { if (k === "class") e.className = a[k]; else if (k === "style") e.style.cssText = a[k]; else if (k === "html") e.innerHTML = a[k]; else e.setAttribute(k, a[k]); }
  if (x != null) e.textContent = x; if (p) p.appendChild(e); return e;
}
function T(p, x, y, s, a) { const t = S("text", Object.assign({ x, y }, a || {}), p); t.textContent = s; return t; }
const col = k => !k ? "var(--s1)" : (k[0] === "#" || k.startsWith("rgb") || k.startsWith("var(")) ? k : `var(--${k})`;
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function fmt(v, f, pre, suf) {
  if (v == null || isNaN(v)) return "—";
  let s;
  if (f === "dec1") s = Number(v).toFixed(1).replace(".", ",");
  else if (f === "dec2") s = Number(v).toFixed(2).replace(".", ",");
  else if (f === "int") s = Math.round(v).toLocaleString("pt-BR");
  else if (f === "pct") s = Math.round(v) + "%";
  else if (f === "pct1") s = Number(v).toFixed(1).replace(".", ",") + "%";
  else s = Number(v).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  return (pre || "") + s + (suf || "");
}
const MES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
let ctx2d = null;
function tw(str, px, w) { if (!ctx2d) ctx2d = document.createElement("canvas").getContext("2d"); ctx2d.font = `${w || 500} ${px}px Inter, "Helvetica Neue", Arial, sans-serif`; return ctx2d.measureText(str).width; }
function wrap(str, maxW, px, w, maxLines) {
  const words = String(str).split(/\s+/); const lines = []; let cur = "";
  words.forEach(wd => { const t = cur ? cur + " " + wd : wd; if (tw(t, px, w) <= maxW || !cur) cur = t; else { lines.push(cur); cur = wd; } });
  if (cur) lines.push(cur);
  if (maxLines && lines.length > maxLines) { const k = lines.slice(0, maxLines); let last = k[maxLines - 1]; while (tw(last + "…", px, w) > maxW && last.length > 1) last = last.slice(0, -1); k[maxLines - 1] = last + "…"; return k; }
  return lines;
}
function mtext(p, x, y, lines, lh, a) { const t = S("text", Object.assign({ x, y }, a || {}), p); lines.forEach((ln, i) => { const s = S("tspan", { x, dy: i ? lh : 0 }, t); s.textContent = ln; }); return t; }
function tip(el, v, l) { el.setAttribute("data-tv", v); if (l) el.setAttribute("data-tl", l); return el; }
function niceMax(v) { if (v <= 0) return 1; const e = Math.pow(10, Math.floor(Math.log10(v))); const m = v / e; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * e; }
function ticksOf(min, max, n) { const step = niceMax((max - min) / (n || 5)); const out = []; for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(6)); return out; }
function barPath(x, y, w, h, r, dir) {
  // retângulo com ponta arredondada (4px) e base reta
  r = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
  if (dir === "up") return `M${x} ${y + h}V${y + r}a${r} ${r} 0 0 1 ${r} ${-r}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}V${y + h}z`;
  return `M${x} ${y}h${w - r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - r)}z`;
}
function legend(box, items) {
  const lg = H("div", { class: "ch-legend" }); items.forEach(it => { const s = H("span", null, lg); H("i", { class: it.k || "", style: `background:${col(it.c)}` }, s); s.appendChild(document.createTextNode(it.l)); });
  box.insertBefore(lg, box.firstChild);
}

/* =====================================================================
   GRÁFICOS
   ===================================================================== */
const CHART = {};

CHART.hbar = (box, d, W) => {
  const lw = d.labelW || 200, bh = Math.min(d.barH || 18, 24), gap = d.gap || 10, vw = d.valW || 64, fz = d.fs || 12;
  const min = d.min || 0, max = d.max != null ? d.max : niceMax(Math.max(...d.items.map(i => i.v)));
  const x0 = lw, x1 = W - vw; const sx = v => x0 + (v - min) / (max - min) * (x1 - x0);
  const rows = d.items.map(it => ({ it, lines: wrap(it.l, lw - 14, fz, it.b ? 700 : 500, 2) }));
  let y = 4; rows.forEach(r => { r.h = Math.max(bh, r.lines.length * (fz + 3)); r.y = y; y += r.h + gap; });
  const showAx = d.axis !== false, H0 = y - gap + (showAx ? 24 : 4);
  const s = S("svg", { width: W, height: H0, viewBox: `0 0 ${W} ${H0}` }, box);
  if (showAx) { const tk = d.ticks || ticksOf(min, max, 5); tk.forEach(v => { S("line", { x1: sx(v), x2: sx(v), y1: 0, y2: y - gap + 4, class: "ax" }, s); T(s, sx(v), y - gap + 18, fmt(v, d.fmt), { class: "axt", "text-anchor": "middle" }); }); }
  rows.forEach((r, i) => {
    const it = r.it, cy = r.y + r.h / 2, w = Math.max(0, sx(it.v) - x0);
    mtext(s, x0 - 12, cy - (r.lines.length - 1) * (fz + 3) / 2 + 4, r.lines, fz + 3, { class: it.b ? "labb" : "lab", "text-anchor": "end", style: `font-size:${fz}px` + (it.strike ? ";text-decoration:line-through;fill:var(--muted)" : "") });
    const p = S("path", { d: barPath(x0, cy - bh / 2, Math.max(w, 2), bh, 4), "data-g": "x", style: `fill:${col(it.c || d.c || "s1")};animation-delay:${i * 60}ms` }, s);
    tip(p, it.l, it.tip || fmt(it.v, d.fmt, d.pre, d.suf));
    const vt = T(s, x0 + w + 8, cy + 4, it.vl != null ? it.vl : fmt(it.v, d.fmt, d.pre, d.suf), { class: "val" });
    if (it.note) { const n = S("tspan", { class: "axt", dx: 8 }, vt); n.textContent = it.note; }
    tip(S("rect", { x: 0, y: r.y - gap / 2, width: W, height: r.h + gap, class: "hit" }, s), it.l, it.tip || fmt(it.v, d.fmt, d.pre, d.suf));
  });
  if (d.ref) { const rx = sx(d.ref.v); S("line", { x1: rx, x2: rx, y1: -6, y2: y - gap + 4, style: "stroke:var(--orange);stroke-width:1.5" }, s); T(s, rx + 4, -8 + 2, d.ref.l || fmt(d.ref.v, d.fmt), { class: "axt", style: "fill:var(--orange-d);font-weight:700" }); }
};

CHART.vbar = (box, d, W, Hh) => {
  const Hc = Hh || 260, top = 22, lbH = d.labelH || 34, fz = d.fs || 12;
  const min = d.min || 0, max = d.max != null ? d.max : niceMax(Math.max(...d.items.map(i => i.v)));
  const n = d.items.length, axW = d.axis === false ? 0 : 40, plotW = W - axW, slot = plotW / n, bw = Math.min(d.barW || 44, slot * .6);
  const y0 = Hc - lbH, sy = v => y0 - (v - min) / (max - min) * (y0 - top);
  const s = S("svg", { width: W, height: Hc, viewBox: `0 0 ${W} ${Hc}` }, box);
  if (d.axis !== false) (d.ticks || ticksOf(min, max, 4)).forEach(v => { S("line", { x1: axW, x2: W, y1: sy(v), y2: sy(v), class: "ax" }, s); T(s, axW - 8, sy(v) + 4, fmt(v, d.fmt), { class: "axt", "text-anchor": "end" }); });
  d.items.forEach((it, i) => {
    const cx = axW + slot * i + slot / 2, yv = sy(it.v), h = Math.max(2, y0 - yv);
    const p = S("path", { d: barPath(cx - bw / 2, y0 - h, bw, h, 4, "up"), "data-g": "y", style: `fill:${col(it.c || d.c || "s1")};animation-delay:${i * 60}ms` }, s);
    tip(p, it.l, it.tip || fmt(it.v, d.fmt, d.pre, d.suf));
    T(s, cx, yv - 7, it.vl != null ? it.vl : fmt(it.v, d.fmt, d.pre, d.suf), { class: "val", "text-anchor": "middle" });
    mtext(s, cx, y0 + 16, wrap(it.l, slot - 6, fz, 500, 2), fz + 2, { class: "lab", "text-anchor": "middle", style: `font-size:${fz}px` });
    tip(S("rect", { x: cx - slot / 2, y: top - 10, width: slot, height: y0 - top + 10, class: "hit" }, s), it.l, it.tip || fmt(it.v, d.fmt, d.pre, d.suf));
  });
  S("line", { x1: axW, x2: W, y1: y0, y2: y0, style: "stroke:#C9D3DD" }, s);
  if (d.ref) { const ry = sy(d.ref.v); S("line", { x1: axW, x2: W, y1: ry, y2: ry, style: "stroke:var(--orange);stroke-width:1.5" }, s); T(s, W, ry - 5, d.ref.l || fmt(d.ref.v, d.fmt), { class: "axt", "text-anchor": "end", style: "fill:var(--orange-d);font-weight:700" }); }
};

CHART.dumbbell = (box, d, W) => {
  const lw = d.labelW || 230, rh = d.rowH || 30, min = d.min != null ? d.min : 1, max = d.max != null ? d.max : 5, ca = d.ca || "o5", cb = d.cb || "s2";
  legend(box, [{ l: d.la || "Atual", c: ca, k: "dot" }, { l: d.lb || "Alvo", c: cb, k: "dot" }]);
  const x0 = lw, x1 = W - 40, sx = v => x0 + (v - min) / (max - min) * (x1 - x0), Hh = d.items.length * rh + 26;
  const s = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}` }, box);
  (d.ticks || ticksOf(min, max, max - min)).forEach(v => { S("line", { x1: sx(v), x2: sx(v), y1: 0, y2: Hh - 22, class: "ax" }, s); T(s, sx(v), Hh - 6, (d.tickLabels && d.tickLabels[v]) || fmt(v, d.tfmt || "int"), { class: "axt", "text-anchor": "middle" }); });
  if (d.ref) { const rx = sx(d.ref.v); S("line", { x1: rx, x2: rx, y1: 0, y2: Hh - 22, style: "stroke:var(--orange);stroke-width:1.5" }, s); T(s, rx + 4, 10, d.ref.l, { class: "axt", style: "fill:var(--orange-d);font-weight:700" }); }
  d.items.forEach((it, i) => {
    const cy = i * rh + rh / 2, xa = sx(it.a), xb = sx(it.b);
    T(s, x0 - 14, cy + 4, it.l, { class: it.b2 ? "labb" : "lab", "text-anchor": "end", style: it.strike ? "text-decoration:line-through;fill:var(--muted)" : "" });
    S("line", { x1: xa, x2: xb, y1: cy, y2: cy, "data-g": "x", style: "stroke:var(--o2);stroke-width:3;stroke-linecap:round" }, s);
    S("circle", { cx: xa, cy, r: 6.5, "data-g": "r", style: `fill:${col(ca)};stroke:#fff;stroke-width:2` }, s);
    S("circle", { cx: xb, cy, r: 6.5, "data-g": "r", style: `fill:${col(cb)};stroke:#fff;stroke-width:2;animation-delay:200ms` }, s);
    T(s, xa - 11, cy + 4, fmt(it.a, d.fmt || "dec1"), { class: "axt", "text-anchor": "end", style: "font-weight:700;fill:var(--ink2)" });
    T(s, xb + 11, cy + 4, fmt(it.b, d.fmt || "dec1"), { class: "val" });
    tip(S("rect", { x: 0, y: cy - rh / 2, width: W, height: rh, class: "hit" }, s), it.l, it.tip || `${d.la || "Atual"} ${fmt(it.a, d.fmt || "dec1")} → ${d.lb || "Alvo"} ${fmt(it.b, d.fmt || "dec1")}`);
  });
};

CHART.donut = (box, d, W, Hh) => {
  const size = Math.min(Hh || 220, d.size || 220), R = size / 2 - 4, th = d.thick || 26, r = R - th / 2;
  const tot = d.items.reduce((a, b) => a + b.v, 0), lgX = size + 24;
  const Hs = Math.max(size, d.items.length * 26 + 8);
  const s = S("svg", { width: W, height: Hs, viewBox: `0 0 ${W} ${Hs}` }, box);
  const cx = size / 2, cy = Hs / 2; let a0 = -Math.PI / 2; const gapA = d.items.length > 1 ? 2 / r : 0;
  d.items.forEach((it, i) => {
    const frac = it.v / tot, a1 = a0 + frac * 2 * Math.PI, s0 = a0 + gapA / 2, s1 = a1 - gapA / 2, large = s1 - s0 > Math.PI ? 1 : 0;
    const p = S("path", { d: `M${cx + r * Math.cos(s0)} ${cy + r * Math.sin(s0)}A${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(s1)} ${cy + r * Math.sin(s1)}`, pathLength: 1, "data-g": "d",
      style: `fill:none;stroke:${col(it.c || ["s1", "s2", "s3", "s4", "mut"][i % 5])};stroke-width:${th};animation-delay:${i * 90}ms` }, s);
    tip(p, it.l, it.tip || `${fmt(it.v, d.fmt, d.pre, d.suf)} · ${Math.round(frac * 100)}%`);
    a0 = a1;
    const ly = cy - (d.items.length * 26) / 2 + i * 26 + 13;
    S("rect", { x: lgX, y: ly - 7, width: 12, height: 12, rx: 3, style: `fill:${col(it.c || ["s1", "s2", "s3", "s4", "mut"][i % 5])}` }, s);
    const t = T(s, lgX + 20, ly + 4, it.l, { class: "lab" });
    const v = S("tspan", { class: "val", dx: 8 }, t); v.textContent = it.vl != null ? it.vl : fmt(it.v, d.fmt, d.pre, d.suf);
  });
  if (d.center != null) { T(s, cx, cy + (d.sub ? 2 : 10), d.center, { "text-anchor": "middle", style: "font:800 34px var(--fh);fill:var(--navy)" }); if (d.sub) T(s, cx, cy + 22, d.sub, { class: "axt", "text-anchor": "middle" }); }
};

CHART.stack = (box, d, W) => {
  const lw = d.labelW || 180, bh = Math.min(d.barH || 22, 24), gap = d.gap || 12, fz = 12;
  legend(box, d.cats.map((c, i) => ({ l: c.l, c: c.c || ["s1", "s2", "s3", "s4"][i] })));
  const tots = d.rows.map(r => r.v.reduce((a, b) => a + b, 0)), max = d.pct ? 1 : (d.max || niceMax(Math.max(...tots)));
  const x0 = lw, x1 = W - (d.pct ? 8 : 60);
  const lab = d.rows.map(r => wrap(r.l, lw - 14, 12.5, r.b ? 700 : 500, 2)), rh = lab.map(L => Math.max(bh, L.length * 15));
  const Hh = rh.reduce((a, b) => a + b + gap, 0) + 4;
  const s = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}` }, box);
  let yy = 2;
  d.rows.forEach((r, i) => {
    const y = yy + (rh[i] - bh) / 2; yy += rh[i] + gap; let x = x0; const tot = tots[i];
    mtext(s, x0 - 12, y + bh / 2 + 4 - (lab[i].length - 1) * 7.5, lab[i], 15, { class: r.b ? "labb" : "lab", "text-anchor": "end" });
    r.v.forEach((v, k) => {
      if (!v) return; const w = (d.pct ? v / tot : v / max) * (x1 - x0); const c = d.cats[k].c || ["s1", "s2", "s3", "s4"][k];
      const rr = S("rect", { x: x + (k ? 1 : 0), y, width: Math.max(0, w - (k ? 2 : 1)), height: bh, rx: 3, "data-g": "o", style: `fill:${col(c)}` }, s);
      const lab = d.pct ? Math.round(v / tot * 100) + "%" : fmt(v, d.fmt, d.pre, d.suf);
      tip(rr, `${r.l} · ${d.cats[k].l}`, lab + (d.pct ? ` (${fmt(v, d.fmt, d.pre, d.suf)})` : ""));
      if (tw(lab, 11, 700) + 12 < w) T(s, x + w / 2, y + bh / 2 + 4, lab, { "text-anchor": "middle", style: "font:700 11px var(--fb);fill:#fff;pointer-events:none" });
      x += w;
    });
    if (!d.pct) T(s, x + 8, y + bh / 2 + 4, fmt(tot, d.fmt, d.pre, d.suf), { class: "val" });
  });
};

CHART.gantt = (box, d, W) => {
  const lw = d.labelW || 330, rh = d.rowH || 24, gh = 22;
  const p = s => { const [y, m] = s.split("-").map(Number); return y * 12 + m - 1; };
  const m0 = p(d.start), m1 = p(d.end), nM = m1 - m0 + 1, x0 = lw, x1 = W - 6, mw = (x1 - x0) / nM, sx = m => x0 + (m - m0) * mw;
  let y = 30; const lay = []; let lastG = null;
  d.rows.forEach(r => { if (r.g && r.g !== lastG) { lay.push({ g: r.g, y }); y += gh; lastG = r.g; } lay.push({ r, y }); y += rh; });
  const Hh = y + 6, s = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}` }, box);
  for (let m = m0; m <= m1; m++) {
    const x = sx(m); if ((m % 12) === 0 || m === m0) T(s, x + 3, 10, String(Math.floor(m / 12)), { class: "axt", style: "font-weight:700;fill:var(--navy)" });
    T(s, x + mw / 2, 25, MES[m % 12], { class: "axt", "text-anchor": "middle" });
    S("line", { x1: x, x2: x, y1: 30, y2: Hh - 4, class: "ax", style: (m % 12) === 0 ? "stroke:#C9D3DD" : "" }, s);
  }
  const gc = {}; let gi = 0; const pal = d.pal || ["o5", "s1", "s3", "s2", "s4", "o3"];
  lay.forEach(L => {
    if (L.g) { if (!(L.g in gc)) gc[L.g] = pal[gi++ % pal.length]; S("rect", { x: 0, y: L.y + 2, width: W, height: gh - 4, rx: 4, style: "fill:#EEF3F8" }, s); T(s, 8, L.y + gh / 2 + 4, L.g, { class: "labb", style: "font-size:12px;text-transform:uppercase;letter-spacing:.06em" }); return; }
    const r = L.r, c = col(r.c || gc[r.g] || "s1"), xs = sx(p(r.s)), w = Math.max(6, (r.m || 1) * mw - 3), cy = L.y + rh / 2;
    T(s, 18, cy + 4, wrap(r.l, lw - 30, 12, 500, 1)[0], { class: "lab" });
    if (r.milestone) { const mk = S("path", { d: `M${xs} ${cy - 8}l8 8l-8 8l-8 -8z`, "data-g": "r", style: `fill:${c}` }, s); tip(mk, r.l, r.tip || r.s); }
    else { const b = S("rect", { x: xs + 1, y: cy - 8, width: w, height: 16, rx: 4, "data-g": "x", style: `fill:${c}` }, s); tip(b, r.l, r.tip || `${r.s} · ${r.m} ${r.m > 1 ? "meses" : "mês"}`);
      if (r.tag && tw(r.tag, 10.5, 700) + 12 < w) T(s, xs + 8, cy + 4, r.tag, { style: "font:700 10.5px var(--fb);fill:#fff;pointer-events:none" }); }
  });
  if (d.today) { const x = sx(p(d.today)); S("line", { x1: x, x2: x, y1: 28, y2: Hh - 4, style: "stroke:var(--orange);stroke-width:1.5" }, s); }
};

CHART.heat = (box, d, W) => {
  const lw = d.labelW || 220, ch = d.cellH || 30, hh = d.headH || 40, tW = d.total ? 90 : 0;
  const nC = d.cols.length, cw = (W - lw - tW) / nC, min = d.min != null ? d.min : 1, max = d.max != null ? d.max : 5;
  const ramp = d.ramp || ["#E8EFF7", "o1", "o2", "o3", "o4", "o5"];
  const pick = v => { const t = (v - min) / (max - min); return ramp[Math.max(0, Math.min(ramp.length - 1, Math.round(t * (ramp.length - 1))))]; };
  const dark = c => ["o3", "o4", "o5", "s1", "s4", "crit"].includes(c);
  const Hh = hh + d.rows.length * ch + 4, s = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}` }, box);
  d.cols.forEach((c, j) => mtext(s, lw + cw * j + cw / 2, hh - (wrap(c, cw - 6, 11, 700, 2).length - 1) * 13 - 8, wrap(c, cw - 6, 11, 700, 2), 13, { class: "axt", "text-anchor": "middle", style: "font-weight:700;fill:var(--ink2)" }));
  if (d.total) T(s, lw + cw * nC + tW / 2, hh - 8, d.totalL || "Total", { class: "axt", "text-anchor": "middle", style: "font-weight:800;fill:var(--navy)" });
  const tmax = d.total ? Math.max(...d.rows.map(r => r.t != null ? r.t : r.v.reduce((a, b) => a + b, 0))) : 1;
  d.rows.forEach((r, i) => {
    const y = hh + i * ch;
    T(s, lw - 10, y + ch / 2 + 4, r.l, { class: r.b ? "labb" : "lab", "text-anchor": "end" });
    r.v.forEach((v, j) => {
      const c = v == null ? "#F2F4F7" : pick(v);
      const rc = S("rect", { x: lw + cw * j + 1, y: y + 1, width: cw - 2, height: ch - 2, rx: 4, "data-g": "o", style: `fill:${col(c)};animation-delay:${(i + j) * 25}ms` }, s);
      tip(rc, `${r.l} · ${d.cols[j]}`, v == null ? "sem dado" : fmt(v, d.fmt || "int", d.pre, d.suf));
      T(s, lw + cw * j + cw / 2, y + ch / 2 + 4, v == null ? "—" : (r.vl ? r.vl[j] : fmt(v, d.fmt || "int")), { "text-anchor": "middle", style: `font:700 12px var(--fb);pointer-events:none;fill:${dark(c) ? "#fff" : "var(--navy)"}` });
    });
    if (d.total) { const t = r.t != null ? r.t : r.v.reduce((a, b) => a + b, 0), bx = lw + cw * nC + 10, bw = (tW - 46) * t / tmax;
      S("rect", { x: bx, y: y + ch / 2 - 5, width: bw, height: 10, rx: 3, "data-g": "x", style: `fill:${col(r.tc || "hl")}` }, s);
      T(s, bx + bw + 6, y + ch / 2 + 4, fmt(t, d.tfmt || "int"), { class: "val" }); }
  });
  if (d.scale !== false) { /* legenda de escala */
    const lg = H("div", { class: "ch-legend" }); H("span", null, lg, (d.scaleL || "Escala") + ":"); ramp.slice(1).forEach((c, k) => { const sp = H("span", null, lg); H("i", { style: `background:${col(c)}` }, sp); sp.appendChild(document.createTextNode(d.scaleLabels ? d.scaleLabels[k] : fmt(min + (max - min) * (k + 1) / (ramp.length - 1), "dec1"))); }); box.appendChild(lg); }
};

CHART.scatter = (box, d, W, Hh) => {
  const Hc = Hh || 360, pl = 56, pb = 44, pt = 14, pr = 20, x = d.x, y = d.y;
  const sx = v => pl + (v - x.min) / (x.max - x.min) * (W - pl - pr), sy = v => Hc - pb - (v - y.min) / (y.max - y.min) * (Hc - pb - pt);
  const s = S("svg", { width: W, height: Hc, viewBox: `0 0 ${W} ${Hc}` }, box);
  if (d.quad) { const qx = sx(d.quad.x), qy = sy(d.quad.y);
    S("rect", { x: qx, y: pt, width: W - pr - qx, height: qy - pt, style: "fill:#FFF4E6" }, s);
    S("line", { x1: qx, x2: qx, y1: pt, y2: Hc - pb, style: "stroke:#C9D3DD;stroke-width:1.5" }, s); S("line", { x1: pl, x2: W - pr, y1: qy, y2: qy, style: "stroke:#C9D3DD;stroke-width:1.5" }, s);
    (d.quad.labels || []).forEach((L, k) => { if (!L) return; const lx = k % 2 ? W - pr - 8 : pl + 8, ly = k < 2 ? pt + 16 : Hc - pb - 8; T(s, lx, ly, L, { class: "axt", "text-anchor": k % 2 ? "end" : "start", style: "font-weight:800;letter-spacing:.06em;text-transform:uppercase;fill:#8A99A8" }); }); }
  (x.ticks || ticksOf(x.min, x.max, 4)).forEach(v => { S("line", { x1: sx(v), x2: sx(v), y1: Hc - pb, y2: Hc - pb + 4, style: "stroke:#C9D3DD" }, s); T(s, sx(v), Hc - pb + 17, fmt(v, x.fmt || "int"), { class: "axt", "text-anchor": "middle" }); });
  (y.ticks || ticksOf(y.min, y.max, 4)).forEach(v => { S("line", { x1: pl - 4, x2: pl, y1: sy(v), y2: sy(v), style: "stroke:#C9D3DD" }, s); T(s, pl - 8, sy(v) + 4, fmt(v, y.fmt || "int"), { class: "axt", "text-anchor": "end" }); });
  S("line", { x1: pl, x2: W - pr, y1: Hc - pb, y2: Hc - pb, style: "stroke:#C9D3DD" }, s); S("line", { x1: pl, x2: pl, y1: pt, y2: Hc - pb, style: "stroke:#C9D3DD" }, s);
  T(s, (pl + W - pr) / 2, Hc - 6, x.l, { class: "lab", "text-anchor": "middle", style: "font-weight:700" });
  const yl = T(s, 14, (pt + Hc - pb) / 2, y.l, { class: "lab", "text-anchor": "middle", style: "font-weight:700" }); yl.setAttribute("transform", `rotate(-90 14 ${(pt + Hc - pb) / 2})`);
  const rmax = Math.max(...d.items.map(i => i.r || 1));
  d.items.forEach((it, i) => {
    const r = d.rScale === false ? 8 : 7 + 13 * Math.sqrt((it.r || 1) / rmax), cx = sx(it.x), cy = sy(it.y);
    const c = S("circle", { cx, cy, r, "data-g": "r", style: `fill:${col(it.c || "s1")};fill-opacity:.88;stroke:#fff;stroke-width:2;animation-delay:${i * 50}ms` }, s);
    tip(c, it.l, it.tip || `${x.l}: ${fmt(it.x, x.fmt)} · ${y.l}: ${fmt(it.y, y.fmt)}`);
    const pos = it.pos || "r", off = r + 6, L = it.sl || it.l;
    const ax = pos === "l" ? cx - off : pos === "r" ? cx + off : cx, ay = pos === "t" ? cy - off : pos === "b" ? cy + off + 9 : cy + 4;
    T(s, ax + (it.dx || 0), ay + (it.dy || 0), L, { class: "labb", "text-anchor": pos === "l" ? "end" : pos === "r" ? "start" : "middle", style: "font-size:11.5px" });
  });
};

CHART.waterfall = (box, d, W, Hh) => {
  const Hc = Hh || 280, top = 24, lbH = d.labelH || 36, axW = 36;
  const tot = d.items.reduce((a, b) => a + b.v, 0), all = d.items.concat(d.total ? [{ l: d.total.l || "Total", v: tot, total: true }] : []);
  const max = d.max || niceMax(tot), y0 = Hc - lbH, sy = v => y0 - v / max * (y0 - top);
  const n = all.length, slot = (W - axW) / n, bw = Math.min(d.barW || 56, slot * .62);
  const s = S("svg", { width: W, height: Hc, viewBox: `0 0 ${W} ${Hc}` }, box);
  ticksOf(0, max, 4).forEach(v => { S("line", { x1: axW, x2: W, y1: sy(v), y2: sy(v), class: "ax" }, s); T(s, axW - 8, sy(v) + 4, fmt(v, d.fmt), { class: "axt", "text-anchor": "end" }); });
  let acc = 0;
  all.forEach((it, i) => {
    const cx = axW + slot * i + slot / 2, a = it.total ? 0 : acc, b = it.total ? tot : acc + it.v;
    const yTop = sy(b), h = Math.max(2, sy(a) - sy(b));
    const r = S("path", { d: barPath(cx - bw / 2, yTop, bw, h, 4, "up"), "data-g": "y", style: `fill:${col(it.c || (it.total ? "o5" : (d.c || "s1")))};animation-delay:${i * 80}ms` }, s);
    tip(r, it.l, it.tip || fmt(it.v, d.fmt, d.pre, d.suf));
    T(s, cx, yTop - 7, (it.total ? "" : "+") + fmt(it.v, d.fmt, d.pre, d.suf), { class: "val", "text-anchor": "middle" });
    mtext(s, cx, y0 + 16, wrap(it.l, slot - 6, 11.5, it.total ? 700 : 500, 2), 13, { class: it.total ? "labb" : "lab", "text-anchor": "middle", style: "font-size:11.5px" });
    if (!it.total && i < all.length - 1) S("line", { x1: cx + bw / 2, x2: cx + slot - bw / 2, y1: sy(b), y2: sy(b), style: "stroke:#AAB7C4;stroke-width:1" }, s);
    if (!it.total) acc = b;
  });
  S("line", { x1: axW, x2: W, y1: y0, y2: y0, style: "stroke:#C9D3DD" }, s);
};

CHART.radar = (box, d, W, Hh) => {
  const size = Hh || Math.min(W, 320), cx = W / 2, cy = size / 2, R = Math.max(40, Math.min(size / 2 - 40, W / 2 - (d.labelSpace || 118))), n = d.axes.length, max = d.max || 5;
  if (d.series.length > 1) legend(box, d.series.map((se, i) => ({ l: se.l, c: se.c || ["s1", "s2", "s3", "s4"][i] })));
  const s = S("svg", { width: W, height: size, viewBox: `0 0 ${W} ${size}` }, box);
  const pt = (k, v) => { const a = -Math.PI / 2 + k * 2 * Math.PI / n, rr = R * v / max; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
  for (let L = 1; L <= max; L++) S("polygon", { points: d.axes.map((_, k) => pt(k, L).join(",")).join(" "), style: "fill:none;stroke:var(--grid)" }, s);
  d.axes.forEach((a, k) => { const [x, y] = pt(k, max); S("line", { x1: cx, y1: cy, x2: x, y2: y, class: "ax" }, s);
    const [lx, ly] = pt(k, max * 1.14); const anc = Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
    const room = anc === "middle" ? W - 8 : anc === "start" ? W - lx - 4 : lx - 4, lines = wrap(a, Math.max(60, Math.min(room, 130)), 11.5, 600, 2);
    mtext(s, lx, ly + 4 - (lines.length - 1) * 6, lines, 13, { class: "lab", "text-anchor": anc, style: "font-size:11.5px;font-weight:600" }); });
  d.series.forEach((se, i) => { const c = col(se.c || ["s1", "s2", "s3", "s4"][i]);
    const pg = S("polygon", { points: se.v.map((v, k) => pt(k, v).join(",")).join(" "), "data-g": "r", style: `fill:${c};fill-opacity:.12;stroke:${c};stroke-width:2;stroke-linejoin:round` }, s);
    tip(pg, se.l, se.v.map((v, k) => `${d.axes[k]} ${fmt(v, d.fmt)}`).join(" · "));
    se.v.forEach((v, k) => { const [x, y] = pt(k, v); tip(S("circle", { cx: x, cy: y, r: 4.5, style: `fill:${c};stroke:#fff;stroke-width:2` }, s), `${se.l} · ${d.axes[k]}`, fmt(v, d.fmt)); }); });
};

CHART.timeline = (box, d, W, Hh) => {
  const Hc = Hh || 230, n = d.items.length, pad = d.pad || 90, step = (W - pad * 2) / Math.max(1, n - 1), ly = Hc / 2;
  const s = S("svg", { width: W, height: Hc, viewBox: `0 0 ${W} ${Hc}` }, box);
  S("line", { x1: 20, x2: W - 20, y1: ly, y2: ly, "data-g": "x", style: "stroke:var(--o3);stroke-width:2" }, s);
  d.items.forEach((it, i) => {
    const x0 = n === 1 ? W / 2 : pad + i * step, up = i % 2 === 0, c = col(it.c || "s1"), tw0 = Math.min(step * 1.7, d.textW || 240);
    const tl = wrap(it.t, tw0, 12.5, 700, 2).concat(it.s ? wrap(it.s, tw0, 11.5, 500, 3) : []), half = Math.max(...tl.map((ln, k) => tw(ln, k < 2 ? 12.5 : 11.5, k < 2 ? 700 : 500))) / 2;
    const x = Math.max(half + 2, Math.min(W - half - 2, x0));
    if (x !== x0) S("line", { x1: x0, x2: x, y1: up ? ly - 22 : ly + 22, y2: up ? ly - 22 : ly + 22, style: "stroke:#C9D3DD" }, s);
    S("line", { x1: x0, x2: x0, y1: ly, y2: up ? ly - 22 : ly + 22, style: "stroke:#C9D3DD" }, s);
    tip(S("circle", { cx: x0, cy: ly, r: 7, "data-g": "r", style: `fill:${c};stroke:#fff;stroke-width:2.5;animation-delay:${i * 90}ms` }, s), it.t, it.s || it.d);
    const lines = wrap(it.t, tw0, 12.5, 700, 2), sub = it.s ? wrap(it.s, tw0, 11.5, 500, 3) : [];
    if (up) { const y = ly - 30 - (sub.length * 14) - (lines.length - 1) * 15;
      T(s, x, y - 18, it.d, { class: "axt", "text-anchor": "middle", style: "font-weight:800;fill:var(--orange-d)" });
      mtext(s, x, y, lines, 15, { class: "labb", "text-anchor": "middle", style: "font-size:12.5px" });
      if (sub.length) mtext(s, x, y + lines.length * 15, sub, 14, { class: "axt", "text-anchor": "middle", style: "font-size:11.5px" });
    } else { const y = ly + 44;
      T(s, x, y - 4, it.d, { class: "axt", "text-anchor": "middle", style: "font-weight:800;fill:var(--orange-d)" });
      mtext(s, x, y + 14, lines, 15, { class: "labb", "text-anchor": "middle", style: "font-size:12.5px" });
      if (sub.length) mtext(s, x, y + 14 + lines.length * 15, sub, 14, { class: "axt", "text-anchor": "middle", style: "font-size:11.5px" }); }
  });
};

function drawChart(box) {
  if (box.dataset.done) return;
  const sc = box.querySelector('script[type="application/json"]'); if (!sc) return;
  let d; try { d = JSON.parse(sc.textContent); } catch (e) { box.textContent = "Erro no JSON do gráfico: " + e.message; console.error(e, box); return; }
  const type = box.dataset.type, fn = CHART[type]; if (!fn) { console.error("Tipo de gráfico desconhecido:", type); return; }
  if (d.title) H("div", { class: "ch-title" }, box, d.title);
  const W = box.clientWidth || +box.dataset.w || 600, Hh = +box.dataset.h || 0;
  try { fn(box, d, W, Hh); } catch (e) { console.error("Falha no gráfico", type, e); }
  if (d.note) H("div", { class: "ch-note" }, box, d.note);
  box.dataset.done = "1";
}

/* =====================================================================
   MOLDURA
   ===================================================================== */
const stage = $("stage");
const slides = [...stage.querySelectorAll(":scope > .slide")];
const N = slides.length;
const BRAND_S = META.marca || "Digital & Technology Services";
const DECK = META.titulo || document.title;
const AMDECO = `<svg class="am-deco" viewBox="0 0 520 80" preserveAspectRatio="xMaxYMid slice" aria-hidden="true"><path d="M40 80 L100 0" stroke="#F78C16" stroke-width="1.4" fill="none"/><path d="M150 80 L210 0" stroke="#5E8AB4" stroke-width="7" fill="none" opacity=".55"/><path d="M190 80 V0" stroke="#F78C16" stroke-width="1.2" opacity=".7"/><path d="M280 80 L340 0" stroke="#5E8AB4" stroke-width="16" fill="none" opacity=".45"/><path d="M350 80 V0" stroke="#5E8AB4" stroke-width="5" opacity=".45"/><path d="M420 80 L480 0" stroke="#F78C16" stroke-width="1.4" fill="none" opacity=".8"/></svg>`;
const AMMARK = `<svg class="am-mark" viewBox="0 0 46 46" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l11 14L5 37" stroke="#F78C16"/><path d="M15 9l11 14-11 14" stroke="#5E8AB4"/><path d="M25 9l11 14-11 14" stroke="#9DBBD9"/></svg>`;
const SLOGAN = META.slogan === false ? "" : (META.slogan || "Leadership. Action. Results.℠");
function kin(el) {
  let k = 0; const walk = n => [...n.childNodes].forEach(c => {
    if (c.nodeType === 3) { const parts = c.textContent.split(/(\s+)/); const f = document.createDocumentFragment();
      parts.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(p)); return; } const w = document.createElement("span"); w.className = "kw"; const i = document.createElement("span"); i.style.setProperty("--k", k++); i.textContent = p; w.appendChild(i); f.appendChild(w); });
      c.replaceWith(f); }
    else if (c.nodeType === 1 && !c.classList.contains("kw")) walk(c); });
  walk(el);
}
slides.forEach((s, i) => {
  if (s.dataset.band) {
    const top = H("div", { class: "sr-top" }); const p = (s.dataset.p || "").split(" · ");
    top.innerHTML = `${AMDECO}${AMMARK}<div class="am-wm"><span class="am-a">Alvarez &amp; Marsal</span><span class="am-s">${esc(BRAND_S)}</span></div><div class="am-div"></div>` +
      `<div class="am-title"><b>${esc(s.dataset.t || "")}</b><span>${p.length > 1 ? "Parte " + esc(p[0]) + " · " + esc(p.slice(1).join(" · ")) : esc(p[0] || "")}</span></div>` +
      `<div class="am-right"><span class="am-dot"></span>${esc(DECK)}<span class="am-chip">${i + 1} / ${N}</span></div>`;
    s.prepend(top); s.prepend(H("div", { class: "sr-dec" }, null, "▸▸▸▸▸▸▸▸▸▸▸▸"));
    const band = H("div", { class: "sr-band " + (s.dataset.c || "c-navy") });
    band.innerHTML = `<span>›</span><span class="bt">${esc(s.dataset.band)}</span>${s.dataset.bs ? `<small>${esc(s.dataset.bs)}</small>` : ""}`;
    top.after(band); kin(band.querySelector(".bt"));
  }
  if (s.hasAttribute("data-nofoot")) return;
  const f = H("div", { class: "foot" }, s); H("b", null, f, META.rodape || "A&M · DTS · IT M&A");
  if (s.dataset.src) H("span", { class: "s", title: s.dataset.src }, f, s.dataset.src);
  H("span", { class: "n" }, f, `${i + 1} / ${N}`);
});
document.querySelectorAll(".kin").forEach(kin);

/* capa: marca e arte */
document.querySelectorAll(".cv-brand").forEach(b => { if (!b.innerHTML.trim()) b.innerHTML = `${AMMARK}<span class="am-wm"><span class="am-a">Alvarez &amp; Marsal</span><span class="am-s">${esc(BRAND_S)}</span></span>${SLOGAN ? `<span class="am-slogan">${esc(SLOGAN)}</span>` : ""}`; });
document.querySelectorAll(".cv-deco").forEach(box => {
  const s = S("svg", { viewBox: "0 0 760 760", width: "100%", height: "100%" }, box), cx = 380, cy = 380;
  [140, 215, 290, 350].forEach((r, i) => S("circle", { cx, cy, r, style: `fill:none;stroke:rgba(255,255,255,${.07 + i * .02});stroke-width:1` }, s));
  const gr = S("linearGradient", { id: "cvg", x1: 0, y1: 0, x2: 1, y2: 1 }, S("defs", null, s)); S("stop", { offset: 0, "stop-color": "#F78C16" }, gr); S("stop", { offset: 1, "stop-color": "#5E8AB4" }, gr);
  S("circle", { cx, cy, r: 215, pathLength: 1, class: "cv-arc", transform: `rotate(-90 ${cx} ${cy})`, style: "fill:none;stroke:url(#cvg);stroke-width:6;stroke-linecap:round;stroke-dasharray:.72 1" }, s);
  for (let k = 0; k < 60; k++) { const a = k / 60 * 2 * Math.PI; S("line", { x1: cx + 290 * Math.cos(a), y1: cy + 290 * Math.sin(a), x2: cx + (k % 5 ? 296 : 304) * Math.cos(a), y2: cy + (k % 5 ? 296 : 304) * Math.sin(a), style: "stroke:rgba(255,255,255,.25)" }, s); }
  const nos = META.nos || []; nos.forEach((t, k) => {
    const a = -Math.PI / 2 + k / nos.length * 2 * Math.PI, x = cx + 215 * Math.cos(a), y = cy + 215 * Math.sin(a);
    S("circle", { cx: x, cy: y, r: 9, style: "fill:#F78C16;stroke:#0E1C39;stroke-width:4" }, s);
    const lx = cx + 268 * Math.cos(a), ly = cy + 268 * Math.sin(a);
    const t2 = T(s, lx, ly + 5, t, { "text-anchor": Math.abs(lx - cx) < 30 ? "middle" : lx > cx ? "start" : "end", style: "font:700 17px var(--fh);letter-spacing:.06em;text-transform:uppercase;fill:#fff" });
    t2.setAttribute("data-a", "fade"); t2.style.setProperty("--d", 4 + k);
  });
  if (META.centro) { T(s, cx, cy + 4, META.centro[0], { "text-anchor": "middle", style: "font:800 92px var(--fh);fill:#fff" }); if (META.centro[1]) T(s, cx, cy + 40, META.centro[1], { "text-anchor": "middle", style: "font:600 15px var(--fb);fill:#9DB7CE;letter-spacing:.12em;text-transform:uppercase" }); }
});

/* =====================================================================
   INTERAÇÕES
   ===================================================================== */
document.querySelectorAll("[data-pane]").forEach(btn => btn.addEventListener("click", () => {
  const grp = btn.parentElement; const sl = btn.closest(".slide");
  grp.querySelectorAll("[data-pane]").forEach(b => { b.classList.toggle("on", b === btn); const p = sl.querySelector("#" + b.dataset.pane); if (p) p.classList.toggle("on", b === btn); });
  const p = sl.querySelector("#" + btn.dataset.pane); if (p) p.querySelectorAll(".ch").forEach(c => { if (!c.dataset.done) drawChart(c); });
}));
document.querySelectorAll("[data-show]").forEach(el => el.addEventListener("click", () => {
  const sl = el.closest(".slide"), tg = sl.querySelector("#" + el.dataset.show); if (!tg) return; const g = tg.dataset.grp;
  sl.querySelectorAll(`.det[data-grp="${g}"]`).forEach(d => d.classList.toggle("on", d === tg));
  sl.querySelectorAll(`[data-show]`).forEach(o => { const t2 = sl.querySelector("#" + o.dataset.show); if (t2 && t2.dataset.grp === g) o.classList.toggle("sel", o === el); });
}));
document.querySelectorAll(".flip").forEach(f => f.addEventListener("click", () => f.classList.toggle("on")));

/* dicas */
const tipEl = $("tip");
document.addEventListener("mousemove", e => {
  const t = e.target.closest && e.target.closest("[data-tv]");
  if (!t) { tipEl.classList.remove("on"); return; }
  tipEl.querySelector("b").textContent = t.getAttribute("data-tv"); tipEl.querySelector("span").textContent = t.getAttribute("data-tl") || "";
  tipEl.classList.add("on"); const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
  let x = e.clientX + 16, y = e.clientY + 16; if (x + w > innerWidth - 8) x = e.clientX - w - 16; if (y + h > innerHeight - 8) y = e.clientY - h - 16;
  tipEl.style.left = x + "px"; tipEl.style.top = y + "px";
});

/* contadores */
function countUp(el) {
  const to = +el.dataset.count, dec = +(el.dataset.dec || 0), pre = el.dataset.pre || "", suf = el.dataset.suf || "";
  const f = v => pre + (dec ? v.toFixed(dec).replace(".", ",") : Math.round(v).toLocaleString("pt-BR")) + suf;
  if (REDMO) { el.textContent = f(to); return; }
  const t0 = performance.now(), D = 1100; const step = t => { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); el.textContent = f(to * e); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step);
}
document.querySelectorAll("[data-count]").forEach(el => { const dec = +(el.dataset.dec || 0); el.textContent = (el.dataset.pre || "") + (dec ? (+el.dataset.count).toFixed(dec).replace(".", ",") : (+el.dataset.count).toLocaleString("pt-BR")) + (el.dataset.suf || ""); });

/* =====================================================================
   NAVEGAÇÃO
   ===================================================================== */
let cur = 0, busy = false;
const CH = META.capitulos || {};
function fit() {
  const vw = innerWidth, vh = innerHeight, sm = vw < 760, pad = sm ? 8 : 22, bar = sm ? 54 : 64;
  const sc = Math.min((vw - pad * 2) / 1600, (vh - pad - bar) / 900);
  stage.style.left = vw / 2 + "px"; stage.style.top = (pad + (vh - pad - bar) / 2) + "px"; stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
}
addEventListener("resize", fit);
function animCharts(n) {
  if (REDMO) return;
  n.querySelectorAll(".ch [data-g]").forEach(el => {
    const g = el.dataset.g, delay = parseFloat(el.style.animationDelay) || 0, o = { duration: 900, delay: 250 + delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" };
    el.style.transformBox = "fill-box";
    if (g === "x") { el.style.transformOrigin = "left center"; el.animate([{ transform: "scaleX(0)" }, { transform: "none" }], o); }
    else if (g === "y") { el.style.transformOrigin = "center bottom"; el.animate([{ transform: "scaleY(0)" }, { transform: "none" }], o); }
    else if (g === "r") { el.style.transformOrigin = "center"; el.animate([{ transform: "scale(0)", opacity: 0 }, { transform: "none", opacity: 1 }], o); }
    else if (g === "d") { el.style.strokeDasharray = "1 1"; el.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], Object.assign(o, { duration: 1100 })); }
    else el.animate([{ opacity: 0 }, { opacity: 1 }], o);
  });
  n.querySelectorAll(".cv-arc").forEach(a => a.animate([{ strokeDasharray: "0 1" }, { strokeDasharray: ".72 1" }], { duration: 1600, delay: 400, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }));
  n.querySelectorAll(".lv .fl[data-w]").forEach(f => { f.style.transition = "none"; f.style.width = "0"; void f.offsetWidth; f.style.transition = ""; setTimeout(() => f.style.width = f.dataset.w + "%", 300); });
}
function activate(i, inst, back) {
  const n = slides[i];
  slides.forEach((s, k) => { if (k !== i) s.classList.remove("active", "entering", "play", "back"); });
  n.classList.remove("play", "entering", "back"); void n.offsetWidth; n.classList.add("active", "play");
  if (!inst && !REDMO) { n.classList.add("entering"); if (back) n.classList.add("back"); }
  cur = i;
  $("cnt").textContent = `${i + 1} / ${N}`; $("progress").style.width = ((i + 1) / N * 100) + "%";
  $("bPrev").disabled = i === 0; $("bNext").disabled = i === N - 1;
  document.querySelectorAll("#dots button").forEach((b, k) => b.classList.toggle("on", k === i));
  history.replaceState(null, "", location.pathname + location.search + "#" + (i + 1));
  n.querySelectorAll(".ch").forEach(drawChart);
  animCharts(n); n.querySelectorAll("[data-count]").forEach(countUp);
}
function chapter(meta, done) {
  const c = $("chap");
  c.innerHTML = `<div class="n">${esc(meta[0])}</div><div class="ey">PARTE ${esc(meta[0])}</div><h1>${esc(meta[1])}</h1><p>${esc(meta[2] || "")}</p><div class="ln"></div><div class="sk">clique para pular ›</div>`;
  kin(c.querySelector("h1")); c.classList.add("on", "play");
  c.querySelector(".ln").animate([{ width: "0px" }, { width: "520px" }], { duration: 900, delay: 300, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
  c.querySelector("p").animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: 500, fill: "backwards" });
  let ended = false; const end = () => { if (ended) return; ended = true; c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400 }).onfinish = () => { c.classList.remove("on", "play"); c.innerHTML = ""; }; done(); };
  c.onclick = end; setTimeout(end, 2000);
}
function go(i, inst) {
  i = Math.max(0, Math.min(N - 1, i)); if (i === cur && !inst) return; if (busy) return;
  const back = i < cur, nextP = slides[i].dataset.p, prevP = slides[cur].dataset.p;
  if (inst || REDMO) { activate(i, true, back); return; }
  const chap = !back && nextP && nextP !== prevP && CH[nextP]; busy = true;
  const w = $("wipe"); w.style.visibility = "visible"; const bars = [...w.querySelectorAll("i")], dir = back ? -1 : 1;
  bars.forEach((b, k) => b.animate([{ transform: `translateX(${-110 * dir}%) skewX(-12deg)` }, { transform: "translateX(0) skewX(-12deg)" }], { duration: 380, delay: k * 60, easing: "cubic-bezier(.7,0,.3,1)", fill: "forwards" }));
  setTimeout(() => {
    const after = () => {
      bars.forEach((b, k) => b.animate([{ transform: "translateX(0) skewX(-12deg)" }, { transform: `translateX(${110 * dir}%) skewX(-12deg)` }], { duration: 380, delay: (2 - k) * 60, easing: "cubic-bezier(.7,0,.3,1)", fill: "forwards" }));
      setTimeout(() => { w.style.visibility = "hidden"; busy = false; }, 560);
      activate(i, false, back);
    };
    if (chap) chapter(chap, after); else after();
  }, 520);
}
/* controles */
const ctr = $("controls");
if (META.indice !== false) { const a = H("a", { class: "g", href: META.indiceHref || "index.html", title: "Voltar ao índice de apresentações" }, null); a.innerHTML = `☰<span class="lb">Índice</span>`; ctr.prepend(a); }
$("bPrev").addEventListener("click", () => go(cur - 1)); $("bNext").addEventListener("click", () => go(cur + 1));
slides.forEach((s, i) => { const b = H("button", { title: s.dataset.t || ("Slide " + (i + 1)), "aria-label": s.dataset.t || ("Slide " + (i + 1)) }, $("dots")); b.addEventListener("click", () => go(i)); });
addEventListener("keydown", e => {
  if (e.target.closest && e.target.closest("input,textarea,select")) return;
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(cur - 1); }
  else if (e.key === "Home") go(0); else if (e.key === "End") go(N - 1);
  else if (e.key === "f" || e.key === "F") { if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen(); }
});
let tx = null; stage.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
stage.addEventListener("touchend", e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); tx = null; });

/* gráficos: desenhados com o slide mensurável (fontes carregadas) */
function renderAll() {
  slides.forEach(s => { const was = s.classList.contains("active"); if (!was) s.classList.add("measure"); s.querySelectorAll(".pane:not(.on) .ch").forEach(c => c.dataset.lazy = "1"); s.querySelectorAll(".ch:not([data-lazy])").forEach(drawChart); if (!was) s.classList.remove("measure"); });
}
addEventListener("beforeprint", () => { slides.forEach(s => { s.classList.add("measure"); s.querySelectorAll(".ch").forEach(c => { delete c.dataset.lazy; drawChart(c); }); s.classList.remove("measure"); }); });
fit();
const start = Math.max(0, Math.min(N - 1, (parseInt(location.hash.slice(1), 10) || 1) - 1));
const boot = () => { renderAll(); activate(start, true); document.documentElement.classList.add("ready"); };
(document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve()).then(boot);
window.__deck = { go: i => go(i, true), get cur() { return cur; }, N, slides };
})();
