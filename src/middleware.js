import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "@/utils/i18n";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/user/profile"];

export async function middleware(request) {
  const newLocaleUrl = getLocaleUrlToRedirect(request);
  const token = await getToken({ req: request });

  if (newLocaleUrl) {
    return NextResponse.redirect(newLocaleUrl, { status: 302 });
  }

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];
  const cleanedPathname = pathname.replace(/^\/(fr|en)/, "");

  if (!token && protectedRoutes.includes(cleanedPathname)) {
    const absoluteURL = new URL(`/${locale}/login`, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
