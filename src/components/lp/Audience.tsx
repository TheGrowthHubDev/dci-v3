import { ArrowRight, Award, Building2, Landmark, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandOrbit, Reveal, SectionNumber, SectionTag, useMouseGlow } from "./shared";

type AudienceCardData = {
  icon: LucideIcon;
  title: string;
  lead: string;
  bullets: string[];
  closing?: string;
  highlight?: { title: string; text: string };
  proof?: string;
  featured?: boolean;
};

/** Sub-bloco de naming rights. */
const NAMING_RIGHTS = {
  intro:
    "O investidor âncora não viabiliza o projeto sozinho: parte relevante do CAPEX costuma vir de patrocínios e parcerias associadas a espaços e experiências específicas do centro.",
  example:
    "Exemplo de referência: uma galeria de aviação pode ser viabilizada em parceria com uma fabricante aeronáutica, que cede uma aeronave para exposição em troca de associação de marca ao espaço.",
  items: [
    {
      title: "Empresas",
      text: "Associação de marca a um espaço, galeria ou ao centro como um todo — do mesmo tipo de movimento visto em grandes ativos esportivos e culturais.",
    },
    {
      title: "Famílias filantropas",
      text: "Legado nomeado ligado a uma causa ou área de interesse da família, associando o nome a um impacto educacional permanente.",
    },
    {
      title: "Parcerias de operação",
      text: "Possibilidade de parceria para operação dos primeiros anos do centro, reduzindo o risco percebido do período de implantação.",
    },
  ],
};

const CARDS: AudienceCardData[] = [
  {
    icon: Building2,
    title: "Para quem opera",
    lead: "Um modelo de licenciamento sem equivalente direto no setor, apoiado em propriedade intelectual e prática operacional testadas, com suporte que cobre da curadoria ao treinamento de equipe.",
    bullets: [
      "O operador não depende apenas da venda de ingressos na entrada, que representa aproximadamente 20% a 30% do faturamento",
      "Aluguel de laboratórios e espaços para escolas, eventos corporativos e colônias de férias",
      "Programas itinerantes que levam ciência a escolas e comunidades fora do centro físico",
      "Cafés, lojas, memberships e parcerias corporativas como fontes adicionais de receita",
      "Extensões digitais e experiências educacionais remotas podem ampliar alcance e abrir novas frentes além do espaço físico",
    ],
    closing:
      "A lógica é diversificar receitas para que a operação não dependa de um único fluxo de público ou de uma única fonte de receita.",
  },
  {
    icon: Users,
    title: "Para quem financia",
    lead: "Um aporte pensado para combinar impacto, legado e sustentabilidade de longo prazo.",
    bullets: [
      "A viabilização do CAPEX pode combinar aporte âncora, patrocínios corporativos, doações e parceiros institucionais dentro de uma campanha de capital estruturada",
      "Depois da implantação, a operação trabalha com múltiplas fontes de receita para reduzir a dependência de doações recorrentes",
      "O impacto pode ser acompanhado de forma concreta: alcance educacional, parcerias com escolas, frequência de visitação e programas entregues",
    ],
    highlight: {
      title: "Um legado que pode levar o seu nome.",
      text: "O projeto pode criar oportunidades de naming rights para associar uma família, fundação ou organização a um legado educacional permanente, do centro como um todo a espaços e experiências específicas, conforme a estrutura definida para cada projeto.",
    },
    featured: true,
  },
  {
    icon: Landmark,
    title: "Para quem apoia institucionalmente",
    lead: "Um ativo educacional, turístico e de inovação pensado para permanecer relevante além de um ciclo de gestão.",
    bullets: [
      "O papel institucional pode combinar articulação regional, acesso a políticas e incentivos, conexão com o ecossistema educacional e apoio à implantação",
      "A adaptação ao contexto local faz parte do modelo, reduzindo o risco de importar uma estrutura sem aderência à comunidade",
      "A operação é pensada com múltiplas fontes de receita e programação contínua, reduzindo o risco de uma infraestrutura sem uso sustentável",
      "Centros de ciência podem integrar educação, turismo, inovação e desenvolvimento regional em uma infraestrutura permanente",
      "Empresas, famílias, fundações e outros parceiros podem participar da viabilização",
    ],
    proof:
      "Adaptação local na prática: o DCI trabalha com formatos diferentes para contextos diferentes, de projetos adaptados culturalmente a modelos de alcance rural como o Discovery West Nova.",
  },
];

function AudienceCard({
  icon: Icon,
  title,
  lead,
  bullets,
  closing,
  highlight,
  proof,
  featured = false,
  index,
}: AudienceCardData & { index: number }) {
  const ref = useMouseGlow<HTMLElement>();
  return (
    <article
      ref={ref}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-7 lg:p-8",
        featured ? "card-premium-dark bg-brand-deep text-white" : "card-premium",
      )}
    >
      {featured && (
        <>
          <div className="aurora opacity-70" aria-hidden="true" />
          <BrandOrbit className="absolute -right-24 -top-24 w-[320px] opacity-70" />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
            featured ? "bg-white text-brand" : "bg-brand/8 text-brand-medium",
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className={cn("text-4xl", featured ? "text-outline-light" : "text-outline")} aria-hidden="true">
          0{index + 1}
        </span>
      </div>

      <h3
        className={cn(
          "relative mt-7 font-display text-2xl font-extrabold tracking-tight lg:text-3xl",
          featured ? "text-white" : "text-brand",
        )}
      >
        {title}
      </h3>
      <p className={cn("relative mt-4 text-base leading-relaxed", featured ? "text-white/90" : "text-foreground")}>
        {lead}
      </p>

      <ul className={cn("relative mt-6 space-y-3 border-t pt-6", featured ? "border-white/15" : "border-border")}>
        {bullets.map((b) => (
          <li
            key={b}
            className={cn("flex gap-3 text-sm leading-relaxed", featured ? "text-white/80" : "text-muted-foreground")}
          >
            <span
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
                featured ? "bg-brand-light" : "bg-brand-light",
              )}
              aria-hidden="true"
            />
            {b}
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      {highlight && (
        <div className="glass relative mt-8 rounded-2xl p-6">
          <span className="shimmer-border inline-flex size-11 items-center justify-center rounded-full bg-brand-teal text-white">
            <Award className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight text-white">
            {highlight.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{highlight.text}</p>
        </div>
      )}
      {closing && (
        <p className="relative mt-8 border-t border-border pt-6 font-display text-base font-semibold leading-snug text-brand">
          {closing}
        </p>
      )}
      {proof && (
        <p className="relative mt-8 rounded-2xl border-l-4 border-brand-teal bg-surface p-5 text-sm leading-relaxed text-foreground">
          {proof}
        </p>
      )}
    </article>
  );
}

export function Audience() {
  return (
    <section id="para-quem-e" className="relative overflow-hidden bg-surface py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-10 top-8 select-none" aria-hidden="true">
        <SectionNumber n="05" />
      </div>
      <div className="dot-grid pointer-events-none absolute inset-0 text-brand" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade">
            <SectionTag>Para Quem É</SectionTag>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="text-display-md mt-6 text-brand">
              Um Discovery Centre começa com alguém disposto a construir{" "}
              <em className="text-gradient not-italic">legado</em>.
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={300} className="mt-8">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              O Discovery Centre International se estrutura ao lado de quem{" "}
              <strong className="text-brand">opera</strong>, de quem{" "}
              <strong className="text-brand">viabiliza o capital</strong> e de quem{" "}
              <strong className="text-brand">cria as condições institucionais</strong> para o projeto
              acontecer. Veja o que muda para cada perfil.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 120}
              variant={card.featured ? "scale" : "up"}
              className={cn("h-full", card.featured && "lg:-my-6")}
            >
              <AudienceCard {...card} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Naming rights */}
        <Reveal variant="scale" className="mt-20">
          <div className="card-premium relative overflow-hidden p-7 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h3 className="text-display-md text-brand">Naming rights: legado com nome próprio</h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {NAMING_RIGHTS.intro}
                </p>
                <p className="mt-6 rounded-2xl border-l-4 border-brand-teal bg-surface p-5 text-sm leading-relaxed text-foreground lg:text-base">
                  {NAMING_RIGHTS.example}
                </p>
              </div>
              <ul className="divide-y divide-border">
                {NAMING_RIGHTS.items.map((item, i) => (
                  <li key={item.title} className="group flex gap-5 py-6 first:pt-0 last:pb-0">
                    <span className="text-outline shrink-0 text-3xl" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-brand">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" className="mt-8">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand p-8 text-white lg:p-12">
            <div className="aurora opacity-60" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                  Existe um caminho para cada tipo de parceiro.
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
                  Descubra qual modelo se aplica ao seu perfil e quais dimensões de impacto fazem mais
                  sentido avaliar na sua região.
                </p>
              </div>
              <a
                href="#simulador"
                className="btn-shine group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand"
              >
                Simular Meu Impacto
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
