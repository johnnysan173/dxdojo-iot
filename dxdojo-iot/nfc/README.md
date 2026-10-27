# NFC名刺 ハンズオン

## 基本コース（10分）：URLをタグに書いて、自分のスマホで開く
1. 登録するURLを1つ決める（lit.link／会社HP／SNS／Notion公開ページ。`https://` から始まるもの）
2. NFC Tools（iOS / Android 無料）→「書く」→「レコードを追加」→「URL / URI」→ URLを入力
3. 「書く」→ タグをスマホ背面にかざす → 完了
4. いったん離して、もう一度かざす → URLが開けばゴール
5. 隣の人のスマホでも開くか試す

## 発展コース：自分のプロフィールサイトを作って公開し、そのURLをタグに書く

### A. GitHub Pages で公開する（無料・消えない・おすすめ）
1. このリポジトリの `nfc/profile-template/index.html` をコピー、または [PROMPT.md](PROMPT.md) のプロンプトでAIに `index.html` を作らせる
2. GitHub で新しいリポジトリを作る（例: `my-profile`、Public）
3. `index.html` をアップロード（Add file → Upload files）
4. Settings → Pages → Branch: `main` / `(root)` → Save
5. 1〜2分後、`https://<ユーザー名>.github.io/my-profile/` で開ける
6. そのURLをNFC Toolsで書き込む

### B. Netlify Drop で公開する（最速・ログイン推奨）
1. `index.html` をフォルダに入れる
2. https://app.netlify.com/drop にフォルダをドラッグ＆ドロップ → URLが発行される
3. 残したい場合は「Claim」でログイン（Google / GitHub）。ログインしないと消える
4. そのURLをNFC Toolsで書き込む

## つまずきポイント
- かざす位置：iPhone は背面上部（カメラ付近）、Android は背面中央〜上部
- Android は 設定 → 接続 → NFC が ON か確認
- 金属の上に置くと読めない。手に持って試す
- NFC Tools の「読み取り専用にする（ロック）」は元に戻せないので押さない
- URL は `https://` から。テキストレコードだと通知が出ない機種がある
- iPhone：読むときはアプリ不要、書くときは NFC Tools の「書く」を押してからかざす

## タグについて
- NTAG213（144バイト）で十分。URL1件なら余裕
- シール型・カード型どちらでも。金属面に貼るなら「金属対応（on-metal）」タグを選ぶ
