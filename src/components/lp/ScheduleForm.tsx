import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check } from "lucide-react";
import { sendDiagnosticLead } from "@/lib/lead.functions";
import { captureTracking, EMPTY_TRACKING, type Tracking } from "@/lib/tracking";
import { SectionTag } from "./shared";

const FIELD =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-light focus:bg-white/10";

const EMPTY = { name: "", organization: "", role: "", email: "", phone: "" };

export function ScheduleForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [tracking, setTracking] = useState<Tracking>(EMPTY_TRACKING);
  const submitLead = useServerFn(sendDiagnosticLead);

  useEffect(() => setTracking(captureTracking()), []);

  const set = (k: keyof typeof EMPTY, v: string) => setForm((f) => ({ ...f, [k]: v.slice(0, 200) }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const f = {
      name: form.name.trim(),
      organization: form.organization.trim(),
      role: form.role.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };
    if (!f.name || !f.organization || !f.role || !/\S+@\S+\.\S+/.test(f.email)) {
      setError("Preencha nome, organização, cargo e um e-mail válido.");
      return;
    }
    setError(null);
    setSending(true);
    const now = new Date().toISOString();
    await submitLead({
      data: {
        event: "agendamento_solicitado",
        form: "agendar_conversa",
        session_id:
          typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `dci-${Date.now()}`,
        started_at: now,
        submitted_at: now,
        page_url: window.location.href,
        contato_nome: f.name,
        contato_organizacao: f.organization,
        contato_cargo: f.role,
        contato_email: f.email,
        contato_telefone: f.phone,
        ...tracking,
        user_agent: navigator.userAgent,
      },
    }).catch(() => undefined);
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
          <input id="ag-nome" autoComplete="name" className={FIELD} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label htmlFor="ag-org" className="text-sm font-semibold text-white/90">Organização / Grupo / Família</label>
          <input id="ag-org" autoComplete="organization" className={FIELD} value={form.organization} onChange={(e) => set("organization", e.target.value)} />
        </div>
        <div>
          <label htmlFor="ag-cargo" className="text-sm font-semibold text-white/90">Cargo ou função</label>
          <input id="ag-cargo" autoComplete="organization-title" className={FIELD} value={form.role} onChange={(e) => set("role", e.target.value)} />
        </div>
        <div>
          <label htmlFor="ag-email" className="text-sm font-semibold text-white/90">E-mail corporativo</label>
          <input id="ag-email" type="email" autoComplete="email" className={FIELD} value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ag-tel" className="text-sm font-semibold text-white/90">
            WhatsApp / telefone <span className="font-normal text-white/50">(opcional)</span>
          </label>
          <input id="ag-tel" type="tel" autoComplete="tel" className={FIELD} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
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
