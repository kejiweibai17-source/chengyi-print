import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "購物車",
  description: "查看已選商品並前往結帳。",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Cart"
        title="購物車"
        description="結帳與購物車為交易流程頁，不列入搜尋索引。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 text-center md:px-8 md:py-16">
        <p className="text-sm text-mute">購物車尚無商品（骨架頁）。</p>
        <Link
          href="/products"
          className="mt-6 inline-flex border border-brand bg-brand px-5 py-3 text-sm text-brand-ink hover:bg-brand-deep"
        >
          瀏覽商品
        </Link>
      </section>
    </div>
  );
}
