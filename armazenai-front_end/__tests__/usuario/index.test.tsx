import { render, screen, waitFor } from "@testing-library/react";
import UsuarioFormAtualizacao, {
  Usuario,
} from "../../src/app/components/formulario/usuarioFormAtualizacao";
import { SetStateAction } from "react";
import UsuarioForm, {
  errorsFormularioCadastro,
} from "../../src/app/components/formulario/usuarioFormCadastro";
import userEvent from "@testing-library/user-event";
import { errosFormularioMensagem } from "../../src/app/helpers/validator/mensagensDeErro";
import axios, { AxiosError } from "axios";
import { ApiErro } from "../cliente/index.test";

describe("Teste do formulário de criação de usuário", () => {
  it("deveria mostrar os erros do formulário de criação de usuário", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(
      <UsuarioForm
        onSubmit={mockOnSubmit}
        loading={false}
        formularioInterno={true}
      />
    );

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);

    const submit = screen.getByRole("button", { name: /cadastrar/i });
    user.click(submit);

    await waitFor(() => {
      expect(
        screen.queryByText(
          new RegExp(errorsFormularioCadastro.nomeObrigatorio, "i")
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          new RegExp(errorsFormularioCadastro.cpfObrigatorio, "i")
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          new RegExp(errorsFormularioCadastro.telefoneObrigatorio, "i")
        )
      ).toBeInTheDocument();
    });
  });

  it("deveria mostrar o erro de email e telefone inválido", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(
      <UsuarioForm
        onSubmit={mockOnSubmit}
        loading={false}
        formularioInterno={true}
      />
    );

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);

    const nome = screen.getByLabelText(/nome/i);
    const cpf = screen.getByLabelText(/cpf/i);
    const email = screen.getByLabelText(/email/i);
    const telefone = screen.getByLabelText(/telefone/i);
    const senha = screen.getByLabelText(/senha/i);

    user.type(nome, "nome");
    user.type(cpf, "cpf");
    user.type(email, "email");
    user.type(telefone, "telefone");
    user.type(senha, "senha");

    const submit = screen.getByRole("button", { name: /cadastrar/i });
    user.click(submit);

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(
        screen.queryByText(/O telefone informado é inválido!/i)
      ).toBeInTheDocument();
    });
    // expect(
    //   screen.queryByText(
    //     new RegExp(errosFormularioMensagem.telefoneInvalido, "i")
    //   )
    // ).toBeInTheDocument();
  });

  describe("Teste de integração com a API de Cliente no supabase", () => {
    let token: string | undefined;
    let idToDelete: number | undefined;
    let idUsuario: string | undefined;
    const mockedUser = {
      nome: "Kaio Enzo",
      cpf: "12345678910",
      telefone: "12345678910",
      email: "kaioenzobr@gmail.com",
    };

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
        .then((d) => {
          token = d.data.access_token;
          idUsuario = d.data.user.id;
        });
      axios.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    });

    afterEach(async () => {
      if (idToDelete) {
        const retorno = await axios.delete(
          `rest/v1/profiles?id=eq.${idToDelete}`
        );
        expect(retorno.status).toBe(204);
        idToDelete = undefined;
      }
      setTimeout(() => {}, 1000);
    });

    it("deveria retornar um usuário existente", async () => {
      const data = await axios.get<Usuario[]>(
        `rest/v1/profiles?select=*&id=eq.${idUsuario}`
      );
      expect(data.status).toBe(200);
      expect(data.data.length).toBe(1);
      expect(data.data[0].id).toBe(idUsuario);
    });

    it("deveria criar e retornar um usuário", async () => {
      const data = await axios.post<UsuarioSignUp>(
        "auth/v1/signup",
        {
          email: "teste@teste.teste",
          password: "123321",
        },
        {
          headers: {
            Prefer: "return=representation",
          },
        }
      );

      expect(data.status).toBe(200);
      expect(data.data.id).toBeDefined();
      idToDelete = parseInt(data?.data.id);
    });

    it("deveria atualizar um cliente existente", async () => {
      const data = await axios.patch<Usuario[]>(
        `rest/v1/profiles?id=eq.${idUsuario}`,
        mockedUser,
        {
          headers: {
            Prefer: "return=representation",
          },
        }
      );

      expect(data.status).toBe(200);
      expect(data.data[0].nome).toBe(mockedUser.nome);
      expect(data.data[0].cpf).toBe(mockedUser.cpf);
      expect(data.data[0].telefone).toBe(mockedUser.telefone);
    });

    it("deveria retornar uma lista de clientes existentes", async () => {
      const data = await axios.get<Usuario[]>("rest/v1/profiles?select=*");
      expect(data.data).toBeDefined();
      expect(data.data).not.toBeNull();
      expect(data.data.length).toBeGreaterThan(0);
    });

    it("deveria filtrar os clientes pelo nome", async () => {
      const data = await axios.get<Usuario[]>(
        `rest/v1/profiles?select=*&nome=ilike.${mockedUser.nome}`
      );

      expect(data.data).toBeDefined();
      expect(data.data).not.toBeNull();
      expect(data.data.length).toBeGreaterThan(0);
      expect(data.data[0].nome).toBe(mockedUser.nome);
    });

    it("deveria filtrar pelo telefone", async () => {
      const data = await axios.get<Usuario[]>(
        `rest/v1/profiles?select=*&email=ilike.${mockedUser.email}`
      );

      expect(data.data).toBeDefined();
      expect(data.data).not.toBeNull();
      expect(data.data.length).toBeGreaterThan(0);
      expect(data.data[0].telefone).toBe(mockedUser.telefone);
    });
  });
});

type UsuarioSignUp = {
  id: string;
  email: string;
};
