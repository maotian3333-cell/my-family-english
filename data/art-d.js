// 補充圖卡 2：補齊 26 個字母與拼讀結構用的圖（j k q v w x y z、th、ar 等）。
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

  F.jam = svg(P("M16 14H48V22H16Z", "#E53935") + body("M13 22H51V52Q51 58 45 58H19Q13 58 13 52Z", "#D32F2F", "#8E0000") + P("M19 32H45V48H19Z", "#FFF8E1") + dot(32, 40, 4, "#D32F2F") + hl(19, 30, 2, 6, 0));
  F.jellyfish = svg(L("M20 34Q16 44 21 52M28 36Q25 47 29 57M36 36Q39 47 35 57M44 34Q48 44 43 52", "#F48FB1", 3) + body("M8 34Q8 8 32 8Q56 8 56 34Z", "#F8BBD0", "#EC407A") + eye(24, 24, 2.4) + eye(40, 24, 2.4) + L("M28 30Q32 33 36 30", K, 1.8) + hl(18, 17, 3, 6, 40));
  F.king = svg(body(ell(32, 40, 17, 17), "#FFCC80", "#E5A15A") + P("M14 28L16 10L24 20L32 8L40 20L48 10L50 28Z", "#FFD54F") + dot(32, 12, 2.4, "#E53935") + eye(26, 40, 2.2) + eye(38, 40, 2.2) + P("M22 47Q32 55 42 47Q42 56 32 58Q22 56 22 47Z", "#ECEFF1"));
  F.vase = svg(L("M32 20V6M32 14Q24 8 20 12M32 12Q40 4 46 9", "#66BB6A", 2.6) + dot(20, 11, 4, "#EC407A") + dot(46, 8, 4, "#FFCA28") + body("M24 20H40Q40 30 48 40Q50 58 38 58H26Q14 58 16 40Q24 30 24 20Z", "#42A5F5", "#1565C0") + hl(22, 44, 2.6, 8, 8));
  F.violin = svg(L("M54 6L48 58", K, 4.2) + L("M54 6L48 58", "#6D4C41", 1.8) + L("M52.6 12L47.4 56", "#FFF3E0", 1) + L("M28 6V32", K, 6) + L("M28 6V32", "#6D4C41", 3) + dot(28, 5, 3.6, "#6D4C41") + body("M21 31Q13 33 17 39Q23 43 16 48Q12 58 28 58Q44 58 40 48Q33 43 39 39Q43 33 35 31Q28 29 21 31Z", "#FF8A65", "#BF360C") + L("M22 41Q20 46 22 51M34 41Q36 46 34 51", "#5D2E1A", 1.6) + L("M28 33V50", "#FFE0B2", 1) + L("M23 49H33", K, 1.8));
  F.vest = svg(body("M14 8L26 8L32 20L38 8L50 8L56 18V56H8V18Z", "#5C6BC0", "#283593") + L("M32 20V56", "#E8EAF6", 1.8) + dot(32, 30, 2, "#FFD54F") + dot(32, 40, 2, "#FFD54F") + dot(32, 50, 2, "#FFD54F") + hl(16, 28, 2.4, 8, 0));
  F.yoyo = svg(L("M32 6V26", K, 2) + body(ell(32, 42, 18, 18), "#FF7043", "#BF360C") + P(ell(32, 42, 8, 8), "#FFCCBC") + dot(32, 42, 2.4, K) + hl(22, 34, 3, 6, 40));
  F.yarn = svg(L("M44 44Q56 46 58 56", "#EC407A", 3) + body(ell(30, 36, 21, 21), "#F06292", "#AD1457") + L("M14 30Q30 42 46 26M12 40Q30 52 48 36M20 18Q36 30 44 20", "#F8BBD0", 2) + hl(20, 26, 3, 6, 40));
  F.zucchini = svg('<g transform="rotate(-30 32 34)">' + body(ell(32, 34, 27, 9.5), "#66BB6A", "#2E7D32", '<path d="M10 34H54" stroke="#A5D6A7" stroke-width="1.6" opacity=".7"/>') + "</g>" + P("M52 21L59 12L62 20Z", "#6D4C41") + L("M16 44L22 40M28 37L35 33M40 30L46 26", "#A5D6A7", 2) + dot(9, 47, 2, "#2E7D32"));
  F.queen = svg(body(ell(32, 40, 16, 17), "#FFCC80", "#E5A15A") + P("M16 26L16 11L24 19L32 7L40 19L48 11L48 26Z", "#FFD54F") + dot(32, 12, 2.4, "#E53935") + P("M14 30Q10 50 16 58Q16 40 24 32Z", "#F9A825") + P("M50 30Q54 50 48 58Q48 40 40 32Z", "#F9A825") + eye(26, 38, 2.2) + eye(38, 38, 2.2) + L("M27 47Q32 51 37 47", "#D81B60", 2.2));
  F.quilt = svg(body("M6 10H58V54H6Z", "#FFF", "#ccc", P("M6 10H32V32H6Z", "#EF5350") + P("M32 10H58V32H32Z", "#FFD54F") + P("M6 32H32V54H6Z", "#42A5F5") + P("M32 32H58V54H32Z", "#66BB6A")) + L("M19 10V54M45 10V54M6 21H58M6 43H58", "#fff", 1.4));
  F.quarter = svg(body(ell(32, 32, 26, 26), "#CFD8DC", "#78909C") + P(ell(32, 32, 20, 20), "#ECEFF1") + '<text x="32" y="40" text-anchor="middle" font-size="22" font-weight="900" font-family="sans-serif" fill="#455A64">25</text>');
  F.question = svg(body("M8 8H56V44H34L22 58V44H8Z", "#FFD54F", "#F9A825") + '<text x="32" y="38" text-anchor="middle" font-size="34" font-weight="900" font-family="sans-serif" fill="#3E4A59">?</text>');
  F.bath = svg(dot(18, 10, 4, "#E1F5FE") + dot(26, 5, 3, "#E1F5FE") + dot(40, 8, 3.4, "#E1F5FE") + L("M12 54V58M52 54V58", K, 4) + body("M4 26H60Q60 50 48 54H16Q4 50 4 26Z", "#FAFAFA", "#90A4AE") + P("M4 22H60V28H4Z", "#B3E5FC") + hl(14, 36, 3, 6, 40));
  F.moth = svg(L("M30 14Q26 6 20 6M34 14Q38 6 44 6", K, 2) + P("M30 24Q6 6 4 30Q6 52 30 44Z", "#BCAAA4") + P("M34 24Q58 6 60 30Q58 52 34 44Z", "#BCAAA4") + dot(16, 28, 4, "#8D6E63") + dot(48, 28, 4, "#8D6E63") + body(ell(32, 34, 5, 16), "#8D6E63", "#4E342E") + dot(32, 15, 3.2, "#6D4C41"));
  F.star = svg(body("M32 4L40 24L60 25L45 38L50 58L32 47L14 58L19 38L4 25L24 24Z", "#FFD54F", "#F9A825") + eye(26, 32, 2) + eye(38, 32, 2) + L("M28 40Q32 43 36 40", K, 1.8) + hl(24, 20, 2.4, 5, 30));
  F.jar = svg(P("M16 8H48V16H16Z", "#90A4AE") + body("M14 16H50V54Q50 58 46 58H18Q14 58 14 54Z", "#E3F2FD", "#90CAF9") + L("M14 24H50", "#90CAF9", 1.6) + dot(26, 42, 3, "#FFEE58") + dot(38, 34, 3, "#FFEE58") + dot(34, 48, 3, "#FFEE58") + hl(19, 36, 2.4, 9, 0));
  F.shark = svg(P("M8 38Q22 18 48 24Q56 26 58 36Q48 48 28 48Q14 48 8 38Z", "#78909C") + P("M30 28L36 8L44 26Z", "#546E7A") + P("M54 30L62 20L62 42Z", "#546E7A") + P("M14 40Q28 52 48 42Q40 50 28 50Q18 49 14 40Z", "#ECEFF1") + eye(20, 36, 2.2) + L("M22 42Q30 46 38 43", K, 1.6));
})();
