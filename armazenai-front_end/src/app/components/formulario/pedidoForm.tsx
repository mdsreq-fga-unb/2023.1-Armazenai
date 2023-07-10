import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, colors } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const errorsPedidoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaPedidoForm = yup.object({
  tipo_servico: yup.string().required(errorsPedidoForm.deveSerString),
  cliente_id: yup.number().required(errorsPedidoForm.deveSerNumero),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
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

  const [tipoServico, setTipoServico] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);
  const onSubmit = (data: any) => console.log(data.tipo_servico);
  const handleChange = (event: SelectChangeEvent<typeof tipoServico>) => {
    setTipoServico(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario, onSubmit)}>
      <Grid container spacing={1} sx={{
        backgroundColor: colors.grey[100],
      }}>
        <Grid xs={6} item>
          <TextField
            placeholder="Tipo de Serviço"
            required
            {...register("tipo_servico")}
            error={!!formState.errors.tipo_servico}
            helperText={formState.errors.tipo_servico?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Cliente ID"
            required
            {...register("cliente_id")}
            error={!!formState.errors.cliente_id}
            helperText={formState.errors.cliente_id?.message}
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
