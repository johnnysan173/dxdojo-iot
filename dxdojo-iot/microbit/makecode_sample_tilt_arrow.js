// =====================================================================
//  水曜のDX道場 第40回 IoT回 ─ MakeCode 体験サンプル（実機なしでOK）
//  https://makecode.microbit.org/ → 新しいプロジェクト → 右上 {} JavaScript → 貼り付け
//  → 左のシミュレーターの micro:bit をマウスでドラッグして傾けると矢印が出る
//  （ブロック表示に戻すと、同じ内容がブロックで見られます）
//
//  ステップ1: 傾けたら矢印  ← まずはここだけ（3分）
//  ステップ2: 振ったらハート、ボタンで数を数える（+3分）
//  ステップ3: 傾きの数値を見る（余裕があれば）
// =====================================================================

// ---------- ステップ1: 傾けたら矢印 ----------
input.onGesture(Gesture.TiltRight, function () {
    basic.showArrow(ArrowNames.East)      // 右に傾ける → →
})
input.onGesture(Gesture.TiltLeft, function () {
    basic.showArrow(ArrowNames.West)      // 左に傾ける → ←
})
input.onGesture(Gesture.LogoUp, function () {
    basic.showArrow(ArrowNames.North)     // 手前を下げる（ロゴが上）→ ↑
})
input.onGesture(Gesture.LogoDown, function () {
    basic.showArrow(ArrowNames.South)     // 奥を下げる（ロゴが下）→ ↓
})

// ---------- ステップ2: 振ったらハート、ボタンでカウント ----------
let count = 0
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Heart)       // 振る → ♥
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)               // Aボタン → 数を増やす
})
input.onButtonPressed(Button.B, function () {
    count = 0
    basic.showIcon(IconNames.No)          // Bボタン → リセット
})

// ---------- ステップ3: 傾きの数値を見る（A+B 同時押し） ----------
// 「今日のデモでブラウザに飛ばしている数字」はこれと同じもの
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(input.acceleration(Dimension.X))   // 左右の傾き: -1024 〜 1024
})

// 起動時
basic.showIcon(IconNames.Happy)
