import { ArrowUpRight } from "lucide-react";
import { ADDRESS, CONTACT_EMAIL, Logo, NAV_LINKS, SCHEDULE_URL } from "./shared";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b1338] py-16 text-brand-foreground lg:py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-foreground/70">
              Discovery Centre International | Uma expansão do Discovery Centre, Halifax, Canadá
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="eyebrow text-brand-light">Navegação</p>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav-underline text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-brand-light">Contato</p>
            <ul className="mt-5 space-y-2.5 text-sm text-brand-foreground/75">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="nav-underline transition-colors hover:text-brand-foreground">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="leading-relaxed">{ADDRESS}</li>
            </ul>
            <a
              href={SCHEDULE_URL}
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-brand-light/40 px-5 py-2.5 text-sm font-bold text-brand-light transition-colors hover:border-brand-light hover:bg-brand-light hover:text-brand-deep"
            >
              Agendar uma Conversa
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-foreground/15 pt-6 text-xs text-brand-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Discovery Centre International. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#topo" className="transition-colors hover:text-brand-foreground">
              Política de Privacidade
            </a>
            <a href="#topo" className="transition-colors hover:text-brand-foreground">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
