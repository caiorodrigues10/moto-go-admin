import { NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ICookieProvider, ICookies, UserCookies } from "./interface";

export function nookiesProvider(): ICookieProvider {
  const defaultMaxAge = 60 * 60 * 24; // 24 hour

  function resetCookies(params?: { res: NextApiResponse; path: string }): void {
    destroyCookie({ res: params?.res }, "motogo.token", {
      path: params?.path || "/",
    });
    destroyCookie({ res: params?.res }, "motogo.name", {
      path: params?.path || "/",
    });
    destroyCookie({ res: params?.res }, "motogo.telephone", {
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
    } = parseCookies(res);

    return {
      token,
      name,
      userName,
    };
  }

  function setCookies({
    userCookies: { name, token, userName },
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
  };
}
