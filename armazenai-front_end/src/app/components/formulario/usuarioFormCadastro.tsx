import { errosFormularioMensagem } from "../../helpers/validator/mensagensDeErro";
import { phoneRegExp } from "../..//helpers/validator/phoneRegexValidacao";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const errorsFormularioCadastro = {
  nomeObrigatorio: "O nome é obrigatório!",
  telefoneRegex: "O telefone informado é inválido!",
  telefoneObrigatorio: "O telefone é obrigatóro!",
  cpfObrigatorio: "O cpf é obrigatório!",
};

const schemaFormValidacao = yup.object({
  nome: yup.string().required(errorsFormularioCadastro.nomeObrigatorio),
  telefone: yup
    .string()
    .required(errorsFormularioCadastro.telefoneObrigatorio)
    .matches(phoneRegExp, errorsFormularioCadastro.telefoneRegex),
  cpf: yup.string().required(errorsFormularioCadastro.cpfObrigatorio),
  email: yup
    .string()
    .email(errosFormularioMensagem.emailInvalido)
    .required(errosFormularioMensagem.emailObrigatorio),
  password: yup.string().required(),
});

type FormularioCadastro = yup.InferType<typeof schemaFormValidacao>;

interface UsuarioFormProps {
  onSubmit: (formData: FormularioCadastro) => Promise<any>;
  estadoInicial?: FormularioCadastro;
  loading: boolean;
  // Essa propriedade existe pois na tela de "Usuários" é possível cadastrar um novo cliente, logo algumas informações são desnecessárias, como o footer com link para logar.
  formularioInterno: boolean;
}

export default function UsuarioForm({
  onSubmit,
  estadoInicial,
  loading,
  formularioInterno,
}: UsuarioFormProps) {
  const { register, handleSubmit, formState, control } =
    useForm<FormularioCadastro>({
      defaultValues: estadoInicial ?? {
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
      },
      resolver: yupResolver(schemaFormValidacao),
    });
  const { errors } = formState;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              // required
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // required
              fullWidth
              id="telefone"
              label="Telefone"
              type="tel"
              autoComplete="family-name"
              {...register("telefone")}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // required
              fullWidth
              id="cpf"
              label="CPF"
              type="text"
              autoComplete="cpf"
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // required
              fullWidth
              id="email"
              label="Endereço de Email"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // required
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar
        </Button>
        <Grid container justifyContent="flex-center">
          <Grid item>
            <Link href="/login">Já possui uma conta? Entre agora!</Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
