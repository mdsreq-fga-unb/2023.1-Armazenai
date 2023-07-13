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
| Funcional | Unidade | Teste unitário automatizado | Garantir qualidade interna | Técnica  | USXX |
| Funcional | Integração | Teste de integração automatizado | Garantir qualidade interna | Técnica  | USXX |
| Segurança | Sistema | Teste de integração automatizado | Garantir qualidade externa | Negócio | USXX |
| Usabilidade | Sistema | Teste caixa preta /  manual | Garantir qualidade externa | Negócio | USXX |

## Estratégia de testes para o MVP2

| Tipo  | Nível | Técnica | Objetivo | Perspectiva | Escopo |
| ----- | ----- | ------- | -------- | ----------- | ------ |
| Funcional | Unidade | Teste unitário automatizado | Garantir qualidade interna | Técnica  | USXX |
| Funcional | Integração | Teste de integração automatizado | Garantir qualidade interna | Técnica  | USXX |
| Segurança | Sistema | Teste de caixa preta | Garantir qualidade externa | Negócio | USXX |
| Usabilidade | Aceitação | Teste caixa preta /  manual | Garantir qualidade externa | Negócio | USXX |

### Exemplos de testes

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

# Estratégia de testes com objetivo

| MVP | Tipo | Nível | Técnica | Objetivo/ Perspectiva | Escopo |
| --- | ---- |---|----|---|
1 | Funcional | Unitário | Automatizado | Qualidade interna / Equipe | US01, US04, US09, US13, US16 | 
1 | Funcional | Integração | Automatizado | Qualidade interna / Equipe | US01, US04, US09, US12, US13 |
1 | Segurança | Integração | Automatizado | Qualidade externa / Cliente | US04, |
1 | Funcional | Caixa Preta | Manual |Qualidade externa / Negócio | Todos |
2 | Funcional | Unitário | Automatizado | Qualidade/Equipe | US10, US08 |
2 | Usabilidade | Aceitação | Manual | Qualidade externa / Negócio | Todos |
2 | Sistema | Caixa Preta | Manual | Qualidade interna/ Equipe | Todos |
2 | Funcional | Integração | Automatizado | Qualidade interna/ Equipe | US10, US08, US05 | 

## Histórico de revisões

| Data       | Versão | Descrição                                         | Autor                                                    |
| ---------- | ------ | ------------------------------------------------- | -------------------------------------------------------- |
| 26/06/2023 | 0.1    | Criação do documento                              | Kaio Melo |
| 11/07/2023 | 0.2    | Adiciona estratégia de testes                              | Kaio Melo |
| 12/07/2023 | 0.3    | Atualização da estratégia de testes                              | Kaio Melo|
