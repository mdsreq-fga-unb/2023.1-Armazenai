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

const errorsPedidoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaPedidoForm = yup.object({
  id: yup.number(),
  tipo_servico: yup.string().required(errorsPedidoForm.deveSerString),
  cliente_id: yup.number().required(errorsPedidoForm.deveSerNumero),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioPedido = yup.InferType<typeof schemaPedidoForm>;

type FormularioPedidoProps = {
  enviaDadosFormulario: (dataFormulario: FormularioPedido) => any;
  carregando: boolean;
  pedido?: FormularioPedido;
};

export default function PedidoFormulario({
  enviaDadosFormulario,
  carregando,
  pedido,
}: FormularioPedidoProps) {
  console.log(pedido);
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioPedido>({
      resolver: yupResolver(schemaPedidoForm),
      defaultValues: pedido
        ? {
            cliente_id: pedido.cliente_id,
            id: pedido.id,
            tipo_servico: pedido.tipo_servico,
          }
        : {
            id: undefined,
            cliente_id: undefined,
            tipo_servico: undefined,
          },
    });

  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const [cliente, setCliente] = React.useState<number | undefined>(undefined);

  const handleChangeE = (event: SelectChangeEvent) => {
    setCliente(event.target.value as unknown as number);
    setValue("cliente_id", event.target.value as unknown as number);
  };
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getClientes = async () => {
      const { data, error } = await supabase.from("cliente").select("*");
      if (data) setClientes(data);
      if (error) snackBarErro("Houve um erro ao buscar os cliente");
      if (pedido && pedido.cliente_id) {
        setCliente(data?.find((c) => c.id === pedido.cliente_id)?.id);
      }
    };
    getClientes();
  }, [pedido, supabase]);

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
            placeholder="Tipo de Serviço"
            label="Tipo de serviço"
            required
            {...register("tipo_servico")}
            error={!!formState.errors.tipo_servico}
            helperText={formState.errors.tipo_servico?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={(cliente as unknown as string) ?? ""}
            label="Cliente"
            fullWidth
            required
            onChange={handleChangeE}
          >
            {clientes.map((c) => (
              <MenuItem value={c.id} key={c.id}>
                {c.nome} - {c.cnpj}
              </MenuItem>
            ))}
          </Select>
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
