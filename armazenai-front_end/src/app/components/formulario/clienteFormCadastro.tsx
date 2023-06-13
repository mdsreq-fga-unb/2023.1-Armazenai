import { errosFormularioMensagem } from "@/app/helpers/validator/mensagensDeErro";
import { phoneRegExp } from "@/app/helpers/validator/phoneRegexValidacao";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import { Cliente } from "../../../../public/types/main-types";

type formCliente = {
  cliente?: Cliente;
  onSubmit: (data: Cliente) => any;
  loading: boolean;
};

const schemaClienteForm = yup.object({
  id: yup.number().default(undefined),
  nome: yup.string().required("O nome do cliente é obrigatório!"),
  email: yup
    .string()
    .required(errosFormularioMensagem.emailObrigatorio)
    .email(errosFormularioMensagem.emailInvalido),
  telefone: yup
    .string()
    .required("O telefone do cliente é obrigatório!")
    .matches(phoneRegExp, errosFormularioMensagem.telefoneInvalido),
});

type FormularioCliente = yup.InferType<typeof schemaClienteForm>;

export default function ClienteForm({
  cliente,
  onSubmit,
  loading,
}: formCliente) {
  const { formState, register, control, handleSubmit } =
    useForm<FormularioCliente>({
      defaultValues: cliente
        ? {
            email: cliente.email,
            id: cliente.id,
            nome: cliente.nome,
            telefone: cliente.telefone,
          }
        : {
            email: "",
            nome: "",
            telefone: "",
          },
      resolver: yupResolver(schemaClienteForm),
    });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h2"
        fontWeight={700}
        fontSize={32}
        mb={2}
        textAlign="center"
      >
        {cliente ? "Atualizar cliente" : "Adicionar cliente"}
      </Typography>
      <Grid container>
        <Grid xs={6} sm={12} my={1}>
          <TextField
            label="Nome"
            {...register("nome")}
            required
            autoFocus
            fullWidth
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
        </Grid>
        <Grid xs={6} sm={12} my={1}>
          <TextField
            label="Telefone"
            {...register("telefone")}
            required
            autoFocus
            fullWidth
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
          />
        </Grid>
        <Grid xs={6} sm={12} my={1}>
          <TextField
            label="Email"
            {...register("email")}
            required
            autoFocus
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          fullWidth
        >
          {cliente && cliente.id ? "Atualizar" : "Salvar"}
        </LoadingButton>
      </Grid>
    </form>
  );
}
