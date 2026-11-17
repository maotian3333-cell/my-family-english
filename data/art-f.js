// 補充圖卡 4（v2.12）：重畫數字卡、拉鍊、肚子、狐狸、斑馬、斧頭、優格；
// 並提供「場景用全身版」MFE_FULL：場景裡的動物／人物必須連身體一起呈現（單張字卡可只畫頭）。
// 載入順序在 art-e 之後，因此同名圖會覆蓋舊版。
(function () {
  var F = window.MFE_SVG, K = "#3E4A59", n = 0;
  var ST = 'stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="-4 -9 72 76" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
  function inner(s) { return String(s).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, ""); }
  function ell(cx, cy, rx, ry) { return "M" + (cx - rx) + " " + cy + "a" + rx + " " + ry + " 0 1 0 " + (2 * rx) + " 0a" + rx + " " + ry + " 0 1 0 " + (-2 * rx) + " 0Z"; }
  function P(d, fill) { return '<path d="' + d + '" fill="' + fill + '" ' + ST + "/>"; }
  function L(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'; }
  function E(cx, cy, rx, ry, fill) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '" ' + ST + "/>"; }
  function hl(cx, cy, rx, ry, rot) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (rot || 0) + " " + cx + " " + cy + ')" fill="#fff" opacity=".6"/>'; }
  function eye(x, y, r) { r = r || 2.4; return dot(x, y, r, K) + dot(x - r * .3, y - r * .35, r * .35, "#fff"); }
  function G(t, s) { return '<g transform="' + t + '">' + s + "</g>"; }

  /* ===== 數字卡：同一個顏色，數字在上，十格框（每列 5 格）由左到右放圓點 ===== */
  var BLUE = "#2F6FB0", FR = "#9DB8D2";
  for (var i = 0; i <= 10; i++) {
    var rows = i > 5 ? 2 : 1, y0 = rows === 2 ? 31 : 36, cw = 11, x0 = 4.5, s = '<rect x="0" y="-6" width="64" height="68" rx="12" fill="#fff" ' + ST + "/>";
    s += '<text x="32" y="22" text-anchor="middle" font-family="GenSenRounded, sans-serif" font-weight="900" font-size="' + (i === 10 ? 25 : 27) + '" fill="' + BLUE + '">' + i + "</text>";
    for (var r = 0; r < rows; r++) for (var c = 0; c < 5; c++) {
      var idx = r * 5 + c, cx = x0 + c * cw + cw / 2, cy = y0 + r * cw + cw / 2;
      s += '<rect x="' + (x0 + c * cw) + '" y="' + (y0 + r * cw) + '" width="' + cw + '" height="' + cw + '" fill="#F3F8FD" stroke="' + FR + '" stroke-width="1.4"/>';
      if (idx < i) s += dot(cx, cy, 3.9, BLUE);
    }
    F["n" + i] = svg(s);
  }
  F.zero = F.n0;

  /* ===== 拉鍊：上段咬合、拉頭、下段向兩側打開、底部有拉片 ===== */
  (function () {
    var s = P("M13 -4H28V28L16 58H1L13 28Z", "#EF5350") + P("M36 -4H51V28L63 58H48L36 28Z", "#EF5350");
    var t = "";
    for (var y = -1; y < 24; y += 5.2) t += L("M26.5 " + y + "H32.6", K, 4.2) + L("M26.5 " + y + "H32.6", "#ECEFF1", 2) + L("M31.4 " + (y + 2.6) + "H37.5", K, 4.2) + L("M31.4 " + (y + 2.6) + "H37.5", "#ECEFF1", 2);
    [0.1, 0.38, 0.66, 0.94].forEach(function (u) {
      var x = 28 - 12 * u, yy = 33 + 24 * u, xr = 36 + 12 * u;
      t += L("M" + x + " " + yy + "L" + (x + 4.4) + " " + (yy - 1), K, 4.2) + L("M" + x + " " + yy + "L" + (x + 4.4) + " " + (yy - 1), "#ECEFF1", 2);
      t += L("M" + xr + " " + yy + "L" + (xr - 4.4) + " " + (yy - 1), K, 4.2) + L("M" + xr + " " + yy + "L" + (xr - 4.4) + " " + (yy - 1), "#ECEFF1", 2);
    });
    s += t + P("M24 21H40L38 32Q32 38 26 32Z", "#FFD54F") + P("M28 36H36V54Q36 59 32 59Q28 59 28 54Z", "#FFC107") + dot(32, 53, 2, "#fff") + hl(27, 25, 2, 3.4, 10);
    F.zipper = svg(s);
  })();

  /* ===== 肚子：小朋友把上衣捲起來，肚皮和衣服、褲子連成同一個身體 ===== */
  F.b_tummy = svg(
    L("M17 20L9 34", K, 9) + L("M17 20L9 34", "#FFCC99", 5.4) + L("M47 20L55 34", K, 9) + L("M47 20L55 34", "#FFCC99", 5.4) +
    P("M15 52H49L52 63H34L32 57L30 63H12Z", "#5C6BC0") +
    P("M17 30Q11 41 17 52Q32 58 47 52Q53 41 47 30Z", "#FFCC99") + dot(32, 41, 2.6, "#F2A56B") + L("M26 36Q32 32 38 36", "#F2A56B", 1.6) + hl(21, 38, 2.6, 5, 15) +
    P("M5 17Q10 14 17 18L19 26L8 29Z", "#81D4FA") + P("M59 17Q54 14 47 18L45 26L56 29Z", "#81D4FA") + P("M15 18Q32 12 49 18L49 24L47 30Q32 34 17 30L15 24Z", "#81D4FA") + L("M17 30Q24 34 32 31Q40 34 47 30", "#4FC3F7", 2.2) +
    E(32, 4, 11, 11, "#FFCC99") + P("M21 3Q22 -8 32 -8Q42 -8 43 3Q38 -2 32 -2Q26 -2 21 3Z", "#6D4C41") + eye(27.5, 5, 1.8) + eye(36.5, 5, 1.8) + L("M28.5 10Q32 12.5 35.5 10", K, 1.6) + E(9, 35, 3.4, 3.4, "#FFCC99") + E(55, 35, 3.4, 3.4, "#FFCC99"));

    /* ===== 身體部位的複數：eyes / ears / hands / feet / teeth 要畫成「一對」或「多顆」 ===== */
  (function () {
    function pair(id, a, b) { return svg(G(a, inner(F[id])) + G(b, inner(F[id]))); }
    F.b_eye = pair("b_eye_1", "translate(-2 16) scale(.52)", "translate(34 16) scale(.52)");
    F.b_ear = pair("b_ear_1", "translate(-1 8) scale(.62)", "translate(65 8) scale(-.62 .62)");
    F.b_hand = pair("b_hand_1", "translate(-2 8) scale(.62)", "translate(66 8) scale(-.62 .62)");
    F.b_foot = pair("b_foot_1", "translate(-2 10) scale(.62)", "translate(66 10) scale(-.62 .62)");
    F.b_tooth = svg(G("translate(-1 16) scale(.4)", inner(F.b_tooth_1)) + G("translate(21 16) scale(.4)", inner(F.b_tooth_1)) + G("translate(43 16) scale(.4)", inner(F.b_tooth_1)));
  })();

  F.under = F.pp_under; // 「under」與位置圖共用同一張：球在桌子下面、站在地上

  /* ===== 狐狸、斑馬、斧頭、優格 ===== */
  F.fox = svg(P("M5 2L24 16L8 32Z", "#FF8A3D") + P("M59 2L40 16L56 32Z", "#FF8A3D") + P("M9 9L19 17L11 26Z", "#5D4037") + P("M55 9L45 17L53 26Z", "#5D4037") +
    P("M4 32Q4 14 32 14Q60 14 60 32Q58 52 32 60Q6 52 4 32Z", "#FF8A3D") + P("M5 34Q8 52 26 56L32 46Q14 44 5 34Z", "#fff") + P("M59 34Q56 52 38 56L32 46Q50 44 59 34Z", "#fff") + E(32, 50, 8, 7, "#fff") + eye(21, 30, 2.6) + eye(43, 30, 2.6) + E(32, 48, 3.4, 2.6, K) + L("M32 51Q29 56 25 54M32 51Q35 56 39 54", K, 1.6));
  F.zebra = svg(P("M16 12Q12 2 21 4L24 14Z", "#fff") + P("M48 12Q52 2 43 4L40 14Z", "#fff") +
    P("M18 12Q16 36 20 52Q32 60 44 52Q48 36 46 12Q32 6 18 12Z", "#fff") + P("M29 4Q32 0 35 4L35 14L29 14Z", K) +
    L("M20 20H27M44 20H37M19 29H26M45 29H38M20 38H25M44 38H39", K, 3) + E(32, 49, 12, 9, "#CFD8DC") + dot(28, 49, 1.6, K) + dot(36, 49, 1.6, K) + eye(24, 31, 2.4) + eye(40, 31, 2.4));
  F.ax = svg(L("M12 60L44 14", K, 7) + L("M12 60L44 14", "#A9743F", 3.6) + P("M36 4Q56 0 61 20Q50 28 38 22Q43 14 36 4Z", "#B0BEC5") + L("M40 8Q52 8 56 18", "#ECEFF1", 2.2));
  F.yogurt = svg(L("M46 -2L40 20", K, 5) + L("M46 -2L40 20", "#B0BEC5", 2) + P("M12 20H52L47 58Q47 61 44 61H20Q17 61 17 58Z", "#fff") + P("M10 17Q32 11 54 17L52 22H12Z", "#CFD8DC") + P("M15 32H49L47 46H17Z", "#F48FB1") + dot(32, 39, 4, "#E91E63") + L("M30 35Q32 32 34 35", "#2E7D32", 1.8));

  /* ===== 場景用全身版：頭沿用字卡（縮小），再接上身體、四肢與尾巴 ===== */
  var FULL = window.MFE_FULL = {};
  function head(id, tr) { return G(tr, inner(F[id])); }
  function quad(id, o) {
    o = o || {}; var b = o.b || "#D9A66B", bs = o.s || "#B5834B", lg = o.l || bs, tailS = o.tail || "";
    var legs = o.legsLong ? 'y="50" height="12"' : 'y="52" height="9"';
    var lr = function (x) { return '<rect x="' + x + '" ' + legs + ' width="6" rx="2.6" fill="' + lg + '" ' + ST + "/>"; };
    return svg(G("translate(-4 0)", tailS + lr(21) + lr(29) + lr(45) + lr(53) + '<ellipse cx="39" cy="47" rx="22" ry="12" fill="' + b + '" ' + ST + "/>" + (o.mark || "") + '<ellipse cx="46" cy="42" rx="9" ry="3" fill="#fff" opacity=".25"/>' + head(id, "translate(3 5) scale(.6)")));
  }
  var tl = function (d, c) { return L(d, K, 6.4) + L(d, c, 3.4); };
  FULL.dog = quad("dog", { b: "#E0B27A", s: "#B5834B", tail: tl("M60 42Q68 36 64 28", "#B5834B") });
  FULL.cat = quad("cat", { b: "#FFA550", s: "#E67E22", tail: tl("M60 46Q70 42 66 30Q64 26 60 28", "#E67E22"), mark: L("M40 38V44M47 38V45M54 40V46", "#E67E22", 2.4) });
  FULL.cow = quad("cow", { b: "#fff", s: "#D3DDE3", l: "#fff", tail: tl("M60 40Q66 46 63 56", "#D3DDE3") + dot(63, 57, 3, K), mark: '<circle cx="46" cy="42" r="6" fill="#546E7A"/><circle cx="33" cy="52" r="4" fill="#546E7A"/><ellipse cx="46" cy="55" rx="6" ry="3" fill="#F8BBD0" stroke="' + K + '" stroke-width="1.6"/>' });
  FULL.pig = quad("pig", { b: "#F8A9C0", s: "#EC7FA0", tail: L("M60 44Q68 42 64 48Q60 52 66 54", K, 4.4) + L("M60 44Q68 42 64 48Q60 52 66 54", "#F8A9C0", 2) });
  FULL.sheep = quad("sheep", { b: "#fff", s: "#D3DDE3", l: "#546E7A", mark: '<circle cx="28" cy="46" r="9" fill="#fff" stroke="' + K + '" stroke-width="2.4"/><circle cx="40" cy="42" r="10" fill="#fff" stroke="' + K + '" stroke-width="2.4"/><circle cx="52" cy="46" r="9" fill="#fff" stroke="' + K + '" stroke-width="2.4"/>' });
  FULL.horse = quad("horse", { b: "#A9743F", s: "#7A4F28", l: "#7A4F28", legsLong: true, tail: tl("M58 40Q68 44 64 60", "#3E2723") });
  FULL.rabbit = quad("rabbit", { b: "#fff", s: "#D3DDE3", tail: E(63, 46, 5, 5, "#fff") });
  FULL.elephant = quad("elephant", { b: "#B0BEC5", s: "#90A4AE", l: "#90A4AE", tail: tl("M60 44Q66 50 64 56", "#90A4AE") });
  FULL.monkey = quad("monkey", { b: "#9C6B4A", s: "#7A4F35", tail: tl("M60 44Q72 40 68 28Q66 24 62 28", "#7A4F35") });
  FULL.lion = quad("lion", { b: "#F0B35A", s: "#D98E2E", tail: tl("M60 42Q68 40 66 54", "#D98E2E") + dot(66, 56, 3.6, "#B5651D") });
  FULL.tiger = quad("tiger", { b: "#FFA726", s: "#E65100", tail: tl("M60 44Q70 40 66 30", "#E65100"), mark: L("M30 38V45M37 36V44M44 36V44M51 38V45", "#5D2E00", 2.6) });
  FULL.bear = quad("bear", { b: "#A9744F", s: "#7A4F35", tail: dot(62, 44, 3.4, "#7A4F35") });
  FULL.panda = quad("panda", { b: "#fff", s: "#D3DDE3", l: "#37474F", tail: dot(62, 44, 3.4, "#37474F") });
  FULL.fox = quad("fox", { b: "#FF8A3D", s: "#D4570F", tail: P("M58 44Q70 40 68 52Q64 60 58 52Z", "#FF8A3D") + P("M64 51Q68 48 68 52Q66 58 62 56Z", "#fff") });
  FULL.zebra = quad("zebra", { b: "#fff", s: "#D3DDE3", l: "#37474F", legsLong: true, tail: tl("M60 42Q66 48 63 58", "#37474F"), mark: L("M30 39V52M37 37V54M44 36V54M51 38V52", K, 2.6) });
  FULL.frog = svg(P("M12 44Q4 50 8 60Q16 60 20 52Z", "#8BC34A") + P("M52 44Q60 50 56 60Q48 60 44 52Z", "#8BC34A") + E(32, 48, 17, 11, "#8BC34A") + E(22, 60, 7, 3, "#8BC34A") + E(42, 60, 7, 3, "#8BC34A") + head("frog", "translate(6 -2) scale(.82)"));
  FULL.giraffe = svg(tl("M59 44Q66 50 63 58", "#C98A1B") + '<rect x="22" y="48" width="5" height="14" rx="2.4" fill="#F5C242" ' + ST + '/><rect x="31" y="48" width="5" height="14" rx="2.4" fill="#F5C242" ' + ST + '/><rect x="44" y="48" width="5" height="14" rx="2.4" fill="#F5C242" ' + ST + '/><rect x="52" y="48" width="5" height="14" rx="2.4" fill="#F5C242" ' + ST + "/>" + '<ellipse cx="39" cy="45" rx="20" ry="9" fill="#F5C242" ' + ST + "/>" + dot(34, 44, 2.6, "#C98A1B") + dot(44, 42, 2.6, "#C98A1B") + dot(50, 47, 2.2, "#C98A1B") +
    '<path d="M15 16H27L31 44H13Z" fill="#F5C242" ' + ST + "/>" + dot(20, 34, 2.2, "#C98A1B") + dot(23, 24, 2, "#C98A1B") + head("giraffe", "translate(6 -9) scale(.46)"));
  // 人物：叔叔加上腿與鞋、國王／王后穿長袍
  FULL.uncle = svg('<rect x="22" y="48" width="8" height="12" rx="3" fill="#37474F" ' + ST + '/><rect x="34" y="48" width="8" height="12" rx="3" fill="#37474F" ' + ST + "/>" + E(26, 61, 6, 3, K) + E(38, 61, 6, 3, K) + G("translate(5 -2) scale(.84)", inner(F.uncle)));
  FULL.king = svg(P("M16 62L20 32H44L48 62Z", "#C62828") + P("M28 32H36L34 62H30Z", "#FFF3E0") + E(24, 62, 6, 2.6, K) + E(40, 62, 6, 2.6, K) + head("king", "translate(11 -2) scale(.65)"));
  FULL.queen = svg(P("M14 62L22 32H42L50 62Z", "#8E24AA") + P("M24 52H40", "#F8BBD0") + L("M24 52H40", "#F8BBD0", 2.4) + E(24, 62, 6, 2.6, K) + E(40, 62, 6, 2.6, K) + head("queen", "translate(11 -2) scale(.65)"));

  /* 水中生物／船：場景要放在海邊（見 scenes.js） */
  window.MFE_AQUATIC = { whale: 1, fish: 1, shark: 1, octopus: 1, jellyfish: 1, boat: 1, v_boat: 1, turtle: 0 };
})();
