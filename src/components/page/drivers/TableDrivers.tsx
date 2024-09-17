"use client";
import { EmptyDataTable } from "@/components/EmptyDataTable";
import { Pagination } from "@/components/Pagination";
import { IUserAdminResponse } from "@/services/usersAdmin/types";
import { phoneMask } from "@/utils/MaskProvider";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import {
  Plus,
  UserCheck,
  UserMinus,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import InactiveUser from "./InactiveDrivers";
import ReactiveUser from "./ReactiveDrivers";
import { IDriverResponse } from "@/services/drivers/types";

export function TableDrivers({
  drivers,
  searchParams,
}: {
  drivers: IDriverResponse;
  searchParams: {
    limit?: number;
    page?: number;
  };
}) {
  console.log({drivers});
  
  const { push } = useRouter();

  const columns = useMemo(
    () => [
      { name: "NOME", uid: "name" },
      { name: "CPF", uid: "document" },
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
        total={drivers?.count || 0}
        limit={searchParams?.limit || 15}
        page={searchParams?.page || 0}
      />
    ),
    [drivers, searchParams]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between w-full max-w-7xl items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-medium">Motoritas</h2>
          <h5 className="text-default-500">
            Todos os motoristas cadastrados na plataforma
          </h5>
        </div>
        <Button
          color="primary"
          variant="bordered"
          className="rounded-full"
          endContent={<Plus size={16} />}
          onClick={() => push("/drivers/new")}
        >
          Novo motorista
        </Button>
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
      <TableBody items={drivers?.list || []} emptyContent={<EmptyDataTable />}>
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
