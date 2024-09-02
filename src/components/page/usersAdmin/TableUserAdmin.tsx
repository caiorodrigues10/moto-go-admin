"use client";
import { IUserAdmin } from "@/services/usersAdmin/types";
import { phoneMask } from "@/utils/MaskProvider";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export function TableUserAdmin({ users }: { users: IUserAdmin[] }) {
  const columns = useMemo(
    () => [
      { name: "NOME", uid: "name" },
      { name: "USUÁRIO", uid: "user_name" },
      { name: "TELEFONE", uid: "telephone" },
      { name: "STATUS", uid: "active" },
      { name: "AÇÕES", uid: "actions" },
    ],
    []
  );

  const { push } = useRouter();

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    console.log(cellValue);

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
            variant="flat"
          >
            {cellValue ? "Ativo" : "Inativo"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Editar usuário">
              <Link
                href={"/adminUsers/" + user?.id}
                className="text-lg text-zinc-300 cursor-pointer active:opacity-50"
              >
                <Pencil />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Deletar usuário">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash2 />
              </span>
            </Tooltip>
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
      wrapper: ["bg-[#2B3544]", "w-full p-6"],
      base: "max-w-7xl",
    }),
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between w-full max-w-7xl items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium">Usuários Administradores</h2>
          <h5 className="text-default-500">
            Todos os usuários administradores cadastrados na plataforma
          </h5>
        </div>
        <Button
          color="primary"
          variant="bordered"
          className="rounded-full"
          endContent={<Plus size={16} />}
          onClick={() => push("/adminUsers/new")}
        >
          Novo usuário
        </Button>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        <Pagination
          showControls
          color="primary"
          page={1}
          total={10}
          variant="flat"
          classNames={{
            item: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
            prev: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
            next: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
          }}
        />
      </div>
    );
  }, []);

  return (
    <Table
      isStriped
      aria-label="Example table with custom cells"
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
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              console.log(item);

              return <TableCell>{renderCell(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
