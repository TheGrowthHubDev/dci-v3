import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
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

          {/* Simulador */}
          <Reveal variant="right" delay={120}>
            <div
              id="simulador"
              className="glow-brand relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand-deep/80 p-8 backdrop-blur-xl lg:p-12"
            >
              <div className="grid-lines pointer-events-none absolute inset-0 text-white opacity-40" aria-hidden="true" />
              <div className="relative">
                <SectionTag tone="light">Simulador de Impacto</SectionTag>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                  Ainda não sabe qual caminho é o seu?
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/80">
                  Em menos de dois minutos, responda algumas perguntas sobre seu perfil e sua região
                  para identificar quais dimensões do modelo DCI fazem mais sentido explorar.
                </p>

                {sent ? (
                  <div className="glass mt-10 flex flex-col items-start gap-3 rounded-2xl p-7">
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand-teal text-white">
                      <CheckCircle2 className="size-6" aria-hidden="true" />
                    </span>
                    <p className="mt-2 font-display text-xl font-extrabold text-white">Recebemos seus dados.</p>
                    <p className="text-sm leading-relaxed text-white/80">
                      O time do Discovery Centre International entrará em contato com os próximos passos
                      da simulação.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="nome" className="text-sm font-semibold text-white/90">
                          Nome completo
                        </label>
                        <input
                          id="nome"
                          name="nome"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-semibold text-white/90">
                          E-mail
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="perfil" className="text-sm font-semibold text-white/90">
                        Qual desses perfis mais se aproxima de você?
                      </label>
                      <select
                        id="perfil"
                        name="perfil"
                        value={form.profile}
                        onChange={(e) => setForm({ ...form, profile: e.target.value })}
                        className={`${FIELD_CLASS} appearance-none pr-10 [&>option]:text-foreground`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%2327a9e1' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "16px",
                        }}
                      >
                        <option value="">Selecione uma opção</option>
                        {PROFILES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-200" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-6 py-4 text-sm font-bold text-brand-deep"
                    >
                      Iniciar Simulação
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
