import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/instructor/dashboard/", "/student/dashboard/"],
    },
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}
