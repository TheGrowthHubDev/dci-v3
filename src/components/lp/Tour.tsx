import { Expand } from "lucide-react";
import { BrandOrbit, Reveal, SectionNumber, SectionTag, TOUR_EMBED_URL, TOUR_URL, WordReveal } from "./shared";

export function Tour() {
  return (
    <section
      id="tour-virtual"
      className="relative isolate overflow-hidden bg-brand-deep py-24 text-brand-foreground lg:py-36"
    >
      {/* Fundo: foto da galeria desfocada + aurora + grade */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/dci/tour-poster.jpg"
          alt=""
          className="h-full w-full scale-110 object-cover opacity-30 blur-md"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/85 to-brand-deep" />
        <div className="aurora" />
        <div className="grid-lines absolute inset-0 text-white opacity-50" />
      </div>

      <div className="pointer-events-none absolute -left-8 top-8 select-none" aria-hidden="true">
        <SectionNumber n="03" tone="light" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Cabeçalho centralizado */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade">
            <SectionTag tone="light">Tour Virtual</SectionTag>
          </Reveal>
          <WordReveal
            text="Veja com seus próprios olhos."
            className="text-display mt-6 text-white"
          />
          <Reveal variant="blur" delay={300} className="mt-8">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Percorra livremente as galerias, laboratórios e espaços do Discovery Centre em Halifax, em
              um tour 3D interativo. Explore no seu próprio ritmo e veja como a experiência acontece em
              um centro real, em operação.
            </p>
          </Reveal>
        </div>

        {/* Palco do tour */}
        <Reveal variant="scale" delay={200} className="relative mt-16">
          <BrandOrbit className="absolute -right-32 -top-32 hidden w-[520px] opacity-70 lg:block" />
          <BrandOrbit className="absolute -bottom-40 -left-40 hidden w-[520px] opacity-50 lg:block" />

          <div className="glow-brand relative rounded-3xl bg-white/5 p-2 backdrop-blur-sm sm:p-3">
            {/* Barra de janela */}
            <div className="flex items-center gap-2 px-3 py-2.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-brand-light" />
              <span className="ml-3 h-1.5 w-40 rounded-full bg-white/10" />
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-brand-deep">
              <iframe
                src={TOUR_EMBED_URL}
                title="Tour virtual 3D do Discovery Centre em Halifax"
                className="h-full w-full"
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={350} className="mt-10 flex justify-center">
          <a
            href={TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand shadow-[0_20px_50px_-20px_rgba(255,255,255,0.5)]"
          >
            <Expand className="size-4" aria-hidden="true" /> Abrir Tour em Tela Cheia
          </a>
        </Reveal>
      </div>
    </section>
  );
}
