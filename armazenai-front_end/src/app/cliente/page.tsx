"use client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Dialog } from "@mui/material";
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
  const tableHeaders = ["id", "nome", "telefone", "email"];
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const getUserSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) router.push("/");
    };
    const getClientes = async () => {
      setLoading(true);
      const { data: clienteData, error } = await supabase
        .from("cliente")
        .select(`id, nome, telefone , email`)
        .returns<ClienteTable[]>();
      if (clienteData) {
        // This make created_at not visible in table
        setClientes(clienteData);
      }
      if (error) console.log(error);
      setLoading(false);
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
    const { error } = await supabase.from("cliente").insert({
      email,
      nome,
      telefone,
    });

    if (error) {
      snackBarErro("Houve um erro ao salvar as informações do cliente.");
      console.log(error);
      setLoading(false);
      return;
    }

    snackBarSucesso("Cliente criado com sucesso.");
    setLoading(false);
    setOpenModal(false);
  };
  const idCLiente = useRef<number | null>(null);

  const handleEditar = (id: number, pagina: number, porPagina: number) => {
    idCLiente.current = clientes.slice(pagina * porPagina)[id].id ?? null;
    setOpenDeleteDialog(true);
  };

  const deletarCliente = async () => {
    const { status, error } = await supabase
      .from("cliente")
      .delete()
      .eq("id", idCLiente.current);
    if (error) console.log(error);
    if (status === 204) {
      console.log("Deletado com sucesso");
      setClientes((state) => state.filter((s) => s.id !== idCLiente.current));
    }
    setOpenDeleteDialog(false);
  };

  return (
    <BasePage>
      <SnackbarProvider />
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        startIcon={<AddIcon />}
      >
        Adicionar cliente
      </Button>
      <ModalForm openModal={openModal} setOpenModal={setOpenModal}>
        <ClienteForm onSubmit={onSubmit} loading={loading} />
      </ModalForm>
      <Container component="div">
        <h1>Clientes</h1>
        <TabelaBase<ClienteTable>
          rows={clientes}
          loadingData={loading}
          tableHeaders={tableHeaders}
          handleEditarBotao={handleEditar}
          handleDeletarBotao={handleEditar}
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
                {clientes.find((c) => c.id === idCLiente.current)?.nome}?
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
