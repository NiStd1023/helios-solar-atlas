# HELIOS｜太陽系探索圖鑑

## 開啟網站

解壓縮後，用瀏覽器開啟 `dist/index.html`。軌道模擬、行星圖鑑、尺度比較和問答可離線操作。NASA 延伸閱讀連結需要網路。

如要在本機以 HTTP 預覽，在本資料夾執行下列指令，再開啟 [本機預覽](http://localhost:8000/)。

```sh
python3 -m http.server 8000 --directory dist
```

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `dist/index.html` | 頁面結構與天文知識內容 |
| `dist/style.css` | 桌面與手機的響應式樣式 |
| `dist/atlas.js` | 天體資料、軌道動畫、篩選、比較與問答 |
| `dist/media/` | 天體 WebP 插畫、標誌與星空背景 |
| `render-planets.py` | 重新產生天體插畫的 Python 原始碼 |

## 修改與部署

直接編輯 `dist/` 中的原始碼即可。要架站時，把整個 `dist/` 的內容部署到靜態網站服務，保留檔案與資料夾的相對位置。

如需重新產生天體圖像，在專案根目錄執行下列指令。腳本會更新 `dist/media/` 內的天體 WebP。

```sh
python3 -m pip install numpy pillow
python3 render-planets.py
```
