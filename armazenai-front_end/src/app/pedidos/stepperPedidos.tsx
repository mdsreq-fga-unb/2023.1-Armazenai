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
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Database } from "../../../public/types/database";
import {
  Contratacao,
  Execucao,
  Feedback,
  Pedido,
} from "../../../public/types/main-types";
import ContratacaoForm, {
  FormularioContratacao,
} from "../components/formulario/contratacaoForm";
import ExecucaoForm, {
  FormularioExecucao,
} from "../components/formulario/execucaoForm";
import FeedbackForm from "../components/formulario/feedbackForm";
import PedidoForm from "../components/formulario/pedidoForm";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";

const steps = ["Criação", "Feedback", "Contratação", "Execução"];
type StepperPedidosProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  pedido?: Pedido;
};
export default function StepperPedidos({
  setOpenModal,
  pedido,
}: StepperPedidosProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [pedidoSendoEditado, setPedidoSendoEditado] = useState<
    Pedido | undefined
  >(undefined);
  const [feedbackSendoEditado, setFeedbackSendoEditado] = useState<
    Feedback | undefined
  >(undefined);
  const supabase = createClientComponentClient<Database>();
  const [etapaMax, setEtapaMax] = useState(0);
  const [contratacao, setContratacao] = useState<Contratacao | null>(null);
  const [execucao, setExecucao] = useState<Execucao | null>(null);

  const enviaDadosFormularioPedidos = async ({
    cliente_id,
    tipo_servico,
    id,
  }: {
    cliente_id: number;
    tipo_servico: string;
    id?: number;
  }) => {
    if (id) {
      const { data, error } = await supabase
        .from("pedido")
        .update({ cliente_id, tipo_servico })
        .eq("id", id)
        .select();

      if (error) snackBarErro("Houve um erro ao atualizar o pedido!");
      else snackBarSucesso("Pedido atualizado com sucesso!");
    } else {
      const { data, error } = await supabase
        .from("pedido")
        .insert({ cliente_id, tipo_servico })
        .select()
        .single();

      if (!data || !data.id) {
        snackBarErro("Houve um erro ao criar o pedido!");
        return;
      }

      const { error: erroPedidoEtapaInsert } = await supabase
        .from("pedido_etapa")
        .insert({
          pedido: data.id,
          cancelado: false,
          concluido: false,
        });

      if (error || erroPedidoEtapaInsert) {
        snackBarErro("Houve um erro ao criar o pedido!");
      } else {
        snackBarSucesso("Pedido iniciado com sucesso!");
        setPedidoSendoEditado(data);
        setEtapaMax(1);
        setActiveStep(1);
      }
    }
  };

  const enviaDadosFormularioFeedback = async ({
    pedido_id,
    comentario,
    nota,
    id,
  }: {
    pedido_id?: number;
    comentario: string;
    nota: number;
    id?: number;
  }) => {
    if (id) {
      const { data, error } = await supabase
        .from("etapa_feedback_cliente")
        .update({ nota, feedback: comentario })
        .eq("id", id)
        .select();

      if (error) {
        snackBarErro("Houve um erro ao atualizar o feedback!");
      } else {
        snackBarSucesso("Feedback atualizado com sucesso!");
        setEtapaMax(2);
      }
    } else {
      const { data, error } = await supabase
        .from("etapa_feedback_cliente")
        .insert({ nota, concluido: true, feedback: comentario })
        .select()
        .single();

      const { error: erroPedidoEtapaInsert } = await supabase
        .from("pedido_etapa")
        .update({
          etapa_feedback: data?.id,
        })
        .eq("pedido", pedido_id ?? pedidoSendoEditado?.id);

      if (error || !data || !data.id || erroPedidoEtapaInsert) {
        snackBarErro("Houve um erro ao criar o feedback!");
      } else {
        snackBarSucesso("Feedback criado com sucesso!");
        setEtapaMax(2);
      }
    }
  };

  const enviaDadosFormularioContratacao = async ({
    id,
    pedido_id,
    preco,
  }: FormularioContratacao) => {
    if (id) {
      const { data, error } = await supabase
        .from("etapa_contratacao")
        .update({ concluido: true, preco })
        .eq("id", id)
        .select();

      if (error) snackBarErro("Houve um erro ao atualizar a contratação!");
      else {
        snackBarSucesso("Contratação atualizada com sucesso!");
        setEtapaMax(3);
      }
    } else {
      const { data, error } = await supabase
        .from("etapa_contratacao")
        .insert({ concluido: true, preco })
        .select()
        .single();

      if (data && pedido_id) {
        setContratacao({
          id: data.id,
          preco: data.preco,
          pedido_id: pedido_id,
          concluido: data.concluido,
        });
      }

      const { error: erroPedidoEtapaInsert } = await supabase
        .from("pedido_etapa")
        .update({
          etapa_contratacao: data?.id,
        })
        .eq("pedido", pedido_id);

      if (error || !data || !data.id || erroPedidoEtapaInsert) {
        snackBarErro("Houve um erro ao criar a contratação!");
      } else {
        snackBarSucesso("Contratação criada com sucesso!");
        setEtapaMax(3);
      }
    }
  };

  const enviaDadosFormularioExecucao = async ({
    id,
    pedido_id,
  }: FormularioExecucao) => {
    if (id) {
      const { data, error } = await supabase
        .from("etapa_execucao_obra")
        .update({ concluido: true })
        .eq("id", id)
        .select();

      if (error) snackBarErro("Houve um erro ao atualizar a contratação!");
      else {
        snackBarSucesso("Contratação atualizada com sucesso!");
        setEtapaMax(3);
      }
    } else {
      const { data, error } = await supabase
        .from("etapa_execucao_obra")
        .insert({ concluido: true })
        .select()
        .single();

      const { error: erroPedidoEtapaInsert } = await supabase
        .from("pedido_etapa")
        .update({
          etapa_execucao: data?.id,
        })
        .eq("pedido", pedido_id);

      if (error || !data || !data.id || erroPedidoEtapaInsert) {
        snackBarErro("Houve um erro ao finalizar a execução!");
      } else {
        snackBarSucesso("Etapa de execução registrada com sucesso!");
        setEtapaMax(3);
      }
    }
  };

  const handleNext = () => {
    console.log(etapaMax, activeStep);
    if (etapaMax > activeStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      snackBarErro("A etapa deve ser salva e concluída antes de avançar!");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setPedidoEtapa = useCallback(async () => {
    if (pedido) {
      const { data, error } = await supabase
        .from("pedido_etapa")
        .select("*, etapa_feedback_cliente(*), etapa_contratacao(*)")
        .eq("pedido", pedido.id)
        .single();

      if (data) {
        setEtapaMax(1);

        if (data.etapa_feedback_cliente) {
          setFeedbackSendoEditado({
            comentario: data.etapa_feedback_cliente.feedback,
            id: data.etapa_feedback_cliente.id,
            nota: data.etapa_feedback_cliente.nota,
            pedido_id: pedido.id,
          });
          setEtapaMax(2);
          setActiveStep(2);
        }
        // seta o maximo do stepper
        if (data.etapa_contratacao) {
          setContratacao({
            id: data.etapa_contratacao.id,
            preco: data.etapa_contratacao.preco,
            pedido_id: pedido.id,
            concluido: data.etapa_contratacao.concluido,
          });
          setEtapaMax(3);
          setActiveStep(3);
        }
        if (data.etapa_execucao) {
          setExecucao({
            id: data.etapa_execucao.id,
            concluido: data.etapa_execucao.concluido,
            pedido_id: pedido.id,
          });
          setEtapaMax(4);
          setActiveStep(4);
        }
      }
    }
  }, [pedido, supabase]);

  React.useEffect(() => {
    setPedidoEtapa();
  }, [setPedidoEtapa]);

  const getActivePage = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PedidoForm
            enviaDadosFormulario={enviaDadosFormularioPedidos}
            pedido={
              pedido
                ? {
                    cliente_id: pedido.cliente_id,
                    tipo_servico: pedido.tipo_servico,
                    id: pedido.id,
                  }
                : undefined
            }
            carregando={false}
          />
        );
      case 1:
        return (
          <FeedbackForm
            enviaDadosFormulario={enviaDadosFormularioFeedback}
            feedback={
              feedbackSendoEditado &&
              feedbackSendoEditado.id &&
              feedbackSendoEditado.pedido_id &&
              feedbackSendoEditado.comentario
                ? {
                    id: feedbackSendoEditado.id,
                    pedido_id: feedbackSendoEditado.pedido_id,
                    comentario: feedbackSendoEditado.comentario,
                    nota: feedbackSendoEditado.nota,
                  }
                : undefined
            }
            carregando={false}
            pedido_id={pedido?.id}
          />
        );

      case 2:
        return (
          <ContratacaoForm
            pedido_id={pedido?.id}
            contratacao={
              contratacao
                ? {
                    id: contratacao.id,
                    preco: contratacao.preco,
                    pedido_id: contratacao.pedido_id,
                  }
                : undefined
            }
            enviaDadosFormulario={enviaDadosFormularioContratacao}
          />
        );
      case 3:
        return (
          <ExecucaoForm
            pedido_id={pedido?.id}
            execucao={
              execucao
                ? {
                    id: execucao.id,
                    concluido: execucao.concluido,
                    pedido_id: execucao.pedido_id,
                  }
                : undefined
            }
            enviaDadosFormulario={enviaDadosFormularioExecucao}
          />
        );
    }
  };
  console.log("render stepper");
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
            Pedido feito com sucesso!!
          </Typography>
          <DoneAllIcon color="success" />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button>Fechar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            pt: 2,
            //  backgroundColor: colors.green[500],
          }}
        >
          <Box sx={{ py: 5 }}>{getActivePage(activeStep)}</Box>
        </Box>
      )}
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Voltar
      </Button>
      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Salvar" : "Próximo"}
      </Button>
    </Box>
  );
}
