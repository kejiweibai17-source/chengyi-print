import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingAllowed } from "@/lib/site";

/**
 * 建置中：Disallow 全站 + 不宣告 sitemap（避免被發現收錄清單）。
 * 開放 index：恢復 allow + sitemap。
 *
 * 並搭配 layout 的 noindex 與 next.config 的 X-Robots-Tag，三重保險。
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/member",
          "/member/",
          "/cart",
          "/checkout",
          "/favorites",
          "/demo",
          "/demo/",
          "/api/",
          "/box-3d-demo",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/member",
          "/member/",
          "/cart",
          "/checkout",
          "/favorites",
          "/api/",
        ],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: [
          "/member",
          "/member/",
          "/cart",
          "/checkout",
          "/favorites",
          "/api/",
        ],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: [
          "/member",
          "/member/",
          "/cart",
          "/checkout",
          "/favorites",
          "/api/",
        ],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [
          "/member",
          "/member/",
          "/cart",
          "/checkout",
          "/favorites",
          "/api/",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
