# Backlog do produto

## Backlog funcional

### Temas

| ID  | Tema                                                          |
| :-- | :------------------------------------------------------------ |
| T01 | Realizar orçamento de vantangens financeiras do armazenamento |
| T02 | Dashboard de vantagens financeiras do armazanamento           |
| T03 | Autenticação dos operadores                                   |
| T04 | Gerenciamento de pedidos e clientes                           |

### Épicos

| Tema | ID  | Descrição                                                                                                                                                            |
| :--- | :-- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T01  | E01 | O sistema deve ser capaz de realizar um orçamento de vantagens financeiras do armazenamento de grãos, a partir de dados de produção e preço de mercado.              |
| T01  | E02 | O sistema deve ser capaz de prever a necessidade de espaço de armazenamento para o próximo ciclo de produção com base no histórico de vendas e projeções de demanda. |
| T02  | E03 | O sistema deve ser capaz de apresentar um dashboard de análise de tendências de produção e vendas para ajudar na tomada de decisões estratégicas.                    |
| T02  | E04 | O sistema deve ser capaz de apresentar um dashboard de vantagens financeiras do armazenamento de grãos, a partir de dados de produção e preço de mercado.            |
| T03  | E05 | O sistema deve ser capaz de autenticar os operadores do sistema.                                                                                                     |
| T03  | E06 | O sistema deve ser capaz de atribuir diferentes níveis de acesso e permissões aos operadores, de acordo com sua função e responsabilidade.                           |
| T04  | E07 | O sistema deve ser capaz de gerenciar os pedidos de clientes.                                                                                                        |
| T04  | E08 | O sistema deve ser capaz de rastrear o status dos pedidos de clientes e armazenas informações do processo                                                            |

### User Storys

| Tema | Épico | ID   | Descrição                                                                                                                                                                    | Pontuação |
| :--- | :---- | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------: |
| T01  | E01   | US01 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção.                                                       |        12 |
| T02  | E03   | US02 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado                             |        12 |
| T02  | E03   | US03 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto |        12 |
| T03  | E05   | US04 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário                                                                      |        12 |
| T04  | E08   | US05 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está                                                                                |        11 |
| T01  | E01   | US06 | Como operador, desejo simular cenários de financiamento para mostrar ao cliente a viabilidade do produto                                                                     |        10 |
| T02  | E03   | US07 | Como operador, desejo visualizar um indicador que mostre o lucro extra em potencial de saca por ano, para mostrar o benefício da armazenagem                                 |        10 |
| T04  | E07   | US08 | Como operador, desejo criar e editar um pedido para acompanhar as etapas em que está: orçamento, feedback, negociação, contratação ou execução                                        |        10 |
| T04  | E04   | US09 | Como operador, desejo armazenar os dados do cliente para decisões internas.                                                                                                  |        10 |
| T04  | E07   | US10 | Como operador, desejo poder salvar o orçamento para futuras operações                                                                                                        |        10 |
| T04  | E08   | US11 | Como operador, desejo realizar buscas de pedidos para facilitar a localização de orçamentos específicos.                                                                     |         9 |
| T03  | E05   | US12 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa                                                                   |         8 |
| T03  | E05   | US13 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema                                                                    |         8 |
| T03  | E05   | US14 | Como administrador, desejo poder editar os dados de um usuário para manter os dados atualizados                                                                              |         8 |
| T03  | E05   | US15 | Como administrador, desejo poder excluir um usuário para manter o sistema organizado                                                                                         |         8 |
| T04  | E04   | US16 | Como operador, desejo remover pedidos que não estão mais em andamento.                                                                                                       |         8 |
| T04  | E04   | US17 | Como operador, desejo poder visualizar os pedidos de um cliente específico para facilitar a localização de orçamentos específicos.                                           |         8 |
| T04  | E04   | US18 | Como operador, desejo poder adicionar comentários a cada etapa para uma futura avaliação do processo de venda.                                                               |         8 |
| T02  | E02   | US19 | Como operador, desejo inserir um orçamento externo para calcular a viabilidade e mostrar ao cliente.                                                                         |         7 |
| T04  | E04   | US20 | Como operador, desejo poder adicionar documentos a cada etapa do pedido para manter o histórico de cada etapa                                                                |         7 |
| T04  | E08   | US21 | Como operador, desejo poder enviar o orçamento para o cliente                                                                                                                |         7 |

- A pontuação foi estabelecida com base na avaliação de prioridade junto ao PO, sendo que o valor de negócio tem peso 2, enquanto complexidade e viabilidade tem peso 1.

**Legenda**

- **Operador**: Representantes da EGL.
- **Administrador**: Representantes da EGL com permissão de administrador ou superiores.

## Não funcionais

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

## MVP 1

| US   | Descrição                                                                                                                             | Critérios de aceitação |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| US04  | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário                               | A permissão do acesso é feita através de:  <ul><li>Usuário ou e-mail</li><li>Senha cadastrada</li></ul> |
| US05 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está e acompanhar a evolução do processo                                         | As possíveis etapas são: <ul><li>Orçamento inicial</li><li>Feedback do cliente</li><li>Negociação</li><li>Contratação</li><li>Execução da obra</li><li>Concluído</li><li>Cancelado</li></ul> |
| US08 | Como operador, desejo criar e editar um pedido para acompanhar as etapas em que está: orçamento, feedback, negociação, contratação ou execução |Os dados do pedido são:  <ul><li>Capacidade de produção de soja em sacas; Capacidade de produção de milho em sacas; Hectares plantados; Umidade média do grão na colheita; Área de terreno disponível para a estrutura de armazenagem [US1]; Valor total negociado; Capacidade de armazenagem do silo; Capacidade do secador de grãos; Identificador do cliente (CPF/CNPJ); Data do pedido;</li></ul>|
| US12 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa                            | <ul><li>É apresentado um painel que mostre todos os usuários cadastrados</li><li>Deve ser possível criar, editar e desabilitar usuários</li><li>Deve ser possível filtrar os usuários por:</li><ul><li>Nome</li><li>CPF</li><li>E-mail</li><li>Telefone</li></ul></ul> |
| US13 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema                             | <ul><li>O operador tem os dados: <ul><li>Usuário</li> <li>Nome</li> <li>CPF</li><li>E-mail</li> <li>Telefone</li></ul> </li><li>O e-mail deve ser validado</li></ul>|
| US16 | Como operador, desejo remover pedidos que não estão mais em andamento para manter o controle dos processos.                                                                | <ul><li>Ao excluir o pedido todos os dados relacionados como documentos e feedbacks devem ser excluídos, exceto pelo orçamento, que deve ser preservado</li></ul> |
| US11 | Como operador, desejo realizar buscas de pedidos para facilitar a localização de orçamentos específicos.                                                                     | Os pedidos podem ser filtrados por: <ul><li>Identificador do cliente;</li><li>Etapa em curso;</li><li>Data de criação;</li></ul> |

## MVP 2

| US    | Descrição                                                                                                                                                                                                                                  | Critérios de aceitação                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| US01   | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção.                                                                                                                     | Os dados coletados devem ser: <ul><li>Capacidade de produção de soja e/ou milho em sacas</li><li>Total de hectares plantados para cada grão</li><li>Umidade média de cada grão na colheita</li><li>Área de terreno disponível para a estrutura de armazenagem</li><li>Data de criação orçamento</li><li>Endereço da propriedade</li> <li>Nome da propriedade</li> </li></li></ul> <li>O usuário tem a capacidade de revisar e editar as informações do formulário antes de finalizar o envio</li>                                                                                                                                      |
| US02 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado                                                                                           | <ul><li>Os dados apresentados são o preço de venda da saca de milho ou soja por mês, sendo possível alternar entre eles, durante os últimos 12 meses</li><li>A apresentação é feita em um gráfico de barras verticais</li><li>O sistema fornece legendas de identificação clara para facilitar a interpretação do gráfico, incluindo unidades de medida, datas e valores específicos</li><li>Os dados devem ser reais e atualizados, requisitados de uma fonte confiável e reconhecida</li></ul>                                                                                                                                       |
| US03 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto | <ul><li>Os dados apresentados são o lucro extra em potencial por ano a partir da construção do armazém</li><li>A apresentação é feita em um gráfico de barras verticais</li><li>O lucro extra é calculado pela diferença entre o mês de maior valor de venda e o mês de colheita multiplicado pela capacidade de produção do cliente</li><li>O gráfico é cumulativo e tem uma tendência linear, considerando o lucro extra pelos dados dos últimos 12 meses</li><li>O gráfico apresenta dados para uma quantidade de anos suficiente para que o valor de lucro supere o valor do orçamento, respeitando um máximo de 10 anos</li></ul> |
                                                                                                                                                                                                                                          |
| US07 | Como operador, desejo visualizar um indicador que mostre o lucro extra em potencial de saca por ano, para mostrar o benefício da armazenagem                                 | <ul><li>O indicador deve mostrar a diferença de valor entre os meses de colheita e os meses destacados no gráfico da US05</li><li>O indicador tem uma etiqueta indicando 'Lucro extra em potencial [saca / ano]</li><li>O indicador deve ser um valor com até 2 casas decimais</li></ul>                                                                                                                                                                                                                                                                                                                                               |
| US09  | Como operador, desejo armazenar os dados do cliente para decisões internas.                                                                                                                                                                | Os dados do cliente são <ul><li>CPF/CNPJ</li><li>Telefone</li><li>E-mail</li><li>Propriedades que possui, podendo ser possível criar uma propriedade nova, sendo necessário preencher apenas o nome e endereço da propriedade</li></ul>
| US10 | Como operador, desejo poder salvar o orçamento para futuras operações                                                                 | <ul><li>O orçamento pode ser salvo no perfil do cliente</li><li>Deve ser possível filtrar os orçamentos por: Preço; Data de criação do orçamento; Cliente; Capacidade de armazenagem do silo e do secador.</li></ul> |

# Status

| US    |  Responsável | Status | Testes |
| ---- | ------ | ----- | ----------- |
| US01 | Jheniffer Castro e Kaio Melo |  ✅ |  ✅ |
| US04 | Kaio Melo |  ✅ |  ✅ |
| US09 | Kaio Melo |  ✅ |  ✅ |
| US12 | Kaio Melo |  ✅ |  ✅ |
| US13 | Kaio Melo |  ✅ |  ✅ |
| US16 | Lara Giuliana |  ✅ |  🚧 |
| US10 | Lucas Meireles e Lara Giuliana  |  🚧 |  ⏳ |
| US11 | Kaio Melo e Lara Giuliana  |  🚧 |  ⏳ |
| US18 | Kaio Melo e Mateus  | 🚧 |  ⏳ |
| US02 | Jheniffer Castro  |  🚧 |  ⏳ |
| US05 | Kaio Melo e Mateus  |  🚧 |  ⏳ |
| US03 | Não atribuído  |  ⏳ |  ⏳ |
| US07 | Não atribuído  |  ⏳ |  ⏳ |

## Histórico de revisões

| Data       | Versão | Descrição                                         | Autor                                                    |
| ---------- | ------ | ------------------------------------------------- | -------------------------------------------------------- |
| 27/04/2023 | 0.1    | Criação do documento                              | Kaio Melo, Lucas Pereira, Lucas Meireles, Lara Giuliana |
| 02/05/2023 | 0.2    | Adição de paleta de cores                         | Lara Giuliana                                            |
| 15/05/2023 | 0.3    | Refinamento do backlog e definição de US's        | Kaio Melo                                                |
| 17/05/2023 | 0.4    | Ordernação das histórias pelo valor de prioridade | Lucas Pereira                                            |
| 17/05/2023 | 0.5    | Revisando algumas histórias de usuário                            | Lucas Pereira                                            |
| 17/05/2023 | 0.6    | Criação de critérios de aceitação                           | Lucas Pereira, Kaio Melo                                            |
| 11/07/2023 | 0.7    | Atualização do backlog        | Kaio Melo                                                || 17/05/2023 | 0.6    | Criação de critérios de aceitação                           | Lucas Pereira, Kaio Melo                                            |
| 12/07/2023 | 0.7    | Atualização do backlog                           | Kaio Melo                                            |
