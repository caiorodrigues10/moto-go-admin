import { NextApiResponse } from "next";

type UserCookies = {
  token?: string;
  name?: string;
  userName?: string;
  id?: string;
};

type ICookies = {
  key: string;
  value: string;
  expired?: number;
};

type IDataCookie = {
  path: string;
  value: any;
  res?: NextApiResponse | undefined;
};

interface ICookieProvider {
  defaultMaxAge: number;
  resetCookies(params?: { res: NextApiResponse; path: string }): void;
  getCookies(res?: NextApiResponse): UserCookies;
  setCookies(params: { res?: NextApiResponse; userCookies: UserCookies }): void;
  setArrayCookies(params: { res?: NextApiResponse; cookies: ICookies[] }): void;
  setDataCookie(params: { res?: NextApiResponse; cookies: IDataCookie }): void;
}

export type { ICookieProvider, ICookies, UserCookies, IDataCookie };
