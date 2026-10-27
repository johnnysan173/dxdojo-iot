// =====================================================================
//  プランB: UARTを使わず、micro:bit標準の「加速度計サービス」「ボタンサービス」
//  だけを起動する。傾き判定はブラウザ側（HTML）で行う。
//  コード側にロジックが一切ないので、メモリ消費が最小。
//
//  MakeCode設定: 拡張機能 bluetooth / No Pairing Required を ON
// =====================================================================

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})

bluetooth.startAccelerometerService()
bluetooth.startButtonService()
basic.showIcon(IconNames.No)
