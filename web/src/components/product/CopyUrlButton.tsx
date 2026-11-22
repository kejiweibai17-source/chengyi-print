"use client";

import { useState } from "react";

export function CopyUrlButton() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        } catch {
          /* 剪貼簿不可用時略過 */
        }
      }}
      className="absolute top-[3px] right-[3px] z-10 flex h-8 w-[100px] items-center justify-center gap-1.5 bg-white text-[11px] tracking-[0.04em] transition-colors hover:bg-[#f2f2f2]"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="8" y="8" width="11" height="11" rx="1" />
        <path d="M5 15V6a1 1 0 0 1 1-1h9" />
      </svg>
      {done ? "已複製" : "複製網址"}
    </button>
  );
}
