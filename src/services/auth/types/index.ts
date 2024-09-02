import { AppResponse } from "@/services/AppResponse";

interface ILogin {
  userName: string;
  password: string;
}

interface ILoginResponse extends AppResponse {
  data?: {
    token: string;
    user: {
      id: number;
      name: string;
      userName: string;
    };
  };
}

export type { ILogin, ILoginResponse };
