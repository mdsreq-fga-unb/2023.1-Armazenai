"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Dialog,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Database } from "../../../public/types/database";
import { Cliente, Pedido } from "../../../public/types/main-types";
import PedidoFormulario from "../components/formulario/pedidoForm";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";
import TabelaBase from "../components/tabela/tabelaBase";

type PedidoTable = {
  id: number;
  created_at: Date;
  client_id: number;
  tipo_servico: string;
  tipo_pedido: string;
};

const schemaFiltroUsuarios = yup.object({
  cliente: yup.number(),
  dataCriacao: yup.string(),
  etapa: yup.string(),
});

type SchemaFiltroUsuarioForm = yup.InferType<typeof schemaFiltroUsuarios>;

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

    if (pedidoData) {
      setPedidos(pedidoData);
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

  const enviaDadosFormulario = async ({
    cliente_id,
    tipo_servico,
    id,
  }: {
    cliente_id: number;
    tipo_servico: string;
    id?: number;
  }) => {
    if (id) {
      const { error } = await supabase
        .from("pedido")
        .update({ cliente_id, tipo_servico })
        .eq("id", id);
      if (error) snackBarErro("Houve um erro ao atualizar o pedido!");
      else snackBarSucesso("Pedido atualizado com sucesso!");
    } else {
      const { error } = await supabase
        .from("pedido")
        .insert({ cliente_id, tipo_servico });
      if (error) snackBarErro("Houve um erro ao criar o pedido!");
      else snackBarSucesso("Pedido criado com sucesso!");
    }

    setOpenModal(false);
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

  const { handleSubmit, reset, register, setValue } =
    useForm<SchemaFiltroUsuarioForm>({
      resolver: yupResolver(schemaFiltroUsuarios),
    });

  const submitFilter = (filter?: SchemaFiltroUsuarioForm) => {
    console.log(filter);
  };

  const [cliente, setCliente] = useState<number | undefined>(undefined);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [dataFiltro, setDataFiltro] = useState<Dayjs | null>(null);

  const handleChangeCliente = (event: SelectChangeEvent) => {
    setCliente(event.target.value as unknown as number);
    setValue("cliente", event.target.value as unknown as number);
  };

  useEffect(() => {
    const getClientes = async () => {
      const { data, error } = await supabase.from("cliente").select("*");
      if (data) setClientes(data);
    };
    getClientes();
  }, [supabase]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BasePage labelNavBar="Pedidos">
        <SnackbarProvider>
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
              enviaDadosFormulario={enviaDadosFormulario}
              pedido={
                pedidoSendoEditado &&
                pedidoSendoEditado.cliente_id &&
                pedidoSendoEditado.tipo_servico
                  ? {
                      cliente_id: pedidoSendoEditado?.cliente_id,
                      tipo_servico: pedidoSendoEditado?.tipo_servico,
                      id: pedidoSendoEditado.id,
                    }
                  : undefined
              }
              carregando={false}
            />
          </ModalForm>
          <Container component="div">
            <Typography variant="h2" fontSize={24} my={2}>
              Pedidos
            </Typography>

            <Box mt={1} mb={2}>
              <Typography>Filtros:</Typography>
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent={"space-evenly"}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={(cliente as unknown as string) ?? ""}
                  label="Cliente"
                  fullWidth
                  onChange={handleChangeCliente}
                >
                  {clientes.map((c) => (
                    <MenuItem value={c.id} key={c.id}>
                      {c.nome} - {c.cnpj}
                    </MenuItem>
                  ))}
                </Select>
                <DatePicker
                  label="Data do pedido"
                  value={dataFiltro}
                  onChange={(newValue) => setDataFiltro(newValue)}
                />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={(cliente as unknown as string) ?? ""}
                  label="Cliente"
                  fullWidth
                  onChange={handleChangeCliente}
                >
                  {clientes.map((c) => (
                    <MenuItem value={c.id} key={c.id}>
                      {c.nome} - {c.cnpj}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent={"center"}
                mt={1}
              >
                <Button
                  color="primary"
                  size="medium"
                  variant="outlined"
                  onClick={() => {
                    reset();
                    setCliente(undefined);
                    setDataFiltro(null);
                  }}
                  sx={{ mr: 1 }}
                >
                  limpar
                </Button>
                <Button
                  color="primary"
                  size="medium"
                  type="submit"
                  variant="contained"
                  sx={{ ml: 1 }}
                >
                  Filtrar
                </Button>
              </Box>
            </Box>

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
        </SnackbarProvider>
      </BasePage>
    </LocalizationProvider>
  );
}
