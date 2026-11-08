// 圖卡單字庫與句型框。
// 單字格式：[id, 英文, 中文, 圖(emoji 或 "svg:名稱"), 類型]
// 類型：省略＝可數單數（a/an）、u＝不可數（milk）、p＝複數形（shoes）
window.MFE_PATTERNS = [
  { id: "give_me", name: "Give me ___, please.", zh: "請給我___", stem: "Give me", ask: "What do you want?", stageA: true, hint: "A1 主打：孩子想要東西時" },
  { id: "or_choice", name: "___ or ___?", zh: "二選一", stem: "", ask: null, stageA: true, hint: "每次輸入 2 個詞，孩子用手指選" },
  { id: "here_is", name: "Here is your ___.", zh: "這是你的___", stem: "Here is your", ask: null, stageA: true, hint: "遞東西時，接在 Here you are 後面" },
  { id: "where_is", name: "Where is the ___?", zh: "___在哪裡？", stem: "Where is the", ask: null, stageA: false, hint: "找東西遊戲，孩子用指的就好" },
  { id: "this_is", name: "This is ___.", zh: "這是___", stem: "This is", ask: "What is this?", stageA: false, hint: "指著卡片介紹，之後換孩子說" },
  { id: "i_want", name: "I want ___.", zh: "我要___", stem: "I want", ask: "What do you want?", stageA: false, hint: "階段 C 才要求孩子自己說，現在你說給他聽" }
];

window.MFE_WORD_CATS = [
  { id: "fruit", icon: "🍎", name: "水果", words: [
    ["apple", "apple", "蘋果", "svg:apple"], ["banana", "banana", "香蕉", "svg:banana"], ["grapes", "grapes", "葡萄", "svg:grapes", "p"],
    ["orange", "orange", "柳橙", "svg:orange"], ["tangerine", "tangerine", "橘子", "svg:tangerine"], ["strawberry", "strawberry", "草莓", "svg:strawberry"],
    ["watermelon", "watermelon", "西瓜", "svg:watermelon"], ["pear", "pear", "梨子", "svg:pear"], ["peach", "peach", "水蜜桃", "svg:peach"],
    ["cherry", "cherry", "櫻桃", "svg:cherry"], ["kiwi", "kiwi", "奇異果", "svg:kiwi"], ["pineapple", "pineapple", "鳳梨", "svg:pineapple"],
    ["mango", "mango", "芒果", "svg:mango"], ["lemon", "lemon", "檸檬", "svg:lemon"], ["melon", "melon", "哈密瓜", "svg:melon"],
    ["coconut", "coconut", "椰子", "svg:coconut"], ["blueberries", "blueberries", "藍莓", "svg:blueberries", "p"], ["tomato", "tomato", "番茄", "svg:tomato"],
    ["avocado", "avocado", "酪梨", "svg:avocado"], ["dragonfruit", "dragon fruit", "火龍果", "svg:dragonfruit"], ["guava", "guava", "芭樂", "svg:guava"],
    ["waxapple", "wax apple", "蓮霧", "svg:waxapple"], ["pomelo", "pomelo", "柚子", "svg:pomelo"], ["papaya", "papaya", "木瓜", "svg:papaya"],
    ["lychee", "lychee", "荔枝", "svg:lychee"], ["longan", "longan", "龍眼", "svg:longan"], ["persimmon", "persimmon", "柿子", "svg:persimmon"],
    ["starfruit", "star fruit", "楊桃", "svg:starfruit"], ["sugarapple", "sugar apple", "釋迦", "svg:sugarapple"], ["plum", "plum", "李子", "svg:plum"]
  ]},
  { id: "food", icon: "🍞", name: "食物與飲料", words: [
    ["milk", "milk", "牛奶", "🥛", "u"], ["water", "water", "水", "💧", "u"], ["juice", "juice", "果汁", "🧃", "u"], ["tea", "tea", "茶", "🍵", "u"],
    ["bread", "bread", "麵包", "🍞", "u"], ["rice", "rice", "飯", "🍚", "u"], ["noodles", "noodles", "麵", "🍜", "p"], ["egg", "egg", "雞蛋", "🥚"],
    ["cheese", "cheese", "起司", "🧀", "u"], ["cookie", "cookie", "餅乾", "🍪"], ["cake", "cake", "蛋糕", "🍰", "u"], ["candy", "candy", "糖果", "🍬", "u"],
    ["icecream", "ice cream", "冰淇淋", "🍦", "u"], ["soup", "soup", "湯", "🍲", "u"], ["dumpling", "dumpling", "水餃", "🥟"], ["sandwich", "sandwich", "三明治", "🥪"],
    ["pizza", "pizza", "披薩", "🍕", "u"], ["fries", "french fries", "薯條", "🍟", "p"], ["popcorn", "popcorn", "爆米花", "🍿", "u"], ["honey", "honey", "蜂蜜", "🍯", "u"],
    ["carrot", "carrot", "紅蘿蔔", "🥕"], ["broccoli", "broccoli", "花椰菜", "🥦", "u"], ["corn", "corn", "玉米", "🌽", "u"], ["potato", "potato", "馬鈴薯", "🥔"],
    ["sweetpotato", "sweet potato", "地瓜", "🍠"], ["cucumber", "cucumber", "小黃瓜", "🥒"], ["mushroom", "mushroom", "香菇", "🍄"], ["chicken", "chicken", "雞肉", "🍗", "u"]
  ]},
  { id: "toys", icon: "⚽", name: "玩具", words: [
    ["ball", "ball", "球", "⚽"], ["car", "car", "車子", "🚗"], ["truck", "truck", "卡車", "🚚"], ["train", "train", "火車", "🚂"],
    ["airplane", "airplane", "飛機", "✈️"], ["bus", "bus", "公車", "🚌"], ["bike", "bike", "腳踏車", "🚲"], ["blocks", "blocks", "積木", "🧱", "p"],
    ["teddy", "teddy bear", "泰迪熊", "🧸"], ["book", "book", "書", "📖"], ["balloon", "balloon", "氣球", "🎈"], ["crayons", "crayons", "蠟筆", "🖍️", "p"],
    ["puzzle", "puzzle", "拼圖", "🧩"], ["drum", "drum", "鼓", "🥁"], ["piano", "piano", "鋼琴", "🎹"], ["guitar", "guitar", "吉他", "🎸"],
    ["kite", "kite", "風箏", "🪁"], ["bubbles", "bubbles", "泡泡", "🫧", "p"], ["rocket", "rocket", "火箭", "🚀"], ["boat", "boat", "船", "⛵"]
  ]},
  { id: "home", icon: "🥄", name: "家中用品", words: [
    ["cup", "cup", "杯子", "🥤"], ["bottle", "bottle", "奶瓶", "🍼"], ["spoon", "spoon", "湯匙", "🥄"], ["fork", "fork", "叉子", "🍴"],
    ["bowl", "bowl", "碗", "🥣"], ["plate", "plate", "盤子", "🍽️"], ["phone", "phone", "手機", "📱"], ["keys", "keys", "鑰匙", "🔑", "p"],
    ["toothbrush", "toothbrush", "牙刷", "🪥"], ["soap", "soap", "肥皂", "🧼", "u"], ["tissue", "toilet paper", "衛生紙", "🧻", "u"], ["bed", "bed", "床", "🛏️"],
    ["chair", "chair", "椅子", "🪑"], ["door", "door", "門", "🚪"], ["light", "light", "燈", "💡"], ["clock", "clock", "時鐘", "⏰"],
    ["bag", "bag", "包包", "🎒"], ["umbrella", "umbrella", "雨傘", "☂️"], ["mirror", "mirror", "鏡子", "🪞"], ["tv", "TV", "電視", "📺"],
    ["computer", "computer", "電腦", "💻"], ["pen", "pen", "筆", "🖊️"], ["paper", "paper", "紙", "📄", "u"]
  ]},
  { id: "clothes", icon: "👕", name: "衣物", words: [
    ["shoes", "shoes", "鞋子", "👟", "p"], ["socks", "socks", "襪子", "🧦", "p"], ["hat", "hat", "帽子", "🧢"], ["jacket", "jacket", "外套", "🧥"],
    ["pants", "pants", "褲子", "👖", "p"], ["shirt", "shirt", "上衣", "👕"], ["dress", "dress", "洋裝", "👗"], ["glasses", "glasses", "眼鏡", "👓", "p"],
    ["gloves", "gloves", "手套", "🧤", "p"], ["scarf", "scarf", "圍巾", "🧣"], ["boots", "boots", "靴子", "🥾", "p"], ["sandals", "sandals", "涼鞋", "🩴", "p"]
  ]},
  { id: "animals", icon: "🐶", name: "動物", words: [
    ["dog", "dog", "狗", "🐶"], ["cat", "cat", "貓", "🐱"], ["bird", "bird", "鳥", "🐦"], ["fish", "fish", "魚", "🐟"],
    ["duck", "duck", "鴨子", "🦆"], ["cow", "cow", "牛", "🐮"], ["pig", "pig", "豬", "🐷"], ["sheep", "sheep", "綿羊", "🐑"],
    ["horse", "horse", "馬", "🐴"], ["rabbit", "rabbit", "兔子", "🐰"], ["elephant", "elephant", "大象", "🐘"], ["monkey", "monkey", "猴子", "🐵"],
    ["lion", "lion", "獅子", "🦁"], ["tiger", "tiger", "老虎", "🐯"], ["bear", "bear", "熊", "🐻"], ["panda", "panda", "貓熊", "🐼"],
    ["frog", "frog", "青蛙", "🐸"], ["butterfly", "butterfly", "蝴蝶", "🦋"], ["bee", "bee", "蜜蜂", "🐝"], ["ant", "ant", "螞蟻", "🐜"],
    ["turtle", "turtle", "烏龜", "🐢"], ["hen", "chicken", "小雞／母雞", "🐔"], ["giraffe", "giraffe", "長頸鹿", "🦒"], ["dinosaur", "dinosaur", "恐龍", "🦖"],
    ["snail", "snail", "蝸牛", "🐌"], ["whale", "whale", "鯨魚", "🐳"]
  ]}
];

// 單元對應的圖卡預設（單元頁會出現「🃏 圖卡」按鈕）
window.MFE_LESSON_CARDS = {
  A1: { pat: "give_me", cat: "fruit" },
  A4: { pat: "or_choice", cat: "food" },
  A5: { pat: "where_is", cat: "home" },
  A6: { pat: "where_is", cat: "toys" },
  A7: { pat: "where_is", cat: "clothes" }
};
