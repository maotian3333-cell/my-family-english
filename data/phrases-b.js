// 階段 B 的生活短語（接在 phrases.js 之後載入）。孩子都從「新」開始。
window.MFE_SCENES.push(
  { id: "color", icon: "🎨", name: "顏色與描述", phrases: [
    { id: "what_color", en: "What color is it?", zh: "這是什麼顏色？", when: "指著東西問（孩子不答，你直接回答）", main: true },
    { id: "its_color", en: "It's red.", say: "It's red.", zh: "是紅色", when: "回答時換成眼前的顏色" },
    { id: "i_see", en: "I see a ___.", say: "I see a bird.", zh: "我看到___", when: "散步、看書時指著說" },
    { id: "look_at", en: "Look at the ___.", say: "Look at the moon.", zh: "看那個___", when: "引導孩子注意東西" },
    { id: "big_small", en: "Big or small?", zh: "大的還是小的？", when: "二選一，孩子用手指" },
    { id: "same", en: "Same!", zh: "一樣！", when: "配對、找到一樣的東西" }
  ]},
  { id: "animal", icon: "🐶", name: "動物", phrases: [
    { id: "what_is_it", en: "What is it?", zh: "這是什麼？", when: "指著圖卡或繪本", main: true },
    { id: "its_a", en: "It's a ___.", say: "It's a cat.", zh: "是一隻___", when: "回答，換成動物名稱" },
    { id: "whos_that", en: "Who's that?", zh: "那是誰？", when: "找動物、玩偶" },
    { id: "animal_says", en: "The cow says moo.", zh: "牛說哞", when: "動物叫聲遊戲" },
    { id: "say_hi", en: "Say hi to the ___.", say: "Say hi to the dog.", zh: "跟___打招呼", when: "遇到動物時" }
  ]},
  { id: "body", icon: "🖐️", name: "身體與動作", phrases: [
    { id: "touch_nose", en: "Touch your nose.", zh: "摸摸你的鼻子", when: "身體遊戲（換成其他部位）", main: true },
    { id: "where_nose", en: "Where is your nose?", zh: "你的鼻子在哪裡？", when: "孩子用手指就好" },
    { id: "wave_hand", en: "Wave your hand.", zh: "揮揮手", when: "說 bye-bye 時" },
    { id: "stomp_feet", en: "Stomp your feet.", zh: "用力踏腳", when: "唱歌、跳舞時" },
    { id: "wash_hands", en: "Wash your hands.", zh: "洗手", when: "吃飯前、回家後" },
    { id: "tickle", en: "Tickle, tickle!", zh: "搔癢癢", when: "玩鬧時，孩子不喜歡就停" }
  ]},
  { id: "count", icon: "🔢", name: "數數", phrases: [
    { id: "count_me", en: "Count with me.", zh: "跟我一起數", when: "要數東西前", main: true },
    { id: "one_two_three", en: "One, two, three!", zh: "一、二、三", when: "數樓梯、拍手、準備出發" },
    { id: "how_many", en: "How many?", zh: "有幾個？", when: "數完後問，孩子用手指比也可以" },
    { id: "one_more", en: "One more.", zh: "再一個", when: "再吃一口、再玩一次" },
    { id: "again", en: "Again!", zh: "再一次", when: "孩子想重複玩的時候，你可以說給他聽" }
  ]},
  { id: "like", icon: "💛", name: "喜歡什麼", phrases: [
    { id: "i_like", en: "I like ___.", say: "I like apples.", zh: "我喜歡___", when: "你先示範說自己喜歡什麼", main: true },
    { id: "do_you_like", en: "Do you like ___?", say: "Do you like bananas?", zh: "你喜歡___嗎？", when: "孩子點頭或搖頭都算回應" },
    { id: "yes_i_do", en: "Yes, I do!", zh: "對，我喜歡", when: "替孩子回答，讓他先聽" },
    { id: "no_thanks", en: "No, thank you.", zh: "不用，謝謝", when: "不想要時的禮貌說法（讓孩子知道可以拒絕）" },
    { id: "what_want", en: "What do you want?", zh: "你想要什麼？", when: "A1 引導階梯的第 3 級問句" }
  ]},
  { id: "ride", icon: "🚌", name: "交通工具", phrases: [
    { id: "here_comes", en: "Here comes the ___.", say: "Here comes the bus.", zh: "___來了", when: "看到車子或玩車子時", main: true },
    { id: "beep_beep", en: "Beep, beep!", zh: "嗶嗶", when: "玩車子、按喇叭" },
    { id: "vroom", en: "Vroom, vroom!", zh: "嗡嗡（引擎聲）", when: "推玩具車" },
    { id: "lets_ride", en: "Let's ride the bus.", zh: "我們來坐公車", when: "搭車前" },
    { id: "look_truck", en: "Look, a truck!", zh: "看，卡車！", when: "路上看到車" }
  ]}
);
