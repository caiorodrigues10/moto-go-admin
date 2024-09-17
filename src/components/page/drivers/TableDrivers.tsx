"use client";
import { EmptyDataTable } from "@/components/EmptyDataTable";
import { Pagination } from "@/components/Pagination";
import { IUserAdminResponse } from "@/services/usersAdmin/types";
import { cpfMask, phoneMask } from "@/utils/MaskProvider";
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
  User,
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
  const { push } = useRouter();

  const columns = useMemo(
    () => [
      { name: "NOME", uid: "name" },
      { name: "CPF", uid: "document" },
      { name: "TELEFONE", uid: "telephone" },
      { name: "STATUS", uid: "active" },
      { name: "AÇÕES", uid: "actions" },
    ],
    []
  );

  const renderCell = useCallback((driver: any, columnKey: any) => {
    const cellValue = driver[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: driver?.profile_picture }}
            name={cellValue}
          >
            {driver.name}
          </User>
        );
      case "telephone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {phoneMask(cellValue)}
            </p>
          </div>
        );
      case "document":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cpfMask(cellValue)}</p>
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
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            {driver.active ? (
              <InactiveUser driver={driver}>
                <Tooltip color="danger" content="Inativar motorista">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <UserMinus />
                  </span>
                </Tooltip>
              </InactiveUser>
            ) : (
              <ReactiveUser driver={driver}>
                <Tooltip color="success" content="Reativar motorista">
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
          <h2 className="text-xl font-medium">Motoristas</h2>
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
