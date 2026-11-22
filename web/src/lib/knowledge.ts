import { cacheLife, cacheTag } from "next/cache";
import {
  knowledgeArticles,
  type KnowledgeArticle,
} from "@/data/knowledge";

export async function getPublishedArticles(): Promise<KnowledgeArticle[]> {
  "use cache";
  cacheTag("knowledge");
  cacheLife("hours");

  return knowledgeArticles
    .filter((article) => article.status === "上架")
    .sort((a, b) => a.sort - b.sort || b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticleBySlug(
  slug: string,
): Promise<KnowledgeArticle | null> {
  "use cache";
  cacheTag("knowledge");
  cacheTag(`knowledge:${slug}`);
  cacheLife("hours");

  return (
    knowledgeArticles.find(
      (article) => article.slug === slug && article.status === "上架",
    ) ?? null
  );
}
