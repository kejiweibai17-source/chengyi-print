"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { exhibitionSlides } from "@/data/home";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

type Direction = "left" | "right";

function createLayer(
  slide: (typeof exhibitionSlides)[number],
  opts?: { grayscale?: boolean; opacity?: string },
) {
  const container = document.createElement("div");
  container.className = "img";
  Object.assign(container.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background: "#141414",
  });

  const mediaEl = document.createElement("img");
  mediaEl.src = slide.image;
  mediaEl.alt = slide.imageAlt;
  mediaEl.decoding = "async";
  Object.assign(mediaEl.style, {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    filter: opts?.grayscale ? "grayscale(35%)" : "none",
    opacity: opts?.opacity ?? "1",
  });
  container.appendChild(mediaEl);
  return { container, mediaEl };
}

function wipeTransition(
  root: HTMLElement,
  nextSlide: (typeof exhibitionSlides)[number],
  direction: Direction,
  opts: {
    slideOffset: number;
    grayscale?: boolean;
    opacity?: string;
    onComplete?: () => void;
  },
) {
  const currentSlide = root.querySelector(".img:last-child");
  const currentMedia = currentSlide?.querySelector("img");
  const { container, mediaEl } = createLayer(nextSlide, {
    grayscale: opts.grayscale,
    opacity: opts.opacity,
  });
  container.style.zIndex = "2";

  gsap.set(mediaEl, {
    x: direction === "right" ? opts.slideOffset : -opts.slideOffset,
  });
  root.appendChild(container);

  if (currentMedia) {
    gsap.to(currentMedia, {
      x: direction === "right" ? -opts.slideOffset : opts.slideOffset,
      duration: 1.5,
      ease: "hop",
    });
  }

  gsap.fromTo(
    container,
    {
      clipPath:
        direction === "right"
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "hop",
      onComplete: () => {
        const allSlides = root.querySelectorAll(".img");
        if (allSlides.length > 1) {
          for (let i = 0; i < allSlides.length - 1; i += 1) {
            allSlides[i].remove();
          }
        }
        opts.onComplete?.();
      },
    },
  );
  gsap.to(mediaEl, { x: 0, duration: 1.5, ease: "hop" });
}

export function ExhibitionHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const carouselImagesRef = useRef<HTMLDivElement>(null);
  const cardCarouselRef = useRef<HTMLDivElement>(null);
  const textEyebrowRef = useRef<HTMLParagraphElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const textSubtitleRef = useRef<HTMLParagraphElement>(null);
  const textDateRef = useRef<HTMLParagraphElement>(null);
  const cardLabelRef = useRef<HTMLParagraphElement>(null);
  const cardLinkRef = useRef<HTMLAnchorElement>(null);

  const [index, setIndex] = useState(0);

  const stateRef = useRef({
    currentIndex: 0,
    isAnimating: false,
    autoPlayTimer: null as ReturnType<typeof setInterval> | null,
  });

  useEffect(() => {
    const carouselRoot = carouselImagesRef.current;
    const cardRoot = cardCarouselRef.current;
    if (!carouselRoot || !cardRoot) return;

    if (!CustomEase.get("hop")) {
      CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1",
      );
    }

    const animateMetaText = (nextIndex: number) => {
      const next = exhibitionSlides[nextIndex];
      const targets = [
        textEyebrowRef.current,
        textTitleRef.current,
        textSubtitleRef.current,
        textDateRef.current,
        cardLabelRef.current,
      ].filter(Boolean);

      if (targets.length === 0) return;

      gsap.to(targets, {
        y: -24,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        stagger: 0.04,
        onComplete: () => {
          if (textEyebrowRef.current) {
            textEyebrowRef.current.textContent = next.eyebrow;
          }
          if (textTitleRef.current) textTitleRef.current.textContent = next.title;
          if (textSubtitleRef.current) {
            textSubtitleRef.current.textContent = next.subtitle;
          }
          if (textDateRef.current) textDateRef.current.textContent = next.date;
          if (cardLabelRef.current) {
            cardLabelRef.current.textContent = next.cardLabel;
          }
          if (cardLinkRef.current) cardLinkRef.current.href = next.href;

          gsap.set(targets, { y: 24 });
          gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.05,
          });
        },
      });
    };

    const performTransition = (direction: Direction) => {
      if (stateRef.current.isAnimating) return;

      stateRef.current.isAnimating = true;
      const nextIndex = stateRef.current.currentIndex;
      const nextData = exhibitionSlides[nextIndex];
      setIndex(nextIndex);
      animateMetaText(nextIndex);

      const bigOffset = window.innerWidth < 1000 ? 100 : 500;
      const cardOffset = window.innerWidth < 1000 ? 40 : 80;

      wipeTransition(carouselRoot, nextData, direction, {
        slideOffset: bigOffset,
        grayscale: true,
        opacity: "0.72",
        onComplete: () => {
          stateRef.current.isAnimating = false;
        },
      });

      wipeTransition(cardRoot, nextData, direction, {
        slideOffset: cardOffset,
      });
    };

    const stopAutoPlay = () => {
      if (stateRef.current.autoPlayTimer) {
        clearInterval(stateRef.current.autoPlayTimer);
        stateRef.current.autoPlayTimer = null;
      }
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      if (exhibitionSlides.length <= 1) return;
      stateRef.current.autoPlayTimer = setInterval(() => {
        stateRef.current.currentIndex =
          (stateRef.current.currentIndex + 1) % exhibitionSlides.length;
        performTransition("right");
      }, 5000);
    };

    const goTo = (nextIndex: number, direction: Direction) => {
      if (stateRef.current.isAnimating) return;
      if (nextIndex === stateRef.current.currentIndex) return;
      stopAutoPlay();
      stateRef.current.currentIndex = nextIndex;
      performTransition(direction);
      startAutoPlay();
    };

    const clickSlide = (direction: "prev" | "next") => {
      if (stateRef.current.isAnimating || exhibitionSlides.length <= 1) return;
      stopAutoPlay();
      if (direction === "next") {
        stateRef.current.currentIndex =
          (stateRef.current.currentIndex + 1) % exhibitionSlides.length;
        performTransition("right");
      } else {
        stateRef.current.currentIndex =
          (stateRef.current.currentIndex - 1 + exhibitionSlides.length) %
          exhibitionSlides.length;
        performTransition("left");
      }
      startAutoPlay();
    };

    const wrapper = wrapperRef.current;
    const onPrev = () => clickSlide("prev");
    const onNext = () => clickSlide("next");
    const onDot = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("[data-slide-index]") as HTMLElement | null;
      if (!button) return;
      const nextIndex = Number(button.dataset.slideIndex);
      if (Number.isNaN(nextIndex)) return;
      const direction: Direction =
        nextIndex > stateRef.current.currentIndex ? "right" : "left";
      goTo(nextIndex, direction);
    };

    wrapper?.querySelector("[data-carousel-prev]")?.addEventListener("click", onPrev);
    wrapper?.querySelector("[data-carousel-next]")?.addEventListener("click", onNext);
    wrapper?.querySelector("[data-carousel-dots]")?.addEventListener("click", onDot);

    stopAutoPlay();
    stateRef.current.currentIndex = 0;
    stateRef.current.isAnimating = false;
    setIndex(0);

    gsap.killTweensOf(carouselRoot.querySelectorAll(".img, img"));
    gsap.killTweensOf(cardRoot.querySelectorAll(".img, img"));
    carouselRoot.innerHTML = "";
    cardRoot.innerHTML = "";

    const initBig = createLayer(exhibitionSlides[0], {
      grayscale: true,
      opacity: "0.72",
    });
    initBig.container.style.zIndex = "1";
    initBig.mediaEl.setAttribute("fetchpriority", "high");
    carouselRoot.appendChild(initBig.container);

    const initCard = createLayer(exhibitionSlides[0]);
    initCard.container.style.zIndex = "1";
    cardRoot.appendChild(initCard.container);

    const metaTargets = [
      textEyebrowRef.current,
      textTitleRef.current,
      textSubtitleRef.current,
      textDateRef.current,
      cardLabelRef.current,
    ].filter(Boolean);

    if (metaTargets.length) {
      gsap.fromTo(
        metaTargets,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.08 },
      );
    }

    startAutoPlay();

    return () => {
      stopAutoPlay();
      wrapper?.querySelector("[data-carousel-prev]")?.removeEventListener("click", onPrev);
      wrapper?.querySelector("[data-carousel-next]")?.removeEventListener("click", onNext);
      wrapper?.querySelector("[data-carousel-dots]")?.removeEventListener("click", onDot);
      gsap.killTweensOf(carouselRoot.querySelectorAll(".img, img"));
      gsap.killTweensOf(cardRoot.querySelectorAll(".img, img"));
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="exhibition-hero relative min-h-[100svh] overflow-hidden bg-[#141414] text-white"
      aria-label="精選案例展覽"
    >
      {/* 背景輪播層固定在底層，避免轉場時蓋過格線 */}
      <div className="absolute inset-0 z-0 isolate">
        <div ref={carouselImagesRef} className="absolute inset-0 bg-[#141414]" />
        <div className="pointer-events-none absolute inset-0 bg-[#141414]/30" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-center px-5 mix-blend-difference md:px-10 lg:px-16">
        <p className="max-w-[12ch] font-sans text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase">
          Printing
        </p>
        <p className="mt-1 ml-[8%] max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,8.5vw,6.8rem)] leading-[0.92] font-semibold italic tracking-[-0.02em]">
          Visible
        </p>
        <p className="mt-1 max-w-[12ch] font-sans text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase">
          Ideas
        </p>
      </div>

      {/* 格線固定在圖片之上：輪播轉場時線條持續可見 */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "25% 33.3333%",
          backgroundPosition: "0 0",
        }}
      />

      <p className="pointer-events-none absolute top-[42%] right-5 z-[4] hidden max-w-[14rem] text-[10px] leading-relaxed tracking-[0.12em] text-white/70 uppercase md:right-10 md:block lg:right-16">
        Cheng Yi Printing — packaging, catalogs and custom print from Taichung
        Nantun.
      </p>

      {exhibitionSlides.length > 1 ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[6] flex items-center justify-between px-[3%] md:px-[5%]">
          <button
            type="button"
            data-carousel-prev
            aria-label="上一則"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:text-black md:h-[3.25rem] md:w-[3.25rem]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current md:h-5 md:w-5" aria-hidden>
              <path d="m3.3 12 8.7 8.7 1.5-1.5L6.3 12l7.2-7.2-1.5-1.5L3.3 12Z" />
            </svg>
          </button>
          <button
            type="button"
            data-carousel-next
            aria-label="下一則"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:text-black md:h-[3.25rem] md:w-[3.25rem]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current md:h-5 md:w-5" aria-hidden>
              <path d="M20.7 12l-8.7-8.7-1.5 1.5 7.2 7.2-7.2 7.2 1.5 1.5 8.7-8.7Z" />
            </svg>
          </button>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-[5] px-5 pb-8 md:px-10 md:pb-10 lg:px-16">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="min-w-0 overflow-hidden">
            <p
              ref={textEyebrowRef}
              className="text-[11px] tracking-[0.18em] text-[#ffa100] uppercase"
            >
              {exhibitionSlides[0].eyebrow}
            </p>
            <h2
              ref={textTitleRef}
              className="mt-2 text-[1.15rem] font-semibold tracking-tight md:text-[1.35rem]"
            >
              {exhibitionSlides[0].title}
            </h2>
            <p
              ref={textSubtitleRef}
              className="mt-1 text-[12px] text-white/65 md:text-[13px]"
            >
              {exhibitionSlides[0].subtitle}
            </p>
            <p
              ref={textDateRef}
              className="mt-2 text-[11px] tracking-wider text-white/45 tabular-nums"
            >
              {exhibitionSlides[0].date}
            </p>
          </div>

          <Link
            ref={cardLinkRef}
            href={exhibitionSlides[0].href}
            className="group relative mx-auto block w-[140px] shrink-0 overflow-hidden border border-white/25 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:-translate-y-1 md:w-[170px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <div ref={cardCarouselRef} className="absolute inset-0 bg-[#141414]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2.5 pt-8">
                <p
                  ref={cardLabelRef}
                  className="text-[9px] tracking-[0.14em] text-white/90 uppercase"
                >
                  {exhibitionSlides[0].cardLabel}
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-end justify-end gap-3">
            <div
              data-carousel-dots
              className="flex items-center gap-2"
              role="tablist"
              aria-label="案例分頁"
            >
              {exhibitionSlides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  data-slide-index={i}
                  aria-selected={i === index}
                  aria-label={`切換至 ${item.title}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === index
                      ? "bg-[#ffa100] ring-1 ring-[#ffa100] ring-offset-2 ring-offset-[#141414]"
                      : "bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
