# SEO／GEO／結構化資料規劃（橙益第一期）

> 目標：讓搜尋引擎與生成式 AI（Google AI 摘要、ChatGPT／Perplexity 等）**有機會正確理解、收錄並引用**橙益官網。  
> 聲明：**無法保證**一定出現在任一 AI 摘要結果；本期交付的是「技術與內容結構條件」，收錄與引用仍取決於公開內容品質、權威度與各平台演算法。

## 1. 本期建議納入（含於建置）

### A. 基礎 SEO（技術）

| 項目 | 作法 |
|------|------|
| 每頁 Title／Description | Next.js `metadata`；首頁／關於／服務／商品／FAQ／地點／知識列表各有預設模板，後台文案可覆寫合理欄位 |
| Canonical | 正式網域絕對網址 |
| `robots.txt` | 允許公開頁；封鎖 `/member`、Admin、API、登入後路徑 |
| `sitemap.xml` | 自動產出公開頁（首頁、關於×3、服務／商品、FAQ、地點、知識列表／詳情） |
| Open Graph | 標題、描述、主圖（甲方提供品牌圖） |
| 語意 HTML | 單頁一 H1、階層清楚；重要資訊用文字而非只在圖裡 |
| 效能與行動版 | 既有 RWD；圖片 `alt`；核心頁可索引 |

### B. 結構化資料 JSON-LD（Schema.org）

全站輸出 Organization（或印刷店適用之 LocalBusiness 等最接近類型），以及 WebSite（前台搜尋若為公開可含 SearchAction）與各層 BreadcrumbList。公司地點頁帶入地址／地圖相關 LocalBusiness 欄位（文案甲方提供）。FAQ 頁輸出 FAQPage，問答須與頁面一致。商品詳情輸出 Product 或 Service，有可見價格時帶 Offer。關於／服務頁以 AboutPage／WebPage 呈現清楚服務名稱與短述。印刷知識於有正文時輸出 Article 或 TechArticle；若本期僅預留架構，則待文案齊備後再啟用。

實作：伺服端輸出 JSON-LD；上線後以 Google Rich Results／Schema 驗證工具抽測。

### C. GEO（生成式引擎優化）— 讓 AI「讀得懂、敢引用」

| 項目 | 作法 |
|------|------|
| 實體一致 | 公司全名、品牌名「橙益」、服務範圍、地區在關於／頁尾／Schema 一致 |
| 可引用短答 | FAQ、服務頁採「問題 → 2～4 句直接答案 → 補充」 |
| 服務清單明確 | 包裝盒、型錄、名片等用條列與獨立頁，避免只靠輪播圖 |
| `llms.txt` | 根目錄提供給 AI 爬蟲的網站說明（公司是誰、主要頁面連結、聯絡／下單方式） |
| AI 爬蟲政策 | `robots.txt` 明確允許常見 AI 爬蟲（如 GPTBot、ClaudeBot、PerplexityBot、Google-Extended）；若甲方不要被訓練／抓取可改 disallow（開工確認） |
| 會員／訂單區 | 一律 noindex，避免私密流程進摘要 |
| 引用友善 | 重要規格（檔案格式、交期說明、下單流程）用穩定 URL 的公開頁承載 |

## 2. 甲方須配合（影響「能不能被摘要」的關鍵）

技術只能鋪路；**摘要引用靠內容**：

1. 完整、正確的公司介紹、地址、服務說明（勿空白佔位）
2. FAQ 真實問答（建議每分類至少數則完整答案）
3. 商品名稱／規格／公開可說的價格區間（若完全不公開價，Product schema 仍可做但較弱）
4. 品牌 Logo、代表圖、作品圖（含授權）
5. 若有 Google 商家／社群，提供網址供 `sameAs`

## 3. 明確不含／無法承諾

- 保證進入 Google AI Overview、ChatGPT、Perplexity 任一摘要框
- 關鍵字排名保證、外链／業配、長期內容行銷代操
- 「印刷相關知識」完整知識庫撰寫與持續更新（合約現況：選單＋列表預留；完整營運規格另案）
- 進階 SEO 顧問月報、競品分析（可另案）

## 4. 驗收建議（可寫進合約）

- [ ] 公開頁有獨立 title／description；會員區 robots 封鎖或 noindex  
- [ ] sitemap 可開啟且含主要公開 URL  
- [ ] 首頁 Organization／WebSite、FAQ 頁 FAQPage、至少 1 個商品頁 Product／Service JSON-LD 通過驗證工具無重大錯誤  
- [ ] 根目錄 `llms.txt` 可開啟  
- [ ] 抽測 3 個公開頁：H1 正確、主內容為文字可選取  

## 5. 實作優先順序（開發）

1. metadata 模板＋robots＋sitemap  
2. Organization／WebSite／Breadcrumb／FAQ／Product JSON-LD  
3. `llms.txt`＋AI 爬蟲規則（甲方確認）  
4. FAQ／關於／服務文案結構微調（可引用短答）  
5. Search Console／驗證碼協助綁定（帳號甲方持有）  
