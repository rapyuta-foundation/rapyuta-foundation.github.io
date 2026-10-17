/*
 * rf_logo.js: Rapyuta Robotics mark and the rapyuta foundation lockup, generated from geometry.
 *
 * The mark is built from two circle sizes only:
 *   small circle radius r
 *   large circle radius R = r * PHI (golden ratio)
 * Circle centers sit on a 3 x 2 grid with spacing d = r + R, so every small circle
 * touches the large arcs tangentially. With r = 56.65 this reproduces the 2022
 * Rapyuta Robotics logo (R = 91.66 vs 91.65 in the original artwork).
 *
 * Wordmark glyphs ("rapyuta", "robotics") are the original 2022 artwork outlines.
 * "foundation" is a first draft assembled from the "robotics" glyphs
 * (o, b, t, i reused; d and a mirrored from b; n, u, f constructed to the same
 * 13.73-unit stroke weight).
 */
(function (global) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const BLACK = '#231f20';
  const RED = '#e11a27';

  // ---- mark ---------------------------------------------------------------
  function markGeometry(r = 56.65, x1 = 56.65, y1 = 77.16) {
    const R = r * PHI;
    const d = r + R;
    const x2 = x1 + d, x3 = x1 + 2 * d, y2 = y1 + d;
    const f = (n) => +n.toFixed(3);
    const ribbon = [
      `M${f(x1)},${f(y1 + r)}`,
      `A${f(r)},${f(r)} 0 1 1 ${f(x1 + r)},${f(y1)}`,          // small circle, top-left
      `A${f(R)},${f(R)} 0 0 0 ${f(x2)},${f(y1 + R)}`,          // large arc under the top-middle dot
      `A${f(R)},${f(R)} 0 0 0 ${f(x2 + R)},${f(y1)}`,
      `A${f(r)},${f(r)} 0 1 1 ${f(x3)},${f(y1 + r)}`,          // small circle, top-right
      `A${f(R)},${f(R)} 0 0 0 ${f(x3 - R)},${f(y2)}`,          // large arc around the red dot
      `A${f(r)},${f(r)} 0 0 1 ${f(x2)},${f(y2 + r)}`,          // small circle, bottom-middle
      `A${f(r)},${f(r)} 0 0 1 ${f(x2 - r)},${f(y2)}`,
      `A${f(R)},${f(R)} 0 0 0 ${f(x1)},${f(y1 + r)}`,          // large arc over the bottom-left dot
      'Z'
    ].join(' ');
    return {
      r, R, d, ribbon,
      dots: [
        { cx: x2, cy: y1, fill: BLACK },   // top middle
        { cx: x1, cy: y2, fill: BLACK },   // bottom left
        { cx: x3, cy: y2, fill: RED, accent: true }  // bottom right: the red circle
      ],
      width: x3 + r, height: y2 + r
    };
  }

  function markSVG(opts = {}) {
    const g = markGeometry(opts.r, opts.x1, opts.y1);
    const ink = opts.ink || BLACK;
    const accent = opts.accent || RED;
    const dots = g.dots.map(c => (c.accent && opts.accentShape)
      ? opts.accentShape(c.cx, c.cy, g.r, accent, opts.paper || '#ffffff')
      : `<circle cx="${+c.cx.toFixed(3)}" cy="${+c.cy.toFixed(3)}" r="${+g.r.toFixed(3)}" fill="${c.accent ? accent : ink}"/>`
    ).join('');
    return `<g class="rr-mark"><path d="${g.ribbon}" fill="${ink}"/>${dots}</g>`;
  }

  // ---- original wordmark outlines (2022 artwork) --------------------------
  const RAPYUTA = [
    'M501.08,104.7h-25.8V20.52h25.8v14.03c5.88-8.9,15.09-14.94,26.4-14.94v27.31h-7.09c-12.22,0-19.31,4.22-19.31,18.71v39.08Z',
    'M579.39,41.79c-9.66,0-18.41,7.24-18.41,20.67s8.75,20.97,18.41,20.97,18.4-7.39,18.4-20.82-8.6-20.82-18.4-20.82Zm-7.54-22.48c12.52,0,21.42,5.73,25.95,13.12v-11.92h25.8V104.7h-25.8v-11.92c-4.68,7.39-13.58,13.12-26.1,13.12-20.52,0-36.96-16.89-36.96-43.45s16.44-43.14,37.12-43.14Z',
    'M686.35,41.79c-9.66,0-18.41,7.39-18.41,20.82s8.75,20.82,18.41,20.82,18.56-7.54,18.56-20.97-8.75-20.67-18.56-20.67Zm7.69-22.48c20.67,0,37.11,16.59,37.11,43.14s-16.44,43.45-37.11,43.45c-12.37,0-21.27-5.88-25.95-12.97v51.9h-25.8V20.52h25.8v11.92c4.68-7.39,13.58-13.12,25.95-13.12Z',
    'M802.82,20.52L830.73,20.52L777.93,144.68L750.17,144.68L769.48,101.83L735.23,20.52L764.05,20.52L783.51,73.17Z',
    'M923.22,104.7h-25.8v-11.46c-5.13,7.24-14.18,12.37-25.5,12.37-19.46,0-32.59-13.43-32.59-35.91V20.52h25.65v45.71c0,11.47,6.49,17.8,16.14,17.8s16.29-6.34,16.29-17.8V20.52h25.8V104.7Z',
    'M945.85,41.94h-10.26V20.52h10.26V0h25.8V20.52h16.9v21.42h-16.9v33.79c0,4.98,2.11,7.09,7.84,7.09h9.21v21.88h-13.13c-17.5,0-29.72-7.39-29.72-29.27V41.94Z',
    'M1042.56,41.79c-9.66,0-18.41,7.24-18.41,20.67s8.75,20.97,18.41,20.97,18.41-7.39,18.41-20.82-8.6-20.82-18.41-20.82Zm-7.54-22.48c12.52,0,21.42,5.73,25.95,13.12v-11.92h25.8V104.7h-25.8v-11.92c-4.68,7.39-13.58,13.12-26.1,13.12-20.52,0-36.96-16.89-36.96-43.45s16.44-43.14,37.11-43.14Z'
  ];
  const ROBOTICS = [
    'M489.02,282.11h-13.73v-82.67h13.73v13.43c4.68-9.2,13.58-14.94,26.7-14.94v14.18h-3.62c-13.13,0-23.08,5.88-23.08,25.05v44.96Z',
    'M565.67,271.4c14.33,0,28.36-9.81,28.36-30.78s-13.73-30.63-27.91-30.63-27.61,9.81-27.61,30.63,12.82,30.78,27.16,30.78Zm0,12.07c-23.38,0-41.19-16.59-41.19-42.85s18.41-42.55,41.79-42.55,41.79,16.44,41.79,42.55-18.86,42.85-42.39,42.85Z',
    'M666.91,209.99c-14.94,0-28.06,11.46-28.06,30.63s13.13,30.78,28.06,30.78,28.06-11.46,28.06-30.93-12.83-30.48-28.06-30.48Zm2.86-11.92c22.33,0,39.23,16.59,39.23,42.39s-17.05,43-39.23,43c-15.08,0-25.8-7.54-30.93-16.59v15.24h-13.73v-111.64h13.73v44.35c5.28-9.2,16.29-16.75,30.93-16.75Z',
    'M767.23,271.4c14.33,0,28.36-9.81,28.36-30.78s-13.73-30.63-27.91-30.63-27.61,9.81-27.61,30.63,12.82,30.78,27.15,30.78Zm0,12.07c-23.38,0-41.19-16.59-41.19-42.85s18.41-42.55,41.79-42.55,41.79,16.44,41.79,42.55-18.86,42.85-42.39,42.85Z',
    'M833.32,210.75h-10.71v-11.31h10.71v-20.82h13.73v20.82h21.58v11.31h-21.58v48.73c0,8.15,3.02,11.01,11.47,11.01h10.11v11.62h-12.37c-14.64,0-22.93-6.03-22.93-22.63v-48.73Z',
    'M894.87,199.43h13.73v82.67h-13.73v-82.67Zm-2.26-22.78c0-5.28,4.07-9.35,9.35-9.35,4.98,0,9.05,4.07,9.05,9.35s-4.07,9.36-9.05,9.36c-5.28,0-9.35-4.08-9.35-9.36Z',
    'M971.07,198.07c20.52,0,33.95,10.56,38.17,27.91h-14.79c-2.87-9.96-11.16-16.29-23.38-16.29-15.09,0-26.25,10.71-26.25,30.93s11.16,31.23,26.25,31.23c12.22,0,20.37-5.88,23.38-16.29h14.79c-4.22,16.45-17.65,27.91-38.17,27.91-23.54,0-40.28-16.59-40.28-42.85s16.75-42.55,40.28-42.55Z',
    'M1058.27,283.46c-19.31,0-32.89-10.56-33.79-25.65h14.18c.75,7.99,7.84,14.03,19.46,14.03,10.86,0,16.9-5.43,16.9-12.22,0-18.41-48.88-7.69-48.88-38.47,0-12.67,11.92-23.08,30.32-23.08s30.33,9.81,31.23,25.95h-13.73c-.6-8.3-6.94-14.34-17.96-14.34-10.11,0-16.14,4.83-16.14,11.47,0,19.61,47.98,8.9,48.58,38.47,0,13.58-11.92,23.84-30.18,23.84Z'
  ];

  // ---- "foundation" draft glyphs (light weight, same metrics as "robotics") ----
  const BASE = 282.11, XH = 199.43, ASC = 170.47, STEM = 13.73;
  const O_PATH = ROBOTICS[1], O_L = 524.48, O_W = 82.98;
  const B_PATH = ROBOTICS[2], B_L = 625.11, B_W = 83.89;
  const A_PATH = B_PATH.replace('v-111.64h13.73v44.35', 'v-82.68h13.73v15.39'); // b with the stem cut to x-height
  const T_PATH = ROBOTICS[4], T_L = 822.61, T_W = 46.02;
  const I_PATH = ROBOTICS[5], I_L = 892.61, I_W = 17.75;
  const N_W = 69;
  const F_W = 46.02;

  function nGlyph(L, ink) {
    const cl = L + STEM / 2, cr = L + N_W - STEM / 2, yj = 240, rx = (cr - cl) / 2, ry = yj - (198.07 + STEM / 2);
    return `<path d="M${cl},${XH} V${BASE} M${cl},${yj} A${rx},${ry} 0 0 1 ${cr},${yj} V${BASE}" fill="none" stroke="${ink}" stroke-width="${STEM}"/>`;
  }
  function uGlyph(L, ink) {
    const cx = L + N_W / 2, cy = (XH + BASE) / 2;
    return `<g transform="rotate(180 ${cx} ${cy})">${nGlyph(L, ink)}</g>`;
  }
  function fGlyph(L, ink) {
    // L = left edge of the crossbar (same crossbar as "t")
    const sl = L + 10.71, sc = sl + STEM / 2, rad = 17, top = ASC + STEM / 2;
    return `<path d="M${sc},${BASE} V${top + rad} A${rad},${rad} 0 0 1 ${sc + rad},${top} H${sl + 31}" fill="none" stroke="${ink}" stroke-width="${STEM}"/>` +
           `<rect x="${L}" y="${XH}" width="${F_W}" height="11.32" fill="${ink}"/>`;
  }
  const move = (path, fromL, toL, ink) => `<path transform="translate(${+(toL - fromL).toFixed(3)} 0)" d="${path}" fill="${ink}"/>`;
  const mirror = (path, fromL, w, toL, ink) => `<path transform="translate(${+(toL + w + fromL).toFixed(3)} 0) scale(-1 1)" d="${path}" fill="${ink}"/>`;

  // spacing follows the "robotics" rhythm: round-to-stem about 17, stem-to-stem about 18
  const FOUNDATION = [
    ['f', F_W, 6], ['o', O_W, 17], ['u', N_W, 18], ['n', N_W, 17], ['d', B_W, 17],
    ['a', B_W, 10], ['t', T_W, 15], ['i', I_W, 20], ['o', O_W, 17], ['n', N_W, 0]
  ];
  function foundationWidth() { return FOUNDATION.reduce((s, [, w, g]) => s + w + g, 0); }

  function foundationSVG(startX, ink) {
    let x = startX, out = '';
    for (const [ch, w, gap] of FOUNDATION) {
      if (ch === 'f') out += fGlyph(x, ink);
      if (ch === 'o') out += move(O_PATH, O_L, x, ink);
      if (ch === 'u') out += uGlyph(x, ink);
      if (ch === 'n') out += nGlyph(x, ink);
      if (ch === 'd') out += mirror(B_PATH, B_L, B_W, x, ink);
      if (ch === 'a') out += mirror(A_PATH, B_L, B_W, x, ink);
      if (ch === 't') out += move(T_PATH, T_L, x, ink);
      if (ch === 'i') out += move(I_PATH, I_L, x, ink);
      x += w + gap;
    }
    return out;
  }

  // ---- lockups ------------------------------------------------------------
  const TEXT_X = 475.28, RIGHT = 1088.44, H = 283.46;

  function rrLogoSVG(opts = {}) {
    const ink = opts.ink || BLACK;
    const words = RAPYUTA.concat(ROBOTICS).map(d => `<path d="${d}" fill="${ink}"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${RIGHT} ${H}" role="img" aria-label="Rapyuta Robotics">${markSVG(opts)}${words}</svg>`;
  }

  // fit: "width" scales "foundation" to the width of "rapyuta"; "size" keeps the "robotics" letter size
  function rfLogoSVG(opts = {}) {
    const ink = opts.ink || BLACK;
    const fit = opts.fit || 'width';
    const top = RAPYUTA.map(d => `<path d="${d}" fill="${ink}"/>`).join('');
    const w = foundationWidth();
    let body, vbW = RIGHT;
    if (fit === 'width') {
      const s = (RIGHT - TEXT_X) / w;
      body = `<g transform="translate(${TEXT_X} ${BASE}) scale(${+s.toFixed(5)}) translate(${-TEXT_X} ${-BASE})">${foundationSVG(TEXT_X, ink)}</g>`;
    } else {
      body = foundationSVG(TEXT_X, ink);
      vbW = Math.ceil(TEXT_X + w + 1);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${H + (opts.padBottom || 0)}" role="img" aria-label="rapyuta foundation">${markSVG(opts)}${top}${body}</svg>`;
  }

  // ---- regular-weight "rapyuta" (same construction as "foundation") -------
  const R_PATH = ROBOTICS[0], R_L = 475.29, R_W = 40.43;
  // p = b flipped vertically, with the stem lengthened to a 40-unit descender (as in the bold "p")
  const P_PATH = B_PATH.replace('v-111.64h13.73v44.35', 'v-122.68h13.73v55.39');
  const MID = (XH + BASE) / 2;
  const Y_W = 82;
  function yGlyph(L, ink) {
    const t = XH, w = 15, D = 122;
    return `<path d="M${L},${t} h${w} L${L + 52.5},${t + 80} h${-w} Z M${L + Y_W - w},${t} h${w} L${L + 37},${t + D} h${-w} Z" fill="${ink}"/>`;
  }
  const flipV = (path, fromL, toL, ink) => `<path transform="translate(${+(toL - fromL).toFixed(3)} ${+(2 * MID).toFixed(3)}) scale(1 -1)" d="${path}" fill="${ink}"/>`;

  const RAPYUTA_REG = [
    ['r', R_W, 9], ['a', B_W, 18], ['p', B_W, 6], ['y', Y_W, 6], ['u', N_W, 10], ['t', T_W, 8], ['a', B_W, 0]
  ];
  const wordWidth = (glyphs) => glyphs.reduce((s, [, w, g]) => s + w + g, 0);

  function glyphRun(glyphs, startX, ink) {
    let x = startX, out = '';
    for (const [ch, w, gap] of glyphs) {
      if (ch === 'f') out += fGlyph(x, ink);
      if (ch === 'o') out += move(O_PATH, O_L, x, ink);
      if (ch === 'u') out += uGlyph(x, ink);
      if (ch === 'n') out += nGlyph(x, ink);
      if (ch === 'd') out += mirror(B_PATH, B_L, B_W, x, ink);
      if (ch === 'a') out += mirror(A_PATH, B_L, B_W, x, ink);
      if (ch === 't') out += move(T_PATH, T_L, x, ink);
      if (ch === 'i') out += move(I_PATH, I_L, x, ink);
      if (ch === 'r') out += move(R_PATH, R_L, x, ink);
      if (ch === 'p') out += flipV(P_PATH, B_L, x, ink);
      if (ch === 'y') out += yGlyph(x, ink);
      x += w + gap;
    }
    return out;
  }

  // a line of glyphs placed with its x-height band at y = top, scaled by s from its left edge
  function placeLine(glyphs, x, top, s, ink) {
    return `<g transform="translate(${x} ${top}) scale(${+s.toFixed(5)}) translate(${-TEXT_X} ${-XH})">${glyphRun(glyphs, TEXT_X, ink)}</g>`;
  }

  /* Variants with "rapyuta" in the same regular weight as "foundation".
   *   layout "stacked-size":  two lines, same letter size, left aligned
   *   layout "stacked-fit":   two lines, each scaled to the same width (right edges align)
   *   layout "one-line":      "rapyuta foundation" on one line, centered on the mark
   */
  function rfRegularSVG(opts = {}) {
    const ink = opts.ink || BLACK, layout = opts.layout || 'stacked-size';
    const wR = wordWidth(RAPYUTA_REG), wF = foundationWidth();
    const topLine = 20.52, bottomLine = XH;          // x-height bands of the original two lines
    let body, vbW;
    if (layout === 'stacked-fit') {
      const target = RIGHT - TEXT_X;
      body = placeLine(RAPYUTA_REG, TEXT_X, topLine, target / wR, ink) + placeLine(FOUNDATION, TEXT_X, bottomLine + (1 - target / wF) * 82.68, target / wF, ink);
      vbW = RIGHT;
    } else if (layout === 'one-line') {
      const s = 1.15, space = 40, xh = 82.68 * s, top = (H - xh) / 2;
      body = placeLine(RAPYUTA_REG, TEXT_X, top, s, ink) + placeLine(FOUNDATION, TEXT_X + (wR + space) * s, top, s, ink);
      vbW = Math.ceil(TEXT_X + (wR + space + wF) * s + 2);
    } else {
      body = placeLine(RAPYUTA_REG, TEXT_X, topLine, 1, ink) + placeLine(FOUNDATION, TEXT_X, bottomLine, 1, ink);
      vbW = Math.ceil(TEXT_X + Math.max(wR, wF) + 2);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${H}" role="img" aria-label="rapyuta foundation">${markSVG(opts)}${body}</svg>`;
  }

  // ---- candidate replacements for the red circle ---------------------------
  // Each draws inside the red circle's footprint (center cx, cy, radius r) using golden-ratio proportions.
  const n3 = (v) => +v.toFixed(3);
  const ACCENTS = {
    // the original solid red circle
    dot: (cx, cy, r, c) => `<circle cx="${n3(cx)}" cy="${n3(cy)}" r="${n3(r)}" fill="${c}"/>`,

    // golden ring: outer radius r, inner radius r / phi; an open circle with room inside
    ring: (cx, cy, r, c) => {
      const ri = r / PHI;
      return `<path fill="${c}" fill-rule="evenodd" d="M${n3(cx - r)},${n3(cy)} a${n3(r)},${n3(r)} 0 1 0 ${n3(2 * r)},0 a${n3(r)},${n3(r)} 0 1 0 ${n3(-2 * r)},0 Z M${n3(cx - ri)},${n3(cy)} a${n3(ri)},${n3(ri)} 0 1 0 ${n3(2 * ri)},0 a${n3(ri)},${n3(ri)} 0 1 0 ${n3(-2 * ri)},0 Z"/>`;
    },

    // golden pair ("share"): a big dot r/phi and a small dot r/phi^2; 1/phi + 1/phi^2 = 1,
    // so the two exactly span the original diameter. The older helps the younger.
    pair: (cx, cy, r, c) => {
      const b = r / PHI, sm = b / PHI, a = -Math.PI / 4;            // growth toward the upper right
      const ux = Math.cos(a), uy = Math.sin(a);
      const bc = [cx - ux * (r - b), cy - uy * (r - b)], sc = [cx + ux * (r - sm), cy + uy * (r - sm)];
      return `<circle cx="${n3(bc[0])}" cy="${n3(bc[1])}" r="${n3(b)}" fill="${c}"/><circle cx="${n3(sc[0])}" cy="${n3(sc[1])}" r="${n3(sm)}" fill="${c}"/>`;
    },

    // golden spiral: radius shrinks by phi every quarter turn, starting at r
    spiral: (cx, cy, r, c) => {
      const w = r * 0.2, pts = [];
      for (let t = 0; t <= Math.PI * 5; t += Math.PI / 60) {
        const rad = (r - w / 2) * Math.pow(PHI, -2 * t / Math.PI);
        pts.push(`${n3(cx + rad * Math.cos(t + Math.PI))},${n3(cy + rad * Math.sin(t + Math.PI))}`);
      }
      return `<path d="M${pts.join(' L')}" fill="none" stroke="${c}" stroke-width="${n3(w)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    },

    // lotus: three lens-shaped petals and two low side petals, separated by thin paper-colored gaps
    lotus: (cx, cy, r, c, paper) => {
      const bx = cx, by = cy + 0.72 * r;
      const petal = (len, half, deg) => {
        const rho = ((len * len) / 4 + half * half) / (2 * half);
        return `<path transform="rotate(${deg} ${n3(bx)} ${n3(by)})" d="M${n3(bx)},${n3(by)} A${n3(rho)},${n3(rho)} 0 0 1 ${n3(bx)},${n3(by - len)} A${n3(rho)},${n3(rho)} 0 0 1 ${n3(bx)},${n3(by)} Z" fill="${c}" stroke="${paper}" stroke-width="${n3(r * 0.06)}"/>`;
      };
      const L = 1.62 * r;
      return petal(L * 0.62, r * 0.2, -78) + petal(L * 0.62, r * 0.2, 78) + petal(L * 0.86, r * 0.27, -38) + petal(L * 0.86, r * 0.27, 38) + petal(L, r * 0.33, 0);
    },

    // question mark: "the habit of asking a lot of questions"
    question: (cx, cy, r, c) => {
      const w = r * 0.26, hr = r * 0.4, hy = cy - r * 0.3;
      return `<path d="M${n3(cx - hr)},${n3(hy)} A${n3(hr)},${n3(hr)} 0 1 1 ${n3(cx + hr * 0.5)},${n3(hy + hr * 0.866)} Q${n3(cx)},${n3(hy + hr * 1.05)} ${n3(cx)},${n3(cy + r * 0.32)}" fill="none" stroke="${c}" stroke-width="${n3(w)}" stroke-linecap="round" stroke-linejoin="round"/>` +
             `<circle cx="${n3(cx)}" cy="${n3(cy + r * 0.78)}" r="${n3(w * 0.62)}" fill="${c}"/>`;
    }
  };

  // ---- the heart: the one playful element, still generated by math ------------
  // Heart curve: x = 16 sin^3 t,  y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
  // Textures come from a seeded random generator, so the same logo is drawn every time.
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function heartXY(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [x, -y];                                    // SVG y points down
  }
  // heart centered on (cx, cy), total width = widthFactor * r
  function heartMapper(cx, cy, r, widthFactor = 2.2) {
    const s = (widthFactor * r) / 32, yMid = (-12 + 17) / 2 - 0.5; // curve spans y = -12 (lobes) to 17 (tip)
    return (t, inset = 0) => { const [x, y] = heartXY(t); return [cx + x * s * (1 - inset), cy + (y - yMid) * s * (1 - inset)]; };
  }
  let _uid = 0;
  const pts2d = (arr) => arr.map(([x, y]) => `${n3(x)},${n3(y)}`).join(' ');

  // brush parameters: width, wet (where it starts to run dry, 0-1), gapStart / gapEnd (radians left open
  // at the top), bristles, rough (edge roughness), press (extra ink at the tip), seed (texture variation)
  const BRUSH_DEFAULTS = { width: 0.42, wet: 0.62, gapStart: 0.10, gapEnd: 0.42, bristles: 13, rough: 0.06, press: 0.22, seed: 1618 };
  ACCENTS.heartBrushWith = (opt = {}) => (cx, cy, r, c) => {
    const B0 = Object.assign({}, BRUSH_DEFAULTS, opt);
    // one brushstroke along the heart curve, heavy at the start, drying out toward the end,
    // leaving a small gap at the top like an enso
    const map = heartMapper(cx, cy, r, 2.25), rand = rng(B0.seed), id = 'rfb' + (++_uid);
    const t0 = B0.gapStart, t1 = 2 * Math.PI - B0.gapEnd, N = 220, W = r * B0.width;
    const P = [], NRM = [], U = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N, t = t0 + (t1 - t0) * u, a = map(t), b = map(t + 1e-3);
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      P.push(a); NRM.push([-dy / l, dx / l]); U.push(u);
    }
    // pressure: loaded at the start, a press at the bottom tip, lifting at the end
    const width = (u) => W * (0.62 + 0.38 * Math.exp(-u * 5) + B0.press * Math.exp(-Math.pow((u - 0.5) / 0.06, 2))) * (1 - Math.pow(u, 3) * 0.75);
    const wet = B0.wet;                                   // after this point the brush runs dry
    const body = [], back = [];
    for (let i = 0; i <= N; i++) {
      if (U[i] > wet + 0.02) break;
      const w = width(U[i]) / 2, wob = 1 + (rand() - 0.5) * 0.06;
      body.push([P[i][0] + NRM[i][0] * w * wob, P[i][1] + NRM[i][1] * w * wob]);
      back.push([P[i][0] - NRM[i][0] * w, P[i][1] - NRM[i][1] * w]);
    }
    let out = `<defs><filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${B0.seed % 997}"/><feDisplacementMap in="SourceGraphic" scale="${n3(r * B0.rough)}" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
    out += `<g filter="url(#${id})"><polygon points="${pts2d(body.concat(back.reverse()))}" fill="${c}" opacity="0.92"/>`;
    // dry brush: bristles that drop out as the ink runs low
    const B = Math.max(2, Math.round(B0.bristles));
    for (let k = 0; k < B; k++) {
      const off = (k / (B - 1) - 0.5), segs = []; let cur = [];
      for (let i = Math.floor(N * (wet - 0.08)); i <= N; i++) {
        const dry = (U[i] - wet) / (1 - wet), keep = rand() > Math.max(0, dry) * (0.55 + Math.abs(off)) ;
        const w = width(U[i]);
        if (keep) cur.push([P[i][0] + NRM[i][0] * off * w, P[i][1] + NRM[i][1] * off * w]);
        else if (cur.length) { segs.push(cur); cur = []; }
      }
      if (cur.length) segs.push(cur);
      for (const sg of segs) if (sg.length > 2) out += `<polyline points="${pts2d(sg)}" fill="none" stroke="${c}" stroke-width="${n3(W / B * 1.5)}" stroke-linecap="round" opacity="${n3(0.75 + rand() * 0.25)}"/>`;
    }
    // a darker pool where the brush pressed at the tip
    const tip = map(Math.PI);
    out += `<ellipse cx="${n3(tip[0] - r * 0.06)}" cy="${n3(tip[1] - r * 0.12)}" rx="${n3(r * 0.13)}" ry="${n3(r * 0.08)}" fill="${c}" opacity="0.55" transform="rotate(-35 ${n3(tip[0])} ${n3(tip[1])})"/></g>`;
    return out;
  };

  ACCENTS.heartBrush = ACCENTS.heartBrushWith();
  ACCENTS.BRUSH_DEFAULTS = BRUSH_DEFAULTS;

  ACCENTS.heartCrayon = (cx, cy, r, c) => {
    // crayon: a wobbly double-pass outline and diagonal hatching, grain from a noise filter
    const map = heartMapper(cx, cy, r, 2.15), rand = rng(1123), id = 'rfc' + (++_uid);
    const outline = (jit, phase) => {
      const pts = [];
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * 2 * Math.PI, [x, y] = map(t);
        const wob = r * jit * Math.sin(t * 7 + phase) + r * jit * 0.6 * (rand() - 0.5);
        const [x2, y2] = map(t + 1e-3), l = Math.hypot(x2 - x, y2 - y) || 1;
        pts.push([x - (y2 - y) / l * wob, y + (x2 - x) / l * wob]);
      }
      return pts;
    };
    const clip = [];
    for (let i = 0; i <= 160; i++) clip.push(map((i / 160) * 2 * Math.PI, 0.1));
    // hatching at 35 degrees; spacing r/phi^4, denser and longer on the right as with a right hand
    const ang = -35 * Math.PI / 180, ux = Math.cos(ang), uy = Math.sin(ang), gap = r / Math.pow(PHI, 5);
    let hatch = '';
    for (let o = -r * 1.4; o <= r * 1.4; o += gap * (0.85 + rand() * 0.3)) {
      const bias = (o / (r * 1.4) + 1) / 2;              // 0 at left, 1 at right
      if (rand() > 0.6 + bias * 0.4) continue;
      const len = r * (1.0 + rand() * 1.2) * (0.7 + bias * 0.6), mid = (rand() - 0.5) * r * 0.4;
      const px = cx - uy * o + ux * mid, py = cy + ux * o + uy * mid;
      hatch += `<line x1="${n3(px - ux * len / 2)}" y1="${n3(py - uy * len / 2)}" x2="${n3(px + ux * len / 2)}" y2="${n3(py + uy * len / 2)}" stroke="${c}" stroke-width="${n3(r * (0.045 + rand() * 0.025))}" stroke-linecap="round" opacity="${n3(0.65 + rand() * 0.35)}"/>`;
    }
    return `<defs><clipPath id="${id}c"><polygon points="${pts2d(clip)}"/></clipPath>` +
      `<filter id="${id}g" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.7" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></defs>` +
      `<g filter="url(#${id}g)"><g clip-path="url(#${id}c)">${hatch}</g>` +
      `<polygon points="${pts2d(outline(0.012, 0))}" fill="none" stroke="${c}" stroke-width="${n3(r * 0.055)}" stroke-linejoin="round"/>` +
      `<polygon points="${pts2d(outline(0.02, 2.1))}" fill="none" stroke="${c}" stroke-width="${n3(r * 0.035)}" stroke-linejoin="round" opacity="0.7"/></g>`;
  };

  // solid heart for small sizes (favicons, icons)
  ACCENTS.heartSolid = (cx, cy, r, c) => {
    const map = heartMapper(cx, cy, r, 2.15), pts = [];
    for (let i = 0; i <= 200; i++) pts.push(map((i / 200) * 2 * Math.PI));
    return `<polygon points="${pts2d(pts)}" fill="${c}"/>`;
  };

  // a raster heart (for the reference images): an <image> centered on the red circle
  ACCENTS.image = (href, widthFactor = 2.3) => (cx, cy, r) => {
    const w = widthFactor * r;
    return `<image href="${href}" x="${n3(cx - w / 2)}" y="${n3(cy - w / 2)}" width="${n3(w)}" height="${n3(w)}" preserveAspectRatio="xMidYMid meet"/>`;
  };

  // ---- pure-math hearts -------------------------------------------------------
  const TAU = 2 * Math.PI, GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));   // 137.508 degrees

  // 1. Times table: on a circle of N points, join k to 2k (mod N). The chords' envelope is a
  //    cardioid, the "heart curve" (kardia = heart). Multiplication, the first thing a child learns.
  ACCENTS.timesTable = (cx, cy, r, c) => {
    const N = 96, R0 = r * 1.0, th = (k) => Math.PI / 2 + TAU * k / N, P = (k) => [cx + R0 * Math.cos(th(k)), cy + R0 * Math.sin(th(k))];
    let d = '';
    for (let k = 0; k < N; k++) { const a = P(k), b = P((2 * k) % N); d += `M${n3(a[0])},${n3(a[1])}L${n3(b[0])},${n3(b[1])}`; }
    return `<path d="${d}" stroke="${c}" stroke-width="${n3(r * 0.02)}" stroke-linecap="round" fill="none"/>`;
  };

  // 2. Phyllotaxis: seeds placed at the golden angle, the way a sunflower grows them,
  //    kept only where (x^2 + y^2 - 1)^3 - x^2 y^3 <= 0, the implicit heart.
  ACCENTS.seeds = (cx, cy, r, c) => {
    const S = r * 0.98, inHeart = (X, Y) => Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y <= 0;
    let out = '';
    const spacing = r * 0.083;
    for (let n = 1; n < 1200; n++) {
      const rad = spacing * Math.sqrt(n), a = n * GOLDEN_ANGLE;
      const px = cx + rad * Math.cos(a), py = cy + rad * Math.sin(a);
      const X = (px - cx) / S, Y = -(py - cy) / S + 0.12;
      if (rad > r * 1.4) break;
      if (inHeart(X, Y)) out += `<circle cx="${n3(px)}" cy="${n3(py)}" r="${n3(spacing * 0.42)}" fill="${c}"/>`;
    }
    return out;
  };

  // 3. Building it term by term: the heart equation drawn as its partial sums.
  //    One cosine gives an egg; each added harmonic sharpens it until the fourth gives the heart.
  ACCENTS.fourier = (cx, cy, r, c) => {
    const s = (2.2 * r) / 32, terms = [(t) => 13 * Math.cos(t), (t) => -5 * Math.cos(2 * t), (t) => -2 * Math.cos(3 * t), (t) => -Math.cos(4 * t)];
    let out = '';
    for (let m = 1; m <= 4; m++) {
      const pts = [];
      for (let i = 0; i <= 240; i++) {
        const t = TAU * i / 240, x = 16 * Math.pow(Math.sin(t), 3);
        let y = 0; for (let j = 0; j < m; j++) y += terms[j](t);
        pts.push([cx + x * s, cy - (y - 2) * s]);
      }
      const last = m === 4;
      out += `<polygon points="${pts2d(pts)}" fill="${last ? c : 'none'}" stroke="${c}" stroke-width="${n3(r * (last ? 0 : 0.03))}" opacity="${[0.28, 0.45, 0.65, 1][m - 1]}" stroke-linejoin="round"/>`;
    }
    return out;
  };

  // 4. Golden nesting: the heart curve repeated, each copy 1/phi the size of the one around it.
  ACCENTS.nested = (cx, cy, r, c) => {
    let out = '';
    for (let k = 0; k < 6; k++) {
      const f = Math.pow(PHI, -k), map = heartMapper(cx, cy + r * 0.16 * (1 - f), r * f, 2.2), pts = [];
      for (let i = 0; i <= 200; i++) pts.push(map(TAU * i / 200));
      out += k === 5 ? `<polygon points="${pts2d(pts)}" fill="${c}"/>`
                     : `<polygon points="${pts2d(pts)}" fill="none" stroke="${c}" stroke-width="${n3(r * 0.075 * Math.sqrt(f))}" stroke-linejoin="round"/>`;
    }
    return out;
  };

  // 5. Compass and ruler: a square on its corner plus two circles on its upper sides,
  //    the way you would teach a child to draw a heart; construction lines left visible.
  ACCENTS.compass = (cx, cy, r, c, paper) => {
    const a = r * 1.12, h = a / Math.SQRT2;              // square side a, half-diagonal h
    const top = [cx, cy - h * 0.62], left = [top[0] - h, top[1] + h], right = [top[0] + h, top[1] + h], bottom = [top[0], top[1] + 2 * h];
    const c1 = [(top[0] + left[0]) / 2, (top[1] + left[1]) / 2], c2 = [(top[0] + right[0]) / 2, (top[1] + right[1]) / 2], cr = a / 2;
    const solid = `<path d="M${n3(bottom[0])},${n3(bottom[1])} L${n3(left[0])},${n3(left[1])} A${n3(cr)},${n3(cr)} 0 0 1 ${n3(top[0])},${n3(top[1])} A${n3(cr)},${n3(cr)} 0 0 1 ${n3(right[0])},${n3(right[1])} Z" fill="${c}"/>`;
    const thin = n3(r * 0.018);
    const guides = `<g fill="none" stroke="${paper}" stroke-width="${thin}" opacity="0.9">` +
      `<circle cx="${n3(c1[0])}" cy="${n3(c1[1])}" r="${n3(cr)}"/><circle cx="${n3(c2[0])}" cy="${n3(c2[1])}" r="${n3(cr)}"/>` +
      `<polygon points="${pts2d([top, right, bottom, left])}"/>` +
      `<circle cx="${n3(c1[0])}" cy="${n3(c1[1])}" r="${n3(r * 0.035)}" fill="${paper}"/><circle cx="${n3(c2[0])}" cy="${n3(c2[1])}" r="${n3(r * 0.035)}" fill="${paper}"/></g>`;
    return solid + guides;
  };

  // ---- the tilted, enlarged heart ---------------------------------------------
  // The red circle keeps a constant gap to the black shapes around it: R - r = r(phi - 1) = r/phi (35.01).
  // The heart may grow beyond the circle as long as that same gap to the black is kept, and it stays
  // clear of the wordmark by the same gap. Scale and offset per tilt were found by search
  // (largest heart that satisfies the gap); deg > 0 tilts clockwise.
  const HEART_FITS = {
    0:     { s: 4.1371, dx: 20, dy: 10 },
    30:    { s: 4.0674, dx: 10, dy: 15 },
    37.5:  { s: 4.2459, dx: 5,  dy: 20 },
    45:    { s: 4.3878, dx: 0,  dy: 25 },
    '-30': { s: 4.42,   dx: 35, dy: 10 },
    '-37.5': { s: 4.4778, dx: 35, dy: 15 },
    '-45': { s: 4.5847, dx: 35, dy: 20 }
  };
  function heartPoints(cx, cy, deg, fit, n = 240) {
    const th = deg * Math.PI / 180, c = Math.cos(th), sn = Math.sin(th), pts = [];
    for (let i = 0; i <= n; i++) {
      const [x, y0] = heartXY(TAU * i / n), y = y0 - 2.5;
      pts.push([cx + fit.dx + fit.s * (x * c - y * sn), cy + fit.dy + fit.s * (x * sn + y * c)]);
    }
    return pts;
  }
  ACCENTS.heartTilt = (deg) => (cx, cy, r, c) => `<polygon points="${pts2d(heartPoints(cx, cy, deg, HEART_FITS[deg]))}" fill="${c}"/>`;

  global.RRLogo = { PHI, BLACK, RED, markGeometry, markSVG, rrLogoSVG, rfLogoSVG, rfRegularSVG, foundationWidth, ACCENTS, heartXY, HEART_FITS, heartPoints };
})(typeof window !== 'undefined' ? window : globalThis);
