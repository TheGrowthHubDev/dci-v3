import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Sparkles, CalendarClock, Globe2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandOrbit, Reveal, SCHEDULE_URL, SectionTag, WordReveal } from "./shared";

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
  "/images/dci/hero-carousel-6.jpg", // fachada do Discovery Centre em Halifax (letreiro DISCOVERY)
  "/images/dci/hero-carousel-2.jpg",
  "/images/dci/hero-carousel-3.jpg",
  "/images/dci/hero-carousel-4.jpg",
  "/images/dci/hero-carousel-5.jpg",
];

const SLIDE_MS = 6000;

/**
 * Fundo cinematográfico: fotos em tela cheia com crossfade + Ken Burns lento.
 * Implementado manualmente (sem plugin) com state + CSS.
 */
function HeroBackdrop({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_PHOTOS.map((src, i) => {
        const isActive = i === index;
        return (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            <img
              src={src}
              alt=""
              className={cn("h-full w-full object-cover", isActive && "kenburns")}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        );
      })}
      {/* Véus: profundidade + legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/95 via-brand-deep/70 to-brand-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-brand-deep/40" />
      <div className="absolute inset-0 mix-blend-multiply" style={{ background: "var(--brand-deep)", opacity: 0.25 }} />
    </div>
  );
}

function SlideDots({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Fotos em destaque">
      {HERO_PHOTOS.map((src, i) => (
        <button
          key={src}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Foto ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "relative h-1 overflow-hidden rounded-full bg-white/25 transition-all duration-500",
            i === index ? "w-12" : "w-5 hover:bg-white/50",
          )}
        >
          {i === index && (
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-brand-light"
              style={{ animation: `hero-progress ${SLIDE_MS}ms linear forwards` } as CSSProperties}
            />
          )}
        </button>
      ))}
    </div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_PHOTOS.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-deep text-brand-foreground"
    >
      <HeroBackdrop index={index} />

      {/* Grafismo orbital de marca */}
      <BrandOrbit className="absolute -right-[12%] top-[8%] hidden w-[58vw] max-w-[820px] opacity-60 lg:block" />

      {/* Linhas técnicas (blueprint) */}
      <div className="grid-lines pointer-events-none absolute inset-0 text-white opacity-60" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="max-w-4xl">
          <Reveal variant="fade">
            <SectionTag tone="light">Discovery Centre International no Brasil</SectionTag>
          </Reveal>

          <WordReveal
            as="h1"
            text="Leve para a sua região um centro interativo de ciência"
            className="text-display mt-8 text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            delay={150}
            stagger={70}
          />

          <Reveal variant="blur" delay={700} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              O Discovery Centre International traz ao Brasil uma estrutura desenvolvida a partir de 40
              anos de operação no Canadá para orientar a criação de centros de ciência interativos, da
              concepção à operação.
            </p>
          </Reveal>

          <Reveal variant="up" delay={900} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#como-funciona"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand shadow-[0_20px_50px_-20px_rgba(255,255,255,0.6)]"
            >
              Conhecer o modelo DCI
            </a>
            <a
              href={SCHEDULE_URL}
              className="glass btn-shine group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              Agendar uma Conversa{" "}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        {/* Rodapé do hero: provas + controle do slideshow */}
        <Reveal variant="fade" delay={1200} className="mt-16 lg:mt-24">
          <div className="flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
              {PROOFS.map(({ icon: Icon, text }, i) => (
                <li
                  key={text}
                  className="glass flex items-center gap-3 rounded-full py-2.5 pl-3 pr-5"
                  style={{ animation: `fade-up 0.8s ${1300 + i * 120}ms both cubic-bezier(0.16,1,0.3,1)` }}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-light/20 text-brand-light">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-white">{text}</span>
                </li>
              ))}
            </ul>
            <SlideDots index={index} onSelect={setIndex} />
          </div>
        </Reveal>
      </div>

      {/* Faixa de fecho: frase de posicionamento + indicador de scroll */}
      <div className="relative border-t border-white/10 bg-brand-deep/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 lg:px-8">
          <p className="max-w-3xl text-sm text-white/75 lg:text-base">
            Uma estrutura para quem quer{" "}
            <strong className="font-semibold text-white">
              operar, viabilizar ou apoiar institucionalmente
            </strong>{" "}
            um centro de ciência em sua região.
          </p>
          <a
            href="#quem-somos"
            aria-label="Ir para a próxima seção"
            className="hidden shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white md:inline-flex"
          >
            <span className="scroll-hint block h-10 w-px bg-white/15 text-brand-light" aria-hidden="true" />
            <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
