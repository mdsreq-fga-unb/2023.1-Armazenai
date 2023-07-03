import validarCNPJ from "../../src/app/helpers/validator/validarCNPJ";
import ClienteForm from "../../src/app/components/formulario/clienteFormCadastro";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cliente } from "../../public/types/main-types";
import userEvent from "@testing-library/user-event";
import { errosFormularioMensagem } from "../../src/app/helpers/validator/mensagensDeErro";

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

  it("Deveria mostrar os erros de formulário quando o formulário for submetido e for inválido", async () => {
    const user = userEvent.setup();

    render(
      <ClienteForm
        loading={false}
        onSubmit={function (data: Cliente) {
          console.log(data);
        }}
      />
    );
    const nomeInput = screen.getByLabelText("Nome");
    const cnpjInput = screen.getByLabelText("CNPJ");
    const telefoneInput = screen.getByLabelText("Telefone");
    const emailInput = screen.getByLabelText("Email");

    user.type(nomeInput, "Nome do cliente");
    user.type(cnpjInput, "123456789");
    user.type(telefoneInput, "123456789");
    user.type(emailInput, "email");

    // Clicar no botão de submit
    const submitButton = screen.getByRole("button", { name: /salvar/i });
    user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("CNPJ inválido!")).toBeInTheDocument();
      expect(
        screen.queryByText(errosFormularioMensagem.emailObrigatorio)
      ).toBeInTheDocument();
      expect(
        screen.queryByText("O telefone informado é inválido!")
      ).toBeInTheDocument();
    });
  });
});
