import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  AuthResponse,
  SignInWithPasswordCredentials,
} from "@supabase/gotrue-js/dist/module/lib/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Database } from "../../public/types/database";
import { errosFormularioMensagem } from "../../src/app/helpers/validator/mensagensDeErro";
import Home from "../../src/app/login/page";

const supabase = createClientComponentClient<Database>();
let signInWithPasswordMock: jest.SpyInstance<
  Promise<AuthResponse>,
  [credentials: SignInWithPasswordCredentials],
  any
>;
const supabaseUrl = "https://lyniiwdvsfpsbexrkons.supabase.co/rest/v1/";
const clientApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmlpd2R2c2Zwc2JleHJrb25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjU3ODEsImV4cCI6MjAwMDYwMTc4MX0.YYdZlKJKT4Njbfg0k-a7YEg890f7ulZpCNqndDDf9Uk";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  // axios.interceptors.request.use((config) => {
  //   config.headers["apikey"] = clientApiKey;
  //   return config;
  // });
});

beforeEach(() => {
  signInWithPasswordMock = jest.spyOn(supabase.auth, "signInWithPassword");
});

afterEach(() => {
  signInWithPasswordMock.mockRestore();
});

describe("Teste da página inicial de Login", () => {
  it("deveria encontrar os erros exibidos quando os campos do formulário de login não são preenchidos", async () => {
    render(<Home />);

    // Verifica se os campos de erro estão ocultos inicialmente
    expect(
      screen.queryByText(errosFormularioMensagem.emailInvalido)
    ).toBeNull();
    expect(
      screen.queryByText(errosFormularioMensagem.emailObrigatorio)
    ).toBeNull();
    expect(
      screen.queryByText(errosFormularioMensagem.senhaObrigatoria)
    ).toBeNull();

    // Submete o formulário sem preencher os campos
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Verifica se os erros de validação são exibidos
    await waitFor(() => {
      expect(screen.queryByText(/O email é obrigatório/i)).toBeInTheDocument();
      expect(screen.queryByText(/A senha é obrigatória!/i)).toBeInTheDocument();
    });

    expect(useRouter).toBeCalledTimes(2);
  });

  it("deveria chamar a página de login quando o formulário é válido", async () => {
    render(<Home />);
    // Preencher os campos do formulário
    const emailInput = screen.getByLabelText("email");
    const senhaInput = screen.getByLabelText("senha");

    userEvent.type(emailInput, "email@teste.teste");
    userEvent.type(senhaInput, "123456");

    // Clicar no botão de submit
    const submitButton = screen.getByText("Login");
    fireEvent.click(submitButton);

    // Verifica se os campos de erro estão ocultos
    expect(
      screen.queryByText(errosFormularioMensagem.emailInvalido)
    ).toBeNull();
    expect(
      screen.queryByText(errosFormularioMensagem.emailObrigatorio)
    ).toBeNull();
    expect(
      screen.queryByText(errosFormularioMensagem.senhaObrigatoria)
    ).toBeNull();
    signInWithPasswordMock.mockResolvedValueOnce({
      data: {
        user: {
          app_metadata: {},
          aud: "",
          id: "",
          created_at: "",
          user_metadata: {},
        },
        session: {
          access_token: "",
          expires_in: 1000,
          refresh_token: "",
          token_type: "",
          user: {
            app_metadata: {},
            aud: "",
            id: "",
            created_at: "",
            user_metadata: {},
          },
        },
      },
      error: null,
    });

    // Verificar se router.push foi chamado corretamente
    expect(useRouter).toBeCalledTimes(3);
  });

  it("deveria retornar um erro ao logar com credenciais incorretas", async () => {
    try {
      await axios.post<AuthResponse>(
        "https://hflbuhswxxfxbsuuvzbv.supabase.co/auth/v1/token?grant_type=password",
        {
          email: "invalid-email@example.com",
          password: "invalid-password",
        },
        {
          headers: {
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbGJ1aHN3eHhmeGJzdXV2emJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2ODQ2OTAsImV4cCI6MTk5NzI2MDY5MH0.uLlyBbCh9JYU74ysIggXa_Kg2hmptUitzwS2O9ukuNc",
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
});
