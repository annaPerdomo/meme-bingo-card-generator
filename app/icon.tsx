import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #7c4dff 0%, #d63369 100%)",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: "2px" }}>
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "1px",
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
