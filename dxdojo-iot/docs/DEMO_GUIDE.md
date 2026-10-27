# デモ手順（水曜のDX道場 第40回 IoT回）

## 事前準備
1. `microbit/README.md` の公式 hex を micro:bit に書き込む（LED が ✕ → 待機中）
2. `chrome-extension/README.md` の手順で Chrome 拡張を読み込む（Google Slides を使う場合）
3. Mac の システム設定 → Bluetooth に古い「BBC micro:bit」が残っていれば削除

## 当日の流れ
1. `web/index.html` を Chrome で開く
2. 右上「micro:bit に接続」→ `BBC micro:bit [xxxxx]` を選択 → ステータスが緑 `[ACC]`
3. L キーでログを出し、傾けると `受信: NEXT` が流れるのを見せる（Bluetooth で本当に飛んでいる証拠）
4. Google Slides を使う場合: Slides を発表モードにして、HTML の「Google Slides に転送」を ON

## 足に付ける場合の設定
1. 固定してから接続 → ⚙ 傾き設定
2. 「今の姿勢を基準として記録」（1 秒静止）
3. 右/左/前/後 それぞれ、動かした状態で「この動きを記録」
4. 使わない方向は「なし」に。バーが赤くなる＝発火。しきい値で感度調整

## つまずきポイント
- MakeCode + bluetooth は V1 でエラー 020（メモリ不足）→ 公式 hex を使う
- 接続直後に切れる → ペアリング設定の不一致 or Mac 側の古いペアリング情報
- 時々切れる → 自動再接続で復帰する。アンテナ（基板左上の角）を手で覆わない
- 拡張経由で Slides が動かない → Slides タブを再読み込み（拡張導入前から開いていたタブには content script が入らない）
- 拡張のツールバーアイコンをクリックすると「次へ」をテスト送信できる（micro:bit なしで確認可）
