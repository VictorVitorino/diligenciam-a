# Fontes e protocolo de ingestão

Este repositório guarda a **análise organizada** do portfólio IT M&A. Os arquivos-fonte brutos (PDF, PPTX, imagens de slides, extrações de texto) **não são versionados**: ficam fora do git, em `fontes/brutos/` (ignorada no `.gitignore`) ou no Google Drive.

## Inventário

| # | Fonte | Tipo | Conteúdo | Status | Usada em |
|---|---|---|---|---|---|
| 1 | **Deck Comercial - DIGITAL & TECHNOLOGY SERVICES - M&A - Full v7.pdf** (10,9 MB) | Deck comercial (cliente) | Contexto de M&A, desafios, riscos, credenciais A&M, ciclo "A&M é M&A", seções detalhadas por oferta, cases, modelos comerciais | ✅ Analisado | `docs/01`, `ofertas/*`, `ofertas/anexos/*` |
| 2 | Slide **"A&M é M&A"** | Slide de posicionamento | Linha do tempo do deal (6 fases) e 8 ofertas com descrição oficial | ✅ Analisado (também presente no deck 1) | `data/ofertas.yaml` (`descricao_oficial`) |
| 3 | Slide **"Status das Ofertas – IT M&A"** | Slide interno de governança | Readiness atual/alvo FY por oferta, PO, squad, líder da service line, escala 1–5, fluxo de status | ✅ Analisado | `data/ofertas.yaml` (`readiness`), `data/governanca.yaml` |
| 4 | **One-pagers DTS.pptx** (123 MB) | Deck de one-pagers | Um one-pager por oferta da DTS | ⏳ **Pendente**: acima do limite de 10 MB do conector e hosts do Google bloqueados na rede do ambiente | Será incorporado aos dossiês com o selo 📎 |
| 5 | **Pasta de 24 ZIPs de IT Due Diligence** (Claude Skills geradas pelo Meta Skill Engine) | Método interno de diligência | Esteira de 18 skills: tese, data request, diagnósticos por dimensão, riscos, iniciativas, business case, roadmap, narrativa, relatório e QA | ✅ 18 analisados · ⏳ **6 não abriram** (arquivos grandes demais para o conector; reenviar em partes menores que 5 MB) | `docs/10` (só a semântica e a analítica; nenhum código foi copiado) |
| 6 | **Insumos de outras IAs** (3 textos) e anotações do usuário | Material de apoio | Benchmarks, de-para, custos e estratégia propostos por outras ferramentas | ✅ Guardados como insumo, não como fonte | `insumos/`, `docs/11` |

### Observações sobre as fontes

- **Extração do deck 1:** o texto foi extraído de um PDF com layout em colunas, então as frases de colunas vizinhas vêm intercaladas. Os dossiês reconstroem o sentido. Quando um trecho ficou ambíguo, isso está registrado no próprio dossiê.
- **Logos de clientes:** o slide "Clientes" do deck traz a anotação "Validar c/ Quintão". Os logos não são legíveis em texto.
- **Cobertura do deck 1:** a extração termina na seção do IMO. O SMO e o IT Synergies & Value Creation não têm seção detalhada no texto extraído; os dossiês deixam isso explícito.
- **Datas:** a capa do deck indica JAN/2023 e a seção de DD para Venture Capital indica julho/2023. Os slides de status refletem o FY corrente (sem data explícita).

## Selos de proveniência

Todo dossiê marca a origem de cada bloco:

| Selo | Significado |
|---|---|
| 📘 | Deck Comercial (fonte primária) |
| 🗂️ | Slide "A&M é M&A" ou "Status das Ofertas" |
| 📎 | One-pager (quando ingerido) |
| 💡 | Análise deste repositório: síntese, hipótese ou recomendação, a validar com o PO |

## Como ingerir uma nova fonte (ex.: os one-pagers)

1. Coloque o arquivo em `fontes/brutos/` (essa pasta não vai para o git).
2. Extraia o texto por slide/página:

   ```bash
   pip install -r requirements.txt
   python3 scripts/catalogo.py extrair fontes/brutos/one-pagers-dts.pptx
   ```

   A saída sai em `fontes/brutos/<nome>/001.md`, `002.md`…
3. Para cada oferta, atualize o dossiê em `ofertas/` com os blocos 📎 e, se mudar algo estrutural (nome, fase, readiness), atualize `data/ofertas.yaml`.
4. Rode `python3 scripts/catalogo.py validar` e `python3 scripts/catalogo.py painel`.
5. Atualize a tabela de inventário acima.

> Arquivos grandes: o conector do Google Drive baixa até **10 MB** por arquivo. Para o deck de 123 MB, exporte em partes menores (por exemplo, um PDF por bloco de ofertas) ou comprima as imagens antes de enviar.
