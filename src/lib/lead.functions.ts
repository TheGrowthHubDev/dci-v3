import { createServerFn } from "@tanstack/react-start";

/**
 * Encaminha os dados do diagnóstico para o webhook do cliente.
 * Fica no servidor para evitar CORS e permitir retry/log central.
 */
const WEBHOOK_URL = "https://webhook.thegrowthhub.app.br/webhook/2591bbcb-dc11-4a2c-a1b7-ffaafe8174db";

export const sendDiagnosticLead = createServerFn({ method: "POST" })
  .inputValidator((input: Record<string, unknown>) => input)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return { ok: res.ok, status: res.status };
    } catch (err) {
      console.error("[webhook] falha ao enviar lead", err);
      return { ok: false, status: 0 };
    }
  });
