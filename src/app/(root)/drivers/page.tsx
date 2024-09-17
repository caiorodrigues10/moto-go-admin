import { TableDrivers } from "@/components/page/drivers/TableDrivers";
import { IDriverResponse } from "@/services/drivers/types";
import { useServer } from "@/utils/useServer";

export default async function DriverPage({
  searchParams,
}: {
  searchParams: {
    limit?: number;
    page?: number;
  };
}) {
  const drivers = await useServer<IDriverResponse>({
    pathname: "drivers",
    query: [
      { name: "page", value: searchParams.page || 0 },
      { name: "limit", value: searchParams.limit || 15 },
    ],
  });

  console.log(drivers);
  

  return (
    <TableDrivers
    drivers={drivers?.data || {} as IDriverResponse}
      searchParams={searchParams}
    />
  );
}
