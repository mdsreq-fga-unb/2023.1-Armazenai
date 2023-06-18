"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../public/types/database";
import Copyright from "../components/copyright/copyright";
import UsuarioForm from "../components/formulario/usuarioFormCadastro";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import { chekcCpfDuplicated } from "../helpers/supabase/checkCpfDuplicated";
import { errosFormularioMensagem } from "../helpers/validator/mensagensDeErro";
import { phoneRegExp } from "../helpers/validator/phoneRegexValidacao";

const errorsFormularioCadastro = {
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

export type FormularioCadastro = yup.InferType<typeof schemaFormValidacao>;

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

    snackBarSucesso(
      "Usuário criado com sucesso! Confirme seu email para ter acesso ao sistema!",
      { autoHideDuration: 5000 }
    );

    router.push("/");
    return;
  };

  return (
    <Paper elevation={3} sx={{ mx: 10, my: 3, padding: 1 }}>
      <Head>
        <title>Cadastro - EGL</title>
      </Head>
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
          <UsuarioForm onSubmit={onSubmit} />
        </Box>
        <Copyright />
      </Container>
    </Paper>
  );
}
