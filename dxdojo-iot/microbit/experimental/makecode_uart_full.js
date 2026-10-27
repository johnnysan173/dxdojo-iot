// =====================================================================
//  水曜のDX道場 第40回 IoT回 デモ
//  micro:bit → Bluetooth(UART) → Chrome(Web Bluetooth) スライド制御
//
//  使い方（MakeCode https://makecode.microbit.org/ ）
//   1. 新しいプロジェクト → 「拡張機能」→「bluetooth」を追加（radioは自動で外れます）
//   2. 右上の歯車 → プロジェクトの設定 →
//        「No Pairing Required: Anyone can connect via Bluetooth.」を ON
//        （ペアリング不要モード。これを忘れるとChromeから接続できません）
//   3. エディタを JavaScript に切り替え、このファイルの内容を全部貼り付け
//   4. ダウンロード → micro:bit (V1/V2どちらでも可) に書き込み
//
//  送信プロトコル（1行1コマンド、改行区切り）
//   NEXT  : 次のスライド   （右に傾ける / Bボタン）
//   PREV  : 前のスライド   （左に傾ける / Aボタン）
//   HOME  : 先頭スライド   （振る）
//   BLACK : 画面の暗転切替 （ロゴを下に向ける＝裏返す）
//   A,x,y,z : 加速度（約10回/秒）。スライド側の傾きメーター表示用
// =====================================================================

let connected = false
let lastCmdTime = 0
const DEBOUNCE_MS = 600   // 同じ傾きで連打されないようにするための間隔

function sendCmd(cmd: string) {
    if (!connected) return
    const now = input.runningTime()
    if (now - lastCmdTime < DEBOUNCE_MS) return
    lastCmdTime = now
    bluetooth.uartWriteLine(cmd)
}

// ---- 接続状態の表示 ----
bluetooth.onBluetoothConnected(function () {
    connected = true
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    connected = false
    basic.showIcon(IconNames.No)
})

// ---- ジェスチャー ----
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

// ---- ボタン（傾けなくても操作できる保険） ----
input.onButtonPressed(Button.A, function () {
    sendCmd("PREV")
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    sendCmd("NEXT")
    basic.showArrow(ArrowNames.East)
})

// ---- 加速度をストリーミング（傾きメーター用） ----
basic.forever(function () {
    if (connected) {
        // 1パケット20バイト以内に収めるため短い形式にしている
        bluetooth.uartWriteLine(
            "A," + input.acceleration(Dimension.X)
            + "," + input.acceleration(Dimension.Y)
            + "," + input.acceleration(Dimension.Z)
        )
    }
    basic.pause(100)
})

// ---- 起動 ----
bluetooth.startUartService()
basic.showIcon(IconNames.No)   // 未接続
