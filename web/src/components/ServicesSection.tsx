import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/data/home";

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#1b2412]">
      <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 md:px-8 md:pt-12 md:pb-24">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-brand-logo text-[1.85rem] leading-[1.25] text-white md:text-[2.35rem]">
              印刷・包裝・設計
            </h2>
            <p className="mt-3 font-sans text-[14px] leading-relaxed text-[#f5f3ea]/90 md:text-[15px]">
              包裝盒、型錄、名片與客製印刷——線上下單、人工檢稿、包裝盒 3D 詢價。
            </p>
          </div>
          <Link
            href="/services"
            className="font-nav inline-flex items-center border-b border-[#ffa100] pb-1 text-[#ffa100] transition-opacity hover:opacity-70"
          >
            瀏覽服務項目 →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-5">
          {featuredProducts.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col overflow-hidden bg-white shadow-[0_1px_0_rgba(57,56,54,0.06)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e8e8]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md backdrop-saturate-150 transition-[background-color] duration-300 group-hover:bg-black/50 md:px-5 md:py-4">
                  <span className="text-[14px] font-medium tracking-[0.04em] md:text-[15px]">
                    {item.title}
                  </span>
                  <span
                    className="text-[15px] leading-none transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    ›
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href="/products"
            className="inline-flex min-w-[280px] items-center justify-between gap-6 rounded-full bg-[#ffa100] px-7 py-3.5 text-brand-ink shadow-sm transition-colors duration-300 hover:bg-[#d98600] md:min-w-[320px] md:px-8 md:py-4"
          >
            <span className="flex-1 text-center text-[14px] font-medium tracking-[0.06em] md:text-[15px]">
              查看全部服務產品
            </span>
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/80 text-[13px] leading-none"
              aria-hidden
            >
              ›
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
