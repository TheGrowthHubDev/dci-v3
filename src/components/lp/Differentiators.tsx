import { Blocks, BookOpenCheck, Megaphone, RefreshCcw } from "lucide-react";
import { ImagePlaceholder, Reveal, SectionTag } from "./shared";

const ITEMS = [
  {
    icon: Blocks,
    title: "Portfólio Flexível",
    emphasis: "território + operação",
    text: "Quatro portes de centro, do compacto ao de maior escala, adaptáveis ao contexto, à ambição e ao ecossistema de cada região.",
  },
  {
    icon: BookOpenCheck,
    title: "Onboarding Completo",
    emphasis: "operação",
    text: "Manuais, treinamentos e suporte de pré-lançamento para transformar o projeto físico em uma operação consistente.",
  },
  {
    icon: Megaphone,
    title: "Captação Multicanal",
    emphasis: "financiamento",
    text: "Patrocínio corporativo, doações privadas, parceiros institucionais e outras fontes organizadas dentro de uma estratégia de mobilização de capital.",
  },
  {
    icon: RefreshCcw,
    title: "Receita Diversificada",
    emphasis: "sustentabilidade",
    text: "Bilheteria é apenas uma parte do modelo. Programas, memberships, escolas, eventos, locações, ativações e parcerias ajudam a sustentar o centro no longo prazo.",
  },
];

const HALIFAX = [
  "Quatro andares",
  "Mais de 3.700 m²",
  "Galerias, laboratórios, programação educacional e experiências interativas em operação",
  "Aproximadamente 2 milhões de visitantes recebidos ao longo da trajetória",
];

const PROJECTS = [
  {
    title: "Argélia",
    text: "Um projeto estruturado respeitando o contexto cultural e educacional local.",
  },
  {
    title: "Nova Scotia Rural — Discovery West Nova",
    text: "Um modelo itinerante, com vans educativas, levando o mesmo princípio de experiência para comunidades fora dos grandes centros urbanos.",
  },
];

const PARTNERS = [
  { name: "Dalhousie University", text: "Parceria acadêmica ligada ao Beaty Centre for Marine Biodiversity." },
  { name: "Maple Bear Global Schools", text: "Parceria pedagógica em educação." },
  {
    name: "Governo do Canadá",
    text: "Sinal institucional de um ecossistema construído com participação pública, privada e comunitária ao longo da história do Discovery Centre.",
  },
];

export function Differentiators() {
  return (
    <section id="diferenciais" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>Diferenciais</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Projetos e Experiência: o valor do Modelo DCI
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            São quatro décadas lidando com visitantes, escolas, programas educacionais, exposições,
            equipes, parceiros e a operação cotidiana de um centro de ciência.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, emphasis, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="h-full rounded-xl border border-border bg-surface p-6 transition-transform hover:-translate-y-1">
                <Icon className="size-7 text-brand-medium" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold text-brand">{title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brand-teal">
                  {emphasis}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Halifax */}
        <Reveal className="mt-16 grid gap-8 rounded-xl bg-brand p-6 text-brand-foreground lg:grid-cols-2 lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Halifax é a base do modelo.</h3>
            <ul className="mt-6 space-y-3">
              {HALIFAX.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-brand-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-light" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/images/dci/differentiators-halifax.jpg"
            alt="Sede do Discovery Centre em Halifax, Canadá"
            className="aspect-[16/10] w-full rounded-lg border border-brand-foreground/25 object-cover"
            loading="lazy"
          />
        </Reveal>

        {/* Adaptação cultural */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-brand">Adaptação cultural na prática</h3>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="h-full overflow-hidden rounded-xl border border-border bg-surface">
                  <ImagePlaceholder
                    label={`Projeto ${p.title}`}
                    ratio="aspect-[16/9]"
                    className="rounded-none border-0 border-b border-dashed"
                  />
                  <div className="p-6">
                    <h4 className="font-display text-lg font-bold text-brand">{p.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Parceiros */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-brand">
              Parceiros acadêmicos e institucionais
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article className="flex h-full flex-col rounded-xl border border-border p-6">
                  <ImagePlaceholder label={`Logo ${p.name}`} ratio="aspect-[5/2]" className="mb-4" />
                  <p className="font-display text-base font-bold text-brand">{p.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
