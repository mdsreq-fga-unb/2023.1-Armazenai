"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../public/types/database";
import Copyright from "../components/copyright/copyright";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import { errosFormularioMensagem } from "../helpers/validator/mensagensDeErro";
import { LoadingButton } from "@mui/lab";

const schemaLogin = yup.object({
  email: yup
    .string()
    .required(errosFormularioMensagem.emailObrigatorio)
    .email(errosFormularioMensagem.emailInvalido),
  senha: yup.string().required(errosFormularioMensagem.senhaObrigatoria),
});

type FormularioLogin = yup.InferType<typeof schemaLogin>;

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { register, handleSubmit, formState, control } =
    useForm<FormularioLogin>({
      defaultValues: {
        email: "",
        senha: "",
      },
      resolver: yupResolver(schemaLogin),
    });
  const { errors } = formState;

  const onSubimit = async ({ email, senha }: FormularioLogin) => {
    setLoading(true);
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) snackBarErro(`Houve um erro: ${error}`);
    if (data && data.session) {
      snackBarSucesso("Usuário logado com sucesso");
      setLoading(false);
      router.push("/dashboard");
    }
  };

  // TODO - ENVIAR EMAIL DE RECUPERAÇÃO
  const enviarEmailDeRecuperacao = () => {};

  supabase.auth.getSession().then((session) => {
    session && session.data.session && router.push("/dashboard");
  });

  return (
    <>
      {" "}
      <SnackbarProvider />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/logo.png" width={225}></img>
            <Typography component="h1" variant="h5" sx={{ my: 1 }}>
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubimit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                {...register("senha")}
                id="password"
                autoComplete="current-password"
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Login</span>
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Button onClick={() => setOpen(true)}>
                    Esqueceu sua senha?
                  </Button>
                </Grid>
                <Grid item>
                  <Link href="/cadastro" variant="body2">
                    Não tem conta? Crie uma agora!
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Recuperar senha</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira seu email de recuperação
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Endereço de email"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={enviarEmailDeRecuperacao}>Enviar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
