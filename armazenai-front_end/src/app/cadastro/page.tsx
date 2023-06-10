"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../public/types/database";
import Copyright from "../components/copyright/copyright";
import snackBarErro from "../components/snackBar/snackBarError";
import { chekcCpfDuplicated } from "../helpers/supabase/checkCpfDuplicated";
import { phoneRegExp } from "../helpers/validator/phoneRegexValidacao";

const errorsFormularioCadastro = {
  nomeObrigatorio: "O nome é obrigatório!",
  telefoneRegex: "O telefone informado é inválido!",
  telefoneObrigatorio: "O telefone é obrigatóro!",
  cpfObrigatorio: "O cpf é obrigatório!",
};

const errosFormularioMensagem = {
  emailObrigatorio: "O email é obrigatório",
  emailInvalido: "O email informado é inválido!",
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

export default function SignUp() {
  const [CPFError, setCPFError] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const { register, handleSubmit, formState, control } =
    useForm<FormularioCadastro>({
      defaultValues: {
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
      },
      resolver: yupResolver(schemaFormValidacao),
    });
  const { errors } = formState;

  const router = useRouter();
  const onSubmit = async ({
    cpf,
    email,
    nome,
    password,
    telefone,
  }: FormularioCadastro) => {
    const cpfDuplicado = await chekcCpfDuplicated(cpf);
    if (cpfDuplicado) {
      setCPFError(true);
      return;
    }

    const cadastro = await supabase.auth.signUp({
      email,
      password,
    });
    if (cadastro.error || !cadastro.data.user?.id) {
      snackBarErro("Houve um erro ao cadastrar");
      return;
    }

    const { status, error } = await supabase
      .from("profiles")
      .update({ cpf, nome, telefone })
      .eq("id", cadastro.data.user?.id);

    if (error || status !== 204) {
      snackBarErro("Houve um erro ao cadastrar");
      return;
    }

    enqueueSnackbar(
      "Usuário criado com sucesso, confirme seu e-mail para ter acesso ao sistema!",
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      }
    );

    router.push("/");
    return;
  };

  return (
    <Paper elevation={3} sx={{ mx: 10, my: 3, padding: 1 }}>
      <SnackbarProvider />
      <Container component="main">
        <CssBaseline />
        <Typography component="h1" variant="h3" align="center">
          Cadastre-se
        </Typography>
        <Box
          component="div"
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="assets/logo.png"></img>
          <Alert
            variant="filled"
            severity="error"
            hidden={CPFError}
            sx={{ display: CPFError ? "flex" : "none", m: 2 }}
            onClose={() => setCPFError(false)}
          >
            CPF Duplicado!
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
              disabled={!formState.isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Já possui uma conta? Entre agora!
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright />
      </Container>
    </Paper>
  );
}
