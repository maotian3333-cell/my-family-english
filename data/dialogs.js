// 簡單對話腳本：夥伴（小怪獸）先說，孩子選回答。ch 是孩子可選的回答，ok:true 是合適的；r 是夥伴的回應。
// a/b：給家長的 A（中文為主夾一個英文詞）、B（中英夾雜）版本；英文版就是 turns 本身（C）。
window.MFE_DIALOGS = [
  { id: "d_hello", icon: "👋", title: "Hello!", zh: "打招呼", age: 3, sc: "room", tip: "孩子揮手、點頭或說 Hi 都算回應。",
    a: "你說：哈囉！孩子揮揮手。你問：你好嗎？孩子說或指開心的臉就好。", b: "Hello! 你好！How are you? 你好嗎？我很好 I'm happy!",
    turns: [
      { sp: "p", en: "Hello!", zh: "哈囉！" },
      { sp: "y", ch: [{ en: "Hello!", zh: "哈囉！", ok: 1, r: "Nice to see you!" }, { en: "Goodbye!", zh: "再見！" }] },
      { sp: "p", en: "How are you?", zh: "你好嗎？" },
      { sp: "y", ch: [{ en: "I'm happy!", zh: "我很開心！", ok: 1, pic: "em_happy", r: "Me too!" }, { en: "I'm sleepy.", zh: "我想睡。", ok: 1, pic: "em_sleepy", r: "Oh, let's rest." }, { en: "Goodbye!", zh: "再見！" }] },
      { sp: "p", en: "See you!", zh: "再見囉！" }
    ] },
  { id: "d_this", icon: "🍎", title: "What's This?", zh: "這是什麼？", age: 3, sc: "kitchen", tip: "拿真的蘋果問，孩子指或說 apple 都算。",
    a: "你拿蘋果問：這是什麼？孩子指一指。你說：這是蘋果，apple。", b: "What's this? 這是什麼？It's an apple! 蘋果！",
    turns: [
      { sp: "p", en: "What's this?", zh: "這是什麼？", pic: "apple" },
      { sp: "y", ch: [{ en: "It's an apple.", zh: "是蘋果。", ok: 1, r: "Yes! An apple!" }, { en: "It's a dog.", zh: "是小狗。" }] },
      { sp: "p", en: "What's this?", zh: "這是什麼？", pic: "cat" },
      { sp: "y", ch: [{ en: "It's a cat.", zh: "是小貓。", ok: 1, r: "Yes! A cat!" }, { en: "It's a banana.", zh: "是香蕉。" }] }
    ] },
  { id: "d_snack", icon: "🍪", title: "Snack Time", zh: "點心時間", age: 4, sc: "kitchen", tip: "Yes, please 和 No, thank you 都可以，孩子有選擇權。",
    a: "你問：想吃餅乾嗎？孩子點頭或搖頭。給的時候說 Here you are，他接過說謝謝。", b: "Do you want a cookie? 想吃餅乾嗎？Yes, please! Thank you!",
    turns: [
      { sp: "p", en: "Do you want a cookie?", zh: "你想吃餅乾嗎？", pic: "cookie" },
      { sp: "y", ch: [{ en: "Yes, please!", zh: "好，麻煩你！", ok: 1, r: "Here you are!" }, { en: "No, thank you.", zh: "不用，謝謝。", ok: 1, r: "OK. Later!" }] },
      { sp: "y", ch: [{ en: "Thank you!", zh: "謝謝！", ok: 1, r: "You're welcome!" }, { en: "Goodbye!", zh: "再見！" }] }
    ] },
  { id: "d_please", icon: "⚽", title: "Can I Have It?", zh: "可以給我嗎？", age: 4, sc: "play", tip: "練習 Please 和 Thank you，和輪流玩的概念一起。",
    a: "你說：我要球，請給我。孩子把球遞給你。你說謝謝。", b: "Can I have the ball, please? 可以給我球嗎？Here you are. Thank you!",
    turns: [
      { sp: "p", en: "Can I have the ball, please?", zh: "可以給我球嗎？", pic: "ball" },
      { sp: "y", ch: [{ en: "Here you are.", zh: "給你。", ok: 1, r: "Thank you!" }, { en: "Goodbye.", zh: "再見。" }] },
      { sp: "p", en: "My turn! Your turn!", zh: "我玩，換你玩！" }
    ] },
  { id: "d_feel", icon: "😢", title: "Are You Sad?", zh: "你難過嗎？", age: 4, sc: "room", tip: "孩子難過時，先命名感受再抱抱，不必要求他說英文。",
    a: "你問：你難過嗎？孩子點頭，你說：抱抱 hug。", b: "Are you sad? 你難過嗎？Yes, I'm sad. Hug? 抱抱？",
    turns: [
      { sp: "p", en: "Are you sad?", zh: "你難過嗎？", pic: "em_sad" },
      { sp: "y", ch: [{ en: "No, I'm happy!", zh: "不，我很開心！", ok: 1, pic: "em_happy", r: "Great!" }, { en: "Yes, I'm sad.", zh: "對，我難過。", ok: 1, pic: "em_sad", r: "Oh. Hug?" }, { en: "I'm a dog.", zh: "我是小狗。" }] },
      { sp: "p", en: "It's okay.", zh: "沒關係。" }
    ] },
  { id: "d_bed", icon: "🌙", title: "Time for Bed", zh: "該睡覺了", age: 3, sc: "bedroom", tip: "固定睡前的對話，孩子會慢慢熟悉。",
    a: "你說：該睡覺了，晚安。孩子說晚安或抱一下。", b: "Time for bed! 該睡覺了。Good night! 晚安！",
    turns: [
      { sp: "p", en: "Time for bed!", zh: "該睡覺了！", pic: "bed" },
      { sp: "y", ch: [{ en: "OK!", zh: "好！", ok: 1, r: "Good job!" }, { en: "Hello!", zh: "哈囉！" }] },
      { sp: "p", en: "Good night!", zh: "晚安！", pic: "vb_sleep" },
      { sp: "y", ch: [{ en: "Good night!", zh: "晚安！", ok: 1, r: "Sweet dreams!" }, { en: "Good morning!", zh: "早安！" }] }
    ] },
  { id: "d_play", icon: "🤸", title: "Let's Play!", zh: "一起玩吧", age: 4, sc: "garden", tip: "選一個動作一起做，做完再換下一個。",
    a: "你說：一起玩，跳一跳。孩子跟著跳。", b: "Let's play! 一起玩！Let's jump! 我們跳！",
    turns: [
      { sp: "p", en: "Let's play!", zh: "一起玩吧！" },
      { sp: "y", ch: [{ en: "OK! Let's jump!", zh: "好！我們跳！", ok: 1, pic: "vb_jump", r: "Jump, jump, jump!" }, { en: "OK! Let's run!", zh: "好！我們跑！", ok: 1, pic: "vb_run", r: "Run, run, run!" }, { en: "Good night.", zh: "晚安。" }] },
      { sp: "p", en: "Great job!", zh: "太棒了！" }
    ] }
];
