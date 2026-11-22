export type KnowledgeArticle = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  sort: number;
  status: "上架" | "下架";
  publishedAt: string;
  updatedAt: string;
};

/** Demo seed：之後改接 Supabase；Admin 上架後以前台 revalidate 刷新快取 */
export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    slug: "pdf-bleed-and-safe-zone",
    title: "完稿出血與安全區怎麼抓？",
    summary:
      "印刷檔常見的出血 3mm、安全區與文字距離裁切線的基本規則，避免裁切後文字被切到。",
    body: `印刷檔若沒有預留出血，裁切時容易露出白邊或切到重要內容。

一般建議：
1. 出血（bleed）四周各預留約 3mm。
2. 重要文字與 Logo 請放在安全區內，距離裁切線至少 3～5mm。
3. 匯出 PDF 時勾選含出血與裁切標記，方便檢稿。

橙益檢稿時會依品項檢查出血與安全區；不合格會標示待補件並說明原因。`,
    coverImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "設計完稿與文件標記",
    category: "檔案規格",
    sort: 1,
    status: "上架",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
  },
  {
    id: 2,
    slug: "zip-upload-and-file-naming",
    title: "整包 ZIP 上傳與檔名建議",
    summary:
      "多款商品一次下單時，用 ZIP 打包並清楚命名，可加快員工分款與檢稿速度。",
    body: `若同一訂單有多款品項（例如名片 A／B／C），可整包壓縮成 ZIP 上傳，由橙益員工於後台分款後逐款檢稿。

檔名建議：
- 訂單品項＋版本，例如「名片A_v1.pdf」
- 避免特殊符號與過長檔名
- 單檔預設上限 100MB（可依實際印刷檔於開工時調高）

檢稿不合格時，只需補傳該品項；已合格品項會維持狀態。`,
    coverImage:
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "印刷廠作業場景",
    category: "下單流程",
    sort: 2,
    status: "上架",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
  },
  {
    id: 3,
    slug: "packaging-box-3d-preview-notes",
    title: "包裝盒 3D 預覽注意事項",
    summary:
      "3D 為外觀與比例示意，不代表已通過結構驗證或可直接生產；確認後再送出詢價。",
    body: `包裝盒 3D 預覽可調整尺寸並旋轉縮放，也可上傳 Logo PNG 做基本貼圖示意。

請留意：
- 3D 僅供外觀與比例溝通，不代表結構、承重或刀模已驗證。
- 實際材質、紙厚與成品色彩仍需專人確認。
- 本期 3D 詢價不含自動估價與直接下單。

確認盒型與尺寸後，可送出詢價由橙益人工回覆。`,
    coverImage:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "包裝盒產品陳列",
    category: "包裝盒 3D",
    sort: 3,
    status: "上架",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
  },
  {
    id: 4,
    slug: "pantone-color-proofing",
    title: "專色與四色：色票對色前先搞懂這三件事",
    summary:
      "品牌色要用 Pantone 專色還是 CMYK 四色？打樣、色票與印刷機台條件如何影響最終呈現。",
    body: `品牌色常被問「一定要專色嗎？」答案取決於數量、材質與預算。

建議先確認：
1. 色票在指定紙材上的實樣（銅版／象牙／美術紙差異大）。
2. 專色適合短版、需穩定品牌色；四色較適合照片與漸層。
3. 打樣條件盡量接近正式機台與紙材，避免「螢幕對了、紙上偏了」。

橙益可依品項協助安排色票確認與打樣節奏。`,
    coverImage: "/images/print-12.png",
    coverAlt: "色票與印刷色樣",
    category: "色彩管理",
    sort: 4,
    status: "上架",
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-05",
  },
  {
    id: 5,
    slug: "paper-choice-for-business-card",
    title: "名片紙材怎麼選？象牙卡、冰白、觸感紙差在哪",
    summary:
      "紙厚、表面與觸感會決定第一印象。依品牌調性挑選，比一味追高克數更重要。",
    body: `名片是手感品牌。常見選擇：

- 象牙卡：溫潤、適合經典商務。
- 冰白／雪白：偏冷淨，適合設計品牌。
- 觸感紙／特殊紙：有紋理，但需注意印刷覆蓋與燙金適配。

加工（霧膜、局部 UV、軋型）會再改變觸感與成本，建議先定紙再談加工。`,
    coverImage: "/images/print-10.png",
    coverAlt: "名片紙材與樣張",
    category: "紙材知識",
    sort: 5,
    status: "上架",
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-12",
  },
  {
    id: 6,
    slug: "gift-box-structure-checklist",
    title: "禮盒結構確認清單：下刀模前別跳過這些",
    summary:
      "尺寸、內襯、開合方向與運輸耐用度，建議在確認刀模前一次對齊，減少重工。",
    body: `禮盒進入刀模前，建議對齊：

1. 內裝物實際尺寸與預留空隙。
2. 開合方向（天地蓋／書型／抽屜）。
3. 內襯材質與固定方式。
4. 運輸與堆疊需求。

3D 預覽可協助溝通外觀比例，正式結構仍需人工確認。`,
    coverImage: "/images/print-13.png",
    coverAlt: "禮盒結構與成品",
    category: "包裝結構",
    sort: 6,
    status: "上架",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
  },
];
