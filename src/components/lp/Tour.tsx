import { Expand } from "lucide-react";
import { Reveal, SectionTag, TOUR_EMBED_URL, TOUR_URL } from "./shared";

export function Tour() {
  return (
    <section id="tour-virtual" className="bg-brand py-20 text-brand-foreground lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <SectionTag tone="light">Tour Virtual</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Veja com seus próprios olhos.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-foreground/80">
            Percorra livremente as galerias, laboratórios e espaços do Discovery Centre em Halifax, em
            um tour 3D interativo. Explore no seu próprio ritmo e veja como a experiência acontece em
            um centro real, em operação.
          </p>
          <a
            href={TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-foreground px-6 py-4 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
          >
            <Expand className="size-4" aria-hidden="true" /> Abrir Tour em Tela Cheia
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="aspect-video overflow-hidden rounded-lg border border-brand-foreground/25 bg-brand-deep">
            <iframe
              src={TOUR_EMBED_URL}
              title="Tour virtual 3D do Discovery Centre em Halifax"
              className="h-full w-full"
              allow="xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
