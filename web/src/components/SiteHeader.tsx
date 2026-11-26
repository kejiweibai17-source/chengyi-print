"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LINE_URL } from "@/data/catalog";
import { useMemberLoggedIn } from "@/lib/memberSession";
import {
  megaMenuPanels,
  navItems,
  type MegaMenuPanel,
  type NavItem,
} from "@/data/home";

const announcement =
  "線上會員下單與檔案上傳功能即將開放預覽 — 歡迎先瀏覽服務與印刷知識";

const headerLinks = [
  { label: "首頁", en: "Home", href: "/" },
  { label: "關於橙益", en: "About", href: "/about", menuKey: "關於橙益" },
  { label: "服務項目", en: "Services", href: "/products", menuKey: "服務項目" },
  { label: "常見問題 FAQ", en: "FAQ", href: "/faq" },
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
        className="group flex w-[148px] shrink-0 flex-col justify-center border-r border-white px-5 py-8 transition-colors hover:bg-[#ffa100] xl:w-[168px]"
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
        {panel.items.map((item) => {
          const cls =
            "group flex min-h-[72px] items-center gap-2.5 border-r border-b border-white px-3 py-3 transition-colors hover:bg-[#ffa100] focus-visible:bg-[#ffa100] xl:min-h-[76px] xl:gap-3 xl:px-4";
          const inner = (
            <>
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[#e8e8e8]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="40px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 text-[12px] leading-snug tracking-[0.02em] text-[#1b2412] xl:text-[13px]">
                {item.label}
              </span>
            </>
          );
          return item.external ? (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={onClose}
              className={cls}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {/* 右：品牌標誌區 */}
      <div className="relative hidden w-[160px] shrink-0 items-center justify-center lg:flex xl:w-[200px]">
        <div className="relative flex h-[112px] w-[112px] items-center justify-center overflow-hidden rounded-full border border-[#d8d8d8] bg-white p-4 xl:h-[128px] xl:w-[128px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/chengyi-mark.png"
            alt="橙益印刷"
            className="h-full w-full object-contain"
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
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  return (
    <div>
      <div className="flex items-center">
        {/* 文字：直接前往該頁（服務項目 → 商品總覽） */}
        <Link
          href={item.href}
          onClick={onNavigate}
          className="block flex-1 transition-colors hover:text-[#ffa100]"
        >
          {item.label}
        </Link>
        {/* 箭頭：另外展開／收合子分類 */}
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={`${expanded ? "收合" : "展開"}${item.label}`}
            className="-my-2 flex h-9 w-9 shrink-0 items-center justify-center hover:bg-white/15"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        ) : null}
      </div>
      {hasChildren && expanded ? (
        <ul className="mt-2 space-y-1">
          {item.children!.map((child) => {
            const cls =
              "flex items-center gap-3 py-2 pl-2 text-[14px] font-medium transition-colors hover:text-[#ffa100]";
            const dot = (
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffa100]"
              />
            );
            return (
              <li key={child.href}>
                {child.external ? (
                  <a
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className={cls}
                  >
                    {dot}
                    {child.label}
                  </a>
                ) : (
                  <Link href={child.href} onClick={onNavigate} className={cls}>
                    {dot}
                    {child.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
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
  const loggedIn = useMemberLoggedIn();
  const memberLabel = loggedIn ? "會員中心" : "登入";

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
        className="bg-[#1b2412] px-4 py-2 text-center text-[11px] leading-relaxed tracking-[0.04em] text-white md:text-[12px]"
      >
        {announcement}
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 ${open ? "z-[70] bg-transparent" : "z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"} text-[#393836] transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]`}
        style={{
          transform:
            hidden && !open && !activeMenu
              ? "translateY(-100%)"
              : "none",
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
              className="row-span-2 flex items-center justify-center border-r border-[#e5e5e5] bg-white p-2.5 transition-opacity hover:opacity-85"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/chengyi-logo.png"
                alt="橙益印刷事業有限公司"
                className="h-[104px] w-[104px] object-contain xl:h-[116px] xl:w-[116px]"
              />
            </Link>

            {/* 導覽格 */}
            {headerLinks.map((item) => {
              const hasMenu = "menuKey" in item && Boolean(item.menuKey);
              const isActive = hasMenu && activeMenu === item.menuKey;

              if (hasMenu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className={`group flex min-h-[72px] flex-col items-center justify-center border-r border-[#e5e5e5] px-2 transition-colors hover:bg-[#ffa100] ${
                      isActive ? "bg-[#ffa100]" : "bg-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isActive}
                    onMouseEnter={() => setActiveMenu(item.menuKey)}
                    onFocus={() => setActiveMenu(item.menuKey)}
                  >
                    <span className="text-[13px] font-medium tracking-[0.06em] xl:text-[14px]">
                      {item.label}
                    </span>
                    <span className={`mt-1 text-[10px] tracking-[0.08em] uppercase group-hover:text-[#1b2412] xl:text-[11px] ${isActive ? "text-[#1b2412]" : "text-[#7a7a7a]"}`}>
                      {item.en}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-[72px] flex-col items-center justify-center border-r border-[#e5e5e5] px-2 transition-colors hover:bg-[#ffa100]"
                  onMouseEnter={() => setActiveMenu(null)}
                >
                  <span className="text-[13px] font-medium tracking-[0.06em] xl:text-[14px]">
                    {item.label}
                  </span>
                  <span className="mt-1 text-[10px] tracking-[0.08em] text-[#7a7a7a] uppercase group-hover:text-[#1b2412] xl:text-[11px]">
                    {item.en}
                  </span>
                </Link>
              );
            })}

            {/* 登入 */}
            <Link
              href="/demo/member"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1 border-r border-[#e5e5e5] transition-colors hover:bg-[#ffa100]"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <UserIcon className="h-[18px] w-[18px]" />
              <span className="text-[10px] tracking-[0.06em]">{memberLabel}</span>
            </Link>

            {/* 購物車 */}
            <Link
              href="/cart"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1 bg-[#fff3b0] text-black transition-colors hover:bg-[#ffa100]"
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
                className="col-span-2 flex min-h-[52px] items-center justify-center gap-2 border-t border-[#e5e5e5] bg-[#1b2412] text-[12px] tracking-[0.08em] text-white transition-opacity hover:opacity-90"
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
        <div className={`lg:hidden ${open ? "" : "border-b border-[#e5e5e5]"}`}>
          <div className="relative flex h-14 items-center justify-between px-3">
            <Link
              href="/"
              aria-label="橙益印刷首頁"
              className="relative z-[110] flex items-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/chengyi-mark.png"
                alt=""
                aria-hidden
                className="h-8 w-8 object-contain"
              />
              <span className={`font-brand-logo text-[18px] ${open ? "text-white" : ""}`}>橙益印刷</span>
            </Link>

            <div className="relative z-[110] flex items-center gap-1">
              {open ? (
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#ffa100] px-5 text-[14px] font-bold text-[#1b2412]"
                >
                  設計洽詢 <span aria-hidden>→</span>
                </a>
              ) : null}
              <Link
                href="/demo/member"
                className={`h-10 w-10 items-center justify-center ${open ? "hidden" : "flex"}`}
                aria-label={memberLabel}
              >
                <UserIcon className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href="/cart"
                className={`h-10 w-10 items-center justify-center bg-[#fff3b0] text-black ${open ? "hidden" : "flex"}`}
                aria-label="購物車"
              >
                <CartIcon className="h-[18px] w-[18px]" />
              </Link>
              <button
                type="button"
                className="flex h-10 w-11 items-center justify-center"
                aria-label={open ? "關閉選單" : "開啟選單"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-[22px] w-8" aria-hidden>
                  <span
                    className={`absolute left-0 block h-[1.5px] w-full ${open ? "bg-white" : "bg-[#393836]"} transition-all duration-300 ${
                      open ? "top-[10px] rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[10px] block h-[1.5px] w-full ${open ? "bg-white" : "bg-[#393836]"} transition-opacity duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-[1.5px] w-full ${open ? "bg-white" : "bg-[#393836]"} transition-all duration-300 ${
                      open ? "top-[10px] -rotate-45" : "top-5"
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
              className="flex h-11 shrink-0 items-center gap-1.5 bg-[#1b2412] px-4 text-[12px] tracking-[0.06em] text-white"
            >
              <SearchIcon className="h-3.5 w-3.5" />
              搜尋
            </button>
          </form>
        </div>

        {/* 漢堡展開選單：墨綠顆粒底、白色粗體清單（版型參考 irep.inc） */}
        {open ? (
          <div
            className="paper-bg fixed inset-0 z-[100] overflow-y-auto px-[25px] pt-[110px] pb-10 text-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="網站選單"
          >
            <nav aria-label="全站選單">
              <ul className="flex flex-col gap-[22px] text-[16px] font-bold">
                <li>
                  <Link href="/" onClick={() => setOpen(false)} className="block">
                    首頁
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <PanelNavGroup
                      item={item}
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            {/* 分段按鈕：登入／會員中心 | 購物車 */}
            <div className="mt-[34px] inline-flex gap-0.5 rounded-lg bg-white/50 p-1 text-[12px]">
              <Link
                href="/demo/member"
                onClick={() => setOpen(false)}
                className="inline-block h-8 w-[77px] rounded bg-white text-center leading-8 text-[#1c3128]"
              >
                {memberLabel}
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="inline-block h-8 w-[77px] rounded text-center leading-8 text-white hover:bg-white/20"
              >
                購物車
              </Link>
            </div>

            <div className="mt-[105px]">
              <p className="mb-[7px] text-[13px]">Follow Us</p>
              <ul className="flex gap-2">
                <li>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="橙益官方 LINE"
                    className="flex h-10 w-10 items-center justify-center rounded bg-white/20 text-[12px] font-bold text-white hover:bg-white/30"
                  >
                    LINE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
