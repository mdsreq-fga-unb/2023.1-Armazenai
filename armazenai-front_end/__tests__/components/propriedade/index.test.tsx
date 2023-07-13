import userEvent from "@testing-library/user-event";
import PropriedadeForm from "../../../src/app/components/formulario/propriedadeForm";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

describe("Teste do componente de formulário de Propriedade", () => {
  it("deveria mostrar os erros do formulário de criação de propriedade", async () => {
    const user = userEvent.setup();

    const mockedOnSubmit = jest.fn();
    render(
      <PropriedadeForm
        enviaDadosFormulario={mockedOnSubmit}
        carregando={false}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /Salvar/i });
    user.click(submitBtn);

    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalledTimes(0);
      expect(
        screen.queryByText(
          new RegExp("O nome da propriedade é obrigatório!", "i")
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/O endereço é obrigatório!/i)
      ).toBeInTheDocument();
    });
  });

  it("deveria chamar a função de submit ao clicar no botão de submit", async () => {
    const user = userEvent.setup();
    const mockedOnSubmit = jest.fn();
    render(
      <PropriedadeForm
        enviaDadosFormulario={mockedOnSubmit}
        carregando={false}
      />
    );

    const nomeInput = screen.getByLabelText(/nome/i);
    const enderecoInput = screen.getByLabelText(/endereco/i);
    const areaDisponivel = screen.getByLabelText(/area/i);
    const producaoSoja = screen.getByLabelText(/producaoSoja/i);
    const hectaresSoja = screen.getByLabelText(/hectaresSoja/i);
    const producaoMilho = screen.getByLabelText(/producaoMilho/i);
    const hectaresMilho = screen.getByLabelText(/hectaresMilho/i);
    const umidadeMediaMilho = screen.getByLabelText(/umidadeMediaMilho/i);
    const umidadeMediaSoja = screen.getByLabelText(/umidadeMediaSoja/i);
    const submitBtn = screen.getByRole("button", { name: /Salvar/i });

    await user.type(enderecoInput, "Rua 1");
    await user.type(nomeInput, "Propriedade 1");
    await user.type(areaDisponivel, "1000");
    await user.type(producaoSoja, "1000");
    await user.type(hectaresSoja, "1000");
    await user.type(producaoMilho, "1000");
    await user.type(hectaresMilho, "1000");
    await user.type(umidadeMediaMilho, "1000");
    await user.type(umidadeMediaSoja, "1000");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Teste da API de propriedade no supabase", () => {
  let token: string | undefined;
  let idToDelete: number | undefined;
  const mockedPropriedade = {
    producao_milho: 1000,
    producao_soja: 1000,
    hectares_milho: 1000,
    hectares_soja: 1000,
    umidade_media_milho: 14,
    umidade_media_soja: 14,
    area_disponivel: 1000,
    endereco: "Rua 1",
    nome: "Propriedade 1",
  };

  beforeAll(() => {
    axios.interceptors.request.use((config) => {
      config.headers["apikey"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmlpd2R2c2Zwc2JleHJrb25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjU3ODEsImV4cCI6MjAwMDYwMTc4MX0.YYdZlKJKT4Njbfg0k-a7YEg890f7ulZpCNqndDDf9Uk";
      config.headers["Prefer"] = "return=representation";
      config.headers["Content-Type"] = "application/json";
      config.baseURL = "https://lyniiwdvsfpsbexrkons.supabase.co/";
      return config;
    });
  });

  beforeEach(async () => {
    await axios
      .post("auth/v1/token?grant_type=password", {
        email: "kaioenzobr@gmail.com",
        password: "123321",
      })
      .then((d) => {
        token = d.data.access_token;
      });
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });

  afterEach(async () => {
    if (idToDelete) {
      const retorno = await axios.delete(
        `rest/v1/propriedade?id=eq.${idToDelete}`
      );
      expect(retorno.status).toBe(200);
      idToDelete = undefined;
    }
    setTimeout(() => {}, 1000);
  });

  it("deveria criar uma propriedade", async () => {
    const retorno = await axios.post("rest/v1/propriedade", mockedPropriedade);
    expect(retorno.status).toBe(201);
    idToDelete = retorno.data[0].id;
  });

  it("deveria retornar uma propriedade", async () => {
    const retorno = await axios.post("rest/v1/propriedade", mockedPropriedade);
    expect(retorno.status).toBe(201);
    idToDelete = retorno.data[0].id;

    const retornoGet = await axios.get(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoGet.status).toBe(200);
    expect(retornoGet.data[0].nome).toBe(mockedPropriedade.nome);
  });

  it("deveria atualizar uma propriedade", async () => {
    const retorno = await axios.post("rest/v1/propriedade", mockedPropriedade);
    expect(retorno.status).toBe(201);
    idToDelete = retorno.data[0].id;

    const retornoGet = await axios.get(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoGet.status).toBe(200);
    expect(retornoGet.data[0].nome).toBe(mockedPropriedade.nome);

    const retornoUpdate = await axios.patch(
      `rest/v1/propriedade?id=eq.${idToDelete}`,
      { nome: "Propriedade 2" }
    );
    expect(retornoUpdate.status).toBe(200);

    const retornoGet2 = await axios.get(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoGet2.status).toBe(200);
    expect(retornoGet2.data[0].nome).toBe("Propriedade 2");
  });

  it("deveria deletar uma propriedade", async () => {
    const retorno = await axios.post("rest/v1/propriedade", mockedPropriedade);
    expect(retorno.status).toBe(201);
    idToDelete = retorno.data[0].id;

    const retornoGet = await axios.get(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoGet.status).toBe(200);
    expect(retornoGet.data[0].nome).toBe(mockedPropriedade.nome);

    const retornoDelete = await axios.delete(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoDelete.status).toBe(200);

    const retornoGet2 = await axios.get(
      `rest/v1/propriedade?id=eq.${idToDelete}`
    );
    expect(retornoGet2.status).toBe(200);
    expect(retornoGet2.data.length).toBe(0);
  });
});
