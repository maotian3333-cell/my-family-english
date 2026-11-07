// 生活短語庫：每個場景 4~7 句。main:true 為該場景「本週主打」候選。
// known：預設給「第一位孩子」的初始狀態（2=已會，1=學習中），可在網站內修改。
window.MFE_SCENES = [
  { id: "meal", icon: "🍎", name: "餐桌", phrases: [
    { id: "give_me", en: "Give me ___, please.", say: "Give me apple, please.", zh: "請給我___", when: "孩子要東西時（主打，見 A1 引導階梯）", main: true, known: 1 },
    { id: "apple_or", en: "Apple or banana?", zh: "蘋果還是香蕉？", when: "讓孩子二選一，一次聽到兩個詞" },
    { id: "more_please", en: "More, please.", zh: "還要", when: "想再吃時" },
    { id: "all_done", en: "All done.", zh: "吃完了", when: "吃完、不吃時" },
    { id: "careful_hot", en: "Careful, it's hot!", zh: "小心，很燙", when: "熱湯、熱飯" },
    { id: "blow", en: "Blow, blow, blow.", zh: "呼呼吹吹", when: "吹涼食物" },
    { id: "yummy", en: "Yummy!", zh: "好好吃", when: "吃得開心時" }
  ]},
  { id: "out", icon: "🚪", name: "出門與回家", phrases: [
    { id: "lets_go", en: "Let's go!", zh: "走囉", when: "出門時", main: true, known: 2 },
    { id: "shoes_on", en: "Shoes on.", zh: "穿鞋子", when: "穿鞋時" },
    { id: "hold_hand", en: "Hold my hand.", zh: "牽我的手", when: "過馬路、停車場" },
    { id: "wait_me", en: "Wait for me.", zh: "等我一下", when: "你動作慢時，也可讓孩子學" },
    { id: "seat_belt", en: "Seat belt on.", zh: "繫安全帶", when: "上車" },
    { id: "were_home", en: "We're home!", zh: "到家囉", when: "回家" },
    { id: "shoes_off", en: "Shoes off.", zh: "脫鞋子", when: "進門" }
  ]},
  { id: "bath", icon: "🛁", name: "洗澡與睡前", phrases: [
    { id: "bath_time", en: "Bath time!", zh: "洗澡囉", when: "開始洗澡", main: true },
    { id: "wash3", en: "Wash, wash, wash.", zh: "洗洗洗", when: "洗手、洗身體" },
    { id: "brush3", en: "Brush, brush, brush.", zh: "刷刷刷", when: "刷牙" },
    { id: "time_bed", en: "Time for bed.", zh: "該睡覺了", when: "睡前" },
    { id: "good_night", en: "Good night.", zh: "晚安", when: "睡前道晚安", known: 2 },
    { id: "good_morning", en: "Good morning.", zh: "早安", when: "起床時", known: 2 },
    { id: "love_you", en: "I love you.", zh: "我愛你", when: "隨時" }
  ]},
  { id: "play", icon: "🧸", name: "玩耍", phrases: [
    { id: "lets_play", en: "Let's play!", zh: "來玩吧", when: "開始玩", main: true },
    { id: "my_turn", en: "My turn.", zh: "換我", when: "輪流時（指自己）" },
    { id: "your_turn", en: "Your turn.", zh: "換你", when: "輪流時（指孩子）" },
    { id: "look", en: "Look!", zh: "你看", when: "引起注意" },
    { id: "wow", en: "Wow!", zh: "哇", when: "驚喜時" },
    { id: "me_too", en: "Me too!", zh: "我也要", when: "孩子想加入時" },
    { id: "gentle", en: "Gentle, please.", zh: "輕輕的", when: "對弟妹、玩偶、寵物" },
    { id: "share", en: "Let's share.", zh: "一起分享", when: "兩個孩子都在時" },
    { id: "ready_q", en: "Are you ready?", zh: "準備好了嗎？", when: "遊戲開始前", known: 2 },
    { id: "ready_a", en: "Yes, I'm ready!", zh: "我準備好了！", when: "回答準備好了", known: 2 },
    { id: "rsg", en: "Ready, set, go!", zh: "預備，開始！", when: "賽跑、推車、溜滑梯前" }
  ]},
  { id: "calm", icon: "🤗", name: "安撫情緒", phrases: [
    { id: "its_okay", en: "It's okay.", zh: "沒關係", when: "跌倒、打翻", main: true },
    { id: "are_okay", en: "Are you okay?", zh: "你還好嗎", when: "受傷、哭泣" },
    { id: "need_hug", en: "Do you need a hug?", zh: "要抱抱嗎", when: "難過時" },
    { id: "deep_breath", en: "Deep breath.", zh: "深呼吸", when: "生氣、發脾氣" },
    { id: "im_here", en: "I'm here.", zh: "我在這裡", when: "害怕、分離焦慮" }
  ]},
  { id: "praise", icon: "👏", name: "稱讚與提醒", phrases: [
    { id: "good_job", en: "Good job!", zh: "做得好", when: "收玩具、吃完", main: true },
    { id: "you_did_it", en: "You did it!", zh: "你做到了", when: "完成一件事" },
    { id: "nice_try", en: "Nice try!", zh: "很棒的嘗試", when: "沒成功但有努力" },
    { id: "try_again", en: "Try again.", zh: "再試一次", when: "鼓勵" },
    { id: "careful", en: "Careful!", zh: "小心", when: "危險動作" },
    { id: "not_now", en: "Not now.", zh: "現在不行", when: "拒絕" },
    { id: "wait_min", en: "Wait a minute.", zh: "等一下", when: "讓孩子等待" }
  ]},
  { id: "give", icon: "🎁", name: "遞東西與禮貌", phrases: [
    { id: "here_you_are", en: "Here you are.", zh: "給你", when: "遞東西給對方", main: true, known: 2 },
    { id: "thank_you", en: "Thank you.", zh: "謝謝", when: "收到東西", known: 2 },
    { id: "youre_welcome", en: "You're welcome.", zh: "不客氣", when: "對方道謝", known: 2 },
    { id: "please", en: "Please.", zh: "請", when: "請求時" },
    { id: "hello", en: "Hello!", zh: "哈囉", when: "見面" },
    { id: "bye", en: "Bye-bye!", zh: "再見", when: "離開" },
    { id: "see_you", en: "See you!", zh: "待會見", when: "道別" }
  ]},
  { id: "action", icon: "🕺", name: "收玩具與動作", phrases: [
    { id: "clean_up", en: "Clean up time!", zh: "收玩具囉", when: "收玩具前", main: true },
    { id: "put_here", en: "Put it here.", zh: "放這裡", when: "把東西放進箱子" },
    { id: "sit_down", en: "Sit down.", zh: "坐下", when: "要坐好時" },
    { id: "stand_up", en: "Stand up.", zh: "站起來", when: "要起身時" },
    { id: "clap", en: "Clap your hands.", zh: "拍手", when: "歌曲、遊戲" },
    { id: "jump", en: "Jump!", zh: "跳", when: "動作遊戲" },
    { id: "stop_go", en: "Stop. Go.", zh: "停、走", when: "木頭人、紅綠燈" }
  ]}
];
