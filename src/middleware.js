import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "@/utils/i18n";

export function middleware(request) {
  const newLocaleUrl = getLocaleUrlToRedirect(request);

  if (newLocaleUrl) {
    return NextResponse.redirect(newLocaleUrl, { status: 302 });
  }

  if (/\/[a-z]{2}\/user.*/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
