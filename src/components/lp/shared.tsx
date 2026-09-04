import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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

export type RevealVariant = "up" | "fade" | "scale" | "left" | "right" | "blur" | "wipe";

/**
 * Hook: observa um elemento e devolve `true` na primeira vez que entra em viewport.
 */
export function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "li" | "article" | "section" | "figure";
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Revela um título palavra por palavra (sobe de baixo, com stagger).
 * Recebe APENAS string: o texto renderizado é idêntico ao original.
 */
export function WordReveal({
  text,
  className,
  stagger = 60,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} data-visible={visible} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="word-reveal">
            <span style={{ "--wd": `${delay + i * stagger}ms` } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Barra de progresso de leitura (fixa no header).
 */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--progress", p.toFixed(4));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={cn("scroll-progress", className)} aria-hidden="true" />;
}

/**
 * Hook: atualiza `--mx/--my` (px) no elemento para o spotlight de `card-premium`.
 */
export function useMouseGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      el!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el!.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}

/**
 * Hook: parallax vertical leve (translateY proporcional ao scroll) via `--py` em px.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const rect = el!.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el!.style.setProperty("--py", `${(-center * speed).toFixed(1)}px`);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

/**
 * Grafismo de marca: anéis orbitais concêntricos em SVG (decorativo).
 */
export function BrandOrbit({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "brand";
}) {
  const stroke = tone === "light" ? "rgba(255,255,255,0.18)" : "rgba(42,56,143,0.16)";
  const accent = tone === "light" ? "var(--brand-light)" : "var(--brand-medium)";
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      fill="none"
    >
      <g className="spin-slow">
        <circle cx="300" cy="300" r="280" stroke={stroke} strokeDasharray="4 10" />
        <circle cx="300" cy="20" r="5" fill={accent} />
      </g>
      <g className="spin-slow-reverse">
        <circle cx="300" cy="300" r="210" stroke={stroke} />
        <circle cx="510" cy="300" r="4" fill="var(--brand-teal)" />
      </g>
      <g className="spin-slow">
        <circle cx="300" cy="300" r="140" stroke={stroke} strokeDasharray="2 6" />
        <circle cx="300" cy="440" r="3" fill={accent} />
      </g>
      <circle cx="300" cy="300" r="70" stroke={stroke} />
      <circle cx="300" cy="300" r="3" fill={accent} />
    </svg>
  );
}

/**
 * Número decorativo de seção (kicker "01", "02"...). Marcado aria-hidden:
 * é ornamento visual, não conteúdo.
 */
export function SectionNumber({
  n,
  tone = "brand",
  className,
}: {
  n: string;
  tone?: "brand" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        tone === "brand" ? "text-outline" : "text-outline-light",
        "text-[5.5rem] leading-none sm:text-[7rem] lg:text-[9rem]",
        className,
      )}
      aria-hidden="true"
    >
      {n}
    </span>
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

/**
 * Logo oficial horizontal do Discovery Centre International.
 * `brand` = versao colorida (fundos claros); `light` = versao reversa
 * (wordmark branco, circulo azul preservado) para fundos escuros.
 * Proporcao do arquivo: 834x314 (~2.66:1).
 */
export function Logo({
  tone = "brand",
  className,
}: {
  tone?: "brand" | "light";
  className?: string;
}) {
  const src =
    tone === "light"
      ? "/images/dci/logos/logo-dci-light.png"
      : "/images/dci/logos/logo-dci-color.png";
  return (
    <img
      src={src}
      alt="Discovery Centre International"
      width={834}
      height={314}
      decoding="async"
      className={cn("block h-11 w-auto select-none", className)}
      draggable={false}
    />
  );
}
