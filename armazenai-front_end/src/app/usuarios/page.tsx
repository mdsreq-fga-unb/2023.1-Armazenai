"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SnackbarProvider } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Database } from "../../../public/types/database";
import { FormularioCadastro } from "../cadastro/page";
import UsuarioFormAtualizacao, {
  Usuario,
} from "../components/formulario/usuarioFormAtualizacao";
import UsuarioForm from "../components/formulario/usuarioFormCadastro";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import TabelaBase from "../components/tabela/tabelaBase";
import { chekcCpfDuplicated } from "../helpers/supabase/checkCpfDuplicated";

export default function UsuariosPage() {
  const [loadingData, setLoadingData] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [usuarioSendoEditado, setUsuarioSendoEditado] = useState<
    Usuario | undefined | null
  >(undefined);
  const [loadingForm, setLoadingForm] = useState(false);
  const [openEditModalForm, setOpenEditModalForm] = useState(false);
  const [openCadastroModalForm, setOpenCadastroModalForm] = useState(false);
  const [CPFError, setCPFError] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const idUsuarioAtual = useRef<string | null>(null);

  const getUsuarios = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error)
      snackBarErro(
        `Houve um erro ao pegar as informações dos usuários. Descrição: ${error}`
      );
    if (data) {
      setUsuarios(data);
    }

    setLoadingData(false);
    return;
  };

  const handleDeletarBotao = (
    id: number,
    pagina: number,
    porPagina: number
  ) => {
    idUsuarioAtual.current = usuarios.slice(pagina * porPagina)[id].id ?? null;
    setOpenDeleteDialog(true);
  };

  const handleEditarBotao = (id: number, pagina: number, porPagina: number) => {
    idUsuarioAtual.current = usuarios.slice(pagina * porPagina)[id].id ?? null;
    setUsuarioSendoEditado(
      usuarios.find((u) => u.id === idUsuarioAtual.current)
    );
    setOpenEditModalForm(true);
  };

  const deletarUsuario = async () => {
    console.log(idUsuarioAtual.current);
    const { data, error, status } = await supabase
      .from("profiles")
      .delete()
      .eq("id", idUsuarioAtual.current);

    if (error) {
      console.log(error);
      snackBarErro(
        `Houve um erro ao deletar o usuário com id: ${idUsuarioAtual.current}.`
      );
    }

    if (status == 204) {
      getUsuarios();
      snackBarSucesso("Usuário deletado com sucesso.");
    }
    setOpenDeleteDialog(false);
  };

  const onSubmit = async ({
    cpf,
    email,
    nome,
    password,
    telefone,
  }: FormularioCadastro) => {
    setLoadingForm(true);
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
      setLoadingForm(false);
      return;
    }

    snackBarSucesso(
      "Usuário criado com sucesso! Confirme o email para ter acesso ao sistema!",
      { autoHideDuration: 5000 }
    );
    setOpenCadastroModalForm(false);
    setLoadingForm(false);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  useEffect(() => {
    getUsuarios();
  }, [openEditModalForm]);

  return (
    <SnackbarProvider>
      <BasePage labelNavBar="Painel de Usuários">
        <Button
          variant="contained"
          onClick={() => {
            setUsuarioSendoEditado(undefined);
            setOpenCadastroModalForm(true);
          }}
          startIcon={<AddIcon />}
        >
          Adicionar cliente
        </Button>
        <ModalForm
          openModal={openEditModalForm}
          setOpenModal={setOpenEditModalForm}
        >
          <UsuarioFormAtualizacao
            usuario={usuarioSendoEditado!!}
            setUsuario={setUsuarioSendoEditado}
          />
        </ModalForm>
        <ModalForm
          openModal={openCadastroModalForm}
          setOpenModal={setOpenCadastroModalForm}
        >
          <UsuarioForm
            onSubmit={onSubmit}
            loading={loadingForm}
            formularioInterno={true}
          />
        </ModalForm>
        <Alert
          variant="filled"
          severity="error"
          hidden={CPFError}
          sx={{ display: CPFError ? "flex" : "none", m: 2 }}
          onClose={() => setCPFError(false)}
        >
          CPF Duplicado!
        </Alert>
        <Typography variant="h1" fontSize={28} my={2}>
          <strong>Usuários</strong>
        </Typography>
        <Container component="div" sx={{ p: 2 }}>
          <TabelaBase<Usuario>
            rows={usuarios}
            loadingData={loadingData}
            tableHeaders={["ID", "Nome", "CPF", "Telefone", "Tipo"]}
            handleEditarBotao={handleEditarBotao}
            handleDeletarBotao={handleDeletarBotao}
          />
        </Container>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirme a deleção do cliente
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja deletar o cliente{" "}
              <strong>
                {usuarios.find((u) => u.id === idUsuarioAtual.current)?.nome}?
              </strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} autoFocus>
              Cancelar
            </Button>
            <Button onClick={deletarUsuario}>Deletar</Button>
          </DialogActions>
        </Dialog>
      </BasePage>
    </SnackbarProvider>
  );
}
