import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, NAV_LINKS, SCHEDULE_URL, ScrollProgress } from "./shared";

/**
 * Observa as seções ancoradas na navegação e devolve o href da seção ativa.
 */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-brand-deep/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/50 via-black/20 to-transparent",
      )}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <a href="#topo" aria-label="Discovery Centre International — início" className="shrink-0">
          <Logo tone="light" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "nav-underline text-[0.8rem] font-semibold tracking-wide transition-colors",
                active === link.href ? "text-white" : "text-white/75 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SCHEDULE_URL}
            className="btn-shine glass hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-brand md:inline-flex"
          >
            Agendar uma Conversa
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="glass inline-flex size-11 items-center justify-center rounded-full text-white lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {scrolled && <ScrollProgress />}
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-brand-deep/95 px-5 pb-8 pt-3 backdrop-blur-xl lg:hidden"
          aria-label="Navegação móvel"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 font-display text-lg font-bold text-white/90 transition-colors hover:text-white"
              style={{ animation: `fade-up 0.5s ${i * 40}ms both cubic-bezier(0.16,1,0.3,1)` }}
            >
              {link.label}
              <ArrowUpRight className="size-4 text-brand-light" aria-hidden="true" />
            </a>
          ))}
          <a
            href={SCHEDULE_URL}
            onClick={() => setOpen(false)}
            className="btn-shine mt-6 block rounded-full bg-white px-5 py-4 text-center text-sm font-bold text-brand"
          >
            Agendar uma Conversa
          </a>
        </nav>
      )}
    </header>
  );
}
