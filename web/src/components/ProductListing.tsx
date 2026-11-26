"use client";

import Link from "next/link";
import gsap from "gsap";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useSearchParams } from "next/navigation";
import { featuredProducts } from "@/data/catalog";
import { ProductSidebar } from "@/components/ProductSidebar";
import type { ProductRecord } from "@/data/products";
import { ImageReveal } from "@/components/ImageReveal";

type SortKey = "newest" | "price-asc" | "price-desc";

function formatPrice(product: ProductRecord) {
  if (product.basePrice == null) return "洽詢";
  return product.basePrice.toLocaleString("zh-TW");
}

function CornerBadge({ variant }: { variant: "new" | "pickup" }) {
  const isNew = variant === "new";
  return (
    <div
      className="pointer-events-none absolute right-0 bottom-0 z-[2] h-12 w-12 overflow-hidden"
      aria-hidden
    >
      <span
        className={`absolute right-[-28px] bottom-[10px] block w-[80px] rotate-[-45deg] py-[3px] text-center text-[9px] font-medium tracking-[0.08em] text-white ${
          isNew ? "bg-[#e53935]" : "bg-[#222]"
        }`}
      >
        {isNew ? "New" : "Pickup"}
      </span>
    </div>
  );
}

function ProductCell({
  product,
  featured = false,
  delayIndex = 0,
  revealKey,
}: {
  product: ProductRecord;
  featured?: boolean;
  delayIndex?: number;
  revealKey: string;
}) {
  const delay = delayIndex * 0.06;
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: delay + 0.1,
        ease: "power2.out",
      },
    );
    return () => {
      gsap.killTweensOf(el);
    };
  }, [revealKey, product.id, delay]);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group relative flex flex-col bg-white ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#f3f3f3] ${
          featured
            ? "aspect-square md:aspect-auto md:h-full md:min-h-[420px]"
            : "aspect-square"
        }`}
      >
        <ImageReveal
          key={`${revealKey}-${product.id}-${product.coverImage}`}
          src={product.coverImage}
          alt={product.coverAlt}
          delay={delay}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
          imageClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        >
          {featured ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-6 pt-16 pb-6">
              <p className="font-brand-logo text-[2rem] leading-none text-white md:text-[2.5rem]">
                {product.enName ?? product.name}
              </p>
            </div>
          ) : null}
        </ImageReveal>

        {product.isNew ? <CornerBadge variant="new" /> : null}
        {!product.isNew && product.isPickup ? (
          <CornerBadge variant="pickup" />
        ) : null}

        {featured ? (
          <div className="pointer-events-none absolute top-4 left-4 z-[2] max-w-[70%] md:top-6 md:left-6">
            <p className="text-[13px] font-medium text-white drop-shadow md:text-[15px]">
              {product.name}
            </p>
            <p className="mt-1 text-[11px] text-white/80">
              {product.basePrice == null
                ? "洽詢報價"
                : `NT$ ${formatPrice(product)}／${product.unit}`}
            </p>
          </div>
        ) : null}
      </div>

      {!featured ? (
        <div
          ref={copyRef}
          className="flex flex-1 flex-col px-3 pt-3 pb-4 md:px-4"
          style={{ opacity: 0 } as CSSProperties}
        >
          <h2 className="text-[13px] font-medium leading-snug tracking-tight text-[#222] md:text-[14px]">
            {product.name}
          </h2>
          {product.enName ? (
            <p className="mt-1 text-[11px] tracking-[0.02em] text-[#999]">
              {product.enName}
            </p>
          ) : (
            <p className="mt-1 line-clamp-1 text-[11px] text-[#999]">
              {product.summary}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <span className="text-[11px] text-[#bbb]">{product.category}</span>
            <p className="text-right text-[13px] tabular-nums text-[#222]">
              {product.soldOut ? (
                <span className="text-[#e53935]">Sold Out</span>
              ) : product.basePrice == null ? (
                <span className="text-[12px]">洽詢報價</span>
              ) : (
                <>
                  <span className="mr-0.5 text-[10px]">NT$</span>
                  {formatPrice(product)}
                </>
              )}
            </p>
          </div>
        </div>
      ) : null}
    </Link>
  );
}

type Props = {
  products: ProductRecord[];
};

export function ProductListing({ products }: Props) {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get("cat") ?? "";
  const [sort, setSort] = useState<SortKey>("newest");
  const [busy, setBusy] = useState(false);

  const matchedCat = useMemo(
    () =>
      catFromUrl
        ? featuredProducts.find(
            (c) => c.id === catFromUrl || c.title === catFromUrl,
          )
        : undefined,
    [catFromUrl],
  );
  const category = matchedCat?.title ?? catFromUrl;
  const activeCatId = matchedCat?.id ?? "";

  const filtered = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "price-asc") {
      return list.sort(
        (a, b) =>
          (a.basePrice ?? Number.MAX_SAFE_INTEGER) -
          (b.basePrice ?? Number.MAX_SAFE_INTEGER),
      );
    }
    if (sort === "price-desc") {
      return list.sort(
        (a, b) => (b.basePrice ?? -1) - (a.basePrice ?? -1),
      );
    }
    return list.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [filtered, sort]);

  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.id !== featured?.id);
  const revealKey = `${category || "all"}-${sort}-${sorted.map((p) => p.id).join(",")}`;

  const onSortChange = (value: SortKey) => {
    if (busy || value === sort) return;
    setBusy(true);
    setSort(value);
    window.setTimeout(() => setBusy(false), 900);
  };

  return (
    <div className="bg-[#f7f7f7] text-[#222]">
     <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row lg:items-start lg:gap-6 lg:px-6 lg:py-6">
      <ProductSidebar activeCat={activeCatId} />
      <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-0 md:py-6">
        <p className="text-[12px] leading-relaxed text-[#777] md:text-[13px]">
          {category
            ? `目前顯示：${category}（${sorted.length}）`
            : "橙益印刷嚴選印刷與包裝商品，從名片、貼紙到彩盒與出貨箱一次看齊。"}
        </p>
        <label className="inline-flex items-center gap-2 text-[12px] text-[#666]">
          <span className="sr-only">排序</span>
          <select
            value={sort}
            disabled={busy}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            className="cursor-pointer border border-[#ddd] bg-white px-3 py-1.5 text-[12px] text-[#222] outline-none disabled:opacity-60"
          >
            <option value="newest">新到貨順序</option>
            <option value="price-asc">價格由低到高</option>
            <option value="price-desc">價格由高到低</option>
          </select>
        </label>
      </div>

      <div className="px-0 pb-16 sm:px-6 lg:px-0 md:pb-24">
        {sorted.length === 0 ? (
          <div className="border border-[#e8e8e8] bg-white px-6 py-16 text-center text-[13px] text-[#888]">
            這個分類目前沒有商品。
          </div>
        ) : (
          <div className="grid grid-cols-2 border border-[#e8e8e8] bg-white md:grid-cols-3 [&>a]:border-r [&>a]:border-b [&>a]:border-[#e8e8e8]">
            {featured ? (
              <ProductCell
                key={`${revealKey}-featured`}
                product={featured}
                featured
                delayIndex={0}
                revealKey={revealKey}
              />
            ) : null}
            {rest.map((product, i) => (
              <ProductCell
                key={`${revealKey}-${product.id}`}
                product={product}
                delayIndex={i + 1}
                revealKey={revealKey}
              />
            ))}
          </div>
        )}
      </div>
      </div>
     </div>
    </div>
  );
}
