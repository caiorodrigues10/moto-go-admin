import { AppResponse } from "@/services/AppResponse";

interface IUser {
  id: number;
	name: string;
	telephone: string;
	created_at: Date;
	active: boolean;
	blocked: boolean;
	fcm_token: string | null;
	validated: boolean;
	lat: number;
	long: number;
}

interface ICreateUser {
  cpf: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  telephone?: string;
}

interface IUpdateUser {
  cpf: string;
  name: string;
  telephone?: string;
}

interface IUserResponse extends AppResponse {
  list: IUser[]
  count: number
}

interface IUserByIdResponse extends AppResponse {
  data?: IUser;
}
interface ICreateUserResponse extends AppResponse {
  data?: IUser;
}

interface IUpdateUserResponse extends AppResponse {
  data?: IUser;
}

export type {
  IUser,
  ICreateUser,
  IUserByIdResponse,
  IUpdateUser,
  ICreateUserResponse,
  IUpdateUserResponse,
  IUserResponse
};
