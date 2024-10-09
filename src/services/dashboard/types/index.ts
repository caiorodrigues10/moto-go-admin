import { AppResponse } from "@/services/AppResponse";

interface ITotalServicesByYearResponse {
  month: string;
  quantity: {
    ride: {
      accepted: number;
      rejected: number;
    };
    delivery: {
      accepted: number;
      rejected: number;
    };
  };
}

interface IDashboardResponse {
  driversTop: { name: string; services: number }[];
  graphs: ITotalServicesByYearResponse[];
  adherence: number;
}

export type { IDashboardResponse, ITotalServicesByYearResponse };
