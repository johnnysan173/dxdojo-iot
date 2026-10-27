# micro:bit 側

## 推奨：公式「BLE All Services」hex を書き込むだけ（コード不要）

MakeCode は使わず、micro:bit 公式のビルド済み hex を USB でコピーする。
全センサーが BLE サービスとして公開され、ペアリング不要で Chrome から接続できる。
C++（DAL/CODAL）ビルドなので **V1 でもメモリ不足にならない**。

| バージョン | hex |
|---|---|
| V1 | https://tech.microbit.org/bluetooth/assets/BLE_All_Services_DAL_2-1-1-No-Mag.hex （磁力計なし＝キャリブレーション不要） |
| V2 | https://tech.microbit.org/bluetooth/assets/BLE_All_Services_CODAL_0-2-40-ABDLIMTU-P.hex |

出典: https://tech.microbit.org/bluetooth

手順:
1. 上の hex をダウンロード
2. micro:bit を USB で接続 → `MICROBIT` ドライブに hex をコピー
3. 再起動後、`web/index.html` の「micro:bit に接続」

使うサービス（判定はすべてブラウザ側 `web/index.html`）:
- Accelerometer Service `e95d0753-…`（加速度 int16 x3, milli-g）
- Button Service `e95d9882-…`（A/B ボタン）

## 代替：MakeCode 最小構成（`makecode_minimal_services.js`）

MakeCode で作る場合は、ロジックを一切書かずにサービスを起動するだけの構成にする。

- 拡張機能 **bluetooth** を追加
- ⚙ → プロジェクトの設定 → **No Pairing Required** を ON
- JavaScript に切り替えて貼り付け → ダウンロード

## MakeCode 体験サンプル（`makecode_sample_tilt_arrow.js`）

実機がなくても MakeCode のシミュレーターで動く。傾けると矢印、振るとハート、A/B ボタンでカウント、A+B で傾きの数値。
`{} JavaScript` に貼り付けてから「ブロック」に戻すと、ブロックでも読める。

## experimental/ — UART 方式（V1 では動かなかった記録）

micro:bit 側で傾きを判定し UART で `NEXT`/`PREV` を送る方式。
**V1 では bluetooth 拡張 ＋ 加速度センサーの組み合わせで エラー 020（メモリ不足）** になり断念。
以下の順で削っても解消しなかった（ボタンのみなら動作）:

| ファイル | 内容 | 結果(V1) |
|---|---|---|
| `makecode_uart_full.js` | onGesture ×4 ＋ 加速度ストリーミング | 020 |
| `makecode_uart_lite.js` | ストリーミング削除 | 020 |
| `makecode_uart_v2_loop.js` | onGesture をやめ forever で判定 | 020 |
| `makecode_uart_v3_preinit.js` | BLE 前にセンサー初期化 ＋ while ループ | 020 |

V2 であれば動く可能性が高い。`web/index.html` は UART サービスを見つけた場合は自動で UART モードになる。
