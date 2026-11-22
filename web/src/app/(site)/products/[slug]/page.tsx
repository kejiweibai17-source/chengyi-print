import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CopyUrlButton } from "@/components/product/CopyUrlButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getProductBySlug,
  getPublishedProducts,
} from "@/lib/products";
import { getPublishedArticles } from "@/lib/knowledge";
import { getProductGalleryImages } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getPublishedProducts();
  return items.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "商品不存在" };
  }
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: absoluteUrl(`/products/${product.slug}`) },
    openGraph: {
      title: product.name,
      description: product.summary,
      images: [{ url: product.coverImage, alt: product.coverAlt }],
    },
  };
}

const LINE_URL = "https://line.me/R/ti/p/@717syyqm";

function SectionTitle({ jp, en }: { jp: string; en: string }) {
  return (
    <div className="px-6 py-8">
      <h2 className="text-[15px] tracking-[0.06em]">{jp}</h2>
      <p className="mt-1 text-[10px] tracking-[0.1em]">{en}</p>
    </div>
  );
}

async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [allProducts, articles] = await Promise.all([
    getPublishedProducts(),
    getPublishedArticles(),
  ]);
  const others = allProducts.filter((p) => p.id !== product.id);
  const related = articles.slice(0, 1);

  const images = getProductGalleryImages(product);
  const tags = product.tags ?? [product.category.split("／")[0]];
  const specs = product.specs ?? [
    { label: "計價單位", value: product.unit },
    { label: "接單方式", value: product.orderMode },
    { label: "分類", value: product.category },
    { label: "交期", value: "完稿確認後依規格報價時程" },
  ];
  const paragraphs = product.longDescription ?? [product.summary, product.description];
  const inquiryOnly = product.orderMode === "人工詢價";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: images,
    brand: { "@type": "Brand", name: "橙益印刷" },
    ...(product.basePrice != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "TWD",
            price: product.basePrice,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <div className="text-[#2f2725]">
      <JsonLd data={productLd} />

      {/* 商品分類列 */}
      <Link
        href="/products"
        className="flex h-[50px] items-center justify-center gap-2 bg-[#eee] text-[12px] tracking-[0.06em] transition-colors hover:bg-[#e6e6e6]"
      >
        <span aria-hidden className="text-[10px]">⁝⁝⁝</span>
        選擇商品分類
      </Link>

      <div className="mx-auto max-w-[1340px] border-x border-[#e5e5e5]">
        {/* 麵包屑 */}
        <nav
          aria-label="breadcrumb"
          className="flex h-[40px] items-center border-b border-[#e5e5e5] px-6 text-[11px] tracking-[0.06em] text-[#8a8a8a]"
        >
          <Link href="/" className="hover:text-[#2f2725]">首頁</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#2f2725]">商品一覽</Link>
          <span className="mx-2">/</span>
          <span className="truncate text-[#2f2725]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-[60%_40%]">
          {/* 左：圖片 + 說明 + 品牌 */}
          <div className="min-w-0 bg-white md:border-r md:border-[#e5e5e5]">
            <ProductGallery
              images={images}
              alt={product.coverAlt}
              preview3dHref={`${product.preview3dHref ?? "/box-3d-demo"}?from=${encodeURIComponent(`/products/${product.slug}`)}`}
            />

            <div className="px-6 pt-12 pb-14 md:px-10">
              <div className="space-y-6 text-[13px] leading-[27px] tracking-[0.08em]">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] px-6 py-10 md:px-10">
              <h2 className="text-[14px] tracking-[0.06em]">橙益印刷</h2>
              <p className="mt-5 text-[12px] leading-[22px] tracking-[0.06em]">
                台中南屯的印刷與包裝設計團隊，專注完稿品質與交付節奏：規格清楚、檔案可追、檢稿有紀錄。
              </p>
              <Link
                href="/products"
                className="mt-8 flex h-14 items-center justify-between bg-[#2f2725] px-8 text-[13px] font-medium tracking-[0.06em] text-white transition-opacity hover:opacity-90"
              >
                <span className="flex-1 text-center">查看更多商品</span>
                <span aria-hidden>›</span>
              </Link>
            </div>
          </div>

          {/* 右：購買資訊（灰底側欄） */}
          <aside className="min-w-0 bg-[#f7f7f7]">
            <div className="relative">
              <CopyUrlButton />
              <div className="relative px-6 pt-[50px] pb-8">
                <p className="text-[11px] tracking-[0.06em]">{product.category}</p>
                <h1 className="mt-3 text-[22px] leading-[25px] tracking-[0.05em]">
                  {product.name}
                </h1>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[16px] tracking-[0.04em]">
                    {product.basePrice != null
                      ? `NT$ ${product.basePrice.toLocaleString("zh-TW")}`
                      : "價格洽詢"}
                  </span>
                  {product.basePrice != null && (
                    <span className="text-[11px]">／{product.unit}（含稅）</span>
                  )}
                </p>
                {product.isNew !== false && (
                  <span
                    aria-hidden
                    className="absolute right-0 bottom-0 h-[44px] w-[44px] bg-[#f7676a] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
                  >
                    <span className="absolute right-[2px] bottom-[3px] text-[9px] font-bold text-white">
                      New
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-[#e5e5e5]">
              <ProductPurchase inquiryOnly={inquiryOnly} lineUrl={LINE_URL} />
            </div>

            <div className="border-t border-[#e5e5e5]">
              <SectionTitle jp="詳細資訊" en="Information Details" />
              <dl className="px-6 pb-8 text-[12px] tracking-[0.06em]">
                {specs.map((row) => (
                  <div key={row.label} className="flex gap-6 py-[11px]">
                    <dt className="w-[56px] shrink-0">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-[#e5e5e5] px-6 py-8">
              <p className="text-[12px] font-bold tracking-[0.06em]">相關標籤</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/products?q=${encodeURIComponent(t)}`}
                    className="bg-white px-4 py-3 text-[11px] font-medium tracking-[0.04em] transition-colors hover:bg-[#eee]"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] px-6 py-8 text-[12px] tracking-[0.06em]">
              <p className="flex gap-6">
                <span className="w-[56px] shrink-0">分類</span>
                {product.category.split("／").map((c, i, arr) => (
                  <span key={c} className="flex items-center">
                    <Link
                      href={`/products?q=${encodeURIComponent(c)}`}
                      className="border-b border-dashed border-[#999]"
                    >
                      {c}
                    </Link>
                    {i < arr.length - 1 && <span className="mx-2 text-[#999]">|</span>}
                  </span>
                ))}
                <span className="mx-2 text-[#999]">|</span>
                <Link href="/products" className="border-b border-dashed border-[#999]">
                  全部
                </Link>
              </p>
            </div>
            <div className="hidden min-h-[200px] md:block" />
          </aside>
        </div>

        {/* 相關文章 */}
        {related.length > 0 && (
          <section className="border-t border-[#e5e5e5]">
            <SectionTitle jp="相關文章" en="Related article" />
            <div className="border-t border-[#e5e5e5]">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/knowledge/${a.slug}`}
                  className="block w-full max-w-[273px] border-r border-[#e5e5e5] p-6 transition-opacity hover:opacity-70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.coverImage}
                    alt={a.coverAlt}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <p className="mt-5 text-[13px] leading-snug tracking-[0.04em]">{a.title}</p>
                  <p className="mt-4 text-[10px] tracking-[0.1em] text-[#8a8a8a] uppercase">
                    #{a.category}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 其他商品 */}
        {others.length > 0 && (
          <section className="border-t border-[#e5e5e5]">
            <SectionTitle jp="其他商品" en="Check items" />
            <ul className="flex flex-wrap border-t border-[#e5e5e5]">
              {others.map((p) => (
                <li key={p.id} className="w-1/2 border-r border-[#e5e5e5] md:w-[268px]">
                  <Link href={`/products/${p.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage}
                        alt={p.coverAlt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="absolute right-0 bottom-0 h-[44px] w-[44px] bg-[#f7676a] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
                      />
                    </div>
                    <div className="px-4 pt-4 pb-5">
                      <p className="text-[12px] tracking-[0.04em]">{p.name}</p>
                      <p className="mt-2 text-[10px] tracking-[0.04em] text-[#8a8a8a]">
                        {p.category}
                      </p>
                      <p className="mt-3 text-right text-[11px]">
                        {p.basePrice != null ? `NT$ ${p.basePrice.toLocaleString("zh-TW")}` : "價格洽詢"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* 商品標籤 */}
      <section className="border-t border-[#e5e5e5] bg-[#f7f7f7]">
        <div className="mx-auto grid max-w-[1340px] border-x border-[#e5e5e5] md:grid-cols-[268px_1fr]">
          <div className="px-6 py-8">
            <h2 className="text-[15px] tracking-[0.06em]">商品標籤</h2>
            <p className="mt-1 text-[10px] tracking-[0.1em]">Item tag lists</p>
          </div>
          <div className="flex flex-wrap gap-2 px-6 py-8">
            {["名片", "型錄", "包裝盒", "禮盒", "貼紙", "卡片", "手冊", "客製印刷"].map((t) => (
              <Link
                key={t}
                href={`/products?q=${encodeURIComponent(t)}`}
                className="bg-white px-4 py-3 text-[11px] font-medium tracking-[0.04em] transition-colors hover:bg-[#eee]"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductDetailPage(props: Props) {
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-5 py-16 text-sm text-mute md:px-8">
            載入商品…
          </div>
        }
      >
        <ProductDetail {...props} />
      </Suspense>
    </div>
  );
}
