import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "結帳",
  description: "建立訂單（人工轉帳）。",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="Checkout"
        title="結帳"
        description="會員或訪客可建立訂單；發票載具／統編欄位後續接上。"
      />
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="border border-line bg-white px-5 py-6 text-sm text-mute">
          結帳表單骨架：收件資料、發票資訊、確認建立訂單。
        </div>
      </section>
    </div>
  );
}
