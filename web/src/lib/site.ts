/**
 * 正式網域。Vercel 請設 NEXT_PUBLIC_SITE_URL=https://www.chengyi-print.com.tw
 */
export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.chengyi-print.com.tw"
  );
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * 是否允許搜尋引擎收錄。
 * 建置中／養網址：不設或設為 false → 全站 noindex（人可開連結，搜尋不出）。
 * 上線要開始 index：Vercel 設 NEXT_PUBLIC_ALLOW_INDEXING=true 並重新部署。
 */
export function isIndexingAllowed() {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function siteRobotsMeta() {
  if (isIndexingAllowed()) {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    } as const;
  }
  return {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  } as const;
}
