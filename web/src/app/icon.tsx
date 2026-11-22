import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** 暫用品牌 favicon：橘底 + 白紙線條 */
export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 14,
            height: 18,
            background: "#fff",
            borderRadius: 2,
            padding: "4px 3px",
            gap: 2,
          }}
        >
          <div
            style={{
              width: 8,
              height: 1.5,
              background: "#E85A12",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 8,
              height: 1.5,
              background: "#E85A12",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 5,
              height: 1.5,
              background: "#E85A12",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
