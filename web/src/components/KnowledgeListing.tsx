import Image from "next/image";
import Link from "next/link";
import type { KnowledgeArticle } from "@/data/knowledge";
import type { ProductRecord } from "@/data/products";

const TABS = [
  { label: "首頁", href: "/knowledge", match: "home" },
  { label: "文章", href: "/knowledge?tab=articles", match: "articles" },
  { label: "雜誌", href: "/knowledge?tab=magazine", match: "magazine" },
  { label: "喜歡", href: "/knowledge?tab=likes", match: "likes" },
  { label: "商店", href: "/products", match: "store" },
  { label: "月別", href: "/knowledge?tab=monthly", match: "monthly" },
] as const;

function formatRelativeDate(iso: string) {
  const published = new Date(iso);
  const now = new Date("2026-11-21T00:00:00");
  const diffMs = now.getTime() - published.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (days < 7) return `${Math.max(1, days)} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 週前`;
  if (days < 365) return `${Math.floor(days / 30)} 個月前`;
  return `${Math.floor(days / 365)} 年前`;
}

function formatPrice(price: number | null, unit: string) {
  if (price == null) return "詢價";
  return `NT$ ${price.toLocaleString("zh-TW")}`;
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden
    >
      <path d="M12 20s-7-4.35-7-9.2A3.8 3.8 0 0 1 12 7.4a3.8 3.8 0 0 1 7 3.4C19 15.65 12 20 12 20Z" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden
    >
      <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

type Props = {
  articles: KnowledgeArticle[];
  products: ProductRecord[];
  sort?: "latest" | "popular";
  tab?: string;
  query?: string;
};

export function KnowledgeListing({
  articles,
  products,
  sort = "latest",
  tab = "home",
  query = "",
}: Props) {
  const sorted =
    sort === "popular"
      ? [...articles].sort((a, b) => b.id - a.id)
      : [...articles].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        );

  const featuredProduct = products[0] ?? null;
  const storeProducts = products.slice(0, 2);
  const activeTab = tab === "articles" ? "articles" : "home";

  return (
    <div className="bg-white text-[#222]">
      {/* 全寬 Hero */}
      <div className="relative h-[180px] w-full overflow-hidden sm:h-[220px] md:h-[280px] lg:h-[320px]">
        <Image
          src="/images/print-08.png"
          alt="橙益印刷知識專區"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 頭像列 + 分頁（對齊 note） */}
      <div className="border-b border-[#efefef]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-4 pt-4 sm:px-6 md:flex-row md:items-end md:justify-between md:gap-6 md:px-8 md:pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#fff4ee] sm:h-14 sm:w-14">
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="block h-4 w-4 rotate-45 bg-[#ffa100] sm:h-5 sm:w-5"
                  aria-hidden
                />
              </div>
            </div>
            <h1 className="truncate text-[18px] font-bold tracking-tight text-[#222] sm:text-[20px]">
              橙益印刷
            </h1>
            <button
              type="button"
              className="ml-0.5 text-[#bdbdbd] transition-colors hover:text-[#666]"
              aria-label="更多"
            >
              <MoreIcon />
            </button>
          </div>

          <nav
            className="-mx-4 flex items-center gap-0 overflow-x-auto px-4 md:mx-0 md:px-0"
            aria-label="知識專區分頁"
          >
            {TABS.map((item) => {
              const showActive =
                (activeTab === "home" && item.match === "home") ||
                (activeTab === "articles" && item.match === "articles");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative shrink-0 px-3.5 py-3 text-[13px] transition-colors sm:px-4 sm:text-[14px] ${
                    showActive
                      ? "font-bold text-[#222]"
                      : "font-medium text-[#8a8a8a] hover:text-[#444]"
                  }`}
                >
                  {item.label}
                  {showActive ? (
                    <span className="absolute inset-x-3 bottom-0 h-[3px] bg-[#222] sm:inset-x-4" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 左 sticky + 右文章 */}
      <div className="mx-auto max-w-[1100px] px-4 pb-20 pt-6 sm:px-6 md:px-8 md:pt-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* 左側 */}
          <aside className="w-full shrink-0 lg:w-[240px] xl:w-[260px]">
            <div className="lg:sticky lg:top-[7.5rem] lg:pb-8">
              <p className="text-[13px] leading-[1.75] text-[#555]">
                台中南屯印刷與包裝設計團隊。完稿規格、上傳流程、包裝盒
                3D，把想法印成看得見的東西。
              </p>

              <p className="mt-4 text-[12px] text-[#888]">
                <span className="font-medium text-[#222]">12</span> 關注
                <span className="mx-2.5 text-[#ddd]"> </span>
                <span className="font-medium text-[#222]">1,286</span> 粉絲
              </p>

              <div className="mt-3.5 flex items-center gap-3.5 text-[#777]">
                <a
                  href="https://line.me/R/ti/p/@717syyqm"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-70"
                  aria-label="官方 LINE"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.28.63.63 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .346-.282.629-.63.629-.345 0-.63-.283-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.771zm-1.822.016H8.064c-.345 0-.63-.283-.63-.629 0-.345.285-.63.63-.63h1.938V8.108c0-.345.282-.63.63-.63.348 0 .63.285.63.63v4.888c0 .346-.282.629-.63.629zM5.076 8.108c0-.345.282-.63.63-.63h2.386c.348 0 .63.285.63.63 0 .349-.282.63-.63.63H6.336v1.125h1.755c.348 0 .63.283.63.63 0 .344-.282.629-.63.629H5.706a.63.63 0 0 1-.63-.629V8.108zM12 2C6.477 2 2 5.925 2 10.76c0 4.34 3.85 7.97 9.04 8.63.35.075.825.23.945.53.11.27.07.7.035 1-.05.35-.255 1.37-.245 1.455.02.13.15.18.27.13 1.09-.45 5.88-3.47 8.03-5.94C22.04 14.16 22 12.5 22 10.76 22 5.925 17.523 2 12 2z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="transition-opacity hover:opacity-70"
                  aria-label="官方網站"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </a>
              </div>

              <Link
                href="/about/intro"
                className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#222] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                <span className="text-[15px] leading-none">+</span>
                關注
              </Link>

              {featuredProduct ? (
                <Link
                  href={`/products/${featuredProduct.slug}`}
                  className="mt-5 flex gap-3 rounded-lg border border-[#e8e8e8] p-2.5 transition-colors hover:bg-[#fafafa]"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#f5f5f5]">
                    <Image
                      src={featuredProduct.coverImage}
                      alt={featuredProduct.coverAlt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="line-clamp-2 text-[12px] font-medium leading-snug text-[#222]">
                      {featuredProduct.name}
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-[#222]">
                      {formatPrice(
                        featuredProduct.basePrice,
                        featuredProduct.unit,
                      )}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#999]">橙益印刷</p>
                  </div>
                </Link>
              ) : null}

              {/* 商店區（捲動時左側可見） */}
              {storeProducts.length > 0 ? (
                <div className="mt-8 space-y-3">
                  {storeProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="flex gap-3 rounded-xl border border-[#e8e8e8] bg-white p-3 transition-colors hover:bg-[#fafafa]"
                    >
                      <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
                        <Image
                          src={product.coverImage}
                          alt={product.coverAlt}
                          fill
                          sizes="68px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="line-clamp-2 text-[13px] font-medium leading-snug text-[#222]">
                          {product.name}
                        </p>
                        <p className="mt-1.5 text-[13px] font-bold text-[#222]">
                          {formatPrice(product.basePrice, product.unit)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#999]">橙益印刷</p>
                      </div>
                    </Link>
                  ))}

                  <div className="pt-2 text-center">
                    <Link
                      href="/products"
                      className="inline-flex items-center rounded-full border border-[#d8d8d8] px-5 py-1.5 text-[12px] text-[#555] transition-colors hover:border-[#bbb] hover:text-[#222]"
                    >
                      查看商店
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </aside>

          {/* 右側 */}
          <section className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Link
                href={
                  query
                    ? `/knowledge?sort=latest&q=${encodeURIComponent(query)}`
                    : "/knowledge?sort=latest"
                }
                className={`rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
                  sort === "latest"
                    ? "bg-[#2f2f2f] font-medium text-white"
                    : "border border-[#e0e0e0] bg-white text-[#666] hover:border-[#ccc]"
                }`}
              >
                最新
              </Link>
              <Link
                href={
                  query
                    ? `/knowledge?sort=popular&q=${encodeURIComponent(query)}`
                    : "/knowledge?sort=popular"
                }
                className={`rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
                  sort === "popular"
                    ? "bg-[#2f2f2f] font-medium text-white"
                    : "border border-[#e0e0e0] bg-white text-[#666] hover:border-[#ccc]"
                }`}
              >
                人氣
              </Link>
              {query ? (
                <p className="ml-1 text-[12px] text-[#888]">
                  「{query}」共 {sorted.length} 筆
                </p>
              ) : null}
            </div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.length === 0 ? (
                <p className="col-span-full py-20 text-center text-[14px] text-[#888]">
                  找不到符合的內容，換個關鍵字試試。
                </p>
              ) : null}

              {sorted.map((article, index) => {
                const likes = 12 + ((article.id * 17) % 40);
                return (
                  <article key={article.id} className="group min-w-0">
                    <Link href={`/knowledge/${article.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#f3f3f3]">
                        <Image
                          src={article.coverImage}
                          alt={article.coverAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          priority={index < 3}
                        />
                      </div>
                      <h2 className="mt-3 line-clamp-3 text-[15px] font-bold leading-[1.5] tracking-tight text-[#222] transition-opacity group-hover:opacity-70">
                        {article.title}
                      </h2>
                    </Link>

                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-[#fff4ee]">
                        <span className="block h-2 w-2 rotate-45 bg-[#ffa100]" />
                      </span>
                      <div className="min-w-0 text-[11px] leading-tight text-[#999]">
                        <p className="truncate text-[#666]">橙益印刷</p>
                        <p>{formatRelativeDate(article.publishedAt)}</p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-3 text-[#b0b0b0]">
                      <span className="inline-flex items-center gap-1 text-[12px]">
                        <HeartIcon className="h-3.5 w-3.5" />
                        {likes}
                      </span>
                      <button
                        type="button"
                        className="transition-colors hover:text-[#666]"
                        aria-label="收藏"
                      >
                        <BookmarkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
