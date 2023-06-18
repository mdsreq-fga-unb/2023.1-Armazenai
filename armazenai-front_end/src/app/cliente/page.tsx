"use client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Dialog, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Database } from "../../../public/types/database";
import { Cliente } from "../../../public/types/main-types";
import ClienteForm from "../components/formulario/clienteFormCadastro";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import TabelaBase from "../components/tabela/tabelaBase";

type ClienteTable = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
};

export default function Cliente() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<ClienteTable[]>([]);
  const [clienteSendoEditado, setClienteSendoEditado] = useState<
    Cliente | undefined
  >(undefined);
  const tableHeaders = ["ID", "Nome", "Telefone", "Email"];
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const getClientes = async () => {
    setLoading(true);
    const { data: clienteData, error } = await supabase
      .from("cliente")
      .select(`id, nome, telefone , email`)
      .returns<ClienteTable[]>();
    if (clienteData) {
      setClientes(clienteData);
    }
    if (error) console.log(error);
    setLoading(false);
  };

  useEffect(() => {
    const getUserSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) router.push("/");
    };

    getUserSession();
    getClientes();
  }, []);

  const onSubmit = async ({
    nome,
    email,
    created_at,
    id,
    telefone,
  }: Cliente) => {
    setLoading(true);

    if (id) {
      console.log(id);
      console.log("Nome", nome);
      const { status, error, statusText } = await supabase
        .from("cliente")
        .update({
          email: email,
          nome: nome,
          telefone: telefone,
        })
        .eq("id", id);

      console.log("status", status, statusText, error);
      if (error || status !== 204) {
        snackBarErro("Houve um erro ao atualizar as informações do cliente.");
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("cliente").insert({
        email,
        nome,
        telefone,
      });

      if (error) {
        snackBarErro("Houve um erro ao salvar as informações do cliente.");
        setLoading(false);
        return;
      }
    }

    snackBarSucesso(`Cliente ${id ? "atualizado" : "criado"}  com sucesso.`);
    setLoading(false);
    await getClientes();
    setOpenModal(false);
  };
  const idCLienteAtual = useRef<number | null>(null);
  const handleDeletar = (id: number, pagina: number, porPagina: number) => {
    idCLienteAtual.current = clientes.slice(pagina * porPagina)[id].id ?? null;
    setOpenDeleteDialog(true);
  };

  const handleEditar = (id: number, pagina: number, porPagina: number) => {
    idCLienteAtual.current = clientes.slice(pagina * porPagina)[id].id ?? null;
    const cliente = clientes.find((c) => c.id === idCLienteAtual.current);
    setClienteSendoEditado(cliente);
    setOpenModal(true);
  };

  const deletarCliente = async () => {
    const { status, error } = await supabase
      .from("cliente")
      .delete()
      .eq("id", idCLienteAtual.current);
    if (error) console.log(error);
    if (status === 204) {
      console.log("Deletado com sucesso");
      setClientes((state) =>
        state.filter((s) => s.id !== idCLienteAtual.current)
      );
      snackBarSucesso("Cliente deletado com sucesso!");
    }
    setOpenDeleteDialog(false);
  };

  return (
    <BasePage>
      <SnackbarProvider />
      <Button
        variant="contained"
        onClick={() => {
          setClienteSendoEditado(undefined);
          setOpenModal(true);
        }}
        startIcon={<AddIcon />}
      >
        Adicionar cliente
      </Button>
      <ModalForm openModal={openModal} setOpenModal={setOpenModal}>
        <ClienteForm
          onSubmit={onSubmit}
          loading={loading}
          cliente={clienteSendoEditado}
        />
      </ModalForm>
      <Container component="div">
        <Typography variant="h2" fontSize={24} my={2}>
          Clientes
        </Typography>
        <TabelaBase<ClienteTable>
          rows={clientes}
          loadingData={loading}
          tableHeaders={tableHeaders}
          handleEditarBotao={handleEditar}
          handleDeletarBotao={handleDeletar}
        />
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
                {clientes.find((c) => c.id === idCLienteAtual.current)?.nome}?
              </strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} autoFocus>
              Cancelar
            </Button>
            <Button onClick={deletarCliente}>Deletar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </BasePage>
  );
}
