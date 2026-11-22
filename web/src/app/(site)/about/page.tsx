import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { aboutPoints } from "@/data/home";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "關於橙益",
  description: "公司介紹、合作流程與設計作品——了解橙益印刷的服務方式。",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutIndexPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="About"
        title="關於橙益"
        description="台中南屯印刷與包裝設計團隊，專注完稿品質與交付節奏。"
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {aboutPoints.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-line bg-white px-5 py-6 transition-colors hover:border-brand/40"
          >
            <h2 className="font-[family-name:var(--font-display-tc)] text-xl">
              {item.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{item.text}</p>
            <span className="mt-5 inline-block text-sm text-brand">查看 →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
