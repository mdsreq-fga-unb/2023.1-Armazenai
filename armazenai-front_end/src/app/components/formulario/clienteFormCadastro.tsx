import { phoneRegExp } from "../../helpers/validator/phoneRegexValidacao";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import validarCNPJ from "../..//helpers/validator/validarCNPJ";
import { Cliente } from "../../../../public/types/main-types";
import { errosFormularioMensagem } from "../../helpers/validator/mensagensDeErro";

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
  cnpj: yup
    .string()
    .required("O CNPJ é obrigatório!")
    .test("validar-cnpj", "CNPJ inválido!", (cnpj) => validarCNPJ(cnpj)),
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
            id: cliente.id,
            email: cliente.email,
            nome: cliente.nome,
            telefone: cliente.telefone,
            cnpj: cliente.cnpj,
          }
        : {
            email: "",
            nome: "",
            telefone: "",
            cnpj: "",
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
        <Grid item xs={6} sm={12} my={1}>
          <TextField
            label="Nome"
            aria-label="nome"
            id="nome"
            {...register("nome")}
            // required
            autoFocus
            type="text"
            fullWidth
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
        </Grid>
        <Grid item xs={6} sm={12} my={1}>
          <TextField
            label="CNPJ"
            aria-label="cnpj"
            id="cnpj"
            {...register("cnpj")}
            // required
            type="text"
            fullWidth
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
          />
        </Grid>
        <Grid item xs={6} sm={12} my={1}>
          <TextField
            label="Telefone"
            // aria-label="telefone"
            {...register("telefone")}
            // required
            fullWidth
            type="text"
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
          />
        </Grid>
        <Grid item xs={6} sm={12} my={1}>
          <TextField
            label="Email"
            aria-label="email"
            autoComplete="email"
            id="email"
            type="email"
            {...register("email")}
            // required
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <LoadingButton
          id="salvar"
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
