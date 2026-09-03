import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, CalendarClock, Globe2 } from "lucide-react";
import { Reveal, SCHEDULE_URL, SectionTag } from "./shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const PROOFS = [
  { icon: CalendarClock, text: "40 anos de operação" },
  { icon: Sparkles, text: "Educação STEAM baseada em experiência" },
  { icon: Globe2, text: "DCI criado em 2021 para expansão internacional" },
];

/**
 * Fotos do Discovery Centre em Halifax (Canadá), centro de referência do modelo DCI.
 * Serão substituídas por fotos do centro brasileiro assim que estiverem disponíveis.
 */
const HERO_PHOTOS = [
  "/images/dci/hero-carousel-1.jpg",
  "/images/dci/hero-carousel-2.jpg",
  "/images/dci/hero-carousel-3.jpg",
  "/images/dci/hero-carousel-4.jpg",
  "/images/dci/hero-carousel-5.jpg",
];

function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="group">
      <CarouselContent>
        {HERO_PHOTOS.map((src, i) => (
          <CarouselItem key={src}>
            <div className="overflow-hidden rounded-lg border border-brand-foreground/25 bg-brand/40">
              <img
                src={src}
                alt="Público interagindo com experiências do Discovery Centre"
                className="aspect-[5/4] w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 border-brand-foreground/40 bg-brand-deep/60 text-brand-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-brand-deep" />
      <CarouselNext className="right-3 border-brand-foreground/40 bg-brand-deep/60 text-brand-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-brand-deep" />
    </Carousel>
  );
}

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-brand-deep pt-28 text-brand-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 15% 10%, var(--brand-medium), transparent 70%), radial-gradient(50% 50% at 90% 25%, var(--brand-light), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <Reveal>
          <SectionTag tone="light">Discovery Centre International no Brasil</SectionTag>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Leve para a sua região um centro interativo de ciência
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-foreground/80 sm:text-lg">
            O Discovery Centre International traz ao Brasil uma estrutura desenvolvida a partir de 40
            anos de operação no Canadá para orientar a criação de centros de ciência interativos, da
            concepção à operação.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-md bg-brand-foreground px-6 py-4 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
            >
              Conhecer o modelo DCI
            </a>
            <a
              href={SCHEDULE_URL}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-foreground/40 px-6 py-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-foreground/10"
            >
              Agendar uma Conversa <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <HeroCarousel />
        </Reveal>
      </div>

      <div className="relative border-t border-brand-foreground/15 bg-brand/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 lg:px-8">
          {PROOFS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-brand-deep">
        <p className="mx-auto max-w-7xl px-5 pb-10 pt-6 text-sm text-brand-foreground/75 lg:px-8">
          Uma estrutura para quem quer{" "}
          <strong className="font-semibold text-brand-foreground">
            operar, viabilizar ou apoiar institucionalmente
          </strong>{" "}
          um centro de ciência em sua região.
        </p>
      </div>
    </section>
  );
}
