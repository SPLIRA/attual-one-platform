import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ATTUAL ONE",
    short_name: "ATTUAL ONE",
    description: "Diagnóstico comercial e gestão de visitas da TV Attual.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B2D4D",
    theme_color: "#0B2D4D",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
