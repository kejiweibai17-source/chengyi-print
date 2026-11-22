import Image from "next/image";
import Link from "next/link";
import { heroMainImage } from "@/data/home";

export function HeroStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-white" aria-label="印刷現場">
      {/* 首頁專屬品牌字標（非全域） */}
      <div className="px-4 pt-10 pb-2 text-center md:pt-12 md:pb-2.5">
        <h1 className="font-brand-logo text-[2.75rem] leading-none text-[#393836] md:text-[3.75rem] lg:text-[4.5rem]">
          橙益印刷
        </h1>
        <p className="mt-3 font-sans text-[12px] font-normal tracking-[0.08em] text-[#393836] md:mt-3.5 md:text-[13px]">
          把想法印成看得見的東西
        </p>
      </div>

      {/* 主圖：緊接字標下方，無分隔線 */}
      <Link
        href={heroMainImage.href}
        className="hero-strip-col relative mx-auto block w-full bg-white"
      >
        <Image
          src={heroMainImage.src}
          alt={heroMainImage.alt}
          width={heroMainImage.width}
          height={heroMainImage.height}
          priority
          unoptimized
          sizes="100vw"
          className="h-auto w-full object-contain object-center"
        />
      </Link>
    </section>
  );
}
