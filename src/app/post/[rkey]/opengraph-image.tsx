import { ImageResponse } from "next/og";
import { getPost } from "@/lib/api";
import { loadGoogleFont } from "@/lib/font";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ rkey: string }>;
}) {
  const { rkey } = await params;
  const post = await getPost(rkey);

  const fontData = await loadGoogleFont("Kode+Mono:wght@400;700");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111827",
          padding: "40px",
          fontFamily: "Kode Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "#1f2937",
              borderBottom: "1px solid #1f2937",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "9999px",
                  backgroundColor: "#ef4444",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "9999px",
                  backgroundColor: "#fbbf24",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "9999px",
                  backgroundColor: "#34d399",
                }}
              />
              <span
                style={{
                  marginLeft: "12px",
                  color: "#9ca3af",
                  fontSize: "14px",
                }}
              >
                ~/posts/{rkey}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  color: "#9333ea",
                  fontWeight: 700,
                }}
              >
                {post.value.title}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#9ca3af",
                }}
              >
                {new Date(post.value.createdAt!).toLocaleDateString()}
              </div>
            </div>

            {/* Terminal prompt section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderTop: "1px solid #1f2937",
                paddingTop: "20px",
                color: "#9ca3af",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#9333ea" }}>$</span>
                <span>whoami</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>aparker.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kode Mono",
          data: fontData,
        },
      ],
    },
  );
}
