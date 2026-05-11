import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #7c4dff 0%, #d63369 100%)",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: "8px" }}>
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    background:
                      row === 1 && col === 1
                        ? "#ffab40"
                        : "rgba(255,255,255,0.85)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
