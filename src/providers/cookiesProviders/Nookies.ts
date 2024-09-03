import { NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ICookieProvider,
  ICookies,
  IDataCookie,
  UserCookies,
} from "./interface";

export function nookiesProvider(): ICookieProvider {
  const defaultMaxAge = 60 * 60 * 24; // 24 hour

  function resetCookies(params?: { res: NextApiResponse; path: string }): void {
    destroyCookie({ res: params?.res }, "motogo.token", {
      path: params?.path || "/",
    });
    destroyCookie({ res: params?.res }, "motogo.name", {
      path: params?.path || "/",
    });
    destroyCookie({ res: params?.res }, "motogo.id", {
      path: params?.path || "/",
    });
    destroyCookie({ res: params?.res }, "motogo.userName", {
      path: params?.path || "/",
    });
  }

  function getCookies(res?: NextApiResponse): UserCookies {
    const {
      "motogo.token": token,
      "motogo.name": name,
      "motogo.userName": userName,
      "motogo.id": id,
    } = parseCookies(res);

    return {
      token,
      name,
      userName,
      id,
    };
  }

  function setDataCookie({
    cookies,
    res,
  }: {
    cookies: IDataCookie;
    res?: NextApiResponse | undefined;
  }): void {
    setCookie({ res }, cookies.path, cookies.value, {
      maxAge: defaultMaxAge,
      path: "/",
    });
  }

  function setCookies({
    userCookies: { name, token, userName, id },
    res,
  }: {
    res?: NextApiResponse | undefined;
    userCookies: UserCookies;
  }): void {
    setCookie({ res }, "motogo.token", token || "", {
      maxAge: defaultMaxAge,
      path: "/",
    });
    setCookie({ res }, "motogo.userName", userName || "", {
      maxAge: defaultMaxAge,
      path: "/",
    });
    setCookie({ res }, "motogo.name", name || "", {
      maxAge: defaultMaxAge,
      path: "/",
    });
    setCookie({ res }, "motogo.id", id || "", {
      maxAge: defaultMaxAge,
      path: "/",
    });
  }

  function setArrayCookies({
    cookies,
    res,
  }: {
    res?: NextApiResponse | undefined;
    cookies: ICookies[];
  }): void {
    cookies.forEach((cookie) => {
      setCookie({ res }, cookie.key, cookie.value, {
        maxAge: cookie.expired || defaultMaxAge,
      });
    });
  }

  return {
    defaultMaxAge,
    getCookies,
    resetCookies,
    setArrayCookies,
    setCookies,
    setDataCookie,
  };
}
