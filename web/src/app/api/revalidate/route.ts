import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  tag?: string;
  path?: string;
};

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.tag && !body.path) {
    return NextResponse.json(
      { ok: false, error: "tag_or_path_required" },
      { status: 400 },
    );
  }

  if (body.tag) {
    revalidateTag(body.tag, "max");
  }
  if (body.path) {
    revalidatePath(body.path);
  }

  return NextResponse.json(
    {
      ok: true,
      revalidated: { tag: body.tag ?? null, path: body.path ?? null },
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-revalidate-secret",
    },
  });
}
