# Estratégia de testes

## Introdução

Como forma de garantir o funcionamento e qualidade do sistema produzido, adotaremos os testes unitários e de integração ao sistema, sendo esses automatizados.
Os Teste Unitários garantiram a funcionalidade de cada função do sistema, enquanto os Testes de Integração garantiram o funcionamento do sistema como um todo. Como parte do processo de desenvolvimento, também realizaremos testes manuais em **TODAS** as histórias de usuário desenvolvidas.
Além disso, testes de aceitação serão realizados pelo cliente para garantir que o sistema atende aos requisitos definidos.
Para padronizar o uso de testes manuais foram decididos os seguintes critérios:

## Definição do padrão de testes

### Processo de testes

- Teste funcional: É essencial que a equipe verifique se o produto está operando de acordo com os requisitos estabelecidos e os critérios de aceitação correspondentes.
- Teste de usabilidade: O cliente deve ser capaz de compreender e utilizar o produto conforme acordado com a equipe, seguindo também os requisitos, histórias de usuário e seus respectivos critérios de aceitação.

### Níveis de teste

- Teste unitário: É necessário implementar as funções e classes mais importantes, levando em consideração apenas os critérios de aceitação. A prioridade é o backend, mas também serão realizados alguns testes de frontend. A equipe utilizará a biblioteca de testes Jest.
- Teste de integração: Será testada a interação entre os componentes, ou seja, é necessário verificar se o frontend está chamando corretamente as funções do backend. Será considerada a história de usuário como um todo.
- Teste de sistema: Será realizado um exame abrangente do sistema do ponto de vista técnico, verificando todas as funcionalidades definidas nas histórias de usuário e atendendo a todos os critérios de aceitação, além dos requisitos não funcionais. A ferramenta principal para testar a integração será o Postman.
- Teste de aceitação: O cliente deve experimentar o software e validar o produto como um todo, com base em sua experiência e nas expectativas e acordos estabelecidos com a equipe.

### Técnicas de teste

- Teste de caixa branca: É necessário testar as funcionalidades levando em consideração a estrutura do código, verificando se estão sendo seguidos os padrões de codificação definidos pela equipe e se o resultado esperado não foi obtido através do teste de caixa preta.
Teste de caixa preta: Deve-se verificar se as entradas e saídas correspondem ao esperado, sem considerar o código em si. Essa técnica pode economizar tempo, pois não é necessário conhecer a implementação detalhada do código. Caso essa técnica não seja suficiente, será utilizado o teste de caixa branca.
- Teste manual: Cada desenvolvedor deve testar manualmente o código em sua própria máquina, e o usuário deve testar o produto quando este for entregue.
- Teste automático: A cada integração, a ação do GitHub será acionada para executar os testes do backend e do frontend, verificando se não há falhas nos testes unitários em nenhuma parte do projeto como um todo.

### Padrão dos testes manuais

O teste manual deve testar cenários para provar que as regras de negócio estão sendo respeitados. Para isso, deve-se seguir os seguintes passos:

1. Definir o cenário de teste
2. Escolher os dados de entrada
3. Escolher os dados de saída
4. Executar o teste
5. Aferir o resultado

O teste manual deve ser realizado por um membro da equipe que não seja o desenvolvedor da história de usuário. O desenvolvedor da história de usuário deve acompanhar o teste e realizar as correções necessárias.
O teste manual deve ser realizado em todos os cenários de teste definidos para a história de usuário. Caso algum cenário de teste não seja aprovado, a história de usuário deve ser rejeitada e o desenvolvedor deve realizar as correções necessárias.

### Testes Unitários e de Integração automatizados

Para realização dos testes funcionais, tanto de integração como os manuais utilizaremos a biblioteca Jest.

## Estratégia de testes para o MVP1

| Tipo  | Nível | Técnica | Objetivo | Perspectiva | Escopo |
| ----- | ----- | ------- | -------- | ----------- | ------ |
| Funcional | Unidade | Teste unitário automatizado | Garantir qualidade interna | Técnica  | US01, US04, US09, US13, US16 |
| Funcional | Integração | Teste de integração automatizado | Garantir qualidade interna | Técnica  | US01, US04, US09, US12, US13 |
| Segurança | Sistema | Teste de integração automatizado | Garantir qualidade externa | Negócio | US04 |
| Usabilidade | Aceitação | Teste caixa preta manual | Garantir qualidade externa | Negócio | Todos |

## Estratégia de testes para o MVP2

| Tipo  | Nível | Técnica | Objetivo | Perspectiva | Escopo |
| ----- | ----- | ------- | -------- | ----------- | ------ |
| Funcional | Unidade | Teste unitário automatizado | Garantir qualidade interna | Técnica  | US10, US08 |
| Funcional | Integração | Teste de integração automatizado | Garantir qualidade interna | Técnica  | US10, US08, US05 |
| Usabilidade | Aceitação | Teste caixa preta manual | Garantir qualidade externa | Negócio | Todos |

## Análise de cobertura de testes

### Testes de segurança

| US  |  Requisito Funcional | Critérios | Resultado | Observações |
| ---- | ------ | ----- | ----------- | -------------- |
| US04 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário  |  A permissão do acesso é feita através de:  <ul><li>Usuário ou e-mail</li><li>Senha cadastrada</li></ul> | ✅ | Nenhuma |

### Testes funcionais

| US  |  Requisito Funcional | Critérios | Resultado | Observações |
| ---- | ------ | ----- | ----------- | -------------- |
| US01 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção. | Os dados coletados devem ser: <ul><li>Capacidade de produção de soja e/ou milho em sacas</li><li>Total de hectares plantados para cada grão</li><li>Umidade média de cada grão na colheita</li><li>Área de terreno disponível para a estrutura de armazenagem</li><li>Data de criação orçamento</li><li>Endereço da propriedade</li> <li>Nome da propriedade</li> </li></li></ul> <li>O usuário tem a capacidade de revisar e editar as informações do formulário antes de finalizar o envio</li>     |  ✅ |  Nenhuma. |
| US04 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário  |  A permissão do acesso é feita através de:  <ul><li>Usuário ou e-mail</li><li>Senha cadastrada</li></ul> | ✅ | Nenhuma |
| US09 | Como operador, desejo armazenar os dados do cliente para decisões internas. |  Os dados do cliente são <ul><li>CPF/CNPJ</li><li>Telefone</li><li>E-mail</li><li>Propriedades que possui, podendo ser possível criar uma propriedade nova, sendo necessário preencher apenas o nome e endereço da propriedade</li></ul> |  ✅ | Nenhuma. |
| US12 |  Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa   |  <ul><li>É apresentado um painel que mostre todos os usuários cadastrados</li><li>Deve ser possível criar, editar e desabilitar usuários</li><li>Deve ser possível filtrar os usuários por:</li><ul><li>Nome</li><li>CPF</li><li>E-mail</li><li>Telefone</li></ul></ul> |  ✅ | Nenhuma. |
| US13 |  Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema  |  <ul><li>O operador tem os dados: <ul><li>Usuário</li> <li>Nome</li> <li>CPF</li><li>E-mail</li> <li>Telefone</li></ul> </li><li>O e-mail deve ser validado</li></ul> |  ✅ | Nenhuma. |

### Testes unitários

| US  |  Requisito Funcional | Critérios | Resultado | Observações |
| ---- | ------ | ----- | ----------- | -------------- |
| US01 | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção. | Os dados coletados devem ser: <ul><li>Capacidade de produção de soja e/ou milho em sacas</li><li>Total de hectares plantados para cada grão</li><li>Umidade média de cada grão na colheita</li><li>Área de terreno disponível para a estrutura de armazenagem</li><li>Data de criação orçamento</li><li>Endereço da propriedade</li> <li>Nome da propriedade</li> </li></li></ul> <li>O usuário tem a capacidade de revisar e editar as informações do formulário antes de finalizar o envio</li>     |  ✅ |  Nenhuma. |
| US04 | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário  |  A permissão do acesso é feita através de:  <ul><li>Usuário ou e-mail</li><li>Senha cadastrada</li></ul> | ✅ | Nenhuma |
| US05 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está e acompanhar a evolução do processo | As possíveis etapas são: <ul><li>Feedback do cliente</li><li>Contratação</li><li>Execução da obra</li><li>Concluído</li></ul>  | ✅ | Nenhuma. |
| US08 |  Como operador, desejo criar e editar um pedido para acompanhar as etapas em que está: feedback,  contratação ou execução  | Os dados do pedido são:  <ul><li>Tipo de serviço</li><li>Cliente</li></ul> Para a etapa de feedback os dados são: <ul><li>Preço</li><li>Avaliação do vendendor</li></ul> Para a etapa de contratação os dados são: <ul><li>Preço do serviço</li><li>Orçamento detalhado em formato pdf</li></ul> Para a etapa de execucão os dados são <ul><li>Status de conclusão</li><li>Contrato de venda em formato pdf</li></ul> |  ⏳ | Débito |
| US09 | Como operador, desejo armazenar os dados do cliente para decisões internas. |  Os dados do cliente são <ul><li>CPF/CNPJ</li><li>Telefone</li><li>E-mail</li><li>Propriedades que possui, podendo ser possível criar uma propriedade nova, sendo necessário preencher apenas o nome e endereço da propriedade</li></ul> |  ✅ | Nenhuma. |
| US13 |  Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema  |  <ul><li>O operador tem os dados: <ul><li>Usuário</li> <li>Nome</li> <li>CPF</li><li>E-mail</li> <li>Telefone</li></ul> </li><li>O e-mail deve ser validado</li></ul> |  ✅ | Nenhuma. |
| US16 | Como operador, desejo remover pedidos que não estão mais em andamento para manter o controle dos processos. |  <ul><li>Ao excluir o pedido todos os dados relacionados como documentos e feedbacks devem ser excluídos, exceto pelo orçamento, que deve ser preservado</li></ul> |  🚧 | Em progresso. |

### Testes de usabilidade

| US  |  Descrição | Critérios | Resultado | Observações |
| ---- | ------ | ----- | ----------- | -------------- |
| US04  | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário                               | A permissão do acesso é feita através de:  <ul><li>Usuário ou e-mail</li><li>Senha cadastrada</li></ul> | resultado | obs |
| US05 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está e acompanhar a evolução do processo                                         | As possíveis etapas são: <ul><li>Feedback do cliente</li><li>Contratação</li><li>Execução da obra</li><li>Concluído</li></ul> | resultado | obs |
| US08 | Como operador, desejo criar e editar um pedido para acompanhar as etapas em que está: feedback,  contratação ou execução | Os dados do pedido são:  <ul><li>Tipo de serviço</li><li>Cliente</li></ul> Para a etapa de feedback os dados são: <ul><li>Preço</li><li>Avaliação do vendendor</li></ul> Para a etapa de contratação os dados são: <ul><li>Preço do serviço</li><li>Orçamento detalhado em formato pdf</li></ul> Para a etapa de execucão os dados são <ul><li>Status de conclusão</li><li>Contrato de venda em formato pdf</li></ul> | resultado | obs |
| US12 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa                            | <ul><li>É apresentado um painel que mostre todos os usuários cadastrados</li><li>Deve ser possível criar, editar e desabilitar usuários</li><li>Deve ser possível filtrar os usuários por:</li><ul><li>Nome</li><li>CPF</li><li>E-mail</li><li>Telefone</li></ul></ul> | resultado | obs |
| US13 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema                             | <ul><li>O operador tem os dados: <ul><li>Usuário</li> <li>Nome</li> <li>CPF</li><li>E-mail</li> <li>Telefone</li></ul> </li><li>O e-mail deve ser validado</li></ul> | resultado | obs |
| US16 | Como operador, desejo remover pedidos que não estão mais em andamento para manter o controle dos processos.                                                                | <ul><li>Ao excluir o pedido todos os dados relacionados como documentos e feedbacks devem ser excluídos, exceto pelo orçamento, que deve ser preservado</li></ul>  | resultado | obs |
| US11 | Como operador, desejo realizar buscas de pedidos para facilitar a localização de pedidos específicos.                                                                     | Os pedidos podem ser filtrados por: <ul><li>Identificador do cliente;</li><li>Etapa em curso;</li><li>Data de criação;</li></ul> | resultado | obs |
| US01   | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção.                                                                                                                     | Os dados coletados devem ser: <ul><li>Capacidade de produção de soja e/ou milho em sacas</li><li>Total de hectares plantados para cada grão</li><li>Umidade média de cada grão na colheita</li><li>Área de terreno disponível para a estrutura de armazenagem</li><li>Data de criação orçamento</li><li>Endereço da propriedade</li> <li>Nome da propriedade</li> </li></li></ul> <li>O usuário tem a capacidade de revisar e editar as informações do formulário antes de finalizar o envio</li>                                                                                                                                       | resultado | obs |
| US02 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado                                                                                           | <ul><li>Os dados apresentados são o preço de venda da saca de milho ou soja por mês, sendo possível alternar entre eles, durante os últimos 12 meses</li><li>A apresentação é feita em um gráfico de barras verticais</li><li>O sistema fornece legendas de identificação clara para facilitar a interpretação do gráfico, incluindo unidades de medida, datas e valores específicos</li><li>Os dados devem ser reais e atualizados, requisitados de uma fonte confiável e reconhecida</li></ul>                                                                                                                                       | resultado | obs |
| US03 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto | <ul><li>Os dados apresentados são o lucro extra em potencial por ano a partir da construção do armazém</li><li>A apresentação é feita em um gráfico de barras verticais</li><li>O lucro extra é calculado pela diferença entre o mês de maior valor de venda e o mês de colheita multiplicado pela capacidade de produção do cliente</li><li>O gráfico é cumulativo e tem uma tendência linear, considerando o lucro extra pelos dados dos últimos 12 meses</li><li>O gráfico apresenta dados para uma quantidade de anos suficiente para que o valor de lucro supere o valor do orçamento, respeitando um máximo de 10 anos</li></ul> | resultado | obs |
| US07 | Como operador, desejo visualizar um indicador que mostre o lucro extra em potencial de saca por ano, para mostrar o benefício da armazenagem                                 | <ul><li>O indicador deve mostrar a diferença de valor entre os meses de colheita e os meses destacados no gráfico da US05</li><li>O indicador tem uma etiqueta indicando 'Lucro extra em potencial [saca / ano]</li><li>O indicador deve ser um valor com até 2 casas decimais</li></ul>                                                                                                                                                                                                                                                                                                                                               | resultado | obs |
| US09  | Como operador, desejo armazenar os dados do cliente para decisões internas.                                                                                                                                                                | Os dados do cliente são <ul><li>CPF/CNPJ</li><li>Telefone</li><li>E-mail</li><li>Propriedades que possui, podendo ser possível criar uma propriedade nova, sendo necessário preencher apenas o nome e endereço da propriedade</li></ul> | resultado | obs |
| US10 | Como operador, desejo poder salvar o orçamento para futuras operações                                                                 | <ul><li>O orçamento pode ser salvo no perfil do cliente</li><li>Deve ser possível filtrar os orçamentos por: Preço; Data de criação do orçamento; Cliente; Capacidade de armazenagem do silo e do secador.</li></ul> | resultado | obs |

## Exemplos de testes

#### Testes funcionais unitários

Um exemplo prático é o teste abaixo, que verifica se o validador de CNPJ está funcionando corretamente. O teste foi realizado utilizando a biblioteca Jest.

[Código do projeto](https://github.com/mdsreq-fga-unb/2023.1-Armazenai/blob/main/armazenai-front_end/__tests__/cliente/index.test.tsx)

```javascript
describe("Teste do validador de CNPJ ", () => {
  it("deveria retornar true quando cnpj for válido", () => {
    const cnpj = "46039536000111";
    expect(validarCNPJ(cnpj)).toBe(true);
  });
});
```

#### Testes funcionais de integração

Um exemplo prático é o teste abaixo, que verifica se o cliente está sendo validado ao tentar salvar um novo cliente na API do Supabase (Back-end utilizado). O teste foi realizado utilizando a biblioteca Jest e a ferramenta Insomnia.

[Código do projeto](https://github.com/mdsreq-fga-unb/2023.1-Armazenai/blob/main/armazenai-front_end/__tests__/cliente/index.test.tsx)

```javascript
it("deveria retornar um erro ao enviar cliente com informações pendentes para o supabase", async () => {
    try {
      await axios.post<ApiErro>(
        "rest/v1/cliente",
        {},
        {
          headers: {
            Prefer: "return=representation",
          },
        }
      );
    } catch (e) {
      const erro = e as AxiosError<ApiErro>;
      expect(erro.response?.data.code).toBe("23502");
      idToDelete = undefined;
    }
  });

```

#### Testes de segurança

Um exemplo prático é o teste abaixo, que verifica se o Supabase está retornando um erro ao tentar logar com credenciais incorretas. O teste foi realizado utilizando a biblioteca Jest para automatizar o processo

[Código do projeto](https://github.com/mdsreq-fga-unb/2023.1-Armazenai/blob/main/armazenai-front_end/__tests__/login/index.test.tsx)

```javascript
it("deveria retornar um erro ao logar com credenciais incorretas", async () => {
    try {
      await axios.post<AuthResponse>(
        "https://lyniiwdvsfpsbexrkons.supabase.co/auth/v1/token?grant_type=password",
        {
          email: "invalid-email@example.com",
          password: "invalid-password",
        },
        {
          headers: {
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmlpd2R2c2Zwc2JleHJrb25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjU3ODEsImV4cCI6MjAwMDYwMTc4MX0.YYdZlKJKT4Njbfg0k-a7YEg890f7ulZpCNqndDDf9Uk",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      const axiosError = error as AxiosError<AuthResponse>;

      // Verifica se o erro da API está correto
      expect(axiosError.response?.status).toBe(400);
      expect(axiosError.response?.data.error).toBe("invalid_grant");
    }
  });
```

## Histórico de revisões

| Data       | Versão | Descrição                                         | Autor                                                    |
| ---------- | ------ | ------------------------------------------------- | -------------------------------------------------------- |
| 26/06/2023 | 0.1    | Criação do documento                              | Kaio Melo |
| 11/07/2023 | 0.2    | Adiciona estratégia de testes                              | Kaio Melo |
| 12/07/2023 | 0.3    | Atualização da estratégia de testes                              | Kaio Melo|
| 13/07/2023 | 0.4    | Atualização da tabela de estratégia de testes     | Lucas Meireles |
| 20/07/2023 | 0.5    | Criação da cobertura de testes     | Kaio Melo |
