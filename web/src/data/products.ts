export type ProductRecord = {
  id: number;
  slug: string;
  name: string;
  enName?: string;
  category: string;
  summary: string;
  description: string;
  basePrice: number | null;
  unit: string;
  orderMode: "直接計價下單" | "人工詢價";
  status: "上架" | "下架";
  coverImage: string;
  coverAlt: string;
  updatedAt: string;
  images?: string[];
  isNew?: boolean;
  isPickup?: boolean;
  featured?: boolean;
  soldOut?: boolean;
  /** 主圖 hover 顯示「預覽即時 3D」並連到此路徑 */
  preview3dHref?: string;
  tags?: string[];
  specs?: { label: string; value: string }[];
  longDescription?: string[];
};

/** 示範用多圖庫：商品內頁左側縮圖切換 */
export const demoGalleryImages = [
  "/images/pacdora/pacdora-01-mailer.jpg",
  "/images/pacdora/pacdora-02-rte.jpg",
  "/images/pacdora/pacdora-03-sweet.png",
  "/images/pacdora/pacdora-04-medicine.png",
  "/images/pacdora/pacdora-05-tuck-mailer.jpg",
  "/images/pacdora/pacdora-06-magnetic.jpg",
  "/images/pacdora/pacdora-07-square.jpg",
  "/images/pacdora/pacdora-08-shoe.png",
  "/images/pacdora/pacdora-09-shipping.png",
  "/images/pacdora/pacdora-10-square-ship.jpg",
  "/images/pacdora/pacdora-11-drawer.png",
  "/images/pacdora/pacdora-12-autolock.png",
] as const;

/** 主圖 + 另外 3 張示範圖，供左側 thumbnail 切換 */
export function getProductGalleryImages(product: ProductRecord): string[] {
  if (product.images?.length) return product.images;
  const rest = demoGalleryImages.filter((src) => src !== product.coverImage);
  return [product.coverImage, ...rest.slice(0, 3)];
}

export const products: ProductRecord[] = [
  {
    id: 1,
    slug: "premium-business-card",
    name: "精品名片",
    enName: "Business Card",
    category: "合版、數位印刷品",
    summary: "300g 象牙卡／雙面彩／霧膜，適合品牌第一印象。",
    description:
      "共用商品詳情版型示意。後台可設定為直接計價下單或人工詢價；直接下單商品可選規格後進入購物車結帳。",
    basePrice: 680,
    unit: "盒／100 張",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-02-rte.jpg",
    coverAlt: "精品名片",
    updatedAt: "2026-11-18",
    isNew: true,
  },
  {
    id: 2,
    slug: "catalog-16p",
    name: "企業型錄 16P",
    enName: "Catalog 16P",
    category: "合版、數位印刷品",
    summary: "157g 銅版／騎馬釘，適合產品型錄與企劃手冊。",
    description:
      "型錄頁數、紙材與加工可於後台價目設定；本頁為共用詳情版型佔位。",
    basePrice: 4200,
    unit: "本／起訂 100",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-07-square.jpg",
    coverAlt: "企業型錄",
    updatedAt: "2026-11-12",
  },
  {
    id: 3,
    slug: "lid-base-gift-box",
    name: "天地蓋禮盒",
    enName: "Lid & Base Gift Box",
    category: "包裝彩盒",
    summary: "灰板裱銅版，內襯泡棉可選；客製尺寸可走人工詢價。",
    description:
      "若需特殊尺寸或結構，後台可設為人工詢價，前台顯示洽詢報價並導向官方 LINE。",
    basePrice: 85,
    unit: "個",
    orderMode: "人工詢價",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-06-magnetic.jpg",
    coverAlt: "天地蓋禮盒",
    updatedAt: "2026-11-10",
    isPickup: true,
    featured: true,
    preview3dHref: "/box-3d-demo",
  },
  {
    id: 4,
    slug: "tote-bag",
    name: "客製手提袋",
    enName: "Custom Tote Bag",
    category: "手提袋",
    summary: "公版／客製手提袋，品牌活動與門市提袋適用。",
    description: "可選紙材、印刷色數與提把規格，適合活動贈品與門市使用。",
    basePrice: 18,
    unit: "個／起訂",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-01-mailer.jpg",
    coverAlt: "客製手提袋",
    updatedAt: "2026-11-20",
    isNew: true,
  },
  {
    id: 5,
    slug: "label-sticker",
    name: "標籤貼紙",
    enName: "Label Sticker",
    category: "標籤貼紙",
    summary: "凸版／柔版／數位貼紙，適合產品標示與封口。",
    description: "依材質與膠性提供多種貼紙方案，可客製尺寸與刀模。",
    basePrice: 1200,
    unit: "捲／起訂",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-04-medicine.png",
    coverAlt: "標籤貼紙",
    updatedAt: "2026-11-08",
  },
  {
    id: 6,
    slug: "shipping-box",
    name: "紙箱／出貨箱",
    enName: "Shipping Box",
    category: "紙箱／出貨箱",
    summary: "瓦楞紙箱、宅配箱與加強紙箱，出貨保護一次到位。",
    description: "可依尺寸與承重需求選箱型，支援印刷與貼標。",
    basePrice: 25,
    unit: "個",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-09-shipping.png",
    coverAlt: "紙箱與出貨箱",
    updatedAt: "2026-11-05",
    isPickup: true,
  },
  {
    id: 7,
    slug: "document-folder",
    name: "資料夾",
    enName: "Document Folder",
    category: "資料夾",
    summary: "PP 資料夾、公文夾、資料簿與夾鏈袋。",
    description: "辦公與活動資料整理適用，可印刷品牌識別。",
    basePrice: 35,
    unit: "個",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-11-drawer.png",
    coverAlt: "資料夾",
    updatedAt: "2026-10-28",
  },
  {
    id: 8,
    slug: "color-packaging-box",
    name: "包裝彩盒",
    enName: "Color Packaging",
    category: "包裝彩盒",
    summary: "客製彩盒、公版彩盒、精裝彩盒與塑膠彩盒。",
    description: "結構與完稿可客製，適合品牌禮盒與商品包裝。",
    basePrice: 48,
    unit: "個／起訂",
    orderMode: "人工詢價",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-08-shoe.png",
    coverAlt: "包裝彩盒結構",
    updatedAt: "2026-11-15",
    isNew: true,
  },
  {
    id: 9,
    slug: "dm-flyer",
    name: "DM／型錄單張",
    enName: "DM / Flyer",
    category: "合版、數位印刷品",
    summary: "活動宣傳單張與摺頁，合版與數位皆可。",
    description: "依紙材與加工選擇合版或數位印刷，適合短期活動。",
    basePrice: 2.5,
    unit: "張／起訂",
    orderMode: "直接計價下單",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-03-sweet.png",
    coverAlt: "DM 與印刷成品",
    updatedAt: "2026-10-22",
  },
  {
    id: 10,
    slug: "color-proofing",
    name: "色票對色服務",
    enName: "Color Proofing",
    category: "合版、數位印刷品",
    summary: "Pantone 色票確認與打樣對色。",
    description: "品牌色穩定呈現前，先安排色票與打樣確認。",
    basePrice: null,
    unit: "次",
    orderMode: "人工詢價",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-05-tuck-mailer.jpg",
    coverAlt: "色票對色",
    updatedAt: "2026-11-01",
    isPickup: true,
  },
  {
    id: 11,
    slug: "press-check",
    name: "印刷校色",
    enName: "Press Check",
    category: "合版、數位印刷品",
    summary: "機台校色與品質控管，確保批次一致。",
    description: "正式開印前進行校色與樣張確認。",
    basePrice: null,
    unit: "次",
    orderMode: "人工詢價",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-12-autolock.png",
    coverAlt: "印刷校色色條",
    updatedAt: "2026-10-18",
  },
  {
    id: 12,
    slug: "qc-inspection",
    name: "完稿檢稿",
    enName: "Artwork Check",
    category: "合版、數位印刷品",
    summary: "出血、安全區與檔案規格人工檢稿。",
    description: "下單後由專人檢稿，不合格會標示待補件。",
    basePrice: null,
    unit: "件",
    orderMode: "人工詢價",
    status: "上架",
    coverImage: "/images/pacdora/pacdora-10-square-ship.jpg",
    coverAlt: "完稿檢稿作業",
    updatedAt: "2026-10-15",
    soldOut: false,
  },
];
