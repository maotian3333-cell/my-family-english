// 補充圖卡（字母例字、拼讀字）。沿用 art-b.js 的畫法。
(function () {
  var F = window.MFE_SVG, K = "#3E4A59", n = 0;
  var ST = 'stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="-4 -9 72 76" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
  function ell(cx, cy, rx, ry) { return "M" + (cx - rx) + " " + cy + "a" + rx + " " + ry + " 0 1 0 " + (2 * rx) + " 0a" + rx + " " + ry + " 0 1 0 " + (-2 * rx) + " 0Z"; }
  function body(d, base, shade, inside) {
    var id = "bc" + (++n);
    return '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + id + ')"><rect x="-10" y="-10" width="90" height="90" fill="' + shade + '"/><path d="' + d + '" fill="' + base + '" transform="translate(-3.5 -3)"/>' + (inside || "") + '</g><path d="' + d + '" fill="none" ' + ST + "/>";
  }
  function P(d, fill) { return '<path d="' + d + '" fill="' + fill + '" ' + ST + "/>"; }
  function L(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'; }
  function hl(cx, cy, rx, ry, rot) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (rot || 0) + " " + cx + " " + cy + ')" fill="#fff" opacity=".6"/>'; }
  function eye(x, y, r) { r = r || 2.6; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/><circle cx="' + (x - r * .3) + '" cy="' + (y - r * .35) + '" r="' + (r * .35) + '" fill="#fff"/>'; }
  var i, rays;

  F.envelope = svg(body("M6 16H58V50H6Z", "#FFF8E1", "#E0D5B5") + L("M6 50L25 32M58 50L39 32", "#D9C99A", 1.8) + P("M6 16L32 37L58 16Z", "#FFE082") + hl(14, 22, 2.5, 5, -50));
  F.igloo = svg(body("M5 50A27 27 0 0 1 59 50Z", "#EAF6FF", "#9CCBEF") + L("M9 40H55M17 27H47M32 24V40M20 50V40M44 50V40", "#9CCBEF", 1.8) + P("M25 50V43Q32 33 39 43V50Z", "#5D7A99") + hl(20, 28, 3, 6, 35));
  F.insect = svg(L("M17 29L6 24M17 38L5 40M19 47L9 56M47 29L58 24M47 38L59 40M45 47L55 56", K, 2.8) + L("M29 14L24 5M35 14L40 5", K, 2.6) + body(ell(32, 37, 17, 19), "#EF5350", "#C62828") + L("M32 20V56", K, 2) + dot(24, 34, 3, K) + dot(40, 34, 3, K) + dot(25, 46, 2.6, K) + dot(39, 46, 2.6, K) + P(ell(32, 17, 9, 7.5), "#455A64") + eye(28, 16, 2) + eye(36, 16, 2) + hl(22, 30, 2.6, 6, 20));
  F.octopus = svg(P("M15 30Q5 44 12 55Q19 59 21 49Q22 41 25 36Z", "#AB62C4") + P("M27 38Q23 54 30 58Q36 59 35 46V38Z", "#AB62C4") + P("M38 38V47Q36 59 43 58Q49 54 41 36Z", "#AB62C4") + P("M49 30Q42 40 45 50Q47 59 54 56Q61 46 52 30Z", "#AB62C4") + body(ell(32, 24, 19, 17), "#BA68C8", "#8E24AA") + eye(25, 26, 3) + eye(39, 26, 3) + L("M28 33Q32 37 36 33", K, 2.2) + hl(22, 15, 3.4, 6, 35) + dot(20, 33, 2.4, "#F48FB1") + dot(44, 33, 2.4, "#F48FB1"));
  F.olive = svg(L("M34 14Q40 6 50 8", "#689F38", 3) + body(ell(32, 36, 16, 21), "#9CCC65", "#689F38") + P(ell(32, 20, 5.4, 4.2), "#EF5350") + hl(24, 38, 3, 8, 12));
  F.up = svg(body("M32 5L58 32H43V58H21V32H6Z", "#4FC3F7", "#0288D1") + hl(21, 30, 3, 7, 40));
  F.pan = svg(P("M42 31H59Q62 36 59 41H42Z", "#8D6E63") + body(ell(26, 36, 21, 20), "#78909C", "#455A64") + P(ell(26, 36, 14.5, 13.5), "#B0BEC5") + hl(19, 31, 3, 6, 40));
  F.map = svg(body("M5 14L22 10L42 14L59 10V50L42 54L22 50L5 54Z", "#FFF3C4", "#E8D48A") + L("M22 10V50M42 14V54", "#E8D48A", 1.8) + L("M11 42Q20 24 31 34Q42 44 50 26", "#E53935", 2.4) + L("M47 21L55 29M55 21L47 29", "#E53935", 3));
  F.van = svg(body("M4 24Q4 19 9 19H38Q44 19 48 26L58 36V48H4Z", "#64B5F6", "#1E88E5") + P("M10 24H26V35H10Z", "#E3F2FD") + P("M30 24H40L48 35H30Z", "#E3F2FD") + '<circle cx="17" cy="50" r="7.5" fill="#455A64" ' + ST + '/><circle cx="46" cy="50" r="7.5" fill="#455A64" ' + ST + "/>" + dot(17, 50, 2.6, "#CFD8DC") + dot(46, 50, 2.6, "#CFD8DC"));
  F.net = svg(L("M36 38L56 58", K, 8) + L("M36 38L56 58", "#A1887F", 4.4) + body(ell(23, 23, 18, 17), "#E1F5FE", "#81D4FA") + L("M7 19Q23 26 39 19M6 28Q23 35 40 28M15 8V38M24 6V40M33 9V37", "#4FC3F7", 1.5) + '<path d="' + ell(23, 23, 18, 17) + '" fill="none" ' + ST + "/>");
  F.pin = svg(L("M25 25L55 55", K, 6.2) + L("M25 25L53 53", "#CFD8DC", 3.2) + '<circle cx="21" cy="21" r="10" fill="#EF5350" ' + ST + "/>" + hl(17, 17, 2.4, 4, 40));
  F.lid = svg(body(ell(32, 40, 27, 11), "#B0BEC5", "#78909C") + body("M9 38Q11 15 32 15Q53 15 55 38Z", "#CFD8DC", "#90A4AE") + P(ell(32, 12, 6.5, 4.5), "#E53935") + hl(22, 27, 3, 6, 40));
  F.box = svg(body("M7 22H57V55H7Z", "#D7A86E", "#A97C3C") + P("M5 12H59V24H5Z", "#E4BC84") + L("M32 12V34", "#F5E6C8", 7) + hl(14, 34, 2.4, 6, 0));
  rays = ""; for (i = 0; i < 8; i++) { var a = i * Math.PI / 4; rays += L("M" + (32 + 21 * Math.cos(a)).toFixed(1) + " " + (32 + 21 * Math.sin(a)).toFixed(1) + "L" + (32 + 29 * Math.cos(a)).toFixed(1) + " " + (32 + 29 * Math.sin(a)).toFixed(1), "#F9A825", 4.4); }
  F.sun = svg(rays + body(ell(32, 32, 16, 16), "#FFD54F", "#F9A825") + eye(26, 30, 2.4) + eye(38, 30, 2.4) + L("M26 38Q32 43 38 38", K, 2.2) + hl(24, 23, 2.6, 5, 40));
  F.nut = svg(L("M32 14V6", "#6D4C41", 3) + body("M32 14C47 14 53 28 49 40C45 53 19 53 15 40C11 28 17 14 32 14Z", "#D49A5A", "#A86B2E") + P("M13 25Q32 5 51 25Q32 32 13 25Z", "#8D5A2B") + L("M20 22L24 26M30 17L32 22M42 20L40 25", "#6D4C41", 1.6) + hl(22, 40, 2.6, 6, 20));
  F.mug = svg(L("M43 25H50Q59 25 59 35Q59 45 50 45H43", K, 8) + L("M43 25H50Q59 25 59 35Q59 45 50 45H43", "#4DB6AC", 4) + body("M9 18H45V49Q45 57 37 57H17Q9 57 9 49Z", "#4DB6AC", "#00796B") + L("M20 8Q16 4 20 0M30 8Q26 4 30 0", "#B0BEC5", 2.2) + hl(17, 34, 2.6, 8, 0));

  /* 直接教學補圖：ax / ink / elbow / ox / uncle / under */
  F.ax = svg(L("M15 57L44 17", K, 8) + L("M15 57L44 17", "#BCAAA4", 4) + P("M36 8Q52 4 58 19Q51 28 42 24Q46 15 36 8Z", "#B0BEC5") + L("M44 12Q52 14 54 20", "#fff", 1.8));
  F.ink = svg(P("M25 17H39V27H25Z", "#CFD8DC") + P("M22 12H42V18H22Z", "#455A64") + body("M14 27H50V54Q50 59 45 59H19Q14 59 14 54Z", "#3F51B5", "#1A237E") + P(ell(32, 43, 7, 8), "#C5CAE9") + hl(21, 40, 2.4, 7, 0));
  F.elbow = svg(L("M8 14Q30 18 34 38Q36 50 57 50", K, 16) + L("M8 14Q30 18 34 38Q36 50 57 50", "#FFCC80", 12) + L("M25 24Q35 28 34 40", "#E57373", 3) + dot(29, 31, 4.5, "#F4511E") + hl(14, 15, 3, 6, 70));
  F.ox = svg(L("M15 46V57M26 48V57M44 48V57M54 46V57", K, 5) + body(ell(38, 36, 21, 15), "#8D6E63", "#5D4037") + body(ell(15, 34, 9, 10), "#A1887F", "#6D4C41") + L("M9 26Q2 20 6 12M20 25Q28 20 23 13", "#ECEFF1", 3.6) + eye(12, 31, 2.2) + dot(11, 40, 1.6, K) + dot(17, 40, 1.6, K) + hl(32, 27, 6, 3, -15));
  F.uncle = svg(body(ell(32, 46, 19, 16), "#42A5F5", "#1565C0") + body(ell(32, 22, 12, 13), "#FFCC80", "#E5A15A") + P("M20 18Q32 6 44 18Q38 12 32 12Q26 12 20 18Z", "#6D4C41") + eye(27, 22, 2) + eye(37, 22, 2) + P("M24 28Q32 24 40 28Q32 31 24 28Z", "#5D4037") + L("M29 33Q32 35 35 33", K, 1.8));
  F.under = svg(P("M5 17H59V25H5Z", "#A1887F") + L("M11 25V57M53 25V57", K, 5) + L("M11 25V57M53 25V57", "#8D6E63", 2.4) + body(ell(32, 47, 9, 9), "#EF5350", "#B71C1C") + L("M32 38V56", "#fff", 1.4) + L("M32 36V30M28 33L32 29L36 33", "#43A047", 2.4));
  F.iguana = svg(L("M44 34Q58 34 60 22", K, 7) + L("M44 34Q58 34 60 22", "#66BB6A", 3.2) + L("M18 48V57M32 49V57M44 47V57", K, 5) + body(ell(32, 38, 20, 12), "#66BB6A", "#2E7D32") + body(ell(12, 31, 9, 8), "#81C784", "#388E3C") + P("M18 24L21 17L25 24M27 24L30 16L34 24M36 25L39 18L43 26", "#A5D6A7") + eye(10, 29, 2.2) + L("M4 34Q9 37 14 35", K, 1.6));
})();
