"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredProducts, LINE_URL } from "@/data/catalog";

/**
 * 商品頁左側目錄：商品總覽、分類列表、商品詳情共用。
 * 資料來源與導覽列「服務項目」下拉同一份（data/catalog.ts），名稱與順序一致。
 * 桌機：常駐顯示所有分類與品項；手機：以按鈕展開／收合。
 */
export function ProductSidebar({
  activeCat,
  activeItem,
}: {
  /** 目前分類 id（featuredProducts[].id），總覽頁傳空字串 */
  activeCat?: string;
  /** 目前品項名稱（選填） */
  activeItem?: string;
}) {
  const [open, setOpen] = useState(false);

  const list = (
    <nav aria-label="商品分類目錄" className="text-[#1b2412]">
      <Link
        href="/products"
        className={`flex items-center justify-between border-b border-[#e5e5e5] px-4 py-3.5 text-[14px] font-semibold tracking-[0.04em] transition-colors hover:bg-[#ffa100] ${
          !activeCat ? "bg-[#ffa100]" : "bg-white"
        }`}
        aria-current={!activeCat ? "page" : undefined}
      >
        <span>
          商品總覽
          <span className="ml-2 text-[10px] font-normal tracking-[0.08em] uppercase opacity-60">
            All
          </span>
        </span>
        <span aria-hidden>›</span>
      </Link>

      <ul>
        {featuredProducts.map((cat) => {
          const isActive = activeCat === cat.id;
          return (
            <li key={cat.id} className="border-b border-[#e5e5e5] bg-white">
              <Link
                href={cat.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between px-4 py-3 text-[14px] font-medium tracking-[0.03em] transition-colors ${
                  isActive
                    ? "bg-[#1b2412] text-[#f5f3ea] hover:bg-[#2a3720]"
                    : "hover:bg-[#ffa100]"
                }`}
              >
                <span>{cat.title}</span>
                <span aria-hidden className="text-[12px]">
                  {isActive ? "−" : "+"}
                </span>
              </Link>
              <ul className="bg-[#f7f7f5] py-1">
                {cat.items.map((name) => {
                  const itemActive = isActive && activeItem === name;
                  return (
                    <li key={name}>
                      <Link
                        href={cat.href}
                        className={`block border-l-[3px] py-2 pr-4 pl-6 text-[13px] tracking-[0.03em] transition-colors hover:bg-[#ffa100]/70 ${
                          itemActive
                            ? "border-[#ffa100] bg-[#ffa100]/25 font-semibold"
                            : "border-transparent text-[#444]"
                        }`}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
        <li className="border-b border-[#e5e5e5] bg-white">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 text-[14px] font-medium tracking-[0.03em] transition-colors hover:bg-[#ffa100]"
          >
            <span>設計洽詢</span>
            <span aria-hidden className="text-[12px]">
              ↗
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );

  return (
    <aside className="lg:sticky lg:top-[140px] lg:w-[260px] lg:shrink-0 lg:self-start">
      {/* 手機：展開／收合按鈕 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="product-sidebar-list"
        className="flex h-[50px] w-full items-center justify-center gap-2 bg-[#eee] text-[13px] tracking-[0.06em] transition-colors hover:bg-[#ffa100] lg:hidden"
      >
        <span aria-hidden className="text-[10px]">⁝⁝⁝</span>
        選擇商品分類
        <span aria-hidden className="text-[11px]">{open ? "▲" : "▼"}</span>
      </button>
      <div
        id="product-sidebar-list"
        className={`${open ? "block" : "hidden"} border-b border-[#e5e5e5] lg:block lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:border lg:border-[#e5e5e5]`}
      >
        {list}
      </div>
    </aside>
  );
}
