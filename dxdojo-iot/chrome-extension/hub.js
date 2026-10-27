// ハブページ（micro:bit BLE スライドHTML）側に注入される。
// ページに <meta name="microbit-remote"> がある場合だけ動作する。
(() => {
  if (!document.querySelector('meta[name="microbit-remote"]')) return;

  window.addEventListener('message', (ev) => {
    if (ev.source !== window) return;
    const d = ev.data;
    if (!d || d.type !== 'MICROBIT_REMOTE') return;
    chrome.runtime.sendMessage({ type: 'CMD', cmd: d.cmd }, (res) => {
      window.postMessage({ type: 'MICROBIT_REMOTE_ACK', cmd: d.cmd, ...(res || { ok: false, error: chrome.runtime.lastError?.message }) }, '*');
    });
  });

  // ページに「拡張あり」を知らせる
  window.postMessage({ type: 'MICROBIT_REMOTE_READY' }, '*');
})();
