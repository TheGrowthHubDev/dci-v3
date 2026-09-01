import { Award, Building2, Landmark, Users } from "lucide-react";
import { Reveal, SectionTag } from "./shared";

const CARDS = [
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

export function Audience() {
  return (
    <section id="para-quem-e" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>Para Quem É</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Um Discovery Centre começa com alguém disposto a construir <em className="not-italic text-brand-medium">legado</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            O Discovery Centre International se estrutura ao lado de quem{" "}
            <strong className="text-brand">opera</strong>, de quem{" "}
            <strong className="text-brand">viabiliza o capital</strong> e de quem{" "}
            <strong className="text-brand">cria as condições institucionais</strong> para o projeto
            acontecer. Veja o que muda para cada perfil.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, lead, bullets, closing, highlight, proof }, i) => (
            <Reveal key={title} delay={i * 90}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-background p-7">
                <Icon className="size-8 text-brand-medium" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-bold text-brand">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{lead}</p>
                <ul className="mt-5 space-y-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-light"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                {highlight && (
                  <div className="mt-6 rounded-lg bg-brand p-5 text-brand-foreground">
                    <Award className="size-6 text-brand-light" aria-hidden="true" />
                    <p className="mt-3 font-display text-base font-bold">{highlight.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-foreground/80">
                      {highlight.text}
                    </p>
                  </div>
                )}
                {closing && (
                  <p className="mt-6 border-t border-border pt-5 text-sm font-semibold text-brand">
                    {closing}
                  </p>
                )}
                {proof && (
                  <p className="mt-6 rounded-lg border-l-4 border-brand-teal bg-surface p-4 text-sm leading-relaxed text-foreground">
                    {proof}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-background p-8 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold text-brand">
              Existe um caminho para cada tipo de parceiro.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Descubra qual modelo se aplica ao seu perfil e quais dimensões de impacto fazem mais
              sentido avaliar na sua região.
            </p>
          </div>
          <a
            href="#simulador"
            className="shrink-0 rounded-md bg-brand px-6 py-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-deep"
          >
            Simular Meu Impacto
          </a>
        </Reveal>
      </div>
    </section>
  );
}
