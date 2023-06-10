import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../public/types/database";

export async function chekcCpfDuplicated(cpf: string) {
  const {data, error} = await createClientComponentClient<Database>().from("profiles").select("cpf").eq("cpf", cpf)
  
  if(error) throw error

  return data[0] ? true : false 
}