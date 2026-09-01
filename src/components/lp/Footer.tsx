import { ADDRESS, CONTACT_EMAIL, Logo, NAV_LINKS, SCHEDULE_URL } from "./shared";

export function Footer() {
  return (
    <footer className="bg-brand-deep py-14 text-brand-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-foreground/70">
              Discovery Centre International | Uma expansão do Discovery Centre, Halifax, Canadá
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-light">Navegação</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-light">Contato</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-foreground/75">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-foreground">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>{ADDRESS}</li>
            </ul>
            <a
              href={SCHEDULE_URL}
              className="mt-5 inline-block text-sm font-bold text-brand-light hover:underline"
            >
              Agendar uma Conversa
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-brand-foreground/15 pt-6 text-xs text-brand-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Discovery Centre International. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#topo" className="hover:text-brand-foreground">
              Política de Privacidade
            </a>
            <a href="#topo" className="hover:text-brand-foreground">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
