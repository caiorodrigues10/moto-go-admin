import { AppResponse } from "@/services/AppResponse";

interface IDriver {
  id: number;
  name: string;
  telephone: string;
  document: string;
  created_at: Date;
  active: boolean;
  fcm_token: string | null;
  profile_picture: string | null;
  created_by: number;
  lat: number;
  long: number;
}

interface IDriverResponse {
  count: number;
  list: IDriver[];
}

interface ICreateDriver {
  document: string;
  name: string;
  profile_picture?: string;
  telephone: string;
}

interface IDriverById extends AppResponse {
  data?: IDriver;
}

interface ICreateDriverResponse extends AppResponse {
  data?: IDriver;
}

export type {
  IDriverResponse,
  ICreateDriver,
  ICreateDriverResponse,
  IDriverById,
  IDriver,
};
