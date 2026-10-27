// =====================================================================
//  水曜のDX道場 第40回 IoT回 デモ（v2 / エラー020対策版）
//  micro:bit → Bluetooth(UART) → Chrome(Web Bluetooth) スライド制御
//
//  ポイント: input.onGesture はハンドラごとにメモリを使い、BLEと併用すると
//            V1では020（メモリ不足）になる。代わりに1つのループで加速度を
//            読んで傾き・振り・裏返しを自前で判定する。
//
//  操作:
//   右に傾ける / Bボタン → NEXT
//   左に傾ける / Aボタン → PREV
//   振る                 → HOME
//   裏返す（LED面を下）  → BLACK（暗転トグル）
// =====================================================================

let connected = false
let lastSend = 0
let armed = true          // 水平に戻るまで次の傾きを受け付けない（連打防止）

function send(cmd: string) {
    if (!connected) return
    if (input.runningTime() - lastSend < 500) return
    lastSend = input.runningTime()
    bluetooth.uartWriteLine(cmd)
}

bluetooth.onBluetoothConnected(function () {
    connected = true
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    connected = false
    basic.showIcon(IconNames.No)
})

input.onButtonPressed(Button.A, function () {
    send("PREV")
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    send("NEXT")
    basic.showArrow(ArrowNames.East)
})

// ---- 傾き判定ループ（これ1本だけ） ----
basic.forever(function () {
    if (connected) {
        let x = input.acceleration(Dimension.X)
        let z = input.acceleration(Dimension.Z)
        let s = input.acceleration(Dimension.Strength)

        if (s > 2000) {                          // 振る
            send("HOME")
            basic.showIcon(IconNames.House)
            armed = false
        } else if (z > 700) {                    // 裏返し（LED面が下）
            if (armed) {
                send("BLACK")
                basic.showIcon(IconNames.Square)
            }
            armed = false
        } else if (x > 500) {                    // 右に傾ける
            if (armed) {
                send("NEXT")
                basic.showArrow(ArrowNames.East)
            }
            armed = false
        } else if (x < -500) {                   // 左に傾ける
            if (armed) {
                send("PREV")
                basic.showArrow(ArrowNames.West)
            }
            armed = false
        } else if (x > -250 && x < 250 && z < 300) {   // ほぼ水平に戻った
            armed = true
        }
    }
    basic.pause(50)
})

bluetooth.startUartService()
basic.showIcon(IconNames.No)
