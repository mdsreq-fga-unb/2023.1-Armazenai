import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, colors } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../../public/types/database";

const errorsExecucaoForm = {
  deveSerNumero: "Este campo deve ser um número!",
  deveSerString: "Este campo deve ser uma string!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaExecucaoForm = yup.object({
  id: yup.number(),
  pedido_id: yup.number(),
  concluido: yup.boolean(),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagwem padrão
export type FormularioExecucao = yup.InferType<typeof schemaExecucaoForm>;

type FormularioExecucaoProps = {
  execucao?: FormularioExecucao;
  enviaDadosFormulario: (dataFormulario: FormularioExecucao) => any;
  pedido_id: FormularioExecucao["pedido_id"];
};

export default function ExecucaoFormulario({
  execucao,
  pedido_id,
  enviaDadosFormulario,
}: FormularioExecucaoProps) {
  console.log(execucao);
  const { formState, handleSubmit, setValue, register } =
    useForm<FormularioExecucao>({
      resolver: yupResolver(schemaExecucaoForm),
      defaultValues: execucao
        ? {
            pedido_id: execucao.pedido_id,
            id: execucao.id,
            concluido: execucao.concluido,
          }
        : {
            id: undefined,
            pedido_id: undefined,
            concluido: undefined,
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
      .from("execucao")
      .upload(user.data.user.id + "/" + pedido_id + "/" + execucao?.id, file);

    if (data) {
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
      .list(user.data.user.id + "/" + pedido_id + "/" + execucao?.id, {
        limit: 1,
        offset: 0,
      });

    if (data) {
      setMedia(data);
    } else {
      console.log(error);
    }
  }, [execucao?.id, pedido_id, supabase.storage]);

  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    // getMedia();
  }, [getMedia]);

  useEffect(() => {
    if (execucao) {
      setCanUpload(true);
    }
  }, [execucao]);

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid container spacing={1}>
        <Grid xs={6} item>
          <TextField
            placeholder="Status"
            label="Status"
            required
            {...register("concluido")}
            error={!!formState.errors.concluido}
            helperText={formState.errors.concluido?.message}
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
