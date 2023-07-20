"use client";
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
import snackBarSucesso from "../snackBar/snackBarSucesso";
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
            preco: contratacao.preco,
          }
        : {
            id: undefined,
            pedido_id: pedido_id,
            preco: undefined,
          },
    });

  const [media, setMedia] = useState<Blob | null>(null);
  const supabase = createClientComponentClient<Database>();
  const [carregando, setCarregando] = useState(false);

  const uploadImage = async (e: any) => {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("contratacao")
      .upload(pedido_id + "/" + contratacao?.id, file, {
        contentType: "application/pdf",
        cacheControl: "1",
      });

    if (data && !error) {
      snackBarSucesso("Upload realizado com sucesso!");
      getMedia();
    } else {
      console.log(error);
    }
  };

  const deleteFile = async () => {
    const { data, error } = await supabase.storage
      .from("contratacao")
      .remove([pedido_id + "/" + contratacao?.id]);

    if (data && !error) {
      snackBarSucesso("Documento deletado com sucesso!");
      setMedia(null);
    } else {
      console.log(error);
    }
  };

  const getMedia = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from("contratacao")
      .download(pedido_id + "/" + contratacao?.id);

    if (data) {
      setMedia(data);
    } else {
      console.log(error);
    }
  }, [contratacao?.id, pedido_id, supabase]);

  const [canUpload, setCanUpload] = useState(false);
  useEffect(() => {
    if (contratacao && contratacao.id) {
      setCanUpload(true);
      getMedia();
    }
  }, [contratacao, getMedia]);

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
            {...register("preco")}
            error={!!formState.errors.preco}
            helperText={formState.errors.preco?.message}
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
