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
import { useCallback, useEffect, useRef, useState } from "react";
import { Database } from "../../../public/types/database";
import { Cliente } from "../../../public/types/main-types";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import TabelaBase from "../components/tabela/tabelaBase";
import StepperCliente from "./stepperCliente";

type ClienteTable = {
  id: number;
  nome: string;
  telefone: string;
  cnpj: string;
  email: string;
};

export default function ClientePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<ClienteTable[]>([]);
  const [clienteSendoEditado, setClienteSendoEditado] = useState<
    Cliente | undefined
  >(undefined);
  const tableHeaders = ["ID", "Nome", "Telefone", "Email", "CNPJ"];
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const getClientes = useCallback(async () => {
    setLoading(true);
    const { data: clienteData, error } = await supabase
      .from("cliente")
      .select(`id, nome, telefone , email, cnpj`)
      .returns<ClienteTable[]>();
    if (clienteData) {
      setClientes(clienteData);
    }
    if (error) console.log(error);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const getUserSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) router.push("/");
    };

    getUserSession();
    getClientes();
  }, [getClientes, router, supabase.auth]);

  useEffect(() => {
    getClientes();
  }, [getClientes, openModal]);

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
      setClientes((state) =>
        state.filter((s) => s.id !== idCLienteAtual.current)
      );
      snackBarSucesso("Cliente deletado com sucesso!");
    }
    setOpenDeleteDialog(false);
  };

  return (
    <BasePage labelNavBar="Clientes">
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
        <StepperCliente setOpenModal={setOpenModal} />
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
