const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://rakubuatwebsite.masraku.dev";

export default function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}`, priority: 1.0 },
    { url: `${BASE_URL}/services`, priority: 0.9 },
    { url: `${BASE_URL}/pricing`, priority: 0.9 },
    { url: `${BASE_URL}/contact`, priority: 0.8 },
    { url: `${BASE_URL}/faq`, priority: 0.7 },
    { url: `${BASE_URL}/track`, priority: 0.6 },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.priority,
  }));
}
