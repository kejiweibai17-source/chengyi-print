import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "公司介紹",
  description:
    "橙益印刷事業——包裝盒、型錄與客製印刷，從規格到完稿一路陪你對齊。",
  alternates: { canonical: absoluteUrl("/about/intro") },
};

export default function AboutIntroPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "公司介紹｜橙益印刷",
          url: absoluteUrl("/about/intro"),
          description:
            "橙益印刷事業——包裝盒、型錄與客製印刷，從規格到完稿一路陪你對齊。",
        }}
      />
      <PageHero
        eyebrow="About"
        title="公司介紹"
        description="文案與照片由甲方提供後上架；本頁為共用版型骨架。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="space-y-5 text-sm leading-relaxed text-ink-soft md:text-base">
          <p>
            橙益印刷事業有限公司專注印刷與包裝設計，協助品牌把想法變成可交付的成品。
          </p>
          <p>
            服務範圍包含包裝盒、型錄、名片與客製印刷；線上下單後由人工檢稿把關，並提供包裝盒
            3D 示意與詢價。
          </p>
          <p className="text-mute">
            ※ 完整公司介紹、地址與品牌圖待甲方提供後更新。
          </p>
        </div>
      </section>
    </div>
  );
}
