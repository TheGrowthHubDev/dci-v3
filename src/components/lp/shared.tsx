import { useEffect, useRef, useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Configurações pendentes de validação com o cliente.
 * Substituir pelos links oficiais quando disponíveis.
 */
export const SCHEDULE_URL = "mailto:info@dcinternational.ca?subject=Agendar%20uma%20Conversa";
export const TOUR_URL = "https://thediscoverycentre.ca/";
export const CONTACT_EMAIL = "info@dcinternational.ca";
export const ADDRESS = "1215 Lower Water Street, Halifax, Nova Scotia, Canadá";

export const NAV_LINKS = [
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Tour Virtual", href: "#tour-virtual" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Para Quem É", href: "#para-quem-e" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Fale Conosco", href: "#fale-conosco" },
];

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionTag({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  return (
    <span
      className={cn(
        "section-tag",
        tone === "brand" ? "text-brand-medium" : "text-brand-light",
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          tone === "brand" ? "bg-brand-medium" : "bg-brand-light",
        )}
      />
      {children}
    </span>
  );
}

export function ImagePlaceholder({
  label,
  className,
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface p-6 text-center",
        ratio,
        className,
      )}
      role="img"
      aria-label={`Espaço reservado para imagem: ${label}`}
    >
      <ImageIcon className="size-6 text-brand-grey" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-grey">
        {label}
      </span>
    </div>
  );
}

export function Logo({ tone = "brand" }: { tone?: "brand" | "light" }) {
  const isLight = tone === "light";
  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-md font-display text-sm font-bold lowercase tracking-tight",
          isLight ? "bg-background text-brand" : "bg-brand text-brand-foreground",
        )}
        aria-hidden="true"
      >
        dci
      </span>
      <span
        className={cn(
          "font-display text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.16em]",
          isLight ? "text-brand-foreground" : "text-brand",
        )}
      >
        Discovery Centre
        <br />
        International
      </span>
    </span>
  );
}
