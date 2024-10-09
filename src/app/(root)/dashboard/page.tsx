import { AdherenceChart } from "@/components/page/dashboard/AdherenceChart";
import DriversRanking from "@/components/page/dashboard/DriversRanking";
import RidesAcceptedRejectedChart from "@/components/page/dashboard/RidesAcceptedRejectedChart";
import { TotalRidesAndDeliveriesChart } from "@/components/page/dashboard/TotalRidesAndDeliveriesChart";
import { IDashboardResponse } from "@/services/dashboard/types";
import { useServer } from "@/utils/useServer";

export default async function TestandoPage() {
  const dashboardPanel = await useServer<IDashboardResponse>({
    pathname: "dashboardPanel",
  });

  return (
    <div className="grid grid-cols-12 w-full h-full max-w-7xl gap-4">
      <RidesAcceptedRejectedChart
        data={dashboardPanel?.data || ({} as IDashboardResponse)}
      />
      <TotalRidesAndDeliveriesChart
        data={dashboardPanel?.data || ({} as IDashboardResponse)}
      />
      <DriversRanking data={dashboardPanel.data?.driversTop || []} />

      <AdherenceChart adherence={dashboardPanel.data?.adherence || 0} />
    </div>
  );
}
