// =====================================================================
//  v3 / エラー020対策:
//   - BLE起動前に加速度センサーを一度読んで先に初期化（接続後の確保を避ける）
//   - basic.forever を使わず、メイン処理の while ループで判定（ファイバー削減）
//   - LED表示は接続状態のみ
// =====================================================================

let connected = false
let lastSend = 0
let armed = true

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
input.onButtonPressed(Button.A, function () { send("PREV") })
input.onButtonPressed(Button.B, function () { send("NEXT") })

// ★ BLEより先にセンサーを初期化
let x = input.acceleration(Dimension.X)
let z = input.acceleration(Dimension.Z)
basic.pause(200)

bluetooth.startUartService()
basic.showIcon(IconNames.No)

// ★ forever ではなくメインループ
while (true) {
    if (connected) {
        x = input.acceleration(Dimension.X)
        z = input.acceleration(Dimension.Z)
        if (z > 700) {
            if (armed) send("BLACK")
            armed = false
        } else if (x > 500) {
            if (armed) send("NEXT")
            armed = false
        } else if (x < -500) {
            if (armed) send("PREV")
            armed = false
        } else if (x > -250 && x < 250 && z < 300) {
            armed = true
        }
    }
    basic.pause(50)
}
