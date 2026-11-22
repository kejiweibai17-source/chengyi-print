import Link from "next/link";
import { aboutPoints, newsItems } from "@/data/home";

/** 卡片左側圖片（依序對應 aboutPoints） */
const cardImages = [
  "/images/print-02.png",
  "/images/print-03.png",
  "/images/print-04.png",
] as const;

const cardTags = ["公司介紹", "合作流程", "設計作品"] as const;

function Sup({ children }: { children: React.ReactNode }) {
  return (
    <sup className="ml-1 align-top text-[11px] font-normal tracking-normal text-brand">
      {children}
    </sup>
  );
}

function PillButton() {
  return (
    <span
      aria-hidden
      className="inline-flex h-[30px] w-[46px] items-center justify-center rounded-full border border-black text-[10px] leading-none tracking-[0.12em] text-black"
    >
      ・・
    </span>
  );
}

function ArrowCircle() {
  return (
    <span
      aria-hidden
      className="flex h-[32px] w-[48px] items-center justify-center rounded-full border border-black bg-transparent text-[12px] text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white"
    >
      ›
    </span>
  );
}

export function AboutTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
        {/* ── ABOUT（圖 2：BLOG 卡片列表） ── */}
        <div className="flex items-center gap-4 pb-6">
          <h2 className="text-[40px] leading-none font-semibold tracking-[0.12em] text-black md:text-[56px]">
            ABOUT
            <Sup>03</Sup>
          </h2>
          <p className="text-[15px] font-medium tracking-[0.06em] text-[#b5b5b5] md:text-[18px]">
            關於橙益
          </p>
          <Link href="/about" aria-label="關於橙益">
            <PillButton />
          </Link>
        </div>

        <ul className="flex flex-col gap-2">
          {aboutPoints.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex min-h-[170px] overflow-hidden rounded-lg bg-[#f6f6f6] transition-all duration-300 hover:bg-white hover:shadow-[0_6px_22px_rgba(0,0,0,0.12)] md:min-h-[201px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cardImages[i]}
                  alt={item.label}
                  className="h-auto w-[34%] shrink-0 object-cover md:w-[337px]"
                />

                <div className="relative flex min-w-0 flex-1 flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:gap-10 md:px-[18px]">
                  <p className="absolute top-3 left-4 text-[11px] tracking-[0.1em] text-[#b0b0b0] md:left-[18px]">
                    0{i + 1}
                  </p>

                  <div className="mt-5 md:mt-0 md:w-[40%] md:pl-[20px]">
                    <p className="text-[16px] leading-snug font-bold tracking-[0.02em] text-black md:text-[20px]">
                      {item.label}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-black px-4 py-1 text-[12px] tracking-[0.04em] text-white">
                      {cardTags[i]}
                    </span>
                  </div>

                  <p className="text-[12px] leading-[26px] tracking-[0.04em] text-[#8a8a8a] md:flex-1 md:text-[13px]">
                    {item.text}
                  </p>

                  <span className="absolute right-4 bottom-4 md:right-[26px] md:bottom-[18px]">
                    <ArrowCircle />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── NEWS（圖 3：左標題＋右列表） ── */}
        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-[220px_1fr] md:gap-10">
          <div>
            <h2 className="text-[40px] leading-none font-semibold tracking-[0.12em] text-black md:text-[56px]">
              NEWS
              <Sup>{String(newsItems.length).padStart(2, "0")}</Sup>
            </h2>
            <p className="mt-6 text-[15px] font-bold tracking-[0.1em] text-[#b5b5b5]">
              最新消息
            </p>
            <Link href="/knowledge" aria-label="更多消息" className="mt-6 inline-block">
              <PillButton />
            </Link>
          </div>

          <ul>
            {newsItems.map((n) => (
              <li key={n.id} className="border-b border-black first:border-t-0">
                <Link
                  href="/knowledge"
                  className="group flex items-center gap-4 py-[26px] md:gap-5"
                >
                  <time className="w-[84px] shrink-0 text-[12px] tracking-[0.06em] text-[#aaa] tabular-nums">
                    {n.date}
                  </time>
                  <span
                    aria-hidden
                    className="h-[34px] w-px shrink-0 rotate-[18deg] bg-black"
                  />
                  <span className="shrink-0 text-[11px] font-medium text-black md:text-[12px]">
                    {n.tag}
                  </span>
                  <span
                    aria-hidden
                    className="h-[34px] w-px shrink-0 rotate-[18deg] bg-black"
                  />
                  <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-black md:text-[16px]">
                    {n.title}
                  </span>
                  <span
                    aria-hidden
                    className="text-[14px] text-[#777] transition-transform group-hover:translate-x-1"
                  >
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
