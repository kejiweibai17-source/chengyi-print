import { catalogMenuItems, featuredProducts } from "@/data/catalog";

export { featuredProducts };

export type NavChild = {
  label: string;
  href: string;
  text?: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

export type MegaMenuItem = {
  label: string;
  href: string;
  external?: boolean;
  image: string;
  imageAlt: string;
};

export type MegaMenuPanel = {
  allHref: string;
  allLabel: string;
  allEn: string;
  items: readonly MegaMenuItem[];
};

/** 桌面滿版下拉（STAYFUL 格線風格） */
export const megaMenuPanels: Record<string, MegaMenuPanel> = {
  關於橙益: {
    allHref: "/about",
    allLabel: "關於橙益",
    allEn: "About",
    items: [
      {
        label: "公司介紹",
        href: "/about/intro",
        image: "/images/print-01.png",
        imageAlt: "公司介紹",
      },
      {
        label: "合作流程",
        href: "/about/process",
        image: "/images/print-13.png",
        imageAlt: "合作流程",
      },
      {
        label: "設計作品",
        href: "/about/works",
        image: "/images/print-12.png",
        imageAlt: "設計作品",
      },
      {
        label: "公司地點",
        href: "/location",
        image: "/images/print-06.png",
        imageAlt: "公司地點",
      },
    ],
  },
  服務項目: {
    allHref: "/products",
    allLabel: "服務項目",
    allEn: "Services",
    items: catalogMenuItems,
  },
};

export const navItems: readonly NavItem[] = [
  {
    label: "關於橙益",
    href: "/about",
    children: [
      {
        label: "公司介紹",
        href: "/about/intro",
        text: "台中南屯印刷與包裝設計團隊，專注完稿品質與交付節奏。",
      },
      {
        label: "合作流程",
        href: "/about/process",
        text: "規格確認 → 完稿／檢稿 → 印製 → 出貨，步驟清楚可追蹤。",
      },
      {
        label: "設計作品",
        href: "/about/works",
        text: "包裝、視覺與印刷成品案例，作為規格討論的起點。",
      },
    ],
  },
  {
    label: "服務項目",
    href: "/products",
    children: catalogMenuItems.map((c) => ({
      label: c.label,
      href: c.href,
      external: c.external,
    })),
  },
  { label: "公司地點", href: "/location" },
  { label: "常見問題 FAQ", href: "/faq" },
  {
    label: "印刷相關知識",
    href: "/knowledge",
  },
] as const;

/** 首頁主圖：使用 public/images 實拍膠卷合成圖 */
export const heroMainImage = {
  src: "/images/print-01-original.png",
  alt: "橙益印刷現場：檢稿、印刷機台與色票作業",
  href: "/services",
  width: 2243,
  height: 800,
} as const;

export const heroSlides = [
  {
    id: 1,
    title: "把想法印成看得見的東西",
    subtitle: "包裝盒、型錄、名片與客製印刷——從規格到完稿，一路陪你對齊。",
    cta: "瀏覽服務項目",
    href: "/services",
    image: "/images/print-01-original.png",
    imageAlt: "橙益印刷現場：檢稿、印刷機台與色票作業",
  },
] as const;

/** 首頁第三區：橘色方案橫幅 */
export const solutionBanner = {
  href: "/services",
  text: "介紹橙益印刷服務方案的『Cheng Yi Solution』看這裡！",
} as const;

export const newsItems = [
  {
    id: 1,
    date: "2026.10.28",
    tag: "公告",
    title: "線上會員下單與檔案上傳功能即將開放預覽",
  },
  {
    id: 2,
    date: "2026.10.15",
    tag: "服務",
    title: "包裝盒 3D 示意預覽：先開放一種盒型供確認操作",
  },
  {
    id: 3,
    date: "2026.09.30",
    tag: "作品",
    title: "近期完成：精品茶葉禮盒與名片系列更新",
  },
] as const;

export const aboutPoints = [
  {
    label: "公司介紹",
    href: "/about/intro",
    text: "台中南屯印刷與包裝設計團隊，專注完稿品質與交付節奏。",
  },
  {
    label: "合作流程",
    href: "/about/process",
    text: "規格確認 → 完稿／檢稿 → 印製 → 出貨，步驟清楚可追蹤。",
  },
  {
    label: "設計作品",
    href: "/about/works",
    text: "包裝、視覺與印刷成品案例，作為規格討論的起點。",
  },
] as const;

export const services = [
  {
    id: "print",
    title: "印刷下單",
    text: "選商品、規格與加工；可整包 ZIP 上傳，員工分款檢稿後再付款。",
    href: "/demo/manuscript-flow",
  },
  {
    id: "design",
    title: "設計洽詢",
    text: "需要排版或包裝設計時，由專人承接，不走線上審稿。",
    href: "/services/design",
  },
  {
    id: "box3d",
    title: "包裝盒 3D",
    text: "掀蓋郵寄盒／內襯可調尺寸預覽與詢價，外觀示意、不做估價下單。",
    href: "/services/packaging-3d",
  },
] as const;

/** 首頁展覽式 Hero 輪播（SHUTL 風格） */
export const exhibitionSlides = [
  {
    id: "color",
    eyebrow: "CASE 01",
    title: "色彩對齊與色票確認",
    subtitle: "Pantone × 完稿色票 × 印刷對色",
    date: "Color Matching",
    href: "/about/works",
    image: "/images/print-08.png",
    imageAlt: "色票扇面與設計桌面",
    cardLabel: "COLOR WORKS",
  },
  {
    id: "packaging",
    eyebrow: "CASE 02",
    title: "包裝與品牌識別應用",
    subtitle: "手提袋、紙盒、型錄一次對齊",
    date: "Packaging Studio",
    href: "/products?cat=tote-bag",
    image: "/images/print-09.png",
    imageAlt: "品牌手提袋成品特寫",
    cardLabel: "PACKAGING",
  },
  {
    id: "press",
    eyebrow: "CASE 03",
    title: "印刷校色與品質控管",
    subtitle: "CMYK 色條 × 機台校準",
    date: "Press Quality",
    href: "/about/process",
    image: "/images/print-02.png",
    imageAlt: "印刷廠對色與品質檢核",
    cardLabel: "PRESS CHECK",
  },
] as const;

export type FeaturedItem = {
  name: string;
  enName: string;
  price: string;
  href: string;
  image: string;
  imageAlt: string;
  badge?: "new" | "pickup" | "soldout";
};

export type FeaturedSet = {
  id: string;
  featured: FeaturedItem;
  items: readonly FeaturedItem[];
};

/** 首頁 Featured：圖二風格商品格，箭頭切換整組 reveal */
export const featuredSets: readonly FeaturedSet[] = [
  {
    id: "packaging-set",
    featured: {
      name: "天地蓋禮盒",
      enName: "Lid & Base Gift Box",
      price: "NT$ 85",
      href: "/products/lid-base-gift-box",
      image: "/images/pacdora/pacdora-06-magnetic.jpg",
      imageAlt: "天地蓋禮盒",
      badge: "pickup",
    },
    items: [
      {
        name: "包裝彩盒",
        enName: "Color Packaging",
        price: "NT$ 48",
        href: "/products/color-packaging-box",
        image: "/images/pacdora/pacdora-08-shoe.png",
        imageAlt: "包裝彩盒",
        badge: "new",
      },
      {
        name: "抽屜禮盒",
        enName: "Drawer Gift Box",
        price: "洽詢",
        href: "/products/document-folder",
        image: "/images/pacdora/pacdora-11-drawer.png",
        imageAlt: "抽屜禮盒",
      },
      {
        name: "自動鎖底盒",
        enName: "Auto Lock Bottom",
        price: "NT$ 35",
        href: "/products",
        image: "/images/pacdora/pacdora-12-autolock.png",
        imageAlt: "自動鎖底盒",
      },
      {
        name: "甜點彩盒",
        enName: "Sweet Box",
        price: "NT$ 28",
        href: "/products/dm-flyer",
        image: "/images/pacdora/pacdora-03-sweet.png",
        imageAlt: "甜點彩盒",
        badge: "soldout",
      },
    ],
  },
  {
    id: "mailer-set",
    featured: {
      name: "掀蓋郵寄盒",
      enName: "Flip Top Mailer",
      price: "NT$ 22",
      href: "/products/tote-bag",
      image: "/images/pacdora/pacdora-01-mailer.jpg",
      imageAlt: "掀蓋郵寄盒",
      badge: "new",
    },
    items: [
      {
        name: "逆向插底盒",
        enName: "Reverse Tuck End",
        price: "NT$ 18",
        href: "/products/premium-business-card",
        image: "/images/pacdora/pacdora-02-rte.jpg",
        imageAlt: "逆向插底盒",
      },
      {
        name: "插口郵寄盒",
        enName: "Tuck End Mailer",
        price: "NT$ 20",
        href: "/products/catalog-16p",
        image: "/images/pacdora/pacdora-05-tuck-mailer.jpg",
        imageAlt: "插口郵寄盒",
      },
      {
        name: "方型紙盒",
        enName: "Square Box",
        price: "NT$ 32",
        href: "/products",
        image: "/images/pacdora/pacdora-07-square.jpg",
        imageAlt: "方型紙盒",
        badge: "pickup",
      },
      {
        name: "出貨紙箱",
        enName: "Shipping Box",
        price: "NT$ 25",
        href: "/products/shipping-box",
        image: "/images/pacdora/pacdora-09-shipping.png",
        imageAlt: "出貨紙箱",
      },
    ],
  },
  {
    id: "specialty-set",
    featured: {
      name: "藥盒／彩盒",
      enName: "Medicine Box",
      price: "洽詢",
      href: "/products/label-sticker",
      image: "/images/pacdora/pacdora-04-medicine.png",
      imageAlt: "藥盒彩盒",
      badge: "pickup",
    },
    items: [
      {
        name: "方型出貨箱",
        enName: "Square Shipping",
        price: "NT$ 30",
        href: "/products/shipping-box",
        image: "/images/pacdora/pacdora-10-square-ship.jpg",
        imageAlt: "方型出貨箱",
      },
      {
        name: "天地蓋禮盒",
        enName: "Gift Box",
        price: "NT$ 85",
        href: "/products/lid-base-gift-box",
        image: "/images/pacdora/pacdora-06-magnetic.jpg",
        imageAlt: "天地蓋禮盒",
        badge: "new",
      },
      {
        name: "包裝彩盒",
        enName: "Color Box",
        price: "NT$ 48",
        href: "/products/color-packaging-box",
        image: "/images/pacdora/pacdora-08-shoe.png",
        imageAlt: "包裝彩盒",
      },
      {
        name: "自動鎖底盒",
        enName: "Auto Lock",
        price: "Sold Out",
        href: "/products",
        image: "/images/pacdora/pacdora-12-autolock.png",
        imageAlt: "自動鎖底盒",
        badge: "soldout",
      },
    ],
  },
] as const;

/** @deprecated 保留相容；請改用 featuredSets */
export const featuredSlides = featuredSets;

/** 首頁第二區：主要服務產品（六欄分類卡片） */

export const footerColumns = [
  {
    title: "關於橙益",
    links: [
      { label: "公司介紹", href: "/about/intro" },
      { label: "合作流程", href: "/about/process" },
      { label: "設計作品", href: "/about/works" },
    ],
  },
  {
    title: "服務",
    links: [
      { label: "印刷下單", href: "/services/print" },
      { label: "設計洽詢", href: "/services/design" },
      { label: "包裝盒 3D", href: "/services/packaging-3d" },
    ],
  },
  {
    title: "協助",
    links: [
      { label: "常見問題 FAQ", href: "/faq" },
      { label: "公司地點", href: "/location" },
      { label: "印刷相關知識", href: "/knowledge" },
    ],
  },
] as const;
