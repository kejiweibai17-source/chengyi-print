import type { Metadata } from "next";
import { FaqExplorer } from "@/components/FaqExplorer";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_CATEGORIES, faqItems } from "@/data/faq";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "常見問題",
  description: "下單、檔案規格、付款、交期與包裝盒 3D 等常見問題。",
  alternates: { canonical: absoluteUrl("/faq") },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-paper">
      <JsonLd data={faqLd} />
      <PageHero
        eyebrow="FAQ"
        title="常見問題"
        description="從左側選擇分類，點擊問題即可展開答案。"
      />
      <FaqExplorer categories={FAQ_CATEGORIES} items={faqItems} />
    </div>
  );
}
