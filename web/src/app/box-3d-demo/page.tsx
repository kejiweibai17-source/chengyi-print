import type { Metadata } from "next";
import { Suspense } from "react";
import { Box3DDemo } from "@/components/box3d/Box3DDemo";

export const metadata: Metadata = {
  title: "刀模產生器｜橙益",
  description: "包裝盒 3D 預覽：尺寸、材質、組裝與開合示意試作",
};

export default function Box3DDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-[#e8ecf1] text-[14px] text-[#5c6570]">
          載入 3D 預覽…
        </div>
      }
    >
      <Box3DDemo />
    </Suspense>
  );
}
