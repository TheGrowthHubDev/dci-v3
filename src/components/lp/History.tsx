import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  Counter,
  Reveal,
  SectionNumber,
  SectionTag,
  WordReveal,
  useMouseGlow,
} from "./shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TIMELINE = [
  {
    year: "Década de 1970",
    text: "As primeiras experiências científicas interativas começam a atrair o público em Halifax.",
  },
  { year: "1985", text: "O Discovery Centre é formalmente estabelecido." },
  {
    year: "1990–2010",
    text: "A operação cresce, amplia programas educacionais e consolida sua presença no Canadá.",
  },
  {
    year: "2017",
    text: "O atual Discovery Centre é inaugurado no waterfront, em uma instalação LEED Platinum com mais de 3.700 m².",
  },
  {
    year: "2021",
    text: "É criado o Discovery Centre International para levar essa experiência a novos mercados.",
  },
  {
    year: "Hoje",
    text: "Quarenta anos de prática são a base de um modelo internacional de expansão.",
  },
];

// Retratos, nomes e cargos oficiais: dcinternational.ca/index.php/about/ ("Meet our Team")
type Leader = {
  name: string;
  role: string;
  /** Bio aprovada pelo cliente. */
  bio: string;
  photo?: string;
};

const LEADERS: Leader[] = [
  {
    name: "Dov Bercovici",
    role: "President & CEO",
    bio: "Reconhecido no Top 50 CEO Hall of Fame, liderou a reconstrução do Discovery Centre em Halifax, da mobilização de capital à inauguração da sede atual em 2017.",
    photo: "/images/dci/team/dov-bercovici.jpg",
  },
  {
    name: "Marcos Miranda",
    role: "VP of International Business Development, Discovery Centre International",
    bio: "Mais de 25 países de experiência em expansão internacional, à frente da condução do projeto no Brasil.",
    photo: "/images/dci/team/marcos-miranda.jpg",
  },
  {
    name: "Ricardo Cancela",
    role: "Brazil Ambassador",
    bio: "Representa o DCI no Brasil, reunindo mais de 36 anos de experiência em mercados globais, tecnologia, desenvolvimento de negócios e construção de redes de liderança.",
    photo: "/images/dci/team/ricardo-cancela.jpg",
  },
  {
    name: "Ryan Jameson",
    role: "Director of Science Education",
    bio: "Liderança responsável pela frente de educação científica e pela aplicação da experiência pedagógica do Discovery Centre.",
    photo: "/images/dci/team/ryan-jameson.jpg",
  },
  {
    name: "Ruth Munro",
    role: "Director of Exhibits & Facilities",
    bio: "Liderança ligada à experiência física, exposições e infraestrutura do Discovery Centre.",
    photo: "/images/dci/team/ruth-munro.jpg",
  },
  {
    name: "Helen Dolan",
    role: "Director of Partnerships",
    bio: "Liderança dedicada à construção e gestão de parcerias institucionais.",
    photo: "/images/dci/team/helen-dolan.jpg",
  },
  {
    name: "Jennifer Punch",
    role: "Chief Operating Officer",
    bio: "Integra o Discovery Centre desde 2016 e participou diretamente da abertura da atual unidade no waterfront de Halifax, atuando hoje na liderança operacional da instituição.",
    photo: "/images/dci/team/jennifer-punch.jpg",
  },
  {
    name: "Linda Laurence",
    role: "Director of Human Resources",
    bio: "Responsável pela área de pessoas e pela estrutura de Recursos Humanos que sustenta a operação e as equipes do Discovery Centre.",
    photo: "/images/dci/team/linda-laurence.jpg",
  },
  {
    name: "Laura Jones",
    role: "Marketing Coordinator",
    bio: "Atua na coordenação das iniciativas de marketing do Discovery Centre, apoiando a comunicação e a presença da instituição junto aos seus públicos.",
    photo: "/images/dci/team/laura-jones.jpg",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Timeline scrollytelling: a linha se preenche e os marcos acendem conforme o scroll.
 */
function Timeline() {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(TIMELINE.length - 1);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex((prev) => Math.max(prev, index));
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fill = TIMELINE.length > 1 ? activeIndex / (TIMELINE.length - 1) : 1;

  return (
    <div className="relative">
      {/* Linha horizontal (desktop) */}
      <div
        className="timeline-fill absolute left-0 right-0 top-[7px] hidden h-0.5 rounded-full lg:block"
        style={{ "--fill": fill } as CSSProperties}
        aria-hidden="true"
      />
      {/* Linha vertical (mobile) */}
      <div
        className="timeline-fill absolute bottom-0 left-[7px] top-0 w-0.5 rounded-full lg:hidden"
        style={{ "--fill-transform": `scaleY(${fill})` } as CSSProperties}
        aria-hidden="true"
      />

      <ol className="relative grid gap-10 pl-10 lg:grid-cols-6 lg:gap-6 lg:pl-0 lg:pt-12">
        {TIMELINE.map((item, i) => {
          const passed = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <li
              key={item.year}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className="relative lg:pr-4"
            >
              <span
                className={cn(
                  "absolute -left-10 top-0 flex size-4 items-center justify-center rounded-full ring-4 ring-surface transition-all duration-500 lg:-top-12 lg:left-0",
                  passed ? "bg-brand" : "bg-border",
                  isCurrent && "ring-pulse text-brand-light",
                )}
                aria-hidden="true"
              >
                <span className={cn("size-1.5 rounded-full", passed ? "bg-brand-light" : "bg-transparent")} />
              </span>
              <p
                className={cn(
                  "font-display text-xl font-extrabold tracking-tight transition-all duration-500 lg:text-2xl",
                  passed ? "text-brand" : "text-brand/30",
                  isCurrent && "text-gradient-deep",
                )}
              >
                {item.year}
              </p>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed text-muted-foreground transition-opacity duration-500",
                  passed ? "opacity-100" : "opacity-40",
                )}
              >
                {item.text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  const ref = useMouseGlow<HTMLElement>();
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(leader.photo) && !photoFailed;

  return (
    <article ref={ref} className="card-premium group flex h-full flex-col overflow-hidden">
      {/* Retrato */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand via-brand-medium to-brand-light">
        {showPhoto ? (
          <img
            src={leader.photo}
            alt={`Retrato de ${leader.name}`}
            width={500}
            height={650}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span
            className="absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold text-white/90"
            aria-hidden="true"
          >
            {initials(leader.name)}
          </span>
        )}
        {/* Gradiente para leitura do nome sobre a foto */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-deep/90 via-brand-deep/40 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-lg font-bold leading-tight text-white">{leader.name}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">
            {leader.role}
          </p>
        </div>
      </div>

      {/* Bio + contato */}
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Contato%20-%20${encodeURIComponent(leader.name)}`}
          className="nav-underline mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand"
        >
          <Mail className="size-4" aria-hidden="true" /> Enviar e-mail
        </a>
      </div>
    </article>
  );
}

export function History() {
  return (
    <section id="nossa-historia" className="relative overflow-hidden bg-surface py-24 lg:py-36">
      <div className="pointer-events-none absolute -right-10 top-10 select-none" aria-hidden="true">
        <SectionNumber n="02" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Abertura: título + texto em coluna / foto da sede */}
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal variant="fade">
              <SectionTag>Nossa História</SectionTag>
            </Reveal>
            <WordReveal text="A Origem do Discovery Centre" className="text-display-md mt-6 text-brand" />
            <Reveal variant="blur" delay={300} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                O Discovery Centre começou a tomar forma na década de 1970, a partir de demonstrações
                científicas interativas desenvolvidas em Halifax.
              </p>
              <p>
                A iniciativa cresceu, ganhou as ruas com programas itinerantes e, em{" "}
                <strong className="text-brand">1985</strong>, tornou-se formalmente o Discovery Centre.
              </p>
              <p>
                Décadas depois, esse mesmo projeto reuniu apoio do Governo Canadense, do setor privado e
                da comunidade para construir, do zero, um centro de quatro andares em Halifax, concebido
                para receber experiências interativas, galerias, laboratórios e programação educacional.
              </p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={200} className="relative mb-10 sm:ml-10 lg:ml-0">
            <div className="photo-premium relative shadow-2xl">
              <img
                src="/images/dci/history-fachada-dia.jpg"
                alt="Fachada do Discovery Centre em Halifax, com o letreiro Discovery e o painel das fases da Lua"
                className="aspect-[4/5] w-full object-cover object-[65%_center]"
                loading="lazy"
              />
            </div>
            {/* Estatística flutuando sobre a foto */}
            <div className="glass-light absolute -bottom-8 left-4 max-w-[260px] rounded-2xl p-6 shadow-xl sm:-left-10">
              <p className="text-gradient-deep font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                ≈ <Counter value={2} suffix=" milhões" />
              </p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                de visitantes recebidos ao longo da trajetória do Discovery Centre.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Timeline com scrollytelling */}
        <Reveal variant="fade" className="mt-28 lg:mt-36">
          <Timeline />
        </Reveal>

        {/* Foto ampla da galeria atual */}
        <Reveal variant="scale" className="mt-20">
          <div className="photo-premium relative shadow-2xl">
            <img
              src="/images/dci/history-onibus-escolar.jpg"
              alt="Ônibus escolar chegando à entrada do Discovery Centre em Halifax"
              className="aspect-[21/9] w-full object-cover object-[center_40%]"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Liderança */}
        <div className="mt-28">
          <Reveal variant="fade" className="max-w-2xl">
            <h3 className="text-display-md text-brand">Quem estrutura o projeto</h3>
          </Reveal>

          <Reveal className="mt-10">
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
                dragFree: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-5">
                {LEADERS.map((leader) => (
                  <CarouselItem
                    key={leader.name}
                    className="basis-[85%] pl-5 md:basis-[45%] lg:basis-[calc(100%/3.2)]"
                  >
                    <LeaderCard leader={leader} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 md:-left-12" />
              <CarouselNext className="right-0 top-1/2 -translate-y-1/2 md:-right-12" />
            </Carousel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
