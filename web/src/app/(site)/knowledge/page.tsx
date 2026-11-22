import type { Metadata } from "next";
import { Suspense } from "react";
import { KnowledgeListing } from "@/components/KnowledgeListing";
import { getPublishedArticles } from "@/lib/knowledge";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "印刷相關知識",
  description: "完稿、上傳、包裝盒 3D 等印刷知識文章列表。",
  alternates: { canonical: absoluteUrl("/knowledge") },
};

type SearchParams = Promise<{
  sort?: string;
  tab?: string;
  q?: string;
}>;

async function KnowledgeContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sort = params.sort === "popular" ? "popular" : "latest";
  const tab = params.tab === "articles" ? "articles" : "home";
  const q = params.q?.trim() ?? "";

  const [articles, products] = await Promise.all([
    getPublishedArticles(),
    getPublishedProducts(),
  ]);

  const filtered = q
    ? articles.filter((article) => {
        const haystack = [
          article.title,
          article.summary,
          article.category,
          article.body,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q.toLowerCase());
      })
    : articles;

  return (
    <KnowledgeListing
      articles={filtered}
      products={products}
      sort={sort}
      tab={tab}
      query={q}
    />
  );
}

export default function KnowledgeIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] bg-white">
          <div className="h-[200px] animate-pulse bg-[#efefef] md:h-[280px]" />
          <div className="mx-auto grid max-w-[1100px] gap-10 px-4 py-8 lg:grid-cols-[240px_1fr]">
            <div className="hidden h-64 animate-pulse bg-[#f5f5f5] lg:block" />
            <div className="h-80 animate-pulse bg-[#f5f5f5]" />
          </div>
        </div>
      }
    >
      <KnowledgeContent searchParams={searchParams} />
    </Suspense>
  );
}
