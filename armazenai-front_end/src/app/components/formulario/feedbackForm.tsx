import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, colors } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const errorsFeedbackForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaFeedbackForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number(),
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
  pedido_id,
  feedback,
}: FormularioFeedbackProps) {
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioFeedback>({
      resolver: yupResolver(schemaFeedbackForm),
      defaultValues: feedback
        ? {
            id: feedback.id,
            pedido_id: feedback.pedido_id,
            nota: feedback.nota,
            comentario: feedback.comentario,
          }
        : {
            id: undefined,
            pedido_id: pedido_id,
            nota: undefined,
            comentario: undefined,
          },
    });

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid container spacing={1}>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={carregando}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </form>
  );
}
