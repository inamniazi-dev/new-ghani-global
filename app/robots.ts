import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/coming-soon",
    },
    sitemap: "https://ghani-global-new.vercel.app/sitemap.xml",
  };
}
