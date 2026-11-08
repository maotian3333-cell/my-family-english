// 各單元的歌曲與繪本。
// 歌曲 kind：
//   "pd"    傳統／公版歌曲，歌詞直接收錄
//   "own"   自編短韻文（這個專案自己寫的，可自由使用）
//   "title" 有版權或版權不明的歌：只列歌名、動作、重點詞與搜尋連結，歌詞請自己貼（只存在你的瀏覽器）
// 書名、作者以「圖書館或書店搜尋」為準；各版本字數略有不同。
window.MFE_MEDIA = {
A1: {
  songs: [
    { id: "own_a1", kind: "own", t: "Please and Thank You Chant", zh: "請與謝謝韻文", act: "遞東西給玩偶或家人時，每句拍一下手。",
      lyrics: "Please, please, give me please!\nHere you are, here you are!\nThank you, thank you, thank you, yes!\nYou're welcome, you're welcome, ha ha ha!" },
    { id: "pd_baa", kind: "pd", t: "Baa, Baa, Black Sheep", zh: "咩咩黑綿羊", act: "每說到 one for … 就遞一樣東西給不同的人（分享、遞東西的概念）。",
      lyrics: "Baa, baa, black sheep, have you any wool?\nYes sir, yes sir, three bags full.\nOne for the master, and one for the dame,\nAnd one for the little boy who lives down the lane." }
  ],
  books: [
    { t: "The Very Hungry Caterpillar", au: "Eric Carle", why: "一天吃一種水果，天然的水果單字複習；孩子可以自己數、指。" },
    { t: "Handa's Surprise", au: "Eileen Browne", why: "籃子裡裝滿水果（含芭樂、芒果等），可停下來問 Apple or banana 式的二選一。" },
    { t: "Eating the Alphabet", au: "Lois Ehlert", why: "水果蔬菜大圖，適合當圖卡的補充。" },
    { t: "Please, Mr. Panda", au: "Steve Antony", why: "整本在練 please 與 thank you，句子短。" },
    { t: "Thank You, Bear", au: "Greg Foley", why: "遞東西、說謝謝的小故事。" }
  ]
},
A2: {
  songs: [
    { id: "own_a2", kind: "own", t: "Ready, Set, Go Chant", zh: "預備開始韻文", act: "邊說邊做預備姿勢，最後一句一起跑或跳。",
      lyrics: "Are you ready? I'm ready!\nReady, ready, one, two, three!\nMy turn, your turn, round and round.\nReady, set, go, go, go!" },
    { id: "pd_row", kind: "pd", t: "Row, Row, Row Your Boat", zh: "划船歌", act: "面對面坐、手拉手前後搖；用 My turn / Your turn 輪流唱一句。",
      lyrics: "Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream." }
  ],
  books: [
    { t: "We're Going on a Bear Hunt", au: "Michael Rosen / Helen Oxenbury", why: "重複句型加動作，適合邊念邊做；孩子可以搶著接句。" },
    { t: "Can I Play Too?", au: "Mo Willems（Elephant & Piggie 系列）", why: "輪流、加入遊戲的對話，字很少。" },
    { t: "Go, Dog. Go!", au: "P. D. Eastman", why: "Go / Stop 的場景很多，可以只看圖說 Go。" }
  ]
},
A3: {
  songs: [
    { id: "own_a3", kind: "own", t: "Hello and Bye-bye Chant", zh: "哈囉再見韻文", act: "說 Hello 時揮手，說 Bye-bye 時揮手並轉圈。",
      lyrics: "Hello, hello, I see you!\nHello, hello, how are you?\nBye-bye, bye-bye, see you soon!\nGood morning, sun! Good night, moon!" },
    { id: "t_hello", kind: "title", t: "Hello Song / Goodbye Song", zh: "問候歌與道別歌", q: "hello song for toddlers good morning song", act: "固定一首當「起床歌」，一首當「出門歌」，每天都用同一首，孩子比較容易聽到前奏就知道要做什麼。",
      note: "兒童頻道有很多版本，請你聽過後挑一首語速慢、歌詞簡單的；我沒有指定唯一版本。" }
  ],
  books: [
    { t: "Goodnight Moon", au: "Margaret Wise Brown", why: "對每樣東西說 Goodnight，句型簡單，適合睡前。" },
    { t: "Good Night, Gorilla", au: "Peggy Rathmann", why: "幾乎沒有字，用 Good night 帶全書，孩子看圖找小猩猩。" },
    { t: "Peek-a-Who?", au: "Nina Laden", why: "洞洞書，邊翻邊問 Who?，也適合二寶看圖。" }
  ]
},
A4: {
  songs: [
    { id: "own_a4", kind: "own", t: "Yummy Chant", zh: "好好吃韻文", act: "吃飯前拍手念；說 Blow 時真的吹一吹。",
      lyrics: "Yummy, yummy, in my tummy!\nBlow, blow, blow, it's hot, hot, hot!\nMore, please! More, please!\nAll done, all done, thank you!" },
    { id: "pd_cake", kind: "pd", t: "Pat-a-cake", zh: "拍拍蛋糕", act: "兩人對拍手，最後一句時假裝把蛋糕放進烤箱。",
      lyrics: "Pat-a-cake, pat-a-cake, baker's man,\nBake me a cake as fast as you can.\nPat it and prick it and mark it with B,\nAnd put it in the oven for baby and me." },
    { id: "pd_buns", kind: "pd", t: "Hot Cross Buns", zh: "熱十字麵包", act: "只有三句，很適合幼兒；拍桌子打節奏。",
      lyrics: "Hot cross buns, hot cross buns,\nOne a penny, two a penny,\nHot cross buns." },
    { id: "t_apples", kind: "title", t: "Apples and Bananas", zh: "蘋果與香蕉", q: "apples and bananas song for kids", act: "這首的玩法是把歌詞裡的母音一直換掉（ah-ples and ba-nah-nahs…），很適合玩聲音遊戲。",
      note: "歌詞版權狀況我無法確認，所以不放進網站；請聽官方版本，或貼上你自己找到的歌詞。" }
  ],
  books: [
    { t: "The Very Hungry Caterpillar", au: "Eric Carle", why: "吃的東西有名稱，可配合圖卡使用。" },
    { t: "Yummy Yucky", au: "Leslie Patricelli", why: "短句、對比（好吃／不好吃），孩子很容易接。" },
    { t: "Handa's Surprise", au: "Eileen Browne", why: "水果名稱多，適合配合圖卡的水果類別。" },
    { t: "Eating the Alphabet", au: "Lois Ehlert", why: "圖大而清楚，不需要念文字，只指圖說名稱。" }
  ]
},
A5: {
  songs: [
    { id: "own_a5", kind: "own", t: "Wash, Wash, Wash Chant", zh: "洗洗洗韻文", act: "洗手時念，每一句配一個動作。",
      lyrics: "Wash, wash, wash your hands.\nBrush, brush, brush your teeth.\nBath time, splash, splash, splash!\nTime for bed, good night, good night." },
    { id: "pd_hush", kind: "pd", t: "Hush, Little Baby", zh: "噓，小寶貝", act: "睡前輕聲唱，放慢速度；音檔版本很多，可聽輕柔的。",
      lyrics: "Hush, little baby, don't say a word,\nMama's gonna buy you a mockingbird.\nAnd if that mockingbird won't sing,\nMama's gonna buy you a diamond ring." },
    { id: "pd_twinkle", kind: "pd", t: "Twinkle, Twinkle, Little Star", zh: "小星星", act: "孩子已會；可作為睡前固定的最後一首。",
      lyrics: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are!" }
  ],
  books: [
    { t: "Goodnight Moon", au: "Margaret Wise Brown", why: "睡前經典，節奏很慢。" },
    { t: "Good Night, Gorilla", au: "Peggy Rathmann", why: "字少，讓孩子看圖，你只需要說 Good night。" },
    { t: "Time for Bed", au: "Mem Fox / Jane Dyer", why: "押韻句子，直接出現 Time for bed 的概念。" },
    { t: "Maisy Takes a Bath", au: "Lucy Cousins", why: "洗澡主題，Maisy 系列字少圖大。" }
  ]
},
A6: {
  songs: [
    { id: "own_a6", kind: "own", t: "Clean Up Chant", zh: "收玩具韻文", act: "每說一句就放一個玩具進箱子。",
      lyrics: "Clean up, clean up, put it here.\nPick up the blocks, one, two, three.\nGood job, good job, all done!\nClap, clap, clap. Jump, jump, jump.\nSit down, stand up, stop and go!" },
    { id: "t_head", kind: "title", t: "Head, Shoulders, Knees and Toes", zh: "頭肩膝腳趾", q: "head shoulders knees and toes song", act: "指到哪裡就碰到哪裡；第二遍加快，第三遍把一個部位換成拍手，不說出來。",
      note: "傳統兒歌但各版本歌詞略有不同，我不放進網站；孩子應該很快就能跟著動作。" },
    { id: "t_clean", kind: "title", t: "Clean Up Song", zh: "收玩具歌", q: "clean up song for kids", act: "固定用同一首，聽到前奏就開始收。", note: "版本很多，請你挑一首語速慢的，之後固定使用。" }
  ],
  books: [
    { t: "From Head to Toe", au: "Eric Carle", why: "動物做動作，Can you do it? I can do it! 的問答，剛好是動作指令。" },
    { t: "Hop on Pop", au: "Dr. Seuss", why: "押韻與動作詞，可只挑幾頁用。" },
    { t: "Sheep in a Jeep", au: "Nancy Shaw", why: "押韻短句，適合念到一半讓孩子接。" }
  ]
},
A7: {
  songs: [
    { id: "own_a7", kind: "own", t: "Let's Go Chant", zh: "出門韻文", act: "在玄關念，每說一句做一個動作（穿鞋、牽手、扣安全帶）。",
      lyrics: "Shoes on, shoes on, let's go, let's go!\nHold my hand, hold my hand, look both ways.\nSeat belt on, click, click, click!\nWe're home, we're home, shoes off, hooray!" },
    { id: "t_wheels", kind: "title", t: "The Wheels on the Bus", zh: "公車上的輪子", q: "wheels on the bus nursery rhyme", act: "輪子轉（雙手畫圈）、雨刷（手左右擺）、喇叭（假裝按），孩子大多熟。",
      note: "歌詞版本很多，我不放進網站；可以聽音檔、跟著動作。" }
  ],
  books: [
    { t: "The Wheels on the Bus", au: "Paul O. Zelinsky（立體翻翻書版）", why: "邊念邊翻，有動作和聲音，孩子喜歡自己翻。" },
    { t: "Bear on a Bike", au: "Stella Blackstone", why: "交通工具與 Hello 的押韻故事。" },
    { t: "We're Going on a Bear Hunt", au: "Michael Rosen / Helen Oxenbury", why: "走出門的冒險，適合配合 Let's go。" }
  ]
},
A8: {
  songs: [
    { id: "own_a8", kind: "own", t: "It's Okay Chant", zh: "沒關係韻文", act: "輕聲念，深呼吸那兩句配合真的深呼吸。",
      lyrics: "Wow! Look, look! Me too, me too!\nGentle, gentle, soft and slow.\nIt's okay, it's okay, I'm here.\nDeep breath in, deep breath out." },
    { id: "t_happy", kind: "title", t: "If You're Happy and You Know It", zh: "如果你覺得快樂你就拍拍手", q: "if you're happy and you know it song", act: "clap your hands、stomp your feet、jump up high，由孩子決定下一個動作。",
      note: "各版本歌詞略有不同，我不放進網站；孩子可以自己決定下一個動作。" }
  ],
  books: [
    { t: "Hug", au: "Jez Alborough", why: "全書只有 Hug 這個字加情緒，剛好是擁抱與安撫的示範。" },
    { t: "The Feelings Book", au: "Todd Parr", why: "圖簡單、字少，每頁一個情緒。" },
    { t: "Today I Feel Silly", au: "Jamie Lee Curtis", why: "情緒與天氣的連結，句子較長，建議你用中文講、只夾情緒詞。" }
  ]
},
A9: {
  songs: [
    { id: "own_a9", kind: "own", t: "You Did It Chant", zh: "你做到了韻文", act: "孩子完成一件事後念，念到 Good job 時拍他的手或擊掌。",
      lyrics: "Good job! Good job! You did it!\nNice try, nice try, try again!\nCareful, careful, wait a minute.\nNot now, but soon!" },
    { id: "pd_spider", kind: "pd", t: "Itsy Bitsy Spider", zh: "小小蜘蛛", act: "手指爬上爬下，掉下來又爬上去，剛好是 Try again 的好例子。",
      lyrics: "The itsy bitsy spider climbed up the waterspout.\nDown came the rain and washed the spider out.\nOut came the sun and dried up all the rain,\nAnd the itsy bitsy spider climbed up the spout again." }
  ],
  books: [
    { t: "The Carrot Seed", au: "Ruth Krauss", why: "反覆嘗試的故事，句子很短，適合說 Try again。" },
    { t: "Not Now, Bernard", au: "David McKee", why: "家長說 Not now 的主題，字很少；可和孩子聊 Not now 是什麼感覺。" },
    { t: "The Little Engine That Could", au: "Watty Piper", why: "I think I can 的鼓勵故事，版本字數不一，建議挑短版或只念重複句。" }
  ]
}
};
