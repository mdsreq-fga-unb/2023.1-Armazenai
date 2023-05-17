# Backlog do produto

## Backlog funcional:
### Temas
| ID   | Tema                                                          |
|:-----|:--------------------------------------------------------------|
| T01  | Realizar orçamento de vantangens financeiras do armazenamento |
| T02  | Dashboard de vantagens financeiras do armazanamento           |
| T03  | Autenticação dos operadores                                   |
| T04  | Gerenciamento de pedidos e clientes                           |

### Épicos
| Tema   | ID   | Descrição                                                                                                                                                            |
|:-------|:-----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| T01    | E01  | O sistema deve ser capaz de realizar um orçamento de vantagens financeiras do armazenamento de grãos, a partir de dados de produção e preço de mercado.              |
| T01    | E02  | O sistema deve ser capaz de prever a necessidade de espaço de armazenamento para o próximo ciclo de produção com base no histórico de vendas e projeções de demanda. |
| T02    | E03  | O sistema deve ser capaz de apresentar um dashboard de análise de tendências de produção e vendas para ajudar na tomada de decisões estratégicas.                    |
| T02    | E04  | O sistema deve ser capaz de apresentar um dashboard de vantagens financeiras do armazenamento de grãos, a partir de dados de produção e preço de mercado.            |
| T03    | E05  | O sistema deve ser capaz de autenticar os operadores do sistema.                                                                                                     |
| T03    | E06  | O sistema deve ser capaz de atribuir diferentes níveis de acesso e permissões aos operadores, de acordo com sua função e responsabilidade.                           |
| T04    | E07  | O sistema deve ser capaz de gerenciar os pedidos de clientes.                                                                                                        |
| T04    | E08  | O sistema deve ser capaz de rastrear o status dos pedidos de clientes e armazenas informações do processo                                                            |

### User Storys
| Tema   | Épico   | ID   | Descrição                                                                                                                                                                                                                                  |   Pontuação |
|:-------|:--------|:-----|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------:|
| T01    | E01     | US01 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção.                                                                                                                     |          12 |
| T02    | E03     | US05 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado                                                                                           |          12 |
| T02    | E03     | US06 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto                                                               |          12 |
| T03    | E05     | US08 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário                                                                                                                                    |          12 |
| T01    | E02     | US02 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho do silo e secador necessário.                                                                                                    |          11 |
| T04    | E08     | US15 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está                                                                                                                                              |          11 |
| T01    | E01     | US03 | Como operador, desejo simular cenários de financiamento para mostrar ao cliente a viabilidade do produto                                                                                                                                   |          10 |
| T02    | E03     | US07 | Como operador, desejo visualizar um gráfico com gráficos que mostrem o preço histórico da saca nos meses de colheita em comparação com os preços de colheita nos meses de baixa colheita para mostrar a diferença de valor entre as épocas |          10 |
| T04    | E07     | US14 | Como operador, desejo criar um pedido para acompanhar as etapas em que está: orçamento, feedback, negociação, contratação ou execução                                                                                                      |          10 |
| T04    | E04     | US22 | Como operador, desejo armazenar os dados do cliente para decisões internas.                                                                                                                                                                |          10 |
| T04    | E07     | US23 | Como operador, desejo poder salvar o orçamento para futuras operações                                                                                                                                                                      |          10 |
| T04    | E08     | US16 | Como operador, desejo realizar buscas de pedidos para facilitar a localização de orçamentos específicos.                                                                                                                                   |           9 |
| T04    | E04     | US18 | Como operador, desejo editar pedidos já realizados para que os dados dos pedidos estejam sempre atualizados.                                                                                                                               |           9 |
| T03    | E05     | US09 | Como operador, desejo poder logar no aplicativo para garantir a segurança dos dados armazenados                                                                                                                                            |           8 |
| T03    | E05     | US10 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa                                                                                                                                 |           8 |
| T03    | E05     | US11 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema                                                                                                                                  |           8 |
| T03    | E05     | US12 | Como administrador, desejo poder editar os dados de um usuário para manter os dados atualizados                                                                                                                                            |           8 |
| T03    | E05     | US13 | Como administrador, desejo poder excluir um usuário para manter o sistema organizado                                                                                                                                                       |           8 |
| T04    | E04     | US17 | Como operador, desejo remover pedidos que não estão mais em andamento.                                                                                                                                                                     |           8 |
| T04    | E04     | US19 | Como operador, desejo poder visualizar os pedidos de um cliente específico para facilitar a localização de orçamentos específicos.                                                                                                         |           8 |
| T04    | E04     | US20 | Como operador, desejo poder adicionar comentários a cada etapa para uma futura avaliação do processo de venda.                                                                                                                             |           8 |
| T02    | E02     | US04 | Como operador, desejo inserir um orçamento externo para calcular a viabilidade e mostrar ao cliente.                                                                                                                                       |           7 |
| T04    | E04     | US21 | Como operador, desejo poder adicionar documentos a cada etapa do pedido para manter o histórico de cada etapa                                                                                                                              |           7 |
| T04    | E08     | US24 | Como operador, desejo poder enviar o orçamento para o cliente                                                                                                                                                                              |           7 |

* A pontuação foi estabelecida com base na avaliação de prioridade junto ao PO, sendo que o valor de negócio tem peso 2, enquanto complexidade e viabilidade tem peso 1.

**Legenda**

- **Operador**: Representantes da EGL.
- **Administrador**: Representantes da EGL com permissão de administrador ou superiores.
## Não funcionais:
### Usabilidade
- Utilização das cores da empresa EGL
- Apresentar os dados relevantes em gráficos e dashboards
- Apresentar botões de retorno a página inicial nas páginas seguintes, para orientação do usuário
- Apresentar tela de retorno em caso de erro ou de espera muito longa
- Visualização de gráficos e dashboards deve ser feito a partir de telas maiores (1280x720 16:9)
### Suportabilidade
- Suporte nos navegadores Chrome, Firefox e Safari
### Desempenho
- O site deve ter um tempo de carregamento de no máximo 3 segundos
- A respota no cálculo de viabilidade deve ser em tempo real
### Segurança
- A aplicação deve ser capaz de armazenar dados de clientes e representantes de maneira segura
- O sistema dedve cumprir a LGPD e disponibilizar informações sobre a coleta de dados
### Conectividade
- O usuário do sistema terá de estar conectado a internet para ter acesso a todas as funcionalidades do sistema
### Implementação
- O sistema deve ser implementado em React
### Design
- O Sistema deverá seguir a paleta de cores da empresa EGL: 
![Cores a serem utilizadas no design do projeto](paleta-Armazenai.jpg)


## MVP 1
| US | Descrição |
|---|---|
| US1 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção. |
| US2 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho do silo e secador necessário. |
| US3 | Como operador, desejo simular cenários de financiamento para mostrar ao cliente a viabilidade do produto |
| US5 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado |
| US6 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto |
| US7 | Como operador, desejo visualizar um gráfico com gráficos que mostrem o preço histórico da saca nos meses de colheita em comparação com os preços de colheita nos meses de baixa colheita para mostrar a diferença de valor entre as épocas |
| US22 | Como operador, desejo armazenar os dados do cliente para decisões internas. |

## MVP 2
| US | Descrição |
|---|---|
| US8 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário |
| US10 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa |
| US11 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema |
| US12 | Como administrador, desejo poder editar os dados de um usuário para manter os dados atualizados |
| US13 | Como administrador, desejo poder excluir um usuário para manter o sistema organizado |
| US14 | Como operador, desejo criar um pedido para acompanhar as etapas em que está: orçamento, feedback, negociação, contratação ou execução |
| US15 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está |
| US17 | Como operador, desejo remover pedidos que não estão mais em andamento. |
| US18 | Como operador, desejo editar pedidos já realizados para que os dados dos pedidos estejam sempre atualizados. |
| US19 | Como operador, desejo poder visualizar os pedidos de um cliente específico para facilitar a localização de orçamentos específicos. |
| US23 | Como operador, desejo poder salvar o orçamento para futuras operações |


## Histórico de revisões

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 27/04/2023 | 0.1 | Criação do documento | Kaio Melo, Lucas Pereira, Lucas Meirelles, Lara Giuliana |
| 02/05/2023 | 0.2       | Adição de paleta de cores | Lara Giuliana |
| 15/05/2023 | 0.3 | Refinamento do backlog e definição de US's | Kaio Melo |
| 17/05/2023 | 0.4 | Ordernação das histórias pelo valor de prioridade | Lucas Pereira | 
