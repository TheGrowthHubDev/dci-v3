import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { ADDRESS, CONTACT_EMAIL, Reveal, SCHEDULE_URL, SectionTag } from "./shared";

const PROFILES = [
  "Operador / empreendedor",
  "Financiador / filantropo / family office",
  "Governo / instituição pública",
  "Empresa / fundação / parceiro institucional",
  "Outro",
];

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
    <section id="fale-conosco" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionTag>Próximo Passo</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Escolha como você quer dar o próximo passo.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-xl bg-brand p-8 text-brand-foreground lg:p-10">
              <h3 className="font-display text-2xl font-bold">Já sabe que faz sentido conversar?</h3>
              <p className="mt-4 text-base leading-relaxed text-brand-foreground/80">
                Fale diretamente com o time do Discovery Centre International sobre contexto,
                objetivos e aderência ao modelo.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 font-semibold hover:underline"
                >
                  <Mail className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <p className="flex items-start gap-3 text-brand-foreground/80">
                  <MapPin className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
                  {ADDRESS}
                </p>
              </div>
              <a
                href={SCHEDULE_URL}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-brand-foreground px-6 py-4 pt-4 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
              >
                Agendar uma Conversa <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              id="simulador"
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-8 lg:p-10"
            >
              <SectionTag>Simulador de Impacto</SectionTag>
              <h3 className="mt-4 font-display text-2xl font-bold text-brand">
                Ainda não sabe qual caminho é o seu?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Em menos de dois minutos, responda algumas perguntas sobre seu perfil e sua região
                para identificar quais dimensões do modelo DCI fazem mais sentido explorar.
              </p>

              {sent ? (
                <div className="mt-8 flex flex-1 flex-col items-start justify-center gap-3 rounded-lg border border-brand-teal/40 bg-background p-6">
                  <CheckCircle2 className="size-7 text-brand-teal" aria-hidden="true" />
                  <p className="font-display text-lg font-bold text-brand">Recebemos seus dados.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    O time do Discovery Centre International entrará em contato com os próximos passos
                    da simulação.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
                  <div>
                    <label htmlFor="nome" className="text-sm font-semibold text-foreground">
                      Nome completo
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-medium focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-medium focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="perfil" className="text-sm font-semibold text-foreground">
                      Qual desses perfis mais se aproxima de você?
                    </label>
                    <select
                      id="perfil"
                      name="perfil"
                      value={form.profile}
                      onChange={(e) => setForm({ ...form, profile: e.target.value })}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-medium focus:ring-2 focus:ring-ring/30"
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
                    <p className="text-sm font-semibold text-destructive" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-md bg-brand px-6 py-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-deep"
                  >
                    Iniciar Simulação
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
