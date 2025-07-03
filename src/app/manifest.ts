// import { getTranslations } from "next-intl/server";
// import type { MetadataRoute } from "next";

// export default async function manifest(): Promise<MetadataRoute.Manifest> {
//   const t = await getTranslations({ locale: "en", namespace: "Metadata" });

//   return {
//     background_color: "#FFFFFF",
//     description: t("description"),
//     display: "standalone",
//     icons: [
//       {
//         purpose: "maskable",
//         sizes: "192x192",
//         src: "/android-chrome-192x192.png",
//         type: "image/png",
//       },
//       {
//         purpose: "maskable",
//         sizes: "512x512",
//         src: "/icon-512x512.png",
//         type: "image/png",
//       },
//     ],
//     id: "/",
//     lang: "en",
//     name: t("title"),
//     orientation: "portrait",
//     scope: "/",
//     short_name: t("title"),
//     start_url: "/",
//     theme_color: "#FFFFFF",
//   };
// }

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#FFFFFF",
    description: "ぺらいちは、シンプルなメモサービスです。",
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/icon-512x512.png",
        type: "image/png",
      },
    ],
    id: "/",
    lang: "ja",
    name: "ぺらいち",
    orientation: "portrait",
    scope: "/",
    short_name: "ぺらいち",
    start_url: "/",
    theme_color: "#FFFFFF",
  };
}
