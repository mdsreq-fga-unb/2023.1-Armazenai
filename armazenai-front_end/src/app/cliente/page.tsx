"use client";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { Database } from "../../../public/types/database";
import { Cliente } from "../../../public/types/main-types";
import ClienteForm from "../components/formulario/clienteFormCadastro";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/menu";
import snackBarErro from "../components/snackBar/snackBarError";
import snackBarSucesso from "../components/snackBar/snackBarSucesso";

export default function ClientePage() {
  const [openModal, setOpenModal] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const getUserSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) router.push("/");
    };
    getUserSession();
  }, []);

  const onSubmit = async ({
    nome,
    email,
    created_at,
    id,
    telefone,
  }: Cliente) => {
    const { error } = await supabase.from("cliente").insert({
      email,
      nome,
      telefone,
    });

    if (error) {
      snackBarErro("Houve um erro ao salvar as informações do cliente.");
      console.log(error);
      return;
    }

    snackBarSucesso("Cliente criado com sucesso.");
    setOpenModal(false);
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
        <ClienteForm onSubmit={onSubmit} />
      </ModalForm>
    </BasePage>
  );
}
