import { Building2, GraduationCap, Settings2, HandCoins, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionNumber, SectionTag, WordReveal, useMouseGlow } from "./shared";

const STEPS = [
  {
    icon: GraduationCap,
    title: "Design",
    text: "Planejamento da experiência, galerias, fluxos, conteúdos e aplicação da metodologia educacional.",
  },
  {
    icon: Building2,
    title: "Build",
    text: "Construção do espaço físico e fabricação das exposições, sob os mesmos padrões de qualidade usados em Halifax.",
  },
  {
    icon: Settings2,
    title: "Operate",
    text: "Métodos operacionais, treinamento, programação e padrões de qualidade replicáveis, para que o centro funcione com consistência em diferentes territórios.",
  },
  {
    icon: HandCoins,
    title: "Finance",
    text: "Estruturação da estratégia necessária para mobilizar parceiros e apoiar a viabilização do projeto: o Capital Campaign Module do DCI.",
    seal: "Único no setor",
  },
];

const TURNKEY_NODES = ["Arquitetura", "Experiência", "Educação", "Operação"];
const PARTNERS = ["Empresas", "Famílias", "Fundações", "Instituições"];

function StepCard({
  icon: Icon,
  index,
  title,
  text,
  seal,
  highlight = false,
  className,
}: {
  icon: LucideIcon;
  index: number;
  title: string;
  text: string;
  seal?: string;
  highlight?: boolean;
  className?: string;
}) {
  const ref = useMouseGlow<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        highlight ? "card-premium-dark bg-brand-deep text-white" : "card-premium",
        "group relative flex h-full flex-col overflow-hidden p-8 lg:p-10",
        className,
      )}
    >
      {highlight && (
        <>
          <div className="aurora opacity-70" aria-hidden="true" />
          <div className="grid-lines absolute inset-0 text-white opacity-40" aria-hidden="true" />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "font-display text-6xl font-extrabold leading-none tracking-tighter lg:text-7xl",
            highlight ? "text-outline-light" : "text-outline",
          )}
          aria-hidden="true"
        >
          {index + 1}.
        </span>
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
            highlight ? "bg-brand-teal text-white" : "bg-brand/10 text-brand-medium",
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>

      <p
        className={cn(
          "relative mt-8 font-display text-3xl font-extrabold tracking-tight lg:text-4xl",
          highlight ? "text-white" : "text-brand",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "relative mt-4 flex-1 text-base leading-relaxed",
          highlight ? "max-w-3xl text-white/80 lg:text-xl" : "text-muted-foreground",
        )}
      >
        {text}
      </p>
      {seal && (
        <span className="shimmer-border relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-teal px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          {seal}
        </span>
      )}
    </div>
  );
}

/**
 * Diagrama turnkey: quatro nós orbitando o selo central (SVG + CSS).
 */
function TurnkeyDiagram() {
  const r = 42;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle cx="200" cy="200" r="168" stroke="var(--color-border)" />
        <circle
          cx="200"
          cy="200"
          r="168"
          stroke="url(#turnkey-arc)"
          strokeWidth="2"
          strokeDasharray="260 800"
          strokeLinecap="round"
          className="spin-slow"
        />
        {TURNKEY_NODES.map((_, i) => {
          const a = ((-90 + i * 90) * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="200"
              y1="200"
              x2={200 + 168 * Math.cos(a)}
              y2={200 + 168 * Math.sin(a)}
              stroke="var(--color-border)"
              strokeDasharray="3 6"
            />
          );
        })}
        <defs>
          <linearGradient id="turnkey-arc" x1="0" x2="1">
            <stop offset="0" stopColor="var(--brand-light)" />
            <stop offset="1" stopColor="var(--brand-teal)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="glow-brand block rounded-full bg-brand px-6 py-3 text-center font-display text-sm font-bold text-brand-foreground sm:px-8 sm:py-4 sm:text-base">
          Modelo Turnkey
        </span>
      </div>

      {TURNKEY_NODES.map((node, i) => {
        const a = ((-90 + i * 90) * Math.PI) / 180;
        const x = 50 + r * Math.cos(a);
        const y = 50 + r * Math.sin(a);
        return (
          <span
            key={node}
            className="card-premium absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-brand shadow-md float-slow"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.7}s` }}
          >
            {node}
          </span>
        );
      })}
    </div>
  );
}

export function Model() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-10 top-8 select-none" aria-hidden="true">
        <SectionNumber n="04" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <Reveal variant="fade">
            <SectionTag>O modelo DCI</SectionTag>
          </Reveal>
          <WordReveal
            text="Como um Centro de Ciências do DCI é estruturado?"
            className="text-display-md mt-6 text-brand"
            stagger={45}
          />
          <Reveal variant="blur" delay={350} className="mt-8">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Criar um centro de ciência envolve definir a experiência, adaptar ao contexto local,
              preparar a operação, formar equipes e estruturar relações capazes de sustentar o projeto
              no longo prazo. O modelo DCI organiza esse processo em quatro frentes integradas:
            </p>
          </Reveal>
        </div>

        {/* Bento: três frentes + Finance em destaque */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.slice(0, 3).map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="h-full">
              <StepCard {...step} index={i} />
            </Reveal>
          ))}
          {STEPS.slice(3).map((step) => (
            <Reveal key={step.title} delay={300} variant="scale" className="md:col-span-2 lg:col-span-3">
              <StepCard {...step} index={3} highlight />
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" className="mt-16">
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Quatro décadas de prática permitem ao Discovery Centre estruturar cada projeto com
              disciplina de <span className="text-gradient-deep">escopo</span>,{" "}
              <span className="text-gradient-deep">prazo</span> e{" "}
              <span className="text-gradient-deep">orçamento</span> desde o planejamento, reduzindo
              improvisos entre concepção, construção e operação.
            </p>
          </div>
        </Reveal>

        {/* Turnkey */}
        <div className="mt-28 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="scale">
            <TurnkeyDiagram />
          </Reveal>
          <div>
            <Reveal variant="fade">
              <h3 className="text-display-md text-brand">Turnkey e adaptação local: um modelo integrado</h3>
            </Reveal>
            <Reveal delay={150} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                A abordagem <strong className="text-brand">turnkey</strong> integra todas as etapas do
                projeto em uma única estrutura, permitindo alinhar arquitetura, experiência, educação e
                operação desde o início.
              </p>
              <p>
                Sem padronização rígida, cada centro é adaptado à cultura, às necessidades e ao
                ecossistema da comunidade local.
              </p>
            </Reveal>
            <Reveal variant="scale" delay={250} className="mt-10">
              <div className="photo-premium relative shadow-2xl">
                <img
                  src="/images/dci/model-adaptacao-local.jpg"
                  alt="Apresentação institucional de uma experiência interativa do centro"
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Capital Campaign Module */}
        <Reveal variant="scale" className="mt-24">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-deep p-8 text-white sm:p-12 lg:p-16">
            <div className="aurora" aria-hidden="true" />
            <div className="dot-grid absolute inset-0 text-white opacity-60" aria-hidden="true" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="text-display-md text-white">
                  Grandes projetos também precisam de uma estratégia para mobilizar capital.
                </h3>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
                  O <strong className="text-brand-light">Capital Campaign Module</strong> do DCI oferece
                  metodologia e suporte para estruturar a campanha, definir a proposta de valor e engajar
                  empresas, famílias, fundações e parceiros institucionais capazes de participar da
                  viabilização do projeto.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {PARTNERS.map((p, i) => (
                  <li
                    key={p}
                    className="glass flex aspect-[4/3] items-center justify-center rounded-2xl px-4 text-center font-display text-base font-bold sm:text-lg"
                    style={{ animation: `float-slow 7s ${i * 0.8}s ease-in-out infinite` }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
