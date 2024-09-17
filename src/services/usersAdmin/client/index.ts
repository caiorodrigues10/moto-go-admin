import { PROVIDERS } from "@/providers";
import {
  ICreateUserAdmin,
  ICreateUserAdminResponse,
  IUpdateUserAdmin,
  IUpdateUserAdminResponse,
  IUserAdminByIdResponse,
} from "../types";
import api from "@/services/api";
import { AppResponse } from "@/services/AppResponse";

export async function updateUserAdmin(
  data: IUpdateUserAdmin
): Promise<IUpdateUserAdminResponse> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();
  const response = await fetch(`${api}/admin/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, id: undefined }),
  })
    .then((res) => res)
    .catch((err) => err.response);

  const user = await response?.json();

  return user;
}

export async function createUserAdmin(
  data: ICreateUserAdmin
): Promise<ICreateUserAdminResponse> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();

  const response = await fetch(`${api}/admin`, {
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

export async function inactiveUserAdmin(id: number): Promise<AppResponse> {
  const { getCookies } = PROVIDERS.cookies();
  const { token } = getCookies();

  const response = await fetch(`${api}/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const inactiveUser = await response.json();

  return inactiveUser;
}

export async function reactiveUserAdmin(
  id: number
): Promise<IUserAdminByIdResponse> {
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

// export async function updatePassword(
//   data: IUpdatePassword
// ): Promise<IUpdatePasswordResponse> {
//   const { getCookies } = PROVIDERS.cookies();
//   const { token } = getCookies();

//   const update = await fetch(
//     `${process.env.NEXT_PUBLIC_URL_API}/v1/dashboard/users/password/${data.token}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ password: data.password }),
//     }
//   )
//     .then((res) => res.json())
//     .catch((err) => err.response);

//   return update;
// }
