"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LINE_URL } from "@/data/catalog";
import { useMemberLoggedIn } from "@/lib/memberSession";

const items = [
  {
    id: "line",
    label: "LINE",
    href: LINE_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path
          fill="currentColor"
          d="M19.5 4.5H4.5A2.5 2.5 0 0 0 2 7v8.2a2.5 2.5 0 0 0 2.5 2.5h3.1l2.6 2.7a.8.8 0 0 0 1.3-.5v-2.2h8a2.5 2.5 0 0 0 2.5-2.5V7a2.5 2.5 0 0 0-2.5-2.5Zm-10 8.1H7.3v-4h2.2v4Zm3.4 0h-2.1v-4h2.1v4Zm3.5 0h-2.2l1.8-4h2.3l-1.9 4Z"
        />
      </svg>
    ),
  },
  {
    id: "member",
    label: "登入",
    href: "/demo/member",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5.5 18.5c1.6-3 4-4.5 6.5-4.5s4.9 1.5 6.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "fav",
    label: "收藏",
    href: "/favorites",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M12 19.2 5.8 13a4.1 4.1 0 0 1 5.8-5.8L12 7.3l.4-.4A4.1 4.1 0 0 1 18.2 13L12 19.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "cart",
    label: "購物車",
    href: "/cart",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M4 6h2.2l1.4 9.2h9.8L19.5 8H8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="18.5" r="1.2" fill="currentColor" />
        <circle cx="16.5" cy="18.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
] as const;

const itemCls =
  "toolbar-item animate-float-in flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 bg-paper text-[0.7rem] tracking-wide text-ink transition-colors lg:h-16 lg:w-16 lg:flex-none lg:border lg:border-line lg:shadow-[0_8px_24px_rgba(20,18,16,0.10)]";

/**
 * 右側懸浮工具列。
 * 桌機：右側垂直置中；手機／平板：貼底橫條（不遮擋內容，頁面底部另留空間）。
 * 會員中心（demo layout）與購物車（site layout）都掛同一個元件。
 */
export function FloatingToolbar() {
  const [showTop, setShowTop] = useState(false);
  const loggedIn = useMemberLoggedIn();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-paper shadow-[0_-6px_20px_rgba(20,18,16,0.08)] lg:inset-x-auto lg:top-1/2 lg:right-5 lg:bottom-auto lg:-translate-y-1/2 lg:flex-col lg:gap-2 lg:border-0 lg:bg-transparent lg:shadow-none">
      {items.map((item, index) => {
        const style = { animationDelay: `${0.08 * index}s` };
        const label =
          item.id === "member" ? (loggedIn ? "會員中心" : "登入") : item.label;

        if ("external" in item && item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={itemCls}
              style={style}
              aria-label={label}
              title={label}
            >
              {item.icon}
              <span className="leading-none">{label}</span>
            </a>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={itemCls}
            style={style}
            aria-label={label}
            title={label}
          >
            {item.icon}
            <span className="leading-none">{label}</span>
          </Link>
        );
      })}

      {showTop ? (
        <button
          type="button"
          className={itemCls}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="回到頂端"
          title="回到頂端"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="leading-none">頂端</span>
        </button>
      ) : null}
    </div>
  );
}
