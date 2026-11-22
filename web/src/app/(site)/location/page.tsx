import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "公司地點",
  description: "橙益印刷公司地點與地圖資訊（文案／地圖由甲方提供）。",
  alternates: { canonical: absoluteUrl("/location") },
};

export default function LocationPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "橙益印刷事業有限公司",
          url: absoluteUrl("/"),
          address: {
            "@type": "PostalAddress",
            addressLocality: "台中市南屯區",
            addressCountry: "TW",
          },
        }}
      />
      <PageHero
        eyebrow="Location"
        title="公司地點"
        description="完整地址與地圖嵌入待甲方提供後更新。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="border border-line bg-white px-5 py-6 text-sm leading-relaxed text-ink-soft">
          <p className="font-medium text-ink">橙益印刷事業有限公司</p>
          <p className="mt-2">台中市南屯區（詳細門牌待提供）</p>
          <div className="mt-6 aspect-[16/9] bg-paper-deep" aria-hidden />
          <p className="mt-3 text-mute">地圖佔位</p>
        </div>
      </section>
    </div>
  );
}
