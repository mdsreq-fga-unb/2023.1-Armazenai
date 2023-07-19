import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  colors,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const errorsContratacaoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaContratacaoForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number().required(errorsContratacaoForm.deveSerNumero),
  propriedade_id: yup.string().required(errorsContratacaoForm.deveSerString),
  preco: yup.number().required(errorsContratacaoForm.deveSerNumero),
  status: yup.string().required(errorsContratacaoForm.deveSerString),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioContratacao = yup.InferType<typeof schemaContratacaoForm>;

type FormularioContratacaoProps = {
  enviaDadosFormulario: (dataFormulario: FormularioContratacao) => any;
  carregando: boolean;
  contratacao?: FormularioContratacao;
};

export default function ContratacaoFormulario({
  enviaDadosFormulario,
  carregando,
  contratacao,
}: FormularioContratacaoProps) {
  console.log(contratacao);
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioContratacao>({
      resolver: yupResolver(schemaContratacaoForm),
      defaultValues: contratacao
        ? {
          id: contratacao.id,
          pedido_id: contratacao.pedido_id,
          propriedade_id: contratacao.propriedade_id,
          preco: contratacao.preco,
          status: contratacao.status,
        }
        : {
          id: undefined,
          pedido_id: undefined,
          propriedade_id: undefined,
          preco: undefined,
          status: undefined,
        },
    });

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: colors.grey[100],
        }}
      >
        <Grid xs={6} item>
          <TextField
            placeholder="Preço"
            label="Preço"
            required
            {...register("preco")}
            error={!!formState.errors.preco}
            helperText={formState.errors.preco?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Status"
            label="Status"
            required
            {...register("status")}
            error={!!formState.errors.status}
            helperText={formState.errors.status?.message}
          />
        </Grid>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            backgroundColor: colors.grey[400],
          }}
        >
        </Box>
      </Grid>
    </form>
  );
}
