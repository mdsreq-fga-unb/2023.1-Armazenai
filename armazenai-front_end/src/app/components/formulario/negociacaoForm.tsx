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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../../public/types/database";
import { Cliente } from "../../../../public/types/main-types";
import snackBarErro from "../snackBar/snackBarError";

const errorsNegociacaoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaNegociacaoForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number().required(errorsNegociacaoForm.deveSerNumero),
  propriedade_id: yup.string().required(errorsNegociacaoForm.deveSerString),
  preco: yup.number().required(errorsNegociacaoForm.deveSerNumero),
  status: yup.string().required(errorsNegociacaoForm.deveSerString),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioNegociacao = yup.InferType<typeof schemaNegociacaoForm>;

type FormularioNegociacaoProps = {
  enviaDadosFormulario: (dataFormulario: FormularioNegociacao) => any;
  carregando: boolean;
  negociacao?: FormularioNegociacao;
};

export default function NegociacaoFormulario({
  enviaDadosFormulario,
  carregando,
  negociacao,
}: FormularioNegociacaoProps) {
  console.log(negociacao);
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioNegociacao>({
      resolver: yupResolver(schemaNegociacaoForm),
      defaultValues: negociacao
        ? {
          id: negociacao.id,
          pedido_id: negociacao.pedido_id,
          propriedade_id: negociacao.propriedade_id,
          preco: negociacao.preco,
          status: negociacao.status,
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
