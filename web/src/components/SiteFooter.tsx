import Link from "next/link";
import { featuredProducts } from "@/data/home";

const productLinks = [
  { label: "全部商品", href: "/products" },
  ...featuredProducts.map((item) => ({
    label: item.title,
    href: item.href,
  })),
];

const aboutLinks = [
  { label: "公司介紹", href: "/about/intro" },
  { label: "合作流程", href: "/about/process" },
  { label: "設計作品", href: "/about/works" },
  { label: "公司地點", href: "/location" },
];

const serviceLinks = [
  { label: "印刷下單", href: "/services/print" },
  { label: "設計洽詢", href: "/services/design" },
  { label: "包裝盒 3D", href: "/services/packaging-3d" },
  { label: "商品一覽", href: "/products" },
];

const guideLinks = [
  { label: "印刷相關知識", href: "/knowledge" },
  { label: "常見問題", href: "/faq" },
  { label: "會員中心", href: "/demo/member" },
  { label: "收藏", href: "/favorites" },
  { label: "購物車", href: "/cart" },
];

function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <p className="border-b border-white/15 pb-3 text-[12px] font-medium tracking-[0.06em] text-white">
        {title}
      </p>
      <ul>
        {links.map((link) => (
          <li key={link.href + link.label} className="border-b border-white/10">
            <Link
              href={link.href}
              className="flex items-center justify-between gap-2 py-2.5 text-[12px] text-white/80 transition-colors hover:text-white"
            >
              <span className="truncate">{link.label}</span>
              <span className="shrink-0 text-white/40" aria-hidden>
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.2" />
      <path
        d="M5.5 18.5c1.6-3 4-4.5 6.5-4.5s4.9 1.5 6.5 4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden
    >
      <path d="M4 6h2.2l1.3 10.2a1.5 1.5 0 0 0 1.5 1.3h7.5a1.5 1.5 0 0 0 1.5-1.2L19.5 9H7" />
      <circle cx="10" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#2c2825] text-white">
      {/* 主區：品牌＋導覽格 */}
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] xl:gap-14">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-brand-logo text-[1.65rem] leading-none tracking-[0.04em]">
                橙益印刷
              </span>
            </Link>
            <p className="mt-3 text-[13px] tracking-[0.04em] text-white/75">
              把想法印成看得見的東西
            </p>
            <div className="mt-8 space-y-2 text-[12px] leading-relaxed text-white/65">
              <p>臺中市南屯區大墩十四街 270 號 5 樓</p>
              <p>週一至週五 09:00–18:00</p>
              <p>週六／週日 休息</p>
              <p className="pt-1 text-white/85">官方 LINE @717syyqm</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8">
            <FooterNavColumn title="關於橙益" links={aboutLinks} />
            <FooterNavColumn title="商品一覽" links={productLinks.slice(0, 7)} />
            <FooterNavColumn title="服務項目" links={serviceLinks} />
            <FooterNavColumn title="協助與會員" links={guideLinks} />
          </div>
        </div>
      </div>

      {/* 登入｜購物車：購物車改橘色 */}
      <div className="grid grid-cols-2">
        <Link
          href="/demo/member"
          className="flex h-14 items-center justify-center gap-2 bg-white text-[13px] tracking-[0.08em] text-[#2c2825] transition-opacity hover:opacity-85 md:h-16"
        >
          <UserIcon className="h-[18px] w-[18px]" />
          登入
        </Link>
        <Link
          href="/cart"
          className="flex h-14 items-center justify-center gap-2 bg-[#e85a12] text-[13px] tracking-[0.08em] text-white transition-colors hover:bg-[#c4470a] md:h-16"
        >
          <CartIcon className="h-[18px] w-[18px]" />
          購物車
        </Link>
      </div>

      {/* 底列：社群＋版權 */}
      <div className="border-t border-white/10 bg-[#221f1d]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/70">
            <span>各社群持續更新印刷知識與作品</span>
            <a
              href="https://line.me/R/ti/p/@717syyqm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span className="rounded bg-[#06C755] px-1.5 py-0.5 text-[10px] font-bold text-white">
                LINE
              </span>
              橙益官方 LINE
            </a>
          </div>
          <p className="text-[11px] text-white/45">
            © 2026 橙益印刷事業有限公司
          </p>
        </div>
      </div>

    </footer>
  );
}
