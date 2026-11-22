"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  exhibitionSlides,
  megaMenuPanels,
  navItems,
  services,
  type MegaMenuPanel,
  type NavItem,
} from "@/data/home";

const announcement =
  "線上會員下單與檔案上傳功能即將開放預覽 — 歡迎先瀏覽服務與印刷知識";

const headerLinks = [
  { label: "首頁", en: "Home", href: "/" },
  { label: "關於橙益", en: "About", href: "/about", menuKey: "關於橙益" },
  { label: "服務項目", en: "Services", href: "/services", menuKey: "服務項目" },
  { label: "商品一覽", en: "Products", href: "/products", menuKey: "商品一覽" },
  { label: "印刷知識", en: "Knowledge", href: "/knowledge" },
] as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.5 16.5 21 21" />
    </svg>
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

function MegaDropdown({
  panel,
  onClose,
}: {
  panel: MegaMenuPanel;
  onClose: () => void;
}) {
  return (
    <div className="flex min-h-[220px] w-full bg-[#eeeeee]">
      {/* 左：全部入口 */}
      <Link
        href={panel.allHref}
        onClick={onClose}
        className="group flex w-[148px] shrink-0 flex-col justify-center border-r border-white px-5 py-8 transition-colors hover:bg-white/70 xl:w-[168px]"
      >
        <span className="inline-flex items-center gap-1 text-[14px] font-medium tracking-[0.04em] text-[#222]">
          {panel.allLabel}
          <span
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            ›
          </span>
        </span>
        <span className="mt-1.5 text-[11px] tracking-[0.08em] text-[#888] uppercase">
          {panel.allEn}
        </span>
      </Link>

      {/* 中：6 欄分類格 */}
      <div className="grid min-w-0 flex-1 grid-cols-3 border-r border-white md:grid-cols-4 xl:grid-cols-6">
        {panel.items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            onClick={onClose}
            className="group flex min-h-[72px] items-center gap-2.5 border-r border-b border-white px-3 py-3 transition-colors hover:bg-white xl:min-h-[76px] xl:gap-3 xl:px-4"
          >
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[#e8e8e8]">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="40px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
            <span className="min-w-0 text-[12px] leading-snug tracking-[0.02em] text-[#222] xl:text-[13px]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* 右：品牌標誌區 */}
      <div className="relative hidden w-[160px] shrink-0 items-center justify-center lg:flex xl:w-[200px]">
        <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border border-[#d8d8d8] bg-white/40 xl:h-[128px] xl:w-[128px]">
          <span
            className="absolute inset-[18%] rounded-full border border-[#e85a12]/35"
            aria-hidden
          />
          <span
            className="block h-7 w-7 rotate-45 bg-[#e85a12] xl:h-8 xl:w-8"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function PanelNavGroup({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    return (
      <div className="border-b border-[#ecece8] py-5">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="block text-[18px] font-semibold tracking-[0.04em] text-[#393836] transition-colors hover:text-[#e85a12] md:text-[20px]"
        >
          {item.label}
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b border-[#ecece8] py-5">
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block text-[18px] font-semibold tracking-[0.04em] text-[#393836] transition-colors hover:text-[#e85a12] md:text-[20px]"
      >
        {item.label}
      </Link>
      <ul className="mt-3 space-y-2.5">
        {item.children!.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={onNavigate}
              className="block text-[14px] tracking-[0.04em] text-[#6a6a6a] transition-colors hover:text-[#e85a12] md:text-[15px]"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState(0); // 開選單時公告列仍可見的高度

  const activePanel = activeMenu ? megaMenuPanels[activeMenu] : null;

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/knowledge?q=${encodeURIComponent(q)}`);
  }

  // 仿 stayful.jp：往下捲收起（translateY(-100%)），往上捲滑出
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.max(window.scrollY, 0);
      const h = headerRef.current?.offsetHeight ?? 0;
      if (y <= h) setHidden(false);
      else if (y > lastY) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    setMenuTop(
      Math.max(0, announceRef.current?.getBoundingClientRect().bottom ?? 0),
    );
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* 頂部公告列：不跟著 sticky，只在頁面最頂部出現 */}
      <div
        ref={announceRef}
        className="bg-[#2c2825] px-4 py-2 text-center text-[11px] leading-relaxed tracking-[0.04em] text-white md:text-[12px]"
      >
        {announcement}
      </div>

      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white text-[#393836] shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
        style={{
          transform:
            hidden && !open && !activeMenu
              ? "translateY(-100%)"
              : "translateY(0)",
        }}
      >
        {/* Desktop：STAYFUL 格線導覽 */}
        <div
          className="relative hidden border-b border-[#e5e5e5] lg:block"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="grid grid-cols-[148px_repeat(5,minmax(0,1fr))_76px_76px] xl:grid-cols-[168px_repeat(5,minmax(0,1fr))_84px_84px]">
            {/* Logo：跨兩列 */}
            <Link
              href="/"
              aria-label="橙益印刷首頁"
              className="row-span-2 flex flex-col items-center justify-center gap-2 border-r border-[#e5e5e5] px-3 py-4 transition-colors hover:bg-[#fafafa]"
            >
              <span
                className="block h-8 w-8 rotate-45 bg-[#e85a12] xl:h-9 xl:w-9"
                aria-hidden
              />
              <span className="font-brand-logo text-center text-[15px] leading-tight tracking-[0.04em] xl:text-[16px]">
                橙益印刷
              </span>
            </Link>

            {/* 導覽格 */}
            {headerLinks.map((item) => {
              const hasMenu = "menuKey" in item && Boolean(item.menuKey);
              const isActive = hasMenu && activeMenu === item.menuKey;

              if (hasMenu) {
                return (
                  <button
                    key={item.href}
                    type="button"
                    className={`flex min-h-[72px] flex-col items-center justify-center border-r border-[#e5e5e5] px-2 transition-colors hover:bg-[#fafafa] ${
                      isActive ? "bg-[#fafafa]" : "bg-white"
                    }`}
                    aria-expanded={isActive}
                    onMouseEnter={() => setActiveMenu(item.menuKey)}
                    onFocus={() => setActiveMenu(item.menuKey)}
                  >
                    <span className="text-[13px] font-medium tracking-[0.06em] xl:text-[14px]">
                      {item.label}
                    </span>
                    <span className="mt-1 text-[10px] tracking-[0.08em] text-[#9a9a9a] uppercase xl:text-[11px]">
                      {item.en}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-[72px] flex-col items-center justify-center border-r border-[#e5e5e5] px-2 transition-colors hover:bg-[#fafafa]"
                  onMouseEnter={() => setActiveMenu(null)}
                >
                  <span className="text-[13px] font-medium tracking-[0.06em] xl:text-[14px]">
                    {item.label}
                  </span>
                  <span className="mt-1 text-[10px] tracking-[0.08em] text-[#9a9a9a] uppercase xl:text-[11px]">
                    {item.en}
                  </span>
                </Link>
              );
            })}

            {/* 登入 */}
            <Link
              href="/member"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1 border-r border-[#e5e5e5] transition-colors hover:bg-[#fafafa]"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <UserIcon className="h-[18px] w-[18px]" />
              <span className="text-[10px] tracking-[0.06em]">登入</span>
            </Link>

            {/* 購物車 */}
            <Link
              href="/cart"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1 bg-[#7a3b35] text-white transition-opacity hover:opacity-90"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <CartIcon className="h-[18px] w-[18px]" />
              <span className="text-[10px] tracking-[0.06em]">購物車</span>
            </Link>

            {/* 搜尋列 + 按鈕（contents 讓子元素參與外層 grid） */}
            <form onSubmit={onSearch} role="search" className="contents">
              <div className="col-span-5 flex min-h-[52px] items-stretch border-t border-[#e5e5e5]">
                <label htmlFor="site-search-desktop" className="sr-only">
                  搜尋
                </label>
                <input
                  id="site-search-desktop"
                  type="search"
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="名片／禮盒／完稿出血等，輸入關鍵字或商品名稱"
                  autoComplete="off"
                  className="h-full min-h-[52px] w-full border-0 bg-[#f7f7f7] px-5 text-[13px] text-[#393836] outline-none placeholder:text-[#b0b0b0]"
                />
              </div>

              <button
                type="submit"
                className="col-span-2 flex min-h-[52px] items-center justify-center gap-2 border-t border-[#e5e5e5] bg-[#2c2825] text-[12px] tracking-[0.08em] text-white transition-opacity hover:opacity-90"
              >
                <SearchIcon className="h-3.5 w-3.5" />
                搜尋
              </button>
            </form>
          </div>

          {/* Mega menu：滿版淺灰格線 */}
          <div
            className={`absolute inset-x-0 top-full z-50 overflow-hidden border-b border-[#e5e5e5] transition-all duration-300 ${
              activePanel
                ? "visible max-h-[480px] opacity-100"
                : "invisible max-h-0 opacity-0"
            }`}
          >
            {activePanel ? (
              <MegaDropdown
                panel={activePanel}
                onClose={() => setActiveMenu(null)}
              />
            ) : null}
          </div>
        </div>

        {/* Mobile / Tablet：精簡頂列 + 搜尋 */}
        <div className="border-b border-[#e5e5e5] lg:hidden">
          <div className="relative flex h-14 items-center justify-between px-3">
            <Link
              href="/"
              aria-label="橙益印刷首頁"
              className="relative z-[110] flex items-center gap-2"
            >
              <span
                className="block h-3.5 w-3.5 rotate-45 bg-[#e85a12]"
                aria-hidden
              />
              <span className="font-brand-logo text-[18px]">橙益印刷</span>
            </Link>

            <div className="relative z-[110] flex items-center gap-1">
              <Link
                href="/member"
                className="flex h-10 w-10 items-center justify-center"
                aria-label="登入"
              >
                <UserIcon className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href="/cart"
                className="flex h-10 w-10 items-center justify-center text-[#7a3b35]"
                aria-label="購物車"
              >
                <CartIcon className="h-[18px] w-[18px]" />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center"
                aria-label={open ? "關閉選單" : "開啟選單"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-3.5 w-[18px]" aria-hidden>
                  <span
                    className={`absolute left-0 block h-px w-full bg-[#393836] transition-all duration-300 ${
                      open ? "top-[6px] rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[6px] block h-px w-full bg-[#393836] transition-opacity duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-[#393836] transition-all duration-300 ${
                      open ? "top-[6px] -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <form
            onSubmit={onSearch}
            role="search"
            className={`flex border-t border-[#e5e5e5] transition-opacity ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <label htmlFor="site-search-mobile" className="sr-only">
              搜尋
            </label>
            <input
              id="site-search-mobile"
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="輸入關鍵字或商品名稱"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 bg-[#f7f7f7] px-4 text-[13px] outline-none placeholder:text-[#b0b0b0]"
            />
            <button
              type="submit"
              className="flex h-11 shrink-0 items-center gap-1.5 bg-[#2c2825] px-4 text-[12px] tracking-[0.06em] text-white"
            >
              <SearchIcon className="h-3.5 w-3.5" />
              搜尋
            </button>
          </form>
        </div>

        {/* 漢堡展開選單 */}
        {open ? (
          <div
            className="fixed inset-0 z-[100] bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="網站選單"
          >
            <div
              className="border-b border-[#ebebeb]"
              style={{ height: `calc(${menuTop}px + 6.25rem)` }}
            />

            <div
              className="flex flex-col md:flex-row"
              style={{ height: `calc(100svh - ${menuTop}px - 6.25rem)` }}
            >
              <aside className="flex w-full shrink-0 flex-col border-b border-[#ecece8] md:w-[34%] md:max-w-[420px] md:border-r md:border-b-0">
                <div className="flex items-center gap-2 border-b border-[#ecece8] px-6 py-4">
                  <span
                    className="block h-3 w-3 rotate-45 bg-[#e85a12]"
                    aria-hidden
                  />
                  <span className="font-brand-logo text-[18px] text-[#393836]">
                    橙益印刷
                  </span>
                </div>

                <nav
                  className="flex-1 overflow-y-auto px-6 py-2"
                  aria-label="全站選單"
                >
                  <div className="border-b border-[#ecece8] py-5">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="block text-[15px] tracking-[0.06em] text-[#6a6a6a] transition-colors hover:text-[#e85a12]"
                    >
                      首頁
                    </Link>
                  </div>

                  {navItems.map((item) => (
                    <PanelNavGroup
                      key={item.href}
                      item={item}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                </nav>
              </aside>

              <section className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f7f7f5] px-5 py-6 md:px-10 md:py-8">
                <div className="mb-6">
                  <p className="text-[11px] tracking-[0.18em] text-[#e85a12] uppercase">
                    Featured
                  </p>
                  <h2 className="mt-2 text-[1.4rem] font-semibold tracking-tight text-[#393836]">
                    精選服務與作品
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((service, index) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      onClick={() => setOpen(false)}
                      className="group flex min-h-[140px] flex-col justify-between border border-[#e4e4e0] bg-white px-5 py-5"
                    >
                      <div>
                        <span className="text-[11px] tracking-[0.16em] text-[#b0b0b0] tabular-nums">
                          0{index + 1}
                        </span>
                        <p className="mt-3 text-[16px] font-semibold">
                          {service.title}
                        </p>
                        <p className="mt-2 text-[13px] text-[#6a6a6a]">
                          {service.text}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {exhibitionSlides.slice(0, 1).map((slide) => (
                    <Link
                      key={slide.id}
                      href={slide.href}
                      onClick={() => setOpen(false)}
                      className="group relative min-h-[140px] overflow-hidden border border-[#e4e4e0] bg-[#393836] sm:col-span-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover opacity-55"
                      />
                      <div className="relative z-[1] flex h-full min-h-[140px] flex-col justify-end bg-gradient-to-t from-black/70 to-transparent px-5 py-5 text-white">
                        <p className="text-[11px] tracking-[0.16em] text-[#d6ff3a] uppercase">
                          {slide.eyebrow}
                        </p>
                        <p className="mt-2 text-[16px] font-semibold">
                          {slide.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
