// 補充圖卡 3：動作（小朋友）、感受（表情）、位置（球與盒子）、大小冷熱。
(function () {
  var F = window.MFE_SVG, K = "#3E4A59", SK = "#FFCC80";
  var ST = 'stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="-4 -9 72 76" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
  function P(d, fill) { return '<path d="' + d + '" fill="' + fill + '" ' + ST + "/>"; }
  function L(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function C(x, y, r, fill) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" ' + ST + "/>"; }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'; }
  function limb(d, c) { return L(d, K, 8) + L(d, c, 4.6); }
  /* 小朋友：hx,hy 頭中心；torso 軀幹線；arms、legs 為路徑 */
  function kid(o) {
    var hx = o.hx, hy = o.hy, shirt = o.shirt || "#42A5F5", pants = o.pants || "#5C6BC0";
    return (o.back || "") + limb(o.legs[0], pants) + limb(o.legs[1], pants) + limb(o.torso, shirt) + limb(o.arms[0], SK) + limb(o.arms[1], SK) +
      C(hx, hy, 9.5, SK) + P("M" + (hx - 9.5) + " " + (hy - 2) + "Q" + hx + " " + (hy - 16) + " " + (hx + 9.5) + " " + (hy - 2) + "Q" + hx + " " + (hy - 8) + " " + (hx - 9.5) + " " + (hy - 2) + "Z", "#6D4C41") +
      dot(hx - 3.2 + (o.look || 0), hy + 0.5, 1.5, K) + dot(hx + 3.2 + (o.look || 0), hy + 0.5, 1.5, K) + L("M" + (hx - 3 + (o.look || 0)) + " " + (hy + 4.5) + "Q" + (hx + (o.look || 0)) + " " + (hy + 7) + " " + (hx + 3 + (o.look || 0)) + " " + (hy + 4.5), K, 1.4) + (o.fore || "");
  }
  var G = '<ellipse cx="32" cy="60" rx="18" ry="3" fill="#000" opacity=".12"/>';
  F.vb_stand = svg(G + kid({ hx: 32, hy: 14, torso: "M32 25V42", arms: ["M32 28L22 42", "M32 28L42 42"], legs: ["M32 42L26 58", "M32 42L38 58"] }));
  F.vb_jump = svg('<ellipse cx="32" cy="61" rx="14" ry="2.6" fill="#000" opacity=".1"/>' + kid({ hx: 32, hy: 10, shirt: "#FF7043", torso: "M32 21V37", arms: ["M32 24L20 10", "M32 24L44 10"], legs: ["M32 37L22 48L18 54", "M32 37L42 48L46 54"] }) + L("M12 30V40M52 30V40M8 36V44M56 36V44", "#90A4AE", 2));
  F.vb_run = svg(G + L("M6 22H16M4 30H14M8 38H16", "#90A4AE", 2.2) + kid({ hx: 38, hy: 13, shirt: "#66BB6A", look: 2, torso: "M36 24L32 41", arms: ["M36 27L46 34L50 26", "M36 27L26 30L22 38"], legs: ["M32 41L22 50L12 54", "M32 41L44 46L48 58"] }));
  F.vb_walk = svg(G + L("M6 52H14M4 58H12", "#90A4AE", 2.2) + kid({ hx: 34, hy: 14, shirt: "#AB47BC", look: 2, torso: "M33 25L32 42", arms: ["M33 28L24 38", "M33 28L44 36"], legs: ["M32 42L20 57", "M32 42L46 55"] }));
  F.vb_sit = svg('<ellipse cx="32" cy="59" rx="24" ry="3" fill="#000" opacity=".12"/>' + kid({ hx: 24, hy: 20, shirt: "#FFA726", look: 1, torso: "M24 31L26 48", arms: ["M24 34L36 40", "M24 34L38 46"], legs: ["M26 48L48 48", "M26 50L50 54"] }));
  F.vb_clap = svg(G + kid({ hx: 32, hy: 14, shirt: "#EC407A", torso: "M32 25V42", arms: ["M32 28L24 34L31 36", "M32 28L40 34L33 36"], legs: ["M32 42L26 58", "M32 42L38 58"] }) + L("M32 24V20M24 26L21 22M40 26L43 22M28 30L24 28M36 30L40 28", "#FFC107", 2.2));
  F.vb_wave = svg(G + kid({ hx: 30, hy: 14, shirt: "#26C6DA", torso: "M30 25V42", arms: ["M30 28L20 42", "M30 28L42 22L48 10"], legs: ["M30 42L24 58", "M30 42L36 58"] }) + L("M54 8Q57 14 54 20M58 5Q62 14 58 23", "#FFC107", 2.2));
  F.vb_sleep = svg('<rect x="2" y="40" width="60" height="18" rx="5" fill="#B39DDB" ' + ST + "/>" + '<rect x="4" y="36" width="20" height="10" rx="5" fill="#fff" ' + ST + "/>" +
    C(15, 36, 8.5, SK) + L("M10 36Q12.5 38 15 36M17 36Q19.5 38 22 36", K, 1.6) + P("M22 38H60V54H22Z", "#7E57C2") + L("M30 38V54M42 38V54", "#9575CD", 2) +
    '<text x="40" y="22" font-size="14" font-weight="900" fill="#5C6BC0" font-family="sans-serif">Z</text><text x="50" y="12" font-size="10" font-weight="900" fill="#7986CB" font-family="sans-serif">z</text>');
  /* 感受 */
  function face(base, inner) { return svg('<ellipse cx="32" cy="58" rx="16" ry="2.6" fill="#000" opacity=".1"/>' + C(32, 31, 24, base) + inner); }
  function ey(x, y) { return dot(x, y, 2.8, K) + dot(x - 0.9, y - 1, 0.9, "#fff"); }
  F.em_happy = face("#FFD54F", ey(22, 26) + ey(42, 26) + P("M18 36Q32 52 46 36Z", "#fff") + L("M18 36Q32 52 46 36", K, 2.4) + dot(15, 36, 3.6, "#FF8A80") + dot(49, 36, 3.6, "#FF8A80"));
  F.em_sad = face("#FFE082", ey(22, 28) + ey(42, 28) + L("M16 20L26 23M48 20L38 23", K, 2.2) + L("M22 47Q32 38 42 47", K, 2.6) + '<path d="M20 34Q16 42 21 44Q25 40 20 34Z" fill="#4FC3F7" ' + ST.replace("2.4", "1.4") + "/>");
  F.em_angry = face("#FF8A65", dot(22, 29, 2.8, K) + dot(42, 29, 2.8, K) + L("M14 19L28 25M50 19L36 25", K, 3.2) + L("M22 47Q32 39 42 47", K, 2.8) + L("M10 8L14 14M54 8L50 14M32 3V9", "#E53935", 2.4));
  F.em_sleepy = face("#FFE082", L("M17 28Q22 32 27 28M37 28Q42 32 47 28", K, 2.6) + P("M27 40Q32 50 37 40Q32 38 27 40Z", "#fff") + '<text x="48" y="12" font-size="13" font-weight="900" fill="#5C6BC0" font-family="sans-serif">Z</text><text x="56" y="4" font-size="9" font-weight="900" fill="#7986CB" font-family="sans-serif">z</text>');
  F.em_hungry = face("#FFD54F", ey(22, 25) + ey(42, 25) + L("M17 17L27 20M47 17L37 20", K, 2) + P("M22 38Q32 56 42 38Z", "#8D3B3B") + P("M26 46Q32 52 38 46Q32 44 26 46Z", "#FF8A80") + '<path d="M44 40Q48 48 44 52Q41 47 44 40Z" fill="#4FC3F7" ' + ST.replace("2.4", "1.2") + "/>");
  F.em_scared = face("#E1BEE7", '<circle cx="22" cy="26" r="6" fill="#fff" ' + ST.replace("2.4", "1.8") + "/>" + '<circle cx="42" cy="26" r="6" fill="#fff" ' + ST.replace("2.4", "1.8") + "/>" + dot(22, 27, 2.4, K) + dot(42, 27, 2.4, K) + L("M16 15L26 18M48 15L38 18", K, 2) + L("M20 46Q24 40 28 46Q32 40 36 46Q40 40 44 46", K, 2.4) + '<path d="M52 20Q55 26 52 29Q49 25 52 20Z" fill="#4FC3F7" ' + ST.replace("2.4", "1.2") + "/>");
  /* 位置 */
  function ball(x, y, r) { return C(x, y, r, "#EF5350") + L("M" + (x - r) + " " + y + "Q" + x + " " + (y - r * 0.5) + " " + (x + r) + " " + y, "#fff", 1.6) + dot(x - r * 0.4, y - r * 0.45, r * 0.2, "#fff"); }
  function box(x, y, w, h) { return P("M" + x + " " + y + "H" + (x + w) + "V" + (y + h) + "H" + x + "Z", "#D7A86E") + L("M" + x + " " + (y + 7) + "H" + (x + w), "#B98445", 2.2) + P("M" + (x + w * 0.35) + " " + y + "H" + (x + w * 0.65) + "V" + (y + 6) + "H" + (x + w * 0.35) + "Z", "#FFF3E0"); }
  F.pp_in = svg(G + P("M12 34L5 24L15 22L19 34Z", "#C99555") + P("M52 34L59 24L49 22L45 34Z", "#C99555") + ball(32, 29, 11) + P("M10 33H54V58H10Z", "#D7A86E") + L("M10 40H54", "#B98445", 2.2) + P("M26 46H38V52H26Z", "#FFF3E0"));
  F.pp_on = svg(G + box(10, 36, 44, 22) + ball(32, 24, 11) + L("M30 8V13M32 6V12M34 8V13", "#FFC107", 1.8));
  F.pp_under = svg('<ellipse cx="32" cy="60" rx="25" ry="2.8" fill="#000" opacity=".12"/>' + L("M10 30V56M54 30V56", K, 8) + L("M10 30V56M54 30V56", "#C69C6D", 4.4) + ball(32, 47, 8.5) + box(4, 6, 56, 26));
  /* 大小冷熱 */
  function apple(x, y, r, c) { return C(x, y, r, c || "#EF5350") + L("M" + x + " " + (y - r) + "Q" + (x + 1) + " " + (y - r - r * 0.35) + " " + (x + r * 0.3) + " " + (y - r - r * 0.4), "#6D4C41", Math.max(1.4, r * 0.1)) + P("M" + (x + 1) + " " + (y - r - r * 0.1) + "Q" + (x + r * 0.5) + " " + (y - r - r * 0.55) + " " + (x + r * 0.8) + " " + (y - r - r * 0.1) + "Q" + (x + r * 0.4) + " " + (y - r + r * 0.1) + " " + (x + 1) + " " + (y - r - r * 0.1) + "Z", "#66BB6A") + dot(x - r * 0.4, y - r * 0.3, r * 0.18, "#fff"); }
  F.aj_big = svg(G + apple(32, 36, 24) + L("M4 8L12 16M60 8L52 16M4 58L12 50M60 58L52 50", "#90A4AE", 2.2));
  F.aj_small = svg(G + '<circle cx="32" cy="36" r="24" fill="none" stroke="#B0BEC5" stroke-width="2" stroke-dasharray="3 4"/>' + apple(32, 46, 8));
  F.aj_hot = svg(G + P("M32 4Q46 18 42 32Q50 28 50 40Q50 56 32 56Q14 56 14 40Q14 28 24 22Q22 34 28 34Q24 18 32 4Z", "#FF7043") + P("M32 26Q40 34 38 44Q38 52 32 52Q26 52 26 44Q26 36 32 26Z", "#FFD54F") + L("M54 8Q57 14 54 20M60 6Q64 14 60 22", "#E53935", 2.2));
  var SNOW = ""; [90, 30, 150].forEach(function (a) { [1, -1].forEach(function (dr) { var r = a * Math.PI / 180, dx = dr * Math.cos(r), dy = -dr * Math.sin(r), px = -dy, py = dx, bx = 32 + dx * 17, by = 32 + dy * 17; SNOW += "M32 32L" + (32 + dx * 26).toFixed(1) + " " + (32 + dy * 26).toFixed(1) + "M" + bx.toFixed(1) + " " + by.toFixed(1) + "L" + (bx + dx * 7 + px * 7).toFixed(1) + " " + (by + dy * 7 + py * 7).toFixed(1) + "M" + bx.toFixed(1) + " " + by.toFixed(1) + "L" + (bx + dx * 7 - px * 7).toFixed(1) + " " + (by + dy * 7 - py * 7).toFixed(1); }); });
  F.aj_cold = svg(G + L(SNOW, "#4FC3F7", 4.6) + L(SNOW, "#fff", 1.6) + C(32, 32, 4.6, "#E1F5FE"));
})();
