import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getArticleBySlug,
  getPublishedArticles,
} from "@/lib/knowledge";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "文章不存在" };
  }
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: absoluteUrl(`/knowledge/${article.slug}`) },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: article.coverImage, alt: article.coverAlt }],
    },
  };
}

async function ArticleBody({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "橙益印刷事業有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "橙益印刷事業有限公司",
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/knowledge/${article.slug}`),
  };

  const paragraphs = article.body
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      <JsonLd data={articleLd} />
      <article>
        <header className="border-b border-line bg-ink text-paper">
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
            <Link
              href="/knowledge"
              className="text-sm text-white/60 hover:text-brand"
            >
              ← 印刷相關知識
            </Link>
            <p className="mt-4 text-xs tracking-[0.28em] text-brand uppercase">
              {article.category}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display-tc)] text-3xl font-semibold leading-tight md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-white/65">{article.summary}</p>
            <p className="mt-6 text-xs text-white/45">
              發布 {article.publishedAt}
              {article.updatedAt !== article.publishedAt
                ? ` · 更新 ${article.updatedAt}`
                : ""}
            </p>
          </div>
        </header>

        <div className="relative mx-auto mt-0 aspect-[21/9] max-w-5xl overflow-hidden bg-paper-deep md:mt-8 md:rounded-none">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-5 px-5 py-12 text-sm leading-relaxed text-ink-soft md:px-8 md:py-16 md:text-base">
          {paragraphs.map((block) => {
            if (/^\d+\./.test(block) || block.startsWith("- ")) {
              const lines = block.split("\n").filter(Boolean);
              return (
                <ul key={block.slice(0, 24)} className="list-disc space-y-2 pl-5">
                  {lines.map((line) => (
                    <li key={line}>{line.replace(/^[-\d.]+\s*/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={block.slice(0, 24)}>{block}</p>;
          })}
        </div>
      </article>
    </>
  );
}

export default function KnowledgeArticlePage(props: Props) {
  return (
    <div className="bg-paper">
      <Suspense
        fallback={
          <div className="mx-auto max-w-3xl px-5 py-16 text-sm text-mute md:px-8">
            載入文章…
          </div>
        }
      >
        <ArticleBody {...props} />
      </Suspense>
    </div>
  );
}
