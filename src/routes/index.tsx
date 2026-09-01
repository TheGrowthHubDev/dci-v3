import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/lp/Header";
import { Hero } from "@/components/lp/Hero";
import { WhatIs } from "@/components/lp/WhatIs";
import { History } from "@/components/lp/History";
import { Tour } from "@/components/lp/Tour";
import { Model } from "@/components/lp/Model";
import { Audience } from "@/components/lp/Audience";
import { Differentiators } from "@/components/lp/Differentiators";
import { Brazil } from "@/components/lp/Brazil";
import { FinalCta } from "@/components/lp/FinalCta";
import { Footer } from "@/components/lp/Footer";

const TITLE = "Discovery Centre International no Brasil | Centros de Ciência";
const DESCRIPTION =
  "Estrutura com 40 anos de operação no Canadá para criar centros interativos de ciência no Brasil: design, construção, operação e mobilização de capital.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Discovery Centre International",
          description: DESCRIPTION,
          email: "info@dcinternational.ca",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1215 Lower Water Street",
            addressLocality: "Halifax",
            addressRegion: "Nova Scotia",
            addressCountry: "CA",
          },
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <History />
        <Tour />
        <Model />
        <Audience />
        <Differentiators />
        <Brazil />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
