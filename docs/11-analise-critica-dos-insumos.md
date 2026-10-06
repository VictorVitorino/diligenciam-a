# Análise crítica dos insumos de outras IAs

> **Para que serve:** separar, nos três textos produzidos por outras ferramentas de IA ([`insumos/`](../insumos/README.md)), o que está **confirmado**, o que é **plausível mas sem prova**, o que está **errado ou desatualizado** e o que foi **aproveitado** na estratégia 2027 ([doc 07](07-estrategia-e-inovacao.md)).
>
> **Regra:** nenhum insumo é fonte. Cada afirmação de mercado foi conferida contra o [benchmark verificado](09-benchmark-de-mercado.md), e cada afirmação sobre a A&M contra o deck, os slides ou as skills ([engenharia](10-engenharia-e-modelo-semantico-da-diligencia.md)).

Vereditos: ✅ confirmado · 🔎 confirmado em fonte única ou com ressalva · ⚠️ plausível, não verificado · ❌ errado ou desatualizado · ➖ opinião ou proposta (não é verificável, é avaliada pelo mérito).

---

## 1. Resumo em uma tabela

| | IA externa nº 1 | IA externa nº 2 | IA externa nº 3 |
|---|---|---|---|
| **Formato** | Resumo, benchmark, de-para de 8 serviços | Leitura dos ZIPs, benchmark EUA, tabela de evolução, custos em R$ | Documento de estratégia "Technology M&A Factory", 10 ofertas, custos em US$ |
| **Ponto mais forte** | Prudência: não inventa causa nem preço; propõe piloto com métricas certas | Leu de fato as skills e achou erros reais (ROI, pacote trocado, IA no alvo) | Visão de ciclo completo e lista do que **não** fazer |
| **Ponto mais fraco** | DiligenceGPT descrito como "em desenvolvimento" (já lançado em 2024) | Custo apoiado em "reaproveitar as skills", premissa que o usuário descartou | 12 nomes novos, TSA tratado como oferta existente, custos sem base |
| **Fatos de mercado** | Majoritariamente ✅/🔎 | Majoritariamente ✅/🔎 | Genéricos; poucos verificáveis |
| **Causa da perda de espaço** | Declara que não dá para saber | Não aborda | Declara que não dá para saber |
| **Brasil** | Ausente | Ausente | Ausente |
| **Aproveitamento no doc 07** | Alto (piloto, módulos, TSA, Value Creation) | Alto (diagnóstico de engenharia, AI DD, Deal-to-Value) | Médio (Control Tower, "o que não fazer", ativos globais) |

## 2. Verificação das afirmações

### 2.1 Afirmações sobre o mercado

| Afirmação | Quem disse | Veredito | Base |
|---|---|---|---|
| PwC oferece *AI and Technology Due Diligence* e usa IA no planejamento de separação de TI | IA 1, IA 2 | 🔎 | Página oficial da PwC US e aplicação Tech Effect ([09, PwC](09-benchmark-de-mercado.md)) |
| EY-Parthenon tem o Diligence Edge, plataforma com IA para extração, análise e relatório | IA 1, IA 2 | ✅ | Página oficial; hoje integrado ao OneEdge |
| KPMG oferece AI Due Diligence e Carve AI | IA 1, IA 3 | 🔎 | AI DD encontrada na **KPMG Suíça** (10 dimensões) e Carve AI na **KPMG Alemanha**. Não achamos página equivalente da KPMG US |
| KPMG US alerta para riscos que a diligência tradicional deixa passar em empresas afetadas por IA | IA 2 | 🔎 | "The AI blind spot in M&A": 33% priorizam investigar dívida técnica e de IA, embora 66% discutam o tema |
| Pesquisa global da KPMG com 700 decisores aponta separação de TI e dados como risco relevante | IA 2 | ✅ | KPMG 2026 Global M&A Outlook: **40%** citam separação de TI e dados como risco material |
| McKinsey usa DealScan.AI para avaliar alvos e myIMO para integração e separação | IA 1 | ✅ myIMO / 🔎 DealScan.AI | O DealScan.AI é descrito como ferramenta de **originação** (encontrar alvos), não de diligência |
| Bain faz diligência do impacto da IA no modelo de negócio | IA 2 | 🔎 | Tech DD para PE com avaliação de disrupção por IA |
| Deloitte US tem abordagem integrada para deals com pessoas, código, dados e infraestrutura de IA | IA 2 | ⚠️ | Não reencontramos essa página específica. Confirmado: Deloitte M&A Platform (set/2026) e pesquisa de GenAI em M&A |
| McKinsey e BCG usam IA para conectar informações do ciclo e reaproveitar aprendizados | IA 2 | 🔎 McKinsey / ⚠️ BCG | myIMO aprende com programas anteriores; para a BCG há descrição de uso de IA no planejamento, sem produto nomeado |
| A&M divulga o DiligenceGPT como oferta **em desenvolvimento** | IA 1 | ❌ desatualizado | Lançado em **09/01/2024** ✅. A própria IA 2 corrigiu esse ponto |
| A&M lançou o DiligenceGPT em janeiro de 2024 | IA 2 | ✅ | Comunicado oficial da A&M |
| Info-Tech tem referências de risco, sinergia, TSA e prontidão | IA 1, IA 3 | 🔎 | Blueprints públicos de M&A IT Playbook, Buy, Sell e cyber DD; parte exige assinatura |
| Mercado se move para módulos, IA na execução, carve-out, execução e IP de deals | IA 3 | ✅ no conjunto | Coincide com os movimentos M1–M6 do [benchmark](09-benchmark-de-mercado.md#1-os-sete-movimentos-do-mercado) |

> **Observação:** nenhum dos três trouxe **dado do Brasil**. Os fatos de mercado que sustentam a estratégia local (fundos em 50% dos deals, recorde de recuperação judicial, crescimento do seguro de R&W) vieram da pesquisa própria ([09, seção Brasil](09-benchmark-de-mercado.md#brasil)). A camada regulatória brasileira (LGPD e PL 2338/2023, o projeto de lei de IA) também não aparece em nenhum insumo.

### 2.2 Afirmações sobre a A&M e a DTS

| Afirmação | Quem disse | Veredito | Base |
|---|---|---|---|
| O deck principal é de janeiro de 2023 | IA 1 | ✅ 📘 | Capa JAN/2023; a seção de VC é de julho/2023 ([reconciliação, D8](06-reconciliacao-de-fontes.md)) |
| Os one-pagers atualizam a nomenclatura | IA 1 | ⚠️ | Os one-pagers ainda não foram lidos neste repositório (arquivo grande demais; aguardando versão menor) |
| Vendor DD, Playbook e Value Creation estão entre as ofertas de menor prontidão | IA 1 | ✅ 📘 | 2,7, 2,7 e 2,3. A variante VC (2,5, tachada) também está nesse grupo ([readiness](04-readiness-e-portfolio.md)) |
| **TSA** é uma oferta atual, ao lado de Separation Planning | IA 3 | ❌ | TSA não é linha do portfólio: aparece como **etapa** ("Suporte à definição do TSA") dentro de IT Separation Strategy & Design 📘. Por isso, no doc 07, o **TSA Control Tower** é produto **novo** (B1) |
| "Integração pós-aquisição" e "Separação / carve-out" são ofertas além do IMO/SMO | IA 3 | ❌ | São os próprios IMO e SMO; contá-los à parte infla o portfólio |
| A esteira vai de tese a QA, com regras de fato × hipótese, fontes e dupla contagem | IA 2 | 🔎 parcial | Ordem correta, mas falta a etapa de narrativa; são 18 skills com 2 laços ([10, veredito a e b](10-engenharia-e-modelo-semantico-da-diligencia.md#veredito-sobre-as-afirmações-da-ia-externa-nº-2)) |
| Automação parcial, não pronta para produção | IA 2 | ✅ | Scripts fazem parse, estados e notas; o julgamento é semântico (veredito c) |
| O ZIP "Definição de escopo" contém um método de criar skills | IA 2 | ✅ | Contém o *Meta Skill Engine* (veredito d; problema E7) |
| Regra de ROI: o método exige lastro nos dois lados, o código aceita qualquer um | IA 2 | ✅ | Divergência entre o SKILL.md e o teste `any(...)` (veredito e; problema E3) |
| Dados & Digital sem método de IA no alvo | IA 2 | ✅ | Só menciona "tecnologias emergentes (IA, IoT, blockchain)" (veredito f; problema E8) |
| A pasta tem 24 ZIPs de IT DD | IA 1 | ✅ | Confirmado. Seis ZIPs grandes não abriram no conector e precisam ser reenviados em partes |

### 2.3 Custos e preços

| Item | IA 2 | IA 3 | Avaliação |
|---|---|---|---|
| Moeda e base | R$, por hora (R$ 250/h + 20% de contingência) | US$, por faixa conceitual | Bases diferentes e **não comparáveis entre si** |
| Piloto | R$ 48–72 mil (160–240 h) | — | Conta correta (horas × R$ 250 × 1,2). A **taxa de R$ 250/h não tem fonte** e não diz se é custo ou preço |
| MVP | R$ 180–300 mil (600–1.000 h) | US$ 75–150 mil | A um câmbio ilustrativo de R$ 5 a R$ 6 por dólar, a faixa da IA 3 fica em torno de R$ 375–900 mil, **2 a 3 vezes** a da IA 2 para escopo parecido. Nenhuma das duas mostra a conta do esforço |
| Produto / plataforma | R$ 90–180 mil por módulo adicional | US$ 250–500 mil e US$ 500 mil–1 mi+ | ➖ ordens de grandeza sem base declarada (a IA 3 admite isso) |
| Premissa crítica | **"Reaproveitamento das skills"** | Reaproveitar ativos globais (DiligenceGPT) | A premissa da IA 2 **caiu**: o usuário decidiu não reaproveitar o código das skills, só a semântica. A estimativa dela está subdimensionada para um produto feito do zero |
| Consumo de IA, licenças, segurança | Fora da conta (declarado) | Fora da conta | Correto separar; ninguém dimensionou |
| Exemplo de preço | Custo R$ 60 mil → margem de 40% → receita R$ 100 mil | — | Conta correta e corretamente rotulada como ilustrativa |

**Como o doc 07 resolveu 💡:** em vez de escolher entre R$ e US$, a estimativa foi feita em **FTE-mês** por onda (45 no caminho enxuto, 66 no proprietário) e convertida com três custos ilustrativos por FTE. A liderança aplica o custo real da A&M. Para comparação: o MVP da IA 2 (600–1.000 h) equivale a cerca de **4 a 6 FTE-mês**, enquanto a Onda 1 + Piloto do doc 07 soma **13 FTE-mês** no caminho enxuto, porque inclui o motor determinístico testado, os módulos de Cyber e AI DD e dois deals reais ([quanto custa](07-estrategia-e-inovacao.md#10-quanto-custa-construir)).

## 3. Problemas de desenho

| Problema | Onde | Por que importa | Como o doc 07 trata |
|---|---|---|---|
| **Excesso de nomes.** A IA 3 propõe 10 ofertas, uma plataforma de marca ("A&M DealTech Intelligence") e uma tese ("Technology M&A Factory"): 12 nomes. A própria IA 3 lista "criar muitos nomes" no que **não** fazer | IA 3 | Confunde o cliente e o time comercial; nomes sem kit de produto | 4 linhas e nomes descritivos; o motor interno ("Deal Evidence Graph") **não** é vendido como marca (N1) |
| **Redundâncias.** "Technology, Data & AI DD" e "AI Due Diligence" separados; "Technology Value Creation" e "Portfolio Technology Value Office" separados | IA 3 | Duas ofertas para o mesmo problema | AI DD é **módulo** da Technology DD (B5); Value Creation é um escritório só (A8) |
| **Marca com o nome da firma** ("A&M DealTech Intelligence") | IA 3 | Plataforma com a marca A&M exige aprovação global e pode competir com o A&M Assist | Encaixe no A&M Assist em vez de marca paralela (N5; [piloto, seção 10](12-piloto-tech-dd-com-ia.md#10-construir-ou-plugar-a-decisão-sobre-o-am-assist)) |
| **SMO.** Nenhum insumo comenta o fato de o SMO estar tachado no slide de status | Todos | 2026 é o ano do carve-out ✅; descontinuar seria contra o mercado | Decisão explícita: **não descontinuar**, fundir com o IMO (A6) |
| **Causa da perda de espaço** | Todos | Sem causa, a solução é genérica | O usuário informou: **foco no TMO**. Virou o norteador N6 ("o TMO vira vantagem") e o risco "capacidade" |
| **Situações especiais (RJ, UPI)** | IA 1 e IA 3 citam Restructuring de passagem | É onde a A&M tem o maior direito de vencer e onde não achamos oferta de tech M&A das Big Four 🔎 | Produto próprio (B6) e fatia F3 com dados |
| **Recorrência sem desenho** | Todos citam "subscription" ou "retainer" sem dizer o quê | Sem produto mensal concreto, a meta de recorrência não sai do papel | 6 produtos com receita mensal, escada de recorrência e fórmula de preço |
| **Sem critério de prioridade** | IA 3 ordena 1º a 4º sem método | Ordem difícil de defender no comitê | Matriz com 6 critérios e nota 0–30 por produto |
| **Proporção 70/30** (evoluir/criar) | IA 3 | ➖ heurística sem base | Não adotada; o esforço segue as ondas |

## 4. O que foi aproveitado

| Ideia | Origem | Onde entrou |
|---|---|---|
| Technology DD como guarda-chuva e IT DD como módulo | IA 1, IA 2 | A2 |
| Módulo de AI Due Diligence (capacidade real e risco de disrupção) | IA 1, IA 2, IA 3 | B5 e N3 |
| Exit Readiness separado do relatório de Vendor DD | IA 1, IA 2 | A7 |
| TSA como produto de gestão | IA 1, IA 3 | B1 (TSA Control Tower), agora como produto **novo** |
| Control Tower para IMO/SMO | IA 3 | A5 e A6 |
| Continuidade "Deal-to-Value" | IA 2 | N2 (fio de ouro) e escada de recorrência |
| Verificar o DiligenceGPT antes de construir | IA 1, IA 2, IA 3 | N5, decisão 4 e [piloto](12-piloto-tech-dd-com-ia.md) |
| IA extrai, regra calcula, especialista revisa | IA 1 | Princípio central do motor |
| Piloto medido por horas, prazo, cobertura de evidências e retrabalho | IA 1, IA 2 | Hipóteses H1–H4 do piloto |
| Lista do que não fazer | IA 3 | Seção 11 do doc 07 |
| Carve-out com Restructuring | IA 1, IA 3 | B6 e fatia F3 |

## 5. O que foi além dos insumos

1. **Brasil com dados**: fundos, recuperação judicial e seguro de R&W, mais a camada regulatória (LGPD e PL 2338/2023).
2. **Produtos novos que nenhum insumo propôs**: Tech Deal Screening, Fractional/Interim CIO-CTO-CAIO, Cyber Watch de portfólio, Cost, License & Cloud Optimization, Portfolio Tech Intelligence e AI Value Sprint.
3. **Método de priorização** com notas explícitas e roadmap em ondas.
4. **Modelo semântico da diligência A&M** (ontologia, gramática da evidência, regras de julgamento) como especificação do produto, sem reaproveitar código.
5. **Estimativa paramétrica** (FTE-mês × custo real) em vez de valores soltos em R$ ou US$.
6. **Causa declarada** (foco no TMO) transformada em vantagem e em gestão de capacidade.
