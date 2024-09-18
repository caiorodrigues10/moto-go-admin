"use client";
import { EmptyDataTable } from "@/components/EmptyDataTable";
import { Pagination } from "@/components/Pagination";
import { IUserResponse } from "@/services/users/types";
import { phoneMask } from "@/utils/MaskProvider";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@nextui-org/react";
import {
  UserCheck,
  UserMinus,
  UserRoundCheck,
  UserRoundX
} from "lucide-react";
import { useCallback, useMemo } from "react";
import BlockUser from "./BlockUser";
import InactiveUser from "./InactiveUser";
import ReactiveUser from "./ReactiveUser";
import UnlockUser from "./UnlockUser";

export function TableUser({
  users,
  searchParams,
}: {
  users: IUserResponse;
  searchParams: {
    limit?: number;
    page?: number;
  };
}) {

  const columns = useMemo(
    () => [
      { name: "NOME", uid: "name" },
      { name: "TELEFONE", uid: "telephone" },
      { name: "STATUS", uid: "active" },
      { name: "BLOQUEADO", uid: "blocked" },
      { name: "AÇÕES", uid: "actions" },
    ],
    []
  );

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "telephone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {phoneMask(cellValue)}
            </p>
          </div>
        );
      case "active":
        return (
          <Chip
            className="capitalize"
            color={cellValue ? "success" : "danger"}
            size="sm"
            variant="solid"
          >
            {cellValue ? "Ativo" : "Inativo"}
          </Chip>
        );
      case "blocked":
        return (
          <Chip
            className="capitalize"
            color={!cellValue ? "success" : "danger"}
            size="sm"
            variant="solid"
          >
            {cellValue ? "Sim" : "Não"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            {user.active ? (
              <InactiveUser user={user}>
                <Tooltip color="danger" content="Inativar usuário">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <UserMinus />
                  </span>
                </Tooltip>
              </InactiveUser>
            ) : (
              <ReactiveUser user={user}>
                <Tooltip color="success" content="Reativar usuário">
                  <span className="text-lg text-green-500 active:opacity-50 cursor-pointer">
                    <UserCheck />
                  </span>
                </Tooltip>
              </ReactiveUser>
            )}
            {!user.blocked ? (
              <BlockUser user={user}>
                <Tooltip color="danger" content="Bloquear usuário">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <UserRoundX />
                  </span>
                </Tooltip>
              </BlockUser>
            ) : (
              <UnlockUser user={user}>
                <Tooltip color="success" content="Desbloquar usuário">
                  <span className="text-lg text-green-500 active:opacity-50 cursor-pointer">
                    <UserRoundCheck />
                  </span>
                </Tooltip>
              </UnlockUser>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = useMemo(
    () => ({
      th: ["bg-[#151C27]"],
      tr: ["data-[odd=true]:bg-[#425269]"],
      wrapper: ["bg-[#2B3544]", "w-full p-6 min-h-[400px] justify-start"],
      base: "max-w-7xl",
    }),
    []
  );

  const bottomContent = useMemo(
    () => (
      <Pagination
        total={users?.count || 0}
        limit={searchParams?.limit || 15}
        page={searchParams?.page || 0}
      />
    ),
    [users, searchParams]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between w-full max-w-7xl items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-medium">Usuários</h2>
          <h5 className="text-default-500">
            Todos os usuários cadastrados na plataforma
          </h5>
        </div>
      </div>
    );
  }, []);

  return (
    <Table
      isStriped
      classNames={classNames}
      topContent={topContent}
      bottomContent={bottomContent}
    >
      <TableHeader columns={columns} className="bg-[#1a212b]">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users?.list || []} emptyContent={<EmptyDataTable />}>
        {(item) =>
          item ? (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>Nada por aqui</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}
