"use client";
import { Container, Paper } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "../../../public/types/database";
import { Usuario } from "../components/formulario/usuarioFormAtualizacao";
import BasePage from "../components/navbar/basePage";
import PerfilInfo from "./perfil-info";

export default function Perfil() {
  const [user, setUser] = useState<Usuario | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
      if (!user || !user.data.user?.id) return redirect("/");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.data.user?.id)
        .limit(1);
      if (data && data?.length > 0) {
        setUser(data[0]);
        return;
      }
    };
    getUser();
  }, []);

  if (!user)
    return (
      <>
        <h1>Carregando...</h1>
      </>
    );

  return (
    <BasePage>
      <Container>
        <Paper elevation={5} sx={{ p: 5, my: 2 }}>
          <PerfilInfo usuario={user} setUsuario={setUser} />
        </Paper>
      </Container>
    </BasePage>
  );
}
