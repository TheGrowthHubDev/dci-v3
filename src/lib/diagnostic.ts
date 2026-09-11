/**
 * Dados e lógica de pontuação do Diagnóstico DCI.
 * A pontuação NUNCA é exibida ao lead: ela apenas seleciona os textos do resultado.
 */

export type Answers = {
  organization_profile: string;
  primary_objective: string;
  location_city: string;
  location_state: string;
  location_country: string;
  location_stage: string;
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  opportunity_stage: string;
  existing_assets: string[];
  success_priorities: string[];
};

export const EMPTY_ANSWERS: Answers = {
  organization_profile: "",
  primary_objective: "",
  location_city: "",
  location_state: "",
  location_country: "",
  location_stage: "",
  name: "",
  organization: "",
  role: "",
  email: "",
  phone: "",
  opportunity_stage: "",
  existing_assets: [],
  success_priorities: [],
};

export const ORGANIZATION_PROFILES = [
  "Grupo educacional",
  "Operador de entretenimento ou atração",
  "Família / Family Office",
  "Fundação ou instituto",
  "Empresa / grupo empresarial",
  "Governo / instituição pública",
  "Universidade / instituição de pesquisa",
  "Outro",
];

export const PRIMARY_OBJECTIVES = [
  "Ampliar o acesso à educação e STEAM",
  "Criar uma nova atração para famílias e visitantes",
  "Fortalecer turismo e desenvolvimento regional",
  "Aproximar jovens de ciência, tecnologia e profissões do futuro",
  "Criar conexões entre empresas, universidades e comunidade",
  "Construir um legado familiar ou institucional",
  "Criar uma nova frente de atuação para a organização",
  "Combinar diferentes objetivos",
];

export const LOCATION_STAGES = [
  "Sim, já existe um local em avaliação",
  "Já temos uma região em mente, mas ainda sem local específico",
  "Ainda estamos explorando possibilidades",
];

export const OPPORTUNITY_STAGES = [
  "Estou começando a explorar",
  "Já existe interesse dentro da organização ou família",
  "Já estamos conversando internamente sobre isso",
  "Já existem possíveis parceiros envolvidos",
  "Já existe uma região ou local em avaliação",
  "Já existe discussão sobre investimento",
  "O projeto já está em uma etapa mais avançada",
];

export const NO_ASSETS_OPTION = "Ainda estamos começando esse mapeamento";

export const EXISTING_ASSETS = [
  "Empresas ou patrocinadores",
  "Escolas ou grupos educacionais",
  "Universidades ou instituições de pesquisa",
  "Governo ou instituições públicas",
  "Família, fundação ou investidor âncora",
  "Operador local",
  "Local ou terreno em potencial",
  "Capacidade de mobilizar recursos",
  "Rede de parceiros institucionais",
  NO_ASSETS_OPTION,
];

export const SUCCESS_PRIORITIES = [
  "Alcance educacional",
  "Formação de talentos e STEAM",
  "Atração de visitantes e turismo",
  "Desenvolvimento regional",
  "Conexão com empresas e universidades",
  "Sustentabilidade da operação",
  "Impacto social",
  "Legado familiar ou institucional",
  "Fortalecimento da organização ou marca",
];

/* ---------------- Onde você está hoje ---------------- */

const STAGE_POINTS: Record<string, number> = {
  "Estou começando a explorar": 0,
  "Já existe interesse dentro da organização ou família": 1,
  "Já estamos conversando internamente sobre isso": 2,
  "Já existem possíveis parceiros envolvidos": 3,
  "Já existe uma região ou local em avaliação": 3,
  "Já existe discussão sobre investimento": 4,
  "O projeto já está em uma etapa mais avançada": 5,
};

export type StageResult = { title: string; text: string };

const STAGE_RESULTS: StageResult[] = [
  {
    title: "Explorando a ideia",
    text: "Você está em uma fase inicial. O mais importante agora é entender melhor o que esse projeto poderia representar e quais condições precisariam ser construídas para avançar.",
  },
  {
    title: "Construindo o caminho",
    text: "Sua ideia já tem alguns elementos mais definidos. O próximo passo é entender como região, parceiros, operação e objetivos podem se conectar.",
  },
  {
    title: "Pronto para uma conversa mais aprofundada",
    text: "Seu cenário já reúne diferentes elementos que permitem uma conversa mais concreta sobre o modelo DCI e os próximos passos.",
  },
];

function realAssets(assets: string[]) {
  return assets.filter((a) => a !== NO_ASSETS_OPTION);
}

export function getStageResult(a: Answers): StageResult {
  const base = STAGE_POINTS[a.opportunity_stage] ?? 0;
  const extra = Math.min(realAssets(a.existing_assets).length * 0.5, 3);
  const total = base + extra;
  if (total >= 5.5) return STAGE_RESULTS[2]!;
  if (total >= 2.5) return STAGE_RESULTS[1]!;
  return STAGE_RESULTS[0]!;
}

/* ---------------- O que mais combina ---------------- */

export type ThemeKey = "educacao" | "regional" | "inovacao" | "legado";

export const THEMES: Record<ThemeKey, { title: string; text: string }> = {
  educacao: {
    title: "Educação e STEAM",
    text: "Educação, ciência e formação aparecem como prioridades importantes para o projeto que você está imaginando.",
  },
  regional: {
    title: "Desenvolvimento regional e visitação",
    text: "Turismo, atração de visitantes e desenvolvimento da região aparecem entre os caminhos mais relevantes para o seu contexto.",
  },
  inovacao: {
    title: "Inovação e conexões",
    text: "A aproximação entre ciência, empresas, universidades, tecnologia e formação de talentos aparece como uma frente importante.",
  },
  legado: {
    title: "Legado e presença institucional",
    text: "Impacto de longo prazo, presença institucional e construção de legado aparecem com força nas suas respostas.",
  },
};

const THEME_MAP: Record<string, ThemeKey[]> = {
  // primary_objective
  "Ampliar o acesso à educação e STEAM": ["educacao"],
  "Criar uma nova atração para famílias e visitantes": ["regional"],
  "Fortalecer turismo e desenvolvimento regional": ["regional"],
  "Aproximar jovens de ciência, tecnologia e profissões do futuro": ["educacao"],
  "Criar conexões entre empresas, universidades e comunidade": ["inovacao"],
  "Construir um legado familiar ou institucional": ["legado"],
  "Criar uma nova frente de atuação para a organização": ["inovacao"],
  // success_priorities
  "Alcance educacional": ["educacao"],
  "Formação de talentos e STEAM": ["educacao", "inovacao"],
  "Atração de visitantes e turismo": ["regional"],
  "Desenvolvimento regional": ["regional"],
  "Conexão com empresas e universidades": ["inovacao"],
  "Impacto social": ["educacao", "legado"],
  "Legado familiar ou institucional": ["legado"],
  "Fortalecimento da organização ou marca": ["legado"],
};

const PROFILE_SIGNALS: Record<string, ThemeKey> = {
  "Grupo educacional": "educacao",
  "Universidade / instituição de pesquisa": "inovacao",
  "Operador de entretenimento ou atração": "regional",
  "Família / Family Office": "legado",
  "Fundação ou instituto": "legado",
  "Empresa / grupo empresarial": "inovacao",
  "Governo / instituição pública": "regional",
};

export function getTopThemes(a: Answers): ThemeKey[] {
  const score: Record<ThemeKey, number> = { educacao: 0, regional: 0, inovacao: 0, legado: 0 };

  (THEME_MAP[a.primary_objective] ?? []).forEach((t) => (score[t] += 2));
  a.success_priorities.forEach((p) => (THEME_MAP[p] ?? []).forEach((t) => (score[t] += 3)));
  const signal = PROFILE_SIGNALS[a.organization_profile];
  if (signal) score[signal] += 1;

  const tieBreak = THEME_MAP[a.primary_objective]?.[0];
  const ordered = (Object.keys(score) as ThemeKey[]).sort((x, y) => {
    if (score[y] !== score[x]) return score[y] - score[x];
    if (x === tieBreak) return -1;
    if (y === tieBreak) return 1;
    return 0;
  });
  return ordered.slice(0, 2);
}

/* ---------------- O que ainda precisa ser pensado ---------------- */

type Gap = { title: string; text: string; assets: string[] };

const GAPS: Gap[] = [
  {
    title: "Parceiros locais",
    text: "Mapear empresas, universidades, escolas e instituições que poderiam participar do projeto.",
    assets: ["Empresas ou patrocinadores", "Escolas ou grupos educacionais", "Universidades ou instituições de pesquisa"],
  },
  {
    title: "Quem vai operar",
    text: "Entender quem teria capacidade para liderar e operar o centro localmente.",
    assets: ["Operador local"],
  },
  {
    title: "Região e localização",
    text: "Aprofundar cidade, acesso, público e possíveis espaços para o projeto.",
    assets: ["Local ou terreno em potencial"],
  },
  {
    title: "Estrutura de recursos",
    text: "Entender quais parceiros e fontes de recursos poderiam ajudar a viabilizar o projeto.",
    assets: ["Capacidade de mobilizar recursos", "Família, fundação ou investidor âncora"],
  },
  {
    title: "Prioridades educacionais",
    text: "Identificar temas e necessidades locais que poderiam orientar a experiência educacional.",
    assets: ["Escolas ou grupos educacionais"],
  },
  {
    title: "Rede institucional",
    text: "Construir uma primeira visão de quem precisa estar envolvido para o projeto ganhar força.",
    assets: ["Rede de parceiros institucionais", "Governo ou instituições públicas"],
  },
];

export function getGaps(a: Answers) {
  const have = new Set(realAssets(a.existing_assets));
  const missing = GAPS.filter((g) => !g.assets.some((asset) => have.has(asset)));
  const list = missing.length > 0 ? missing : GAPS;
  return list.slice(0, 3);
}
