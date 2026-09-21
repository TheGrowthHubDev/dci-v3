/**
 * Captura e persistência de parâmetros de campanha (UTMs, click ids, referrer).
 * Os valores são guardados no sessionStorage na primeira visita da sessão,
 * então continuam disponíveis mesmo depois de navegar para /diagnostico.
 */

const KEY = "dci_tracking";

export type Tracking = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_id: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landing_page: string;
};

export const EMPTY_TRACKING: Tracking = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  utm_id: "",
  gclid: "",
  fbclid: "",
  referrer: "",
  landing_page: "",
};

const PARAMS: Array<keyof Tracking> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
];

/** Lê a URL atual, mescla com o que já estava salvo e devolve o tracking. */
export function captureTracking(): Tracking {
  if (typeof window === "undefined") return EMPTY_TRACKING;

  let stored: Partial<Tracking> = {};
  try {
    stored = JSON.parse(window.sessionStorage.getItem(KEY) ?? "{}") as Partial<Tracking>;
  } catch {
    stored = {};
  }

  const search = new URLSearchParams(window.location.search);
  const next: Tracking = { ...EMPTY_TRACKING, ...stored };

  for (const p of PARAMS) {
    const value = search.get(p);
    if (value) next[p] = value;
  }
  if (!next.referrer) next.referrer = document.referrer || "";
  if (!next.landing_page) next.landing_page = window.location.href;

  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* sessionStorage indisponível: seguimos sem persistir */
  }

  return next;
}
