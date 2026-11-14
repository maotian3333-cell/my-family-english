// 大量練習用的擴充：更多字詞、每個詞多個例句、字母例字庫、拼讀字庫、綜合複習。接在 curriculum.js 之後載入。
(function () {
  var W = window, A = W.MFE_ACT;
  function w(id, en, zh, pic) { return [id, en, zh, "svg:" + pic, "", "", ""]; }
  W.MFE_WORD_CATS.push({ id: "ex_more", icon: "➕", name: "更多字詞（練習用）", words: [
    w("envelope", "envelope", "信封", "envelope"), w("igloo", "igloo", "冰屋", "igloo"), w("insect", "insect", "昆蟲", "insect"), w("octopus", "octopus", "章魚", "octopus"),
    w("olive", "olive", "橄欖", "olive"), w("up", "up", "向上", "up"), w("pan", "pan", "平底鍋", "pan"), w("map", "map", "地圖", "map"), w("van", "van", "廂型車", "van"),
    w("net", "net", "網子", "net"), w("pin", "pin", "別針", "pin"), w("lid", "lid", "蓋子", "lid"), w("box", "box", "盒子", "box"), w("sun", "sun", "太陽", "sun"),
    w("nut", "nut", "堅果", "nut"), w("mug", "mug", "馬克杯", "mug"),
    w("ax", "ax", "斧頭", "ax"), w("ink", "ink", "墨水", "ink"), w("elbow", "elbow", "手肘", "elbow"), w("ox", "ox", "公牛", "ox"), w("uncle", "uncle", "叔叔", "uncle"), w("under", "under", "在下面", "under"), w("iguana", "iguana", "鬣蜥", "iguana")] });

  // 每個詞有多個例句，題目輪流使用
  var SAY = {
    Z1: ["{w}!", "Look, {a}!", "I see {a}."], Z2: ["Where is the {w}?", "Find the {w}.", "Show me the {w}."],
    Z3: ["Touch your {w}.", "Where is your {w}?", "Point to your {w}."], Z4: ["{w}!", "Show me {w}.", "Find {w}."],
    Z5: ["Where is the {w}?", "Show me the {w}.", "Get the {w}."],
    A1: ["Give me {a}, please.", "Can I have {a}, please?", "Here is {a}. Thank you!"], A2: ["My turn! {a}.", "Your turn! {a}.", "Ready, set, go! {a}!"],
    A3: ["Say hi to the {w}!", "Hello, {w}!", "Bye-bye, {w}!"], A4: ["{w}, please.", "Yummy {w}!", "All done, {w}!"],
    A5: ["Where is the {w}?", "Get the {w}.", "Look, the {w}!"], A6: ["Put the {w} here.", "Clean up the {w}.", "Where does the {w} go?"],
    A7: ["Get your {w}.", "Where is your {w}?", "Take your {w}."], A8: ["Look! {a}. Wow!", "I like the {w}.", "Let's play with the {w}."],
    A9: ["Careful with the {w}.", "Good job with the {w}!", "Try again with the {w}."],
    B1: ["Show me {w}.", "Which one is {w}?", "Find {w}."], B2: ["I see {a}.", "Look, {a}!", "Where is the {w}?"],
    B3: ["Touch your {w}.", "Where is your {w}?", "Show me your {w}."], B4: ["Show me {w}.", "Find {w}.", "Which one is {w}?"],
    B5: ["I like {w}.", "Do you like {w}?", "I want {w}."], B6: ["Here comes the {w}.", "Look at the {w}!", "I see the {w}."],
    C8: ["I have {a}.", "Show me {a}.", "Look! I have {a}."]
  };
  Object.keys(SAY).forEach(function (u) { A[u].say = SAY[u]; });

  // 更多題材
  function more(u, ids) { A[u].bank = A[u].bank.concat(ids); }
  more("Z1", ["ball", "kite"]); more("Z2", ["horse", "rabbit"]); more("Z3", ["b_head", "b_tummy"]); more("Z4", ["c_orange", "c_purple"]); more("Z5", ["bottle", "bowl"]);
  more("A1", ["pear", "peach", "bread", "water"]); more("A2", ["drum", "guitar", "piano", "bubbles"]); more("A3", ["sheep", "horse", "bird", "fish"]);
  more("A4", ["noodles", "egg", "soup", "cake"]); more("A5", ["water", "teddy", "book", "door"]); more("A6", ["car", "puzzle", "drum", "shoes"]);
  more("A7", ["pants", "boots", "gloves", "scarf"]); more("A8", ["piano", "rocket", "blocks", "puzzle"]); more("A9", ["phone", "keys", "mirror", "spoon"]);
  more("B3", ["b_hair", "b_tooth"]); more("B5", ["pear", "peach", "mango", "melon"]);

  // 字母例字庫
  var LEX = {
    C1: { s: ["sun", "soup", "soap", "socks", "sandwich", "spoon", "snail", "strawberry"], a: ["apple", "ant", "avocado", "ax"], t: ["tiger", "train", "turtle", "tomato", "truck", "teddy", "toothbrush"] },
    C2: { i: ["igloo", "insect", "ink", "iguana"], p: ["pig", "pizza", "pear", "peach", "panda", "piano", "pineapple"], n: ["b_nose", "noodles", "n9", "net", "nut"] },
    C3: { m: ["milk", "mango", "melon", "mushroom", "monkey", "mirror", "map", "mug"], d: ["dog", "drum", "dinosaur", "dress", "door", "duck", "dumpling"], c: ["cat", "cow", "cookie", "cake", "car", "cup", "candy", "carrot", "corn"] },
    C4: { e: ["egg", "elephant", "envelope", "elbow"], h: ["hat", "r_hen", "honey", "horse", "b_hand", "b_hair"], r: ["rabbit", "rice", "rocket", "c_red"] },
    C5: { b: ["ball", "banana", "bus", "bike", "bear", "bed", "book"], f: ["fish", "fork", "fries", "frog", "b_foot", "n5"], l: ["lion", "lemon", "lychee", "light", "lid"] },
    C6: { o: ["orange", "octopus", "olive", "ox"], u: ["umbrella", "up", "uncle", "under"], g: ["grapes", "guitar", "guava", "glasses", "gloves"] }
  };
  Object.keys(LEX).forEach(function (u) { A[u].lex = LEX[u]; });

  A.C7.pairs = [["cat", "hat"], ["dog", "frog"], ["pen", "r_hen"], ["bear", "chair"], ["pan", "van"], ["duck", "truck"], ["box", "socks"], ["light", "kite"], ["bee", "tea"]];
  A.C7.bank = ["cat", "dog", "pen", "bear"];

  // 拼讀字庫
  A.D1.words = ["cat", "hat", "bag", "pan", "map", "van"];
  A.D2.words = ["bed", "pen", "r_hen", "net", "pig", "pin", "lid"];
  A.D3.words = ["dog", "sun", "nut", "bus", "cup", "mug"];
  A.D4.sight = ["I", "a", "the", "is", "my", "you", "see", "like", "we", "can", "go", "it"];
  A.D4.sents = [["I see a cat.", "cat"], ["I like the dog.", "dog"], ["I see a bus.", "bus"], ["I like the pig.", "pig"], ["I see a hat.", "hat"], ["I like the cup.", "cup"],
    ["I see a pan.", "pan"], ["I like the map.", "map"], ["I see a box.", "box"], ["I like the sun.", "sun"]];
  A.D4.words = ["cat", "dog", "bus", "pig", "hat", "cup", "pan", "map", "box", "sun"];
  A.D5.dlg = A.D5.dlg.concat([
    ["Do you like apples?", ["Yes, I do.", "My name is Tom.", "I'm six."], 0], ["What color is it?", ["It's red.", "I'm six.", "Yes, I do."], 0],
    ["Can you jump?", ["Yes, I can.", "I'm fine.", "My name is Tom."], 0], ["Do you have a dog?", ["Yes, I do.", "I'm six.", "It's red."], 0],
    ["Are you sad?", ["No, I'm happy.", "My name is Tom.", "It's red."], 0]]);
  A.D6.stories = [
    [["bed", "I wake up."], ["bread", "I eat breakfast."], ["bus", "I go to school."]],
    [["soap", "I wash my hands."], ["rice", "I eat lunch."], ["bed", "I go to bed."]],
    [["shoes", "I put on my shoes."], ["car", "We go to the park."], ["ball", "I play with a ball."]],
    [["toothbrush", "I brush my teeth."], ["book", "I read a book."], ["bed", "I go to sleep."]],
    [["jacket", "I put on my jacket."], ["umbrella", "I take my umbrella."], ["door", "I go out."]]];
  A.D6.sents = [["I wake up.", "bed"], ["I eat breakfast.", "bread"], ["I go to school.", "bus"], ["I wash my hands.", "soap"], ["I put on my shoes.", "shoes"],
    ["I play with a ball.", "ball"], ["I brush my teeth.", "toothbrush"], ["I read a book.", "book"], ["I take my umbrella.", "umbrella"], ["I eat lunch.", "rice"]];

  // 綜合複習：從前面學過的單元混抽題目
  var RV = { RZ: [2, "Z", 5], RA: [3, "A", 9], RB: [4, "B", 6], RC: [5, "C", 8], RD: [6, "D", 6] };
  Object.keys(RV).forEach(function (k) {
    var r = RV[k], list = []; for (var i = 1; i <= r[2]; i++) list.push(r[1] + i);
    A[k] = { review: list, age: r[0], icon: "🔁", title: r[0] + " 歲綜合複習", tip: "把學過的單元混在一起玩，孩子答不出來就帶著看一次。" };
  });
  W.MFE_AGES.forEach(function (a) {
    var k = { 2: "RZ", 3: "RA", 4: "RB", 5: "RC", 6: "RD" }[a.age]; a.review = k;
    a.daily = { 2: "每天 1 到 2 分鐘，一次 1 回互動版就夠。", 3: "每天 3 分鐘，一次 1 到 2 回。", 4: "每天 3 到 5 分鐘，可以多玩幾回隨機練習。", 5: "每天 5 分鐘，聲音單元和複習輪流玩。", 6: "每天 5 到 10 分鐘，拼讀、閱讀、對話輪流。" }[a.age];
  });
})();
