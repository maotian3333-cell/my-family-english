// 階段 B 的歌曲與繪本（接在 media.js 之後載入）。規則同 media.js：只有公版歌曲與自編韻文附歌詞。
Object.assign(window.MFE_MEDIA, {
B1: {
  songs: [
    { id: "own_b1", kind: "own", t: "Rainbow Chant", zh: "彩虹韻文", act: "每說一個顏色，就舉起該顏色的東西或指著它。",
      lyrics: "Red, red, red apple!\nYellow, yellow, banana!\nBlue, blue, blue sky!\nGreen, green, green leaf!" },
    { id: "pd_mary", kind: "pd", t: "Mary Had a Little Lamb", zh: "瑪莉有隻小綿羊", act: "唱到 white 時指著白色的東西（衣服、牆壁），連結顏色詞。",
      lyrics: "Mary had a little lamb,\nIts fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go." }
  ],
  books: [
    { t: "Brown Bear, Brown Bear, What Do You See?", au: "Bill Martin Jr. / Eric Carle", why: "顏色加動物的重複句型，句子很短；先用中文讀，指到顏色時說英文詞。" },
    { t: "Mouse Paint", au: "Ellen Stoll Walsh", why: "三隻老鼠踩顏料混色，故事簡單；適合邊玩顏料邊讀。" },
    { t: "Color Zoo", au: "Lois Ehlert", why: "用形狀疊出動物，每頁一個顏色與形狀；適合只指圖不念字。" }
  ]
},
B2: {
  songs: [
    { id: "pd_macdonald", kind: "pd", t: "Old MacDonald Had a Farm", zh: "麥克唐納有個農場", act: "每換一種動物，就做出牠的叫聲或動作；孩子最愛模仿叫聲。",
      lyrics: "Old MacDonald had a farm, E-I-E-I-O!\nAnd on his farm he had a cow, E-I-E-I-O!\nWith a moo-moo here and a moo-moo there,\nHere a moo, there a moo, everywhere a moo-moo.\nOld MacDonald had a farm, E-I-E-I-O!" },
    { id: "own_b2", kind: "own", t: "Animal Sounds Chant", zh: "動物叫聲韻文", act: "每句配一個動物玩偶，念到叫聲時一起模仿。",
      lyrics: "Cow says moo, moo, moo!\nDuck says quack, quack, quack!\nDog says woof, woof, woof!\nCat says meow, meow, meow!" }
  ],
  books: [
    { t: "Dear Zoo", au: "Rod Campbell", why: "翻翻書，每頁一隻動物，句型重複，孩子會自己翻、自己指。" },
    { t: "Moo, Baa, La La La!", au: "Sandra Boynton", why: "動物叫聲繪本，字非常少，很適合學動物叫聲。" },
    { t: "Brown Bear, Brown Bear, What Do You See?", au: "Bill Martin Jr. / Eric Carle", why: "也可以用來認識動物名稱；每頁一隻動物。" }
  ]
},
B3: {
  songs: [
    { id: "pd_piggy", kind: "pd", t: "This Little Piggy", zh: "這隻小豬", act: "從腳拇指或手指開始，每句碰一根；最後一句 Wee, wee, wee 時搔癢。",
      lyrics: "This little piggy went to market,\nThis little piggy stayed home,\nThis little piggy had roast beef,\nThis little piggy had none,\nAnd this little piggy cried, \"Wee, wee, wee!\" all the way home." },
    { id: "t_hskt2", kind: "title", t: "Head, Shoulders, Knees and Toes", zh: "頭、肩膀、膝蓋、腳趾", q: "head shoulders knees and toes song for kids", act: "唱到哪個部位就摸哪裡，可以愈唱愈快；孩子容易記住 head、knees、toes。",
      note: "歌詞版權由原創作者持有，這裡只列歌名；請自己貼上歌詞。" },
    { id: "own_b3", kind: "own", t: "Touch Your Nose Chant", zh: "摸鼻子韻文", act: "念哪裡，孩子就摸哪裡；你故意摸錯，讓孩子糾正你。",
      lyrics: "Touch your nose, nose, nose!\nTouch your ears, ears, ears!\nTouch your hands, hands, hands!\nClap, clap, clap!" }
  ],
  books: [
    { t: "From Head to Toe", au: "Eric Carle", why: "動物做動作，孩子可以跟著做；句型是 I can do it!，很適合動起來。" },
    { t: "Eyes, Nose, Fingers, and Toes", au: "Judy Hindley", why: "身體部位繪本，圖畫清楚；先指圖再說英文。" }
  ]
},
B4: {
  songs: [
    { id: "pd_buckle", kind: "pd", t: "One, Two, Buckle My Shoe", zh: "一二扣鞋子", act: "每個數字拍一下手或跳一下，念到 buckle my shoe 時彎腰假裝扣鞋子。",
      lyrics: "One, two, buckle my shoe;\nThree, four, knock at the door;\nFive, six, pick up sticks;\nSeven, eight, lay them straight;\nNine, ten, a big fat hen." },
    { id: "own_b4", kind: "own", t: "Count to Five Chant", zh: "數到五韻文", act: "每說一個數字就伸出一根手指，最後說 High five!",
      lyrics: "One, two, one, two, three!\nOne, two, three, four, five!\nFive little fingers, up high!\nOne, two, three, four, five!" }
  ],
  books: [
    { t: "Ten Little Fingers and Ten Little Toes", au: "Mem Fox", why: "數字加身體，句子有節奏；孩子也會自己數手指。" },
    { t: "Ten Black Dots", au: "Donald Crews", why: "圖形簡單，從 1 到 10，數量視覺清楚；很適合邊數邊指。" },
    { t: "Counting Kisses", au: "Karen Katz", why: "可以邊念邊親親寶寶，數字與親子互動結合。" }
  ]
},
B5: {
  songs: [
    { id: "pd_pease", kind: "pd", t: "Pease Porridge Hot", zh: "熱豌豆粥", act: "兩人面對面拍手；唱到 hot 時假裝燙到，cold 時假裝發抖。",
      lyrics: "Pease porridge hot,\nPease porridge cold,\nPease porridge in the pot,\nNine days old." },
    { id: "own_b5", kind: "own", t: "I Like Chant", zh: "我喜歡韻文", act: "每說一句就換一樣孩子喜歡的東西，孩子點頭或拍手就是回應。",
      lyrics: "I like apples, yes, I do!\nI like bananas, how about you?\nI like milk and I like play,\nI like you, hooray, hooray!" }
  ],
  books: [
    { t: "Yummy Yucky", au: "Leslie Patricelli", why: "好吃與不好吃的對比，字非常少，適合孩子表態。" },
    { t: "Green Eggs and Ham", au: "Dr. Seuss", why: "版本字數很多；建議只挑 I do not like them 與 I do like them 這幾句，其餘用中文講。" }
  ]
},
B6: {
  songs: [
    { id: "t_wheels_b", kind: "title", t: "The Wheels on the Bus", zh: "公車的輪子轉呀轉", q: "wheels on the bus song for toddlers", act: "每一段換一個動作（輪子轉、雨刷擺、喇叭按、人們上下），孩子很容易跟著做。",
      note: "歌詞版本很多，且部分版本有版權；這裡只列歌名，請自己貼上你唱的版本。" },
    { id: "own_b6", kind: "own", t: "Vroom Chant", zh: "嗡嗡韻文", act: "推玩具車時念，念到 beep 時按喇叭。",
      lyrics: "Vroom, vroom, here comes the car!\nBeep, beep, here comes the bus!\nChoo, choo, here comes the train!\nVroom, vroom, go, go, go!" }
  ],
  books: [
    { t: "Freight Train", au: "Donald Crews", why: "火車與顏色，字很少，圖像清楚；也能順便複習顏色。" },
    { t: "Truck", au: "Donald Crews", why: "一輛卡車的旅程，幾乎沒字，適合邊看邊說 Truck!" },
    { t: "Planes", au: "Byron Barton", why: "Byron Barton 的交通工具系列，字少圖大，有飛機、卡車等不同主題可挑。" }
  ]
}
});
