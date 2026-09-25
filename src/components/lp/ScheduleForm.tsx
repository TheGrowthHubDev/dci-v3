import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { captureTracking, EMPTY_TRACKING, type Tracking } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { SectionTag } from "./shared";

const FIELD =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-light focus:bg-white/10";
const FIELD_INVALID = "border-red-400/80 focus:border-red-400";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const EMPTY = { name: "", organization: "", role: "", email: "", phone: "" };

/** Máscara de telefone (BR): (11) 91234-5678 */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function ScheduleForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Partial<Record<"name" | "organization" | "role" | "email", boolean>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [tracking, setTracking] = useState<Tracking>(EMPTY_TRACKING);

  useEffect(() => {
    setTracking(captureTracking());
    // Se o lead já preencheu os dados antes nesta sessão, reaproveita
    try {
      const raw = window.sessionStorage.getItem("dci_lead_contact");
      if (raw) setForm((f) => ({ ...f, ...(JSON.parse(raw) as typeof EMPTY) }));
    } catch {
      /* segue com o formulário vazio */
    }
  }, []);

  const set = (k: keyof typeof EMPTY, v: string) => setForm((f) => ({ ...f, [k]: v.slice(0, 200) }));

  const clearError = (k: "name" | "organization" | "role" | "email") => setInvalid((s) => (s[k] ? { ...s, [k]: false } : s));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const f = {
      name: form.name.trim(),
      organization: form.organization.trim(),
      role: form.role.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };
    const errors = {
      name: !f.name,
      organization: !f.organization,
      role: !f.role,
      email: !EMAIL_RE.test(f.email),
    };
    setInvalid(errors);
    if (errors.name || errors.organization || errors.role || errors.email) {
      setError(
        errors.email && f.email
          ? "Informe um e-mail válido, ex.: nome@empresa.com."
          : "Preencha nome, organização e cargo, e informe um e-mail válido.",
      );
      return;
    }
    setError(null);
    setSending(true);
    const sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `dci-${Date.now()}`;
    // Nada é enviado aqui: o webhook dispara uma única vez, no final do diagnóstico,
    // com contato + respostas + UTMs juntos. Guardamos contato e sessão para o quiz usar.
    try {
      window.sessionStorage.setItem("dci_lead_contact", JSON.stringify(f));
      window.sessionStorage.setItem("dci_lead_session", sessionId);
    } catch {
      /* sem persistência: o quiz segue sem contato */
    }
    setSending(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="relative flex h-full flex-col">
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-teal/20 px-4 py-2 text-xs font-bold text-brand-light">
          <Check className="size-4" aria-hidden="true" /> Recebemos seu contato, {form.name.split(" ")[0]}!
        </p>
        <SectionTag tone="light">Diagnóstico DCI</SectionTag>
        <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
          Um Discovery Centre faria sentido para a sua região?
        </h3>
        <p className="mt-5 text-base leading-relaxed text-white/80">
          Responda algumas perguntas rápidas e veja quais caminhos fazem mais sentido para o projeto
          que você está imaginando.
        </p>
        <Link
          to="/diagnostico"
          className="btn-shine group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep"
        >
          Fazer diagnóstico
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <p className="mt-4 text-xs font-semibold text-white/55">Gratuito · Leva cerca de 2 minutos</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex h-full flex-col">
      <h3 className="font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
        Agende uma conversa
      </h3>
      <p className="mt-4 text-base leading-relaxed text-white/80">
        Deixe seus dados e o time do Discovery Centre International entrará em contato.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ag-nome" className="text-sm font-semibold text-white/90">Nome</label>
          <input
            id="ag-nome"
            autoComplete="name"
            className={cn(FIELD, invalid.name && FIELD_INVALID)}
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              clearError("name");
            }}
          />
        </div>
        <div>
          <label htmlFor="ag-org" className="text-sm font-semibold text-white/90">Organização / Grupo / Família</label>
          <input
            id="ag-org"
            autoComplete="organization"
            className={cn(FIELD, invalid.organization && FIELD_INVALID)}
            value={form.organization}
            onChange={(e) => {
              set("organization", e.target.value);
              clearError("organization");
            }}
          />
        </div>
        <div>
          <label htmlFor="ag-cargo" className="text-sm font-semibold text-white/90">Cargo ou função</label>
          <input
            id="ag-cargo"
            autoComplete="organization-title"
            className={cn(FIELD, invalid.role && FIELD_INVALID)}
            value={form.role}
            onChange={(e) => {
              set("role", e.target.value);
              clearError("role");
            }}
          />
        </div>
        <div>
          <label htmlFor="ag-email" className="text-sm font-semibold text-white/90">E-mail corporativo</label>
          <input
            id="ag-email"
            type="email"
            autoComplete="email"
            className={cn(FIELD, invalid.email && FIELD_INVALID)}
            value={form.email}
            onChange={(e) => {
              set("email", e.target.value);
              clearError("email");
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ag-tel" className="text-sm font-semibold text-white/90">
            WhatsApp / telefone <span className="font-normal text-white/50">(opcional)</span>
          </label>
          <input
            id="ag-tel"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(11) 91234-5678"
            className={FIELD}
            value={form.phone}
            onChange={(e) => set("phone", maskPhone(e.target.value))}
          />
        </div>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-semibold text-destructive-foreground">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="btn-shine group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep disabled:opacity-60"
      >
        {sending ? "Enviando..." : "Agendar conversa"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  );
}
