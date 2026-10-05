# Readiness e análise de portfólio

> **Tese 💡:** o portfólio IT M&A da A&M é **forte onde o deal acontece e frágil onde o relacionamento recorrente nasce**. As ofertas transacionais (diligência, planejamento, execução) estão estruturadas. As que geram recorrência (Playbook, Vendor DD e Value Creation) estão no nível "oferta inicial". O plano do FY tenta corrigir isso de uma vez, com quatro saltos de um nível inteiro, e quase todo esse esforço recai sobre dois POs.

Fonte dos números: slide 🗂️ "Status das Ofertas – IT M&A". As leituras marcadas com 💡 são análise deste repositório. Os cálculos são reproduzíveis com `python3 scripts/catalogo.py validar`.

---

## 1. A régua: escala oficial de readiness 🗂️

| Nível | Estágio | Risco de entrega |
|:---:|---|---|
| 1 | Oferta incompleta | Muito alto |
| 2 | Oferta inicial | Alto |
| 3 | Oferta definida | Médio |
| 4 | Oferta estruturada | Baixo |
| 5 | Oferta otimizada | Muito baixo |

## 2. Panorama da service line

| Indicador | Atual | Alvo FY | Variação |
|---|---:|---:|---:|
| **Readiness da service line** 🗂️ | **3,29** | **3,95** | **+0,66 (+20%)** |
| Readiness só das linhas não tachadas (n = 7) 💡 | 3,33 | 3,97 | +0,64 |
| Ofertas em nível ≥ 4, estruturada 💡 | 2 de 10 | 5 de 10 | +3 |
| Ofertas que mudam de nível no FY 💡 | n/a | 7 de 10 | n/a |
| Ofertas em nível 5, otimizada 💡 | 0 | 0 | 0 |

**Como o índice é calculado 💡:** o 3,29 e o 3,95 do slide são exatamente a **média simples das 10 linhas**, incluindo as três tachadas. A coluna se chama "Ofertas/Peso", mas na prática todas as linhas pesam igual. Ver recomendação na seção 7.

## 3. Mapa de calor por oferta

Barra de 10 posições = escala de 0 a 5 em passos de 0,5. `■` readiness atual (arredondado para baixo) · `▣` evolução planejada até o alvo do FY (arredondado para cima) · `□` distância até 5.

| Código | Oferta | Readiness | Atual | Alvo | Gap | Nível hoje → alvo |
|---|---|---|---:|---:|---:|---|
| ITMA-02 | IT Due Diligence (Buy Side) | `■■■■■■■■■▣` | 4,5 | 4,7 | +0,2 | Estruturada → Estruturada |
| ITMA-04 | IT Integration & Separation Planning | `■■■■■■■■▣□` | 4,0 | 4,3 | +0,3 | Estruturada → Estruturada |
| ITMA-06 | ~~IT Separation Management Office~~ | `■■■■■■■▣▣□` | 3,9 | 4,3 | +0,4 | Definida → **Estruturada** |
| ITMA-03 | IT Separation Strategy & Design | `■■■■■■■▣▣□` | 3,6 | 4,1 | +0,5 | Definida → **Estruturada** |
| ITMA-05 | IT Integration Management Office | `■■■■■■■▣□□` | 3,5 | 4,0 | +0,5 | Definida → **Estruturada** |
| ITMA-09 | ~~IT Due Diligence (Corporate)~~ | `■■■■■■▣▣□□` | 3,2 | 3,9 | +0,7 | Definida → Definida |
| ITMA-01 | IT M&A Playbook | `■■■■■▣▣▣□□` | 2,7 | 3,7 | **+1,0** | Inicial → **Definida** |
| ITMA-07 | IT Vendor Due Diligence (Sell Side) | `■■■■■▣▣▣□□` | 2,7 | 3,7 | **+1,0** | Inicial → **Definida** |
| ITMA-10 | ~~IT Due Diligence (Venture Capital)~~ | `■■■■■▣▣□□□` | 2,5 | 3,5 | **+1,0** | Inicial → **Definida** |
| ITMA-08 | IT Synergies & Value Creation | `■■■■▣▣▣□□□` | 2,3 | 3,3 | **+1,0** | Inicial → **Definida** |

~~Tachado~~ = linha tachada no slide de status (motivo não informado; ver [reconciliação de fontes](06-reconciliacao-de-fontes.md)).

## 4. A forma do portfólio ao longo do ciclo 💡

Readiness atual médio por fase do deal, considerando as ofertas com caixa própria no catálogo do cliente. IT Synergies & Value Creation é transversal e aparece à parte.

```text
Fase do ciclo        Readiness atual (0–5)            Ofertas
M&A Strategy         ■■■■■□□□□□  2,7                   Playbook
Pré-deal             ■■■■■■■■□□  4,1                   DD Buy Side · Separation S&D
Sign-to-Close        ■■■■■■■■□□  4,0                   Integration & Separation Planning
100 days             ■■■■■■■□□□  3,7                   IMO · SMO
Hold period          ■■■■■■■□□□  3,7                   IMO · SMO
Exit                 ■■■■■□□□□□  2,7                   Vendor DD
─────────────────────────────────────────────────────
Transversal          ■■■■□□□□□□  2,3                   Synergies & Value Creation
```

**Leitura: uma curva em sino.** O miolo transacional (pré-deal a hold) tem média **3,9**. As duas pontas do ciclo (estratégia e exit) ficam em **2,7**, e a camada que deveria costurar o ciclo inteiro, Value Creation, está em **2,3**.

**Por que isso importa:** as pontas e a camada transversal são justamente as ofertas de **relacionamento**, não de evento:

| Oferta frágil | Papel comercial | Consequência da baixa maturidade |
|---|---|---|
| IT M&A Playbook | Porta de entrada em corporates com agenda inorgânica recorrente | A A&M entra no deal já em andamento, sem ter desenhado as regras do jogo |
| IT Vendor DD (Sell Side) | Porta de entrada pelo vendedor, e o exit de um fundo é o pré-deal de outro | Perde-se o momento em que o ativo e o próximo comprador se definem |
| IT Synergies & Value Creation | Âncora da relação anual com fundos de PE, do deal ao exit | A relação com o fundo termina quando o deal fecha |

> **Em uma frase:** hoje o portfólio é otimizado para o *deal*, não para o *cliente*. O plano do FY sobe exatamente essas três ofertas (+1,0 cada), o que é coerente. O risco está na execução simultânea (seção 6).

## 5. Matriz maturidade × ambição 💡

Eixo horizontal: readiness atual (corte em 3,5). Eixo vertical: tamanho do salto planejado no FY (corte em +0,7).

|  | **Readiness atual < 3,5** | **Readiness atual ≥ 3,5** |
|---|---|---|
| **Salto ≥ +0,7**<br>(ambição alta) | **🚀 Apostas de construção**<br>Playbook (2,7 → 3,7)<br>Vendor DD (2,7 → 3,7)<br>Synergies & VC (2,3 → 3,3)<br>~~DD Venture Capital~~ (2,5 → 3,5)<br>~~DD Corporate~~ (3,2 → 3,9) | *(vazio)* |
| **Salto < +0,7**<br>(ambição moderada) | *(vazio)* | **🏛️ Consolidar e escalar**<br>DD Buy Side (4,5 → 4,7)<br>Integration & Separation Planning (4,0 → 4,3)<br>~~SMO~~ (3,9 → 4,3)<br>Separation S&D (3,6 → 4,1)<br>IMO (3,5 → 4,0) |

**Leitura:** a ambição do FY é **inversamente proporcional à maturidade**. Quem está pronto mira pouco e quem está atrás tenta subir um nível inteiro. É um plano de *catch-up* coerente, mas deixa dois pontos cegos:

1. **Ninguém mira o nível 5.** A oferta-âncora, DD Buy Side, chega a 4,7. Falta uma referência de excelência ("oferta otimizada") que puxe o padrão das demais.
2. **O quadrante "esticar o que já é forte" está vazio.** As ofertas maduras poderiam virar *ativos de alavancagem*, como templates, ferramentas e IA, para acelerar as apostas de construção. Ver [estratégia e inovação](07-estrategia-e-inovacao.md).

## 6. Onde está o esforço do FY 💡

O gap total planejado soma **6,6 pontos de readiness** (a soma dos gaps das 10 linhas). A distribuição por PO, com dados do slide de status (ver [governança](05-governanca-service-line.md)):

| PO | Linhas | Gap sob responsabilidade | % do esforço do FY |
|---|---|---:|---:|
| Thiago Lorusso | Playbook (+1,0) · Integration & Separation Planning (+0,3) · ~~DD Corporate~~ (+0,7) | 2,0 | **30%** |
| Guilherme Brein | Synergies & VC (+1,0) · ~~DD Venture Capital~~ (+1,0) | 2,0 | **30%** |
| Eric Anjos | Vendor DD (+1,0) | 1,0 | 15% |
| Heitor Milani | Separation S&D (+0,5) · ~~SMO~~ (+0,4) | 0,9 | 14% |
| Talita Galvão | IMO (+0,5) | 0,5 | 8% |
| Matheus Teixeira | DD Buy Side (+0,2) | 0,2 | 3% |
| **Total** | 10 linhas | **6,6** | **100%** |

**Leitura:** **2 de 6 POs carregam 61% do esforço de evolução do ano**, e cada um deles acumula linhas tachadas. Se as linhas tachadas forem de fato consolidadas, o esforço real cai para cerca de **4,5 pontos** e se redistribui. O slide já sinaliza "POs e Membros serão reajustados". Os números acima mostram onde esse reajuste rende mais.

## 7. Recomendações 💡

| # | Recomendação | Por quê | Esforço |
|---|---|---|---|
| R1 | **Ponderar o índice da service line** por relevância estratégica e receita, fazendo valer a coluna "Peso" | Hoje uma linha tachada pesa o mesmo que a DD Buy Side, a oferta-âncora | Baixo |
| R2 | **Retirar as linhas tachadas do índice**, ou formalizar a consolidação delas | Evita meta inflada com esforço que pode não existir | Baixo |
| R3 | **Criar uma rubrica objetiva por nível** ("Definition of Ready"), ver abaixo | Torna o readiness auditável e comparável entre POs | Médio |
| R4 | **Rebalancear POs pelo gap**, não pelo número de ofertas | 61% do esforço em 2 pessoas é risco de execução | Médio |
| R5 | **Eleger a DD Buy Side como "farol nível 5"** e transferir os ativos dela para Vendor DD e Value Creation | A DD é a oferta mais madura e a mais próxima, em método, das duas apostas | Médio |
| R6 | **Medir readiness trimestralmente** no painel (`painel/index.html`) | Sai da foto anual e vira um filme de evolução | Baixo |

### Proposta de rubrica de readiness (R3) 💡

Cada nível exige os itens dos níveis anteriores.

| Nível | Critério de passagem (evidência objetiva) |
|---|---|
| 1 · Incompleta | Nome, descrição e PO definidos |
| 2 · Inicial | One-pager e posicionamento no ciclo do deal; ao menos 1 case ou piloto |
| 3 · Definida | Metodologia passo a passo; lista de entregáveis; modelo comercial e prazo de referência; seção no deck comercial |
| 4 · Estruturada | Templates de entregáveis prontos para reuso; proposta-padrão; squad treinada; 3 ou mais cases documentados |
| 5 · Otimizada | Ferramentas e automação (inclusive IA) incorporadas; KPIs de resultado medidos em clientes; benchmarks proprietários; revisão pós-projeto sistemática |

> O Deck Comercial já cobre boa parte dos critérios 2 e 3 para a maioria das ofertas. Ver a seção "Maturidade" de cada dossiê em [`ofertas/`](../ofertas/).
