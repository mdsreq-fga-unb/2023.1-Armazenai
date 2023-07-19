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

const errorsFeedbackForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaFeedbackForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number().required(errorsFeedbackForm.deveSerNumero),
  nota: yup.number().required(errorsFeedbackForm.deveSerNumero),
  comentario: yup.string().required(errorsFeedbackForm.deveSerString),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioFeedback = yup.InferType<typeof schemaFeedbackForm>;

type FormularioFeedbackProps = {
  enviaDadosFormulario: (dataFormulario: FormularioFeedback) => any;
  carregando: boolean;
  feedback?: FormularioFeedback;
  pedido_id: FormularioFeedback["pedido_id"];
};

export default function FeedbackFormulario({
  enviaDadosFormulario,
  carregando,
  feedback,
}: FormularioFeedbackProps) {
  console.log(feedback);
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioFeedback>({
      resolver: yupResolver(schemaFeedbackForm),
      defaultValues: feedback
        ? {
          id: feedback.id,
          pedido_id: feedback.pedido_id,
          comentario: feedback.comentario,
        }
        : {
          id: undefined,
          pedido_id: undefined,
          comentario: undefined,
        },
    });

  const supabase = createClientComponentClient<Database>();

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
            placeholder="Nota"
            label="Nota"
            required
            {...register("nota")}
            error={!!formState.errors.nota}
            helperText={formState.errors.nota?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Comentário"
            label="Comentário"
            required
            {...register("comentario")}
            error={!!formState.errors.nota}
            helperText={formState.errors.nota?.message}
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
