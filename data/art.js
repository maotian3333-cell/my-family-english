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

  return F;
})();
