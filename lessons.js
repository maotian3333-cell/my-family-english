// 階段 A 教材卡（A1~A9）。內容與程式分開：新增教材只要在這裡加一筆。
// 欄位 kid 是「孩子模式預留」，目前只在教材卡中顯示為參考。
window.MFE_LESSONS = [
{
  id: "A1", stage: "A", icon: "🎁", title: "請求與遞東西",
  goal: "孩子想要東西時，能說出或接著說完 Give me ___, please；遞東西、收東西時能用 Here you are / Thank you。",
  phrases: ["give_me", "apple_or", "here_you_are", "thank_you", "youre_welcome", "please"],
  words: ["apple 蘋果", "banana 香蕉", "（之後輪替）grapes 葡萄、orange 橘子、strawberry 草莓、watermelon 西瓜、pear 梨子"],
  ladder: [
    ["0", "完整示範：Give me apple, please. 再把蘋果給孩子", "聽、接"],
    ["1", "說前半句後停住：Give me…", "孩子接 apple 或 please（只接一個詞也算成功）"],
    ["2", "指著水果，用眼神等待", "孩子自己說出全部或一部分"],
    ["3", "只問：What do you want?", "孩子說 Give me apple, please"],
    ["4", "不提示", "孩子自己開口（主動使用）"]
  ],
  scripts: {
    A: "想吃蘋果嗎？我們要跟媽媽說 please，Give me apple, please。（只示範，不逼說）",
    B: "Apple or banana? 你想吃哪個？說 Give me apple, please。好，Here you are！",
    C: "Apple or banana? Give me apple, please. Here you are. Thank you! You're welcome."
  },
  puppet: ["Give me banana, please!", "Thank you!", "Yummy!"],
  steps: [
    "水果切好，放在孩子看得見但拿不到的位置。",
    "拿出 2 種水果，說「Apple or banana?」",
    "依引導階梯讓孩子表達，卡在哪一級就停在哪一級，不跳級。",
    "孩子說出時，立刻給水果並說 Here you are（連結已會的句子）。",
    "孩子說 Thank you，你回 You're welcome。"
  ],
  game: "「小郵差」：孩子當郵差，把物品送給家人，每送一個說（或聽）一句 Here you are。",
  song: "這個單元以生活情境為主，不需要專屬歌曲。",
  book: "任何有 Thank you 的低字數書，請孩子自己選。",
  life: "每次吃水果、遞東西時各用一次，一整天自然帶 2 到 3 次就夠。",
  twoKids: "大寶先說，二寶聽（模仿很有效）；二寶只要伸手或指，你代說：Give me apple, please. Here you are. 不要比較兩人進度。",
  resist: [
    "孩子不想你說英文：由玩偶代說，你改中文。",
    "孩子只想自己說：讓他當說話的人，你當接收者。",
    "不要要求「再說一次」，聽到他自然說就是成功。"
  ],
  quick: "只做一次「Apple or banana?」加一次要求。",
  observe: "能接上一個詞＝能回應；沒提示自己說＝主動使用。",
  paper: "做水果點餐卡（蘋果、香蕉各一張），孩子指卡就能「點餐」，你補完整句。",
  kid: { hero: "小熊的水果攤（果凍呼吸）", buttons: "手遞物圖示（Here you are）、愛心（Thank you）、微笑（You're welcome），無文字", game: "點水果圖聽到 Give me apple, please；孩子按「說」鈕才得到水果", palette: "方案 A，主按鈕用芒果暖黃", note: "無文字測試：遮住文字後，圖示能否讓孩子懂得「點水果給小熊」？" },
  review: "隔天、3 天後、1 週後，各自然帶一次。"
},
{
  id: "A2", stage: "A", icon: "🚦", title: "準備好了嗎？輪流玩",
  goal: "孩子聽到 Are you ready? 會回答或做出「準備好」的動作，並懂得 My turn / Your turn。",
  phrases: ["ready_q", "ready_a", "rsg", "my_turn", "your_turn"],
  words: [],
  scripts: {
    A: "我們要比賽跑到沙發囉，小熊問：Are you ready？你說好了嗎？（問句由玩偶說）",
    B: "Are you ready? 好，Ready, set, go！換你囉，Your turn！",
    C: "Are you ready? Ready, set, go! It's my turn. Now it's your turn."
  },
  puppet: ["Are you ready?", "I'm ready!", "My turn!"],
  steps: [
    "選一個孩子愛玩的活動（推車、丟球、溜滑梯）。",
    "開始前問 Are you ready?，等孩子回答。",
    "孩子說 Yes, I'm ready! 或點頭後，說 Ready, set, go!",
    "輪流時，指自己說 My turn，指孩子說 Your turn。",
    "結束時簡單稱讚：Good job!"
  ],
  game: "「紅綠燈」：Ready, set, go 開跑，大人喊 Stop 就停（和 A6 的 Stop / Go 連結）。",
  song: "搭配他已熟悉的歌即可。",
  book: "選有輪流或倒數情節的低字數圖畫書，由孩子選。",
  life: "下次玩任何遊戲前，自然問一次 Are you ready?",
  twoKids: "大寶回答 Yes, I'm ready! 時，二寶聽到完整示範；輪流時用 My turn / Your turn 也等於教兩人排隊。",
  resist: ["孩子不喜歡被「問準備好沒」：改成玩偶演示，或你直接開始，不用問。"],
  quick: "只做一次「Are you ready? / Ready, set, go!」。",
  observe: "聽到 Are you ready? 就擺出預備姿勢＝能回應；自己說 Ready!＝主動使用。",
  paper: "做紅綠燈卡（綠＝go，紅＝stop），孩子舉牌決定動作；或做「輪流卡」，my turn 貼自己的照片、your turn 貼家人的照片（照片只放在家裡，不上傳）。",
  kid: { hero: "小熊站在起跑線上", buttons: "綠色大圓鈕（Go）、舉手圖示（Ready）", game: "孩子按下 Ready，小熊跑起來，倒數音效", palette: "方案 A，Go 用草莓粉橘", note: "防誤觸：Go 與 Ready 間距大於 24dp，Ready 放大並置中。" },
  review: "下次玩任何遊戲前自然帶入。"
},
{
  id: "A3", stage: "A", icon: "👋", title: "Hello 與 Goodbye",
  goal: "孩子遇到人或出門時，能用或聽懂 Hello / Bye-bye / Good morning / Good night / See you。",
  phrases: ["hello", "bye", "see_you", "good_morning", "good_night"],
  words: [],
  scripts: {
    A: "小熊睡醒了，牠說 Good morning！我們也跟牠問早安。",
    B: "Good morning! 今天太陽好大。出門囉，Bye-bye！",
    C: "Good morning, sweetie. Did you sleep well? Time to go. Bye-bye! See you later!"
  },
  puppet: ["Hello!", "Good morning!", "Bye-bye!"],
  steps: [
    "每天起床固定一句：Good morning。",
    "出門時讓孩子對玩偶或家人說 Bye-bye。",
    "回家時說 Hello。",
    "睡前說 Good night，連同絨毛玩具。",
    "孩子自己說了就停，不要追問。"
  ],
  game: "「小熊敲門」：玩偶敲門說 Hello，孩子開門回應，再玩 Bye-bye。",
  song: "挑一首簡單的 Hello 歌固定使用，由孩子選要不要唱。",
  book: "不需要專屬書。",
  life: "把 Hello / Bye-bye 綁在開門和關門，不需另排時間。",
  twoKids: "二寶還小，你對二寶說 Good morning、Good night 就是最好的輸入；大寶可以幫忙對弟妹說。",
  resist: ["孩子本來就會說的句子不要特別糾正；他拒絕就跳過，改由玩偶說。"],
  quick: "只做起床的 Good morning 一句。",
  observe: "看到玩偶說 Hello 會揮手＝能回應；主動對人說 Hello / Bye-bye＝主動使用。",
  paper: "做「太陽卡」（早安）和「月亮卡」（晚安），貼在房門，進出房間時指著說。",
  kid: { hero: "太陽與月亮，點擊切換早晚", buttons: "太陽圖示（Good morning）、月亮圖示（Good night）、揮手（Bye-bye）", game: "點太陽，小熊醒來；點月亮，小熊睡覺", palette: "早安用方案 A，晚安用方案 C", note: "護眼測試：晚上畫面不可白得發亮。" },
  review: "每天自然帶入，不需另排時間。"
},
{
  id: "A4", stage: "A", icon: "🍽️", title: "吃飯時間",
  goal: "吃飯時，孩子聽到 Apple or banana? / More, please / All done / Yummy 能有對應反應，並能聽懂 Careful, it's hot。",
  phrases: ["apple_or", "more_please", "all_done", "yummy", "careful_hot", "blow"],
  words: ["eat 吃", "drink 喝", "milk 牛奶", "water 水", "rice 飯", "apple 蘋果"],
  scripts: {
    A: "小熊肚子餓了，牠說 I'm hungry！我們來看看有什麼，milk 牛奶，apple 蘋果。",
    B: "Are you hungry? 來，Let's eat！好吃嗎？Yummy！還要嗎？More, please？",
    C: "Are you hungry? Let's eat! Here is your milk. Do you want more? All done?"
  },
  puppet: ["I'm hungry!", "Yummy!", "More, please!"],
  steps: [
    "吃飯前，玩偶先出場：I'm hungry!",
    "拿出 2 樣食物，說名稱並二選一：Milk or water?",
    "讓孩子把食物遞給玩偶（承接 A1：Here you are）。",
    "玩偶說 Yummy，邀請孩子也說。",
    "熱的食物說 Careful, it's hot! 再一起 Blow, blow, blow。",
    "結束時 All done，一起收拾。"
  ],
  game: "「餵小熊」：孩子把玩具食物餵給小熊，每餵一樣說名稱。",
  song: "任一首簡單的食物歌，拍手搭配即可。",
  book: "低字數食物主題繪本，由孩子選。",
  life: "每餐只選 1 句主打（例如 More, please），其餘不用硬記。",
  twoKids: "二寶幾個月大時，你餵副食品或奶時說 Yummy、All done，就是自然輸入。",
  resist: ["吃飯時孩子專注吃就不硬教，只在他有興趣時玩；孩子喊「不是」就改用中文，下次換玩具食物而不是真食物。"],
  quick: "只做玩偶說 Yummy，加孩子遞一樣食物。",
  observe: "聽到 milk 能指對＝能指認；吃完自己說 All done 或 Yummy＝主動使用。",
  paper: "剪食物圖卡，貼在餐桌墊旁，每餐選一張當「今日英文詞」；扮家家酒的小餐桌也行。",
  kid: { hero: "小熊，圍著餐巾", buttons: "食物圖片（點擊聽名稱）、愛心（Yummy）", game: "把食物拖給小熊，小熊吃掉並發出 Yummy", palette: "方案 C（奶油黃）", note: "進度條可用毛毛蟲吃蘋果。" },
  review: "每餐自然帶，隔天、3 天後、1 週後各看一次孩子是否還認得。"
},
{
  id: "A5", stage: "A", icon: "🛁", title: "洗澡與睡覺",
  goal: "洗澡與睡前，孩子聽到 Bath time / Wash, wash, wash / Time for bed / Good night 能做出對應動作。",
  phrases: ["bath_time", "wash3", "brush3", "time_bed", "good_night", "love_you"],
  words: [],
  scripts: {
    A: "小熊說 Bath time！我們要洗澡了。小熊說要洗手，wash your hands。",
    B: "Bath time! 先 wash, wash, wash，洗乾淨乾淨。好，Time for bed，Good night。",
    C: "It's bath time. Wash your hands. Brush your teeth. Time for bed. Good night. Sweet dreams."
  },
  puppet: ["Bath time!", "I'm sleepy.", "Good night!"],
  steps: [
    "洗澡前固定說 Bath time，用同一個語調。",
    "洗手時搭配動作：Wash, wash, wash。",
    "刷牙時 Brush, brush, brush。",
    "睡前讓玩偶一起上床：Time for bed.",
    "關燈前輕聲說 Good night，加上 I love you。"
  ],
  game: "「幫小熊洗澡」：孩子用毛巾幫玩偶洗，每個部位說一個動作詞。",
  song: "一首輕柔搖籃曲，用音檔播放即可，不需要看螢幕。",
  book: "睡前以中文故事為主，英文書每週 1 到 2 天即可。",
  life: "只固定兩句：洗澡前 Bath time、睡前 Good night。",
  twoKids: "幫二寶洗澡、換尿布時說 Wash, wash, wash 與 Bath time，大寶也會跟著聽。",
  resist: ["睡前孩子累，用最低強度，只說 Good night。孩子拒絕英文就全程中文，這個單元可以只在白天玩偶遊戲時進行。"],
  quick: "只在睡前說 Time for bed 與 Good night。",
  observe: "聽到 Wash your hands 就去洗手＝能回應；睡前自己說 Good night＝主動使用。",
  paper: "做「洗澡流程卡」（洗手、刷牙、睡覺各一張圖），孩子完成一個就翻面；睡前一張月亮卡當信號。",
  kid: { hero: "小熊與月亮", buttons: "水滴（Wash）、牙刷（Brush）、月亮（Good night）", game: "依序點水滴、牙刷、月亮，小熊進被窩；毛毛蟲進度條顯示步驟", palette: "方案 C，夜間降低亮度", note: "睡前模式預設不啟用動畫，只有聲音。" },
  review: "每天生活中自然帶，不另排時間。"
},
{
  id: "A6", stage: "A", icon: "🧹", title: "收玩具與動作指令",
  goal: "孩子聽到 Clean up time / Put it here / Sit down / Stand up / Clap your hands 等指令能做出動作。",
  phrases: ["clean_up", "put_here", "sit_down", "stand_up", "clap", "jump", "stop_go", "good_job"],
  words: [],
  scripts: {
    A: "小熊說 Clean up time！我們一起把玩具送回家。",
    B: "Clean up time! 把車車 put it here，放進箱子。好棒，Good job！",
    C: "It's clean up time. Put the car here. Put the blocks here. Good job! Now sit down."
  },
  puppet: ["Clean up!", "Jump!", "Stop!"],
  steps: [
    "開始收玩具前，說 Clean up time，可配固定的歌。",
    "示範：拿一個放進箱子，說 Put it here。",
    "孩子跟著放，每放一個說 Good job。",
    "玩動作遊戲：Clap, Jump, Sit down, Stand up，配節奏。",
    "以 Stop 與 Go 玩「木頭人」。"
  ],
  game: "「小熊說」（Simon Says 簡化版）：玩偶下指令，孩子做動作，不要求孩子說話。",
  song: "任何收玩具歌，或固定唱同一首，讓孩子形成「聽到就收」的習慣。",
  book: "不需要專屬書。",
  life: "每次收玩具都說同一句 Clean up time，只要這一句就夠。",
  twoKids: "二寶還不會收，大寶收時你說 Good job，二寶就聽到稱讚的聲音。",
  resist: ["孩子不想收：把收玩具變成和玩偶比賽，或給選擇：「先收車車還是先收積木？」"],
  quick: "只做 Clean up time 加一個 Put it here。",
  observe: "聽到 Clean up 會去拿玩具＝能回應；自己指揮「Clean up!」＝主動使用。",
  paper: "做收納箱標籤（圖＋單字），貼在玩具箱，孩子對照放入。",
  kid: { hero: "小熊與玩具箱", buttons: "箱子圖示（Put it here）、星星（Good job）", game: "拖曳玩具進箱子，全部收完小熊鼓掌", palette: "方案 A", note: "防誤觸：拖曳目標區夠大，錯放不扣分，直接彈回。" },
  review: "每次收玩具時帶入，1 週後可看檢查點。"
},
{
  id: "A7", stage: "A", icon: "🚗", title: "出門與回家",
  goal: "孩子出門、上車、回家時，聽得懂 Let's go / Shoes on / Hold my hand / We're home，並做出對應動作。",
  phrases: ["lets_go", "shoes_on", "hold_hand", "wait_me", "seat_belt", "were_home", "shoes_off"],
  words: ["shoes 鞋子", "hand 手", "car 車"],
  scripts: {
    A: "小熊也要出門囉！我們穿鞋子，shoes on。牠說 Let's go！",
    B: "Let's go! 先 shoes on。過馬路了，Hold my hand。到家囉，We're home！",
    C: "Shoes on. Let's go! Hold my hand. Seat belt on. We're home! Shoes off."
  },
  puppet: ["Let's go!", "Shoes on!", "We're home!"],
  steps: [
    "出門前，玩偶說 Shoes on，你拿鞋給孩子。",
    "走到門口，說 Let's go!（孩子已熟悉，可讓孩子當帶頭的人）。",
    "過馬路、停車場時伸手說 Hold my hand。",
    "上車說 Seat belt on，扣好後說 Good job。",
    "到家說 We're home! 再說 Shoes off。"
  ],
  game: "「小熊出門」：玩偶要出門，孩子幫牠穿鞋、牽手、帶牠走到門口再「回家」。",
  song: "車上放英文兒歌音檔當背景音，不需要看螢幕。",
  book: "不需要專屬書。",
  life: "把句子綁在門口：出門前 1 句、回家 1 句，共 2 句就好。",
  twoKids: "大寶幫二寶「Hold my hand」的概念可以先玩玩偶；二寶出門時你說 Let's go! 就是輸入。",
  resist: ["趕時間時不教，只說 Let's go 就好；孩子不想穿鞋時給選擇：「紅色鞋還是藍色鞋？」"],
  quick: "只做出門的 Let's go 或回家的 We're home。",
  observe: "聽到 Shoes on 會去拿鞋＝能回應；自己說 We're home!＝主動使用。",
  paper: "做「門口提示卡」：鞋子圖＋Shoes on、牽手圖＋Hold my hand，貼在玄關。",
  kid: { hero: "小熊在玄關", buttons: "鞋子圖示（Shoes on）、牽手圖示（Hold my hand）、房子圖示（We're home）", game: "依序點鞋子、門，小熊出發；回來時點房子", palette: "方案 A", note: "遊戲內不要出現會倒數趕人的計時。" },
  review: "每次出門、回家自然帶。"
},
{
  id: "A8", stage: "A", icon: "🧸", title: "玩耍與情緒",
  goal: "孩子玩耍時聽得懂 Let's play / Look / Me too / Gentle；情緒不好時能聽懂 It's okay / Deep breath / I'm here，並感到被安撫。",
  phrases: ["lets_play", "look", "wow", "me_too", "gentle", "share", "its_okay", "are_okay", "need_hug", "deep_breath", "im_here"],
  words: [],
  scripts: {
    A: "小熊跌倒了，牠說 It's okay。我們抱抱牠，也跟牠說 It's okay。",
    B: "Look! 好棒。Me too？好，Let's share。哎呀跌倒了，It's okay，Deep breath。",
    C: "Let's play! Look! Wow! Gentle, please. Are you okay? It's okay. Do you need a hug? I'm here."
  },
  puppet: ["Wow!", "Me too!", "It's okay."],
  steps: [
    "玩的時候用 Let's play 開場。",
    "孩子給你看東西，你回 Look! 或 Wow!",
    "對玩偶、寵物、弟妹示範 Gentle, please（輕輕摸）。",
    "孩子跌倒、玩具壞掉時，先抱抱再說 It's okay。",
    "孩子發脾氣時，等他情緒較平穩後，一起做 Deep breath（吸氣吐氣）。"
  ],
  game: "「照顧小熊」：小熊受傷了，孩子幫牠呼呼、抱抱，你說 It's okay。",
  song: "不需要專屬歌曲；情緒安撫時以你的聲音為主。",
  book: "挑有情緒主題的低字數繪本，由孩子選，不必每次都唸英文。",
  life: "安撫情境是最容易記的短句，只要 It's okay 與 I'm here 就足夠。",
  twoKids: "二寶哭時你說 It's okay、I'm here，大寶聽久了也會學會；Gentle, please 可同時教大寶如何對待弟妹。",
  resist: ["孩子情緒激動時不要教英文，只做安撫；安撫句中文英文都可以，以孩子能被安撫為優先。"],
  quick: "只做一次 It's okay 加一個抱抱。",
  observe: "聽到 Gentle 會放輕動作＝能回應；自己對玩偶說 It's okay＝主動使用。",
  paper: "做「情緒臉卡」（開心、難過、生氣各一張），孩子選一張，你說對應的短句。",
  kid: { hero: "小熊與情緒臉", buttons: "開心臉、難過臉、抱抱圖示", game: "選情緒臉，小熊做出對應表情，並說 It's okay", palette: "方案 C", note: "避免任何會讓孩子覺得「做錯」的音效。" },
  review: "每次情緒需要安撫時自然帶。"
},
{
  id: "A9", stage: "A", icon: "👏", title: "稱讚與提醒",
  goal: "孩子聽到 Good job / You did it / Try again 會感到被鼓勵，聽到 Careful / Not now / Wait a minute 能停下或等待。",
  phrases: ["good_job", "you_did_it", "nice_try", "try_again", "careful", "not_now", "wait_min"],
  words: [],
  scripts: {
    A: "小熊把積木疊好了，我們跟牠說 Good job！牠說謝謝你。",
    B: "You did it! 好棒。哎呀沒成功，Nice try! Try again，再試一次。Careful，小心喔。",
    C: "Good job! You did it! Nice try. Try again. Careful! Wait a minute. Not now."
  },
  puppet: ["Good job!", "Try again!", "Careful!"],
  steps: [
    "孩子完成一件事（吃完、收完、穿好鞋）時，說 Good job 或 You did it。",
    "孩子沒成功但有努力，說 Nice try，再給一次機會：Try again。",
    "遇到危險動作，用 Careful 搭配動作示範停下。",
    "孩子要你做事但你忙時，說 Wait a minute，並在 1 到 2 分鐘內回應他。",
    "必須拒絕時說 Not now，並告訴他什麼時候可以（用中文）。"
  ],
  game: "「小熊做不到」：小熊疊積木掉了，孩子幫牠鼓勵：Nice try! Try again!",
  song: "不需要專屬歌曲。",
  book: "不需要專屬書。",
  life: "稱讚句最容易用：每天固定一個「Good job 時刻」，例如收完玩具。",
  twoKids: "稱讚大寶時二寶也聽得到；Wait a minute 可用於同時照顧兩個孩子時，讓大寶知道要輪流。",
  resist: ["孩子對 Not now 反應很大時，改用中文說明並給具體時間；Careful 只用於真正需要的時候，避免變成噪音。"],
  quick: "只做一次 Good job。",
  observe: "聽到 Careful 會停下來＝能回應；自己說 Good job 或 Try again 給玩偶＝主動使用。",
  paper: "做「星星貼紙表」：孩子做到一件事就貼一個，你說 Good job。",
  kid: { hero: "小熊疊積木", buttons: "星星（Good job）、重來圖示（Try again）、舉手（Wait）", game: "幫小熊疊積木，掉了不扣分，只說 Try again", palette: "方案 A", note: "失敗不用負面音效，保持鼓勵語氣。" },
  review: "每次稱讚、提醒時自然帶。"
}
];

// 家長通用指南（教材庫之外的「教學技巧」頁）
window.MFE_GUIDE = {
  principles: [
    ["一個情境，一句話", "句子綁在動作上，例如開門前說 Let's go。你不用想「該說什麼」，情境會提醒你。"],
    ["一週只主打 1 句新短語", "其他場景沿用舊句，不要求同時學很多。"],
    ["單字用「換詞槽」", "句型固定，只換一個詞，而且詞就在眼前（實物或圖卡）。例如 Give me ___, please，每餐只用 2 個詞。"],
    ["詞跟著物走", "把單字卡貼在冰箱、水果籃、玄關，看到東西就看到詞，不靠腦袋記。"],
    ["不會就說中文", "英文只放在關鍵位置，其餘照常說中文，不會有壓力，也不會讓孩子覺得你變成另一個人。"]
  ],
  tips: [
    ["孩子說錯怎麼辦", "不糾正，用正確的說法自然重複一次。例：孩子說「ap-o」，你說「Yes, an apple!」"],
    ["孩子只會接一個詞", "這是正確的進步。Give me… 他接 please，就已經成功。"],
    ["孩子喊「不是不是」", "立刻改回中文，不辯解、不追問；多數時候是那本書或情境不符他的預期，不是排斥英文。"],
    ["玩偶怎麼用", "玩偶只說英文，你負責中文；孩子拒絕就讓玩偶睡覺，隔天再出場。"],
    ["發音沒把握", "按句子旁的喇叭聽一遍就好；完美發音不是目標，穩定、自然、愉快才是。"],
    ["兩個孩子的使用方式", "教材共用，進度分開。大寶先示範，二寶聽；不比較兩人的進度。"]
  ],
  resistTips: [
    "平靜地說：「好，那我們說中文。」然後立刻改回中文，不辯解、不解釋。",
    "只放歌的替代：播放他喜歡的英文歌，什麼都不要求。",
    "改由玩偶說英文，你繼續說中文。",
    "把句子換成他喜歡的情境（例如孩子愛的玩具或遊戲）。"
  ],
  milestones: [
    "第一次主動說 Thank you", "第一次說完整的 Give me ___, please", "第一次主動說 Good morning",
    "學會 5 句情境句", "完成階段 A 的一半單元", "完成階段 A"
  ],
  checkpoints: [
    "聽到熟悉的英文歌會開心或做動作",
    "能聽懂 5 到 8 句情境句並做出反應",
    "在合適時機自己說過 Thank you / Bye-bye / Yummy 等",
    "玩偶出場時不排斥",
    "孩子還在抗拒時，不論進度，退回前一單元也沒關係"
  ]
};
