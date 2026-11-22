import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { getSiteUrl, siteRobotsMeta } from "@/lib/site";
import "./globals.css";

/** 對齊參考站 nav：Inter + 系統 Gothic（PingFang / Hiragino） */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** 跨平台後備：無 PingFang 時用 Noto Sans TC */
const sans = Noto_Sans_TC({
  variable: "--font-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/** 品牌字標後備：無 Hiragino Mincho / 宋體時用 Noto Serif TC */
const display = Noto_Serif_TC({
  variable: "--font-display-tc",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "橙益印刷｜印刷・包裝・設計",
    template: "%s｜橙益印刷",
  },
  description:
    "橙益印刷事業——包裝盒、型錄與客製印刷。線上下單、人工檢稿、包裝盒 3D 詢價。",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "橙益印刷",
    title: "橙益印刷｜印刷・包裝・設計",
    description:
      "橙益印刷事業——包裝盒、型錄與客製印刷。線上下單、人工檢稿、包裝盒 3D 詢價。",
  },
  // 建置中預設 noindex；設 NEXT_PUBLIC_ALLOW_INDEXING=true 後才開放
  robots: siteRobotsMeta(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${inter.variable} ${sans.variable} ${display.variable}`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
