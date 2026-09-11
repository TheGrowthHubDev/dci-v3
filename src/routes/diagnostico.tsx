import { createFileRoute } from "@tanstack/react-router";
import { Diagnostic } from "@/components/lp/Diagnostic";

const TITLE = "Diagnóstico DCI | Um Discovery Centre faria sentido para a sua região?";
const DESCRIPTION =
  "Responda algumas perguntas rápidas e receba uma leitura simples sobre o estágio do seu projeto, os caminhos mais alinhados e os pontos que valem aprofundar.";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/diagnostico" }],
  }),
  component: DiagnosticPage,
});

function DiagnosticPage() {
  return <Diagnostic />;
}
