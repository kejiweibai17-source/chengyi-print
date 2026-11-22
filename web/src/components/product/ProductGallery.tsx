"use client";

import Link from "next/link";
import { useState } from "react";

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M12 3.2 20 7.5v9L12 20.8 4 16.5v-9L12 3.2Z" />
      <path d="M12 12.2 20 7.5M12 12.2 4 7.5M12 12.2V20.8" />
    </svg>
  );
}

export function ProductGallery({
  images,
  alt,
  preview3dHref,
}: {
  images: string[];
  alt: string;
  preview3dHref?: string;
}) {
  const [i, setI] = useState(0);
  const thumbs = images.length > 0 ? images : [];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-0">
      {/* 左側縮圖（桌面直列／手機橫列） */}
      {thumbs.length > 1 ? (
        <div className="flex shrink-0 gap-2 overflow-x-auto px-4 pt-4 md:w-[110px] md:flex-col md:gap-3 md:overflow-visible md:px-5 md:pt-6 md:pb-6">
          {thumbs.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`${alt} 圖 ${idx + 1}`}
              aria-pressed={idx === i}
              className={`relative aspect-square w-[72px] shrink-0 overflow-hidden border bg-[#f7f7f7] transition-all md:w-full ${
                idx === i
                  ? "border-[#2f2725] opacity-100"
                  : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className="group/main relative min-w-0 flex-1 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbs[i] ?? thumbs[0]}
          alt={alt}
          className="mx-auto aspect-square w-full max-w-[640px] object-contain"
        />

        {preview3dHref ? (
          <Link
            href={preview3dHref}
            className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3 bg-black/0 text-white opacity-0 transition-all duration-300 group-hover/main:bg-black/55 group-hover/main:opacity-100 group-focus-within/main:bg-black/55 group-focus-within/main:opacity-100"
            aria-label="預覽即時 3D"
          >
            <CubeIcon className="h-10 w-10 drop-shadow-sm" />
            <span className="text-[14px] font-medium tracking-[0.18em]">
              預覽即時 3D
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
