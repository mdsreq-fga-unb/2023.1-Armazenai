import userEvent from "@testing-library/user-event";
import PropriedadeForm from "../../../src/app/components/formulario/propriedadeForm";
import { render, screen, waitFor } from "@testing-library/react";

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
