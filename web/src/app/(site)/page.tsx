import { AboutTeaser } from "@/components/AboutTeaser";
import { ExhibitionHero } from "@/components/ExhibitionHero";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { HeroStrip } from "@/components/HeroStrip";
import { NewsSection } from "@/components/NewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

export default function HomePage() {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "橙益印刷",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/products")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "橙益印刷事業有限公司",
    alternateName: "橙益印刷",
    url: absoluteUrl("/"),
    description:
      "台中南屯印刷與包裝設計——包裝盒、型錄、名片與客製印刷；線上下單、人工檢稿、包裝盒 3D 詢價。",
    areaServed: "TW",
  };

  return (
    <>
      <JsonLd data={[websiteLd, orgLd]} />
      <HeroStrip />
      <ServicesSection />
      <NewsSection />
      <FeaturedCarousel />
      <ExhibitionHero />
      <AboutTeaser />
    </>
  );
}
