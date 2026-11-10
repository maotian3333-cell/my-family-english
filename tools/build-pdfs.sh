#!/bin/bash
# 用 Chrome 把 27 份學習單印成 PDF，放進 worksheets/。需要已安裝 Google Chrome / Chromium。
# 用法：在專案根目錄執行  bash tools/build-pdfs.sh
CHROME="${CHROME:-google-chrome}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/worksheets"
for u in A1 A2 A3 A4 A5 A6 A7 A8 A9 B1 B2 B3 B4 B5 B6 C1 C2 C3; do
  for a in 2 3 4; do
    "$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files \
      --no-pdf-header-footer --virtual-time-budget=6000 \
      --print-to-pdf="$ROOT/worksheets/$u-$a.pdf" "file://$ROOT/index.html#sheet/$u/$a" >/dev/null 2>&1
    echo "$u-$a"
  done
done
