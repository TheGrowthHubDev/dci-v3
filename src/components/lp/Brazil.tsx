import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SCHEDULE_URL, SectionNumber, SectionTag, WordReveal, useParallax } from "./shared";

/** Seis momentos distintos de crianças no Discovery Centre (fotos reais). */
const KIDS_PHOTOS: { src: string; position: string }[] = [
  { src: "/images/dci/brazil-kids-1.jpg", position: "65% 50%" },
  { src: "/images/dci/brazil-kids-2.jpg", position: "70% 50%" },
  { src: "/images/dci/brazil-kids-3.jpg", position: "50% 50%" },
  { src: "/images/dci/brazil-kids-4.jpg", position: "60% 50%" },
  { src: "/images/dci/brazil-kids-5.jpg", position: "45% 50%" },
  { src: "/images/dci/brazil-kids-6.jpg", position: "50% 50%" },
];

const KIDS_SLIDE_MS = 4500;

/**
 * Troca automática de fotos com crossfade + Ken Burns (mesma linguagem do Hero).
 * Sem setas nem indicadores: apenas rotação contínua.
 */
function KidsRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % KIDS_PHOTOS.length), KIDS_SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]"
      role="img"
      aria-label="Crianças explorando experiências científicas no Discovery Centre"
    >
      {KIDS_PHOTOS.map((photo, i) => {
        const isActive = i === index;
        return (
          <div
            key={photo.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          >
            <img
              src={photo.src}
              alt=""
              className={cn("h-full w-full object-cover", isActive && "kenburns")}
              style={{ objectPosition: photo.position }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Grafismo abstrato Canadá → Brasil: arco de conexão entre dois pontos (SVG animado).
 * Deliberadamente abstrato: não é um mapa.
 */
function ConnectionArc() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-auto w-full text-brand"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arc-grad" x1="0" x2="1">
          <stop offset="0" stopColor="var(--brand-light)" />
          <stop offset="1" stopColor="var(--brand-teal)" />
        </linearGradient>
      </defs>
      <path
        d="M60 60 C 220 -20, 420 40, 540 260"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
      />
      <path
        d="M60 60 C 220 -20, 420 40, 540 260"
        stroke="url(#arc-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className="line-draw"
      />
      <circle cx="60" cy="60" r="7" fill="var(--brand)" />
      <circle cx="60" cy="60" r="16" stroke="var(--brand)" strokeOpacity="0.25" />
      <circle cx="540" cy="260" r="9" fill="var(--brand-teal)" />
      <circle cx="540" cy="260" r="22" stroke="var(--brand-teal)" strokeOpacity="0.3" className="float-slow" />
      <circle cx="540" cy="260" r="36" stroke="var(--brand-teal)" strokeOpacity="0.15" />
    </svg>
  );
}

export function Brazil() {
  const photo = useParallax<HTMLDivElement>(-0.06);

  return (
    <section id="brasil" className="relative overflow-hidden bg-surface py-24 lg:py-36">
      <div className="pointer-events-none absolute -right-10 top-8 select-none" aria-hidden="true">
        <SectionNumber n="07" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <SectionTag>Discovery Centre International | Brasil</SectionTag>
            </Reveal>
            <WordReveal
              text="O Brasil faz parte da próxima fase de expansão do DCI."
              className="text-display-md mt-6 text-brand"
              stagger={45}
            />
            <Reveal variant="blur" delay={350} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>A presença do DCI no país começa pela construção das relações certas.</p>
              <p>
                Estamos abrindo conversas com organizações, famílias, operadores e instituições que
                enxergam ciência e educação como parte de uma estratégia de desenvolvimento de longo
                prazo.
              </p>
            </Reveal>
            <Reveal delay={450} className="mt-8">
              <p className="glass-light rounded-2xl border-l-4 border-l-brand-medium p-6 text-sm leading-relaxed text-foreground lg:text-base">
                A conversa inicial serve para entender contexto, objetivos e aderência ao modelo antes de
                qualquer discussão de projeto.
              </p>
            </Reveal>
            <Reveal delay={550} className="mt-10">
              <a
                href={SCHEDULE_URL}
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-brand-foreground shadow-[0_20px_50px_-20px_var(--brand)]"
              >
                Agendar uma Conversa{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal variant="fade" className="pointer-events-none absolute -inset-x-10 -top-24 hidden lg:block">
              <ConnectionArc />
            </Reveal>
            <Reveal variant="right" delay={200}>
              <div
                ref={photo}
                className="photo-premium relative shadow-2xl"
                style={{ transform: "translateY(var(--py, 0px))" }}
              >
                <KidsRotator />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
