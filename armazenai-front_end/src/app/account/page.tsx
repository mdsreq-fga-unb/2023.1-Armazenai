import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../../public/types/database";
import AccountForm from "./account-form";
import Menu from "../components/navbar/menu";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  if (!session) {
    redirect("/");
  }

  return <AccountForm session={session} />;
}
