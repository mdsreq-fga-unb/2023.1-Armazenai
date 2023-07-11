# Estratégia de testes

## Introdução

Como forma de garantir o funcionamento e qualidade do sistema produzido, adotaremos os testes unitários e de integração ao sistema, sendo esses automatizados.
Os Teste Unitários garantiram a funcionalidade de cada função do sistema, enquanto os Testes de Integração garantiram o funcionamento do sistema como um todo. Como parte do processo de desenvolvimento, também realizaremos testes manuais em **TODAS** as histórias de usuário desenvolvidas.
Além disso, testes de aceitação serão realizados pelo cliente para garantir que o sistema atende aos requisitos definidos.
Para padronizar o uso de testes manuais foram decididos os seguintes critérios:

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

Para realização dos testes unitários utilizaremos a biblioteca Jest. Onde faremos testes de caixa branca e caixa preta. Os testes de caixa branca serão realizados para garantir que as regras de negócio estão sendo respeitadas. Já os testes de caixa preta serão realizados para garantir que os dados estão sendo persistidos corretamente.

## Estratégia de testes para o MVP1

| US   | Descrição                                                                                                                             | Estratégia de teste |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| US04  | Como operador, desejo poder logar no aplicativo para relacionar as informações ao meu perfil de usuário                               | Teste de integração do tipo caixa preta <ul><li>O usuário só pode acessar as páginas da aplicação se estiver logado.</li></ul> |
| US05 | Como operador, desejo poder visualizar o status de um pedido para saber em que etapa ele está e acompanhar a evolução do processo                                         | Teste Unitário de caixa branca <ul><li>Teste de renderização do componente, mockando o retorno da API.</li></ul> |
| US08 | Como operador, desejo criar e editar um pedido para acompanhar as etapas em que está: orçamento, feedback, negociação, contratação ou execução | Teste de integração do tipo caixa preta <ul><li>Teste de chamada da API, para que seja testado a persistência e confiabilidade dos dados transmitidos e armazenados</li></ul>|
| US12 | Como administrador, desejo visualizar informações de todos os usuários para ter uma visão geral da empresa                            | Teste de integração do tipo caixa preta <ul><li>Teste do retorno da API com dados pré-persistidos, para garantir a confiabilidade da transmissão de dados</li></ul> Teste unitário <ul><li>Teste de renderização do componente, com dados mockados para simular o retorno da API. </li></ul>|
| US13 | Como administrador, desejo poder criar novos usuários para que novos operadores possam utilizar o sistema                             | Teste de integração do tipo caixa preta <ul><li>Teste de retorno do API, que deve criar um usuário.</li></ul>|
| US16 | Como operador, desejo remover pedidos que não estão mais em andamento para manter o controle dos processos.                                                                | Teste manual  |
| US11 | Como operador, desejo realizar buscas de pedidos para facilitar a localização de orçamentos específicos.                                                                     | Teste de integração do tipo caixa preta <ul><li>Teste de retorno da API, com dados pré-cadastrados.</li></ul> |

## Estratégia de testes para o MVP2

| US    | Descrição                                                                                                                                                                                                                                  | Critérios de aceitação                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| US01   | Como operador, desejo criar um formulário para coletar informações da propriedade para mensurar o tamanho da produção.                                                                                                                     | Teste unitário de tipo caixa branca <ul><li>Teste de validação do formulário, garantindo que as regras de negócio sejam atendidas e os erros todos informados ao usuário de acordo com os critérios de aceitação.</li></ul>                                                                                                                                      |
| US02 | Como operador, desejo visualizar um gráfico que mostre o preço histórico da saca atualizado para mostrar ao cliente o valor negociado no passado                                                                                           | Testes manuais |
| US03 | Como operador, desejo visualizar um gráfico que mostre uma projeção de lucro para a próxima colheita baseada em anos anteriores para mostrar o ganho na aquisição do produto | Teste unitário de tipo caixa preta <ul><li>Teste com dados mockados, que simule um gráfico assertivo, com as propriedades corretas</li></ul> |
| US06 | Como operador, desejo simular cenários de financiamento para mostrar ao cliente a viabilidade do produto                                                                     | Testes manuais |                                                                                                                                                                                                                                            |
| US07 | Como operador, desejo visualizar um indicador que mostre o lucro extra em potencial de saca por ano, para mostrar o benefício da armazenagem                                 | Testes unitários <ul><li>Teste de renderização do componente, com dados mockados, garantindo que as informações sejam renderizadas corretamente</li><li>Teste no cálculo do indicador, com dados de entrada e saída conhecidos.</li></ul>                                                                                                                                                                                                                                                                                                                                               |
| US09  | Como operador, desejo armazenar os dados do cliente para decisões internas.                                                                                                                                                                | Teste de integração do tipo caixa preta <ul><li>Teste de retorno da API, para garantir que as informações estão sendo persistidas corretamente.</li></ul>
| US10 | Como operador, desejo poder salvar o orçamento para futuras operações                                                                 | Teste de integração do tipo caixa preta <ul><li>Teste de retorno da API, para garantir que as informações estão sendo persistidas corretamente.</li></ul> |


# Estratégia de testes com objetivo

| MVP | Tipo | Nível | Técnica | Objetivo/ Perspectiva |
| --- | ---- |---|----|---|
1 | Funcional | Unitário | Automatizado | Qualidade interna / Equipe |
1 | Funcional | Integração | Automatizado | Qualidade interna / Equipe |
1 | Segurança | Integração | Automatizado | Qualidade externa / Cliente |
1 | Funcional | Caixa Preta | Manual |Qualidade externa / Negócio |
2 | Funcional | Unitário | Automatizado | Qualidade/Equipe |
2 | Usabilidade | Aceitação | Manual | Qualidade externa / Negócio |
2 | Sistema | Caixa Preta | Manual | Qualidade interna/ Equipe |



## Histórico de revisões

| Data       | Versão | Descrição                                         | Autor                                                    |
| ---------- | ------ | ------------------------------------------------- | -------------------------------------------------------- |
| 26/06/2023 | 0.1    | Criação do documento                              | Kaio Melo |
| 11/07/2023 | 0.2    | Adiciona estratégia de testes                              | Kaio Melo |
