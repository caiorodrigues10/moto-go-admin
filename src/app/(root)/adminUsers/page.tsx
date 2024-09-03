import { TableUserAdmin } from "@/components/page/usersAdmin/TableUserAdmin";
import { IUserAdminResponse } from "@/services/usersAdmin/types";
import { useServer } from "@/utils/useServer";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: {
    limit?: number;
    page?: number;
  };
}) {
  const usersAdmin = await useServer<IUserAdminResponse>({
    pathname: "admin",
    query: [
      { name: "page", value: searchParams.page || 0 },
      { name: "limit", value: searchParams.limit || 15 },
    ],
  });

  return (
    <TableUserAdmin
      users={usersAdmin.data || ({} as IUserAdminResponse)}
      searchParams={searchParams}
    />
  );
}
