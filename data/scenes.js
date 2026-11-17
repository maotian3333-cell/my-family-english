/* 情境底圖（Flat 風格，純 SVG）：給孩子模式「說一說」與「找一找」當背景，讓句子有場景。
   viewBox 0 0 360 260；左下留給角色、右下留給物品，不要在這兩區放大型裝飾。 */
(function () {
  var S = {};
  function wrap(inner) { return '<svg class="scn" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + "</svg>"; }
  S.garden = wrap('<rect width="360" height="260" fill="#CFEFFB"/><circle cx="305" cy="48" r="26" fill="#FFD966"/><ellipse cx="90" cy="52" rx="40" ry="14" fill="#fff"/><ellipse cx="118" cy="44" rx="26" ry="12" fill="#fff"/>' +
    '<path d="M0 150 Q90 100 180 140 T360 125 V260 H0Z" fill="#A8D8A0"/><rect y="180" width="360" height="80" fill="#8FCB8A"/><g fill="#fff"><rect x="225" y="130" width="8" height="50"/><rect x="255" y="130" width="8" height="50"/><rect x="285" y="130" width="8" height="50"/><rect x="215" y="142" width="90" height="7"/><rect x="215" y="160" width="90" height="7"/></g>' +
    '<rect x="318" y="105" width="12" height="60" fill="#A9743F"/><circle cx="324" cy="92" r="30" fill="#6FBF73"/><g fill="#F7B6C6"><circle cx="40" cy="215" r="5"/><circle cx="120" cy="238" r="5"/><circle cx="330" cy="235" r="5"/></g>');
  S.kitchen = wrap('<rect width="360" height="260" fill="#FFF1D6"/><g stroke="#F5DDB0" stroke-width="2"><path d="M0 40H360M0 80H360M0 120H360M60 0V150M120 0V150M180 0V150M240 0V150M300 0V150"/></g><rect x="40" y="26" width="90" height="72" rx="6" fill="#CFEFFB" stroke="#E8B87A" stroke-width="6"/><path d="M85 26V98M40 62H130" stroke="#E8B87A" stroke-width="4"/>' +
    '<rect y="168" width="360" height="92" fill="#E8B87A"/><rect y="168" width="360" height="12" fill="#D79B56"/><path d="M200 168H340V260H200Z" fill="#F7B6C6" opacity=".55"/><g fill="#fff"><circle cx="290" cy="60" r="22" opacity=".8"/><rect x="278" y="56" width="24" height="3" fill="#E8B87A"/></g>');
  S.play = wrap('<rect width="360" height="260" fill="#E8F0FF"/><rect y="170" width="360" height="90" fill="#F6D7A0"/><ellipse cx="190" cy="215" rx="150" ry="36" fill="#F7B6C6"/><ellipse cx="190" cy="215" rx="105" ry="24" fill="#FBD3DD"/>' +
    '<rect x="26" y="40" width="130" height="8" rx="3" fill="#C58B4F"/><rect x="26" y="95" width="130" height="8" rx="3" fill="#C58B4F"/><g><rect x="40" y="14" width="26" height="26" rx="4" fill="#FFC943"/><rect x="74" y="20" width="26" height="20" rx="4" fill="#8FC6A7"/><rect x="112" y="12" width="30" height="28" rx="14" fill="#F9A06B"/><rect x="50" y="68" width="30" height="27" rx="4" fill="#9CD0F2"/><rect x="92" y="62" width="26" height="33" rx="4" fill="#E3B6E8"/></g>' +
    '<circle cx="310" cy="50" r="22" fill="#FFD966"/>');
  S.room = wrap('<rect width="360" height="260" fill="#E7F3E9"/><rect y="176" width="360" height="84" fill="#D9B98A"/><g stroke="#C9A674" stroke-width="2"><path d="M0 200H360M0 226H360M60 176V260M150 176V260M240 176V260M320 176V260"/></g><rect x="220" y="30" width="100" height="84" rx="6" fill="#CFEFFB" stroke="#fff" stroke-width="8"/><path d="M270 30V114M220 72H320" stroke="#fff" stroke-width="5"/>' +
    '<rect x="42" y="38" width="60" height="46" rx="4" fill="#FFC943" stroke="#fff" stroke-width="5"/><circle cx="72" cy="61" r="12" fill="#F9A06B"/>');
  S.bedroom = wrap('<rect width="360" height="260" fill="#F3E5F5"/><rect y="180" width="360" height="80" fill="#E3C9A5"/><rect x="250" y="40" width="90" height="140" rx="6" fill="#B58BC9"/><path d="M295 40V180" stroke="#9B6FB3" stroke-width="4"/><circle cx="286" cy="112" r="4" fill="#fff"/><circle cx="304" cy="112" r="4" fill="#fff"/>' +
    '<rect x="40" y="46" width="70" height="56" rx="6" fill="#CFEFFB" stroke="#fff" stroke-width="6"/><circle cx="76" cy="74" r="12" fill="#FFD966"/><path d="M30 180Q180 160 240 180" stroke="#fff" stroke-width="0" fill="none"/>');
  S.road = wrap('<rect width="360" height="260" fill="#CFEFFB"/><g fill="#B8C7D6"><rect x="30" y="70" width="50" height="100"/><rect x="95" y="40" width="44" height="130"/><rect x="250" y="60" width="56" height="110"/></g><g fill="#fff"><rect x="40" y="84" width="10" height="10"/><rect x="60" y="84" width="10" height="10"/><rect x="105" y="58" width="10" height="10"/><rect x="122" y="58" width="10" height="10"/><rect x="262" y="78" width="10" height="10"/><rect x="284" y="78" width="10" height="10"/></g>' +
    '<rect y="170" width="360" height="90" fill="#7C8794"/><rect y="164" width="360" height="10" fill="#A9B3BF"/><g fill="#FFD966"><rect x="20" y="214" width="46" height="7"/><rect x="110" y="214" width="46" height="7"/><rect x="200" y="214" width="46" height="7"/><rect x="290" y="214" width="46" height="7"/></g><circle cx="320" cy="34" r="20" fill="#FFD966"/>');
  S.bath = wrap('<rect width="360" height="260" fill="#DDF1F8"/><g stroke="#C4E3EE" stroke-width="2"><path d="M0 40H360M0 80H360M0 120H360M0 160H360M60 0V180M120 0V180M180 0V180M240 0V180M300 0V180"/></g><rect y="180" width="360" height="80" fill="#B9DCE8"/><rect x="230" y="60" width="90" height="70" rx="6" fill="#fff" stroke="#9CD0F2" stroke-width="5"/><circle cx="275" cy="95" r="18" fill="#EAF6FC"/><g fill="#fff" opacity=".9"><circle cx="60" cy="60" r="10"/><circle cx="80" cy="44" r="7"/><circle cx="46" cy="40" r="5"/></g>');
  window.MFE_SCENE_ART = S;
  window.MFE_SCENE_OF = { animals: "garden", fruit: "kitchen", food: "kitchen", toys: "play", home: "room", clothes: "bedroom", vehicles: "road", body: "bath", colors: "play", numbers: "play", verbs: "garden", feelings: "room", preps: "play", adjs: "kitchen", def: "play" };
})();

/* v2.11.1 真實相對大小：以「幼兒/小怪獸」為參照，物件依真實大小分級（寬度％） */
(function () {
  var W = { xs: 15, s: 23, m: 29, l: 35, xl: 41 };
  var G = {
    xs: "bee ant insect snail ladybug key keys pin ink olive cherry blueberries lychee longan candy cookie quarter spoon fork toothbrush pen crayons soap jam yarn yo-yo yoyo moth butterfly nut zipper net",
    s: "apple orange tangerine kiwi lemon peach pear plum tomato egg cup mug jar sock socks hat bowl plate bottle phone ball bubbles tooth cheese bread carrot corn potato sweetpotato cucumber mushroom chicken balloon kite bag shoes boots sandals gloves scarf tissue light clock envelope map lid box vase pan up sun star frog fish bird duck turtle rabbit hen fries popcorn honey juice milk water tea soup dumpling sandwich pizza cake icecream paper yogurt",
    m: "banana pineapple mango melon papaya coconut avocado pomelo guava watermelon strawberry grapes persimmon dragonfruit waxapple starfruit sugarapple broccoli zucchini book blocks puzzle drum umbrella glasses dress jacket pants shirt vest teddy cat dog pig sheep monkey panda fox octopus jellyfish iguana quilt mirror tv computer violin guitar bike stand under",
    l: "chair bear horse cow ox zebra tiger lion giraffe-no whale-no shark dinosaur-no piano bed bath igloo car van kite-no",
    xl: "elephant giraffe whale dinosaur truck bus train airplane boat rocket door"
  };
  var T = {};
  Object.keys(G).forEach(function (k) { G[k].split(/\s+/).forEach(function (n) { if (n.indexOf("-no") < 0) T[n] = k; }); });
  T.tiger = "l"; T.lion = "l"; T.dinosaur = "xl"; T.shark = "l"; T.kite = "s"; T.giraffe = "xl"; T.whale = "xl";
  T.uncle = "l"; T.queen = "l"; T.king = "l"; T.ox = "l"; T.elbow = "s"; T.b_head = "s"; T.b_hand = "s"; T.b_foot = "s";
  window.MFE_SIZE_OF = function (id) {
    var k = String(id || ""), base = k.replace(/^(l|r|w|v)_/, "");
    if (/^(vb|em|pp|aj)_/.test(k) || /^c_/.test(k) || /^n\d+$/.test(k) || /^b_/.test(k)) return k.indexOf("b_") === 0 ? "s" : "m";
    return T[base] || T[k] || "s";
  };
  window.MFE_SIZE_W = function (id) { return W[window.MFE_SIZE_OF(id)]; };
})();

/* v2.12 場景補充：海邊（水中生物與船）、場景物件的呈現規則 */
(function () {
  var W = ['<svg class="scn" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">',
    '<rect width="360" height="260" fill="#CFEFFB"/><circle cx="300" cy="46" r="24" fill="#FFD966"/><ellipse cx="80" cy="50" rx="40" ry="13" fill="#fff"/><ellipse cx="108" cy="42" rx="25" ry="11" fill="#fff"/>',
    '<rect y="96" width="360" height="110" fill="#6EC1F0"/><rect y="96" width="360" height="10" fill="#8FD3F7"/>',
    '<g fill="none" stroke="#CFEFFB" stroke-width="3" stroke-linecap="round"><path d="M20 128q12-8 24 0t24 0"/><path d="M150 112q12-8 24 0t24 0"/><path d="M240 150q12-8 24 0t24 0"/><path d="M60 170q12-8 24 0t24 0"/></g>',
    '<path d="M0 196Q90 180 180 196T360 190V260H0Z" fill="#F6D7A0"/><g fill="#fff"><circle cx="40" cy="236" r="5"/><circle cx="300" cy="238" r="5"/></g><path d="M330 214l8-14 8 14z" fill="#F7B6C6"/></svg>'].join("");
  window.MFE_SCENE_ART.sea = W;
  /* 場景用哪一張底圖：水中生物放海邊；其他沿用原本分類 */
  window.MFE_SCENE_FOR = function (id, sc) { var a = window.MFE_AQUATIC || {}; return a[id] ? "sea" : sc; };
  var ABS = /^(c_|n\d+$|b_|vb_|em_|aj_)/;
  /* 物件呈現：動物／人物用全身版；顏色、數字、身體部位、動作…等抽象圖放在對話泡泡裡 */
  window.MFE_ITEM_HTML = function (w, picFn) {
    var id = w[0], full = window.MFE_FULL && window.MFE_FULL[id];
    if (full) return '<span class="pic svg full">' + full + "</span>";
    if (ABS.test(id)) return '<span class="bub">' + picFn(w) + "</span>";
    return picFn(w);
  };
  window.MFE_ITEM_BOTTOM = function (id) { return (window.MFE_AQUATIC || {})[id] ? 30 : null; };
})();
