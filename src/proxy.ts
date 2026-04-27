import { type NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/signup"];
const PUBLIC_PAGES = ["/"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authStatus = request.cookies.get("auth_status");

    const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));
    const isPublicPage = PUBLIC_PAGES.some((page) => pathname.startsWith(page));

    if (!authStatus && !isAuthPage && !isPublicPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authStatus && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
