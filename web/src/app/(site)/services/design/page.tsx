import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "設計洽詢",
  description: "需要排版或包裝設計時，由專人承接，不走線上審稿。",
  alternates: { canonical: absoluteUrl("/services/design") },
};

export default function ServicesDesignPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Design"
        title="設計洽詢"
        description="排版與包裝設計由專人承接；可透過官方 LINE 洽詢。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 text-sm leading-relaxed text-ink-soft md:px-8 md:py-16 md:text-base">
        <p>
          設計服務不含於線上自動結帳流程。請透過橙益官方 LINE（@717syyqm）或其他約定管道聯繫，由專人確認範圍與報價。
        </p>
      </section>
    </div>
  );
}
