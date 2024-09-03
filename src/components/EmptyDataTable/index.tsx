import { ServerOff } from "lucide-react";

export function EmptyDataTable() {
  return (
    <div className="flex flex-col gap-4 justify-center w-full items-center text-zinc-400 mt-16">
      <ServerOff size={54} />
      <h1 className="text-2xl font-semibold">Nenhum dado foi encontrado</h1>
    </div>
  );
}
