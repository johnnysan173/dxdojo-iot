// ハブからのコマンドを Google Slides タブへ転送する
async function findSlidesTab() {
  const tabs = await chrome.tabs.query({ url: 'https://docs.google.com/presentation/*' });
  if (!tabs.length) return null;
  // 発表中（/present）のタブを優先、なければアクティブなもの、なければ先頭
  return tabs.find(t => /\/present/.test(t.url)) || tabs.find(t => t.active) || tabs[0];
}

async function sendCmd(cmd) {
  const tab = await findSlidesTab();
  if (!tab) return { ok: false, error: 'Google Slides のタブが見つかりません' };
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'KEY', cmd });
    return { ok: true, tabTitle: tab.title };
  } catch (e) {
    return { ok: false, error: 'Slidesタブに送れません（タブを再読み込みしてください）: ' + e.message };
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'CMD') {
    sendCmd(msg.cmd).then(sendResponse);
    return true; // async
  }
});

// ツールバーアイコン: テスト送信（次へ）
chrome.action.onClicked.addListener(async () => {
  const r = await sendCmd('NEXT');
  console.log('[microbit-remote] test NEXT ->', r);
});
