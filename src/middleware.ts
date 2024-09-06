import { NextRequest, NextResponse } from "next/server";
import { isValidAuth } from "./utils/isValidAuth";

export default async function middleware(request: NextRequest) {
  const existsToken = request.cookies.get("motogo.token")?.value;
  const login = new URL("/login", request.url);

  if (existsToken) {
    const token = await isValidAuth(existsToken);

    if (!token) {
      const response = NextResponse.redirect(login);

      ["token", "id", "name", "userName"].forEach((cookieName) => {
        response.cookies.set(`motogo.${cookieName}`, "", {
          expires: new Date(0),
          path: "/",
        });3
      });

      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/", "/adminUsers/:path*"],
};
