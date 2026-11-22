import { cacheLife, cacheTag } from "next/cache";
import { products, type ProductRecord } from "@/data/products";

export async function getPublishedProducts(): Promise<ProductRecord[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  return products.filter((product) => product.status === "上架");
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductRecord | null> {
  "use cache";
  cacheTag("products");
  cacheTag(`products:${slug}`);
  cacheLife("hours");

  return (
    products.find(
      (product) => product.slug === slug && product.status === "上架",
    ) ?? null
  );
}
