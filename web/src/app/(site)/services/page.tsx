import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/home";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "服務項目",
  description: "印刷下單、設計洽詢與包裝盒 3D 詢價服務入口。",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Services"
        title="服務項目"
        description="服務總覽入口；商品分類與詳情見商品列表。"
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {services.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="border border-line bg-white px-5 py-6 transition-colors hover:border-brand/40"
          >
            <h2 className="font-[family-name:var(--font-display-tc)] text-xl">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{item.text}</p>
            <span className="mt-5 inline-block text-sm text-brand">進入 →</span>
          </Link>
        ))}
        <Link
          href="/products"
          className="border border-line bg-white px-5 py-6 transition-colors hover:border-brand/40 md:col-span-3"
        >
          <h2 className="font-[family-name:var(--font-display-tc)] text-xl">
            瀏覽商品列表
          </h2>
          <p className="mt-3 text-sm text-mute">
            分類、列表與詳情共用版型；依後台設定直接計價下單或洽詢報價。
          </p>
        </Link>
      </section>
    </div>
  );
}
