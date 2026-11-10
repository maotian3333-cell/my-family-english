// 紙本互動學習單：9 個單元 × 3 個年齡段（2–3、3–4、4–5 歲）。
// 網頁可直接「列印／存成 PDF」，也可用 tools/build-pdfs.sh 預先產生 PDF 放在 worksheets/。
// 活動類型：sticker 貼貼紙｜color 塗色｜match 連連看｜circle 圈圈看｜trace 描線｜order 排順序｜cut 剪卡片｜chart 貼紙表
window.MFE_SHEETS = (function () {
  var AGES = { 2: "2–3 歲", 3: "3–4 歲", 4: "4–5 歲" };
  var TIPS = {
    2: "這個年齡主要練手指力量和「聽到就有反應」。貼歪、塗出線、亂貼都算參與，不用要求貼準；英文由大人邊玩邊說，孩子不必開口。",
    3: "這個年齡開始能用手指指出、用蠟筆畫線。孩子用手指著答案也算完成，不必拿筆；說對說錯都不糾正，只用正確說法自然重複一次。",
    4: "這個年齡可以配對、排順序，也願意開口。請讓孩子自己選要玩哪一題，願意說再說，不強迫書寫、不計分。"
  };
  var K = "#3E4A59", ST = 'fill="#fff" stroke="' + K + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
  function sv(inner) { return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>"; }
  function starPath(cx, cy, ro, ri) { var s = []; for (var i = 0; i < 10; i++) { var r = i % 2 ? ri : ro, a = (-90 + i * 36) * Math.PI / 180; s.push((cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1)); } return "M" + s.join("L") + "Z"; }
  var SHAPES = {
    circle: sv('<circle cx="60" cy="60" r="46" ' + ST + "/>"),
    square: sv('<rect x="18" y="18" width="84" height="84" rx="12" ' + ST + "/>"),
    triangle: sv('<path d="M60 14L106 100H14Z" ' + ST + "/>"),
    star: sv('<path d="' + starPath(60, 64, 50, 24) + '" ' + ST + "/>"),
    heart: sv('<path d="M60 102C20 74 12 40 34 26C48 17 58 26 60 35C62 26 72 17 86 26C108 40 100 74 60 102Z" ' + ST + "/>"),
    sun: sv('<circle cx="60" cy="60" r="26" ' + ST + '/><path d="M60 8V22M60 98V112M8 60H22M98 60H112M23 23L33 33M87 87L97 97M97 23L87 33M33 87L23 97" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>'),
    moon: sv('<path d="M78 14A48 48 0 1 0 104 84A40 40 0 1 1 78 14Z" ' + ST + "/>"),
    bubble: sv('<circle cx="60" cy="60" r="44" ' + ST + '/><path d="M38 50A24 24 0 0 1 52 36" fill="none" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>'),
    cup: sv('<path d="M24 28H92L84 102H32Z" ' + ST + '/><path d="M92 42C114 42 114 74 88 74" fill="none" stroke="' + K + '" stroke-width="3.5" stroke-linecap="round"/>'),
    car: sv('<path d="M8 80V62C8 55 13 50 20 50H34L48 30H80L96 50H104C111 50 114 55 114 62V80Z" ' + ST + '/><circle cx="34" cy="82" r="13" ' + ST + '/><circle cx="90" cy="82" r="13" ' + ST + "/>"),
    house: sv('<path d="M14 58L60 16L106 58V104H14Z" ' + ST + '/><rect x="48" y="70" width="24" height="34" rx="4" ' + ST + "/>")
  };
  function isText(x) { return /^[A-Za-z]/.test(x); }
  function icon(x, extra) {
    if (x.indexOf("art:") === 0) return '<span class="ic svg ' + (extra || "") + '">' + (window.MFE_SVG || {})[x.slice(4)] + "</span>";
    if (x.indexOf("shape:") === 0) return '<span class="ic svg shape ' + (extra || "") + '">' + SHAPES[x.slice(6)] + "</span>";
    if (isText(x)) return '<span class="tx">' + x + "</span>";
    return '<span class="ic ' + (extra || "") + '">' + x + "</span>";
  }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ----- 活動建構 ----- */
  function S(title, say, scene, n, how) { return { k: "sticker", title: title, say: say, scene: scene, n: n, how: how }; }
  function C(title, say, items, how) { return { k: "color", title: title, say: say, items: items, how: how }; }
  function M(title, say, pairs, shadow, how) { return { k: "match", title: title, say: say, pairs: pairs, shadow: shadow, how: how }; }
  function Ci(title, rows, how) { return { k: "circle", title: title, rows: rows, how: how }; }
  function T(title, say, from, to, how) { return { k: "trace", title: title, say: say, from: from, to: to, how: how }; }
  function O(title, say, steps, how) { return { k: "order", title: title, say: say, steps: steps, how: how }; }
  function X(title, say, cards, how) { return { k: "cut", title: title, say: say, cards: cards, how: how }; }
  function H(title, say, n, label, how) { return { k: "chart", title: title, say: say, n: n, label: label, how: how }; }

  var SPEC = {
    A1: {
      2: [S("餵小熊吃水果", "Give me an apple, please. Here you are!", "art:teddy", 4, "把任何水果貼紙（或畫一個圓圈）貼進小熊的盤子。每貼一個，你說 Here you are。"),
          C("幫水果塗顏色", "Apple! Banana!", ["art:apple", "art:banana"], "塗色時只說水果名稱：Apple! Banana!")],
      3: [M("水果影子連連看", "Apple! Banana! Grapes! Orange!", [["art:apple", "art:apple"], ["art:banana", "art:banana"], ["art:grapes", "art:grapes"], ["art:orange", "art:orange"]], true, "把水果和牠的影子連起來。邊連邊說水果名稱。"),
          Ci("你說，孩子圈", [{ say: "Give me a banana, please.", opts: ["art:apple", "art:banana", "art:grapes"], ans: 1 }, { say: "Give me grapes, please.", opts: ["art:grapes", "art:orange", "art:apple"], ans: 0 }, { say: "Give me an orange, please.", opts: ["art:banana", "art:grapes", "art:orange"], ans: 2 }], "你讀出灰色句子，孩子圈出（或用手指出）水果，再把水果遞給他說 Here you are。")],
      4: [M("說對的話", "", [["🙋", "Give me ___, please."], ["🎁", "Here you are."], ["🙏", "Thank you."], ["😊", "You're welcome."]], false, "圖畫是在做什麼？請孩子把圖和對應的話連起來，你念一遍。"),
          X("水果點餐卡（剪下來玩）", "Give me an apple, please.", [["art:apple", "an apple"], ["art:banana", "a banana"], ["art:grapes", "grapes"], ["art:orange", "an orange"], ["art:strawberry", "a strawberry"], ["art:watermelon", "watermelon"]], "剪下卡片，孩子指一張，你說 Give me ___, please，孩子接最後一個詞。")]
    },
    A2: {
      2: [S("起跑線貼貼紙", "Ready, set, go!", "🏁", 3, "每貼一個貼紙，你就說 Ready, set, go! 然後帶孩子跑一小段。"),
          C("紅綠燈塗色", "Go! Stop!", ["shape:circle", "shape:circle"], "一個塗綠色（Go!），一個塗紅色（Stop!）。")],
      3: [T("帶小熊跑到終點", "Ready, set, go!", "art:bear", "🏁", "孩子用手指或蠟筆沿虛線走，起跑前你問 Are you ready?"),
          Ci("Go 還是 Stop？", [{ say: "Go!", opts: ["🔴", "🟢"], ans: 1 }, { say: "Stop!", opts: ["🟢", "🔴"], ans: 1 }, { say: "Go!", opts: ["🟢", "🔴", "🟡"], ans: 0 }], "你喊 Go 或 Stop，孩子圈出對應顏色，也可以全身動作一起做。")],
      4: [M("說對的話", "", [["🏁", "Ready, set, go!"], ["🙋", "My turn."], ["👉", "Your turn."], ["❓", "Are you ready?"]], false, "圖畫是在做什麼？請孩子把圖和對應的話連起來。"),
          O("遊戲前的三句話", "Are you ready? Yes, I'm ready! Ready, set, go!", [["❓", "Are you ready?"], ["🙋", "Yes, I'm ready!"], ["🏁", "Ready, set, go!"]], "剪下三張卡片，依順序貼到 1、2、3 的格子裡，再一起演一遍。")]
    },
    A3: {
      2: [S("太陽出來了", "Good morning!", "☀️", 4, "貼上太陽或黃色的貼紙。每貼一個，你說 Good morning!"),
          C("太陽與月亮", "Good morning! Good night!", ["shape:sun", "shape:moon"], "太陽塗黃色、月亮塗藍色，邊塗邊說 Good morning、Good night。")],
      3: [M("早上與晚上", "Good morning! Good night! Bye-bye!", [["☀️", "art:bowl"], ["🌙", "art:bed"], ["👋", "art:door"]], false, "太陽配早餐、月亮配床、揮手配門。連的時候你說對應的英文。"),
          Ci("聽一聽，圈一圈", [{ say: "Good morning!", opts: ["☀️", "🌙"], ans: 0 }, { say: "Good night.", opts: ["☀️", "🌙"], ans: 1 }, { say: "Bye-bye!", opts: ["art:plate", "👋", "art:bed"], ans: 1 }], "你說英文，孩子指出或圈出對應的圖。")],
      4: [M("什麼時候說？", "", [["☀️", "Good morning."], ["🌙", "Good night."], ["🙋", "Hello!"], ["art:door", "Bye-bye!"]], false, "孩子連好後，一起說一遍，再去門口真的用一次。"),
          H("打招呼貼紙表", "Hello! Good morning!", 10, "孩子主動打招呼，或回應你的招呼，就貼一個貼紙。", "不用每天，想到就貼；貼滿 10 個就慶祝一下。")]
    },
    A4: {
      2: [S("餵小熊吃飯", "Yummy!", "art:teddy", 4, "貼上食物貼紙，每貼一個你說 Yummy! 也可以真的拿食物給孩子看。"),
          C("杯子和蘋果", "Milk! Apple!", ["shape:cup", "art:apple"], "杯子塗成牛奶色，蘋果塗紅色，邊塗邊說名稱。")],
      3: [M("食物影子連連看", "Milk, bread, rice, egg.", [["art:milk", "art:milk"], ["art:bread", "art:bread"], ["art:rice", "art:rice"], ["art:egg", "art:egg"]], true, "把食物和牠的影子連起來。邊連邊說：Milk! Bread! Rice! Egg!"),
          Ci("你說，孩子圈", [{ say: "Milk, please.", opts: ["art:milk", "art:bread", "art:rice"], ans: 0 }, { say: "More, please.", opts: ["art:plate", "🙋", "💤"], ans: 1 }, { say: "All done.", opts: ["😋", "✅", "😢"], ans: 1 }], "也可以真的把食物放在桌上，孩子用拿的。")],
      4: [O("吃飯的順序", "Let's eat! Yummy! More, please. All done.", [["art:plate", "Let's eat!"], ["😋", "Yummy!"], ["🙋", "More, please."], ["✅", "All done."]], "剪下四張卡片，依吃飯的順序貼進格子，邊貼邊說。"),
          H("好好吃貼紙表", "Yummy!", 10, "孩子吃得開心，或主動說 More, please，就貼一個。", "吃不完也貼，重點是氣氛愉快。")]
    },
    A5: {
      2: [S("泡泡貼貼", "Wash, wash, wash!", "🛁", 5, "每貼一顆泡泡貼紙，你說 Wash, wash, wash! 也可以在洗澡時玩。"),
          C("泡泡和月亮", "Bubbles! Good night!", ["shape:bubble", "shape:moon"], "泡泡可以塗成各種顏色；月亮塗成藍色，說 Good night。")],
      3: [T("帶小熊去睡覺", "Time for bed.", "🛁", "art:bed", "沿虛線走到床上，到了你說 Time for bed. Good night."),
          Ci("聽一聽，圈一圈", [{ say: "Brush, brush, brush.", opts: ["art:toothbrush", "art:apple", "art:car"], ans: 0 }, { say: "Bath time!", opts: ["🛁", "🏃", "art:plate"], ans: 0 }, { say: "Time for bed.", opts: ["art:ball", "art:bed", "art:car"], ans: 1 }], "洗澡前後用，也可以在睡前坐在床上玩。")],
      4: [O("睡前的順序", "Wash your hands. Brush your teeth. Bath time! Time for bed.", [["art:soap", "Wash"], ["art:toothbrush", "Brush"], ["🛁", "Bath time!"], ["art:bed", "Time for bed."]], "剪下四張卡片，依睡前的順序貼進格子。可以把完成的順序貼在浴室牆上。"),
          H("睡前貼紙表", "Good night!", 10, "孩子照順序完成睡前準備，就貼一個。", "孩子不想做時不要硬貼，下一次再說。")]
    },
    A6: {
      2: [S("把玩具送回箱子", "Put it here.", "📦", 4, "把貼紙當成玩具「放進」箱子。每貼一個你說 Put it here。"),
          C("積木塗顏色", "Blocks! Clean up!", ["shape:square", "shape:triangle"], "一邊塗色一邊說 Blocks! 收玩具時也拿真的積木說一遍。")],
      3: [M("玩具影子連連看", "Teddy bear, car, blocks.", [["art:teddy", "art:teddy"], ["art:car", "art:car"], ["art:blocks", "art:blocks"], ["art:ball", "art:ball"]], true, "把玩具和牠的影子連起來，也可以順便說 Put it here。"),
          Ci("聽指令，圈一圈", [{ say: "Clap your hands.", opts: ["👏", "🦶", "😴"], ans: 0 }, { say: "Jump!", opts: ["🏃", "🦘", "🛌"], ans: 1 }, { say: "Sit down.", opts: ["art:chair", "🏃", "art:apple"], ans: 0 }], "聽完全身做動作，再圈出對應的圖。")],
      4: [X("動作指令卡（剪下來玩）", "Clap your hands. Jump! Sit down. Stand up.", [["👏", "Clap your hands."], ["🦘", "Jump!"], ["art:chair", "Sit down."], ["🧍", "Stand up."], ["🛑", "Stop."], ["🏃", "Go."]], "剪下卡片放進盒子，孩子抽一張，你念，大家一起做；也可以換孩子念。"),
          H("收玩具貼紙表", "Good job!", 10, "孩子收完玩具，或收了一部分，就貼一個。", "只收一個也貼。")]
    },
    A7: {
      2: [S("鞋鞋貼貼", "Shoes on.", "art:shoes", 4, "貼上鞋子貼紙，穿鞋前你說 Shoes on。"),
          C("小汽車和房子", "Let's go! We're home!", ["shape:car", "shape:house"], "車子塗成喜歡的顏色，邊塗邊說 Let's go! 房子說 We're home!")],
      3: [T("小車回家", "Let's go! We're home!", "art:car", "🏠", "沿虛線開車回家，出發說 Let's go! 到家說 We're home!"),
          Ci("聽一聽，圈一圈", [{ say: "Shoes on.", opts: ["art:shoes", "art:bread", "art:teddy"], ans: 0 }, { say: "Seat belt on.", opts: ["art:car", "🛁", "art:apple"], ans: 0 }, { say: "We're home!", opts: ["🏠", "🏫", "🏞️"], ans: 0 }], "出門前在玄關玩，孩子比較容易連結。")],
      4: [O("出門的順序", "Shoes on. Hold my hand. Seat belt on. We're home!", [["art:shoes", "Shoes on."], ["🤝", "Hold my hand."], ["art:car", "Seat belt on."], ["🏠", "We're home!"]], "剪下四張卡片，依出門到回家的順序貼進格子。可以貼在玄關。"),
          X("出門提示卡（貼在玄關）", "Shoes on. Let's go!", [["art:shoes", "Shoes on."], ["🤝", "Hold my hand."], ["art:car", "Seat belt on."], ["🏠", "We're home!"]], "剪下貼在門邊，出門前由孩子選一張，大家一起做。")]
    },
    A8: {
      2: [S("抱抱小熊", "It's okay.", "art:teddy", 3, "貼上愛心貼紙，每貼一個，你抱孩子一下說 It's okay。"),
          C("愛心和星星", "I love you! Wow!", ["shape:heart", "shape:star"], "愛心塗成喜歡的顏色，說 I love you；星星說 Wow!")],
      3: [Ci("聽一聽，圈表情", [{ say: "Wow!", opts: ["😮", "😴", "😢"], ans: 0 }, { say: "It's okay. (小熊哭了)", opts: ["😢", "😊", "😮"], ans: 0 }, { say: "Deep breath.", opts: ["😤", "😴", "😊"], ans: 0 }], "你可以搭配自己的表情；說 Deep breath 時真的一起深呼吸。"),
          T("帶小熊找朋友", "Me too! Let's play!", "art:teddy", "art:rabbit", "沿虛線走到朋友身邊，到了你說 Let's play! Me too!")],
      4: [M("說對的話", "", [["😮", "Wow!"], ["😢", "It's okay."], ["🤗", "I'm here."], ["😤", "Deep breath."]], false, "看表情，想一想這時候可以說什麼，再連起來。"),
          H("愛心貼紙表", "Gentle! It's okay!", 10, "孩子溫柔對待別人（或安慰別人），就貼一個。", "孩子是被安撫的人時不貼，只抱抱。")]
    },
    A9: {
      2: [S("你做到了", "Good job!", "⭐", 5, "孩子做好一件事（收玩具、吃完飯）就貼一顆星，說 Good job!"),
          C("星星和愛心", "Good job! Try again!", ["shape:star", "shape:heart"], "塗色時說 Good job，鼓勵就好。")],
      3: [T("爬到星星那裡", "Try again! Good job!", "art:bear", "⭐", "沿虛線走到星星，中途走偏就說 Try again，到了說 Good job!"),
          Ci("聽一聽，圈一圈", [{ say: "Careful! It's hot!", opts: ["🔥", "art:teddy", "🌈"], ans: 0 }, { say: "Good job!", opts: ["👍", "😢", "😴"], ans: 0 }, { say: "Wait a minute.", opts: ["⏳", "🏃", "art:apple"], ans: 0 }], "Careful 只在真的需要時說，這裡是遊戲，語氣放輕鬆。")],
      4: [M("什麼時候說？", "", [["⭐", "Good job!"], ["💪", "Try again."], ["⚠️", "Careful!"], ["⏳", "Wait a minute."]], false, "看圖想想，這時候大人會說什麼，再連起來。"),
          H("你做到了貼紙表", "You did it!", 10, "孩子完成一件事，或試了又試，就貼一個。", "努力過程比結果重要，沒成功也可以貼 Nice try。")]
    }
  };

  /* ----- 活動渲染 ----- */
  function shuffleRight(n) { var a = []; for (var i = n - 1; i >= 0; i--) a.push(i); a.push(a.shift()); return a; }
  function actHtml(a, no, answers) {
    var h = '<section class="act"><h3><span class="no">' + no + "</span>" + esc(a.title) + "</h3>" + (a.how ? '<p class="how">' + esc(a.how) + "</p>" : "");
    if (a.k === "sticker") {
      h += '<div class="stk-scene">' + icon(a.scene, "big") + '<div class="spots">';
      for (var i = 0; i < a.n; i++) h += '<span class="spot"></span>';
      h += "</div></div>";
    } else if (a.k === "color") {
      h += '<div class="outline">' + a.items.map(function (x) { return icon(x, "huge"); }).join("") + "</div>";
    } else if (a.k === "match") {
      var order = shuffleRight(a.pairs.length);
      h += '<div class="match ' + (a.shadow ? "shadow" : "") + '"><div class="col">' + a.pairs.map(function (p) { return '<div class="mi">' + icon(p[0], "big") + '<i class="dot"></i></div>'; }).join("") + '</div><div class="col">' +
        order.map(function (i) { return '<div class="mi r"><i class="dot"></i>' + icon(a.pairs[i][1], "big") + "</div>"; }).join("") + "</div></div>";
      var key = order.map(function (o, idx) { return o; });
      answers.push(a.title + "：" + a.pairs.map(function (p, i) { return (i + 1) + "→" + (order.indexOf(i) + 1); }).join("、"));
    } else if (a.k === "circle") {
      h += a.rows.map(function (r, ri) {
        answers.push("");
        return '<div class="crow"><div class="say">' + (ri + 1) + ". 家長說：" + esc(r.say) + '</div><div class="opts">' + r.opts.map(function (o) { return '<span class="opt">' + icon(o, "big") + "</span>"; }).join("") + "</div></div>";
      }).join("");
      answers.push("__circle:" + a.title + "：" + a.rows.map(function (r) { return r.ans + 1; }).join("、") + "（第幾個）");
    } else if (a.k === "trace") {
      h += '<div class="trace">' + icon(a.from, "big") + '<svg viewBox="0 0 400 100" preserveAspectRatio="none"><path d="M0 50C50 0 100 100 150 50S250 0 300 50S350 100 400 50" fill="none" stroke="#8A99A3" stroke-width="5" stroke-dasharray="1 12" stroke-linecap="round"/></svg>' + icon(a.to, "big") + "</div>";
    } else if (a.k === "order") {
      var n = a.steps.length, rot = n === 3 ? [1, 2, 0] : [2, 0, 3, 1];
      h += '<div class="boxes">' + a.steps.map(function (s, i) { return '<span class="bx"><b>' + (i + 1) + "</b></span>"; }).join("") + '</div><div class="cuts">' +
        rot.map(function (i) { return '<div class="cc">✂ ' + icon(a.steps[i][0], "big") + '<span class="lb">' + esc(a.steps[i][1]) + "</span></div>"; }).join("") + "</div>";
      answers.push("__order:" + a.title + "：" + a.steps.map(function (s) { return s[1]; }).join(" → "));
    } else if (a.k === "cut") {
      h += '<div class="cuts grid3">' + a.cards.map(function (c) { return '<div class="cc">✂ ' + icon(c[0], "big") + '<span class="lb">' + esc(c[1]) + "</span></div>"; }).join("") + "</div>";
    } else if (a.k === "chart") {
      h += '<p class="how"><b>' + esc(a.label) + '</b></p><div class="chart">';
      for (var j = 0; j < a.n; j++) h += '<span class="spot"></span>';
      h += "</div>";
    }
    return h + "</section>";
  }

  function render(unitId, age) {
    var l = (window.MFE_LESSONS || []).filter(function (x) { return x.id === unitId; })[0], acts = (SPEC[unitId] || {})[age];
    if (!l || !acts) return '<p>找不到這份學習單。</p>';
    var answers = [], body = acts.map(function (a, i) { return actHtml(a, i + 1, answers); }).join("");
    var says = acts.map(function (a) { return a.say || (a.rows ? "" : ""); }).filter(Boolean);
    var key = answers.filter(function (x) { return x; }).map(function (x) { return x.replace(/^__\w+:/, "").replace(/^__circle:/, ""); });
    var obs = String(l.observe).split("；");
    var h = '<article class="ws"><header class="ws-head"><div class="ws-t"><span class="ws-ic">' + l.icon + '</span><div><div class="ws-u">' + esc(l.id) + " " + esc(l.title) + '</div><div class="ws-s">My Family English 親子學習單</div></div></div><span class="ws-age">' + AGES[age] + "</span></header>" +
      '<div class="ws-parent"><b>給家長</b>' +
      "<p><b>目標：</b>" + esc(l.goal) + "</p>" +
      (says.length ? "<p><b>今天可以說的英文：</b>" + says.map(esc).join("　／　") + "</p>" : "") +
      "<p><b>這個年齡：</b>" + esc(TIPS[age]) + "</p>" +
      (key.length ? '<p class="key"><b>答案提示：</b>' + key.map(esc).join("；") + "</p>" : "") + "</div>" + body +
      '<section class="act fin"><h3><span class="no">★</span>觀察、延伸與複習</h3><div class="fin-grid"><div><b>觀察（家長勾選）</b>' +
      obs.map(function (o) { return '<p class="ck">□ ' + esc(o) + "</p>"; }).join("") +
      '<p class="ck">□ 孩子今天最有興趣的是：＿＿＿＿＿＿＿＿＿＿</p></div><div><b>複習（做完打勾）</b><p class="ck">□ 隔天自然帶一次</p><p class="ck">□ 3 天後再帶一次</p><p class="ck">□ 1 週後再帶一次</p></div></div>' +
      "<p><b>紙本延伸：</b>" + esc(l.paper) + "</p></section>" +
      '<footer class="ws-foot">My Family English · ' + esc(l.id) + " " + esc(l.title) + " · " + AGES[age] + " · 孩子沒興趣就停，下次再玩</footer></article>";
    return h;
  }
  return { AGES: AGES, SPEC: SPEC, render: render, build: { S: S, C: C, M: M, Ci: Ci, T: T, O: O, X: X, H: H } };
})();
