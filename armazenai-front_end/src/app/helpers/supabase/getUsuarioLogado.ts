import { Usuario } from "@/app/components/formulario/usuarioFormAtualizacao";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../../public/types/database";

export const getPerfildoUsuarioLogado = async (
  supabase: SupabaseClient<Database, "public">
) => {
  const { data: usuarioLogado } = await supabase.auth.getUser();
  if (!usuarioLogado || !usuarioLogado.user?.id) return null;

  
  const { data: perfilDoUsuario } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", usuarioLogado.user.id);
  console.log(perfilDoUsuario)
  if (perfilDoUsuario && perfilDoUsuario?.length > 0)
    return perfilDoUsuario[0] as Usuario;

  return null
}
