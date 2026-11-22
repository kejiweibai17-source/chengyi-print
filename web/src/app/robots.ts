import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
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
        disallow: ["/member", "/member/", "/cart", "/checkout", "/favorites", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/member", "/member/", "/cart", "/checkout", "/favorites", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/member", "/member/", "/cart", "/checkout", "/favorites", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/member", "/member/", "/cart", "/checkout", "/favorites", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
