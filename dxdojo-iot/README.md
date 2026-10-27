# 水曜のDX道場 第40回 ─ 初心に帰って、IoTでもう一度燃えよう

電子ペーパー・NFC・micro:bit。小さなIoT事例3つと、NFC名刺ハンズオンの資料一式。

**GitHub Pages:** https://johnnyworks-johnny.github.io/dxdojo-iot/ （リポジトリ Settings → Pages → `main` / `(root)` で有効化）

| | 内容 | フォルダ |
|---|---|---|
| ① | **micro:bit × Web Bluetooth** で傾けるとスライドが進む | [`microbit/`](microbit/) [`web/`](web/) [`chrome-extension/`](chrome-extension/) |
| ② | **Wi-Fi電子ペーパー**で会議室の案内表示（Antigravity で Vibe Coding） | [`epaper/`](epaper/) |
| ③ | **NFC名刺**：タッチするだけでプロフィールが開く（ハンズオン） | [`nfc/`](nfc/) |

## ① micro:bit
```
micro:bit（公式 BLE hex）─ Bluetooth LE ─▶ Chrome（Web Bluetooth / web/index.html）
                                             ├─ このページのスライドを操作
                                             └─ Chrome 拡張 ─▶ Google Slides のタブへ ←→ キー転送
```
- [`microbit/README.md`](microbit/README.md) ─ 公式 hex の書き込み（コード不要）、MakeCode最小構成、V1 でハマった記録
- [`microbit/makecode_sample_tilt_arrow.js`](microbit/makecode_sample_tilt_arrow.js) ─ **MakeCode 体験用サンプル**（傾けると矢印。シミュレーターで動く）
- [`web/`](web/) ─ BLE受信・スライド・傾き設定パネル（教え込み式）。GitHub Pages なら https で開けるので Web Bluetooth がそのまま動く
- [`chrome-extension/`](chrome-extension/) ─ Google Slides などのタブへキー転送する拡張。[インストール手順](chrome-extension/README.md)

## ② 電子ペーパー
- [`epaper/README.md`](epaper/README.md) ─ 構成図と、Antigravity に渡したプロンプト（実物）

## ③ NFC名刺（ハンズオン）
- [`nfc/README.md`](nfc/README.md) ─ 基本コース（URLを書く）／発展コース（自分のサイトを公開して書く）
- [`nfc/PROMPT.md`](nfc/PROMPT.md) ─ プロフィールページをAIに作らせるプロンプト
- [`nfc/profile-template/`](nfc/profile-template/) ─ そのまま使えるテンプレート（vCard保存ボタンつき）。GitHub Pages で公開 → URL を NFC に

## 当日の流れ
[`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md)

## ライセンス
MIT
