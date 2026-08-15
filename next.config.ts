import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Slugs de serviço descontinuados. Antes cada um deles multiplicava as 100
// cidades, gerando 1.500 URLs de texto idêntico. Agora existe uma página por
// cidade e estes quatro redirecionam 301 para ela, preservando qualquer
// autoridade que as URLs antigas tenham acumulado.
const LEGACY_SERVICE_SLUGS = [
  "crm-services",
  "lead-generation",
  "business-automation",
  "digital-marketing",
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return LEGACY_SERVICE_SLUGS.map((slug) => ({
      source: `/:locale(en|pt|es)/${slug}-:city-ma`,
      destination: "/:locale/marketing-agency-:city-ma",
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
