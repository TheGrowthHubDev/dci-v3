import { Mail } from "lucide-react";
import { CONTACT_EMAIL, ImagePlaceholder, Reveal, SectionTag } from "./shared";
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

const LEADERS = [
  {
    name: "Dov Bercovici",
    role: "President & CEO",
    bio: "Reconhecido no Top 50 CEO Hall of Fame, liderou a reconstrução do Discovery Centre em Halifax, da mobilização de capital à inauguração da sede atual em 2017.",
  },
  {
    name: "Marcos Miranda",
    role: "VP of International Business Development, Discovery Centre International",
    bio: "Mais de 25 países de experiência em expansão internacional, à frente da condução do projeto no Brasil.",
  },
  {
    name: "Ryan Jameson",
    role: "Director of Science Education",
    bio: "Liderança responsável pela frente de educação científica e pela aplicação da experiência pedagógica do Discovery Centre.",
  },
  {
    name: "Ruth Munro",
    role: "Director of Exhibits & Facilities",
    bio: "Liderança ligada à experiência física, exposições e infraestrutura do Discovery Centre.",
  },
  {
    name: "Helen Dolan",
    role: "Director of Partnerships",
    bio: "Liderança dedicada à construção e gestão de parcerias institucionais.",
  },
];

export function History() {
  return (
    <section id="nossa-historia" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>Nossa História</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            A Origem do Discovery Centre
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
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
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal className="mt-14">
          <ol className="relative grid gap-8 border-l border-border pl-6 lg:grid-cols-6 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative lg:pr-4">
                <span
                  className="absolute -left-[1.66rem] top-1 size-3 rounded-full bg-brand-light ring-4 ring-surface lg:-top-[3.1rem] lg:left-0"
                  aria-hidden="true"
                />
                <p className="font-display text-lg font-bold text-brand">{item.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center rounded-xl bg-brand p-8 text-brand-foreground">
            <p className="font-display text-4xl font-bold sm:text-5xl">≈ 2 milhões</p>
            <p className="mt-3 text-sm text-brand-foreground/80">
              de visitantes recebidos ao longo da trajetória do Discovery Centre.
            </p>
          </div>
          <img
            src="/images/dci/history-galeria-atual.jpg"
            alt="Uma das galerias do Discovery Centre em operação"
            className="aspect-[16/9] w-full rounded-lg object-cover"
            loading="lazy"
          />
        </Reveal>

        {/* Liderança */}
        <div className="mt-20">
          <Reveal className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-brand sm:text-3xl">
              Quem estrutura o projeto
            </h3>
          </Reveal>

          <Reveal className="mt-8">
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
                    className="pl-5 basis-[85%] md:basis-[45%] lg:basis-[calc(100%/3.2)]"
                  >
                    <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
                      <ImagePlaceholder label="Foto" ratio="aspect-[3/4]" className="mb-4" />
                      <p className="font-display text-lg font-bold text-brand">{leader.name}</p>
                      <p className="mt-1 text-sm font-semibold text-brand-medium">{leader.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=Contato%20-%20${encodeURIComponent(leader.name)}`}
                        className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand hover:underline"
                      >
                        <Mail className="size-4" aria-hidden="true" /> Enviar e-mail
                      </a>
                    </article>
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
