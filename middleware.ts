import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl.clone();

  const protectedRoutes = ["/dashboard"];

  if (
    protectedRoutes.some((path) => url.pathname.startsWith(path)) &&
    !session
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (session && url.pathname === "/login") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/login", "/dashboard/:path*"] };
