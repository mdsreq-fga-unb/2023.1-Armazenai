import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaFiltroUsuarios = yup.object({
  nome: yup.string(),
  cpf: yup.string(),
  telefone: yup.string(),
});

type SchemaFiltroUsuarioForm = yup.InferType<typeof schemaFiltroUsuarios>;
export type FiltroUsuarioForm = {
  nome?: string | undefined;
  cpf?: string | undefined;
  telefone?: string | undefined;
};

export default function FiltroUsuarios({
  submitFilter,
}: {
  submitFilter: (filter?: FiltroUsuarioForm) => void;
}) {
  const { handleSubmit, reset, register } = useForm<SchemaFiltroUsuarioForm>({
    resolver: yupResolver(schemaFiltroUsuarios),
  });
  return (
    <Box mt={1} mb={2}>
      <Typography>Filtros:</Typography>
      <form onSubmit={handleSubmit(submitFilter)}>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-evenly"}
        >
          <TextField placeholder="Nome" {...register("nome")} />
          <TextField placeholder="Telefone" {...register("telefone")} />
          <TextField placeholder="CPF" {...register("cpf")} />
        </Box>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"center"}
          mt={1}
        >
          <Button
            color="primary"
            size="medium"
            variant="outlined"
            onClick={() => {
              reset();
              submitFilter();
            }}
            sx={{ mr: 1 }}
          >
            limpar
          </Button>
          <Button
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
            sx={{ ml: 1 }}
          >
            Filtrar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
