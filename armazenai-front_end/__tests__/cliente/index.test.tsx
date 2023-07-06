import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios, { AxiosError } from "axios";
import { Cliente } from "../../public/types/main-types";
import ClienteForm from "../../src/app/components/formulario/clienteFormCadastro";
import validarCNPJ from "../../src/app/helpers/validator/validarCNPJ";

type ApiErro = {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
};

describe("Teste do validador de CNPJ ", () => {
  it("deveria retornar true quando cnpj for válido", () => {
    const cnpj = "46039536000111";
    expect(validarCNPJ(cnpj)).toBe(true);
  });

  it("deveria retornar true quando cnpj for válido com caracteres não numéricos", () => {
    const cnpj = "92.933.911/0001-90";
    expect(validarCNPJ(cnpj)).toBe(true);
  });

  it("deveria retornar true quando cnpj for inválido", () => {
    const cnpj = "46039536000118";
    expect(validarCNPJ(cnpj)).toBe(false);
  });

  it("deveria retornar falso quando cnpj for menor que 14", () => {
    const cnpj = "123456789";
    expect(validarCNPJ(cnpj)).toBe(false);
  });

  it("deveria retornar falso quando cnpj for inválido", () => {
    const cnpj = "00000000000000";
    expect(validarCNPJ(cnpj)).toBe(false);
  });

  it("deveria retornar falso quando string do cnpj for vazia", () => {
    const cnpj = "";
    expect(validarCNPJ(cnpj)).toBe(false);
  });
});

describe("Teste do formulário de cliente", () => {
  it("deveria renderizar o formulário de cliente com botão com label 'Salvar'", () => {
    // Renderizar o componente
    render(<ClienteForm onSubmit={jest.fn()} loading={false} />);

    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it("deveria renderizar o formulário de cliente com botão com label 'Atualizar'", () => {
    const clienteMock: Cliente = {
      cnpj: "",
      email: "",
      id: 2,
      nome: "",
      telefone: "",
    };
    // Renderizar o componente
    render(
      <ClienteForm onSubmit={jest.fn()} loading={false} cliente={clienteMock} />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Atualizar");
    expect(screen.queryByText("Atualizar cliente")).toBeInTheDocument();
    expect(screen.queryByText(/salvar/i)).toBeNull();
  });

  it("Deveria mostrar os erros de formulário quando o formulário for vazio", async () => {
    const user = userEvent.setup();

    render(
      <ClienteForm
        loading={false}
        onSubmit={function (data: Cliente) {
          return;
        }}
      />
    );

    // Clicar no botão de submit
    const submitButton = screen.getByRole("button", { name: /salvar/i });
    user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("O nome do cliente é obrigatório!")
      ).toBeInTheDocument();
      expect(screen.queryByText("O email é obrigatório")).toBeInTheDocument();
      expect(screen.queryByText("O CNPJ é obrigatório!")).toBeInTheDocument();
      expect(
        screen.queryByText("O telefone do cliente é obrigatório!")
      ).toBeInTheDocument();
    });
  });

  it("Deveria mostrar os erros de CNPJ no formulário quando o CNPJ for inválido", async () => {
    const user = userEvent.setup();

    render(
      <ClienteForm
        loading={false}
        onSubmit={function (data: Cliente) {
          return;
        }}
      />
    );

    const cnpjInput = screen.getByLabelText("CNPJ");
    user.type(cnpjInput, "12312312");

    // Clicar no botão de submit
    const submitButton = screen.getByRole("button", { name: /salvar/i });
    user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("CNPJ inválido!")).toBeInTheDocument();
    });
  });

  it("should call onSubmit when the form is submitted", async () => {
    const user = userEvent.setup();

    // Create a mock function for onSubmit
    const onSubmitMock = jest.fn<any, any, Cliente>();

    render(<ClienteForm onSubmit={onSubmitMock} loading={false} />);

    // Fill in the form inputs
    const nomeInput = screen.getByLabelText("Nome");
    const cnpjInput = screen.getByLabelText("CNPJ");
    const telefoneInput = screen.getByLabelText("Telefone");
    const emailInput = screen.getByLabelText("Email");

    await user.type(nomeInput, "cliente");
    await user.type(cnpjInput, "03556054000126");
    await user.type(telefoneInput, "6199909999");
    await user.type(emailInput, "email@example.com");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /salvar/i });
    await user.click(submitButton);

    // Verify that onSubmit has been called with the expected data
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Teste da API de Cliente", () => {
  let token: string | undefined;
  let idToDelete: number | undefined;

  beforeAll(() => {
    axios.interceptors.request.use((config) => {
      config.headers["apikey"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmlpd2R2c2Zwc2JleHJrb25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjU3ODEsImV4cCI6MjAwMDYwMTc4MX0.YYdZlKJKT4Njbfg0k-a7YEg890f7ulZpCNqndDDf9Uk";
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
      .then((d) => (token = d.data.access_token));
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });

  afterEach(async () => {
    if (idToDelete) {
      const retorno = await axios.delete(`rest/v1/cliente?id=eq.${idToDelete}`);
      expect(retorno.status).toBe(204);
      idToDelete = undefined;
    }
  });

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

  it("deveria cadastrar um cliente e retornar do supabase", async () => {
    const mockedCliente = {
      telefone: "61999999999",
      nome: "CLIENTE DE TESTE DEVE SER EXCLUIDO",
      email: "EMAIL@TESTE.COM",
      cnpj: "67168350000132",
    };
    const retorno = await axios.post<Cliente[]>(
      "rest/v1/cliente",
      mockedCliente,
      {
        headers: {
          Prefer: "return=representation",
        },
      }
    );
    expect(retorno.data).toHaveLength(1);
    expect(retorno.data[0].telefone).toBe(mockedCliente.telefone);
    expect(retorno.data[0].cnpj).toBe(mockedCliente.cnpj);
    expect(retorno.data[0].nome).toBe(mockedCliente.nome);
    expect(retorno.data[0].email).toBe(mockedCliente.email);
    expect(retorno.data[0].id).toBeDefined();

    idToDelete = retorno.data[0].id;
  });
});
