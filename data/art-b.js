// 階段 B 圖卡：顏色、身體、數字（沿用 art.js 的畫法）
(function () {
  var F = window.MFE_SVG, K = "#3E4A59", n = 0;
  var ST = 'stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="-4 -9 72 76" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
  function ell(cx, cy, rx, ry) { return "M" + (cx - rx) + " " + cy + "a" + rx + " " + ry + " 0 1 0 " + (2 * rx) + " 0a" + rx + " " + ry + " 0 1 0 " + (-2 * rx) + " 0Z"; }
  function body(d, base, shade, inside) {
    var id = "bb" + (++n);
    return '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + id + ')"><rect x="-10" y="-10" width="90" height="90" fill="' + shade + '"/><path d="' + d + '" fill="' + base + '" transform="translate(-3.5 -3)"/>' + (inside || "") + '</g><path d="' + d + '" fill="none" ' + ST + "/>";
  }
  function P(d, fill) { return '<path d="' + d + '" fill="' + fill + '" ' + ST + "/>"; }
  function L(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'; }
  function hl(cx, cy, rx, ry, rot) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (rot || 0) + " " + cx + " " + cy + ')" fill="#fff" opacity=".6"/>'; }
  function eye(x, y, r) { r = r || 2.6; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/><circle cx="' + (x - r * .3) + '" cy="' + (y - r * .35) + '" r="' + (r * .35) + '" fill="#fff"/>'; }
  var SKIN = "#FFCC99", SKIN_D = "#F2A56B";

  // 顏色：一滴顏料
  var blob = "M32 5C48 3 59 16 58 32C57 48 46 59 30 58C14 57 6 46 7 30C8 15 18 7 32 5Z";
  [["red", "#EF5350", "#C62828"], ["yellow", "#FFD54F", "#F9A825"], ["blue", "#64B5F6", "#1E88E5"], ["green", "#81C784", "#388E3C"], ["orange", "#FFA726", "#E65100"], ["purple", "#BA68C8", "#7B1FA2"], ["pink", "#F8A9C8", "#EC6FA3"], ["white", "#FFFFFF", "#D3DDE3"], ["black", "#546E7A", "#263238"], ["brown", "#A1887F", "#6D4C41"]].forEach(function (c) {
    F["c_" + c[0]] = svg(body(blob, c[1], c[2]) + hl(21, 20, 3.4, 7, 35));
  });

  // 數字：圓形徽章＋大數字＋小圓點
  var NC = [["#EF5350", "#C62828"], ["#FFA726", "#E65100"], ["#FFD54F", "#F9A825"], ["#81C784", "#388E3C"], ["#64B5F6", "#1E88E5"], ["#BA68C8", "#7B1FA2"], ["#F48FB1", "#D81B60"], ["#4DB6AC", "#00796B"], ["#A1887F", "#6D4C41"], ["#7986CB", "#3949AB"]];
  for (var i = 1; i <= 10; i++) {
    var dots = "", cnt = i <= 5 ? i : 0, x0 = 32 - (cnt - 1) * 4.6;
    for (var k = 0; k < cnt; k++) dots += dot(x0 + k * 9.2, 50, 2.8, "#fff");
    var fs = i <= 5 ? 32 : (i === 10 ? 30 : 38), ty = i <= 5 ? 36 : (i === 10 ? 43 : 46);
    F["n" + i] = svg(body(ell(32, 33, 27, 27), NC[i - 1][0], NC[i - 1][1]) + '<text x="32" y="' + ty + '" text-anchor="middle" font-family="GenSenRounded, sans-serif" font-weight="900" font-size="' + fs + '" fill="#fff" stroke="' + K + '" stroke-width="2.6" paint-order="stroke" stroke-linejoin="round">' + i + "</text>" + dots);
  }

  // 身體
  F.b_head = svg(body(ell(32, 34, 21, 23), SKIN, SKIN_D) + '<path d="M11 30Q10 8 32 8Q54 8 53 30Q46 18 32 20Q18 18 11 30Z" fill="#6D4C41" ' + ST + "/>" + eye(24, 36) + eye(40, 36) + L("M26 46Q32 51 38 46", K, 2.2) + '<ellipse cx="19" cy="43" rx="3.2" ry="2" fill="#FF8A80" opacity=".6"/><ellipse cx="45" cy="43" rx="3.2" ry="2" fill="#FF8A80" opacity=".6"/>');
  F.b_eye = svg(body("M4 32Q32 6 60 32Q32 56 4 32Z", "#fff", "#D3DDE3") + '<circle cx="32" cy="32" r="11" fill="#6D9EEB" ' + ST + '/><circle cx="32" cy="32" r="5" fill="' + K + '"/><circle cx="28" cy="28" r="2.6" fill="#fff"/>' + L("M8 20Q32 2 56 20", K, 3.4));
  F.b_ear = svg(body("M30 6C46 4 54 18 50 32C47 42 40 44 38 52C36 60 24 60 22 50C20 44 24 40 22 32C20 18 20 8 30 6Z", SKIN, SKIN_D) + L("M31 16C40 15 43 24 39 31C37 36 33 36 32 42", SKIN_D, 3));
  F.b_nose = svg(body("M32 6C40 6 42 22 46 34C50 44 44 54 32 54C20 54 14 44 18 34C22 22 24 6 32 6Z", SKIN, SKIN_D) + '<ellipse cx="25" cy="46" rx="3" ry="2.4" fill="' + SKIN_D + '"/><ellipse cx="39" cy="46" rx="3" ry="2.4" fill="' + SKIN_D + '"/>' + hl(30, 24, 2, 7, 5));
  F.b_mouth = svg(body("M6 30Q20 22 32 28Q44 22 58 30Q54 54 32 54Q10 54 6 30Z", "#EF5350", "#C62828") + '<path d="M12 32Q32 38 52 32Q48 44 32 44Q16 44 12 32Z" fill="#fff" ' + ST.replace("2.4", "1.6") + "/>" + L("M32 33V43", "#D3DDE3", 1.4));
  F.b_hand = svg(body("M20 58Q12 50 14 38L12 24Q11 18 16 18Q20 18 21 24L22 12Q22 6 27 6Q32 6 32 12L32 8Q33 2 38 3Q42 4 42 9L42 14Q43 9 47 10Q51 11 50 17L50 34Q52 52 38 58Z", SKIN, SKIN_D) + L("M22 12V30M32 10V28M42 14V30", SKIN_D, 1.6));
  F.b_foot = svg(body(ell(14, 26, 4.6, 5), SKIN, SKIN_D) + body(ell(23, 17, 5, 5.6), SKIN, SKIN_D) + body(ell(33, 13, 5, 5.6), SKIN, SKIN_D) + body(ell(42, 16, 4.6, 5.2), SKIN, SKIN_D) + body(ell(49, 23, 4, 4.6), SKIN, SKIN_D) + body("M32 24C46 24 54 36 50 48C47 58 38 60 30 58C20 56 12 52 12 40C12 30 20 24 32 24Z", SKIN, SKIN_D) + hl(22, 38, 3, 7, 20));
  F.b_tummy = svg(body(ell(32, 36, 23, 22), SKIN, SKIN_D) + P("M7 26Q7 8 32 8Q57 8 57 26Q32 18 7 26Z", "#81D4FA") + L("M29 40Q32 44 35 40", SKIN_D, 2.6) + hl(20, 38, 3, 6, 20));
  F.b_hair = svg(body(ell(32, 36, 20, 22), SKIN, SKIN_D) + body("M8 34Q4 6 32 6Q60 6 56 34Q52 22 44 18Q36 24 24 18Q14 22 8 34Z", "#8D5A2B", "#5D4037") + L("M20 14Q26 10 32 12", "#C98B4B", 2.4) + eye(24, 38, 2.2) + eye(40, 38, 2.2));
  F.b_tooth = svg(body("M14 12Q22 4 32 10Q42 4 50 12Q54 26 46 36Q44 54 38 56Q32 56 32 44Q32 56 26 56Q20 54 18 36Q10 26 14 12Z", "#fff", "#D3DDE3") + L("M20 16Q24 12 28 14", "#fff", 0) + '<path d="M60 8L62 4M56 6L58 2" stroke="#FFD54F" stroke-width="2.4" stroke-linecap="round"/>' + hl(21, 20, 2, 5, 20));
})();
