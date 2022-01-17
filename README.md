# 作品說明

The F2E 台灣旅遊景點服務，串接交通部 PTX 開放資料，

提供旅遊導覽，並使用前後端分離串接後端API，將取得資料記錄於資料庫中，

可再依照不同會員身份維護資料內容，並提供熱門、主題類型景點資料，

作品為 RWD 環境。

## 網站 Demo
[githubpage](https://spenguinlui.github.io/f2e-bustop/)

## 設計稿來源

UI/UX 設計師：Shiaohan

[figma 連結](https://www.figma.com/file/ySgovCb9c2d2AiIDO7mQx3/The-F2E-Week-01?node-id=2%3A3)

[系列相關設計連結](https://2021.thef2e.com/users/6296427084285739387)

[作品集連結](https://www.behance.net/hsiaohan)

## 後端資源
[github](https://github.com/spenguinlui/f2e-tourist-backend)

## 功能項目

### 前台

- 取得景點/餐廳/住宿/活動等資料
- 關鍵字搜尋，以類型、地區等條件過濾搜尋資料
- 觀看模式可切換為列表模式與地圖模式
- 依照特定主題瀏覽相關資料
- 加入珍藏項目(不一定要加入會員)
- 可對特定資料寫下評論，影響評價分數
- 可註冊為廠商，對認領服務補充更完善資料

### 後台
- 修改主題內容，包含擁有關鍵字 Tag 列表
- 管理一般會員、廠商
- 管理評論、補充資料
- 調整尋訪次數等權重設定


# 系統說明

系統以 Vue 2 環境建立，並以 scss 編寫樣式。

系統運行方式:
```
yarn install
yarn run serve
```

# 資料夾說明

* src/assets/images - 圖片與 icon
* src/assets/scss - scss 引用檔
* src/components - vue 元件
* src/json - 靜態 json 檔引用
* src/modules - 引用 js function 或物件
* src/pages - 各頁面主要底版
* src/store - vuex 資料存放
* src/route.js - 頁面路由配置

# 使用技術、套件、第三方服務

* Vue Cli
* Vuex
* VueRouter
* Axios
* JsSHA
* Leaflet
* ESlint
* SCSS

# 串接 API 資料

## PTX
### v2 (https://ptx.transportdata.tw/MOTC/v2/)

```
取得所有觀光景點資料
- Tourism/ScenicSpot
取得所有觀光餐飲資料
- Tourism/Restaurant
取得所有觀光旅宿資料
- Tourism/Hotel
取得所有觀光活動資料
- Tourism/Activity
```

# 架構說明圖

### 評論
![comment](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/comment.jpg)

### 細節頁面
![dataDetail](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/dataDetail.jpg)

### 珍藏
![favorites](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/favorites.jpg)

### 熱門
![hots](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/hots.jpg)

### 補充資料
![local](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/local.jpg)

### 主題
![themes](https://github.com/spenguinlui/f2e-tourist-frontend/blob/master/readme-img/sitemap.jpg)
