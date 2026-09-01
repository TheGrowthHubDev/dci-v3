import { ArrowRight } from "lucide-react";
import { ImagePlaceholder, Reveal, SCHEDULE_URL, SectionTag } from "./shared";

export function Brazil() {
  return (
    <section id="brasil" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Reveal>
          <SectionTag>Discovery Centre International | Brasil</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            O Brasil faz parte da próxima fase de expansão do DCI.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>A presença do DCI no país começa pela construção das relações certas.</p>
            <p>
              Estamos abrindo conversas com organizações, famílias, operadores e instituições que
              enxergam ciência e educação como parte de uma estratégia de desenvolvimento de longo
              prazo.
            </p>
          </div>
          <p className="mt-6 rounded-lg border-l-4 border-brand-medium bg-background p-5 text-sm leading-relaxed text-foreground">
            A conversa inicial serve para entender contexto, objetivos e aderência ao modelo antes de
            qualquer discussão de projeto.
          </p>
          <a
            href={SCHEDULE_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-deep"
          >
            Agendar uma Conversa <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={120}>
          <ImagePlaceholder
            label="Contexto brasileiro / encontro institucional"
            ratio="aspect-[4/3]"
            className="bg-background"
          />
        </Reveal>
      </div>
    </section>
  );
}
