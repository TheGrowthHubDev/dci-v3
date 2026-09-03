import { useEffect, useRef, useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Configurações pendentes de validação com o cliente.
 * Substituir pelos links oficiais quando disponíveis.
 */
export const SCHEDULE_URL = "mailto:info@dcinternational.ca?subject=Agendar%20uma%20Conversa";
export const TOUR_URL =
  "https://my.matterport.com/models/3pmrByNdcc4?cta_origin=all_spaces_page&section=media";
export const TOUR_EMBED_URL = "https://my.matterport.com/show/?m=3pmrByNdcc4";
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
        if (entry?.isIntersecting) {
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

/**
 * Contador animado: dispara quando entra em viewport, anima de 0 até `value`.
 * `prefix`/`suffix` preservam texto ao redor do número sem alterar o conteúdo final.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

/**
 * Faixa com rolagem infinita (marquee), duplicando os itens para loop contínuo.
 * Pausa no hover; desativada automaticamente com prefers-reduced-motion.
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="marquee-track gap-12">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Divisor SVG sutil entre seções de cores diferentes (costura visual).
 * `flip` inverte a curva horizontalmente para variar o ritmo entre seções.
 */
export function SectionDivider({
  fromColor,
  toColor,
  flip = false,
  className,
}: {
  fromColor: string;
  toColor: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative h-10 w-full overflow-hidden lg:h-16", className)}
      style={{ backgroundColor: fromColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", flip && "-scale-x-100")}
      >
        <path
          d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,40 L1440,80 L0,80 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

/**
 * Hook de micro-interação: leve tilt 3D + escala ao mover o mouse sobre o card.
 * Amplitude intencionalmente sutil (editorial refinado, não "gamer").
 */
export function useTilt(maxTilt = 4) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const tiltY = (px - 0.5) * maxTilt * 2;
      const tiltX = (0.5 - py) * maxTilt * 2;
      el!.style.setProperty("--tilt-x", `${tiltX}deg`);
      el!.style.setProperty("--tilt-y", `${tiltY}deg`);
    }
    function onLeave() {
      el!.style.setProperty("--tilt-x", "0deg");
      el!.style.setProperty("--tilt-y", "0deg");
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);

  return ref;
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
          "flex size-10 items-center justify-center rounded-md border font-display text-sm font-bold lowercase tracking-tight",
          isLight
            ? "border-white/40 bg-transparent text-white"
            : "border-transparent bg-brand text-brand-foreground",
        )}
        aria-hidden="true"
      >
        dci
      </span>
      <span
        className={cn(
          "font-display text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.16em]",
          isLight ? "text-white" : "text-brand",
        )}
      >
        Discovery Centre
        <br />
        International
      </span>
    </span>
  );
}
