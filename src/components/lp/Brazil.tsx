import { ArrowRight } from "lucide-react";
import { Reveal, SCHEDULE_URL, SectionNumber, SectionTag, WordReveal, useParallax } from "./shared";

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
                <img
                  src="/images/dci/brazil-contexto-institucional.jpg"
                  alt="Apresentação institucional em evento do Discovery Centre"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
