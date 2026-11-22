import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "設計作品",
  description: "包裝、視覺與印刷成品案例列表（共用版型）。",
  alternates: { canonical: absoluteUrl("/about/works") },
};

export default function AboutWorksPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Works"
        title="設計作品"
        description="列表與詳情採共用版型；作品圖與文案由甲方提供後上架。"
      />
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["精品茶葉禮盒", "品牌名片系列", "型錄翻新"].map((title) => (
            <article
              key={title}
              className="border border-line bg-white px-5 py-6"
            >
              <div className="mb-4 aspect-[4/3] bg-paper-deep" />
              <h2 className="font-[family-name:var(--font-display-tc)] text-lg">
                {title}
              </h2>
              <p className="mt-2 text-sm text-mute">示意佔位，待上架正式作品。</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
