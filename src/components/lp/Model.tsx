import { useState } from "react";
import { ChevronDown, Building2, GraduationCap, Settings2, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionTag } from "./shared";

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

export function Model() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <section id="como-funciona" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>O modelo DCI</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Como um Centro de Ciências do DCI é estruturado?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Criar um centro de ciência envolve definir a experiência, adaptar ao contexto local,
            preparar a operação, formar equipes e estruturar relações capazes de sustentar o projeto
            no longo prazo. O modelo DCI organiza esse processo em quatro frentes integradas:
          </p>
        </Reveal>

        {/* Desktop: fluxo horizontal */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-4 lg:gap-0">
          {STEPS.map(({ icon: Icon, title, text, seal }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="relative h-full border-t-4 border-brand-light/40 px-6 pt-8">
                <span
                  className="absolute -top-[0.65rem] left-6 size-4 rounded-full bg-brand"
                  aria-hidden="true"
                />
                <Icon className="size-7 text-brand-medium" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-bold text-brand">
                  {i + 1}. {title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                {seal && (
                  <span className="mt-5 inline-block rounded-full bg-brand-teal px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-foreground">
                    {seal}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: acordeão */}
        <div className="mt-10 space-y-3 lg:hidden">
          {STEPS.map(({ icon: Icon, title, text, seal }, i) => {
            const open = openStep === i;
            return (
              <div key={title} className="overflow-hidden rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setOpenStep(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 bg-surface px-4 py-4 text-left"
                >
                  <Icon className="size-5 shrink-0 text-brand-medium" aria-hidden="true" />
                  <span className="flex-1 font-display text-base font-bold text-brand">
                    {i + 1}. {title}
                  </span>
                  <ChevronDown
                    className={cn("size-5 text-brand-grey transition-transform", open && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
                {open && (
                  <div className="bg-background px-4 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    {seal && (
                      <span className="mt-4 inline-block rounded-full bg-brand-teal px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-foreground">
                        {seal}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Reveal className="mt-10 rounded-xl border-l-4 border-brand-medium bg-surface p-6">
          <p className="text-base leading-relaxed text-foreground">
            Quatro décadas de prática permitem ao Discovery Centre estruturar cada projeto com
            disciplina de <strong className="text-brand">escopo</strong>,{" "}
            <strong className="text-brand">prazo</strong> e{" "}
            <strong className="text-brand">orçamento</strong> desde o planejamento, reduzindo
            improvisos entre concepção, construção e operação.
          </p>
        </Reveal>

        {/* Sub-bloco turnkey */}
        <Reveal className="mt-14 grid gap-8 rounded-xl border border-border p-6 lg:grid-cols-2 lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-bold text-brand">
              Turnkey e adaptação local: um modelo integrado
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A abordagem <strong className="text-brand">turnkey</strong> integra todas as etapas do
              projeto em uma única estrutura, permitindo alinhar arquitetura, experiência, educação e
              operação desde o início.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Sem padronização rígida, cada centro é adaptado à cultura, às necessidades e ao
              ecossistema da comunidade local.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {TURNKEY_NODES.map((node) => (
                <span
                  key={node}
                  className="rounded-full border border-brand-light/50 bg-surface px-4 py-2 text-sm font-semibold text-brand"
                >
                  {node}
                </span>
              ))}
              <span className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-brand-foreground">
                Modelo Turnkey
              </span>
            </div>
          </div>
          <img
            src="/images/dci/model-adaptacao-local.jpg"
            alt="Apresentação institucional de uma experiência interativa do centro"
            className="h-full min-h-[240px] w-full rounded-xl object-cover"
            loading="lazy"
          />
        </Reveal>

        {/* Capital Campaign Module */}
        <Reveal className="mt-6 grid gap-8 rounded-xl bg-brand-deep p-6 text-brand-foreground lg:grid-cols-2 lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-bold">
              Grandes projetos também precisam de uma estratégia para mobilizar capital.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-brand-foreground/80">
              O <strong className="text-brand-light">Capital Campaign Module</strong> do DCI oferece
              metodologia e suporte para estruturar a campanha, definir a proposta de valor e engajar
              empresas, famílias, fundações e parceiros institucionais capazes de participar da
              viabilização do projeto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-brand-foreground/25 bg-brand/40 px-4 py-4 text-center text-sm font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
