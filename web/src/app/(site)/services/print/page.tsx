import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "印刷下單",
  description: "選商品、規格與加工；可整包 ZIP 上傳，員工分款檢稿後再付款。",
  alternates: { canonical: absoluteUrl("/services/print") },
};

export default function ServicesPrintPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Print"
        title="印刷下單"
        description="從商品列表選規格下單，或先看流程示範。"
      />
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-12 md:px-8 md:py-16">
        <Link
          href="/products"
          className="border border-brand bg-brand px-5 py-3 text-center text-sm text-white hover:bg-brand-deep"
        >
          前往商品列表
        </Link>
        <Link
          href="/demo/manuscript-flow"
          className="border border-line bg-white px-5 py-3 text-center text-sm hover:border-brand/40"
        >
          查看上傳／檢稿流程示範
        </Link>
      </section>
    </div>
  );
}
