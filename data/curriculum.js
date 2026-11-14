// 2→6 歲課程地圖與每個單元的「學習單／互動版」規格。接在 lessons-zcd.js 之後載入。
// 同一個單元不會每個年齡都學一遍：每個年齡有自己的單元與難度，學習單與互動版的題型也依年齡不同。
(function () {
  var W = window;
  W.MFE_AGES = [
    { age: 2, name: "2 歲・聽與玩", units: ["Z1", "Z2", "Z3", "Z4", "Z5"],
      focus: "聽到熟悉的詞會看、會指、會模仿聲音與動作。", how: "題型：貼點點、塗顏色、2 選 1 指認。孩子不用開口。" },
    { age: 3, name: "3 歲・生活短句", units: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
      focus: "把整句話和生活情境連在一起，聽懂並能跟著說。", how: "題型：連連看、3 選 1 指認、貼點點。" },
    { age: 4, name: "4 歲・單字與句框", units: ["B1", "B2", "B3", "B4", "B5", "B6"],
      focus: "只換一個詞，說出完整的句子；認識顏色、動物、身體、數字 1 到 5。", how: "題型：指認、數數、連連看、塗色。" },
    { age: 5, name: "5 歲・字母聲音與押韻", units: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
      focus: "聽出單字開頭的聲音、認得字母、聽出押韻，開始說「我有…」。", how: "題型：聽聲音找圖、描字母、字母連連看、押韻配對。" },
    { age: 6, name: "6 歲・拼讀與閱讀", units: ["D1", "D2", "D3", "D4", "D5", "D6"],
      focus: "把聲音拼成字、認常見字、讀短句、回答日常問題、排故事順序。", how: "題型：拼字、補字母、找字、句子配圖、對話選答、排順序。" }
  ];
  var AGE_OF = {};
  W.MFE_AGES.forEach(function (a) { a.units.forEach(function (u) { AGE_OF[u] = a.age; }); });
  W.MFE_LESSONS.forEach(function (l) { l.age = AGE_OF[l.id] || 3; });
  // 單元列表依「年齡」排序（Z → A → B → C → D）
  var ORDER = []; W.MFE_AGES.forEach(function (a) { ORDER = ORDER.concat(a.units); });
  W.MFE_LESSONS.sort(function (x, y) { return ORDER.indexOf(x.id) - ORDER.indexOf(y.id); });

  // say：聽題時唸的句子，{w}＝單字，{a}＝a/an＋單字。bank：題目用的單字（W.WORD 的 id）。
  W.MFE_ACT = {
    Z1: { tip: "唱歌時一起指圖，孩子看或跟著動就好。", say: "{w}!", bank: ["boat", "sheep", "bubbles", "balloon", "drum", "bee"], plan: ["dots", "pick", "paint"] },
    Z2: { tip: "只說動物名稱和叫聲，孩子用手指就好。", say: "Where is the {w}?", bank: ["cow", "duck", "dog", "cat", "pig", "sheep"], plan: ["dots", "pick", "paint"] },
    Z3: { tip: "邊說邊輕輕碰孩子的那個部位。", say: "Touch your {w}.", bank: ["b_nose", "b_ear", "b_hand", "b_foot", "b_eye", "b_mouth"], plan: ["pick", "dots", "pick"] },
    Z4: { tip: "只放兩個顏色，孩子指到就好。", say: "{w}!", bank: ["c_red", "c_yellow", "c_blue", "c_green"], plan: ["pick", "paint", "match"], mm: "same" },
    Z5: { tip: "問完等一下，孩子看向或指向就算會。", say: "Where is the {w}?", bank: ["ball", "cup", "shoes", "teddy", "car", "book", "apple", "bed"], plan: ["pick", "dots", "pick"] },

    A1: { tip: "每次遞東西時說完整一句。", say: "Give me {a}, please.", bank: ["apple", "banana", "grapes", "orange", "milk", "cookie"], plan: ["match", "pick", "dots"] },
    A2: { tip: "輪到孩子時，用手勢示意就好。", say: "My turn! {a}.", bank: ["ball", "car", "blocks", "balloon", "puzzle", "kite"], plan: ["pick", "match", "dots"] },
    A3: { tip: "跟動物玩偶打招呼，孩子揮手就好。", say: "Say hi to the {w}!", bank: ["dog", "cat", "cow", "duck", "pig", "rabbit"], plan: ["match", "pick", "dots"] },
    A4: { tip: "吃飯時指著食物說，不要求孩子重複。", say: "{w}, please.", bank: ["apple", "bread", "milk", "rice", "cookie", "juice"], plan: ["pick", "match", "dots"] },
    A5: { tip: "洗澡、睡前時用同一句。", say: "Where is the {w}?", bank: ["soap", "toothbrush", "bed", "tissue", "mirror", "light"], plan: ["match", "pick", "dots"] },
    A6: { tip: "收玩具時一起放進籃子。", say: "Put the {w} here.", bank: ["blocks", "ball", "book", "teddy", "crayons", "bag"], plan: ["pick", "match", "dots"] },
    A7: { tip: "出門前拿著東西說。", say: "Get your {w}.", bank: ["shoes", "jacket", "hat", "bag", "socks", "umbrella"], plan: ["match", "pick", "dots"] },
    A8: { tip: "玩的時候用，孩子笑了就是成功。", say: "Look! {a}. Wow!", bank: ["ball", "kite", "bubbles", "teddy", "drum", "balloon"], plan: ["pick", "match", "dots"] },
    A9: { tip: "孩子做到時馬上說一句。", say: "Careful with the {w}.", bank: ["cup", "ball", "bottle", "bowl", "plate", "teddy"], plan: ["match", "pick", "dots"] },

    B1: { tip: "放顏色時只換一個字。", say: "Show me {w}.", bank: ["c_red", "c_yellow", "c_blue", "c_green", "c_orange", "c_purple", "c_pink", "c_white", "c_black", "c_brown"], plan: ["pick", "paint", "match"], mm: "same" },
    B2: { tip: "指著圖說 I see a ___。", say: "I see {a}.", bank: ["dog", "cat", "cow", "duck", "pig", "sheep", "horse", "rabbit", "elephant", "monkey", "lion", "tiger"], plan: ["pick", "match", "paint"] },
    B3: { tip: "邊說邊碰碰孩子或玩偶。", say: "Touch your {w}.", bank: ["b_head", "b_eye", "b_ear", "b_nose", "b_mouth", "b_hand", "b_foot", "b_tummy"], plan: ["pick", "match", "dots"] },
    B4: { tip: "數的時候用手指一個一個點。", say: "Show me {w}.", bank: ["n1", "n2", "n3", "n4", "n5"], objs: ["apple", "ball", "duck", "car", "cookie", "balloon"], plan: ["count", "pick", "count"] },
    B5: { tip: "孩子指到就好，不用逼他說。", say: "I like {w}.", bank: ["apple", "banana", "grapes", "orange", "strawberry", "watermelon"], plan: ["pick", "match", "dots"] },
    B6: { tip: "邊指邊發出車子的聲音。", say: "Here comes the {w}.", bank: ["car", "truck", "train", "airplane", "bus", "bike", "boat", "rocket"], plan: ["pick", "match", "paint"] },

    C1: { tip: "聲音用錄好的，或自己發出來。", bank: ["l_s", "l_a", "l_t"], plan: ["lpick", "lmatch", "trace"] },
    C2: { tip: "聲音用錄好的，或自己發出來。", bank: ["l_i", "l_p", "l_n"], plan: ["lpick", "lmatch", "trace"] },
    C3: { tip: "聲音用錄好的，或自己發出來。", bank: ["l_m", "l_d", "l_c"], plan: ["lpick", "lmatch", "trace"] },
    C4: { tip: "h 輕輕哈氣，r 嘴巴圓圓。", bank: ["l_e", "l_h", "l_r"], plan: ["lpick", "lmatch", "trace"] },
    C5: { tip: "b 嘴唇啪一下，f 咬下唇吹氣。", bank: ["l_b", "l_f", "l_l"], plan: ["lpick", "lmatch", "trace"] },
    C6: { tip: "o 和 u 容易混，別同時教。", bank: ["l_o", "l_u", "l_g"], plan: ["lpick", "lmatch", "trace"] },
    C7: { tip: "拉長結尾，讓孩子聽出一樣的聲音。", bank: ["r_cat", "r_dog", "r_pen", "r_bear"], pairs: [["r_cat", "r_hat"], ["r_dog", "r_frog"], ["r_pen", "r_hen"], ["r_bear", "r_chair"]], plan: ["rmatch", "rpick", "rmatch"] },
    C8: { tip: "你先說 I have a ___，再讓孩子選。", say: "I have {a}.", bank: ["ball", "dog", "cat", "bike", "book", "teddy", "bag", "car"], plan: ["pick", "dots", "pick"] },

    D1: { tip: "每個聲音點一下，再合起來唸。", words: ["w_cat", "w_hat", "w_bag"], mid: "a", plan: ["build", "fill", "findword"] },
    D2: { tip: "每個聲音點一下，再合起來唸。", words: ["w_bed", "w_pen", "w_pig"], mid: "ei", plan: ["build", "fill", "findword"] },
    D3: { tip: "每個聲音點一下，再合起來唸。", words: ["w_dog", "w_bus", "w_cup"], mid: "ou", plan: ["build", "fill", "findword"] },
    D4: { tip: "用手指指著字讀。", sight: ["I", "a", "the", "is", "my", "you", "see", "like"],
      sents: [["I see a cat.", "w_cat"], ["I like the dog.", "r_dog"], ["I see a bus.", "w_bus"], ["I like the pig.", "w_pig"], ["I see a hat.", "w_hat"], ["I like the cup.", "w_cup"]],
      words: ["w_cat", "r_dog", "w_bus", "w_pig", "w_hat", "w_cup"], plan: ["sight", "sentmatch", "findword"] },
    D5: { tip: "孩子答不出來就你替他說，下次再來。",
      dlg: [["What's your name?", ["My name is Tom.", "I'm six.", "I'm fine."], 0], ["How old are you?", ["I'm six.", "My name is Tom.", "I'm fine."], 0], ["How are you?", ["I'm fine, thank you.", "I'm six.", "My name is Tom."], 0],
        ["Are you happy?", ["Yes, I'm happy.", "My name is Tom.", "I'm six."], 0], ["What's your name?", ["I'm Anna.", "I'm five.", "I'm fine."], 0], ["How are you?", ["I'm great!", "I'm four.", "I'm Ben."], 0]],
      plan: ["dialog", "dialog", "dialog"] },
    D6: { tip: "先讓孩子說說圖，再排順序。",
      stories: [
        [["bed", "I wake up."], ["bread", "I eat breakfast."], ["bus", "I go to school."]],
        [["soap", "I wash my hands."], ["bread", "I eat lunch."], ["bed", "I go to bed."]],
        [["shoes", "I put on my shoes."], ["car", "We go to the park."], ["ball", "I play with a ball."]]
      ], plan: ["order", "order", "sentmatch"],
      sents: [["I wake up.", "bed"], ["I eat breakfast.", "bread"], ["I go to school.", "bus"], ["I wash my hands.", "soap"], ["I put on my shoes.", "shoes"], ["I play with a ball.", "ball"]] }
  };
})();
