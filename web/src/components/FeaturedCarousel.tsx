"use client";

import Link from "next/link";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { featuredSets, type FeaturedItem } from "@/data/home";
import { ImageReveal } from "@/components/ImageReveal";

function NavArrow({
  direction,
  onClick,
  label,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center text-[#9a9a9a] transition-colors hover:text-[#393836] disabled:pointer-events-none disabled:opacity-40"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        {direction === "prev" ? (
          <path
            d="M15 5 8 12l7 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="m9 5 7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

function CornerBadge({ badge }: { badge?: FeaturedItem["badge"] }) {
  if (!badge || badge === "soldout") return null;
  const isNew = badge === "new";
  return (
    <div
      className="pointer-events-none absolute right-0 bottom-0 z-[2] h-11 w-11 overflow-hidden"
      aria-hidden
    >
      <span
        className={`absolute right-[-26px] bottom-[8px] block w-[76px] rotate-[-45deg] py-[3px] text-center text-[9px] font-medium tracking-[0.08em] text-white ${
          isNew ? "bg-[#e53935]" : "bg-[#222]"
        }`}
      >
        {isNew ? "New" : "Pickup"}
      </span>
    </div>
  );
}

function ProductCard({
  item,
  featured = false,
  delayIndex = 0,
  setKey,
}: {
  item: FeaturedItem;
  featured?: boolean;
  delayIndex?: number;
  setKey: string;
}) {
  const delay = delayIndex * 0.08;
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: delay + 0.12,
        ease: "power2.out",
      },
    );
    return () => {
      gsap.killTweensOf(el);
    };
  }, [setKey, item.name, delay]);

  return (
    <Link
      href={item.href}
      className={`group relative flex flex-col bg-white ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#f0f0f0] ${
          featured
            ? "aspect-square md:aspect-auto md:h-full md:min-h-[420px]"
            : "aspect-square"
        }`}
      >
        <ImageReveal
          key={`${setKey}-${item.image}`}
          src={item.image}
          alt={item.imageAlt}
          delay={delay}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        >
          {featured ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pt-16 pb-5 md:px-6 md:pb-6">
              <p className="font-brand-logo text-[1.75rem] leading-none text-white md:text-[2.25rem]">
                {item.enName}
              </p>
            </div>
          ) : null}
        </ImageReveal>
        <CornerBadge badge={item.badge} />
      </div>

      <div
        ref={copyRef}
        className="flex flex-1 flex-col px-3 pt-3 pb-3.5 md:px-3.5"
        style={{ opacity: 0 } as CSSProperties}
      >
        <h3 className="text-[13px] font-medium leading-snug text-[#222]">
          {item.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#999]">{item.enName}</p>
        <p
          className={`mt-2 text-right text-[12px] tabular-nums ${
            item.badge === "soldout" || item.price === "Sold Out"
              ? "text-[#e53935]"
              : "text-[#222]"
          }`}
        >
          {item.price}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const set = featuredSets[index];

  const changeSet = useCallback(
    (dir: "next" | "prev") => {
      if (busy || featuredSets.length < 2) return;
      setBusy(true);
      setIndex((prev) =>
        dir === "next"
          ? (prev + 1) % featuredSets.length
          : (prev - 1 + featuredSets.length) % featuredSets.length,
      );
      window.setTimeout(() => setBusy(false), 900);
    },
    [busy],
  );

  return (
    <section className="bg-[#f7f7f7]" aria-label="精選商品">
      <div className="relative flex justify-center pt-10 md:pt-12">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <span className="h-10 w-px bg-[#d5d5d2] md:h-12" aria-hidden />
        </div>
        <div className="relative z-10 flex flex-col items-center bg-[#f7f7f7] px-4 pt-2">
          <p className="text-[13px] tracking-[0.12em] text-[#393836] md:text-[14px]">
            Featured
          </p>
          <svg
            viewBox="0 0 12 8"
            className="mt-1.5 h-2 w-3 text-[#393836]"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 1.5 6 6.5 11 1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <div className="mb-4 flex items-center justify-end gap-1">
          <NavArrow
            direction="prev"
            onClick={() => changeSet("prev")}
            label="上一組商品"
            disabled={busy}
          />
          <span className="mx-1 text-[11px] tabular-nums text-[#aaa]">
            {index + 1} / {featuredSets.length}
          </span>
          <NavArrow
            direction="next"
            onClick={() => changeSet("next")}
            label="下一組商品"
            disabled={busy}
          />
        </div>

        <div className="grid grid-cols-2 overflow-hidden border border-[#e8e8e8] bg-white md:grid-cols-4 [&>a]:border-r [&>a]:border-b [&>a]:border-[#e8e8e8]">
          <ProductCard
            key={`${set.id}-featured`}
            item={set.featured}
            featured
            delayIndex={0}
            setKey={set.id}
          />
          {set.items.map((item, i) => (
            <ProductCard
              key={`${set.id}-${item.name}-${i}`}
              item={item}
              delayIndex={i + 1}
              setKey={set.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
