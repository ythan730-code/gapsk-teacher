# GAPSK星球 · 完整教師版

香港小學普通話課堂互動網頁。包含課本開場、星球與小鎮、第一章〈鼻音迷失車站〉及現有第二章〈聲音失調音樂盒〉。

## GitHub Pages 上傳

1. 建立名為 `gapsk-teacher` 的 GitHub 專案。
2. 解壓縮後打開 `gapsk-teacher` 資料夾，把內部全部檔案與 `assets` 資料夾上傳到專案根目錄。
3. 根目錄應能直接看到 `index.html`、`storybook.html`、`chapter-2.html` 和 `assets`。
4. 在 Settings → Pages，把 Source 設為 Deploy from a branch。
5. Branch 選 main，資料夾選 /(root)，按 Save。

## 網頁入口

以下路徑均接在專案網站根網址之後。

| 用途 | 路徑 |
| --- | --- |
| 完整開場 | `./` |
| 每次演示開場閃電，保留學習紀錄 | `storybook.html?preview=opening#planet` |
| 繪本小鎮 | `storybook.html#town` |
| 第一章完整課堂 | `index.html#chapter-1` |
| 聲音工作台與舌位圖 | `index.html#chapter-2` |
| 漢字資料室 | `index.html#chapter-3` |
| Sayo 遊戲入口 | `index.html#chapter-4` |
| 廣播朗讀與修復 | `index.html#chapter-5` |
| 月台留言 | `index.html#chapter-6` |
| 第二章音樂盒工坊 | `chapter-2.html#workshop` |

第一章的 `#chapter-2` 表示第二個課堂環節，第二章的獨立頁面是 `chapter-2.html`。

## 功能及修改位置

- `lesson-data.js` 管理第一章廣播、十字及 Sayo 遊戲連結。
- `six-app.js` 管理第一章探究字例、逐字揭示拼音與教師歸納。
- 教師歸納以 `hyt` 揭示，這個課堂密碼寫在瀏覽器程式碼中。
- `prologue.js`、`prologue.css` 管理開書、星球與開場閃電。
- `station-celebration.js` 管理修復煙花及後續工廠故障轉場。
- `learning-reset.js` 管理第一章清除紀錄功能。
- `chapter2-data.js` 管理第二章詞語。
- 圖片集中放在 `assets`。

首次進入會播放完整開場。第一章完成紀錄保存在目前裝置與瀏覽器，再次進入時會顯示已修復狀態。可使用「清除學習紀錄」重設第一章，或使用上表的閃電演示網址。第二章有獨立進度。

Sayo 與 Leap Learning 以外部連結開啟，網站不接收其錄音或評分。個人學習紀錄保存在瀏覽器，尚無帳號及跨裝置同步。

故障廣播真人錄音待提供。此檔案包沿用目前以文字及教師帶讀進行的課堂流程。

## 本機預覽

在資料夾內使用靜態網頁伺服器，例如 `python3 -m http.server 8768`，再開啟伺服器提供的網址。

本專案是 HTML、CSS、JavaScript 靜態網站，可直接以 GitHub Pages 發佈。
