// 小繪本：每本 5–6 頁，句型重複，每頁有場景與圖；有 q 的頁面要孩子點圖補上最後一個詞。
// 版面 lay：one（一個物品）、two（兩個）、three（三個）、big（大圖、不放角色）。圖用 WORD 的 id。
window.MFE_STORIES = [
  { id: "s_animals", icon: "🐱", title: "Hello, Animals!", zh: "哈囉，動物朋友", age: 3, pat: "重複句：Hello, ___!", tip: "指著圖，你念 Hello, cat!，孩子可以學動物叫聲。補字頁讓孩子指或點。",
    pages: [
      { sc: "garden", lay: "one", it: ["cat"], en: "Hello, cat!", zh: "哈囉，小貓！" },
      { sc: "garden", lay: "one", it: ["dog"], en: "Hello, dog!", zh: "哈囉，小狗！" },
      { sc: "garden", lay: "one", it: ["duck"], en: "Hello, ___!", zh: "哈囉，小鴨！", q: { ans: "duck", ch: ["duck", "cat"] } },
      { sc: "garden", lay: "one", it: ["pig"], en: "Hello, pig!", zh: "哈囉，小豬！" },
      { sc: "garden", lay: "one", it: ["cow"], en: "Hello, ___!", zh: "哈囉，乳牛！", q: { ans: "cow", ch: ["cow", "dog", "pig"] } },
      { sc: "garden", lay: "three", it: ["cat", "dog", "duck"], en: "Goodbye, friends!", zh: "再見，朋友們！" }
    ] },
  { id: "s_hungry", icon: "🍎", title: "I'm Hungry!", zh: "我肚子餓了", age: 4, pat: "I'm ___. / I want ___.", tip: "邊讀邊摸肚子。補字頁讓孩子指想吃的東西。",
    pages: [
      { sc: "kitchen", lay: "one", it: ["em_hungry"], en: "I'm hungry.", zh: "我肚子餓了。" },
      { sc: "kitchen", lay: "one", it: ["apple"], en: "I want an apple.", zh: "我想要蘋果。" },
      { sc: "kitchen", lay: "one", it: ["banana"], en: "I want a ___.", zh: "我想要香蕉。", q: { ans: "banana", ch: ["banana", "apple"] } },
      { sc: "kitchen", lay: "one", it: ["cookie"], en: "Yum! A cookie!", zh: "好好吃！一片餅乾！" },
      { sc: "kitchen", lay: "one", it: ["milk"], en: "I want ___.", zh: "我想要牛奶。", q: { ans: "milk", ch: ["milk", "cookie", "apple"] } },
      { sc: "kitchen", lay: "one", it: ["em_happy"], en: "I'm happy!", zh: "我好開心！" }
    ] },
  { id: "s_ball", icon: "⚽", title: "Where Is the Ball?", zh: "球在哪裡？", age: 4, pat: "Where is the ball? / It's in, on, under.", tip: "用真的球和盒子一起玩；每頁讓孩子猜猜看。",
    pages: [
      { sc: "play", lay: "one", it: ["ball"], en: "Where is the ball?", zh: "球在哪裡？" },
      { sc: "play", lay: "one", it: ["pp_in"], en: "In the box?", zh: "在盒子裡面嗎？" },
      { sc: "play", lay: "one", it: ["pp_on"], en: "On the box?", zh: "在盒子上面嗎？" },
      { sc: "play", lay: "one", it: ["pp_under"], en: "The ball is ___ the table!", zh: "球在桌子下面！", q: { ans: "pp_under", ch: ["pp_under", "pp_on"] } },
      { sc: "play", lay: "one", it: ["ball"], en: "Yes! Here it is! Hooray!", zh: "對！在這裡！太棒了！" }
    ] },
  { id: "s_bigsmall", icon: "🍎", title: "Big and Small", zh: "大和小", age: 4, pat: "It's ___.", tip: "找家裡大大小小的東西，邊讀邊比。碰到 hot 時做出「小心燙」的表情。",
    pages: [
      { sc: "kitchen", lay: "one", it: ["aj_big"], en: "A big apple!", zh: "一顆大蘋果！" },
      { sc: "kitchen", lay: "one", it: ["aj_small"], en: "A small apple.", zh: "一顆小蘋果。" },
      { sc: "kitchen", lay: "one", it: ["aj_hot"], en: "Careful! It's hot!", zh: "小心！好燙！" },
      { sc: "kitchen", lay: "one", it: ["aj_cold"], en: "Brr! It's ___.", zh: "噢，好冷！", q: { ans: "aj_cold", ch: ["aj_cold", "aj_hot"] } },
      { sc: "kitchen", lay: "two", it: ["aj_big", "aj_small"], en: "Big, small, hot, cold. I like it!", zh: "大、小、熱、冷。我都喜歡！" }
    ] },
  { id: "s_move", icon: "🏃", title: "Let's Move!", zh: "一起動一動", age: 4, pat: "Simon says, ___! / I can ___.", tip: "每一頁都一起做動作，做完再翻頁。",
    pages: [
      { sc: "garden", lay: "big", it: ["vb_stand"], en: "Stand up!", zh: "站起來！" },
      { sc: "garden", lay: "big", it: ["vb_jump"], en: "Jump, jump, jump!", zh: "跳跳跳！" },
      { sc: "garden", lay: "big", it: ["vb_run"], en: "Run, run, run!", zh: "跑跑跑！" },
      { sc: "garden", lay: "big", it: ["vb_clap"], en: "Clap, clap, clap!", zh: "拍拍手！" },
      { sc: "garden", lay: "big", it: ["vb_sit"], en: "___ down.", zh: "坐下。", q: { ans: "vb_sit", ch: ["vb_sit", "vb_jump"] } },
      { sc: "room", lay: "big", it: ["vb_sleep"], en: "Sleep. Good night.", zh: "睡覺。晚安。" }
    ] },
  { id: "s_colors", icon: "🎨", title: "Colors Parade", zh: "顏色遊行", age: 4, pat: "I see ___.", tip: "邊讀邊在家裡找同樣的顏色。",
    pages: [
      { sc: "play", lay: "two", it: ["c_red", "apple"], en: "I see red. A red apple!", zh: "我看到紅色。紅蘋果！" },
      { sc: "play", lay: "two", it: ["c_yellow", "banana"], en: "I see yellow. A yellow banana!", zh: "我看到黃色。黃香蕉！" },
      { sc: "play", lay: "two", it: ["c_blue", "ball"], en: "I see ___. A blue ball!", zh: "我看到藍色。藍色的球！", q: { ans: "c_blue", ch: ["c_blue", "c_red"] } },
      { sc: "play", lay: "two", it: ["c_green", "duck"], en: "I see green. A green duck!", zh: "我看到綠色。綠鴨子！" },
      { sc: "play", lay: "three", it: ["c_red", "c_yellow", "c_blue"], en: "Red, yellow, blue. So pretty!", zh: "紅、黃、藍。好漂亮！" }
    ] }
];
