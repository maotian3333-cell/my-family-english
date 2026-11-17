// v2.11 新增 4 個單元（4 歲）：動作、感受、位置、大小冷熱。接在 phonics.js 之後、js/kid.js 之前載入。
(function () {
  var W = window, A = W.MFE_ACT;
  function w(id, en, zh, pic) { return [id, en, zh, "svg:" + pic, "", "", ""]; }
  W.MFE_PATTERNS.push(
    { id: "i_can", name: "I can ___.", zh: "我會___", stem: "I can", ask: "What can you do?", stageA: false, hint: "你先做動作說 I can jump，孩子跟著做就算參與" },
    { id: "simon", name: "Simon says, ___!", zh: "Simon 說：___！", stem: "Simon says,", ask: null, stageA: false, hint: "動作指令遊戲：只做 Simon says 開頭的指令；孩子做動作不用開口" },
    { id: "im", name: "I'm ___.", zh: "我覺得___", stem: "I'm", ask: "How are you?", stageA: false, hint: "用臉部表情示範；孩子指表情或模仿就算回應" },
    { id: "is_prep", name: "The ball is ___ the box.", zh: "球在盒子___", stem: "The ball is", ask: "Where is the ball?", stageA: false, hint: "用真的球和盒子：放進去、放上面、放下面，邊做邊說" }
  );
  W.MFE_WORD_CATS.push(
    { id: "verbs", icon: "🏃", name: "動作", words: [w("vb_run", "run", "跑步", "vb_run"), w("vb_jump", "jump", "跳", "vb_jump"), w("vb_walk", "walk", "走路", "vb_walk"), w("vb_sit", "sit", "坐下", "vb_sit"),
      w("vb_stand", "stand", "站起來", "vb_stand"), w("vb_clap", "clap", "拍手", "vb_clap"), w("vb_wave", "wave", "揮手", "vb_wave"), w("vb_sleep", "sleep", "睡覺", "vb_sleep")] },
    { id: "feelings", icon: "😊", name: "感受", words: [w("em_happy", "happy", "開心", "em_happy"), w("em_sad", "sad", "難過", "em_sad"), w("em_angry", "angry", "生氣", "em_angry"),
      w("em_sleepy", "sleepy", "想睡", "em_sleepy"), w("em_hungry", "hungry", "肚子餓", "em_hungry"), w("em_scared", "scared", "害怕", "em_scared")] },
    { id: "preps", icon: "📦", name: "位置", words: [w("pp_in", "in", "裡面", "pp_in"), w("pp_on", "on", "上面", "pp_on"), w("pp_under", "under", "下面", "pp_under")] },
    { id: "adjs", icon: "🔥", name: "大小冷熱", words: [w("aj_big", "big", "大", "aj_big"), w("aj_small", "small", "小", "aj_small"), w("aj_hot", "hot", "熱（燙）", "aj_hot"), w("aj_cold", "cold", "冷", "aj_cold")] }
  );
  function lesson(o) {
    var d = {
      twoKids: "二寶看你做動作、看表情就好；大寶可以當小老師，下指令給弟妹。",
      resist: ["孩子不想就停，換成你自己做動作給他看，明天再試。", "答錯不糾正，你示範一次，再繼續。"],
      paper: "三版學習單內容相似、順序不同；先看圖再做題。",
      review: "隔幾天換另一版學習單或互動版再玩一次。",
      kid: { hero: "小怪獸", buttons: "大圖卡", game: "看一看、玩一玩、找一找", palette: "方案 C", note: "不計分、不扣分。" }
    };
    for (var k in o) d[k] = o[k];
    return d;
  }
  W.MFE_LESSONS.push(
    lesson({ id: "B7", stage: "B", icon: "🏃", title: "動作",
      goal: "你說動作詞（run、jump、sit…）時，孩子能做出動作或指出對應的圖；玩 Simon says 能跟著做。",
      phrases: ["i_can", "jump", "clap", "sit_down", "stand_up", "wave_hand"],
      words: ["run 跑、jump 跳、walk 走、sit 坐、stand 站、clap 拍手、wave 揮手、sleep 睡覺"],
      scripts: { A: "我們來跳一跳！跳是 jump。你說 jump，我們一起跳。（只夾一個英文動詞）", B: "Look! Jump! 我們一起 jump。I can jump. 你也可以 jump！", C: "Simon says, jump! Simon says, clap! Sit down. (no Simon, don't move!) Good listening!" },
      puppet: ["I can jump!", "Simon says!", "Again!"],
      steps: ["先做動作再說詞：一邊跳一邊說 Jump!。", "孩子跟著做就算參與，不用逼他開口。", "加入 Simon says：只有你說 Simon says 才做動作；說錯讓你「輸」，孩子會很開心。", "每次只學 2 到 3 個動作，輪流換。", "孩子抗拒時改成你自己做，或用玩偶一起做。"],
      game: "「Simon says」：你下指令（Simon says, jump!），孩子做動作；偶爾不說 Simon says 讓孩子停住。", song: "自編動作韻文（見歌曲區）。", book: "動作主題的繪本，邊讀邊做。",
      life: "公園裡跑跳時說 Run! Jump!；起床 Stand up!；睡前 Sleep!。", quick: "做一個動作，說一次詞", observe: "你說動作詞，孩子會做出動作＝聽懂了；自己做動作並說出詞＝主動使用。" }),
    lesson({ id: "B8", stage: "B", icon: "😊", title: "感受",
      goal: "能看表情圖說出或指出 happy、sad、angry、sleepy、hungry、scared，並聽懂 How are you? / I'm happy.",
      phrases: ["how_are_you", "im_fine", "i_feel", "its_okay", "need_hug"],
      words: ["happy 開心、sad 難過、angry 生氣、sleepy 想睡、hungry 肚子餓、scared 害怕"],
      scripts: { A: "你現在開心嗎？開心是 happy。你笑一個，happy！", B: "How are you? I'm happy! 你看，哭哭的臉是 sad。你呢？", C: "How are you today? I'm hungry. Are you hungry? Yes! Let's eat." },
      puppet: ["I'm happy!", "I'm sad.", "Hug!"],
      steps: ["對著鏡子做表情，說 I'm happy!。", "用玩偶示範各種表情，孩子指或模仿。", "孩子哭或生氣時，用這些詞命名他的感受：You're sad. Hug?", "每次只學 2 到 3 個感受。", "不要求孩子說，指或模仿就算會。"],
      game: "「猜表情」：你做表情，孩子指出對應的圖；再換孩子做表情給你猜。", song: "自編感受韻文（見歌曲區）。", book: "情緒主題繪本，邊讀邊模仿表情。",
      life: "肚子餓 I'm hungry；想睡 I'm sleepy；看到孩子開心 You're happy!。", quick: "做一個表情，說 I'm happy!", observe: "孩子能指出表情圖＝聽懂；情緒來時能說出一個詞＝開始表達。" }),
    lesson({ id: "B9", stage: "B", icon: "📦", title: "位置：in on under",
      goal: "用真的球和盒子，聽到 in、on、under 時，孩子能把球放到正確位置，或指出對應的圖。",
      phrases: ["where_is", "show_me", "look_at"],
      words: ["in 裡面、on 上面、under 下面（先 in 和 on，之後加 under）"],
      scripts: { A: "球在盒子裡面。裡面是 in。球在 in 盒子。", B: "Where is the ball? The ball is in the box! 我們把球放 on 盒子上面。", C: "Where is the ball? Is it in the box? No. It's on the box. Now put it under the table." },
      puppet: ["In!", "On!", "Under!"],
      steps: ["拿真的球和盒子，放進去說 In!。", "放上去說 On!，放到桌子下說 Under!。", "換孩子照你說的放。", "孩子放對時說 Yes, in the box!。", "放錯不糾正，你再示範一次。"],
      game: "「藏球」：把球藏在盒子裡、上面或下面，讓孩子找；說 It's in the box!。", song: "自編位置韻文（見歌曲區）。", book: "找東西的翻翻書，每頁問 Where is it?。",
      life: "整理玩具 Put it in the box!；坐在椅子上 on the chair。", quick: "把球放進盒子，說 In!", observe: "孩子能依指令放對位置＝聽懂；自己說出 in/on＝主動使用。" }),
    lesson({ id: "B10", stage: "B", icon: "🔥", title: "大小冷熱",
      goal: "能聽懂並指出 big、small、hot、cold，並在生活中一起使用（Careful, it's hot!）。",
      phrases: ["big_small", "careful_hot", "its_color", "look_at"],
      words: ["big 大、small 小、hot 熱（燙）、cold 冷"],
      scripts: { A: "這個大大的，big。這個小小的，small。", B: "Look! Big apple. Small apple. It's big! It's small!", C: "Is it big or small? It's big. Careful, it's hot! Brr, it's cold." },
      puppet: ["Big!", "Small!", "Hot!"],
      steps: ["拿兩個大小不同的東西，說 Big! Small!。", "吃飯時說 Hot! Careful!；拿冰塊說 Cold!。", "讓孩子用手指指大的或小的。", "孩子指對時說 Yes, it's big!。", "每次只學 2 個對比詞（big/small 或 hot/cold）。"],
      game: "「大小排排站」：把玩具排成大和小，說 It's big! It's small!。", song: "自編大小韻文（見歌曲區）。", book: "對比主題繪本（大小、冷熱）。",
      life: "洗澡水 Hot! Cold!；吃飯 Careful, it's hot!；看大象 Big!。", quick: "拿兩個大小不同的東西，說 Big! Small!", observe: "孩子能指出大的／小的＝聽懂；自己說 hot 提醒你＝主動使用。" })
  );
  Object.assign(W.MFE_LESSON_CARDS, { B7: { pat: "i_can", cat: "verbs" }, B8: { pat: "im", cat: "feelings" }, B9: { pat: "is_prep", cat: "preps" }, B10: { pat: "its", cat: "adjs" } });
  A.B7 = { tip: "先做動作再說詞，孩子跟著做就好。", say: "Simon says, {w}!", bank: ["vb_run", "vb_jump", "vb_walk", "vb_sit", "vb_stand", "vb_clap", "vb_wave", "vb_sleep"], plan: ["pick", "match", "dots"] };
  A.B8 = { tip: "你先做表情，孩子指或模仿。", say: "I'm {w}.", bank: ["em_happy", "em_sad", "em_angry", "em_sleepy", "em_hungry", "em_scared"], plan: ["pick", "match", "dots"] };
  A.B9 = { tip: "用真的球和盒子示範。", say: "The ball is {w} the box.", bank: ["pp_in", "pp_on", "pp_under"], plan: ["pick", "match", "dots"] };
  A.B10 = { tip: "拿兩個東西對比著說。", say: "It's {w}.", bank: ["aj_big", "aj_small", "aj_hot", "aj_cold"], plan: ["pick", "match", "dots"] };
  W.MFE_MEDIA.B7 = { songs: [{ id: "own_b7", kind: "own", t: "Action Chant", zh: "動作韻文", act: "每說一句就做動作，最後大家一起 sit down。", lyrics: "Run, run, run!\nJump, jump, jump!\nClap, clap, clap!\nSit down. Sit down. Stand up!" }], books: [] };
  W.MFE_MEDIA.B8 = { songs: [{ id: "own_b8", kind: "own", t: "How Are You Chant", zh: "感受韻文", act: "每句配上臉部表情，孩子模仿。", lyrics: "How are you? How are you?\nI'm happy! I'm happy!\nHow are you? How are you?\nI'm sleepy. I'm sleepy." }], books: [] };
  W.MFE_MEDIA.B9 = { songs: [{ id: "own_b9", kind: "own", t: "In On Under Chant", zh: "位置韻文", act: "用球和盒子，說到哪個詞就放到哪裡。", lyrics: "Ball in the box. In, in, in!\nBall on the box. On, on, on!\nBall under the table. Under, under, under!" }], books: [] };
  W.MFE_MEDIA.B10 = { songs: [{ id: "own_b10", kind: "own", t: "Big Small Chant", zh: "大小韻文", act: "說 big 時雙手張大，說 small 時縮小。", lyrics: "Big, big, big!\nSmall, small, small!\nHot, hot, hot! Careful!\nCold, cold, cold! Brr!" }], books: [] };
  // 單元地圖
  var AG = W.MFE_AGES, a4 = AG.filter(function (a) { return a.age === 4; })[0];
  a4.units = a4.units.concat(["B7", "B8", "B9", "B10"]);
  a4.name = "4 歲・單字、動作與句框";
  a4.focus = "只換一個詞，說出完整的句子；認識顏色、動物、身體、數字 1 到 5，也學動作、感受、位置與大小冷熱。";
  var AGEOF = {}; AG.forEach(function (a) { a.units.forEach(function (u) { AGEOF[u] = a.age; }); });
  W.MFE_LESSONS.forEach(function (l) { l.age = AGEOF[l.id] || l.age; });
  var ORDER = []; AG.forEach(function (a) { ORDER = ORDER.concat(a.units); });
  W.MFE_LESSONS.sort(function (x, y) { return ORDER.indexOf(x.id) - ORDER.indexOf(y.id); });
  A.RB.review = a4.units.slice();
})();
