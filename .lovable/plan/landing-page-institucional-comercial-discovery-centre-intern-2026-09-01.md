# Landing Page Institucional/Comercial — Discovery Centre International (Brasil)

Página única em português, seguindo o copy revisado e o brand guide DCI 2021, com referência visual em thediscoverycentre.ca e dcinternational.ca.

## Identidade visual

- Cores da marca: Dark Blue #2a388f (primária), Grey #808284, Medium Blue #1b75bb, Light Blue #27a9e1, Teal #00a79d — todas como tokens semânticos no design system.
- Tipografia: Intro Regular não é uma fonte web livre, então uso uma geométrica próxima (ex.: Montserrat/Poppins geométrica) para títulos e Open Sans para corpo, respeitando a hierarquia do guia.
- Tom: institucional, sóbrio, com respiro amplo, faixas alternando branco / azul escuro / cinza claro. Nada de gradiente roxo genérico.

## Estrutura da página (11 blocos do copy)

1. Header fixo com logo DCI, âncoras (Quem Somos · Tour Virtual · Como Funciona · Para Quem É · Diferenciais · Fale Conosco) e CTA "Agendar uma Conversa". Menu mobile.
2. Hero: tag, headline, subtítulo, CTA primário "Conhecer o modelo DCI" + secundário "Agendar uma Conversa", faixa de provas (40 anos · STEAM · DCI 2021) e microtexto de segmentação.
3. O que é um centro de ciência: diagrama STEAM (Tocar / Testar / Construir / Experimentar) + lista de funções do centro.
4. História e autoridade: timeline horizontal (desktop) / vertical (mobile) — 1970s, 1985, 1990–2010, 2017, 2021, Hoje — com selo de ~2 milhões de visitantes. Sub-bloco Liderança: Dov e Marcos em destaque, demais em grade, cada card com CTA de e-mail.
5. Tour Virtual: bloco com chamada e CTA "Abrir Tour em Tela Cheia".
6. Como o modelo funciona: fluxo Design → Build → Operate → Finance (acordeão no mobile), selo "ÚNICO NO SETOR" na etapa 4, frase de previsibilidade, e dois sub-blocos: Turnkey/adaptação local e Capital Campaign Module.
7. Para Quem É: três cards (opera / financia / apoia institucionalmente) com bullets do copy, destaque próprio para "Um legado que pode levar o seu nome" (naming rights) e prova de adaptação local no card institucional; fechamento com ponte para o simulador.
8. Diferenciais e provas: quatro diferenciais com ícones, bloco de números de Halifax, cards Argélia e Discovery West Nova, e faixa de parceiros (Dalhousie, Maple Bear, Governo do Canadá).
9. Estamos no Brasil: bloco de texto institucional + CTA.
10. CTA final em duas colunas: contato direto (e-mail info@dcinternational.ca, endereço em Halifax, CTA de agendamento) e card "Simulador de Impacto" como formulário de captura simples (nome, e-mail, perfil) com mensagem de confirmação.
11. Footer: logo, navegação secundária, dados institucionais, CTA discreto e links de Política de Privacidade / Termos de Uso.

## Imagens

Você enviará as fotos oficiais. Até lá, cada área de imagem fica como um espaço reservado limpo e identificado (hero, timeline, Halifax, projetos, lideranças, parceiros), pronto para troca por arquivo sem mexer no layout.

## Pendências para você

- Link de agendamento externo (Calendly ou similar): fica um placeholder até você informar.
- URL do tour virtual 3D.
- Fotos e logos oficiais.

## Detalhes técnicos

- Rota única em `src/routes/index.tsx`, com componentes de seção em `src/components/lp/`.
- Tokens de cor e fontes definidos em `src/styles.css`; nenhuma cor hardcoded nos componentes.
- Navegação por âncoras com scroll suave; animações leves de entrada por seção.
- SEO: `head()` da rota com título, descrição, og e twitter em português; H1 único no hero; imagens com alt.
- Formulário do simulador: validação client-side e estado de sucesso, sem backend nesta etapa (os leads ainda não são persistidos — posso ligar o Lovable Cloud depois se quiser guardá-los).
