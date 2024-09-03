"use client";
import { Pagination as PaginationNextUI } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  limit,
  page,
  total,
}: {
  total: number;
  page: number;
  limit: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const pages = Math.ceil(total / limit);
  const current = Math.min(Number(page) + 1, pages);

  const totalShowing = limit * current > total ? total : limit * current;

  return (
    <div className="py-2 px-2 flex justify-between gap-4 items-center mt-auto">
      <div className="flex gap-2">
        <p>Mostrando</p>
        <p>{totalShowing}</p>
        <p>de</p>
        <p>{total}</p>
      </div>
      <PaginationNextUI
        showControls
        onChange={(e) => {
          urlSearchParams.set("page", String(e - 1));
          urlSearchParams.set("limit", String(limit));

          replace(pathname + "?" + urlSearchParams.toString());
        }}
        color="primary"
        page={Number(page) + 1}
        total={pages}
        variant="flat"
        classNames={{
          item: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
          prev: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
          next: ["bg-[#232D3C]", "data-[hover=true]:!bg-[#161c26]"],
        }}
      />
    </div>
  );
}
