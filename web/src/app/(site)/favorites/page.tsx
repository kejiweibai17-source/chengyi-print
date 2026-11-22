import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "收藏",
  description: "已收藏的商品。",
  robots: { index: false, follow: false },
};

export default function FavoritesPage() {
  return (
    <div className="bg-paper">
      <PageHero eyebrow="Favorites" title="收藏" description="個人化清單，不索引。" />
      <section className="mx-auto max-w-3xl px-5 py-12 text-center md:px-8 md:py-16">
        <p className="text-sm text-mute">尚無收藏（骨架頁）。</p>
        <Link
          href="/products"
          className="mt-6 inline-flex border border-line bg-white px-5 py-3 text-sm hover:border-brand/40"
        >
          去逛商品
        </Link>
      </section>
    </div>
  );
}
