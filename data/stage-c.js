// 階段 C：字母聲音（接在 sheets-b.js 之後載入）。
// 重點是「聲音」不是「名稱」：s 唸 ssss，不唸 ess。聲音由家長錄（設定頁），沒有錄就用單字語音代替。
(function () {
  window.MFE_SCENES.push({ id: "sounds", icon: "🔤", name: "字母聲音", phrases: [
    { id: "listen_sound", en: "Listen. What sound?", zh: "聽，這是什麼聲音？", when: "放字母聲音給孩子聽之前", main: true },
    { id: "sss_snake", en: "Sss, like a snake.", zh: "ssss，像蛇的聲音", when: "s 的動作：手像蛇一樣扭動" },
    { id: "mmm_yummy", en: "Mmm, yummy!", zh: "mmm，好好吃", when: "m 的動作：摸摸肚子" },
    { id: "starts_with", en: "Sock starts with sss.", zh: "sock 是 sss 開頭", when: "指著圖卡時說，不用要求孩子重複" },
    { id: "again_sound", en: "Listen again.", zh: "再聽一次", when: "孩子沒聽清楚或想再聽時" }
  ]});

  var P = window.MFE_PATTERNS;
  P.push({ id: "sound", name: "/s/, /s/, sock.", zh: "先發出字母聲音，再唸單字", stem: "", ask: null, stageA: false, hint: "先聽家長錄的聲音，再看圖卡唸單字；孩子只要聽就好，不要求跟著唸" });

  // [id, 單字, 中文, 圖, 類型, （未用）, 字母]
  window.MFE_WORD_CATS.push(
    { id: "ph1", icon: "🐍", name: "s a t", words: [["l_s", "sock", "襪子（s 的聲音 /s/）", "svg:socks", "", "", "s"], ["l_a", "apple", "蘋果（a 的聲音 /a/）", "svg:apple", "", "", "a"], ["l_t", "tiger", "老虎（t 的聲音 /t/）", "svg:tiger", "", "", "t"]] },
    { id: "ph2", icon: "🐭", name: "i p n", words: [["l_i", "ice cream", "冰淇淋（i 的聲音 /i/）", "svg:icecream", "u", "", "i"], ["l_p", "pig", "小豬（p 的聲音 /p/）", "svg:pig", "", "", "p"], ["l_n", "nose", "鼻子（n 的聲音 /n/）", "svg:b_nose", "", "", "n"]] },
    { id: "ph3", icon: "🥁", name: "m d c", words: [["l_m", "milk", "牛奶（m 的聲音 /m/）", "svg:milk", "u", "", "m"], ["l_d", "dog", "小狗（d 的聲音 /d/）", "svg:dog", "", "", "d"], ["l_c", "cat", "貓（c 的聲音 /k/）", "svg:cat", "", "", "c"]] }
  );
  Object.assign(window.MFE_LESSON_CARDS, { C1: { pat: "sound", cat: "ph1" }, C2: { pat: "sound", cat: "ph2" }, C3: { pat: "sound", cat: "ph3" } });

  function lesson(o) {
    return Object.assign({ stage: "C", resist: [
      "孩子不想聽就停，改成玩玩偶或唱歌；聲音遊戲只是遊戲，不是練習。",
      "不要要求孩子發出標準的聲音，聽得出差別、能指對圖，就是階段 C 的成功。"
    ], review: "隔天玩同一個聲音的動作遊戲；一週後再加一個新聲音。" }, o);
  }
  window.MFE_LESSONS.push(
    lesson({
      id: "C1", icon: "🐍", title: "字母聲音 s a t",
      goal: "聽到 /s/ /a/ /t/ 的聲音時，孩子能從 3 張圖卡裡指出開頭是這個聲音的那一張（sock、apple、tiger）。",
      phrases: ["listen_sound", "sss_snake", "starts_with", "again_sound"],
      words: ["s（sock 襪子）、a（apple 蘋果）、t（tiger 老虎）", "只教「聲音」，字母名稱（ess、ay、tee）暫時不教"],
      scripts: {
        A: "聽，ssss，像蛇的聲音。sock（襪子）是 ssss 開頭。我們的手像蛇一樣扭一扭。",
        B: "Listen. Sss. 像蛇。Sock starts with sss. 手像蛇一樣扭扭扭。",
        C: "Listen. What sound? Sss, like a snake. Sock starts with sss. Your turn!"
      },
      puppet: ["Sss!", "Sock!", "Your turn?"],
      steps: [
        "先錄好 s 的聲音（設定頁 → 字母聲音），也可以現場發出氣音：不是 ess，是 ssss。",
        "拿出 sock 圖卡：放聲音、做動作（手像蛇扭動），再唸 sock，一次只教一個聲音。",
        "兩個聲音一起玩：s 和 a，把 sock 與 apple 圖卡放在孩子面前，放 sss，讓他指。",
        "指對時說 Yes, sss, sock!；指錯時不糾正，放一次聲音，再指給他看。",
        "孩子想模仿就跟著發聲；不想就不用，聽得懂就是成功。"
      ],
      game: "「聲音尋寶」：放一個聲音，孩子在家裡找一樣開頭是這個聲音的東西（找 s：sock、spoon）。",
      song: "ABC Song（只教字母名稱，不是聲音，可以聽但不要混著教）與自編的聲音韻文，見下方歌曲。",
      book: "挑字母主題但不強迫認字的繪本，一起指圖找開頭聲音。",
      life: "穿襪子（Sock! Sss!）、吃蘋果（Apple! /a/）、看到老虎玩偶（Tiger! /t/）。",
      twoKids: "二寶聽就好，你邊放聲音邊做動作；大寶可以當小老師，替弟妹按播放。",
      observe: "放 /s/ 時看向 sock＝能回應；自己指著襪子發出 sss＝主動使用。",
      paper: "做「聲音小卡」：每張卡一個字母＋一張圖（貼紙），孩子指圖、你放聲音。",
      kid: { hero: "字母怪獸張大嘴巴", buttons: "三張圖卡，按下播放這個聲音", game: "聽聲音，點開頭相同的圖卡（沒有扣分）", palette: "方案 C", note: "聲音要放得輕、短；沒有錄音時用單字語音代替，不要用字母名稱。" },
      quick: "放一次 sss，做蛇的動作"
    }),
    lesson({
      id: "C2", icon: "🐭", title: "字母聲音 i p n",
      goal: "聽到 /i/ /p/ /n/ 的聲音時，孩子能從 3 張圖卡裡指出開頭是這個聲音的那一張（ice cream、pig、nose）。",
      phrases: ["listen_sound", "starts_with", "again_sound"],
      words: ["i（ice cream 冰淇淋；短音 /i/）、p（pig 小豬）、n（nose 鼻子）", "i 的短音比較難，輕輕說就好，不要求標準"],
      scripts: {
        A: "聽，pppp，像吹蠟燭。pig（小豬）是 pppp 開頭。我們一起吹一吹。",
        B: "Listen. Pp, like blowing a candle. Pig starts with pp. 吹一吹。",
        C: "Listen. What sound? Pp, like blowing a candle. Pig starts with pp. Your turn!"
      },
      puppet: ["Pp!", "Pig!", "Nnn!"],
      steps: [
        "每次只教一個聲音：p 像吹蠟燭、n 像飛機的嗡嗡、i 像小老鼠的細聲。",
        "拿圖卡配動作：吹一吹（pig）、摸鼻子嗡嗡（nose）、手指像老鼠（ice cream）。",
        "和 C1 的聲音混著玩，孩子指不出來就回到 C1。",
        "指對時說 Yes! 不用糾正；錯了就再放一次聲音。",
        "孩子不想就停，下次再玩。"
      ],
      game: "「聲音配對」：把 3 張圖卡放桌上，放聲音，孩子把玩偶（或手）放在對應圖卡上。",
      song: "自編的聲音韻文，見下方歌曲。",
      book: "挑字母主題但不強迫認字的繪本，一起指圖找開頭聲音。",
      life: "洗臉時摸鼻子（Nose! Nnn!）、吹泡泡（Pp, pop!）、吃冰淇淋（Ice cream! /i/）。",
      twoKids: "二寶聽你吹氣、嗡嗡聲很有反應；大寶示範動作給弟妹看。",
      observe: "放 /p/ 時看向 pig＝能回應；自己發出 pp 或 nn＝主動使用。",
      paper: "做「聲音小卡」：每張卡一個字母＋一張圖（貼紙），孩子指圖、你放聲音。",
      kid: { hero: "字母怪獸", buttons: "三張圖卡，按下播放聲音", game: "聽聲音，點開頭相同的圖卡（沒有扣分）", palette: "方案 C", note: "i 的聲音容易和 e 混淆，先不要同時教。" },
      quick: "放一次 pp，吹一口氣"
    }),
    lesson({
      id: "C3", icon: "🥁", title: "字母聲音 m d c",
      goal: "聽到 /m/ /d/ /k/ 的聲音時，孩子能從 3 張圖卡裡指出開頭是這個聲音的那一張（milk、dog、cat）。",
      phrases: ["listen_sound", "mmm_yummy", "starts_with", "again_sound"],
      words: ["m（milk 牛奶）、d（dog 小狗；像打鼓）、c（cat 貓；發 /k/，像喀喀聲）", "c 在這裡發 /k/，和字母名稱不同，只教聲音"],
      scripts: {
        A: "聽，mmmm，好好吃。milk（牛奶）是 mmmm 開頭。我們一起摸摸肚子。",
        B: "Listen. Mmm, yummy! Milk starts with mmm. 摸摸肚子。",
        C: "Listen. What sound? Mmm, yummy! Milk starts with mmm. Your turn!"
      },
      puppet: ["Mmm!", "Milk!", "Dog!"],
      steps: [
        "m：摸肚子 mmm；d：用手打鼓 d-d-d；c：手像喀喀聲 k-k-k。",
        "一次只教一個聲音，用圖卡 milk、dog、cat。",
        "和 C1、C2 的聲音混著玩，玩偶也可以參與。",
        "孩子指對就說 Yes! 不評分。",
        "孩子不想聽就改用歌或玩偶。"
      ],
      game: "「喀喀鼓聲」：放聲音，孩子拿鼓棒（湯匙也行）敲出對應的節奏或指圖。",
      song: "自編的聲音韻文，見下方歌曲。",
      book: "挑字母主題但不強迫認字的繪本，一起指圖找開頭聲音。",
      life: "喝牛奶（Milk! Mmm!）、看到狗（Dog! d-d-d）、看到貓（Cat! k-k-k）。",
      twoKids: "二寶聽拍鼓和 mmm 聲；大寶示範動作。",
      observe: "放 /m/ 時看向 milk＝能回應；自己發出 mmm 或 d-d-d＝主動使用。",
      paper: "做「聲音小卡」：每張卡一個字母＋一張圖（貼紙），孩子指圖、你放聲音。",
      kid: { hero: "字母怪獸", buttons: "三張圖卡，按下播放聲音", game: "聽聲音，點開頭相同的圖卡（沒有扣分）", palette: "方案 C", note: "c 同時有 /k/ 與 /s/ 兩種發音，先只教 /k/。" },
      quick: "放一次 mmm，摸肚子"
    })
  );

  Object.assign(window.MFE_MEDIA, {
    C1: { songs: [
      { id: "pd_abc", kind: "pd", t: "ABC Song", zh: "字母歌", act: "邊唱邊指字母；這首教的是字母名稱，不是聲音，可以聽但不要混著教。",
        lyrics: "A B C D E F G,\nH I J K L M N O P,\nQ R S, T U V,\nW X Y and Z.\nNow I know my ABCs,\nNext time won't you sing with me?" },
      { id: "own_c1", kind: "own", t: "Sss Chant", zh: "蛇的聲音韻文", act: "唱到 sss 時手像蛇一樣扭動。",
        lyrics: "Sss, sss, sss, sock!\nAh, ah, ah, apple!\nTt, tt, tt, tiger!\nSss, ah, tt!" }
    ], books: [
      { t: "Chicka Chicka Boom Boom", au: "Bill Martin Jr. / John Archambault", why: "字母爬椰子樹的節奏故事，旋律感很強；孩子聽字母名稱，我們把它當節奏書，不當字母教學。" },
      { t: "Eating the Alphabet", au: "Lois Ehlert", why: "每個字母配一種水果蔬菜，圖像清楚，也可以邊讀邊找開頭聲音。" }
    ]},
    C2: { songs: [
      { id: "own_c2", kind: "own", t: "Pp Nn Ii Chant", zh: "p n i 聲音韻文", act: "念 pp 時吹氣、念 nn 時摸鼻子嗡嗡、念 ii 時手指像小老鼠。",
        lyrics: "Pp, pp, pp, pig!\nNn, nn, nn, nose!\nIi, ii, ii, ice cream!\nPp, nn, ii!" }
    ], books: [
      { t: "LMNO Peas", au: "Keith Baker", why: "豌豆小人用各種職業對應字母，圖畫有趣，適合邊看邊找開頭聲音。" }
    ]},
    C3: { songs: [
      { id: "own_c3", kind: "own", t: "Mm Dd Cc Chant", zh: "m d c 聲音韻文", act: "念 mm 時摸肚子、dd 時打鼓、kk 時手像喀喀聲。",
        lyrics: "Mm, mm, mm, milk!\nDd, dd, dd, dog!\nKk, kk, kk, cat!\nMm, dd, kk!" }
    ], books: [
      { t: "Eating the Alphabet", au: "Lois Ehlert", why: "每個字母配一種水果蔬菜，可再次使用，找 m（melon）、d（dragon fruit）、c（cherry）。" }
    ]}
  });

  var b = window.MFE_SHEETS.build, S = b.S, C = b.C, M = b.M, Ci = b.Ci, X = b.X, H = b.H, SP = window.MFE_SHEETS.SPEC;
  function set(id, pics, say, wordsFor) {
    var cards = pics.map(function (p, i) { return [p, wordsFor[i]]; });
    SP[id] = {
      2: [S("聲音貼紙", say[0], pics[0], 4, "貼一個貼紙，你放一次聲音（或發出聲音）。孩子貼哪裡都可以。"), C("塗塗看", say[1], [pics[0], pics[1]], "邊塗邊說圖的名稱，你偶爾發出開頭的聲音就好。")],
      3: [M("圖和影子連連看", say[1], pics.map(function (p) { return [p, p]; }), true, "連起來時說名稱；孩子不說也沒關係。"),
          Ci("聽聲音，圈圖", pics.map(function (p, i) { return { say: "/" + (wordsFor[i] === "cat" ? "k" : wordsFor[i].charAt(0)) + "/ — " + wordsFor[i], opts: [pics[i], pics[(i + 1) % 3], pics[(i + 2) % 3]], ans: 0 }; }), "你發出灰色的聲音（只念斜線裡的字母聲音），孩子圈出（或指出）開頭相同的圖。")],
      4: [M("聲音和圖連連看", "", pics.map(function (p, i) { return [p, wordsFor[i].charAt(0)]; }), false, "圖片的開頭聲音是哪個字母？請孩子連線，你唸聲音。字母只是記號，不要求認字。"),
          X("聲音卡（剪下來玩）", say[1], cards, "剪下卡片，放聲音，孩子找到開頭相同的卡片。")]
    };
  }
  set("C1", ["art:socks", "art:apple", "art:tiger"], ["Sss, sock!", "Sock! Apple! Tiger!"], ["sock", "apple", "tiger"]);
  set("C2", ["art:icecream", "art:pig", "art:b_nose"], ["Pp, pig!", "Pig! Nose! Ice cream!"], ["ice cream", "pig", "nose"]);
  set("C3", ["art:milk", "art:dog", "art:cat"], ["Mm, milk!", "Milk! Dog! Cat!"], ["milk", "dog", "cat"]);
})();
