import { TableUser } from "@/components/page/users/TableUsers";
import { TableUserAdmin } from "@/components/page/usersAdmin/TableUserAdmin";
import { IUserResponse } from "@/services/users/types";
import { IUserAdminResponse } from "@/services/usersAdmin/types";
import { useServer } from "@/utils/useServer";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: {
    limit?: number;
    page?: number;
  };
}) {
  const users = await useServer<IUserResponse>({
    pathname: "admin",
    query: [
      { name: "page", value: searchParams.page || 0 },
      { name: "limit", value: searchParams.limit || 15 },
    ],
  });

  return (
    <TableUser
      users={users.data || {} as IUserResponse}
      searchParams={searchParams}
    />
  );
}
