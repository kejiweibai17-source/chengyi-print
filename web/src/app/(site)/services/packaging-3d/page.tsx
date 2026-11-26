import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "包裝盒 3D",
  description: "掀蓋郵寄盒／內襯可調尺寸預覽與詢價，外觀示意、不做估價下單。",
  alternates: { canonical: absoluteUrl("/services/packaging-3d") },
};

export default function ServicesPackaging3dPage() {
  return (
    <div className="bg-paper">
      <PageHero
        eyebrow="3D"
        title="包裝盒 3D"
        description="本期確定 3 種盒型；可旋轉縮放、調尺寸，並上傳 Logo PNG 示意。"
      />
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-12 md:px-8 md:py-16">
        <p className="text-sm leading-relaxed text-ink-soft md:text-base">
          3D 為外觀與比例示意，不代表結構驗證或可生產刀模。確認後可送出詢價由橙益人工回覆。
        </p>
        <Link
          href="/box-3d-demo"
          className="border border-brand bg-brand px-5 py-3 text-center text-sm text-brand-ink hover:bg-brand-deep"
        >
          開啟 3D 預覽 Demo
        </Link>
      </section>
    </div>
  );
}
