# Insumo de IA externa nº 2: engenharia dos ZIPs, benchmark, tabela de evolução e custos

> **Origem:** análise produzida por outra ferramenta de IA e colada pelo usuário na conversa de 05/10/2026, junto com o arquivo do insumo nº 3.
> **Status neste repositório:** INSUMO, não fonte. As afirmações foram verificadas de forma independente (ver [`docs/11-analise-critica-dos-insumos.md`](../docs/11-analise-critica-dos-insumos.md)).
> Texto reproduzido literalmente. Os rótulos de link do original (ex.: "pwc.com", "Deloitte US") foram mantidos como texto; as URLs não vieram na colagem.

---

## O que vocês já têm — e onde melhorar

A engenharia da diligência está organizada nesta sequência:

Tese e escopo → evidências → diagnóstico de TI → riscos → iniciativas → business case → roadmap → relatório → revisão de qualidade.

Isso é uma boa base para um produto. Existem regras para separar fatos de hipóteses, preservar fontes, evitar dupla contagem e atualizar análises quando chegam novas evidências.

O principal avanço necessário é conectar essas etapas em um ambiente único, reduzindo transferências entre Word, Excel, apresentações e skills.

Encontrei três pontos relevantes:

- **Automação parcial:** os pacotes possuem scripts e regras, mas ainda dependem de julgamento especializado e de outras skills. Isso não comprova uma solução pronta para produção.
- **Lacunas de integração e qualidade:** o ZIP denominado "Definição de escopo da DD" contém um método de criação de skills. No motor financeiro, a regra de evidência para ROI também precisa de correção: o método exige evidência de investimento e benefício, enquanto o código verifica a presença em qualquer um dos lados.
- **IA na empresa-alvo pouco aprofundada:** o módulo de Dados e Digital menciona IA, mas não encontrei uma metodologia dedicada para testar modelos, custos de inferência, qualidade dos resultados e dependências de fornecedores.

O portfólio comercial já cobre integração, separação, preparação para venda e criação de valor. Portanto, há espaço para renovar a entrega sem reconstruir todo o catálogo.

## Benchmark, com foco nos Estados Unidos

| Referência | O que oferece ou desenvolve publicamente | O que aprender |
|---|---|---|
| PwC US | Diligência de IA e tecnologia; ferramentas e playbooks com IA para M&A e separações. | Conectar avaliação técnica, planejamento e execução. *(pwc.com)* |
| Deloitte US | Abordagem integrada para transações envolvendo pessoas, código, dados e infraestrutura de IA. | Avaliar se o comprador conseguirá operar a capacidade adquirida após o fechamento. *(Deloitte US)* |
| KPMG US | Avaliação dos riscos que diligências tradicionais podem deixar passar em empresas afetadas por IA. | Testar capacidade real de IA e dívida técnica, além das declarações da administração. *(kpmg.com)* |
| EY-Parthenon — global | Diligence Edge: extração, análise e relatórios com IA e rastreabilidade. | Incorporar o método em uma plataforma reutilizável. *(EY - Global)* |
| Bain | Diligência do impacto da IA no modelo de negócio, preços, competição e oportunidades. | Perguntar se a empresa continuará competitiva, além de avaliar sua TI. *(Bain & Company)* |
| McKinsey e BCG — global | IA para conectar informações ao longo do ciclo de M&A e reutilizar aprendizados. | Preservar o conhecimento de cada transação para melhorar a próxima. *(McKinsey)* |

Correção da resposta anterior: encontrei o anúncio oficial de lançamento do A&M DiligenceGPT em janeiro de 2024. Antes de investir em uma plataforma local, precisamos verificar o que já pode ser utilizado pela DTS Brasil. *(Professional Services)*

## O que o mercado está sinalizando

As pesquisas e ofertas consultadas apontam três prioridades:

1. Entender o impacto da IA no investimento: riscos competitivos, capacidade tecnológica real e oportunidades de geração de valor.
2. Executar separações com controle: dependências de sistemas, dados, custos e saída do TSA.
3. Levar a diligência até a captura de resultados: transformar os achados em iniciativas executadas e benefícios demonstrados.

A pesquisa global da KPMG com 700 decisores identifica separação de TI e dados como risco relevante e forte interesse de Private Equity em carve-outs. A Bain destaca criação de valor e execução desde o Day 1. São sinais de demanda; não comprovam o tamanho de cada oportunidade no Brasil. *(kpmg.com)*

## Tabela de evolução dos serviços

As mudanças abaixo são recomendações para DTS, não ofertas já implantadas.

| Serviço atual | Potencial de melhoria | Como modelar com IA e automação | Nome: mudar ou manter? | Quem atender |
|---|---|---|---|---|
| IT Due Diligence — comprador | Avaliar riscos, investimentos e capacidade de suportar a tese com mais consistência. | Extrair evidências, comparar fontes, identificar contradições e preparar perguntas. Consultor valida os achados; motor calcula custos. | Usar Technology Due Diligence como guarda-chuva; manter IT DD como módulo. | Fundos e compradores corporativos. |
| Vendor DD / preparação para venda | Preparar a empresa antes de o comprador encontrar problemas. | Organizar data room, apontar documentos faltantes, elaborar factbook e apoiar Q&A com fontes. | Separar Exit Readiness, Vendor Assistance e Vendor DD, conforme o escopo. | Empresas à venda e fundos preparando saída. |
| Integration & Separation Planning | Comparar alternativas e antecipar custos e dependências. | Simular manter, integrar, substituir ou separar sistemas; organizar Day 1 e roadmap. | Manter, com pacotes de integração e separação. | Compradores, vendedores e empresas em carve-out. |
| Separation Strategy & Design | Tornar TSA e autonomia operacional mais explícitos. | Mapear serviços compartilhados, custos da operação independente e condições para encerrar o TSA. | Technology Carve-out & TSA Planning como oferta específica. | Grupos vendendo unidades e compradores desses ativos. |
| IT IMO / SMO | Reduzir esforço de controle e aproximar execução dos benefícios. | Sistema de iniciativas, decisões, riscos e orçamento; IA consolida status e aponta dependências. | Manter IMO/SMO; TMO se houver transformação mais ampla. | Empresas executando integração ou separação. |
| IT M&A Playbook | Passar de documentação para um método usado continuamente. | Checklists por tipo de deal, assistente de consulta, modelos e atualização com lições aprendidas. | Digital M&A Playbook. | Compradores recorrentes e fundos com estratégia de consolidação. |
| IT Synergies & Value Creation | Criar receita recorrente e demonstrar valor financeiro. | Acompanhar cloud, licenças, sistemas e automações; comparar previsto e realizado, validado por Financeiro. | Technology Value Creation Office. | Fundos e suas investidas. |
| Dados, Digital e Cyber | Criar um módulo especializado em IA. | Testar qualidade, custos, dados, propriedade intelectual, dependências, segurança e impacto competitivo. | Novo módulo: AI Due Diligence & Value Assessment. | Software, serviços e empresas cuja tese depende de IA. |

## Qual novo produto faz mais sentido?

Eu desenvolveria um serviço contínuo de Technology Deal-to-Value, apoiado por sistema e especialistas.

O cliente teria uma visão conectada de:

- O que foi encontrado na diligência.
- Quanto custa resolver ou integrar.
- Quem precisa executar e quando.
- Quanto do benefício foi efetivamente capturado.
- Quais pendências podem prejudicar uma futura venda.

A inovação estaria na continuidade entre diligência e resultado financeiro. Existem iniciativas semelhantes no mercado; não seria correto apresentá-lo como algo inédito mundialmente.

## Qual fatia do mercado buscar?

Minha recomendação inicial é fundos e compradores recorrentes de empresas de médio porte, especialmente aqueles com várias investidas e pouca capacidade interna para coordenar tecnologia.

São clientes em que o mesmo método pode ser reutilizado em diferentes aquisições e gerar acompanhamento recorrente. Para começar, eu escolheria dois setores nos quais DTS já tenha casos e especialistas, usando o catálogo setorial existente. Saúde, serviços, indústria e software são candidatos a validar, não segmentos com demanda comercial já comprovada.

Uma segunda frente seria carve-outs ligados à reestruturação, conectando DTS às demais áreas da A&M.

## Quanto custaria desenvolver?

Estas são estimativas de planejamento, não cotações de mercado. Premissa ilustrativa: custo médio de R$250 por hora, reaproveitamento das skills e infraestrutura corporativa aprovada, mais 20% de contingência.

| Etapa | Escopo | Esforço estimado | Investimento estimado |
|---|---|---|---|
| Piloto de diligência | Corrigir regras, conectar etapas essenciais e validar com um caso autorizado. | 160–240 horas | R$48–72 mil |
| MVP com interface | Evidências, achados, revisão, motor financeiro, permissões e relatórios. | 600–1.000 horas | R$180–300 mil |
| Módulo recorrente adicional | Iniciativas, TSA ou captura de valor, reaproveitando o MVP. | 300–600 horas | R$90–180 mil adicionais |

Licenças, consumo de IA, cloud, integrações e suporte precisam de orçamento separado após dimensionar documentos, usuários e requisitos de segurança. O acesso a ferramentas globais da A&M pode alterar bastante esses valores.

## Quanto cobrar do cliente?

Não encontrei preços públicos comparáveis das grandes consultorias. Podemos modelar a oferta por projeto, módulo especializado e mensalidade de acompanhamento.

Exemplo apenas para demonstrar a conta: se uma entrega custar R$60 mil, uma margem bruta desejada de 40% exigiria receita de R$100 mil, antes dos ajustes tributários e comerciais. Isso não é benchmark de preço nem proposta.

Eu começaria renovando a diligência e criando o módulo de AI Due Diligence. Depois, conectaria esses resultados ao serviço recorrente de Value Creation. O piloto deve medir horas, prazo, cobertura de evidências e retrabalho; esses resultados darão base para decidir o investimento maior e a promessa comercial de 2027.
