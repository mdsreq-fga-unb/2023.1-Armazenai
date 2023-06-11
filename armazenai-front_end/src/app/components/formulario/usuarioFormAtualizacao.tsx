"use client";
import { errosFormularioMensagem } from "@/app/helpers/validator/mensagensDeErro";
import { phoneRegExp } from "@/app/helpers/validator/phoneRegexValidacao";
import { Button, Grid, TextField } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SnackbarProvider } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../../public/types/database";
import snackBarErro from "../snackBar/snackBarError";
import snackBarSucesso from "../snackBar/snackBarSucesso";

const schemaFormAtualizacao = yup.object({
  id: yup.string().required(),
  nome: yup.string().nullable().default(""),
  telefone: yup
    .string()
    .matches(phoneRegExp, errosFormularioMensagem.telefoneInvalido)
    .nullable()
    .default(""),
  cpf: yup.string().nullable().default(""),
});

export type FormAtualizacaoSchema = yup.InferType<typeof schemaFormAtualizacao>;

export type Usuario = {
  cpf: string | null;
  id: string;
  nome: string | null;
  telefone: string | null;
  updated_at: string | null;
};

type formAtualizacao = {
  usuario: Usuario;
  setUsuario: Dispatch<SetStateAction<Usuario | null>>;
};

export default function UsuarioFormAtualizacao({
  usuario,
  setUsuario,
}: formAtualizacao) {
  const supabase = createClientComponentClient<Database>();
  const { handleSubmit, formState, register } = useForm<FormAtualizacaoSchema>({
    defaultValues: {
      id: usuario.id,
      nome: usuario.nome,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
    },
  });
  const { errors } = formState;

  const onSubmit = async (formData: FormAtualizacaoSchema) => {
    const { id, cpf, nome, telefone } = formData;
    const { data, error, status } = await supabase
      .from("profiles")
      .update({ cpf: cpf, nome: nome, telefone: telefone })
      .eq("id", formData.id);

    if (error || status !== 204) {
      snackBarErro("Houve um erro ao atualizar as informações do perfil");
      return;
    }

    setUsuario(formData as Usuario);
    snackBarSucesso("Perfil atualizado com sucesso", {
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
  };

  return (
    <>
      <SnackbarProvider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={12}>
            <TextField
              autoComplete="givem-name"
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
          </Grid>
          <Grid item xs={6} sm={12}>
            <TextField
              autoComplete="given-name"
              fullWidth
              id="telefone"
              label="Telefone"
              autoFocus
              {...register("telefone")}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              label="cpf"
              fullWidth
              id="cpf"
              autoFocus
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Atualizar
          </Button>
        </Grid>
      </form>
    </>
  );
}
