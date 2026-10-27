# micro:bit Slide Remote（Chrome拡張）

micro:bit BLE スライドHTML（ハブ）で判定した NEXT / PREV / HOME / BLACK を、
Google Slides のタブに ← → Home B キーとして転送する。

## インストール（デモ用・未パッケージ）
1. Chrome で `chrome://extensions` を開く
2. 右上「デベロッパーモード」を ON
3. 「パッケージ化されていない拡張機能を読み込む」→ このフォルダを選択
4. 拡張の「詳細」→ **「ファイルの URL へのアクセスを許可する」を ON**
   （ハブHTMLをダブルクリック（file://）で開く場合に必要。localhost経由なら不要）

## 使い方
1. Google Slides を開き、「スライドショー」で発表開始（同じChromeウィンドウでもタブでもOK）
2. ハブHTML（web/index.html）を別タブ/別ウィンドウで開く
3. ハブで「micro:bit に接続」→ 右上「Google Slidesに転送」をON
4. micro:bit を傾ける → Google Slides が進む

## 動作確認（micro:bitなし）
- 拡張のツールバーアイコンをクリック → Google Slides に「次へ」が送られる
- 送られない場合: Google Slides のタブを再読み込み（拡張を入れる前から開いていたタブには content script が入っていない）

## 対応先を増やす
`manifest.json` の `content_scripts[0].matches` に URL を足し、`slides.js` の KEYS を調整すれば
PowerPoint Online / Canva など他のブラウザ上プレゼンにも転送できる。
