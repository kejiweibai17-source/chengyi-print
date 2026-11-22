import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** 暫用品牌 icon：橘底 + 白紙層 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E85A12",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 78,
            height: 102,
            background: "rgba(255,255,255,0.35)",
            borderRadius: 8,
            transform: "translate(-10px, -6px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 78,
            height: 102,
            background: "#fff",
            borderRadius: 8,
            padding: "22px 16px",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 46,
              height: 8,
              background: "#E85A12",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 46,
              height: 8,
              background: "#E85A12",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 28,
              height: 8,
              background: "#E85A12",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
