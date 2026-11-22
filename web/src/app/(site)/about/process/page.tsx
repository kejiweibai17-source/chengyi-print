import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "合作流程",
  description: "規格確認 → 完稿／檢稿 → 印製 → 出貨，步驟清楚可追蹤。",
  alternates: { canonical: absoluteUrl("/about/process") },
};

const steps = [
  "確認商品規格、數量與加工",
  "下單後上傳印刷檔（可整包 ZIP）",
  "員工逐款檢稿；不合格僅補該品項",
  "全部合格後顯示匯款資訊並回報轉帳",
  "確認收款 → 印製 → 出貨／領取",
];

export default function AboutProcessPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Process"
        title="合作流程"
        description="從規格到出貨，狀態可在會員／訂單頁追蹤。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 border border-line bg-white px-5 py-4"
            >
              <span className="font-mono text-sm text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
