# Guia das apresentações

Uma apresentação HTML por documento do repositório, no padrão visual do deck de referência da A&M: palco de 1600×900, cabeçalho A&M, banda de seção colorida, painel de conteúdo e rodapé com a fonte.

- **Para ver:** abra `apresentacoes/index.html` no navegador.
- **Para editar:** mude a fonte em `apresentacoes/src/` e rode `python3 scripts/apresentacoes.py`.
- Os arquivos `apresentacoes/*.html` são **gerados** e autocontidos (CSS e JS embutidos). Não edite à mão.

## 1. Arquivos e comandos

| Caminho | Papel |
|---|---|
| `apresentacoes/src/NN-nome.html` | Fonte de cada apresentação: metadados + slides |
| `apresentacoes/motor/deck.css`, `deck.js` | Motor compartilhado: moldura, navegação, componentes e gráficos |
| `apresentacoes/motor/template.html`, `indice.html` | Moldes da página e do índice |
| `apresentacoes/motor/am-symbol.svg` | Símbolo A&M vetorizado a partir do arquivo "performance" (o mesmo desenho está embutido em `deck.js`) |
| `scripts/apresentacoes.py` | Gera tudo (`python3 scripts/apresentacoes.py`), só alguns (`... 07 o02`) ou valida (`... --checar`) |

Na URL, `?static` desliga as animações (útil para revisar e capturar tela) e `#5` abre o slide 5.

## 2. Estrutura de uma fonte

```html
<!--deck
{
  "arquivo": "09-benchmark-de-mercado.html",
  "titulo": "Benchmark de mercado",
  "pagina": "Benchmark de mercado · IT M&A",
  "descricao": "Uma frase para a busca e para o índice.",
  "fonte": "docs/09-benchmark-de-mercado.md",
  "grupo": "Mercado e método",
  "ordem": 9,
  "rotulo": "09",
  "resumo": "Uma ou duas frases que aparecem no cartão do índice.",
  "nos": ["Plataforma", "Módulos", "IA no alvo", "Carve-out"],
  "centro": ["7", "movimentos"],
  "capitulos": {
    "1 · Movimentos": ["01", "Movimentos", "Frase de abertura do capítulo."],
    "2 · Concorrentes": ["02", "Concorrentes", "..."]
  }
}
-->
<section class="slide dark cover" data-t="Capa" data-nofoot> ... </section>
<section class="slide" data-p="1 · Movimentos" data-t="Título curto" data-band="Título da banda · complemento"
         data-c="c-navy" data-bs="Texto pequeno à direita da banda" data-src="Fonte: docs/09..., seção 1. Selos ✅/🔎.">
  <div class="body"> ... </div>
</section>
```

- `grupo` é um destes: `Comece aqui`, `Portfólio atual`, `Mercado e método`, `Estratégia 2027`, `Ofertas`.
- `nos` (até 6 palavras) e `centro` (número e legenda) desenham a arte da capa. São opcionais.
- `capitulos`: a chave é exatamente o `data-p` dos slides daquela parte. Ao avançar para uma parte nova, aparece o cartão de capítulo.
- `<style data-deck>` e `<script data-deck>` (opcionais) entram só nessa apresentação.

### Atributos do slide

| Atributo | Uso |
|---|---|
| `data-p` | Parte, no formato `"N · Nome"` (ou `"Contexto"`). Aparece no cabeçalho e dispara o capítulo |
| `data-t` | Título curto do slide (cabeçalho e navegação) |
| `data-band` | Título da banda de seção, em caixa alta. Formato `"Tema · mensagem"` |
| `data-c` | Cor da banda: `c-navy`, `c-blue`, `c-steel`, `c-green`, `c-purple`, `c-gold`, `c-red` |
| `data-bs` | Texto pequeno à direita da banda (curto, até cerca de 50 caracteres) |
| `data-src` | Rodapé: documento e seção de origem e selos. Obrigatório em todo slide de conteúdo |
| `data-nofoot` | Sem rodapé (capa) |

## 3. Área útil e regras de layout

- O corpo (`.body`) tem cerca de **1500 × 670 px** úteis. É uma coluna flex: os blocos se empilham.
- **Nada pode transbordar** nem ser cortado. A verificação automática acusa.
- **Preencha o slide.** No máximo 90 px livres no fim do corpo e nenhum cartão com mais de 110 px vazios por dentro. Se o conteúdo for naturalmente curto, use `<div class="body spread">` (distribui o espaço entre os blocos). `.grow` faz um bloco ocupar a altura restante; use só em blocos que se enchem (gráficos, tabelas, grades de cartões com texto suficiente).
- Um slide = uma mensagem. Abra com uma frase-tese (`.stmt`) e sustente com 2 ou 3 blocos visuais.
- **Prefira visual a lista:** gráfico, tabela, fluxo em chevrons, cartões com número grande, faixa Fato → Dado → Insight → Implicação.
- Texto corrido curto: até 2 ou 3 linhas por cartão.

## 4. Componentes (classes prontas)

```html
<div class="stmt kin">Frase-tese com <em>destaque laranja</em>.</div>   <!-- .sm (26px) e .lg (36px); .kin anima palavra a palavra -->
<p class="lead">Parágrafo de apoio com <b>negrito</b>.</p>
<div class="eye">Sobretítulo</div>   <div class="ttl">Título de bloco <small>complemento</small></div>
<div class="g2|g3|g4|g5|g6"> ... </div>   <div class="row"> <div class="f1">...</div> <div style="width:420px">...</div> </div>
<div class="card">  .soft  .nv (escuro)  .ac (borda laranja)  .bl (azul)  .gr (verde)  .rd (vermelha) ; <h3>, <h4>, <p>, <ul class="ins">
<div class="kpis" style="--n:4"><div class="kpi" style="--kc:var(--s2)"><div class="l">Rótulo</div><div class="v" data-count="50">50<small>%</small></div><div class="d">fonte ✅</div></div></div>   <!-- .kpi.hl = escuro -->
<span class="big">2.466<small>empresas</small></span>
<table class="tbl">  .sm  .xs ; td.num (alinhado à direita), td.c, tr.hl (linha destacada)
<div class="fdii"><div class="f"><span class="k">Fato</span>...</div><div class="d"><span class="k">Dado</span>...</div><div class="i"><span class="k">Insight</span>...</div><div class="m"><span class="k">Implicação</span>...</div></div>
<div class="steps"><div><b>Etapa</b><span>descrição</span></div><div class="on">...</div></div>   <!-- fluxo em chevrons; .on = etapa em destaque -->
<div class="callout">...</div>  .bl ;  <div class="quote">...</div>
<span class="pill">  .or .nv .gr ;  <span class="tagx">  .or .nv .gr .rd .mu ;  <span class="dec evo|ref|new|fun|keep">Decisão</span>
<span class="num-badge">1</span>  .or ;  <div class="m22"><div>...</div><div class="star">...</div>...</div> (matriz 2×2)
<div class="lv"><div class="fl" data-w="74"></div><div class="mk" style="left:84%"></div></div>   <!-- barra de nível -->
```

**Animação de entrada:** `data-a="up|fade|zoom|left|right|down|pop|blur|grow"` com atraso `style="--d:3"` (passos de 80 ms). Números: `data-count="2466"` (`data-dec`, `data-pre`, `data-suf`); escreva o valor final também como texto.

**Interações:**
- Abas ou seletor: botões com `data-pane="id"` dentro de `.tabs` ou `.seg`; painéis `<div class="pane" id="id">` (o primeiro com `class="pane on"`).
- Detalhe ao clicar: `<div class="card clk" data-show="d1">` e `<div class="det on" id="d1" data-grp="g">`, `<div class="det" id="d2" data-grp="g">`.
- Virar cartão: `<div class="flip" style="height:160px"><div class="in"><div class="fr card">frente</div><div class="bk card nv">verso</div></div></div>`.
- Dica ao passar o mouse: qualquer elemento com `data-tv="Título" data-tl="detalhe"`.

## 5. Gráficos

```html
<div class="ch" data-type="hbar" data-h="300"><script type="application/json">{ ... }</script></div>
```

A largura vem do contêiner; `data-h` define a altura onde ela importa (vbar, donut, scatter, waterfall, radar, timeline). Opções comuns: `title`, `note`, `fmt` (`int`, `dec1`, `dec2`, `pct`, `pct1`), `pre`, `suf`. Cores: `"c": "s1"`.

| Tipo | Para quê | Dados |
|---|---|---|
| `hbar` | Comparar magnitudes, ranking | `items:[{l, v, c?, b?, tip?, note?}]`, `max`, `labelW`, `barH`, `gap`, `ticks`, `ref:{v,l}`, `axis:false` |
| `vbar` | Poucas categorias ou série curta | `items:[{l, v, c?}]`, `max`, `ref`, `barW`, `labelH` |
| `dumbbell` | Antes × depois (atual × alvo) | `items:[{l, a, b, strike?}]`, `min`, `max`, `la`, `lb`, `ref`, `labelW`, `rowH` |
| `donut` | Parte do todo (até 5 fatias) | `items:[{l, v, c?}]`, `center`, `sub`, `size`, `thick` |
| `stack` | Composição por linha | `cats:[{l,c}]`, `rows:[{l, v:[...]}]`, `pct:true` |
| `gantt` | Cronograma | `start:"2026-11"`, `end:"2027-12"`, `rows:[{g, l, s:"2027-01", m:3, milestone?, tag?}]`, `today` |
| `heat` | Matriz de notas | `cols:[...]`, `rows:[{l, v:[...], t?}]`, `min`, `max`, `total:true`, `scaleLabels` |
| `scatter` | Duas dimensões e quadrantes | `x:{l,min,max}`, `y:{l,min,max}`, `items:[{l, x, y, r?, c?, pos:"l/r/t/b"}]`, `quad:{x,y,labels:[sup-esq, sup-dir, inf-esq, inf-dir]}` |
| `waterfall` | Soma por etapas | `items:[{l, v, c?}]`, `total:{l}`, `max` |
| `radar` | Perfil em vários eixos | `axes:[...]`, `max`, `series:[{l, v:[...], c?}]` |
| `timeline` | Marcos datados | `items:[{d:"set/2026", t, s?, c?}]` |

**Cores (paleta validada para daltonismo e contraste):**
- Categóricas, sempre nesta ordem: `s1` azul, `s2` laranja, `s3` verde-azulado, `s4` violeta.
- Ordinal (do claro ao escuro): `o1` … `o5`. Use para valores ordenados, nunca para categorias.
- Destaque: `s2` (ou `hl`) no que importa e `o3` ou `mut` no resto.
- Status (`ok`, `warn`, `crit`): só para semáforo, sempre com rótulo.
- Texto nunca leva a cor da série. Com 2 ou mais séries há legenda.

## 6. Regras de conteúdo

1. **Fidelidade total ao documento-fonte.** Todo número, nome, data e afirmação sai do documento indicado em `fonte` (ou de outro documento do repositório, citado em `data-src`). **Nada inventado:** nenhum número novo, nenhuma estimativa nova, nenhuma escala numérica para algo que o documento só descreve com palavras.
2. **Selos preservados:** 📘 interno · 🗂️ slides de status e catálogo · ✅ confirmado · 🔎 fonte única ou com ressalva · ⚠️ fraco · 💡 proposta ou análise do repositório.
3. **Português do Brasil, linguagem simples.** Frases curtas. Termos técnicos explicados na primeira vez.
4. Resuma; não copie parágrafos longos.
5. **Pessoas:** nomes só nos slides de governança e só se estiverem no documento-fonte.
6. **Sem dados de empresas-alvo:** nada de vulnerabilidades, achados nominais ou números de alvos.
7. `data-src` em todo slide de conteúdo: documento, seção e natureza da informação.

## 7. Verificação

1. `python3 scripts/apresentacoes.py <prefixo>` gera a apresentação.
2. Rode a verificação automática de layout: transbordamento, cartões ocos, espaço ocioso, texto de gráfico fora da área e erros de console.
3. Olhe as capturas de cada slide: rótulos que se sobrepõem, quebras de linha estranhas, blocos desalinhados, contraste.
4. Repita até zerar os problemas.
