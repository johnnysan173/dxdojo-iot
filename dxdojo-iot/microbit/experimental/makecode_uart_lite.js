// =====================================================================
//  水曜のDX道場 第40回 IoT回 デモ（軽量版 / エラー020対策）
//  micro:bit → Bluetooth(UART) → Chrome(Web Bluetooth) スライド制御
//
//  変更点: 加速度のストリーミング（毎100msの文字列送信）を削除。
//          Bluetoothはメモリを多く使うため、V1ではこれでも020が出ることがある。
//          その場合は micro:bit V2 を使うのが確実。
//
//  MakeCode設定
//   1. 拡張機能 → bluetooth を追加
//   2. ⚙ → プロジェクトの設定 → 「No Pairing Required」を ON
//   3. JavaScript に切り替えて全文貼り付け → ダウンロード
//
//  送信コマンド: NEXT / PREV / HOME / BLACK（改行区切り）
// =====================================================================

let connected = false
let lastCmdTime = 0

function sendCmd(cmd: string) {
    if (!connected) return
    if (input.runningTime() - lastCmdTime < 600) return
    lastCmdTime = input.runningTime()
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

input.onGesture(Gesture.TiltRight, function () {
    sendCmd("NEXT")
    basic.showArrow(ArrowNames.East)
})
input.onGesture(Gesture.TiltLeft, function () {
    sendCmd("PREV")
    basic.showArrow(ArrowNames.West)
})
input.onGesture(Gesture.Shake, function () {
    sendCmd("HOME")
    basic.showIcon(IconNames.House)
})
input.onGesture(Gesture.LogoDown, function () {
    sendCmd("BLACK")
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.A, function () {
    sendCmd("PREV")
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    sendCmd("NEXT")
    basic.showArrow(ArrowNames.East)
})

bluetooth.startUartService()
basic.showIcon(IconNames.No)
