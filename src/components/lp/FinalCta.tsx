import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ADDRESS, BrandOrbit, CONTACT_EMAIL, Reveal, SCHEDULE_URL, SectionTag, WordReveal } from "./shared";

const PROFILES = [
  "Operador / empreendedor",
  "Financiador / filantropo / family office",
  "Governo / instituição pública",
  "Empresa / fundação / parceiro institucional",
  "Outro",
];

const FIELD_CLASS =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-brand-light focus:bg-white/10 focus:ring-4 focus:ring-brand-light/20";

export function FinalCta() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", profile: "" });
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.profile) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setError(null);
    setSent(true);
  }

  return (
    <section
      id="fale-conosco"
      className="relative isolate overflow-hidden bg-brand-deep py-24 text-white lg:py-36"
    >
      {/* Fundo cinematográfico */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/dci/cta-backdrop.jpg"
          alt=""
          className="kenburns h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/70 to-brand-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-transparent to-brand-deep/80" />
        <div className="aurora opacity-60" />
      </div>
      <BrandOrbit className="absolute -left-40 top-1/2 hidden w-[640px] -translate-y-1/2 opacity-50 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade">
            <SectionTag tone="light">Próximo Passo</SectionTag>
          </Reveal>
          <WordReveal
            text="Escolha como você quer dar o próximo passo."
            className="text-display mt-6 text-white"
            stagger={50}
          />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Contato direto */}
          <Reveal variant="left">
            <div className="glass flex h-full flex-col rounded-[2rem] p-8 lg:p-12">
              <h3 className="font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                Já sabe que faz sentido conversar?
              </h3>
              <p className="mt-5 text-base leading-relaxed text-white/80 lg:text-lg">
                Fale diretamente com o time do Discovery Centre International sobre contexto,
                objetivos e aderência ao modelo.
              </p>
              <div className="mt-10 space-y-5 text-sm">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center gap-4 font-semibold"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-light transition-colors group-hover:bg-brand-light group-hover:text-brand-deep">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span className="nav-underline text-base">{CONTACT_EMAIL}</span>
                </a>
                <p className="flex items-center gap-4 text-white/80">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-light">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-base">{ADDRESS}</span>
                </p>
              </div>
              <a
                href={SCHEDULE_URL}
                className="btn-shine group mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand"
              >
                Agendar uma Conversa{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Diagnóstico DCI */}
          <Reveal variant="right" delay={120}>
            <div
              id="simulador"
              className="glow-brand relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand-deep/80 p-8 backdrop-blur-xl lg:p-12"
            >
              <div className="grid-lines pointer-events-none absolute inset-0 text-white opacity-40" aria-hidden="true" />
              <div className="relative flex h-full flex-col">
                <SectionTag tone="light">Diagnóstico DCI</SectionTag>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                  Um Discovery Centre faria sentido para a sua região?
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/80">
                  Responda algumas perguntas rápidas e veja quais caminhos fazem mais sentido para o
                  projeto que você está imaginando.
                </p>
                <Link
                  to="/diagnostico"
                  className="btn-shine group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep"
                >
                  Fazer diagnóstico
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className="mt-4 text-xs font-semibold text-white/55">
                  Gratuito · Leva cerca de 2 minutos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
