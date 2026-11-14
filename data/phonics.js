// 補齊 26 個字母（C9–C11）與常見語音結構（D7–D11）：雙字母、混合音、魔法 e、母音組合、r 控制母音。
// 全部使用直接教學（js/di.js）：正例／反例固定比例。接在 practice2.js 之後、js/di.js 之前載入。
(function () {
  var W = window, A = W.MFE_ACT;
  function w(id, en, zh, pic) { return [id, en, zh, "svg:" + pic, "", "", ""]; }
  function L(id, en, zh, pic, letter) { return [id, en, zh, "svg:" + pic, "", "", letter]; }
  W.MFE_WORD_CATS.push({ id: "ex_phon", icon: "🔤", name: "字母與拼讀結構用字", words: [
    w("jam", "jam", "果醬", "jam"), w("jellyfish", "jellyfish", "水母", "jellyfish"), w("king", "king", "國王", "king"), w("vase", "vase", "花瓶", "vase"),
    w("violin", "violin", "小提琴", "violin"), w("vest", "vest", "背心", "vest"), w("yoyo", "yo-yo", "溜溜球", "yoyo"), w("yarn", "yarn", "毛線", "yarn"),
    w("yogurt", "yogurt", "優格", "yogurt"), w("zebra", "zebra", "斑馬", "zebra"), w("zipper", "zipper", "拉鍊", "zipper"), w("zero", "zero", "零", "zero"),
    w("zucchini", "zucchini", "櫛瓜", "zucchini"), w("queen", "queen", "皇后", "queen"), w("quilt", "quilt", "拼布被", "quilt"), w("quarter", "quarter", "25 分硬幣", "quarter"),
    w("question", "question", "問題", "question"), w("fox", "fox", "狐狸", "fox"), w("bath", "bath", "洗澡", "bath"), w("moth", "moth", "蛾", "moth"),
    w("star", "star", "星星", "star"), w("jar", "jar", "玻璃罐", "jar"), w("shark", "shark", "鯊魚", "shark")] });
  W.MFE_WORD_CATS.push(
    { id: "ph9", icon: "🧃", name: "j k v", words: [L("l_j", "jam", "果醬（j 的聲音 /j/）", "jam", "j"), L("l_k", "kite", "風箏（k 的聲音 /k/）", "kite", "k"), L("l_v", "van", "廂型車（v 的聲音 /v/）", "van", "v")] },
    { id: "ph10", icon: "🍉", name: "w y z", words: [L("l_w", "watermelon", "西瓜（w 的聲音 /w/）", "watermelon", "w"), L("l_y", "yo-yo", "溜溜球（y 的聲音 /y/）", "yoyo", "y"), L("l_z", "zebra", "斑馬（z 的聲音 /z/）", "zebra", "z")] },
    { id: "ph11", icon: "👑", name: "q x", words: [L("l_q", "queen", "皇后（q 的聲音 /kw/）", "queen", "q"), L("l_x", "fox", "狐狸（x 在字尾 /ks/）", "fox", "x")] } 
  );
  function cat(id, icon, name, ids) { W.MFE_WORD_CATS.push({ id: id, icon: icon, name: name, words: ids.map(function (i) { return W.MFE_WORD_CATS.__m[i]; }).filter(Boolean) }); }
  var M = {}; W.MFE_WORD_CATS.forEach(function (c) { c.words.forEach(function (x) { M[x[0]] = x; }); }); W.MFE_WORD_CATS.__m = M;
  cat("st7", "🦈", "sh ch th", ["shoes", "chair", "b_tooth"]); cat("st8", "🐸", "混合音", ["frog", "snail", "clock"]); cat("st9", "🎂", "魔法 e", ["cake", "bike", "kite"]);
  cat("st10", "🐝", "兩個母音", ["bee", "train", "boat"]); cat("st11", "🚗", "r 控制母音", ["car", "fork", "bird"]);

  // ---------- 直接教學規格（正例、近反例、遠反例都明確列出）----------
  var CVLEG = function (s) { return s.split("").map(function (c) { return [c === "V" ? "tw" : c === "e" ? "tq" : "tc", c]; }); };
  function G(key, sym, legend, pos, near, far, ask, rule, neg, extra) { var o = { key: key, sym: sym, legend: CVLEG(legend), mode: "pat", pos: pos, near: near, far: far, ask: ask, rule: rule, neg: neg || "不是 " + sym }; for (var k in extra) o[k] = extra[k]; return o; }
  var FAR = ["apple", "tiger", "rabbit", "banana", "duck", "ball"];
  var CVCN = ["cat", "dog", "pig", "sun", "bed", "pan", "cup", "hat"];
  W.MFE_DI_SPEC = {
    LET: ["C9", "C10", "C11"],
    OVR: {
      q: { near: ["kite", "cat", "cake", "cow", "car", "cookie"], far: FAR.concat(["dog"]) },
      x: { pos: ["box", "fox", "n6", "ax", "ox"], near: ["duck", "truck", "clock", "book"], far: ["apple", "tiger", "rabbit", "banana", "ball", "dog", "cat"] }
    },
    GRP: {
      D7: { silent: false, tip: "兩個字母合成一個聲音（sh、ch、th）點 ✔；其他點 ✖。", teachTip: "先看 ✔ 這一排：兩個字母合成一個聲音（正例）；再看 ✖ 那一排：長得像但不是（反例）。孩子跟著念。",
        groups: [
          G("sh", "/sh/", "CC", ["shoes", "shirt", "sheep", "shark"], ["sun", "socks", "soup", "chair", "cheese", "cherry"], FAR, "Does {w} start with /sh/?", "一開始是 sh（兩個字母，一個聲音）＝ ✔", null),
          G("ch", "/ch/", "CC", ["chair", "cheese", "cherry", "hen"], ["shoes", "sheep", "shirt", "sun", "socks", "cat"], FAR, "Does {w} start with /ch/?", "一開始是 ch（兩個字母，一個聲音）＝ ✔", null),
          G("th", "字尾 /th/", "CC", ["b_mouth", "b_tooth", "bath", "moth"], ["fish", "toothbrush", "peach", "sandwich"], FAR.concat(["dog", "cat"]), "Does {w} end with /th/?", "字尾是 th（兩個字母，一個聲音）＝ ✔", "字尾不是 th")
        ] },
      D8: { tip: "開頭連著兩個子音（藍藍）點 ✔；只有一個子音點 ✖。", teachTip: "先看 ✔ 開頭有兩個子音連在一起（正例），再看 ✖ 開頭只有一個子音（反例）。",
        groups: [
          G("r", "fr dr tr gr cr", "CCV", ["frog", "drum", "train", "truck", "grapes", "crayons"], ["dog", "cat", "pig", "bus", "sun", "net"], FAR, "Does {w} start with two sounds, like fr / dr / tr?", "開頭兩個子音連在一起，第二個是 r ＝ ✔", "開頭只有一個子音"),
          G("s", "sn sp st", "CCV", ["snail", "spoon", "strawberry", "star"], ["sun", "soup", "soap", "socks"], FAR, "Does {w} start with two sounds, like sn / sp / st?", "開頭 s ＋ 另一個子音 ＝ ✔", "開頭只有 s 一個子音"),
          G("l", "bl cl gl pl", "CCV", ["blocks", "clock", "glasses", "gloves", "plate"], ["lion", "lemon", "light", "bed", "ball", "book"], FAR, "Does {w} start with two sounds, like bl / cl / gl?", "開頭兩個子音連在一起，第二個是 l ＝ ✔", "開頭只有一個子音")
        ] },
      D9: { silent: true, tip: "最後有不發音的 e（灰色）點 ✔；沒有點 ✖。", teachTip: "先看 ✔ 三個字最後都有不發音的 e（灰色），再看 ✖ 兩個短母音字（沒有 e）。",
        groups: [G("magic", "C-V-C-e", "CVCe", ["cake", "bike", "kite", "b_nose", "n5", "n9"], CVCN, FAR.concat(["chair"]), "Does {w} end with a silent e (C-V-C-e)?", "最後有不發音的 e（灰色）＝ ✔", "沒有魔法 e")] },
      D10: { tip: "兩個母音（紅紅）排在一起點 ✔；其他點 ✖。", teachTip: "先看 ✔ 字裡有兩個母音排在一起（紅紅），再看 ✖ 只有一個母音的字。",
        groups: [G("vv", "兩個母音 ee ai oa", "VV", ["bee", "sheep", "cheese", "b_tooth", "b_foot", "c_green", "train", "snail", "boat", "tea"], CVCN, FAR, "Does {w} have two vowels together?", "兩個母音排在一起，唸一個長音 ＝ ✔", "沒有兩個母音相連")] },
      D11: { tip: "母音後面接 r，聲音變了（car、fork、bird）點 ✔。", teachTip: "先看 ✔ 母音後面接 r，聲音變了（正例），再看 ✖ 沒有 r 的短母音字。",
        groups: [
          G("ar", "ar", "Vc", ["car", "star", "jar", "yarn"], ["cat", "hat", "bag", "pan", "map", "van"], ["apple", "banana", "rabbit", "kite", "ball", "duck"], "Does {w} have the /ar/ sound?", "母音 a ＋ r ＝ /ar/ ＝ ✔", "沒有 ar"),
          G("or", "or", "Vc", ["fork", "corn", "horse", "door"], ["dog", "box", "frog", "ox"], ["apple", "banana", "rabbit", "kite", "ball", "duck"], "Does {w} have the /or/ sound?", "母音 o ＋ r ＝ /or/ ＝ ✔", "沒有 or"),
          G("er", "er ir ur", "Vc", ["bird", "shirt", "turtle", "c_purple"], ["pig", "pin", "cup", "bus", "sun", "bed"], ["apple", "banana", "rabbit", "kite", "ball", "duck"], "Does {w} have the /er/ sound (er / ir / ur)?", "母音 ＋ r ＝ /er/ ＝ ✔", "沒有 er ir ur")
        ] }
    }
  };
  (function () { var BIG = { th: "th", magic: "C V C e", vv: "ee ai oa" }; var GR = W.MFE_DI_SPEC.GRP;
    Object.keys(GR).forEach(function (u) { GR[u].groups.forEach(function (g) { g.big = BIG[g.key] || g.sym.replace(/\//g, ""); if (g.key === "magic") g.bigLegend = true; }); }); })();
  // legend 的 "Vc"：V ＝ 母音，c ＝ r（用藍色小寫）
  Object.keys(W.MFE_DI_SPEC.GRP).forEach(function (u) { W.MFE_DI_SPEC.GRP[u].groups.forEach(function (g) { if (g.legend.length === 2 && g.legend[1][1] === "c") g.legend = [["tw", "V"], ["tc", "r"]]; if (g.key === "vv") g.legend = [["tw", "V"], ["tw", "V"]]; }); });

  // ---------- 課程單元 ----------
  function lesson(o) {
    var d = {
      twoKids: "二寶聽就好，不用參與；大寶可以當小老師，把學習單與互動版當遊戲玩給弟妹看。",
      resist: ["孩子不想就停，換成玩偶或唱歌，明天再試。", "答錯不糾正，你說一次正確的示範，再繼續。"],
      paper: "三版學習單內容相似、順序不同；教學頁先教概念，再做練習頁。",
      review: "隔幾天換另一版學習單或互動版再玩一次。",
      kid: { hero: "字母怪獸", buttons: "大圖卡", game: "聽一聽點一點", palette: "方案 C", note: "不計分、不扣分。" }
    };
    for (var k in o) d[k] = o[k];
    return d;
  }
  function letterLesson(id, icon, ls, ex, extra) {
    return lesson({ id: id, stage: "C", icon: icon, title: "字母聲音 " + ls.join(" "),
      goal: "聽到 " + ls.map(function (l) { return "/" + l + "/"; }).join(" ") + " 時，能判斷一個字是不是這個聲音（直接教學：正例與反例）。",
      phrases: ["listen_sound", "starts_with", "again_sound"], words: ex,
      scripts: { A: "聽，" + extra.snd + "。這個字是不是 " + extra.snd + " 開頭？", B: "Listen. " + extra.snd + ". Does it start with " + extra.snd + "?", C: "Listen. What sound? " + extra.snd + ". Does " + extra.w + " start with " + extra.snd + "? Yes or no?" },
      puppet: [extra.snd + "!", "Yes!", "No!"],
      steps: ["先看教學頁：只看正例（✔）再看反例（✖）。", "做練習：你說單字，孩子點 ✔ 或 ✖。", "答錯不責備：你示範「" + extra.w + "… " + extra.snd + "… 是！」。", "三回合難度逐步增加，孩子累了就停。"],
      game: "「是不是」：你說一個字，孩子點頭或搖頭。", song: "自編的聲音韻文。", book: "字母主題的繪本。", life: "路上看到東西，問：Does it start with " + extra.snd + "?", quick: "做一回練習", observe: "能正確說出 ✔ ✖＝聲音分辨成功。" });
  }
  function structLesson(id, icon, title, goal, ex, extra) {
    return lesson({ id: id, stage: "D", icon: icon, title: title, goal: goal, phrases: ["read_it", "listen_sound"], words: ex,
      scripts: { A: extra.a, B: extra.b, C: extra.c }, puppet: ["Read it!", "Yes!", "No!"],
      steps: ["先看教學頁：正例（✔）再看反例（✖），孩子跟著念。", "做練習：看字母格子與圖，點 ✔ 或 ✖。", "答錯不責備：你示範一次，再繼續。", "三回合難度逐步增加。"],
      game: "「找一找」：在書裡找出符合的字。", song: "自編的拼讀韻文。", book: "拼讀分級讀本。", life: extra.life, quick: "做一回練習", observe: "能正確判斷 ✔ ✖＝掌握了這個拼讀結構。" });
  }
  W.MFE_LESSONS.push(
    letterLesson("C9", "🧃", ["j", "k", "v"], ["j（jam）、k（kite）、v（van）"], { snd: "/j/", w: "jam" }),
    letterLesson("C10", "🍉", ["w", "y", "z"], ["w（watermelon）、y（yo-yo）、z（zebra）"], { snd: "/w/", w: "watermelon" }),
    lesson({ id: "C11", stage: "C", icon: "👑", title: "字母聲音 q x",
      goal: "認識 q（/kw/，queen）與 x（字尾 /ks/，box、fox），並能判斷一個字是不是這個聲音。",
      phrases: ["listen_sound", "starts_with", "again_sound"], words: ["q（queen）：總是和 u 一起，唸 kw", "x（fox）：通常在字尾，唸 ks"],
      scripts: { A: "queen 一開始是 kw。fox 最後是 ks。", B: "Listen. Kw. Queen starts with kw. Fox ends with ks.", C: "Listen. Does queen start with kw? Yes! Does fox end with ks? Yes!" },
      puppet: ["Kw!", "Ks!", "Yes!"], steps: ["x 用「字尾」判斷，不是開頭。", "先看教學頁，再做 ✔/✖ 練習。", "答錯不責備，你示範一次。", "這兩個字母很少見，輕鬆玩就好。"],
      game: "「是不是」：你說一個字，孩子點頭或搖頭。", song: "自編的聲音韻文。", book: "字母主題的繪本。", life: "看到盒子 box、狐狸 fox，指著字尾說 ks。", quick: "做一回練習", observe: "能分辨 /kw/ 與 /k/ ＝進步。" }),
    structLesson("D7", "🦈", "雙字母 sh ch th", "認識兩個字母合成一個聲音：sh（shoes）、ch（chair）、th（mouth，字尾）。", ["sh：shoes、sheep、shirt、shark", "ch：chair、cheese、cherry", "th（字尾）：mouth、teeth、bath"],
      { a: "s 加 h 變成「噓」sh。shoes 是 sh 開頭。", b: "Listen. S and h make sh. Shoes starts with sh.", c: "Listen. Sh. Does shoes start with sh? Yes! Does sun start with sh? No.", life: "穿鞋時說 Shoes! sh 吃起司說 Cheese! ch" }),
    structLesson("D8", "🐸", "混合音 fr st bl", "認識兩個子音連在一起（混合音）：fr / dr / tr、sn / sp / st、bl / cl / gl，並和只有一個子音的字分辨。", ["fr、dr、tr：frog、drum、train", "sn、sp、st：snail、spoon、star", "bl、cl、gl：blocks、clock、glasses"],
      { a: "frog：f 和 r 連在一起，fr。", b: "Listen. F-r, fr. Frog starts with fr.", c: "Listen. Does frog start with two sounds? Yes! Does dog? No.", life: "看到青蛙 Frog! fr 看到星星 Star! st" }),
    structLesson("D9", "🎂", "魔法 e", "認識字尾不發音的 e（C-V-C-e），它讓中間的母音唸出自己的名字。", ["cake、bike、kite、nose、five、nine"],
      { a: "cake 最後的 e 不發音，它讓 a 唸出名字。", b: "Listen. Cake. The silent e makes a say its name.", c: "Listen. Does cake end with a silent e? Yes! Does cat? No.", life: "看到蛋糕 Cake! 騎腳踏車 Bike!" }),
    structLesson("D10", "🐝", "兩個母音", "認識兩個母音相連（ee、ai、oa、ea），唸成一個長音。", ["ee：bee、sheep、cheese", "ai：train、snail", "oa：boat", "ea：tea"],
      { a: "bee：兩個 e 在一起，唸長長的 ee。", b: "Listen. Two e's say ee. Bee!", c: "Listen. Does bee have two vowels together? Yes! Does cat? No.", life: "看到蜜蜂 Bee! 看到火車 Train!" }),
    structLesson("D11", "🚗", "r 控制母音", "認識母音後面接 r，聲音會改變：ar（car）、or（fork）、er／ir／ur（bird）。", ["ar：car、star、jar", "or：fork、corn、horse", "er／ir／ur：bird、shirt、turtle"],
      { a: "car：a 加 r，唸 ar。", b: "Listen. A and r make ar. Car!", c: "Listen. Does car have the ar sound? Yes! Does cat? No.", life: "看到車子 Car! 吃玉米 Corn!" })
  );
  // 單元地圖與教材卡
  var AG = W.MFE_AGES, a5 = AG.filter(function (a) { return a.age === 5; })[0], a6 = AG.filter(function (a) { return a.age === 6; })[0];
  a5.units = ["C1", "C2", "C3", "C4", "C5", "C6", "C9", "C10", "C11", "C7", "C8"];
  a5.focus = "學完 26 個字母的聲音（直接教學：先看正例、再看反例，判斷這個字是不是這個聲音），再聽出押韻、說「我有…」。";
  a5.how = "題型：教學頁（正例＋反例）、✔/✖ 判斷、描字母、押韻配對。";
  a6.units = ["D1", "D2", "D3", "D7", "D8", "D9", "D10", "D11", "D4", "D5", "D6"];
  a6.focus = "把聲音拼成字，學完主要拼讀結構（CVC、雙字母、混合音、魔法 e、母音組合、r 控制母音），再認常見字、讀短句、對話、排故事。";
  a6.how = "題型：教學頁（正例＋反例）、✔/✖ 判斷、拼字、補字母、找字、句子配圖、對話選答。";
  var AGEOF = {}; AG.forEach(function (a) { a.units.forEach(function (u) { AGEOF[u] = a.age; }); });
  W.MFE_LESSONS.forEach(function (l) { l.age = AGEOF[l.id] || l.age; });
  var ORDER = []; AG.forEach(function (a) { ORDER = ORDER.concat(a.units); });
  W.MFE_LESSONS.sort(function (x, y) { return ORDER.indexOf(x.id) - ORDER.indexOf(y.id); });
  Object.assign(W.MFE_LESSON_CARDS, { C9: { pat: "sound", cat: "ph9" }, C10: { pat: "sound", cat: "ph10" }, C11: { pat: "sound", cat: "ph11" },
    D7: { pat: "this_is", cat: "st7" }, D8: { pat: "this_is", cat: "st8" }, D9: { pat: "this_is", cat: "st9" }, D10: { pat: "this_is", cat: "st10" }, D11: { pat: "this_is", cat: "st11" } });
  ["C9", "C10", "C11", "D7", "D8", "D9", "D10", "D11"].forEach(function (u) { W.MFE_MEDIA[u] = { songs: [], books: [] }; });

  // ---------- 單元練習規格 ----------
  A.C9 = { tip: "", bank: ["l_j", "l_k", "l_v"], lex: { j: ["juice", "jam", "jacket", "jellyfish"], k: ["kite", "keys", "kiwi", "king"], v: ["van", "vase", "violin", "vest"] }, plan: ["disc", "disc", "disc"] };
  A.C10 = { tip: "", bank: ["l_w", "l_y", "l_z"], lex: { w: ["watermelon", "water", "whale", "waxapple"], y: ["c_yellow", "yoyo", "yarn", "yogurt"], z: ["zebra", "zipper", "zero", "zucchini"] }, plan: ["disc", "disc", "disc"] };
  A.C11 = { tip: "", bank: ["l_q", "l_x"], lex: { q: ["queen", "quilt", "quarter", "question"], x: ["box", "fox", "n6", "ax", "ox"] }, plan: ["disc", "disc", "disc"] };
  A.D7 = { tip: "", words: ["shoes", "chair", "b_tooth"], plan: ["disc", "disc", "disc"] };
  A.D8 = { tip: "", words: ["frog", "snail", "clock"], plan: ["disc", "disc", "disc"] };
  A.D9 = { tip: "", words: ["cake", "bike", "kite"], plan: ["disc", "disc", "disc"] };
  A.D10 = { tip: "", words: ["bee", "train", "boat"], plan: ["disc", "disc", "disc"] };
  A.D11 = { tip: "", words: ["car", "fork", "bird"], plan: ["disc", "disc", "disc"] };
  // 綜合複習納入新單元
  A.RC.review = a5.units.filter(function (u) { return u !== "RC"; });
  A.RD.review = a6.units.slice();
})();
