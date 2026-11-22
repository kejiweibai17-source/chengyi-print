"use client";

import Link from "next/link";
import { useState } from "react";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 6h2.2l1.3 10.2a1.5 1.5 0 0 0 1.5 1.3h7.5a1.5 1.5 0 0 0 1.5-1.2L19.5 9H7" />
      <circle cx="10" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

/** 數量、收藏、加入購物車、詢問（示意：尚未接購物車狀態） */
export function ProductPurchase({
  inquiryOnly,
  lineUrl,
}: {
  inquiryOnly: boolean;
  lineUrl: string;
}) {
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  return (
    <div className="px-6 py-8">
      {!inquiryOnly && (
        <>
          <div className="flex gap-4">
            <div className="flex h-12 flex-1 items-center border border-[#e5e5e5] bg-white">
              <button
                type="button"
                aria-label="減少數量"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-full w-12 items-center justify-center text-[16px]"
              >
                −
              </button>
              <span className="flex-1 text-center text-[13px] tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="增加數量"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-full w-12 items-center justify-center text-[16px]"
              >
                +
              </button>
            </div>
            <button
              type="button"
              aria-pressed={fav}
              onClick={() => setFav((v) => !v)}
              className="flex h-12 w-[127px] items-center justify-center gap-2 border border-[#e5e5e5] bg-white text-[12px] tracking-[0.06em]"
            >
              <span className={fav ? "text-[#8a3c3e]" : ""}>
                <HeartIcon />
              </span>
              加入收藏
            </button>
          </div>

          <Link
            href="/cart"
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 bg-[#8a3c3e] text-[13px] tracking-[0.08em] text-white transition-opacity hover:opacity-90"
          >
            <CartIcon />
            加入購物車
          </Link>
        </>
      )}

      <a
        href={lineUrl}
        target="_blank"
        rel="noreferrer"
        className={`flex h-14 w-full items-center justify-center gap-2 border border-[#e5e5e5] bg-white text-[13px] tracking-[0.08em] transition-colors hover:bg-[#fafafa] ${
          inquiryOnly ? "" : "mt-4"
        }`}
      >
        <MailIcon />
        {inquiryOnly ? "洽詢報價（官方 LINE）" : "詢問此商品"}
      </a>
    </div>
  );
}
