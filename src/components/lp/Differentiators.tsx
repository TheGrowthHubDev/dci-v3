import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BookOpenCheck,
  Megaphone,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  BrandOrbit,
  ImagePlaceholder,
  Marquee,
  Reveal,
  SectionNumber,
  SectionTag,
  WordReveal,
  useMouseGlow,
  useParallax,
} from "./shared";
import dubaiAsset from "@/assets/dci/projeto-dubai.png.asset.json";
import marrocosAsset from "@/assets/dci/projeto-marrocos.png.asset.json";
import medavieBenefitsAsset from "@/assets/dci/logos/medavie-benefits.png.asset.json";

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

type Project = {
  title: string;
  /** Categoria do projeto conforme o site oficial (ex.: Franquia DCI, Operado pela DCI). */
  status: string;
  /**
   * Parágrafos descritivos. O primeiro é sempre exibido; os demais aparecem em "Ler mais".
   * Textos traduzidos da página oficial de projetos: https://dcinternational.ca/index.php/projects-2/
   */
  paragraphs: string[];
  /** Imagem real do projeto (opcional — sem imagem, exibe painel gráfico). */
  image?: { src: string; alt: string; position?: string };
};

const PROJECTS_SOURCE_URL = "https://dcinternational.ca/index.php/projects-2/";

const PROJECTS: Project[] = [
  {
    title: "Discovery Centre, Halifax, Nova Scotia, Canadá",
    status: "Discovery Centre principal",
    paragraphs: [
      "O premiado Discovery Centre em Halifax, Nova Scotia, Canadá, oferece uma base de sucesso e um modelo a ser replicado por meio do desenvolvimento de oportunidades de franquia turnkey, excelência educacional, experiências excepcionais e resultados inspiradores.",
      "Nossa unidade principal tem quatro andares e mais de 40.000 pés quadrados (cerca de 3.700 m²). O Discovery Centre é o museu de ciência mais novo do país, com experiências de ponta, galerias inovadoras e exibições incríveis. A ideia de que a curiosidade conecta todos nós é reconhecida no Discovery Centre International. Somos apaixonados por criar espaços inclusivos que despertem a paixão pela ciência e pela descoberta.",
    ],
    image: {
      src: "/images/dci/history-fachada-dia.jpg",
      alt: "Fachada do Discovery Centre em Halifax, com o painel das fases da Lua e a entrada principal",
      position: "center 55%",
    },
  },
  {
    title: "Nova Scotia Rural — Discovery West Nova",
    status: "Franquia DCI",
    paragraphs: [
      "Um modelo itinerante, com vans educativas, levando o mesmo princípio de experiência para comunidades fora dos grandes centros urbanos.",
      "O Discovery West Nova está posicionado para ser uma instituição transformadora na comunidade. Como o primeiro do gênero na Nova Scotia rural, terá papel central na formação do cenário educacional da região. Começará como uma van itinerante, levando experiências educativas diretamente às comunidades, passará por acampamentos de verão e culminará na criação de um centro de ciência.",
      "O centro se integrará ao sistema educacional local, apresentando o aprendizado STEAM interativo a pessoas de todas as idades. Em um ecossistema rural como o oeste da Nova Scotia, o aprendizado costuma ser mais focado, e os jovens são incentivados a pensar “fora da caixa” e inovar a cada oportunidade. A região tem uma herança e uma cultura das quais se orgulha, e que podem ser ensinadas como parte da educação STEAM: a programação pode refletir estudos de ciência oceânica, a designação de Céu Escuro da ONU, ensinamentos indígenas e muito mais.",
      "Além do impacto educacional, o centro busca impulsionar o turismo na região, contribuindo para o crescimento cultural e econômico do oeste da Nova Scotia.",
    ],
    image: {
      src: "/images/dci/projeto-discovery-west-nova.jpg",
      alt: "Grupo de crianças com bonés do Discovery Centre acompanhadas por educadoras em atividade ao ar livre",
      position: "center 40%",
    },
  },
  {
    title: "Beaty Centre for Marine Biodiversity",
    status: "Operado pela DCI",
    paragraphs: [
      "O Beaty Centre for Marine Biodiversity, com abertura prevista na Dalhousie University em 2025, é um centro interativo de descoberta sobre oceano e ciência, o primeiro do gênero, que oferecerá experiências educacionais e de pesquisa excepcionais para a comunidade da Dalhousie e além.",
      "Estudantes, visitantes da Nova Scotia e moradores curiosos serão recebidos no Beaty Centre para conhecer o trabalho inovador conduzido por pesquisadores da Dalhousie, dedicados a proteger nossos recursos oceânicos vitais.",
      "O centro ocupará o primeiro e o segundo andares do Steele Ocean Sciences Building, o polo de pesquisa em biologia e biodiversidade marinha da universidade. O Beaty Centre será operado pelo Discovery Centre International em colaboração com a Dalhousie University.",
    ],
    image: {
      src: "/images/dci/projetos/beaty-centre.jpg",
      alt: "Duas crianças observando um grande aquário de recife de corais no Beaty Centre for Marine Biodiversity",
      position: "center",
    },
  },
  {
    title: "Sable Island Institute",
    status: "Contrato de consultoria DCI",
    paragraphs: [
      "O Discovery Centre International está colaborando com a equipe do Sable Island Institute para desenvolver uma experiência expositiva ou uma instalação que apresente o trabalho e as coleções extraordinárias que representam a Ilha Sable.",
      "Uma das primeiras colaborações é a transferência de 600 crânios de cavalos da Ilha Sable para o Discovery Centre e o desenvolvimento de uma experiência de aprendizado em torno desses artefatos incríveis. A Ilha Sable é um destino de rica relevância científica, que merece ser compartilhado e celebrado nacional e internacionalmente.",
      "O Sable Island Institute e o Discovery Centre International trabalham juntos para facilitar parcerias com incubadoras de inovação rurais, garantindo que todos os habitantes da Nova Scotia tenham acesso às experiências e ao conhecimento do Instituto.",
    ],
    image: {
      src: "/images/dci/projetos/sable-island-institute.jpg",
      alt: "Cavalos selvagens da Ilha Sable pastando em campo florido, com o mar ao fundo",
      position: "center",
    },
  },
  {
    title: "Argélia",
    status: "Franquia DCI proposta",
    paragraphs: ["Um projeto estruturado respeitando o contexto cultural e educacional local."],
    image: {
      src: "/images/dci/projeto-argelia.jpg",
      alt: "Render da fachada do projeto DCI na Argélia, com volume suspenso, domo e praça de acesso",
      position: "center 45%",
    },
  },
  {
    title: "Discovery Centre Dubai",
    status: "Franquia DCI proposta",
    paragraphs: [
      "Proposta de centro de ciências adaptada ao contexto cultural e educacional dos Emirados Árabes Unidos, com arquitetura inspirada na exploração espacial e em grandes átrios de convivência.",
    ],
    image: {
      src: dubaiAsset.url,
      alt: "Render do interior da proposta de Discovery Centre em Dubai, com planetas suspensos em átrio de múltiplos níveis",
      position: "center",
    },
  },
  {
    title: "Discovery Centre Marrocos",
    status: "Franquia DCI proposta",
    paragraphs: [
      "Proposta de fachada para o Discovery Centre em Marrocos, combinando linguagem arquitetônica contemporânea com referências ao território e à paisagem local.",
    ],
    image: {
      src: marrocosAsset.url,
      alt: "Render da fachada da proposta de Discovery Centre em Marrocos, com volumes curvos e painéis de vidro refletindo o céu",
      position: "center",
    },
  },
];

type Partner = {
  name: string;
  text: string;
  logo?: string;
  /** Classe extra para o contêiner do logo (ex.: fundo branco para logos com fundo próprio). */
  logoClassName?: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Dalhousie University",
    text: "Parceria acadêmica ligada ao Beaty Centre for Marine Biodiversity.",
    logo: "/images/dci/logos/dalhousie.svg",
  },
  {
    name: "Medavie Health Foundation",
    text: "Parceira no desenvolvimento de exibições e áreas temáticas voltadas para a educação de saúde e bem-estar",
    logo: medavieBenefitsAsset.url,
  },
  {
    name: "Governo do Canadá",
    text: "Sinal institucional de um ecossistema construído com participação pública, privada e comunitária ao longo da história do Discovery Centre.",
    logo: "/images/dci/logos/governo-canada.png",
  },
];

const SUPPORT_LOGOS = [
  { name: "Research Nova Scotia", src: "/images/dci/logos/research-nova-scotia.png" },
  { name: "IMP Aerospace & Defence", src: "/images/dci/logos/imp-aerospace-defence.png" },
  { name: "Nova Scotia Power", src: "/images/dci/logos/nova-scotia-power.png" },
  { name: "Saint Mary's University", src: "/images/dci/logos/saint-marys-university.svg" },
  { name: "Medavie", src: medavieBenefitsAsset.url },
  { name: "RBC", src: "/images/dci/logos/rbc.svg" },
  { name: "Grupo Cataratas", src: "/images/dci/logos/grupo-cataratas.jpg" },
];

function DifferentiatorCard({
  icon: Icon,
  title,
  emphasis,
  text,
  index,
}: {
  icon: LucideIcon;
  title: string;
  emphasis: string;
  text: string;
  index: number;
}) {
  const ref = useMouseGlow<HTMLElement>();
  return (
    <article ref={ref} className="card-premium group flex h-full flex-col p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/8 text-brand-medium transition-all duration-500 group-hover:bg-brand group-hover:text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="text-outline text-4xl" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-7 font-display text-2xl font-extrabold tracking-tight text-brand">{title}</h3>
      <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-teal">{emphasis}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground lg:text-base">{text}</p>
    </article>
  );
}

/**
 * Painel de projeto: imagem real quando disponível; caso contrário, grafismo de marca + número.
 */
function ProjectPanel({ index, image }: { index: number; image?: Project["image"] }) {
  if (image) {
    return (
      <div className="relative isolate aspect-[16/9] overflow-hidden bg-brand-deep">
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: image.position ?? "center" }}
          loading="eager"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep/80 to-transparent"
          aria-hidden="true"
        />
        <span className="text-outline-light absolute bottom-4 left-6 text-7xl" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate aspect-[16/9] overflow-hidden",
        index % 2 === 0
          ? "bg-gradient-to-br from-brand-deep via-brand to-brand-medium"
          : "bg-gradient-to-br from-brand via-brand-medium to-brand-teal",
      )}
      aria-hidden="true"
    >
      <div className="aurora opacity-60" />
      <BrandOrbit className="absolute -right-16 -top-16 w-[260px] opacity-80" />
      <div className="grid-lines absolute inset-0 text-white opacity-60" />
      <span className="text-outline-light absolute bottom-4 left-6 text-7xl">0{index + 1}</span>
    </div>
  );
}

/**
 * Card de projeto: imagem, categoria, título e descrição com "Ler mais" para textos longos.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [lead, ...rest] = project.paragraphs;
  const expandable = rest.length > 0 || (lead?.length ?? 0) > 200;

  return (
    <article className="card-premium group flex h-full flex-col overflow-hidden">
      <ProjectPanel index={index} image={project.image} />
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-teal">{project.status}</p>
        <h4 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-brand">{project.title}</h4>
        {lead ? (
          <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <p className={cn(!expanded && "line-clamp-4")}>{lead}</p>
            {expanded && rest.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
        ) : null}
        {expandable ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-medium transition-colors hover:text-brand"
          >
            {expanded ? "Ler menos" : "Ler mais"}
            <ArrowRight
              className={cn("size-4 transition-transform duration-300", expanded ? "-rotate-90" : "rotate-90")}
              aria-hidden="true"
            />
          </button>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Carrossel de projetos com setas, contador e indicadores sincronizados com o Embla.
 */
function ProjectsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const sync = useCallback((embla: NonNullable<CarouselApi>) => {
    setSnaps(embla.scrollSnapList());
    setSelected(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    sync(api);
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api, sync]);

  const total = snaps.length || PROJECTS.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true, skipSnaps: false, dragFree: false }}
      className="w-full"
      aria-label="Projetos do Discovery Centre International"
    >
      <CarouselContent className="-ml-6 items-stretch">
        {PROJECTS.map((project, i) => (
          <CarouselItem key={project.title} className="basis-[88%] pl-6 md:basis-1/2 lg:basis-[calc(100%/2.3)]">
            <ProjectCard project={project} index={i} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Ir para o projeto">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Projeto ${i + 1} de ${total}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === selected ? "w-10 bg-brand" : "w-4 bg-brand/20 hover:bg-brand/40",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-display text-sm font-semibold tabular-nums text-brand-grey" aria-live="polite">
            <span className="text-brand">{pad(selected + 1)}</span> / {pad(total)}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Projeto anterior"
              className="flex size-11 items-center justify-center rounded-full border border-brand/15 bg-white text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Próximo projeto"
              className="flex size-11 items-center justify-center rounded-full border border-brand/15 bg-white text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export function Differentiators() {
  const halifaxPhoto = useParallax<HTMLDivElement>(0.08);

  return (
    <section id="diferenciais" className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="pointer-events-none absolute -right-10 top-8 select-none" aria-hidden="true">
        <SectionNumber n="06" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal variant="fade">
              <SectionTag>Diferenciais</SectionTag>
            </Reveal>
            <WordReveal
              text="Projetos e Experiência: o valor do Modelo DCI"
              className="text-display-md mt-6 text-brand"
              stagger={45}
            />
          </div>
          <Reveal variant="blur" delay={300}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              São quatro décadas lidando com visitantes, escolas, programas educacionais, exposições,
              equipes, parceiros e a operação cotidiana de um centro de ciência.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <DifferentiatorCard {...item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Halifax: bloco full-bleed com foto e overlay */}
      <Reveal variant="fade" className="relative mt-28 lg:mt-36">
        <div className="relative isolate min-h-[560px] overflow-hidden text-white lg:min-h-[680px]">
          <div
            ref={halifaxPhoto}
            className="absolute inset-[-12%]"
            style={{ transform: "translateY(var(--py, 0px))" }}
          >
            <img
              src="/images/dci/differentiators-halifax-noite.jpg"
              alt="Fachada do Discovery Centre em Halifax ao anoitecer, com o painel das fases da Lua iluminado"
              className="h-full w-full object-cover object-[70%_center]"
              loading="lazy"
            />
          </div>
          {/* Overlay mais leve à direita para deixar a fachada visível; texto fica sobre a faixa escura à esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/75 to-brand-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-brand-deep/20" />

          <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-20 lg:min-h-[680px] lg:px-8">
            <div className="max-w-2xl">
              <WordReveal text="Halifax é a base do modelo." className="text-display text-white" />
              <ul className="mt-12 grid gap-4 sm:grid-cols-2">
                {HALIFAX.map((h, i) => (
                  <Reveal key={h} as="li" variant="up" delay={200 + i * 100}>
                    <div className="glass h-full rounded-2xl p-5">
                      <span className="mb-3 block h-1 w-10 rounded-full bg-gradient-to-r from-brand-light to-brand-teal" aria-hidden="true" />
                      <p className="font-display text-base font-semibold leading-snug text-white lg:text-lg">{h}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Adaptação cultural */}
        <div className="mt-28">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <Reveal variant="fade">
              <h3 className="text-display-md text-brand">Adaptação cultural na prática</h3>
            </Reveal>
            <Reveal variant="fade" delay={120}>
              <a
                href={PROJECTS_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-medium transition-colors hover:text-brand"
              >
                Ver projetos no site oficial da DCI
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-10" variant="scale">
            <ProjectsCarousel />
          </Reveal>
        </div>

        {/* Parceiros */}
        <div className="mt-28">
          <Reveal variant="fade">
            <h3 className="text-display-md text-brand">Parceiros acadêmicos e institucionais</h3>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="h-full">
                <article className="card-premium flex h-full flex-col p-7">
                  {p.logo ? (
                    <div
                      className={cn(
                        "relative mb-6 aspect-[5/2] w-full overflow-hidden rounded-xl bg-surface",
                        p.logoClassName,
                      )}
                    >
                      <img
                        src={p.logo}
                        alt={`Logo ${p.name}`}
                        className="absolute inset-0 h-full w-full object-contain p-6"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder label={`Logo ${p.name}`} ratio="aspect-[5/2]" className="mb-6 rounded-xl" />
                  )}
                  <p className="font-display text-lg font-bold text-brand">{p.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Faixa de apoiadores */}
        <div className="mt-28">
          <Reveal variant="fade" className="text-center">
            <h3 className="eyebrow justify-center text-brand-grey">
              <span className="h-px w-8 bg-brand-teal" aria-hidden="true" />
              Ecossistema de apoio em Halifax
              <span className="h-px w-8 bg-brand-teal" aria-hidden="true" />
            </h3>
          </Reveal>
          <Reveal delay={80} variant="fade">
            <div className="mask-fade-x mt-10 py-6">
              <Marquee>
                {SUPPORT_LOGOS.map((l) => (
                  <div key={l.name} className="flex h-12 w-36 shrink-0 items-center justify-center">
                    <img
                      src={l.src}
                      alt={l.name}
                      title={l.name}
                      className="max-h-12 w-full object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
