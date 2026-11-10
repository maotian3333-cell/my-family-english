// 階段 B 圖卡類別與句型（接在 words.js 之後載入）
(function () {
  window.MFE_PATTERNS.push(
    { id: "its", name: "It's ___.", zh: "它是___（顏色、數字）", stem: "It's", ask: "What color is it? / How many?", stageA: false, hint: "你指著東西問，孩子不會答就由你回答；孩子說一個詞就算成功" },
    { id: "i_see", name: "I see a ___.", zh: "我看到___", stem: "I see", ask: "What do you see?", stageA: false, hint: "看繪本、散步時指著說；換孩子說之前先讓他聽很多次" },
    { id: "touch_your", name: "Touch your ___.", zh: "摸摸你的___", stem: "Touch your", ask: null, stageA: false, hint: "身體遊戲：你說，孩子用手摸；也可以換孩子下指令給你" },
    { id: "i_like", name: "I like ___.", zh: "我喜歡___", stem: "I like", ask: "Do you like it?", stageA: false, hint: "你先說自己喜歡什麼，孩子點頭或搖頭都算回應" },
    { id: "here_comes", name: "Here comes the ___.", zh: "___來了", stem: "Here comes the", ask: null, stageA: false, hint: "玩具車、繪本、看到真的車時說" }
  );
  var W = window.MFE_WORD_CATS;
  W.push(
    { id: "colors", icon: "🎨", name: "顏色", words: [
      ["c_red", "red", "紅色", "svg:c_red", "u"], ["c_yellow", "yellow", "黃色", "svg:c_yellow", "u"], ["c_blue", "blue", "藍色", "svg:c_blue", "u"], ["c_green", "green", "綠色", "svg:c_green", "u"],
      ["c_orange", "orange", "橘色", "svg:c_orange", "u"], ["c_purple", "purple", "紫色", "svg:c_purple", "u"], ["c_pink", "pink", "粉紅色", "svg:c_pink", "u"], ["c_white", "white", "白色", "svg:c_white", "u"],
      ["c_black", "black", "黑色", "svg:c_black", "u"], ["c_brown", "brown", "咖啡色", "svg:c_brown", "u"]
    ]},
    { id: "body", icon: "🖐️", name: "身體", words: [
      ["b_head", "head", "頭", "svg:b_head", "u"], ["b_hair", "hair", "頭髮", "svg:b_hair", "u"], ["b_eye", "eyes", "眼睛", "svg:b_eye", "u"], ["b_ear", "ears", "耳朵", "svg:b_ear", "u"],
      ["b_nose", "nose", "鼻子", "svg:b_nose", "u"], ["b_mouth", "mouth", "嘴巴", "svg:b_mouth", "u"], ["b_tooth", "teeth", "牙齒", "svg:b_tooth", "u"], ["b_hand", "hands", "手", "svg:b_hand", "u"],
      ["b_tummy", "tummy", "肚子", "svg:b_tummy", "u"], ["b_foot", "feet", "腳", "svg:b_foot", "u"]
    ]},
    { id: "numbers", icon: "🔢", name: "數字 1–10", words: [
      ["n1", "one", "一", "svg:n1", "u"], ["n2", "two", "二", "svg:n2", "u"], ["n3", "three", "三", "svg:n3", "u"], ["n4", "four", "四", "svg:n4", "u"], ["n5", "five", "五", "svg:n5", "u"],
      ["n6", "six", "六", "svg:n6", "u"], ["n7", "seven", "七", "svg:n7", "u"], ["n8", "eight", "八", "svg:n8", "u"], ["n9", "nine", "九", "svg:n9", "u"], ["n10", "ten", "十", "svg:n10", "u"]
    ]},
    { id: "vehicles", icon: "🚌", name: "交通工具", words: [
      ["v_car", "car", "汽車", "svg:car"], ["v_bus", "bus", "公車", "svg:bus"], ["v_truck", "truck", "卡車", "svg:truck"], ["v_train", "train", "火車", "svg:train"],
      ["v_airplane", "airplane", "飛機", "svg:airplane"], ["v_bike", "bike", "腳踏車", "svg:bike"], ["v_boat", "boat", "船", "svg:boat"], ["v_rocket", "rocket", "火箭", "svg:rocket"]
    ]}
  );
  Object.assign(window.MFE_LESSON_CARDS, {
    B1: { pat: "its", cat: "colors" }, B2: { pat: "i_see", cat: "animals" }, B3: { pat: "touch_your", cat: "body" },
    B4: { pat: "its", cat: "numbers" }, B5: { pat: "i_like", cat: "fruit" }, B6: { pat: "here_comes", cat: "vehicles" }
  });
})();
