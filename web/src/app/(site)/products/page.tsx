import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/components/ProductListing";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "商品一覽",
  description: "印刷商品分類與列表；詳情依後台設定直接計價或洽詢報價。",
  alternates: { canonical: absoluteUrl("/products") },
};

async function ProductContent() {
  const products = await getPublishedProducts();
  return <ProductListing products={products} />;
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] bg-[#f7f7f7]">
          <div className="h-28 animate-pulse bg-[#eeeeee]" />
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-[#e8e8e8] p-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-white" />
            ))}
          </div>
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
