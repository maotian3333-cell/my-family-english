// 多元活動：每個單元 3 版各用不同的活動類型（賓果、轉盤、迷宮、尋寶、連點成圖、照字母塗色…），並補上直接教學頁與字首變化（word family）資料。
(function () {
  var A = window.MFE_ACT, i;
  function set(u, plans) { A[u].plans = plans; A[u].plan = plans[0]; }
  // 2 歲：簡單、大面積
  ["Z1", "Z2", "Z5"].forEach(function (u) { set(u, [["dots", "pick", "paint"], ["bingo", "pick", "dots"], ["hunt", "paint", "pick"]]); });
  set("Z3", [["pick", "dots", "hunt"], ["bingo", "pick", "dots"], ["hunt", "pick", "bingo"]]);
  set("Z4", [["pick", "paint", "match"], ["hunt", "match", "pick"], ["bingo", "paint", "dots"]]);
  // 3 歲：連連看、找一樣、賓果
  for (i = 1; i <= 9; i++) set("A" + i, [["match", "pick", "dots"], ["hunt", "match", "pick"], ["bingo", "pick", "dots"]]);
  // 4 歲：加入迷宮、數字連點成圖
  set("B1", [["pick", "paint", "match"], ["hunt", "pick", "bingo"], ["maze", "paint", "pick"]]);
  ["B2", "B3", "B5", "B6"].forEach(function (u) { set(u, [["pick", "match", "paint"], ["hunt", "pick", "bingo"], ["maze", "match", "pick"]]); });
  set("B4", [["count", "pick", "count"], ["count", "hunt", "dotdot"], ["count", "bingo", "pick"]]);
  // 5 歲：字母聲音，各單元輪流用不同的活動組合
  var LA2 = [["capmatch", "hunt", "bubble"], ["colorby", "capmatch"], ["maze", "sort", "bubble"]];
  var LA3 = [["bingo", "sort", "spinner"], ["dotdot", "bingo"], ["spinner", "bingo", "trace"]];
  ["C1", "C2", "C3", "C4", "C5", "C6"].forEach(function (u, n) { set(u, [["lpick", "lmatch", "trace"], LA2[n % 3], LA3[[0, 1, 2, 1, 2, 0][n]]]); });
  set("C7", [["rmatch", "rpick", "rmatch"], ["rpick", "rmatch", "bingo"], ["bingo", "rpick", "rmatch"]]);
  set("C8", [["pick", "dots", "pick"], ["hunt", "pick", "bingo"], ["maze", "dots", "pick"]]);
  // 6 歲：拼讀、字首變化、轉盤、賓果
  set("D1", [["build", "fill", "findword"], ["wordfam", "spinner", "findword"], ["bingo", "maze", "fill"]]);
  set("D2", [["build", "fill", "findword"], ["wordfam", "hunt", "build"], ["spinner", "bingo", "fill"]]);
  set("D3", [["build", "fill", "findword"], ["wordfam", "spinner", "findword"], ["bingo", "hunt", "build"]]);
  set("D4", [["sight", "sentmatch", "findword"], ["hunt", "bingo", "sentmatch"], ["maze", "sight", "sentmatch"]]);
  set("D5", [["dialog", "dialog", "dialog"], ["dialog", "dialog", "dialog"], ["dialog", "dialog", "dialog"]]);
  set("D6", [["order", "order", "sentmatch"], ["sentmatch", "order", "order"], ["order", "sentmatch", "order"]]);
  A.RC.extra = ["abc"];

  // 字首變化：同一個字尾，只換開頭的子音，大量練習
  A.D1.fam = [["at", ["c", "h", "b", "m", "p", "s", "r", "f"]], ["an", ["c", "f", "m", "p", "r", "t", "v", "b"]], ["ap", ["c", "l", "m", "n", "t", "g"]], ["ag", ["b", "r", "t", "w"]]];
  A.D2.fam = [["en", ["h", "p", "t", "m", "d"]], ["ed", ["b", "r", "f", "l", "w"]], ["ig", ["b", "d", "f", "p", "w", "j"]], ["in", ["b", "f", "p", "t", "w"]]];
  A.D3.fam = [["og", ["d", "f", "h", "l", "j"]], ["ot", ["c", "d", "h", "l", "n", "p"]], ["ug", ["b", "h", "j", "m", "r", "t"]], ["un", ["b", "f", "r", "s"]]];
  // 有直接教學頁的單元
  ["C1", "C2", "C3", "C4", "C5", "C6", "D1", "D2", "D3"].forEach(function (u) { A[u].teach = true; });
})();
