import { ClientOnly } from "@/components/ClientOnly";
import { FormEditUserAdmin } from "@/components/page/usersAdmin/FormEditUserAdmin";
import { IUserAdmin } from "@/services/usersAdmin/types";
import { useServer } from "@/utils/useServer";
import { redirect } from "next/navigation";

export default async function AdminByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const userAdmin = await useServer<IUserAdmin>({
    pathname: "admin/" + params.id,
  });

  if (!userAdmin) {
    redirect("/adminUsers");
  }

  return (
    <ClientOnly>
      <FormEditUserAdmin user={userAdmin.data!} />
    </ClientOnly>
  );
}
