// 2 歲（階段 Z）、5 歲後半（C4–C8）、6 歲（階段 D）的短語、圖卡、教材卡、歌曲與書。接在 stage-c.js 之後載入。
(function () {
  var W = window;
  W.MFE_SCENES.push(
    { id: "sing", icon: "🎵", name: "唱歌與找東西（2 歲）", phrases: [
      { id: "sing_me", en: "Sing with me!", zh: "跟我一起唱", when: "唱歌前", main: true },
      { id: "come_here", en: "Come here.", zh: "過來", when: "叫孩子過來時（配合招手）" },
      { id: "where_is", en: "Where is the ___?", say: "Where is the ball?", zh: "___在哪裡？", when: "找東西、玩捉迷藏（孩子用手指就好）" },
      { id: "show_me", en: "Show me!", zh: "給我看看", when: "孩子拿著東西時" },
      { id: "rhyme_q", en: "Do they rhyme?", zh: "它們押韻嗎？", when: "5 歲玩押韻時（cat 和 hat 聽起來像不像）" }
    ]},
    { id: "talk", icon: "💬", name: "對話與閱讀（6 歲）", phrases: [
      { id: "whats_name", en: "What's your name?", zh: "你叫什麼名字？", when: "自我介紹", main: true },
      { id: "my_name", en: "My name is ___.", say: "My name is Tom.", zh: "我叫___", when: "回答（孩子用自己的名字或玩偶的名字）" },
      { id: "how_old", en: "How old are you?", zh: "你幾歲？", when: "自我介紹、玩角色扮演" },
      { id: "im_six", en: "I'm six.", zh: "我六歲", when: "回答年齡" },
      { id: "how_are_you", en: "How are you?", zh: "你好嗎？", when: "見面問候" },
      { id: "im_fine", en: "I'm fine, thank you.", zh: "我很好，謝謝", when: "回答問候" },
      { id: "i_feel", en: "I'm happy. / I'm sad.", say: "I'm happy.", zh: "我很開心／我很難過", when: "說出自己的心情" },
      { id: "i_have", en: "I have a ___.", say: "I have a dog.", zh: "我有___", when: "分享自己的東西" },
      { id: "i_can", en: "I can ___.", say: "I can jump.", zh: "我會___", when: "分享自己會做的事" },
      { id: "read_it", en: "Let's read it.", zh: "我們來讀讀看", when: "拼讀或念短句時" }
    ]}
  );

  W.MFE_PATTERNS.push(
    { id: "spell", name: "c – a – t, cat.", zh: "一個一個聲音拼出單字", stem: "", ask: null, stageA: false, hint: "6 歲拼讀：先一個一個聲音點過去，再合起來念" },
    { id: "i_have", name: "I have a ___.", zh: "我有___", stem: "I have", ask: "What do you have?", stageA: false, hint: "分享自己的東西，輪流說" }
  );
  var P = {}; W.MFE_PATTERNS.forEach(function (p) { P[p.id] = p; });

  function sub(cat, ids) { var m = {}; W.MFE_WORD_CATS.forEach(function (c) { c.words.forEach(function (w) { m[w[0]] = w; }); }); return ids.map(function (i) { return m[i]; }).filter(Boolean); }
  function L(id, en, zh, pic, t, letter) { return [id, en, zh, pic, t || "", "", letter || ""]; }
  W.MFE_WORD_CATS.push(
    { id: "z_sing", icon: "🎵", name: "歌裡的東西", words: sub(0, ["boat", "sheep", "bubbles", "balloon", "drum", "bee"]) },
    { id: "z_animals", icon: "🐮", name: "動物叫聲", words: sub(0, ["cow", "duck", "dog", "cat", "pig", "sheep"]) },
    { id: "z_body", icon: "🖐️", name: "身體（2 歲）", words: sub(0, ["b_nose", "b_ear", "b_hand", "b_foot", "b_eye", "b_mouth"]) },
    { id: "z_colors", icon: "🎨", name: "三原色", words: sub(0, ["c_red", "c_yellow", "c_blue", "c_green"]) },
    { id: "z_objects", icon: "🧸", name: "每天的東西", words: sub(0, ["ball", "cup", "shoes", "teddy", "car", "book", "apple", "bed"]) },
    { id: "ph4", icon: "🥚", name: "e h r", words: [L("l_e", "egg", "蛋（e 的聲音 /e/）", "svg:egg", "", "e"), L("l_h", "hat", "帽子（h 的聲音 /h/）", "svg:hat", "", "h"), L("l_r", "rabbit", "兔子（r 的聲音 /r/）", "svg:rabbit", "", "r")] },
    { id: "ph5", icon: "🏀", name: "b f l", words: [L("l_b", "ball", "球（b 的聲音 /b/）", "svg:ball", "", "b"), L("l_f", "fish", "魚（f 的聲音 /f/）", "svg:fish", "", "f"), L("l_l", "lion", "獅子（l 的聲音 /l/）", "svg:lion", "", "l")] },
    { id: "ph6", icon: "🍊", name: "o u g", words: [L("l_o", "orange", "橘子（o 的聲音 /o/）", "svg:orange", "", "o"), L("l_u", "umbrella", "雨傘（u 的聲音 /u/）", "svg:umbrella", "", "u"), L("l_g", "grapes", "葡萄（g 的聲音 /g/）", "svg:grapes", "u", "g")] },
    { id: "rhyme", icon: "🎶", name: "押韻配對", words: [L("r_cat", "cat", "貓（和 hat 押韻）", "svg:cat"), L("r_hat", "hat", "帽子", "svg:hat"), L("r_dog", "dog", "狗（和 frog 押韻）", "svg:dog"), L("r_frog", "frog", "青蛙", "svg:frog"), L("r_pen", "pen", "筆（和 hen 押韻）", "svg:pen"), L("r_hen", "hen", "母雞", "svg:hen"), L("r_bear", "bear", "熊（和 chair 押韻）", "svg:bear"), L("r_chair", "chair", "椅子", "svg:chair")] },
    { id: "ihave", icon: "🎒", name: "我有…", words: sub(0, ["ball", "dog", "cat", "bike", "book", "teddy", "bag", "car"]) },
    { id: "cvc1", icon: "📖", name: "拼讀 a", words: [L("w_cat", "cat", "貓", "svg:cat"), L("w_hat", "hat", "帽子", "svg:hat"), L("w_bag", "bag", "書包", "svg:bag")] },
    { id: "cvc2", icon: "📖", name: "拼讀 e i", words: [L("w_bed", "bed", "床", "svg:bed"), L("w_pen", "pen", "筆", "svg:pen"), L("w_pig", "pig", "小豬", "svg:pig")] },
    { id: "cvc3", icon: "📖", name: "拼讀 o u", words: [L("w_dog", "dog", "狗", "svg:dog"), L("w_bus", "bus", "公車", "svg:bus"), L("w_cup", "cup", "杯子", "svg:cup")] }
  );
  Object.assign(W.MFE_LESSON_CARDS, {
    Z1: { pat: "this_is", cat: "z_sing" }, Z2: { pat: "this_is", cat: "z_animals" }, Z3: { pat: "touch_your", cat: "z_body" },
    Z4: { pat: "its", cat: "z_colors" }, Z5: { pat: "where_is", cat: "z_objects" },
    C4: { pat: "sound", cat: "ph4" }, C5: { pat: "sound", cat: "ph5" }, C6: { pat: "sound", cat: "ph6" }, C7: { pat: "this_is", cat: "rhyme" }, C8: { pat: "i_have", cat: "ihave" },
    D1: { pat: "spell", cat: "cvc1" }, D2: { pat: "spell", cat: "cvc2" }, D3: { pat: "spell", cat: "cvc3" }
  });

  // ---- 教材卡 ----
  function lesson(o) {
    var d = {
      twoKids: "二寶聽就好，不用參與；大寶可以當小老師，把學習單與互動版當遊戲玩給弟妹看。",
      resist: ["孩子不想就停，換成玩偶或唱歌，明天再試。", "任何答案都接受，不糾正，把正確的說法再自然地說一次。"],
      paper: "三版學習單內容相似、順序不同，可以隔幾天換一版；互動版與學習單是同樣的題目。",
      review: "隔幾天換另一版學習單或互動版再玩一次。",
      kid: { hero: "字母怪獸", buttons: "大圖卡", game: "聽一聽點一點", palette: "方案 C", note: "不計分、不扣分。" }
    };
    for (var k in o) d[k] = o[k];
    return d;
  }
  W.MFE_LESSONS.push(
    lesson({ id: "Z1", stage: "Z", icon: "🎵", title: "歌謠動一動",
      goal: "聽到熟悉的英文歌會有反應（看過來、拍手、搖擺），能跟著做 1 到 2 個動作。不要求開口。",
      phrases: ["sing_me", "clap", "wave_hand", "hello", "bye"],
      words: ["clap 拍手、wave 揮手、jump 跳（動作詞）", "歌裡的東西：boat、sheep、bubbles、balloon、drum、bee"],
      scripts: { A: "我們來唱歌，一起拍拍手。（用中文帶，歌用英文唱）", B: "Sing with me! 一起唱。Clap, clap, clap! 拍拍手。", C: "Sing with me! Clap your hands. Wave bye-bye. Good job!" },
      puppet: ["La, la, la!", "Clap, clap!", "Bye-bye!"],
      steps: ["每天同一首歌，同樣的動作，一週只換一首。", "唱到一半突然停住，等孩子做動作或看你，再接著唱。", "孩子沒反應也繼續唱，不要追問。", "唱完說 Yay! 和擊掌。"],
      game: "「停一停」：唱到最後一個字停下來，等孩子拍手、笑或看你，再唱完。",
      song: "小星星、Row Row Row Your Boat、Itsy Bitsy Spider、Baa Baa Black Sheep（傳統歌曲，附歌詞）。",
      book: "挑厚紙板書、一頁一個大圖的歌謠書。",
      life: "洗澡、換尿布、推嬰兒車時輕輕哼唱，同一首歌天天用。",
      quick: "唱一首歌加一個動作", observe: "聽到歌會看向你、拍手或搖擺＝有反應。" }),
    lesson({ id: "Z2", stage: "Z", icon: "🐮", title: "動物叫聲",
      goal: "聽到 cow / duck / dog / cat 會看向或用手指出對應的動物；願意模仿叫聲（moo、quack、woof、meow）。",
      phrases: ["where_is", "animal_says", "look", "show_me"],
      words: ["cow 牛、duck 鴨、dog 狗、cat 貓（先 4 個）", "叫聲：moo、quack、woof、meow（之後加 pig oink、sheep baa）"],
      scripts: { A: "小牛哞哞，moo, moo! 牛在哪裡？", B: "Look, a cow! 牛。Moo, moo! Where is the cow?", C: "Where is the cow? The cow says moo. Show me the duck. Quack, quack!" },
      puppet: ["Moo!", "Quack, quack!", "Woof!"],
      steps: ["一次只拿 2 張大圖卡，你說名稱和叫聲，孩子看。", "問 Where is the cow?，孩子用手指或看。", "孩子模仿叫聲就是成功，名稱不重要。", "出門看到真的動物，只說叫聲。"],
      game: "「動物在哪裡」：把動物玩偶藏在毯子下，你說叫聲，孩子找出來。",
      song: "Old MacDonald Had a Farm（傳統歌曲，附歌詞）。", book: "挑動物叫聲的厚紙板書，字少圖大。",
      life: "看到狗 Woof! 看到鳥 Tweet! 洗澡玩鴨子 Quack!", quick: "學一次動物叫聲", observe: "聽到叫聲看向對應動物、或自己發出叫聲＝有反應。" }),
    lesson({ id: "Z3", stage: "Z", icon: "🖐️", title: "身體部位遊戲",
      goal: "你說 Touch your nose / hands / feet / ears 時，孩子能摸到（或看著你摸）對應的身體部位。",
      phrases: ["touch_nose", "wave_hand", "stomp_feet", "tickle"],
      words: ["nose 鼻子、hands 手、feet 腳、ears 耳朵"],
      scripts: { A: "摸摸鼻子，nose! 摸摸小手，hands!", B: "Touch your nose! 鼻子。Touch your hands! 小手。", C: "Touch your nose. Touch your ears. Wave your hand. Stomp your feet!" },
      puppet: ["Touch my nose!", "Tickle, tickle!"],
      steps: ["洗澡、換衣服時，輕輕碰孩子的部位並說名稱。", "玩偶示範摸自己的鼻子，孩子看。", "孩子會摸自己時，你說 Touch your ___。", "孩子不喜歡被碰就改成碰玩偶。"],
      game: "「摸摸看」：你說部位，孩子摸自己；摸對就搔癢。", song: "This Little Piggy（傳統歌曲，附歌詞）。", book: "挑身體部位的厚紙板書。",
      life: "洗澡、擦乾、穿衣服時說部位。", quick: "洗澡時說一個部位", observe: "聽到 nose 會摸或看向鼻子＝有反應。" }),
    lesson({ id: "Z4", stage: "Z", icon: "🎨", title: "顏色配對（紅黃藍綠）",
      goal: "能把同樣顏色的東西放在一起（配對）；聽到 red / yellow / blue 能拿出對應顏色的東西。",
      phrases: ["what_color", "its_color", "same"],
      words: ["red 紅、yellow 黃、blue 藍、green 綠（一次 2 個）"],
      scripts: { A: "紅色的蘋果，red! 一樣的紅色。", B: "Red! 紅色。Same! 一樣。", C: "It's red. Same! Red apple. Find something red." },
      puppet: ["Red!", "Same!"],
      steps: ["先只選 red 和 yellow，拿兩個杯子各一色。", "你拿一個紅色玩具說 Red!，放到紅杯子。", "孩子放對時說 Same!，放錯不糾正，再示範一次。", "每天換一個顏色加入。"],
      game: "「顏色回家」：把同色的積木放進同色的碗。", song: "Rainbow Chant（自編韻文，附歌詞）。", book: "挑顏色主題的厚紙板書。",
      life: "穿襪子 Red socks! 吃水果 Yellow banana!", quick: "找一個紅色的東西", observe: "把同色東西放在一起＝有配對能力；聽到顏色拿對＝能指認。" }),
    lesson({ id: "Z5", stage: "Z", icon: "🧸", title: "每天的東西",
      goal: "聽到 Where is the ball / cup / shoes? 時能看向或指向正確的東西；願意把東西拿給你。",
      phrases: ["where_is", "show_me", "here_you_are", "thank_you"],
      words: ["ball 球、cup 杯子、shoes 鞋、teddy 小熊、car 車、book 書、apple 蘋果、bed 床"],
      scripts: { A: "球在哪裡？ball! 我們找找看。", B: "Where is the ball? 球在哪裡？Here is the ball!", C: "Where is the ball? Show me the ball. Here you are. Thank you!" },
      puppet: ["Where is the ball?", "Here it is!"],
      steps: ["每天只選 2 樣，放在孩子面前，說名稱。", "問 Where is the ___?，孩子指就說 Yes! Here it is!", "孩子拿給你時說 Thank you!。", "捉迷藏：把東西藏在毯子下一起找。"],
      game: "「捉迷藏」：玩偶躲起來，你說 Where is the teddy?，孩子找。", song: "自編的找東西韻文可用 Baa Baa Black Sheep 的曲調。", book: "挑日常物品的厚紙板書。",
      life: "換衣服時問 Where are your shoes? 玩玩具時問 Where is the car?", quick: "找一樣東西", observe: "聽到名稱看向或拿起對應東西＝有反應。" }),
    lesson({ id: "C4", stage: "C", icon: "🥚", title: "字母聲音 e h r",
      goal: "聽到 /e/ /h/ /r/ 時能從 3 張圖裡指出開頭相同的那一張（egg、hat、rabbit），並能用手指描出字母。",
      phrases: ["listen_sound", "starts_with", "again_sound"], words: ["e（egg）、h（hat）、r（rabbit）", "h 輕輕吹氣，r 嘴巴圓圓"],
      scripts: { A: "聽，hhh，像哈氣。hat（帽子）是 hhh 開頭。", B: "Listen. Hh, like a breath. Hat starts with hh.", C: "Listen. What sound? Hh. Hat starts with hh. Find the hat." },
      puppet: ["Hh!", "Hat!", "Rr!"],
      steps: ["先用 C1 到 C3 的聲音熱身。", "一次教一個新聲音，配動作。", "聽聲音，找圖卡，再描字母。", "孩子不想描字母就不描。"],
      game: "「聲音尋寶」：放聲音，找家裡開頭相同的東西。", song: "自編的聲音韻文（C1 到 C3 的韻文可延伸）。", book: "字母主題的繪本，一起找開頭聲音。",
      life: "看到帽子 Hat! hhh 看到兔子 Rabbit! rrr", quick: "放一次 hhh", observe: "聽到聲音能指出圖＝有分辨開頭聲音的能力。" }),
    lesson({ id: "C5", stage: "C", icon: "🏀", title: "字母聲音 b f l",
      goal: "聽到 /b/ /f/ /l/ 時能指出 ball、fish、lion 其中開頭相同的那一張，並能描出字母。",
      phrases: ["listen_sound", "starts_with", "again_sound"], words: ["b（ball）、f（fish）、l（lion）"],
      scripts: { A: "聽，bbb，像拍球。ball 是 bbb 開頭。", B: "Listen. Bb, like bouncing a ball. Ball starts with bb.", C: "Listen. What sound? Bb. Ball starts with bb. Find the ball." },
      puppet: ["Bb!", "Fff!", "Lll!"],
      steps: ["熱身：複習前面的聲音。", "一次一個新聲音，配動作（拍球、咬下唇、舌尖頂上顎）。", "聽聲音找圖卡，再描字母。", "不要求發音標準。"],
      game: "「拍球聲音」：拍一下球發一個聲音，找圖卡。", song: "自編的聲音韻文。", book: "字母主題的繪本。",
      life: "拍球 Ball! bbb 看到魚 Fish! fff", quick: "拍球發一次 bbb", observe: "能分辨 b 和 f 的聲音＝有進步。" }),
    lesson({ id: "C6", stage: "C", icon: "🍊", title: "字母聲音 o u g",
      goal: "聽到 /o/ /u/ /g/ 時能指出 orange、umbrella、grapes 其中開頭相同的那一張，並能描出字母。",
      phrases: ["listen_sound", "starts_with", "again_sound"], words: ["o（orange）、u（umbrella）、g（grapes）", "o 和 u 是短音，容易混淆，慢慢來"],
      scripts: { A: "聽，ggg，像青蛙。grapes（葡萄）是 ggg 開頭。", B: "Listen. Gg, like a frog. Grapes starts with gg.", C: "Listen. What sound? Gg. Grapes starts with gg. Find the grapes." },
      puppet: ["Gg!", "Oo!", "Uu!"],
      steps: ["先複習前面的聲音，再加新的。", "o 和 u 不要同一天教。", "聽聲音找圖卡，再描字母。", "孩子混淆時，退回前一個單元。"],
      game: "「聲音捉迷藏」：把三張圖卡藏起來，放聲音，孩子找出對應的。", song: "自編的聲音韻文。", book: "字母主題的繪本。",
      life: "撐傘 Umbrella! uuu 吃葡萄 Grapes! ggg", quick: "放一次 ggg", observe: "能分辨短音 o 和 u＝進步明顯。" }),
    lesson({ id: "C7", stage: "C", icon: "🎶", title: "押韻配對",
      goal: "能聽出兩個字結尾聲音很像（cat 和 hat），並把押韻的圖卡配成一對。",
      phrases: ["rhyme_q", "listen_sound", "same"], words: ["cat–hat、dog–frog、pen–hen、bear–chair"],
      scripts: { A: "貓 cat，帽子 hat，聽起來像不像？像！我們把它們放在一起。", B: "Cat, hat. Same sound! 一樣的聲音。", C: "Cat, hat. Do they rhyme? Yes! Cat and hat rhyme." },
      puppet: ["Cat, hat!", "Same!"],
      steps: ["先用唱的：cat, hat, cat, hat，故意拉長結尾。", "兩張圖卡放一起，問 Same sound?", "孩子配對時說 Yes! They rhyme!", "孩子能配出一對，再加第二對。"],
      game: "「找朋友」：把圖卡打亂，找出押韻的朋友。", song: "自編的押韻韻文。", book: "押韻主題的繪本（Dr. Seuss 系列字很多，挑幾頁就好）。",
      life: "散步時說 cat, hat; dog, frog。", quick: "說一對押韻字", observe: "聽出結尾相同＝有語音覺察。" }),
    lesson({ id: "C8", stage: "C", icon: "🎒", title: "我有…、我會…",
      goal: "能用 I have a ___ 說出自己有的東西，或指著說；能聽懂 I can ___。",
      phrases: ["i_have", "i_can", "show_me"], words: ["ball、dog、cat、bike、book、teddy、bag、car", "動作：jump、run、clap、sing"],
      scripts: { A: "我有一個球，I have a ball。你有什麼？", B: "I have a ball. 我有球。你有什麼？Show me!", C: "I have a ball. What do you have? I can jump. Can you jump?" },
      puppet: ["I have a ball!", "I can jump!"],
      steps: ["你先說 I have a ball，讓孩子聽幾天。", "問 What do you have? 孩子拿東西給你看或說名稱。", "換說 I can jump，做動作。", "孩子能說完整句子再誇獎，只說單字也很好。"],
      game: "「分享袋」：袋子裡放幾樣東西，輪流拿出來說 I have a ___。", song: "自編的 I Have 韻文。", book: "有 I can 句型的繪本。",
      life: "分享玩具時說 I have a car. 做動作說 I can jump.", quick: "說一句 I have", observe: "能說出 I have a ___（即使只有單字）＝有進步。" }),
    lesson({ id: "D1", stage: "D", icon: "🐱", title: "拼讀 a（cat、hat、bag）",
      goal: "能把 c-a-t 三個聲音拼成 cat；看到圖能選出正確的單字；能找出缺少的字母。",
      phrases: ["read_it", "listen_sound", "starts_with"], words: ["cat、hat、bag（中間都是 a 的聲音）"],
      scripts: { A: "我們來拼，c, a, t，合起來 cat。貓咪！", B: "Let's read it. C, a, t... cat! 貓。", C: "Let's read it. C, a, t. Cat! The cat has a hat." },
      puppet: ["C-a-t, cat!"],
      steps: ["先複習 c、a、t 的聲音（C1 單元）。", "手指依序點三個字母，每點一個發一個聲音。", "點完說「合起來」，再唸整個字。", "孩子能獨立拼出來後再換下一個字。"],
      game: "「拼拼樂」：字母卡打亂，孩子排成 c-a-t，再唸出來。", song: "自編的拼讀韻文。", book: "挑拼讀分級讀本（每頁只有一句短句）。",
      life: "看到貓說 C-a-t, cat! 玩字母積木拼字。", quick: "拼一個字", observe: "能把三個聲音合成一個字＝拼讀成功。" }),
    lesson({ id: "D2", stage: "D", icon: "🛏️", title: "拼讀 e i（bed、pen、pig）",
      goal: "能拼出 bed、pen、pig，並分辨中間的聲音 e 和 i。",
      phrases: ["read_it", "listen_sound"], words: ["bed、pen（中間 e）、pig（中間 i）"],
      scripts: { A: "b, e, d，合起來 bed。床！", B: "Let's read it. B, e, d... bed! 床。", C: "Let's read it. B, e, d. Bed! The pig is on the bed." },
      puppet: ["B-e-d, bed!"],
      steps: ["先複習 D1 的拼法。", "一次只拼一個字，配圖。", "e 和 i 分開教，不同天。", "孩子混淆就回到 D1。"],
      game: "「換一個聲音」：cat 換成 cut 會變成什麼？", song: "自編的拼讀韻文。", book: "拼讀分級讀本。",
      life: "看到床、筆、豬時拼一次。", quick: "拼一個字", observe: "能區分 e 和 i 的聲音。" }),
    lesson({ id: "D3", stage: "D", icon: "🐶", title: "拼讀 o u（dog、bus、cup）",
      goal: "能拼出 dog、bus、cup，並分辨中間的聲音 o 和 u。",
      phrases: ["read_it", "listen_sound"], words: ["dog（中間 o）、bus、cup（中間 u）"],
      scripts: { A: "d, o, g，合起來 dog。小狗！", B: "Let's read it. D, o, g... dog! 狗。", C: "Let's read it. D, o, g. Dog! The dog is on the bus." },
      puppet: ["D-o-g, dog!"],
      steps: ["先複習 D1、D2。", "一次一個字，配圖。", "o 和 u 分開教。", "拼對後，試著讀一個短句。"],
      game: "「拼字接龍」：用上一個字的最後一個聲音開頭，找下一個字。", song: "自編的拼讀韻文。", book: "拼讀分級讀本。",
      life: "看到公車、杯子、狗時拼一次。", quick: "拼一個字", observe: "能分辨 o 和 u 的聲音。" }),
    lesson({ id: "D4", stage: "D", icon: "📚", title: "常見字與短句",
      goal: "能認出幾個常見字（I、a、the、is、my、you、see、like），並能讀出像 I see a cat. 這樣的短句，配對圖片。",
      phrases: ["read_it", "i_see", "i_like"], words: ["I、a、the、is、my、you、see、like"],
      scripts: { A: "這個字是 I，我。我們找找看哪裡有 I。", B: "Let's read it. I see a cat. 我看到一隻貓。", C: "Let's read it. I see a cat. I like the cat. The cat is big." },
      puppet: ["I see a cat!", "I like it!"],
      steps: ["一次只教 2 個常見字，多次看到才記得。", "找字遊戲：在短句或書裡找 I。", "讀短句時用手指指著字。", "短句配圖：把 I see a cat 配到貓的圖。"],
      game: "「找字」：在書中找出指定的字，找到就圈起來。", song: "自編的 I See 韻文。", book: "常見字多的拼讀讀本。",
      life: "路上看到字就指著說。", quick: "找一個常見字", observe: "能自己讀出短句＝閱讀入門。" }),
    lesson({ id: "D5", stage: "D", icon: "💬", title: "日常對話",
      goal: "能回答 What's your name? How old are you? How are you?，並能用 I'm happy / I'm sad 說出心情。",
      phrases: ["whats_name", "my_name", "how_old", "im_six", "how_are_you", "im_fine", "i_feel"], words: ["name、old、happy、sad、fine"],
      scripts: { A: "你叫什麼名字？What's your name? 我們來說 My name is ___。", B: "What's your name? 你叫什麼？My name is Tom.", C: "What's your name? My name is Tom. How old are you? I'm six. How are you? I'm fine, thank you." },
      puppet: ["What's your name?", "I'm six!"],
      steps: ["用玩偶問答：玩偶問，孩子回答。", "角色扮演：孩子當老師，你當學生。", "先聽、再選答案，再說。", "答不出來就由你替他說，下次再來。"],
      game: "「訪問遊戲」：用玩偶當小記者，問孩子問題。", song: "自編的問答韻文。", book: "有對話的繪本。",
      life: "遇到新朋友玩偶，練習自我介紹。", quick: "回答一個問題", observe: "能聽懂並回答問題＝進步。" }),
    lesson({ id: "D6", stage: "D", icon: "📕", title: "短故事排順序",
      goal: "能聽懂或讀懂 3 句話的小故事，把圖片依故事順序排好，並用自己的話說一次。",
      phrases: ["read_it", "look_at"], words: ["first、then、last（順序詞）；動作詞：wake up、eat、go"],
      scripts: { A: "我們看圖說故事：先起床，再吃飯，最後上學。", B: "First, wake up. Then, eat. Last, go to school.", C: "First, I wake up. Then, I eat breakfast. Last, I go to school." },
      puppet: ["First, then, last!"],
      steps: ["先看圖，說說每一張在做什麼。", "你念故事，孩子排圖。", "孩子排好，再請他用圖說一次。", "之後試著讀句子。"],
      game: "「故事接龍」：每人說一句，接成一個故事。", song: "自編的順序韻文。", book: "有簡單情節的繪本。",
      life: "睡前說今天發生的事：First, Then, Last。", quick: "排一個 3 步驟的順序", observe: "能依序說出故事＝有敘事能力。" })
  );

  // ---- 歌曲與書 ----
  function song(id) { var r = null; Object.keys(W.MFE_MEDIA).forEach(function (u) { W.MFE_MEDIA[u].songs.forEach(function (s) { if (s.id === id) r = s; }); }); return r; }
  function own(id, t, zh, act, lyrics) { return { id: id, kind: "own", t: t, zh: zh, act: act, lyrics: lyrics }; }
  var M = W.MFE_MEDIA;
  M.Z1 = { songs: [song("pd_twinkle"), song("pd_row"), song("pd_spider"), song("pd_baa")].filter(Boolean), books: [{ t: "Brown Bear, Brown Bear, What Do You See?", au: "Bill Martin Jr. / Eric Carle", why: "節奏重複，邊念邊翻，2 歲孩子也能跟著看。" }] };
  M.Z2 = { songs: [song("pd_macdonald")].filter(Boolean), books: [{ t: "Moo, Baa, La La La!", au: "Sandra Boynton", why: "動物叫聲，字少圖大，厚紙板書。" }, { t: "Dear Zoo", au: "Rod Campbell", why: "翻翻書，每頁一隻動物。" }] };
  M.Z3 = { songs: [song("pd_piggy"), song("t_hskt2")].filter(Boolean), books: [{ t: "Eyes, Nose, Fingers, and Toes", au: "Judy Hindley", why: "身體部位，圖畫清楚。" }] };
  M.Z4 = { songs: [song("own_b1")].filter(Boolean), books: [{ t: "Color Zoo", au: "Lois Ehlert", why: "每頁一個顏色和形狀。" }, { t: "Mouse Paint", au: "Ellen Stoll Walsh", why: "老鼠踩顏料混色，情節簡單。" }] };
  M.Z5 = { songs: [own("own_z5", "Where Is It? Chant", "找一找韻文", "念完一句就掀開毯子，露出東西。", "Where, where, where is the ball?\nHere, here, here it is!\nWhere, where, where is the cup?\nHere, here, here it is!")], books: [{ t: "Where's Spot?", au: "Eric Hill", why: "翻翻書，每頁找一次小狗，孩子最愛找。" }] };
  M.C4 = { songs: [own("own_c4", "Ee Hh Rr Chant", "e h r 聲音韻文", "念 hh 時哈氣，念 rr 時嘴巴圓圓。", "Ee, ee, ee, egg!\nHh, hh, hh, hat!\nRr, rr, rr, rabbit!\nEe, hh, rr!")], books: [{ t: "Eating the Alphabet", au: "Lois Ehlert", why: "字母配水果蔬菜，找開頭聲音。" }] };
  M.C5 = { songs: [own("own_c5", "Bb Ff Ll Chant", "b f l 聲音韻文", "念 bb 時拍球，念 ff 時咬下唇。", "Bb, bb, bb, ball!\nFf, ff, ff, fish!\nLl, ll, ll, lion!\nBb, ff, ll!")], books: [{ t: "Chicka Chicka Boom Boom", au: "Bill Martin Jr. / John Archambault", why: "字母爬樹的節奏故事。" }] };
  M.C6 = { songs: [own("own_c6", "Oo Uu Gg Chant", "o u g 聲音韻文", "念 gg 時像青蛙。", "Oo, oo, oo, orange!\nUu, uu, uu, umbrella!\nGg, gg, gg, grapes!\nOo, uu, gg!")], books: [{ t: "LMNO Peas", au: "Keith Baker", why: "豌豆小人配字母。" }] };
  M.C7 = { songs: [own("own_c7", "Rhyme Time", "押韻時間", "念完一組拍一下手。", "Cat, hat, cat and hat!\nDog, frog, dog and frog!\nPen, hen, pen and hen!\nBear, chair, bear and chair!")], books: [{ t: "Hop on Pop", au: "Dr. Seuss", why: "押韻字很多，挑幾頁就好。" }] };
  M.C8 = { songs: [own("own_c8", "I Have Chant", "我有韻文", "念到 I have 時拿起東西。", "I have a ball, ball, ball!\nI have a dog, dog, dog!\nI can jump, jump, jump!\nI can clap, clap, clap!")], books: [{ t: "Can I Play Too?", au: "Mo Willems", why: "Elephant & Piggie 系列，短句對話，適合 5 到 6 歲。" }] };
  M.D1 = { songs: [own("own_d1", "Cat Hat Bag Chant", "a 拼讀韻文", "念到每個聲音時伸出一根手指。", "C-a-t, cat! H-a-t, hat!\nB-a-g, bag! Cat, hat, bag!")], books: [{ t: "Bob Books", au: "Bobby Lynn Maslen", why: "拼讀分級讀本，每頁一句短句。" }] };
  M.D2 = { songs: [own("own_d2", "Bed Pen Pig Chant", "e i 拼讀韻文", "念到每個聲音時拍一下手。", "B-e-d, bed! P-e-n, pen!\nP-i-g, pig! Bed, pen, pig!")], books: [{ t: "Bob Books", au: "Bobby Lynn Maslen", why: "拼讀分級讀本，每頁一句短句。" }] };
  M.D3 = { songs: [own("own_d3", "Dog Bus Cup Chant", "o u 拼讀韻文", "念到每個聲音時跳一下。", "D-o-g, dog! B-u-s, bus!\nC-u-p, cup! Dog, bus, cup!")], books: [{ t: "Biscuit", au: "Alyssa Satin Capucilli", why: "簡單的小狗故事，句子短，適合初學閱讀。" }] };
  M.D4 = { songs: [own("own_d4", "I See Chant", "我看到韻文", "念到每個常見字時用手指指著。", "I see a cat. I like the cat.\nI see a dog. I like the dog.\nI see a bus. I like the bus.")], books: [{ t: "Elephant & Piggie 系列", au: "Mo Willems", why: "字少、對話多，很適合練習常見字。" }] };
  M.D5 = { songs: [own("own_d5", "Hello Chant", "問候韻文", "兩人面對面問答。", "What's your name? My name is Tom.\nHow old are you? I'm six.\nHow are you? I'm fine, thank you!")], books: [{ t: "Elephant & Piggie 系列", au: "Mo Willems", why: "兩個角色對話的故事，可以分角色朗讀。" }] };
  M.D6 = { songs: [own("own_d6", "First Then Last", "先後順序韻文", "念到 first, then, last 時伸出 1、2、3 根手指。", "First, I wake up. Then, I eat.\nLast, I go to school.")], books: [{ t: "The Very Hungry Caterpillar", au: "Eric Carle", why: "有清楚的日期順序，很適合排順序和複述。" }] };
})();
