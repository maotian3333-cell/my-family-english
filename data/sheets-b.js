// 階段 B 的紙本學習單規格（接在 worksheets.js 之後載入）。每個單元 3 個年齡段。
(function () {
  var b = window.MFE_SHEETS.build, S = b.S, C = b.C, M = b.M, Ci = b.Ci, T = b.T, O = b.O, X = b.X, H = b.H;
  var SP = window.MFE_SHEETS.SPEC;
  SP.B1 = {
    2: [S("找紅色貼紙", "Red! It's red!", "art:c_red", 4, "把紅色的貼紙（或畫紅色圓點）貼進顏料滴，每貼一個，你說 Red!"),
        C("三色塗塗看", "Red! Yellow! Blue!", ["shape:circle", "shape:circle", "shape:circle"], "分別塗紅、黃、藍，邊塗邊說顏色。孩子選什麼顏色都可以，亂塗也算。")],
    3: [M("水果與顏色連連看", "Apple is red. Banana is yellow.", [["art:apple", "art:c_red"], ["art:banana", "art:c_yellow"], ["art:grapes", "art:c_purple"], ["art:orange", "art:c_orange"]], false, "把水果連到牠的顏色。連完你說：Apple, red! 孩子不說也沒關係。"),
        Ci("聽顏色，圈一圈", [{ say: "Red!", opts: ["art:c_blue", "art:c_red", "art:c_green"], ans: 1 }, { say: "Yellow!", opts: ["art:c_yellow", "art:c_red", "art:c_blue"], ans: 0 }, { say: "Green!", opts: ["art:c_yellow", "art:c_blue", "art:c_green"], ans: 2 }], "你讀出灰色顏色詞，孩子圈出（或指出）正確的顏料。")],
    4: [M("說出顏色", "", [["art:apple", "It's red."], ["art:banana", "It's yellow."], ["art:grapes", "It's purple."], ["art:orange", "It's orange."]], false, "看圖想想它是什麼顏色，再連到對應的句子。"),
        X("顏色卡（剪下來玩）", "What color is it? It's red.", [["art:c_red", "red"], ["art:c_yellow", "yellow"], ["art:c_blue", "blue"], ["art:c_green", "green"], ["art:c_orange", "orange"], ["art:c_purple", "purple"]], "剪下卡片，孩子在家裡找同色的東西放在卡片上。")]
  };
  SP.B2 = {
    2: [S("小動物貼貼樂", "I see a dog! Woof, woof!", "art:dog", 4, "貼任何貼紙（或畫圓圈）給小狗當玩伴，每貼一個，你說 Woof!"),
        C("幫動物塗顏色", "Cat! Duck!", ["art:cat", "art:duck"], "塗色時只說動物名稱與叫聲：Cat, meow! Duck, quack!")],
    3: [M("動物影子連連看", "Dog! Cat! Cow! Duck!", [["art:dog", "art:dog"], ["art:cat", "art:cat"], ["art:cow", "art:cow"], ["art:duck", "art:duck"]], true, "把動物和牠的影子連起來。邊連邊說動物名稱或叫聲。"),
        Ci("誰在叫？", [{ say: "Moo, moo!", opts: ["art:dog", "art:cow", "art:duck"], ans: 1 }, { say: "Quack, quack!", opts: ["art:duck", "art:cat", "art:cow"], ans: 0 }, { say: "Woof, woof!", opts: ["art:cat", "art:duck", "art:dog"], ans: 2 }], "你學叫聲，孩子圈出是誰（或學叫聲回答）。")],
    4: [M("動物怎麼叫？", "", [["art:cow", "Moo!"], ["art:duck", "Quack!"], ["art:dog", "Woof!"], ["art:cat", "Meow!"]], false, "把動物連到牠的叫聲，連完一起學叫一遍。"),
        H("動物園貼紙表", "I see a dog!", 10, "每看到一隻動物（真的、繪本、圖卡）就貼一個。", "不一定要說英文，看見就算。")]
  };
  SP.B3 = {
    2: [S("幫小熊貼貼", "Touch your nose!", "art:b_head", 4, "把貼紙貼在圖中的頭旁邊，孩子貼一個，你就摸摸他的鼻子，說 Nose!"),
        C("手和腳塗色", "Hands! Feet!", ["art:b_hand", "art:b_foot"], "塗色時摸摸自己的手和腳，說 Hand! Foot!")],
    3: [Ci("摸摸看，圈一圈", [{ say: "Touch your nose.", opts: ["art:b_nose", "art:b_ear", "art:b_eye"], ans: 0 }, { say: "Touch your ears.", opts: ["art:b_mouth", "art:b_ear", "art:b_hand"], ans: 1 }, { say: "Touch your hands.", opts: ["art:b_foot", "art:b_tooth", "art:b_hand"], ans: 2 }], "你說句子，孩子先摸自己，再圈圖（或指圖）。"),
        T("摸到小肚子", "Touch your tummy!", "art:b_hand", "art:b_tummy", "孩子沿虛線把手移到肚子，你說 Tummy!")],
    4: [M("身體部位連連看", "", [["art:b_eye", "eyes"], ["art:b_ear", "ears"], ["art:b_nose", "nose"], ["art:b_mouth", "mouth"]], false, "圖片是身體哪個部位？請孩子連到對應的字，你念出來。"),
        O("洗手的順序", "Wash your hands. Dry your hands.", [["art:soap", "Soap on."], ["art:b_hand", "Wash your hands."], ["art:tissue", "Dry your hands."]], "剪下卡片，依洗手順序貼進格子，邊貼邊說。")]
  };
  SP.B4 = {
    2: [S("一個、兩個、三個", "One, two, three!", "art:apple", 5, "每貼一個貼紙，你說下一個數字：One, two, three...。數到幾都好。"),
        C("數字塗色", "One! Two! Three!", ["art:n1", "art:n2", "art:n3"], "邊塗邊說 One, two, three。")],
    3: [M("數字影子連連看", "One! Two! Three! Four!", [["art:n1", "art:n1"], ["art:n2", "art:n2"], ["art:n3", "art:n3"], ["art:n4", "art:n4"]], true, "把數字和牠的影子連起來。邊連邊說數字。"),
        Ci("圈出對的數字", [{ say: "Two!", opts: ["art:n1", "art:n2", "art:n3"], ans: 1 }, { say: "Three!", opts: ["art:n3", "art:n1", "art:n2"], ans: 0 }, { say: "One!", opts: ["art:n2", "art:n3", "art:n1"], ans: 2 }], "你說數字，孩子圈出對的數字（也可以拿出對應數量的東西）。")],
    4: [O("數字排排站", "One, two, three, four, five.", [["art:n1", "One"], ["art:n2", "Two"], ["art:n3", "Three"], ["art:n4", "Four"], ["art:n5", "Five"]], "剪下數字卡，依 1 到 5 的順序貼進格子，邊貼邊數。"),
        H("數數貼紙表", "One, two, three!", 10, "孩子數一次（或聽你數一次）就貼一個。", "不要要求數得多、數得快；願意聽就很好。")]
  };
  SP.B5 = {
    2: [S("我喜歡蘋果", "I like apples!", "art:apple", 4, "貼一個貼紙，說一次 I like apples! 孩子笑了就是最好的回應。"),
        C("愛心塗色", "I like it!", ["shape:heart", "shape:heart"], "邊塗邊說 I like it! 孩子想塗什麼顏色都可以。")],
    3: [Ci("喜歡哪一個？", [{ say: "I like apples.", opts: ["art:apple", "art:banana", "art:milk"], ans: 0 }, { say: "I like bananas.", opts: ["art:grapes", "art:banana", "art:cookie"], ans: 1 }, { say: "I like milk.", opts: ["art:cookie", "art:egg", "art:milk"], ans: 2 }], "你說句子，孩子圈出（或指出）。圈錯不糾正；也可以讓孩子圈他自己喜歡的，你說 I like..."),
        M("找一樣的", "Same!", [["art:apple", "art:apple"], ["art:banana", "art:banana"], ["art:milk", "art:milk"], ["art:cookie", "art:cookie"]], true, "把食物和牠的影子連起來。連對時說 Same! 孩子說出自己喜歡哪個。")],
    4: [M("我喜歡…", "", [["art:apple", "I like apples."], ["art:banana", "I like bananas."], ["art:milk", "I like milk."], ["art:cookie", "I like cookies."]], false, "圖片是什麼？請孩子連到句子，你念出來，再問 Do you like it?"),
        H("我喜歡的貼紙表", "I like it!", 10, "孩子說出（或指出）一樣喜歡的東西，就貼一個。", "任何答案都好，不評論好壞。")]
  };
  SP.B6 = {
    2: [S("車子停車場", "Beep, beep! Vroom, vroom!", "art:bus", 4, "把貼紙貼在公車旁邊，每貼一個，你說 Beep, beep!"),
        C("車子塗色", "Car! Bus!", ["art:car", "art:bus"], "塗色時說：Car! Bus! Vroom, vroom!")],
    3: [M("車子影子連連看", "Car! Bus! Truck! Train!", [["art:car", "art:car"], ["art:bus", "art:bus"], ["art:truck", "art:truck"], ["art:train", "art:train"]], true, "把車子和牠的影子連起來。邊連邊說名稱或聲音。"),
        T("開車回家", "Vroom, vroom!", "art:car", "shape:house", "孩子用手指或蠟筆沿虛線把車子開回家，你說 Vroom, vroom!")],
    4: [M("什麼來了？", "", [["art:bus", "Here comes the bus."], ["art:truck", "Here comes the truck."], ["art:train", "Here comes the train."], ["art:car", "Here comes the car."]], false, "圖片是什麼？請孩子連到句子，你念出來，再一起說 Beep, beep!"),
        X("交通工具卡（剪下來玩）", "Here comes the bus.", [["art:car", "car"], ["art:bus", "bus"], ["art:truck", "truck"], ["art:train", "train"], ["art:airplane", "airplane"], ["art:boat", "boat"]], "剪下卡片，把車子推到桌上，你說 Here comes the ___。")]
  };
})();
