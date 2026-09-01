import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, NAV_LINKS, SCHEDULE_URL } from "./shared";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled || open
          ? "border-b border-border bg-background/95 backdrop-blur"
          : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <a href="#topo" aria-label="Discovery Centre International — início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SCHEDULE_URL}
            className="hidden rounded-md bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-deep md:inline-flex"
          >
            Agendar uma Conversa
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-brand lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden"
          aria-label="Navegação móvel"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-sm font-semibold text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SCHEDULE_URL}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-md bg-brand px-5 py-3 text-center text-sm font-bold text-brand-foreground"
          >
            Agendar uma Conversa
          </a>
        </nav>
      )}
    </header>
  );
}
