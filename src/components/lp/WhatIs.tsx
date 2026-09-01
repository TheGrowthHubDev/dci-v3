import { Hand, FlaskConical, Hammer, Lightbulb } from "lucide-react";
import { ImagePlaceholder, Reveal, SectionTag } from "./shared";

const STEAM = [
  { icon: Hand, label: "Tocar" },
  { icon: FlaskConical, label: "Testar" },
  { icon: Hammer, label: "Construir" },
  { icon: Lightbulb, label: "Experimentar" },
];

const ROLES = [
  "infraestrutura educacional",
  "espaço de convivência",
  "atração para famílias e visitantes",
  "recurso para escolas",
  "ponto de conexão entre empresas, universidades e comunidade",
];

export function WhatIs() {
  return (
    <section id="quem-somos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>O projeto</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Ciência não precisa ficar restrita à sala de aula.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Um centro de ciência do DCI é um ambiente de educação informal onde crianças, jovens,
            famílias e escolas aprendem por meio da experiência.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-8">
              <div className="mx-auto mb-8 w-fit rounded-full bg-brand px-8 py-3 font-display text-xl font-bold tracking-[0.2em] text-brand-foreground">
                STEAM
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {STEAM.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background p-5 text-center transition-transform hover:-translate-y-1"
                  >
                    <Icon className="size-7 text-brand-medium" aria-hidden="true" />
                    <span className="font-display text-sm font-bold text-brand">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                É o princípio <strong className="text-brand">hands-on, minds-on</strong>: participação
                ativa para transformar curiosidade em aprendizado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex h-full flex-col justify-center space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              O Discovery Centre opera essa abordagem há quatro décadas no Canadá. Em 2021, essa
              experiência deu origem ao{" "}
              <strong className="text-brand">Discovery Centre International</strong>, o braço
              responsável por estruturar a expansão do modelo para novos países. Agora, o Brasil faz
              parte dessa próxima etapa.
            </p>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-grey">
                Centros de ciência podem atuar como
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {ROLES.map((role) => (
                  <li
                    key={role}
                    className="rounded-lg border-l-4 border-brand-teal bg-surface px-4 py-3 text-sm font-medium text-foreground"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-base text-muted-foreground">
              Não substituem a educação formal.{" "}
              <strong className="text-brand">Ampliam o que ela consegue oferecer.</strong>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <ImagePlaceholder label="Escolas em visita ao centro" ratio="aspect-[4/3]" />
              <ImagePlaceholder label="Jovens e famílias em experiência interativa" ratio="aspect-[4/3]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
