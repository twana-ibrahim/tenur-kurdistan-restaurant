import type { MetadataRoute } from "next";
import { restaurant } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${restaurant.name} — ${restaurant.address.locality.en}`,
    short_name: restaurant.name,
    description: restaurant.legalName,
    start_url: "/en",
    display: "standalone",
    background_color: "#0b0908",
    theme_color: "#0b0908",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
