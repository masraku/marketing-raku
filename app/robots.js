const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://rakubuatwebsite.masraku.dev";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
