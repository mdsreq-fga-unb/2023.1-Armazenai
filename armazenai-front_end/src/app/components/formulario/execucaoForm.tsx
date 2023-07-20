import { yupResolver } from "@hookform/resolvers/yup";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { Box, Button, Grid, TextField, colors } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../../public/types/database";
import snackBarErro from "../snackBar/snackBarError";
import snackBarSucesso from "../snackBar/snackBarSucesso";
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
            pedido_id: pedido_id,
            concluido: undefined,
          },
    });

  const [media, setMedia] = useState<Blob | null>(null);
  const supabase = createClientComponentClient<Database>();
  const [carregando, setCarregando] = useState(false);

  async function uploadImage(e: any) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("execucao")
      .upload(pedido_id + "/" + execucao?.id, file);

    if (data) {
      snackBarSucesso("Upload realizado com sucesso!");

      getMedia();
    } else {
      snackBarErro("Erro ao realizar upload!");
    }
  }

  const deleteFile = async () => {
    const { data, error } = await supabase.storage
      .from("execucao")
      .remove([pedido_id + "/" + execucao?.id]);

    if (data && !error) {
      snackBarSucesso("Documento deletado com sucesso!");
      setMedia(null);
    } else {
      snackBarErro("Erro ao deletar documento!");
      console.log(error);
    }
  };

  const getMedia = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from("execucao")
      .download(pedido_id + "/" + execucao?.id);

    if (data) {
      setMedia(data);
    } else {
      snackBarErro("Erro ao baixar documento!");
      console.log(error);
    }
  }, [execucao?.id, pedido_id, supabase.storage]);

  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    if (execucao && execucao.id) {
      setCanUpload(true);
      getMedia();
    }
  }, [execucao, getMedia]);

  const baixarDocumento = async () => {
    if (media) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(media);
      link.download = "contratacao.pdf";
      link.click();
    }
  };

  return (
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      <Grid container spacing={1}>
        <Grid xs={6} item>
          <TextField
            placeholder="Preço"
            label="Preço"
            required
            {...register("concluido")}
            error={!!formState.errors.concluido}
            helperText={formState.errors.concluido?.message}
          />
        </Grid>
        <Grid xs={6} item>
          {media && canUpload ? (
            <Box sx={{ display: "flex", justifyItems: "center" }}>
              <Button
                variant="contained"
                endIcon={<CloudDownloadIcon />}
                onClick={baixarDocumento}
              >
                Baixar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => deleteFile()}
                endIcon={<FolderDeleteIcon />}
              >
                Deletar
              </Button>
            </Box>
          ) : (
            <>
              <input
                type="file"
                accept="pdf/*"
                disabled={!canUpload}
                style={{ display: "none" }}
                id="contained-button-file"
                onChange={(e) => uploadImage(e)}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  disabled={!canUpload}
                  endIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </>
          )}
        </Grid>
        <Grid xs={media ? 12 : 6} item>
          {media ? (
            <object
              data={URL.createObjectURL(media)}
              type="application/pdf"
              width="100%"
              height={500}
            >
              <p>
                Link apra o<a href={URL.createObjectURL(media)}>PDF!</a>
              </p>
            </object>
          ) : (
            <></>
          )}
        </Grid>
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
    </form>
  );
}
