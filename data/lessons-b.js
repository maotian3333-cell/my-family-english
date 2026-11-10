// 階段 B：單字放進句子框（接在 lessons.js 之後載入）。
// 原則：句子框孩子已經聽過（階段 A），這裡只換一個眼前的詞。孩子聽得懂、會指，就是成功；不要求開口。
window.MFE_LESSONS.push(
{
  id: "B1", stage: "B", icon: "🎨", title: "顏色",
  goal: "你問 What color is it? 時，孩子能用手指出對應顏色的東西；聽到 red / yellow / blue 等顏色詞會看向正確的東西。",
  phrases: ["what_color", "its_color", "same", "big_small", "look_at", "i_see"],
  words: ["red 紅、yellow 黃、blue 藍、green 綠（先這四個）", "（之後輪替）orange 橘、purple 紫、pink 粉紅、white 白、black 黑、brown 咖啡"],
  scripts: {
    A: "你要找紅色的東西嗎？紅色是 red。我們一起找 red 的蘋果。（只說顏色詞，其餘用中文）",
    B: "Look! 紅色的蘋果。It's red. 你有紅色的襪子嗎？Red!",
    C: "What color is it? It's red. Red apple. Look at the red car. Same! It's red too."
  },
  puppet: ["Red!", "I see red.", "Same!"],
  steps: [
    "先只選一種顏色（例如 red），一天內在家裡找 3 樣紅色的東西，每找到一樣就說 Red!",
    "第二天加第二種（yellow），把兩種顏色的東西放在一起，說 Red or yellow?，讓孩子用手指。",
    "孩子指對時回應 Yes, it's red!；指錯時不糾正，直接說 It's yellow. 並拿給他看。",
    "玩具、衣服、餐具都可以當材料；顏色詞放在句尾，孩子比較容易聽到。",
    "孩子抗拒時回到中文：「這是紅色，我們說 red」，只夾一個詞。"
  ],
  game: "「顏色尋寶」：你說 Find something red，孩子在家裡找一樣紅色的東西交給你，你說 Here you are! Thank you!",
  song: "Mary Had a Little Lamb（白色的羊毛）與自編的顏色韻文，見下方歌曲。",
  book: "挑顏色與動物重複句型的繪本，每頁一個顏色；你用中文讀，指到顏色時說英文詞。",
  life: "穿衣服（Red socks!）、吃水果（Yellow banana!）、紅綠燈（Red, stop! Green, go!），隨手說一個顏色詞。",
  twoKids: "二寶看顏色玩具與繪本，你說 Red! 讓他聽；大寶可以當小老師，把顏色卡遞給弟妹說 Here you are。",
  resist: ["孩子對顏色卡沒興趣時，改成「真的東西」：拿他的襪子、杯子、玩具直接說顏色，不要用卡片測驗。", "不問「這是什麼顏色？」讓孩子覺得被考試；改成你自己說，等他想接。"],
  quick: "只找一樣紅色的東西，說一次 Red!",
  observe: "你說顏色時孩子會看向或指向正確東西＝能回應；自己指著東西說出顏色詞（哪怕只有 red）＝主動使用。",
  paper: "做「顏色盤」：把顏色貼紙或蠟筆痕貼成一排，孩子找到同色的東西，把東西放到對應顏色上。",
  kid: { hero: "顏料滴與小怪獸", buttons: "大圓顏料滴（紅黃藍綠）", game: "聽到顏色詞，點對應顏色的東西；點對時它會彈起來", palette: "方案 C（高彩度），睡前不要用", note: "顏色必須可辨識，不能只靠紅綠區分（色弱考量）。" },
  review: "隔天找同一個顏色的東西；一週後兩個顏色一起問。"
},
{
  id: "B2", stage: "B", icon: "🐶", title: "動物",
  goal: "孩子聽到 cat / dog / cow 等動物名稱能指出對應動物；知道 What is it? 是在問「這是什麼」。",
  phrases: ["what_is_it", "its_a", "animal_says", "say_hi", "whos_that", "i_see"],
  words: ["dog 狗、cat 貓、cow 牛、duck 鴨子（先這四個）", "（之後輪替）pig、sheep、horse、bird、fish、rabbit、frog、elephant、lion、monkey"],
  scripts: {
    A: "你看，是小狗。小狗說 woof。我們一起說 woof, woof。（動物叫聲用英文，名稱先用中文，再夾英文）",
    B: "Look, a dog! 小狗。Woof, woof! Hello, dog!",
    C: "What is it? It's a dog. The dog says woof. Say hi to the dog. Hello, dog!"
  },
  puppet: ["Woof, woof!", "I'm a dog.", "Hello!"],
  steps: [
    "拿 2 到 4 張動物圖卡（見圖卡）或玩具動物，先只說名稱，一次一個。",
    "每個動物配一個叫聲：cow-moo、duck-quack、dog-woof、cat-meow，孩子最愛模仿叫聲。",
    "把動物藏起來，你說 Where is the cow?，孩子找到後你說 Here is the cow!",
    "出門看到真的動物或看書時說 I see a dog! 一次只說一句。",
    "孩子開始用叫聲回應時，就是成功，不必要求說名稱。"
  ],
  game: "「動物園點名」：把動物玩偶排成一排，你當園長點名 Cow? 孩子讓牛站出來；孩子也可以當園長。",
  song: "Old MacDonald Had a Farm（傳統歌曲，附歌詞），見下方歌曲。",
  book: "挑有動物叫聲的重複句型繪本，孩子容易跟著發出聲音。",
  life: "看到狗（Dog!）、公園看到鳥（Bird!）、洗澡玩小鴨（Duck! Quack, quack!）。",
  twoKids: "二寶聽叫聲很有反應，你用不同音調說 Moo!、Quack!；大寶可以示範動物動作給弟妹看。",
  resist: ["孩子不想說英文名稱時，只玩叫聲遊戲：叫聲算英文，也算中文以外的聲音遊戲，輕鬆很多。", "若他對特定動物有恐懼，就跳過那一個，換他喜歡的。"],
  quick: "只說一個動物的名稱和叫聲，例如 Cow! Moo!",
  observe: "聽到 cow 會指牛或做牛叫＝能回應；自己看到動物說 Dog!＝主動使用。",
  paper: "做「動物剪貼本」：剪下動物圖貼在紙上，每頁一隻，旁邊寫（或你唸）名稱與叫聲。",
  kid: { hero: "動物農場", buttons: "動物頭像大按鈕，按了發出叫聲＋名稱", game: "聽叫聲，點對應動物", palette: "方案 C", note: "叫聲音檔要真實但不刺耳，音量預設偏低。" },
  review: "隔天用同一批動物玩點名；一週後加新動物。"
},
{
  id: "B3", stage: "B", icon: "🖐️", title: "身體",
  goal: "你說 Touch your nose / ears / hands 時，孩子能摸到對應的身體部位；玩身體遊戲時覺得有趣。",
  phrases: ["touch_nose", "where_nose", "wave_hand", "stomp_feet", "wash_hands", "tickle"],
  words: ["nose 鼻子、eyes 眼睛、ears 耳朵、hands 手（先這四個）", "（之後輪替）head、hair、mouth、teeth、tummy、feet"],
  scripts: {
    A: "我們摸摸鼻子，鼻子是 nose。摸摸 nose。（只夾部位英文名稱）",
    B: "Touch your nose! 摸鼻子。好棒，nose! 現在換 ears，摸耳朵。",
    C: "Touch your nose. Touch your ears. Where are your hands? Clap your hands! Stomp your feet."
  },
  puppet: ["Touch my nose!", "Where are my ears?", "Tickle, tickle!"],
  steps: [
    "從洗澡或穿衣服時開始，邊碰邊說：Nose! Ears! 每個部位只說一次。",
    "玩偶示範：Touch your nose，玩偶摸自己的鼻子，孩子跟著做。",
    "角色互換：孩子下指令，你來摸，你故意摸錯，孩子糾正你，他會很開心。",
    "配合歌曲動作，邊唱邊摸（Head, Shoulders, Knees and Toes）。",
    "孩子不想動時，改成你自己摸玩偶或圖卡，讓他看。"
  ],
  game: "「摸摸看」：你說 Touch your ___，孩子用手摸；速度可以慢慢加快，最後變成「大風吹」。",
  song: "This Little Piggy（傳統歌曲，附歌詞）與 Head, Shoulders, Knees and Toes（只列歌名），見下方歌曲。",
  book: "挑身體部位主題的簡單繪本，一頁一個部位，孩子可以邊讀邊摸。",
  life: "洗澡（Wash your hands, Wash your tummy）、穿衣服（Arms up!）、擦乾（Dry your head）。",
  twoKids: "二寶可以讓你輕輕摸他的手、腳（Touch your hands, soft!）；大寶在旁邊示範，他會想當哥哥姊姊。",
  resist: ["孩子不喜歡被碰就不要碰，改成他碰玩偶；用 Gentle 提醒力道。", "孩子在洗澡時已經很累，就只說一個部位，不要一直給指令。"],
  quick: "洗澡時只說 Wash your hands. 一次。",
  observe: "聽到 nose 會摸鼻子＝能回應；自己摸著部位說 Nose!＝主動使用。",
  paper: "畫一個大大的人形，孩子貼上眼睛、鼻子、嘴巴的貼紙或圖卡，你說名稱。",
  kid: { hero: "小怪獸身體圖", buttons: "身體部位發亮的大圓點", game: "聽指令，點小怪獸的部位，它會做動作", palette: "方案 A", note: "不要出現會嚇到孩子的特寫（例如大張的嘴）。" },
  review: "洗澡時、穿衣服時，各說一個部位；一週後玩「摸錯糾正」。"
},
{
  id: "B4", stage: "B", icon: "🔢", title: "數字 1 到 5",
  goal: "孩子跟著你數 one, two, three；聽到 one / two / three 時能拿出對應數量的東西（約 1 到 3 個）。",
  phrases: ["count_me", "one_two_three", "how_many", "one_more", "again"],
  words: ["one 一、two 二、three 三（先這三個）", "（之後）four 四、five 五、再之後 six 到 ten"],
  scripts: {
    A: "我們數數看，一、二、三，英文是 one, two, three。我們一起數蘋果。",
    B: "One, two, three! 三個蘋果。How many? 有幾個？Three!",
    C: "Count with me. One, two, three! How many apples? Three apples. One more? Four!"
  },
  puppet: ["One, two, three!", "How many?", "One more!"],
  steps: [
    "一次只數到 3：上樓梯、拍手、數玩具，每次都從 one 開始。",
    "數完說 Three!，把最後一個數字說得重一點，讓孩子聽到「總共」。",
    "把東西藏起來，你說 One more，孩子再加一個。",
    "孩子數對時給小小慶祝：Yay, three!，不要考試，數錯也不糾正。",
    "穩定後再加 four、five；不要一次教太多。"
  ],
  game: "「分點心」：你說 Give me two, please，孩子數出兩個點心給你（連結 A1 的 Give me ___）。",
  song: "One, Two, Buckle My Shoe（傳統歌曲，附歌詞），見下方歌曲。",
  book: "挑 1 到 10 的數數繪本；你用中文讀，數的時候說英文數字。",
  life: "數樓梯（One, two, three!）、洗手搓三下（One, two, three!）、擊掌倒數（Three, two, one, go!）。",
  twoKids: "二寶當觀眾聽節奏，你邊拍他的小手邊說 One, two, three；大寶數給弟妹聽。",
  resist: ["孩子對數字沒興趣時，改成用身體：跳 3 下、拍手 3 下，不看圖卡。", "孩子數到一半停了就停，不要補數。"],
  quick: "上樓梯時數 One, two, three。",
  observe: "聽到 Two 會拿兩個＝能回應；自己數 One, two, three＝主動使用。",
  paper: "做「數字小卡」：每張卡一個數字，旁邊貼對應數量的貼紙，孩子數一數、貼一貼。",
  kid: { hero: "數字徽章與小怪獸", buttons: "大數字圓牌", game: "聽到數字，把相同數量的東西放進籃子", palette: "方案 C", note: "數字要大、色彩分明；失敗不扣分。" },
  review: "隔天樓梯再數一次；一週後數 4 和 5。"
},
{
  id: "B5", stage: "B", icon: "💛", title: "喜歡什麼",
  goal: "你問 Do you like apples? 時，孩子能用點頭、搖頭、笑或指東西回應；知道 I like 是「我喜歡」。",
  phrases: ["i_like", "do_you_like", "yes_i_do", "no_thanks", "what_want", "me_too"],
  words: ["apples 蘋果、bananas 香蕉、milk 牛奶、cookies 餅乾（孩子常吃的先選）", "（之後）孩子喜歡的玩具、動物、顏色都可以換詞"],
  scripts: {
    A: "媽媽喜歡蘋果，I like apples。你喜歡什麼？香蕉嗎？I like bananas。",
    B: "I like apples. Do you like apples? 你喜歡蘋果嗎？Yes, I do! 好，Give me an apple, please.",
    C: "I like apples. Do you like apples? Yes, I do. Me too! No, thank you. What do you want?"
  },
  puppet: ["I like bananas!", "Me too!", "No, thank you."],
  steps: [
    "你先說自己喜歡什麼（I like bananas），不問孩子，讓他先聽幾天。",
    "再問 Do you like bananas?，孩子點頭、搖頭、笑都算回應。",
    "孩子點頭時你說 Yes, you do! Me too!；搖頭時說 No? OK, no, thank you.，接受他的答案。",
    "把 I like ___ 用在 A1 的 Give me ___：I like apples. Give me an apple, please.",
    "之後換成玩具、顏色、動物都可以：I like cars. I like red."
  ],
  game: "「喜歡的、不喜歡的」：兩個盒子，孩子把喜歡的玩偶放在 yes 盒子，不喜歡的放在 no 盒子。",
  song: "Pease Porridge Hot（傳統歌曲，附歌詞）與自編的 I Like 韻文，見下方歌曲。",
  book: "挑 yummy / yucky 這類好惡主題的繪本，孩子容易表態。",
  life: "吃飯時（I like it! Yummy!）、選衣服（Do you like the red one?）、選繪本（Do you like this book?）。",
  twoKids: "二寶不一定能回答，你替他說 He likes milk!，大寶學習替別人表達喜好。",
  resist: ["孩子說「不要」就接受，說 OK, no, thank you，這是教他「拒絕也有禮貌」，不是失敗。", "不要逼孩子說出完整句子，指出來就很好。"],
  quick: "吃飯時說一次 I like apples.",
  observe: "被問 Do you like...? 時點頭或搖頭＝能回應；自己說 I like ___ 或 Me too＝主動使用。",
  paper: "做「喜歡的東西」小冊子：孩子選一張貼紙貼在紙上，你寫（或唸）I like ___。",
  kid: { hero: "愛心與小怪獸", buttons: "笑臉與愛心大按鈕", game: "選擇喜歡的東西放進籃子，小怪獸說 I like it!", palette: "方案 A", note: "不要用「錯誤」的聲音；沒有選擇也是一種答案。" },
  review: "吃飯時天天說；一週後換成玩具、顏色。"
},
{
  id: "B6", stage: "B", icon: "🚌", title: "交通工具",
  goal: "孩子聽到 car / bus / truck / train 時能指出對應的車；玩車子遊戲時聽到 Here comes the ___ 有反應。",
  phrases: ["here_comes", "beep_beep", "vroom", "lets_ride", "look_truck", "stop_go"],
  words: ["car 汽車、bus 公車、truck 卡車、train 火車（先這四個）", "（之後）airplane、bike、boat、rocket"],
  scripts: {
    A: "你看，公車來了，Bus! 我們一起說 beep, beep。（車子的聲音用英文，名稱先用中文）",
    B: "Look, a truck! 卡車。Vroom, vroom! Here comes the bus!",
    C: "Here comes the bus. Let's ride the bus. Beep, beep! Look, a truck! Stop! Go!"
  },
  puppet: ["Vroom, vroom!", "Beep, beep!", "Stop! Go!"],
  steps: [
    "拿玩具車 2 到 4 台，一次推一台，邊推邊說名稱與聲音。",
    "Here comes the bus!：你把車從遠處推過來，孩子等著接。",
    "玩 Stop! Go!（A6 已學）：車子停就說 Stop，車子動就說 Go。",
    "出門看到真的車，只指著說一個詞：Bus! Truck!",
    "孩子喜歡的車是最好的教材，就從他的最愛開始。"
  ],
  game: "「停車場」：用紙盒或膠帶劃停車格，你說 Park the bus，孩子把公車開進去。",
  song: "The Wheels on the Bus（只列歌名）與自編的 Vroom 韻文，見下方歌曲。",
  book: "挑車子、機器的簡單繪本；Donald Crews 的作品句子短，圖像清楚。",
  life: "搭公車（Let's ride the bus!）、散步時看到車（Look, a truck!）、玩具車時玩 Beep, beep!",
  twoKids: "二寶可以躺著看你推車子過來，Here comes the car! 他會追著看；大寶來開車，輪流當司機。",
  resist: ["孩子只想自己玩車，不想聽你說，就坐在旁邊，用很小聲音說名稱，不要中斷他的遊戲。", "孩子害怕大車的聲音時，不要放大車聲，只玩玩具。"],
  quick: "玩車子時說一次 Vroom, vroom!",
  observe: "聽到 Bus 會看向或拿起公車＝能回應；自己推車說 Vroom 或 Car＝主動使用。",
  paper: "做「交通工具小街」：紙上畫一條路，孩子貼車子貼紙，你說 Here comes the ___。",
  kid: { hero: "公車與小怪獸", buttons: "車子大按鈕，按了發出聲音", game: "聽到車名，點對應的車，車子會開走", palette: "方案 C", note: "引擎聲、喇叭聲要柔和，不要刺耳。" },
  review: "隔天出門看一次車；一週後加 airplane、boat。"
}
);
