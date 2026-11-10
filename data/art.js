// 水果圖卡：統一的「扁平 2.0」風格
// 規則：深灰藍描邊（同 UI）、純色底＋同色系暗塊（無漸層）、白色小亮點、綠色葉子同一種畫法。
window.MFE_SVG = (function () {
  var K = "#3E4A59", n = 0;
  var ST = 'stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function svg(inner) { return '<svg viewBox="-4 -9 72 76" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>"; }
  function ell(cx, cy, rx, ry) { return "M" + (cx - rx) + " " + cy + "a" + rx + " " + ry + " 0 1 0 " + (2 * rx) + " 0a" + rx + " " + ry + " 0 1 0 " + (-2 * rx) + " 0Z"; }
  function circ(cx, cy, r) { return ell(cx, cy, r, r); }
  // 主體：底色 + 右下暗塊（用 clipPath 切出新月形）+ 描邊；o.inside 是畫在主體裡面的細節
  function body(d, base, shade, o) {
    o = o || {}; var id = "mc" + (++n), dx = o.dx != null ? o.dx : -3.5, dy = o.dy != null ? o.dy : -3;
    return '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + id + ')"><rect x="-10" y="-10" width="90" height="90" fill="' + shade + '"/><path d="' + d + '" fill="' + base + '" transform="translate(' + dx + " " + dy + ')"/>' + (o.inside || "") + '</g><path d="' + d + '" fill="none" ' + ST + "/>";
  }
  function leaf(x, y, rot, s) { return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + (s || 1) + ')" d="M0 0C4-7 12-9 18-5C14 2 6 4 0 0Z" fill="#8BC34A" ' + ST + "/>"; }
  function stem(d, w) { return '<path d="' + d + '" fill="none" stroke="#6D4C41" stroke-width="' + (w || 3) + '" stroke-linecap="round"/>'; }
  function hl(cx, cy, rx, ry, rot) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (rot || 0) + " " + cx + " " + cy + ')" fill="#fff" opacity=".6"/>'; }
  function dot(x, y, r, c, o) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"' + (o ? ' opacity="' + o + '"' : "") + "/>"; }
  function seed(x, y, c, rot) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="1.3" ry="2.2" transform="rotate(' + (rot || 0) + " " + x + " " + y + ')" fill="' + c + '"/>'; }
  function star(cx, cy, ro, ri, pts) { var s = []; for (var i = 0; i < pts * 2; i++) { var r = i % 2 ? ri : ro, a = (-90 + i * 180 / pts) * Math.PI / 180; s.push((cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1)); } return "M" + s.join("L") + "Z"; }
  var F = {};

  F.apple = svg(body("M32 20C27 14 14 17 13 31C12 45 22 58 29 58C31 58 31.5 56.5 32 56.5C32.5 56.5 33 58 35 58C42 58 52 45 51 31C50 17 37 14 32 20Z", "#EF5350", "#C62828") + stem("M32 20C32 15 34 11 37 9") + leaf(35, 15, -12) + hl(21, 31, 2.6, 6, -14));

  F.banana = svg(body("M11 24C12 42 27 57 50 52C54 51 54 47 50 46C36 45 28 36 26 22C25 17 11 18 11 24Z", "#FFD54F", "#F9A825", { inside: '<path d="M18 22C20 36 30 46 44 49" fill="none" stroke="#F9A825" stroke-width="2"/>' }) + '<path d="M12 22L14 11L22 12L21 21Z" fill="#8D6E63" ' + ST + "/>" + dot(52, 49, 2.6, "#5D4037") + hl(18, 33, 1.8, 5, -20));

  (function () {
    var s = "", P = [[32, 45], [26, 35], [38, 35], [20, 25], [32, 25], [44, 25]];
    s += stem("M32 20V9");
    P.forEach(function (p) { s += body(circ(p[0], p[1], 8.6), "#8E5CC9", "#6A3FA8") + hl(p[0] - 3, p[1] - 3, 1.6, 2.6, -30); });
    F.grapes = svg(s + leaf(33, 11, -20, 1.1));
  })();

  F.orange = svg(
    body(circ(28, 34, 20), "#FF9800", "#E65100", { inside: dot(18, 30, 1, "#E65100", .5) + dot(30, 22, 1, "#E65100", .5) + dot(36, 36, 1, "#E65100", .5) + dot(22, 42, 1, "#E65100", .5) + dot(32, 44, 1, "#E65100", .5) + dot(14, 38, 1, "#E65100", .5) }) +
    leaf(28, 15, -35, .9) + hl(18, 26, 2.6, 5, -35) +
    '<circle cx="46" cy="46" r="12.5" fill="#FF9800" ' + ST + '/><circle cx="46" cy="46" r="9.6" fill="#FFCC80"/>' +
    [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<path d="M46 46L' + (46 + 9.6 * Math.cos(a)).toFixed(1) + " " + (46 + 9.6 * Math.sin(a)).toFixed(1) + '" stroke="#FFF3E0" stroke-width="1.5" stroke-linecap="round"/>'; }).join("") + dot(46, 46, 1.8, "#FFF3E0"));

  F.tangerine = svg(
    body(ell(30, 38, 23, 16), "#FFB74D", "#F57C00", { inside: ell2(24, 44) }) +
    '<path d="M24 24Q30 21 36 24" fill="none" stroke="#E65100" stroke-width="2" stroke-linecap="round" opacity=".5"/>' + leaf(30, 23, -40, 1) + hl(17, 33, 2.4, 4.6, -50) +
    '<path d="M44 50C45 44 51 41 57 44C57 51 50 56 44 50Z" fill="#FFE0B2" ' + ST + '/><path d="M47 48C50 46 53 46 55 47" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>');
  function ell2() { return ""; }

  F.strawberry = svg(
    body("M32 57C18 47 12 35 14 25C16 17 26 17 32 21C38 17 48 17 50 25C52 35 46 47 32 57Z", "#EF5350", "#C62828") +
    [[24, 30], [32, 31], [40, 30], [27, 39], [37, 39], [32, 47], [21, 25], [43, 25]].map(function (p) { return seed(p[0], p[1], "#FFE082"); }).join("") +
    '<path d="M32 23L24 15L28 23L19 22L27 27L32 33L37 27L45 22L36 23L40 15Z" fill="#8BC34A" ' + ST + "/>" + stem("M32 23V13", 3.4));

  F.watermelon = svg(
    '<path d="M6 19A26 26 0 0 0 58 19Z" fill="#43A047" ' + ST + '/><path d="M9 19A23 23 0 0 0 55 19Z" fill="#DCEDC8"/><path d="M11.5 19A20.5 20.5 0 0 0 52.5 19Z" fill="#EF5350"/><path d="M14 19A18 18 0 0 0 50 19Z" fill="#E53935" opacity=".45"/>' +
    [[21, 27, -20], [32, 32, 0], [43, 27, 20], [26, 38, -10], [38, 38, 10]].map(function (p) { return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="1.7" ry="2.8" transform="rotate(' + p[2] + " " + p[0] + " " + p[1] + ')" fill="#37474F"/>'; }).join("") +
    '<path d="M6 19H58" stroke="' + K + '" stroke-width="2.4" stroke-linecap="round"/>');

  F.pear = svg(body("M32 12C38 12 39 20 40 26C41 32 50 36 50 44C50 54 42 58 32 58C22 58 14 54 14 44C14 36 23 32 24 26C25 20 26 12 32 12Z", "#CDDC39", "#9DB02F") + stem("M32 13C32 9 33 7 36 5") + leaf(34, 9, -15, 1) + hl(22, 44, 2.4, 5.5, 10));

  F.peach = svg(body("M32 19C20 13 10 23 12 37C14 50 24 59 32 59C40 59 50 50 52 37C54 23 44 13 32 19Z", "#FFAB91", "#FF8A65", { inside: '<ellipse cx="44" cy="30" rx="11" ry="14" fill="#FF7043" opacity=".4"/>' }) + '<path d="M32 19C28 30 29 43 34 54" fill="none" stroke="#E57350" stroke-width="2" stroke-linecap="round"/>' + stem("M32 19C32 15 33 13 35 11") + leaf(34, 14, -15, 1.05) + hl(20, 34, 2.4, 5.5, -12));

  F.cherry = svg(
    stem("M21 36C22 22 28 14 34 9") + stem("M42 34C40 22 38 14 34 9") + leaf(34, 10, -5, 1.1) +
    body(circ(21, 46, 10.5), "#E53935", "#B71C1C") + body(circ(43, 44, 10.5), "#E53935", "#B71C1C") + hl(17, 42, 2, 3.4, 20) + hl(39, 40, 2, 3.4, 20));

  (function () {
    var seeds = "";
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; seeds += '<ellipse cx="' + (32 + 10.5 * Math.cos(a)).toFixed(1) + '" cy="' + (35 + 8 * Math.sin(a)).toFixed(1) + '" rx="1.2" ry="1.8" transform="rotate(' + (i * 30 + 90) + " " + (32 + 10.5 * Math.cos(a)).toFixed(1) + " " + (35 + 8 * Math.sin(a)).toFixed(1) + ')" fill="#37474F"/>'; }
    F.kiwi = svg('<path d="' + ell(32, 35, 24, 20) + '" fill="#A1887F" ' + ST + '/><path d="' + ell(32, 35, 21, 17) + '" fill="#9CCC65"/><path d="' + ell(32, 35, 14, 11) + '" fill="#C5E1A5"/><path d="' + ell(32, 35, 6.5, 5) + '" fill="#F1F8E9"/>' + seeds);
  })();

  F.pineapple = svg(
    '<path d="M32 26L24 6L30 15L32 2L34 15L40 6Z" fill="#66BB6A" ' + ST + '/><path d="M27 26L15 13L29 20Z" fill="#43A047" ' + ST + '/><path d="M37 26L49 13L35 20Z" fill="#43A047" ' + ST + "/>" +
    body(ell(32, 42, 16, 19), "#FFC107", "#FF8F00", { inside: [0, 1, 2, 3, 4, 5].map(function (i) { return '<path d="M' + (8 + i * 8) + ' 22L' + (28 + i * 8) + ' 66M' + (56 - i * 8) + ' 22L' + (36 - i * 8) + ' 66" stroke="#E65100" stroke-width="1.3" opacity=".5"/>'; }).join("") }));

  F.mango = svg(body("M13 36C12 20 26 11 40 15C54 19 55 38 46 48C37 58 14 54 13 36Z", "#FFB74D", "#F57C00", { inside: '<ellipse cx="43" cy="26" rx="11" ry="9" fill="#EF5350" opacity=".5"/><ellipse cx="16" cy="42" rx="8" ry="12" fill="#AED581" opacity=".7"/>' }) + stem("M27 14C27 11 29 9 31 8") + leaf(29, 11, -20, 1.1) + hl(25, 26, 2.4, 5, 50));

  F.lemon = svg('<g transform="rotate(-14 32 34)">' + body("M5 36C9 35 12 33 14 29C18 19 28 15 38 16C48 17 53 25 54 31C56 31 58 30 60 29C59 33 57 35 55 36C53 47 44 54 32 54C22 54 15 48 12 41C10 39 7 38 5 36Z", "#FFEE58", "#FBC02D", { inside: dot(24, 26, 1, "#F9A825", .6) + dot(36, 24, 1, "#F9A825", .6) + dot(44, 38, 1, "#F9A825", .6) + dot(30, 44, 1, "#F9A825", .6) + dot(20, 38, 1, "#F9A825", .6) }) + hl(22, 28, 2.6, 5, 55) + "</g>" + leaf(33, 18, -35, 1));

  F.melon = svg(body(circ(32, 35, 21), "#DCE775", "#AEB94A", { inside: ["M32 14C22 26 22 44 32 56", "M32 14C42 26 42 44 32 56", "M32 14V56", "M12 35C24 41 40 41 52 35", "M14 25C26 29 38 29 50 25", "M14 45C26 49 38 49 50 45"].map(function (d) { return '<path d="' + d + '" fill="none" stroke="#F9FBE7" stroke-width="1.6" opacity=".85"/>'; }).join("") }) + stem("M32 14V8", 4) + hl(21, 28, 2.4, 5, 30));

  F.coconut = svg('<path d="' + circ(32, 35, 23) + '" fill="#6D4C41" ' + ST + '/><path d="' + circ(32, 35, 18.5) + '" fill="#FFF8E1"/><path d="' + circ(32, 35, 11.5) + '" fill="#B2EBF2"/>' + hl(27, 30, 3, 5, 30) + '<path d="' + circ(32, 35, 11.5) + '" fill="none" stroke="#80DEEA" stroke-width="1.5"/>');

  F.blueberries = svg(
    body(circ(32, 22, 11), "#5C6BC0", "#3949AB") + dot(32, 19.5, 3, "#283593") + hl(27, 17, 1.8, 3, -30) +
    body(circ(20, 42, 12), "#5C6BC0", "#3949AB") + dot(20, 39, 3.2, "#283593") + hl(14, 37, 2, 3.4, -30) +
    body(circ(44, 42, 12), "#5C6BC0", "#3949AB") + dot(44, 39, 3.2, "#283593") + hl(38, 37, 2, 3.4, -30) + leaf(33, 13, -30, .8));

  F.tomato = svg(body(ell(32, 39, 23, 19), "#EF5350", "#C62828") + '<path d="M32 23L25 15L29 23L20 22L28 27L32 33L36 27L44 22L35 23L39 15Z" fill="#8BC34A" ' + ST + "/>" + stem("M32 23V13", 3.4) + hl(20, 38, 2.4, 5, 20));

  (function () {
    var out = "M32 6C42 6 45 18 48 28C52 38 54 44 52 50C50 58 42 60 32 60C22 60 14 58 12 50C10 44 14 38 17 28C20 18 22 6 32 6Z";
    F.avocado = svg('<path d="' + out + '" fill="#558B2F" ' + ST + '/><path d="' + out + '" fill="#C5E1A5" transform="translate(32 36) scale(.84) translate(-32 -36)"/><path d="' + out + '" fill="#E6EE9C" transform="translate(32 40) scale(.62) translate(-32 -36)"/>' + dot(32, 45, 9.6, "#8D6E63") + hl(29, 41, 2.2, 3.6, 30));
  })();

  (function () {
    var dots = [[26, 28], [36, 27], [31, 33], [24, 38], [39, 36], [30, 42], [34, 46], [22, 30], [41, 29], [28, 49], [38, 43]].map(function (p) { return dot(p[0], p[1], 1.3, "#37474F"); }).join("");
    F.dragonfruit = svg(
      ['M11 22L3 17L11 30Z', 'M10 36L2 36L11 45Z', 'M14 48L7 56L19 52Z', 'M53 22L61 17L53 30Z', 'M54 36L62 36L53 45Z', 'M50 48L57 56L45 52Z', 'M26 12L32 2L38 12Z'].map(function (d) { return '<path d="' + d + '" fill="#8BC34A" ' + ST + "/>"; }).join("") +
      '<path d="' + ell(32, 35, 22, 24) + '" fill="#EC407A" ' + ST + '/><path d="' + ell(32, 36, 17.5, 19.5) + '" fill="#FFF5F8"/>' + dots);
  })();

  F.guava = svg('<g transform="translate(-6 -3)">' + body("M32 12C38 10 44 14 46 20C52 22 56 30 53 38C52 48 44 56 34 56C28 58 22 56 17 50C11 46 8 38 12 30C12 22 18 16 24 15C26 12 29 12 32 12Z", "#A5D66A", "#7CB342", { inside: dot(24, 28, 1.2, "#7CB342", .6) + dot(38, 24, 1.2, "#7CB342", .6) + dot(30, 44, 1.2, "#7CB342", .6) + dot(42, 40, 1.2, "#7CB342", .6) }) + leaf(31, 14, -30, 1) + hl(20, 36, 2.4, 5, 10) + "</g>" +
    '<circle cx="46" cy="46" r="12.5" fill="#A5D66A" ' + ST + '/><circle cx="46" cy="46" r="9.6" fill="#FFF3E0"/><circle cx="46" cy="46" r="5" fill="#F8BBD0"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { var a = i * Math.PI / 3; return dot((46 + 3 * Math.cos(a)).toFixed(1), (46 + 3 * Math.sin(a)).toFixed(1), 0.9, "#FFF59D"); }).join(""));

  F.waxapple = svg(body("M25 12C19 15 12 27 12 39C12 51 22 57 32 57C42 57 52 51 52 39C52 27 45 15 39 12C36 10.5 28 10.5 25 12Z", "#EC407A", "#C2185B") + '<path d="' + ell(32, 52, 8, 3.6) + '" fill="#AD1457" ' + ST + '/><path d="M27 52H37M32 49.5V54.5" stroke="#F8BBD0" stroke-width="1.4" stroke-linecap="round"/>' + stem("M32 12V7", 3.4) + hl(19, 32, 2.6, 8, 12));

  F.pomelo = svg('<path d="' + circ(32, 14, 7) + '" fill="#D9E36B" ' + ST + "/>" + body(ell(32, 39, 23, 21), "#D9E36B", "#AEB83C", { inside: dot(20, 36, 1.2, "#AEB83C", .8) + dot(30, 28, 1.2, "#AEB83C", .8) + dot(42, 34, 1.2, "#AEB83C", .8) + dot(26, 48, 1.2, "#AEB83C", .8) + dot(40, 46, 1.2, "#AEB83C", .8) }) + leaf(33, 12, -30, 1) + hl(18, 38, 2.6, 6, 15));

  F.papaya = svg('<g transform="rotate(-18 32 34)">' + body("M32 5C44 5 48 20 50 32C52 46 44 59 32 59C20 59 12 46 14 32C16 20 20 5 32 5Z", "#FFB300", "#F57C00") +
    '<path d="M32 5C44 5 48 20 50 32C52 46 44 59 32 59C20 59 12 46 14 32C16 20 20 5 32 5Z" fill="#FF9E40" transform="translate(32 33) scale(.84) translate(-32 -33)"/><path d="' + ell(32, 38, 8.5, 14) + '" fill="#FFD9A8"/>' +
    [[32, 28], [29, 33], [35, 33], [31, 38], [34, 39], [29, 43], [35, 44], [32, 48]].map(function (p) { return dot(p[0], p[1], 1.7, "#3E2723"); }).join("") + "</g>");

  (function () {
    function whole(x, y) { return body(circ(x, y, 11.5), "#E53935", "#B71C1C", { inside: [[-5, -3], [4, -4], [0, 4], [-6, 5], [6, 5], [0, -8]].map(function (p) { return dot(x + p[0], y + p[1], 1.2, "#FF8A80", .8); }).join("") }) + hl(x - 5, y - 5, 1.6, 3, 30); }
    F.lychee = svg(stem("M32 12V5", 3) + leaf(33, 8, -30, 1) +
      '<path d="' + circ(32, 21, 11) + '" fill="#FFF3E0" ' + ST + '/><path d="' + circ(32, 21, 5) + '" fill="#D7CCC8" opacity=".6"/>' + hl(27, 16, 1.8, 3.2, 30) + whole(20, 43) + whole(44, 44));
  })();

  (function () {
    function nut(x, y, peeled) { return peeled ? '<path d="' + circ(x, y, 9.5) + '" fill="#FFF8E1" ' + ST + '/>' + dot(x, y, 3.8, "#5D4037") + hl(x - 4, y - 4, 1.5, 2.6, 30) : body(circ(x, y, 9.5), "#E0B27C", "#B98A52") + hl(x - 4, y - 4, 1.5, 2.6, 30); }
    F.longan = svg(stem("M30 18C30 11 36 7 42 7") + stem("M20 31L30 18M38 30L30 18M29 43L30 18", 2.6) + nut(20, 34, false) + nut(39, 32, false) + nut(30, 46, false) + nut(47, 46, true));
  })();

  F.persimmon = svg(body(ell(32, 41, 23, 17), "#FF8A3D", "#E5531A") +
    '<path d="M32 28C22 24 14 28 15 33C22 35 29 33 32 28Z" fill="#8BC34A" ' + ST + '/><path d="M32 28C42 24 50 28 49 33C42 35 35 33 32 28Z" fill="#8BC34A" ' + ST + '/><path d="M32 28C27 20 33 16 38 18C37 23 35 26 32 28Z" fill="#8BC34A" ' + ST + "/>" + stem("M33 19V13", 3.2) + hl(17, 42, 2.4, 5, 70));

  F.starfruit = svg('<g transform="rotate(-8 32 34)"><path d="' + star(32, 35, 27, 15.5, 5) + '" fill="#FFE74C" ' + ST + '/><path d="' + star(32, 35, 17, 9.5, 5) + '" fill="#FFF59D"/>' + [0, 1, 2, 3, 4].map(function (i) { var a = (-90 + i * 72) * Math.PI / 180; return '<path d="M32 35L' + (32 + 26 * Math.cos(a)).toFixed(1) + " " + (35 + 26 * Math.sin(a)).toFixed(1) + '" stroke="#F9A825" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>'; }).join("") + dot(32, 35, 2.6, "#F9A825") + "</g>");

  (function () {
    var k = "";
    for (var r = 0; r < 6; r++) for (var c = 0; c < 6; c++) { var x = 12 + c * 10 + (r % 2 ? 5 : 0), y = 16 + r * 8.6; k += '<circle cx="' + x + '" cy="' + y.toFixed(1) + '" r="5.2" fill="#C5E86C" stroke="#6B9B2E" stroke-width="1.4"/>'; }
    F.sugarapple = svg(body(circ(32, 37, 21), "#A5D66A", "#7CB342", { inside: k }) + stem("M32 17V10", 3.4) + leaf(33, 12, -30, 1));
  })();

  F.plum = svg(body(circ(32, 38, 20), "#9C4DCC", "#6A2C91") + '<path d="M32 19C28 29 28 43 34 57" fill="none" stroke="#6A2C91" stroke-width="2" stroke-linecap="round"/>' + hl(23, 31, 3, 7, 22) + stem("M32 19C32 14 34 11 37 9") + leaf(35, 13, -15, 1.05));

  // ---------- 食物與飲料（同一套畫法）----------
  function P(d, fill, sw) { return '<path d="' + d + '" fill="' + fill + '" ' + ST + (sw ? "" : "") + "/>"; }
  function L(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function steam(x) { return L("M" + x + " 14Q" + (x - 4) + " 9 " + x + " 5Q" + (x + 4) + " 1 " + x + " -3", "#B0BEC5", 2.6); }

  F.milk = svg(body("M17 14H47L43.5 55Q43 58 40 58H24Q21 58 20.5 55Z", "#E3F2FD", "#B7D4E8", { inside: '<rect x="0" y="25" width="64" height="40" fill="#fff"/><rect x="38" y="25" width="10" height="40" fill="#E1ECF2"/>' }) + hl(24, 38, 2.4, 8, 0) + L("M17 25H47", K, 2.4));
  F.water = svg(body("M32 6C32 6 15 26 15 40A17 17 0 0 0 49 40C49 26 32 6 32 6Z", "#64B5F6", "#1E88E5") + hl(24, 38, 3.2, 7, 20));
  F.juice = svg(body("M17 22H43V57Q43 58 41 58H19Q17 58 17 57Z", "#FFB74D", "#F57C00") + P("M17 22L23 15H49L43 22Z", "#FFE0B2") + P("M43 22L49 15V50L43 57Z", "#F57C00") + L("M33 15L38 4H46", K, 2.4) + '<circle cx="30" cy="40" r="8" fill="#FFF3E0" ' + ST + "/>" + L("M30 32V48M22 40H38", "#FFB74D", 1.6));
  F.tea = svg(L("M30 22Q26 16 30 11", "#B0BEC5", 2.6) + L("M38 22Q34 16 38 11", "#B0BEC5", 2.6) + L("M46 30Q58 29 56 39Q54 47 44 46", K, 6) + L("M46 30Q58 29 56 39Q54 47 44 46", "#fff", 2.6) + body("M10 28H46V38Q46 54 28 54Q10 54 10 38Z", "#fff", "#D3DDE3") + '<ellipse cx="28" cy="28" rx="18" ry="4.5" fill="#9CCC65" ' + ST + "/>" + P("M12 56H44", "none"));
  F.bread = svg(body("M14 22Q10 12 22 12Q27 7 32 11Q37 7 42 12Q54 12 50 22Q54 26 50 32V56H14V32Q10 26 14 22Z", "#F2B35E", "#D98E2C", { inside: '<path d="M20 22Q20 16 28 17Q32 15 36 17Q44 16 44 22V50H20Z" fill="#FFE3A6"/>' }) + hl(25, 26, 2, 5, 0));
  F.rice = svg(body("M12 34Q14 14 32 14Q50 14 52 34Z", "#fff", "#D3DDE3", { inside: '<circle cx="24" cy="26" r="1.6" fill="#D3DDE3"/><circle cx="34" cy="22" r="1.6" fill="#D3DDE3"/><circle cx="40" cy="29" r="1.6" fill="#D3DDE3"/><circle cx="29" cy="30" r="1.6" fill="#D3DDE3"/>' }) + body("M8 34H56Q56 56 32 56Q8 56 8 34Z", "#64B5F6", "#1E88E5") + hl(16, 42, 2, 5, -20));
  F.noodles = svg(L("M38 20L54 2", K, 5) + L("M44 22L58 6", K, 5) + L("M38 20L54 2", "#C98B4B", 2.6) + L("M44 22L58 6", "#C98B4B", 2.6) + L("M10 28Q16 18 22 28Q28 18 34 28Q40 18 46 28", K, 9) + L("M10 28Q16 18 22 28Q28 18 34 28Q40 18 46 28", "#FFE082", 5) + body("M8 32H56Q56 56 32 56Q8 56 8 32Z", "#FF8A65", "#D84315") + L("M8 32H56", K, 2.4) + hl(16, 44, 2, 5, -20));
  F.egg = svg(body("M32 8C21 8 13 28 13 38C13 50 21 57 32 57C43 57 51 50 51 38C51 28 43 8 32 8Z", "#FFF8E1", "#FFD9A0") + hl(23, 30, 3, 7, 20));
  F.cheese = svg(body("M6 42L50 18Q57 16 57 24V46Q57 52 51 52H11Q6 52 6 46Z", "#FFD54F", "#F9A825") + L("M6 42H57", K, 2.2) + '<ellipse cx="22" cy="47" rx="4" ry="2.4" fill="#F9A825" ' + ST.replace("2.4", "1.6") + '/><ellipse cx="42" cy="46" rx="3" ry="2" fill="#F9A825" ' + ST.replace("2.4", "1.6") + '/><circle cx="40" cy="28" r="3.2" fill="#F9A825" ' + ST.replace("2.4", "1.6") + "/>");
  F.cookie = svg(body(circ(32, 33, 23), "#E0AE6D", "#B7803F", { inside: '<ellipse cx="24" cy="25" rx="3.6" ry="2.8" fill="#5D4037"/><ellipse cx="38" cy="23" rx="3.2" ry="2.6" fill="#5D4037"/><ellipse cx="43" cy="37" rx="3.6" ry="2.8" fill="#5D4037"/><ellipse cx="28" cy="41" rx="3.4" ry="2.6" fill="#5D4037"/><ellipse cx="18" cy="38" rx="2.4" ry="2" fill="#5D4037"/>' }) + hl(20, 20, 2.6, 5, 40));
  F.cake = svg(body("M10 28H54V51Q54 56 49 56H15Q10 56 10 51Z", "#FFE0B2", "#FFCC80", { inside: '<rect x="0" y="38" width="64" height="4" fill="#F48FB1"/>' }) + P("M8 29Q8 20 19 22Q25 15 32 22Q39 15 45 22Q56 20 56 29Q50 34 45 29Q39 35 32 29Q25 35 19 29Q14 34 8 29Z", "#F8BBD0") + stem("M32 13Q33 8 37 6", 2.4) + body(circ(32, 17, 5), "#EF5350", "#C62828"));
  F.candy = svg(P("M20 32L5 20V44Z", "#FFC1D6") + P("M44 32L59 20V44Z", "#FFC1D6") + body(ell(32, 32, 15, 12), "#F06292", "#C2185B", { inside: '<path d="M18 40L34 22M26 44L42 24" stroke="#fff" stroke-width="3.4" opacity=".8"/>' }) + hl(25, 27, 2.4, 4, 40));
  F.icecream = svg(P("M18 32L32 59L46 32Z", "#F2B35E") + L("M24 38L38 40M21 44L42 46M27 32L38 52M37 32L27 52", "#D98E2C", 1.8) + body("M14 34Q10 18 22 14Q32 5 42 14Q54 18 50 34Q41 39 32 34Q23 39 14 34Z", "#F8BBD0", "#EC8FB0") + body(circ(32, 8, 4.4), "#EF5350", "#C62828") + hl(23, 22, 2.4, 5, 30));
  F.soup = svg(steam(24) + steam(40) + body("M8 34H56Q56 56 32 56Q8 56 8 34Z", "#FFF3E0", "#EBCFA0") + '<ellipse cx="32" cy="34" rx="24" ry="6" fill="#FF8A65" ' + ST + '/><circle cx="24" cy="34" r="2" fill="#FFE082"/><circle cx="35" cy="35" r="2" fill="#AED581"/><circle cx="43" cy="33" r="1.6" fill="#FFE082"/>');
  F.dumpling = svg(body("M6 42Q8 20 32 20Q56 20 58 42Q52 52 32 52Q12 52 6 42Z", "#FFF3E0", "#EBCFA0") + L("M17 25L19 33M25 22L26 31M33 21V30M41 22L40 31M48 25L46 33", K, 2.2) + hl(14, 40, 2, 4, 70));
  F.sandwich = svg(body("M8 28Q8 10 32 10Q56 10 56 28Z", "#F2B35E", "#D98E2C") + P("M6 29Q12 36 19 29Q26 36 32 29Q38 36 45 29Q52 36 58 29V35H6Z", "#8BC34A") + P("M8 35H56V41H8Z", "#EF5350") + P("M8 41H56V47H8Z", "#FFD54F") + body("M8 47H56V52Q56 57 51 57H13Q8 57 8 52Z", "#F2B35E", "#D98E2C") + hl(20, 18, 3, 2, -10));
  F.pizza = svg(body("M6 15Q32 4 58 15L32 59Z", "#FFD54F", "#F9A825", { inside: '<circle cx="24" cy="26" r="5" fill="#E53935"/><circle cx="38" cy="30" r="5" fill="#E53935"/><circle cx="31" cy="42" r="4.4" fill="#E53935"/><circle cx="31" cy="25" r="1.8" fill="#43A047"/><circle cx="26" cy="35" r="1.8" fill="#43A047"/>' }) + P("M6 15Q32 4 58 15L55 21Q32 11 9 21Z", "#E8A957"));
  F.fries = svg(P("M16 10L22 38H14Z", "#FFD54F") + P("M26 6H33V38H25Z", "#FFD54F") + P("M38 8H45L43 38H36Z", "#FFD54F") + P("M48 14L54 38H46Z", "#FFD54F") + body("M10 32H54L49 58H15Z", "#EF5350", "#C62828") + '<path d="M32 32L33 58" stroke="#fff" stroke-width="0"/>' + L("M24 41Q32 46 40 41", "#FFE082", 3));
  F.popcorn = svg(body(circ(20, 22, 9), "#FFF8DC", "#F0DFA8") + body(circ(34, 15, 10), "#FFF8DC", "#F0DFA8") + body(circ(46, 24, 9), "#FFF8DC", "#F0DFA8") + body(circ(32, 27, 9), "#FFF8DC", "#F0DFA8") + body("M12 30H52L47 58H17Z", "#fff", "#D3DDE3", { inside: '<path d="M20 30L22 60H27L26 30ZM32 30V60H38V30ZM44 30L42 60H47L50 30Z" fill="#EF5350"/>' }));
  F.honey = svg(body("M16 22H48V50Q48 57 41 57H23Q16 57 16 50Z", "#FFC107", "#F57F17") + P("M13 13H51V22H13Z", "#A1887F") + P("M16 22H48Q48 29 44 29Q42 33 40 29Q34 29 30 29Q27 35 24 29Q16 29 16 22Z", "#FFE082") + '<rect x="22" y="36" width="20" height="12" rx="3" fill="#FFF8E1" ' + ST.replace("2.4", "1.8") + "/>");
  F.carrot = svg(P("M32 22Q22 12 20 4Q28 6 32 16Q32 4 38 0Q38 12 34 22Z", "#8BC34A") + body("M20 22Q32 15 44 22Q41 42 32 60Q23 42 20 22Z", "#FF9800", "#E65100") + L("M25 32H31M33 42H39M27 46H32", "#E65100", 2) + hl(25, 29, 2, 5, 0));
  F.broccoli = svg(P("M25 38H39L41 58H23Z", "#AED581") + body(circ(20, 32, 11), "#4CAF50", "#2E7D32") + body(circ(44, 32, 11), "#4CAF50", "#2E7D32") + body(circ(32, 22, 13), "#4CAF50", "#2E7D32") + hl(27, 17, 3, 2, -20) + L("M32 38V34", "#2E7D32", 2));
  F.corn = svg(body("M32 4Q46 10 46 34Q46 52 32 58Q18 52 18 34Q18 10 32 4Z", "#FFD54F", "#F9A825", { inside: '<path d="M26 12V54M32 8V56M38 12V54M18 24H46M18 34H46M18 44H46" stroke="#F9A825" stroke-width="1.6" fill="none"/>' }) + P("M32 58Q10 56 8 28Q22 34 32 58Z", "#8BC34A") + P("M32 58Q54 56 56 28Q42 34 32 58Z", "#7CB342"));
  F.potato = svg(body("M10 36Q8 18 28 14Q50 10 56 30Q60 50 40 54Q14 58 10 36Z", "#D2A679", "#A9794A") + dot(24, 28, 1.8, "#8D6238") + dot(40, 38, 1.8, "#8D6238") + dot(28, 44, 1.6, "#8D6238") + hl(20, 24, 2.6, 5, 40));
  F.sweetpotato = svg(body("M6 40Q8 24 26 26Q44 18 56 28Q60 40 48 46Q30 56 14 49Q6 46 6 40Z", "#B5527A", "#8E3358") + L("M14 34Q22 34 26 38M34 30Q42 30 46 34M22 46Q30 48 36 44", "#8E3358", 1.8) + hl(20, 32, 2.4, 5, 70));
  F.cucumber = svg(body("M6 46Q4 36 12 31L40 10Q52 6 57 15Q60 22 50 29L22 52Q10 57 6 46Z", "#66BB6A", "#388E3C") + dot(20, 40, 1.6, "#C5E1A5") + dot(30, 32, 1.6, "#C5E1A5") + dot(40, 24, 1.6, "#C5E1A5") + dot(26, 44, 1.6, "#C5E1A5") + dot(48, 20, 1.6, "#C5E1A5") + L("M17 36L44 14", "#fff", 2.4).replace('stroke-width="2.4"', 'stroke-width="2.4" opacity=".55"'));
  F.mushroom = svg(body("M24 36H40V52Q40 57 35 57H29Q24 57 24 52Z", "#FFF3E0", "#E0CDB0") + body("M6 36Q6 10 32 10Q58 10 58 36Q58 40 54 40H10Q6 40 6 36Z", "#E57373", "#C62828", { inside: '<circle cx="20" cy="26" r="4" fill="#fff"/><circle cx="36" cy="20" r="4.4" fill="#fff"/><circle cx="46" cy="31" r="3.4" fill="#fff"/>' }));
  F.chicken = svg('<g transform="rotate(38 32 32) translate(0 -2)">' + L("M32 42V56", K, 11) + L("M32 42V56", "#FFF3E0", 6.4) + body(circ(28, 58, 4.6), "#FFF3E0", "#E0CDB0") + body(circ(36, 58, 4.6), "#FFF3E0", "#E0CDB0") + body("M32 4C50 4 52 22 48 31C45 37 39 40 37 44H27C25 40 19 37 16 31C12 22 14 4 32 4Z", "#E39A4B", "#B5651D") + L("M25 14Q32 10 39 14", "#F6C98A", 2.6) + L("M22 26Q26 30 31 29M36 24Q41 26 43 31", "#B5651D", 2) + hl(22, 20, 2.4, 5.5, 10) + "</g>");

  // ---------- 動物（同一套畫法）----------
  function ey(x, y, r) { r = r || 2.8; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/><circle cx="' + (x - r * .3) + '" cy="' + (y - r * .35) + '" r="' + (r * .35) + '" fill="#fff"/>'; }
  function cheeks(y, a, b) { return '<ellipse cx="' + a + '" cy="' + y + '" rx="3.2" ry="2" fill="#FF8A80" opacity=".55"/><ellipse cx="' + b + '" cy="' + y + '" rx="3.2" ry="2" fill="#FF8A80" opacity=".55"/>'; }
  function nose(x, y, c) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="3.4" ry="2.4" fill="' + (c || K) + '"/>'; }
  function smile(x, y) { return L("M" + (x - 4) + " " + y + "Q" + x + " " + (y + 4) + " " + (x + 4) + " " + y, K, 2); }
  function cE(cx, cy, r, base, shade) { return body(circ(cx, cy, r), base, shade); }

  F.dog = svg(body("M10 22Q2 34 10 50Q20 48 20 30Z", "#8D5A2B", "#6B3F1A") + body("M54 22Q62 34 54 50Q44 48 44 30Z", "#8D5A2B", "#6B3F1A") + body(ell(32, 34, 20, 20), "#E0B07A", "#B07C45") + body(ell(32, 43, 11, 9), "#FFF3E0", "#EBCFA0") + nose(32, 38, K) + L("M32 40V44", K, 2) + smile(32, 44).replace("M28", "M28") + ey(23, 29) + ey(41, 29) + cheeks(40, 17, 47));
  F.cat = svg(body("M10 30L12 6L28 16Z", "#FFB366", "#E07B22") + body("M54 30L52 6L36 16Z", "#FFB366", "#E07B22") + P("M14 24L15 12L22 17Z", "#F8BBD0") + P("M50 24L49 12L42 17Z", "#F8BBD0") + body(ell(32, 36, 22, 18), "#FFB366", "#E07B22") + L("M32 18V24M24 19L26 24M40 19L38 24", "#E07B22", 2.4) + ey(22, 33) + ey(42, 33) + nose(32, 39, "#F06292") + L("M32 41Q28 46 24 43M32 41Q36 46 40 43", K, 2) + L("M6 36L16 38M6 44L16 42M58 36L48 38M58 44L48 42", K, 1.6) + cheeks(41, 16, 48));
  F.bird = svg(P("M14 30L2 22L6 38Z", "#1E88E5") + body(ell(30, 34, 21, 19), "#64B5F6", "#1E88E5", { inside: '<ellipse cx="36" cy="44" rx="14" ry="10" fill="#E3F2FD"/>' }) + P("M50 30L62 34L50 40Z", "#FFB300") + P("M14 36Q22 28 30 38Q22 46 14 36Z", "#1E88E5") + ey(41, 28) + L("M28 54V59M36 54V59M24 59H32M32 59H40", "#FFB300", 2.4) + hl(22, 24, 3, 5, 30));
  F.fish = svg(P("M44 34L60 20V48Z", "#FF7043") + body(ell(28, 34, 22, 15), "#FF8A65", "#D84315", { inside: '<ellipse cx="28" cy="42" rx="18" ry="6" fill="#FFCCBC"/>' }) + P("M22 21Q28 12 36 20Z", "#FF7043") + P("M26 34Q34 38 28 44Z", "#FF7043") + L("M18 24Q14 34 18 44", "#D84315", 2.4) + ey(14, 30, 2.6) + L("M8 36Q10 38 12 37", K, 1.8) + hl(24, 27, 4, 1.6, -8));
  F.duck = svg(P("M6 32L2 24L14 30Z", "#FFD54F") + body(ell(30, 42, 24, 15), "#FFD54F", "#F9A825") + body(circ(40, 22, 14), "#FFD54F", "#F9A825") + P("M50 22Q62 21 60 28Q54 30 49 28Z", "#FF9800") + P("M14 40Q24 32 32 42Q24 50 14 40Z", "#F9A825") + ey(41, 19, 2.4) + cheeks(26, 38, 38).replace('cx="38"', 'cx="36"') + L("M26 57V61M36 57V61", "#FF9800", 2.4));
  F.cow = svg(P("M16 14Q10 6 6 10Q8 18 18 20Z", "#FFF3E0") + P("M48 14Q54 6 58 10Q56 18 46 20Z", "#FFF3E0") + body("M2 28Q4 20 14 26L18 40Q8 42 2 28Z", "#fff", "#D3DDE3") + body("M62 28Q60 20 50 26L46 40Q56 42 62 28Z", "#fff", "#D3DDE3") + body(ell(32, 32, 19, 20), "#fff", "#D3DDE3", { inside: '<circle cx="18" cy="22" r="7" fill="#546E7A"/><circle cx="46" cy="40" r="5" fill="#546E7A"/>' }) + body(ell(32, 46, 14, 10), "#F8BBD0", "#EC8FB0") + '<ellipse cx="27" cy="46" rx="1.8" ry="2.6" fill="' + K + '"/><ellipse cx="37" cy="46" rx="1.8" ry="2.6" fill="' + K + '"/>' + ey(23, 29) + ey(41, 29));
  F.pig = svg(body("M12 24L10 6L26 14Z", "#F8A5B8", "#E57A94") + body("M52 24L54 6L38 14Z", "#F8A5B8", "#E57A94") + body(ell(32, 34, 22, 20), "#F8BBD0", "#EC8FB0") + body(ell(32, 41, 11, 8), "#F48FB1", "#D66A8E") + '<ellipse cx="28" cy="41" rx="1.8" ry="2.8" fill="' + K + '"/><ellipse cx="36" cy="41" rx="1.8" ry="2.8" fill="' + K + '"/>' + ey(21, 30) + ey(43, 30) + cheeks(36, 14, 50));
  F.sheep = svg(body(circ(16, 30, 11), "#fff", "#D3DDE3") + body(circ(48, 30, 11), "#fff", "#D3DDE3") + body(circ(22, 16, 11), "#fff", "#D3DDE3") + body(circ(42, 16, 11), "#fff", "#D3DDE3") + body(circ(32, 12, 11), "#fff", "#D3DDE3") + body(ell(32, 38, 15, 18), "#78909C", "#546E7A") + body(ell(15, 38, 5, 3), "#78909C", "#546E7A") + body(ell(49, 38, 5, 3), "#78909C", "#546E7A") + ey(26, 36, 2.4) + ey(38, 36, 2.4) + nose(32, 44, "#37474F") + smile(32, 48));
  F.horse = svg(P("M20 22L18 6L30 14Z", "#B07A4A") + P("M44 22L46 6L34 14Z", "#B07A4A") + body("M18 12Q8 20 12 38Q16 44 20 36Q20 24 24 16Z", "#5D4037", "#3E2A22") + body(ell(32, 32, 15, 22), "#C98B4B", "#9A6532") + body(ell(32, 50, 13, 9), "#E8C9A0", "#C9A070") + '<ellipse cx="27" cy="51" rx="1.8" ry="2.4" fill="' + K + '"/><ellipse cx="37" cy="51" rx="1.8" ry="2.4" fill="' + K + '"/>' + P("M32 6L28 20L34 24Z", "#fff").replace('fill="#fff"', 'fill="#FFF3E0"') + ey(24, 30) + ey(40, 30));
  F.rabbit = svg(body(ell(22, 16, 7, 16), "#fff", "#D3DDE3") + body(ell(42, 16, 7, 16), "#fff", "#D3DDE3") + '<ellipse cx="22" cy="17" rx="3" ry="11" fill="#F8BBD0"/><ellipse cx="42" cy="17" rx="3" ry="11" fill="#F8BBD0"/>' + body(ell(32, 42, 20, 16), "#fff", "#D3DDE3") + ey(23, 40) + ey(41, 40) + nose(32, 45, "#F06292") + L("M32 47V50M27 51Q32 54 37 51", K, 1.8) + cheeks(47, 18, 46));
  F.elephant = svg(body(circ(12, 32, 12), "#B0BEC5", "#78909C") + body(circ(52, 32, 12), "#B0BEC5", "#78909C") + body(ell(32, 30, 18, 19), "#CFD8DC", "#90A4AE") + body("M26 40Q26 58 34 58Q40 58 38 52Q34 54 34 46L38 40Z", "#CFD8DC", "#90A4AE") + L("M28 48H33", "#90A4AE", 2) + ey(24, 28) + ey(40, 28) + cheeks(36, 17, 47));
  F.monkey = svg(body(circ(8, 32, 8), "#A9744F", "#7B4F2F") + body(circ(56, 32, 8), "#A9744F", "#7B4F2F") + '<circle cx="8" cy="32" r="4" fill="#FFCCBC"/><circle cx="56" cy="32" r="4" fill="#FFCCBC"/>' + body(ell(32, 32, 19, 20), "#A9744F", "#7B4F2F") + body("M32 24Q20 18 16 30Q16 38 22 44Q32 48 42 44Q48 38 48 30Q44 18 32 24Z", "#FFE0B2", "#EBC18A") + ey(25, 32, 2.4) + ey(39, 32, 2.4) + nose(32, 38, "#7B4F2F") + smile(32, 42));
  F.lion = svg(body(circ(32, 33, 28), "#E8913A", "#B8641A") + body(circ(14, 14, 7), "#F6B26B", "#D98E2C") + body(circ(50, 14, 7), "#F6B26B", "#D98E2C") + body(ell(32, 36, 17, 17), "#FFD28A", "#EBAA50") + body(ell(32, 44, 9, 7), "#FFF3E0", "#EBCFA0") + nose(32, 40, "#8D5A2B") + smile(32, 45) + ey(24, 32) + ey(40, 32) + cheeks(40, 18, 46));
  F.tiger = svg(body(circ(12, 16, 8), "#FFA040", "#E07B22") + body(circ(52, 16, 8), "#FFA040", "#E07B22") + body(ell(32, 34, 23, 20), "#FFA040", "#E07B22") + L("M32 16V24M24 18L26 25M40 18L38 25M10 32L17 33M10 40L17 38M54 32L47 33M54 40L47 38", K, 2.6) + body(ell(32, 44, 13, 9), "#fff", "#D3DDE3") + nose(32, 40, "#F06292") + smile(32, 45) + ey(22, 32) + ey(42, 32));
  F.bear = svg(body(circ(13, 14, 9), "#A9744F", "#7B4F2F") + body(circ(51, 14, 9), "#A9744F", "#7B4F2F") + '<circle cx="13" cy="14" r="4" fill="#FFCCBC"/><circle cx="51" cy="14" r="4" fill="#FFCCBC"/>' + body(ell(32, 35, 23, 21), "#A9744F", "#7B4F2F") + body(ell(32, 44, 11, 9), "#FFE0B2", "#EBC18A") + nose(32, 40, K) + smile(32, 46) + ey(22, 31) + ey(42, 31) + cheeks(40, 15, 49));
  F.panda = svg(body(circ(13, 14, 9), "#37474F", "#263238") + body(circ(51, 14, 9), "#37474F", "#263238") + body(ell(32, 35, 23, 21), "#fff", "#D3DDE3") + '<ellipse cx="22" cy="32" rx="6" ry="8" transform="rotate(20 22 32)" fill="#37474F"/><ellipse cx="42" cy="32" rx="6" ry="8" transform="rotate(-20 42 32)" fill="#37474F"/>' + '<circle cx="22" cy="32" r="2.4" fill="#fff"/><circle cx="42" cy="32" r="2.4" fill="#fff"/>' + nose(32, 42, "#37474F") + smile(32, 46) + cheeks(44, 16, 48));
  F.frog = svg(body(circ(18, 16, 10), "#8BC34A", "#558B2F") + body(circ(46, 16, 10), "#8BC34A", "#558B2F") + '<circle cx="18" cy="15" r="5.4" fill="#fff" ' + ST.replace("2.4", "1.8") + '/><circle cx="46" cy="15" r="5.4" fill="#fff" ' + ST.replace("2.4", "1.8") + "/>" + ey(19, 16, 2.6) + ey(45, 16, 2.6) + body(ell(32, 40, 26, 18), "#8BC34A", "#558B2F") + L("M14 42Q32 56 50 42", K, 2.4) + dot(29, 33, 1.2, K) + dot(35, 33, 1.2, K) + cheeks(42, 12, 52));
  F.butterfly = svg(body("M30 30Q10 2 6 20Q4 34 30 34Z", "#BA68C8", "#8E24AA") + body("M34 30Q54 2 58 20Q60 34 34 34Z", "#BA68C8", "#8E24AA") + body("M30 34Q12 36 14 50Q22 58 30 40Z", "#F48FB1", "#D81B60") + body("M34 34Q52 36 50 50Q42 58 34 40Z", "#F48FB1", "#D81B60") + '<circle cx="16" cy="20" r="4" fill="#fff" opacity=".8"/><circle cx="48" cy="20" r="4" fill="#fff" opacity=".8"/>' + body(ell(32, 36, 3.6, 15), "#5D4037", "#3E2A22") + L("M31 22Q28 12 24 8M33 22Q36 12 40 8", K, 2) + dot(24, 8, 1.8, K) + dot(40, 8, 1.8, K));
  F.bee = svg(body(ell(20, 18, 8, 12), "#E1F5FE", "#B3E5FC") .replace("<g", "<g") + body(ell(40, 18, 8, 12), "#E1F5FE", "#B3E5FC") + body(ell(32, 40, 22, 16), "#FFD54F", "#F9A825", { inside: '<rect x="22" y="0" width="6" height="70" fill="#37474F"/><rect x="36" y="0" width="6" height="70" fill="#37474F"/>' }) + P("M54 40L62 40L54 44Z", "#37474F") + ey(15, 38, 2.6) + L("M12 28Q8 20 12 16M18 26Q16 18 20 14", K, 2) + cheeks(44, 13, 13).replace(/<ellipse[^>]*cx="13"[^>]*\/>/, "") + smile(15, 45).replace(/4/g, "3"));
  F.ant = svg(L("M10 40L4 54M20 42L16 58M30 44L32 58M40 42L46 56", K, 2.6) + body(circ(14, 34, 9), "#C0392B", "#8E2A20") + body(ell(30, 36, 8, 7), "#C0392B", "#8E2A20") + body(ell(48, 38, 12, 10), "#C0392B", "#8E2A20") + body(circ(14, 20, 8), "#C0392B", "#8E2A20").replace(/translate\(-3.5 -3\)/, "translate(-3.5 -3)") + ey(11, 19, 2.2) + L("M10 14Q6 6 2 4M18 14Q22 6 26 4", K, 2.2) + L("M12 24Q14 27 17 24", K, 1.8));
  F.turtle = svg(body(ell(14, 38, 8, 7), "#8BC34A", "#558B2F") + body(circ(54, 30, 9), "#8BC34A", "#558B2F") + body(ell(24, 54, 6, 5), "#8BC34A", "#558B2F") + body(ell(44, 54, 6, 5), "#8BC34A", "#558B2F") + body("M10 48Q10 14 32 14Q54 14 54 48Z", "#43A047", "#2E7D32", { inside: '<path d="M32 14V48M20 22L24 48M44 22L40 48M12 34H52" stroke="#2E7D32" stroke-width="2.4" fill="none"/>' }) + ey(56, 28, 2.2) + hl(22, 24, 3, 2, -30));
  F.hen = svg(P("M12 28L2 18L8 36Z", "#EF9A9A") + body(ell(30, 36, 22, 20), "#fff", "#D3DDE3") + P("M18 38Q26 28 34 40Q26 50 18 38Z", "#ECEFF1") + body(circ(36, 14, 4), "#E53935", "#B71C1C") + body(circ(42, 13, 4), "#E53935", "#B71C1C") + P("M48 28L60 32L48 36Z", "#FFB300") + P("M47 36Q50 46 45 44Z", "#E53935") + ey(42, 26, 2.4) + L("M26 56V61M36 56V61", "#FFB300", 2.4) + cheeks(33, 38, 38).replace(/<ellipse[^>]*cx="38"[^>]*\/>/g, ""));
  F.giraffe = svg(body("M18 18L14 8L24 14Z", "#FFD54F", "#F9A825") + body("M46 18L50 8L40 14Z", "#FFD54F", "#F9A825") + dot(14, 8, 3, "#8D6238") + dot(50, 8, 3, "#8D6238") + body(ell(10, 28, 6, 4), "#FFD54F", "#F9A825") + body(ell(54, 28, 6, 4), "#FFD54F", "#F9A825") + body(ell(32, 30, 15, 19), "#FFD54F", "#F9A825", { inside: '<circle cx="22" cy="20" r="3.4" fill="#C98B4B"/><circle cx="42" cy="18" r="3" fill="#C98B4B"/><circle cx="46" cy="30" r="3" fill="#C98B4B"/><circle cx="19" cy="33" r="2.6" fill="#C98B4B"/>' }) + body(ell(32, 48, 13, 9), "#FFF3E0", "#EBCFA0") + '<ellipse cx="27" cy="48" rx="1.8" ry="2.4" fill="' + K + '"/><ellipse cx="37" cy="48" rx="1.8" ry="2.4" fill="' + K + '"/>' + ey(25, 30) + ey(39, 30));
  F.dinosaur = svg(P("M4 50Q16 52 22 44L24 52Q12 58 4 50Z", "#66BB6A") + body("M16 44Q10 24 28 20Q42 20 46 40Q46 54 32 54Q16 54 16 44Z", "#66BB6A", "#388E3C") + body("M40 36Q40 20 46 12Q56 6 60 16Q60 24 52 24Q50 34 48 44Z", "#66BB6A", "#388E3C") + '<path d="M22 22L26 12L30 20L36 10L40 20" fill="#FFB74D" ' + ST + "/>" + body(ell(26, 56, 6, 4), "#66BB6A", "#388E3C") + body(ell(40, 56, 6, 4), "#66BB6A", "#388E3C") + ey(53, 14, 2.4) + L("M56 19Q58 20 59 18", K, 1.6) + dot(26, 36, 2.6, "#A5D6A7") + dot(34, 44, 2.6, "#A5D6A7") + dot(22, 46, 2, "#A5D6A7"));
  F.snail = svg(P("M4 56Q6 46 16 48L54 48Q60 48 58 56Z", "#C5E1A5") + L("M52 48Q54 38 52 30M58 48Q60 40 60 34", K, 2.6) + dot(52, 29, 2.6, K) + dot(60, 33, 2.6, K) + body(circ(28, 32, 20), "#FFB74D", "#E65100") + L("M28 32m0 0a3 3 0 1 1 4 3a8 8 0 1 1 -8 -10a13 13 0 1 1 14 17", "#E65100", 2.4) + ey(54, 52, 2) + hl(18, 22, 2.4, 4.5, 40));
  F.whale = svg(L("M30 14Q26 6 20 4M34 14Q38 6 44 4", "#90CAF9", 3) + P("M52 38Q60 28 62 22Q62 34 58 44Z", "#1E88E5") + body("M4 40Q4 18 30 16Q54 16 56 38Q54 54 30 54Q8 54 4 40Z", "#64B5F6", "#1E88E5", { inside: '<path d="M0 44Q30 58 64 40V70H0Z" fill="#E3F2FD"/>' }) + ey(16, 34, 2.6) + L("M8 42Q14 46 20 43", K, 2) + cheeks(40, 22, 22).replace(/<ellipse[^>]*cx="22"[^>]*\/>/g, "") + hl(30, 24, 4, 1.6, -8));

  // ---------- 玩具、家中用品、衣物（同一套畫法）----------
  function R(x, y, w, h, r, fill) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + fill + '" ' + ST + "/>"; }
  function rb(x, y, w, h, r, base, shade, o) { var d = "M" + (x + r) + " " + y + "H" + (x + w - r) + "Q" + (x + w) + " " + y + " " + (x + w) + " " + (y + r) + "V" + (y + h - r) + "Q" + (x + w) + " " + (y + h) + " " + (x + w - r) + " " + (y + h) + "H" + (x + r) + "Q" + x + " " + (y + h) + " " + x + " " + (y + h - r) + "V" + (y + r) + "Q" + x + " " + y + " " + (x + r) + " " + y + "Z"; return body(d, base, shade, o); }
  function G(t, inner) { return '<g transform="' + t + '">' + inner + "</g>"; }
  function wheel(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#455A64" ' + ST + '/><circle cx="' + x + '" cy="' + y + '" r="' + (r * .4) + '" fill="#CFD8DC"/>'; }

  // 玩具
  (function () {
    function pent(cx, cy, r, rot) { var pts = []; for (var i = 0; i < 5; i++) { var a = (rot + i * 72 - 90) * Math.PI / 180; pts.push((cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1)); } return "M" + pts.join("L") + "Z"; }
    var ins = "", ln = "", c = 32, cy = 33;
    for (var i = 0; i < 5; i++) {
      var ang = (i * 72 - 90) * Math.PI / 180, ux = Math.cos(ang), uy = Math.sin(ang);
      var px = c + 24 * ux, py = cy + 24 * uy;
      ins += '<path d="' + pent(px, py, 9, i * 72 + 36) + '" fill="' + K + '"/>';
      ln += "M" + (c + 8 * ux).toFixed(1) + " " + (cy + 8 * uy).toFixed(1) + "L" + (c + 15.5 * ux).toFixed(1) + " " + (cy + 15.5 * uy).toFixed(1);
      var a2 = ang + 36 * Math.PI / 180;
      ln += "M" + (px + 9 * Math.cos(a2 + Math.PI)).toFixed(1) + " " + (py + 9 * Math.sin(a2 + Math.PI)).toFixed(1);
    }
    ins += '<path d="' + pent(c, cy, 8.5, 0) + '" fill="' + K + '"/>' + '<path d="' + ln.replace(/M[\d.\- ]+$/, "") + '" stroke="' + K + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    F.ball = svg(body(circ(c, cy, 23), "#fff", "#D3DDE3", { inside: ins }) + hl(21, 19, 3, 5, 40));
  })();
  F.car = svg(body("M4 42Q4 34 12 33L18 21Q20 17 26 17H40Q46 17 48 21L54 33Q60 34 60 42V46H4Z", "#EF5350", "#C62828") + P("M20 31L24 22H31V31Z", "#B3E5FC") + P("M35 31V22H42L47 31Z", "#B3E5FC") + wheel(18, 47, 7) + wheel(46, 47, 7) + dot(57, 40, 2, "#FFD54F"));
  F.truck = svg(body("M3 14H38V46H3Z", "#64B5F6", "#1E88E5") + body("M38 24H49L58 35V46H38Z", "#EF5350", "#C62828") + P("M42 28H48L53 35H42Z", "#B3E5FC") + wheel(14, 48, 7) + wheel(46, 48, 7));
  F.train = svg(L("M16 14Q12 8 16 3M24 12Q20 6 24 1", "#B0BEC5", 2.6) + body("M6 28H40V48H6Z", "#EF5350", "#C62828") + R(14, 16, 8, 12, 2, "#455A64") + body("M38 16H56V48H38Z", "#64B5F6", "#1E88E5") + R(42, 20, 10, 10, 2, "#E3F2FD") + P("M34 52H60", "none") + wheel(14, 50, 6) + wheel(30, 50, 6) + wheel(48, 50, 6) + P("M4 46L8 52H2Z", "#FFD54F"));
  F.airplane = svg(G("rotate(40 32 32)", P("M26 26L5 38V44L26 38Z", "#EF5350") + P("M38 26L59 38V44L38 38Z", "#EF5350") + P("M27 50L18 58V60L30 56Z", "#EF5350") + P("M37 50L46 58V60L34 56Z", "#EF5350") + body("M32 2Q40 8 40 24V50L34 58H30L24 50V24Q24 8 32 2Z", "#fff", "#D3DDE3") + '<circle cx="32" cy="16" r="3.4" fill="#4FC3F7" ' + ST.replace("2.4", "1.8") + "/>"));
  F.bus = svg(body("M4 18Q4 12 10 12H54Q60 12 60 18V46H4Z", "#FFD54F", "#F9A825") + R(8, 18, 10, 11, 2, "#B3E5FC") + R(21, 18, 10, 11, 2, "#B3E5FC") + R(34, 18, 10, 11, 2, "#B3E5FC") + R(47, 18, 9, 17, 2, "#B3E5FC") + L("M4 36H60", "#F9A825", 2.4) + wheel(18, 47, 7) + wheel(46, 47, 7));
  F.bike = svg('<circle cx="14" cy="42" r="11" fill="none" stroke="' + K + '" stroke-width="6"/><circle cx="14" cy="42" r="11" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="50" cy="42" r="11" fill="none" stroke="' + K + '" stroke-width="6"/><circle cx="50" cy="42" r="11" fill="none" stroke="#fff" stroke-width="2.4"/>' + L("M14 42L26 24H42L50 42M26 24L32 42H14M32 42L42 24", K, 5) + L("M14 42L26 24H42L50 42M26 24L32 42H14M32 42L42 24", "#EF5350", 2.2) + L("M42 24L40 14H48M22 20H30", K, 4.4) + L("M42 24L40 14H48", "#455A64", 2) + P("M20 17H31V21H20Z", "#455A64") + dot(32, 42, 3, "#FFD54F"));
  F.blocks = svg(body("M6 32H30V56H6Z", "#EF5350", "#C62828") + body("M34 32H58V56H34Z", "#64B5F6", "#1E88E5") + body("M20 8H44V32H20Z", "#FFD54F", "#F9A825") + L("M14 44H22M42 44H50", "#fff", 3).replace('stroke-linecap="round"', 'stroke-linecap="round" opacity=".8"') + '<circle cx="32" cy="20" r="5" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>');
  F.teddy = svg(body(circ(14, 12, 8), "#C98B4B", "#9A6532") + body(circ(50, 12, 8), "#C98B4B", "#9A6532") + body(ell(32, 54, 15, 9), "#C98B4B", "#9A6532") + body(ell(32, 30, 22, 20), "#C98B4B", "#9A6532") + body(ell(32, 37, 10, 8), "#FFE0B2", "#EBC18A") + nose(32, 34, K) + smile(32, 39) + ey(22, 26) + ey(42, 26) + P("M32 48L22 44V52Z", "#EF5350") + P("M32 48L42 44V52Z", "#EF5350") + dot(32, 48, 2.6, "#C62828"));
  F.book = svg(body("M30 14Q18 6 4 12V52Q18 48 30 56Z", "#fff", "#D3DDE3") + body("M34 14Q46 6 60 12V52Q46 48 34 56Z", "#fff", "#D3DDE3") + P("M2 50Q18 46 32 56Q46 46 62 50V55Q46 51 32 61Q18 51 2 55Z", "#64B5F6") + L("M10 22Q18 20 24 24M10 30Q18 28 24 32M40 24Q46 20 54 22M40 32Q46 28 54 30", "#B0BEC5", 2) + '<circle cx="46" cy="40" r="4" fill="#FFD54F"/>' + L("M32 14V56", K, 2));
  F.balloon = svg(L("M32 48Q26 54 32 58Q38 62 32 64", K, 2) + P("M32 46L28 52H36Z", "#C62828") + body("M32 4C48 4 54 20 50 32C47 41 38 46 32 46C26 46 17 41 14 32C10 20 16 4 32 4Z", "#EF5350", "#C62828") + hl(22, 18, 3, 6, 30));
  F.crayons = svg(G("rotate(-8 32 32)", body("M8 22H22V58H8Z", "#EF5350", "#C62828") + P("M8 22L15 6L22 22Z", "#EF5350") + R(8, 32, 14, 8, 1, "#FFE0B2") + body("M25 22H39V58H25Z", "#FFD54F", "#F9A825") + P("M25 22L32 6L39 22Z", "#FFD54F") + R(25, 32, 14, 8, 1, "#FFE0B2") + body("M42 22H56V58H42Z", "#64B5F6", "#1E88E5") + P("M42 22L49 6L56 22Z", "#64B5F6") + R(42, 32, 14, 8, 1, "#FFE0B2")));
  F.puzzle = svg(body("M12 14H26.5a6.5 6.5 0 1 1 11 0H52V26.5a6.5 6.5 0 1 1 0 11V52H12V37.5a6.5 6.5 0 1 0 0-11Z", "#81C784", "#388E3C") + hl(22, 24, 3, 6, 40) + L("M22 44H34", "#fff", 2.4));
  F.drum = svg(body("M8 30V48Q8 58 32 58Q56 58 56 48V30Z", "#EF5350", "#C62828") + L("M16 36L24 54M32 38V58M48 36L40 54", "#fff", 2.4) + '<ellipse cx="32" cy="30" rx="24" ry="9" fill="#FFF3E0" ' + ST + "/>" + L("M6 6L24 24", K, 6.4) + L("M6 6L24 24", "#E8C9A0", 3) + dot(25, 25, 3.6, "#E8C9A0") + L("M58 6L40 24", K, 6.4) + L("M58 6L40 24", "#E8C9A0", 3) + dot(39, 25, 3.6, "#E8C9A0"));
  F.piano = svg(body("M4 14H60V52Q60 56 56 56H8Q4 56 4 52Z", "#fff", "#D3DDE3") + P("M4 14H60V22H4Z", "#EF5350") + L("M16 24V56M28 24V56M40 24V56M52 24V56", K, 1.8) + R(12, 22, 8, 20, 2, K) + R(24, 22, 8, 20, 2, K) + R(36, 22, 8, 20, 2, K) + R(48, 22, 8, 20, 2, K));
  F.guitar = svg(G("rotate(35 32 32)", R(26, 1, 12, 9, 3, "#5D4037") + R(27, 8, 10, 24, 1, "#8D5A2B") + L("M28 10V30M30.2 10V30M32.4 10V30M34.6 10V30M36 10V30", "#fff", 0.8) + L("M27 15H37M27 21H37M27 27H37", "#5D4037", 1.2) + body("M32 22C42 22 44 30 40 36C48 42 46 58 32 58C18 58 16 42 24 36C20 30 22 22 32 22Z", "#FFB74D", "#E65100") + '<circle cx="32" cy="42" r="5" fill="#5D4037" ' + ST + "/>" + R(27, 50, 10, 3, 1, "#5D4037") + L("M28 30V51M30.2 30V51M32.4 30V51M34.6 30V51M36 30V51", "#fff", 0.8)));
  F.kite = svg(L("M32 46Q24 52 32 56Q40 60 32 64", K, 2) + P("M32 4L52 28L32 46L12 28Z", "#EF5350") + P("M32 4L52 28L32 28Z", "#FFD54F") + P("M12 28L32 46L32 28Z", "#FFD54F") + L("M32 4V46M12 28H52", K, 2) + P("M28 56L36 60L28 62Z", "#64B5F6"));
  F.bubbles = svg(body(circ(24, 38, 17), "#E1F5FE", "#81D4FA") + L("M13 32Q15 24 23 22", "#fff", 4.4) + dot(14, 40, 1.8, "#fff") + body(circ(48, 17, 10), "#E1F5FE", "#81D4FA") + L("M42 15Q44 10 49 9", "#fff", 3.2) + body(circ(50, 48, 7), "#E1F5FE", "#81D4FA") + L("M46 46Q47 43 50 43", "#fff", 2.4));
  F.rocket = svg(P("M24 32L10 46V54L26 46Z", "#EF5350") + P("M40 32L54 46V54L38 46Z", "#EF5350") + P("M26 52L32 64L38 52Z", "#FFB300") + body("M32 2Q46 14 44 40L40 52H24L20 40Q18 14 32 2Z", "#fff", "#D3DDE3") + P("M32 2Q40 8 43 20H21Q24 8 32 2Z", "#EF5350") + '<circle cx="32" cy="30" r="6" fill="#4FC3F7" ' + ST + "/>");
  F.boat = svg(L("M32 6V42", K, 3) + P("M34 8L54 38H34Z", "#fff") + P("M30 14L14 38H30Z", "#64B5F6") + body("M6 42H58L50 56H14Z", "#EF5350", "#C62828") + L("M2 58Q8 54 14 58Q20 62 26 58", "#81D4FA", 2.6) + P("M32 6L42 10L32 14Z", "#FFD54F"));

  // 家中用品
  F.cup = svg(L("M44 24Q58 24 56 36Q54 46 44 44", K, 6) + L("M44 24Q58 24 56 36Q54 46 44 44", "#4FC3F7", 2.6) + body("M10 16H46V46Q46 56 36 56H20Q10 56 10 46Z", "#4FC3F7", "#0288D1") + L("M10 28H46", "#fff", 3) + hl(18, 38, 2, 5, 0));
  F.bottle = svg(P("M26 4Q32 0 38 4L36 14H28Z", "#FFCC80") + P("M22 14H42V22H22Z", "#4FC3F7") + body("M20 22H44V52Q44 58 38 58H26Q20 58 20 52Z", "#E3F2FD", "#B7D4E8", { inside: '<rect x="0" y="32" width="64" height="40" fill="#fff"/>' }) + L("M20 30H26M20 38H28M20 46H26", "#4FC3F7", 2));
  F.spoon = svg(G("rotate(35 32 32)", P("M29 28H35L36 58H28Z", "#CFD8DC") + body(ell(32, 16, 11, 14), "#ECEFF1", "#B0BEC5") + hl(28, 12, 2, 5, 0)));
  F.fork = svg(G("rotate(30 32 32)", '<path d="M18 2H24V22Q24 26 29 27V2H35V27Q40 26 40 22V2H46V24Q46 34 35 37V57Q35 61 32 61Q29 61 29 57V37Q18 34 18 24Z" fill="#CFD8DC" ' + ST + "/>" + L("M32 40V56", "#fff", 2).replace('stroke-linecap="round"', 'stroke-linecap="round" opacity=".7"')));
  F.bowl = svg(body("M6 28H58Q58 56 32 56Q6 56 6 28Z", "#FFB74D", "#E65100") + '<ellipse cx="32" cy="28" rx="26" ry="7" fill="#FFF3E0" ' + ST + '/><ellipse cx="32" cy="29" rx="20" ry="4" fill="#FFE0B2"/>' + L("M14 40Q24 46 34 44", "#fff", 2.6) + hl(14, 36, 2, 4, -20));
  F.plate = svg('<circle cx="32" cy="32" r="26" fill="#fff" ' + ST + '/><circle cx="32" cy="32" r="17" fill="#E3F2FD" ' + ST.replace("2.4", "1.8") + "/>" + hl(20, 18, 3, 6, 40));
  F.phone = svg(body("M16 4H48Q52 4 52 8V56Q52 60 48 60H16Q12 60 12 56V8Q12 4 16 4Z", "#455A64", "#263238") + R(16, 10, 32, 40, 3, "#81D4FA") + '<circle cx="24" cy="20" r="4" fill="#FFD54F"/><circle cx="36" cy="20" r="4" fill="#EF5350"/><circle cx="24" cy="32" r="4" fill="#81C784"/><circle cx="36" cy="32" r="4" fill="#BA68C8"/>' + dot(32, 55, 2, "#B0BEC5"));
  F.keys = svg('<circle cx="22" cy="18" r="10" fill="none" stroke="' + K + '" stroke-width="5.4"/><circle cx="22" cy="18" r="10" fill="none" stroke="#CFD8DC" stroke-width="2"/>' + G("rotate(-25 20 40)", P("M14 28H26V54L20 58L14 54Z", "#FFD54F") + '<circle cx="20" cy="36" r="2.4" fill="' + K + '"/>') + G("rotate(35 32 30)", P("M30 26H40V54L35 58L30 54Z", "#EF5350") + '<circle cx="35" cy="34" r="2.4" fill="' + K + '"/>'));
  F.toothbrush = svg(G("rotate(-40 32 32)", R(4, 26, 40, 9, 4, "#4FC3F7") + R(40, 24, 18, 13, 3, "#fff") + P("M42 20H58V24H42Z", "#FFF3E0") + '<path d="M43 14V24M48 14V24M53 14V24" stroke="#fff" stroke-width="3.4"/>' + '<path d="M43 14V24M48 14V24M53 14V24" stroke="' + K + '" stroke-width="1.2" fill="none" opacity=".4"/>' + P("M42 14H56V19H42Z", "#4DD0E1")));
  F.soap = svg(body("M8 28Q8 18 18 18H46Q56 18 56 28V42Q56 52 46 52H18Q8 52 8 42Z", "#F8BBD0", "#EC8FB0") + hl(20, 26, 6, 2.4, 0) + '<circle cx="50" cy="12" r="7" fill="#E1F5FE" ' + ST + '/><circle cx="38" cy="8" r="4" fill="#E1F5FE" ' + ST + "/>" + L("M22 38H42", "#fff", 2.4));
  F.tissue = svg(P("M44 24Q56 28 54 44Q52 54 56 60L44 58Z", "#fff") + body("M10 20V50Q10 58 28 58Q46 58 46 50V20Z", "#fff", "#D3DDE3") + '<ellipse cx="28" cy="20" rx="18" ry="7" fill="#fff" ' + ST + '/><ellipse cx="28" cy="20" rx="6" ry="2.6" fill="#B0BEC5"/>' + L("M12 34Q28 40 44 34M12 44Q28 50 44 44", "#E3F2FD", 2.4));
  F.bed = svg(P("M4 10H10V56H4Z", "#A1887F") + P("M54 26H60V56H54Z", "#A1887F") + body("M8 34H58V46H8Z", "#fff", "#D3DDE3") + body("M8 38H58V50Q58 52 56 52H10Q8 52 8 50Z", "#64B5F6", "#1E88E5") + body("M12 24Q12 20 18 20H26Q32 20 32 24V34H12Z", "#FFF3E0", "#EBCFA0") + P("M4 52H60", "none") + L("M26 40V50M38 40V50M50 40V50", "#E3F2FD", 2));
  F.chair = svg(body("M14 8H28V30H14Z", "#D7A263", "#B07A3A") + body("M14 30H52V38H14Z", "#D7A263", "#B07A3A") + L("M18 38V58M48 38V58M22 12V28", K, 5) + L("M18 38V58M48 38V58", "#B07A3A", 2.4) + P("M16 38H50V41H16Z", "none"));
  F.door = svg(body("M12 4H52V60H12Z", "#A1887F", "#6D4C41") + R(18, 10, 12, 20, 2, "#BCAAA4") + R(34, 10, 12, 20, 2, "#BCAAA4") + R(18, 36, 12, 18, 2, "#BCAAA4") + R(34, 36, 12, 18, 2, "#BCAAA4") + '<circle cx="46" cy="32" r="3" fill="#FFD54F" ' + ST.replace("2.4", "1.6") + "/>");
  F.light = svg(L("M32 0V-2", K, 0) + L("M8 20H3M12 8L8 4M52 8L56 4M56 20H61", "#FFD54F", 3) + body("M32 6C46 6 52 18 48 28C46 33 42 36 42 42H22C22 36 18 33 16 28C12 18 18 6 32 6Z", "#FFEE58", "#FBC02D") + R(22, 42, 20, 6, 2, "#CFD8DC") + R(24, 48, 16, 6, 3, "#90A4AE") + L("M26 34L30 24L34 34L38 24", "#F9A825", 1.8) + hl(24, 18, 2.6, 5, 25));
  F.clock = svg(P("M12 14Q4 8 14 4Z", "#455A64") + P("M52 14Q60 8 50 4Z", "#455A64") + L("M16 52L12 60M48 52L52 60", K, 4) + body(circ(32, 34, 24), "#EF5350", "#C62828") + '<circle cx="32" cy="34" r="17" fill="#fff" ' + ST.replace("2.4", "1.8") + "/>" + L("M32 34V23M32 34L40 38", K, 3) + dot(32, 34, 2, K) + L("M32 19V20M32 49V48M17 34H18M47 34H46", K, 2));
  F.bag = svg(L("M22 14Q22 4 32 4Q42 4 42 14", K, 6) + L("M22 14Q22 4 32 4Q42 4 42 14", "#455A64", 2.4) + body("M10 22Q10 12 22 12H42Q54 12 54 22V54Q54 58 50 58H14Q10 58 10 54Z", "#4FC3F7", "#0288D1") + R(18, 36, 28, 18, 5, "#29B6F6") + L("M18 26H46", "#fff", 2.4) + dot(32, 28, 2, "#FFD54F"));
  F.umbrella = svg(L("M32 28V54Q32 60 38 60Q42 60 42 54", K, 6) + L("M32 28V54Q32 60 38 60Q42 60 42 54", "#8D5A2B", 2.4) + body("M4 32Q4 6 32 6Q60 6 60 32Q54 26 46 32Q39 26 32 32Q25 26 18 32Q10 26 4 32Z", "#EF5350", "#C62828") + L("M32 6V32M18 10Q12 22 18 32M46 10Q52 22 46 32", K, 1.8) + P("M30 2H34V6H30Z", "#8D5A2B"));
  F.mirror = svg(L("M32 46V58", K, 8) + L("M32 46V58", "#8D5A2B", 4) + body(ell(32, 28, 20, 24), "#8D5A2B", "#5D4037") + '<ellipse cx="32" cy="28" rx="15" ry="19" fill="#B3E5FC" ' + ST.replace("2.4", "1.8") + "/>" + L("M22 16Q26 12 30 12M20 24Q21 21 23 19", "#fff", 2.6));
  F.tv = svg(L("M24 10L32 18L40 10", K, 3) + body("M6 18H58V50H6Z", "#78909C", "#455A64") + R(11, 22, 34, 24, 3, "#81D4FA") + dot(51, 28, 2.6, "#EF5350") + dot(51, 38, 2.6, "#FFD54F") + P("M18 50L16 58H48L46 50Z", "#455A64") + hl(18, 28, 3, 1.4, -10));
  F.computer = svg(body("M12 8H52Q54 8 54 10V36H10V10Q10 8 12 8Z", "#546E7A", "#37474F") + R(14, 12, 36, 20, 2, "#81D4FA") + L("M19 18H34M19 24H28", "#fff", 2.4) + body("M4 38H60L63 52Q63 56 59 56H5Q1 56 1 52Z", "#CFD8DC", "#90A4AE") + R(9, 41, 6, 4, 1, "#fff") + R(17, 41, 6, 4, 1, "#fff") + R(25, 41, 6, 4, 1, "#fff") + R(33, 41, 6, 4, 1, "#fff") + R(41, 41, 6, 4, 1, "#fff") + R(49, 41, 6, 4, 1, "#fff") + R(9, 47, 6, 4, 1, "#fff") + R(17, 47, 30, 4, 1, "#fff") + R(49, 47, 6, 4, 1, "#fff"));
  F.pen = svg(G("rotate(40 32 32)", P("M26 8H38V44H26Z", "#4FC3F7") + P("M26 44H38L32 58Z", "#FFE0B2") + P("M30 54H34L32 58Z", K) + R(26, 4, 12, 8, 2, "#0288D1") + L("M41 12V32", K, 5) + L("M41 12V32", "#ECEFF1", 2)));
  F.paper = svg(body("M12 4H40L54 18V56Q54 60 50 60H16Q12 60 12 56Z", "#fff", "#D3DDE3") + P("M40 4V18H54Z", "#CFD8DC") + L("M20 28H46M20 36H46M20 44H38", "#90CAF9", 2.6));

  // 衣物
  F.shoes = svg(G("translate(-2 -6) scale(.9)", body("M4 36Q4 24 14 22L24 24Q26 32 36 34Q52 34 58 44V50H4Z", "#EF5350", "#C62828") + P("M2 50H60V56Q60 58 58 58H4Q2 58 2 56Z", "#fff") + L("M20 30L26 26M26 34L32 30", "#fff", 2.4) + P("M4 36Q4 24 14 22L18 24L14 34Z", "#FFCDD2")) + G("translate(24 10) scale(.5)", body("M4 36Q4 24 14 22L24 24Q26 32 36 34Q52 34 58 44V50H4Z", "#64B5F6", "#1E88E5") + P("M2 50H60V56Q60 58 58 58H4Q2 58 2 56Z", "#fff")));
  F.socks = svg(G("rotate(-8 20 30)", body("M8 6H28V38Q28 42 36 44Q44 48 40 56Q36 60 26 60H18Q8 60 8 50Z", "#FFD54F", "#F9A825") + R(8, 6, 20, 7, 2, "#EF5350") + L("M8 20H28", "#EF5350", 3) + L("M8 28H28", "#EF5350", 3)) + G("rotate(8 44 30)", body("M36 8H54V36Q54 40 60 42Q66 48 60 56Q56 60 48 60H44Q36 60 36 50Z", "#81D4FA", "#0288D1").replace("M36", "M36") + R(36, 8, 18, 7, 2, "#fff")));
  F.hat = svg(P("M8 44Q8 24 32 22Q56 24 56 44Z", "#fff").replace("#fff", "#EF5350") + body("M8 44Q8 20 32 18Q56 20 56 44Z", "#EF5350", "#C62828") + P("M30 44Q44 40 62 44Q60 52 42 52Q32 52 30 44Z", "#C62828") + dot(32, 18, 3.4, "#FFD54F") + L("M32 20V44", "#C62828", 2) + hl(20, 30, 3, 6, 30));
  F.jacket = svg(body("M20 8L12 12L4 52H14L16 28V58H48V28L50 52H60L52 12L44 8Q32 20 20 8Z", "#FFB74D", "#E65100") + L("M32 16V58", K, 2.4) + R(18, 40, 10, 10, 2, "#FFA726") + R(36, 40, 10, 10, 2, "#FFA726") + P("M20 8Q32 22 44 8Q38 4 32 4Q26 4 20 8Z", "#FFE0B2"));
  F.pants = svg(body("M14 6H50L54 58H36L32 26L28 58H10Z", "#5C9DEA", "#2F6DB5") + R(14, 6, 36, 8, 2, "#2F6DB5") + L("M32 14V26", K, 2.2) + L("M18 40H24M42 40H48", "#BBDEFB", 2) + dot(32, 11, 2, "#FFD54F"));
  F.shirt = svg(body("M22 6L4 18L12 32L18 28V58H46V28L52 32L60 18L42 6Q32 16 22 6Z", "#66BB6A", "#388E3C") + P("M22 6Q32 16 42 6Q38 4 32 4Q26 4 22 6Z", "#C8E6C9") + L("M18 44H46", "#fff", 2.4) + '<circle cx="32" cy="32" r="5" fill="#FFD54F" ' + ST.replace("2.4", "1.8") + "/>");
  F.dress = svg(body("M24 4L28 14Q32 18 36 14L40 4L44 8L40 24L58 58H6L24 24L20 8Z", "#F48FB1", "#D81B60") + P("M24 24H40L42 30H22Z", "#F06292") + L("M20 44Q32 50 44 44M14 54Q32 60 50 54", "#fff", 2.2) + dot(32, 27, 2.6, "#FFD54F"));
  F.glasses = svg('<circle cx="18" cy="36" r="13" fill="#E1F5FE" ' + ST + '/><circle cx="46" cy="36" r="13" fill="#E1F5FE" ' + ST + "/>" + L("M31 34Q32 31 33 34", K, 3) + L("M5 34L1 26M59 34L63 26", K, 3) + L("M12 30Q14 27 18 27M40 30Q42 27 46 27", "#fff", 2.6) + '<circle cx="18" cy="36" r="13" fill="none" stroke="#455A64" stroke-width="3.4"/><circle cx="46" cy="36" r="13" fill="none" stroke="#455A64" stroke-width="3.4"/>');
  F.gloves = svg(body("M18 28V14Q18 8 23 8Q28 8 28 14V26V10Q28 4 33 4Q38 4 38 10V26V12Q38 6 43 6Q48 6 48 12V28V20Q48 14 53 14Q57 14 56 22L54 40Q52 52 40 52H26Q16 52 16 42L10 30Q8 24 14 24Q18 24 20 30Z", "#EF5350", "#C62828") + R(16, 50, 34, 10, 3, "#fff") + L("M20 55H46", "#CFD8DC", 2) + L("M28 28V14M38 26V12", "#C62828", 1.6));
  F.scarf = svg(body("M26 20L40 22L36 56H20Z", "#EF5350", "#C62828", { inside: '<path d="M0 30H70M0 42H70" stroke="#fff" stroke-width="4"/>' }) + L("M22 56V61M27 56V61M32 56V61", K, 2.4) + body("M34 20L50 26L46 52H32Z", "#EF5350", "#C62828", { inside: '<path d="M0 34H70M0 46H70" stroke="#fff" stroke-width="4"/>' }) + L("M34 52V57M39 52V57M44 52V57", K, 2.4) + body("M6 14Q32 0 58 14Q60 22 54 28Q32 14 10 28Q4 22 6 14Z", "#EF5350", "#C62828", { inside: '<path d="M18 0V40M30 0V40M42 0V40M54 0V40" stroke="#fff" stroke-width="3.4"/>' }) + hl(14, 14, 3, 1.6, -20));
  F.boots = svg(body("M12 4H34V34Q34 38 42 40Q56 42 58 52V58H8Q8 58 12 52Z", "#FFD54F", "#F9A825") + P("M8 52H58V58Q58 60 56 60H10Q8 60 8 58Z", "#455A64") + R(12, 4, 22, 7, 2, "#FFB300") + hl(18, 22, 2, 8, 0));
  (function () {
    function flip(cx, rot) {
      var cy = 32, w = 24, h = 52, t = cy - h / 2, b = cy + h / 2;
      var d = "M" + cx + " " + t + "Q" + (cx + w / 2) + " " + t + " " + (cx + w / 2) + " " + (t + .36 * h) + "Q" + (cx + w / 2) + " " + (t + .6 * h) + " " + (cx + .4 * w) + " " + (t + .8 * h) + "Q" + (cx + .34 * w) + " " + b + " " + cx + " " + b + "Q" + (cx - .34 * w) + " " + b + " " + (cx - .4 * w) + " " + (t + .8 * h) + "Q" + (cx - w / 2) + " " + (t + .6 * h) + " " + (cx - w / 2) + " " + (t + .36 * h) + "Q" + (cx - w / 2) + " " + t + " " + cx + " " + t + "Z";
      var sx = cx, sy = t + .24 * h, ex = .24 * w, ey2 = t + .46 * h;
      return G("rotate(" + rot + " " + cx + " " + cy + ")", body(d, "#4FC3F7", "#0288D1") + L("M" + sx + " " + sy + "L" + (cx - ex) + " " + ey2 + "M" + sx + " " + sy + "L" + (cx + ex) + " " + ey2, K, 6.4) + L("M" + sx + " " + sy + "L" + (cx - ex) + " " + ey2 + "M" + sx + " " + sy + "L" + (cx + ex) + " " + ey2, "#FFD54F", 3) + dot(sx, sy, 2.6, "#F9A825"));
    }
    F.sandals = svg(flip(17, -8) + flip(47, 8));
  })();

  return F;
})();
