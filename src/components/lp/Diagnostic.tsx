import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, SCHEDULE_URL, SectionTag } from "./shared";
import {
  EMPTY_ANSWERS,
  EXISTING_ASSETS,
  LOCATION_STAGES,
  NO_ASSETS_OPTION,
  OPPORTUNITY_STAGES,
  ORGANIZATION_PROFILES,
  PRIMARY_OBJECTIVES,
  SUCCESS_PRIORITIES,
  THEMES,
  getGaps,
  getStageResult,
  getTopThemes,
  type Answers,
} from "@/lib/diagnostic";

const FIELD =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-brand-light focus:bg-white/10 focus:ring-4 focus:ring-brand-light/20";

const STEPS = ["cover", "q1", "q2", "q3", "lead", "q4", "q5", "q6", "result"] as const;
type Step = (typeof STEPS)[number];

function OptionButton({
  label,
  selected,
  onClick,
  multiple = false,
  disabled = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multiple?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5",
        selected
          ? "border-brand-light bg-brand-light/15 text-white"
          : "border-white/12 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10",
        disabled && !selected && "cursor-not-allowed opacity-40 hover:border-white/12 hover:bg-white/5",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center border transition-colors",
          multiple ? "rounded-md" : "rounded-full",
          selected ? "border-brand-light bg-brand-light text-brand-deep" : "border-white/30",
        )}
        aria-hidden="true"
      >
        {selected && <Check className="size-4" strokeWidth={3} />}
      </span>
      <span className="text-sm font-semibold leading-snug sm:text-base">{label}</span>
    </button>
  );
}

function StepShell({
  tag,
  title,
  hint,
  children,
}: {
  tag: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div key={title} className="animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
      <SectionTag tone="light">{tag}</SectionTag>
      <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {hint && <p className="mt-3 text-sm text-white/60">{hint}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Diagnostic() {
  const [step, setStep] = useState<Step>("cover");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [error, setError] = useState<string | null>(null);
  const [emailed, setEmailed] = useState(false);

  const index = STEPS.indexOf(step);
  const progress = Math.round((index / (STEPS.length - 1)) * 100);

  const result = useMemo(() => {
    if (step !== "result") return null;
    return {
      stage: getStageResult(answers),
      themes: getTopThemes(answers),
      gaps: getGaps(answers),
    };
  }, [step, answers]);

  function go(next: Step) {
    setError(null);
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setError(null);
  }

  function toggle(key: "existing_assets" | "success_priorities", value: string, max?: number) {
    setAnswers((a) => {
      const current = a[key];
      let next: string[];
      if (current.includes(value)) {
        next = current.filter((v) => v !== value);
      } else if (key === "existing_assets" && value === NO_ASSETS_OPTION) {
        next = [value];
      } else {
        const cleaned = key === "existing_assets" ? current.filter((v) => v !== NO_ASSETS_OPTION) : current;
        if (max && cleaned.length >= max) return a;
        next = [...cleaned, value];
      }
      return { ...a, [key]: next };
    });
    setError(null);
  }

  function requireValue(ok: boolean, message: string, next: Step) {
    if (!ok) {
      setError(message);
      return;
    }
    go(next);
  }

  const backTo: Partial<Record<Step, Step>> = {
    q1: "cover",
    q2: "q1",
    q3: "q2",
    lead: "q3",
    q4: "lead",
    q5: "q4",
    q6: "q5",
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-brand-deep text-white">
      <div className="aurora opacity-50" aria-hidden="true" />
      <div className="grid-lines pointer-events-none absolute inset-0 text-white opacity-20" aria-hidden="true" />

      {/* Topo */}
      <header className="relative border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 lg:px-8">
          <Link to="/" aria-label="Voltar para a página inicial">
            <Logo tone="light" className="h-9 sm:h-10" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Voltar ao site
          </Link>
        </div>
        {step !== "cover" && (
          <div className="h-1 w-full bg-white/10">
            <div
              className="h-full rounded-r-full bg-gradient-to-r from-brand-light to-brand-teal transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      <main className="relative mx-auto max-w-4xl px-5 pb-24 pt-12 lg:px-8 lg:pt-20">
        {step !== "cover" && step !== "result" && (
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
            Etapa {index} de {STEPS.length - 2}
          </p>
        )}

        {/* CAPA */}
        {step === "cover" && (
          <div className="animate-[fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
            <SectionTag tone="light">Diagnóstico DCI</SectionTag>
            <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Vamos entender melhor a ideia que você tem em mente.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Responda algumas perguntas sobre o projeto, a região e o que você espera construir. No
              final, você recebe uma leitura simples mostrando:
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  t: "Onde você está hoje",
                  d: "Se a ideia ainda está no começo ou se já existem elementos mais estruturados.",
                },
                {
                  t: "O que mais combina com o seu projeto",
                  d: "Educação, turismo, inovação, legado ou uma combinação desses caminhos.",
                },
                {
                  t: "O que ainda precisa ser pensado",
                  d: "Os principais pontos que merecem atenção antes de avançar.",
                },
              ].map((c) => (
                <div key={c.t} className="glass rounded-2xl p-6">
                  <h2 className="font-display text-lg font-extrabold leading-snug">{c.t}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{c.d}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go("q1")}
              className="btn-shine group mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep"
            >
              Começar
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p className="mt-4 text-xs font-semibold text-white/55">Gratuito · Cerca de 2 minutos</p>
          </div>
        )}

        {/* Q1 */}
        {step === "q1" && (
          <StepShell
            tag="Quem está avaliando"
            title="Qual opção mais se aproxima de você ou da organização que está avaliando esse projeto?"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {ORGANIZATION_PROFILES.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  selected={answers.organization_profile === o}
                  onClick={() => set("organization_profile", o)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* Q2 */}
        {step === "q2" && (
          <StepShell tag="O que mais interessa" title="O que mais chama sua atenção em um projeto como o DCI?">
            <div className="grid gap-3">
              {PRIMARY_OBJECTIVES.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  selected={answers.primary_objective === o}
                  onClick={() => set("primary_objective", o)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* Q3 */}
        {step === "q3" && (
          <StepShell tag="Onde isso poderia acontecer" title="Onde você imagina um projeto como esse?">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="cidade" className="text-sm font-semibold text-white/90">
                  Cidade ou região
                </label>
                <input
                  id="cidade"
                  className={FIELD}
                  value={answers.location_city}
                  onChange={(e) => set("location_city", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="estado" className="text-sm font-semibold text-white/90">
                  Estado
                </label>
                <input
                  id="estado"
                  className={FIELD}
                  value={answers.location_state}
                  onChange={(e) => set("location_state", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pais" className="text-sm font-semibold text-white/90">
                  País
                </label>
                <input
                  id="pais"
                  className={FIELD}
                  value={answers.location_country}
                  onChange={(e) => set("location_country", e.target.value)}
                />
              </div>
            </div>
            <p className="mt-10 font-display text-lg font-extrabold">E essa localização já está definida?</p>
            <div className="mt-4 grid gap-3">
              {LOCATION_STAGES.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  selected={answers.location_stage === o}
                  onClick={() => set("location_stage", o)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* CAPTURA */}
        {step === "lead" && (
          <StepShell
            tag="Seu diagnóstico já começou a tomar forma"
            title="Conte um pouco sobre quem está avaliando essa ideia."
            hint="Isso ajuda a deixar a leitura final mais adequada ao seu contexto."
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="text-sm font-semibold text-white/90">
                    Nome
                  </label>
                  <input
                    id="nome"
                    autoComplete="name"
                    className={FIELD}
                    value={answers.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="org" className="text-sm font-semibold text-white/90">
                    Organização / Grupo / Família
                  </label>
                  <input
                    id="org"
                    autoComplete="organization"
                    className={FIELD}
                    value={answers.organization}
                    onChange={(e) => set("organization", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="cargo" className="text-sm font-semibold text-white/90">
                    Cargo ou função
                  </label>
                  <input
                    id="cargo"
                    autoComplete="organization-title"
                    className={FIELD}
                    value={answers.role}
                    onChange={(e) => set("role", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-white/90">
                    E-mail corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={FIELD}
                    value={answers.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="tel" className="text-sm font-semibold text-white/90">
                    WhatsApp / telefone <span className="font-normal text-white/50">(opcional)</span>
                  </label>
                  <input
                    id="tel"
                    type="tel"
                    autoComplete="tel"
                    className={FIELD}
                    value={answers.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>
              <p className="mt-6 text-xs font-semibold text-white/55">Você já está na metade.</p>
            </div>
          </StepShell>
        )}

        {/* Q4 */}
        {step === "q4" && (
          <StepShell tag="Em que ponto essa ideia está" title="Em que ponto essa ideia está hoje?">
            <div className="grid gap-3">
              {OPPORTUNITY_STAGES.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  selected={answers.opportunity_stage === o}
                  onClick={() => set("opportunity_stage", o)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* Q5 */}
        {step === "q5" && (
          <StepShell
            tag="O que já existe"
            title="O que já existe, ou poderia ser mobilizado, para ajudar um projeto como esse a acontecer?"
            hint="Selecione tudo o que fizer sentido."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {EXISTING_ASSETS.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  multiple
                  selected={answers.existing_assets.includes(o)}
                  onClick={() => toggle("existing_assets", o)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* Q6 */}
        {step === "q6" && (
          <StepShell
            tag="O que mais importaria"
            title="Se esse projeto avançasse, quais resultados seriam mais importantes para você?"
            hint="Selecione até 2."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {SUCCESS_PRIORITIES.map((o) => (
                <OptionButton
                  key={o}
                  label={o}
                  multiple
                  selected={answers.success_priorities.includes(o)}
                  disabled={answers.success_priorities.length >= 2}
                  onClick={() => toggle("success_priorities", o, 2)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* RESULTADO */}
        {step === "result" && result && (
          <div className="animate-[fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
            <SectionTag tone="light">Diagnóstico DCI</SectionTag>
            <h1 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Seu diagnóstico DCI
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              Com base nas suas respostas, organizamos uma primeira leitura do projeto que você está
              imaginando.
            </p>

            <section className="glass mt-12 rounded-3xl p-7 sm:p-9">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                Onde você está hoje
              </h2>
              <p className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">{result.stage.title}</p>
              <p className="mt-4 text-base leading-relaxed text-white/80">{result.stage.text}</p>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-xl font-extrabold sm:text-2xl">
                Os caminhos que mais aparecem nas suas respostas
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {result.themes.map((key, i) => (
                  <div key={key} className="glass rounded-2xl p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
                      {i === 0 ? "Principal" : "Também relevante"}
                    </span>
                    <p className="mt-3 font-display text-xl font-extrabold">{THEMES[key].title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{THEMES[key].text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-xl font-extrabold sm:text-2xl">Pontos que vale aprofundar</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {result.gaps.map((g) => (
                  <div key={g.title} className="rounded-2xl border border-white/12 bg-white/5 p-6">
                    <p className="font-display text-lg font-extrabold">{g.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{g.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-3xl border border-white/12 bg-white/5 p-7 sm:p-9">
              <p className="font-display text-lg font-extrabold">Este é um primeiro olhar.</p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                O diagnóstico organiza o que você compartilhou e ajuda a mostrar por onde a conversa
                pode começar. Ele não define investimento, tamanho do centro, retorno financeiro ou
                viabilidade do projeto. Esses pontos dependem de uma análise mais detalhada com o time
                DCI.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={SCHEDULE_URL}
                  className="btn-shine group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-7 py-4 text-sm font-bold text-brand-deep"
                >
                  Conversar com o DCI sobre meu projeto
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setEmailed(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Receber meu diagnóstico por e-mail
                </button>
              </div>
              {emailed && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-teal/20 px-4 py-3 text-sm font-semibold text-white">
                  <Sparkles className="size-4" aria-hidden="true" />
                  Anotado! Enviaremos o diagnóstico para {answers.email || "o seu e-mail"}.
                </p>
              )}
            </section>
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-xl bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-200" role="alert">
            {error}
          </p>
        )}

        {/* Navegação */}
        {step !== "cover" && step !== "result" && (
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(backTo[step] as Step)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Voltar
            </button>
            <button
              type="button"
              onClick={() => {
                if (step === "q1")
                  return requireValue(!!answers.organization_profile, "Escolha uma opção para continuar.", "q2");
                if (step === "q2")
                  return requireValue(!!answers.primary_objective, "Escolha uma opção para continuar.", "q3");
                if (step === "q3")
                  return requireValue(
                    !!answers.location_city.trim() && !!answers.location_country.trim() && !!answers.location_stage,
                    "Informe ao menos cidade, país e o estágio da localização.",
                    "lead",
                  );
                if (step === "lead")
                  return requireValue(
                    !!answers.name.trim() &&
                      !!answers.organization.trim() &&
                      !!answers.role.trim() &&
                      /\S+@\S+\.\S+/.test(answers.email),
                    "Preencha nome, organização, cargo e um e-mail válido.",
                    "q4",
                  );
                if (step === "q4")
                  return requireValue(!!answers.opportunity_stage, "Escolha uma opção para continuar.", "q5");
                if (step === "q5")
                  return requireValue(
                    answers.existing_assets.length > 0,
                    "Selecione ao menos uma opção para continuar.",
                    "q6",
                  );
                if (step === "q6")
                  return requireValue(
                    answers.success_priorities.length > 0,
                    "Selecione ao menos um resultado para continuar.",
                    "result",
                  );
              }}
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep"
            >
              {step === "lead" ? "Continuar" : step === "q6" ? "Ver meu diagnóstico" : "Continuar"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
