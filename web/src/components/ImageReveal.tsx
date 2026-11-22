"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  delay?: number;
  className?: string;
  imageClassName?: string;
  curtainClassName?: string;
  children?: ReactNode;
};

/** UFLOW 式：白幕上收 + 圖片放大模糊進場 */
export function ImageReveal({
  src,
  alt,
  sizes,
  delay = 0,
  className = "",
  imageClassName = "object-cover",
  curtainClassName = "bg-[#f7f7f7]",
  children,
}: Props) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const curtain = curtainRef.current;
    if (!media || !curtain) return;

    gsap.killTweensOf([media, curtain]);
    gsap.set(curtain, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(media, {
      scale: 1.28,
      filter: "blur(10px)",
      opacity: 0,
    });

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    tl.to(
      curtain,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.75,
        delay,
        ease: "power2.inOut",
      },
      0,
    );
    tl.to(
      media,
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 2,
        delay,
        ease: "power2.out",
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [src, delay]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName}
        />
        {children}
      </div>
      <div
        ref={curtainRef}
        className={`absolute inset-0 z-[1] ${curtainClassName}`}
        aria-hidden
      />
    </div>
  );
}
