const WEB_ORIGIN =
  import.meta.env.VITE_WEB_ORIGIN?.replace(/\/$/, "") || "http://localhost:3000";
const REVALIDATE_SECRET = import.meta.env.VITE_REVALIDATE_SECRET || "";

/** 發佈／更新知識文章後，通知前台失效 ISR 快取（失敗不阻擋後台操作） */
export async function revalidateSite(options: {
  tag?: string;
  path?: string;
}) {
  if (!REVALIDATE_SECRET) {
    console.info(
      "[revalidateSite] skipped: set VITE_REVALIDATE_SECRET to enable",
    );
    return;
  }

  try {
    await fetch(`${WEB_ORIGIN}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": REVALIDATE_SECRET,
      },
      body: JSON.stringify(options),
    });
  } catch (error) {
    console.warn("[revalidateSite] failed", error);
  }
}
