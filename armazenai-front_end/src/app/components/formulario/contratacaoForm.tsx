import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, colors } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../../public/types/database";

const errorsContratacaoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaContratacaoForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number(),
  preco: yup.number().required(errorsContratacaoForm.deveSerNumero),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioContratacao = yup.InferType<typeof schemaContratacaoForm>;

type FormularioContratacaoProps = {
  contratacao?: FormularioContratacao;
  pedido_id: FormularioContratacao["pedido_id"];
  enviaDadosFormulario: (dataFormulario: FormularioContratacao) => any;
};

export default function ContratacaoFormulario({
  contratacao,
  pedido_id,
  enviaDadosFormulario,
}: FormularioContratacaoProps) {
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioContratacao>({
      resolver: yupResolver(schemaContratacaoForm),
      defaultValues: contratacao
        ? {
            id: contratacao.id,
            pedido_id: contratacao.pedido_id,
            propriedade_id: contratacao.propriedade_id,
            preco: contratacao.preco,
          }
        : {
            id: undefined,
            pedido_id: pedido_id,
            propriedade_id: undefined,
            preco: undefined,
          },
    });

  // TODO TIPAR ESSE STATE
  const [media, setMedia] = useState<any>([]);
  const supabase = createClientComponentClient<Database>();
  const [carregando, setCarregando] = useState(false);
  console.log("render form");
  // TODO TIPAR ESSA FUNÇÃO
  async function uploadImage(e: any) {
    let file = e.target.files[0];

    const user = await supabase.auth.getUser();
    if (!user || !user.data.user) return console.log("Usuário não logado");
    const { data, error } = await supabase.storage
      .from("contratacao")
      .upload(
        user.data.user.id + "/" + pedido_id + "/" + contratacao?.id,
        file
      );

    if (data) {
      console.log(media);
      getMedia();
    } else {
      console.log(error);
    }
  }

  const getMedia = useCallback(async () => {
    const user = await supabase.auth.getUser();
    if (!user || !user.data.user) return console.log("Usuário não logado");

    const { data, error } = await supabase.storage
      .from("uploads")
      .list(user.data.user.id + "/" + pedido_id + "/" + contratacao?.id, {
        limit: 1,
        offset: 0,
      });

    if (data) {
      setMedia(data);
    } else {
      console.log(error);
    }
  }, [contratacao?.id, pedido_id, supabase.auth, supabase.storage]);

  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    // getMedia();
  }, [getMedia]);

  useEffect(() => {
    if (contratacao) {
      setCanUpload(true);
      getMedia();
    }
  }, [contratacao, getMedia]);

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid container spacing={1}>
        <Grid xs={6} item>
          <TextField
            placeholder="Preço"
            label="Preço"
            required
            {...register("preco")}
            error={!!formState.errors.preco}
            helperText={formState.errors.preco?.message}
          />
        </Grid>
        <Grid xs={6} item></Grid>
        <Grid xs={6} item>
          <input
            type="file"
            onChange={(e) => uploadImage(e)}
            disabled={!canUpload}
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
