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

  it("deveria mostrar o erro de email inválido", async () => {
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
        new RegExp(errosFormularioMensagem.emailInvalido, "i")
      ).toBeInTheDocument();
    });
  });
});
