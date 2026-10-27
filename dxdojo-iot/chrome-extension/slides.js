// Google Slides タブ側。受け取ったコマンドをキーボードイベントとして流す。
const KEYS = {
  NEXT:  { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
  PREV:  { key: 'ArrowLeft',  code: 'ArrowLeft',  keyCode: 37 },
  HOME:  { key: 'Home',       code: 'Home',       keyCode: 36 },
  BLACK: { key: 'b',          code: 'KeyB',       keyCode: 66 },
};

function pressKey(spec) {
  const target = document.activeElement || document.body;
  for (const type of ['keydown', 'keyup']) {
    const ev = new KeyboardEvent(type, {
      key: spec.key, code: spec.code, keyCode: spec.keyCode, which: spec.keyCode,
      bubbles: true, cancelable: true, composed: true
    });
    // keyCode/which は読み取り専用なので上書き
    Object.defineProperty(ev, 'keyCode', { get: () => spec.keyCode });
    Object.defineProperty(ev, 'which',   { get: () => spec.keyCode });
    target.dispatchEvent(ev);
    document.dispatchEvent(ev);
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'KEY' && KEYS[msg.cmd]) {
    pressKey(KEYS[msg.cmd]);
    sendResponse({ ok: true });
  }
});
