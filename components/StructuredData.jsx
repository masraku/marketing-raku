export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rakuuu - Jasa Pembuatan Website Profesional",
    image: "https://rakubuatwebsite.masraku.dev/opengraph-image",
    url: "https://rakubuatwebsite.masraku.dev",
    telephone: "+6282146150660",
    priceRange: "Rp2.000.000 - Rp15.000.000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "Jakarta Raya",
      addressCountry: "ID",
    },
    description:
      "Jasa pembuatan website profesional untuk UMKM dan Perusahaan. Bikin web company profile, toko online, web custom dengan SEO gratis.",
    sameAs: ["https://wa.me/6282146150660"],
    offers: {
      "@type": "Offer",
      url: "https://rakubuatwebsite.masraku.dev/pricing",
      priceCurrency: "IDR",
      price: "2000000",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
