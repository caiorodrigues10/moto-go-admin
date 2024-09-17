import { PROVIDERS } from "@/providers";
import api from "@/services/api";
import { AppResponse } from "@/services/AppResponse";
import { ICreateDriver, ICreateDriverResponse, IDriverById } from "../types";

export async function createDriver(
  data: ICreateDriver
): Promise<ICreateDriverResponse> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();

  const response = await fetch(`${api}/drivers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const createUser = await response.json();

  return createUser;
}

export async function inactiveDriver(id: number): Promise<AppResponse> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();

  const response = await fetch(`${api}/drivers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const inactiveUser = await response.json();

  return inactiveUser;
}

export async function reactiveDriver(id: number): Promise<IDriverById> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();
  const response = await fetch(`${api}/admin/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res)
    .catch((err) => err.response);

  const user = await response?.json();

  return user;
}
