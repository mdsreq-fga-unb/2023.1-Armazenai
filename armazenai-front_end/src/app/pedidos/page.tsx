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
import { Pedido } from "../../../public/types/main-types";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import TabelaBase from "../components/tabela/tabelaBase";
import PedidoFormulario from "../components/formulario/pedidoForm";
import { get } from "http";

type PedidoTable = {
  id: number;
  created_at: Date;
  client_id: number;
  tipo_servico: string;
  tipo_pedido: string;
};

export default function Pedido() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoTable[]>([]);
  const [pedidoSendoEditado, setPedidoSendoEditado] = useState<
    Pedido | undefined
  >(undefined);
  const tableHeaders = ["ID", "Cliente", "Pedido"];
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const getPedidos = useCallback(async () => {
    setLoading(true);

    const { data: pedidoData, error } = await supabase
      .from("pedido")
      .select(`*`)
      .returns<PedidoTable[]>();
    console.log(pedidos);
    if (pedidoData) {
      setPedidos(pedidoData);
    }
    if (error) console.log(error);
    setLoading(false);
  }, [pedidos, supabase]);

  useEffect(() => {
    const getUserSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) router.push("/");
    };

    getUserSession();
    getPedidos();
  }, [getPedidos, router, supabase.auth]);

  useEffect(() => {
    getPedidos();
  }, [getPedidos, openModal]);

  const idPedidoAtual = useRef<number | null>(null);
  const handleDeletar = (id: number, pagina: number, porPagina: number) => {
    idPedidoAtual.current = pedidos.slice(pagina * porPagina)[id].id ?? null;
    setOpenDeleteDialog(true);
  };

  const handleEditar = (id: number, pagina: number, porPagina: number) => {
    idPedidoAtual.current = pedidos.slice(pagina * porPagina)[id].id ?? null;
    const pedido = pedidos.find((c) => c.id === idPedidoAtual.current);
    setPedidoSendoEditado(pedido as Pedido);
    setOpenModal(true);
  };

  const deletarPedido = async () => {
    const { status, error } = await supabase
      .from("pedido")
      .delete()
      .eq("id", idPedidoAtual.current);
    if (error) console.log(error);
    if (status === 204) {
      setPedidos((state) =>
        state.filter((s) => s.id !== idPedidoAtual.current)
      );
      snackBarSucesso("Pedido deletado com sucesso!");
    }
    setOpenDeleteDialog(false);
  };

  return (
    <BasePage labelNavBar="Pedidos">
      <SnackbarProvider />
      <Button
        variant="contained"
        onClick={() => {
          setPedidoSendoEditado(undefined);
          setOpenModal(true);
        }}
        startIcon={<AddIcon />}
      >
        Novo pedido
      </Button>

      <ModalForm openModal={openModal} setOpenModal={setOpenModal}>
        <PedidoFormulario
          enviaDadosFormulario={function (dataFormulario: {
            tipo_servico: string;
          }) {
            throw new Error("Function not implemented.");
          }}
          carregando={false}
        />
      </ModalForm>
      <Container component="div">
        <Typography variant="h2" fontSize={24} my={2}>
          Pedidos
        </Typography>

        <TabelaBase<PedidoTable>
          rows={pedidos}
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
            Confirme a deleção do pedido
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja deletar o pedido{" "}
              <strong>
                {pedidos.find((c) => c.id === idPedidoAtual.current)?.id}?
              </strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} autoFocus>
              Cancelar
            </Button>
            <Button onClick={deletarPedido}>Deletar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </BasePage>
  );
}
