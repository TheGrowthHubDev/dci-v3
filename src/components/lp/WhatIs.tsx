import { Hand, FlaskConical, Hammer, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionNumber, SectionTag, WordReveal, useParallax } from "./shared";

const STEAM = [
  { icon: Hand, label: "Tocar" },
  { icon: FlaskConical, label: "Testar" },
  { icon: Hammer, label: "Construir" },
  { icon: Lightbulb, label: "Experimentar" },
];

const ROLES = [
  "infraestrutura educacional",
  "espaço de convivência",
  "atração para famílias e visitantes",
  "recurso para escolas",
  "ponto de conexão entre empresas, universidades e comunidade",
];

/**
 * Colagem editorial: três fotos sobrepostas com parallax leve entre camadas.
 */
function PhotoCollage() {
  const back = useParallax<HTMLDivElement>(0.06);
  const front = useParallax<HTMLDivElement>(-0.05);

  return (
    <div className="relative mx-auto mb-8 aspect-[4/5] w-full max-w-[520px] lg:mx-0">
      <div className="dot-grid absolute -inset-10 text-brand" aria-hidden="true" />

      <div
        ref={back}
        className="photo-premium absolute left-0 top-0 w-[72%] shadow-2xl"
        style={{ transform: "translateY(var(--py, 0px))" }}
      >
        <img
          src="/images/dci/whatis-principal.jpg"
          alt="Criança com luvas coloridas segurando uma bola flutuante durante demonstração científica no Discovery Centre"
          className="aspect-[4/5] w-full object-cover"
          style={{ objectPosition: "58% center" }}
          loading="lazy"
        />
      </div>

      <div
        ref={front}
        className="photo-premium absolute bottom-[8%] right-0 w-[58%] shadow-2xl ring-8 ring-background"
        style={{ transform: "translateY(var(--py, 0px))" }}
      >
        <img
          src="/images/dci/whatis-familias.jpg"
          alt="Jovens e famílias em experiência interativa"
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="photo-premium absolute -bottom-6 left-[10%] w-[42%] shadow-2xl ring-8 ring-background float-slow">
        <img
          src="/images/dci/whatis-maker.jpg"
          alt="Crianças montando circuitos em um espaço maker"
          className="aspect-square w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/**
 * Manchas coloridas atrás do diagrama STEAM: paleta DCI + dois acentos quentes (amarelo/coral)
 * para o tom lúdico de centro de ciência, em formas orgânicas que "respiram".
 */
const STEAM_BLOBS: Array<{ className: string; color: string; delay: string }> = [
  { className: "-left-[14%] -top-[10%] size-[46%]", color: "var(--brand-light)", delay: "0s" },
  { className: "-right-[16%] top-[4%] size-[40%]", color: "#f9c22e", delay: "-4s" },
  { className: "-right-[10%] -bottom-[12%] size-[44%]", color: "var(--brand-teal)", delay: "-8s" },
  { className: "-left-[12%] bottom-[2%] size-[36%]", color: "#e94d7a", delay: "-12s" },
  { className: "left-[28%] -top-[16%] size-[26%]", color: "var(--brand)", delay: "-6s" },
];

function SteamBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {STEAM_BLOBS.map((b, i) => (
        <span
          key={i}
          className={cn("blob", b.className)}
          style={{ backgroundColor: b.color, opacity: 0.78, animationDelay: b.delay }}
        />
      ))}
      {/* Suaviza o centro para o anel e os cards continuarem legíveis */}
      <div className="absolute inset-[12%] rounded-full bg-background/55 blur-2xl" />
    </div>
  );
}

/**
 * STEAM em órbita: selo central com os quatro verbos girando em anel (CSS puro).
 */
function SteamOrbit() {
  return (
    <div className="mx-auto w-full max-w-[380px] px-6 py-10 sm:px-8 sm:py-12">
      <div className="relative aspect-square w-full">
        <SteamBlobs />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
          <circle cx="200" cy="200" r="186" stroke="var(--color-border)" strokeDasharray="3 8" className="spin-slow" />
          <circle cx="200" cy="200" r="130" stroke="var(--color-border)" />
          <circle cx="200" cy="200" r="130" stroke="url(#steam-arc)" strokeWidth="2" strokeDasharray="220 600" strokeLinecap="round" className="spin-slow-reverse" />
          <defs>
            <linearGradient id="steam-arc" x1="0" x2="1">
              <stop offset="0" stopColor="var(--brand-light)" />
              <stop offset="1" stopColor="var(--brand-teal)" />
            </linearGradient>
          </defs>
        </svg>
  
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="glow-brand rounded-full bg-brand px-8 py-4 font-display text-xl font-extrabold tracking-[0.25em] text-brand-foreground sm:text-2xl">
            STEAM
          </div>
        </div>
  
        {STEAM.map(({ icon: Icon, label }, i) => {
          const angle = -90 + i * 90;
          const rad = (angle * Math.PI) / 180;
          const r = 46.5;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={cn(
                  "card-premium flex flex-col items-center gap-1.5 rounded-2xl px-4 py-3 text-center shadow-lg",
                  "float-slow",
                )}
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <Icon className="size-5 text-brand-medium" aria-hidden="true" />
                <span className="font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WhatIs() {
  return (
    <section id="quem-somos" className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-24 top-10 select-none lg:left-0" aria-hidden="true">
        <SectionNumber n="01" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Abertura em duas colunas: statement + colagem */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <SectionTag>O projeto</SectionTag>
            </Reveal>
            <WordReveal
              text="Ciência não precisa ficar restrita à sala de aula."
              className="text-display-md mt-6 text-brand"
              stagger={55}
            />
            <Reveal variant="blur" delay={350} className="mt-8">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Um centro de ciência do DCI é um ambiente de educação informal onde crianças, jovens,
                famílias e escolas aprendem por meio da experiência.
              </p>
            </Reveal>
            <Reveal delay={450} className="mt-8">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                O Discovery Centre opera essa abordagem há quatro décadas no Canadá. Em 2021, essa
                experiência deu origem ao{" "}
                <strong className="text-brand">Discovery Centre International</strong>, o braço
                responsável por estruturar a expansão do modelo para novos países. Agora, o Brasil faz
                parte dessa próxima etapa.
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={200}>
            <PhotoCollage />
          </Reveal>
        </div>

        {/* Segundo bloco: STEAM em órbita + papéis */}
        <div className="mt-28 grid items-center gap-14 lg:mt-40 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal variant="scale">
            <SteamOrbit />
            <p className="mx-auto mt-10 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
              É o princípio <strong className="text-brand">hands-on, minds-on</strong>: participação
              ativa para transformar curiosidade em aprendizado.
            </p>
          </Reveal>

          <div>
            <Reveal variant="fade">
              <p className="eyebrow text-brand-grey">
                <span className="h-px w-8 bg-brand-teal" aria-hidden="true" />
                Centros de ciência podem atuar como
              </p>
            </Reveal>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {ROLES.map((role, i) => (
                <Reveal key={role} as="li" variant="left" delay={i * 80}>
                  <div className="group flex items-baseline gap-6 py-5 transition-colors hover:bg-surface sm:px-3">
                    <span
                      className="font-display text-sm font-bold tabular-nums text-brand-light transition-colors group-hover:text-brand-teal"
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <span className="font-display text-lg font-semibold text-foreground transition-transform duration-500 group-hover:translate-x-2 sm:text-xl lg:text-2xl">
                      {role}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal variant="fade" delay={400} className="mt-8">
              <p className="text-lg text-muted-foreground">
                Não substituem a educação formal.{" "}
                <strong className="text-brand">Ampliam o que ela consegue oferecer.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
