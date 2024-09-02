import { AppResponse } from "@/services/AppResponse";

interface IUserAdmin {
  active: boolean;
  id: number;
  name: string;
  telephone: string;
  user_name: string;
}

interface ICreateUserAdmin {
  userName: string;
  name: string;
  password: string;
  confirmPassword: string;
  telephone?: string;
}

interface IUpdateUserAdmin {
  name: string;
}

interface IUserAdminByIdResponse extends AppResponse {
  data?: IUserAdmin;
}
interface ICreateUserAdminResponse extends AppResponse {
  data?: IUserAdmin;
}

interface IUpdateUserAdminResponse extends AppResponse {
  data?: IUserAdmin;
}

export type {
  IUserAdmin,
  ICreateUserAdmin,
  IUserAdminByIdResponse,
  IUpdateUserAdmin,
  ICreateUserAdminResponse,
  IUpdateUserAdminResponse,
};
