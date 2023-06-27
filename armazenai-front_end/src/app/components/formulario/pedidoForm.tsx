import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const errorsPedidoForm = {
  deveSerNumero: "Este campo deve ser um número!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaPedidoForm = yup.object({
  nome: yup.string().required("O nome do cliente é obrigatório!"),
  endereco: yup.string().required("O endereço é obrigatório!"),
  etapa: yup.string().required("Etapa do pedido é obrigatório!")
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagem padrão
export type FormularioPedido = yup.InferType<typeof schemaPedidoForm>;

type FormularioPedidoProps = {
  enviaDadosFormulario: (dataFormulario: FormularioPedido) => any;
  carregando: boolean;
};

export default function PedidoFormulario({
  enviaDadosFormulario,
  carregando,
}: FormularioPedidoProps) {
  const { formState, handleSubmit, control, register } =
    useForm<FormularioPedido>({
      resolver: yupResolver(schemaPedidoForm),
    });

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <TextField
            placeholder="Nome da propriedade"
            required
            {...register("nome")}
            error={!!formState.errors.nome}
            helperText={formState.errors.nome?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Endereco da propriedade"
            required
            {...register("endereco")}
            error={!!formState.errors.endereco}
            helperText={formState.errors.endereco?.message}
          />
        </Grid>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
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
