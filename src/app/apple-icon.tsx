import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS ignores SVG favicons, so the home-screen icon is rendered to PNG at build
 * time. Same mark as icon.svg: the mouth of the oven.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "#0b0908",
        }}
      >
        <div
          style={{
            width: 118,
            height: 88,
            marginBottom: 34,
            borderTopLeftRadius: 59,
            borderTopRightRadius: 59,
            background: "linear-gradient(180deg, #ffc98a 0%, #e0762c 45%, #8a4718 100%)",
          }}
        />
      </div>
    ),
    size
  );
}
