import api from "@/services/api";

async function isValidAuth(token: string): Promise<boolean> {
  const getToken = await fetch(`${api}/users?page=0&limit=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  if (!token || getToken?.statusCode === 401) {
    return false;
  }
  return true;
}

export { isValidAuth };
