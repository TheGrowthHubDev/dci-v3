import { Blocks, BookOpenCheck, Megaphone, RefreshCcw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
  text: string;
  /** Imagem real do projeto (opcional — sem imagem, exibe painel gráfico). */
  image?: { src: string; alt: string; position?: string };
};

const PROJECTS: Project[] = [
  {
    title: "Argélia",
    text: "Um projeto estruturado respeitando o contexto cultural e educacional local.",
    image: {
      src: "/images/dci/projeto-argelia.jpg",
      alt: "Render da fachada do projeto DCI na Argélia, com volume suspenso, domo e praça de acesso",
      position: "center 45%",
    },
  },
  {
    title: "Nova Scotia Rural — Discovery West Nova",
    text: "Um modelo itinerante, com vans educativas, levando o mesmo princípio de experiência para comunidades fora dos grandes centros urbanos.",
    image: {
      src: "/images/dci/projeto-discovery-west-nova.jpg",
      alt: "Grupo de crianças com bonés do Discovery Centre acompanhadas por educadoras em atividade ao ar livre",
      position: "center 40%",
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
    logo: "/images/dci/logos/medavie.svg",
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
  { name: "Medavie", src: "/images/dci/logos/medavie.svg" },
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
          loading="lazy"
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
          <Reveal variant="fade">
            <h3 className="text-display-md text-brand">Adaptação cultural na prática</h3>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} variant="scale">
                <article className="card-premium group h-full overflow-hidden">
                  <ProjectPanel index={i} image={p.image} />
                  <div className="p-7 lg:p-8">
                    <h4 className="font-display text-2xl font-extrabold tracking-tight text-brand">{p.title}</h4>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
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
