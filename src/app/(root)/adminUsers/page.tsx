import { TableUserAdmin } from "@/components/page/usersAdmin/TableUserAdmin";
import { IUserAdmin } from "@/services/usersAdmin/types";
import { useServer } from "@/utils/useServer";

export default async function AdminUsersPage() {
  const usersAdmin = await useServer<IUserAdmin[]>({ pathname: "admin" });

  return <TableUserAdmin users={usersAdmin.data || []} />;
}
