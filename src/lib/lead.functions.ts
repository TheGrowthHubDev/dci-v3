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

  // Procura a linha existente do lead (mesmo nome + empresa), da mais recente para a mais antiga
  const current = (await sheetsFetch(`/values/${SHEET}!A:M`)) as { values?: string[][] };
  const rows = current.values ?? [];
  let rowNumber = 0;
  for (let i = rows.length - 1; i >= 1; i--) {
    const r = rows[i] ?? [];
    if (norm(r[0]) === norm(empresa) && norm(r[1]) === norm(nome)) {
      rowNumber = i + 1;
      break;
    }
  }

  if (rowNumber) {
    if (quizDone) {
      await sheetsFetch(`/values/${SHEET}!M${rowNumber}?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        body: JSON.stringify({ values: [["sim"]] }),
      });
    }
    return;
  }

  const row = [
    empresa,
    nome,
    str(data["contato_cargo"]),
    str(data["contato_telefone"]),
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
  await sheetsFetch(`/values/${SHEET}!A:M:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
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
