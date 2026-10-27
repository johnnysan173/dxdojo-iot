# 事例② Wi-Fi電子ペーパーで会議室の案内表示

```
Googleカレンダー ─▶ 予約サイト（GAS）─▶ 画像に変換 ─▶ MindReset「dot」（Wi-Fi電子ペーパー）
                     ▲ 電子ペーパー横のQRから開く            画像APIで表示更新
```

- デバイス: MindReset「dot」。画像API仕様 → https://dot.mindreset.tech/docs/service/open/image_api
- 予約サイト: Google Apps Script（Googleカレンダー連携）。電子ペーパー横に貼ったQRコードから開く
- 変換・予約サイトのコードは Antigravity に作らせた（2026/2/25）

## Antigravity に渡したプロンプト（実物・要約）

```
Part1  Actual (image API) is the below: https://dot.mindreset.tech/docs/service/open/image_api

Part2  Generate a website for register and cancellation.
1. We need to create a site maybe GAS? for simple linkage with Google Calendar
2. User will scan the QR code I printed and stick to beside the E-paper.
3. User can see the current reservation status
   - User ID, Time
4. We have a button beside each reservation that allow to delete.
5. We have a reservation function.
   reserve the meeting room by entering
   - Select user id (I will provide the list)
   - Select the date and time (default will be current date and time in 15mins manner
     for example, now is 10:14, system will suggest 10:15)
   default duration will be 30mins
```

→ 実装計画 約1分、3ファイル（+473行）約1分で生成。

## このフォルダに入れるもの（Johnny側で追加）
- `gas/` : Antigravity が生成した GAS のコード（`Code.gs`, `index.html` など）
- `screenshots/` : Antigravity の会話画面、電子ペーパーの実機写真
