"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

/**
 * FAQ：左側分類切換、問題預設收合、點擊後答案在該題下方展開。
 * 分類與問答內容由 data/faq.ts 提供（後台可新增、編輯、排序 sort 欄位）。
 */
export function FaqExplorer({
  categories,
  items,
}: {
  categories: readonly string[];
  items: readonly FaqItem[];
}) {
  const available = categories.filter((c) => items.some((i) => i.category === c));
  const [category, setCategory] = useState(available[0] ?? "");
  const [openId, setOpenId] = useState<number | null>(null);

  const list = items
    .filter((i) => i.category === category)
    .sort((a, b) => a.sort - b.sort);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 md:px-8 md:py-14 lg:flex-row lg:gap-10">
      {/* 左：分類（手機為橫向可捲動） */}
      <nav
        aria-label="常見問題分類"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:w-[220px] lg:shrink-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border lg:border-line lg:bg-white lg:px-0 lg:pb-0"
      >
        {available.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setOpenId(null);
              }}
              aria-pressed={active}
              className={`shrink-0 whitespace-nowrap border border-line px-4 py-3 text-left text-[14px] tracking-[0.04em] transition-colors hover:bg-brand lg:border-0 lg:border-b lg:last:border-b-0 ${
                active
                  ? "bg-forest font-medium text-[#f5f3ea] hover:text-brand-ink"
                  : "bg-white text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
      </nav>

      {/* 右：問答（預設收合） */}
      <div className="min-w-0 flex-1">
        <h2 className="font-[family-name:var(--font-display-tc)] text-2xl text-ink">
          {category}
        </h2>
        <div className="mt-4 divide-y divide-line border border-line bg-white">
          {list.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    aria-controls={`faq-a-${item.id}`}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors hover:bg-brand/30 ${
                      open ? "bg-brand/20" : ""
                    }`}
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-xl leading-none transition-transform ${open ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${item.id}`}
                  role="region"
                  hidden={!open}
                  className="px-5 pt-1 pb-5 text-sm leading-relaxed text-ink-soft"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
