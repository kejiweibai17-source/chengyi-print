import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/knowledge";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/about/intro",
    "/about/process",
    "/about/works",
    "/services",
    "/services/print",
    "/services/design",
    "/services/packaging-3d",
    "/products",
    "/location",
    "/faq",
    "/knowledge",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [articles, products] = await Promise.all([
    getPublishedArticles(),
    getPublishedProducts(),
  ]);

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/knowledge/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...productRoutes];
}
