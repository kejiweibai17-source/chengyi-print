import Link from "next/link";
import { newsItems, solutionBanner } from "@/data/home";

function SolutionMark() {
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0" aria-hidden>
      <span className="text-[15px] font-bold tracking-tight text-[#1e4d9c] md:text-[17px]">
        ChengYi
      </span>
      <svg
        viewBox="0 0 28 28"
        className="h-6 w-6 text-[#1e4d9c] md:h-7 md:w-7"
        fill="none"
      >
        <path
          d="M14 4.5c-3.2 0-5.8 2.4-5.8 5.5 0 2.1 1.1 3.9 2.8 4.9v1.4c0 .5.4.9.9.9h4.2c.5 0 .9-.4.9-.9v-1.4c1.7-1 2.8-2.8 2.8-4.9 0-3.1-2.6-5.5-5.8-5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11.2 18.8h5.6M12 20.6h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 2.2v1.2M21.2 6.2l-.9.9M6.8 6.2l.9.9M23.2 12.2h-1.2M5.9 12.2H4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-bold tracking-tight text-[#1e4d9c] md:text-[17px]">
        Solution
      </span>
    </span>
  );
}

function TopicsListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M8 7h11M8 12h11M8 17h11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="4.5" cy="7" r="1.1" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.1" fill="currentColor" />
      <circle cx="4.5" cy="17" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function NewsSection() {
  const latest = newsItems[0];

  return (
    <section aria-label="方案介紹與最新消息">
      {/* 橘色方案橫幅 */}
      <Link
        href={solutionBanner.href}
        className="flex w-full items-center justify-center bg-[#ffa100] px-5 py-8 transition-colors hover:bg-[#d98600] md:px-8 md:py-14"
      >
        <span className="flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left">
          <SolutionMark />
          <span className="text-[14px] leading-relaxed font-medium text-[#1b2412] md:text-[18px]">
            {solutionBanner.text}
          </span>
        </span>
      </Link>

      {/* 黑色 TOPICS 列 */}
      <div className="bg-[#1b2412] text-white">
        <div className="mx-auto flex max-w-6xl items-stretch gap-3 px-4 py-3 md:gap-5 md:px-8 md:py-3.5">
          <p className="hidden shrink-0 self-center text-[12px] font-semibold tracking-[0.18em] uppercase sm:block md:text-[13px]">
            Topics
          </p>

          <Link
            href="/knowledge"
            className="group flex min-w-0 flex-1 items-center gap-2.5 py-0.5 md:gap-4"
          >
            <span className="shrink-0 rounded-[3px] bg-[#ffa100] px-2 py-0.5 text-[11px] font-medium tracking-wide text-brand-ink md:text-[12px]">
              {latest.tag}
            </span>
            <span className="hidden shrink-0 text-[12px] tracking-wider text-[#f5f3ea]/90 tabular-nums md:inline md:text-[13px]">
              {latest.date}
            </span>
            <span className="min-w-0 truncate text-[13px] text-[#f5f3ea] transition-opacity group-hover:opacity-75 md:text-[14px]">
              <span className="mr-2 text-[#f5f3ea]/70 tabular-nums md:hidden">
                {latest.date}
              </span>
              {latest.title}
            </span>
          </Link>

          <Link
            href="/knowledge"
            aria-label="查看全部消息"
            className="flex h-10 w-10 shrink-0 items-center justify-center self-center bg-[#ffa100] text-[#1b2412] transition-colors hover:bg-[#d98600] md:h-11 md:w-11"
          >
            <TopicsListIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
