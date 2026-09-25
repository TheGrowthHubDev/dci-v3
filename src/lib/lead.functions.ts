import { createServerFn } from "@tanstack/react-start";

/**
 * Encaminha os dados dos formulários para o webhook do cliente e para a
 * planilha "Leads DCI" (Google Sheets).
 */
const WEBHOOK_URL = "https://webhook.thegrowthhub.app.br/webhook/2591bbcb-dc11-4a2c-a1b7-ffaafe8174db";
const SHEETS_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "1smWnkgKcCiVhlRxZFIoPwNGDvg58xtYqkVuZ7C6bJI8";
const SHEET = "Página1";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const norm = (v: unknown) => str(v).toLowerCase();

function device(ua: string) {
  if (/ipad|tablet/i.test(ua)) return "Tablet";
  if (/mobi|android|iphone/i.test(ua)) return "Mobile";
  return ua ? "Desktop" : "";
}

async function sheetsFetch(path: string, init?: RequestInit) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovableKey || !sheetsKey) throw new Error("Credenciais do Google Sheets ausentes");
  const res = await fetch(`${SHEETS_GATEWAY}/spreadsheets/${SPREADSHEET_ID}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Sheets [${res.status}]: ${await res.text()}`);
  return res.json();
}

async function syncSheet(data: Record<string, unknown>) {
  const event = str(data["event"]);
  const empresa = str(data["contato_organizacao"]);
  const nome = str(data["contato_nome"]);
  if (!nome && !empresa) return;
  const quizDone = event === "diagnostico_concluido";

  // Data de cadastro no horário de Brasília (dd/mm/aaaa hh:mm)
  const cadastro = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  // Procura a linha existente do lead (mesmo nome + empresa), da mais recente para a mais antiga
  // Se a leitura falhar (ex.: limite temporário do Google), segue e grava uma linha nova
  let rows: string[][] = [];
  try {
    const current = (await sheetsFetch(`/values/${SHEET}!A:O`)) as { values?: string[][] };
    rows = current.values ?? [];
  } catch (err) {
    console.error("[sheets] falha ao ler planilha", err);
  }
  let rowNumber = 0;
  for (let i = rows.length - 1; i >= 1; i--) {
    const r = rows[i] ?? [];
    if (norm(r[1]) === norm(empresa) && norm(r[2]) === norm(nome)) {
      rowNumber = i + 1;
      break;
    }
  }

  if (rowNumber) {
    if (quizDone) {
      await sheetsFetch(`/values/${SHEET}!O${rowNumber}?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        body: JSON.stringify({ values: [["sim"]] }),
      });
    }
    return;
  }

  // Ordem das colunas: data, empresa, nome, cargo, telefone, email, utm_campaign,
  // utm_term, utm_source, utm_content, utm_medium, dispositivo, fbclid, gclid, preencheu quiz?
  const row = [
    cadastro,
    empresa,
    nome,
    str(data["contato_cargo"]),
    str(data["contato_telefone"]),
    str(data["contato_email"]),
    str(data["utm_campaign"]),
    str(data["utm_term"]),
    str(data["utm_source"]),
    str(data["utm_content"]),
    str(data["utm_medium"]),
    device(str(data["user_agent"])),
    str(data["fbclid"]),
    str(data["gclid"]),
    quizDone ? "sim" : "não",
  ];
  await sheetsFetch(`/values/${SHEET}!A:O:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [row] }),
  });
}

export const sendDiagnosticLead = createServerFn({ method: "POST" })
  .inputValidator((input: Record<string, unknown>) => input)
  .handler(async ({ data }) => {
    const [webhook] = await Promise.all([
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((r) => ({ ok: r.ok, status: r.status }))
        .catch((err) => {
          console.error("[webhook] falha ao enviar lead", err);
          return { ok: false, status: 0 };
        }),
      syncSheet(data).catch((err) => console.error("[sheets] falha ao salvar lead", err)),
    ]);
    return webhook;
  });
