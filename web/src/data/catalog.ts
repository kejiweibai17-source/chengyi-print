/** 橙益官方 LINE（設計洽詢入口） */
export const LINE_URL = "https://line.me/R/ti/p/@717syyqm";

/**
 * 商品分類——全站「單一來源」。
 * 導覽列「服務項目」下拉、商品頁左側目錄、首頁分類格都讀這份，
 * 所以名稱與順序一定一致；橙益要新增／調整順序只改這裡（之後接後台即由後台資料取代）。
 */
export const featuredProducts = [
  {
    id: "tote-bag",
    title: "手提袋",
    items: ["公版手提袋", "客製化手提袋"],
    href: "/products?cat=tote-bag",
    image: "/images/print-09.png",
    imageAlt: "手提袋",
  },
  {
    id: "digital-print",
    title: "合版、數位印刷品",
    items: ["卡片", "扇子", "大圖輸出", "DM型錄", "紅包袋"],
    href: "/products?cat=digital-print",
    image: "/images/print-07.png",
    imageAlt: "合版與數位印刷名片",
  },
  {
    id: "label-sticker",
    title: "標籤貼紙",
    items: ["凸版貼紙", "柔版貼紙", "數位貼紙", "特殊膠貼紙"],
    href: "/products?cat=label-sticker",
    image: "/images/print-06.png",
    imageAlt: "標籤貼紙捲",
  },
  {
    id: "color-box",
    title: "包裝彩盒",
    items: ["客製彩盒", "公版彩盒", "精裝彩盒", "塑膠彩盒"],
    href: "/products?cat=color-box",
    image: "/images/print-03.png",
    imageAlt: "包裝彩盒",
  },
  {
    id: "folder",
    title: "資料夾",
    items: ["PP 資料夾", "公文夾", "資料簿", "夾鏈袋"],
    href: "/products?cat=folder",
    image: "/images/print-11.png",
    imageAlt: "資料夾與平面印刷品",
  },
  {
    id: "shipping-box",
    title: "紙箱／出貨箱",
    items: ["瓦楞紙箱", "出貨紙箱", "宅配箱", "加強紙箱"],
    href: "/products?cat=shipping-box",
    image: "/images/print-10.png",
    imageAlt: "紙箱與出貨箱",
  },
] as const;

export type CatalogEntry = {
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  /** 外部連結（例如 LINE），另開分頁 */
  external?: boolean;
};

/** 下拉選單／左側目錄共用的區塊：商品分類 + 設計洽詢（固定最後一格，連 LINE） */
export const catalogMenuItems: readonly CatalogEntry[] = [
  ...featuredProducts.map((c) => ({
    label: c.title,
    href: c.href,
    image: c.image,
    imageAlt: c.imageAlt,
  })),
  {
    label: "設計洽詢",
    href: LINE_URL,
    image: "/images/print-05.png",
    imageAlt: "設計洽詢（官方 LINE）",
    external: true,
  },
];
