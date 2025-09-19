import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import UserList from "./user-list";

export default async function UsersPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("display_name", { ascending: true });

  return (
    <>
      <div className="mb-5">
        <TypographyH2>Users</TypographyH2>
      </div>
      <Separator className="my-4" />
      <UserList profiles={profiles ?? []} />
    </>
  );
}
