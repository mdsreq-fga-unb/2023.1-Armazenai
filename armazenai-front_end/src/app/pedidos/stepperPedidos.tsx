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
import { Dispatch, SetStateAction, useState } from "react";
import { Database } from "../../../public/types/database";
import { Pedido, Feedback, Negociacao, Contratacao } from "../../../public/types/main-types";
import PedidoForm from "../components/formulario/pedidoForm";
import ContratacaoForm from "../components/formulario/contratacaoForm";
import ExecucaoForm from "../components/formulario/execucaoForm";
import NegociacaoForm from "../components/formulario/negociacaoForm";
import FeedbackForm from "../components/formulario/feedbackForm";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import { number } from "yup";
import { colors } from "@mui/material";
//import { Feedback } from "@mui/icons-material";

const steps = ["Orçamento", "Feedback", "Negociação", "Contratação", "Execução"];
console.log(steps);
type StepperPedidosProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function StepperPedidos({ setOpenModal }: StepperPedidosProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [pedidoSendoEditado, setPedidoSendoEditado] = useState<
        Pedido | undefined
    >(undefined);
    const [feedbackSendoEditado, setFeedbackSendoEditado] = useState<
        Feedback | undefined
    >(undefined);
    const supabase = createClientComponentClient<Database>();

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
                    etapa_orcamento: 1,
                    cancelado: false,
                    concluido: false,
                });

            if (error || erroPedidoEtapaInsert)
                snackBarErro("Houve um erro ao criar o pedido!");
            else snackBarSucesso("Pedido criado com sucesso!");
        }

        setOpenModal(false);
    };

    const enviaDadosFormularioFeedback = async ({
        pedido_id,
        comentario,
        id,
    }: {
        pedido_id: number;
        comentario: string;
        id?: number;
    }) => {
        if (id) {
            const { data, error } = await supabase
                .from("etapa_feedback")
                .update({ pedido_id,  comentario })
                .eq("id", id)
                .select();

            if (error) snackBarErro("Houve um erro ao atualizar o feedback!");
            else snackBarSucesso("Feedback atualizado com sucesso!");
        } else {
            const { data, error } = await supabase
                .from("etapa_feedback")
                .insert({ pedido_id, comentario })
                .select()
                .single();

            if (error || !data || !data.id)
                snackBarErro("Houve um erro ao criar o feedback!");
            else snackBarSucesso("Feedback criado com sucesso!");
        }

        setOpenModal(false);
    }

    const enviaDadosFormularioNegociacao = async ({
        id,
        pedido_id,
        propriedade_id,
        preco,
        status,
    }: {
        id?: number;
        pedido_id: number;
        propriedade_id: number;
        preco: number;
        status: string;
    }) => {
        if (id) {
            const { data, error } = await supabase
                .from("etapa_negociacao")
                .update({ pedido_id, propriedade_id, preco, status })
                .eq("id", id)
                .select();

            if (error) snackBarErro("Houve um erro ao atualizar a negociação!");
            else snackBarSucesso("Negociação atualizada com sucesso!");
        } else {
            const { data, error } = await supabase
                .from("negociacao")
                .insert({ pedido_id, propriedade_id, preco, status })
                .select()
                .single();

            if (error || !data || !data.id)
                snackBarErro("Houve um erro ao criar a negociação!");
            else snackBarSucesso("Negociação criada com sucesso!");
        }

        setOpenModal(false);
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const getActivePage = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <PedidoForm
                        enviaDadosFormulario={enviaDadosFormularioPedidos}
                        pedido={pedidoSendoEditado &&
                            pedidoSendoEditado.cliente_id &&
                            pedidoSendoEditado.tipo_servico
                            ? {
                                cliente_id: pedidoSendoEditado?.cliente_id,
                                tipo_servico: pedidoSendoEditado?.tipo_servico,
                                id: pedidoSendoEditado.id,
                            }
                            : undefined}
                        carregando={false} />
                );
            case 1:
                return (
                    <FeedbackForm
                        enviaDadosFormulario={enviaDadosFormularioFeedback}
                        feedback={feedbackSendoEditado &&
                            feedbackSendoEditado.id &&
                            feedbackSendoEditado.pedido_id &&
                            feedbackSendoEditado.comentario
                            ? {
                                id: feedbackSendoEditado.id,
                                pedido_id: feedbackSendoEditado.pedido_id,
                                comentario: feedbackSendoEditado.comentario,
                            }
                            : undefined}
                        carregando={false} pedido_id={0} />
                );

            case 2:
                return (
                    <NegociacaoForm 
                    enviaDadosFormulario={enviaDadosFormulario}) {
                );
            case 3:
                return (
                    <ContratacaoForm enviaDadosFormulario={function (dataFormulario: { id?: number | undefined; cliente_id: number; tipo_servico: string; }) {
                        throw new Error("Function not implemented.");
                    }} carregando={false} />
                );
            case 4:
                return (
                    <ExecucaoForm enviaDadosFormulario={function (dataFormulario: { id?: number | undefined; cliente_id: number; tipo_servico: string; }) {
                        throw new Error("Function not implemented.");
                    }} carregando={false} />
                );
            case 5:
                return (
                    <FeedbackForm enviaDadosFormulario={function (dataFormulario: { id?: number | undefined; cliente_id: number; tipo_servico: string; }) {
                        throw new Error("Function not implemented.");
                    }} carregando={false} />
                );
        }
    };
    console.log("DEBUG " + steps.length + "\n " + activeStep)
    return (
        <Box sx={{ width: "100%"}}>
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
                <Box sx={{ pt: 1, backgroundColor: colors.green[500] }}>{getActivePage(activeStep)}</Box>
            )}
            <Button onClick={handleNext} >
                {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
            </Button>
        </Box>
    );
}
