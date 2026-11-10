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
    ["milk", "milk", "牛奶", "svg:milk", "u"], ["water", "water", "水", "svg:water", "u"], ["juice", "juice", "果汁", "svg:juice", "u"], ["tea", "tea", "茶", "svg:tea", "u"],
    ["bread", "bread", "麵包", "svg:bread", "u"], ["rice", "rice", "飯", "svg:rice", "u"], ["noodles", "noodles", "麵", "svg:noodles", "p"], ["egg", "egg", "雞蛋", "svg:egg"],
    ["cheese", "cheese", "起司", "svg:cheese", "u"], ["cookie", "cookie", "餅乾", "svg:cookie"], ["cake", "cake", "蛋糕", "svg:cake", "u"], ["candy", "candy", "糖果", "svg:candy", "u"],
    ["icecream", "ice cream", "冰淇淋", "svg:icecream", "u"], ["soup", "soup", "湯", "svg:soup", "u"], ["dumpling", "dumpling", "水餃", "svg:dumpling"], ["sandwich", "sandwich", "三明治", "svg:sandwich"],
    ["pizza", "pizza", "披薩", "svg:pizza", "u"], ["fries", "french fries", "薯條", "svg:fries", "p"], ["popcorn", "popcorn", "爆米花", "svg:popcorn", "u"], ["honey", "honey", "蜂蜜", "svg:honey", "u"],
    ["carrot", "carrot", "紅蘿蔔", "svg:carrot"], ["broccoli", "broccoli", "花椰菜", "svg:broccoli", "u"], ["corn", "corn", "玉米", "svg:corn", "u"], ["potato", "potato", "馬鈴薯", "svg:potato"],
    ["sweetpotato", "sweet potato", "地瓜", "svg:sweetpotato"], ["cucumber", "cucumber", "小黃瓜", "svg:cucumber"], ["mushroom", "mushroom", "香菇", "svg:mushroom"], ["chicken", "drumstick", "雞腿", "svg:chicken"]
  ]},
  { id: "toys", icon: "⚽", name: "玩具", words: [
    ["ball", "ball", "球", "svg:ball"], ["car", "car", "車子", "svg:car"], ["truck", "truck", "卡車", "svg:truck"], ["train", "train", "火車", "svg:train"],
    ["airplane", "airplane", "飛機", "svg:airplane"], ["bus", "bus", "公車", "svg:bus"], ["bike", "bike", "腳踏車", "svg:bike"], ["blocks", "blocks", "積木", "svg:blocks", "p"],
    ["teddy", "teddy bear", "泰迪熊", "svg:teddy"], ["book", "book", "書", "svg:book"], ["balloon", "balloon", "氣球", "svg:balloon"], ["crayons", "crayons", "蠟筆", "svg:crayons", "p"],
    ["puzzle", "puzzle", "拼圖", "svg:puzzle"], ["drum", "drum", "鼓", "svg:drum"], ["piano", "piano", "鋼琴", "svg:piano"], ["guitar", "guitar", "吉他", "svg:guitar"],
    ["kite", "kite", "風箏", "svg:kite"], ["bubbles", "bubbles", "泡泡", "svg:bubbles", "p"], ["rocket", "rocket", "火箭", "svg:rocket"], ["boat", "boat", "船", "svg:boat"]
  ]},
  { id: "home", icon: "🥄", name: "家中用品", words: [
    ["cup", "cup", "杯子", "svg:cup"], ["bottle", "bottle", "奶瓶", "svg:bottle"], ["spoon", "spoon", "湯匙", "svg:spoon"], ["fork", "fork", "叉子", "svg:fork"],
    ["bowl", "bowl", "碗", "svg:bowl"], ["plate", "plate", "盤子", "svg:plate"], ["phone", "phone", "手機", "svg:phone"], ["keys", "keys", "鑰匙", "svg:keys", "p"],
    ["toothbrush", "toothbrush", "牙刷", "svg:toothbrush"], ["soap", "soap", "肥皂", "svg:soap", "u"], ["tissue", "toilet paper", "衛生紙", "svg:tissue", "u"], ["bed", "bed", "床", "svg:bed"],
    ["chair", "chair", "椅子", "svg:chair"], ["door", "door", "門", "svg:door"], ["light", "light", "燈", "svg:light"], ["clock", "clock", "時鐘", "svg:clock"],
    ["bag", "bag", "包包", "svg:bag"], ["umbrella", "umbrella", "雨傘", "svg:umbrella"], ["mirror", "mirror", "鏡子", "svg:mirror"], ["tv", "TV", "電視", "svg:tv"],
    ["computer", "computer", "電腦", "svg:computer"], ["pen", "pen", "筆", "svg:pen"], ["paper", "paper", "紙", "svg:paper", "u"]
  ]},
  { id: "clothes", icon: "👕", name: "衣物", words: [
    ["shoes", "shoes", "鞋子", "svg:shoes", "p"], ["socks", "socks", "襪子", "svg:socks", "p"], ["hat", "hat", "帽子", "svg:hat"], ["jacket", "jacket", "外套", "svg:jacket"],
    ["pants", "pants", "褲子", "svg:pants", "p"], ["shirt", "shirt", "上衣", "svg:shirt"], ["dress", "dress", "洋裝", "svg:dress"], ["glasses", "glasses", "眼鏡", "svg:glasses", "p"],
    ["gloves", "gloves", "手套", "svg:gloves", "p"], ["scarf", "scarf", "圍巾", "svg:scarf"], ["boots", "boots", "靴子", "svg:boots", "p"], ["sandals", "sandals", "涼鞋", "svg:sandals", "p"]
  ]},
  { id: "animals", icon: "🐶", name: "動物", words: [
    ["dog", "dog", "狗", "svg:dog"], ["cat", "cat", "貓", "svg:cat"], ["bird", "bird", "鳥", "svg:bird"], ["fish", "fish", "魚", "svg:fish"],
    ["duck", "duck", "鴨子", "svg:duck"], ["cow", "cow", "牛", "svg:cow"], ["pig", "pig", "豬", "svg:pig"], ["sheep", "sheep", "綿羊", "svg:sheep"],
    ["horse", "horse", "馬", "svg:horse"], ["rabbit", "rabbit", "兔子", "svg:rabbit"], ["elephant", "elephant", "大象", "svg:elephant"], ["monkey", "monkey", "猴子", "svg:monkey"],
    ["lion", "lion", "獅子", "svg:lion"], ["tiger", "tiger", "老虎", "svg:tiger"], ["bear", "bear", "熊", "svg:bear"], ["panda", "panda", "貓熊", "svg:panda"],
    ["frog", "frog", "青蛙", "svg:frog"], ["butterfly", "butterfly", "蝴蝶", "svg:butterfly"], ["bee", "bee", "蜜蜂", "svg:bee"], ["ant", "ant", "螞蟻", "svg:ant"],
    ["turtle", "turtle", "烏龜", "svg:turtle"], ["hen", "chicken", "小雞／母雞", "svg:hen"], ["giraffe", "giraffe", "長頸鹿", "svg:giraffe"], ["dinosaur", "dinosaur", "恐龍", "svg:dinosaur"],
    ["snail", "snail", "蝸牛", "svg:snail"], ["whale", "whale", "鯨魚", "svg:whale"]
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
