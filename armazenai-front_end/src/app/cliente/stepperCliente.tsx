import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Database } from "../../../public/types/database";
import { Cliente, Proprieade } from "../../../public/types/main-types";
import ClienteForm from "../components/formulario/clienteFormCadastro";
import PropriedadeFormulario, {
  FormularioPropriedade,
} from "../components/formulario/propriedadeForm";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";

const steps = ["Cadastrar Cliente", "Cadastrar Propriedade"];

type StepperClienteProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  cliente?: Cliente;
  propriedade?: Proprieade;
};
export default function StepperCliente({
  setOpenModal,
  cliente,
  propriedade,
}: StepperClienteProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [podeAvancar, setPodeAvancar] = React.useState(cliente ? true : false);
  const [clienteStepper, setCliente] = React.useState<Cliente | undefined>(
    cliente
  );

  const supabase = createClientComponentClient<Database>();

  const enviaDadosFormularioCliente = async ({
    nome,
    email,
    created_at,
    telefone,
    cnpj,
    id,
  }: Cliente) => {
    setLoading(true);
    if (id) {
      const { data, error } = await supabase
        .from("cliente")
        .update({
          email,
          nome,
          telefone,
          cnpj,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.log(error);
        snackBarErro("Houve um erro ao salvar as informações do cliente!");
        setLoading(false);
        return;
      }

      if (data) {
        setCliente(data);
        setActiveStep(1);
        snackBarSucesso(`Cliente atualizado com sucesso!`);
      }
    } else {
      const { data, error } = await supabase
        .from("cliente")
        .insert({
          email,
          nome,
          telefone,
          cnpj,
        })
        .select()
        .single();

      if (error) {
        console.log(error);
        snackBarErro("Houve um erro ao salvar as informações do cliente!");
        setLoading(false);
        return;
      }

      if (data) {
        setCliente(data);
        setActiveStep(1);
        snackBarSucesso(`Cliente criado com sucesso!`);
      }
    }

    setLoading(false);
  };

  const enviaDadosFormularioPropriedade = async (
    dadosFormulario: FormularioPropriedade
  ) => {
    setLoading(true);
    if (dadosFormulario.id) {
      const { data, error } = await supabase
        .from("propriedade")
        .update({
          nome: dadosFormulario.nome,
          endereco: dadosFormulario.endereco,
          area_disponivel: dadosFormulario.areaDisponivel,
          hectares_milho: dadosFormulario.hectaresMilho,
          hectares_soja: dadosFormulario.hectaresSoja,
          producao_milho: dadosFormulario.producaoMilho,
          producao_soja: dadosFormulario.producaoSoja,
          umidade_media_milho: dadosFormulario.umidadeMediaMilho,
          umidade_media_soja: dadosFormulario.umidadeMediaSoja,
        })
        .eq("id", dadosFormulario.id)
        .select()
        .single();

      if (error) {
        snackBarErro("Houve um erro ao cadastrar a propriedade.");
        setLoading(false);
        console.log(error);
        return;
      }
      if (data) [snackBarSucesso("Propriedade atualizada com sucesso!")];
    } else {
      const { data, error } = await supabase
        .from("propriedade")
        .insert({
          nome: dadosFormulario.nome,
          endereco: dadosFormulario.endereco,
          area_disponivel: dadosFormulario.areaDisponivel,
          hectares_milho: dadosFormulario.hectaresMilho,
          hectares_soja: dadosFormulario.hectaresSoja,
          producao_milho: dadosFormulario.producaoMilho,
          producao_soja: dadosFormulario.producaoSoja,
          umidade_media_milho: dadosFormulario.umidadeMediaMilho,
          umidade_media_soja: dadosFormulario.umidadeMediaSoja,
        })
        .select()
        .single();

      if (error) {
        snackBarErro("Houve um erro ao cadastrar a propriedade.");
        setLoading(false);
        console.log(error);
        return;
      }

      if (data) {
        cadastraClienteASuaPropriedade(data);
      }
    }
  };

  const cadastraClienteASuaPropriedade = async (propriedade: Proprieade) => {
    const { error } = await supabase
      .from("cliente_propriedade")
      .insert({ cliente_id: cliente?.id, propriedade_id: propriedade.id! })
      .select();

    if (error) {
      console.log(error);
      setLoading(false);
      snackBarErro("Houve um erro ao cadastrar a propriedade.");
      return;
    }

    snackBarSucesso("Propriedade cadastrada com sucesso!");

    setLoading(false);
    setPodeAvancar(true);
    setOpenModal(false);
    return;
  };

  const getActivePage = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ClienteForm
            cliente={clienteStepper}
            onSubmit={enviaDadosFormularioCliente}
            loading={loading}
          />
        );
      case 1:
        return (
          <PropriedadeFormulario
            enviaDadosFormulario={enviaDadosFormularioPropriedade}
            carregando={loading}
            propriedade={
              propriedade &&
              propriedade.producao_soja &&
              propriedade.hectares_milho &&
              propriedade.hectares_soja &&
              propriedade.producao_milho &&
              propriedade.umidade_media_milho &&
              propriedade.umidade_media_soja &&
              propriedade.area_disponivel
                ? {
                    id: propriedade.id,
                    nome: propriedade.nome,
                    endereco: propriedade.endereco,
                    areaDisponivel: propriedade.area_disponivel,
                    hectaresMilho: propriedade.hectares_milho,
                    hectaresSoja: propriedade.hectares_soja,
                    producaoMilho: propriedade.producao_milho,
                    producaoSoja: propriedade.producao_soja,
                    umidadeMediaMilho: propriedade.umidade_media_milho,
                    umidadeMediaSoja: propriedade.umidade_media_soja,
                  }
                : undefined
            }
          />
        );
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <SnackbarProvider />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            O cliente e a propriedade foram salvos com sucesso!
          </Typography>
          <DoneAllIcon color="success" />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button>Fechar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <>
          <Box sx={{ pt: 2 }}>{getActivePage(activeStep)}</Box>
          <Button disabled={!podeAvancar} onClick={() => setActiveStep(1)}>
            Avançar
          </Button>
        </>
      )}
    </Box>
  );
}
