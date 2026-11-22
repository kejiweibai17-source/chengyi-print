import type { Metadata } from "next";
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
        description="六分類共用一套版型；問答可由後台新增與排序。"
      />
      <section className="mx-auto max-w-3xl space-y-10 px-5 py-12 md:px-8 md:py-16">
        {FAQ_CATEGORIES.map((category) => {
          const items = faqItems
            .filter((item) => item.category === category)
            .sort((a, b) => a.sort - b.sort);
          if (!items.length) return null;
          return (
            <div key={category}>
              <h2 className="font-[family-name:var(--font-display-tc)] text-2xl">
                {category}
              </h2>
              <div className="mt-4 divide-y divide-line border border-line bg-white">
                {items.map((item) => (
                  <article key={item.id} className="px-5 py-5">
                    <h3 className="text-base font-medium text-ink">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
